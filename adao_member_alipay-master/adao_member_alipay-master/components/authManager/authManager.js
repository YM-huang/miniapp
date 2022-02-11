const _app = getApp();
const _http = require('/utils/http.js');
var _wxParse = require('/wxParse/wxParse.js');
var _timer = null;
var _authData = null;

Component({
  mixins: [],
  data: {
    verifyCodeURL: '',
    vCodeLoading: false,
    EnterButLoading: false,//确认按钮loading
    CertStatus: "请下拉刷新",//实名认证状态
    PhoneStatus: "请下拉刷新",//手机实名认证状态
    CanCert: false,//是否可以手机实名认证（是否显示按钮）
    CertFormShow: false,//实名认证表单是否显示
    Cindex: 0,
    Carray: [
      '中国 - +86', '美国 - +1', '加拿大 - +1', '香港 - +852', '澳门 - +853', '台湾 - +886', '马来西亚 - +60', '印度尼西亚 - +62',
      '新加坡 - +65', '泰国 - +66', '日本 - +81', '韩国 - +82', '越南 - +84', '哈萨克斯坦 - +7', '塔吉克斯坦 - +7', '土耳其 - +90', '印度 - +91',
      '巴基斯坦 - +92', '阿富汗 - +93', '斯里兰卡 - +94', '缅甸 - +95', '伊朗 - +98', '文莱 - +673', '朝鲜 - +850', '柬埔寨 - +855', '老挝 - +865',
      '孟加拉国 - +880', '马尔代夫 - +960', '叙利亚 - +963', '伊拉克 - +964', '巴勒斯坦 - +970', '阿联酋 - +971', '以色列 - +972', '巴林 - +973',
      '不丹 - +975', '蒙古 - +976', '尼珀尔 - +977', '英国 - +44', '德国 - +49', '意大利 - +39', '法国 - +33', '俄罗斯 - +7', '希腊 - +30', '荷兰 - +31',
      '比利时 - +32', '西班牙 - +34', '匈牙利 - +36', '罗马尼亚 - +40', '瑞士 - +41', '奥地利 - +43', '丹麦 - +45', '瑞典 - +46', '挪威 - +47',
      '波兰 - +48', '圣马力诺 - +223', '匈牙利 - +336', '南斯拉夫 - +338', '直布罗陀 - +350', '葡萄牙 - +351', '卢森堡 - +352', '爱尔兰 - +353',
      '冰岛 - +354', '马耳他 - +356', '塞浦路斯 - +357', '芬兰 - +358', '保加利亚 - +359', '立陶宛 - +370', '乌克兰 - +380', '南斯拉夫 - +381',
      '捷克 - +420', '秘鲁 - +51', '墨西哥 - +52', '古巴 - +53', '阿根廷 - +54', '巴西 - +55', '智利 - +56', '哥伦比亚 - +57', '委内瑞拉 - +58',
      '澳大利亚 - +61', '新西兰 - +64', '关岛 - +671', '斐济 - +679', '圣诞岛 - +619164', '夏威夷 - +1808', '阿拉斯加 - +1907', '格陵兰岛 - +299',
      '牙买加 - +1876', '南极洲 - +64672'],
    CertMsg: null,//手机实名认证显示的消息
    ShowCertMsg: false,//是否显示实名认证消息
    CopyLoading: false,//复制手机号loading
    AliPayAuthing: false
  },
  props: {
    hide: true,
    onEndLoadAuth: (event) => null,
    onStartLoadAuth: (event) => null
  },
  didMount() {
    this.$page.authManagerCom = this;
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    startLoadAuth: function() {
      if (_timer != null) {
        clearInterval(_timer);
        _timer = null;
      }

      this.setData({
        CertFormShow: false,
        ShowCertMsg: false,
        loadAuth: false
      });
      this._getCertifiedStatus();
      this.props.onStartLoadAuth({ from: 'auth', needRefresh: false });
    },
    /**
      * 点击了关闭实名认证
      */
    onAuthClose: function() {
      this.setData({ CertFormShow: false });
    },
    /**
      * 确认实名认证
      */
    onEnterAuth: function(e) {
      var u_vcode = e.detail.value.verifycode;
      if (u_vcode.length != 5) {
        _app.showError('验证码错误');
        return;
      }
      if (this.data.EnterButLoading == true) return;
      this.setData({ EnterButLoading: true });

      var u_country = parseInt(this.data.Cindex) + 1;
      var u_phone = e.detail.value.phonenumber;
      if (!(/^\d{5,}$/.test(u_phone))) {
        _app.showError('手机号错误');
        return false;
      }
      this.props.onStartLoadAuth({ from: 'auth', needRefresh: false });
      _http.api_request(
        _app.globalData.ApiUrls.MobileCertURL,
        {
          verify: u_vcode,//验证码
          mobile_country_id: u_country,//国家序号
          mobile: u_phone//手机号
        },
        function(res) {
          try {
            if (res.status == 0) {
              _app.showError(res.info);
              this._getNewVcode();
            }
            else {
              _authData = res;
              res = res.replace(/\r/g, "");
              res = res.replace(/\n/g, "");

              var body_match = res.match(/<form[\s\S]*?>[\s\S]*?<\/form>/ig);
              if (body_match != null) {
                body_match[0] = body_match[0].replace(/tpl-form-maintext">[\s\D]*<b>/ig, "Sdata\"><b>");
                this.setData({
                  CertMsg: _wxParse.wxParse('item', 'html', body_match[0], this, null).nodes,
                  ShowCertMsg: true,
                  CertFormShow: false
                });
                this._waitCert();
              }
              else {
                _app.showError('发生了错误');
              }
            }
          }
          catch (err) {
            _app.log(err.message);
          }
          finally {
            this.setData({ EnterButLoading: false });
            this.props.onEndLoadAuth({ from: 'auth', needRefresh: false });
          }
        }.bind(this),
        function() {
          _app.showError('发生了错误');
          this.setData({ EnterButLoading: false });
          this.props.onEndLoadAuth({ from: 'auth', needRefresh: false });
        }.bind(this));
    },
    onAlipayAuthTap: function() {
      this.setData({AliPayAuthing:true});
      my.getAuthCode({
        scopes: 'auth_user',
        success: (res) => {
          _http.api_request(_app.globalData.ApiUrls.AliPayAuthURL, {code:res.authCode},
          function(res) {
            if(res.status == 'ok') {
              _app.showSuccess(res.userInfo.Id);
            }
            else {
              app.showError(res.errMsg);
            }
            this.setData({AliPayAuthing:false});
          }.bind(this)
          ,function() {
            _app.showError('网络错误');
            this.setData({AliPayAuthing:false});
          }.bind(this));
        },
        fail: () => {
          this.setData({AliPayAuthing:false});
          _app.showError('获取信息失败');
        }
      }).bind(this);
    },
    /**
     * 点击了开始实名认证
     */
    onPhoneCert: function() {
      this._getNewVcode();
      this.setData({ CertFormShow: true });
    },
    /**
     * 修改了国家选择Picker
     */
    onPickerChange: function(e) {
      this.setData({ Cindex: e.detail.value });
    },
    /**
     * 点击了复制手机号
     */
    onCopyAuthPhoneNumber: function(e) {
      if (this.data.CopyLoading == true) return;
      this.setData({ CopyLoading: true });

      _http.api_request(
        _app.globalData.ApiUrls.GetAuthPhoneURL,
        {
          rawdata: _authData,
        },
        function(res) {
          if (res == null || res == "error") {
            _app.showError('复制失败');
          }
          else {
            my.setClipboard({
              text: res,
              success: function() {
                _app.showSuccess('复制完成');
              },
              fail: function() {
                _app.showError('复制失败');
              }
            });
          }
          this.setData({ CopyLoading: false });
        }.bind(this),
        function() {
          _app.showError('获取失败');
          this.setData({ CopyLoading: false });
        }.bind(this)
      );
    },

    /**
     * 获取新验证码
     */
    _getNewVcode: function() {
      this.setData({
        vCodeLoading: true,
        verifyCodeURL: '../../imgs/loading.gif'
      });

      _http.get_verifycode(function(sta, img, msg) {
        if (sta == false) {
          _app.showError(msg);
        }
        this.setData({
          vCodeLoading: false,
          verifyCodeURL: img
        });
      }.bind(this));
    },
    /**
     * 获取当前认证状态
     */
    _getCertifiedStatus: function() {
      _http.api_request(
        _app.globalData.ApiUrls.CertifiedStatusURL,
        null,
        function(res) {
          if (typeof res == 'string') {
            res = res.replace(/ /g, '');
            res = res.replace(/\r/g, '');
            res = res.replace(/\n/g, '');
            var cert_status = '';
            var phone_status = '';
            if (res.indexOf('实名状态') > 0) {
              cert_status = res.split('实名状态')[1].match(/<b>[\s\S]*?<\/b>/i);
              if (cert_status != null) {
                cert_status = cert_status[0].replace(/(<b>)|(<\/b>)/ig, '');
                this.setData({ CertStatus: cert_status });
              }
              else {
                _app.showError('实名状态错误');
              }
              if (res.indexOf('已绑定手机') > 0) {//手机认证已经成功的
                phone_status = res.split('已绑定手机')[1].replace(/(><)/g, "").match(/>[\s\S]*?</i);
                if (phone_status != null) {
                  phone_status = phone_status[0].replace(/(>)|(<)/ig, "");
                  if (phone_status != null) {
                    this.setData({ PhoneStatus: phone_status });
                  }
                }
                this.setData({ CanCert: false });
              }
              else if (res.indexOf('绑定手机') > 0) {//未进行手机实名认证
                this.setData({
                  PhoneStatus: '未认证',
                  CanCert: true
                });
              }
            }
            else {
              _app.showError('发生了错误');
            }
          }
          this.props.onEndLoadAuth({ from: 'auth', needRefresh: false });
        }.bind(this),
        function() {
          _app.showError('发生了错误');
          this.props.onEndLoadAuth({ from: 'auth', needRefresh: false });
        }.bind(this)
      );
    },
    /**
     * 等待认证成功
     */
    _waitCert: function() {
      _timer = setInterval(function() {
        _http.api_request(_app.globalData.ApiUrls.MobileCheckURL,
          null,
          function(res) {
            console.log(res);
            if (res == true) {
              clearInterval(_timer);
              _timer = null;
              _app.log('phone auth success');
              this.props.onEndLoadAuth({ from: 'auth', needRefresh: true });
            }
          }.bind(this),
          function() {

          }
        );
      }.bind(this), 5000);
    },
    /**
     * 刷新验证码
     */
    onTapVerifyCode: function(e) {
      this._getNewVcode();
    }
  },
});
