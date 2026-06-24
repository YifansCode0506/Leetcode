/**
 * @param {number[]} nums
 * @return {number}
 */
var numIdenticalPairs = function(nums) {
    let ans = 0;
    const cnt = new Map();
    for (const x of nums) { // x = nums[j]
        // 此时 cnt[x] 表示之前遍历过的 x 的个数，加到 ans 中
        // 如果先执行 cnt[x]++，再执行 ans += cnt[x]，就把 i=j 这种情况也统计进来了，算出的答案会偏大
        const c = cnt.get(x) ?? 0
        ans += c;
        cnt.set(x, c + 1);
    }
    return ans;
};
