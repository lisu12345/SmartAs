'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var GregorianCalendar = RC.GregorianCalendar;
  var FullCalendar = RC.FullCalendar;
  var Select = UI.Select;
  var Radio = UI.Radio;
  var Locale = UI.Locale;
  var Group = Radio.Group;
  var Button = Radio.Button;
  var _React = React;
  var PropTypes = _React.PropTypes;
  var Component = _React.Component;

  var PREFIX_CLS = 'ant-fullcalendar';

  var Header = (function (_Component) {
    _inherits(Header, _Component);

    function Header() {
      _classCallCheck(this, Header);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Header).apply(this, arguments));
    }

    _createClass(Header, [{
      key: 'getYearSelectElement',
      value: function getYearSelectElement(year) {
        var _props = this.props;
        var yearSelectOffset = _props.yearSelectOffset;
        var yearSelectTotal = _props.yearSelectTotal;
        var locale = _props.locale;
        var prefixCls = _props.prefixCls;
        var fullscreen = _props.fullscreen;

        var start = year - yearSelectOffset;
        var end = start + yearSelectTotal;
        var suffix = locale.year === '年' ? '年' : '';

        var options = [];
        for (var index = start; index < end; index++) {
          options.push(React.createElement(
            Option,
            { key: '' + index },
            index + suffix
          ));
        }
        return React.createElement(
          Select,
          {
            style: { width: 75 },
            size: fullscreen ? null : 'small',
            dropdownMatchSelectWidth: false,
            dropdownMenuStyle: { minWidth: 103 },
            className: prefixCls + '-year-select',
            onChange: this.onYearChange.bind(this),
            value: String(year) },
          options
        );
      }
    }, {
      key: 'getMonthSelectElement',
      value: function getMonthSelectElement(month) {
        var props = this.props;
        var months = props.locale.format.months;
        var prefixCls = props.prefixCls;
        var fullscreen = props.fullscreen;

        var options = [];

        for (var index = 0; index < 12; index++) {
          options.push(React.createElement(
            Option,
            { key: '' + index },
            months[index]
          ));
        }

        return React.createElement(
          Select,
          {
            style: { minWidth: 70 },
            dropdownMenuStyle: { minWidth: 125 },
            size: fullscreen ? null : 'small',
            dropdownMatchSelectWidth: false,
            className: prefixCls + '-month-select',
            value: String(month),
            onChange: this.onMonthChange.bind(this) },
          options
        );
      }
    }, {
      key: 'onYearChange',
      value: function onYearChange(year) {
        var newValue = this.props.value.clone();
        newValue.setYear(parseInt(year, 10));
        this.props.onValueChange(newValue);
      }
    }, {
      key: 'onMonthChange',
      value: function onMonthChange(month) {
        var newValue = this.props.value.clone();
        newValue.setMonth(parseInt(month, 10));
        this.props.onValueChange(newValue);
      }
    }, {
      key: 'onTypeChange',
      value: function onTypeChange(e) {
        this.props.onTypeChange(e.target.value);
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props;
        var type = _props2.type;
        var value = _props2.value;
        var prefixCls = _props2.prefixCls;
        var locale = _props2.locale;

        var yearSelect = this.getYearSelectElement(value.getYear());

        var monthSelect = type === 'date' ? this.getMonthSelectElement(value.getMonth()) : null;

        var typeSwitch = React.createElement(
          Group,
          { onChange: this.onTypeChange.bind(this), value: type },
          React.createElement(
            Button,
            { value: 'date' },
            locale.month
          ),
          React.createElement(
            Button,
            { value: 'month' },
            locale.year
          )
        );

        return React.createElement(
          'div',
          { className: prefixCls + '-header' },
          yearSelect,
          monthSelect,
          typeSwitch
        );
      }
    }]);

    return Header;
  })(Component);

  Header.propTypes = {
    value: PropTypes.object,
    locale: PropTypes.object,
    yearSelectOffset: PropTypes.number,
    yearSelectTotal: PropTypes.number,
    onValueChange: PropTypes.func,
    onTypeChange: PropTypes.func,
    prefixCls: PropTypes.string,
    selectPrefixCls: PropTypes.string,
    type: PropTypes.string
  };

  Header.defaultProps = {
    prefixCls: PREFIX_CLS + '-header',
    yearSelectOffset: 10,
    yearSelectTotal: 20,
    onValueChange: noop,
    onTypeChange: noop
  };

  function zerofixed(v) {
    if (v < 10) return '0' + v;
    return v + '';
  }

  var Calendar = (function (_Component2) {
    _inherits(Calendar, _Component2);

    function Calendar(props) {
      _classCallCheck(this, Calendar);

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props));

      _this2.state = {
        value: _this2.parseDateFromValue(props.value || new Date()),
        mode: props.mode
      };
      return _this2;
    }

    _createClass(Calendar, [{
      key: 'parseDateFromValue',
      value: function parseDateFromValue(value) {
        var date = new GregorianCalendar(this.props.locale);
        date.setTime(+value);
        return date;
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          this.setState({
            value: this.parseDateFromValue(nextProps.value)
          });
        }
      }
    }, {
      key: 'monthCellRender',
      value: function monthCellRender(value, locale) {
        var prefixCls = this.props.prefixCls;
        var month = value.getMonth();
        return React.createElement(
          'div',
          { className: prefixCls + '-month' },
          React.createElement(
            'div',
            { className: prefixCls + '-value' },
            locale.format.shortMonths[month]
          ),
          React.createElement(
            'div',
            { className: prefixCls + '-content' },
            this.props.monthCellRender(value)
          )
        );
      }
    }, {
      key: 'dateCellRender',
      value: function dateCellRender(value) {
        var prefixCls = this.props.prefixCls;
        return React.createElement(
          'div',
          { className: prefixCls + '-date' },
          React.createElement(
            'div',
            { className: prefixCls + '-value' },
            zerofixed(value.getDayOfMonth())
          ),
          React.createElement(
            'div',
            { className: prefixCls + '-content' },
            this.props.dateCellRender(value)
          )
        );
      }
    }, {
      key: 'setValue',
      value: function setValue(value) {
        if (!('value' in this.props) && this.state.value !== value) {
          this.setState({ value: value });
        }
        this.props.onPanelChange(value, this.state.mode);
      }
    }, {
      key: 'setType',
      value: function setType(type) {
        var mode = type === 'date' ? 'month' : 'year';
        if (this.state.mode !== mode) {
          this.setState({ mode: mode });
          this.props.onPanelChange(this.state.value, mode);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var props = this.props;
        var _state = this.state;
        var value = _state.value;
        var mode = _state.mode;
        var locale = props.locale;
        var prefixCls = props.prefixCls;
        var style = props.style;
        var className = props.className;
        var fullscreen = props.fullscreen;

        var type = mode === 'year' ? 'month' : 'date';

        var cls = className || '';
        if (fullscreen) {
          cls += ' ' + prefixCls + '-fullscreen';
        }

        return React.createElement(
          'div',
          { className: cls, style: style },
          React.createElement(Header, {
            fullscreen: fullscreen,
            type: type,
            value: value,
            locale: locale.lang,
            prefixCls: prefixCls,
            onTypeChange: this.setType.bind(this),
            onValueChange: this.setValue.bind(this) }),
          React.createElement(FullCalendar, _extends({}, props, {
            Select: noop,
            locale: locale.lang,
            type: type,
            prefixCls: prefixCls,
            showHeader: false,
            value: value,
            monthCellRender: this.monthCellRender.bind(this),
            dateCellRender: this.dateCellRender.bind(this) }))
        );
      }
    }]);

    return Calendar;
  })(Component);

  Calendar.propTypes = {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    fullscreen: PropTypes.bool,
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onPanelChange: PropTypes.func,
    value: PropTypes.instanceOf(Date)
  };

  Calendar.defaultProps = {
    monthCellRender: noop,
    dateCellRender: noop,
    locale: Locale.Calendar,
    fullscreen: true,
    prefixCls: PREFIX_CLS,
    onPanelChange: noop,
    mode: 'month'
  };

  UI.Calendar = Calendar;
})(Smart.UI, Smart.RC);