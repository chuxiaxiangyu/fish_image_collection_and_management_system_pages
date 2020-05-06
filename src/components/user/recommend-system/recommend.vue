<template>
  <div class="recommend">
    <div class="left">
      <search-history class="search_history"></search-history>
    </div>
    <div class="left">
      <recommend-options class="recommend_options"></recommend-options>
      <recommend-coefficient class="recommend_coefficient"></recommend-coefficient>
    </div>
  </div>
</template>

<script>
  import Axios from 'axios';
  import SearchHistory from './search-history/history'
  import RecommendOptions from './recommend-options/recommend-options'
  import RecommendCoefficient from './recommend-coefficient/recommend-coefficient'

  export default {
    name: "recommend",
    components:{
      SearchHistory,
      RecommendOptions,
      RecommendCoefficient
    },
    data(){
      return{
        animation:'',
        ifShow:false
      }
    },
    methods:{

    },
    async mounted(){
      // await Axios.post('http://127.0.0.1:5000/process-img/',{
      //   name:'sjn',
      //   images:['https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4132171877,4055102312&fm=11&gp=0.jpg',
      //   'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4132171877,4055102312&fm=11&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3295633160,1558342933&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3295633160,1558342933&fm=26&gp=0.jpg',
      //   'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3295633160,1558342933&fm=26&gp=0.jpg']
      // }).then(val =>{
      //   console.log(val);
      // })
    }
  }
</script>

<style scoped lang="less">
  .recommend{
    .left{
      width: 40%;
      margin: 0 5%;
      float: left;
      .search_history,.recommend_options,.recommend_coefficient{
        padding: 50px 0;
      }
    }
  }
</style>
