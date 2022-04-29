function getDiffDays(dateStr1, dateStr2) {
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)
  const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
  const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  return Math.floor(Math.abs(d1 - d2) / 86400000)
}
function jsDateFormatter( dateInput ) {  // dateInput 是一个 js 的 Date 对象
  var year = dateInput.getFullYear();
  var month = dateInput.getMonth() + 1;
  var theDate = dateInput.getDate();

  var hour = dateInput.getHours();
  var minute = dateInput.getMinutes();
  var second = dateInput.getSeconds();

  if ( month < 10 ) {
      month = '0' + month;
  }

  if ( theDate < 10 ) {
      theDate = '0' + theDate;
  }

  if ( hour < 10 ) {
      hour = '0' + hour;
  }

  if ( minute < 10 ) {
      minute = '0' + minute;
  }

  if ( second < 10 ) {
      second = '0' + second;
  }
  return `${year}-${month}-${theDate} ${hour}:${minute}:${second}`;
}

export { getDiffDays, jsDateFormatter }