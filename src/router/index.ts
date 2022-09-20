import { createWebHashHistory, createRouter } from 'vue-router';
import { route as routes } from './route';

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title as string;
    }
    next()
})

export default router;