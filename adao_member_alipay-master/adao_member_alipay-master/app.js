const hostURL = "https://amember.mfweb.top";

App({
  onLaunch: function() {
  },
  globalData: {
    ApiUrls: {
      VerifyCodeURL: hostURL + "/nmb/Member/User/Index/verify.html",//请求验证码
      LoginURL: hostURL + "/nmb/Member/User/Index/login.html",//登录
      SignupURL: hostURL + "/nmb/Member/User/Index/sendRegister.html",//注册
      ForgotURL: hostURL + "/nmb/Member/User/Index/sendForgotPassword.html",//忘记密码
      CheckSessionURL: hostURL + "/nmb/Member/User/Index/index.html",//检查是Session是否有效
      CookiesListURL: hostURL + "/nmb/Member/User/Cookie/index.html",//饼干列表
      CookieDeleteURL: hostURL + "/nmb/Member/User/Cookie/delete/id/",//删除饼干
      CookieGetQRURL: hostURL + "/nmb/Member/User/Cookie/export/id/",//获取饼干二维码
      CookieGetDetailURL: hostURL + "/nmb/Member/User/Cookie/switchTo/id/",//获取饼干内容
      CookieGetNewURL: hostURL + "/nmb/Member/User/Cookie/apply.html",//获取新饼干
      CertifiedStatusURL: hostURL + "/nmb/Member/User/Authentication/mobile.html",//认证状态
      MobileCertURL: hostURL + "/nmb/Member/User/Authentication/mobileReverseAuthCode",//手机认证
      MobileCheckURL: hostURL + "/nmb/Member/User/Authentication/isBindMobile",//手机认证校验
      ChangePasswordURL: hostURL + "/nmb/Member/User/Index/changePassword.html",//修改密码
      LogoutURL: hostURL + "/nmb/Member/User/Index/logout.html",//退出登录

      AliPayAuthURL: hostURL + "/adao/member/alipay_get_user_info.php",//支付宝实名认证
      GetNoticeURL: hostURL + "/adao/member/notice.php",//获取公告
      GetAuthPhoneURL: hostURL + "/adao/member/getphone.php",//获取三酱验证手机号
      GetRandomPicURL: hostURL + "/adao/getpicture.php",//获取随机图
      Tnnaii_H_IslandURL: "http://cdn.aixifan.com/h/mp3/tnnaii-h-island-c.mp3",//奈奈-食我大雕
      //获取分享串
      GetSharesURL: hostURL + "/adao/getshare.php",
      //获取服务条款
      GetTermsURL: hostURL + "/adao/member/getterms.php",
    }
  },
  showSuccess: function(msg) {
    if (msg.length > 7) {
      my.alert({
        title: '提示',
        content: msg,
        buttonText: '确认'
      })
    }
    else {
      my.showToast({
        type: 'success',
        content: msg
      });
    }
  },
  showError: function(msg) {
    let xmsg = '无';
    if (typeof msg != 'string') {
      if (typeof msg != 'undefined') {
        try {
          xmsg = JSON.stringify(msg);
        }
        catch (err) {
          xmsg = typeof msg;
        }
      }
      msg = '错误';
    }

    if (msg.length > 7) {
      my.alert({
        title: '错误',
        content: msg,
        buttonText: '确认'
      })
    }
    else {
      my.showToast({
        content: msg,
        type: 'fail'
      });
    }
  },
  log: function(msg) {
    console.log(msg);
    if (my.getLogManager) {
      const logger = my.getLogManager();
      logger.log(msg);
    }
  },
  logOut: function() {
    my.httpRequest({
      url: this.globalData.ApiUrls.LogoutURL,
      dataType: 'text',
      success: function(res) {
        my.reLaunch({
          url: '../index/index'
        });
      },
      fail: function(){
        this.showError('退出登录失败');
      }.bind(this)
    });
  },
  playEat: function() {
    my.playBackgroundAudio({
      dataUrl: this.globalData.ApiUrls.Tnnaii_H_IslandURL,
    });
  },
  getTerms: function(callback = null) {
    var terms_saved;
    try {
      terms_saved = JSON.parse(my.getStorageSync({ key: 'Terms'})).data;
    }
    catch (e) {
      terms_saved = null;
    }

    if (terms_saved == null || Date.parse(new Date()) - terms_saved.get_time > (1 * 60 * 60 * 1000)) {
      my.httpRequest({
        url: this.globalData.ApiUrls.GetTermsURL,
        dataType: 'text',
        success: function(res) {
          if (res.data[0] == '{') {
            res.data = JSON.parse(res.data);
          }
          if (res.data.status == 'ok' && res.data.status !== undefined) {
            res.data.get_time = Date.parse(new Date());
            my.setStorageSync({ key: 'Terms', data: JSON.stringify(res.data) });
          }
          if (callback != null) {
            callback(res.data);
          }
        },
        fail: function() {
          if (callback != null) {
            if (terms_saved != null) {
              callback(terms_saved);
            }
            else {
              callback(false);
            }
          }
        }
      });
    }
    else {
      if (callback != null) {
        callback(terms_saved);
      }
    }
  },
  getImage: function(success) {
    my.httpRequest({
      url: this.globalData.ApiUrls.GetRandomPicURL,
      dataType: 'text',
      success: function(res) {
        if (res.data != undefined && res.data != '') {
          success(res.data);
        }
      }
    });
  }
});
