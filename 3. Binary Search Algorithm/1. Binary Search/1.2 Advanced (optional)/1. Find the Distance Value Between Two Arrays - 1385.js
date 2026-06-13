/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function(arr1, arr2, d) {
    // 1. 预处理：将 arr2 进行升序排序，这是后续进行二分查找的前提条件 [cite: 23]
    arr2.sort((a, b) => a - b);
    
    // 初始化满足条件的计数器
    let ans = 0;
    
    // 2. 遍历 arr1 中的每一个元素 x [cite: 23]
    for (const x of arr1) {
        
        // 数学原理：若存在 y 满足 |x - y| <= d，即 x - d <= y <= x + d，则不符合要求 [cite: 21, 22]
        // 也就是说，arr2 中绝对不能有任何元素落在 [x - d, x + d] 这个“危险闭区间”内 [cite: 22]
        
        // _.sortedIndex 的底层是二分查找（lowerBound），返回插入后仍能保持排序的第一个合适下标 [cite: 23]
        // 换句话说，i 是 arr2 中【第一个 >= x - d】的元素下标 [cite: 2, 3, 23]
        const i = _.sortedIndex(arr2, x - d);
        
        // 3. 关键边界与条件判断 [cite: 23]
        // 情况 ①：i === arr2.length
        // 说明 arr2 中所有的数都比 x - d 小（二分指针越界）。最大值都小于下界，更不可能落入危险区间，x 安全 [cite: 6, 23]。
        //
        // 情况 ②：arr2[i] > x + d
        // 如果 i 没有越界，此时 arr2[i] 是最接近危险区间左边界（x - d）的数 [cite: 24]。
        // 如果它已经超过了危险区间的右边界（x + d），由于数组升序，i 往后的所有元素也必然都大于 x + d [cite: 24]。
        // 这意味着没有任何元素能掉进 [x - d, x + d] 内部，x 安全 [cite: 24]。
        if (i === arr2.length || arr2[i] > x + d) {
            ans++; // 确认安全，符合距离要求的元素数目加 1 [cite: 22]
        }
    }
    
    // 返回最终符合要求的总数量
    return ans;
};

// var findTheDistanceValue = function(arr1, arr2, d) {
//     arr1.sort((a, b) => a - b);
//     arr2.sort((a, b) => a - b);
//     let ans = 0, j = 0;
//     for (const x of arr1) {
//         while (j < arr2.length && arr2[j] < x - d) {
//             j++;
//         }
//         if (j === arr2.length || arr2[j] > x + d) {
//             ans++;
//         }
//     }
//     return ans;
// };