import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
const Todolist = require('./views/todolist/index.vue');


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/todolist',
        name: 'todolist',
        component: Todolist
    }, {
        path: '/',
        component: App
    }]
});


new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');


