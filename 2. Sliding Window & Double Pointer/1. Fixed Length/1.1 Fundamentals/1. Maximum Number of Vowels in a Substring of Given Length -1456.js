/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxVowels = function(s, k) {
    let ans = 0, vowel = 0;
    for (let r = 0; r < s.length; r++){
        if (s[r] === 'a' || s[r] === 'e' || s[r] === 'i' || s[r] === 'o' ||　s[r] === 'u'){
            vowel++;
        }

        let l = r - k + 1;
        if (l < 0){
            continue;
        }

        ans = Math.max(ans, vowel);

        // let out = s[l];
        let out = s[l];
        if (out === 'a' || out === 'e' || out === 'i' || out === 'o' || out === 'u') {
            vowel--;
        }
    }
    return ans;
};