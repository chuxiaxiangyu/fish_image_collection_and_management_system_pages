<template>
  <div class="user_info">
    你好，{{name}}
    <el-dropdown class="dropdown" @command="commandHandler" show-timeout="100">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="cancellationAccountHandler">退出账号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "IndexTopUserInfo",
    data() {
      return {
        name: window.localStorage['username']
      }
    },
    methods: {
      /**
       * 注销账号
       */
      commandHandler(command) {
        switch (command) {
          case 'cancellationAccountHandler' :
            this.$confirm('确认退出账号？')
              .then(_ => {
                this.$message.success('退出账号成功。');
                setTimeout(_ => {
                  this.$router.push('/login');
                  window.localStorage.clear();
                }, 1500);
              })
              .catch(_ => {});
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .user_info {
    height: 20px;
    line-height: 20px;
    margin-top: 20px;
    color: #c4c4c4;
    font-size: 14px;
    text-align: right;
    margin-right: 20px;

    .dropdown {
      color: #c4c4c4;
    }
  }
</style>
