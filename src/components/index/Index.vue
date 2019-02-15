<template>
  <div class="component_content index">
    <index-top class="index_top"></index-top>
    <div class="index_main">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import IndexTop from './IndexTop'
  import FishImgs from '../fish/FishImgs'

  export default {
    name: "Index",
    components:{
      IndexTop,
      FishImgs
    },
    data(){
      return{}
    }
  }
</script>

<style lang="less" scoped>
  .index_top{
    position: fixed;
    width: 100%;
    top: 0;
  }
  .index_main{
    padding: 60px 0 30px 0;
  }
</style>
