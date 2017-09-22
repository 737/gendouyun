

const fn_index = async (ctx, next) => {

    ctx.render('index.html', {
        title: '我是首页12341234',
        body: '1111111111111'
    });
};

module.exports = {
    'GET /': fn_index
};