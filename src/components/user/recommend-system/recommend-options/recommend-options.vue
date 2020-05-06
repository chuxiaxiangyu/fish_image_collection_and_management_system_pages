<template>
  <div class="recommend_options">
    <h2>推荐配置</h2>
    <el-form :model="recommend_options" class="recommend_form" :inline="false" label-width="100px">
      <el-form-item prop="recommend_type" label="推荐参考对象">
        <el-select v-model="recommend_options.recommend_type" style="width: 250px">
          <el-option value="self_search" label="根据自己的搜索历史推荐"></el-option>
          <el-option value="together_search" label="搜索内容联想推荐" :disabled="true" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="recomment_count" label="推荐数量">
        <el-input v-model="recommend_options.recomment_count" placeholder="请输入图片集的数量（默认为100）" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 80px;margin-left: 50px" @click="changeRecommendOptions">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {changeRecommendOptions,getRecommendOptions} from "../../../../api/user/recommend";

  export default {
    name: "recommend-options",
    data(){
      return{
        recommend_options:{
          recommend_type:'self_search',
          recomment_count:''
        },
        isOk:true
      }
    },
    methods:{
      /**
       * 修改推荐配置项
       * @returns {Promise<void>}
       */
      async changeRecommendOptions(){
        if(!this.isOk){
          this.$notify.error({
            title:'失败',
            message:'请勿频繁修改',
            offset: 70,
            duration: 2500
          });
          return;
        }
        this.isOk = false;
        setTimeout(_=>{
          this.isOk = true
        },5000);
        let result = await changeRecommendOptions({
          username:window.localStorage['username'],
          recommend_options:{
            recommend_type: this.recommend_options.recommend_type,
            recomment_count: +this.recommend_options.recomment_count || 0
          }
        });
        if(result.status === 200){
          this.$notify.success({
            title:'成功',
            message:'推荐配置修改成功',
            offset: 70,
            duration: 2500
          })
        }else{
          this.$notify.error({
            title:'失败',
            message:'推荐配置修改失败',
            offset: 70,
            duration: 2500
          })
        }
      }
    },
    async mounted() {
      let result = await getRecommendOptions({
        username: window.localStorage['username']
      });
      if (result.status === 200) {
        this.recommend_options = result.data
      }else {
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
  .recommend_options{
    .recommend_form{
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
