/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
// 动态规划方程：dp[n] = num + Max(dp[n-1])
// 由于不可以在相邻的房屋闯入，所以在当前位置 n 房屋可盗窃的最大值，要么就是 n-1 房屋可盗窃的最大值，要么就是 n-2 房屋可盗窃的最大值加上当前房屋的值，二者之间取最大值
// 举例来说：1 号房间可盗窃最大值为 33 即为 dp[1]=3，2 号房间可盗窃最大值为 44 即为 dp[2]=4，3 号房间自身的值为 22 即为 num=2，那么 dp[3] = MAX( dp[2], dp[1] + num ) = MAX(4, 3+2) = 5，3 号房间可盗窃最大值为 55
    if(nums.length === 0) return 0;
    if(nums.length === 1) return nums[0];
    if(nums.length === 2) return Math.max(nums[0],nums[1]);
    let dp = [nums[0],Math.max(nums[0],nums[1])];
    for(let i = 2;i < nums.length;i++){
        dp[i] = Math.max(dp[i-1],dp[i-2]+nums[i]);
    }
    return Math.max(dp[nums.length-1],dp[nums.length-2]);
};
console.log(rob([1,2,3,1,5]));