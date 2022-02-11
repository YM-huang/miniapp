export default {
  transDate: function(timestamp) {
    timestamp = parseInt(timestamp)
    const date = getDate(timestamp);
    const Y = date.getFullYear() + '-';
    const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    const D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    const h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    const m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    return Y+M+D+h+m;
  },
  transOilType: function(oilType) {
    if (oilType.indexOf('#') > -1) {
      const arr = oilType.split('#');
      return arr[1] + arr[0] + '#';
    }
    return oilType;
  }
}