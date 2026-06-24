/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxK = function (nums) {
    const map = new Map();
    let ans = -1;
    for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        if (map.has(-x)) {
            ans = Math.max(ans, Math.abs(x)); // 更新最大值
        }
        map.set(x, i);
    }
    return ans; // 循环结束后返回
};