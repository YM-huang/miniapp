//index.js
//获取应用实例
const app = getApp();
const baseUrl = "http://api.tianapi.com/txapi/yaopin/index";
const key = "xxx";
var WxSearch = require('../../wxSearchView/wxSearchView.js');

Page({

  
  data: {
    
    inputShowed: false,
    baseImgPath: "../images/",
    isFormSearch: false,
    NameList: {
      "title": "",
      "content": ""
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: '我在用小程序查询药品说明，快一起来用~',
      desc: '及时了解药品的情况！',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  onShow: function () {
    if (this.isFormSearch) {
      this.isFormSearch = false;
      return;
    }
    var that = this;
        that.setData({  
          NameList:[
            {content:"1" ,title:"阿司匹林"},
            {content:"2" ,title:"布洛芬"},
            {content:"3" ,title:"消炎痛"},
            {content:"4" ,title:"扑热息痛"},
            {content:"5" ,title:"保太松"},
            {content:"6" ,title:"罗非昔布"},
            {content:"7" ,title:"塞来昔布"},
            {content:"8" ,title:"曲马多"},
            {content:"9" ,title:"吗啡"},
            {content:"10" ,title:"杜冷丁"},
          ],
        });
  },

  aBtn: function(options){
    let title = options.currentTarget.dataset.title;
    console.log(title)
      wx.navigateTo({
        url: '../show/show?title='+title,
      })
  },
  // 搜索页面跳回
  onLoad: function (options) {
    if (options && options.searchValue) {
      var value = options.searchValue;
      if (value.length == 0) {
        return;
      }
      this.isFormSearch = true;
      wx.request({
        url: baseUrl + "?key=" + key + "&word=" + value,
        data:{
          num:"10"
        },
        success: (res) => {
          console.log(res.data)
          this.setData({
            NameList: res.data.newslist
          });
        },
      })
    }
  },

  // 搜索入口  
  wxSearchTab: function () {
    wx.redirectTo({
      url: '../search/search'
    })
  }

  

})
