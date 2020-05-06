<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {login} from "./api/user/login";

  export default {
    name: 'App',
    async mounted() {
      if (window.location.pathname === '/') {
        if (window.localStorage['username'] && window.localStorage['password']) {
          let result = await login({
            username:window.localStorage['username'] + '',
            password:window.localStorage['password'] + ''
          });
          if(result.status !== 200){
            this.$notify.error({
              title: "错误",
              message: "用户没有登陆，将返回登录界面重新登陆"
            });
            setTimeout(_=>{
              window.location.pathname = '/login';
              this.$store.commit('goRouter', 'login');
            },1000)
          }else{
            window.location.pathname = '/index';
            this.$store.commit('goRouter', 'index');
          }
        }
      }
      if (window.location.pathname) {
        this.$store.commit('goRouter', window.location.pathname.slice(1));
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
</style>
