// 与 Promise.all 一样，
// Promise.race 也接收包含 Promise 对象或普通值的数组(或其它可迭代对象)作为参数，
// 返回一个Promise实例对象。
// 与 Promise.all 不同的是，
// 一旦有一个 Promise 实例对象 resolve ，
// 立即把这个resolve的值作为 Promise.race resolve的值。
// 一旦有一个对象reject， Promise.race 也会立即reject。
Promise.prototype.race = function (promiseArr) {
    return new Promise(function (resolve, reject) {
        for (let promise of promiseArr) {
            if (typeof promise === 'object' && typeof promise.then === 'function') {
                // 数组传进来的项是一个Promise实例，执行then方法。
                // resolve只有一个，那个实例对象最先执行完就会使用这个resolve
                promise.then(resolve, reject);
            } else {
                // 不是Promise实例对象直接返回当前值
                resolve(promise);
            }
        }
    })
}