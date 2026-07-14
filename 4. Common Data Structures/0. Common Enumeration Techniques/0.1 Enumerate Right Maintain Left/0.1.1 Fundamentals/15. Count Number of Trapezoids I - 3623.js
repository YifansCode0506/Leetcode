/**
 * 需求：统计可以组成水平梯形的点集数量，并对 1e9+7 取模。
 * 思路：同一条水平线任选两个点可以作为一条底边；枚举当前水平线，维护左边所有水平线的底边组合数总和。
 *
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    // MOD 使用 BigInt，避免组合数相乘时超过 Number 安全整数范围。
    const MOD = 1000000007n;

    // cnt 的 key 是 y 坐标，value 是这条水平线上有多少个点。
    const cnt = new Map();

    // 先按 y 坐标分组统计点数。
    for (const p of points) {
        // y 表示当前点所在水平线。
        const y = p[1];

        // 当前水平线点数加 1。
        cnt.set(y, (cnt.get(y) ?? 0) + 1);
    }

    // ans 存储最终梯形数量，使用 BigInt 计算。
    let ans = 0n;

    // sum 保存已经处理过的水平线中，“任选两个点作为底边”的组合数总和。
    let sum = 0n;

    // 枚举每条水平线上的点数，相当于在“水平线”层面枚举右端点。
    for (const c of cnt.values()) {
        // 少于 2 个点的水平线不能形成一条底边。
        if (c < 2) {
            continue;
        }

        // 转成 BigInt，确保后续乘法安全。
        const count = BigInt(c);

        // k 是当前水平线任选两个点作为底边的方案数 C(c, 2)。
        const k = count * (count - 1n) / 2n;

        // 当前线的每一种底边，都可以和左边任意一条历史底边组成一个梯形。
        ans += sum * k;

        // 把当前线的底边方案数加入历史总和，供后续水平线使用。
        sum += k;
    }

    // 对 MOD 取模后转回 Number，符合题目返回类型。
    return Number(ans % MOD);
};
