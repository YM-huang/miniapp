import { Rpc } from './rpc/rpc.js';
import { Throw } from './rpc/throw.js';
import mockStationDetailData from './mock/get-station-detail-shop-id.mock';

const settleOrderModelAPI = {
  'get_station_by_shop_id': 'alipay.zimtmsvcprod.queryOilStationListByShopId',
  'get_user_info': 'alipay.zimtmsvcprod.queryUserProfile',
  'create_order': 'alipay.zimtmsvcprod.createOrder'
};

export default {
  async getStationByShopId(params) {
    const mock = 'on';
    const res = await Rpc(settleOrderModelAPI.get_station_by_shop_id, params, mock);
    if (!res.success) return Throw('SYSTEM_ERROR');
    if (mock === 'on') return mockStationDetailData.oilTypeInfoModelList;
    return res && res.oilTypeInfoModelList;
  },
  async getUserInfo(params) {
    const mock = 'on';
    const res = await Rpc(settleOrderModelAPI.get_user_info, params, mock);
    if (!res.success) return Throw('SYSTEM_ERROR');
    if (mock === 'on') return { success: true, resultStatus: '100', isNewUser: true };
    return res;
  },
  async createOrder(params) {
    const mock = 'on';
    const res = await Rpc(settleOrderModelAPI.create_order, params, mock);
    if (!res.success) return Throw('SYSTEM_ERROR');
    if (mock === 'on') return { success: true, resultStatus: '100', tradeNo: '201711152100110410533667792' };
    return res;
  }
};
