/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var transpose = function(matrix) {
   const n = matrix.length; m = matrix[0].length;
   const ans = Array.from({ length : m}, () => Array(n));
   for(let i = 0; i < n; i++){
    for(let j = 0; j < m; j++){
        ans[j][i] = matrix[i][j];
    }
   }
   return ans;
};
