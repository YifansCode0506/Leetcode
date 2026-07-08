/**
 * @param {number[][]} rectangles
 * @return {number}
 */
// var interchangeableRectangles = function(rectangles) {
//     // 实例化一个 Map，用于记录每种最简分数比例出现的频次 (Key: "w/h", Value: 出现次数)
//     const cnt = new Map();
//     // 初始化满足条件的互换矩形总对数
//     let ans = 0;

//     // 1. 线性遍历所有矩形，统计每种宽高比的频次
//     for (let p of rectangles) {
//         let w = p[0];
//         let h = p[1];
        
//         // 调用求最大公约数函数
//         let g = gcd(w, h);
        
//         // 核心：通过除以最大公约数，将宽高化为最简分数，并拼接成字符串作为唯一的 Key
//         let key = `${w / g}/${h / g}`;
        
//         // 读取该比例已有的数量并加 1，写回 Map
//         cnt.set(key, (cnt.get(key) ?? 0) + 1);
//     }

//     // 2. 遍历统计好的 Map，利用排列组合公式计算总对数
//     for (let m of cnt.values()) {
//         // 排列组合公式：从 m 个相同比例的矩形中任选 2 个的组合数为 m * (m - 1) / 2
//         ans += (m * (m - 1)) / 2;
//     }

//     // 返回总计对数
//     return ans;
// };

/**
 * 辗转相除法（欧几里得算法）求最大公约数
 * @param {number} a 
 * @param {number} b 
 * @return {number}
 */
function gcd(a, b) {
    // 循环余数计算，直到 a 变为 0 
    while (a !== 0) {
        let temp = a;
        a = b % a; // 取余数
        b = temp;  // 轮换变量
    }
    // 返回最终的最大公约数
    return b;
}

var interchangeableRectangles = function(rectangles) {
    const cnt = new Map();
    let ans = 0;

    for (let [w, h] of rectangles) {

        // 核心：通过除以最大公约数，将宽高化为最简分数，并拼接成字符串作为唯一的 Key
        let g = gcd(w, h);
        let key = `${w / g}/${h / g}`;
        
        // 隐式求和：如果之前这个比例已经有了 count 个，当前新来的矩形就可以和前面的 count 个分别配对
        let count = cnt.get(key) ?? 0;
        ans += count; 
        
        // 更新计数
        cnt.set(key, count + 1);
    }

    return ans;
};


// var interchangeableRectangles = function(rectangles) {
//     // 初始化 res 用于累加总对数；实例化 dd 作为哈希表记录宽高比的出现次数
//     let res = 0, dd = new Map();

//     // 线性遍历输入的二维数组，x 代表当前处理的矩形元组 [width, height]
//     for(const x of rectangles){
//         // 1. 计算宽高比：执行实数除法（注意：此处在 JavaScript 中会产生浮点数精度丢失风险）
//         let b = x[0] / x[1];

//         // 2. 动态累加对数：检查哈希表中是否已经记录过当前的宽高比 b
//         if(dd.has(b)){
//             // 若存在，说明当前矩形能与前面已存的 dd.get(b) 个同比例矩形各配成一对，
//             // 故直接将历史数量累加到结果 res 中
//             res += dd.get(b);
//         }
        
//         // 3. 更新计数：读取当前比例的旧计数（若无则默认为 0）并加 1，写回哈希表
//         // 无论有无配对成功，当前矩形都必须登记，供后续遍历的矩形进行连线配对
//         dd.set(b, (dd.get(b) ?? 0) + 1);
//     }

//     // 返回最终累计的所有可互换矩形对数
//     return res;
// };
// JavaScript 中的数字都是双精度浮点数。有些分数在计算机里无法精确表示。
// 例如：
// 51 / 17 和 3 / 1 本来都等于 3。但在极特殊的超大数字下，除法可能会因为精度截断变成 3.0000000000000004 和 2.9999999999999996。
// 这样的话，Map 就会认为它们是两个完全不同的比例，导致漏算。
// 最佳实践建议：这就是为什么去求 最大公约数（GCD）化简成分数，
// 因为字符串 "3/1" 在 Map 里是绝对安全、绝不会因为精度产生误差的！