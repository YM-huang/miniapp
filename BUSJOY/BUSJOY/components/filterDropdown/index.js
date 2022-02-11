import Taro from '@tarojs/taro'
import { Component,Fragment } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.scss'
import PropTypes from 'prop-types';

export default class FilterDropdown extends Component {

    static options = {
        addGlobalClass: true
    }
    state = {
        subData: [], //菜单数据
        menu: [], //顶部横条数据
        showPage: -1, //菜单页面显示/隐藏动画控制
        pageState: [], //页面的状态
        activeMenuArr: [], //UI状态
        shadowActiveMenuArr: [], //记录选中
        defaultActive: [],
        triangleDeg: [], //小三角形的翻转动画控制
        isShowMask: false, //遮罩层显示/隐藏动画控制
        maskVisibility: false, //遮罩层显示/隐藏状态
        //滚动区域定位
        firstScrollInto: 0,
        secondScrollInto: 0,
        componentTop: 0,//组件top
        isReadNewSelect: false,
        filterData: null,
        defaultSelected: null
    }

    componentWillMount() {
        this.setState({
            filterData: this.props.filterData,
        }, () => {
            this.initMenu(); //filterData重新赋值初始化菜单
        })
        if (this.props.defaultSelected.length == 0) {
            return;
        }
        this.setState({
            defaultActive: JSON.parse(JSON.stringify(this.props.defaultSelected)),
            activeMenuArr: JSON.parse(JSON.stringify(this.props.defaultSelected)),
            shadowActiveMenuArr: JSON.parse(JSON.stringify(this.props.defaultSelected))
        }, () => {
        })

    }

