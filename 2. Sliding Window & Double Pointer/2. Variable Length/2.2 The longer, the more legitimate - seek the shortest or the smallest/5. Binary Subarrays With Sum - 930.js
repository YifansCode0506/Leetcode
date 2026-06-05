/**
 * @param {number[]} nums
 * @param {number} goal
 * @return {number}
 */
var numSubarraysWithSum = function(nums, goal) {
    // 辅助函数：求出子数组之和【小于等于】target 的子数组总个数
    const solve = (target) => {
        if (target < 0) return 0; // 如果目标值小于 0，和不可能小于等于负数，直接返回 0
        
        let left = 0, sum = 0, ans = 0;
        for (let right = 0; right < nums.length; right++) {
            // 【入】
            sum += nums[right];

            // 【缩】：当总和大于 target 时，窗口不合法，必须收缩
            while (sum > target) {
                sum -= nums[left];
                left++;
            }

            // 【更新/计数】：此时窗口内的和满足 <= target
            // 以 right 结尾的合法子数组数量，正好等于当前窗口的长度
            ans += (right - left + 1);
        }
        return ans;
    };

    // 数学转换：
    // 恰好等于 goal 的数量 = (和 <= goal 的数量) - (和 <= goal - 1 的数量)
    return solve(goal) - solve(goal - 1);
};