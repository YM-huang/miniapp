/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    //a[i][j]的的长度等于a[i-1][j]+a[i][j-1]
    if(m===1||n===1) return 1;
    //创建二维数组
    let dp = [],rows = [0];
    for(let i = 0;i < n-1;i++){
        rows.push(1);
    }
    dp.push(rows);
    console.log(dp);
    for(let i = 0;i < m-1;i++){
        dp.push([1]);
        console.log(dp);
    }
    // dp[1][1]=1;
    for(let i=1;i<m;i++){
        for(let j=1;j<n;j++){
                dp[i][j] = dp[i-1][j]+dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
};
console.log(uniquePaths(7,3));