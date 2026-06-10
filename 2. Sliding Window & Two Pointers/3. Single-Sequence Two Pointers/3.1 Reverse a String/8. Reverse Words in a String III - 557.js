/**
 * @param {string} s - 输入的带有单词和空格的原始字符串
 * @return {string}   - 每个单词都被局部反转后的结果字符串
 */
var reverseWords = function(s) {
    const ret = [];          // 结果集篮子：用来按顺序一个字符一个字符地填入最终答案
    const length = s.length; // 缓存字符串的总长度，避免在循环中重复计算
    let i = 0;               // 主指针：负责领队，从头到尾扫一遍字符串

    // 只要主指针还没走到字符串的末尾，就继续收割
    while (i < length) {
        
        // =========================================================
        // 【第一步】：锁定当前单词的范围 [start, i)
        // =========================================================
        let start = i; // 记录当前这个单词的起点位置
        
        // 只要指针没越界，并且当前字符不是空格，说明还在单词内部
        while (i < length && s.charAt(i) != ' ') {
            i++; // 指针无脑右移，直到撞到空格或走到末尾才停下
        }

        // =========================================================
        // 【第二步】：利用数学公式，将锁定的单词“倒序”灌进篮子
        // =========================================================
        // 指针 p 从单词的起点走到终点
        for (let p = start; p < i; p++) {
            // 精妙的索引公式：start + i - 1 - p
            // 随着 p 从前往后走，这个公式算出来的索引正好是从后往前倒着走的
            // 从而实现“正向遍历指针，反向读取字符”的效果
            ret.push(s.charAt(start + i - 1 - p));
        }

        // =========================================================
        // 【第三步】：顺手把单词后面的空格原封不动地搬过去
        // =========================================================
        // 此时主指针 i 刚好停在空格上（如果有的话）
        // 只要当前字符是空格，就把它原样塞进篮子，主指针继续右移
        // 这样不仅保留了空格，还能完美兼容连续多个空格的极端情况
        while (i < length && s.charAt(i) == ' ') {
            i++;
            ret.push(' ');
        }
    }

    // 所有单词和空格处理完毕，将篮子里的字符无缝缝合成完整的字符串返回
    return ret.join('');
};

// =========================================================
var reverseWords = function(s) {
    return s.split(' ').map((substr) => substr.split('').reverse().join('')).join(' ');
};


// =========================================================
String.prototype.split()
const str = "The quick brown fox jumps over the lazy dog.";

const words = str.split(" ");
console.log(words[3]);
// Expected output: "fox"

const chars = str.split("");
console.log(chars[8]);
// Expected output: "k"

const strCopy = str.split();
console.log(strCopy);
// Expected output: Array ["The quick brown fox jumps over the lazy dog."]

// =========================================================
Array.prototype.join()
const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
// Expected output: "Fire,Air,Water"

console.log(elements.join(""));
// Expected output: "FireAirWater"

console.log(elements.join("-"));
// Expected output: "Fire-Air-Water"