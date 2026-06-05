/**
 * @param {number[]} nums
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var maxSum = function(nums, m, k) {
    const cnt = new Map();
    let ans = 0, s = 0;

    for (let i = 0; i < nums.length; i++) {
        // 1. enter slid
        s += nums[i];
        cnt.set(nums[i], (cnt.get(nums[i]) ?? 0) + 1);

        let left = i - k + 1;
        if (left < 0) { // slid size != k
            continue;
        }

        // 2. update
        if (cnt.size >= m) {
            ans = Math.max(ans, s);
        }

        // 3. leave slid
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
