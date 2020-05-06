<template>
  <div>
    <canvas id="canvas" width="100" height="35" @click="getNewVerification"></canvas>
  </div>
</template>

<script>
  import {getVerification} from "../../../api/user/login";
  import {getRandomNum, getRandomColor, createFontFamily} from "../../../../util/animate";

  export default {
    name: "verification-code",
    data() {
      return {
        verification: [],
        timer: null,
        timers: {
          st1: null,
          st2: null,
          st3: null,
          st0: null
        },
        width: '',
        height: '',
      }
    },
    methods: {

      /**
       * 获取验证码
       * @returns {Promise<void>}
       */
      async getVerification() {
        let result = await getVerification();
        this.verification = result.data.split(',');
        window.localStorage.setItem('verification', this.verification.join(''));
      },

      async getNewVerification() {
        clearInterval(this.timer);
        clearTimeout(this.timers.st0);
        clearTimeout(this.timers.st1);
        clearTimeout(this.timers.st2);
        clearTimeout(this.timers.st3);
        await this.getVerification();
        this.writeVerification();
      },

      /**
       * 画干扰元素
       * @param ctx
       */
      drawLine(ctx) {
        //画曲线
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = getRandomColor(90, 180);
          ctx.beginPath();
          let startHeight = getRandomNum(0, this.height);
          ctx.moveTo(0, startHeight);
          ctx.bezierCurveTo(getRandomNum(0, this.width), getRandomNum(0, this.height), getRandomNum(0, this.width), getRandomNum(0, this.height), this.width, getRandomNum(0, this.height));
          ctx.stroke();
        }
        //画点
        for (let i = 0; i < 20; i++) {
          ctx.fillStyle = getRandomColor(0, 255);
          ctx.beginPath();
          ctx.arc(getRandomNum(0, this.width), getRandomNum(0, this.height), 1, 0, 2 * Math.PI);
          ctx.fill();
        }
      },
      writeVerification() {
        let canvas = document.getElementById("canvas");
        let num = 4;
        this.width = canvas.width;
        this.height = canvas.height;
        let ctx = canvas.getContext("2d");
        ctx.textBaseline = "bottom";
        ctx.clearRect(0, 0, this.width, this.height);

        this.drawLine(ctx);
        this.writeOneText(ctx, 4, 0);
        this.timer = setInterval(() => {
          ctx.clearRect(0, 0, this.width, this.height);
          this.drawLine(ctx);
          this.writeOneText(ctx, 4, 0);
        }, 5000);
      },
      writeOneText(ctx, num, index) {
        if (index < 4) {
          this.timers['st' + index] = setTimeout(_ => {
            let y = this.height * 0.8;
            let x = (this.width - 10) / num * index + 5;
            let deg = getRandomNum(-30, 30);
            ctx.fillStyle = getRandomColor(10, 100);
            ctx.font = "30px '" + createFontFamily() + "'";
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(this.verification[index], 0, 7);
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
            this.writeOneText(ctx, num, index + 1)
          }, 1000);
        }
      }
    },
    async mounted() {
      await this.getVerification();
      this.writeVerification();
    }
  }
</script>

<style scoped>

</style>
