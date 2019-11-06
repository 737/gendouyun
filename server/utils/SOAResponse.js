const SOAResponse = function ({ data, error }) {
    this.errors = error || []; // [{"Message":"String", "ErrorCode":"String"}]
    this.data = data;
    this.extensions = [];
};

SOAResponse.prototype.addExt = function (ext) {
    this.extensions.push(ext);
};

// 重写 valueOf/toJSON 以实现在对实例进行取值时返回自定义的内容
SOAResponse.prototype.valueOf = SOAResponse.prototype.toJSON = function () {
    return Object.assign({
        ResponseStatus: {
            Timestamp: `/Date(${new Date().getTime()}+0800)/`,
            Ack: this.errors.length > 0 ? 'Error' : 'Success',
            Errors: this.errors.map((e) => {
                if (e instanceof Error) {
                    return { Message: e.message, Stack: e.stack, ErrorCode: 'ERROR' };
                }

                return e;
            }),
            Extension: this.extensions,
        },
    }, this.data);
};

// 重写 inspect/toString， 返回自定义的内容(inspect 是专门为console.log准备的 =，=)
SOAResponse.prototype.inspect = SOAResponse.prototype.toString = function () {
    return JSON.stringify(this);
};

module.exports = SOAResponse;
