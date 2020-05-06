<template>
  <li
    class="img_li"
    @mouseenter="mouseEnterHandler($event)"
    @mouseleave="mouseLeaveHandler($event)">
    <img
      v-lazy="item.url"
      :alt="item.msg"
      :preview="1"
      :preview-text="item.msg"
      class="img"
    >
    <div class="text_div">
      <transition :name="animation">
        <p v-html="item.msg" v-if="ifShow" class="text_p"></p>
      </transition>
    </div>
  </li>
</template>

<script>
  import {getEnterOrLeaveDirection} from "../../../util/animate";

  export default {
    name: "ImgAndText",
    props: ['item'],
    data() {
      return {
        animation: '',
        ifShow: false
      }
    },
    methods: {
      /**
       * 移入处理函数
       * @param e
       * @returns {Promise<void>}
       */
      async mouseEnterHandler(e) {
        this.animation = await getEnterOrLeaveDirection(e);
        this.ifShow = true;
      },
      /**
       * 移出处理函数
       * @param e
       * @returns {Promise<void>}
       */
      async mouseLeaveHandler(e) {
        this.animation = await getEnterOrLeaveDirection(e);
        setTimeout(_ => {
          this.ifShow = false;
        });
      }
    },
    mounted(){
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/css/main.css";

  .img_li {
    flex-grow: 1;
    width: 25%;
    margin: 5px 0;
    overflow: hidden;
    position: relative;
    .img {
      min-width: 100%;
      object-fit: cover;
    }
  }

  .text_div {
    position: absolute;
    bottom: 0;
    color: #eee;
    overflow: hidden;
    width: 100%;
    .text_p {
      line-height: 30px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding-left: 10px;
      background: rgba(0, 0, 0, 0.5);
    }
  }

  .top-enter-active, .top-leave-active {
    transition: all .5s ease-in-out;
  }

  .top-enter, .top-leave-to {
    transform: translateY(-30px);
  }

  .bottom-enter-active, .bottom-leave-active {
    transition: all .5s ease-in-out;
  }

  .bottom-enter, .bottom-leave-to {
    transform: translateY(30px);
  }

  .left-enter-active, .left-leave-active {
    transition: all .5s ease-in-out;
  }

  .left-enter, .left-leave-to {
    transform: translateX(-100%);
  }

  .right-enter-active, .right-leave-active {
    transition: all .5s ease-in-out;
  }

  .right-enter, .right-leave-to {
    transform: translateX(100%);
  }
</style>
