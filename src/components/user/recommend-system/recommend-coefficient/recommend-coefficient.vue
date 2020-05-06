<template>
  <div class="recommend_coefficient">
    <h2>推荐系数<span>（推荐的图片集24小时更新一次）</span></h2>
    <el-table :data="recommend_coefficient" border style="margin-top: 20px">
      <el-table-column prop="key" label="推荐主题" align="center"></el-table-column>
      <el-table-column prop="value" label="权重" align="center">
        <template slot-scope="scope">
          {{scope.row.value+'%'}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {getRecommendCoefficient} from "../../../../api/user/recommend";

  export default {
    name: "recommend-coefficient",
    data() {
      return {
        recommend_coefficient: []
      }
    },
    async mounted() {
      let result = await getRecommendCoefficient({
        username: window.localStorage['username']
      });
      if (result.status === 200) {
        for ([key, value] of Object.entries(result.data)) {
          this.recommend_coefficient.push({
            key: key,
            value: value
          })
        }
        this.recommend_coefficient = this.recommend_coefficient.sort((a, b) => {
          return b.value - a.value;
        });
      } else {
        this.$notify.error({
          title: '错误',
          message: '获取推荐系数失败',
          offset: 70,
          duration2500
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .recommend_coefficient {
    h2 {
      span {
        font-size: 14px;
        font-weight: normal;
      }
    }
  }
</style>
