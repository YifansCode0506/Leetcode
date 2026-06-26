/**
 * @param {number[]} nums
 * @return {number}
 */
// var maximumDifference = function(nums) {
//     let ans = 0;
//     let minNums = nums[0];
//     for(let x of nums){
//         ans = Math.max(ans, x - minNums); // 把 x 当作 nums[j]
//         minNums = Math.min(minNums, x); // 把 x 当作 nums[i]
//     }
//     return ans || -1;
// };

var maximumDifference = function(nums) {
    let min = nums[0];
    let dif = -1;
    for(let i=1; i<nums.length; i++) {
        min = Math.min(min, nums[i]);
        if(nums[i] <= nums[i-1]) continue;
        dif = Math.max(dif, nums[i] - min);
    }
    return dif;
};