/**
 * @param {number[][]} grid - 二维整数矩阵
 * @param {number} x       - 正方形子矩阵的左上角行下标
 * @param {number} y       - 正方形子矩阵的左上角列下标
 * @param {number} k       - 正方形子矩阵的边长
 * @return {number[][]}    - 更新后的矩阵
 */
var reverseSubmatrix = function(grid, x, y, k) {
    // 1. 初始化双指针：锁定子矩阵的【最高行】和【最低行】
    // 比如 x = 1, k = 3，那么参与翻转的行就是行 1、行 2、行 3（最后一行的索引是 1 + 3 - 1 = 3）
    let l = x;
    let r = x + k - 1;

    // 2. 纵向双指针开工：上下对称的行进行对调
    while (l < r) {
        
        // 3. 横向遍历：把这两行中，属于子矩阵那一截的列元素逐个交换
        // 列的范围是从左边界 y 开始，连续 k 个元素（即到 y + k - 1 结束）
        for (let j = y; j < y + k; j++) {
            // 在 JavaScript 中原地交换两个变量的标准写发（解构赋值）：
            // [A, B] = [B, A] 瞬间完成错位对调
            let temp = grid[l][j];
            grid[l][j] = grid[r][j];
            grid[r][j] = temp;
        }

        // 4. 指针向中间靠拢
        l++;
        r--;
    }

    // 5. 原地修改完毕，直接返回原矩阵
    return grid;
};