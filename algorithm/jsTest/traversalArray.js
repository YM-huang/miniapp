// map
let arr = [1,2,3,4,5,6]

let arr1 = arr.map(x => x + 1)
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ] 不改变原数组
console.log(arr1); // [ 2, 3, 4, 5, 6, 7 ]

// reduce
let res1 = arr.reduce((x, y) => {
  console.log(x + y); // 3 6 10 15 21
  return x + y;
})
console.log(res1); // 21

let res2 = arr.reduce((x, y) => {
  console.log(x + y); // 2 4 7 11 16 22
  return x + y
}, 1) // initialValue为1 从1开始累加
console.log(res2); // 22

// filter
let arr3 = arr.filter(x => x > 3)
console.log(arr); // [ 1, 2, 3, 4, 5, 6 ] 不改变原数组
console.log(arr3); // [ 4, 5, 6 ]


// every
let a1 = arr.every(x => x > 3)
console.log(a1); // false
a1 = arr.every(x => x < 10)
console.log(a1); // true

// some
let a2 = arr.some(x => x > 4)
console.log(a2); // true

let arrNew = [1,3,5,7,9,9];
// find
let a = arrNew.find(x => x > 4)
console.log(a); // 5 (返回第一个符合要求的元素值)

// findIndex
let b = arrNew.findIndex(x => x > 4)
console.log(b); // 2 (返回第一个符合要求的元素下标)


// includes
console.log(arrNew.includes(9)); // true

// indexOf
console.log(arrNew.indexOf(9)); // 4 有则返回第一个符合要求的元素下标
console.log(arrNew.indexOf(10)); // -1 没有则返回-1

// lastIndexOf
console.log(arrNew.lastIndexOf(9)); // 5 有则返回最后一个符合要求的元素下标
console.log(arrNew.lastIndexOf(10)); // -1 没有则返回-1