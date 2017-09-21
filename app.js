
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();


app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});

router
    .get('/', async (ctx, next) => {
        ctx.response.body = '<h1>index page</h1>';
    })
    .get('/hello/:name', async (ctx, next) => {
        let name = ctx.params.name;

        ctx.response.body = `<h1>hello, ${name}</h1>`;
    });

app
    .use(router.routes())
    .listen(3000);

console.log('app started at port 3000...');