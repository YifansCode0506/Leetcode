/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxK = function (nums) {
    // 创建一个哈希表（Map）充当我们的“数字登记账本”
    // 键（Key）存数字的值，值（Value）存它对应的数组下标（索引）
    const map = new Map();
    
    // 初始化最终答案为 -1（题目要求：如果不存在满足条件的正整数，返回 -1）
    let ans = -1;
    
    // 开始从左到右遍历整个数组
    for (let i = 0; i < nums.length; i++) {
        // 拿出当前碰到的数字 x（它可能是正数，也可能是负数）
        const x = nums[i];
        
        // 核心对暗号环节：去 Map 账本里查查，x 的相反数（-x）之前有没有来登记过？
        // 比如：如果当前 x 是 5，那就查查账本里有没有 -5；如果当前 x 是 -3，那就查查账本里有没有 3。
        if (map.has(-x)) {
            // 如果相反数确实存在，说明我们凑齐了一对【正负孪生数】！
            // 拿这一对数的绝对值 Math.abs(x) 去和历史最高纪录 ans 碰一碰，谁大就保留谁
            ans = Math.max(ans, Math.abs(x));
        }
        
        // 不论刚才有没有对上暗号，都必须把当前这个数字 x 稳稳地登记到 Map 账本里
        // 方便后面更右边的数字过来找它对暗号
        map.set(x, i);
    }
    
    // 整个数组犁了一遍后，返回记录下来的最大正整数
    return ans;
};