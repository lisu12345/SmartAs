'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (UI, RC) {
  var InputNumber = RC.InputNumber;
  var classNames = RC.classNames;
  var _ref = _;
  var noop = _ref.noop;


  var AntInputNumber = React.createClass({
    displayName: 'AntInputNumber',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-input-number',
        step: 1
      };
    },
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var size = _props.size;

      var other = _objectWithoutProperties(_props, ['className', 'size']);

      var inputNumberClass = classNames(_defineProperty({
        'ant-input-number-lg': size === 'large',
        'ant-input-number-sm': size === 'small'
      }, className, !!className));

      return React.createElement(InputNumber, _extends({ className: inputNumberClass }, other));
    }
  });

  UI.InputNumber = AntInputNumber;
}(Smart.UI, Smart.RC);