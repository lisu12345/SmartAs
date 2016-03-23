'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
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
			var style = _props.style;

			var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _defineProperty(_classNames, className, !!className), _classNames));
			return React.createElement(
				'label',
				{ className: classString, style: style },
				'>',
				React.createElement(Radio, _extends({}, this.props, { style: null, children: null })),
				children
			);
		}
	});

	function getCheckedValue(children) {
		var value = null;
		var matched = false;
		React.Children.forEach(children, function (radio) {
			if (radio && radio.props && radio.props.checked) {
				value = radio.props.value;
				matched = true;
			}
		});
		return matched ? { value: value } : undefined;
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
			var value = void 0;
			if ('value' in props) {
				value = props.value;
			} else if ('defaultValue' in props) {
				value = props.defaultValue;
			} else {
				var checkedValue = getCheckedValue(props.children);
				value = checkedValue && checkedValue.value;
			}
			return {
				value: value
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value
				});
			} else {
				var checkedValue = getCheckedValue(nextProps.children);
				if (checkedValue) {
					this.setState({
						value: checkedValue.value
					});
				}
			}
		},
		onRadioChange: function onRadioChange(ev) {
			if (!('value' in this.props)) {
				this.setState({
					value: ev.target.value
				});
			}
			this.props.onChange(ev);
		},
		render: function render() {
			var _this = this,
			    _classNames2;

			var props = this.props;
			var children = React.Children.map(props.children, function (radio) {
				if (radio && (radio.type === Radio || radio.type === RadioButton) && radio.props) {
					var keyProps = {};
					if (!('key' in radio) && typeof radio.props.value === 'string') {
						keyProps.key = radio.props.value;
					}
					return React.cloneElement(radio, _extends({}, keyProps, radio.props, {
						onChange: _this.onRadioChange,
						checked: _this.state.value === radio.props.value,
						disabled: radio.props.disabled || _this.props.disabled
					}));
				}
				return radio;
			});
			var classString = classNames((_classNames2 = {}, _defineProperty(_classNames2, props.prefixCls, true), _defineProperty(_classNames2, props.prefixCls + '-' + props.size, props.size), _classNames2));
			return React.createElement(
				'div',
				{ className: classString, style: props.style },
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
}(Smart.UI, Smart.RC);