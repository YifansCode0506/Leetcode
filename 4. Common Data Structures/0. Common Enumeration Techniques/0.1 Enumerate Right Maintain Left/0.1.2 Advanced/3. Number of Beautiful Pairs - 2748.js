/**
 * 需求：统计美丽数对数量；若 nums[i] 的最高位与 nums[j] 的最低位互质，则 (i, j) 是美丽数对。
 * 思路：枚举当前 nums[j]，维护左边数字最高位 1~9 的出现次数。
 *
 * @param {number[]} nums
 * @return {number}
 */
var countBeautifulPairs = function(nums) {
    // ans 记录美丽数对总数。
    let ans = 0;

    // cnt[d] 表示左边历史数字中，最高位为 d 的数字数量。
    const cnt = new Array(10).fill(0);

    // 遍历每个数字 num，把它当成右端点 nums[j]。
    for (const num of nums) {
        // lastDigit 是当前数字的最低位，用来和历史最高位判断互质。
        const lastDigit = num % 10;

        // 枚举所有可能的历史最高位 firstDigit。
        for (let firstDigit = 1; firstDigit < 10; firstDigit++) {
            // 如果最高位和当前最低位互质，则这些历史数字都能与当前 num 组成美丽数对。
            if (gcd(firstDigit, lastDigit) === 1) {
                ans += cnt[firstDigit];
            }
        }

        // first 是临时变量，用来剥离出当前数字的最高位。
        let first = num;

        // 不断去掉最低位，直到只剩最高位。
        while (first >= 10) {
            first = Math.floor(first / 10);
        }

        // 把当前数字的最高位登记进历史账本。
        cnt[first]++;
    }

    // 返回美丽数对数量。
    return ans;
};

/**
 * 需求：计算 a 和 b 的最大公约数，用于判断两个数字是否互质。
 * 思路：最大公约数为 1 时，说明两个数互质。
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
function gcd(a, b) {
    // 当 b 为 0 时，a 就是最大公约数。
    if (b === 0) {
        return a;
    }

    // 递归计算 b 和 a % b 的最大公约数。
    return gcd(b, a % b);
}
