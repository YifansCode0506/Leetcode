/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minRemoval = function(nums, k) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    let maxSave = 0;
    let left = 0;
    for (let i = 0; i < n; i++) {
        while (nums[left] * k < nums[i]) {
            left++;
        }
        maxSave = Math.max(maxSave, i - left + 1);
    }
    return n - maxSave;
};
