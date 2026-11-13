/**
 * 静态资源缓存策略。
 *
 * Vite 产物文件名带内容哈希（index-BD0psGMI.js），内容变了文件名就变了，
 * 所以可以放心 immutable 长缓存；HTML 文件名固定，必须每次回源校验，
 * 否则发版后用户会一直拿到旧的资源引用。
 */

const HASHED_ASSET = /^\/assets\/[^/]+\.[a-z0-9]+$/i;
const HAS_EXTENSION = /\.[a-zA-Z0-9]+$/;

module.exports = () => async (ctx, next) => {
    await next();

    if (ctx.method !== 'GET' && ctx.method !== 'HEAD') return;
    if (ctx.status !== 200 && ctx.status !== 304) return;

    // 路由自己声明了 no-store（如 /healthz）就别覆盖它
    if ((ctx.response.get('Cache-Control') || '').includes('no-store')) return;

    const pathname = ctx.path;

    if (HASHED_ASSET.test(pathname)) {
        // 一年 + immutable，浏览器连 304 都不会再问
        ctx.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (!HAS_EXTENSION.test(pathname)) {
        // 无扩展名的路径都是前端 history 路由，返回的是 index.html
        ctx.set('Cache-Control', 'no-cache');
    } else {
        // favicon.ico 这类没有哈希的固定文件：短缓存，发版后最多一小时自愈
        ctx.set('Cache-Control', 'public, max-age=3600');
    }
};
