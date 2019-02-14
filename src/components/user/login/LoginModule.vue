<template>
  <div class="login_back">
    <transition appear name="list" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
        return {
        }
    },
    mounted(){
    }
  }
</script>

<style lang="less" scoped>
   @import '../../../assets/css/normalize.less';
  .login_back {
    width: 100%;
    height: 100%;
    background: url('../../../assets/img/back.png') no-repeat;
    background-size: cover;
    overflow: hidden;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
  }
</style>
