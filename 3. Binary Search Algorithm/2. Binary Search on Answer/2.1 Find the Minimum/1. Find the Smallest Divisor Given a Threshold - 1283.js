/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var smallestDivisor = function(nums, threshold) {
    function check(m) {
        let sum = 0;
        for (const x of nums) {
            sum += Math.ceil(x / m); // Math.ceil 负责题目要求的“向上取整”
            if (sum > threshold) {   // 极其聪明的“提前退出”，总和已经超标了，说明 m 太小，直接判否定
                return false;
            }
        }
        return true; // 顺利走完循环，说明当前除数 m 能够让总和不超过阈值，合格！
    };

    let left = 0, right = Math.max(...nums);
    while (left + 1 < right) {
        const mid = Math.floor((left + right) / 2);
        if (check(mid)) {
            right = mid; // 如果 mid 合格，说明 mid 可能是答案，或者正确的答案在 mid 左边。缩小右边界。
        } else {
            left = mid;  // 如果 mid 不合格，说明除数选小了，正确的答案必然在 mid 右边。放大左边界。
        }
    }
    return right;
};
