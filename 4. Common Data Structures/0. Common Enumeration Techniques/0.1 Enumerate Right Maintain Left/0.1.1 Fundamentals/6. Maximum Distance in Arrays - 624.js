/**
 * @param {number[][]} arrays
 * @return {number}
 */
var maxDistance = function(arrays) {
    let ans = 0;
    let mn = Infinity, mx = -Infinity;
    for (const a of arrays) {
        ans = Math.max(ans, a[a.length - 1] - mn, mx - a[0]);
        mn = Math.min(mn, a[0]);
        mx = Math.max(mx, a[a.length - 1]);
    }
    return ans;
};
