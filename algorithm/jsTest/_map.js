// 创建
const m = new Map()
// 增
m.set('name', '张三')
m.set('age', '30')
// 改
m.set('name', '李四')
// 查
m.get('name')
// 删
m.delete('name')
// 获取长度
console.log(m.size);
// 迭代
for (const [key, value] of m) {
  console.log(key, value);
}