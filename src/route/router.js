import { createRouter, createWebHistory } from 'vue-router';
import MyPage from '../views/MyPage.vue';
const routes = [
    {
        path: '/page',
        name: 'page',
        component: MyPage
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
});
export default router;