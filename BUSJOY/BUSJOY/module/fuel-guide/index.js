/**
 * 个人中心列表组件
 */
import { connect } from 'herculex';

Component(connect({
  mapStateToProps: ['guideState', 'isNewUser']
})({
  data: {
  },
  props: {
  },
  methods: {
    onGuide() {
      let nextState;
      if (this.data.guideState === 1) nextState = 2;
      if (this.data.guideState === 2) nextState = 3;
      this.dispatch('updateGuideState', nextState);
    }
  }
}));
