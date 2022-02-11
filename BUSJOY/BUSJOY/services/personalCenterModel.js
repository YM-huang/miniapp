import { Rpc } from './rpc/rpc.js';
import { Throw } from './rpc/throw.js';
import mockPayRecordsData from './mock/get-pay-records.mock';

const personalCenterModelAPI = {
  'get_pay_records': 'alipay.zimtmsvcprod.queryOrderList'
};

export default {
  async getPayRecords(params) {
    // TODO 在这里进行数据处理
    const mock = 'on';
    const res = await Rpc(personalCenterModelAPI.get_pay_records, params, mock);
    if (!res.success || res.resultStatus !== '100') return Throw('SYSTEM_ERROR');
    if (mock === 'on') return mockPayRecordsData;
    return res;
  }
};
