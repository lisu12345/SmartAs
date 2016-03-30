'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+function (UI, RC) {
  var _ref = _;
  var assign = _ref.assign;
  var classNames = RC.classNames;


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

  var Group = function (_React$Component) {
    _inherits(Group, _React$Component);

    function Group() {
      _classCallCheck(this, Group);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
    }

    _createClass(Group, [{
      key: 'render',
      value: function render() {
        var className = classNames(_defineProperty({
          'ant-input-group': true
        }, this.props.className, !!this.props.className));
        return React.createElement(
          'span',
          { className: className,
            style: this.props.style },
          this.props.children
        );
      }
    }]);

    return Group;
  }(React.Component);

  Group.propTypes = {
    children: React.PropTypes.any
  };

  var Input = function (_React$Component2) {
    _inherits(Input, _React$Component2);

    function Input() {
      _classCallCheck(this, Input);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
    }

    _createClass(Input, [{
      key: 'renderLabledInput',
      value: function renderLabledInput(children) {
        var _classNames2;

        var props = this.props;
        var wrapperClassName = props.prefixCls + '-group';
        var addonClassName = wrapperClassName + '-addon';
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

        var className = classNames((_classNames2 = {}, _defineProperty(_classNames2, props.prefixCls + '-wrapper', true), _defineProperty(_classNames2, wrapperClassName, addonBefore || addonAfter), _classNames2));

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
        var _classNames3;

        var props = assign({}, this.props);
        var prefixCls = props.prefixCls;
        if (!props.type) {
          return props.children;
        }

        var inputClassName = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls, true), _defineProperty(_classNames3, prefixCls + '-sm', props.size === 'small'), _defineProperty(_classNames3, prefixCls + '-lg', props.size === 'large'), _defineProperty(_classNames3, props.className, !!props.className), _classNames3));

        var placeholder = props.placeholder;
        if (placeholder && ieGT9()) {
          placeholder = null;
        }
        if ('value' in props) {
          props.value = fixControlledValue(props.value);
        }
        switch (props.type) {
          case 'textarea':
            return React.createElement('textarea', _extends({}, props, { placeholder: placeholder, className: inputClassName, ref: 'input' }));
          default:
            return React.createElement('input', _extends({}, props, { placeholder: placeholder, className: inputClassName, ref: 'input' }));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return this.renderLabledInput(this.renderInput());
      }
    }]);

    return Input;
  }(React.Component);

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
    prefixCls: 'ant-input',
    type: 'text'
  };

  UI.Input = Input;
  UI.Input.Group = Group;
}(Smart.UI, Smart.RC);