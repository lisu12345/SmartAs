'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
  var DatePicker = RC.DatePicker;
  var TimePicker = RC.TimePicker;
  var DateTimeFormat = RC.DateTimeFormat;
  var classNames = RC.classNames;
  var GregorianCalendar = RC.GregorianCalendar;
  var Calendar = RC.Calendar;
  var MonthCalendar = RC.MonthCalendar;
  var RangeCalendar = RC.RangeCalendar;
  var Locale = UI.Locale;
  var objectAssign = _.assign;
  var defaultLocale = Locale.Calendar;
  var _React = React;
  var PropTypes = _React.PropTypes;
  var Component = _React.Component;


  var PickerMixin = {
    getLocale: function getLocale() {
      // 统一合并为完整的 Locale
      var locale = objectAssign({}, defaultLocale, this.props.locale);
      locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
      return locale;
    },
    getFormatter: function getFormatter() {
      var formats = this.formats = this.formats || {};
      var format = this.props.format;
      if (formats[format]) {
        return formats[format];
      }
      formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
      return formats[format];
    },
    parseDateFromValue: function parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, { locale: this.getLocale() });
        } else if (value instanceof Date) {
          var date = new GregorianCalendar(this.getLocale());
          date.setTime(+value);
          return date;
        }
      }
      return value;
    },


    // remove input readonly warning
    handleInputChange: function handleInputChange() {},
    toggleOpen: function toggleOpen(e) {
      this.setState({
        open: e.open
      });
    }
  };

  var AntRangePicker = React.createClass({
    displayName: 'AntRangePicker',
    getDefaultProps: function getDefaultProps() {
      return {
        defaultValue: [],
        format: 'yyyy-MM-dd',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange: function onChange() {},
        onOk: function onOk() {},

        locale: {},
        align: {
          offset: [0, -9]
        },
        open: false
      };
    },
    getInitialState: function getInitialState() {
      var _props = this.props;
      var value = _props.value;
      var defaultValue = _props.defaultValue;

      var start = value && value[0] || defaultValue[0];
      var end = value && value[1] || defaultValue[1];
      return {
        value: [this.parseDateFromValue(start), this.parseDateFromValue(end)]
      };
    },

    mixins: [PickerMixin],
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        var value = nextProps.value || [];
        var start = this.parseDateFromValue(value[0]);
        var end = this.parseDateFromValue(value[1]);
        this.setState({
          value: [start, end]
        });
      }
    },
    handleChange: function handleChange(value) {
      if (!('value' in this.props)) {
        this.setState({ value: value });
      }
      var startTime = value[0] ? new Date(value[0].getTime()) : null;
      var endTime = value[1] ? new Date(value[1].getTime()) : null;
      this.props.onChange([startTime, endTime]);
    },
    render: function render() {
      var _this = this;

      var locale = this.getLocale();
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      var defaultCalendarValue = new GregorianCalendar(locale);
      defaultCalendarValue.setTime(Date.now());

      var _props2 = this.props;
      var disabledDate = _props2.disabledDate;
      var showTime = _props2.showTime;
      var size = _props2.size;
      var startPlaceholder = _props2.startPlaceholder;
      var endPlaceholder = _props2.endPlaceholder;
      var getCalendarContainer = _props2.getCalendarContainer;
      var transitionName = _props2.transitionName;
      var disabled = _props2.disabled;
      var popupStyle = _props2.popupStyle;
      var align = _props2.align;
      var style = _props2.style;
      var onOk = _props2.onOk;

      var state = this.state;

      var timePicker = null;

      if (showTime) {
        timePicker = React.createElement(TimePicker, {
          prefixCls: 'ant-time-picker',
          placeholder: locale.lang.timePlaceholder,
          transitionName: 'slide-up' });
      }

      var calendarClassName = classNames(_defineProperty({}, 'ant-calendar-time', this.props.showTime));

      var pickerChangeHandler = {
        onChange: this.handleChange
      };

      var calendarHandler = {
        onOk: this.handleChange
      };

      if (timePicker) {
        pickerChangeHandler.onChange = function (value) {
          // Click clear button
          if (value === null || value.length === 0) {
            _this.handleChange(value);
          }
        };
      } else {
        calendarHandler = {};
      }

      var calendar = React.createElement(RangeCalendar, _extends({
        prefixCls: 'ant-calendar',
        className: calendarClassName,
        timePicker: timePicker,
        disabledDate: disabledDate,
        dateInputPlaceholder: [startPlaceholder, endPlaceholder],
        locale: locale.lang,
        onOk: onOk,
        defaultValue: [defaultCalendarValue, defaultCalendarValue]
      }, calendarHandler));

      var pickerClass = classNames({
        'ant-calendar-picker': true,
        'ant-calendar-picker-open': state.open
      });

      var pickerInputClass = classNames({
        'ant-calendar-range-picker': true,
        'ant-input': true,
        'ant-input-lg': size === 'large',
        'ant-input-sm': size === 'small'
      });

      return React.createElement(
        'span',
        { className: pickerClass, style: style },
        React.createElement(
          DatePicker,
          _extends({
            transitionName: transitionName,
            disabled: disabled,
            calendar: calendar,
            value: state.value,
            prefixCls: 'ant-calendar-picker-container',
            style: popupStyle,
            align: align,
            getCalendarContainer: getCalendarContainer,
            onOpen: this.toggleOpen,
            onClose: this.toggleOpen
          }, pickerChangeHandler),
          function (_ref) {
            var value = _ref.value;

            var start = value[0];
            var end = value[1];
            return React.createElement(
              'span',
              { className: pickerInputClass, disabled: disabled },
              React.createElement('input', {
                disabled: disabled,
                onChange: _this.handleInputChange,
                value: start && _this.getFormatter().format(start),
                placeholder: startPlaceholder,
                className: 'ant-calendar-range-picker-input' }),
              React.createElement(
                'span',
                { className: 'ant-calendar-range-picker-separator' },
                ' ~ '
              ),
              React.createElement('input', {
                disabled: disabled,
                onChange: _this.handleInputChange,
                value: end && _this.getFormatter().format(end),
                placeholder: endPlaceholder,
                className: 'ant-calendar-range-picker-input' }),
              React.createElement('span', { className: 'ant-calendar-picker-icon' })
            );
          }
        )
      );
    }
  });

  function createPicker(TheCalendar, defaultFormat) {
    return React.createClass({
      getDefaultProps: function getDefaultProps() {
        return {
          format: defaultFormat || 'yyyy-MM-dd',
          transitionName: 'slide-up',
          popupStyle: {},
          onChange: function onChange() {},
          onOk: function onOk() {},

          locale: {},
          align: {
            offset: [0, -9]
          },
          open: false
        };
      },
      getInitialState: function getInitialState() {
        return {
          value: this.parseDateFromValue(this.props.value || this.props.defaultValue)
        };
      },

      mixins: [PickerMixin],
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          this.setState({
            value: this.parseDateFromValue(nextProps.value)
          });
        }
      },
      handleChange: function handleChange(value) {
        if (!('value' in this.props)) {
          this.setState({ value: value });
        }
        var timeValue = value ? new Date(value.getTime()) : null;
        this.props.onChange(timeValue);
      },
      render: function render() {
        var _classNames2,
            _this2 = this;

        var locale = this.getLocale();
        // 以下两行代码
        // 给没有初始值的日期选择框提供本地化信息
        // 否则会以周日开始排
        var defaultCalendarValue = new GregorianCalendar(locale);
        defaultCalendarValue.setTime(Date.now());

        var placeholder = 'placeholder' in this.props ? this.props.placeholder : locale.lang.placeholder;

        var timePicker = this.props.showTime ? React.createElement(TimePicker, { prefixCls: 'ant-time-picker',
          placeholder: locale.lang.timePlaceholder,
          transitionName: 'slide-up' }) : null;

        var disabledTime = this.props.showTime ? this.props.disabledTime : null;

        var calendarClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, 'ant-calendar-time', this.props.showTime), _defineProperty(_classNames2, 'ant-calendar-month', MonthCalendar === TheCalendar), _classNames2));

        var calendar = React.createElement(TheCalendar, {
          formatter: this.getFormatter(),
          disabledDate: this.props.disabledDate,
          disabledTime: disabledTime,
          locale: locale.lang,
          timePicker: timePicker,
          defaultValue: defaultCalendarValue,
          dateInputPlaceholder: placeholder,
          prefixCls: 'ant-calendar',
          className: calendarClassName,
          showOk: this.props.showTime,
          onOk: this.props.onOk,
          showClear: true });

        var sizeClass = '';
        if (this.props.size === 'large') {
          sizeClass = ' ant-input-lg';
        } else if (this.props.size === 'small') {
          sizeClass = ' ant-input-sm';
        }

        var pickerClass = 'ant-calendar-picker';
        if (this.state.open) {
          pickerClass += ' ant-calendar-picker-open';
        }

        return React.createElement(
          'span',
          { className: pickerClass, style: this.props.style },
          React.createElement(
            DatePicker,
            {
              transitionName: this.props.transitionName,
              disabled: this.props.disabled,
              calendar: calendar,
              value: this.state.value,
              prefixCls: 'ant-calendar-picker-container',
              style: this.props.popupStyle,
              align: this.props.align,
              getCalendarContainer: this.props.getCalendarContainer,
              onOpen: this.toggleOpen,
              onClose: this.toggleOpen,
              onChange: this.handleChange },
            function (_ref2) {
              var value = _ref2.value;

              return React.createElement(
                'span',
                null,
                React.createElement('input', { disabled: _this2.props.disabled,
                  onChange: _this2.handleInputChange,
                  value: value && _this2.getFormatter().format(value),
                  placeholder: placeholder,
                  className: 'ant-calendar-picker-input ant-input' + sizeClass }),
                React.createElement('span', { className: 'ant-calendar-picker-icon' })
              );
            }
          )
        );
      }
    });
  }

  var AntDatePicker = createPicker(Calendar);
  var AntMonthPicker = createPicker(MonthCalendar, 'yyyy-MM');

  var AntCalendar = React.createClass({
    displayName: 'AntCalendar',
    getDefaultProps: function getDefaultProps() {
      return {
        locale: Locale.Calendar,
        prefixCls: 'ant-calendar'
      };
    },
    render: function render() {
      return React.createElement(Calendar, this.props);
    }
  });

  AntDatePicker.Calendar = AntCalendar;
  AntDatePicker.RangePicker = AntRangePicker;
  AntDatePicker.MonthPicker = AntMonthPicker;

  UI.DatePicker = AntDatePicker;
}(Smart.UI, Smart.RC);