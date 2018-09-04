// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
const getTimeDisplay = () => {
  const myDate = new Date();
  const year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let date = myDate.getDate();
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();
  let seconds = myDate.getSeconds();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  // 时间拼接
  const dateTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  return dateTime;
};

export default {
  getTimeDisplay,
};

