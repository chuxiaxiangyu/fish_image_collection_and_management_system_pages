// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import './assets/css/normalize.less'
import 'font-awesome/css/font-awesome.min.css'
import preview from 'vue-photo-preview';
import 'vue-photo-preview/dist/skin.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(preview);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

/**
 * 进度条
 */
router.beforeEach((to, from, next) => {
    NProgress.start();
    next()
});

router.afterEach(transition => {
  NProgress.done();
});
