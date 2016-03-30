'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (UI, RC) {
	var Menu = UI.Menu;
	var Icon = UI.Icon;
	var Button = UI.Button;
	var Dropdown = UI.Dropdown;
	var SubMenu = UI.SubMenu;


	var Nav = React.createClass({
		displayName: 'Nav',
		getDefaultProps: function getDefaultProps() {
			return {
				current: '1',
				data: [],
				width: 224,
				openKeys: []
			};
		},
		getInitialState: function getInitialState() {
			return {
				openKeys: this.props.openKeys
			};
		},
		handleClick: function handleClick(e) {
			this.setState({
				current: e.key,
				openKeys: e.keyPath.slice(1)
			});
		},
		onToggle: function onToggle(info) {
			this.setState({
				openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
			});
		},

		render: function render() {
			var _props = this.props;
			var handleClick = _props.handleClick;
			var width = _props.width;
			var data = _props.data;

			var other = _objectWithoutProperties(_props, ['handleClick', 'width', 'data']);

			var loop = function loop(data) {
				return data.map(function (item) {
					if (item.children) {
						return React.createElement(
							SubMenu,
							{ title: item.name, key: item.id },
							loop(item.children)
						);
					}
					return React.createElement(
						Menu.Item,
						{ key: item.id },
						item.name
					);
				});
			};
			var nodes = loop(l2t(data, { key_id: 'id', key_parent: 'parentId' }));
			debugger;
			return React.createElement(
				Menu,
				{ onClick: this.handleClick, style: { width: width }, openKeys: this.state.openKeys, onOpen: this.onToggle, onClose: this.onToggle, selectedKeys: [this.props.current], mode: 'inline' },
				nodes
			);
		}
	});
	UI.Nav = Nav;
}(Smart.UI, Smart.RC);