const wx2my = require('../../wx2my');

//logs.js
const util = require('../../utils/util.js');

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx2my.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log));
      })
    });
  }
});