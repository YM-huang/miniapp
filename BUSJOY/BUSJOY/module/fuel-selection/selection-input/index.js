import { OIL_MAP, PETROL_LIST, DIESEL_LIST } from '../../../common/constant';

Component({
  props: {
    label: '',
    text: '',
    value: '',
    onSelect: null,
    onChange: null,
    list: [],
    type: '',
    fuelTypeList: []
  },
  data: {
    OIL_MAP,
    PETROL_LIST,
    DIESEL_LIST,
    petrolList: [],
    dieselList: [],
    pickerShow: false,
    selectedValue: ''
  },
  didMount() {
    this.setData({
      selectedValue: this.props.value
    });
  },
  methods: {
    /**
     * 打开弹出浮层
     */
    onOpenSelect(e) {
      const { onSelect } = this.props;
      onSelect().then(res => { // res 当前油站的可选油品
        const list = this.props.list;
        let petrolList = [];
        let dieselList = [];
        if (list && list[0] && list[0].oilType) { // 油品列表
          res.map(item => {
            let isPetrol = PETROL_LIST.some(i => i.oilType === item.oilType);
            if (isPetrol) {
              petrolList.push(item);
            } else {
              dieselList.push(item);
            }
          });
        };
        const { pickerShow } = this.data;
        this.setData({
          petrolList,
          dieselList,
          selectedValue: this.props.value,
          pickerShow: true
        }, () => {
        });
      });
    },
    /**
     * 选择油品型号
     */
    onChange(e) {
      const { onChange } = this.props;
      const { selectedValue } = this.data;
      const value = e.currentTarget.dataset.value;
      if (value !== selectedValue) {
        this.setData({
          selectedValue: value,
          pickerShow: false
        }, () => {
          onChange && onChange(value);
        });
      }
    },
    onClosePopup() {
      this.setData({
        pickerShow: false
      });
    }
  }
});
