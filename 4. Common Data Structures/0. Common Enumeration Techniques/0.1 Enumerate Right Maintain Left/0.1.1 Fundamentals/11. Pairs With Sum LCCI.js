/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var pairSums = function (nums, target) {
    // 初始化一个 Map 对象，用于存储数字及其在数组中出现的频次（计数键值对）
    const map = new Map();
    // 初始化一个二维数组，用于存放所有满足两数之和等于 target 的结果集
    const ans = [];

    // 遍历输入数组，依次获取每个元素 num
    for (let num of nums) {
        // 计算与当前数字匹配所需的互补值
        const complement = target - num;

        // 从 Map 中读取该互补值的当前计数，若 Map 中不存在该键，则赋值为默认值 0
        const complementCount = map.get(complement) ?? 0;

        // 判断互补值在之前是否还有未被消耗的可用计数量
        if (complementCount > 0) {
            // 将互补值和当前值作为一对结果，追加（push）到结果数组 ans 中
            ans.push([complement, num]);
            // 更新 Map，将对应的互补值的计数量减 1，表示该数字已被消耗，防止重复配对
            map.set(complement, complementCount - 1);
        } else {
            // 若互补值数量不足，则转为记录当前数字。先读取当前数字在 Map 中的已有计数量
            const currentCount = map.get(num) ?? 0;
            // 更新 Map，将当前数字的计数量加 1，供后续遍历的元素进行匹配查找
            map.set(num, currentCount + 1);
        }
    }

    // 返回存储了所有有效数对的二维数组
    return ans;
};