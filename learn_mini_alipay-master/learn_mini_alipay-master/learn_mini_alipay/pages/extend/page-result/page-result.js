Page({
  data: {
    components: [
      {
        name: 'network',
        nameZN: '网络',
        path: './network/network',
      },
      {
        name: 'local-network',
        nameZN: '局部网络',
        path: './local-network/local-network',
      },
      {
        name: 'busy',
        nameZN: '服务繁忙',
        path: './busy/busy',
      },
      {
        name: 'local-busy',
        nameZN: '局部服务繁忙',
        path: './local-busy/local-busy',
      },
      {
        name: 'error',
        nameZN: '系统错误',
        path: './error/error',
      },
      {
        name: 'local-error',
        nameZN: '局部系统错误',
        path: './local-error/local-error',
      },
      {
        name: 'logoff',
        nameZN: '用户已注销',
        path: './log-off/log-off',
      },
      {
        name: 'local-logoff',
        nameZN: '局部用户已注销',
        path: './local-logoff/local-logoff',
      },
      {
        name: 'empty',
        nameZN: '页面空状态',
        path: './empty/empty',
      },
      {
        name: 'local-empty',
        nameZN: '局部空状态',
        path: './local-empty/local-empty',
      },
      {
        name: 'payment',
        nameZN: '付款失败',
        path: './payment/payment',
      },
      {
        name: 'local-payment',
        nameZN: '局部付款失败',
        path: './local-payment/local-payment',
      },
      {
        name: 'redpacket',
        nameZN: '红包领空',
        path: './redpacket/redpacket',
      },
      {
        name: 'local-redpacket',
        nameZN: '局部红包领空',
        path: './local-redpacket/local-redpacket',
      },
    ],
  },
  openPage(e) {
    my.navigateTo({
      url: e.target.dataset.url,
    });
  },
});
