/**
 * @param {string} s
 * @param {string} t
 * @param {number} maxCost
 * @return {number}
 */
var equalSubstring = function(s, t, maxCost) {
    let left = 0, right = 0, cost = 0, result = 0
    while (right < s.length) {
        cost += Math.abs(t[right].charCodeAt() - s[right].charCodeAt())
        if (cost > maxCost) {
            cost -= Math.abs(t[left].charCodeAt() - s[left].charCodeAt())
            left ++
        }
        result = Math.max(result, right - left + 1)
        right ++
    }
    return result
}
