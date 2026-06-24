/**
 * @param {number[]} candies - 每堆糖果的数量
 * @param {number} k          - 小孩的总人数
 * @return {number}           - 每个小孩最多能分到的糖果数目
 */
var maximumCandies = function(candies, k) {
    const n = candies.length;
    const max = Math.max(...candies);

    // 初始化闭区间的左右边界。由于 mid 作为除数不能为 0，
    let l = 1, r = max;

    // 闭区间核心条件：l <= r。这意味着即使 l 和 r 重合了，也要进去再检验一次 mid
    while( l <= r){
        // 取当前闭区间的正中点
        const mid = Math.floor(( l + r) / 2);
        let sum = 0;
        
        // 统计当每个小孩分 mid 颗糖果时，全车站（糖果堆）总共能分给多少个小孩
        for(let j = 0; j < n; j++){
            sum += Math.floor(candies[j] / mid);
            // 一旦分够了 k 个小孩，立刻停止循环
            if( sum >= k) break;
        }
        
        // 判定天平与区间收缩
        if( sum >= k){
           // 【情况 A：合格】当前的糖果数 mid 够分。
           // 因为题目要求“最大糖果数目”，既然 mid 行，那么答案可能是 mid，或者比 mid 更大。
           // 按照闭区间规则，为了继续向右探索，左指针激进地跨过 mid：l = mid + 1
           l = mid + 1;
        }else{
           // 【情况 B：不合格】当前的糖果数 mid 定太大了，导致不够分。
           // 说明答案绝对不可能是 mid，也绝对不可能在 mid 右边。
           // 按照闭区间规则，排除 mid，右指针向左退一步：r = mid - 1
           r = mid - 1;
        }
    }
    
    // ================================================================
    // 【对应图中闭区间的 return 逻辑】
    // 退出循环前：l 和 r 原本重合在最后一个“合格点”上。
    // 此时 mid 也是这个点，由于满足 sum >= k，执行了 l = mid + 1，l 向右跨了一步。
    // 也就满足了 l > r 从而打破 while 循环。
    // 此时：l 变成了第一个不合格的值，而 r 留在了【最后一个合格的值】上。
    // 所以最终返回 r。
    // ================================================================
    return r;
};