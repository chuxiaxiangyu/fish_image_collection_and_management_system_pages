<template>
  <div class="search-history">
    <h2>搜索历史</h2>
    <div class="radio">
      <el-radio-group v-model="reverse" @change="reverseChange">
        <el-radio label="time_z">时间最久</el-radio>
        <el-radio label="time_d">时间最近</el-radio>
        <el-radio label="count_z">搜索次数最少</el-radio>
        <el-radio label="count_d">搜索次数最多</el-radio>
      </el-radio-group>
    </div>
    <el-timeline>
      <el-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.date"
        :color="getColor()"
        placement="top">
        <el-card>
          <h4 :title="activity.searchData">{{activity.searchData}}</h4>
          <p style="margin-top: 15px">共搜索<span style="margin: 0 5px;font-weight: 700">{{activity.count}}</span>次</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <p class="seeMore" v-if="isHaveMore">
      <el-link type="primary" @click="seeMore" v-if="!loadingMore">查看更多</el-link>
      <img src="../../../../assets/img/loading.gif" width="50" v-else alt="">
    </p>
  </div>
</template>

<script>
  import {getSearchHistory} from "../../../../api/user/recommend";
  import {getRandomColor} from "../../../../../util/animate";

  export default {
    name: "history",
    data() {
      return {
        activities: [],
        search_history: [],
        history_origin:[],
        count:1,
        isHaveMore:false,
        loadingMore:false,
        reverse:'time_d'
      }
    },
    methods: {
      /**
       * 查看更多
       */
      seeMore(){
        this.search_history.length > this.activities.length && this.count++;
        this.loadingMore = true;
        setTimeout(_=>{
          this.activities = this.search_history.slice(0,this.count*10);
          this.isHaveMore = this.search_history.length > this.activities.length;
          this.loadingMore = false;
        },2000);
      },
      /**
       * 得到不同的颜色
       * @returns {*}
       */
      getColor(){
        return getRandomColor(0,255);
      },
      /**
       * 搜索历史排序
       * @param val
       */
      reverseChange(val){
        switch (val) {
          case 'time_z':
            this.search_history = this.history_origin.sort((a,b) => {
              return new Date(a.date).getTime() - new Date(b.date).getTime()
            });
            break;
          case 'time_d':
            this.search_history = this.history_origin.sort((a,b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime()
            });
            break;
          case 'count_z':
            this.search_history = this.history_origin.sort((a,b) => {
              return a.count - b.count
            });
            break;
          case 'count_d':
            this.search_history = this.history_origin.sort((a,b) => {
              return b.count - a.count
            });
            break;
        }
        this.count = 1;
        this.activities = this.search_history.slice(0,this.count*10);
        if(this.search_history.length > this.activities.length){
          this.isHaveMore = true
        }
      }
    },
    async mounted() {
      let result = await getSearchHistory({
        username: window.localStorage['username']
      });
      if (result.status === 200) {
        this.history_origin = result.data;
        this.search_history = this.history_origin.sort((a,b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        });
        this.activities = this.search_history.slice(0,this.count*10);
        if(this.search_history.length > this.activities.length){
          this.isHaveMore = true
        }
      } else {
        this.$notify.error({
          title: '错误',
          message: result.message,
          offset: 70,
          duration: 2500
        })
      }
    }
  }
</script>

<style scoped lang="less">

  .search-history{
    h2{
      font-size: 18px;
      color: #3e3e3e;
      margin-bottom: 20px;
    }
    h4{
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .seeMore{
      margin-top: 10px;
      text-align: center;
    }
  }

  .radio{
    margin-bottom: 20px;
  }

</style>
