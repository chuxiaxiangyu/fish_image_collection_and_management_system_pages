<template>
  <div>
    <img v-for="(item,index) in imgs" :src="item.url" alt="">
  </div>
</template>

<script>
  import {getFishImg} from "../../api/fish/getFishImg";

  export default {
    name: "FishImgs",
    data() {
      return {
        imgs: []
      }
    },
    async mounted() {
      let result = await getFishImg();
      if (result.status === 200) {
        this.imgs = result.data;
      } else {
        this.$message.error(result.message);
      }
    }
  }
</script>

<style scoped lang="less">
  img{
    height: 200px;
    margin: 10px 0 0 10px;
  }
</style>
