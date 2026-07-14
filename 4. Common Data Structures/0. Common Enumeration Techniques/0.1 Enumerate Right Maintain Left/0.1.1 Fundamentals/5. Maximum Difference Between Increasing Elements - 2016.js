/**
 * 需求：找到 i < j 且 nums[i] < nums[j] 时 nums[j] - nums[i] 的最大值；不存在返回 -1。
 * 思路：枚举当前数作为右端点，维护左边最小的 nums[i]。
 *
 * @param {number[]} nums
 * @return {number}
 */
var maximumDifference = function(nums) {
    // ans 记录最大正差值；初始化为 -1 表示暂时没有合法递增对。
    let ans = -1;

    // minNum 记录当前元素左边出现过的最小值。
    let minNum = nums[0];

    // 从下标 1 开始枚举右端点，因为下标 0 左边没有元素。
    for (let j = 1; j < nums.length; j++) {
        // 当前右端点的值。
        const x = nums[j];

        // 如果历史最小值小于当前值，则可以构成递增对。
        if (minNum < x) {
            // 用当前差值更新最大答案。
            ans = Math.max(ans, x - minNum);
        }

        // 把当前值纳入历史，维护给未来右端点使用的最小左值。
        minNum = Math.min(minNum, x);
    }

    // 返回最大差值；若没有合法递增对则返回 -1。
    return ans;
};
