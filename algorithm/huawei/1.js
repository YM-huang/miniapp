// 给你一份『词汇表』（字符串数组） words 和一张『字母表』（字符串） chars。
// 假如你可以用 chars 中的『字母』（字符）拼写出 words 中的某个『单词』（字符串），那么我们就认为你掌握了这个单词。
// 注意：每次拼写（指拼写词汇表中的一个单词）时，chars 中的每个字母都只能用一次。
// 返回词汇表 words 中你掌握的所有单词的 长度之和。

// 示例：

// 输入：words = ["cat","bt","hat","tree"], chars = "atach"
// 输出：6
// 解释：
// 可以形成字符串 "cat" 和 "hat"，所以答案是 3 + 3 = 6。

// let word = ["cat","bt","hat","tree"];
// let char = "atach";
function test(word,char){

    let sum = 0;//长度之和

    for(let i=0;i<word.length;i++){
        let word1 = word[i];
        let wordSplit = word1.split('');
        wordSplit.sort();
        let chars = char.split('');
        chars.sort();
        let isTrue = 0;
        for(let j=0;j<word1.length;j++){
            isTrue = 1;
            for(let n=0;n<chars.length;n++){
                if(wordSplit[j]===chars[n]){
                    chars[n] = 0;
                    continue;
                }
                else if(j==word1.length-1&&wordSplit[j]!==chars[n]){
                    isTrue = 0;
                    break;
                }
            }
        }
        if(isTrue){//判断是否是掌握了这个单词
            sum+=word1.length;
        }
    }
    console.log(sum);
}

test(word = ["cat","bt","hat","tree"],char = "atach")