'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export this package's api
+function (UI, RC) {
	var Cascader = RC.Cascader;
	var arrayTreeFilter = RC.arrayTreeFilter;
	var classNames = RC.classNames;
	var Input = UI.Input;
	var Icon = UI.Icon;

	var AntCascader = function (_React$Component) {
		_inherits(AntCascader, _React$Component);

		function AntCascader(props) {
			_classCallCheck(this, AntCascader);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntCascader).call(this, props));

			_this.state = {
				value: props.value || props.defaultValue || [],
				popupVisible: false
			};
			['handleChange', 'handlePopupVisibleChange', 'setValue', 'getLabel', 'clearSelection'].forEach(function (method) {
				return _this[method] = _this[method].bind(_this);
			});
			return _this;
		}

		_createClass(AntCascader, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('value' in nextProps) {
					this.setState({ value: nextProps.value || [] });
				}
			}
		}, {
			key: 'handleChange',
			value: function handleChange(value, selectedOptions) {
				this.setValue(value, selectedOptions);
			}
		}, {
			key: 'handlePopupVisibleChange',
			value: function handlePopupVisibleChange(popupVisible) {
				this.setState({ popupVisible: popupVisible });
				this.props.onPopupVisibleChange(popupVisible);
			}
		}, {
			key: 'setValue',
			value: function setValue(value) {
				var selectedOptions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

				if (!('value' in this.props)) {
					this.setState({ value: value });
				}
				this.props.onChange(value, selectedOptions);
			}
		}, {
			key: 'getLabel',
			value: function getLabel() {
				var _this2 = this;

				var _props = this.props;
				var options = _props.options;
				var displayRender = _props.displayRender;

				var label = arrayTreeFilter(options, function (o, level) {
					return o.value === _this2.state.value[level];
				}).map(function (o) {
					return o.label;
				});
				return displayRender(label);
			}
		}, {
			key: 'clearSelection',
			value: function clearSelection(e) {
				e.preventDefault();
				e.stopPropagation();
				this.setValue([]);
				this.setState({ popupVisible: false });
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames, _classNames2;

				var _props2 = this.props;
				var prefixCls = _props2.prefixCls;
				var children = _props2.children;
				var placeholder = _props2.placeholder;
				var size = _props2.size;
				var disabled = _props2.disabled;
				var className = _props2.className;
				var style = _props2.style;
				var allowClear = _props2.allowClear;

				var otherProps = _objectWithoutProperties(_props2, ['prefixCls', 'children', 'placeholder', 'size', 'disabled', 'className', 'style', 'allowClear']);

				var sizeCls = classNames({
					'ant-input-lg': size === 'large',
					'ant-input-sm': size === 'small'
				});
				var clearIcon = allowClear && !disabled && this.state.value.length > 0 ? React.createElement(Icon, { type: 'cross-circle',
					className: prefixCls + '-picker-clear',
					onClick: this.clearSelection }) : null;
				var arrowCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-picker-arrow', true), _defineProperty(_classNames, prefixCls + '-picker-arrow-expand', this.state.popupVisible), _classNames));
				var pickerCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-picker', true), _defineProperty(_classNames2, prefixCls + '-picker-disabled', disabled), _classNames2));

				// Fix bug of https://github.com/facebook/react/pull/5004
				delete otherProps.onChange;
				return React.createElement(
					Cascader,
					_extends({}, this.props, {
						value: this.state.value,
						popupVisible: this.state.popupVisible,
						onPopupVisibleChange: this.handlePopupVisibleChange,
						onChange: this.handleChange }),
					children || React.createElement(
						'span',
						{
							style: style,
							className: pickerCls },
						React.createElement(Input, _extends({}, otherProps, {
							placeholder: placeholder,
							className: prefixCls + '-input ant-input ' + sizeCls,
							style: { width: '100%' },
							value: this.getLabel(),
							disabled: disabled,
							readOnly: true })),
						clearIcon,
						React.createElement(Icon, { type: 'down', className: arrowCls })
					)
				);
			}
		}]);

		return AntCascader;
	}(React.Component);

	AntCascader.defaultProps = {
		prefixCls: 'ant-cascader',
		placeholder: '请选择',
		transitionName: 'slide-up',
		popupPlacement: 'bottomLeft',
		onChange: function onChange() {},

		options: [],
		displayRender: function displayRender(label) {
			return label.join(' / ');
		},

		disabled: false,
		allowClear: true,
		onPopupVisibleChange: function onPopupVisibleChange() {}
	};

	UI.Cascader = AntCascader;
}(Smart.UI, Smart.RC);