/**
 * 需求：统计歌曲时长两两相加后能被 60 整除的下标对数量。
 * 思路：枚举当前歌曲，维护左边歌曲时长对 60 取模后的余数计数。
 *
 * @param {number[]} time
 * @return {number}
 */
var numPairsDivisibleBy60 = function(time) {
    // ans 记录满足条件的歌曲对数量。
    let ans = 0;

    // cnt[r] 表示左边历史歌曲中，时长模 60 等于 r 的歌曲数量。
    const cnt = new Array(60).fill(0);

    // 遍历每首歌曲时长 t，把当前歌曲当成右端点。
    for (const t of time) {
        // remainder 是当前歌曲时长对 60 取模后的余数。
        const remainder = t % 60;

        // target 是能和当前余数凑成 60 倍数的互补余数。
        const target = (60 - remainder) % 60;

        // 左边每一首余数为 target 的歌曲，都能和当前歌曲组成有效对。
        ans += cnt[target];

        // 把当前歌曲的余数登记到账本，供后续歌曲查询。
        cnt[remainder]++;
    }

    // 返回满足条件的歌曲对总数。
    return ans;
};
