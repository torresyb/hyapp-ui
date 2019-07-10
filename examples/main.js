/**
 * Created by aresn on 16/6/20.
 */
import 'babel-polyfill';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './app.vue';
import Hyapp from '../src/index';
import { ConfirmPlugin } from '../src/index';

Vue.use(VueRouter);
Vue.use(Hyapp);
Vue.use(ConfirmPlugin);

// 开启debug模式
Vue.config.debug = true;
// 路由配置
const router = new VueRouter({
    esModule: false,
    // eslint-disable-next-line no-undef
    base: examples ? '/examples' : '',
    routes: [
        {
            path: '/index',
            component: resolve => require(['./routers/index.vue'], resolve)
        },
        {
            path: '/button',
            component: resolve => require(['./routers/button.vue'], resolve)
        },
        {
            path: '/scroll',
            component: resolve => require(['./routers/scroll.vue'], resolve)
        },
        {
            path: '/indexlist',
            component: resolve => require(['./routers/indexList.vue'], resolve)
        },
        {
            path: '/pulldown',
            component: resolve => require(['./routers/pullDown.vue'], resolve)
        },
        {
            path: '/cell',
            component: resolve => require(['./routers/cell.vue'], resolve)
        },
        {
            path: '/confirm',
            component: resolve => require(['./routers/confirm.vue'], resolve)
        },
        {
            path: '/action-sheet',
            component: resolve => require(['./routers/actionSheet.vue'], resolve)
        },
        {
            path: '/popup',
            component: resolve => require(['./routers/popup.vue'], resolve)
        },
        {
            path: '/date-picker',
            component: resolve => require(['./routers/date-picker.vue'], resolve)
        },
        {
            path: '/picker',
            component: resolve => require(['./routers/picker.vue'], resolve)
        },
        {
            path: '/swiper',
            component: resolve => require(['./routers/swiper.vue'], resolve)
        },
        {
            path: '/address',
            component: resolve => require(['./routers/address.vue'], resolve)
        },
        {
            path: '/scratch-card',
            component: resolve => require(['./routers/scratch-card.vue'], resolve)
        },
        {
            path: '/textarea',
            component: resolve => require(['./routers/textarea.vue'], resolve)
        },
        {
            path: '/',
            redirect: '/index'
        }
    ]
});

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
