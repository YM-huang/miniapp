Page({
  onLoad(query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onContainer(){
    my.navigateTo({url:'../extend/container/container'});
  },
  onTitle(){
    my.navigateTo({url:'../extend/title/title'});
  },
  onList(){
    my.navigateTo({url:'../extend/list/list'});
  },
  onListItem(){
    my.navigateTo({url:'../extend/list-item/list-item'});
  },
  onListSecondary(){
    my.navigateTo({url:'../extend/list-secondary/list-secondary'});
  },
  onTabs(){
    my.navigateTo({url:'../extend/tabs/tabs'});
  },
  onVTabs(){
    my.navigateTo({url:'../extend/vTabs/vTabs'});
  },
  onCard(){
    my.navigateTo({url:'../extend/card/card'});
  },
  onCoupon() {
    my.navigateTo({url:'../extend/coupon/coupon'});
  },
  onGrid() {
    my.navigateTo({url:'../extend/grid/grid'});
  },
  onSteps(){
    my.navigateTo({url:'../extend/steps/steps'});
  },
  onFooter(){
    my.navigateTo({url:'../extend/footer/footer'});
  },
  onTerms(){
    my.navigateTo({url:'../extend/terms/terms'});
  },
  onFlex(){
    my.navigateTo({url:'../extend/flex/flex'});
  },
  onCollapse(){
    my.navigateTo({url:'../extend/collapse/collapse'});
  },
  onPopover(){
    my.navigateTo({url:'../extend/popover/popover'});
  },
  onFilter(){
    my.navigateTo({url:'../extend/filter/filter'});
  },
  onModal(){
    my.navigateTo({url:'../extend/modal/modal'});
  },
  onPopup(){
    my.navigateTo({url:'../extend/popup/popup'});
  },
  onPageResult(){
    my.navigateTo({url:'../extend/page-result/page-result'});
  },
  onMessage(){
    my.navigateTo({url:'../extend/message/message'});
  },
  onTips(){
    my.navigateTo({url:'../extend/tips/tips'});
  },
  onNotice(){
    my.navigateTo({url:'../extend/notice/notice'});
  },
  onBadge(){
    my.navigateTo({url:'../extend/badge/badge'});
  },
  onTag(){
    my.navigateTo({url:'../extend/tag/tag'});
  },
  onMask(){
    my.navigateTo({url:'../extend/mask/mask'});
  },
  onGuide(){
    my.navigateTo({url:'../extend/guide/guide'});
  },
  onAvatar(){
    my.navigateTo({url:'../extend/avatar/avatar'});
  },
  onInputItem(){
    my.navigateTo({url:'../extend/input-item/input-item'});
  },
  onVerifyCode(){
    my.navigateTo({url:'../extend/verify-code/verify-code'});
  },
  onPickerItem(){
    my.navigateTo({url:'../extend/picker-item/picker-item'});
  },
  onLongPassword(){
    my.navigateTo({url:'../extend/long-password/long-password'});
  },
  onMultiLiner(){
    my.navigateTo({url:'../extend/multi-liner/multi-liner'});
  },
  onAmountInput(){
    my.navigateTo({url:'../extend/amount-input/amount-input'});
  },
  onExtendButton(){
    my.navigateTo({url:'../extend/button/button'});
  },
  onAmSwitch(){
    my.navigateTo({url:'../extend/am-switch/am-switch'});
  },
  onSearchBar(){
    my.navigateTo({url:'../extend/search-bar/search-bar'});
  },
  onAMRadio(){
    my.navigateTo({url:'../extend/am-radio/am-radio'});
  },
  onAMCheckbox(){
    my.navigateTo({url:'../extend/am-checkbox/am-checkbox'});
  },
  onSwipeAction(){
    my.navigateTo({url:'../extend/switch-action/switch-action'});
  },
  onPagination(){
    my.navigateTo({url:'../extend/pagination/pagination'});
  },
  onCalendar(){
    my.navigateTo({url:'../extend/calendar/calendar'});
  },
  onSteper(){
    my.navigateTo({url:'../extend/steper/steper'});
  },
  onAMIcon(){
    my.navigateTo({url:'../extend/am-icon/am-icon'});
  },
  onAlphabet(){
    my.navigateTo({url:'../extend/alphabet/alphabet'});
  },
  onLoading(){
    my.navigateTo({url:'../extend/loading/loading'});
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
