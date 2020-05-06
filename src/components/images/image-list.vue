<template>
  <div @scroll="handleScroll()">
    <transition name="el-fade-in">
      <to-top class="to-top" v-if="goToTop"></to-top>
    </transition>
    <ul class="img_ul">
      <img-and-text v-for="(item,index) in images" :item="item" :key="index"></img-and-text>
    </ul>
    <div
      style="width: 100%;margin-top: 30px"
      class="loading"
      v-if="loadingMore"
    >
      <img src="../../assets/img/loading.gif" alt="">
      <p>加载更多</p>
    </div>
  </div>
</template>

<script>
  import ImgAndText from './img-and-text'
  import ToTop from '../common/to-top'

  export default {
    name: "FishImgs",
    components: {
      ImgAndText,
      ToTop
    },
    props:['imagesObj'],
    data() {
      return {
        imgs: [],
        isDownload: false,
        loadingMore: false,
        percentage:0,
        downloading:false,
        goToTop:false,
        images: [],
        someData: [],
        count: 1,
      }
    },
    methods: {
      /**
       * 监听滚动条，加载更多
       */
      scroll() {
        let isLoading = false;
        window.onscroll = () => {
          this.goToTop = document.documentElement.scrollTop > 500;
          let bottomOfWindow = document.documentElement.scrollHeight - document.documentElement.scrollTop <= 1500;
          if (bottomOfWindow && isLoading === false && document.documentElement.scrollTop > 200) {
            isLoading = true;
            this.loadingMore = true;
            this.count++;
            setTimeout(_ => {
              if(this.count * 100 > this.imagesObj.length || this.count * 100 >= window.localStorage['current_search_num']){
                this.images = this.imagesObj;
              }else{
                this.images = this.imagesObj.slice(0, this.count * 100);
                isLoading = false;
              }
              this.loadingMore = false;
            }, 2000);
          }
        }
      },

    },
    created(){
      this.scroll();
    },
    async mounted() {
      this.images = this.imagesObj.slice(0,this.count*100);
    }
  }
</script>

<style scoped lang="less">
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 10px;

    &::after {
      content: "";
      flex-grow: 99999;
    }
  }
  .to-top{
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 99999;
    cursor: pointer;
  }
  .loading {
    text-align: center;

    p {
      font-size: 17px;
      line-height: 40px;
      color: #d69645;
    }
  }
</style>
