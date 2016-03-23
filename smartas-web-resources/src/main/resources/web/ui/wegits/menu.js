'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var animation = RC.animation;
  var Menu = RC.Menu;
  var MenuItemGroup = RC.MenuItemGroup;
  var MenuItem = RC.MenuItem;
  var Item = Menu.Item;
  var Divider = Menu.Divider;
  var SubMenu = Menu.SubMenu;
  var ItemGroup = Menu.ItemGroup;


  var AntMenu = React.createClass({
    displayName: 'AntMenu',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-menu',
        onClick: noop,
        onOpen: noop,
        onClose: noop,
        className: '',
        theme: 'light' };
    },
    // or dark
    getInitialState: function getInitialState() {
      return {
        openKeys: []
      };
    },
    handleClick: function handleClick(e) {
      this.setState({
        openKeys: []
      });
      this.props.onClick(e);
    },
    handleOpenKeys: function handleOpenKeys(e) {
      this.setState({
        openKeys: e.openKeys
      });
      this.props.onOpen(e);
    },
    handleCloseKeys: function handleCloseKeys(e) {
      this.setState({
        openKeys: e.openKeys
      });
      this.props.onClose(e);
    },
    render: function render() {
      var openAnimation = this.props.openAnimation || this.props.openTransitionName;
      if (!openAnimation) {
        switch (this.props.mode) {
          case 'horizontal':
            openAnimation = 'slide-up';
            break;
          case 'vertical':
            openAnimation = 'zoom-big';
            break;
          case 'inline':
            openAnimation = animation;
            break;
          default:
        }
      }

      var props = {};
      var className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
      if (this.props.mode !== 'inline') {
        // 这组属性的目的是
        // 弹出型的菜单需要点击后立即关闭
        // 另外，弹出型的菜单的受控模式没有使用场景
        props = {
          openKeys: this.state.openKeys,
          onClick: this.handleClick,
          onOpen: this.handleOpenKeys,
          onClose: this.handleCloseKeys,
          openTransitionName: openAnimation,
          className: className
        };
      } else {
        props = {
          openAnimation: openAnimation,
          className: className
        };
      }
      return React.createElement(Menu, _extends({}, this.props, props));
    }
  });

  AntMenu.Divider = Divider;
  AntMenu.Item = Item;
  AntMenu.SubMenu = SubMenu;
  AntMenu.ItemGroup = ItemGroup;

  UI.Menu = AntMenu;
  UI.MenuItem = Item;
  UI.SubMenu = SubMenu;
  UI.MenuItemGroup = ItemGroup;
}(Smart.UI, Smart.RC);