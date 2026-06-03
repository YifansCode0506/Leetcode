/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function(answerKey, k) {
    let ans = 0, left = 0;
    const cnt = {'T': 0, 'F': 0};
    for (let right = 0; right < answerKey.length; right++) {
        cnt[answerKey[right]]++;
        while (cnt['T'] > k && cnt['F'] > k) {
            cnt[answerKey[left]]--;
            left++
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};

// var maxConsecutiveAnswers = function(answerKey, k) {
//     let ans = 0, left = 0;
//     const cnt = [0, 0];
//     for (let right = 0; right < answerKey.length; right++) {
//         cnt[answerKey[right].charCodeAt(0) >> 1 & 1]++;
//         while (cnt[0] > k && cnt[1] > k) {
//             cnt[answerKey[left].charCodeAt(0) >> 1 & 1]--;
//             left++;
//         }
//         ans = Math.max(ans, right - left + 1);
//     }
//     return ans;
// };
