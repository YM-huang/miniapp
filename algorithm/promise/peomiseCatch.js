
/*Promise.prototype.catch()方法是
.then(null, rejection)或.then(undefined, rejection)的别名，
用于指定发生错误时的回调函数。*/

// p.then((val) => console.log('fulfilled:', val))
//   .catch((err) => console.log('rejected', err));
// // 等同于
// p.then((val) => console.log('fulfilled:', val))
//   .then(null, (err) => console.log("rejected:", err));


// const promise = new Promise(function(resolve, reject) {
//     throw new Error('test');
//   });
//   promise.catch(function(error) {
//     console.log(error);
//   });

// 如果 Promise 状态已经变成resolved，再抛出错误是无效的。
// const promise = new Promise(function(resolve, reject) {
//     resolve('ok');
//     throw new Error('test');
//   });
//   promise
//     .then(function(value) { console.log(value) })
//     .catch(function(error) { console.log(error) });
//   // ok

//   const someAsyncThing = function() {
//     return new Promise(function(resolve, reject) {
//       // 下面一行会报错，因为x没有声明
//       resolve(x + 2);
//     });
//   };
  
//   someAsyncThing()
//   .catch(function(error) {
//     console.log('oh no', error);
//   })
//   .then(function() {
//     console.log('carry on');
//   });



const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));