/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    let res = [];
    function isPalindrome(s){
        let head = 0;
        let tail = s.length - 1;
        while(head <= tail){
            if(s[head] !== s[tail]) return false;
            head++;
            tail--;
        }
        return true;
    }
    function backtrack(path,start){
        if(start === s.length)
            res.push(path);
        for(let i=start;i<s.length;i++){
            if(!isPalindrome(s.slice(start,i+1)))
                continue;
            path.push(s.slice(start,i+1));
            backtrack(path.slice(0),i+1);
            path.pop();
        }
    }
    backtrack([],0);
    return res;
};
console.log(partition(s = "aab"));