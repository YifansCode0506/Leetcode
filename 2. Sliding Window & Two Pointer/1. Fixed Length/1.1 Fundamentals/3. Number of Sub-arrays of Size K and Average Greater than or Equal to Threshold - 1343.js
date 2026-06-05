/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function(arr, k, threshold) {
    let ans =0;
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum = sum + arr[i];

        if(i < k - 1){
            continue;
        }

        if(sum >= k*threshold){
            ans++;
        }
        sum = sum - arr[i - k + 1];
    }
    return ans;
};