'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
	var TreeSelect = RC.TreeSelect;
	var classNames = RC.classNames;
	var TreeNode = TreeSelect.TreeNode;
	var SHOW_ALL = TreeSelect.SHOW_ALL;
	var SHOW_PARENT = TreeSelect.SHOW_PARENT;
	var SHOW_CHILD = TreeSelect.SHOW_CHILD;


	var AntTreeSelect = React.createClass({
		displayName: 'AntTreeSelect',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-select',
				transitionName: 'slide-up',
				choiceTransitionName: 'zoom',
				showSearch: false
			};
		},
		// openAnimation: animation,
		render: function render() {
			var _classNames;

			var props = this.props;
			var _props = this.props;
			var size = _props.size;
			var className = _props.className;
			var combobox = _props.combobox;
			var notFoundContent = _props.notFoundContent;
			var prefixCls = _props.prefixCls;


			var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, className, !!className), _classNames));

			if (combobox) {
				notFoundContent = null;
			}

			var checkable = props.treeCheckable;
			if (checkable) {
				checkable = React.createElement('span', { className: prefixCls + '-tree-checkbox-inner' });
			}

			return React.createElement(TreeSelect, _extends({}, this.props, {
				treeCheckable: checkable,
				className: cls,
				notFoundContent: notFoundContent }));
		}
	});

	AntTreeSelect.TreeNode = TreeNode;
	AntTreeSelect.SHOW_ALL = SHOW_ALL;
	AntTreeSelect.SHOW_PARENT = SHOW_PARENT;
	AntTreeSelect.SHOW_CHILD = SHOW_CHILD;
	UI.TreeSelect = AntTreeSelect;
}(Smart.UI, Smart.RC);