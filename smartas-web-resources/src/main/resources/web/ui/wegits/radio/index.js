'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI) {
	var Radio = React.createClass({
		displayName: 'Radio',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio',
				type: 'radio'
			};
		},
		render: function render() {
			var classString = this.props.className;
			if (classString) {
				classString += this.props.checked ? ' ' + classString + '-checked' : '';
			}
			if (this.props.disabled) {
				classString += ' ' + this.props.className + '-disabled';
			}
			return React.createElement(
				'label',
				{ className: classString },
				React.createElement(UI.Checkbox, _extends({}, this.props, { children: null })),
				this.props.children
			);
		}
	});

	var RadioButton = React.createClass({
		displayName: 'RadioButton',
		getDefaultProps: function getDefaultProps() {
			return {
				className: 'ant-radio-button'
			};
		},
		render: function render() {
			return React.createElement(Radio, this.props);
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

	var Group = React.createClass({
		displayName: 'Group',

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-group',
				disabled: false,
				size: 'default',
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

		render: function render() {
			var _this = this;

			var props = this.props;
			var children = React.Children.map(props.children, function (radio) {
				if (radio.props) {
					return React.createElement(Radio, _extends({
						key: radio.props.value }, radio.props, {
						onChange: _this.onRadioChange,
						checked: _this.state.value === radio.props.value,
						disabled: radio.props.disabled || _this.props.disabled
					}));
				}
				return radio;
			});
			var className = classNames(props.prefixCls, props.prefixCls + '-' + props.size);
			return React.createElement(
				'div',
				{ className: className },
				children
			);
		},
		onRadioChange: function onRadioChange(ev) {
			this.setState({
				value: ev.target.value
			});
			this.props.onChange(ev);
		}
	});

	Radio.Button = RadioButton;
	Radio.Group = Group;
	UI.Radio = Radio;
})(Smart.UI);