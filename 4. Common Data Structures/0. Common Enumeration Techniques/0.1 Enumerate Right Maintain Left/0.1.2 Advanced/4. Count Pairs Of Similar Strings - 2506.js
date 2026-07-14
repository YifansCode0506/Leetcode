/**
 * 需求：统计相似字符串对数量；两个字符串包含的字符集合完全相同则相似。
 * 思路：把每个字符串的字符集合压缩成 bitmask，Map 维护左边相同 mask 出现过多少次。
 *
 * @param {string[]} words
 * @return {number}
 */
var similarPairs = function(words) {
    // cnt 的 key 是字符集合对应的二进制 mask，value 是该 mask 出现次数。
    const cnt = new Map();

    // ans 记录相似字符串对数量。
    let ans = 0;

    // 遍历每个字符串 s，把它当作右端点。
    for (const s of words) {
        // mask 是当前字符串的字符集合，初始时没有任何字符。
        let mask = 0;

        // 遍历字符串中的每个字符 c。
        for (const c of s) {
            // offset 表示当前字符在 a~z 中的下标位置。
            const offset = c.charCodeAt(0) - 'a'.charCodeAt(0);

            // 1 << offset 生成当前字符对应的二进制位；按位或把该位标记为 1。
            mask |= 1 << offset;
        }

        // 读取左边有多少字符串拥有同样的字符集合。
        const c = cnt.get(mask) ?? 0;

        // 当前字符串可以和左边所有同 mask 字符串组成相似对。
        ans += c;

        // 把当前 mask 登记进账本，供后续字符串配对。
        cnt.set(mask, c + 1);
    }

    // 返回相似字符串对数量。
    return ans;
};
