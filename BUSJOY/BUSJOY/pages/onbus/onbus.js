function _extends() { 
  _extends = Object.assign || function (target) { 
    for (var i = 1; i < arguments.length; i++) { 
      var source = arguments[i]; 
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) { 
          target[key] = source[key]; 
        } 
      } 
    } 
    return target; 
  }; 
  return _extends.apply(this, arguments); 
}
var noop = function noop() {};

function collectArr(arr, ele) {
  var resArr = arr;

  if (arr instanceof Array) {
    resArr.push(ele);
  } else {
    resArr = [ele];
  }

  return resArr;
}

var prefixKey = function prefixKey(prefix) {
  return function (key) {
    return prefix + "-" + key;
  };
};

var collapsePrefix = prefixKey('am-collapse');

Page({
  data: {
    //界面1
    isOnBus:false,
    voncherData: {
      voncherName: '杭州电子公交卡'
    },
    dataSource: [
      {
        label: '出行优惠',
        icon: '出行优惠.png',
      },
      {
        label: '路线规划',
        icon: '路线规划.png',
      },
      {
        label: '可用线路',
        icon: '可用线路.png',
      },
      {
        label: '乘车记录',
        icon: '乘车记录.png',
      }
    ],


    //界面2
    startY: 0,     //滑动开始y轴位置
    lastY: 0,     //滑动开始y轴位置
    headerFixed:false,   //固定顶部框
    showTips: true,
    dataSource: {
      status: 0, // 0: 待扣款 1:已扣款
      type: 2, // 1: 地铁 2: 公交
      price: 1.78,
      reducePrice: 0.32,
      delay: 30,
      greenCount: 52,
      busNumber: 208,
      stationName: '凤起路站',
      stationInfos: [
        {
          label: '进站站点',
          value: '凤起路站',
        },
        {
          label: '出站站点',
          value: '良渚站',
        },
      ],
    },
    showTop: true,
    scrollTop: 0,
    scrollBottom:156,
    passwayData: {
      name: '凤起路站',
      exits: [
        {
          name: '1号口',
          to: ['怡乐路', '二十四水果店', '叶氏兄弟水果', '易乐路杂货'],
        },
        {
          name: '2号口',
          to: ['怡乐路', '二十四水果店', '叶氏兄弟水果', '易乐路杂货'],
        },
      ],
      traffic: {
        label: '开地铁电子发票',
        iconText: '绿色低碳',
        go: '去骑车',
      },
    },
    routesData: {
      name: '凤起路站',
      routes: [
        {
          name: '1号线',
          lowPrice: 2,
          highPrice: 9,
          directs: [
            {
              targetPlace: '良渚',
              startTime: '06:18',
              lastTime: '23:37',
              gapTime: 5,
            },
            {
              targetPlace: '朝阳',
              startTime: '06:18',
              lastTime: '23:37',
              gapTime: '',
            },
          ],
        },
        {
          name: '2号线',
          lowPrice: 2,
          highPrice: 9,
          directs: [
            {
              targetPlace: '良渚',
              startTime: '06:18',
              lastTime: '23:37',
              gapTime: 5,
            },
            {
              targetPlace: '朝阳',
              startTime: '06:18',
              lastTime: '23:37',
              gapTime: '',
            },
          ],
        },
      ],
    },
    desktopData: {
      content: '点击打开下车提示'
    },
    mapData:
    {scale: 14,
    longitude: 120.131441,
    latitude: 30.279383,
    markers: [{
      iconPath: "/image/green_tri.png",
      id: 10,
      latitude: 30.279383,
      longitude: 120.131441,
      width: 50,
      height: 50
    },{
      iconPath: "/image/green_tri.png",
      id: 11,
      latitude: 30.279383,
      longitude: 120.131441,
      width: 50,
      height: 50,
      customCallout: {
        type: 1,
        time: '1',
      },
      fixedPoint:{
        originX: 400,
        originY: 400,
      },
      iconAppendStr: '黄龙时代广场黄龙时代广场黄龙时代广场黄龙时代广场test'
    }],
    includePoints: [{
      latitude: 30.279383,
      longitude: 120.131441,
    }],
    polyline: [{
      points: [{
          longitude: 120.131441,
          latitude: 30.279383,
       },{
         longitude: 120.131441,
          latitude: 30.2,
        }
      ],
      color:'#fda969',
      width: 5,
      dottedLine: false,
      zIndex:4
    },{
      points: [{
        longitude: 120.131441,
        latitude: 30.279383
      }, {
        longitude: 120.128821,
        latitude: 30.278200
      }, {
        longitude: 120.131618,
        latitude: 30.277600
      }, {
        longitude: 120.132520,
        latitude: 30.279393
      }, {
        longitude: 120.137517,
        latitude: 30.279383
      }],
      color: "#FF0000DD",
      width: 5,
      dottedLine: false,
      
    }],
    circles: [{
      latitude: 30.279383,
      longitude: 120.131441,
      color: "#000000AA",
      fillColor: "#000000AA",
      radius: 80,
      strokeWidth: 5,
    }],
    controls: [{
      id: 5,
      iconPath: '../../resources/pic/2.jpg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    panels:[{
    	 id:6,
       // 布局参考 map 高级定制渲染
       layout: {
   			 	params:{
      			title:"标题栏",
      			bgColor:"#DC143C"
    			},
   		 		src:"/layout/map_callout.xml"
  		 },
       position: {
         left: 0,
         bottom: 0,
         width: 200,
         height: 84
       },
    }],
    },
    transferData: {
      stationName: '凤起路站',
      type: 1, // 1.网约车 2.共享单车
      count: 25,
      discounts: 6.5,
      waitTime: 3,
      traffic: {
        label: '开地铁电子发票',
        iconText: '绿色低碳',
        go: '',
      },
      markers: [
        {
          iconPath: '/assets/mark.png',
          longitude: '120.131441',
          latitude: '30.279383',
          width: 21,
          height: 31,
          customCallout: {
            type: 0,
            time: '3',
            descList: [{
              desc: '点击立即打车',
              descColor: '#ffffff',
            }],
            isShow: 1,
          // },
          // style: {
          //   type: 1,
          //   icon1: '/assets/byc.png',
          //   text1: '去骑车',
          //   bgColor: '#108EE9',
          //   // color: '#108EE9',
          //   gravity: 'center'
          },
        },
      ],
      circles: [
        {
          latitude: 30.279383,
          longitude: 120.131441,
          color: '#32C5FFFF',
          fillColor: '#9FE5FF99',
          radius: 105,
          strokeWidth: 1,
        },
        {
          latitude: 30.279383,
          longitude: 120.131441,
          color: '#FFFFFFFF',
          fillColor: '#9FE5FF99',
          radius: 135,
          strokeWidth: 1,
        },
      ],
    },
    operationData: [
      {
        iconPath: 'https://gw.alipayobjects.com/mdn/rms_ec9563/afts/img/A*D8vpRIDpXp8AAAAAAAAAAABkARQnAQ',
        title: '你有80里程待收取',
        des: '距离阿拉善更进一步啦',
        buttonText: '去领取',
        buttonType: 'primary',
      },
      {
        iconPath: 'https://gw.alipayobjects.com/mdn/rms_ec9563/afts/img/A*jA3KRYc3xqMAAAAAAAAAAABkARQnAQ',
        title: '了解更多出行资讯',
        des: '公共出行生活号',
        buttonText: '去查看',
        buttonType: 'default',
      },
    ],

  },
  
  scrollTopChange(e) {
    this.setData({
      scrollTop: e.detail.value,
    });
  },
  onPageScroll({ scrollTop }) {
    console.log('onPageScroll', scrollTop);
  },
  scrollTo() {
    my.pageScrollTo({
      scrollTop: parseInt(this.data.scrollTop),
      duration:300,
    });
   
  },
  onLoad() {},
   onReady() {
        var that = this;
        var lng;
        var lat;
        my.showLoading();
        my.getLocation({
          success(res) {
            my.hideLoading();
            lng=Number(res.longitude);
            lat=Number(res.latitude);
            console.log(res)
            that.setData({
              longitude:Number(res.longitude),
              latitude:Number(res.latitude),
            })
          },
          fail() {
            my.hideLoading();
            my.alert({error});
          },
        })
        that.setData({
        'mapData.longitude': lng,
        'mapData.latitude': lat,
        'mapData.includePoints': [{
        latitude: lat,
        longitude: lng,
      }],
    });
    // 使用 my.createMapContext 获取 map 上下文
    this.mapCtx = my.createMapContext('busmap');
    this.mapCtx.moveToLocation()
    /*this.mapCtx.showRoute({
      startLat:30.257839, 
      startLng:120.062726,
      endLat:30.256718,
      endLng:120.059985,
      zIndex:4,
      routeColor:'#FFFFFF',
      iconPath: "/image/map_alr.png",
      iconWidth:10,
      routeWidth:10
     });*/
    this.clp.initItems();
  },

  onRingTap(event){    
    //使事件指向c1
    event.currentTarget.dataset = {key: "c1", isActive: "true"}
    this.clp.onCollapseTap(event);

    var sT= this.data.showTop;
    if (sT==true){
      this.setData({
        showTop:false,
        headerFixed:true,
      })
    }else if(sT==false){
      this.setData({
        showTop:true,
        headerFixed:false
      }) 
      this.scrollTo();
    }else{
      console.log("未识别");
    }
  },
  
  //下拉刷新监听
  onPullDownRefresh() {
    console.log('onPullDownRefresh', new Date());
  },

  //判断上滑下滑
  touchMoveHandle (event) {
    let currentY = event.changedTouches[0].clientY
    console.log(currentY + ":" +  this.data.startY)
    if (this.data.startY - currentY >= 10) {
      console.log("上推")
    } else if(currentY - this.data.startY >= 10) {
      console.log("下拉")
      this.onRingTap(event)
    }
  },
  //滑动开始事件
  touchStartHandle: function (event) {
    this.data.startY = event.changedTouches[0].clientY
    console.log("startY:" +  this.data.startY)
  },

  onChangeCarTap(){
    my.navigateTo({
      url: "/pages/my/my"
    });
  },

  regionchange(e) {
    console.log('regionchange', e);
	// 注意：如果缩小或者放大了地图比例尺以后，请在 onRegionChange 函数中重新设置 data 的
	// scale 值，否则会出现拖动地图区域后，重新加载导致地图比例尺又变回缩放前的大小。
	if (e.type === 'end') {
      this.setData({
        scale: e.scale
      });
    }
  },
    onShow: function()
  {
    /**
     * 防止用户拿不到最新数据(因为页面切换会重新计时)
     * 无条件请求一次最新数据
     */
    console.log('请求接口：刷新数据(无条件执行)')
    /**
     * 每隔一段时间请求服务器刷新数据(客户状态)
     * 当页面显示时开启定时器(开启实时刷新)
     * 每隔1分钟请求刷新一次
     * @注意：用户切换后页面会重新计时
     */
    var that=this;
    var lng=0;
    var lat=0;
    var newpoint;
    var pointdata=that.data.mapData.polyline[0].points;
    var i=1;
    setInterval(function()
    { 
       my.getLocation({
          success(res) {
            my.hideLoading();
            lng=Number(res.longitude);
            lat=Number(res.latitude);
            console.log(lng+' '+lat)
            that.setData({
              longitude:Number(res.longitude),
              latitude:Number(res.latitude),
            })
          },
          fail() {
            my.hideLoading();
            console.log(Error);
          },
        })
         console.log('lng'+lng);
         console.log('lat'+lat)
        newpoint={
          longitude:lng,
          latitude:lat
        };
        console.log(newpoint);
        
        let key='mapData.polyline[0].points';
       // pointdata=that.data.mapData.polyline[0].points;
        //let pointdata=JSON.parse(JSON.stringify(that.data.mapData.polyline.points));
        console.log(pointdata);
        if(newpoint.latitude!=0&&newpoint.longitude!=0)
        {pointdata.push(newpoint);
        console.log(pointdata);
        that.setData({
         [key]:pointdata
        });
        i++;
        console.log(i);
        }

      // 请求服务器数据
      console.log(that.data.mapData.polyline[0].points[i])
      that.mapCtx = my.createMapContext('busmap');
      that.mapCtx.moveToLocation()
      
      // 反馈提示

    }, 5000)//间隔时间
    
  },

  //提示气泡操作
  onCloseTap() {
    this.setData({
      showTips: false,
    });
  },
  onRectangleTap() {
    this.setData({
      showTips: false,
    });
  },

});
