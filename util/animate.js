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
