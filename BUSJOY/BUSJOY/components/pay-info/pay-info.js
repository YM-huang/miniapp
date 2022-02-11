Component({
  data: {
    spread: false,
    hid: false
  },
  props: {
    hidden:false
  },
  didMount(){
    var h = false;
    if(this.props.hidden == "false"){
      h = false;
    }else{
      h = true;
      console.log("隐藏欢迎界面");
    }
    this.setData({
        hid: h,
      });
  },
  methods: {
    toggleSpread: function toggleSpread() {
      var spread = !this.data.spread;
      this.setData({
        spread: spread
      });
    }
  }
});