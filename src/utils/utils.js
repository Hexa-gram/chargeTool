export function formatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
  //将日期时间进行格式化
  //name="date" type="Date" 要格式化的日期时间
  //name="format" type="String" 格式类型，形如 yyyy-MM-dd hh:mm:ss
  date = date || new Date()
  var o = {
    "M+": date.getMonth() + 1,
    //月份   
    "d+": date.getDate(),
    //日   
    "h+": date.getHours(),
    //小时   
    "m+": date.getMinutes(),
    //分   
    "s+": date.getSeconds() //秒     
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o) if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return format;
}