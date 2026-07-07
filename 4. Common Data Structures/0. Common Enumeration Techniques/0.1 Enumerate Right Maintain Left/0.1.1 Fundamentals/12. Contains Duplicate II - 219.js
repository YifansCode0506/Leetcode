/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */

// 枚举右，维护左
var containsNearbyDuplicate = function(nums, k) {
    // 实例化一个 Map 对象，用于存储数字与其最后一次出现索引的映射关系 (key: 数字, value: 索引)
    const last = new Map();
    
    // 使用标准 for 循环线性遍历数组，i 为当前数字的索引下标
    for (let i = 0; i < nums.length; i++) {
        // 读取当前索引位置的数字，赋值给常量 x
        const x = nums[i];
        
        // 条件判断：
        // 1. last.has(x)：检查当前数字 x 在之前是否出现过
        // 2. i - last.get(x) <= k：若出现过，计算当前索引 i 与上一次记录的索引的差值，判断是否满足小于等于 k
        if (last.has(x) && i - last.get(x) <= k) {
            // 若同时满足以上两个条件，说明找到了符合要求的重复元素下标对，立即返回 true 终止函数
            return true;
        }
        
        // 动态更新/登记：将当前数字 x 作为键，当前最新索引 i 作为值存入 Map
        // 如果 x 已存在，该操作会用更新、更近的索引覆盖旧的索引
        last.set(x, i);
    }
    
    // 整个数组遍历结束仍未触发 if 条件，说明不存在满足条件的下标对，返回 false
    return false;
};

// 滑动窗口
var containsNearbyDuplicate = function(nums, k) {
    // 实例化一个 Set 对象，用于存放当前大小最大为 k 的滑动窗口内的所有不重复元素
    const set = new Set();
    
    // 使用标准 for 循环线性遍历数组，i 为当前窗口的右边界（当前元素的索引）
    for (let i = 0; i < nums.length; i++) {
        // 1. 查账：检查当前元素 nums[i] 是否已经存在于 Set 窗口中
        if (set.has(nums[i])) {
            // 如果存在，说明在距离不超过 k 的窗口内找到了重复元素，立即返回 true 终止函数
            return true;
        }
        
        // 2. 登记：将当前元素 nums[i] 塞入 Set 窗口中
        set.add(nums[i]);
        
        // 3. 维护窗口大小：当索引 i >= k 时，说明下一次循环窗口大小即将超过 k
        if (i >= k) {
            // 将当前窗口最左侧、即将滑出边界的失效元素 nums[i - k] 从 Set 中移除
            set.delete(nums[i - k]);
        }
    }
    
    // 遍历结束仍未发现重复元素，返回 false
    return false;
};

