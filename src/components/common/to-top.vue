<template>
  <div class="to-top">
    <img src="../../assets/img/toTop.png" @click="goTop" alt="">
  </div>
</template>

<script>
  export default {
    name: "to-top",
    data(){
      return{}
    },
    methods:{
      goTop(){
        let high = document.documentElement.scrollTop;
        let timer = setInterval(_=>{
            document.documentElement.scrollTop = document.documentElement.scrollTop - high/50;
            if(document.documentElement.scrollTop === 0){
              clearInterval(timer);
            }
        },10)
      }
    },
    created(){
    }
  }
</script>

<style scoped lang="less">
  .to-top{
    width: 87px;
    height: 70px;
    img{
      width: 100%;
      height: 100%;
      opacity: 0.5;
      transition: all .5s ;
    }
    img:hover{
      opacity: 1;
    }
  }
</style>
