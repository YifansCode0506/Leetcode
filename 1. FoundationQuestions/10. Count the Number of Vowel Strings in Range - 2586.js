/**
 * @param {string[]} words
 * @param {number} left
 * @param {number} right
 * @return {number}
 */

var vowelStrings = function(words, left, right) {
    let ans = 0;
    for (let i = left; i <= right; i++) {
        const s = words[i];
        if ("aeiou".includes(s[0]) && "aeiou".includes(s[s.length - 1])) {
            ans++;
        }
    }
    return ans;
};

