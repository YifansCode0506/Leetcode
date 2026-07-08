/**
 * @param {number[][]} points
 * @return {number}
 */
var countTrapezoids = function(points) {
    const MOD = 1000000007n; // 使用 BigInt 定义模数，防止大数溢出
    
    // 1. 统计每条水平线（即相同 y 坐标）上的点数
    const cnt = new Map();
    for (const p of points) {
        const y = p[1]; // 获取当前点的 y 坐标
        cnt.set(y, (cnt.get(y) ?? 0) + 1);
    }

    let ans = 0n; // 存储最终的梯形总数（BigInt 形式）
    let s = 0n;   // 存储当前处理过的前面所有水平线的两点组合数之和

    // 2. 遍历每一条水平线上的点数
    for (const c of cnt.values()) {
        // 如果一条线上的点数少于 2 个，根本无法构成边，直接跳过
        if (c < 2) continue; 
        
        // 将点数转换为 BigInt 方便后续统一计算
        const count = BigInt(c); 
        
        // 计算当前水平线上任选 2 个点的组合数：k = c * (c - 1) / 2
        const k = (count * (count - 1n)) / 2n;

        // 核心增量累加：当前线的组合数 k 与之前所有线的组合数总和 s 相乘，
        // 得到由当前线与前面所有线组合出的新梯形数量，并累加到总答案中
        ans += s * k;

        // 更新历史组合数总和：将当前线的组合数 k 累加到 s 中，供后续的线使用
        s += k;
    }

    // 3. 将 BigInt 结果转换回普通的 Number 并返回
    return Number(ans % MOD);
};