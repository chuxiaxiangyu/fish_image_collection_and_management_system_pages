<template>
  <div class="component_content index">
    <index-top class="index_top"></index-top>
    <div class="index_main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import IndexTop from './index-top'

  export default {
    name: "Index",
    components:{
      IndexTop
    },
    data(){
      return {}
    }
  }
</script>

<style lang="less" scoped>
  .index_top{
    width: 100%;
    top: 0;
    height: 60px;
    position: fixed;
  }
  .index_main{
    padding: 60px 0 30px 0;
  }
  .el-header,.el-main{
    padding: 0;
  }
</style>
