'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI) {
	var PropTypes = React.PropTypes;
	var Button = UI.Button;
	var ButtonGroup = UI.ButtonGroup;
	var Trigger = UI.Trigger;
	var Icon = UI.Icon;

	var autoAdjustOverflow = {
		adjustX: 1,
		adjustY: 1
	};

	var targetOffset = [0, 0];

	var placements = {
		topLeft: {
			points: ['bl', 'tl'],
			overflow: autoAdjustOverflow,
			offset: [0, -3],
			targetOffset: targetOffset
		},
		bottomLeft: {
			points: ['tl', 'bl'],
			overflow: autoAdjustOverflow,
			offset: [0, 3],
			targetOffset: targetOffset
		}
	};

	/*
  var MenuItem = Menu.Item;
  var menu = <Menu><MenuItem>1</MenuItem></Menu>;
  <DropDown trigger="click" animationName="" overlay={<>} onSelect={}>
 <button>open</button>
 </DropDown>
 */

	var Dropdown = React.createClass({
		displayName: 'Dropdown',

		propTypes: {
			minOverlayWidthMatchTrigger: PropTypes.bool,
			onVisibleChange: PropTypes.func,
			prefixCls: PropTypes.string,
			children: PropTypes.any,
			transitionName: PropTypes.string,
			overlayClassName: PropTypes.string,
			animation: PropTypes.any,
			align: PropTypes.object,
			overlayStyle: PropTypes.object,
			placement: PropTypes.string,
			trigger: PropTypes.array
		},

		getDefaultProps: function getDefaultProps() {
			return {
				minOverlayWidthMatchTrigger: true,
				prefixCls: 'ant-dropdown',
				trigger: ['hover'],
				overlayClassName: '',
				overlayStyle: {},
				defaultVisible: false,
				onVisibleChange: function onVisibleChange() {},

				placement: 'bottomLeft'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			if ('visible' in props) {
				return {
					visible: props.visible
				};
			}
			return {
				visible: props.defaultVisible
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(props) {
			if ('visible' in props) {
				this.setState({
					visible: props.visible
				});
			}
		},
		onClick: function onClick(e) {
			var props = this.props;
			var overlayProps = props.overlay.props;
			if (!('visible' in props)) {
				this.setState({
					visible: false
				});
			}
			if (overlayProps.onClick) {
				overlayProps.onClick(e);
			}
		},
		onVisibleChange: function onVisibleChange(v) {
			var props = this.props;
			if (!('visible' in props)) {
				this.setState({
					visible: v
				});
			}
			props.onVisibleChange(v);
		},
		getMenuElement: function getMenuElement() {
			var props = this.props;
			return React.cloneElement(props.overlay, {
				prefixCls: props.prefixCls + '-menu',
				onClick: this.onClick
			});
		},
		getPopupDomNode: function getPopupDomNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		afterVisibleChange: function afterVisibleChange(visible) {
			if (visible && this.props.minOverlayWidthMatchTrigger) {
				var overlayNode = this.getPopupDomNode();
				var rootNode = ReactDOM.findDOMNode(this);
				if (rootNode.offsetWidth > overlayNode.offsetWidth) {
					overlayNode.style.width = rootNode.offsetWidth + 'px';
				}
			}
		},
		render: function render() {
			var _props = this.props;
			var prefixCls = _props.prefixCls;
			var children = _props.children;
			var transitionName = _props.transitionName;
			var animation = _props.animation;
			var align = _props.align;
			var placement = _props.placement;
			var overlayClassName = _props.overlayClassName;
			var overlayStyle = _props.overlayStyle;
			var trigger = _props.trigger;

			return React.createElement(
				Trigger,
				{ prefixCls: prefixCls,
					ref: 'trigger',
					popupClassName: overlayClassName,
					popupStyle: overlayStyle,
					builtinPlacements: placements,
					action: trigger,
					popupPlacement: placement,
					popupAlign: align,
					popupTransitionName: transitionName,
					popupAnimation: animation,
					popupVisible: this.state.visible,
					afterPopupVisibleChange: this.afterVisibleChange,
					popup: this.getMenuElement(),
					onPopupVisibleChange: this.onVisibleChange
				},
				children
			);
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
					Dropdown,
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

	var AntDropdown = React.createClass({
		displayName: 'AntDropdown',

		getDefaultProps: function getDefaultProps() {
			return {
				transitionName: 'slide-up',
				prefixCls: 'ant-dropdown'
			};
		},
		render: function render() {
			var _props2 = this.props;
			var overlay = _props2.overlay;

			var otherProps = _objectWithoutProperties(_props2, ['overlay']);

			var menu = React.cloneElement(overlay, {
				openTransitionName: 'zoom-big'
			});
			return React.createElement(Dropdown, _extends({}, otherProps, { overlay: menu }));
		}
	});
	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
})(Smart.UI);