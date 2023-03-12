const arg = [1,2,3]
const _this = arg.shift();
console.log(_this,arg)

const arr = [100,5,20,3,200,6];
console.log(getMax(arr));

function getMax(arr){
	// return Math.max(...arr)//打散
	// return Math.max.apply(null,arr);
    return [...arr][1];
}