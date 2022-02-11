import { connect } from 'herculex';
Component(connect({
  mapStateToProps: ['payMoney'],
  mapGettersToProps: ['canPay', 'shouldpayNum']
})({
  data: {},
  props: {},
  methods: {
    onPay(e) {
      if (!this.data.canPay) return;
      let reg = /^(([1-9]{1}\d*)|0)(\.\d{1,2})?$/;
      const inputNum = this.data.payMoney.inputNum;
      if (!reg.test(inputNum) || inputNum < 0 || inputNum > 2000) {
        return my.alert({
          content: '请输入正确金额',
          buttonText: '我知道了'
        });
      }
      this.dispatch('openTradePay');
    }
  }
}));
