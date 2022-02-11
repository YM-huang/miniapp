import { Rpc } from './rpc/rpc.js';
import { Throw } from './rpc/throw.js';
import mockDropListData from './mock/get-drop-list.mock';

const searchModelAPI = {
  'get_drop_list': 'alipay.zimtmsvcprod.queryAddresListBykeywords',
  'get_search_history_list': 'alipay.isasp.svccampuscard.check'
};

export default {
  async getDropList(params) {
    // TODO 在这里进行数据处理
    const mock = 'on';
    let res = await Rpc(searchModelAPI.get_drop_list, params, mock);
    if (!res.success) return Throw('SYSTEM_ERROR');
    if (mock === 'on') return mockDropListData;
    return res;
  }
};
