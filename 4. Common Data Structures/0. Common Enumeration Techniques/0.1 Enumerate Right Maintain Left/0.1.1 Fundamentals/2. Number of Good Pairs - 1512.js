/**
 * 需求：统计满足 i < j 且 nums[i] === nums[j] 的好数对数量。
 * 思路：枚举当前数作为右端点，Map 维护左边每个数字出现过多少次。
 *
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    // ans 累加所有符合条件的数对数量。
    let ans = 0;

    // cnt 的 key 是数字，value 是这个数字在左侧历史中出现的次数。
    const cnt = new Map();

    // 逐个枚举当前数字 x，把 x 当作 nums[j]。
    for (const x of nums) {
        // 读取左边已经出现过多少个 x；没有出现过则按 0 处理。
        const c = cnt.get(x) ?? 0;

        // 当前 x 可以和左边每一个相同的 x 组成好数对。
        ans += c;

        // 把当前 x 登记进账本，供后面的元素配对。
        cnt.set(x, c + 1);
    }

    // 返回累计得到的好数对数量。
    return ans;
};
