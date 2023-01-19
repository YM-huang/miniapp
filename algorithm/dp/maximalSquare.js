/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function(matrix) {
    if (!matrix.length) return 0
  
  let maxsqlen = 0
  let rowLength = matrix.length, colLength = matrix[0].length
  for (let row = 0; row < rowLength; row++) {
    for (let col = 0; col < colLength; col++) {
      if (matrix[row][col] === '1') {
        matrix[row][col] = Number(matrix[row][col])
        if (row != 0 && col != 0) {
          matrix[row][col] = Math.min(matrix[row-1][col], matrix[row-1][col-1], matrix[row][col-1]) + 1
        }
        maxsqlen = Math.max(maxsqlen, matrix[row][col])
      } 
    }
  }
  return maxsqlen**2;//Math.pow(2, 100) === 2 ** 100 // true
};
console.log(maximalSquare([["0","1"],["1","0"]]))