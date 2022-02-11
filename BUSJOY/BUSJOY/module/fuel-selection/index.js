import { connect } from 'herculex';

Component(connect({
  mapStateToProps: ['fuelTypeList', 'fuelNumberList', 'currentFuelType', 'currentFuelNumber', 'payMoney', 'stationDetailInfo'],
  mapGettersToProps: []
})({
  didMount() {
    this.onFuelTypeOpen = this.onFuelTypeOpen.bind(this);
  },
  methods: {
    /**
     * 唤起油品型号打开的流程
     */
    onFuelTypeOpen() {
      return this.dispatch('requestFuelTypeList', {});
    },
    /**
     * 修改选中的油品型号
     */
    onFuelTypeChanged(value) {
      this.dispatch('updateCurrentType', { currentFuelType: value });
      this.dispatch('updateCurrentNumber', { currentFuelNumber: '' });
    },
    /**
     * 唤起油枪打开的流程
     */
    onFuelNumberOpen() {
      return this.dispatch('requestFuelNumberList', {});
    },
    /**
     * 修改选中的油枪号
     */
    onFuelNumberChanged(value) {
      this.dispatch('updateCurrentNumber', { currentFuelNumber: value });
    }
  }
}));
