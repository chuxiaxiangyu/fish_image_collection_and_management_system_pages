<template>
  <div class="back">
    <div class="form">
      <div class="top">
        <p class="text">找回密码</p>
      </div>
      <div class="bottom">
        <form action="" method="post" class="login">
          <ul class="ul_1">
            <li class="li_1">
              <input class="input" v-model="form.username" type="text" maxlength="16" placeholder="请输入用户名"/>
            </li>
          </ul>
          <ul class="ul_2">
            <li class="li_3">
              <router-link :to="{path:'/login'}">找到密码,去登陆</router-link>
            </li>
          </ul>
          <button type="button" id="find" class="button" @click="find">找回</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import {find} from "../../../api/user/login";

  export default {
    name: "Find",
    data(){
      return{
        form:{}
      }
    },
    methods:{
      async find(){
        if(!this.form.username){
          this.$message.error('请输入用户名');
          return
        }
        let result = await find({
          username:this.form.username
        });
        if(result.status === 200){
          this.$alert(`账号：${this.form.username}\n密码：${result.data.password}`,'找回成功',{
            confirmButtonText:'确定',
            callback:()=>{
              this.$router.push('/login');
            }
          });
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../assets/css/normalize.less';
  @import '../../../assets/css/loginModule.less';

  .form {
    height: 270px;
  }
  .ul_1{
    height: 36px;
  }
  .el-icon-loading {
    font-size: 13px;
    width: 13px;
    height: 13px;
  }
</style>
