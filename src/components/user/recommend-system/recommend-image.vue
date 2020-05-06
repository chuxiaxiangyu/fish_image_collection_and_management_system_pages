<template>
  <div class="recommend_image">
    <div
      style="width: 100%"
      class="loading"
      v-if="loading"
    >
      <img src="../../../assets/img/loading.gif" alt="">
      <p>正在获取推荐图片</p>
    </div>
    <image-list :imagesObj="images" v-else></image-list>
    <div class="no_image" v-if="!isHaveRecommendImages">
      <img src="../../../assets/img/no-image.jpg" alt="" >
      <p>暂无推荐图片</p>
    </div>
  </div>
</template>

<script>
  import ImageList from '../../images/image-list'
  import {getRecommendList} from "../../../api/user/recommend";
  import Axios from 'axios'

  export default {
    name: "recommend-image",
    components:{
      ImageList
    },
    data(){
      return{
        images:[],
        loading:false,
        isHaveRecommendImages:true
      }
    },
    async mounted() {
      this.loading = true;
      let result = await getRecommendList({
        username:window.localStorage['username']
      });
      if(result.status === 200){
        setTimeout(async () =>{
          this.loading = false;
          // let last_result = await Axios.post('http://127.0.0.1:5000/process-img/' , {
          //   images:result.data
          // });
          this.images = result.data;
          this.$notify.success({
            title:'成功',
            message:`已为您推荐${this.images.length}张图片`,
            offset:70,
            duration:2500
          })
        },1000);
        this.isHaveRecommendImages = true;
      }else{
        this.$notify.error({
          title:'错误',
          message:result.message,
          offset:70,
          duration:2500
        });
        this.isHaveRecommendImages = false;
      }
    }
  }
</script>

<style scoped lang="less">
  .loading {
    text-align: center;
    margin-top: 200px;
    p {
      font-size: 17px;
      line-height: 40px;
      color: #d69645;
    }
  }

  .no_image{
    text-align: center;
    img{
      margin: 100px auto 0;
    }
    p{
      font-size: 20px;
      color: #aaa;
      margin-top: 30px;
    }
  }
</style>
