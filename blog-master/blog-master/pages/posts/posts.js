const wx2my = require('../../wx2my');

const app = getApp();
Page({
  data: {
    title: '全部',
    loading: true,
    list: ''
  },
  onLoad: function () {
    var that = this; //微信转发功能

    // wx2my.showShareMenu({
    //   withShareTicket: true
    // });

    if (!app.globalData.listDatas) {
      wx2my.showLoading({
        title: '加载中',
        mask: true
      });
      this.sendQuest();
    } else {
      that.setData({
        loading: false,
        list: app.globalData.listDatas
      });
    }
  },
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      list: '',
      loading: true
    });
    wx2my.showNavigationBarLoading(); //在标题栏中显示加载

    this.sendQuest(function () {
      wx2my.hideNavigationBarLoading(); //完成停止加载

      wx2my.stopPullDownRefresh(); //停止下拉刷新
    });
  },
  sendQuest: function (callback) {
    var that = this; //涉及到域名问题正式项目

    wx2my.request({
      url: 'https://lcl101.cn/api/getList',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        wx2my.hideLoading();

        if (res.statusCode == 200) {
          that.setData({
            list: res.data,
            loading: false
          });
          app.globalData.listDatas = res.data;

          if (callback) {
            callback();
          }
        } else {
          console.log(res.errMsg);
        }
      }
    });
  }
});
