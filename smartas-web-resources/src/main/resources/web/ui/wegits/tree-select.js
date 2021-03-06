'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var TreeSelect = RC.TreeSelect;
	var classNames = RC.classNames;
	var TreeNode = TreeSelect.TreeNode;

	var AntTreeSelect = React.createClass({
		displayName: 'AntTreeSelect',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-tree-select',
				transitionName: 'slide-up',
				choiceTransitionName: 'zoom',
				showSearch: false
			};
		},
		// openAnimation: animation,
		render: function render() {
			var props = this.props;
			var _props = this.props;
			var size = _props.size;
			var className = _props.className;
			var combobox = _props.combobox;
			var notFoundContent = _props.notFoundContent;

			var cls = classNames(_defineProperty({
				'ant-tree-select-lg': size === 'large',
				'ant-tree-select-sm': size === 'small'
			}, className, !!className));

			if (combobox) {
				notFoundContent = null;
			}

			var checkable = props.treeCheckable;
			if (checkable) {
				checkable = React.createElement('span', { className: props.prefixCls + '-tree-checkbox-inner' });
			}

			return React.createElement(TreeSelect, _extends({}, this.props, {
				treeCheckable: checkable,
				className: cls,
				notFoundContent: notFoundContent }));
		}
	});

	AntTreeSelect.TreeNode = TreeNode;
	UI.TreeSelect = AntTreeSelect;
})(Smart.UI, Smart.RC);