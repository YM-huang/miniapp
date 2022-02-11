var toast = function(title) {
  my.showToast({
  type: 'success',
  content: title,
  duration: 1000,
});
}

Page({
  data: {
    docParamsImg: "https://gw.alicdn.com/tfs/TB1DcdDQOrpK1RjSZFhXXXSdXXa-1342-618.png",
    awardImg: 'https://gw.alicdn.com/tfs/TB1JsqGbHPpK1RjSZFFXXa5PpXa-289-298.png',
    awardName: '',
    tipText: '',
    clickMode: false,
  },
  onStartRoll() {
    toast('摇一摇手机试试')
    this.setData({
      tipText: '',
    });
  },
  onFinish() {
    toast('摇完啦')
    this.setData({
      awardName: '1等奖',
      tipText: `抽奖结果：1等奖`
    });
  }
});