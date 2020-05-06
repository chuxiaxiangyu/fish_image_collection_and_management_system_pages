<template>
  <div class="back">
    <div class="form">
      <div class="top">
        <p class="text">登录</p>
      </div>
      <div class="bottom">
        <form action="" method="post" class="login">
          <ul class="ul_1">
            <li class="li_1">
              <input class="input" v-model="form.username" type="text" maxlength="16" placeholder="请输入用户名"/>
            </li>
            <li class="li_1">
              <input class="input" v-model="form.password" type="password" maxlength="16" placeholder="请输入密码">
            </li>
            <li class="li_2">
              <input class="input" v-model="form.verification" type="text" maxlength="4" placeholder="请输入验证码">
              <verification :key="verification_key"></verification>
            </li>
          </ul>
          <ul class="ul_2 clearfix">
            <li class="li_3">
              <router-link :to="{path:'/register'}">注册账号</router-link>
            </li>
            <li class="li_4">
              <router-link :to="{path:'/find'}">找回密码</router-link>
            </li>
          </ul>
          <button type="button" id="login" class="button" @click="login">
            <span>
              <i :class="{'el-icon-loading': isLogining}" style="margin-right: 10px"></i>
              {{isLogining ? '正在登陆':'登陆'}}
            </span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from "../../../api/user/login";
  import verification from './verification-code'

  export default {
    name: "Login",
    components:{
      verification
    },
    data() {
      return {
        isLogining: false,
        form: {
          username: '',
          password: '',
          verification:''
        },
        verification_key:Math.random()
      }
    },
    methods: {
      /**
       * 设置缓存
       */
      setData() {
        window.localStorage.setItem('username', this.form.username);
        window.localStorage.setItem('password', this.form.password);
      },
      /**
       * 获取缓存
       */
      getData(){
        this.form.username = window.localStorage['username'];
        this.form.password = window.localStorage['password'];
      },
      async loginRequest(username,password){
        let result = await login({
          username:username + '',
          password:password + ''
        });
        if(result.status === 200){
          this.$notify.success({
            title: "成功",
            message: "登陆成功",
            offset: 70,
            duration: 2500
          });
          this.setData();
          setTimeout(_=>{
            window.localStorage.removeItem('verification');
            this.$router.push('/index');
          },2000)
        }else{
          this.isLogining = false;
          document.getElementById("login").removeAttribute('disabled');
          document.getElementById("login").style.backgroundColor = '#2975c3';

          this.$notify.error({
            title: "错误",
            message: result.message,
            offset: 70,
            duration: 2500
          });
        }
      },
      /**
       * 登录
       * @returns {Promise<void>}
       */
      async login() {
        this.verification_key = Math.random();
        if (this.form.password === '' || this.form.username === '') {
          this.$notify.error({
            title: '错误',
            message: '请输入用户名或密码',
            offset: 70,
            duration: 2500
          });
          return
        }
        if( !this.form.verification.toLowerCase() || this.form.verification.toLowerCase() !== window.localStorage['verification'].toLowerCase()){
          this.$notify.error({
            title: '错误',
            message: '请正确输入验证码',
            offset: 70,
            duration: 2500
          });
          return
        }
        this.isLogining = true;
        document.getElementById("login").setAttribute('disabled', 'disabled');
        document.getElementById("login").style.backgroundColor = '#82abd5';
        this.loginRequest(this.form.username,this.form.password);
      },


    },
    mounted() {
      this.$nextTick(_=>{
        if (window.localStorage['username'] && window.localStorage['password']) {
          this.getData();
          this.loginRequest(this.form.username,this.form.password);
        }
      });
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../assets/css/normalize.less';
  @import '../../../assets/css/loginModule.less';

  .form {
    height: 336px;
  }
  .ul_1{
    height: 107px;
    .li_1 {
      border-bottom: 1px solid @primaryColor;
    }
  }
  .ul_2{
    .li_3{
      float: left;
    }
    .li_4{
      float: right;
    }
  }
  .el-icon-loading {
    font-size: 13px;
    width: 13px;
    height: 13px;
  }
</style>
