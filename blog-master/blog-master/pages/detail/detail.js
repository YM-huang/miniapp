const wx2my = require('../../wx2my');

const app = getApp();
Page({
  data: {
    listId: '',
    loading: true,
    listData: '',
    artileDate: '',
    id: ''
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      id: options.id
    })

    if (!app.globalData.listDatas) {
      this.sendQuest(function (res) {
        that.getList(this.data.id, res.data);
      });
    } else {
      that.getList(this.data.id, app.globalData.listDatas);
    }
  },
  getList: function (id, data) {
    var that = this;
    that.setData({
      listId: id,
      listData: data
    });

    for (var i = 0; i < data.length; i++) {
      if (that.data.id == data[i].id) {
        wx2my.setNavigationBarTitle({
          title: data[i].title
        });
        var articles = data[i].body; //将markdown内容转换为towxml数据

        let articdata = app.towxml.toJson(articles, 'markdown'); //设置文档显示主题，默认'light'

        articdata.theme = 'light';
        that.setData({
          artileDate: articdata,
          loading: false
        });
      }
    }
  },
  sendQuest: function (callback) {
    var that = this; //涉及到域名问题正式项目

    wx2my.request({
      url: 'https://lcl101.cn/api/getList',
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        if (res.statusCode == 200) {
          if (callback) {
            callback(res);
          }
        } else {
          console.log(res.errMsg);
        }
      }
    });
  }
});
