Page({
  data: {
    docParamsImg: "https://gw.alicdn.com/tfs/TB1n9NAQNTpK1RjSZR0XXbEwXXa-1512-734.png",
    prizeList: [
      {
      'name': '谢谢参与1',
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
      'name': '谢谢参与2',
      'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
      'name': '1元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/RxQruKQwiQCeYXhvwCfP.png'
      },
      {
      'name': '谢谢参与3',
      'icon': 'https://zos.alipayobjects.com/rmsportal/dexmbhnbsLRGIZGBqTcA.png'
      },
      {
      'name': '5元红包',
      'icon': 'https://zos.alipayobjects.com/rmsportal/qanDEFeGBoiPflYxkhJY.png'
      }
    ],
    cardBgImg: 'https://gw.alicdn.com/tfs/TB1P.AMXMHqK1RjSZJnXXbNLpXa-610-600.png',
    prizeName: '',
    flipAllCards: false,
    isDrawing: false,
  },
  onFlipStart() {
    console.log('开始了，这个时候最好页面控制下 loading 状态，组件内不做控制');
    this.setData({
      isDrawing: true, // 修改抽奖状态，防止重复点击多次请求
    });
    // 开始抽奖
    setTimeout(() => {
      console.log('拿到结果，设置奖品信息');
      if (Math.random() > 0.3) {
        this.setData({
          prizeName: '666元红包',
          isDrawing: false,
        });
      } else {
        this.setData({
          isDrawing: false, // 抽奖结束一定要还原 isDrawing 状态
        });
      }
      setTimeout(() => {
        this.showResultDialog()
      }, 1000);
    }, 300);
  },
  showResultDialog() {
    // do something
    this.setData({
      flipAllCards: true, // 将剩下未翻过的牌自动翻，展示奖品结果。
    })
  }
});