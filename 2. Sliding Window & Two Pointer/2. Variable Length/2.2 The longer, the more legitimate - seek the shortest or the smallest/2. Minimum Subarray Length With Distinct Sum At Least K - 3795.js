/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minLength = function(nums, k) {
    let sum = 0, res = Infinity;
    let left = 0;
    const numCount = new Map();

    for (let right = 0; right < nums.length; right++) {
        // 1. 【入】：右端点数字进入窗口
        const numIn = nums[right];
        // 如果是新面孔（次数为 0 或不存在），把它的值加进 sum
        if (!numCount.get(numIn) || numCount.get(numIn) === 0) {
            sum += numIn;
        }
        numCount.set(numIn, (numCount.get(numIn) ?? 0) + 1);

        // 2. 【缩 & 更新】：只要总和达标，说明当前窗口【合法】，尝试收缩求【最小】
        while (sum >= k) {
            // 【更新】：既然满足条件，趁着合法，赶紧记录当前窗口的真实长度
            // 此时 left 还没有右移，公式是最纯正的：右端点 - 左端点 + 1
            res = Math.min(res, right - left + 1);

            // 【出】：准备让左边界的数字离开
            const numOut = nums[left];
            
            // 如果这个数字在窗口里只剩最后 1 个了，它一旦离开，sum 就必须扣掉它
            if (numCount.get(numOut) === 1) {
                sum -= numOut;
            }
            // 账本计数减 1
            numCount.set(numOut, numCount.get(numOut) - 1);
            
            // 左指针正式右移一步，进入下一次 while 判定
            left++;
        }
    }

    // 如果 res 还是 Infinity，说明全加起来都不够 k，按题目要求返回 -1
    return res === Infinity ? -1 : res;
};