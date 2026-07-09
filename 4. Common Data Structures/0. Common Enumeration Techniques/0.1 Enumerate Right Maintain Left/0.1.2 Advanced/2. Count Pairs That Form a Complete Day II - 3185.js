/**
 * @param {number[]} hours
 * @return {number}
 */
var countCompleteDayPairs = function(hours) {
    const H = 24;
    // 创建一个固定长度为 24 的数组，用 0 填充
    // 索引（0-23）代表小时数对 24 取模后的余数，值代表该余数在历史遍历中出现的“次数”
    const cnt = Array(H).fill(0);
    // 初始化最终满足条件的下标对总数
    let ans = 0;

    // 线性单趟遍历小时数组，t 代表当前右侧的歌曲时间（相当于下标 j 的值）
    for (const t of hours) {
        // 1. 计算当前时间 t 的余数
        const remainder = t % H;
        // 2. 计算当前余数需要的、能凑满 24 小时倍数的互补余数
        // 外层再模 H 专门处理 remainder 为 0 的边界：(24 - 0) % 24 = 0
        const targetRemainder = (H - remainder) % H;

        // 3. 增量累加（核心）：直接从账本中读取该互补余数在历史中（即下标 i < j）已经出现的次数。
        // 因为此前出现的每一个元素，都可以与当前的 t 结成一对，所以直接把出现次数累加给 ans
        ans += cnt[targetRemainder];

        // 4. 更新账本：将当前数字对应的余数计数加 1，作为历史记录供后面更新的元素（未来的 j）来配对
        cnt[remainder]++;
    }

    // 返回累计出的总配对对数
    return ans;
};