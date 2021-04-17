import { App } from 'vue';
import ElementPlus from 'element-plus';
import '../element-variables.scss';
import locale from 'element-plus/lib/locale/lang/zh-cn';

export default (app: App) => {
  app.use(ElementPlus, { locale });
};
