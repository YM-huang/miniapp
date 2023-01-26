/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
    let res = [];
    let n = nums.length;
    function back(path,i){
        if(i <= n){
            res.push(path);
        }
        for(let j = i;j < n;j++){
            path.push(nums[j]);
            back(path.slice(0),j+1);//slice(0)对原始数组做一个深拷贝，防止sort等函数修改到原数组
            path.pop();
        }
    }
    back([],0);
    return res;
};
console.log(subsets(nums = [1,2,3]))