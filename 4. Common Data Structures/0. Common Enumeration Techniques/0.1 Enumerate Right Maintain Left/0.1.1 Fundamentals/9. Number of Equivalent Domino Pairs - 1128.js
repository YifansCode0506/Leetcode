/**
 * 需求：统计等价多米诺骨牌对数量；[a,b] 和 [b,a] 视为同一种骨牌。
 * 思路：把每张骨牌规整成唯一特征值，枚举当前骨牌时统计左边同特征骨牌数量。
 *
 * @param {number[][]} dominoes
 * @return {number}
 */
var numEquivDominoPairs = function(dominoes) {
    // cnt[val] 表示特征值为 val 的骨牌在左侧历史中出现过多少次。
    const cnt = new Array(100).fill(0);

    // ans 记录等价骨牌对总数。
    let ans = 0;

    // 遍历每一张骨牌，把当前骨牌当成右端点。
    for (const d of dominoes) {
        // a 取较小点数，b 取较大点数，用来消除 [x,y] 和 [y,x] 的顺序差异。
        const a = Math.min(d[0], d[1]);
        const b = Math.max(d[0], d[1]);

        // 把规整后的二元组压成一个唯一数字，例如 [2,5] -> 25。
        const val = a * 10 + b;

        // 当前骨牌可以和左边所有同特征骨牌配对。
        ans += cnt[val];

        // 把当前骨牌登记进该特征值的计数器。
        cnt[val]++;
    }

    // 返回所有等价骨牌对数量。
    return ans;
};
