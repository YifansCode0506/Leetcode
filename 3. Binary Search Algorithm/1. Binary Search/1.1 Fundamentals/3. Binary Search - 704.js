/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

var lowerBound = function(nums, target){
    let left = 0, right = nums.length - 1; // 闭区间 [left, right]
    while (left <= right) { // 区间不为空
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] < target) {
            left = mid + 1; // 范围缩小到 [mid+1, right]
        } else {
            right = mid - 1; // 范围缩小到 [left, mid-1]
        }
    }
    return left;
}

var search = function(nums, target) {
    const index = lowerBound(nums, target);
    if(index === nums.length || nums[index] !== target){
        return -1
    }else{
        return index
    }
};