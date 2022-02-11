Page({
    data: {
    slides: [], //轮播图数据
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0,

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
    var _this = this
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
});
