/**
 * 需求：找到一个最大的正整数 k，使得 k 和 -k 都出现在数组中；不存在则返回 -1。
 * 思路：枚举当前数 x，查询左边是否出现过 -x，命中后用 |x| 更新答案。
 *
 * @param {number[]} nums
 * @return {number}
 */
var findMaxK = function(nums) {
    // seen 记录左边已经出现过的数字；这里只关心存在性，所以用 Set。
    const seen = new Set();

    // ans 初始化为 -1，表示还没有找到符合条件的正整数。
    let ans = -1;

    // 从左到右遍历，每次把当前 x 当成右端点。
    for (const x of nums) {
        // 先查账：如果左边出现过 -x，则 x 和 -x 凑成一对。
        if (seen.has(-x)) {
            // 用这对数对应的正整数 Math.abs(x) 更新最大答案。
            ans = Math.max(ans, Math.abs(x));
        }

        // 后登记：当前数字加入历史集合，供后面的数字查询。
        seen.add(x);
    }

    // 返回最大 k；如果从未命中，仍然是 -1。
    return ans;
};
