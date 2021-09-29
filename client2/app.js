// import Vue from 'vue';
import Vue from "vue/dist/vue.common.js";
import App from './App.vue';
import VueRouter from 'vue-router';
// const Todolist = require('./views/todolist/index.vue').default;
import Todolist from './views/todolist/index.vue';
import Home from './views/home/index.vue';
const Bar = require('./views/bar/index.vue').default;


Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [{
        path: '/todolist',
        name: 'todolist',
        component: Todolist
    }, {
        path: '/bar',
        name: 'bar',
        component: Bar
    }, {
        path: '*',
        component: Home
    }]
});


new Vue({
    router: router,
    render: h => h(App),
    // template: App
}).$mount('#app');


