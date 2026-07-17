/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumSum = function(nums) {
    const n = nums.length;
    
    // 1. 预处理右侧的后缀最小值数组
    // suf[i] 表示从索引 i 到末尾 n-1 之间的所有元素的最小值
    const suf = new Array(n);
    suf[n - 1] = nums[n - 1]; // 最后一个元素的后缀最小值就是它自己
    for (let i = n - 2; i >= 0; i--) {
        // 当前位置的后缀最小值，等于当前值与后一个后缀最小值中的较小者
        suf[i] = Math.min(suf[i + 1], nums[i]);
    }

    // 初始化最终的最小元素和为正无穷大
    let ans = Infinity;
    // 初始化左侧历史最小值为数组的第一个元素
    let pre = nums[0];

    // 2. 枚举中间点 j（山顶）。因为两侧必须各有至少一个数，所以范围是 1 到 n-2
    for (let j = 1; j < n - 1; j++) {
        // 山形判定：只有当左侧历史最小值 pre 和右侧历史最小值 suf[j+1] 都严格小于当前山顶 nums[j] 时
        if (pre < nums[j] && suf[j + 1] < nums[j]) {
            // 满足山形条件，计算三者之和，并尝试更新全局最小元素和
            ans = Math.min(ans, pre + nums[j] + suf[j + 1]);
        }
        
        // 动态维护左侧账本：在中间点 j 向右迈进前，将当前值纳入左侧历史记录中
        pre = Math.min(pre, nums[j]);
    }

    // 如果 ans 依然是 Infinity，说明没有找到任何合法的山形三元组，返回 -1；否则返回最小和
    return ans === Infinity ? -1 : ans;
};

// 例子：
// nums = [8,6,1,5,3];
// suf[n - 1] = nums[n - 1] = 3

// 进入 for 循环，比较 nums[n - 2] 和 suf[n - 2 + 1] 得出：
//     suf = [1,1,1,3,3]
// pre = nums[0] = 8;
// 进入for循环：
//     第一轮：
//         j = 1; nums[j] = 6;
//         if()不成立; ans = Infinity; pre = 6;
//     第二轮：
//         j = 2; nums[j] = 1;
//         if()不成立; ans = Infinity; pre = 1
//     第三轮：
//         j = 3; nums[j] = 5
//         if()成立；ans = 1 + 5 + 3 = 9; pre = 1;
//     结束循环
// 结果为ans = 9;