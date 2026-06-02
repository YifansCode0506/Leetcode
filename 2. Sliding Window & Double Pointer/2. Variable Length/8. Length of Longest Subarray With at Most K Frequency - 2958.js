/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function(nums, k) {
    let ans = 0;
    let left = 0;
    // 使用 Map 来记录当前窗口内每个数字出现的频率
    const cnt = new Map();

    for (let right = 0; right < nums.length; right++) {
        // 1. 【入】：当前右边界数字进入窗口，更新频率
        let x = nums[right];
        cnt.set(x, (cnt.get(x) ?? 0) + 1);// 登记当前数字 x 进入窗口：如果在 Map 中存在则次数加 1，若第一次出现则初始化为 1

        // 2. 【缩】：如果当前数字 x 的出现次数超过了 k，说明窗口不合法了
        // 启动 while 循环，从左边一直踢人，直到窗口内 x 的次数降回 k 以内
        while (cnt.get(x) > k) {
            let out = nums[left];
            cnt.set(out, cnt.get(out) - 1);
            left++;
        }

        // 3. 【更新】：此时窗口必然合法，记录最长窗口长度
        ans = Math.max(ans, right - left + 1);
    }

    return ans;
};

/* * 核心逻辑：更新窗口内数字 x 的出现频率 
 * 1. cnt.get(x) ── 尝试去 Map 里获取数字 x 之前出现的次数
 * 2. ?? 0        ── 空值合并：如果 x 是新面孔（值为 undefined），则给它一个保底值 0
 * 3. + 1         ── 在旧次数（或保底值 0）的基础上加 1，算出最新频率
 * 4. cnt.set(...)── 将计算出的新频率重新登记回 Map 中
 */