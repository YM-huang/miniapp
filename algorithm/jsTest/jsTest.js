// function funPlus( m , n ){
//     console.log( n );
//     return{
//     funPlus : function ( o ){
//         return funPlus( o , m );
//     }
// }
// }
// hello = funPlus(0) .funPlus(1).funPlus(2).funPlus(3);
// console.log(["1","2","3"].map(parseInt));
// console.log(['1','2','3'].map(function(i){return parseInt(i,10)}));
// console.log(new Array() instanceof Array);
// console.log(typeof(null) == "object");
// console.log(Object.prototype.toString.apply(Object(3)).indexOf('Number') > 8);
// console.log((1^2) == ~~3.6);//按位非

// console.log(~~3.6)//MATH.floor，但是效能高，取反-1

// function Err() {
//     throw new Error();
//   }
//   const obj = {
//     async fun1() {
//       try {
//         await Err();
//       } catch(e) {
//         console.log('A');
//       }
//     },
//     async fun2() {
//       try {
//         return Err();
//       } catch(e) {
//         console.log('B');
//       }
//     },
//     async fun3() {
//       try {
//         Err();
//       } catch(e) {
//         console.log('C');
//       }
//     }
//   }
//   try {
//     obj.fun1();
//     obj.fun2();
//     obj.fun3();
//   } catch(e) {
//     console.log('D');
// }

function echo() {
    console.log(1);
    const promise = new Promise((resolve) => {
      console.log(2);
      resolve();
    });
    promise.then(() => {
      console.log(3);
    });
    setTimeout(() => {
      console.log(4);
    }, 0);
    console.log(5);
}
echo();
