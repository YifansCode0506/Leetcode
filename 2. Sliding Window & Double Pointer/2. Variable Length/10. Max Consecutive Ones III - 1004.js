/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function(nums, k) {
    // 初始化变量：ans 记录最大长度，left 是窗口左边界，count 负责统计当前窗口内 0 的个数
    // 注意：这里必须使用 let 声明，因为后续它们的值都会被动态修改
    let ans = 0, left = 0, count = 0;

    // 启动循环，right 作为窗口的右边界不断向右拉长窗口
    for (let right = 0; right < nums.length; right++) {
        
        // 【1. 入】：新元素进入窗口
        // 如果当前进来的是 0，说明我们消耗了一次“翻转机会”，账本上的 count 加 1
        if (nums[right] === 0) {
            count++;
        }

        // 【2. 缩】：检查窗口状态是否超标
        // 如果窗口内 0 的个数 count 超过了允许的 k，说明当前的窗口不合法了
        // 启动 while 循环，开始从左边往外踢人，直到窗口内的 0 重新降回 k 以内
        while (count > k) {
            // 关键点：只有当离开窗口的那个数（左边界 nums[left]）是 0 时
            // 我们才把账本上的 0 的计数 count 减 1（因为我们回收了一次翻转机会）
            if (nums[left] === 0) {
                count--;
            }
            // 无论踢出去的是 1 还是 0，左指针都必须右移一步来缩小窗口
            left++;
        }

        // 【3. 更新】：记录答案
        // 走到这一行时，当前窗口必然是合法的（里面的 0 绝对不会超过 k 个）
        // 窗口的当前长度公式为：右端点 - 左端点 + 1
        // 用 Math.max 拿它和历史最高纪录 ans 碰一碰，保留最大值
        ans = Math.max(ans, right - left + 1);
    }

    // 遍历完整个数组后，返回记录下来的最大连续长度
    return ans;
};