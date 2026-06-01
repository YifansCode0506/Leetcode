/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumUniqueSubarray = function(nums) {
    const set = new Set(); // 初始化一个空集合，用来记录窗口内有哪些数字
    let ans = 0, s = 0, left = 0; // ans是最大和，s是当前窗口和，left是左指针

    for (const x of nums) { // 遍历数组，x 是当前准备进入窗口的数字（右端点）
        
        // 1. 【缩】：如果新来的 x 已经在集合里了，说明触发了“重复”，窗口不合法了
        while (set.has(x)) { 
            set.delete(nums[left]); // 从集合中删掉左边界的数字
            s -= nums[left];        // 从当前窗口和中减去左边界的数字
            left++;                 // 左指针右移，收缩窗口
        } // 这个 while 会一直把左边的人踢走，直到窗口里没有 x 为止

        // 2. 【入】：此时窗口安全了，绝对没有重复
        set.add(x); // 把 x 登记到集合中
        s += x;     // 把 x 加到当前窗口和里

        // 3. 【更新】：记录过程中出现过的最大窗口和
        ans = Math.max(ans, s);
    }
    return ans; // 返回最大和
};


// var maximumUniqueSubarray = function(nums) {
//     const mx = Math.max(...nums); // 找出数组里的最大值
//     const has = Array(mx + 1).fill(false); // 创建一个超大布尔数组，全部铺满 false
//     let ans = 0, s = 0, left = 0;
//     for (const x of nums) {
//         while (has[x]) {
//             has[nums[left]] = false;
//             s -= nums[left];
//             left++;
//         }
//         has[x] = true;
//         s += x;
//         ans = Math.max(ans, s);
//     }
//     return ans;
// };



