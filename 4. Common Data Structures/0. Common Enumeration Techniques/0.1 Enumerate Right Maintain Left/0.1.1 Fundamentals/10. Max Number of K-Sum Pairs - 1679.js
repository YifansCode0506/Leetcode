/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var maxOperations = function(nums, k) {
    const map = new Map();
    let ans = 0;

    for (let x of nums) {
        let target = k - x; // 寻找互补的另一半
        
        // 如果寄存处有目标数字，且数量大于 0
        if (map.has(target) && map.get(target) > 0) {
            ans++; // 配对成功，操作数加 1
            map.set(target, map.get(target) - 1); // 消耗掉一个目标数字
        } else {
            // 没有找到目标，自己登记到寄存处
            map.set(x, (map.get(x) || 0) + 1);
        }
    }
    return ans;
};

// var maxOperations = function(nums, k) {
//     // 1. 先进行升序排序
//     nums.sort((a, b) => a - b);
    
//     let left = 0;
//     let right = nums.length - 1;
//     let ans = 0;

//     // 2. 双指针相向移动
//     while (left < right) {
//         let sum = nums[left] + nums[right];
        
//         if (sum === k) {
//             ans++;       // 找到了，配对数加 1
//             left++;      // 左指针内缩
//             right--;     // 右指针内缩
//         } else if (sum < k) {
//             left++;      // 和太小，左指针右移以增大和
//         } else {
//             right--;     // 和太大，右指针左移以减小和
//         }
//     }
    
//     return ans;
// };