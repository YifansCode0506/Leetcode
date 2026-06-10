/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    // 1. 去除首尾空格
    s = s.trim();
    
    // 2. 初始化倒序双指针
    // i 和 j 一开始都在字符串的最末尾
    let i = s.length - 1;
    let j = i;
    const res = [];

    // 从右往左开始遍历字符串
    while (i >= 0) {
        
        // 【第一步】：i 指针向左走，寻找当前单词左边的第一个空格
        while (i >= 0 && s.charAt(i) !== ' ') {
            i--;
        }

        // 【第二步】：此时 i 停在空格上（或冲出了最左边界 -1）
        // 单词的范围被限制在 [i + 1, j]
        // 使用 s.slice(i + 1, j + 1) 分割单词，存入 res
        res.push(s.slice(i + 1, j + 1));

        // 【第三步】：i 指针继续向左走，跳过单词之间所有多余的空格
        while (i >= 0 && s.charAt(i) === ' ') {
            i--;
        }

        // 【第四步】：空格滑完后，i 停在了下一个单词的尾巴字符上
        // 归位j，且定位下一个单词的右边界
        j = i;
    }

    // 3. 拼接字符串
    return res.join(' ');
};