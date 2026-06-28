/**
 * @param {number[]} nums
 * @return {number}
 */

// var minAbsoluteDifference = function (nums) {
//     // [idx1, idx2] 分别存储 1 和 2 的最后出现位置
//     let pos = [-1, -1], min = Infinity;

//     for (let i = 0; i < nums.length; i++) {
//         const x = nums[i];
//         if (x === 1 || x === 2) {
//             // 如果 x 是 1，那我们要找的“另一个数”就是 2 (它的索引在 pos[1])
//             // 如果 x 是 2，那我们要找的“另一个数”就是 1 (它的索引在 pos[0])
//             const otherIdx = pos[2 - x]; 
            
//             if (otherIdx > -1) min = Math.min(min, i - otherIdx);
//             pos[x - 1] = i; // 更新当前数字的最新位置
//         }
//     }
//     return min === Infinity ? -1 : min;
// };

var minAbsoluteDifference = function (nums) {
    // 初始化两个变量，分别记录上一次看到 1 和 2 的数组下标（-1 表示还没遇到过）
    let lastOne = -1;
    let lastTwo = -1;
    
    // 初始化最终的最小距离，因为要找最小值，所以先设为一个“无穷大”的值
    let minDiff = Infinity;
    
    // 从头到尾遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 情况 1：如果当前数字是 1
        if (nums[i] === 1) {
            // 更新 1 的最新位置
            lastOne = i;
            // 如果之前已经遇到过 2（即 lastTwo 不是 -1），说明和左边的 2 凑成了一对有效下标
            if (lastTwo !== -1) {
                // 计算当前 1 和左边最近的 2 的距离，并尝试更新全局最小距离
                minDiff = Math.min(minDiff, i - lastTwo);
            }
        } 
        // 情况 2：如果当前数字是 2
        else if (nums[i] === 2) {
            // 更新 2 的最新位置
            lastTwo = i;
            // 如果之前已经遇到过 1（即 lastOne 不是 -1），说明和左边的 1 凑成了一对有效下标
            if (lastOne !== -1) {
                // 计算当前 2 和左边最近的 1 的距离，并尝试更新全局最小距离
                minDiff = Math.min(minDiff, i - lastOne);
            }
        }
        // 如果数字是 0，直接忽略，不影响 1 和 2 的位置关系
    }
    
    // 如果 minDiff 依然是 Infinity，说明从来没有凑齐过有效的 (1, 2) 组合，按照题目要求返回 -1
    // 否则，返回计算出的最小绝对差
    return minDiff === Infinity ? -1 : minDiff;
};

