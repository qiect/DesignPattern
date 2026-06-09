import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/pages/HomePage.vue';
import CategoryPage from '@/pages/CategoryPage.vue';
import PatternDetailPage from '@/pages/PatternDetailPage.vue';
import ComparePage from '@/pages/ComparePage.vue';
const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/search',
        name: 'search',
        component: CategoryPage,
    },
    {
        path: '/creational',
        name: 'creational',
        component: CategoryPage,
        props: { category: 'creational' },
    },
    {
        path: '/structural',
        name: 'structural',
        component: CategoryPage,
        props: { category: 'structural' },
    },
    {
        path: '/behavioral',
        name: 'behavioral',
        component: CategoryPage,
        props: { category: 'behavioral' },
    },
    {
        path: '/pattern/:id',
        name: 'pattern',
        component: PatternDetailPage,
    },
    {
        path: '/compare',
        name: 'compare',
        component: ComparePage,
    },
];
const router = createRouter({
    history: createWebHistory('/DesignPattern/'),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});
export default router;
