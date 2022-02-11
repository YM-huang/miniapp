const wx2my = require('../../wx2my');

//index.js
//获取应用实例
const app = getApp();
import { throttle } from "../../utils/util";
let col1H = 0;
let col2H = 0;
// import img1 from '../../images/waterfall/img_1.jpg';
// import img2 from '../../images/waterfall/img_2.jpg';
// import img3 from '../../images/waterfall/img_3.jpg';
// import img4 from '../../images/waterfall/img_4.jpg';
// import img5 from '../../images/waterfall/img_5.jpg';
// import img6 from '../../images/waterfall/img_6.jpg';
// import img7 from '../../images/waterfall/img_7.jpg';
// import img8 from '../../images/waterfall/img_8.jpg';
// import img9 from '../../images/waterfall/img_9.jpg';
// import img10 from '../../images/waterfall/img_10.jpg';
// import img11 from '../../images/waterfall/img_11.jpg';
// import img12 from '../../images/waterfall/img_12.jpg';
// import img13 from '../../images/waterfall/img_13.jpg';
// import img14 from '../../images/waterfall/img_14.jpg';
// import img15 from '../../images/waterfall/img_15.jpg';
// import img16 from '../../images/waterfall/img_16.jpg';
// import img17 from '../../images/waterfall/img_17.jpg';
// import img18 from '../../images/waterfall/img_18.jpg';
// import img19 from '../../images/waterfall/img_19.jpg';
// import img20 from '../../images/waterfall/img_20.jpg';
// import img21 from '../../images/waterfall/img_21.jpg';

Page({
  data: {
    imgWidth: wx2my.getSystemInfoSync().windowWidth / 750 * 355,
    col1: [],
    col2: [],
    images: [{
      pic: '../../images/waterfall/img_1.jpg',
      id: 1,
      height: 0
    }, {
      pic: '../../images/waterfall/img_2.jpg',
      id: 2,
      height: 0
    }, {
      pic: '../../images/waterfall/img_3.jpg',
      id: 3,
      height: 0
    }, {
      pic: '../../images/waterfall/img_4.jpg',
      id: 4,
      height: 0
    }, {
      pic: '../../images/waterfall/img_5.jpg',
      id: 5,
      height: 0
    }, {
      pic: '../../images/waterfall/img_6.jpg',
      id: 6,
      height: 0
    }, {
      pic: '../../images/waterfall/img_7.jpg',
      id: 7,
      height: 0
    }, {
      pic: '../../images/waterfall/img_8.jpg',
      id: 8,
      height: 0
    }, {
      pic: '../../images/waterfall/img_9.jpg',
      id: 9,
      height: 0
    }, {
      pic: '../../images/waterfall/img_10.jpg',
      id: 10,
      height: 0
    }, {
      pic: '../../images/waterfall/img_11.jpg',
      id: 11,
      height: 0
    }, {
      pic: '../../images/waterfall/img_12.jpg',
      id: 12,
      height: 0
    }, {
      pic: '../../images/waterfall/img_13.jpg',
      id: 13,
      height: 0
    }, {
      pic: '../../images/waterfall/img_14.jpg',
      id: 14,
      height: 0
    }, {
      pic: '../../images/waterfall/img_15.jpg',
      id: 15,
      height: 0
    }]
  },
  onLoad: function () {},
  onImageLoad: function (e) {
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width; //图片原始宽度

    let oImgH = e.detail.height; //图片原始高度

    let imgWidth = this.data.imgWidth; //图片设置的宽度

    let scale = imgWidth / oImgW; //比例计算

    let imgHeight = parseInt(oImgH * scale); //自适应高度

    let imageObj = {};

    for (let i = 0; i < this.data.images.length; i++) {
      let img = this.data.images[i];

      if (img.id == imageId) {
        imageObj = img;
        break;
      }
    }

    imageObj.height = imgHeight;
    let col1 = this.data.col1;
    let col2 = this.data.col2; //判断当前图片添加到左列还是右列

    if (col1H <= col2H) {
      col1H += imgHeight;
      col1.push(imageObj);
    } else {
      col2H += imgHeight;
      col2.push(imageObj);
    }

    this.setData({
      col1: col1,
      col2: col2
    });
  },
  onReachBottom: function () {
    throttle(this.getNewData, 300,this);
  },
  getNewData: function () {
    var that = this;
    wx2my.showLoading({
      title: '加载中',
      mask: true
    });
    var t = setTimeout(() => {
      let col1 = that.data.col1;
      let col2 = that.data.col2;

      for (var i = 0; i < that.data.images.length; i++) {
        //判断当前图片添加到左列还是右列
        if (col1H <= col2H) {
          col1H += parseInt(that.data.images[i].height);
          col1.push(that.data.images[i]);
        } else {
          col2H += parseInt(that.data.images[i].height);
          col2.push(that.data.images[i]);
        }
      }

      that.setData({
        col1: col1,
        col2: col2
      });
      wx2my.hideLoading();
      clearTimeout(t);
    }, 1000);
  },
  onUnload: function () {
    col1H = 0;
    col2H = 0;
    this.setData({
      col1: [],
      col2: [],
      images: ''
    });
  }
});
