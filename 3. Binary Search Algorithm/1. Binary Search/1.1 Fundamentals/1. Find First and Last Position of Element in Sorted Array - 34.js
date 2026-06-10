/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */

// =========================================================
// 闭区间写法
// lowerBound 返回最小的满足 nums[i] >= target 的下标 i
// 如果数组为空，或者所有数都 < target，则返回 nums.length
// 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]
var lowerBound = function(nums, target) {
    let left = 0, right = nums.length - 1; // 闭区间 [left, right]
    while (left <= right) { // 区间不为空
        // 循环不变量：
        // nums[left-1] < target
        // nums[right+1] >= target
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            right = mid - 1; // 范围缩小到 [left, mid-1]
        } else {
            left = mid + 1; // 范围缩小到 [mid+1, right]
        }
    }
    // 循环结束后 left = right+1
    // 此时 nums[left-1] < target 而 nums[left] = nums[right+1] >= target
    // 所以 left 就是第一个 >= target 的元素下标
    return left;
}

var searchRange = function(nums, target) {
    const start = lowerBound(nums, target);
    if (start === nums.length || nums[start] !== target) {
        return [-1, -1]; // nums 中没有 target
    }
    // 如果 start 存在，那么 end 必定存在
    const end = lowerBound(nums, target + 1) - 1;
    return [start, end];
};


// =========================================================
// 左闭右开区间写法
// lowerBound 返回最小的满足 nums[i] >= target 的下标 i
// 如果数组为空，或者所有数都 < target，则返回 nums.length
// 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]
var lowerBound = function(nums, target) {
    let left = 0, right = nums.length; // 左闭右开区间 [left, right)
    while (left < right) { // 区间不为空
        // 循环不变量：
        // nums[left-1] < target
        // nums[right] >= target
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            right = mid; // 范围缩小到 [left, mid)
        } else {
            left = mid + 1; // 范围缩小到 [mid+1, right)
        }
    }
    // 循环结束后 left = right
    // 此时 nums[left-1] < target 而 nums[left] = nums[right] >= target
    // 所以 left 就是第一个 >= target 的元素下标
    return left;
}

var searchRange = function(nums, target) {
    const start = lowerBound(nums, target);
    if (start === nums.length || nums[start] !== target) {
        return [-1, -1]; // nums 中没有 target
    }
    // 如果 start 存在，那么 end 必定存在
    const end = lowerBound(nums, target + 1) - 1;
    return [start, end];
};


// =========================================================
// 开区间写法
// 推荐写开区间二分，简单好记。
// lowerBound 返回最小的满足 nums[i] >= target 的下标 i
// 如果数组为空，或者所有数都 < target，则返回 nums.length
// 要求 nums 是非递减的，即 nums[i] <= nums[i + 1]
var lowerBound = function(nums, target) {
    let left = -1, right = nums.length; // 开区间 (left, right)
    while (left + 1 < right) { // 区间不为空
        // 循环不变量：
        // nums[left] < target
        // nums[right] >= target
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] >= target) {
            right = mid; // 范围缩小到 (left, mid)
        } else {
            left = mid; // 范围缩小到 (mid, right)
        }
    }
    // 循环结束后 left+1 = right
    // 此时 nums[left] < target 而 nums[right] >= target
    // 所以 right 就是第一个 >= target 的元素下标
    return right;
}

var searchRange = function(nums, target) {
    const start = lowerBound(nums, target);
    if (start === nums.length || nums[start] !== target) {
        return [-1, -1]; // nums 中没有 target
    }
    // 如果 start 存在，那么 end 必定存在
    const end = lowerBound(nums, target + 1) - 1;
    return [start, end];
};

