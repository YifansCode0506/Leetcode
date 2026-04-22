/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function(n) {
    let prod = 1, num = 0;
    while(n){
        prod *= n % 10;
        num += n % 10;
        n = Math.floor(n / 10);
    }
    return prod - num
};