/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function(n) {
    let maxmulti = 1;
    if(n === 2 || n === 3) return n - 1;
    for(let i=2;i<=n/2;i++){
        let k = Math.round(n/i);
        kmulti = (k**(i-1))*(n-k*(i-1));
        if(kmulti>maxmulti)
            maxmulti = kmulti;
    }
    return maxmulti;
};
console.log(cuttingRope(8));