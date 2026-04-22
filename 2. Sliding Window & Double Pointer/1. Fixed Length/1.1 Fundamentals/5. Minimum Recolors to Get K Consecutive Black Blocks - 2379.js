/**
 * @param {string} blocks
 * @param {number} k
 * @return {number}
 */
var minimumRecolors = function(blocks, k) {
    let len = blocks.length;
    let cnt_w = 0;

    for (let i = 0; i < k; i++) {
        cnt_w += (blocks[i] === 'W' ? 1 : 0);
    }

    let res = cnt_w;

    for (let right = k; right < len; right++) {
        let _in = blocks[right];
        let _out = blocks[right - k]
        cnt_w = cnt_w + (_in === 'W' ? 1 : 0) - (_out === 'W' ? 1 : 0)
        res = Math.min(res, cnt_w)
    }
    return res
};


// var minimumRecolors = function(blocks, k) {
//     let ans = 0, sum = Infinity;
    
//     for (let r = 0; r < blocks.length; r++){
//         const rightBlock = blocks[r];
    
//         if (rightBlock === "W") ans++;

//         const l = r - k + 1;
//         if (l < 0 ) continue;

//         sum = Math.min(ans, sum);
        
//         const leftBlock = blocks[l];
//         if (leftBlock === "W") ans--;
//     }
//     return sum;
// };