import { RouteRecordRaw } from 'vue-router';

export const route: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/views/index/index.vue'),
        meta: { title: '้ฆ้กต' }
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/mine/index.vue'),
        meta: { title: 'ๆ็' }
    }
]