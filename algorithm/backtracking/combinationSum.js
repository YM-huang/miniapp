/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let res = [];
    let len = candidates.length;
    //这里排序是为了防止在for循环if判断时直接跳出了，比如这样的样例[8,7,4,3],11
    candidates.sort((x,y) => x-y);
    function back(path,i,tar){
        if(tar === 0){
            res.push(path);
            return;
        }
        for(let j = i;j < len;j++){
            //判断是否当前的路口都是通向死路
            if(tar < candidates[j]) break;          
            path.push(candidates[j]);
            back(path.slice(0),j,tar-candidates[j]);
            path.pop();
        }
    }
    back([],0,target);
 
    return res;
};