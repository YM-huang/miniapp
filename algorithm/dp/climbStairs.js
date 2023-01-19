/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let dp = [];
    dp[0] = 0,dp[1] = 1,dp[2] = 2;
    for(let i=3;i <= n;i++){
        dp[i] = dp[i-2] + dp[i-1];
    }
    return dp[n];
};
//测试
console.log(climbStairs(2));