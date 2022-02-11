/**
 * 首页顶部组件
 */
import { connect } from 'herculex';
import { OIL_MAP } from '../../common/constant';
import { goPage } from '../../common/util';

const withStore = connect({
  mapStateToProps: ['showOilTypeSelect'],
  mapGettersToProps: ['selectedOilType']
});

Component(withStore({
  data: {
    oilMap: OIL_MAP,
    searchValue: ''
  },
  props: {},
  methods: {
    onOilTypePopup() {
      this.commit('updateState', { showDetail: false, showFuelStationList: false, showOilTypeSelect: true });
    },
    async onClosePopup(tempSelectOilType = '') {
      const res = await this.dispatch('getCurrentLocation').then(res => {
        this.commit('updateState', { showOilTypeSelect: false });
        this.dispatch('$global:updateOilType', { selectedOilType: tempSelectOilType });
        this.dispatch('queryStationList');
        this.dispatch('setOilTypeToStorage');
      });
    },
    onSearch() {
      goPage('../search/index');
    }
  }
}));
