/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function(nums, k) {
    if(k <= 1) return 0;

    let ans = 0, prod = 1, left = 0;
    for (let right = 0; right < nums.length; right++) {
        prod *= nums[right];
        while (prod >= k) { // 不满足要求
            prod /= nums[left];
            left++; // 缩小窗口
        }
        // 对于固定的 right，有 right-left+1 个合法的左端点
        ans += right - left + 1;
    }
    return ans;
};