/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
    const n = cardPoints.length;
    const m = n - k;
    let s = 0;
    for (let i = 0; i < m; i++) {
        s += cardPoints[i];
    }
    let total = s;
    let minS = s;
    for (let i = m; i < n; i++) {
        total += cardPoints[i];
        s += cardPoints[i] - cardPoints[i - m];
        minS = Math.min(minS, s);
    }
    return total - minS;
};


// var maxScore = function (cardPoints, k) {
//     let s = 0;
//     for (let i = 0; i < k; i++) {
//         s += cardPoints[i];
//     }
//     let ans = s;
//     for (let i = 1; i <= k; i++) {
//         s += cardPoints[cardPoints.length - i] - cardPoints[k - i];
//         ans = Math.max(ans, s);
//     }
//     return ans;
// };
