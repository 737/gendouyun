
const Koa = require('koa');
const Router = require('koa-router');
const routersController = require('./controller');
const view = require('./view');

const app = new Koa();
const router = new Router();

let isprd = false;

app
    .use(async (ctx, next) => {
        // 当前时间
        const start = new Date().getTime();
        // 调用下一个middleware
        await next();
         // 耗费时间
        const ms = new Date().getTime() - start;
         // 打印耗费时间    
        console.log(`Time: ${ms}ms`);
    })
    .use(view('view', {
        noCache: !isprd,
        watch: !isprd
    }))
    .use(routersController())
    .listen(3000);

console.log('app started at port 3000...');