import Vue from 'vue'
import Router from 'vue-router'

const LoginModule = resolve => require(['@/components/user/login/LoginModule'], resolve);
const Login = resolve => require(['@/components/user/login/Login'], resolve);
const Register = resolve => require(['@/components/user/login/Register'], resolve);
const Find = resolve => require(['@/components/user/login/Find'], resolve);
const IndexPage = resolve => require(['@/components/index/IndexPage'], resolve);


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', name: 'LoginModule', component: LoginModule, children: [
        {path: '/', name: 'Login', component: Login},
        {path: '/login', name: 'Login', component: Login},
        {path: '/register', name: 'Register', component: Register},
        {path: '/find', name: 'Find', component: Find}
      ]
    },
    {path: '/index', name: 'IndexPage', component: IndexPage}
  ]
})