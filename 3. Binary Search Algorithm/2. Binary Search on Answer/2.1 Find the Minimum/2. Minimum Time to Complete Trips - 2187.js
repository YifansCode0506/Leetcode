/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
var minimumTime = function(time, totalTrips) {
    const minT = Math.min(...time);
    let left = minT - 1; // 循环不变量：check(left) 恒为 false
    let right = minT * totalTrips; // 循环不变量：check(right) 恒为 true
    while (left + 1 < right) { // 开区间 (left, right) 不为空
        const mid = Math.floor((left + right) / 2);
        let sum = 0;
        for (const t of time) {
            sum += Math.floor(mid / t);
        }
        if (sum >= totalTrips) {
            right = mid; // 缩小二分区间为 (left, mid)
        } else {
            left = mid; // 缩小二分区间为 (mid, right)
        }
    }
    // 此时 left 等于 right-1
    // check(left) = false 且 check(right) = true，所以答案是 right
    return right; // 最小的 true
};
