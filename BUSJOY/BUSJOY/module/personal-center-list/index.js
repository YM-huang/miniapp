/**
 * 个人中心列表组件
 */
import { connect } from 'herculex';
import { OIL_MAP } from '../../common/constant';

Component(connect({
  mapStateToProps: ['payRecords', 'listComplete']
})({
  data: {
    oilMap: OIL_MAP
  },
  methods: {
    onFooterQuestion() {
    }
  }
}));
