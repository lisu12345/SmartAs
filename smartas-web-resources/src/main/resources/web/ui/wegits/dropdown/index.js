'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
	var Dropdown = RC.Dropdown;
	var Button = UI.Button;
	var ButtonGroup = UI.ButtonGroup;
	var Icon = UI.Icon;

	var AntDropdown = React.createClass({
		displayName: 'AntDropdown',
		getDefaultProps: function getDefaultProps() {
			return {
				transitionName: 'slide-up',
				prefixCls: 'ant-dropdown'
			};
		},
		render: function render() {
			var _props = this.props;
			var overlay = _props.overlay;

			var otherProps = _objectWithoutProperties(_props, ['overlay']);

			var menu = React.cloneElement(overlay, {
				openTransitionName: 'zoom-big'
			});
			return React.createElement(Dropdown, _extends({}, otherProps, { overlay: menu }));
		}
	});

	var align = {
		points: ['tr', 'br'],
		overlay: {
			adjustX: 1,
			adjustY: 1
		},
		offset: [0, 3],
		targetOffset: [0, 0]
	};

	var DropdownButton = React.createClass({
		displayName: 'DropdownButton',
		getDefaultProps: function getDefaultProps() {
			return {
				align: align,
				type: 'default'
			};
		},
		render: function render() {
			return React.createElement(
				ButtonGroup,
				{ className: 'ant-dropdown-button' },
				React.createElement(
					Button,
					{ type: this.props.type },
					this.props.children
				),
				React.createElement(
					AntDropdown,
					this.props,
					React.createElement(
						Button,
						{ type: this.props.type },
						React.createElement(Icon, { type: 'down' })
					)
				)
			);
		}
	});

	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
})(Smart.UI, Smart.RC);