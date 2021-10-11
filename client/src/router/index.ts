import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Home = () => import('../views/home/index.vue');
const About = () => import('../views/about/index.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;