<template>
  <div class="component_content index_top">
    <div class="title">
      <img src="../../assets/img/logo.png" alt="LOGO"/>
      图像搜集与管理系统
    </div>
    <index-nav-bar></index-nav-bar>
    <index-top-user-info></index-top-user-info>
    <search-input></search-input>
  </div>
</template>

<script>
  import IndexNavBar from './navbar/index-navbar'
  import IndexTopUserInfo from '../user/user-info/index-top-user-info'
  import SearchInput from '../search/search-input'

  export default {
    name: "IndexTop",
    components: {
      IndexNavBar,
      IndexTopUserInfo,
      SearchInput
    },
    data() {
      return {}
    },
    mounted() { }
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
      float: left;
      width: 300px;

      img {
        vertical-align: middle;
        width: 18px;
      }
    }
  }

</style>
