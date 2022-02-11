import getI18n from '../_util/getI18n';
var i18n = getI18n().avatar;
Component({
  props: {
    className: '',
    shape: 'circle',
    size: 'md',
    src: 'https://gw.alipayobjects.com/mdn/rms_ce4c6f/afts/img/A*2iXlQLntttsAAAAAAAAAAAAAARQnAQ',
    name: '',
    desc: '',
    lazyLoad: false
  },
  didMount: function didMount() {
    var _this$props = this.props,
        name = _this$props.name,
        desc = _this$props.desc;

    if (!name && desc) {
      console.error(i18n.error);
    }
  },
  methods: {
    // 图片加载失败
    _onError: function _onError(e) {
      var onError = this.props.onError;

      if (onError) {
        onError(e);
      }
    }
  }
});