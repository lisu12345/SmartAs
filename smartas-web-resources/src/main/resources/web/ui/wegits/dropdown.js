'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (UI, RC) {
	var Dropdown = RC.Dropdown;
	var Button = UI.Button;
	var ButtonGroup = UI.ButtonGroup;
	var Icon = UI.Icon;


	var AntDropdown = React.createClass({
		displayName: 'AntDropdown',
		getDefaultProps: function getDefaultProps() {
			return {
				transitionName: 'slide-up',
				prefixCls: 'ant-dropdown',
				mouseEnterDelay: 0.15,
				mouseLeaveDelay: 0.1
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

	var DropdownButton = React.createClass({
		displayName: 'DropdownButton',
		getDefaultProps: function getDefaultProps() {
			return {
				align: {
					points: ['tr', 'br'],
					overlay: {
						adjustX: 1,
						adjustY: 1
					},
					offset: [0, 4],
					targetOffset: [0, 0]
				},
				type: 'default'
			};
		},
		render: function render() {
			var _props2 = this.props;
			var type = _props2.type;
			var overlay = _props2.overlay;
			var trigger = _props2.trigger;
			var align = _props2.align;
			var children = _props2.children;
			var className = _props2.className;

			var restProps = _objectWithoutProperties(_props2, ['type', 'overlay', 'trigger', 'align', 'children', 'className']);

			var cls = classNames({
				'ant-dropdown-button': true,
				className: !!className
			});
			return React.createElement(
				ButtonGroup,
				_extends({}, restProps, { className: cls }),
				React.createElement(
					Button,
					{ type: type },
					children
				),
				React.createElement(
					AntDropdown,
					{ align: align, overlay: overlay, trigger: trigger },
					React.createElement(
						Button,
						{ type: type },
						React.createElement(Icon, { type: 'down' })
					)
				)
			);
		}
	});

	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
}(Smart.UI, Smart.RC);