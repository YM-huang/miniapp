import { connect } from 'herculex';
import { goPage } from '../../common/util';

Component(connect({
  mapStateToProps: ['stationLocationList', 'showDetail', 'showFuelStationList'],
  mapGettersToProps: ['selectedOilType']
})({
  props: {},
  data: {
    expand: false
  },
  methods: {
    toggle() {
      console.log(this);
      let p = !this.data.expand;
      this.setData({ expand: p });
    },
    /**
     * 跳转到订单页
     */
    async goToOrderPage(ev) {
      console.log('moveToMapStation', ev);
      const { currentTarget: { dataset: { item } } } = ev; // item 此油站的所有信息
      this.setData({ expand: false });
      goPage('../settle-order/index');
    },
    goToGuide(e) {
      const { currentTarget: { dataset: { item: { longitude, latitude, oilStationName, address } } } } = e;
      console.log(longitude, latitude, oilStationName, address);
      my.openLocation({
        longitude,
        latitude,
        name: oilStationName,
        address
      });
    }
  }
}));
