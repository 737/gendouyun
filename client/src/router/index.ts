import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Search = () => import('../views/search/index.vue');
const Navigation = () => import('../views/navigation/index.vue');
const Tools = () => import('../views/tools/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;