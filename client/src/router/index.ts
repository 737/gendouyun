import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Search = () => import('../views/Search/index.vue');
const Navigation = () => import('../views/navigation/index.vue');
const Tools = () => import('../views/tools/index.vue');
const Building = () => import('../views/building/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        // 站点尚未完工，根路径先进入“网站制作中”页面
        path: '/',
        redirect: '/building'
    },
    {
        path: '/building',
        name: 'Building',
        component: Building,
        // 该页面不需要 header / sidebar，由 App.vue 按 meta 决定布局
        meta: { bare: true }
    },
    {
        path: '/search',
        name: 'Search',
        component: Search,
    },
    {
        path: '/navigation',
        name: 'navigation',
        component: Navigation
    },
    {
        path: '/tools',
        name: 'Tools',
        component: Tools
    },
    {
        // 未匹配的路由同样落到制作中页面，避免出现空白页
        path: '/:pathMatch(.*)*',
        redirect: '/building'
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
