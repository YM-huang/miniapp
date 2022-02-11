function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    my.getLocation({
      type: 1, // 可获取省市信息
      success(res) {
        res = {
          city: '杭州市',
          latitude: 31.224585,
          longitude: 121.551559
        };
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};

/**
 * 过滤空字符串, null, undefined
 */
function filterEmpty(data) {
  data = data || {};
  let obj = {};
  Object.keys(data).forEach(key => {
    let item = data[key];
    if (item !== '' && item !== undefined && item !== null) {
      obj[key] = item;
    }
  });
  return obj;
}

// 变量url化
function params2Query(params) {
  params = params || {};
  return Object.keys(filterEmpty(params))
    .map(key => {
      let v = params[key];
      return key + '=' + (typeof v !== 'object' ? v : JSON.stringify(v));
    })
    .join('&');
}

function lbs2String(params) {
  params = params || {};
  return Object.keys(filterEmpty(params))
    .map(key => {
      let v = params[key];
      return typeof v !== 'object' ? v : JSON.stringify(v);
    })
    .join(',');
}

// 字符串经纬度转换为对象形式
function string2Lbs(params = '') {
  let longitude = '';
  let latitude = '';
  if (params && params.indexOf(',') > -1) {
    const arr = params.split(',');
    longitude = parseFloat(arr[0]);
    latitude = parseFloat(arr[1]);
  }
  return { latitude, longitude };
}

function goPage(url, params = {}, options = { type: 'navigate' }) {
  // 如果传了params 就做参数的拼接
  let query = params2Query(params);
  if (query) {
    url = url + (url.indexOf('?') > -1 ? '' : '?') + query;
  }

  if (options.type === 'redirect' || getCurrentPages().length >= 5) {
    my.redirectTo({ url });
  } else {
    my.navigateTo({ url });
  }
}

// 输入金额校验
function clearNoNum(v) {
  let value = v;
  value = value.replace(/[^\d.]/g, ''); // 清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, '.'); // 只保留第一个. 清除多余的
  value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
  value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');// 只能输入两个小数
  if (value.indexOf('.') < 0 && value !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    value = parseFloat(value);
  }
  return value.toString();
}

// 搜索过滤特殊字符
function clearSpecialSign(value) {
  const regEx = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）+——|{}【】‘；：”“'。，、？%]|\\n|\\r|\\t|\\s");
  let rs = '';
  rs = value.replace(regEx, '');
  return rs.toString();
}

// 格式转化[1,2] =》[{name:1,value:1},{name:2,value:2}]
function arrItemToObj(originArr) {
  if (typeof originArr === 'string') {
    try {
      originArr = JSON.parse(originArr);
    } catch (e) {

    }
  }
  let arr = [];
  originArr.map(item => {
    let obj = {};
    obj.name = obj.value = item;
    arr.push(obj);
  });
  return arr;
}

// 将用角度表示的角转换为近似相等的用弧度表示的角
function rad(d) {
  return d * Math.PI / 180.0;
}

/**
 * 地图计算两个坐标点的距离
 * @param lng1  经度1
 * @param lat1  纬度1
 * @param lng2  经度2
 * @param lat2  纬度2
 * @return 距离（米/千米) distanceNum（米）
 */
function getDistance(lng1, lat1, lng2, lat2, type) {
  const EARTH_RADIUS = 6378.137; // 地球半径
  const radLat1 = rad(lat1);
  const radLat2 = rad(lat2);
  const a = radLat1 - radLat2;
  const b = rad(lng1) - rad(lng2);
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
          Math.cos(radLat1) * Math.cos(radLat2) *
          Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; // km
  if (type === 'map') { // 油站距离地图中心点距离，用于只显示中心5km的油站
    return {
      mapCenterDistance: s
    };
  }
  let meters = '';
  if (s < 1) { // 小于1km展示 米
    meters = parseInt(1000 * s); // 米
    meters = meters < 100 ? 100 : meters; // 小于100m显示100
    return {
      distanceStr: meters + '米',
      distanceNum: s * 1000
    };
  }
  meters = s.toFixed(1);
  return {
    distanceStr: meters + '千米',
    distanceNum: s * 1000
  };
}
// 防抖
function debounce (method, context) {
  clearTimeout(method.timeout);
  method.timeout = setTimeout(function() {
    method.call(context);
  }, 500);
}

function compareObj (obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  } else {
    for (let x in obj1) {
      if (x === 'seqNo') continue;
      if (obj2.hasOwnProperty(x)) {
        if (obj1[x] !== obj2[x]) {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
}

function sortByDistance(arr) {
  return arr.sort((a, b) => a.distanceNum - b.distanceNum);
}

module.exports = { sortByDistance, compareObj, clearSpecialSign, debounce, getDistance, getCurrentLocation, filterEmpty, params2Query, goPage, lbs2String, string2Lbs, clearNoNum, arrItemToObj };