    componentDidMount() {

    }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterData !== this.state.filterData) {
            // this.initData();
            this.setState({
                filterData: prevProps.filterData,
            }, () => {
                this.initMenu(); //filterData重新赋值初始化菜单
            })
        }
        if (prevProps.defaultSelected !== this.state.defaultSelected) {
            this.setState({
                defaultSelected: prevProps.defaultSelected,
            }, () => {
                // this.initData();
                if (prevProps.defaultSelected.length == 0) {
                    return;
                }
                this.setState({
                    defaultActive: JSON.parse(JSON.stringify(prevProps.defaultSelected)),
                    activeMenuArr: JSON.parse(JSON.stringify(prevProps.defaultSelected)),
                    shadowActiveMenuArr: JSON.parse(JSON.stringify(prevProps.defaultSelected))
                }, () => {
                    if (this.props.updateMenuName) {
                        this.setMenuName();
                    }
                })

            })

        }
    }

    initMenu = () => {
        let tmpMenuActiveArr = [];
        let tmpMenu = [];
        for (let i = 0; i < this.state.filterData.length; i++) {
            let tmpitem = this.state.filterData[i];
            tmpMenu.push({
                //如果没有设置name，则取第一个菜单作为menu.name,filter类型则将"筛选"作为menu.name
                name: tmpitem.name || (tmpitem.type == "filter" ? "筛选" : tmpitem.submenu[0].name),
                type: tmpitem.type
            });
            //初始化选中项数组-ui状态
            tmpMenuActiveArr.push(this.processActive(tmpitem));
            //初始化角度数组
            let triangleDeg = this.state.triangleDeg
            triangleDeg.push(0);
            this.setState({
                triangleDeg
            })
            //初始化控制显示状态数组
            let pageState = this.state.pageState
            pageState.push(false);
            this.setState({
                pageState
            })
            //递归处理子菜单数据
            tmpitem = this.processSubMenu(tmpitem);
            let filterData = this.state.filterData
            filterData[i] = tmpitem;
            this.setState({
                filterData
            })
        }
        this.setState({
            menu: tmpMenu
        }, () => {
            //初始化选中项数组
            tmpMenuActiveArr = this.state.defaultActive.length > 0 ? this.state.defaultActive : this.state.activeMenuArr.length > 0 ? this.state.activeMenuArr : tmpMenuActiveArr;
            this.setState({
                defaultActive: [],
                activeMenuArr: JSON.parse(JSON.stringify(tmpMenuActiveArr)),
                shadowActiveMenuArr: JSON.parse(JSON.stringify(tmpMenuActiveArr)),
                //加载菜单数据
                subData: this.state.filterData
            }, () => {
                //设定顶部菜单名字
                if (this.props.updateMenuName) {
                    this.setMenuName();
                }
            })

        })
    }

    setMenuName = () => {
        for (var i = 0; i < this.state.activeMenuArr.length; i++) {
            let row = this.state.activeMenuArr[i];
            if (typeof (row[0]) != 'object') {
                var tmpsub = false;
                if (row.length > 0 && row[0] != null) {
                    tmpsub = this.state.subData[i].submenu[row[0]];
                    if (row.length > 1 && row[1] != null) {
                        tmpsub = tmpsub.submenu[row[1]];
                        if (row.length > 2 && row[2] != null) {
                            tmpsub = tmpsub.submenu[row[2]];
                        }
                    }
                } else {
                    tmpsub = false;
                }
                if (tmpsub) {
                    let menu = this.state.menu
                    menu[i].name = tmpsub.name
                    this.setState({
                        menu
                    })
                }
            }
        }
    }
    //展开更多
    showMoreSub = (index) => {
        let subData = this.state.subData
        subData[this.state.showPage].submenu[this.state.activeMenuArr[this.state.showPage][0]].submenu[index].showAllSub = true;
        this.setState({
            subData
        }, () => {
            this.forceUpdate();
        })
    }

    //选中
    selectHierarchyMenu = (page_index, level1_index, level2_index, level3_index) => {
        let activeMenuArr = this.state.activeMenuArr
        //读取记录
        if (level1_index != null && level2_index == null && level3_index == null && this.state.shadowActiveMenuArr[page_index][0] ==
            level1_index) {
            activeMenuArr.splice(page_index, 1, JSON.parse(JSON.stringify(this.state.shadowActiveMenuArr[page_index])));
            this.setState({
                activeMenuArr
            })
        } else {
            activeMenuArr[page_index].splice(0, 1, level1_index);
            this.setState({
                activeMenuArr
            }, () => {
                activeMenuArr = this.state.activeMenuArr;
                if (level2_index != null || activeMenuArr[page_index].length >= 2) {
                    activeMenuArr[page_index].splice(1, 1, level2_index)
                } else {
                    activeMenuArr[page_index].splice(1, 1)
                }
                if (level3_index != null || activeMenuArr[page_index].length >= 3) {
                    activeMenuArr[page_index].splice(2, 1, level3_index)
                } else {
                    activeMenuArr[page_index].splice(2, 1)
                }
                this.setState({
                    activeMenuArr
                })
            })
        }
        this.setState({
            activeMenuArr
        }, () => {
            console.log(this.state.activeMenuArr)
            //写入结果
            if (level3_index != null || level2_index != null || (level1_index != null && this.state.subData[page_index].submenu[level1_index].submenu.length == 0)
            ) {
                let sub = this.state.subData[page_index].submenu[level1_index].submenu[level2_index];
                if (this.props.updateMenuName) {
                    var menu = this.state.menu
                    menu[page_index].name = (level3_index != null && sub.submenu[level3_index].name) || (level2_index != null && sub.name) || this.state.subData[page_index].submenu[level1_index].name;
                    this.setState({
                        menu
                    })
                }
                var shadowActiveMenuArr = this.state.shadowActiveMenuArr
                shadowActiveMenuArr[page_index] = this.state.activeMenuArr[page_index];
                this.setState({
                    shadowActiveMenuArr: shadowActiveMenuArr
                }, () => {
                    console.log(this.state.shadowActiveMenuArr)
                    this.togglePage(this.state.showPage);
                })

            }
        })

    }

    //写入结果，筛选
    setFilterData = (page_index) => {
        var shadowActiveMenuArr = this.state.shadowActiveMenuArr
        shadowActiveMenuArr[page_index] = JSON.parse(JSON.stringify(this.state.activeMenuArr[page_index]));
        this.setState({
            shadowActiveMenuArr
        }, () => {
            this.togglePage(this.state.showPage);
        })

    }

    //重置结果和ui，筛选
    resetFilterData = (page_index) => {
        let tmpArr = [];
        let level = this.state.shadowActiveMenuArr[page_index].length;
        while (level > 0) {
            tmpArr.push([]);
            let box = this.state.subData[page_index].submenu[level - 1].submenu;
            for (let i = 0; i < box.length; i++) {
                let subData = this.state.subData
                subData[page_index].submenu[level - 1].submenu[i].selected = false;
                this.setState({
                    subData
                })
            }
            level--;
        }
        var activeMenuArr = this.state.activeMenuArr
        activeMenuArr[page_index] = JSON.parse(JSON.stringify(tmpArr));
        this.setState({
            activeMenuArr
        }, () => {
            this.forceUpdate();
        })
    }

    //选中筛选类label-UI状态
    selectFilterLabel = (page_index, box_index, label_index) => {
        let find_index = this.state.activeMenuArr[page_index][box_index].indexOf(label_index);
        let activeMenuArr, subData
        activeMenuArr = this.state.activeMenuArr
        subData = this.state.subData
        if (find_index > -1) {
            activeMenuArr[page_index][box_index].splice(find_index, 1);
            subData[page_index].submenu[box_index].submenu[label_index].selected = false;
            this.setState({
                activeMenuArr,
                subData
            }, () => {
                this.forceUpdate();
            })
        } else {
            activeMenuArr[page_index][box_index].push(label_index);
            subData[page_index].submenu[box_index].submenu[label_index].selected = true;
            this.setState({
                activeMenuArr,
                subData
            }, () => {
                this.forceUpdate();
            })
        }
    }

    //选中单选类label-UI状态
    selectRadioLabel = (page_index, box_index, label_index) => {
        let activeIndex = this.state.activeMenuArr[page_index][box_index][0];
        let activeMenuArr, subData
        activeMenuArr = this.state.activeMenuArr
        subData = this.state.subData
        if (activeIndex == label_index) {
            subData[page_index].submenu[box_index].submenu[activeIndex].selected = false;
            activeMenuArr[page_index][box_index][0] = null;
            this.setState({
                activeMenuArr,
                subData
            }, () => {
                this.forceUpdate();
            })
        } else {
            if (activeIndex != null && activeIndex < this.state.subData[page_index].submenu[box_index].submenu.length) {
                subData[page_index].submenu[box_index].submenu[activeIndex].selected = false;
            }
            subData[page_index].submenu[box_index].submenu[label_index].selected = true;
            activeMenuArr[page_index][box_index][0] = label_index;
            this.setState({
                activeMenuArr,
                subData
            }, () => {
                this.forceUpdate();
            })
        }
    }

    //菜单开关
    togglePage = (index) => {
        console.log(`fyq${index}`)
        if (index == this.state.showPage) {
            this.hidePageLayer(true);
            this.hideMask();
            this.setState({
                showPage: -1
            })
        } else {
            if (this.state.showPage > -1) {
                this.hidePageLayer(false);
            }
            this.showPageLayer(index);
            this.showMask();
        }
    }

    //hide遮罩层
    hideMask = () => {
        this.setState({
            isShowMask: false
        }, () => {
            setTimeout(() => {
                this.setState({
                    maskVisibility: false
                })
            }, 200);
        })
    }

    //show遮罩层
    showMask = () => {
        this.setState({
            maskVisibility: true
        }, () => {
            Taro.nextTick(() => {
                setTimeout(() => {
                    this.setState({
                        isShowMask: true
                    })
                }, 0);
            })
        })
    }
    //hide菜单页
    hidePageLayer = (isAnimation) => {
        let triangleDeg, pageState
        triangleDeg = this.state.triangleDeg
        triangleDeg[this.state.showPage] = 0;
        this.setState({
            triangleDeg
        }, () => {
            let tmpIndex = this.state.showPage;
            let pageState = this.state.pageState
            if (isAnimation) {
                setTimeout(() => {
                    pageState.splice(tmpIndex, 1, false);
                    this.setState({
                        pageState
                    })
                }, 200);
                this.confirm();
            } else {
                pageState.splice(tmpIndex, 1, false)
                this.setState({
                    pageState
                })
            }
            this.setState({
                firstScrollInto: null,
                secondScrollInto: null
            })
        })
    }

    confirm = () => {
        let index = JSON.parse(JSON.stringify(this.state.shadowActiveMenuArr));
        let value = JSON.parse(JSON.stringify(this.state.shadowActiveMenuArr));
        //对结果做一下处理
        index.forEach((item, i) => {
            if (typeof (item[0]) == 'object') {
                //针对筛选结果过一个排序
                item.forEach((s, j) => {
                    if (s != null) {
                        s.sort((val1, val2) => {
                            return val1 - val2;
                        });
                        item[j] = s;
                        s.forEach((v, k) => {
                            value[i][j][k] = (v == null || v >= this.state.subData[i].submenu[j].submenu.length) ? null : this.state.subData[i].submenu[j].submenu[v].value;
                            if (this.state.subData[i].type == 'radio' && value[i][j][k] == null) {
                                value[i][j] = [];
                                index[i][j] = [];
                            }
                        });
                    }
                });
            } else {
                let submenu = this.state.subData[i].submenu[item[0]];
                value[i][0] = submenu.value;
                if (value[i].length >= 2 && item[1] != null) {
                    if (submenu.submenu.length > 0) {
                        submenu = submenu.submenu[item[1]];
                        value[i][1] = submenu.hasOwnProperty('value') ? submenu.value : null;
                    } else {
                        value[i][1] = null
                    }
                    if (value[i].length >= 3 && item[2] != null) {
                        if (submenu.submenu.length > 0) {
                            submenu = submenu.submenu[item[2]];
                            value[i][2] = submenu.hasOwnProperty('value') ? submenu.value : null;
                        } else {
                            value[i][2] = null;
                        }
                    }
                }
            }
            index[i] = item;
        });
        // 输出
        this.props.confirm({
            index: index,
            value: value
        })
    }

    //show菜单页
    showPageLayer = (index) => {
        let pageState, showPage, triangleDeg
        this.processPage(index);
        pageState = this.state.pageState
        pageState.splice(index, 1, true);
        this.setState({
            pageState
        }, () => {
            Taro.nextTick(() => {
                setTimeout(() => {
                    showPage = index;
                    this.setState({
                        showPage
                    })
                }, 0);
            })
            triangleDeg = this.state.triangleDeg
            triangleDeg[index] = 180;
            this.setState({
                triangleDeg
            })
        })
    }

    reloadActiveMenuArr = () => {
        let filterData, activeMenuArr, shadowActiveMenuArr, subData
        for (let i = 0; i < this.state.filterData.length; i++) {
            let tmpitem = this.state.filterData[i];
            let tmpArr = this.processActive(tmpitem);
            tmpitem = this.processSubMenu(tmpitem);
            if (this.state.activeMenuArr[i].length != tmpArr.length) {
                filterData = this.state.filterData
                activeMenuArr = this.state.activeMenuArr
                shadowActiveMenuArr = this.state.shadowActiveMenuArr
                filterData[i] = tmpitem;
                activeMenuArr.splice(i, 1, JSON.parse(JSON.stringify(tmpArr)));
                shadowActiveMenuArr.splice(i, 1, JSON.parse(JSON.stringify(tmpArr)));
                this.setState({
                    filterData,
                    activeMenuArr,
                    shadowActiveMenuArr
                })
            }
        }
        subData = this.state.subData
        subData = this.state.filterData;
        this.setState({
            subData
        }, () => {
            this.forceUpdate();
        })
    }

    processPage = (index) => {
        let activeMenuArr, subData, firstScrollInto, secondScrollInto
        //check UI控制数组，结果数组,防止传入数据层级和UI控制数组不同步
        this.reloadActiveMenuArr();
        //重置UI控制数组
        activeMenuArr = this.state.activeMenuArr
        activeMenuArr.splice(index, 1, JSON.parse(JSON.stringify(this.state.shadowActiveMenuArr[index])));
        this.setState({
            activeMenuArr
        }, () => {
            if (this.state.menu[index].type == 'filter') {
                //重载筛选页选中状态
                let level = this.state.shadowActiveMenuArr[index].length;
                for (let i = 0; i < level; i++) {
                    let box = this.state.subData[index].submenu[i].submenu;
                    for (let j = 0; j < box.length; j++) {
                        subData = this.state.subData
                        if (this.state.shadowActiveMenuArr[index][i].indexOf(j) > -1) {
                            subData[index].submenu[i].submenu[j].selected = true;
                        } else {
                            subData[index].submenu[i].submenu[j].selected = false;
                        }
                        this.setState({
                            subData
                        })
                    }
                }
            } else if (this.state.menu[index].type == 'hierarchy') {
                Taro.nextTick(() => {
                    setTimeout(() => {
                        //滚动到选中项
                        firstScrollInto = this.state.firstScrollInto
                        secondScrollInto = this.state.secondScrollInto
                        firstScrollInto = parseInt(this.state.activeMenuArr[index][0]);
                        secondScrollInto = parseInt(this.state.activeMenuArr[index][1]);
                        this.setState({
                            firstScrollInto,
                            secondScrollInto
                        })
                    }, 0);
                })
            } else if (this.state.menu[index].type == 'radio') {
                //重载筛选页选中状态
                let level = this.state.shadowActiveMenuArr[index].length;
                for (let i = 0; i < level; i++) {
                    let box = this.state.subData[index].submenu[i].submenu;
                    for (let j = 0; j < box.length; j++) {
                        subData = this.state.subData
                        if (this.state.shadowActiveMenuArr[index][i].indexOf(j) > -1) {
                            subData[index].submenu[i].submenu[j].selected = true;
                        } else {
                            subData[index].submenu[i].submenu[j].selected = false;
                        }
                        this.setState({
                            subData
                        })
                    }
                }
            }
        })
    }

    processActive = (tmpitem) => {
        let tmpArr = []
        if (tmpitem.type == 'hierarchy' && tmpitem.hasOwnProperty('submenu') && tmpitem.submenu.length > 0) {
            let level = this.getMaxFloor(tmpitem.submenu);
            while (level > 0) {
                tmpArr.push(0);
                level--;
            }
        } else if (tmpitem.type == 'filter') {
            let level = tmpitem.submenu.length;
            while (level > 0) {
                tmpArr.push([]);
                level--;
            }
        } else if (tmpitem.type == 'radio') {
            let level = tmpitem.submenu.length;
            while (level > 0) {
                tmpArr.push([]);
                level--;
            }
        }
        return tmpArr;
    }

    processSubMenu = (menu) => {
        if (menu.hasOwnProperty('submenu') && menu.submenu.length > 0) {
            for (let i = 0; i < menu.submenu.length; i++) {
                menu.submenu[i] = this.processSubMenu(menu.submenu[i]);
            }
        } else {
            menu.submenu = [];
        }
        return menu;
    }

    //计算菜单层级
    getMaxFloor = (treeData) => {
        let floor = 0
        let max = 0
        function each(data, floor) {
            data.forEach(e => {
                max = floor > max ? floor : max;
                if (e.hasOwnProperty('submenu') && e.submenu.length > 0) {
                    each(e.submenu, floor + 1)
                }
            })
        }
        each(treeData, 1)
        return max;
    }


    render() {
        const { menu, subData, showPage, pageState, activeMenuArr, triangleDeg, isShowMask, maskVisibility, firstScrollInto, secondScrollInto } = this.state
        return (
            <View className='index'>
                <View className="HMfilterDropdown" catchtouchmove={true}>
                    <View className="nav">
                        {
                            menu.map((item, index) => {
                                return (<Fragment key={index}>
                                    <View className={'first-menu' + (showPage == index ? ' on' : '')} onClick={this.togglePage.bind(this, index)}>
                                        <Text className="name">{item.name}</Text>
                                        <Text className="iconfont triangle" style={'transform:rotate(' + triangleDeg[index] + 'deg);'}></Text>
                                    </View>
                                </Fragment>)
                            })
                        }
                    </View>

                    <View className={'mask' + (isShowMask ? ' show' : '') + (maskVisibility != true ? ' hide' : '')} onClick={this.togglePage.bind(this, showPage)}></View>
                    {
                        subData.map((page, page_index) => {
                            return (<Fragment key={page_index}>
                                <View className={'sub-menu-class' + (showPage == page_index ? ' show' : '') + (pageState[page_index] != true ? ' hide' : '')}>
                                    {
                                        (page.type == 'hierarchy' && page.submenu.length > 0 && showPage === page_index) ? (
                                            <Fragment>
                                                <ScrollView className={'sub-menu-list' + (activeMenuArr[page_index].length > 1 ? ' first' : ' alone')}
                                                    scrollY={true} scrollIntoView={'first_id' + firstScrollInto}>
                                                    {
                                                        page.submenu.map((sub, index) => {
                                                            return (
                                                                <Fragment key={index}>
                                                                    <View className={'sub-menu' + (activeMenuArr[page_index][0] == index ? ' on' : '')} id={'first_id' + index} onClick={this.selectHierarchyMenu.bind(this, page_index, index, null, null)}>
                                                                        <View className="menu-name">
                                                                            <Text>{sub.name}</Text>
                                                                            <Text className="iconfont selected"></Text>
                                                                        </View>
                                                                    </View>
                                                                </Fragment>)
                                                        })
                                                    }
                                                </ScrollView>
                                                <Fragment>
                                                    {
                                                        page.submenu.map((sub, index) => {
                                                            return (<Fragment key={index}>
                                                                {
                                                                    (activeMenuArr[page_index][0] == index && sub.submenu.length > 0) ? (
                                                                        <ScrollView className="sub-menu-list not-first" scrollY={true}
                                                                            scrollIntoView={'second_id' + secondScrollInto}>
                                                                            {
                                                                                sub.submenu.map((sub_second, second_index) => {
                                                                                    return (<Fragment key={second_index}>
                                                                                        <View className={'sub-menu' + (activeMenuArr[page_index][1] == second_index ? ' on' : '')} id={'second_id' + second_index}>
                                                                                            <View className="menu-name" onClick={this.selectHierarchyMenu.bind(this, page_index, activeMenuArr[page_index][0], second_index, null)}>
                                                                                                <Text>{sub_second.name}</Text>
                                                                                                <Text className="iconfont selected"></Text>
                                                                                            </View>
                                                                                            {
                                                                                                (sub_second.submenu && sub.submenu.length > 0 && sub_second.submenu.length > 0) ? (
                                                                                                    <View className="more-sub-menu">
                                                                                                        {
                                                                                                            sub_second.submenu.map((sub2, sub2_index) => {
                                                                                                                return (<Fragment key={sub2_index}>
                                                                                                                    {
                                                                                                                        (sub_second.showAllSub || (sub2_index < 8)) ? (
                                                                                                                            <Text className={(activeMenuArr[page_index][1] == second_index && activeMenuArr[page_index][2] == sub2_index) ? 'on' : ''}
                                                                                                                                onClick={this.selectHierarchyMenu.bind(this, page_index, activeMenuArr[page_index][0], second_index, sub2_index)}>{sub2.name}</Text>
                                                                                                                        ) : null
                                                                                                                    }
                                                                                                                    {
                                                                                                                        (sub_second.showAllSub != true && sub2_index == 8 && sub_second.submenu.length > 9) ? (
                                                                                                                            <Text onClick={this.showMoreSub.bind(this, second_index)}>更多<Text className="iconfont triangle"></Text></Text>
                                                                                                                        ) : null
                                                                                                                    }
                                                                                                                </Fragment>)
                                                                                                            })
                                                                                                        }
                                                                                                    </View>
                                                                                                ) : null
                                                                                            }
                                                                                        </View>
                                                                                    </Fragment>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </ScrollView>
                                                                    ) : null
                                                                }
                                                            </Fragment>)
                                                        })
                                                    }
                                                </Fragment>
                                            </Fragment>
                                        ) : null
                                    }
                                    {
                                        (page.type == 'filter') ? (
                                            <Fragment>
                                                <View className="filter">
                                                    <ScrollView className="menu-box" scrollY={true}>
                                                        {
                                                            page.submenu.map((box, box_index) => {
                                                                return (<View className="box" key={box_index}>
                                                                    <View className="title">{box.name}</View>
                                                                    <View className="labels">
                                                                        {
                                                                            box.submenu.map((label, label_index) => {
                                                                                return (<View key={label_index} onClick={this.selectFilterLabel.bind(this, page_index, box_index, label_index)}
                                                                                    className={label.selected ? 'on' : ''}>{label.name}</View>)
                                                                            })
                                                                        }
                                                                    </View>
                                                                </View>)
                                                            })
                                                        }
                                                    </ScrollView>
                                                    <View className="btn-box">
                                                        <View className="reset" onClick={this.resetFilterData.bind(this, page_index)}>重置</View>
                                                        <View className="submit" onClick={this.setFilterData.bind(this, page_index)}>确定</View>
                                                    </View>
                                                </View>
                                            </Fragment>
                                        ) : null
                                    }
                                    {
                                        (page.type == 'radio') ? (
                                            <Fragment>
                                                <View className="filter">
                                                    <ScrollView className="menu-box" scrollY={true}>
                                                        {
                                                            page.submenu.map((box, box_index) => {
                                                                return (<View className="box" key={box_index}>
                                                                    <View className="title">{box.name}</View>
                                                                    <View className="labels">
                                                                        {
                                                                            box.submenu.map((label, label_index) => {
                                                                                return (<View key={label_index} onClick={this.selectRadioLabel.bind(this, page_index, box_index, label_index)}
                                                                                    className={label.selected ? 'on' : ''}>{label.name}</View>)
                                                                            })
                                                                        }
                                                                    </View>
                                                                </View>)
                                                            })
                                                        }
                                                    </ScrollView>
                                                    <View className="btn-box">
                                                        <View className="reset" onClick={this.resetFilterData.bind(this, page_index)}>重置</View>
                                                        <View className="submit" onClick={this.setFilterData.bind(this, page_index)}>确定</View>
                                                    </View>
                                                </View>
                                            </Fragment>
                                        ) : null
                                    }
                                </View>
                            </Fragment>)
                        })
                    }
                </View>
            </View >

        )
    }
}
FilterDropdown.propTypes = {
    filterData: PropTypes.array,
    defaultSelected: PropTypes.array,
    updateMenuName: PropTypes.bool,
    dataFormat: PropTypes.string,
}
FilterDropdown.defaultProps = {
    filterData: [],
    defaultSelected: [],
    updateMenuName: true,
    dataFormat: 'Array',
}