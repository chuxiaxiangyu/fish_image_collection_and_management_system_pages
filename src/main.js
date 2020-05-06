// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../router'
import ElementUI from 'element-ui';
import { Message,Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import './assets/css/normalize.less'
import 'font-awesome/css/font-awesome.min.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {store} from '../vuex/index';
import VueLazyLoad from 'vue-lazyload'
import Moment from 'vue-moment'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueLazyLoad);
Vue.use(Moment);
Vue.use(preview)

/**
 * 路由监听
 */
router.beforeEach((to, from, next) => {
  if(to.path !=='/login' && to.path !=='/find' && to.path !== '/register' && to.path !== '/'){
    if(window.localStorage.getItem('username')){
      NProgress.start();
      next()
    }else{
      Notification.error({
        title: '错误',
        message: '用户未登录，将返回登录页面',
        offset: 70,
        duration: 2500
      });
      setTimeout(_ => {
        next({path:'/login'})
      },1500);
    }
  }else{
    next()
  }
});

router.afterEach(transition => {
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
