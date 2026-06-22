/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    let left = 0; // 恒为 false
    let right = Math.max(...piles); // 恒为 true
    while (left + 1 < right) { // 开区间不为空
        const mid = Math.floor((left + right) / 2);
        let sum = 0;
        for (const p of piles) {
            sum += Math.ceil(p / mid);
        }
        if (sum <= h) {
            right = mid; // 循环不变量：恒为 true
        } else {
            left = mid; // 循环不变量：恒为 false
        }
    }
    return right; // 最小的 true
};
