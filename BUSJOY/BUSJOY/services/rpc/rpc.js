'use strict';
import { Throw } from './throw.js';

function Client() {
}
const client = new Client();
export function Rpc(url, data, mock = 'on') {
  if (mock === 'on') {
    return {
      success: true,
      resultStatus: '100'
    };
  }
  const currentPage = getCurrentPages()[getCurrentPages().length - 1];
  currentPage.commit('updateState', { systemError: false });
  try {
    my.call('showLoading', {
      content: '加载中'
    });
    return client.mobilegw({
      operationType: url,
      requestData: [data]
    }).then(response => {
      my.call('hideLoading');
      console.info(`%c ${url} REQUEST`, 'color: #FFa940; font-weight: bold', data);
      console.info(`%c ${url} RESPONSE`, 'color: #FFa940; font-weight: bold', response);
      if (url === 'alipay.zimtmsvcprod.createOrder') { // 创建订单接口
        if (response && response.errorCode === 'IDEMPOTENT_ERROR') { // IDEMPOTENT_ERROR 订单幂等
          return {
            success: true,
            errorCode: 'IDEMPOTENT_ERROR'
          };
        }
      }
      if (!response || !response.success || response.resultStatus !== '100') {
        currentPage.commit('updateState', { systemError: true });
        return Throw('SYSTEM_ERROR');
      }
      return response;
    });
  } catch (e) {
    my.call('hideLoading');
    return {
      success: false,
      message: 'rpc 系统错误'
    };
  }
};
