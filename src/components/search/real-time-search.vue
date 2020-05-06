<template>
  <div class="real-time-search">
    <div class="search-msg">
      <p>当前搜索内容：<span>{{search_content}}</span><span style="width: 100px;display: inline-block"></span>搜索条数：<span>{{search_num}}</span>
      </p>
      <el-button type="primary" size="small" @click="showSuperSearch">高级搜索</el-button>
      <el-button type="primary" size="small" @click="showDownLoad">批量下载</el-button>
      <el-form v-if="isSuperSearch" :model="searchData" ref="searchForm" :inline="false" label-width="80px"
               style="width: 400px;margin-top: 30px">
        <el-form-item label="搜索内容" prop="search_content">
          <el-input v-model="searchData.search_content" placeholder="请输入搜索内容"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="num">
          <el-input v-model="searchData.num" placeholder="请输入爬取数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="superSearch">爬取</el-button>
          <el-button type="primary" @click="$refs['searchForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
      <el-form v-if="isDownload" :model="downloadData" ref="downloadForm" :inline="false" label-width="80px"
               style="width: 400px;margin-top: 30px">
        <el-form-item label="开始位置" prop="start_download_num">
          <el-input v-model="downloadData.start_download_num" placeholder="请输入下载开始位置(默认为第一张)"></el-input>
        </el-form-item>
        <el-form-item label="结束位置" prop="end_download_num">
          <el-input v-model="downloadData.end_download_num" placeholder="请输入下载结束位置(默认为最后一张)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="startDownload(downloadData.start_download_num,downloadData.end_download_num)">开始下载</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div
      style="width: 100%"
      class="loading"
      v-if="loading"
    >
      <img src="../../assets/img/loading.gif" alt="">
      <p>{{loadingMsg}}</p>
    </div>
    <image-list v-else :images-obj="images"></image-list>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="40%">
      <span>搜索内容遇上一次一致，是否直接返回上一次爬取结果</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="returnLastImagesArr">直接返回上一次结果</el-button>
        <el-button @click="getNewImagesArr">重新爬取</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ImageList from '../images/image-list';
  import {getImages} from "../../api/images/getImages";
  import JSZip from 'jszip'
  import FileSaver from 'file-saver'

  export default {
    name: "RealTimeSearch",
    components: {
      ImageList
    },
    data() {
      return {
        loading: false,
        images: [],
        count: 1,
        searchData: {
          search_content: '',
          num: ''
        },
        dialogVisible: false,
        loadingMsg: '',
        isSuperSearch: false,
        downloadData: {
          start_download_num: '',
          end_download_num:''
        },
        isDownload:false
      }
    },
    computed: {
      search_content() {
        return this.$route.query.search || window.localStorage['current_search_content'] || '';
      },
      search_num() {
        return this.$route.query.num || window.localStorage['current_search_num'] || 100;
      }
    },
    watch: {
      search_content() {
        this.getNewImagesArr(this.search_content, this.search_num);
      },
      search_num(newVal, oldVal) {
        if (newVal > oldVal) {
          this.getNewImagesArr(this.search_content, this.search_num);
        }
      }
    },
    methods: {
      /**
       * 爬取图片
       * @param search_content
       * @param num
       * @returns {Promise<void>}
       */
      async searchImages(search_content, num = 100) {
        if (search_content) {
          this.loading = true;
          this.loadingMsg = '拼命爬取中';
          let imageArr = await getImages({
            username:window.localStorage.getItem('username'),
            searchData: search_content,
            num: num
          });
          if (imageArr.status === 200) {
            this.images = imageArr.data;
            window.localStorage.setItem('imageArr', JSON.stringify(this.images));
            this.loading = false;
          } else {
            this.$notify.error({
              title: '错误',
              message: imageArr.message,
              offset: 70,
              duration: 2500
            });
          }
        }
      },

      /**
       * 显示高级搜索选项
       */
      showSuperSearch(){
        this.isSuperSearch = !this.isSuperSearch;
        this.isDownload = false;
      },
      /**
       * 高级搜索
       */
      superSearch() {
        if (this.searchData.num && +this.searchData.num !== +this.searchData.num) {
          console.log(+this.searchData.num);
          this.$notify.error({
            title: '错误',
            message: '爬取数量必须是整数',
            offset: 70,
            duration: 2500
          });
          return;
        }
        if (this.searchData.search_content) {
          this.isSuperSearch = false;
          if (this.searchData.search_content === window.localStorage['current_search_content']
            && this.searchData.num <= window.localStorage['current_search_num']) {
            this.dialogVisible = true;
          } else {
            window.localStorage.setItem('current_search_num', this.searchData.num || 100);
            this.$store.commit('searchNum', this.searchData.num || 100);
            this.searchData.num = this.searchData.num || 100;
            this.$router.push(`/real-time-search?search=${this.searchData.search_content}&num=${this.searchData.num}`);
          }
          this.$refs['searchForm'].resetFields();
        } else {
          this.$notify.error({
            title: '错误',
            message: '请输入搜索内容',
            offset: 70,
            duration: 2500
          });
        }
      },
      /**
       * 直接返回上一次结果
       */
      returnLastImagesArr() {
        this.loading = true;
        this.loadingMsg = '加载缓存中';
        this.dialogVisible = false;
        setTimeout(_ => {
          if (window.localStorage['imageArr']) {
            this.images = JSON.parse(window.localStorage['imageArr']);
            this.someData = this.images.slice(0, 100 * this.count);
            this.loading = false
          } else {
            this.getNewImagesArr(this.search_content, this.search_num || 100);
          }
        }, 1000);
      },
      /**
       * 重新爬取
       */
      getNewImagesArr(search_content, num) {
        window.localStorage.setItem('current_search_content', search_content);
        window.localStorage.setItem('current_search_num', num || 100);
        window.localStorage.removeItem('imageArr');
        this.$store.commit('searchContent', search_content);
        this.$store.commit('searchNum', num || 100);
        this.searchImages(search_content, num);
        this.dialogVisible = false;
      },

      /**
       * 显示下载选项
       */
      showDownLoad(){
        this.isDownload = !this.isDownload;
        this.isSuperSearch = false;
      },
      /**
       * 开始下载
       */
      startDownload(start,end){
        start = start || 0;
        end = end || +this.search_num;
        if(+start !== +start
          || +end !== +end
          || +start < 0 || +end < 0){
          this.$notify.error({
            title: '错误',
            message: '请输入正整数',
            offset: 70,
            duration: 2500
          });
          return;
        }
        if(end < start){
          this.$notify.error({
            title: '错误',
            message: '结束位置不能再开始前面哟，啾咪',
            offset: 70,
            duration: 2500
          });
          return;
        }
        if(+end > this.search_num){
          this.$notify.error({
            title: '错误',
            message: '结束为止超出搜索数量',
            offset: 70,
            duration: 2500
          });
          return;
        }
        this.downloadImages(this.images.slice(start-1,end));

      },
      /**
       * 图片批量打包下载
       * @param arr
       * @param blogTitle
       */
      downloadImages (arr, blogTitle = '图片集') {
        let jsZip = new JSZip();
        let img_arr = jsZip.folder(blogTitle);
        let urlList = [];
        for (let i = 0; i < arr.length; i++) {
          let name = `${new Date().getTime()}${i}`; //以时间戳作为图片名称
          let image = new Image();
          // 解决跨域 Canvas 污染问题
          image.setAttribute("crossOrigin", "anonymous");
          image.src = arr[i].url;
          image.onload = async () => {
            let cans = document.createElement("canvas");
            cans.width = image.width;
            cans.height = image.height;
            let context = cans.getContext("2d");
            context.drawImage(image, 0, 0, image.width, image.height);
            let baseUrl = cans.toDataURL(); // 得到图片的base64编码数据 let url = canvas.toDataURL("image/png");
            urlList.push({ name: name, img: baseUrl.substring(22) });
            if (urlList.length === arr.length) {
              if (urlList.length > 0) {
                this.$notify.success({
                  title: "成功",
                  message: "即将下载",
                  offset: 70,
                  duration: 2500
                });
                for (let k = 0; k < urlList.length; k++) {
                  img_arr.file(urlList[k].name + ".png", urlList[k].img, {
                    base64: true
                  });
                }
                jsZip.generateAsync({ type: "blob" }).then((content) => {
                  FileSaver.saveAs(content, blogTitle + ".zip");
                });
              } else {
                this.$notify.error({
                  title: "错误",
                  message: "暂无图片可下载"
                });
              }
            }
          };
        }
      },
    },
    created() {
    },
    async mounted() {
      this.$store.commit('searchContent', window.localStorage['current_search_content']);
      this.$store.commit('searchNum', window.localStorage['current_search_num'] || 100);
      if (this.search_content) {
        if (window.localStorage['current_search_content'] === this.search_content && this.search_num <= window.localStorage['current_search_num']) {
          return this.returnLastImagesArr();
        } else {
          return this.getNewImagesArr(this.search_content, this.search_num);
        }
      } else if (window.localStorage['current_search_content']) {
        return this.returnLastImagesArr();
      } else {
        this.$notify({
          title: '警告',
          message: '没有得到爬取内容',
          type: 'warning',
          offset: 70,
          duration: 2500
        });
      }
    }
  }
</script>

<style scoped lang="less">

  .to-top{
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 99999;
    cursor: pointer;
  }

  .search-msg {
    box-sizing: border-box;
    padding: 50px 100px;

    p {
      font-size: 16px;
      line-height: 60px;

      span {
        font-weight: 700;
      }
    }
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
