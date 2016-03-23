'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
  var Switch = RC.Switch;


  var AntSwitch = React.createClass({
    displayName: 'AntSwitch',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-switch',
        size: 'default'
      };
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var size = _props.size;
      var className = _props.className;

      var cls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-' + size, true), _classNames));
      return React.createElement(Switch, _extends({ className: cls }, this.props));
    }
  });

  UI.Switch = AntSwitch;
}(Smart.UI, Smart.RC);