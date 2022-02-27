// pages/show/show.js
const WxParse = require('../../wxParse/wxParse');
const baseUrl = "http://api.tianapi.com/txapi/yaopin/index";
const key = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ShowTitle: " ",
    introduce: " "
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let t = options.title
    console.log(t)
    that.setData({
      ShowTitle: t
    })
    wx.request({
      url: baseUrl + "?key=" + key + "&word=" + t,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        num: "1"
      },
      success: (res) => {
        console.log(res.data)
        console.log(res.data.newslist[0].content)
        that.setData({
          introduce: res.data.newslist[0].content,
        });
        var article = '<div>'+ res.data.newslist[0].content +'<div>';
        WxParse.wxParse('article', 'html', article, that, 5)
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
