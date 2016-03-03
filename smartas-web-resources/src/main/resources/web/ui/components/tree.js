'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//v1.1.0 - 2016.2.14
+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var assign = _ref.assign;
	var classNames = RC.classNames;
	var Animate = RC.Animate;
	var _React = React;
	var PropTypes = _React.PropTypes;

	function browser(ua) {
		var tem = undefined;
		var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE ' + (tem[1] || '');
		}
		if (M[1] === 'Chrome') {
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
		tem = ua.match(/version\/(\d+)/i);
		if (tem) {
			M.splice(1, 1, tem[1]);
		}
		return M.join(' ');
	}

	// export function getOffset(el) {
	//   const obj = el.getBoundingClientRect();
	//   return {
	//     left: obj.left + document.body.scrollLeft,
	//     top: obj.top + document.body.scrollTop,
	//     width: obj.width,
	//     height: obj.height
	//   };
	// }

	// // iscroll offset
	// offset = function (el) {
	//   var left = -el.offsetLeft,
	//     top = -el.offsetTop;

	//   // jshint -W084
	//   while (el = el.offsetParent) {
	//     left -= el.offsetLeft;
	//     top -= el.offsetTop;
	//   }
	//   // jshint +W084

	//   return {
	//     left: left,
	//     top: top
	//   };
	// }

	function getOffset(ele) {
		var el = ele;
		var _x = 0;
		var _y = 0;
		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	function getChildrenlength(children) {
		var len = 1;
		if (Array.isArray(children)) {
			len = children.length;
		}
		return len;
	}

	function getSiblingPosition(index, len, siblingPosition) {
		if (len === 1) {
			siblingPosition.first = true;
			siblingPosition.last = true;
		} else {
			siblingPosition.first = index === 0;
			siblingPosition.last = index === len - 1;
		}
		return siblingPosition;
	}

	function loopAllChildren(childs, callback) {
		var loop = function loop(children, level) {
			var len = getChildrenlength(children);
			React.Children.forEach(children, function (item, index) {
				var pos = level + '-' + index;
				if (item.props.children && item.type && item.type.isTreeNode) {
					loop(item.props.children, pos);
				}
				callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}));
			});
		};
		loop(childs, 0);
	}

	function filterMinPosition(arr) {
		var a = [];
		arr.forEach(function (item) {
			var b = a.filter(function (i) {
				return item.indexOf(i) === 0 && (item[i.length] === '-' || !item[i.length]);
			});
			if (!b.length) {
				a.push(item);
			}
		});
		return a;
	}
	// console.log(filterMinPosition(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

	function isInclude(smallArray, bigArray) {
		return smallArray.every(function (ii, i) {
			return ii === bigArray[i];
		});
	}
	// console.log(isInclude(['0', '1'], ['0', '10', '1']));

	// TODO 效率差, 需要缓存优化
	function handleCheckState(obj, checkedPositionArr, checkIt) {
		var stripTail = function stripTail(str) {
			var arr = str.match(/(.+)(-[^-]+)$/);
			var st = '';
			if (arr && arr.length === 3) {
				st = arr[1];
			}
			return st;
		};
		// console.log(stripTail('0-101-000'));
		var splitPosition = function splitPosition(pos) {
			return pos.split('-');
		};
		checkedPositionArr.forEach(function (_pos) {
			// 设置子节点，全选或全不选
			var _posArr = splitPosition(_pos);
			Object.keys(obj).forEach(function (i) {
				var iArr = splitPosition(i);
				if (iArr.length > _posArr.length && isInclude(_posArr, iArr)) {
					obj[i].checkPart = false;
					obj[i].checked = checkIt;
				}
			});
			// 循环设置父节点的 选中 或 半选状态
			var loop = function loop(__pos) {
				var _posLen = splitPosition(__pos).length;
				if (_posLen <= 2) {
					// e.g. '0-0', '0-1'
					return;
				}
				var sibling = 0;
				var siblingChecked = 0;
				var parentPosition = stripTail(__pos);
				Object.keys(obj).forEach(function (i) {
					var iArr = splitPosition(i);
					if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
						sibling++;
						if (obj[i].checked) {
							siblingChecked++;
						} else if (obj[i].checkPart) {
							siblingChecked += 0.5;
						}
					}
				});
				var parent = obj[parentPosition];
				// sibling 不会等于0
				// 全不选 - 全选 - 半选
				if (siblingChecked === 0) {
					parent.checked = false;
					parent.checkPart = false;
				} else if (siblingChecked === sibling) {
					parent.checked = true;
					parent.checkPart = false;
				} else {
					parent.checkPart = true;
					parent.checked = false;
				}
				loop(parentPosition);
			};
			loop(_pos);
		});
	}

	function getCheckKeys(treeNodesStates) {
		var checkPartKeys = [];
		var checkedKeys = [];
		var checkedNodes = [];
		var checkedNodesKeys = [];
		Object.keys(treeNodesStates).forEach(function (item) {
			var itemObj = treeNodesStates[item];
			if (itemObj.checked) {
				checkedKeys.push(itemObj.key);
				checkedNodes.push(itemObj.node);
				checkedNodesKeys.push({ key: itemObj.key, node: itemObj.node, pos: item });
			} else if (itemObj.checkPart) {
				checkPartKeys.push(itemObj.key);
			}
		});
		return {
			checkPartKeys: checkPartKeys, checkedKeys: checkedKeys, checkedNodes: checkedNodes, checkedNodesKeys: checkedNodesKeys, treeNodesStates: treeNodesStates
		};
	}

	function getTreeNodesStates(children, checkedKeys, checkIt, unCheckKey) {
		var checkedPosition = [];
		var treeNodesStates = {};
		loopAllChildren(children, function (item, index, pos, newKey, siblingPosition) {
			var checked = false;
			if (checkedKeys.indexOf(newKey) !== -1) {
				checked = true;
				checkedPosition.push(pos);
			}
			treeNodesStates[pos] = {
				node: item,
				key: newKey,
				checked: checked,
				checkPart: false,
				siblingPosition: siblingPosition
			};
		});

		// debugger
		handleCheckState(treeNodesStates, filterMinPosition(checkedPosition.sort()), true);

		if (!checkIt && unCheckKey) {
			var pos = undefined;
			Object.keys(treeNodesStates).forEach(function (item) {
				var itemObj = treeNodesStates[item];
				if (itemObj.key === unCheckKey) {
					pos = item;
					itemObj.checked = checkIt;
					itemObj.checkPart = false;
				}
			});
			handleCheckState(treeNodesStates, [pos], checkIt);
		}

		return getCheckKeys(treeNodesStates);
	}

	var Tree = (function (_React$Component) {
		_inherits(Tree, _React$Component);

		function Tree(props) {
			_classCallCheck(this, Tree);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tree).call(this, props));

			['onKeyDown', 'onCheck'].forEach(function (m) {
				_this[m] = _this[m].bind(_this);
			});
			_this.contextmenuKeys = [];

			_this.state = {
				expandedKeys: _this.getDefaultExpandedKeys(props),
				checkedKeys: _this.getDefaultCheckedKeys(props),
				selectedKeys: _this.getDefaultSelectedKeys(props),
				dragNodesKeys: '',
				dragOverNodeKey: '',
				dropNodeKey: ''
			};
			return _this;
		}

		_createClass(Tree, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
				var checkedKeys = this.getDefaultCheckedKeys(nextProps, true);
				var selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
				var st = {};
				if (expandedKeys) {
					st.expandedKeys = expandedKeys;
				}
				if (checkedKeys) {
					st.checkedKeys = checkedKeys;
				}
				if (selectedKeys) {
					st.selectedKeys = selectedKeys;
				}
				this.setState(st);
			}
		}, {
			key: 'onDragStart',
			value: function onDragStart(e, treeNode) {
				this.dragNode = treeNode;
				this.dragNodesKeys = this.getDragNodes(treeNode);
				var st = {
					dragNodesKeys: this.dragNodesKeys
				};
				var expandedKeys = this.getExpandedKeys(treeNode, false);
				if (expandedKeys) {
					// Controlled expand, save and then reset
					this.getRawExpandedKeys();
					st.expandedKeys = expandedKeys;
				}
				this.setState(st);
				this.props.onDragStart({
					event: e,
					node: treeNode
				});
			}
		}, {
			key: 'onDragEnterGap',
			value: function onDragEnterGap(e, treeNode) {
				// console.log(e.pageY, getOffset(treeNode.refs.selectHandle), treeNode.props.eventKey);
				var offsetTop = getOffset(treeNode.refs.selectHandle).top;
				var offsetHeight = treeNode.refs.selectHandle.offsetHeight;
				var pageY = e.pageY;
				var gapHeight = 2;
				if (pageY > offsetTop + offsetHeight - gapHeight) {
					this.dropPosition = 1;
					return 1;
				}
				if (pageY < offsetTop + gapHeight) {
					this.dropPosition = -1;
					return -1;
				}
				this.dropPosition = 0;
				return 0;
			}
		}, {
			key: 'onDragEnter',
			value: function onDragEnter(e, treeNode) {
				var enterGap = this.onDragEnterGap(e, treeNode);
				if (this.dragNode.props.eventKey === treeNode.props.eventKey && enterGap === 0) {
					this.setState({
						dragOverNodeKey: ''
					});
					return;
				}
				var st = {
					dragOverNodeKey: treeNode.props.eventKey
				};
				var expandedKeys = this.getExpandedKeys(treeNode, true);
				if (expandedKeys) {
					this.getRawExpandedKeys();
					st.expandedKeys = expandedKeys;
				}
				this.setState(st);
				this.props.onDragEnter({
					event: e,
					node: treeNode,
					expandedKeys: expandedKeys && [].concat(_toConsumableArray(expandedKeys)) || [].concat(_toConsumableArray(this.state.expandedKeys))
				});
			}
		}, {
			key: 'onDragOver',
			value: function onDragOver(e, treeNode) {
				this.props.onDragOver({ event: e, node: treeNode });
			}
		}, {
			key: 'onDragLeave',
			value: function onDragLeave(e, treeNode) {
				this.props.onDragLeave({ event: e, node: treeNode });
			}
		}, {
			key: 'onDrop',
			value: function onDrop(e, treeNode) {
				var key = treeNode.props.eventKey;
				this.setState({
					dragOverNodeKey: '',
					dropNodeKey: key
				});
				if (this.dragNodesKeys.indexOf(key) > -1) {
					if (console.warn) {
						console.warn('can not drop to dragNode(include it\'s children node)');
					}
					return false;
				}

				var posArr = treeNode.props.pos.split('-');
				var res = {
					event: e,
					node: treeNode,
					dragNode: this.dragNode,
					dragNodesKeys: [].concat(_toConsumableArray(this.dragNodesKeys)),
					dropPosition: this.dropPosition + Number(posArr[posArr.length - 1])
				};
				if (this.dropPosition !== 0) {
					res.dropToGap = true;
				}
				if ('expandedKeys' in this.props) {
					res.rawExpandedKeys = [].concat(_toConsumableArray(this._rawExpandedKeys)) || [].concat(_toConsumableArray(this.state.expandedKeys));
				}
				this.props.onDrop(res);
			}
		}, {
			key: 'onExpand',
			value: function onExpand(treeNode) {
				var _this2 = this;

				var expand = !treeNode.props.expanded;
				var controlled = 'expandedKeys' in this.props;
				var expandedKeys = [].concat(_toConsumableArray(this.state.expandedKeys));
				var index = expandedKeys.indexOf(treeNode.props.eventKey);
				if (!controlled) {
					if (expand) {
						if (index === -1) {
							expandedKeys.push(treeNode.props.eventKey);
						}
					} else {
						expandedKeys.splice(index, 1);
					}
					this.setState({ expandedKeys: expandedKeys });
					// remember the return object, such as expandedKeys, must clone!!
					// so you can avoid outer code change it.
					this.props.onExpand(treeNode, expand, [].concat(_toConsumableArray(expandedKeys)));
				} else {
					this.props.onExpand(treeNode, !expand, [].concat(_toConsumableArray(expandedKeys)));
				}

				// after data loaded, need set new expandedKeys
				if (expand && this.props.loadData) {
					return this.props.loadData(treeNode).then(function () {
						if (!controlled) {
							_this2.setState({ expandedKeys: expandedKeys });
						}
					});
				}
			}
		}, {
			key: 'onCheck',
			value: function onCheck(treeNode) {
				var checked = !treeNode.props.checked;
				if (treeNode.props.checkPart) {
					checked = true;
				}
				var key = treeNode.key || treeNode.props.eventKey;
				var checkedKeys = [].concat(_toConsumableArray(this.state.checkedKeys));
				if (checked && checkedKeys.indexOf(key) === -1) {
					checkedKeys.push(key);
				}
				var checkKeys = getTreeNodesStates(this.props.children, checkedKeys, checked, key);
				var newSt = {
					event: 'check',
					node: treeNode,
					checked: checked,
					checkedNodes: checkKeys.checkedNodes
				};
				checkedKeys = checkKeys.checkedKeys;
				if (!('checkedKeys' in this.props)) {
					this.setState({
						checkedKeys: checkedKeys
					});
				}
				this.props.onCheck(checkedKeys, newSt);
			}
		}, {
			key: 'onSelect',
			value: function onSelect(treeNode) {
				var props = this.props;
				var selectedKeys = [].concat(_toConsumableArray(this.state.selectedKeys));
				var eventKey = treeNode.props.eventKey;
				var index = selectedKeys.indexOf(eventKey);
				var selected = undefined;
				if (index !== -1) {
					selected = false;
					selectedKeys.splice(index, 1);
				} else {
					selected = true;
					if (!props.multiple) {
						selectedKeys.length = 0;
					}
					selectedKeys.push(eventKey);
				}
				var selectedNodes = [];
				if (selectedKeys.length) {
					loopAllChildren(this.props.children, function (item) {
						if (selectedKeys.indexOf(item.key) !== -1) {
							selectedNodes.push(item);
						}
					});
				}
				var newSt = {
					event: 'select',
					node: treeNode,
					selected: selected,
					selectedNodes: selectedNodes
				};
				if (!('selectedKeys' in this.props)) {
					this.setState({
						selectedKeys: selectedKeys
					});
				}
				props.onSelect(selectedKeys, newSt);
			}
		}, {
			key: 'onMouseEnter',
			value: function onMouseEnter(e, treeNode) {
				this.props.onMouseEnter({ event: e, node: treeNode });
			}
		}, {
			key: 'onMouseLeave',
			value: function onMouseLeave(e, treeNode) {
				this.props.onMouseLeave({ event: e, node: treeNode });
			}
		}, {
			key: 'onContextMenu',
			value: function onContextMenu(e, treeNode) {
				var selectedKeys = [].concat(_toConsumableArray(this.state.selectedKeys));
				var eventKey = treeNode.props.eventKey;
				if (this.contextmenuKeys.indexOf(eventKey) === -1) {
					this.contextmenuKeys.push(eventKey);
				}
				this.contextmenuKeys.forEach(function (key) {
					var index = selectedKeys.indexOf(key);
					if (index !== -1) {
						selectedKeys.splice(index, 1);
					}
				});
				if (selectedKeys.indexOf(eventKey) === -1) {
					selectedKeys.push(eventKey);
				}
				this.setState({
					selectedKeys: selectedKeys
				});
				this.props.onRightClick({ event: e, node: treeNode });
			}

			// all keyboard events callbacks run from here at first

		}, {
			key: 'onKeyDown',
			value: function onKeyDown(e) {
				e.preventDefault();
			}
		}, {
			key: 'getFilterExpandedKeys',
			value: function getFilterExpandedKeys(props) {
				var defaultExpandedKeys = props.defaultExpandedKeys;
				var expandedPositionArr = [];
				if (props.autoExpandParent) {
					loopAllChildren(props.children, function (item, index, pos, newKey) {
						if (defaultExpandedKeys.indexOf(newKey) > -1) {
							expandedPositionArr.push(pos);
						}
					});
				}
				var filterExpandedKeys = [];
				loopAllChildren(props.children, function (item, index, pos, newKey) {
					if (props.defaultExpandAll) {
						filterExpandedKeys.push(newKey);
					} else if (props.autoExpandParent) {
						expandedPositionArr.forEach(function (p) {
							if ((p.split('-').length > pos.split('-').length && isInclude(pos.split('-'), p.split('-')) || pos === p) && filterExpandedKeys.indexOf(newKey) === -1) {
								filterExpandedKeys.push(newKey);
							}
						});
					}
				});
				return filterExpandedKeys.length ? filterExpandedKeys : defaultExpandedKeys;
			}
		}, {
			key: 'getDefaultExpandedKeys',
			value: function getDefaultExpandedKeys(props, willReceiveProps) {
				var expandedKeys = willReceiveProps ? undefined : this.getFilterExpandedKeys(props);
				if ('expandedKeys' in props) {
					expandedKeys = props.expandedKeys || [];
				}
				return expandedKeys;
			}
		}, {
			key: 'getDefaultCheckedKeys',
			value: function getDefaultCheckedKeys(props, willReceiveProps) {
				var checkedKeys = willReceiveProps ? undefined : props.defaultCheckedKeys;
				if ('checkedKeys' in props) {
					checkedKeys = props.checkedKeys || [];
				}
				return checkedKeys;
			}
		}, {
			key: 'getDefaultSelectedKeys',
			value: function getDefaultSelectedKeys(props, willReceiveProps) {
				var getKeys = function getKeys(keys) {
					if (props.multiple) {
						return [].concat(_toConsumableArray(keys));
					}
					if (keys.length) {
						return [keys[0]];
					}
					return keys;
				};
				var selectedKeys = willReceiveProps ? undefined : getKeys(props.defaultSelectedKeys);
				if ('selectedKeys' in props) {
					selectedKeys = getKeys(props.selectedKeys);
				}
				return selectedKeys;
			}
		}, {
			key: 'getRawExpandedKeys',
			value: function getRawExpandedKeys() {
				if (!this._rawExpandedKeys && 'expandedKeys' in this.props) {
					this._rawExpandedKeys = [].concat(_toConsumableArray(this.state.expandedKeys));
				}
			}
		}, {
			key: 'getOpenTransitionName',
			value: function getOpenTransitionName() {
				var props = this.props;
				var transitionName = props.openTransitionName;
				var animationName = props.openAnimation;
				if (!transitionName && typeof animationName === 'string') {
					transitionName = props.prefixCls + '-open-' + animationName;
				}
				return transitionName;
			}
		}, {
			key: 'getDragNodes',
			value: function getDragNodes(treeNode) {
				var dragNodesKeys = [];
				var tPArr = treeNode.props.pos.split('-');
				loopAllChildren(this.props.children, function (item, index, pos, newKey) {
					var pArr = pos.split('-');
					if (treeNode.props.pos === pos || tPArr.length < pArr.length && isInclude(tPArr, pArr)) {
						dragNodesKeys.push(newKey);
					}
				});
				return dragNodesKeys;
			}
		}, {
			key: 'getExpandedKeys',
			value: function getExpandedKeys(treeNode, expand) {
				var key = treeNode.props.eventKey;
				var expandedKeys = this.state.expandedKeys;
				var expandedIndex = expandedKeys.indexOf(key);
				var exKeys = undefined;
				if (expandedIndex > -1 && !expand) {
					exKeys = [].concat(_toConsumableArray(expandedKeys));
					exKeys.splice(expandedIndex, 1);
					return exKeys;
				}
				if (expand && expandedKeys.indexOf(key) === -1) {
					return expandedKeys.concat([key]);
				}
			}
		}, {
			key: 'filterTreeNode',
			value: function filterTreeNode(treeNode) {
				var ftn = this.props.filterTreeNode;
				if (typeof ftn !== 'function' || treeNode.props.disabled) {
					return false;
				}
				return ftn.call(this, treeNode);
			}
		}, {
			key: 'renderTreeNode',
			value: function renderTreeNode(child, index) {
				var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

				var pos = level + '-' + index;
				var key = child.key || pos;
				var state = this.state;
				var props = this.props;
				var cloneProps = {
					ref: 'treeNode-' + key,
					root: this,
					eventKey: key,
					pos: pos,
					selectable: props.selectable,
					loadData: props.loadData,
					onMouseEnter: props.onMouseEnter,
					onMouseLeave: props.onMouseLeave,
					onRightClick: props.onRightClick,
					prefixCls: props.prefixCls,
					showLine: props.showLine,
					showIcon: props.showIcon,
					checkable: props.checkable,
					draggable: props.draggable,
					dragOver: state.dragOverNodeKey === key && this.dropPosition === 0,
					dragOverGapTop: state.dragOverNodeKey === key && this.dropPosition === -1,
					dragOverGapBottom: state.dragOverNodeKey === key && this.dropPosition === 1,
					expanded: state.expandedKeys.indexOf(key) !== -1,
					selected: state.selectedKeys.indexOf(key) !== -1,
					checked: this.checkedKeys.indexOf(key) !== -1,
					checkPart: this.checkPartKeys.indexOf(key) !== -1,
					openTransitionName: this.getOpenTransitionName(),
					openAnimation: props.openAnimation,
					filterTreeNode: this.filterTreeNode.bind(this)
				};
				if (this.treeNodesStates[pos]) {
					assign(cloneProps, this.treeNodesStates[pos].siblingPosition);
				}
				return React.cloneElement(child, cloneProps);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var domProps = {
					className: classNames(props.className, props.prefixCls),
					role: 'tree-node'
				};
				if (props.focusable) {
					domProps.tabIndex = '0';
					domProps.onKeyDown = this.onKeyDown;
				}
				// console.log(this.state.expandedKeys, this._rawExpandedKeys, props.children);
				var checkKeys = getTreeNodesStates(props.children, this.state.checkedKeys, true);
				this.checkPartKeys = checkKeys.checkPartKeys;
				this.checkedKeys = checkKeys.checkedKeys;
				this.treeNodesStates = checkKeys.treeNodesStates;

				return React.createElement(
					'ul',
					_extends({}, domProps, { unselectable: true, ref: 'tree' }),
					React.Children.map(props.children, this.renderTreeNode, this)
				);
			}
		}]);

		return Tree;
	})(React.Component);

	Tree.propTypes = {
		prefixCls: PropTypes.string,
		children: PropTypes.any,
		showLine: PropTypes.bool,
		showIcon: PropTypes.bool,
		selectable: PropTypes.bool,
		multiple: PropTypes.bool,
		checkable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
		draggable: PropTypes.bool,
		autoExpandParent: PropTypes.bool,
		defaultExpandAll: PropTypes.bool,
		expandedKeys: PropTypes.arrayOf(PropTypes.string),
		defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
		checkedKeys: PropTypes.arrayOf(PropTypes.string),
		defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
		selectedKeys: PropTypes.arrayOf(PropTypes.string),
		defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
		onExpand: PropTypes.func,
		onCheck: PropTypes.func,
		onSelect: PropTypes.func,
		loadData: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onRightClick: PropTypes.func,
		onDragStart: PropTypes.func,
		onDragEnter: PropTypes.func,
		onDragOver: PropTypes.func,
		onDragLeave: PropTypes.func,
		onDrop: PropTypes.func,
		filterTreeNode: PropTypes.func,
		openTransitionName: PropTypes.string,
		openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	};

	Tree.defaultProps = {
		prefixCls: 'rc-tree',
		showLine: false,
		showIcon: true,
		selectable: true,
		multiple: false,
		checkable: false,
		draggable: false,
		autoExpandParent: true,
		defaultExpandAll: false,
		defaultExpandedKeys: [],
		defaultCheckedKeys: [],
		defaultSelectedKeys: [],
		onExpand: noop,
		onCheck: noop,
		onSelect: noop,
		onDragStart: noop,
		onDragEnter: noop,
		onDragOver: noop,
		onDragLeave: noop,
		onDrop: noop
	};

	var browserUa = browser(window.navigator.userAgent || '');
	var ieOrEdge = /.*(IE|Edge).+/.test(browserUa);
	// const uaArray = browserUa.split(' ');
	// const gtIE8 = uaArray.length !== 2 || uaArray[0].indexOf('IE') === -1 || Number(uaArray[1]) > 8;

	var defaultTitle = '---';

	var TreeNode = (function (_React$Component2) {
		_inherits(TreeNode, _React$Component2);

		function TreeNode(props) {
			_classCallCheck(this, TreeNode);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeNode).call(this, props));

			['onExpand', 'onCheck', 'onContextMenu', 'onMouseEnter', 'onMouseLeave', 'onDragStart', 'onDragEnter', 'onDragOver', 'onDragLeave', 'onDrop'].forEach(function (m) {
				_this3[m] = _this3[m].bind(_this3);
			});
			_this3.state = {
				dataLoading: false,
				dragNodeHighlight: false
			};
			return _this3;
		}

		_createClass(TreeNode, [{
			key: 'onCheck',
			value: function onCheck() {
				this.props.root.onCheck(this);
			}
		}, {
			key: 'onSelect',
			value: function onSelect() {
				this.props.root.onSelect(this);
			}
		}, {
			key: 'onMouseEnter',
			value: function onMouseEnter(e) {
				e.preventDefault();
				this.props.root.onMouseEnter(e, this);
			}
		}, {
			key: 'onMouseLeave',
			value: function onMouseLeave(e) {
				e.preventDefault();
				this.props.root.onMouseLeave(e, this);
			}
		}, {
			key: 'onContextMenu',
			value: function onContextMenu(e) {
				e.preventDefault();
				this.props.root.onContextMenu(e, this);
			}
		}, {
			key: 'onDragStart',
			value: function onDragStart(e) {
				// console.log('dragstart', this.props.eventKey, e);
				// e.preventDefault();
				e.stopPropagation();
				this.setState({
					dragNodeHighlight: true
				});
				this.props.root.onDragStart(e, this);
				try {
					// ie throw error
					e.dataTransfer.setData('text/plain', 'firefox-need-it');
				} finally {
					// empty
				}
			}
		}, {
			key: 'onDragEnter',
			value: function onDragEnter(e) {
				// console.log('dragenter', this.props.eventKey, e);
				e.preventDefault();
				e.stopPropagation();
				this.props.root.onDragEnter(e, this);
			}
		}, {
			key: 'onDragOver',
			value: function onDragOver(e) {
				// console.log(this.props.eventKey, e);
				// todo disabled
				e.preventDefault();
				e.stopPropagation();
				this.props.root.onDragOver(e, this);
				return false;
			}
		}, {
			key: 'onDragLeave',
			value: function onDragLeave(e) {
				// console.log(this.props.eventKey, e);
				e.stopPropagation();
				this.props.root.onDragLeave(e, this);
			}
		}, {
			key: 'onDrop',
			value: function onDrop(e) {
				e.preventDefault();
				e.stopPropagation();
				this.setState({
					dragNodeHighlight: false
				});
				this.props.root.onDrop(e, this);
			}
		}, {
			key: 'onExpand',
			value: function onExpand() {
				var _this4 = this;

				var callbackPromise = this.props.root.onExpand(this);
				if (callbackPromise && (typeof callbackPromise === 'undefined' ? 'undefined' : _typeof(callbackPromise)) === 'object') {
					(function () {
						var setLoading = function setLoading(dataLoading) {
							_this4.setState({ dataLoading: dataLoading });
						};
						setLoading(true);
						callbackPromise.then(function () {
							setLoading(false);
						}, function () {
							setLoading(false);
						});
					})();
				}
			}

			// keyboard event support

		}, {
			key: 'onKeyDown',
			value: function onKeyDown(e) {
				e.preventDefault();
			}
		}, {
			key: 'renderSwitcher',
			value: function renderSwitcher(props, expandedState) {
				var prefixCls = props.prefixCls;
				var switcherCls = _defineProperty({}, prefixCls + '-switcher', true);
				if (!props.showLine) {
					switcherCls[prefixCls + '-noline_' + expandedState] = true;
				} else if (props.pos === '0-0') {
					switcherCls[prefixCls + '-roots_' + expandedState] = true;
				} else {
					switcherCls[prefixCls + '-center_' + expandedState] = !props.last;
					switcherCls[prefixCls + '-bottom_' + expandedState] = props.last;
				}
				if (props.disabled) {
					switcherCls[prefixCls + '-switcher-disabled'] = true;
					return React.createElement('span', { className: classNames(switcherCls) });
				}
				return React.createElement('span', { className: classNames(switcherCls), onClick: this.onExpand });
			}
		}, {
			key: 'renderCheckbox',
			value: function renderCheckbox(props) {
				var prefixCls = props.prefixCls;
				var checkboxCls = _defineProperty({}, prefixCls + '-checkbox', true);
				if (props.checkPart) {
					checkboxCls[prefixCls + '-checkbox-indeterminate'] = true;
				} else if (props.checked) {
					checkboxCls[prefixCls + '-checkbox-checked'] = true;
				}
				var customEle = null;
				if (typeof props.checkable !== 'boolean') {
					customEle = props.checkable;
				}
				if (props.disabled || props.disableCheckbox) {
					checkboxCls[prefixCls + '-checkbox-disabled'] = true;
					return React.createElement(
						'span',
						{ ref: 'checkbox', className: classNames(checkboxCls) },
						customEle
					);
				}
				return React.createElement(
					'span',
					{ ref: 'checkbox', className: classNames(checkboxCls), onClick: this.onCheck },
					customEle
				);
			}
		}, {
			key: 'renderChildren',
			value: function renderChildren(props) {
				var renderFirst = this.renderFirst;
				this.renderFirst = 1;
				var transitionAppear = true;
				if (!renderFirst && props.expanded) {
					transitionAppear = false;
				}
				var children = props.children;
				var newChildren = children;
				var allTreeNode = undefined;
				if (Array.isArray(children)) {
					allTreeNode = children.every(function (item) {
						return item.type === TreeNode;
					});
				}
				if (children && (children.type === TreeNode || allTreeNode)) {
					var _cls;

					var cls = (_cls = {}, _defineProperty(_cls, props.prefixCls + '-child-tree', true), _defineProperty(_cls, props.prefixCls + '-child-tree-open', props.expanded), _cls);
					if (props.showLine) {
						cls[props.prefixCls + '-line'] = !props.last;
					}
					var animProps = {};
					if (props.openTransitionName) {
						animProps.transitionName = props.openTransitionName;
					} else if (_typeof(props.openAnimation) === 'object') {
						animProps.animation = assign({}, props.openAnimation);
						if (!transitionAppear) {
							delete animProps.animation.appear;
						}
					}
					newChildren = React.createElement(
						Animate,
						_extends({}, animProps, {
							showProp: 'expanded',
							transitionAppear: transitionAppear,
							component: '' }),
						React.createElement(
							'ul',
							{ className: classNames(cls), expanded: props.expanded },
							React.Children.map(children, function (item, index) {
								return props.root.renderTreeNode(item, index, props.pos);
							}, props.root)
						)
					);
				}
				return newChildren;
			}
		}, {
			key: 'render',
			value: function render() {
				var _iconEleCls,
				    _this5 = this;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var expandedState = props.expanded ? 'open' : 'close';

				var iconEleCls = (_iconEleCls = {}, _defineProperty(_iconEleCls, prefixCls + '-iconEle', true), _defineProperty(_iconEleCls, prefixCls + '-icon_loading', this.state.dataLoading), _defineProperty(_iconEleCls, prefixCls + '-icon__' + expandedState, true), _iconEleCls);

				var canRenderSwitcher = true;
				var content = props.title;
				var newChildren = this.renderChildren(props);
				if (!newChildren || newChildren === props.children) {
					// content = newChildren;
					newChildren = null;
					if (!props.loadData || props.isLeaf) {
						canRenderSwitcher = false;
					}
				}

				var selectHandle = function selectHandle() {
					var icon = props.showIcon || props.loadData && _this5.state.dataLoading ? React.createElement('span', { className: classNames(iconEleCls) }) : null;
					var title = React.createElement(
						'span',
						{ className: prefixCls + '-title' },
						content
					);
					var domProps = {};
					if (!props.disabled) {
						if (props.selected || _this5.state.dragNodeHighlight) {
							domProps.className = prefixCls + '-node-selected';
						}
						domProps.onClick = function (e) {
							e.preventDefault();
							if (props.selectable) {
								_this5.onSelect();
							}
							// not fire check event
							// if (props.checkable) {
							//   this.onCheck();
							// }
						};
						if (props.onRightClick) {
							domProps.onContextMenu = _this5.onContextMenu;
						}
						if (props.onMouseEnter) {
							domProps.onMouseEnter = _this5.onMouseEnter;
						}
						if (props.onMouseLeave) {
							domProps.onMouseLeave = _this5.onMouseLeave;
						}
						if (props.draggable) {
							if (ieOrEdge) {
								// ie bug!
								domProps.href = '#';
							}
							domProps.draggable = true;
							domProps['aria-grabbed'] = true;
							domProps.onDragStart = _this5.onDragStart;
						}
					}
					return React.createElement(
						'a',
						_extends({ ref: 'selectHandle', title: typeof content === 'string' ? content : '' }, domProps),
						icon,
						title
					);
				};

				var liProps = {};
				if (props.draggable) {
					liProps.onDragEnter = this.onDragEnter;
					liProps.onDragOver = this.onDragOver;
					liProps.onDragLeave = this.onDragLeave;
					liProps.onDrop = this.onDrop;
				}

				var disabledCls = '';
				var dragOverCls = '';
				if (props.disabled) {
					disabledCls = prefixCls + '-treenode-disabled';
				} else if (props.dragOver) {
					dragOverCls = 'drag-over';
				} else if (props.dragOverGapTop) {
					dragOverCls = 'drag-over-gap-top';
				} else if (props.dragOverGapBottom) {
					dragOverCls = 'drag-over-gap-bottom';
				}

				var filterCls = props.filterTreeNode(this) ? 'filter-node' : '';

				var noopSwitcher = function noopSwitcher() {
					var _cls2;

					var cls = (_cls2 = {}, _defineProperty(_cls2, prefixCls + '-switcher', true), _defineProperty(_cls2, prefixCls + '-switcher-noop', true), _cls2);
					if (props.showLine) {
						cls[prefixCls + '-center_docu'] = !props.last;
						cls[prefixCls + '-bottom_docu'] = props.last;
					} else {
						cls[prefixCls + '-noline_docu'] = true;
					}
					return React.createElement('span', { className: classNames(cls) });
				};

				return React.createElement(
					'li',
					_extends({}, liProps, { ref: 'li', className: classNames(props.className, disabledCls, dragOverCls, filterCls) }),
					canRenderSwitcher ? this.renderSwitcher(props, expandedState) : noopSwitcher(),
					props.checkable ? this.renderCheckbox(props) : null,
					selectHandle(),
					newChildren
				);
			}
		}]);

		return TreeNode;
	})(React.Component);

	TreeNode.isTreeNode = 1;

	TreeNode.propTypes = {
		prefixCls: PropTypes.string,
		disabled: PropTypes.bool,
		disableCheckbox: PropTypes.bool,
		expanded: PropTypes.bool,
		isLeaf: PropTypes.bool,
		root: PropTypes.object,
		onSelect: PropTypes.func
	};

	TreeNode.defaultProps = {
		title: defaultTitle
	};

	Tree.TreeNode = TreeNode;
	RC.TreeNode = TreeNode;
	RC.Tree = Tree;
})(Smart.RC);