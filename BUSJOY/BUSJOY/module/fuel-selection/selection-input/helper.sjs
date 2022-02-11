export default {
  getSelectedFuel: function(list, value ,type, fuelTypeList, OIL_MAP) {
    const filterItem = list.filter((item) => {
      return item.value === value;
    })
    if (filterItem.length > 0 && type === 'square') {
      return filterItem[0].name + '号油枪';
    }
    if (filterItem.length > 0) {
      return filterItem[0].name;
    }
    if (type === 'list' && value.length > 0) return OIL_MAP[value];
    if (type === 'list') return '请选择油品型号';
    if (type === 'square') return '请选择油枪号';
    return '未选择';
  }
}