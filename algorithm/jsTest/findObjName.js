var tree = {
	id: 1,
	name: "中国",
	children: [
		{
			id: 2,
			name: "浙江",
			children:[
				{
					id: 3,
					name: '宁波'
				},
				{
					id: 5,
					name: '杭州',
					children: [
						{
							id: 6,
							name: '余杭区'
						}
					]
				},
			]
		},
		{
			id: 4,
			name: "北京"
		}
	]
}

function getTreeIdByName(tree, name) {
    // 检查当前节点的名称是否匹配
    if (tree.name === name) {
      return tree.id;
    }
    
    // 递归查找子节点
    for (let child of tree.children || []) {//这行代码使用了ES6中的 for...of 循环语句来遍历tree对象的 children 数组。如果children数组为空，则返回一个空数组，以便任何for循环都不会被执行。这是通过逻辑或运算符（||）完成的，在children属性值为undefined时，它会将表达式计算为一个空数组（[]）。这个技巧可以有效避免迭代未定义的children属性时出现错误。
      let result = getTreeIdByName(child, name);
      if (result !== null) {
        return result;
      }
    }
    
    // 没有找到对应名称
    return null;
  }
  
  var result = getTreeIdByName(tree, '北京');
  console.log(result); // 6