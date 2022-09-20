import { RouteRecordRaw } from 'vue-router';

export const route: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/views/index/index.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/index.vue'),
        meta: { title: '我的' }
    }
]