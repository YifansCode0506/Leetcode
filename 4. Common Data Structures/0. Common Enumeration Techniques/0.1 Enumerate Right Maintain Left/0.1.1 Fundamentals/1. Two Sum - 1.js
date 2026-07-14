/**
 * 需求：在数组 nums 中找到两个不同下标，使这两个数的和等于 target，并返回这两个下标。
 * 思路：一边枚举当前数作为右端点，一边用 Map 维护左边已经出现过的数字及其下标。
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // map 的 key 是历史数字，value 是这个数字最后一次出现的下标。
    const map = new Map();

    // 从左到右遍历数组，i 表示当前右端点下标。
    for (let i = 0; i < nums.length; i++) {
        // 取出当前数字，准备让它和左边历史数字配对。
        const x = nums[i];

        // 计算当前数字需要的左伴侣：left + x === target。
        const left = target - x;

        // 先查账：如果左边已经出现过 left，说明找到一组答案。
        if (map.has(left)) {
            // 返回历史下标和当前下标；由于先查后存，天然保证两个下标不同。
            return [map.get(left), i];
        }

        // 后登记：把当前数字存入 Map，供后面的元素作为左伴侣查询。
        map.set(x, i);
    }
};
