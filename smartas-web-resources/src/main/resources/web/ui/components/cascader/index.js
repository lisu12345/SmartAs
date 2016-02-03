'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export this package's api
+(function (RC) {
	var Trigger = RC.Trigger;
	var arrayTreeFilter = RC.arrayTreeFilter;
	var _ReactDOM = ReactDOM;
	var findDOMNode = _ReactDOM.findDOMNode;

	var Menus = (function (_React$Component) {
		_inherits(Menus, _React$Component);

		function Menus(props) {
			_classCallCheck(this, Menus);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menus).call(this));

			var value = props.value;
			var defaultValue = props.defaultValue;

			var initialValue = value || defaultValue || [];
			_this.state = {
				activeValue: initialValue,
				value: initialValue
			};
			return _this;
		}

		_createClass(Menus, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.scrollActiveItemToView();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('value' in nextProps) {
					this.setState({
						value: nextProps.value || []
					});
				}
				// sync activeValue with value when panel open
				if (nextProps.visible && !this.props.visible) {
					this.setState({
						activeValue: this.state.value
					});
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				if (!prevProps.visible && this.props.visible) {
					this.scrollActiveItemToView();
				}
			}
		}, {
			key: 'onSelect',
			value: function onSelect(targetOption, menuIndex) {
				if (!targetOption || targetOption.disabled) {
					return;
				}
				var activeValue = this.state.activeValue;
				activeValue = activeValue.slice(0, menuIndex + 1);
				activeValue[menuIndex] = targetOption.value;
				var activeOptions = this.getActiveOptions(activeValue);
				if (targetOption.isLeaf === false && !targetOption.children && this.props.loadData) {
					this.setState({ activeValue: activeValue });
					this.props.loadData(activeOptions);
					return;
				}
				if (!targetOption.children || !targetOption.children.length) {
					this.props.onChange(activeOptions, { visible: false });
					// set value to activeValue when select leaf option
					this.setState({ value: activeValue });
				} else if (this.props.changeOnSelect) {
					this.props.onChange(activeOptions, { visible: true });
					// set value to activeValue on every select
					this.setState({ value: activeValue });
				}
				this.setState({ activeValue: activeValue });
			}
		}, {
			key: 'getOption',
			value: function getOption(option, menuIndex) {
				var _props = this.props;
				var prefixCls = _props.prefixCls;
				var expandTrigger = _props.expandTrigger;

				var onSelect = this.onSelect.bind(this, option, menuIndex);
				var expandProps = {
					onClick: onSelect
				};
				var menuItemCls = prefixCls + '-menu-item';
				if (expandTrigger === 'hover' && option.children && option.children.length > 0) {
					expandProps = {
						onMouseEnter: onSelect
					};
					menuItemCls += ' ' + prefixCls + '-menu-item-expand';
				}
				if (this.isActiveOption(option)) {
					menuItemCls += ' ' + prefixCls + '-menu-item-active';
					expandProps.ref = 'activeItem' + menuIndex;
				}
				if (option.disabled) {
					menuItemCls += ' ' + prefixCls + '-menu-item-disabled';
				}
				return React.createElement(
					'li',
					_extends({ key: option.value,
						className: menuItemCls,
						title: option.label
					}, expandProps),
					option.label
				);
			}
		}, {
			key: 'getActiveOptions',
			value: function getActiveOptions(values) {
				var activeValue = values || this.state.activeValue;
				var options = this.props.options;
				return arrayTreeFilter(options, function (o, level) {
					return o.value === activeValue[level];
				});
			}
		}, {
			key: 'getShowOptions',
			value: function getShowOptions() {
				var options = this.props.options;

				var result = this.getActiveOptions().map(function (activeOption) {
					return activeOption.children;
				}).filter(function (activeOption) {
					return !!activeOption;
				});
				result.unshift(options);
				return result;
			}
		}, {
			key: 'scrollActiveItemToView',
			value: function scrollActiveItemToView() {
				// scroll into view
				var optionsLength = this.getShowOptions().length;
				for (var i = 0; i < optionsLength; i++) {
					var itemComponent = this.refs['activeItem' + i];
					if (itemComponent) {
						var target = findDOMNode(itemComponent);
						target.parentNode.scrollTop = target.offsetTop;
					}
				}
			}
		}, {
			key: 'isActiveOption',
			value: function isActiveOption(option) {
				return this.state.activeValue.some(function (value) {
					return value === option.value;
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var prefixCls = this.props.prefixCls;

				return React.createElement(
					'div',
					null,
					this.getShowOptions().map(function (options, menuIndex) {
						return React.createElement(
							'ul',
							{ className: prefixCls + '-menu', key: menuIndex },
							options.map(function (option) {
								return _this2.getOption(option, menuIndex);
							})
						);
					})
				);
			}
		}]);

		return Menus;
	})(React.Component);

	Menus.defaultProps = {
		options: [],
		onChange: function onChange() {},
		onSelect: function onSelect() {},

		prefixCls: 'rc-cascader-menus',
		visible: false,
		expandTrigger: 'click',
		changeOnSelect: false
	};

	Menus.propTypes = {
		options: React.PropTypes.array.isRequired,
		prefixCls: React.PropTypes.string,
		expandTrigger: React.PropTypes.string,
		onChange: React.PropTypes.func,
		loadData: React.PropTypes.func,
		visible: React.PropTypes.bool,
		changeOnSelect: React.PropTypes.bool
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

	var Cascader = (function (_React$Component2) {
		_inherits(Cascader, _React$Component2);

		function Cascader(props) {
			_classCallCheck(this, Cascader);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Cascader).call(this));

			_this3.state = {
				popupVisible: props.popupVisible
			};
			['handleChange', 'handlePopupVisibleChange', 'setPopupVisible', 'getPopupDOMNode'].forEach(function (method) {
				return _this3[method] = _this3[method].bind(_this3);
			});
			return _this3;
		}

		_createClass(Cascader, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('popupVisible' in nextProps) {
					this.setState({
						popupVisible: nextProps.popupVisible
					});
				}
			}
		}, {
			key: 'getPopupDOMNode',
			value: function getPopupDOMNode() {
				return this.refs.trigger.getPopupDomNode();
			}
		}, {
			key: 'setPopupVisible',
			value: function setPopupVisible(popupVisible) {
				if (!('popupVisible' in this.props)) {
					this.setState({ popupVisible: popupVisible });
				}
				this.props.onPopupVisibleChange(popupVisible);
			}
		}, {
			key: 'handleChange',
			value: function handleChange(options, setProps) {
				this.props.onChange(options.map(function (o) {
					return o.value;
				}), options);
				this.setPopupVisible(setProps.visible);
			}
		}, {
			key: 'handlePopupVisibleChange',
			value: function handlePopupVisibleChange(popupVisible) {
				this.setPopupVisible(popupVisible);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var prefixCls = props.prefixCls;
				var transitionName = props.transitionName;
				var popupClassName = props.popupClassName;
				// Did not show popup when there is no options

				var menus = React.createElement('div', null);
				var emptyMenuClassName = '';
				if (props.options && props.options.length > 0) {
					menus = React.createElement(Menus, _extends({}, props, {
						onChange: this.handleChange,
						onSelect: this.props.onSelect,
						visible: this.state.popupVisible }));
				} else {
					emptyMenuClassName = ' ' + prefixCls + '-menus-empty';
				}
				return React.createElement(
					Trigger,
					{ ref: 'trigger',
						popupPlacement: 'bottomLeft',
						builtinPlacements: BUILT_IN_PLACEMENTS,
						popupTransitionName: transitionName,
						action: props.disabled ? [] : ['click'],
						popupVisible: props.disabled ? false : this.state.popupVisible,
						onPopupVisibleChange: this.handlePopupVisibleChange,
						prefixCls: prefixCls + '-menus',
						popupClassName: popupClassName + emptyMenuClassName,
						popup: menus },
					props.children
				);
			}
		}]);

		return Cascader;
	})(React.Component);

	Cascader.defaultProps = {
		options: [],
		onChange: function onChange() {},
		onSelect: function onSelect() {},
		onPopupVisibleChange: function onPopupVisibleChange() {},

		disabled: false,
		transitionName: '',
		prefixCls: 'rc-cascader',
		popupClassName: ''
	};

	Cascader.propTypes = {
		options: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		onPopupVisibleChange: React.PropTypes.func,
		popupVisible: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		transitionName: React.PropTypes.string,
		popupClassName: React.PropTypes.string,
		prefixCls: React.PropTypes.string
	};

	RC.Cascader = Cascader;
})(Smart.RC);