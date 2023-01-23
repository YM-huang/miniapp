/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    let rows = matrix.length;
    if(rows <= 0) return false;
    let cols = matrix[0].length;
    if(cols <= 0) return false;
    let row = rows - 1;
    let col = 0;
    while(row >= 0 && col < cols){
        if(matrix[row][col] > target){
            row--;
        }else if(matrix[row][col] < target){
            col++;
        }else{
            return true;
        }
    }
    return false;
};
console.log(searchMatrix([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],20))