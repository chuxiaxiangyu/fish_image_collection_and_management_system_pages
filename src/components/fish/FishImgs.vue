<template>
  <div>
    <ul class="img_ul">
      <img-and-text v-for="(item,index) in imgs" :item="item" :key="index"></img-and-text>
    </ul>
  </div>
</template>

<script>
  import {getFishImg} from "../../api/fish/getFishImg";
  import ImgAndText from './ImgAndText'

  export default {
    name: "FishImgs",
    components: {
      ImgAndText
    },
    data() {
      return {
        imgs: [],
      }
    },
    methods: {},
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
  .img_ul {
    padding: 10px;
  }
</style>
