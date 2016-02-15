'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Menu = RC.Menu;
	var MenuItem = RC.MenuItem;
	var MenuItemGroup = RC.MenuItemGroup;
	var Animate = RC.Animate;
	var Util = RC.Util;
	var Trigger = RC.Trigger;
	var KeyCode = Util.KeyCode;
	var scrollIntoView = Util.scrollIntoView;
	var _React = React;
	var cloneElement = _React.cloneElement;
	var PropTypes = _React.PropTypes;
	var _ReactDOM = ReactDOM;
	var findDOMNode = _ReactDOM.findDOMNode;

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
		return props.multiple || props.tags;
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

	function getSelectKeys(menuItems, value) {
		if (value === null || value === undefined) {
			return [];
		}
		var selectedKeys = [];
		React.Children.forEach(menuItems, function (item) {
			if (item.type === MenuItemGroup) {
				selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
			} else {
				var itemValue = getValuePropValue(item);
				var itemKey = item.key;
				if (value.indexOf(itemValue) !== -1 && itemKey) {
					selectedKeys.push(itemKey);
				}
			}
		});
		return selectedKeys;
	}

	var OptGroup = (function (_React$Component) {
		_inherits(OptGroup, _React$Component);

		function OptGroup() {
			_classCallCheck(this, OptGroup);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(OptGroup).apply(this, arguments));
		}

		return OptGroup;
	})(React.Component);

	var Option = (function (_React$Component2) {
		_inherits(Option, _React$Component2);

		function Option() {
			_classCallCheck(this, Option);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
		}

		return Option;
	})(React.Component);

	var FilterMixin = {
		filterOption: function filterOption(input, child) {
			if (!input) {
				return true;
			}
			var filterOption = this.props.filterOption;
			if (!filterOption) {
				return true;
			}
			if (child.props.disabled) {
				return false;
			}
			return filterOption.call(this, input, child);
		},
		renderFilterOptions: function renderFilterOptions(inputValue) {
			return this.renderFilterOptionsFromChildren(this.props.children, true, inputValue);
		},
		renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren(children, showNotFound, iv) {
			var _this3 = this;

			var sel = [];
			var props = this.props;
			var inputValue = iv === undefined ? this.state.inputValue : iv;
			var childrenKeys = [];
			var tags = props.tags;
			React.Children.forEach(children, function (child) {
				if (child.type === OptGroup) {
					var innerItems = _this3.renderFilterOptionsFromChildren(child.props.children, false);
					if (innerItems.length) {
						var label = child.props.label;
						var key = child.key;
						if (!key && typeof label === 'string') {
							key = label;
						} else if (!label && key) {
							label = key;
						}
						sel.push(React.createElement(
							MenuItemGroup,
							{ key: key, title: label },
							innerItems
						));
					}
					return;
				}
				var childValue = getValuePropValue(child);
				if (_this3.filterOption(inputValue, child)) {
					sel.push(React.createElement(MenuItem, _extends({
						value: childValue,
						key: childValue
					}, child.props)));
				}
				if (tags && !child.props.disabled) {
					childrenKeys.push(childValue);
				}
			});
			if (tags) {
				// tags value must be string
				var value = this.state.value || [];
				value = value.filter(function (singleValue) {
					return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
				});
				sel = sel.concat(value.map(function (singleValue) {
					return React.createElement(
						MenuItem,
						{ value: singleValue, key: singleValue },
						singleValue
					);
				}));
				if (inputValue) {
					var notFindInputItem = sel.every(function (option) {
						return getValuePropValue(option) !== inputValue;
					});
					if (notFindInputItem) {
						sel.unshift(React.createElement(
							MenuItem,
							{ value: inputValue, key: inputValue },
							inputValue
						));
					}
				}
			}
			if (!sel.length && showNotFound && props.notFoundContent) {
				sel = [React.createElement(
					MenuItem,
					{ disabled: true, value: 'NOT_FOUND', key: 'NOT_FOUND' },
					props.notFoundContent
				)];
			}
			return sel;
		}
	};

	var DropdownMenu = React.createClass({
		displayName: 'DropdownMenu',

		propTypes: {
			prefixCls: PropTypes.string,
			menuItems: PropTypes.any,
			search: PropTypes.any,
			visible: PropTypes.bool
		},

		componentDidMount: function componentDidMount() {
			this.scrollActiveItemToView();
			this.lastVisible = this.props.visible;
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
			if (!nextProps.visible) {
				this.lastVisible = false;
			}
			// freeze when hide
			return nextProps.visible;
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var props = this.props;
			if (!prevProps.visible && props.visible) {
				this.scrollActiveItemToView();
			}
			this.lastVisible = props.visible;
		},
		scrollActiveItemToView: function scrollActiveItemToView() {
			// scroll into view
			var itemComponent = findDOMNode(this.firstActiveItem);
			if (itemComponent) {
				scrollIntoView(itemComponent, findDOMNode(this.refs.menu), {
					onlyScrollIfNeeded: true
				});
			}
		},
		renderMenu: function renderMenu() {
			var _this4 = this;

			var props = this.props;
			var menuItems = props.menuItems;
			var defaultActiveFirstOption = props.defaultActiveFirstOption;
			var value = props.value;
			var dropdownMenuStyle = props.dropdownMenuStyle;
			var prefixCls = props.prefixCls;
			var multiple = props.multiple;
			var onMenuDeselect = props.onMenuDeselect;
			var onMenuSelect = props.onMenuSelect;

			if (menuItems && menuItems.length) {
				var _ret = (function () {
					var menuProps = {};
					if (multiple) {
						menuProps.onDeselect = onMenuDeselect;
						menuProps.onSelect = onMenuSelect;
					} else {
						menuProps.onClick = onMenuSelect;
					}
					var selectedKeys = getSelectKeys(menuItems, value);
					var activeKeyProps = {};

					var clonedMenuItems = menuItems;
					if (selectedKeys.length) {
						(function () {
							if (props.visible && !_this4.lastVisible) {
								activeKeyProps.activeKey = selectedKeys[0];
							}
							var foundFirst = false;
							// set firstActiveItem via cloning menus
							// for scroll into view
							var clone = function clone(item) {
								if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
									foundFirst = true;
									return cloneElement(item, {
										ref: function ref(_ref2) {
											_this4.firstActiveItem = _ref2;
										}
									});
								}
								return item;
							};

							clonedMenuItems = menuItems.map(function (item) {
								if (item.type === MenuItemGroup) {
									var children = item.props.children.map(clone);
									return cloneElement(item, {}, children);
								}
								return clone(item);
							});
						})();
					}

					return {
						v: React.createElement(
							Menu,
							_extends({
								ref: 'menu',
								defaultActiveFirst: defaultActiveFirstOption,
								style: dropdownMenuStyle
							}, activeKeyProps, {
								multiple: multiple,
								focusable: false
							}, menuProps, {
								selectedKeys: selectedKeys,
								prefixCls: prefixCls + '-menu' }),
							clonedMenuItems
						)
					};
				})();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
			return null;
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				this.props.search,
				this.renderMenu()
			);
		}
	});

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
			filterOption: PropTypes.any,
			options: PropTypes.any,
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
		getInnerMenu: function getInnerMenu() {
			return this.popupMenu && this.popupMenu.refs.menu;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		getDropdownElement: function getDropdownElement(newProps) {
			var props = this.props;
			return React.createElement(DropdownMenu, _extends({
				ref: this.saveMenu
			}, newProps, {
				prefixCls: this.getDropdownPrefixCls(),
				onMenuSelect: props.onMenuSelect,
				onMenuDeselect: props.onMenuDeselect,
				value: props.value,
				defaultActiveFirstOption: props.defaultActiveFirstOption,
				dropdownMenuStyle: props.dropdownMenuStyle
			}));
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
		saveMenu: function saveMenu(menu) {
			this.popupMenu = menu;
		},
		render: function render() {
			var _popupClassName;

			var props = this.props;
			var multiple = props.multiple;
			var visible = props.visible;

			var dropdownPrefixCls = this.getDropdownPrefixCls();
			var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, props.dropdownClassName, !!props.dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
			var search = multiple || props.combobox || !props.showSearch ? null : React.createElement(
				'span',
				{ className: dropdownPrefixCls + '-search' },
				props.inputElement
			);
			var popupElement = this.getDropdownElement({
				menuItems: props.options,
				search: search,
				multiple: multiple,
				visible: visible
			});
			return React.createElement(
				Trigger,
				_extends({}, props, {
					action: props.disabled ? [] : ['click'],
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
				}),
				props.children
			);
		}
	});

	function filterFn(input, child) {
		return String(getPropValue(child, this.props.optionFilterProp)).indexOf(input) > -1;
	}

	function saveRef(name, component) {
		this[name] = component;
	}

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			defaultActiveFirstOption: PropTypes.bool,
			multiple: PropTypes.bool,
			filterOption: PropTypes.any,
			showSearch: PropTypes.bool,
			disabled: PropTypes.bool,
			showArrow: PropTypes.bool,
			tags: PropTypes.bool,
			transitionName: PropTypes.string,
			optionLabelProp: PropTypes.string,
			optionFilterProp: PropTypes.string,
			animation: PropTypes.string,
			choiceTransitionName: PropTypes.string,
			onChange: PropTypes.func,
			onSelect: PropTypes.func,
			onSearch: PropTypes.func,
			searchPlaceholder: PropTypes.string,
			placeholder: PropTypes.any,
			onDeselect: PropTypes.func,
			value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			dropdownStyle: PropTypes.object,
			maxTagTextLength: PropTypes.number
		},
		mixins: [FilterMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-select',
				filterOption: filterFn,
				defaultOpen: false,
				defaultActiveFirstOption: true,
				showSearch: true,
				allowClear: false,
				placeholder: '',
				searchPlaceholder: '',
				defaultValue: [],
				onChange: noop,
				onSelect: noop,
				onSearch: noop,
				onDeselect: noop,
				showArrow: true,
				dropdownMatchSelectWidth: true,
				dropdownStyle: {},
				dropdownMenuStyle: {},
				optionFilterProp: 'value',
				optionLabelProp: 'value',
				notFoundContent: 'Not Found'
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
			var label = this.getLabelFromProps(props, value, 1);
			var inputValue = '';
			if (props.combobox) {
				inputValue = value.length ? String(value[0]) : '';
			}
			this.saveInputRef = saveRef.bind(this, 'inputInstance');
			var open = props.open;
			if (open === undefined) {
				open = props.defaultOpen;
			}
			return { value: value, inputValue: inputValue, label: label, open: open };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = toArray(nextProps.value);
				var label = this.getLabelFromProps(nextProps, value);
				this.setState({
					value: value,
					label: label
				});
				if (nextProps.combobox) {
					this.setState({
						inputValue: value.length ? String(value[0]) : ''
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
					var popValue = value.pop();
					label.pop();
					props.onDeselect(popValue);
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
				var menu = this.refs.trigger.getInnerMenu();
				if (menu && menu.onKeyDown(event)) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		},
		onMenuSelect: function onMenuSelect(_ref3) {
			var item = _ref3.item;

			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var selectedValue = getValuePropValue(item);
			var selectedLabel = this.getLabelFromOption(item);
			props.onSelect(selectedValue, item);
			if (isMultipleOrTags(props)) {
				if (value.indexOf(selectedValue) !== -1) {
					return;
				}
				value = value.concat([selectedValue]);
				label = label.concat([selectedLabel]);
			} else {
				if (value[0] === selectedValue) {
					this.setOpenState(false);
					return;
				}
				value = [selectedValue];
				label = [selectedLabel];
				this.setOpenState(false);
			}
			this.fireChange(value, label);
			this.setState({
				inputValue: ''
			});
			if (isCombobox(props)) {
				this.setState({
					inputValue: getPropValue(item, props.optionLabelProp)
				});
			}
		},
		onMenuDeselect: function onMenuDeselect(_ref4) {
			var item = _ref4.item;
			var domEvent = _ref4.domEvent;

			if (domEvent.type === 'click') {
				this.removeSelected(getValuePropValue(item));
			}
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
			var _this5 = this;

			if (value === undefined) {
				return null;
			}
			var label = null;
			React.Children.forEach(children, function (child) {
				if (child.type === OptGroup) {
					var maybe = _this5.getLabelBySingleValue(child.props.children, value);
					if (maybe !== null) {
						label = maybe;
					}
				} else if (getValuePropValue(child) === value) {
					label = _this5.getLabelFromOption(child);
				}
			});
			return label;
		},
		getLabelFromOption: function getLabelFromOption(child) {
			return getPropValue(child, this.props.optionLabelProp);
		},
		getLabelFromProps: function getLabelFromProps(props, value, init) {
			var label = [];
			if ('label' in props) {
				label = toArray(props.label);
			} else if (init && 'defaultLabel' in props) {
				label = toArray(props.defaultLabel);
			} else {
				label = this.getLabelByValue(props.children, value);
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
			var _this6 = this;

			return values.map(function (value) {
				var label = _this6.getLabelBySingleValue(children, value);
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
		getPopupMenuComponent: function getPopupMenuComponent() {
			return this.refs.trigger.getInnerMenu();
		},
		setOpenState: function setOpenState(open) {
			var _this7 = this;

			var props = this.props;
			var refs = this.refs;

			this.setState({
				open: open
			}, function () {
				if (open || isMultipleOrTagsOrCombobox(props)) {
					if (_this7.getInputDOMNode()) {
						_this7.getInputDOMNode().focus();
					}
				} else if (refs.selection) {
					refs.selection.focus();
				}
			});
		},
		removeSelected: function removeSelected(selectedValue) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var label = this.state.label.concat();
			var index = this.state.value.indexOf(selectedValue);
			var value = this.state.value.filter(function (singleValue) {
				return singleValue !== selectedValue;
			});
			if (index !== -1) {
				label.splice(index, 1);
			}
			var canMultiple = isMultipleOrTags(props);
			if (canMultiple) {
				props.onDeselect(selectedValue);
			}
			this.fireChange(value, label);
		},
		openIfHasChildren: function openIfHasChildren() {
			var props = this.props;
			if (React.Children.count(props.children) || isSingleMode(props)) {
				this.setOpenState(true);
			}
		},
		fireChange: function fireChange(value, label) {
			var props = this.props;
			if (!('value' in props)) {
				this.setState({
					value: value, label: label
				});
			}
			props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label));
		},
		renderTopControlNode: function renderTopControlNode() {
			var _this8 = this;

			var _state = this.state;
			var value = _state.value;
			var label = _state.label;

			var props = this.props;
			var choiceTransitionName = props.choiceTransitionName;
			var prefixCls = props.prefixCls;
			var maxTagTextLength = props.maxTagTextLength;
			// single and not combobox, input is inside dropdown

			if (isSingleMode(props)) {
				var innerNode = React.createElement(
					'span',
					{ key: 'placeholder',
						className: prefixCls + '-selection__placeholder' },
					props.placeholder
				);
				if (label.length) {
					innerNode = React.createElement(
						'span',
						{ key: 'value' },
						label[0]
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
							onClick: _this8.removeSelected.bind(_this8, singleValue) })
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
			var open = this.state.open;

			var options = [];
			if (open) {
				options = this.renderFilterOptions();
			}
			if (open && (isMultipleOrTagsOrCombobox(props) || !props.showSearch) && !options.length) {
				open = false;
			}
			if (!isCombobox(props)) {
				extraSelectionProps = {
					onKeyDown: this.onKeyDown,
					tabIndex: 0
				};
			}
			var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', open), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _rootCls);

			var clear = React.createElement('span', { key: 'clear',
				className: prefixCls + '-selection__clear',
				onClick: this.onClearSelection });
			return React.createElement(
				SelectTrigger,
				_extends({}, props, {
					options: options,
					multiple: multiple,
					disabled: disabled,
					visible: open,
					inputValue: state.inputValue,
					inputElement: this.getInputElement(),
					value: state.value,
					onDropdownVisibleChange: this.onDropdownVisibleChange,
					onMenuSelect: this.onMenuSelect,
					onMenuDeselect: this.onMenuDeselect,
					ref: 'trigger' }),
				React.createElement(
					'span',
					{
						style: props.style,
						className: classnames(rootCls) },
					React.createElement(
						'span',
						_extends({ ref: 'selection',
							key: 'selection',
							className: prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
							role: 'combobox',
							'aria-autocomplete': 'list',
							'aria-haspopup': 'true',
							'aria-expanded': open
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
	Select.Option = Option;
	Select.OptGroup = OptGroup;
	RC.Select = Select;
})(Smart.RC);