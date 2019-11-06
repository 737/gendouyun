function getLoginUserInfo(ctx) {
    return new Promise((resolve) => {
        // 同一请求中所获取的UserInfo会被缓存至当前对象，所以当再次调用时，如果之前已经有了， 则直接返回
        if (ctx.state.UserInfo) {
            resolve(ctx.state.UserInfo);
            return;
        }

        const auth = ctx.getAuth();
        const userInfo = {
            uid: '', uName: '', loginType: '', isMemberAuth: false, auth: '',
        };

        if (!auth) { // 如果没有获取到 auth 信息， 则返回用户并未登陆
            resolve(userInfo);
            return;
        }

        ctx.soaAgent('10093', 'validateAndGetNewToken', {
            Token: auth,
            head: ctx.header,
        }).then((result) => {
            if (result && result.ReturnCode === 0) {
                userInfo.uid = result.UserID;
                userInfo.uName = result.LoginName;
                userInfo.loginType = result.LoginType;
                userInfo.isMemberAuth = userInfo.loginType === 'GetOrder';
                userInfo.auth = result.NewToken;

                // 保存至当前req中
                ctx.state.UserInfo = userInfo;
            }

            resolve(userInfo);
        }, () => {
            resolve(userInfo);
        });
    });
}

module.exports = ctx => new Promise((resolve) => {
    const userInfo = {
        uid: '',
        vid: '',
        cid: ctx.state.ClientID,
        deviceId: '',
    };

    getLoginUserInfo(ctx).then((user) => {
        userInfo.uid = user.uid;
        resolve(userInfo);
    });
});
