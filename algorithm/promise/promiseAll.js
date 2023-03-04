// 1、接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
// 2、如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
// 3、如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
// 4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调all() 的返回值也是新的 Promise 对象

const { resolve, reject } = require("./promise3")


_Promise.prototype.all = (promiseList) =>{
    return new _Promise((resolve,reject) => {
        //如果不是数组
        if(!Array.isArray(promiseList)){
            reject(new TypeError('参数错误！'))
        }
        //返回promise
        let count = 0;
        let valueList = new Array(promiseList.length);
        promiseList.array.forEach((promise,index) => {
            _Promise.resolve(promise).then(result => {
                count++;
                valueList[index] = result;  //  将每次返回的结果搜集起来
                if (count === promiseList.length) {
                    //  表示所有的promise都有结果，最终将所有的结果都resolve出去
                    resolve(valueList);
                }
            }, err => reject(err))
        });
    })
}