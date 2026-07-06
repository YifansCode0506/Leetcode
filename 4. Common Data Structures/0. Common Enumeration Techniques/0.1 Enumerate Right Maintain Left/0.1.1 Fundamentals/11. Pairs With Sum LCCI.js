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

/*
以 nums = [5, 6, 5, 6]，target = 11 为例，
我们通过追踪每一次循环中变量的值和内存中 map 与 ans 的状态变化，来演示代码的完整执行流程。

初始状态map 为空：Map {}
ans 为空：[]
🔄 第一轮循环
当前数字 num: 5
计算互补值 complement: 11 - 5 = 6
读取计数量 complementCount: map.get(6) 返回 undefined，通过 ?? 0 赋值为 0。
逻辑分支:
if (0 > 0) 为假，进入 else 分支。
读取当前数字 5 的计数 currentCount：map.get(5) ?? 0 => 0。
更新 Map：map.set(5, 0 + 1)。
本轮结束状态:map: Map { 5 => 1 }
ans: []

🔄 第二轮循环
当前数字 num: 6
计算互补值 complement: 11 - 6 = 5
读取计数量 complementCount: map.get(5) 返回 1。
逻辑分支:
if (1 > 0) 为真，进入 if 分支。
塞入结果：ans.push([5, 6])。
消耗计数：map.set(5, 1 - 1) => 数字 5 的可用计数变为 0。
本轮结束状态:
map: Map { 5 => 0 }
ans: [[5, 6]]

🔄 第三轮循环
当前数字 num: 5
计算互补值 complement: 11 - 5 = 6
读取计数量 complementCount: map.get(6) 返回 undefined => 0。
逻辑分支:
if (0 > 0) 为假，进入 else 分支。
读取当前数字 5 的计数 currentCount：map.get(5) ?? 0 => 此时读取到的是上轮清零后的 0。
更新 Map：map.set(5, 0 + 1) => 数字 5 的可用计数重新变为 1。
本轮结束状态:
map: Map { 5 => 1 }
ans: [[5, 6]]

🔄 第四轮循环
当前数字 num: 6
计算互补值 complement: 11 - 6 = 5
读取计数量 complementCount: map.get(5) 返回 1（源于第三轮循环刚存进去的 5）。
逻辑分支:
if (1 > 0) 为真，进入 if 分支。
塞入结果：ans.push([5, 6])。
消耗计数：map.set(5, 1 - 1) => 数字 5 的可用计数再次清零。
本轮结束状态:
map: Map { 5 => 0 }
ans: [[5, 6], [5, 6]]

🏁 最终输出
循环结束，函数执行 return ans，返回最终结果：[[5, 6], [5, 6]]。
*/