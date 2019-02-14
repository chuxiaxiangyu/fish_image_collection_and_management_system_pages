<template>
  <div class="back">
    <div class="form">
      <div class="top">
        <p class="text">注册</p>
      </div>
      <div class="bottom">
        <form action="" method="post" class="login">
          <ul class="ul_1">
              <li class="li_1">
                  <input class="input" v-model="form.username" maxlength="16" type="text" placeholder="请输入用户名"/>
              </li>
              <li class="li_1">
                  <input class="input" v-model="form.password" maxlength="16" type="password" placeholder="请输入密码">
              </li>
              <li>
                  <input class="input" v-model="form.againPassword" maxlength="16" type="password" placeholder="请确认密码">
              </li>
          </ul>
          <ul class="ul_2">
              <li class="li_3">
                  <router-link :to="{path:'/login'}">已有账号,去登陆</router-link>
              </li>
          </ul>
          <button type="button" id="button" class="button" @click="register">注册</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {register} from "../../../api/user/login";

  export default {
    name: "Register",
    data() {
      return {
        form: {},
      }
    },
    methods: {
      /**
       * 注册
       * @returns {Promise<void>}
       */
      async register() {
        if (this.form.password !== this.form.againPassword) {
          this.$message.error('两次密码不一致');
          return
        }
        if (!this.form.password || !this.form.username ) {
          this.$message.error('请输入用户名或密码');
          return
        }
        let result = await register({
          username:this.form.username+'',
          password:this.form.password+''
        });
        if(result.status === 200){
          this.$message.success("注册成功");
          window.localStorage.clear();
          setTimeout(_=>{
            this.$router.push('/login');
          },2000)
        }else{
          this.$message.error(result.message)
        }
      },
    },
    mounted () {}
  }
</script>

<style lang="less" scoped>

   @import '../../../assets/css/normalize.less';
   @import '../../../assets/css/loginModule.less';

  .form {
    height: 330px;
  }

  .bottom .ul_1 {
    height: 107px;
    .li_1 {
      border-bottom: 1px solid @primaryColor;
    }
  }

</style>
