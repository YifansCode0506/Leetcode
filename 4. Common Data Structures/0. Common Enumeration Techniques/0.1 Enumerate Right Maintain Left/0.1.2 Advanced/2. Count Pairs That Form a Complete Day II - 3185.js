/**
 * 需求：统计两段小时数相加后能组成完整天数，即能被 24 整除的下标对数量。
 * 思路：枚举当前小时数，维护左边小时数对 24 取模后的余数计数。
 *
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function(hours) {
    // H 是一天的小时数，也是取模基数。
    const H = 24;

    // cnt[r] 表示左边历史中，hours[i] % 24 === r 的元素数量。
    const cnt = Array(H).fill(0);

    // ans 记录满足条件的下标对数量。
    let ans = 0;

    // 遍历每个小时数 t，把当前元素当成右端点 j。
    for (const t of hours) {
        // remainder 是当前小时数对 24 的余数。
        const remainder = t % H;

        // target 是能与当前余数相加后被 24 整除的互补余数。
        const target = (H - remainder) % H;

        // 先查账：左边每一个 target 余数元素都能与当前 t 配对。
        ans += cnt[target];

        // 后登记：把当前余数加入历史计数。
        cnt[remainder]++;
    }

    // 返回完整天数配对数量。
    return ans;
};

/**
 * 需求：返回所有能组成完整天数的下标对 [i, j]，而不是只返回数量。
 * 思路：账本不再只存频次，而是让每个余数保存所有历史下标。
 *
 * @param {number[]} hours
 * @return {number[][]}
 */
var countCompleteDayPairsWithIndices = function(hours) {
    // H 是一天的小时数，也是取模基数。
    const H = 24;

    // indices[r] 存放所有历史中余数为 r 的下标。
    const indices = Array.from({ length: H }, () => []);

    // ans 存放所有满足条件的下标对。
    const ans = [];

    // 用标准 for 循环枚举下标 j，因为结果需要输出真实下标。
    for (let j = 0; j < hours.length; j++) {
        // 当前元素对 24 的余数。
        const remainder = hours[j] % H;

        // 当前元素需要的互补余数。
        const target = (H - remainder) % H;

        // 取出所有拥有互补余数的历史下标。
        const pastIndices = indices[target];

        // 当前 j 可以和每一个历史下标 i 组成有效下标对。
        for (const i of pastIndices) {
            // 由于 i 来自历史账本，天然满足 i < j。
            ans.push([i, j]);
        }

        // 把当前下标登记到它自己的余数桶里，供未来元素查询。
        indices[remainder].push(j);
    }

    // 返回所有完整天数下标对。
    return ans;
};
