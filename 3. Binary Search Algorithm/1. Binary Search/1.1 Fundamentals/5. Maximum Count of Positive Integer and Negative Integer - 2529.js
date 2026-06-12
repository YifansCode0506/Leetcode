/**
 * @param {number[]} nums
 * @return {number}
 */

// 这是一个标准的、找第一个 >= target 的下标的二分函数
function lowerBound(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((right - left) / 2) + left; // 正确的防溢出写法
        if (nums[mid] >= target) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

var maximumCount = function(nums) {
    // 1. 找到第一个 >= 0 的位置，这个位置的下标恰好就是负数的数量
    const negCount = lowerBound(nums, 0);
    
    // 2. 找到第一个 >= 1 的位置，从这个位置到末尾都是正数
    const firstPosIndex = lowerBound(nums, 1);
    const posCount = nums.length - firstPosIndex;
    
    // 3. 返回二者最大值
    return Math.max(negCount, posCount);
};