if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

var AFAppX = self.AFAppX;
self.getCurrentPages = AFAppX.getCurrentPages;
self.getApp = AFAppX.getApp;
self.Page = AFAppX.Page;
self.App = AFAppX.App;
self.my = AFAppX.bridge || AFAppX.abridge;
self.abridge = self.my;
self.Component = AFAppX.WorkerComponent || function(){};
self.$global = AFAppX.$global;
self.requirePlugin = AFAppX.requirePlugin;


if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/value-module/value-module?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/green-energy/green-energy?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/action-button/action-button?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/card/card?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/market-card/market-card?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/evaluate/evaluate?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/process/process?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/sale-after/sale-after?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/cert-service/cert-service?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/question/question?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/advance-list/advance-list?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/super-page/super-page?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/pay-info/pay-info?hash=ec33e949fbb2439f85f223f27e79a397254d19f6');
require('../../components/stand-out-card/stand-out-card?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/passway/passway?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/routes/routes?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/to-desktop/to-desktop?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/transfer/transfer?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/operation/operation?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/station/station?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/collapse/collapse?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/collapse-item/collapse-item?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/tips/tips-dialog/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/button/index?hash=e1617a0257fb9de746f60d50b03404ad924976c9');
require('../../pages/index/index?hash=58e13e36f5686f44fdcdc7a7f2d8a61e5f296e12');
require('../../pages/onbus/onbus?hash=58e13e36f5686f44fdcdc7a7f2d8a61e5f296e12');
require('../../pages/my/my?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/square/square?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}