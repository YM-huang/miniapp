Component({
  props: {
    className: '',
    type: 'network',
    local: false,
    onOption: () => {}
  },
  methods: {
    onOption() {
      this.props.onOption();
    },
    onOptionTwo() {
      this.props.onOption();
    }
  }
});
