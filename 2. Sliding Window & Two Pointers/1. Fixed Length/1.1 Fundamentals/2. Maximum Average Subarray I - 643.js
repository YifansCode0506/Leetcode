/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findMaxAverage = function(nums, k) {
    let maxS = -Infinity; 
    let s = 0; 
    for (let i = 0; i < nums.length; i++) {
        
        s += nums[i];
        if (i < k - 1) { 
            continue;
        }
        
        maxS = Math.max(maxS, s);
        
        s -= nums[i - k + 1];
    }
    return maxS / k;
};
