Page({
  data: {
    docParamsImg: 'https://gw.alicdn.com/tfs/TB1mCRIQQPoK1RjSZKbXXX1IXXa-1524-1312.png',
    resultText: ''
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        resultText: '很遗憾，差点就中奖了哦'
      });
    }, 500);
  },
  onFinish() {
    my.alert({ title: this.data.resultText });
  }
});