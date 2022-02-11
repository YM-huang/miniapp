const wx2my = require('../../wx2my');

Component({
  behaviors: [],
  props: {
    myProperty: ''
  },
  data: {
    name: 'Copyright © Lcl Blog 2018'
  },
  // 私有数据，可用于模版渲染
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () {},
  moved: function () {},
  detached: function () {},
  methods: {
    onMyButtonTap: function () {
      this.setData({// 更新属性和数据的方法与更新页面数据的方法类似
      });
    },
    // 内部方法建议以下划线开头
    _myPrivateMethod: function () {
      // 这里将 data.A[0].B 设为 'myPrivateData'
      this.setData({
        'A[0].B': 'myPrivateData'
      });
    },
    _propertyChange: function (newVal, oldVal) {}
  }
});
