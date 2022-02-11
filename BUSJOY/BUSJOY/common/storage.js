/**
 * 封装storage方法，添加存储操作
 * 如果第一遍取值失败，再次请求
*/

export function getStorage(key) {
  return new Promise((resolve, reject) => {
    my.getStorage({
      key, // 缓存数据的 key
      success: (res) => {
        resolve(res);
      },
      fail: (res) => {
        resolve(res);
      }
    });
  });
}

export function setStorage(key, data) {
  return new Promise((resolve, reject) => {
    my.setStorage({
      key,
      data,
      success: function(res) {
        resolve(res);
      },
      fail: (res) => {
        resolve(res);
      }
    });
  });
}

export function removeStorage(key) {
  return new Promise((resolve, reject) => {
    my.removeStorage({
      key,
      success: function(res) {
        resolve(res);
      },
      fail: (res) => {
        resolve(res);
      }
    });
  });
}

/**
 * 获取后台返回的headers里面的x-auth-token，并保存在stoage里面
*/

export function saveTokenStorage(headers) {
  return new Promise((resolve, reject) => {
    let token = null;
    if (headers instanceof Array) { // 真机中看到是一个数组
      const len = headers.length;
      for (let i = 0; i < len; i++) {
        const hi = headers[i];
        if (hi instanceof Object) {
          for (let j in hi) {
            if (j.toLowerCase() === 'x-auth-token') {
              token = hi[j];
            }
          }
        }
      }
    } else {
      for (let i in headers) {
        if (i.toLowerCase() === 'x-auth-token') {
          token = headers[i];
        }
      }
    }
    if (token) {
    } else {
      resolve();
    }
  });
}
