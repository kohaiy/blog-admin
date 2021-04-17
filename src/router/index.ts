import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, form, next) => {
  const token = localStorage.getItem('token');
  // 没有 token 且需要鉴权
  if (!token && to.meta.auth !== false) {
    next({
      name: 'Login',
    });
  }
  next();
});

export default router;
