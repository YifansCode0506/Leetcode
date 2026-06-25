/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let ans = 0;
    let minPrice = prices[0];
    for(const x of prices){
        ans = Math.max(ans, x - minPrice);
        minPrice = Math.min(minPrice, x);
    }
    return ans;
};

