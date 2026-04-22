/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function(blocks, k) {
    let ans = 0, sum = Infinity;
    
    for (let r = 0; r < blocks.length; r++){
        const rightBlock = blocks[r];
    
        if (rightBlock === "W") ans++;

        const l = r - k + 1;
        if (l < 0 ) continue;

        sum = Math.min(ans, sum);
        
        const leftBlock = blocks[l];
        if (leftBlock === "W") ans--;
    }
    return sum;
};