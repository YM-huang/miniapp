/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let len = nums.length;
    let res = [];
    function back(path){
        if(path.length===len){
            res.push(path);
            return;
        }
        for(let i=0;i < len;i++){
            if(path.indexOf(nums[i]) === -1){	//这里的判断很精髓
                path.push(nums[i]);
                back(path.slice(0));
                path.pop();
            }
        }
    }
    back([]);
    return res;
};
console.log(permute(nums = [1,2,3]))