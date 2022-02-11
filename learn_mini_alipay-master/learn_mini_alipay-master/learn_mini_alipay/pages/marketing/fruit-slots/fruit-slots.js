Page({
  data: {
    docParamsImg: 'https://gw.alicdn.com/tfs/TB1_Z8JQMHqK1RjSZJnXXbNLpXa-1518-1004.png',
    prizeList: [ // prizeList 长度必须为8，其中须包含奖项名字 name 和图标地址 icon
      {
        'name': '谢谢参与',
        'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
        'name': '666元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/nxpXbcNBOmbeIOVCUsuS.png'
      },
      {
      'name': '1元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
        'name': '3元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/tyMAYvTdjRFOVxqWVhsj.png'
      },
      {
        'name': '谢谢参与',
        'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
        'name': '1元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
        'name': '谢谢参与',
        'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
        'name': '5元红包',
        'icon': 'https://zos.alipayobjects.com/rmsportal/qanDEFeGBoiPflYxkhJY.png'
      }
    ],
    prizeName: '5元红包',
    disabled: false,
    currentIndex: 4,
    tipText: '',
  },
  onStart() {
    this.setData({
      tipText: '正在抽奖...'
    });
  },
  onFinish(index, name) {
    this.setData({
      currentIndex: Math.floor(Math.random() * 8),
      tipText: `抽奖结果：${name}`
    });
  }
});