const wx2my = require('./wx2my');

//app.js
const Towxml = require('./towxml/main');

App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx2my.getStorageSync('logs') || [];
    var logs = wx2my.getStorageSync({ key: 'logs' }) || [];
    // logs.unshift(Date.now());
    // wx2my.setStorageSync('logs', logs); // 登录
    wx2my.setStorageSync({
      key:'logs',
      data:{
        logs: logs
      }
    });

    // wx.login({
    //   success: res => {// 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // }); // 获取用户信息

    wx2my.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res);
          //     }
          //   }
          // });
        }
      }
    });
  },
  towxml: new Towxml(),
  //创建towxml对象，供小程序页面使用
  onShow: function (options) {// Do something when show.
  },
  onHide: function () {// Do something when hide.
  },
  onError: function (msg) {
    console.log(msg);
  },
  globalData: {
    userInfo: null,
    listDatas: ''
  }
});
