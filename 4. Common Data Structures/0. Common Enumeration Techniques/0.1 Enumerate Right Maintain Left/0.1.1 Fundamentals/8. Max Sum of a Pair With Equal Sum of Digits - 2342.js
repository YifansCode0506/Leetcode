/**
 * 需求：找到两个数位和相等的数字，使它们的元素和最大；不存在返回 -1。
 * 思路：枚举当前数字，维护每个数位和对应的历史最大数字。
 *
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function(nums) {
    // ans 记录满足条件的最大元素和；-1 表示还没有合法数对。
    let ans = -1;

    // mx[s] 表示数位和为 s 的历史数字中的最大值；最大数位和范围足够小，用数组即可。
    const mx = Array(82).fill(-Infinity);

    // 遍历每个数字 num，把它当成当前右端点。
    for (const num of nums) {
        // s 用来累计 num 的数位和。
        let s = 0;

        // x 是临时变量，用来逐位拆解 num，不破坏原始 num。
        for (let x = num; x > 0; x = Math.floor(x / 10)) {
            // 取出当前最低位并加入数位和。
            s += x % 10;
        }

        // 如果左边出现过相同数位和的数字，用历史最大值和当前 num 更新答案。
        ans = Math.max(ans, mx[s] + num);

        // 更新该数位和下的历史最大数字，供后续元素配对。
        mx[s] = Math.max(mx[s], num);
    }

    // 返回最大元素和；如果没有合法配对则仍为 -1。
    return ans;
};
