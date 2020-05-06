import Vue from 'vue'
import Router from 'vue-router'

const LoginModule = resolve => require(['@/components/user/login/login-module'], resolve);
const Login = resolve => require(['@/components/user/login/login'], resolve);
const Register = resolve => require(['@/components/user/login/register'], resolve);
const Find = resolve => require(['@/components/user/login/find'], resolve);
const Index = resolve => require(['@/components/index/index'], resolve);
const FishImg = resolve => require(['@/components/images/image-list'],resolve);
const RealTimeSearch = resolve => require(['@/components/search/real-time-search'],resolve);
const RecommendSystem = resolve => require(['@/components/user/recommend-system/recommend'],resolve);
const RecommendImage = resolve => require(['@/components/user/recommend-system/recommend-image'],resolve);

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/', name: 'LoginModule', component: LoginModule, children: [
        {path: '/', name: 'Login', component: Login},
        {path: '/login', name: 'Login', component: Login},
        {path: '/register', name: 'Register', component: Register},
        {path: '/find', name: 'Find', component: Find}
      ]
    },
    {
      path: '/index', name: 'Index', component: Index, children:[
        {path:'/index', name: 'RecommendImage', component: RecommendImage},
        {path:'/real-time-search', name: 'RealTimeSearch', component: RealTimeSearch},
        {path:'/recommend-system', name: 'RecommendSystem', component: RecommendSystem}
      ]
    }
  ]
})
