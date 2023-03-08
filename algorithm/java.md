**hashmap：次数**
HJ23(getOrDefault)

**string**
HJ34

**hashset:去重**
HJ10

**正则**
HJ40
String value = "10*1000*1000";
String regex="\\s*\\*\\s*1000\\s*";
boolean isMatch = value .matches(regex);

**HJ54 表达式求值**
js eval函数（将字符串的表达式计算）
eval() 的参数是一个字符串。如果字符串表示的是表达式，eval() 会对表达式进行求值。如果参数表示一个或多个 JavaScript 语句，那么eval() 就会执行这些语句。不需要用 eval() 来执行一个算术表达式：因为 JavaScript 可以自动为算术表达式求值。
```js
const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while(line = await readline()){
        console.log(eval(line))
    }
}()
```