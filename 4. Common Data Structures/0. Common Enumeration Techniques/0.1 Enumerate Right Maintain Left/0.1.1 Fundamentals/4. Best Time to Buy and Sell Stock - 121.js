/**
 * 需求：只允许买卖一次股票，计算最大利润。
 * 思路：枚举当前价格作为卖出价，维护左边出现过的最低买入价。
 *
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // ans 表示目前能获得的最大利润；不交易时利润为 0。
    let ans = 0;

    // minPrice 表示当前日期左侧以及当前日期之前见过的最低价格。
    let minPrice = prices[0];

    // 逐个枚举价格 x，把 x 当作今天卖出的价格。
    for (const x of prices) {
        // 如果今天卖出，则最佳买入价是历史最低价 minPrice。
        ans = Math.max(ans, x - minPrice);

        // 更新历史最低价，让后面的日期可以用更便宜的买入价。
        minPrice = Math.min(minPrice, x);
    }

    // 返回最大利润。
    return ans;
};
