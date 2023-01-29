var restoreIpAddresses = function(s) {
    let res = [];
    if(s.length < 4 || s.length > 12) return res;
    function dfs(s, sub, index) {
        if(s.length === 0 && index === 4) res.push(sub.slice(1)); // 去掉开头的.
        if(s.length === 0 || index === 4) return;

        // 一个数
        dfs(s.slice(1), `${sub}.${s.slice(0,1)}`, index + 1);
        if(s[0] !== '0' && s.length > 1) {
            dfs(s.slice(2), `${sub}.${s.slice(0,2)}`, index + 1);   // 两个数
            if(s.length > 2 && parseInt(s.slice(0,3)) <= 255) {
                dfs(s.slice(3), `${sub}.${s.slice(0,3)}`, index + 1);   //三个数
            }
        }
    }
    dfs(s, '', 0);
    return res;
};