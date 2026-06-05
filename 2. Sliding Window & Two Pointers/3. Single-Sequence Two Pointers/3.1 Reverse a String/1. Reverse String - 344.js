/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

// 双指针写法
// var reverseString = function(s) {
//     const n = s.length;
//     for (let left = 0, right = n - 1; left < right; left++, right--) {
//         [s[left], s[right]] = [s[right], s[left]];
//     }
// };

// 单指针写法
// var reverseString = function(s) {
//     const n = s.length;
//     for (let i = 0; i < n / 2; i++) {
//         [s[i], s[n - 1 - i]] = [s[n - 1 - i], s[i]];
//     }
// };

// 语法糖
var reverseString = function(s) {
    s.reverse();
};