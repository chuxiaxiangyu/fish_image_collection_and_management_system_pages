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
            <li class="li_2">
              <input class="input" v-model="form.password" type="password" maxlength="16" placeholder="请输入密码">
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

  export default {
    name: "Login",
    data() {
      return {
        isLogining: false,
        form: {
          username: '',
          password: ''
        }
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
      /**
       * 登录
       * @returns {Promise<void>}
       */
      async login() {
        if (this.form.password === '' || this.form.username === '') {
          this.$message.error('请输入用户名或密码');
          return
        }
        this.isLogining = true;
        document.getElementById("login").setAttribute('disabled', 'disabled');
        document.getElementById("login").style.backgroundColor = '#82abd5';
        let result = await login({
          username:this.form.username+'',
          password:this.form.password+''
        });
        this.isLogining = false;
        document.getElementById("login").removeAttribute('disabled');
        document.getElementById("login").style.backgroundColor = '#2975c3';
        if(result.status === 200){
          this.$message.success('登陆成功');
          this.setData();
          setTimeout(_=>{
            this.$router.push('/index');
          },2000)
        }else{
          this.$message.error(result.message)
        }
      },


    },
    mounted() {
      if (window.localStorage['username'] && window.localStorage['password']) {
        this.getData();
      }
    }
  }
</script>

<style lang="less" scoped>

  @import '../../../assets/css/normalize.less';
  @import '../../../assets/css/loginModule.less';

  .form {
    height: 300px;
  }
  .ul_1{
    height: 71px;
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
