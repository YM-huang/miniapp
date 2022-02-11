import { connect } from 'herculex';
import { clearSpecialSign } from '../../common/util';

Component(connect({
  mapStateToProps: ['dropList', 'searchHistoryList', 'isLoading', 'systemError']
})({
  props: {},
  data: {
    value: '',
    focus: true,
    tempDropList: []
  },
  methods: {
    async handleInput(val) {
      let value = clearSpecialSign(val);
      this.setData({ value: val });
      this.setData({
        value
      });
      if (value !== val) return;
      if (!value) return this.setData({ tempDropList: [] });
      const res = await this.dispatch('queryDropList', value);
      if (res.length === 0) this.setData({ focus: false });
      this.setData({ tempDropList: res });
    },
    handleFocus(e) {
    },
    handleClear(value) {
      this.setData({ value: '', tempDropList: [] });
    },
    handleCancel() {
      this.setData({ value: '', tempDropList: [] });
      my.navigateBack();
    },
    handleSubmit(value) {
      this.dispatch('queryDropList', value);
    },
    handleDropItemClick: function(ev) {
      const { index: { latitude, longitude } } = ev;
      const { index } = ev;
      this.updateCenterLocation(latitude, longitude);
      this.dispatch('SetSearchHistoryList', index);
    },
    async handleHistoryItemClick(ev) {
      const { currentTarget: { dataset: { item: { latitude, longitude } } } } = ev;
      this.updateCenterLocation(latitude, longitude);
    },
    async handleClearHistory(ev) {
      this.dispatch('removeHistory');
    },
    async updateCenterLocation(latitude, longitude) {
      this.commit('$global:updateState', {
        lbs: { latitude, longitude },
        loaction: { latitude, longitude }
      });
      my.navigateBack();
    },
    onOption() {
      this.handleInput(this.data.value);
    }
  }
}));
