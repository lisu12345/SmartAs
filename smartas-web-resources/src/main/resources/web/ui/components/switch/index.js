'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI) {
  var noop = _.noop;

  var Switch = React.createClass({
    displayName: 'Switch',

    propTypes: {
      className: React.PropTypes.string,
      prefixCls: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      style: React.PropTypes.object,
      checkedChildren: React.PropTypes.any,
      unCheckedChildren: React.PropTypes.any,
      onChange: React.PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-switch',
        style: {},
        checkedChildren: null,
        unCheckedChildren: null,
        className: '',
        defaultChecked: false,
        onChange: noop
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var checked = false;
      if ('checked' in props) {
        checked = !!props.checked;
      } else {
        checked = !!props.defaultChecked;
      }
      return {
        checked: checked
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('checked' in nextProps) {
        this.setState({
          checked: !!nextProps.checked
        });
      }
    },
    toggle: function toggle() {
      var checked = !this.state.checked;
      this.setState({
        checked: checked
      });
      this.props.onChange(checked);
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var className = _props.className;
      var prefixCls = _props.prefixCls;
      var disabled = _props.disabled;
      var style = _props.style;
      var checkedChildren = _props.checkedChildren;
      var unCheckedChildren = _props.unCheckedChildren;

      var checked = this.state.checked;
      var switchClassName = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
      return React.createElement(
        'span',
        { className: switchClassName,
          onClick: disabled ? noop : this.toggle,
          style: style },
        React.createElement(
          'span',
          { className: prefixCls + '-inner' },
          checked ? checkedChildren : unCheckedChildren
        )
      );
    }
  });

  var AntSwitch = React.createClass({
    displayName: 'AntSwitch',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-switch',
        size: 'default'
      };
    },
    render: function render() {
      var _classNames2;

      var _props2 = this.props;
      var prefixCls = _props2.prefixCls;
      var size = _props2.size;
      var className = _props2.className;

      var cls = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-' + size, true), _classNames2));
      return React.createElement(Switch, _extends({ className: cls }, this.props));
    }
  });

  UI.Switch = AntSwitch;
})(Smart.UI);