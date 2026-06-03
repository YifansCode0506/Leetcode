/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
    const n = nums.length;
    let ans = n + 1;
    let sum = 0; // 子数组元素和
    let left = 0; // 子数组左端点
    for (let right = 0; right < n; right++) { // 枚举子数组右端点
        sum += nums[right];
        while (sum - nums[left] >= target) { // 尽量缩小子数组长度
            sum -= nums[left];
            left++; // 左端点右移
        }
        if (sum >= target) {
            ans = Math.min(ans, right - left + 1);
        }
    }
    return ans <= n ? ans : 0;
};

// var minSubArrayLen = function(target, nums) {
//     const n = nums.length;
//     let ans = n + 1;
//     let sum = 0; // 子数组元素和
//     let left = 0; // 子数组左端点
//     for (let right = 0; right < n; right++) { // 枚举子数组右端点
//         sum += nums[right];
//         while (sum >= target) { // 满足要求
//             ans = Math.min(ans, right - left + 1);
//             sum -= nums[left];
//             left++; // 左端点右移
//         }
//     }
//     return ans <= n ? ans : 0;
// };
