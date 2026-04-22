/**
 * @param {string} s
 * @return {number}
 */
var maxScore = function(s) {
    let right1 = _.countBy(s)['1'] ?? 0;
    let ans = 0, left0 = 0;
    for (let i = 0; i < s.length - 1; i++) { // 移动分割线
        if (s[i] === '0') {
            left0++;
        } else {
            right1--;
        }
        ans = Math.max(ans, left0 + right1);
    }
    return ans;
};

// var maxScore = function(s) {
//     let score = _.countBy(s)['1'] ?? 0;
//     let ans = 0;
//     for (let i = 0; i < s.length - 1; i++) {
//         score += s[i] === '0' ? 1 : -1;
//         ans = Math.max(ans, score);
//     }
//     return ans;
// };

// var maxScore = function(s) {
//     const n = s.length;
//     let cnt1 = 0;
//     let delta = 0;
//     let maxDelta = -n;
//     for (let i = 0; i < n - 1; i++) {
//         cnt1 += s[i] === '1' ? 1 : 0;
//         delta += s[i] === '0' ? 1 : -1;
//         maxDelta = Math.max(maxDelta, delta);
//     }
//     return maxDelta + cnt1 + (s[n - 1] === '1' ? 1 : 0);
// };
