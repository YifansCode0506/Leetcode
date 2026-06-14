/**
 * @param {string[]} queries
 * @param {string[]} words
 * @return {number[]}
 */

var numSmallerByFrequency = function (queries, words) {
    
    // 1. 定义辅助函数 f(s)，统计字符串 s 中字典序最小字母的出现频次
    const f = (s) => {
        // 初始化：假定第一个字符 s[0] 就是当前最小字符，出现次数 count 设为 1
        let min = s[0], count = 1;
        
        // 从第二个字符开始遍历字符串
        for (let i = 1; i < s.length; i++) {
            if (s[i] < min) { 
                // 情况 A：发现了一个比当前 min 还要小的字符！
                min = s[i];   // 赶紧更新最小字符
                count = 1;    // 旧字符作废，新最小字符的计数重置为 1
            } 
            else if (s[i] === min) {
                // 情况 B：遇到了和当前最小字符一模一样的字符，计数累加
                count++;
            }
            // 情况 C：s[i] > min，说明这个字符很大，完全不需要理会，直接滑过
        }
        return count; // 遍历结束，返回最终统计到的最小字母频次
    };

    // 2. 预处理：批量计算 queries 和 words 的频次
    const queriesF = queries.map(f); // queriesF 存放每个查询字符串的频次
    
    // 把 words 中的每个单词也变成频次数字，随后进行【升序排序】
    // 注意：JS 的 sort 默认按字符串排，必须显式传入 (a, b) => a - b
    const wordsF = words.map(f).sort((a, b) => a - b);

    // 3. 批量二分查询并返回结果数组
    // 对每个查询 q，利用 upperBound 找出 wordsF 中第一个【严格大于 q】的元素下标。
    // 大于 q 的单词总数量 = 数组总长度 - 该下标位置
    return queriesF.map(q => wordsF.length - upperBound(wordsF, q));
};

/**
 * 手写实现标准二分查找：upperBound（寻找第一个严格大于 target 的元素下标）
 * 采用的是【左闭右开】区间：[left, right) 
 */
function upperBound(arr, target) {
    let left = 0, right = arr.length; // 因为是右开区间，初始右边界设为数组总长度 length
    
    while (left < right) { // 当 left === right 时，区间为空，退出循环
        
        // (left + right) >>> 1 是无符号右移 1 位，相当于除以 2 并向下取整。
        // 它是一步到位的硬件级位运算，既能完美防止大数溢出，执行效率也极高！
        const mid = (left + right) >>> 1;
        
        if (arr[mid] <= target) {
            // 说明当前 mid 的值还不够大（小于或等于 target），
            // 真正的答案必定在 mid 的严格右侧，所以强行收缩左边界
            left = mid + 1;
        } else {
            // 说明 arr[mid] > target，当前值符合“大于”的要求。
            // 但我们要找的是【第一个】大于它的位置，所以答案可能就是 mid，或者在 mid 的左边。
            // 保持右开区间定义，将右边界收缩到 mid
            right = mid;
        }
    }
    
    // 循环结束时，left 和 right 会在同一个位置相遇。
    // 此时的 left 刚好就是数组中第一个严格大于 target 的元素下标
    return left;
}



var numSmallerByFrequency = function(queries, words) {
    // 1. 定义辅助函数 fx，计算字符串中字典序最小字母的出现频次
    const fx = (s) => {
        let arr = new Array(26).fill(0);
        // 统计每个字母出现的次数
        for (let i = 0; i < s.length; i++) {
            arr[s.charCodeAt(i) - 97]++; // 'a' 的 Unicode 编码是 97
        }
        // 从左到右遍历（即从字母 'a' 到 'z'），第一个不为 0 的就是字典序最小的字母频次
        for (let count of arr) {
            if (count > 0) return count;
        }
        return 0;
    };

    // 2. 实现 upper_bound 二分查找
    // 寻找在有序数组 vec 中，第一个大于 target 的元素下标
    const upperBound = (vec, target) => {
        let left = 0, right = vec.length - 1;
        while (left <= right) {
            const mid = Math.floor((right - left) / 2) + left;
            if (vec[mid] > target) {
                right = mid - 1; // 答案在左边或者就是 mid
            } else {
                left = mid + 1;  // 答案在右边
            }
        }
        return left; // 循环结束时，left 就是第一个大于 target 的下标
    };

    // 3. 预处理 words 的频次并排序
    let vec = words.map(w => fx(w));
    vec.sort((a, b) => a - b); // 升序排序

    // 4. 遍历 queries 进行二分查询
    let ans = [];
    for (let i = 0; i < queries.length; i++) {
        let qFreq = fx(queries[i]);
        // 找到第一个大于 qFreq 的位置
        let idx = upperBound(vec, qFreq);
        // 大于该频次的单词数量 = 总长度 - 第一个大于它的下标
        ans.push(vec.length - idx);
    }

    return ans;
};




function f(s) {
    let cnt = 0;
    let ch = 'z';
    for (let c of s) {
      if (c < ch) {
        ch = c;
        cnt = 1;
      } else if (c == ch) {
        cnt++;
      }
    }
    return cnt;
}

var numSmallerByFrequency = function(queries, words) {
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let s of words) {
      count[f(s)]++;
    }
    for (let i = 9; i >= 0; i--) {
      count[i] += count[i + 1];
    }
    res = [];
    for (let s of queries) {
      res.push(count[f(s) + 1]);
    }
    return res;
};
