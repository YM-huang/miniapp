import { connect } from 'herculex';
import { Decimal } from 'decimal.js';
import { clearNoNum } from '../../common/util';

Component(connect({
  mapStateToProps: ['payMoney', 'currentFuelType', 'currentFuelNumber'],
  mapGettersToProps: ['disCount']
})({
  data: {
    _value: ''
  },
  props: {
  },
  methods: {
    onInput(e) {
      let value = e.detail.value;
      let value2 = clearNoNum(value);
      this.setData({
        _value: value
      });
      setTimeout(() => {
        this.setData({
          _value: value2
        });
      }, 0);
      const inputNum = value2;
      const realPayNum = new Decimal(inputNum).times(this.data.payMoney.discount / 100).toFixed(2);
      const discountNum = new Decimal(value2).minus(realPayNum).valueOf();
      const payMoney = Object.assign(this.data.payMoney, {
        inputNum,
        realPayNum,
        discountNum
      });
      this.dispatch('updatePayNum', { payMoney });
    },
    onFocus() {
    }
  }
}));
