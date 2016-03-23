'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var DateTimeFormat = RC.DateTimeFormat;
  var TimePicker = RC.TimePicker;
  var classNames = RC.classNames;
  var Locale = UI.Locale;
  var objectAssign = _.assign;

  var defaultLocale = Locale.TimePicker;

  var AntTimePicker = React.createClass({
    displayName: 'AntTimePicker',
    getDefaultProps: function getDefaultProps() {
      return {
        format: 'HH:mm:ss',
        prefixCls: 'ant-time-picker',
        onChange: function onChange() {},

        locale: {},
        align: {
          offset: [0, -2]
        },
        disabled: false,
        disabledHours: undefined,
        disabledMinutes: undefined,
        disabledSeconds: undefined,
        hideDisabledOptions: false,
        size: 'default',
        placement: 'bottomLeft',
        transitionName: 'slide-up'
      };
    },
    getFormatter: function getFormatter() {
      return new DateTimeFormat(this.props.format);
    },

    /**
     * 获得输入框的 className
     */
    getSizeClass: function getSizeClass() {
      var sizeClass = '';
      if (this.props.size === 'large') {
        sizeClass = ' ant-input-lg';
      } else if (this.props.size === 'small') {
        sizeClass = ' ant-input-sm';
      }
      return sizeClass;
    },

    /**
     * 获得输入框的默认值
     */
    parseTimeFromValue: function parseTimeFromValue(value) {
      if (value) {
        return this.getFormatter().parse(value, {
          locale: this.getLocale(),
          obeyCount: true
        });
      }
      return undefined;
    },
    handleChange: function handleChange(value) {
      this.props.onChange(value ? new Date(value.getTime()) : null);
    },
    getLocale: function getLocale() {
      // 统一合并为完整的 Locale
      var locale = objectAssign({}, defaultLocale, this.props.locale);
      locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
      return locale;
    },
    render: function render() {
      var _classNames;

      var props = objectAssign({}, this.props);
      props.placeholder = 'placeholder' in this.props ? props.placeholder : this.getLocale().lang.placeholder;
      if (props.defaultValue) {
        props.defaultValue = this.parseTimeFromValue(props.defaultValue);
      } else {
        delete props.defaultValue;
      }
      if (props.value) {
        props.value = this.parseTimeFromValue(props.value);
      } else {
        delete props.value;
      }
      var className = classNames((_classNames = {}, _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, props.prefixCls + '-' + props.size, true), _classNames));
      if (props.format.indexOf('ss') < 0) {
        props.showSecond = false;
      }
      if (props.format.indexOf('HH') < 0) {
        props.showHour = false;
      }

      return React.createElement(TimePicker, _extends({}, props, {
        className: className,
        gregorianCalendarLocale: this.getLocale(),
        formatter: this.getFormatter(),
        onChange: this.handleChange
      }));
    }
  });
  UI.TimePicker = AntTimePicker;
})(Smart.UI, Smart.RC);