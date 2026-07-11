/**
 * @param {number[]} nums
 * @return {number}
 */
var countBeautifulPairs = function(nums) {
    // 初始化美丽下标对的总数量
    let ans = 0;
    
    // 创建一个长度为 10 的数组用于统计历史元素的“最高位”数字出现的频次
    // 索引 (1-9) 代表最高位数字，值代表该最高位数字出现的次数
    const cnt = new Array(10).fill(0);

    // 线性单趟遍历数组中的每一个数字 x
    for (let x of nums) {
        
        // 1. 配对阶段：遍历可能的所有历史最高位数字 y (1 到 9)
        for (let y = 1; y < 10; y++) {
            // 如果历史上确实出现过最高位为 y 的数字，且 y 与当前数字的个位数 (x % 10) 互质
            if (cnt[y] > 0 && gcd(y, x % 10) === 1) {
                // 当前数字能与历史上所有最高位为 y 的元素各配成一对，直接累加历史出现次数
                ans += cnt[y];
            }
        }

        // 2. 剥离阶段：通过循环不断除以 10 并向下取整，剥离出当前数字 x 的最高位数字
        while (x >= 10) {
            x = Math.floor(x / 10);
        }

        // 3. 登记阶段：将当前数字对应的最高位数字在账本 cnt 中的计数加 1，作为历史记录供后续元素配对
        cnt[x]++;
    }

    // 返回累计的完美对数
    return ans;
};

/**
 * 辗转相除法（欧几里得算法）计算最大公约数
 * @param {number} a 
 * @param {number} b 
 * @return {number}
 */
function gcd(a, b) {
    // 递归基准：当余数 b 为 0 时，最大公约数即为 a
    // 否则继续递归计算 b 和 a % b 的最大公约数
    return b === 0 ? a : gcd(b, a % b);
}