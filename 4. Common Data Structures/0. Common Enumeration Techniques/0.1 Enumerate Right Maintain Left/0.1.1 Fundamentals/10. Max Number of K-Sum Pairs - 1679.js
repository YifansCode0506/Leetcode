/**
 * 需求：每次选择两个数使它们的和为 k，且每个数最多使用一次，返回最多操作次数。
 * 思路：维护左边尚未被配对消耗的数字库存；当前数能配就消耗库存，不能配就入库。
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxOperations = function(nums, k) {
    // cnt 的 key 是未配对数字，value 是这个数字当前可用的库存数量。
    const cnt = new Map();

    // ans 记录成功配对的次数。
    let ans = 0;

    // 遍历每个数字 x，把它当成当前尝试配对的右端点。
    for (const x of nums) {
        // target 是当前 x 需要的互补数字。
        const target = k - x;

        // 读取互补数字当前还剩多少库存。
        const c = cnt.get(target) ?? 0;

        // 如果左边有可用的 target，就立刻和当前 x 配成一对。
        if (c > 0) {
            // 成功完成一次操作。
            ans++;

            // 被配走的 target 不能再使用，所以库存减 1。
            cnt.set(target, c - 1);
        } else {
            // 如果没有互补数字可用，当前 x 暂时入库，等待未来数字匹配。
            cnt.set(x, (cnt.get(x) ?? 0) + 1);
        }
    }

    // 返回最多可完成的配对操作次数。
    return ans;
};
