/**
 * @param {string[]} words
 * @return {number}
 */
var similarPairs = function(words) {
    // 实例化一个 Map 对象，用于记录每种二进制特征值（字符集合）在历史中出现的频次
    // Key: 二进制整数 (mask), Value: 出现的次数 (c)
    const cnt = new Map();
    // 初始化满足条件的相似字符串对的总数量
    let ans = 0;

    // 线性单趟遍历字符串数组中的每一个字符串 s
    for (const s of words) {
        // 初始化一个 32 位的整数 mask 为 0（二进制全是 0），用作当前字符串的“字符去重集合”
        let mask = 0; 
        
        // 遍历当前字符串 s 中的每一个字符 c
        for (const c of s) {
            // 计算当前字符 c 距离 'a' 的相对偏移量（例如 'a'->0, 'b'->1, 'c'->2）
            const offset = c.charCodeAt(0) - 'a'.charCodeAt(0);
            
            // 1 << offset: 将数字 1 左移 offset 位，得到当前字母专属的二进制标志位
            // mask |= ... : 利用按位或（OR）操作，将该标志位置为 1。
            // 即使同一个字母重复出现，按位或之后该位依然是 1，从而实现了自动去重
            mask |= 1 << offset;
        }

        // 配对与连线阶段：从 Map 账本中读取当前二进制特征值 mask 此前已经出现的次数
        // 若账本中不存在该键，则利用空值合并运算符（??）降级赋值为默认值 0
        const c = cnt.get(mask) ?? 0;
        
        // 增量累加：此前出现的每一个同特征字符串，都能与当前的 s 结成一对，故直接把历史次数 c 累加到结果中
        ans += c;
        
        // 更新账本：将当前字符串的特征值计数加 1，覆盖写回 Map，作为历史记录供后续未来的元素配对
        cnt.set(mask, c + 1);
    }

    // 返回累计出的总相似对数
    return ans;
};