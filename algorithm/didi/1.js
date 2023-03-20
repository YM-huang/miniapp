// 读取输入
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let n, k;
let nums = [];

rl.on('line', (input) => {
    if (!n) {
        // 读取n和k
        [n, k] = input.trim().split(' ').map(Number);
    } else {
        // 读取nums数组
        nums = input.trim().split(' ').map(Number);
        console.log(getMinDeletions(n, k, nums));
        rl.close();
    }
});

// 计算至少需要删除几个数才能使得众数出现次数不超过k
function getMinDeletions(n, k, nums) {
const counter = new Map();
let maxCount = 0;
let maxNum = nums[0];

// 统计每个数出现的次数，并记录出现次数最多的数
for (const num of nums) {
    const count = counter.get(num) || 0;
    counter.set(num, count + 1);
    if (counter.get(num) > maxCount) {
        maxCount = counter.get(num);
        maxNum = num;
    }
}

// 如果众数出现次数不超过k，则不需要删除任何数
if (maxCount <= k) {
    return 0;
}

// 否则需要删除至少maxCount - k个数
const deletions = maxCount - k;
let remainingCount = counter.get(maxNum) - deletions;

// 如果删完之后众数仍然出现次数超过k，则需要继续删除其他数
for (const count of counter.values()) {
    if (count > remainingCount) {
        deletions += count - remainingCount;
        remainingCount = 0;
        if (remainingCount <= 0) {
            break;
        }
    }
}

return deletions;
}