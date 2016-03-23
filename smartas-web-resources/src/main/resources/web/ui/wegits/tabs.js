'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+function (UI, RC) {
  var Tabs = RC.Tabs;
  var _React = React;
  var cloneElement = _React.cloneElement;
  var Icon = UI.Icon;

  var AntTabs = function (_React$Component) {
    _inherits(AntTabs, _React$Component);

    function AntTabs(props) {
      _classCallCheck(this, AntTabs);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntTabs).call(this, props));

      ['createNewTab', 'removeTab', 'handleChange'].forEach(function (method) {
        return _this[method] = _this[method].bind(_this);
      });
      return _this;
    }

    _createClass(AntTabs, [{
      key: 'createNewTab',
      value: function createNewTab(targetKey) {
        this.props.onEdit(targetKey, 'add');
      }
    }, {
      key: 'removeTab',
      value: function removeTab(targetKey, e) {
        e.stopPropagation();
        if (!targetKey) {
          return;
        }
        this.props.onEdit(targetKey, 'remove');
      }
    }, {
      key: 'handleChange',
      value: function handleChange(activeKey) {
        this.props.onChange(activeKey);
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames,
            _this2 = this;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var size = _props.size;
        var tabPosition = _props.tabPosition;
        var animation = _props.animation;
        var type = _props.type;
        var children = _props.children;
        var tabBarExtraContent = _props.tabBarExtraContent;

        var className = classNames((_classNames = {}, _defineProperty(_classNames, this.props.className, !!this.props.className), _defineProperty(_classNames, prefixCls + '-mini', size === 'small' || size === 'mini'), _defineProperty(_classNames, prefixCls + '-vertical', tabPosition === 'left' || tabPosition === 'right'), _defineProperty(_classNames, prefixCls + '-card', type.indexOf('card') >= 0), _defineProperty(_classNames, prefixCls + '-' + type, true), _classNames));
        if (tabPosition === 'left' || tabPosition === 'right' || type.indexOf('card') >= 0) {
          animation = null;
        }
        // only card type tabs can be added and closed
        if (type === 'editable-card') {
          children = children.map(function (child, index) {
            return cloneElement(child, {
              tab: React.createElement(
                'div',
                null,
                child.props.tab,
                React.createElement(Icon, { type: 'cross', onClick: _this2.removeTab.bind(_this2, child.key) })
              ),
              key: child.key || index
            });
          });
          // Add new tab handler
          tabBarExtraContent = React.createElement(
            'span',
            null,
            React.createElement(Icon, { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
            tabBarExtraContent
          );
        }
        return React.createElement(
          Tabs,
          _extends({}, this.props, {
            className: className,
            tabBarExtraContent: React.createElement(
              'div',
              { className: prefixCls + '-extra-content' },
              tabBarExtraContent
            ),
            onChange: this.handleChange,
            animation: animation }),
          children
        );
      }
    }]);

    return AntTabs;
  }(React.Component);

  AntTabs.defaultProps = {
    prefixCls: 'ant-tabs',
    animation: 'slide-horizontal',
    type: 'line', // or 'card' 'editable-card'
    onChange: function onChange() {},
    onEdit: function onEdit() {}
  };

  AntTabs.TabPane = Tabs.TabPane;
  UI.Tabs = AntTabs;
}(Smart.UI, Smart.RC);