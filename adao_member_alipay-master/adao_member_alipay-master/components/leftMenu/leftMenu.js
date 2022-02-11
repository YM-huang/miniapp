Component({
  props: {
    onPageChange: (id) => null
  },
  data: {
    settings: {}
  },
  didMount: function () {
    let userName = my.getStorageSync({ key: 'UserName' }).data;
    if (userName == null || userName == '') {
      userName = '匿名肥宅';
    }
    this.setData({
      settings: {
        show: false,
        selectedIndex: 0,
        picURL: '',
        userName: userName,
        menuList: [{
          name: '饼干管理',
          icon: 'cookie',
          canSwitch: true
        }, {
          name: '实名认证',
          icon: 'certified',
          canSwitch: true
        }, {
          name: '密码修改',
          icon: 'passwd',
          canSwitch: true
        }, {
          name: '关于',
          icon: 'about',
          canSwitch: false
        }, {
          name: '退出',
          icon: 'exit',
          canSwitch: false
        },
        ]
      }});
    getApp().getImage(function (url) {
      this.setData({ 'settings.picURL': url });
    }.bind(this));
  },
  methods: {
    /**
     * 点击了左上角菜单按钮
     */
    onTapMenuButton: function (e) {
      this.setData({ 'settings.show': true });
    },
    /**
     * 切换页面
     */
    onTapMenuItem: function (e) {
      this.props.onPageChange(e.currentTarget.id);
      if (this.data.settings.menuList[e.currentTarget.id].canSwitch == true) {
        this.setData({ 'settings.selectedIndex': e.currentTarget.id });
      }
      this.setData({ 'settings.show': false });
    },
    
    /**
     * 点击了遮罩层
     */
    onTapOverlay: function () {
      this.setData({ 'settings.show': false });
    },
    onViewImage: function () {
      my.previewImage({
        urls: [this.data.settings.picURL],
      });
      getApp().getImage(function (url) {
        this.setData({ 'settings.picURL': url });
      }.bind(this));
    }
  }
})
