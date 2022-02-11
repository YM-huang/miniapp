const app = getApp();
Page({
  data: {
    pic_url: "",
  },
  onLoad() {
    app.getImage(function(url) {
      this.setData({ pic_url: url });
    }.bind(this));
  },
  tap1: function(e) {
    my.setClipboard({
      text: 'https://mfweb.top/',
      success: function() {
        app.showSuccess("链接已复制");
      },
      fail: function() {
        app.showError("复制失败");
      }
    });
  },
  tap2: function(e) {
    my.setClipboard({
      text: 'https://github.com/Mfweb/adao_member_alipay.git',
      success: function() {
        app.showSuccess("链接已复制");
      },
      fail: function() {
        app.showError("复制失败");
      }
    });
  },
  onTapImg: function(e) {
    my.previewImage({
      urls: [this.data.pic_url],
    });
  },
});
