/**
 * 需求：找到包含一对相同卡牌的最短连续子数组长度；不存在返回 -1。
 * 思路：枚举当前卡牌，Map 维护每种卡牌最近一次出现的下标。
 *
 * @param {number[]} cards
 * @return {number}
 */
var minimumCardPickup = function(cards) {
    // ans 记录最短连续区间长度。
    let ans = Infinity;

    // last 的 key 是卡牌值，value 是该卡牌最近一次出现的下标。
    const last = new Map();

    // i 是当前卡牌下标。
    for (let i = 0; i < cards.length; i++) {
        // x 是当前卡牌值。
        const x = cards[i];

        // 如果左边出现过相同卡牌，就能形成一个包含一对相同卡牌的区间。
        if (last.has(x)) {
            // 区间长度为 i - 上次下标 + 1，用它更新最短答案。
            ans = Math.min(ans, i - last.get(x) + 1);
        }

        // 覆盖为最近下标；求最短区间时，最近的同值卡牌最有价值。
        last.set(x, i);
    }

    // 如果没有找到相同卡牌对，返回 -1。
    return ans === Infinity ? -1 : ans;
};
