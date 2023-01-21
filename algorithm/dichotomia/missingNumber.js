/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let left = 0,right = nums.length-1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid === nums[mid]) {
            left = mid + 1;
        } else if (mid < nums[mid]) {
            right = mid - 1;
        }
    }
    return left;
};
console.log(missingNumber([0,1,2,3,4,5,6,7,9]))