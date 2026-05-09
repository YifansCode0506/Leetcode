/**
 * @param {string} s
 * @return {number}
 */

var maximumLengthSubstring = function(s) {
    let ans = 0;
    let left = 0;
    // 创建一个长度为 26 的数组记录频率，初始化为 0
    const cnt = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
        // 1. 入：计算当前字符在 0-25 中的索引
        let b = s.charCodeAt(i) - 97;
        cnt[b]++;

        // 2. 缩：如果当前字符出现次数超过 2 次，开始收缩左边界
        while (cnt[b] > 2) {
            let out = s.charCodeAt(left) - 97;
            cnt[out]--;
            left++;
        }
        // 3. 更新：记录窗口的最大长度
        // 窗口长度公式依然是：右端点 - 左端点 + 1
        ans = Math.max(ans, i - left + 1);
    }
    return ans;
};