/**
 * @param {string} s
 * @return {number}
 */

var countPalindromicSubsequence = function(s) {
    // 获取字母 'a' 的 ASCII 码值 (97)，作为后续索引偏移量的基准
    const ordA = 'a'.charCodeAt(0);
    // 初始化独立回文子序列的总计数器
    let ans = 0;

    // 1. 枚举 26 个英文字母（从 'a' 到 'z' 的 ASCII 码）
    for (let alpha = ordA; alpha <= 'z'.charCodeAt(0); alpha++) { 
        // 将当前的 ASCII 码值还原为单字符字符串（例如 97 -> 'a'）
        const ch = String.fromCharCode(alpha);
        
        // 获取字符 ch 在字符串 s 中第一次（最左侧）出现的下标
        const i = s.indexOf(ch); 
        // 若返回值小于 0，说明字符 ch 在字符串 s 中根本不存在，跳过本次循环
        if (i < 0) { 
            continue;
        }
        
        // 获取字符 ch 在字符串 s 中最后一次（最右侧）出现的下标
        const j = s.lastIndexOf(ch); 

        // 创建一个长度为 26 的布尔数组，初始全为 false，用于标记当前 [i+1, j-1] 区间内哪些中间字符已被统计
        const has = Array(26).fill(false);
        
        // 2. 遍历首尾下标之间的所有字符（区间为 i + 1 到 j - 1）
        for (let k = i + 1; k < j; k++) { 
            // 计算当前中间字符相对于 'a' 的数组索引下标 (0-25)
            const mid = s.charCodeAt(k) - ordA;
            
            // 若该中间字符在此之前尚未被标记过
            if (!has[mid]) {
                // 将该字符在布尔数组中标记为 true，防止后续重复字符重复计数
                has[mid] = true; 
                // 全局答案计数加 1
                ans++;
            }
        }
    }

    // 返回统计出的无重复长度为 3 的回文子序列总数
    return ans;
};

var countPalindromicSubsequence = function(s) {
    const ordA = 'a'.charCodeAt(0);
    // 1. 初始化右翼静态账本 suf：长度 26 的数组，统计每个字母出现的频次
    const suf = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        suf[s.charCodeAt(i) - ordA]++;
    }

    let ans = 0;
    // 2. 初始化左翼动态账本 pre：长度 26 的数组，记录历史上已踩过的字母频次
    const pre = new Array(26).fill(0);
    
    // 3. 二维布尔去重账本 has：26 x 26 的矩阵，标记 "x + mid + x" 组合是否已被捕获
    // has[x][mid] 为 true 表示以字母 x 为两侧、字母 mid 为中间的回文已经统计过
    const has = Array.from({ length: 26 }, () => new Array(26).fill(false));

    // 4. 线性遍历字符串，当前字符扮演【中间轴心字母 mid】
    for (let i = 0; i < s.length; i++) {
        const mid = s.charCodeAt(i) - ordA;

        // 【关键撤销步】：当前字母成为了中间点，不再属于“右翼未来”，将其从 suf 中扣减 1
        suf[mid]--;

        // 【两翼扫对暗号】：尝试把 26 个英文字母 x 作为两侧的边界字母
        for (let x = 0; x < 26; x++) {
            // 条件：字母 x 在左边出现过(pre[x]>0) AND 在右边出现过(suf[x]>0) AND 这种组合此前从未出现过
            if (pre[x] > 0 && suf[x] > 0 && !has[x][mid]) {
                has[x][mid] = true; // 登记该组合已捕获，防止重复统计
                ans++;              // 独立回文数加 1
            }
        }

        // 【关键登记步】：中间点移走前，将当前的 mid 字母登记入左翼账本 pre
        pre[mid]++;
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

