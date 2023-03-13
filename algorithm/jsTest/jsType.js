//首先定义类型
var num = 123;
var str = 'abcdef';
var bool = true;
var arr = [1, 2, 3, 4];
var obj = {name:'wenzi', age:25};
var func = function(){ console.log('this is function'); }
var und = undefined;
var nul = null;
var date = new Date();
var reg = /^[a-zA-Z]{5,20}$/;
var error= new Error();

// 通过以上这些例子我们可以总结出一个规律： 
// typeof方法可以准确判断出除了Null之外的所有的基本数据类型
// （注：typeof null // "object" 是javascript这门语言的历史遗留问题，需要记忆），
// 其他六种基本数据类型都能准确判断，
// 所以我们可以用（typeof 变量 === “undefined”）来判断一个变量是否被声明；
// 但是在判断引用类型时typeof智能判断出函数类型，
// 其他的引用类型都返回'object'。 
// 所以我们通常会使用typeof方法来判断基本数据类型。
console.log(typeof num)  // number
console.log(typeof str)  // string
console.log(typeof bool) // boolean
console.log(typeof arr)  // object
console.log(typeof obj)  // object
console.log(typeof func)  // function
console.log(typeof und)  // undefined
console.log(typeof nul)  // object
console.log(typeof date)  // object
console.log(typeof reg)  // object
console.log(typeof error) // object


num instanceof Number, // false
str instanceof String, // false
bool instanceof Boolean,  // false
arr instanceof Array, // true--注意
arr instanceof Object, // true--注意
obj instanceof Object,  // true--注意
func instanceof Function,  // true
und instanceof Object, // false
nul instanceof Object, // false
date instanceof Date,  // true
reg instanceof RegExp, // true
error instanceof Error // true


function Person(){}
var Tom = new Person();
// undefined和null没有constructor属性
console.log(
    Tom.constructor==Person,
    num.constructor==Number,
    str.constructor==String,
    obj.constructor==Boolean,
    arr.constructor==Array,
    // json.constructor==Object,
    func.constructor==Function,
    date.constructor==Date,
    reg.constructor==RegExp,
    error.constructor==Error
);
// 所有结果均为true

// 如何使用上述的两种方法优雅的封装一个方法，使得我们可以传入任意数据，直接返回它的数据类型（小写字母的字符串）？
//方法1
function dataType(obj) {
    return Object.prototype.toString.call(obj).slice(8,-1)
}

//方法2
// let _dataType = {}

// ['Boolean', 'Number', 'String', 'Array', 'Function', 'Date', 'RegExp', 'Object',
// 'Error', 'Undefined', 'Null'].map((item, index) => {
//     dataType["[object" + item + "]"] = item.toLowerCase();
// })

// function type(obj) {
//     return typeof obj === 'object' || typeof obj === 'function'
//         ? dataTypeObject.prototype.toString.call(obj) || 'object' : typeof obj
// }
