import { Rpc } from './rpc/rpc.js';
import { Throw } from './rpc/throw.js';
import mockStationListData from './mock/get-station-list.mock';

const indexModelAPI = {
  'get_station_list': 'alipay.zimtmsvcprod.queryOilStationListByLbs'
};

export default {
  async getStationList(params) {
    // TODO 在这里进行数据处理
    const mock = 'on';
    let res = await Rpc(indexModelAPI.get_station_list, params, mock);
    if (!res.success) return Throw('SYSTEM_ERROR');
    if (mock === 'on') return mockStationListData;
    return res;
  }
};
