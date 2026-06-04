/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var countKConstraintSubstrings = function(s, k) {
    let ans = 0;
    let cnt0 = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        // 1. 【入】：右端点字符进入窗口，如果是 '0' 则计数
        if (s[right] === '0') cnt0++;

        // 2. 【缩】：当 0 和 1 的数量同时超过 k 时，窗口不合法，启动收缩
        // 此时窗口长度可以直接用当前索引算出来：right - left + 1
        while (cnt0 > k && (right - left + 1) - cnt0 > k) {
            if (s[left] === '0') cnt0--;
            left++; // 队尾踢人，窗口变小
        }

        // 3. 【更新/计数】：走到这里，窗口必然合法！
        // 此时以 right 结尾的合法子字符串数量，正好等于当前合法窗口的长度
        ans += (right - left + 1);
    }

    return ans;
};