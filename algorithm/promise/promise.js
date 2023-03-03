// function timeout(ms) {
//     return new Promise((resolve, reject) => {
//       setTimeout(resolve, ms, ms+'done');
//     });
//   }
  
//   timeout(100).then((value) => {
//     console.log(value);
//   });

/* 下面代码中，Promise 新建后立即执行，所以首先输出的是Promise。
然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，
所以resolved最后输出。*/
// let promise = new Promise(function(resolve, reject) {
//     console.log('Promise');
//     resolve();
//   });
  
//   promise.then(function() {
//     console.log('resolved.');
//   });
  
//   console.log('Hi!');


/*下面代码中，p1是一个 Promise，3 秒之后变为rejected。
p2的状态在 1 秒之后改变，resolve方法返回的是p1。
由于p2返回的是另一个 Promise，导致p2自己的状态无效了，
由p1的状态决定p2的状态。所以，后面的then语句都变成针对后者（p1）。
又过了 2 秒，p1变为rejected，导致触发catch方法指定的回调函数。*/
// const p1 = new Promise(function (resolve, reject) {
//     setTimeout(() => reject(new Error('fail')), 3000)
//   })
  
//   const p2 = new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(p1), 1000)
//   })
  
//   p2.then(result => console.log(result))
//     .catch(error => console.log(error))

/*执行了resolve之后还会执行后续输出语句，要避免这一问题。
return resolve*/
// new Promise((resolve, reject) => {
//     resolve(1);
//     console.log(2);
//   }).then(r => {
//     console.log(r);
//   });

new Promise((resolve, reject) => {
    return resolve(1);
    // 后面的语句不会执行
    console.log(2);
  }).then(r => {
    console.log(r);
  });