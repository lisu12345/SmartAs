'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//v1.1.5 - 2016.2.14
+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var assign = _ref.assign;
	var classnames = RC.classnames;
	var Animate = RC.Animate;
	var KeyCode = RC.KeyCode;
	var Tree = RC.Tree;
	var TreeNode = RC.TreeNode;
	var Trigger = RC.Trigger;
	var _React = React;
	var PropTypes = _React.PropTypes;

	function getValuePropValue(child) {
		var props = child.props;
		if ('value' in props) {
			return props.value;
		}
		if (child.key) {
			return child.key;
		}
		throw new Error('no key or value for ' + child);
	}

	function getPropValue(child, prop) {
		if (prop === 'value') {
			return getValuePropValue(child);
		}
		return child.props[prop];
	}

	function isCombobox(props) {
		return props.combobox;
	}

	function isMultipleOrTags(props) {
		return props.multiple || props.tags || props.treeCheckable;
	}

	function isMultipleOrTagsOrCombobox(props) {
		return isMultipleOrTags(props) || isCombobox(props);
	}

	function isSingleMode(props) {
		return !isMultipleOrTagsOrCombobox(props);
	}

	function toArray(value) {
		var ret = value;
		if (value === undefined) {
			ret = [];
		} else if (!Array.isArray(value)) {
			ret = [value];
		}
		return ret;
	}

	function isInclude(smallArray, bigArray) {
		// attention: [0,0,1] [0,0,10]
		return smallArray.every(function (ii, i) {
			return ii === bigArray[i];
		});
	}
	function getCheckedKeys(node, checkedKeys, allCheckedNodesKeys) {
		var nodeKey = node.props.eventKey;
		var newCks = [].concat(_toConsumableArray(checkedKeys));
		var nodePos = undefined;
		var unCheck = allCheckedNodesKeys.some(function (item) {
			if (item.key === nodeKey) {
				nodePos = item.pos;
				return true;
			}
		});
		if (unCheck) {
			(function () {
				var nArr = nodePos.split('-');
				newCks = [];
				allCheckedNodesKeys.forEach(function (item) {
					var iArr = item.pos.split('-');
					if (item.pos === nodePos || nArr.length > iArr.length && isInclude(iArr, nArr) || nArr.length < iArr.length && isInclude(nArr, iArr)) {
						// 过滤掉 父级节点 和 所有子节点。
						// 因为 node节点 不选时，其 父级节点 和 所有子节点 都不选。
						return;
					}
					newCks.push(item.key);
				});
			})();
		} else {
			newCks.push(nodeKey);
		}
		return newCks;
	}

	function loopAllChildren(childs, callback) {
		var loop = function loop(children, level) {
			React.Children.forEach(children, function (item, index) {
				var pos = level + '-' + index;
				if (item.props.children) {
					loop(item.props.children, pos);
				}
				callback(item, index, pos, getValuePropValue(item));
			});
		};
		loop(childs, 0);
	}

	function filterMinPos(arr) {
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
	// console.log(filterMinPos(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

	function handleCheckState(obj, checkedPosArr, checkIt) {
		var stripTail = function stripTail(str) {
			var arr = str.match(/(.+)(-[^-]+)$/);
			var st = '';
			if (arr && arr.length === 3) {
				st = arr[1];
			}
			return st;
		};
		// stripTail('x-xx-sss-xx')
		var splitPos = function splitPos(pos) {
			return pos.split('-');
		};
		checkedPosArr.forEach(function (_pos) {
			// 设置子节点，全选或全不选
			Object.keys(obj).forEach(function (i) {
				if (splitPos(i).length > splitPos(_pos).length && i.indexOf(_pos) === 0) {
					obj[i].checkPart = false;
					obj[i].checked = checkIt;
				}
			});
			// 循环设置父节点的 选中 或 半选状态
			var loop = function loop(__pos) {
				var _posLen = splitPos(__pos).length;
				if (_posLen <= 2) {
					// e.g. '0-0', '0-1'
					return;
				}
				var sibling = 0;
				var siblingChecked = 0;
				var parentPos = stripTail(__pos);
				Object.keys(obj).forEach(function (i) {
					if (splitPos(i).length === _posLen && i.indexOf(parentPos) === 0) {
						sibling++;
						if (obj[i].checked) {
							siblingChecked++;
						} else if (obj[i].checkPart) {
							siblingChecked += 0.5;
						}
					}
				});
				var parent = obj[parentPos];
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
				loop(parentPos);
			};
			loop(_pos);
		});
	}

	function getCheckValues(treeNodesStates) {
		var checkedValues = [];
		Object.keys(treeNodesStates).forEach(function (item) {
			var itemObj = treeNodesStates[item];
			if (itemObj.checked && !itemObj.node.props.children) {
				checkedValues.push(getValuePropValue(itemObj.node));
			}
		});
		return {
			checkedValues: checkedValues
		};
	}

	function getTreeNodesStates(children, values) {
		var checkedPos = [];
		var treeNodesStates = {};
		loopAllChildren(children, function (item, index, pos, value) {
			var checked = false;
			if (values.indexOf(value) !== -1) {
				checked = true;
				checkedPos.push(pos);
			}
			treeNodesStates[pos] = {
				node: item,
				checked: checked,
				checkPart: false
			};
		});

		handleCheckState(treeNodesStates, filterMinPos(checkedPos.sort()), true);

		return getCheckValues(treeNodesStates);
	}

	var _TreeNode = (function (_React$Component) {
		_inherits(_TreeNode, _React$Component);

		function _TreeNode() {
			_classCallCheck(this, _TreeNode);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(_TreeNode).apply(this, arguments));
		}

		return _TreeNode;
	})(React.Component);

	_TreeNode.propTypes = {
		value: React.PropTypes.string
	};

	var BUILT_IN_PLACEMENTS = {
		bottomLeft: {
			points: ['tl', 'bl'],
			offset: [0, 4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		},
		topLeft: {
			points: ['bl', 'tl'],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		}
	};

	var SelectTrigger = React.createClass({
		displayName: 'SelectTrigger',

		propTypes: {
			dropdownMatchSelectWidth: PropTypes.bool,
			visible: PropTypes.bool,
			filterTreeNode: PropTypes.any,
			treeNodes: PropTypes.any,
			prefixCls: PropTypes.string,
			popupClassName: PropTypes.string,
			children: PropTypes.any
		},

		componentDidUpdate: function componentDidUpdate() {
			if (this.props.dropdownMatchSelectWidth && this.props.visible) {
				var dropdownDOMNode = this.getPopupDOMNode();
				if (dropdownDOMNode) {
					dropdownDOMNode.style.width = ReactDOM.findDOMNode(this).offsetWidth + 'px';
				}
			}
		},
		getPopupEleRefs: function getPopupEleRefs() {
			return this.popupEle && this.popupEle.refs;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		getDropdownTransitionName: function getDropdownTransitionName() {
			var props = this.props;
			var transitionName = props.transitionName;
			if (!transitionName && props.animation) {
				transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
			}
			return transitionName;
		},
		getDropdownPrefixCls: function getDropdownPrefixCls() {
			return this.props.prefixCls + '-dropdown';
		},
		filterTree: function filterTree(treeNode) {
			var props = this.props;
			return props.inputValue && treeNode.props[props.treeNodeFilterProp].indexOf(props.inputValue) > -1;
		},
		filterTreeNode: function filterTreeNode(input, child) {
			if (!input) {
				return true;
			}
			var filterTreeNode = this.props.filterTreeNode;
			if (!filterTreeNode) {
				return true;
			}
			if (child.props.disabled) {
				return false;
			}
			return filterTreeNode.call(this, input, child);
		},
		savePopupElement: function savePopupElement(ele) {
			this.popupEle = ele;
		},
		renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren(children) {
			var _this2 = this;

			var posArr = [];
			var filterPos = [];
			var props = this.props;
			var inputValue = props.inputValue;

			loopAllChildren(children, function (child, index, pos) {
				if (_this2.filterTreeNode(inputValue, child)) {
					posArr.push(pos);
				}
			});
			posArr = filterMinPos(posArr);

			var filterChildren = {};
			loopAllChildren(children, function (child, index, pos) {
				posArr.forEach(function (item) {
					if (item.indexOf(pos) === 0 && filterPos.indexOf(pos) === -1) {
						filterPos.push(pos);
						filterChildren[pos] = child;
					}
				});
			});

			var level = {};
			filterPos.forEach(function (pos) {
				var arr = pos.split('-');
				var key = String(arr.length - 1);
				level[key] = level[key] || [];
				level[key].push(pos);
			});

			var childrenArr = [];

			function loop(arr, cur, callback) {
				arr.forEach(function (c, index) {
					if (cur.indexOf(c.pos) === 0) {
						if (c.children) {
							if (cur.split('-').length === c.pos.split('-').length + 1) {
								callback(arr, index);
							} else {
								loop(c.children, cur, callback);
							}
						} else {
							callback(arr, index);
						}
					}
				});
			}
			var levelArr = Object.keys(level).sort(function (a, b) {
				return a - b;
			});
			if (levelArr.length > 0) {
				level[levelArr[0]].forEach(function (pos, index) {
					childrenArr[index] = {
						pos: pos,
						node: filterChildren[pos]
					};
				});
				var loopFn = function loopFn(cur) {
					loop(childrenArr, cur, function (arr, index) {
						arr[index].children = arr[index].children || [];
						arr[index].children.push({
							pos: cur,
							node: filterChildren[cur]
						});
					});
				};
				for (var i = 1; i < levelArr.length; i++) {
					level[levelArr[i]].forEach(loopFn);
				}
			}
			return childrenArr;
		},
		renderTree: function renderTree(treeNodes, newTreeNodes, multiple) {
			var props = this.props;

			var loop = function loop(data) {
				return data.map(function (item) {
					var tProps = { key: item.node.key };
					assign(tProps, item.node.props);
					if (tProps.children) {
						delete tProps.children;
					}
					if (item.children) {
						return React.createElement(
							TreeNode,
							tProps,
							loop(item.children)
						);
					}
					return React.createElement(TreeNode, tProps);
				});
			};

			var trProps = {
				multiple: multiple,
				prefixCls: props.prefixCls + '-tree',
				showIcon: props.treeIcon,
				showLine: props.treeLine,
				defaultExpandAll: props.treeDefaultExpandAll,
				checkable: props.treeCheckable,
				filterTreeNode: this.filterTree
			};
			var vals = props.value || props.defaultValue;
			var keys = [];
			loopAllChildren(treeNodes, function (child) {
				if (vals.indexOf(getValuePropValue(child)) > -1) {
					keys.push(child.key);
				}
			});
			// 为避免混乱，checkable 模式下，select 失效
			if (trProps.checkable) {
				trProps.selectable = false;
				trProps.checkedKeys = keys;
				trProps.onCheck = props.onSelect;
			} else {
				trProps.selectedKeys = keys;
				trProps.onSelect = props.onSelect;
			}

			// async loadData
			if (props.loadData) {
				trProps.loadData = props.loadData;
			}

			return React.createElement(
				Tree,
				_extends({ ref: this.savePopupElement }, trProps),
				loop(newTreeNodes)
			);
		},
		render: function render() {
			var _popupClassName;

			var props = this.props;
			var multiple = props.multiple;
			var dropdownPrefixCls = this.getDropdownPrefixCls();
			var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, props.dropdownClassName, !!props.dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
			var visible = props.visible;
			var search = multiple || props.combobox || !props.showSearch ? null : React.createElement(
				'span',
				{ className: dropdownPrefixCls + '-search' },
				props.inputElement
			);
			var treeNodes = this.renderFilterOptionsFromChildren(props.treeData || props.treeNodes);
			var notFoundContent = undefined;
			if (!treeNodes.length) {
				if (props.notFoundContent) {
					notFoundContent = React.createElement(
						'span',
						null,
						props.notFoundContent
					);
				}
				if (!search) {
					visible = false;
				}
			}
			var popupElement = React.createElement(
				'div',
				null,
				search,
				notFoundContent ? notFoundContent : this.renderTree(props.treeData || props.treeNodes, treeNodes, multiple)
			);

			return React.createElement(
				Trigger,
				{ action: props.disabled ? [] : ['click'],
					ref: 'trigger',
					popupPlacement: 'bottomLeft',
					builtinPlacements: BUILT_IN_PLACEMENTS,
					prefixCls: dropdownPrefixCls,
					popupTransitionName: this.getDropdownTransitionName(),
					onPopupVisibleChange: props.onDropdownVisibleChange,
					popup: popupElement,
					popupVisible: visible,
					popupClassName: classnames(popupClassName),
					popupStyle: props.dropdownStyle
				},
				this.props.children
			);
		}
	});

	function filterFn(input, child) {
		return String(getPropValue(child, this.props.treeNodeFilterProp)).indexOf(input) > -1;
	}

	function saveRef(name, component) {
		this[name] = component;
	}

	function loopTreeData(data) {
		var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		return data.map(function (item, index) {
			var pos = level + '-' + index;
			var props = {
				title: item.label,
				value: item.value,
				key: item.key || item.value || pos
			};
			var ret = undefined;
			if (item.children && item.children.length) {
				ret = React.createElement(
					_TreeNode,
					props,
					loopTreeData(item.children, pos)
				);
			} else {
				ret = React.createElement(_TreeNode, _extends({}, props, { isLeaf: item.isLeaf }));
			}
			return ret;
		});
	}

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			children: PropTypes.any,
			multiple: PropTypes.bool,
			filterTreeNode: PropTypes.any,
			showSearch: PropTypes.bool,
			disabled: PropTypes.bool,
			showArrow: PropTypes.bool,
			tags: PropTypes.bool,
			transitionName: PropTypes.string,
			animation: PropTypes.string,
			choiceTransitionName: PropTypes.string,
			onClick: PropTypes.func,
			onChange: PropTypes.func,
			onSelect: PropTypes.func,
			onSearch: PropTypes.func,
			searchPlaceholder: PropTypes.string,
			placeholder: PropTypes.any,
			value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
			defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
			label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			dropdownStyle: PropTypes.object,
			maxTagTextLength: PropTypes.number,
			treeIcon: PropTypes.bool,
			treeLine: PropTypes.bool,
			treeDefaultExpandAll: PropTypes.bool,
			treeCheckable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
			treeNodeLabelProp: PropTypes.string,
			treeNodeFilterProp: PropTypes.string,
			treeData: PropTypes.array,
			loadData: PropTypes.func
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-tree-select',
				filterTreeNode: filterFn,
				showSearch: true,
				allowClear: false,
				placeholder: '',
				searchPlaceholder: '',
				defaultValue: [],
				onClick: noop,
				onChange: noop,
				onSelect: noop,
				onSearch: noop,
				showArrow: true,
				dropdownMatchSelectWidth: true,
				dropdownStyle: {},
				notFoundContent: 'Not Found',
				treeIcon: false,
				treeLine: false,
				treeDefaultExpandAll: false,
				treeCheckable: false,
				treeNodeFilterProp: 'value',
				treeNodeLabelProp: 'title'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var value = [];
			if ('value' in props) {
				value = toArray(props.value);
			} else {
				value = toArray(props.defaultValue);
			}
			if (this.props.treeCheckable) {
				value = getTreeNodesStates(this.renderTreeData() || this.props.children, value).checkedValues;
			}
			var label = this.getLabelFromProps(props, value, 1);
			var inputValue = '';
			if (props.combobox) {
				inputValue = value[0] || '';
			}
			this.saveInputRef = saveRef.bind(this, 'inputInstance');
			return { value: value, inputValue: inputValue, label: label };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = toArray(nextProps.value);
				if (nextProps.treeCheckable) {
					value = getTreeNodesStates(this.renderTreeData(nextProps) || nextProps.children, value).checkedValues;
				}
				var label = this.getLabelFromProps(nextProps, value);
				this.setState({
					value: value,
					label: label
				});
				if (nextProps.combobox) {
					this.setState({
						inputValue: value[0] || ''
					});
				}
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			var state = this.state;
			var props = this.props;
			if (state.open && isMultipleOrTags(props)) {
				var inputNode = this.getInputDOMNode();
				if (inputNode.value) {
					inputNode.style.width = '';
					inputNode.style.width = inputNode.scrollWidth + 'px';
				} else {
					inputNode.style.width = '';
				}
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.dropdownContainer) {
				ReactDOM.unmountComponentAtNode(this.dropdownContainer);
				document.body.removeChild(this.dropdownContainer);
				this.dropdownContainer = null;
			}
		},
		onInputChange: function onInputChange(event) {
			var val = event.target.value;
			var props = this.props;
			this.setState({
				inputValue: val,
				open: true
			});
			if (isCombobox(props)) {
				this.fireChange([val], [val]);
			}
			props.onSearch(val);
		},
		onDropdownVisibleChange: function onDropdownVisibleChange(open) {
			this.setOpenState(open);
		},

		// combobox ignore
		onKeyDown: function onKeyDown(event) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var keyCode = event.keyCode;
			if (this.state.open && !this.getInputDOMNode()) {
				this.onInputKeyDown(event);
			} else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
				this.setOpenState(true);
				event.preventDefault();
			}
		},
		onInputKeyDown: function onInputKeyDown(event) {
			var props = this.props;
			var state = this.state;
			var keyCode = event.keyCode;
			if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
				var value = state.value.concat();
				if (value.length) {
					var label = state.label.concat();
					value.pop();
					label.pop();
					this.fireChange(value, label);
				}
				return;
			}

			if (keyCode === KeyCode.DOWN) {
				if (!state.open) {
					this.openIfHasChildren();
					event.preventDefault();
					event.stopPropagation();
					return;
				}
			} else if (keyCode === KeyCode.ESC) {
				if (state.open) {
					this.setOpenState(false);
					event.preventDefault();
					event.stopPropagation();
				}
				return;
			}

			if (state.open) {
				// const menu = this.refs.trigger.getPopupEleRefs();
				// if (menu && menu.onKeyDown(event)) {
				//   event.preventDefault();
				//   event.stopPropagation();
				// }
			}
		},
		onSelect: function onSelect(selectedKeys, info) {
			var _this3 = this;

			var check = info.event === 'check';
			if (info.selected === false) {
				this.onDeselect(info);
				return;
			}
			var item = info.node;
			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var selectedValue = getValuePropValue(item);
			var selectedLabel = this.getLabelFromNode(item);
			props.onSelect(selectedValue, item);
			if (isMultipleOrTags(props)) {
				if (check) {
					// TODO treeCheckable does not support tags/dynamic
					var checkedNodes = info.checkedNodes;

					checkedNodes = checkedNodes.filter(function (n) {
						return !n.props.children;
					});
					value = checkedNodes.map(function (n) {
						return getValuePropValue(n);
					});
					label = checkedNodes.map(function (n) {
						return _this3.getLabelFromNode(n);
					});
				} else {
					if (value.indexOf(selectedValue) !== -1) {
						return;
					}
					value = value.concat([selectedValue]);
					label = label.concat([selectedLabel]);
				}
				if (!check && value.indexOf(selectedValue) !== -1) {
					// 设置 multiple 时会有bug。（isValueChange 已有检查，此处注释掉）
					// return;
				}
			} else {
					if (value[0] === selectedValue) {
						this.setOpenState(false);
						return;
					}
					value = [selectedValue];
					label = [selectedLabel];
					this.setOpenState(false);
				}

			this.fireChange(value, label, { triggerValue: selectedValue, triggerNode: item, checked: info.checked });
			this.setState({
				inputValue: ''
			});
			if (isCombobox(props)) {
				this.setState({
					inputValue: getPropValue(item, props.treeNodeLabelProp)
				});
			}
		},
		onDeselect: function onDeselect(info) {
			this.removeSelected(getValuePropValue(info.node));
			if (!isMultipleOrTags(this.props)) {
				this.setOpenState(false);
			}
			this.setState({
				inputValue: ''
			});
		},
		onPlaceholderClick: function onPlaceholderClick() {
			this.getInputDOMNode().focus();
		},
		onClearSelection: function onClearSelection(event) {
			var props = this.props;
			var state = this.state;
			if (props.disabled) {
				return;
			}
			event.stopPropagation();
			if (state.inputValue || state.value.length) {
				this.fireChange([], []);
				this.setOpenState(false);
				this.setState({
					inputValue: ''
				});
			}
		},
		getLabelBySingleValue: function getLabelBySingleValue(children, value) {
			var _this4 = this;

			if (value === undefined) {
				return null;
			}
			var label = null;
			var loop = function loop(childs) {
				React.Children.forEach(childs, function (item) {
					if (item.props.children) {
						loop(item.props.children);
					}
					if (getValuePropValue(item) === value) {
						label = _this4.getLabelFromNode(item);
					}
				});
			};
			loop(children, 0);
			return label;
		},
		getLabelFromNode: function getLabelFromNode(child) {
			return getPropValue(child, this.props.treeNodeLabelProp);
		},
		getLabelFromProps: function getLabelFromProps(props, value, init) {
			var label = [];
			if ('label' in props) {
				label = toArray(props.label);
			} else if (init && 'defaultLabel' in props) {
				label = toArray(props.defaultLabel);
			} else {
				label = this.getLabelByValue(this.renderTreeData(props) || props.children, value);
			}
			return label;
		},
		getVLForOnChange: function getVLForOnChange(vls) {
			if (vls !== undefined) {
				return isMultipleOrTags(this.props) ? vls : vls[0];
			}
			return vls;
		},
		getLabelByValue: function getLabelByValue(children, values) {
			var _this5 = this;

			return values.map(function (value) {
				var label = _this5.getLabelBySingleValue(children, value);
				if (label === null) {
					return value;
				}
				return label;
			});
		},
		getDropdownContainer: function getDropdownContainer() {
			if (!this.dropdownContainer) {
				this.dropdownContainer = document.createElement('div');
				document.body.appendChild(this.dropdownContainer);
			}
			return this.dropdownContainer;
		},
		getSearchPlaceholderElement: function getSearchPlaceholderElement(hidden) {
			var props = this.props;
			if (props.searchPlaceholder) {
				return React.createElement(
					'span',
					{
						style: { display: hidden ? 'none' : 'block' },
						onClick: this.onPlaceholderClick,
						className: props.prefixCls + '-search__field__placeholder' },
					props.searchPlaceholder
				);
			}
			return null;
		},
		getInputElement: function getInputElement() {
			var props = this.props;
			return React.createElement(
				'span',
				{ className: props.prefixCls + '-search__field__wrap' },
				React.createElement('input', { ref: this.saveInputRef,
					onChange: this.onInputChange,
					onKeyDown: this.onInputKeyDown,
					value: this.state.inputValue,
					disabled: props.disabled,
					className: props.prefixCls + '-search__field',
					role: 'textbox' }),
				isMultipleOrTags(props) ? null : this.getSearchPlaceholderElement(!!this.state.inputValue)
			);
		},
		getInputDOMNode: function getInputDOMNode() {
			return this.inputInstance;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDOMNode();
		},
		getPopupComponentRefs: function getPopupComponentRefs() {
			return this.refs.trigger.getPopupEleRefs();
		},
		setOpenState: function setOpenState(open) {
			var _this6 = this;

			var refs = this.refs;
			this.setState({
				open: open
			}, function () {
				if (open || isMultipleOrTagsOrCombobox(_this6.props)) {
					if (_this6.getInputDOMNode()) {
						_this6.getInputDOMNode().focus();
					}
				} else if (refs.selection) {
					refs.selection.focus();
				}
			});
		},
		removeSelected: function removeSelected(selectedValue, e) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			if (e) {
				e.stopPropagation();
			}
			var label = this.state.label.concat();
			var index = this.state.value.indexOf(selectedValue);
			var value = this.state.value.filter(function (singleValue) {
				return singleValue !== selectedValue;
			});
			if (index !== -1) {
				label.splice(index, 1);
			}
			this.fireChange(value, label, { triggerValue: selectedValue, clear: true });
		},
		openIfHasChildren: function openIfHasChildren() {
			var props = this.props;
			if (React.Children.count(props.children) || isSingleMode(props)) {
				this.setOpenState(true);
			}
		},
		isValueChange: function isValueChange(value) {
			var sv = this.state.value;
			if (typeof sv === 'string') {
				sv = [sv];
			}
			if (value.length !== sv.length || !value.every(function (val, index) {
				return sv[index] === val;
			})) {
				return true;
			}
		},
		fireChange: function fireChange(value, label, extraInfo) {
			var props = this.props;
			if (!('value' in props)) {
				this.setState({
					value: value, label: label
				});
			}
			if (this.isValueChange(value)) {
				var ex = { preValue: [].concat(_toConsumableArray(this.state.value)) };
				if (extraInfo) {
					assign(ex, extraInfo);
				}
				props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label), ex);
			}
		},
		renderTopControlNode: function renderTopControlNode() {
			var _this7 = this;

			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var choiceTransitionName = props.choiceTransitionName;
			var prefixCls = props.prefixCls;
			var maxTagTextLength = props.maxTagTextLength;
			// single and not combobox, input is inside dropdown

			if (isSingleMode(props)) {
				var placeholder = React.createElement(
					'span',
					{ key: 'placeholder',
						className: prefixCls + '-selection__placeholder' },
					props.placeholder
				);
				var innerNode = placeholder;
				if (this.state.label[0]) {
					innerNode = React.createElement(
						'span',
						{ key: 'value' },
						this.state.label[0]
					);
				}
				return React.createElement(
					'span',
					{ className: prefixCls + '-selection__rendered' },
					innerNode
				);
			}

			var selectedValueNodes = [];
			if (isMultipleOrTags(props)) {
				selectedValueNodes = value.map(function (singleValue, index) {
					var content = label[index];
					var title = content;
					if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
						content = content.slice(0, maxTagTextLength) + '...';
					}
					return React.createElement(
						'li',
						{ className: prefixCls + '-selection__choice',
							key: singleValue,
							title: title },
						React.createElement(
							'span',
							{ className: prefixCls + '-selection__choice__content' },
							content
						),
						React.createElement('span', { className: prefixCls + '-selection__choice__remove',
							onClick: _this7.removeSelected.bind(_this7, singleValue) })
					);
				});
			}
			selectedValueNodes.push(React.createElement(
				'li',
				{ className: prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
				this.getInputElement()
			));
			var className = prefixCls + '-selection__rendered';
			if (isMultipleOrTags(props) && choiceTransitionName) {
				return React.createElement(
					Animate,
					{ className: className,
						component: 'ul',
						transitionName: choiceTransitionName },
					selectedValueNodes
				);
			}
			return React.createElement(
				'ul',
				{ className: className },
				selectedValueNodes
			);
		},
		renderTreeData: function renderTreeData(props) {
			var validProps = props || this.props;
			if (validProps.treeData) {
				return loopTreeData(validProps.treeData);
			}
		},
		render: function render() {
			var _rootCls;

			var props = this.props;
			var multiple = isMultipleOrTags(props);
			var state = this.state;
			var className = props.className;
			var disabled = props.disabled;
			var allowClear = props.allowClear;
			var prefixCls = props.prefixCls;

			var ctrlNode = this.renderTopControlNode();
			var extraSelectionProps = {};
			if (!isCombobox(props)) {
				extraSelectionProps = {
					onKeyDown: this.onKeyDown,
					tabIndex: 0
				};
			}
			var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', state.open), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _rootCls);

			var clear = React.createElement('span', { key: 'clear',
				className: prefixCls + '-selection__clear',
				onClick: this.onClearSelection });
			return React.createElement(
				SelectTrigger,
				_extends({}, props, {
					treeNodes: props.children,
					treeData: this.renderTreeData(),
					multiple: multiple,
					disabled: disabled,
					visible: state.open,
					inputValue: state.inputValue,
					inputElement: this.getInputElement(),
					value: state.value,
					onDropdownVisibleChange: this.onDropdownVisibleChange,
					onSelect: this.onSelect,
					ref: 'trigger' }),
				React.createElement(
					'span',
					{
						style: props.style,
						onClick: props.onClick,
						className: classnames(rootCls) },
					React.createElement(
						'span',
						_extends({ ref: 'selection',
							key: 'selection',
							className: prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
							role: 'combobox',
							'aria-autocomplete': 'list',
							'aria-haspopup': 'true',
							'aria-expanded': state.open
						}, extraSelectionProps),
						ctrlNode,
						allowClear && !isMultipleOrTags(props) ? clear : null,
						multiple || !props.showArrow ? null : React.createElement(
							'span',
							{ key: 'arrow', className: prefixCls + '-arrow', tabIndex: '-1', style: { outline: 'none' } },
							React.createElement('b', null)
						),
						multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null
					)
				)
			);
		}
	});

	Select.TreeNode = _TreeNode;
	RC.TreeSelect = Select;
})(Smart.RC);