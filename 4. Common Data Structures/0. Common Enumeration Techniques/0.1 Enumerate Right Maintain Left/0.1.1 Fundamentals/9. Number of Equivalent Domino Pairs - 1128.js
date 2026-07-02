/**
 * @param {number[][]} dominoes
 * @return {number}
 */

var numEquivDominoPairs = function(dominoes) {
    // 1. 创建一个长度为 100 的计数器数组，初始化为 0
    // 用来记录每种“两位数特征值”（11-99）出现了多少次
    let num = new Array(100).fill(0);
    
    // 初始化等价骨牌对的总数
    let ans = 0;

    // 2. 遍历每一张多米诺骨牌
    for (let d of dominoes) {
        // 强行规整顺序：让 a 是较小的数，b 是较大的数
        let a = Math.min(d[0], d[1]);
        let b = Math.max(d[0], d[1]);
        
        // 将二元组 [a, b] 压缩组合成一个唯一的两位数
        let val = a * 10 + b;

        // 核心计数逻辑：
        // 如果当前特征值 val 之前已经出现了 n 次，
        // 那么当前这张新骨牌就能和之前的 n 张骨牌分别组成一对，所以答案增加 n。
        ans += num[val];

        // 更新计数器：把当前这张骨牌的特征值登记到账本中，次数加 1
        num[val]++;
    }

    // 3. 返回最终得到的有效下标对数量
    return ans;
};