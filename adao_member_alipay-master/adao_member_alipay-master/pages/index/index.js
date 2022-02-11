const app = getApp();
const http = require('../../utils/http.js');
var WxParse = require('../../wxParse/wxParse.js');
const pageTitles = ['登录', '注册', '找回密码'];
var rememberPW = false;
var pageEvent = null;

Page({
  data: {
    verifyCodeURL: "",
    Mode: 0,
    animations: [],
    TitleText: pageTitles[0],
    vCodeLoading: true,
    BLoading: false,
    RememberPW: false,
    UserName: '',
    PassWord: '',
    showTermsWindow: false,
    termsNodes: null
  },
  onReady: function() {
    let sUN = my.getStorageSync({ key: 'UserName' }).data;
    let sPW = my.getStorageSync({ key: 'PassWord' }).data;

    if (sUN != null && sPW != null) {
      rememberPW = true;
      this.setData({ RememberPW: true, UserName: sUN, PassWord: sPW });
    }

    this.setData({ BLoading: true });
    app.getTerms();
    this.switchPage(0);
    my.showNavigationBarLoading();
    this.showNotice(function() {
      http.api_request(
        app.globalData.ApiUrls.CheckSessionURL,
        null,
        function(res) {
          this.setData({ BLoading: false });
          my.hideNavigationBarLoading();
          if (typeof res == 'string' && res.indexOf('饼干管理') > 0) {
            my.redirectTo({
              url: '../userMember/userMember',
            });
            return;
          }
          else if (typeof res == 'object' && res.info !== undefined) {
            if (res.info != "并没有权限访问_(:з」∠)_") {
              app.showError(res.info);
            }
          }
          else {
            app.showError('未知错误');
          }
          this.getNewVcode();
        }.bind(this),
        function() {
          app.showError('连接服务器失败');
          this.setData({ BLoading: false });
          my.hideNavigationBarLoading();
        }.bind(this)
      );
    }.bind(this));
  },
  onTapVerifyCode: function(e) {
    this.getNewVcode();
  },
  vCodeOnLoad: function() {

  },
  onTapIlogin: function() {
    this.switchPage(0);
    this.getNewVcode();
  },
  onTapIsignup: function() {
    this.switchPage(1);
    this.getNewVcode();
  },
  onTapIforgot: function() {
    this.switchPage(2);
    this.getNewVcode();
  },
  /**
   * 登录
   */
  onLoginSubmit: function(e) {
    if (this.data.BLoading == true) {
      return;
    }
    let u_email = e.detail.value.email;
    let u_pass = e.detail.value.passwd;
    let u_vcode = e.detail.value.verifycode;
    if (u_email == null || u_pass == null || u_vcode == null) {
      app.showError('输入错误');
      return;
    }

    if (u_email.indexOf('@') < 1) {
      app.showError('邮箱格式错误');
      return;
    }
    if (u_pass.length < 5) {
      app.showError('密码长度太短');
      return;
    }
    if (u_vcode.length != 5) {
      app.showError('验证码错误');
      return;
    }
    this.setData({ BLoading: true });
    http.api_request(app.globalData.ApiUrls.LoginURL,
      {
        email: u_email,
        password: u_pass,
        verify: u_vcode
      },
      function(res) {
        if (typeof res == 'object') {
          if (res.hasOwnProperty('status') && res.status == 1) {
            if (rememberPW) {
              my.setStorageSync({ key: 'UserName', data: u_email });
              my.setStorageSync({ key: 'PassWord', data: u_pass });
            }
            my.redirectTo({
              url: '../userMember/userMember',
            });
          }
          else {
            app.showError(res.info);
            this.getNewVcode();
          }
        }
        else {
          app.showError('发生错误');
          app.log(res);
        }
        this.setData({ BLoading: false });
      }.bind(this),
      function() {
        app.showError('连接服务器失败');
        this.setData({ BLoading: false });
      }.bind(this));
  },
  /**
   * 注册
   */
  onSignupSubmit: function(e) {
    if (this.data.BLoading == true) {
      return;
    }
    let u_email = e.detail.value.email;
    let u_vcode = e.detail.value.verifycode;
    let u_agree = e.detail.value.agree.length;
    if (u_email == null || u_vcode == null) {
      app.showError('输入错误');
      return;
    }
    if (!u_agree) {
      app.showError('请阅读并同意服务条款和隐私政策');
      return;
    }
    if (u_email.indexOf('@') < 1) {
      app.showError('邮箱格式错误');
      return;
    }

    if (u_vcode.length != 5) {
      app.showError('验证码错误');
      return;
    }
    this.setData({ BLoading: true });
    http.api_request(app.globalData.ApiUrls.SignupURL,
      {
        email: u_email,
        verify: u_vcode,
        agree: ['']
      },
      function(res) {
        if (typeof res == 'object') {
          if (res.status == 1) {
            app.showSuccess(res.info);
            this.switchPage(0);
          }
          else {
            app.showError(res.info);
            this.getNewVcode();
          }
        }
        else {
          app.showError('发生错误');
          app.log(res);
        }
        this.setData({ BLoading: false });
      }.bind(this),
      function() {
        app.showError('连接服务器失败');
        this.setData({ BLoading: false });
      }.bind(this));
  },
  /**
   * 忘记密码
   */
  onForgotPassSubmit: function(e) {
    if (this.data.BLoading == true) {
      return;
    }
    let u_email = e.detail.value.email;
    let u_vcode = e.detail.value.verifycode;
    if (u_email == null || u_vcode == null) {
      app.showError('输入错误');
      return;
    }
    if (u_email.indexOf('@') < 1) {
      app.showError('邮箱格式错误');
      return;
    }

    if (u_vcode.length != 5) {
      app.showError('验证码错误');
      return;
    }
    this.setData({ BLoading: true });
    http.api_request(app.globalData.ApiUrls.ForgotURL,
      {
        email: u_email,
        verify: u_vcode
      },
      function(res) {
        if (typeof res == 'object') {
          if (res.status == 1) {
            app.showSuccess(res.info);
          }
          else {
            app.showError(res.info);
            this.getNewVcode();
          }
        }
        else {
          app.showError('发生错误');
          app.log(res);
        }
        this.setData({ BLoading: false });
      }.bind(this),
      function() {
        app.showError('连接服务器失败');
        this.setData({ BLoading: false });
      }.bind(this));
  },
  onReadPrivacy: function() {
    my.navigateTo({ url: '../thread/thread?id=11689471&is_bt=false' });
  },
  onEat: function(e) {
    app.playEat();
  },
  onRPW: function(e) {
    rememberPW = e.detail.value;
  },
  /**
   * 载入服务条款
   */
  onReadTerms: function() {
    app.getTerms(function(res) {
      if (res === false) {
        app.showError('网络错误');
      }
      else if (res.status != 'ok') {
        app.showError(res.errmsg);
      }
      else {
        this.setData({ termsNodes: WxParse.wxParse('item', 'html', res.data, this, null).nodes, showTermsWindow: true });
      }
    }.bind(this));
  },
  onReadTermsFinish: function() {
    this.setData({ showTermsWindow: false });
  },
  /**
   * 获取新验证码
   */
  getNewVcode: function() {
    this.setData({ vCodeLoading: true, verifyCodeURL: "" });
    http.get_verifycode(function(sta, img, msg) {
      if (sta == false) {
        app.showError(msg);
      }
      this.setData({ vCodeLoading: false, verifyCodeURL: img });
    }.bind(this));
  },
  /**
   * 切换页面
   * 支付宝小程序动画总是不显示，暂时先直接切换
   */
  switchPage: function(new_page) {
    this.setData({ Mode: new_page, TitleText: pageTitles[new_page] });
  },
  /**
   * 获取并显示公告
   */
  showNotice: function(callback) {
    my.httpRequest({
      url: app.globalData.ApiUrls.GetNoticeURL,
      dataType: 'json',
      success: function(res) {
        if (typeof res.data == 'object') {
          if (res.data.errno == '0' && res.data.notice.length > 0) {
            var noticeMark = my.getStorageSync({ key: 'NoticeMark' }).data;
            if (noticeMark == undefined || noticeMark == null || noticeMark == '')
              noticeMark = 0;
            if (noticeMark < res.data.id) {
              my.showModal({
                title: '提示',
                content: res.data.notice,
                confirmText: '不再显示',
                success: function(e) {
                  if (e.confirm == true) {
                    my.setStorageSync({ key: 'NoticeMark', data: res.data.id});
                  }
                  callback();
                }
              });
              return;
            }
          }
        }
        callback();
      },
      fail: function() {
        callback();
      },
    });
  }
});
