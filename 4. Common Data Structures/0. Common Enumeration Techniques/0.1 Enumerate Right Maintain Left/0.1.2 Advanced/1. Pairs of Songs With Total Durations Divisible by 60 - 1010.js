/**
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function(time) {
    // 初始化最终满足条件的歌曲对数量
    let ans = 0;
    
    // 创建一个长度为 60 的数组用于余数计数，并用 0 填充
    // 索引代表时间对 60 取模后的余数 (0-59)，值代表该余数出现的频次
    const cnt = new Array(60).fill(0);

    // 线性遍历歌曲时间数组中的每一个元素 t
    for (const t of time) {
        // 1. 计算当前时间 t 对 60 取模后的当前余数
        const remainder = t % 60;
        
        // 2. 计算能与当前余数拼凑成 60 倍数的互补余数
        // 外层再模 60 是为了处理 remainder 为 0 的边界情况：(60 - 0) % 60 = 0
        const targetRemainder = (60 - remainder) % 60;

        // 3. 增量累加答案：在更新账本前，直接读取互补余数在历史中出现的次数，
        // 每一个历史同伴都能与当前歌曲配成有效对，故直接累加到结果中
        ans += cnt[targetRemainder];

        // 4. 更新账本：将当前歌曲的余数计数加 1，供后续遍历的歌曲进行匹配查找
        cnt[remainder]++;
    }

    // 返回总计配对数量
    return ans;
};