const arr = [1,2,[3,4]];
function flat(arr){
	while(arr.some((item) => item instanceof Array)){
		arr = Array.prototype.concat.apply([],arr);//apply打散，...效果相同
	}
	return arr;
}
console.log(arr.flat());//[1,2,3,4]

// function flat(arr){
// 	const hasDeep = arr.some((item) => item instanceof Array);
// 	if(!hasDeep){
// 		return arr;
// 	}

// 	//return Array.prototype.concat.apply([],arr);//打散 参数[] 1 2 [3,4]，但是只能处理嵌套一层的情况
	
// 	const res = Array.prototype.concat.apply([],arr);
// 	return flat(res);//递归
// }


let arr2 = [[0, 1], [2, 3], [4,[5,6,7]]]
const flat2 = function(arr){
   return arr.reduce((pre,cur)=>pre.concat(Array.isArray(cur)?flat2(cur):cur),[])
}
console.log(flat2(arr2)); //[0, 1, 2, 3, 4, 5, 6, 7]