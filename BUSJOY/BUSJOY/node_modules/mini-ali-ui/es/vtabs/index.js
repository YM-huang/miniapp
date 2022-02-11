import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import fmtUnit from '../_util/fmtUnit';
Component({
  data: {
    tabTop: 0,
    wrapScrollTop: {
      _v: 0
    },
    besideRadius: fmtUnit('8px')
  },
  props: {
    activeTab: 0,
    className: '',
    tabs: [],
    animated: false,
    swipeable: true,
    tabBarActiveTextColor: '#1677FF',
    tabBarInactiveTextColor: '#333333',
    tabBarActiveBgColor: '#ffffff',
    tabBarInactiveBgColor: '#f5f5f5',
    tabBarlineColor: '#1677FF',
    sameFontSize: true,
    tabBarlineShow: true,
    onTabClick: function onTabClick() {},
    onScrollBar: function onScrollBar() {}
  },
  didMount: function didMount() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.isScrolling = false;
              _this.onlyChangeTab = false;
              _this.timerId = null;
              _context.next = 5;
              return _this.calcHeight();

            case 5:
              _this.setData({
                wrapScrollTop: {
                  _v: _this.anchorMap[_this.props.tabs[_this.props.activeTab].anchor]
                }
              });

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  didUpdate: function didUpdate(prevProps) {
    var activeTab = this.props.activeTab;

    if (this.props.tabs.length !== prevProps.tabs.length || activeTab !== prevProps.activeTab) {
      this.calcHeight();
    }
  },
  didUnmount: function didUnmount() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  },
  methods: {
    onWrapTouch: function onWrapTouch() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this2.calcHeight();

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    calcHeight: function calcHeight() {
      var _this3 = this;

      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var activeTab, tabs, rects, prevHeight, i, height, _rects;

        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                activeTab = _this3.props.activeTab;
                _this3.anchorMap = {};
                _this3.indexMap = {};
                _this3.indexTop = {};
                _this3.wrapHeight = 0;
                _this3.scrollWrapHeight = 0;

                _this3.setData({
                  currentBefore: activeTab - 1,
                  currentAfter: activeTab + 1
                });

                _context3.next = 9;
                return new Promise(function (resolve) {
                  my.createSelectorQuery().select(".am-vtabs-slides-" + _this3.$id).boundingClientRect().exec(function (ret) {
                    if (ret && ret[0]) {
                      _this3.wrapHeight = ret[0].height;
                      resolve();
                    }
                  });
                });

              case 9:
                tabs = _this3.props.tabs || [];
                _context3.next = 12;
                return new Promise(function (resolve) {
                  my.createSelectorQuery().selectAll(tabs.map(function (tab) {
                    return "#am-vtab-slide-" + tab.anchor;
                  }).join(',')).boundingClientRect().exec(function (res) {
                    if (res && res[0]) {
                      resolve(res[0].sort(function (a, b) {
                        return a.top - b.top;
                      }));
                    }
                  });
                });

              case 12:
                rects = _context3.sent;
                prevHeight = 0;

                for (i = 0; i < tabs.length; i += 1) {
                  height = rects[i].height;
                  _this3.anchorMap[tabs[i].anchor] = prevHeight;
                  _this3.indexMap[i] = height;

                  if (i === 0) {
                    _this3.indexTop[0] = 0;
                  } else {
                    _this3.indexTop[i] = _this3.indexTop[i - 1] + Math.floor((_rects = rects[i - 1]) == null ? void 0 : _rects.height);
                  }

                  prevHeight += Math.floor(height);
                  _this3.scrollWrapHeight = prevHeight;
                }

              case 15:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    handleTabClick: function handleTabClick(e) {
      var index = e.target.dataset.index;

      if (!this.isScrolling || !this.props.swipeable || this.onlyChangeTab) {
        if (this.props.activeTab !== index) {
          this.props.onTabClick(index);
        }

        this.setData({
          wrapScrollTop: {
            _v: this.indexTop[index]
          }
        });
        this.moveScrollBar(index);
      }
    },
    moveScrollBar: function moveScrollBar(current) {
      var tabTop; // tabTop 用来控制侧边 tab 的 scroll-view 滚动位置

      if (current < 6) {
        tabTop = 0;
      } else {
        tabTop = (current - 5) * 55;
      } // tab-content 滚动时，对侧边 tab 的影响


      if (this.props.activeTab !== current) {
        if (this.props.onChange) {
          this.props.onChange(current);
        } else {
          this.props.onScrollBar(current);
        }
      }

      this.setData({
        tabTop: tabTop,
        current: current,
        currentBefore: current - 1,
        currentAfter: current + 1
      });
    },
    onScroll: function onScroll(e) {
      var _this4 = this;

      var scrollTop = e.detail.scrollTop;
      var keys = Object.keys(this.anchorMap);

      if (this.timerId) {
        clearTimeout(this.timerId);
        this.timerId = null;
      }

      this.timerId = setTimeout(function () {
        _this4.isScrolling = false;
      }, 300);
      var anchorLength = keys.length;

      for (var i = 0; i < anchorLength; i++) {
        if (i === anchorLength - 1) {
          // 如果是最后一个只需满足scrollTop高于当前vtab-content的高度
          if (scrollTop >= this.anchorMap[keys[i]]) {
            this.moveScrollBar(i);
            break;
          }
        }

        if (scrollTop >= this.anchorMap[keys[i]] && scrollTop < this.anchorMap[keys[i + 1]]) {
          // 如果每个vtab-content高度小于scroll-view高度，到达底部后就不需要根据scrollTop再去判断左侧的选择项
          if (scrollTop + this.wrapHeight < this.scrollWrapHeight) {
            this.moveScrollBar(i);
          }

          break;
        }
      }
    },
    onWrapTouchMove: function onWrapTouchMove() {
      if (this.props.swipeable) {
        this.isScrolling = true;
        this.onlyChangeTab = true;
      }
    },
    onTabFirstShow: function onTabFirstShow(e) {
      // SDKversion 最低要求 1.9.4
      var _e$target$dataset = e.target.dataset,
          index = _e$target$dataset.index,
          anchor = _e$target$dataset.anchor;

      if (this.props.onTabFirstShow) {
        this.props.onTabFirstShow({
          index: index,
          anchor: anchor
        });
      }
    }
  }
});