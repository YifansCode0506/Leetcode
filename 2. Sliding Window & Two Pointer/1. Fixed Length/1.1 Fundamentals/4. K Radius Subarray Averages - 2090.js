/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var getAverages = function(nums, k) {
    let n = nums.length;
    let avgs = Array(n).fill(-1);
    let s = 0;

    for(let i = 0; i < n; i++){
        s += nums[i];
        if(i < k * 2){
            continue;
        }

        avgs[i - k] = Math.floor(s / (2*k + 1));
        s -= nums[i -2 * k];
    }
    return avgs;
};
