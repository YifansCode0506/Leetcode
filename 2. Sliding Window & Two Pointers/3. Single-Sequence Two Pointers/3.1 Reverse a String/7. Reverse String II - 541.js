/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverse = function(s, left, right) {
    while (left < right) {
        const tmp = s[left];
        s[left++] = s[right];
        s[right--] = tmp;
    }
};

var reverseStr = function(s, k) {
    s = s.split('');
    const n = s.length;
    for (let i = 0; i < n; i += k * 2) {
        reverse(s, i, Math.min(i + k, n) - 1);
    }
    return s.join('');
};

// var reverseStr = function(s, k) {
//     s = s.split('');
//     const n = s.length;

//     // 每次前进 2k 步
//     for (let i = 0; i < n; i += k * 2) {
        
//         // 计算当前这一组 2k 范围内，剩下还没处理的字符有几个
//         let remaining = n - i;

//         // 声明双指针翻转的目标边界
//         let left = i;
//         let right = 0;

//         if (remaining < k) {
//             // 情况 1：如果剩余字符少于 k 个，则将剩余字符全部反转
//             right = n - 1; // 右边界直接锁死在整串的最后一个字符
            
//         } else if (remaining >= k && remaining < k * 2) {
//             // 情况 2：如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符
//             right = i + k - 1;
            
//         } else {
//             // 情况 3：正常情况，剩余字符至少有 2k 个，反转这 2k 字符中的前 k 个字符
//             right = i + k - 1;
//         }

//         // 边界锁死后，使用双指针翻转逻辑
//         while (left < right) {
//             let tmp = s[left];
//             s[left] = s[right];
//             s[right] = tmp;
//             left++;
//             right--;
//         }
//     }

//     return s.join('');
// };