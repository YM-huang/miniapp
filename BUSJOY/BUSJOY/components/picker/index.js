const defaultAnimation = my.createAnimation({}).export();

Component({
  data: {
    animation: defaultAnimation
  },
  props: {
    show: false
  },
  didMount() {
  },
  /**
   * 显示和隐藏更新的声明周期流程
   */
  didUpdate(prevProps, prevData) {
    const { show } = this.props;
    if (show !== prevProps.show) {
      // 实例化一个动画
      if (show) {
        const animation = my.createAnimation({
          duration: 400,
          timingFunction: 'linear'
        });
        this.animation = animation;
        animation.translateY('-500px').step();
        this.setData({ animation: animation.export() });
      } else {
        const animation = my.createAnimation({
          duration: 400,
          timingFunction: 'linear'
        });
        this.animation = animation;
        animation.translateY('0px').step();
        this.setData({ animation: animation.export() });
      }
    }
  },
  methods: {

  }
});
