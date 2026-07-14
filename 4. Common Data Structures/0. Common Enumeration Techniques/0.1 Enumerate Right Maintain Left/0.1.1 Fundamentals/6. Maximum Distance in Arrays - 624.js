/**
 * 需求：从两个不同数组中各选一个数，计算最大绝对差。
 * 思路：每个数组已排序；枚举当前数组，维护之前数组中的最小首元素和最大尾元素。
 *
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function(arrays) {
    // ans 记录目前找到的最大距离。
    let ans = 0;

    // mn 表示历史数组中最小的首元素，mx 表示历史数组中最大的尾元素。
    let mn = Infinity;
    let mx = -Infinity;

    // 逐个枚举当前数组 a，把它和左边已经遍历过的数组配对。
    for (const a of arrays) {
        // 当前数组的最小值是首元素。
        const curMin = a[0];

        // 当前数组的最大值是尾元素。
        const curMax = a[a.length - 1];

        // 用当前最大值减历史最小值，或历史最大值减当前最小值，更新最大距离。
        ans = Math.max(ans, curMax - mn, mx - curMin);

        // 把当前数组的边界值纳入历史最值，供后面的数组使用。
        mn = Math.min(mn, curMin);
        mx = Math.max(mx, curMax);
    }

    // 返回最大绝对差。
    return ans;
};
