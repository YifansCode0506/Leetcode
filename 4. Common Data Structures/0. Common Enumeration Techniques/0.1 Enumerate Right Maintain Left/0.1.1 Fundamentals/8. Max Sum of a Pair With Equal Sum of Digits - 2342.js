/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function(nums) {
    let ans = -1;
    const mx = Array(82).fill(-Infinity);
    for(let num of nums){
        let s = 0;
        for(let x = num; x;x = Math.floor(x / 10)){
            s += x % 10;
        }

        ans = Math.max(ans, mx[s] + num);
        mx[s] = Math.max(mx[s], num);

    }
    return ans;
};