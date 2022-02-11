Page({
  data: {
    background: [
      { color: 'blue', text: '支付宝' },
      { color: 'red', text: '小程序' },
      { color: 'yellow', text: 'Swiper' }
    ],
    indicatorDots: true,
    autoplay: true,
    vertical: false,
    interval: 1000,
    circular: false,
    duration: 1500,
  },
  onLoad() {
  },
  changeIndicatorDots(e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots,
    });
  },
  changeVertical() {
    this.setData({
      vertical: !this.data.vertical,
    });
  },
  changeCircular(e) {
    this.setData({
      circular: !this.data.circular,
    });
  },
  changeAutoplay(e) {
    this.setData({
      autoplay: !this.data.autoplay,
    });
  },
  intervalChange(e) {
    this.setData({
      interval: e.detail.value,
    });
  },
  durationChange(e) {
    this.setData({
      duration: e.detail.value,
    });
  }
});
