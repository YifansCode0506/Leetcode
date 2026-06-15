/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
    potions.sort((a, b) => a - b); // 1. 先对药水数组进行升序排序

    for (let i = 0; i < spells.length; i++) {
        const target = success / spells[i]; // 2. 计算当前咒语所需的最小药水能量标准线
        
        // 3. 药水总长度减去第一个合格药水的下标，就是右边所有合格药水的总数量
        spells[i] = potions.length - lowerBound(potions, target); 
    }

    return spells;
};

var lowerBound = function(nums, target) {
    let left = -1, right = nums.length; // 开区间 (left, right)

    while (left + 1 < right) { // 区间不为空
        // 循环不变量：
        // nums[left] < target
        // nums[right] >= target
        const mid = Math.floor((left + right) / 2);
        
        if (nums[mid] >= target) {
            right = mid; // 范围缩小到 (left, mid)
        } else {
            left = mid; // 范围缩小到 (mid, right)
        }
    }

    return right;
}


// successfulPairs 开始
//    │
//    ▼
// [1] potions.sort() ─── 药水全部排好序 (只执行 1 次)
//    │
//    ▼
// [2] 进入 spells 循环 (执行 N 次) ──────┐
//        │                             │
//        ▼                             │
//    [3] 计算当前 target               │
//        │                             │
//        ▼                             │
//    [4] 暂停主函数 ──► 跳转到 lowerBound 循环砍半
//                           │          ▲
//                           ▼          │
//                      [5] 算出临界下标 ──┘
//        │
//        ▼
//    [6] 覆盖写入 spells[i]
//        │
//   循环未完则继续 ───────┘
//    │
//    ▼
// [7] return spells ─── 结束并交出最终答卷