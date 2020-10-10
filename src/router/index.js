import Vue from 'vue';
import VueRouter from 'vue-router';

import About from '@/views/About.vue';
import Home from '@/views/Home.vue';
import Items from '@/views/Items.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
  },
  {
    path: '/item/:key',
    name: 'Item',
    component: () => import('@/views/Item.vue'),
    props: { key: null },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
