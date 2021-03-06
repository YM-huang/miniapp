const wx2my = require('../../wx2my');

//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    name: '可惜没有如果～R',
    posts: '全部',
    about: '归档',
    project: 'PROJECTS',
    tags: '标签',
    demo: '用例',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx2my.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx2my.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function () {
    //微信转发功能
    // wx2my.showShareMenu({
    //   withShareTicket: true
    // });

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      // wx.getUserInfo({
      //   success: res => {
      //     app.globalData.userInfo = res.userInfo;
      //     this.setData({
      //       userInfo: res.userInfo,
      //       hasUserInfo: true
      //     });
      //   }
      // });
    }
  },
  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});
