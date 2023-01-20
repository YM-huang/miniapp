/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function(gas, cost) {
    let cur = 0,total = 0,start = 0;
    for(let i = 0;i < gas.length;i++){
        total += gas[i] - cost[i];
        if(cur < 0){
            cur = gas[i] - cost[i];
            start = i;
        }else cur += gas[i] - cost[i];
    }
    return total >= 0 ? start : -1;
};
console.log(canCompleteCircuit(gas = [1,2,3,4,5], cost = [3,4,5,1,2]))