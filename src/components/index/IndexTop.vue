<template>
  <div class="component_content index_top">
    <el-row>
      <el-col :span="5">
        <div class="title"><img src="../../assets/img/logo.png" alt="LOGO" width="40px"/>鱼类图像搜集与管理系统</div>
      </el-col>
      <el-col :span="15">
        <index-nav-bar></index-nav-bar>
      </el-col>
      <el-col :span="4">
        <index-top-user-info></index-top-user-info>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import IndexNavBar from '../navbar/IndexNavBar'
  import IndexTopUserInfo from '../user/IndexTopUserInfo'

  export default {
    name: "IndexTop",
    components: {
      IndexNavBar,
      IndexTopUserInfo
    },
    data() {
      return {}
    },
    mounted() {

    }
  }
</script>

<style lang="less" scoped>

  .index_top {
    z-index: 999;
    background-color: rgb(84, 92, 100);
    .title {
      line-height: 60px;
      text-align: center;
      color: #c4c4c4;
      font-size: 16px;
      img{
        vertical-align: middle;
      }
    }
  }

</style>
