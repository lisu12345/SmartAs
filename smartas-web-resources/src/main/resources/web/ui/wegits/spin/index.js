'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var isCssAnimationSupported = RC.cssAnimation.isCssAnimationSupported;

  var AntSpin = React.createClass({
    displayName: 'AntSpin',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-spin',
        spining: true
      };
    },

    propTypes: {
      className: React.PropTypes.string,
      size: React.PropTypes.oneOf(['small', 'default', 'large'])
    },

    isNestedPattern: function isNestedPattern() {
      return !!(this.props && this.props.children);
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var className = _props.className;
      var size = _props.size;
      var prefixCls = _props.prefixCls;

      var spinClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-spining', this.props.spining), _classNames));

      var spinElement = undefined;
      if (!isCssAnimationSupported) {
        // not support for animation, just use text instead
        spinElement = React.createElement(
          'div',
          { className: spinClassName },
          '加载中...'
        );
      } else {
        spinElement = React.createElement(
          'div',
          { className: spinClassName },
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-first' }),
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-second' }),
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-third' })
        );
      }

      if (this.isNestedPattern()) {
        return React.createElement(
          'div',
          { className: this.props.spining ? prefixCls + '-nested-loading' : '' },
          spinElement,
          React.createElement(
            'div',
            { className: prefixCls + '-container' },
            this.props.children
          )
        );
      }
      return spinElement;
    }
  });
  UI.Spin = AntSpin;
})(Smart.UI, Smart.RC);