<template>
  <div class="user_info">
    <el-dropdown
      class="dropdown"
      @command="commandHandler"
      :show-timeout="100"
      placement="bottom-end"
      @visible-change="dropDownMenuSlideToggleHandler"
    >
      <span
        class="el-dropdown-link"
      >
        你好，{{name}}
        <i class="el-icon--right" :class="[elIconArrow]"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="cancellationAccountHandler">退出账号</el-dropdown-item>
        <el-dropdown-item command="userInfo" :disabled="true">个人信息</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: "IndexTopUserInfo",
    data() {
      return {
        name: window.localStorage['username'],
        elIconArrow:'el-icon-arrow-down'
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
                this.$notify.success({
                  title: '成功',
                  message: '退出账号成功',
                  offset:70,
                  duration:2500
                });
                this.$store.commit('goRouter', 'index');
                setTimeout(_ => {
                  this.$router.push('/login');
                  window.localStorage.clear();
                }, 1500);
              })
              .catch(_ => {});
            break;
          case 'userInfo':
            break;
        }
      },

      /**
       * el-dropdown-menu菜单出现/消失时，将小图标的方向置为up/down
       */
      dropDownMenuSlideToggleHandler(val){
        this.elIconArrow = 'dropdownAnimate ' +  ( val ? 'el-icon-arrow-down' : 'el-icon-arrow-up' );
        setTimeout(_=>{
          this.elIconArrow = val ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
        },200)
        // this.elIconArrow = val ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
      },
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
    float: right;
    .dropdown {
      color: #c4c4c4;
    }
    .el-dropdown-link{
      cursor: pointer
    }
  }

  .dropdownAnimate{
    transition: all 0.2s;
    transform : rotate(180deg);
  }
</style>
