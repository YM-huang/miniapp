/**
 * 选择油号弹出框
 */
import { PETROL_LIST, DIESEL_LIST } from '../../common/constant';
Component({
  props: {
    show: false,
    selectedOilType: '',
    onClose: () => {}
  },
  data: {
    petrolList: PETROL_LIST,
    dieselList: DIESEL_LIST,
    tempSelectOilType: ''
  },
  didMount() {
    this.setData({
      tempSelectOilType: this.props.selectedOilType || '92#'
    });
  },
  methods: {
    onSelect(e) {
      const { dataset = {} } = e.target;
      const { type } = dataset;
      this.setData({
        tempSelectOilType: type
      });
    },
    onClosePopup() {
      const onClose = this.props.onClose;
      const tempSelectOilType = this.data.tempSelectOilType;
      if (onClose) {
        onClose(tempSelectOilType);
      }
    }
  }
});
