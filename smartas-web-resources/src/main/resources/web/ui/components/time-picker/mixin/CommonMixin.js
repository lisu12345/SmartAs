'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _en_US = require('../locale/en_US');

var _en_US2 = _interopRequireDefault(_en_US);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  propTypes: {
    prefixCls: _react.PropTypes.string,
    locale: _react.PropTypes.object
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-time-picker',
      locale: _en_US2.default
    };
  }
};