let a = [1, 2, 3];
let b = [4, 5, 6];
let c = [7, 8, 9];

//1.concat() 合并多个数组，不影响原数组(会造成内存浪费)，不能处理嵌套数组。
const r = a.concat(b); 
console.log(a); // [1, 2, 3]
console.log(b); // [4, 5, 6]
console.log(r); // [1, 2, 3, 4, 5, 6]

//如果 a 数组有10000个元素, b 数组也有有10000个元素, 那么数组r就有20000个元素, 这种方式占用了2倍的内存。a = b = null;就会被垃圾回收机制回收。

//2.基于for循环 - push():没有concat的内存浪费，看上去土而且不好维护, 只能合并两个数组，会改变原数组，不能处理嵌套数组。
// for(let i in b) {
//     a.push(b[i]);
// }
// console.log(a); // [1, 2, 3, 4, 5, 6]
// console.log(b); // [4, 5, 6]

//3.apply:简洁高效，能实现多个数组合并, 会改变原数组, 并且能够实现深度嵌套。
// a.push.apply(a, b);
// console.log(a); // [1, 2, 3, 4, 5, 6]
// console.log(b); // [4, 5, 6]

//更优美的push:多个数组合并, 会改变原数组, 效率比较高
a.push(...b, ...c)
console.log(a); // [1, 2, 3, 4, 5, 6]
console.log(b); // [4, 5, 6]
console.log(c); // [7, 8, 9];