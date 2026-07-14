/**
 * 需求：判断是否存在 i != j，使 nums[i] === nums[j] 且 |i - j| <= k。
 * 思路：维护一个最多覆盖最近 k 个元素的 Set 窗口；当前数入窗前先检查是否重复。
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function(nums, k) {
    // window 存放当前下标左侧、距离不超过 k 的元素。
    const window = new Set();

    // i 是当前右端点下标。
    for (let i = 0; i < nums.length; i++) {
        // 如果当前元素已经存在于窗口中，说明找到距离不超过 k 的重复值。
        if (window.has(nums[i])) {
            return true;
        }

        // 把当前元素加入窗口，供未来 k 步内的元素查询。
        window.add(nums[i]);

        // 当 i >= k 时，nums[i - k] 在下一轮会超过允许距离，需要移出窗口。
        if (i >= k) {
            window.delete(nums[i - k]);
        }
    }

    // 遍历结束仍未命中，说明不存在符合条件的重复元素。
    return false;
};
