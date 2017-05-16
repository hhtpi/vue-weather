import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/mobile'
        },
        {
            path: '/mobile',
            component: resolve => require(['../components/app/mobile.vue'], resolve),
            children:[
                {
                    path: '/info',
                    component: resolve => require(['../components/app/info.vue'], resolve)
                },
                {
                    path: '/setting',
                    component: resolve => require(['../components/app/setting.vue'], resolve)
                },
                {
                    path: '/search',
                    component: resolve => require(['../components/app/search.vue'], resolve)
                },
                {
                    path: '/main',
                    component: resolve => require(['../components/app/main.vue'], resolve)
                }
            ]
        }
        //,
        //{
        //    path: '/login',
        //    component: resolve => require(['../components/page/Login.vue'], resolve)
        //},
    ]
})
