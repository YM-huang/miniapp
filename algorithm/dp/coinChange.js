/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    //先新建数组并将里面的数填充成正无穷
    let dp = new Array(amount+1).fill(Infinity);
    dp[0] = 0;
    for(let i=1;i<=amount;i++){
        for(let coin of coins){
            if(i - coin >= 0){
                dp[i] = Math.min(dp[i],dp[i-coin]+1);
            }
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};
console.log(coinChange([1, 2, 5],11));