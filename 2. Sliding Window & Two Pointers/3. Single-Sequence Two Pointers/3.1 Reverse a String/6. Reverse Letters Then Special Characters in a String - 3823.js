/**
 * @param {string} s
 * @return {string}
 */
var reverseByType = function(s) {
    // 先打散成字符数组以便原地交换
    let t = s.split('');

    // 判断一个字符是否为小写英文字母
    const isLower = (ch) => ch >= 'a' && ch <= 'z';

    // 第一轮：按顺序只反转“特殊字符”
    
    let i = 0;
    let j = t.length - 1;
    while (i < j) {
        //如果是小写字母，直接滑过
        while (i < j && isLower(t[i])) {
            i++;
        }
        while (i < j && isLower(t[j])) {
            j--;
        }
        // 当两边都停在“特殊字符”上时，进行解构对调
        if (i < j) {
            [t[i], t[j]] = [t[j], t[i]];
            i++;
            j--;
        }
    }

    // 第二轮：重置指针，按顺序只反转“小写字母”
    i = 0;
    j = t.length - 1;
    while (i < j) {
        // 如果是特殊字符，直接滑过
        while (i < j && !isLower(t[i])) {
            i++;
        }
        while (i < j && !isLower(t[j])) {
            j--;
        }
        // 当两边都停在“小写字母”上时，进行解构对调
        if (i < j) {
            [t[i], t[j]] = [t[j], t[i]];
            i++;
            j--;
        }
    }

    // 【第三步】：重新拼接
    return t.join('');
};