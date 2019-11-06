import Vue from 'vue';
import Router from 'vue-router';
import Config from '../../build.json';

Vue.use(Router);

// route-level code splitting
const Home = () => import('../views/Home.vue');
const Detail = () => import('../views/detail/index.vue');
const Booking = () => import('../views/booking');
const Login = () => import('../views/login');

export function createRouter() {
    const prefix = Config.vd || '';
    return new Router({
        mode: 'history',
        fallback: false,
        scrollBehavior: () => ({ y: 0 }),
        routes: [
            { path: prefix + '/home', component: Home },
            {
                path: prefix + `/detail/:hotelid.html`,
                name: 'detail',
                component: Detail,
            },
            {
                path: prefix + '/booking',
                name: 'booking',
                component: Booking,
            },
            {
                path: prefix + '/login',
                name: 'login',
                component: Login,
            },
        ],
    });
}
