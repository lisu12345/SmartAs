'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (UI, RC) {
  var _ref = _;
  var assign = _ref.assign;
  var classNames = RC.classNames;

  function prefixClsFn(prefixCls) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.map(function (s) {
      return prefixCls + '-' + s;
    }).join(' ');
  }

  function ieGT9() {
    if ((typeof document === 'undefined' ? 'undefined' : _typeof(document)) === undefined) {
      return false;
    }
    var documentMode = document.documentMode || 0;
    return documentMode > 9;
  }

  function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }

  var Group = (function (_React$Component) {
    _inherits(Group, _React$Component);

    function Group() {
      _classCallCheck(this, Group);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
    }

    _createClass(Group, [{
      key: 'render',
      value: function render() {
        var className = 'ant-input-group ' + (this.props.className || '');
        return React.createElement(
          'span',
          { className: className,
            style: this.props.style },
          this.props.children
        );
      }
    }]);

    return Group;
  })(React.Component);

  Group.propTypes = {
    children: React.PropTypes.any
  };

  var Input = (function (_React$Component2) {
    _inherits(Input, _React$Component2);

    function Input() {
      _classCallCheck(this, Input);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
    }

    _createClass(Input, [{
      key: 'renderLabledInput',
      value: function renderLabledInput(children) {
        var _classNames;

        var props = this.props;
        var wrapperClassName = prefixClsFn(props.prefixCls, 'input-group');
        var addonClassName = prefixClsFn(wrapperClassName, 'addon');
        var addonBefore = props.addonBefore ? React.createElement(
          'span',
          { className: addonClassName },
          props.addonBefore
        ) : null;

        var addonAfter = props.addonAfter ? React.createElement(
          'span',
          { className: addonClassName },
          props.addonAfter
        ) : null;

        var className = classNames((_classNames = {}, _defineProperty(_classNames, props.prefixCls + '-input-wrapper', true), _defineProperty(_classNames, wrapperClassName, addonBefore || addonAfter), _classNames));
        return React.createElement(
          'span',
          { className: className },
          addonBefore,
          children,
          addonAfter
        );
      }
    }, {
      key: 'renderInput',
      value: function renderInput() {
        var props = assign({}, this.props);
        var prefixCls = props.prefixCls;
        var inputClassName = prefixClsFn(prefixCls, 'input');
        if (!props.type) {
          return props.children;
        }

        switch (props.size) {
          case 'small':
            inputClassName = prefixClsFn(prefixCls, 'input', 'input-sm');
            break;
          case 'large':
            inputClassName = prefixClsFn(prefixCls, 'input', 'input-lg');
            break;
          default:
        }
        var placeholder = props.placeholder;
        if (placeholder && ieGT9()) {
          placeholder = null;
        }
        if ('value' in props) {
          props.value = fixControlledValue(props.value);
        }
        switch (props.type) {
          case 'textarea':
            return React.createElement('textarea', _extends({}, props, {
              placeholder: placeholder,
              className: inputClassName,
              ref: 'input' }));
          default:
            inputClassName = props.className ? props.className : inputClassName;
            return React.createElement('input', _extends({}, props, {
              placeholder: placeholder,
              className: inputClassName,
              ref: 'input' }));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return this.renderLabledInput(this.renderInput());
      }
    }]);

    return Input;
  })(React.Component);

  Input.propTypes = {
    type: React.PropTypes.string,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    size: React.PropTypes.oneOf(['small', 'default', 'large']),
    disabled: React.PropTypes.bool,
    value: React.PropTypes.any,
    defaultValue: React.PropTypes.any,
    className: React.PropTypes.string,
    addonBefore: React.PropTypes.node,
    addonAfter: React.PropTypes.node,
    prefixCls: React.PropTypes.string
  };

  Input.defaultProps = {
    defaultValue: '',
    disabled: false,
    prefixCls: 'ant',
    type: 'text'
  };

  UI.Input = Input;
  UI.Input.Group = Group;
})(Smart.UI, Smart.RC);