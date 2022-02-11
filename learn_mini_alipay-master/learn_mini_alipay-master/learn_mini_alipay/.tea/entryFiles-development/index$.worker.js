/**! __CODEPLACEHOLDER_START__ */ /*[PositionForHostEntryCodeBegin]*/ /**! __CODEPLACEHOLDER_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
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
require('../../node_modules/mini-ali-ui/es/loading/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/list/index?hash=e1617a0257fb9de746f60d50b03404ad924976c9');
require('../../node_modules/mini-ali-ui/es/list/auto-size-img/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/am-icon/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/list/list-item/index?hash=a5465b8c889360e3f854461d3ac41cf414aec633');
require('../../node_modules/mini-ali-ui/es/container/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/title/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/list/alphabet/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/list/list-secondary/index?hash=f75be69226a587e5ccc990c4b63309fd714f1354');
require('../../node_modules/mini-ali-ui/es/tag/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/am-switch/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/am-radio/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/button/index?hash=e1617a0257fb9de746f60d50b03404ad924976c9');
require('../../node_modules/mini-ali-ui/es/input-item/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/badge/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/tabs/index?hash=4a98b35daa3eee1b62960d4d5bbcbf254cbf11e3');
require('../../node_modules/mini-ali-ui/es/tabs/tab-content/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/vtabs/index?hash=8b610b99cb09aec3e648972838092b2b24db30c0');
require('../../node_modules/mini-ali-ui/es/vtabs/vtab-content/index?hash=a11fdcdff8ea970c65f185a8731cafe48f67047c');
require('../../node_modules/mini-ali-ui/es/card/index?hash=8c77e86e89c40c5b2ab9f0f22cf86a6245babc59');
require('../../node_modules/mini-ali-ui/es/coupon/index?hash=8c77e86e89c40c5b2ab9f0f22cf86a6245babc59');
require('../../node_modules/mini-ali-ui/es/am-checkbox/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/stepper/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/pagination/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/grid/index?hash=45fe1418d25fc81c09eccb62e0568b7faa62b362');
require('../../node_modules/mini-ali-ui/es/steps/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/footer/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/terms/index?hash=4640cae333019b72d6048efaae42781fd5b8e6b5');
require('../../node_modules/mini-ali-ui/es/flex/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/flex/flex-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/collapse/index?hash=a11fdcdff8ea970c65f185a8731cafe48f67047c');
require('../../node_modules/mini-ali-ui/es/collapse/collapse-item/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/popover/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/popover/popover-item/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/filter/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/filter/filter-item/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/modal/index?hash=febd4c40992222524e0db12a74760a28f8f9b339');
require('../../node_modules/mini-ali-ui/es/popup/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/page-result/index?hash=d0576ccfd535a385248496d7543e622723df8261');
require('../../node_modules/mini-ali-ui/es/message/index?hash=febd4c40992222524e0db12a74760a28f8f9b339');
require('../../node_modules/mini-ali-ui/es/notice/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/mask/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/guide/index?hash=b94cb51b165c8f2e5218b3df94c010a3b88e145a');
require('../../node_modules/mini-ali-ui/es/avatar/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/verify-code/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/picker-item/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/long-password/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/multi-liner/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/amount-input/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/search-bar/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/mini-ali-ui/es/swipe-action/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/mini-ali-ui/es/calendar/index?hash=5a0c180d5ccf7c9d483dd4817cdab5489824013c');
require('../../node_modules/ant-mini-wheel-draw/es/wheel/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/ant-mini-fruit-slots/es/fruit-slots/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/ant-mini-scratch-card/es/scratch/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/ant-mini-hit-eggs/es/hit-eggs/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/ant-mini-dice-roller/es/component/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/ant-mini-flip-draw/component/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../node_modules/ant-mini-lock/src/lock/index?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/index/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/view_container/view_container?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/swiper/swiper?hash=47210a17c63210b43522855ebfc966f3191398eb');
require('../../pages/scroll-view/scroll-view?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cover-view/cover-view?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/cover-image/cover-image?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/movable-view/movable-view?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/movable-area/movable-area?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/text/text?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/icon/icon?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/login/login?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/progress-view/progress-view?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/rich-text/rich-text?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/button/button?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/form/form?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/label/label?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/input/input?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/textarea/textarea?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/radio/radio?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/radio-group/radio-group?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/switch/switch?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/slider/slider?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/picker-view/picker-view?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/picker/picker?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/navigator/navigator?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/navigator/navigate/navigate?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/navigator/reLaunch/reLaunch?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/navigator/redirect/redirect?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/media-image/media-image?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/media-video/media-video?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/canvas/canvas?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/map/map?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/extend/extend?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/extend/container/container?hash=b3c00e752e7ec314af9579f9179a32a834e699b3');
require('../../pages/extend/title/title?hash=c9a7529957ce4324abe0bf8c68349021d04b8326');
require('../../pages/extend/list/list?hash=6afb217eadccd1c4e8bfda0d0b7fb88324ecf08f');
require('../../pages/extend/list-item/list-item?hash=1618869d18fe6fbea7737996ba7613c72dfeb4b4');
require('../../pages/extend/list-secondary/list-secondary?hash=a65fcaad1d19b0193d1041447ce6a51c4ef81bc6');
require('../../pages/extend/tabs/tabs?hash=84ab3c59a0b72e3104e9cc541477ed9d8e62d692');
require('../../pages/extend/vTabs/vTabs?hash=2296ef389944d9bd871f757f80fab9d2827ec014');
require('../../pages/extend/card/card?hash=bb6be94eeb1a277c746c1e9a0a8507e056c481bf');
require('../../pages/extend/coupon/coupon?hash=280018b78801a70159fb66bcbc5e627c2b38ba86');
require('../../pages/extend/grid/grid?hash=b317a9fd5ad132854a863a551c13d0dc2d95225e');
require('../../pages/extend/grid/2/2?hash=b8c48e15d1704e83c2ec16652c29410e71290ee4');
require('../../pages/extend/grid/3/3?hash=b8c48e15d1704e83c2ec16652c29410e71290ee4');
require('../../pages/extend/grid/4/4?hash=b8c48e15d1704e83c2ec16652c29410e71290ee4');
require('../../pages/extend/grid/5/5?hash=bfe16bd2962d81d753613dcb122f83416ba37d41');
require('../../pages/extend/steps/steps?hash=ce15ca314f4e2c41381f2fc690c0674c1f2a1284');
require('../../pages/extend/footer/footer?hash=4f37b8153d8cc873b272587329c9848cc827eada');
require('../../pages/extend/terms/terms?hash=1896fff3440da86702cfd7229d67d82a72533f89');
require('../../pages/extend/flex/flex?hash=5d86f384244ee40ea6500a270a121b3c10155863');
require('../../pages/extend/collapse/collapse?hash=58a5c807c870b679f8f2f354b19e04cb5a519a87');
require('../../pages/extend/popover/popover?hash=490c00a5c6a87b666b9e9d19a5b1063d2256321f');
require('../../pages/extend/filter/filter?hash=47210a17c63210b43522855ebfc966f3191398eb');
require('../../pages/extend/filter/alternative/alternative?hash=dbdc9d0e20c60b714c74963273797b8360a8908e');
require('../../pages/extend/filter/single/single?hash=dbdc9d0e20c60b714c74963273797b8360a8908e');
require('../../pages/extend/filter/single_1/single_1?hash=dbdc9d0e20c60b714c74963273797b8360a8908e');
require('../../pages/extend/filter/single_2/single_2?hash=dbdc9d0e20c60b714c74963273797b8360a8908e');
require('../../pages/extend/modal/modal?hash=ef78849018bf45d6005d25b062348602afb28b5f');
require('../../pages/extend/popup/popup?hash=436c167f82f36f09d71fbd106bb283607b26b1c3');
require('../../pages/extend/page-result/page-result?hash=47210a17c63210b43522855ebfc966f3191398eb');
require('../../pages/extend/page-result/busy/busy?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/empty/empty?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/error/error?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-busy/local-busy?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-empty/local-empty?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-error/local-error?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-logoff/local-logoff?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-network/local-network?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-payment/local-payment?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/local-redpacket/local-redpacket?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/log-off/log-off?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/network/network?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/payment/payment?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/page-result/redpacket/redpacket?hash=ca3bf2b6af70c7a002faa077295ac6ea3b726a40');
require('../../pages/extend/message/message?hash=c7f85906aacdfb84b5d50b0c474545b9172549ff');
require('../../pages/extend/tips/tips?hash=3eeda5c1914be4a182d8895ace0efbd0fe301688');
require('../../pages/extend/notice/notice?hash=24befb715ab77f86d43286621d448f45e99b429e');
require('../../pages/extend/badge/badge?hash=b3867b5400df2ef6143a00eef26e2f70bbca9bf2');
require('../../pages/extend/tag/tag?hash=672b7332ddd1fc71f0ef1084501561dc44761a87');
require('../../pages/extend/mask/mask?hash=882b2ab2541696767f2bab0c9b28f6c019a76e58');
require('../../pages/extend/guide/guide?hash=f8d11da5cbcb13ea94cc5809c82d49956a00f499');
require('../../pages/extend/avatar/avatar?hash=705a2f94ea397bf841e0823bbab8de19577ad341');
require('../../pages/extend/input-item/input-item?hash=3eeda5c1914be4a182d8895ace0efbd0fe301688');
require('../../pages/extend/verify-code/verify-code?hash=69acb41161264c87c08b683621baed371f71c3e1');
require('../../pages/extend/picker-item/picker-item?hash=ed025514b9d3bed0c96e1b769f5b86ede95505e2');
require('../../pages/extend/long-password/long-password?hash=cfb8cd210ec2798d431c61e717440e0583a70bb3');
require('../../pages/extend/multi-liner/multi-liner?hash=15a5a5a00c913cbbe9f1b387e1a69eedcca8174e');
require('../../pages/extend/amount-input/amount-input?hash=0b4e770d93b899b6d99d272d39ac1e20692de5df');
require('../../pages/extend/button/button?hash=9fd67049f089cff9a513ab11c7a26e9d40b6a236');
require('../../pages/extend/am-switch/am-switch?hash=bf40688049b227059eec821572098c905b917194');
require('../../pages/extend/search-bar/search-bar?hash=dca8cd6db4fda882854ef8e52a58eb0c83e76e0d');
require('../../pages/extend/am-radio/am-radio?hash=3930b793bedbb5bce57252b2568d4e1a9ad8ea1b');
require('../../pages/extend/am-checkbox/am-checkbox?hash=b85b2556f255836dd4c848e42bae5f9551a44889');
require('../../pages/extend/switch-action/switch-action?hash=d50f498e5faf64b276ed780f2c2a2fd80bd91c3f');
require('../../pages/extend/pagination/pagination?hash=abcd5e2be34389d1bef4361545f819bc459a9bce');
require('../../pages/extend/calendar/calendar?hash=6ee3c487dba3fe64d43560e8b7ff867613d9881d');
require('../../pages/extend/steper/steper?hash=cfd53b0237b5983f098c9315f667642cbbacac0d');
require('../../pages/extend/am-icon/am-icon?hash=9d83a615ce5b871850ea4f92cabb2c24dc7e93c1');
require('../../pages/extend/alphabet/alphabet?hash=e58a9b12ffb1e7da2d5e109d1b3e29f4203e021e');
require('../../pages/extend/loading/loading?hash=fe954fbdec3e79f5c845dc204667151041dfb398');
require('../../pages/marketing/marketing?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/marketing/wheel-draw/wheel-draw?hash=811089f5f6c18bbaa2d701025bb7684f44658707');
require('../../pages/marketing/fruit-slots/fruit-slots?hash=775f6139cbfdab008fbbd6ff709735ca6401a7cd');
require('../../pages/marketing/scratch-card/scratch-card?hash=8cd776d77706e7340fd26d0b5eadcd5011efd7d5');
require('../../pages/marketing/hit-eggs/hit-eggs?hash=517b840779989d02abf2aacd696da8e2ad5d8073');
require('../../pages/marketing/dice-roller/dice-roller?hash=55f34f56189e9bca9c1a272cecde33b29aca1f47');
require('../../pages/marketing/flip-draw/flip-draw?hash=0ac927680d30c57ea0b834f571fe76f729e1cc85');
require('../../pages/marketing/lock/lock?hash=c5a00171791521abb7e3275039e955642562e87c');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}