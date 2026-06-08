/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reversePrefix = function(s, k) {
    // 如果 k 大于字符串长度，或者 k 小于等于 1，不需要反转，直接返回
    if (k <= 1) return s;

    // 1. 摊牌切片：
    // s.slice(0, k) 拿到前 k 个字符（索引 0 到 k-1）
    // s.slice(k) 拿到剩下的所有字符（从索引 k 到最后）
    let prefix = s.slice(0, k);
    let suffix = s.slice(k);

    // 2. 翻转前半部分：
    // 在 JS 中翻转字符串的黄金三部曲：split('') 转数组 -> reverse() 翻转 -> join('') 拼回字符串
    let reversedPrefix = prefix.split('').reverse().join('');

    // 3. 强强联手：拼好返回
    return reversedPrefix + suffix;
};