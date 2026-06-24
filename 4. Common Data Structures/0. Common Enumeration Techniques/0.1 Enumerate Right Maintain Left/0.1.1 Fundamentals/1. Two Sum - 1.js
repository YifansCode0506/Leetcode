/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// var twoSum = function(nums, target) {
//     for(let i = 0; i < nums.length - 1 ;i++){
//         for(let j = i + 1; j < nums.length; j++){
//             if(nums[i] + nums[j] === target){
//                 return[i,j]
//             }
//         }
//     }
// };

var twoSum = function(nums, target) {
    const map = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        map.set(nums[i], i);
    }

    for (let i = 0; i < nums.length; i++) {
        const left = target - nums[i];
        if (map.has(left) && map.get(left) != i) {
            return [i, map.get(left)];
        } 
    }
};