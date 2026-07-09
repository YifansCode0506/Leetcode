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

var countCompleteDayPairs = function(hours) {
    const H = 24;
    const cnt = Array(H).fill(0);
    let ans = 0;

    for (const t of hours) {
        // 先查询 cnt，再更新 cnt，因为题目要求 i < j
        // 如果先更新，再查询，就把 i = j 的情况也考虑进去了
        ans += cnt[(H - t % H) % H];
        cnt[t % H]++;
    }
    return ans;
}; 


/**
 * @param {number[]} hours
 * @return {number[][]} 返回所有满足条件的二维下标对数组 [[i1, j1], [i2, j2], ...]
 */
var countCompleteDayPairsWithIndices = function(hours) {
    const H = 24;
    
    // 1. 账本升级：创建一个长度为 24 的数组，每一格都初始化为一个独立的空数组 []
    // 索引 (0-23) 代表余数，cnt[余数] 里面存放的是【所有拥有该余数的历史元素的“真实下标”】
    const cnt = Array.from({ length: H }, () => []);
    
    // 初始化结果集，用于存放所有的下标对 [i, j]
    const ans = [];

    // 2. 开始线性遍历小时数组，此时必须用标准的带有索引的循环，因为我们需要捕获当前的下标 j
    for (let j = 0; j < hours.length; j++) {
        const remainder = hours[j] % H;          // 计算当前元素的余数
        const targetRemainder = (H - remainder) % H; // 计算所需的互补余数

        // 3. 查账与连线：获取拥有互补余数的历史下标数组
        const pastIndices = cnt[targetRemainder];
        
        // 如果历史上有同伴存在（数组不为空）
        for (const i of pastIndices) {
            // 每一个历史下标 i 都在当前 j 的左边，天生满足 i < j
            // 直接将它们配对成 [i, j] 存入结果集中
            ans.push([i, j]);
        }

        // 4. 登记入账：将当前的下标 j 记录到它自己余数对应的数组中，供未来的元素匹配
        cnt[remainder].push(j);
    }

    // 返回所有找到的下标对
    return ans;
};