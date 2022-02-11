
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //img_url: config.imgUrl, //图片地址

    //签到模块
    signNum: 0,  //签到数
    signState: false, //签到状态
    min: 1,  //默认值日期第一天1
    max: 7,  //默认值日期最后一天7
    be: 0    //默认倍数


  },

  onLoad() {
  },
  //签到
  bindSignIn(e) {
    var that = this,
      num = e.currentTarget.dataset.num;
    num++
    my.showToast({
      type: 'success',
      content: '操作成功',
      duration: 1000,
    })
    that.setData({
      signNum: num,
      //signState: true
    })

    var be = e.currentTarget.dataset.be;

    if (num % 7 == 0) {
      be += 1;
      that.setData({
        be: be
      })
    }


    if (num == 7 * be + 1) {
      that.setData({
        min: 7 * be + 1,
        max: 7 * be + 7
      })
    }


  },
  onGold(){
    my.navigateTo({
      url: "/pages/my/gold/gold"
    });
  },
})
