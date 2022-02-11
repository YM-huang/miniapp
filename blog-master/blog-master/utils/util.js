const wx2my = require('../wx2my');

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};

const throttle = (method, delay, that) => {
  var content = this,
      args = arguments;
  if(method && method.Id){
    clearTimeout(method.Id);
  }
  method.Id = setTimeout(function () {
    method.apply(that, args);
  }, delay);
};

module.exports = {
  formatTime: formatTime,
  throttle: throttle
};
