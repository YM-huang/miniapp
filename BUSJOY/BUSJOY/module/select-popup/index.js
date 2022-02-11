/**
 * 选择油号弹出框
 */
import { PETROL_LIST, DIESEL_LIST } from '../../common/constant';
Component({
  props: {
    show: false,
    selectedOilType: '',
    onSelect: () => {},
    onClose: () => {}
  },
  data: {
    petrolList: PETROL_LIST,
    dieselList: DIESEL_LIST
  },
  methods: {
    onSelect(e) {
      const { dataset = {} } = e.target;
      const { type } = dataset;
      const onSelect = this.props.onSelect;
      if (onSelect) {
        onSelect(type);
      }
    },
    onClosePopup() {
      const onClose = this.props.onClose;
      if (onClose) {
        onClose();
      }
    }
  }
});
