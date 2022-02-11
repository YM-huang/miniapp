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
  onSubmit() {
    //点击按钮提交
    // my.alert({ title: 'You click submit' });
    // 进行页面跳转
    my.navigateTo({ url: '../view_container/view_container' });
  },
  onSwiper() {
    my.navigateTo({ url: '../swiper/swiper' });
  },
  onScrollView() {
    my.navigateTo({url:'../scroll-view/scroll-view'});
  },
  onCoverView() {
    my.navigateTo({url:'../cover-view/cover-view'});
  },
  onCoverImage(){
    my.navigateTo({url:'../cover-image/cover-image'});
  },
  onMovableView(){
    my.navigateTo({url:'../movable-view/movable-view'});
  },
  onMovableArea(){
    my.navigateTo({url:'../movable-area/movable-area'});
  },
  onText(){
    my.navigateTo({url:'../text/text'});
  },
  onIcon () {
    my.navigateTo({url:'../icon/icon'});
  },
  onLogin() {
    my.navigateTo({url:'../login/login'});
  },
  onProgress() {
    my.navigateTo({url:'../progress-view/progress-view'});
  },
  onRichText() {
    my.navigateTo({url:'../rich-text/rich-text'});
  },
  onButton() {
    my.navigateTo({url:'../button/button'});
  },
  onForm() {
    my.navigateTo({url:'../form/form'});
  },
  onLabel() {
    my.navigateTo({url:'../label/label'});
  },
  onInput() {
    my.navigateTo({url:'../input/input'});
  },
  onTextarea(){
    my.navigateTo({url:'../textarea/textarea'});
  },
  onRadio() {
    my.navigateTo({url:'../radio/radio'});
  },
  onSwitch() {
    my.navigateTo({url:'../switch/switch'});
  },
  onSlider() {
    my.navigateTo({url:'../slider/slider'});
  },
  onPickerView(){
    my.navigateTo({url:'../picker-view/picker-view'});
  },
  onPicker(){
    my.navigateTo({url:'../picker/picker'});
  },
  onNavigator(){
    my.navigateTo({url:'../navigator/navigator'});
  },
  onMediaImage(){
    my.navigateTo({url:'../media-image/media-image'});
  },
  onMediaVideo(){
    my.navigateTo({url:'../media-video/media-video'});
  },
  onCanvas(){
    my.navigateTo({url:'../canvas/canvas'});
  },
  onMap(){
    my.navigateTo({url:'../map/map'});
  },
  onExtend(){
    my.navigateTo({url:'../extend/extend'});
  },
  onMarketing(){
    my.navigateTo({url:'../marketing/marketing'});
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
