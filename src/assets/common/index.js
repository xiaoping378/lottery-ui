export const formatDateMonth = (i) => {
  let now = new Date(i);
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let mill = parseInt(now.getMilliseconds() / 100);
  return `${month < 10 ? `0${month}` : month}/${date < 10 ? `0${date}` : date}  ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}.${mill}`
};
export const formatDate = (i) => {
  let now = new Date(i * 1000);
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  return `${month < 10 ? `0${month}` : month}/${date < 10 ? `0${date}` : date}  ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}`
};
export const formatDateMill = (i) => {
  let now = new Date(i);
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let mill = parseInt(now.getMilliseconds() / 100);
  return `${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}.${mill}`
};
//2018/12/27 22:13:12.5
export const formatDateYear = (i) => {
  let now = new Date(i);
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();
  let mill = parseInt(now.getMilliseconds() / 100);
  return `${year}/${month < 10 ? `0${month}` : month}/${date < 10 ? `0${date}` : date}  ${hour < 10 ? `0${hour}` : hour}:${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}.${mill}`
};