// 创建
const s = new Set()
// 增
s.add('张三').add('李四')
// 是否包含
s.has('张三')
// 删
s.delete('张三')
// 清空
s.clear()
// 获取长度
console.log(s.size);
// 迭代
for (const value of s) {
  console.log(value);
}