/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
    let ans = 0, left = 0;
    const cnt = new Map();
    for (let right = 0; right < fruits.length; right++) {
        cnt.set(fruits[right], (cnt.get(fruits[right]) ?? 0) + 1); // fruits[right] 进入窗口
        while (cnt.size > 2) { // 不满足要求
            const out = fruits[left];
            cnt.set(out, cnt.get(out) - 1); // fruits[left] 离开窗口
            if (cnt.get(out) === 0) {
                cnt.delete(out);
            }
            left++;
        }
        ans = Math.max(ans, right - left + 1);
    }
    return ans;
};
