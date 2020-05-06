<template>
  <div class="search-input-div">
    <div class="htmleaf-container">
      <div class="search-wrapper">
        <div class="input-holder">
          <input type="text" v-model="searchData" class="search-input" placeholder="请输入搜索内容" @blur="searchBlur($event)"/>
          <button class="search-icon" @click="searchImages($event)">
            <span></span>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "search-input",
    data(){
      return {
        searchData:'',
        dialogVisible:false
      }
    },
    computed:{

    },
    watch:{

    },
    methods:{
      /**
       * 点击搜索按钮
       * @param e
       */
      searchImages(e){
        let container = document.getElementsByClassName('search-wrapper')[0];
        let input = document.getElementsByClassName('search-input')[0];
        if(!container.classList.contains('active')){
          input.focus();
          container.classList.add('active');
          e.preventDefault();
        }else{
          if(this.searchData !== '') {
            if(this.$route.path === '/real-time-search' && this.searchData === window.localStorage['current_search_content']){
              this.$notify.warning({
                title: '警告',
                message: '搜索条件没有改变，不要重复搜索',
                offset:70,
                duration:2500
              });
            }else{
              this.$store.commit('goRouter','real-time-search');
              this.$router.push(`/real-time-search?search=${this.searchData}&num=100`);
              container.classList.remove('active');
              this.searchData = '';
            }
          }
        }
      },
      /**
       * 搜索框失去焦点
       */
      searchBlur(e){
        let container = document.getElementsByClassName('search-wrapper')[0];
        let clickTarget = document.getElementsByClassName('search-icon')[0];
        let input = document.getElementsByClassName('search-input')[0];
        if(e.relatedTarget === clickTarget) {
          input.focus();
          return;
        }
        if(container.classList.contains('active')){
          if(this.searchData === ''){
            container.classList.remove('active');
          }
        }
      }
    },
    mounted(){
      this.$nextTick(_=>{
        if(this.searchData){
          let container = document.getElementsByClassName('search-wrapper')[0];
          container.classList.add('active');
        }
      });
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/css/normal.css';
  @import '../../assets/css/default.css';
  @import '../../assets/css/search-form.css';

  .htmleaf-container{
    float: right;
    margin-right: 20px;
    margin-top: 10px;
  }

  .search-input-div{
    position: relative;
  }
</style>
