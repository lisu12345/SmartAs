'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var Radio = RC.Radio;

	var AntRadio = React.createClass({
		displayName: 'AntRadio',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio'
			};
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var prefixCls = _props.prefixCls;
			var children = _props.children;
			var checked = _props.checked;
			var disabled = _props.disabled;
			var className = _props.className;

			var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _defineProperty(_classNames, className, !!className), _classNames));
			return React.createElement(
				'label',
				{ className: classString },
				React.createElement(Radio, _extends({}, this.props, { children: null })),
				children
			);
		}
	});

	function getCheckedValue(children) {
		var checkedValue = null;
		React.Children.forEach(children, function (radio) {
			if (radio.props && radio.props.checked) {
				checkedValue = radio.props.value;
			}
		});
		return checkedValue;
	}

	var RadioGroup = React.createClass({
		displayName: 'RadioGroup',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-group',
				disabled: false,
				onChange: function onChange() {}
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			return {
				value: props.value || props.defaultValue || getCheckedValue(props.children)
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps || getCheckedValue(nextProps.children)) {
				this.setState({
					value: nextProps.value || getCheckedValue(nextProps.children)
				});
			}
		},
		onRadioChange: function onRadioChange(ev) {
			this.setState({
				value: ev.target.value
			});
			this.props.onChange(ev);
		},
		render: function render() {
			var _this = this;

			var props = this.props;
			var children = React.Children.map(props.children, function (radio) {
				if (radio.props) {
					return React.cloneElement(radio, _extends({
						key: radio.props.value
					}, radio.props, {
						onChange: _this.onRadioChange,
						checked: _this.state.value === radio.props.value,
						disabled: radio.props.disabled || _this.props.disabled
					}));
				}
				return radio;
			});
			return React.createElement(
				'div',
				{ className: props.prefixCls + ' ' + props.prefixCls + '-' + props.size },
				children
			);
		}
	});

	var RadioButton = React.createClass({
		displayName: 'RadioButton',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-button'
			};
		},
		render: function render() {
			return React.createElement(AntRadio, this.props);
		}
	});

	AntRadio.Button = RadioButton;
	AntRadio.Group = RadioGroup;
	UI.Radio = AntRadio;
})(Smart.UI, Smart.RC);