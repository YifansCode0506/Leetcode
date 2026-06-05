/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumSubarraySum = function(nums, k) {
    const cnt = new Map();
    let ans = 0, s = 0;

    for (let i = 0; i < nums.length; i++) {
        
        s += nums[i];
        cnt.set(nums[i], (cnt.get(nums[i]) ?? 0) + 1);

        let left = i - k + 1;
        if (left < 0) { 
            continue;
        }

        
        if (cnt.size == k) {
            ans = Math.max(ans, s);
        }

        
        const out = nums[left];
        s -= out;
        const c = cnt.get(out);
        if (c > 1) {
            cnt.set(out, c - 1);            
        } else {
            cnt.delete(out);        
        }
    }

    return ans;
};
