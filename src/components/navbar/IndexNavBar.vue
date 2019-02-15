<template>
  <div class="index_nav_bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"

      active-text-color="#ffd04b">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2" show-timeout="100" hide-timeout="100">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "IndexNavBar",
    data(){
      return{
        activeIndex:'1'
      }
    },
    methods:{
      handleSelect(){

      }
    }
  }
</script>

<style scoped>
  .el-menu.el-menu--horizontal{
    border-bottom: none;
  }
  .index_nav_bar{
    position: relative;
  }
</style>
