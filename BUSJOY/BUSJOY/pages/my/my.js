Page({
  data: {
    tabs: [
      {
        title: '乘车券',
      },
      {
        title: '商家券',
      },
    ],
    activeTab: 0,
    typeCapsule: false,
    typeHasSubTitle: false,
    hasPlus: true,
    hasContentHeight: false,
    slides: [], //轮播图数据
    remind: '加载中',
    help_status: false,
    userid_focus: false,
    passwd_focus: false,
    userid: '',
    passwd: '',
    angle: 0
  },
  onLoad() {
    var _this = this
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
  },
  onCarlogo(){
    my.navigateTo({
      url: "/pages/my/carmode/carmode"
    });
  },
  onDiscount(){
    my.navigateTo({
      url: "/pages/my/discount/discount"
    });
  },
  onGold(){
    my.navigateTo({
      url: "/pages/my/gold/gold"
    });
  },
  onSignin(){
    my.navigateTo({
      url: "/pages/my/signin/signin"
    });
  },
  onRecord(){
    my.navigateTo({
      url: "/pages/my/recoord/recoord"
    });
  },
  onRank(){
    my.navigateTo({
      url: "/pages/my/rank/rank"
    });
  },
  onFriend(){
    my.navigateTo({
      url: "/pages/friends/friends"
    });
  },
  onFriendcircle(){
    my.navigateTo({
      url: "/pages/friendcircle/friendcircle"
    });
  },
  onRoadlist(){
    my.navigateTo({
      url: "/pages/roadlist/roadlist"
    });
  },
  handleTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  handleTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  handlePlusClick() {
    my.navigateTo({
      url: "/pages/my/discount/discount"
    });
  },
  // onFriend(){
  //   my.navigateTo({
  //     url: "/pages/longRent/longRent"
  //   });
  // },
});
