Component({
  data: {
    isBig: false
  },
  props: {
    preDes: '',
    count: ''
  },
  didMount: function didMount() {
    var count = this.props.count;

    if (String(count).length > 2) {
      this.setData({
        isBig: true
      });
    }
  },
  methods: {}
});