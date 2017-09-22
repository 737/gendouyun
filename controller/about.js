

const fn_index = async (ctx, next) => {
    ctx.response.body = '<h1>about gendouyun</h1>';
};

const fn_tel = async (ctx, next) => {
    ctx.response.body = '<h1>tel is:xxxx</h1>';
};

module.exports = {
    'GET /about': fn_index,
    'GET /about/tel': fn_tel
};