/**
 * 需求：统计宽高比相同的矩形对数量。
 * 思路：把宽高比化成最简整数比字符串，Map 维护每种比例在左边出现过多少次。
 *
 * @param {number[][]} rectangles
 * @return {number}
 */
var interchangeableRectangles = function(rectangles) {
    // cnt 的 key 是最简比例字符串，例如 "16/9"，value 是该比例出现次数。
    const cnt = new Map();

    // ans 记录可互换矩形对数量。
    let ans = 0;

    // 遍历每个矩形，把当前矩形当成右端点。
    for (const [w, h] of rectangles) {
        // 计算宽高的最大公约数，用来约分比例。
        const g = gcd(w, h);

        // 把比例化成字符串 key，避免浮点数精度问题，也避免数组 key 的引用比较问题。
        const key = `${w / g}/${h / g}`;

        // 读取左边已有多少个相同比例的矩形。
        const c = cnt.get(key) ?? 0;

        // 当前矩形可以和左边每一个相同比例矩形组成一对。
        ans += c;

        // 登记当前矩形比例，供后续矩形配对。
        cnt.set(key, c + 1);
    }

    // 返回可互换矩形对数量。
    return ans;
};

/**
 * 需求：计算两个正整数的最大公约数。
 * 思路：使用辗转相除法，不断把较大问题缩小为余数问题。
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function gcd(a, b) {
    // 当 b 为 0 时，a 就是最大公约数。
    while (b !== 0) {
        // r 保存 a 除以 b 的余数。
        const r = a % b;

        // 原来的 b 成为下一轮的 a。
        a = b;

        // 余数 r 成为下一轮的 b。
        b = r;
    }

    // 返回最终的最大公约数。
    return a;
}
