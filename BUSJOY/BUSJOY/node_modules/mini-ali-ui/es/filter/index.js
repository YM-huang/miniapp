import lifecycle from './mixins/lifecycle';
import getI18n from '../_util/getI18n';
var i18n = getI18n().filter;
Component({
  mixins: [lifecycle],
  data: {
    maxHeight: 0,
    _i18nReset: i18n.reset,
    _i18nConfirm: i18n.confirm
  },
  props: {
    className: '',
    onChange: function onChange() {},
    max: 10000,
    equalRows: 0
  },
  didMount: function didMount() {
    var commonProps = this.data.commonProps;
    var max = this.props.max;
    commonProps.max = max;
  },
  methods: {
    resetFn: function resetFn() {
      var _this$data = this.data,
          items = _this$data.items,
          results = _this$data.results;
      items.forEach(function (element) {
        element.setData({
          confirmStyle: ''
        });
      });
      results.splice(0, results.length);
    },
    confirmFn: function confirmFn() {
      var onChange = this.props.onChange;
      var results = this.data.results;
      onChange(results);
    },
    maskTap: function maskTap() {
      if (this.props.onMaskTap) {
        this.props.onMaskTap();
      }
    }
  }
});