/**
 * @param {string} s
 * @return {number}
 */
var countPalindromicSubsequence = function(s) {
    const ordA = 'a'.charCodeAt(0);
    let ans = 0;
    for (let alpha = ordA; alpha <= 'z'.charCodeAt(0); alpha++) { // 枚举两侧字母 alpha
        const ch = String.fromCharCode(alpha);
        const i = s.indexOf(ch); // 最左边的 alpha 的下标
        if (i < 0) { // s 中没有 alpha
            continue;
        }
        const j = s.lastIndexOf(ch); // 最右边的 alpha 的下标

        const has = Array(26).fill(false);
        for (let k = i + 1; k < j; k++) { // 枚举中间字母 mid
            const mid = s.charCodeAt(k) - ordA;
            if (!has[mid]) {
                has[mid] = true; // 避免重复统计
                ans++;
            }
        }
    }
    return ans;
};

var countPalindromicSubsequence = function(s) {
    const n = s.length;
    const ordA = 'a'.charCodeAt(0);

    // 统计 [1,n-1] 每个字母的个数
    const sufCnt = Array(26).fill(0);
    for (let i = 1; i < n; i++) {
        sufCnt[s.charCodeAt(i) - ordA]++;
    }

    const preHas = Array(26).fill(false);
    const has = Array.from({ length: 26 }, () => Array(26).fill(false));
    let ans = 0;
    for (let i = 1; i < n - 1; i++) { // 枚举中间字母 mid
        const mid = s.charCodeAt(i) - ordA;
        sufCnt[mid]--; // 撤销 mid 的计数，sufCnt 剩下的就是后缀 [i+1,n-1] 每个字母的个数
        preHas[s.charCodeAt(i - 1) - ordA] = true; // 记录前缀 [0,i-1] 有哪些字母
        for (let alpha = 0; alpha < 26; alpha++) { // 枚举两侧字母 alpha
            // 判断 mid 的左右两侧是否都有字母 alpha
            if (preHas[alpha] && sufCnt[alpha] && !has[mid][alpha]) {
                has[mid][alpha] = true;
                ans++;
            }
        }
    }
    return ans;
};


var countPalindromicSubsequence = function(s) {
    const n = s.length;
    const ordA = 'a'.charCodeAt(0);

    // 统计 [1,n-1] 每个字母的个数
    const sufCnt = Array(26).fill(0);
    let suf = 0;
    for (let i = 1; i < n; i++) {
        const ch = s.charCodeAt(i) - ordA;
        sufCnt[ch]++;
        suf |= 1 << ch; // 把 ch 记录到二进制数 suf 中，表示后缀有 ch
    }

    let pre = 0;
    const has = Array(26).fill(0); // has[mid] = 由 alpha 组成的二进制数
    for (let i = 1; i < n - 1; i++) { // 枚举中间字母 mid
        const mid = s.charCodeAt(i) - ordA;
        sufCnt[mid]--; // 撤销 mid 的计数，sufCnt 剩下的就是后缀 [i+1,n-1] 每个字母的个数
        if (sufCnt[mid] === 0) { // 后缀 [i+1,n-1] 不包含 mid
            suf ^= 1 << mid; // 从 suf 中去掉 mid
        }
        pre |= 1 << (s.charCodeAt(i - 1) - ordA); // 把 s[i-1] 记录到二进制数 pre 中，表示前缀有 s[i-1]
        has[mid] |= pre & suf; // 计算 pre 和 suf 的交集，|= 表示把交集中的字母加到 has[mid] 中
    }

    let ans = 0;
    for (const mask of has) {
        ans += bitCount32(mask); // mask 中的每个 1 对应着一个 alpha
    }
    return ans;
};

// 参考 Java 的 Integer.bitCount
function bitCount32(i) {
    i = i - ((i >>> 1) & 0x55555555);
    i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
    i = (i + (i >>> 4)) & 0x0f0f0f0f;
    i = i + (i >>> 8);
    i = i + (i >>> 16);
    return i & 0x3f;
}

