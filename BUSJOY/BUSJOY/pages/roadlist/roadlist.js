Page({
  data: {
    ringHidden: false,
    x: 0,
    y: 0,
  },
  onLoad() {},
  TapRing(){
    console.log("tap")
    console.log(typeof(this.ringHidden))
    var x = Boolean(this.ringHidden);
    console.log(x)
    if(x==true){
      console.log("true")
      this.setData({
        ringHidden:Boolean(false)
      })
    }
    else if(x==false){
      console.log("false")
      this.setData({
        ringHidden:Boolean(true)
      })
      //!!!!!!!!!
      console.log("改变之后ringHidden的值" + Boolean(this.ringHidden))
    }
  },
  //点击图标,显示目的地
    showZanAndPinglun(){
        my.createSelectorQuery()
        .select('#img').boundingClientRect()
        .selectViewport().scrollOffset().exec((ret) => {
          console.log(ret);
          this.setData({
              x: ret[0].left+120,
              y: ret[0].top,
              ringHidden: true,
            });
        })
        
        // this.setData({
        //     ringHidden: true
        // })

    },
    moveTab(){
        // my.createSelectorQuery()
        // .select('#img').boundingClientRect()
        // .selectViewport().scrollOffset().exec((ret) => {
        //   console.log(ret);
        //   this.setData({
        //       x: ret[0].left+80,
        //       y: ret[0].top,
        //       ringHidden: true
        //     });
        // })
        this.setData({
            ringHidden: false
        })
    
        // this.setData({
        //     ringHidden: true
        // })

    },
    //隐藏
    hideZanAndPinglun(){
        this.setData({
            ringHidden: false
        })
    },
    createSelectorQuery() {
    my.createSelectorQuery()
      .select('#img').boundingClientRect()
      .selectViewport().scrollOffset().exec((ret) => {
      console.log(ret);
      my.alert({
        // content: JSON.stringify(ret, null, 2).left,
        content: ret[0].top,
      });
    })
  },
});
