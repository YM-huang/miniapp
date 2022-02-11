Component({
  data: {
    statusAndTitleBarHeight: 0
  },
  props: {},
  methods: {},
  didMount: function didMount() {
    var app = getApp();
    var info = null;
    var statusAndTitleBarHeight = 0;

    if (app.globalData && app.globalData.statusAndTitleBarHeight) {
      statusAndTitleBarHeight = app.globalData.statusAndTitleBarHeight;
    } else {
      info = my.getSystemInfoSync();
      statusAndTitleBarHeight = (info.statusBarHeight + info.titleBarHeight) * 2 || 0;

      if (!app.globalData) {
        app.globalData = {
          statusAndTitleBarHeight: statusAndTitleBarHeight
        };
      } else {
        app.globalData.statusAndTitleBarHeight = statusAndTitleBarHeight;
      }
    }

    this.setData({
      statusAndTitleBarHeight: statusAndTitleBarHeight
    });
  }
});