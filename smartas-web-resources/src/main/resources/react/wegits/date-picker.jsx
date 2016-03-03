+(function(UI,RC) {
    const {DatePicker,TimePicker,DateTimeFormat,classNames} = RC,
      {GregorianCalendar,Calendar,MonthCalendar,RangeCalendar} = RC,
      {Locale} = UI,
      objectAssign = _.assign,
      defaultLocale = Locale.Calendar,
      {PropTypes, Component} = React;

  const PickerMixin = {
    getLocale() {
      // 统一合并为完整的 Locale
      let locale = objectAssign({}, defaultLocale, this.props.locale);
      locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
      return locale;
    },

    getFormatter() {
      const formats = this.formats = this.formats || {};
      let format = this.props.format;
      if (formats[format]) {
        return formats[format];
      }
      formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
      return formats[format];
    },

    parseDateFromValue(value) {
      if (value) {
        if (typeof value === 'string') {
          return this.getFormatter().parse(value, { locale: this.getLocale() });
        } else if (value instanceof Date) {
          let date = new GregorianCalendar(this.getLocale());
          date.setTime(+value);
          return date;
        }
      }
      return value;
    },

    // remove input readonly warning
    handleInputChange() {
    },
    
    toggleOpen(e) {
      this.setState({
        open: e.open
      });
    },
  };



  const AntRangePicker = React.createClass({
    getDefaultProps() {
      return {
        defaultValue: [],
        format: 'yyyy-MM-dd',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        transitionName: 'slide-up',
        popupStyle: {},
        onChange() {
        	
        },
        onOk() {
        	
        },
        locale: {},
        align: {
          offset: [0, -9],
        },
        open: false
      };
    },
    getInitialState() {
      const { value, defaultValue } = this.props;
      const start = (value && value[0]) || defaultValue[0];
      const end = (value && value[1]) || defaultValue[1];
      return {
        value: [
          this.parseDateFromValue(start),
          this.parseDateFromValue(end)
        ]
      };
    },
    mixins: [PickerMixin],
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        const value = nextProps.value || [];
        const start = this.parseDateFromValue(value[0]);
        const end = this.parseDateFromValue(value[1]);
        this.setState({
          value: [start, end]
        });
      }
    },
    handleChange(value) {
      if (!('value' in this.props)) {
        this.setState({ value });
      }
      const startTime = value[0] ? new Date(value[0].getTime()) : null;
      const endTime = value[1] ? new Date(value[1].getTime()) : null;
      this.props.onChange([startTime, endTime]);
    },
    render() {
      const locale = this.getLocale();
      // 以下两行代码
      // 给没有初始值的日期选择框提供本地化信息
      // 否则会以周日开始排
      let defaultCalendarValue = new GregorianCalendar(locale);
      defaultCalendarValue.setTime(Date.now());

      const { disabledDate, showTime, size, startPlaceholder, endPlaceholder, getCalendarContainer,
          transitionName, disabled, popupStyle, align, style, onOk } = this.props;
    const state = this.state;

    let timePicker = null;

    if (showTime) {
      timePicker = (<TimePicker
        prefixCls="ant-time-picker"
        placeholder={locale.lang.timePlaceholder}
        transitionName="slide-up" />);
    }

    const calendarClassName = classNames({
      ['ant-calendar-time']: this.props.showTime,
    });

    let pickerChangeHandler = {
      onChange: this.handleChange,
    };

    let calendarHandler = {
      onOk: this.handleChange,
    };

    if (timePicker) {
      pickerChangeHandler.onChange = (value) => {
        // Click clear button
        if (value === null || value.length === 0) {
          this.handleChange(value);
        }
      };
    } else {
      calendarHandler = {};
    }

    const calendar = (
      <RangeCalendar
        prefixCls="ant-calendar"
        className={calendarClassName}
        timePicker={timePicker}
        disabledDate={disabledDate}
        dateInputPlaceholder={[startPlaceholder, endPlaceholder]}
        locale={locale.lang}
        onOk={onOk}
        defaultValue={[defaultCalendarValue, defaultCalendarValue]}
        {...calendarHandler}
      />
    );

    const pickerClass = classNames({
      'ant-calendar-picker': true,
      'ant-calendar-picker-open': state.open
    });

    const pickerInputClass = classNames({
      'ant-calendar-range-picker': true,
      'ant-input': true,
      'ant-input-lg': size === 'large',
      'ant-input-sm': size === 'small',
    });

    return (<span className={pickerClass} style={style}>
      <DatePicker
        transitionName={transitionName}
        disabled={disabled}
        calendar={calendar}
        value={state.value}
        prefixCls="ant-calendar-picker-container"
        style={popupStyle}
        align={align}
        getCalendarContainer={getCalendarContainer}
        onOpen={this.toggleOpen}
        onClose={this.toggleOpen}
        {...pickerChangeHandler}
      >
        {
          ({ value }) => {
            const start = value[0];
            const end = value[1];
            return (
              <span className={pickerInputClass} disabled={disabled}>
                <input
                  disabled={disabled}
                  onChange={this.handleInputChange}
                  value={start && this.getFormatter().format(start)}
                  placeholder={startPlaceholder}
                  className="ant-calendar-range-picker-input" />
                <span className="ant-calendar-range-picker-separator"> ~ </span>
                <input
                  disabled={disabled}
                  onChange={this.handleInputChange}
                  value={end && this.getFormatter().format(end)}
                  placeholder={endPlaceholder}
                  className="ant-calendar-range-picker-input" />
                <span className="ant-calendar-picker-icon" />
              </span>
            );
          }
        }
      </DatePicker>
    </span>);
    }
  });

  function createPicker(TheCalendar, defaultFormat) {
    return React.createClass({
      getDefaultProps() {
        return {
          format: defaultFormat || 'yyyy-MM-dd',
          transitionName: 'slide-up',
          popupStyle: {},
          onChange() {
        	  
          },
          onOk() {
        	  
          },
          locale: {},
          align: {
            offset: [0, -9],
          },
          open: false,
        };
      },
      getInitialState() {
        return {
          value: this.parseDateFromValue(this.props.value || this.props.defaultValue)
        };
      },
      mixins: [PickerMixin],
      componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
          this.setState({
            value: this.parseDateFromValue(nextProps.value)
          });
        }
      },
      handleChange(value) {
        if (!('value' in this.props)) {
          this.setState({ value });
        }
        const timeValue = value ? new Date(value.getTime()) : null;
        this.props.onChange(timeValue);
      },
      render() {
        const locale = this.getLocale();
        // 以下两行代码
        // 给没有初始值的日期选择框提供本地化信息
        // 否则会以周日开始排
        let defaultCalendarValue = new GregorianCalendar(locale);
        defaultCalendarValue.setTime(Date.now());

        const placeholder = ('placeholder' in this.props)
          ? this.props.placeholder : locale.lang.placeholder;

        const timePicker = this.props.showTime
          ? <TimePicker prefixCls="ant-time-picker"
            placeholder={locale.lang.timePlaceholder}
            transitionName="slide-up" />
          : null;

        const disabledTime = this.props.showTime ? this.props.disabledTime : null;

        const calendarClassName = classNames({
          ['ant-calendar-time']: this.props.showTime,
          ['ant-calendar-month']: MonthCalendar === TheCalendar,
        });

        const calendar = (
          <TheCalendar
            formatter={this.getFormatter()}
            disabledDate={this.props.disabledDate}
            disabledTime={disabledTime}
            locale={locale.lang}
            timePicker={timePicker}
            defaultValue={defaultCalendarValue}
            dateInputPlaceholder={placeholder}
            prefixCls="ant-calendar"
            className={calendarClassName}
            showOk={this.props.showTime}
            onOk={this.props.onOk}
            showClear />
        );

        let sizeClass = '';
        if (this.props.size === 'large') {
          sizeClass = ' ant-input-lg';
        } else if (this.props.size === 'small') {
          sizeClass = ' ant-input-sm';
        }

        let pickerClass = 'ant-calendar-picker';
        if (this.state.open) {
          pickerClass += ' ant-calendar-picker-open';
        }

        return (
          <span className={pickerClass}>
            <DatePicker transitionName={this.props.transitionName}
              disabled={this.props.disabled}
              calendar={calendar}
              value={this.state.value}
              prefixCls="ant-calendar-picker-container"
              style={this.props.popupStyle}
              align={this.props.align}
              getCalendarContainer={this.props.getCalendarContainer}
              onOpen={this.toggleOpen}
              onClose={this.toggleOpen}
              onChange={this.handleChange}>
              {
                ({ value }) => {
                  return (
                    <span>
                      <input disabled={this.props.disabled}
                        onChange={this.handleInputChange}
                        value={value && this.getFormatter().format(value)}
                        placeholder={placeholder}
                        style={this.props.style}
                        className={'ant-calendar-picker-input ant-input' + sizeClass} />
                      <span className="ant-calendar-picker-icon" />
                    </span>
                  );
                }
              }
            </DatePicker>
          </span>
        );
      }
    });
  }

  const AntDatePicker = createPicker(Calendar);
  const AntMonthPicker = createPicker(MonthCalendar, 'yyyy-MM');

  const AntCalendar = React.createClass({
    getDefaultProps() {
      return {
        locale: Locale.Calendar,
        prefixCls: 'ant-calendar',
      };
    },
    render() {
      return <Calendar {...this.props} />;
    }
  });

  AntDatePicker.Calendar = AntCalendar;
  AntDatePicker.RangePicker = AntRangePicker;
  AntDatePicker.MonthPicker = AntMonthPicker;

  UI.DatePicker = AntDatePicker;

})(Smart.UI,Smart.RC);  

