'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI) {
	var Checkbox = (function (_React$Component) {
		_inherits(Checkbox, _React$Component);

		function Checkbox(props) {
			_classCallCheck(this, Checkbox);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));

			_this.handleChange = _this.handleChange.bind(_this);
			var checked = false;
			if ('checked' in props) {
				checked = props.checked;
			} else {
				checked = props.defaultChecked;
			}
			_this.state = {
				checked: checked
			};
			return _this;
		}

		_createClass(Checkbox, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('checked' in nextProps) {
					this.setState({
						checked: nextProps.checked
					});
				}
			}
		}, {
			key: 'handleChange',
			value: function handleChange(e) {
				var checked = e.target.checked;
				if (!('checked' in this.props)) {
					this.setState({
						checked: checked ? 1 : 0
					});
				}
				this.props.onChange(e, this.state.checked);
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var checked = this.state.checked;
				if (typeof checked === 'boolean') {
					checked = checked ? 1 : 0;
				}
				var className = classNames((_classNames = {}, _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, prefixCls, 1), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-checked-' + checked, !!checked), _defineProperty(_classNames, prefixCls + '-disabled', props.disabled), _classNames));
				return React.createElement(
					'span',
					{ className: className,
						style: props.style },
					React.createElement('span', { className: prefixCls + '-inner' }),
					React.createElement('input', _extends({}, props, {
						defaultChecked: !!props.defaultChecked,
						className: prefixCls + '-input',
						checked: !!checked,
						onChange: this.handleChange
					}))
				);
			}
		}]);

		return Checkbox;
	})(React.Component);

	Checkbox.propTypes = {
		prefixCls: React.PropTypes.string,
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		className: React.PropTypes.string,
		defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		onChange: React.PropTypes.func
	};

	Checkbox.defaultProps = {
		prefixCls: 'ant-checkbox',
		style: {},
		type: 'checkbox',
		className: '',
		defaultChecked: 0,
		onChange: function onChange() {}
	};

	var Group = React.createClass({
		displayName: 'Group',
		getDefaultProps: function getDefaultProps() {
			return {
				options: [],
				onChange: function onChange() {}
			};
		},

		propTypes: {
			defaultValue: React.PropTypes.array,
			value: React.PropTypes.array,
			options: React.PropTypes.array.isRequired,
			onChange: React.PropTypes.func
		},
		getInitialState: function getInitialState() {
			var _props = this.props;
			var value = _props.value;
			var defaultValue = _props.defaultValue;

			return {
				value: value || defaultValue || []
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value
				});
			}
		},
		toggleOption: function toggleOption(option) {
			var optionIndex = this.state.value.indexOf(option);
			var value = this.state.value;
			if (optionIndex === -1) {
				value.push(option);
			} else {
				value.splice(optionIndex, 1);
			}
			if (!('value' in this.props)) {
				this.setState({
					value: value
				});
			}
			this.props.onChange(value);
		},
		render: function render() {
			var _this2 = this;

			var options = this.props.options;
			return React.createElement(
				'div',
				{ className: 'ant-checkbox-group' },
				options.map(function (option) {
					return React.createElement(
						'label',
						{ className: 'ant-checkbox-group-item', key: option },
						React.createElement(Checkbox, { disabled: _this2.props.disabled,
							checked: _this2.state.value.indexOf(option) !== -1,
							onChange: _this2.toggleOption.bind(_this2, option) }),
						option
					);
				})
			);
		}
	});

	Checkbox.Group = Group;
	UI.Checkbox = Checkbox;
})(Smart.UI);