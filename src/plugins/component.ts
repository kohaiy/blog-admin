import { App } from 'vue';
import KContainer from '@/pages/layouts/k-container.vue';

export default (app: App) => {
  app.component('KContainer', KContainer);
};
