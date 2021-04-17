import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: 'Article',
    },
    component: () => import('@/pages/layouts/k-main.vue'),
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/pages/category/index.vue'),
      },
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/pages/article/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: false,
    },
    component: () => import('@/pages/login/index.vue'),
  },
];

export default routes;
