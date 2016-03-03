'use strict';

+(function (UI, RC) {

	var RcCheckbox = RC.Checkbox;

	var Checkbox = React.createClass({
		displayName: 'Checkbox',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-checkbox'
			};
		},
		render: function render() {
			return React.createElement(RcCheckbox, this.props);
		}
	});

	var Group = React.createClass({
		displayName: 'Group',
		getDefaultProps: function getDefaultProps() {
			return {
				options: [],
				defaultValue: [],
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
			var props = this.props;
			var value = undefined;
			if ('value' in props) {
				value = props.value;
			} else if ('defaultValue' in props) {
				value = props.defaultValue;
			}
			return { value: value };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value || []
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
				this.setState({ value: value });
			}
			this.props.onChange(value);
		},
		render: function render() {
			var _this = this;

			var options = this.props.options;
			return React.createElement(
				'div',
				{ className: 'ant-checkbox-group' },
				options.map(function (option) {
					return React.createElement(
						'label',
						{ className: 'ant-checkbox-group-item', key: option },
						React.createElement(Checkbox, { disabled: _this.props.disabled,
							checked: _this.state.value.indexOf(option) !== -1,
							onChange: _this.toggleOption.bind(_this, option) }),
						option
					);
				})
			);
		}
	});

	Checkbox.Group = Group;
	UI.Checkbox = Checkbox;
})(Smart.UI, Smart.RC);