import Vue from 'vue';
/**
 * 得到进入或者离开指定元素的方向
 * @param event
 * @returns {string}
 */
export const getEnterOrLeaveDirection = (event) => {
  //得到元素的宽高
  let w = event.target.getElementsByTagName('img')[0].width;
  let h = event.target.getElementsByTagName('img')[0].height;
  //得到换算之后对应的坐标
  let x = (event.pageX - event.target.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
  let y = (event.pageY - event.target.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
  let direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
  let dirName = ['top','right','bottom','left'];
  return dirName[direction];
};

/**
 * 全屏loading
 * @returns {ElLoadingComponent | undefined}
 */
export const openFullScreen = (vue) =>{
  console.log(vue);
  return vue.$loading({
    lock: true,
    text: '下载中...',
    spinner: './loading.gif',
    background: 'rgba(255, 255, 255, 0.7)'
  });
};

//产生随机数
export const getRandomNum = (minNum,maxNum) => {
  return Math.floor(Math.random()*(maxNum-minNum)+minNum);
};

//产生随机颜色
export const getRandomColor = (minNum,maxNum) => {
  let r = getRandomNum(minNum,maxNum);
  let g = getRandomNum(minNum,maxNum);
  let b = getRandomNum(minNum,maxNum);
  return "rgb("+r+","+g+","+b+")";
};

//产生随机字体
export const createFontFamily = () => {
  let fontFamily = ["等线","方正舒体","方正姚体","仿宋","黑体","华文彩云","华文行楷","华文仿宋","华文琥珀","华文楷体","华文隶书","华文宋体","华文细黑","华文新魏","华文中宋","楷体","隶书","宋体","微软雅黑"];
  let ran = Math.floor(Math.random()*fontFamily.length);
  return fontFamily[ran];
};
