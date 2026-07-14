/**
 * 需求：从数组中找出所有和为 target 的数对，每个元素最多使用一次。
 * 思路：维护未被消耗的历史数字库存；当前数字能找到互补数就输出一对并扣库存。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var pairSums = function(nums, target) {
    // cnt 的 key 是未配对数字，value 是这个数字还可以被使用的次数。
    const cnt = new Map();

    // ans 存放所有成功配出的数对。
    const ans = [];

    // 遍历每个数字 num，把它当成当前尝试配对的右端点。
    for (const num of nums) {
        // complement 是当前 num 需要的互补数字。
        const complement = target - num;

        // 读取互补数字在库存中还剩多少个。
        const complementCount = cnt.get(complement) ?? 0;

        // 如果互补数字有库存，当前 num 可以立刻成对。
        if (complementCount > 0) {
            // 把这一对加入结果数组。
            ans.push([complement, num]);

            // 消耗掉一个互补数字，防止它被重复使用。
            cnt.set(complement, complementCount - 1);
        } else {
            // 如果没有互补数字，当前 num 先入库等待后续元素。
            cnt.set(num, (cnt.get(num) ?? 0) + 1);
        }
    }

    // 返回所有配出的数对。
    return ans;
};
