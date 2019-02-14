<template>
  <div class="component_content index">
    <index-top></index-top>
    <img v-for="(img,index) in imgs" :src="img.url" :key="index" />
    <!--{{// imgs}}-->
  </div>
</template>

<script>
  import IndexTop from './IndexTop'
  import { getFishImg } from "../../api/fish/getFishImg";

  export default {
    name: "Index",
    components:{
      IndexTop
    },
    data(){
      return{
        imgs:[]
      }
    },
    async mounted(){
      let result = await getFishImg();
      this.imgs = result;
      console.log(this.imgs);
    }
  }
</script>

<style lang="less" scoped>
  img{
    height: 200px;
    margin: 10px 0 0 10px;
  }
</style>
