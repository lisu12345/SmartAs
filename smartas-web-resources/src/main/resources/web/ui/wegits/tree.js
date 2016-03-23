'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+function (UI, RC) {
  var Tree = RC.Tree;
  var animation = RC.animation;


  var AntTree = React.createClass({
    displayName: 'AntTree',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-tree',
        checkable: false,
        showIcon: false,
        openAnimation: animation
      };
    },
    render: function render() {
      var props = this.props;
      var checkable = props.checkable;
      if (checkable) {
        checkable = React.createElement('span', { className: props.prefixCls + '-checkbox-inner' });
      }
      return React.createElement(
        Tree,
        _extends({}, props, { checkable: checkable }),
        this.props.children
      );
    }
  });

  AntTree.TreeNode = Tree.TreeNode;
  UI.Tree = AntTree;
  UI.TreeNode = Tree.TreeNode;
}(Smart.UI, Smart.RC);