const app = getApp();

Page({
  data: {
    pageIndex: 0,
    cookieLoading: true,
    authLoading: true,
    sportLoading: true
  },
  resetData: function() {
    this.setData({
      pageIndex: 0,

      cookieLoading: true,
      authLoading: false,
      sportLoading: false,
    });
  },
  /**
   * 页面渲染完成
   */
  onReady: function() {
    this.resetData();
    this.pullDownRefreshAll();
  },
  /**
   * 开始下拉刷新
   */
  onPullDownRefresh: function() {
    if (this.data.pageIndex == 0) {
      //处理饼干数据
      this.cookieManagerCom.startLoadCookies();
    }
    else if (this.data.pageIndex == 1) {
      //处理实名认证相关数据
      this.authManagerCom.startLoadAuth();
    }
    else if (this.data.pageIndex == 2) {
      my.stopPullDownRefresh();
    }
  },
  pullDownRefreshAll: function() {
    my.showNavigationBarLoading();
    this.cookieManagerCom.startLoadCookies();
    this.authManagerCom.startLoadAuth();
  },

  /**
   * 切换页面
   */
  onChangePage: function(id) {
    switch (parseInt(id)) {
      case 0:
      case 1:
      case 2:
        this.setData({ pageIndex: id });
        break;
      case 3:
        my.navigateTo({
          url: '../about/about',
        });
        break;
      case 4:
        app.logOut();
        break;
      default:
        app.showError('哈？');
    }
  },
  onLoadStart: function(event) {
    switch (event.from) {
      case 'auth':
        this.setData({ authLoading: true });
        break;
      case 'cookie':
        this.setData({ cookieLoading: true });
        break;
    }
  },
  onLoadEnd: function(event) {
    switch (event.from) {
      case 'auth':
        this.setData({ authLoading: false });
        break;
      case 'cookie':
        this.setData({ cookieLoading: false });
        break;
    }

    if (event.needRefresh) {
      this.pullDownRefreshAll();
      my.showNavigationBarLoading();
    }
    else {
      my.stopPullDownRefresh();
      my.hideNavigationBarLoading();
    }
    this.setData({ authLoading: false });
  }
});
