import { createApp } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import ApiClient from './apis/api-client';
import installElementPlus from './plugins/element';
import installComponent from './plugins/component';
import './theme/font-awesome/css/font-awesome.css';
import './theme/index.scss';

const axiosInstance = axios.create({
  baseURL: '/api',
});
axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});
ApiClient.setInstance(axiosInstance);
ApiClient.afterError((error) => {
  ElMessage.error(error.message);
  if (error.statusCode === 401) {
    localStorage.removeItem('token');
    router.replace({
      name: 'Login',
    });
  }
});

const app = createApp(App);
installElementPlus(app);
installComponent(app);
app.use(store).use(router).mount('#app');
