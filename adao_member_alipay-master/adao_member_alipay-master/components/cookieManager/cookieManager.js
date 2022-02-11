const app = getApp();
const http = require('/utils/http.js');
const cookie = require('/utils/cookie.js');
var WxParse = require('/wxParse/wxParse.js');

Component({
  mixins: [],
  data: {
    verifyCodeURL: '',
    vCodeLoading: false,
    CookieList: [],//饼干列表
    vCodeShow: false,//验证码是否已显示
    needDeleteID: "",//需要删除的饼干index
    FormID: "",//表单提交ID
    EnterButLoading: false,//确认按钮loading
    CookieNum: '[0/0]',
    CookieWarning: null,
  },
  props: {
    hide: false,
    onEndLoadCookie: (event) => null,
    onStartLoadCookie: (event) => null
  },
  didMount() {
    this.$page.cookieManagerCom = this;
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    startLoadCookies: function() {
      this.setData({
        loadCookie: false,
        vCodeShow: false
      });
      this.getCookies();
      this.props.onStartLoadCookie({ from: 'cookie', needRefresh: false });
    },
    /**
     * 删除饼干
     */
    onDeleteCookie: function(e) {
      this.getNewVcode();
      this.setData({
        vCodeShow: true,
        needDeleteID: e.target.id,
        FormID: 'delete'
      });
    },

    /**
     * 获取饼干
     */
    onGetCookie: function(event) {
      let selId = event.target.id;
      my.showActionSheet({
        items: ['获取二维码', '复制内容'],
        success: function(e) {
          if (e.index >= 0) {
            if (e.index == 0) {
              this.getCookieQR(selId);
            }
            else {
              this.getCookieToClipboard(selId);
            }
          }
        }.bind(this)
      })
    },
    /**
     * 获取新Cookie
     */
    onGetNewCookie: function() {
      this.setData({
        vCodeShow: true,
        FormID: 'new'
      });
      this.getNewVcode();
    },
    /**
     * 刷新验证码
     */
    onTapVerifyCode: function(e) {
      this.getNewVcode();
    },

    /**
     * 点击了关闭验证码输入框按钮
     */
    onUClose: function(e) {
      this.setData({ vCodeShow: false });
    },

    /**
     * 确认操作删除或获取饼干
     */
    onEnterCookie: function(e) {
      var u_vcode = e.detail.value.verifycode;
      var u_index = e.detail.value.needDeleteID;
      if (u_vcode.length != 5) {
        app.showError('验证码错误');
        return;
      }
      if (this.data.EnterButLoading == true) return;
      this.setData({ EnterButLoading: true });
      if (e.target.id == 'delete')//删除Cookie
      {
        if (this.data.CookieList[u_index].delLoading == true) return;
        var selectData = 'CookieList[' + u_index + '].delLoading';
        this.setData({ [selectData]: true });//对应的删除按钮显示loading

        http.api_request(
          app.globalData.ApiUrls.CookieDeleteURL + this.data.CookieList[u_index].id + ".html",
          {
            verify: u_vcode
          },
          function(res) {
            if (res.status == 1) {
              this.props.onEndLoadCookie({ from: 'cookie', needRefresh: true });
              this.setData({ vCodeShow: false });
              app.showSuccess('删除完成');
            }
            else {
              app.log('cookie delete error:' + res.info);
              this.getNewVcode();
              app.showError(res.info);
            }
            this.setData({
              [selectData]: false,
              EnterButLoading: false
            });
          }.bind(this),
          function() {
            app.showError('发生了错误');
            this.setData({
              [selectData]: false,
              EnterButLoading: false
            });
          }.bind(this));
      }
      else if (e.target.id == 'new')//获取新Cookie
      {
        http.api_request(
          app.globalData.ApiUrls.CookieGetNewURL,
          {
            verify: u_vcode
          },
          function(res) {
            //app.log(res);
            if (res.status == 1) {
              this.props.onEndLoadCookie({ from: 'cookie', needRefresh: true });
              app.showSuccess('大成功');
              app.log('get new cookie success');
            }
            else {
              app.log('get new cookie error:' + res.info);
              app.showError(res.info);
            }
            this.setData({
              vCodeShow: false,
              EnterButLoading: false
            });
          }.bind(this),
          function() {
            this.setData({ EnterButLoading: false });
          }.bind(this));
      }
    },

    /**
      * 获取新验证码
      */
    getNewVcode: function() {
      this.setData({
        vCodeLoading: true,
        verifyCodeURL: '../../imgs/loading.gif'
      });

      http.get_verifycode(function(sta, img, msg) {
        if (sta == false) {
          app.showError(msg);
        }
        this.setData({
          vCodeLoading: false,
          verifyCodeURL: img
        });
      }.bind(this));
    },
    /**
     * 获取Cookie列表
     */
    getCookies: function(callback = null) {
      cookie.getCookies(function(status, msg, info) {
        if (info != null) {
          this.setData({
            CookieNum: info.capacity,
            CookieWarning: info.warning
          });
        }
        this.props.onEndLoadCookie({ from: 'cookie', needRefresh: false });

        if (status == false) {
          if (msg == '本页面需要实名后才可访问_(:з」∠)_') {
            app.showError('请点击左上角菜单完成实名认证后再使用。');
          }
          else {
            app.showError(msg);
          }
          if (callback !== null) callback(false);
          return;
        }
        this.setData({
          CookieList: msg,
        });
        if (callback !== null) callback(true);
      }.bind(this));
    },
    /**
      * 获取Cookie详细并显示二维码
      */
    getCookieQR: function(index) {
      if (this.data.CookieList[index].getLoading == true) return;
      var selectData = 'CookieList[' + index + '].getLoading';
      this.setData({ [selectData]: true });

      cookie.getCookieDetail(this.data.CookieList[index].id, function(sta, detail) {
        if (sta == true) {
          this.createQRCode(JSON.stringify({ cookie: detail }), function() {
            this.setData({ [selectData]: false });
            return;
          }.bind(this));
        }
        else {
          app.showError(detail);
          this.setData({ [selectData]: false });
        }
      }.bind(this));
    },
    /**
      * 获取Cookie详细并复制到剪切板
      */
    getCookieToClipboard: function(index) {
      if (this.data.CookieList[index].getLoading == true) return;
      var selectData = 'CookieList[' + index + '].getLoading';
      this.setData({ [selectData]: true });

      cookie.getCookieDetail(this.data.CookieList[index].id, function(sta, detail) {
        if (sta == true) {
          my.setClipboard({
            text: detail,
            success: function() {
              app.showSuccess('饼干已复制');
            },
            fail: function() {
              app.showError('复制失败');
            }
          });
        }
        else {
          app.showError(detail);
        }
        this.setData({ [selectData]: false });
      }.bind(this));
    },
    /**
     * 创建并显示二维码
     */
    createQRCode: function(content, callback) {
      my.previewImage({
        urls: ["http://qr.liantu.com/api.php?w=500&text=" + encodeURI(content)]
      });
      callback();
    }
  }
});
