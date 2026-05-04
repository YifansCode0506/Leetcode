/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
    let ans = 0;
    let left = 0;
    const cnt = new Map(); // 维护从下标 left 到下标 right 的字符
    for (let right = 0; right < s.length; right++) {
        const c = s[right];
        cnt.set(c, (cnt.get(c) ?? 0) + 1);
        while (cnt.get(c) > 1) { // 窗口内有重复字母
            cnt.set(s[left], cnt.get(s[left]) - 1); // 移除窗口左端点字母
            left++; // 缩小窗口
        }
        ans = Math.max(ans, right - left + 1); // 更新窗口长度最大值
    }
    return ans;
};

// var lengthOfLongestSubstring = function(s) {
//     let ans = 0;
//     let left = 0;
//     const window = new Set(); // 维护从下标 left 到下标 right 的字符
//     for (let right = 0; right < s.length; right++) {
//         const c = s[right];
//         // 如果窗口内已经包含 c，那么再加入一个 c 会导致窗口内有重复元素
//         // 所以要在加入 c 之前，先移出窗口内的 c
//         while (window.has(c)) { // 窗口内有 c
//             window.delete(s[left]);
//             left++; // 缩小窗口
//         }
//         window.add(c); // 加入 c
//         ans = Math.max(ans, right - left + 1); // 更新窗口长度最大值
//     }
//     return ans;
// };
