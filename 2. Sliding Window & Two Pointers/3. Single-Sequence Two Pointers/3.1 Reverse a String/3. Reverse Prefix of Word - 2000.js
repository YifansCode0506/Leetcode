/**
 * @param {string} word
 * @param {character} ch
 * @return {string}
 */
// var reversePrefix = function(word, ch) {
//     // 1. 将字符串转为字符数组（对应 Java 的 word.toCharArray()）
//     let cs = word.split('');
//     let n = cs.length;
//     let idx = -1;

//     // 2. 寻找 ch 第一次出现的下标
//     for (let i = 0; i < n && idx === -1; i++) {
//         if (cs[i] === ch) {
//             idx = i;
//         }
//     }

//     // 3. 如果没找到 ch，直接返回原字符串（idx 依然是 -1）
//     if (idx === -1) return word;

//     // 4. 双指针原地翻转数组的前缀部分
//     let l = 0, r = idx;
//     while (l < r) {
//         let c = cs[l];
//         cs[l] = cs[r];
//         cs[r] = c;
//         l++;
//         r--;
//     }

//     // 5. 将字符数组拼回字符串返回（对应 Java 的 String.valueOf(cs)）
//     return cs.join('');
// };

var reversePrefix = function(word, ch) {
    // 1. 直接用 indexOf 瞬间找到 ch 第一次出现的下标
    let idx = word.indexOf(ch);
    
    // 2. 如果没找到，indexOf 会返回 -1，直接返回原字符串
    if (idx === -1) return word;
    
    // 3. 切片拼接：
    // 前半部分：截取到 idx + 1（因为 slice 是左闭右开，这样才能包含 ch 本身）
    // 后半部分：从 idx + 1 一直截取到末尾
    return word.slice(0, idx + 1).split('').reverse().join('') + word.slice(idx + 1);
};