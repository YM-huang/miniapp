function* add() {
    console.log('开始');
    // yield 后面的内容被叫做 value，并且 yield 包含返回值
    const value1 = yield "请输入第一次的值"
    console.log(`第一次的值为：${value1}`);
  
    const value2 = yield "请输入第二次的值"
    console.log(`第二次的值为：${value2}`);
  
    return value1 + value2
  }
  
  let result
  const gen = add()
  // 开始
  result = gen.next()
  console.log(result);
  // 第一次输入值
  result = gen.next(35)
  console.log(result);
  // 第二次输入值
  result = gen.next(7)
  console.log(result);