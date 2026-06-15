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
