/**
 * @param {number[]} cards
 * @return {number}
 */

var minimumCardPickup = function(cards) {
    const n = cards.length;
    // 初始化结果为正无穷大，用于后续取最小值
    let res = Infinity;
    // 使用纯对象作为哈希缓存表（Key 为卡牌值，Value 为其最后一次出现的索引）
    const cache = {};

    // 线性扫描卡牌数组，j 代表当前卡牌的右边界索引
    for(let j = 0; j < n; j++){
        // 从缓存中读取当前卡牌值此前记录的左边界索引 i
        const i = cache[cards[j]];
        
        // 判断索引 i 是否存在。因为合法索引包含 0，故必须使用 >= 0 判定
        // 且双重确认该历史索引上的值是否与当前值一致
        if(i >= 0 && cards[i] === cards[j]){
            // 计算当前连续卡牌区间长度 (j - i + 1)，并更新全局最小长度
            res = Math.min(res, j - i + 1);
        }
        
        // 无论是否匹配成功，都必须将当前值最新的索引 j 覆盖写入缓存
        // 保证下一次再遇到相同的值时，计算的是最近的两张卡牌距离
        cache[cards[j]] = j;
    }
    // 若 res 仍为无穷大说明无匹配，返回 -1；否则返回最小卡牌数
    return res === Infinity ? -1 : res;
};

var minimumCardPickup = function(cards) {
    let ans = Infinity;
    // 使用 Map 对象记录数字最后一次出现的索引位置
    let map = new Map();

    for(let i = 0; i < cards.length; i++){
        let x = cards[i];

        // 检查 Map 中是否已经登记过当前卡牌值 x
        if(map.has(x)){

            // 当前索引减去历史最近索引，再加 1 算出当前连续区间卡牌数
            ans = Math.min(ans, i - map.get(x) + 1); 
        }    
        
        // 将卡牌值 x 和当前索引 i 存入 Map
        map.set(x, i);
    }
    return ans === Infinity ? -1 : ans;
};