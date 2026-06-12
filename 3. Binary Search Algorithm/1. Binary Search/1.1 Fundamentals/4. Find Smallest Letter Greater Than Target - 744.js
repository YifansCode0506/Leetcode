/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function(letters, target) {
    const length = letters.length;

    // 1. 处理特殊情况：如果 target 大于等于最大字符，则返回 letters[0]
    // 注意检查特殊情况
    // 如果不单独检查这个情况，二分查找最终会让 low = letters.length，导致数组越界访问
    if (target >= letters[length - 1]) {
        return letters[0];
    }

    let low = 0, high = length - 1;

    // 2. 二分查找，寻找第一个比 target 大的字符
    // 如果改成 while (low <= high)，会导致额外的一次循环，甚至可能进入死循环。
    while (low < high) {
        const mid = Math.floor((high - low) / 2) + low; // 计算中间索引

        if (letters[mid] > target) {
            high = mid; // 缩小范围，可能 mid 就是答案
            // 注意题目的要求，要求的是大于 target 的最小的字符
            // 如果letters[mid] > target，说明mid有可能是答案
            // 如果小于等于，那说明此时这个mid不符合条件，可以跳过
        } else {
            low = mid + 1; // 否则答案一定在 mid 右侧
        }
    }

    // 3. 返回找到的字符
    return letters[low];
};

