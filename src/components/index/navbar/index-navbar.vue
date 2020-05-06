<template>
  <div class="index_nav_bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b">
      <el-menu-item index="index">推荐</el-menu-item>
      <el-menu-item index="real-time-search">实时爬取</el-menu-item>
      <el-menu-item index="recommend-system">推荐系统</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: "IndexNavBar",
    data(){
      return{
      }
    },
    methods:{
      handleSelect(index){
        this.$store.commit('goRouter',index);
      }
    },
    computed:{
      activeIndex(){
        return this.$store.getters.getRouter;
      }
    },
    mounted(){
      //虚拟DOM挂载
      this.$nextTick(() => {
        //DOM元素挂载
        //do something
      })
    }
  }
</script>

<style scoped>
  .el-menu.el-menu--horizontal{
    border-bottom: none;
  }
  .index_nav_bar{
    position: relative;
    float: left;
  }
</style>
