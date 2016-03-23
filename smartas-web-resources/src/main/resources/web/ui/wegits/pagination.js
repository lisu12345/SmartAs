'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+function (UI, RC) {
  var Pagination = RC.Pagination;
  var Locale = RC.Locale;
  var Select = UI.Select;

  var MiniSelect = function (_React$Component) {
    _inherits(MiniSelect, _React$Component);

    function MiniSelect() {
      _classCallCheck(this, MiniSelect);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(MiniSelect).apply(this, arguments));
    }

    _createClass(MiniSelect, [{
      key: 'render',
      value: function render() {
        return React.createElement(Select, _extends({ size: 'small' }, this.props));
      }
    }]);

    return MiniSelect;
  }(React.Component);

  MiniSelect.Option = Select.Option;

  var AntPagination = function (_React$Component2) {
    _inherits(AntPagination, _React$Component2);

    function AntPagination() {
      _classCallCheck(this, AntPagination);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AntPagination).apply(this, arguments));
    }

    _createClass(AntPagination, [{
      key: 'render',
      value: function render() {
        var className = this.props.className;
        var selectComponentClass = Select;

        if (this.props.size === 'small') {
          className += ' mini';
          selectComponentClass = MiniSelect;
        }

        return React.createElement(Pagination, _extends({ selectComponentClass: selectComponentClass,
          selectPrefixCls: 'ant-select'
        }, this.props, {
          className: className }));
      }
    }]);

    return AntPagination;
  }(React.Component);

  AntPagination.defaultProps = {
    locale: Locale.Pagination,
    className: '',
    prefixCls: 'ant-pagination'
  };

  UI.Pagination = AntPagination;
}(Smart.UI, Smart.RC);