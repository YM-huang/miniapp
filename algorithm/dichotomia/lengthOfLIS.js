/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
    let n = nums.length;
    if(n == 1){
        return n;
    }
    let tail = [nums[0]];
    for(let i = 0;i < n;i++){
        if(nums[i] > tail[tail.length-1]){
            tail.push(nums[i]);
        }else{
            let left = 0;
            let right = tail.length-1;
            while(left < right){
                let mid = (left + right) >> 1;
                if(tail[mid] < nums[i]){
                    left = mid + 1;
                }else{
                    right = mid;
                }
            }
            tail[left] = nums[i];
        }
    }
    return tail.length;
};
console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))