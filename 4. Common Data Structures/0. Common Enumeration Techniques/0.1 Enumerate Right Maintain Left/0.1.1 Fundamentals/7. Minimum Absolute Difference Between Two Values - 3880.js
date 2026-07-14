/**
 * 需求：在只关心数字 1 和 2 的情况下，返回它们下标之间的最小距离；不存在则返回 -1。
 * 思路：枚举当前下标，维护左边最近一次出现 1 和 2 的位置。
 *
 * @param {number[]} nums
 * @return {number}
 */
var minAbsoluteDifference = function(nums) {
    // lastOne 记录数字 1 最近一次出现的位置；-1 表示还没出现。
    let lastOne = -1;

    // lastTwo 记录数字 2 最近一次出现的位置；-1 表示还没出现。
    let lastTwo = -1;

    // ans 记录当前找到的最小距离。
    let ans = Infinity;

    // 枚举每一个下标 i，把 nums[i] 当成右端点。
    for (let i = 0; i < nums.length; i++) {
        // 如果当前数字是 1，就尝试和左边最近的 2 配对。
        if (nums[i] === 1) {
            // 左边出现过 2 时，用当前距离更新答案。
            if (lastTwo !== -1) {
                ans = Math.min(ans, i - lastTwo);
            }

            // 更新 1 的最近出现位置。
            lastOne = i;
        } else if (nums[i] === 2) {
            // 如果当前数字是 2，就尝试和左边最近的 1 配对。
            if (lastOne !== -1) {
                ans = Math.min(ans, i - lastOne);
            }

            // 更新 2 的最近出现位置。
            lastTwo = i;
        }
    }

    // 如果没有找到 1 和 2 的有效配对，则返回 -1。
    return ans === Infinity ? -1 : ans;
};
