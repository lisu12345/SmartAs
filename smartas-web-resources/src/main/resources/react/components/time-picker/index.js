+ function(RC) {
	const {noop} = _,
		{Locale,Trigger,DateTimeFormat,GregorianCalendar,classnames} = RC,
		{PropTypes} = React;
	
	function getFormatter(format, locale) {
	  if (typeof format === 'string') {
	    return new DateTimeFormat(format, locale.format);
	  }
	  return format;
	}

	const autoAdjustOverflow = {
	  adjustX: 1,
	  adjustY: 1,
	};

	const targetOffset = [0, 0];

	const placements = {
	  bottomLeft: {
	    points: ['tl', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -3],
	    targetOffset,
	  },
	  bottomRight: {
	    points: ['tr', 'tr'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -3],
	    targetOffset,
	  },
	  topRight: {
	    points: ['br', 'br'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 3],
	    targetOffset,
	  },
	  topLeft: {
	    points: ['bl', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 3],
	    targetOffset,
	  },
	};

	function createSelection(field, start, end) {
	  if (field.createTextRange) {
	    const selRange = field.createTextRange();
	    selRange.collapse(true);
	    selRange.moveStart('character', start);
	    selRange.moveEnd('character', end);
	    selRange.select();
	    field.focus();
	  } else if (field.setSelectionRange) {
	    field.focus();
	    field.setSelectionRange(start, end);
	  } else if (typeof field.selectionStart !== 'undefined') {
	    field.selectionStart = start;
	    field.selectionEnd = end;
	    field.focus();
	  }
	}


	//import enUs from '../locale/en_US';
	const CommonMixin ={
	  propTypes: {
	    prefixCls: PropTypes.string,
	    locale: PropTypes.object,
	  },

	  getDefaultProps() {
	    return {
	      prefixCls: 'rc-time-picker',
	      locale: Locale.TimePicker,
	    };
	  },
	};


	const scrollTo = (element, to, duration) => {
	  const requestAnimationFrame = window.requestAnimationFrame ||
	    function requestAnimationFrameTimeout() {
	      return setTimeout(arguments[0], 10);
	    };
	  // jump to target if duration zero
	  if (duration <= 0) {
	    element.scrollTop = to;
	    return;
	  }
	  const difference = to - element.scrollTop;
	  const perTick = difference / duration * 10;

	  requestAnimationFrame(() => {
	    element.scrollTop = element.scrollTop + perTick;
	    if (element.scrollTop === to) return;
	    scrollTo(element, to, duration - 10);
	  });
	};

	const Select = React.createClass({
	  propTypes: {
	    prefixCls: PropTypes.string,
	    options: PropTypes.array,
	    gregorianCalendarLocale: PropTypes.object,
	    selectedIndex: PropTypes.number,
	    type: PropTypes.string,
	    onSelect: PropTypes.func,
	    onMouseEnter: PropTypes.func,
	  },

	  componentDidMount() {
	    // jump to selected option
	    this.scrollToSelected(0);
	  },

	  componentDidUpdate(prevProps) {
	    // smooth scroll to selected option
	    if (prevProps.selectedIndex !== this.props.selectedIndex) {
	      this.scrollToSelected(120);
	    }
	  },

	  onSelect(value) {
	    const { onSelect, type } = this.props;
	    onSelect(type, value);
	  },

	  getOptions() {
	    const { options, selectedIndex, prefixCls } = this.props;
	    return options.map((item, index) => {
	      const cls = classnames({
	        [`${prefixCls}-select-option-selected`]: selectedIndex === index,
	        [`${prefixCls}-select-option-disabled`]: item.disabled,
	      });
	      let onclick = null;
	      if (!item.disabled) {
	        onclick = this.onSelect.bind(this, +item.value);
	      }
	      return <li className={cls} key={index} onClick={onclick} disabled={item.disabled}>{item.value}</li>;
	    });
	  },

	  scrollToSelected(duration) {
	    // move to selected item
	    const select = ReactDom.findDOMNode(this);
	    const list = ReactDom.findDOMNode(this.refs.list);
	    let index = this.props.selectedIndex;
	    if (index < 0) {
	      index = 0;
	    }
	    const topOption = list.children[index];
	    const to = topOption.offsetTop;
	    scrollTo(select, to, duration);
	  },

	  render() {
	    if (this.props.options.length === 0) {
	      return null;
	    }

	    const { prefixCls } = this.props;

	    return (
	      <div className={`${prefixCls}-select`}
	           onMouseEnter={this.props.onMouseEnter}>
	        <ul ref="list">{this.getOptions()}</ul>
	      </div>
	    );
	  },
	});


	const Header = React.createClass({
	  propTypes: {
	    formatter: PropTypes.object,
	    prefixCls: PropTypes.string,
	    gregorianCalendarLocale: PropTypes.object,
	    locale: PropTypes.object,
	    disabledDate: PropTypes.func,
	    placeholder: PropTypes.string,
	    value: PropTypes.object,
	    hourOptions: PropTypes.array,
	    minuteOptions: PropTypes.array,
	    secondOptions: PropTypes.array,
	    disabledHours: PropTypes.func,
	    disabledMinutes: PropTypes.func,
	    disabledSeconds: PropTypes.func,
	    onChange: PropTypes.func,
	    onClear: PropTypes.func,
	    onEsc: PropTypes.func,
	    allowEmpty: PropTypes.bool,
	    currentSelectPanel: PropTypes.string,
	  },

	  getInitialState() {
	    const value = this.props.value;
	    return {
	      str: value && this.props.formatter.format(value) || '',
	      invalid: false,
	    };
	  },

	  componentDidMount() {
	    this.timer = setTimeout(this.selectRange, 0);
	  },

	  componentWillReceiveProps(nextProps) {
	    const value = nextProps.value;
	    this.setState({
	      str: value && nextProps.formatter.format(value) || '',
	      invalid: false,
	    });
	  },

	  componentDidUpdate() {
	    this.timer = setTimeout(this.selectRange, 0);
	  },

	  componentWillUnmount() {
	    clearTimeout(this.timer);
	  },

	  onInputChange(event) {
	    const str = event.target.value;
	    this.setState({
	      str,
	    });
	    let value = null;
	    const {formatter, gregorianCalendarLocale, hourOptions, minuteOptions, secondOptions, disabledHours, disabledMinutes, disabledSeconds, onChange, allowEmpty} = this.props;

	    if (str) {
	      const originalValue = this.props.value;
	      try {
	        value = formatter.parse(str, {
	          locale: gregorianCalendarLocale,
	          obeyCount: true,
	        });
	      } catch (ex) {
	        this.setState({
	          invalid: true,
	        });
	        return;
	      }

	      if (value) {
	        // if time value not allowed, response warning.
	        if (
	          hourOptions.indexOf(value.getHourOfDay()) < 0 ||
	          minuteOptions.indexOf(value.getMinutes()) < 0 ||
	          secondOptions.indexOf(value.getSeconds()) < 0
	        ) {
	          this.setState({
	            invalid: true,
	          });
	          return;
	        }

	        // if time value is disabled, response warning.
	        const disabledHourOptions = disabledHours();
	        const disabledMinuteOptions = disabledMinutes(value.getHourOfDay());
	        const disabledSecondOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());
	        if (
	          (disabledHourOptions && disabledHourOptions.indexOf(value.getHourOfDay()) >= 0) ||
	          (disabledMinuteOptions && disabledMinuteOptions.indexOf(value.getMinutes()) >= 0) ||
	          (disabledSecondOptions && disabledSecondOptions.indexOf(value.getSeconds()) >= 0)
	        ) {
	          this.setState({
	            invalid: true,
	          });
	          return;
	        }

	        if (originalValue && value) {
	          if (
	            originalValue.getHourOfDay() !== value.getHourOfDay() ||
	            originalValue.getMinutes() !== value.getMinutes() ||
	            originalValue.getSeconds() !== value.getSeconds()
	          ) {
	            // keep other fields for rc-calendar
	            const changedValue = originalValue.clone();
	            changedValue.setHourOfDay(value.getHourOfDay());
	            changedValue.setMinutes(value.getMinutes());
	            changedValue.setSeconds(value.getSeconds());
	            onChange(changedValue);
	          }
	        } else if (originalValue !== value) {
	          onChange(value);
	        }
	      } else {
	        this.setState({
	          invalid: true,
	        });
	        return;
	      }
	    } else if (allowEmpty) {
	      onChange(null);
	    } else {
	      this.setState({
	        invalid: true,
	      });
	      return;
	    }

	    this.setState({
	      invalid: false,
	    });
	  },

	  onKeyDown(e) {
	    if (e.keyCode === 27) {
	      this.props.onEsc();
	    }
	  },

	  onClear() {
	    this.setState({str: ''});
	    this.props.onClear();
	  },

	  getClearButton() {
	    const { locale, prefixCls, allowEmpty } = this.props;
	    if (!allowEmpty) {
	      return null;
	    }
	    return <a className={`${prefixCls}-clear-btn`} role="button" title={locale.clear} onMouseDown={this.onClear}/>;
	  },

	  getInput() {
	    const { prefixCls, placeholder } = this.props;
	    const { invalid, str } = this.state;
	    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
	    return (<input className={`${prefixCls}-input  ${invalidClass}`}
	                   ref="input"
	                   onKeyDown={this.onKeyDown}
	                   value={str}
	                   placeholder={placeholder} onChange={this.onInputChange}/>);
	  },

	  selectRange() {
	    this.refs.input.focus();
	    if (this.props.currentSelectPanel && this.refs.input.value) {
	      let selectionRangeStart = 0;
	      let selectionRangeEnd = 0;
	      if (this.props.currentSelectPanel === 'hour') {
	        selectionRangeStart = 0;
	        selectionRangeEnd = this.refs.input.value.indexOf(':');
	      } else if (this.props.currentSelectPanel === 'minute') {
	        selectionRangeStart = this.refs.input.value.indexOf(':') + 1;
	        selectionRangeEnd = this.refs.input.value.lastIndexOf(':');
	      } else if (this.props.currentSelectPanel === 'second') {
	        selectionRangeStart = this.refs.input.value.lastIndexOf(':') + 1;
	        selectionRangeEnd = this.refs.input.value.length;
	      }
	      if (selectionRangeEnd - selectionRangeStart === 2) {
	        createSelection(this.refs.input, selectionRangeStart, selectionRangeEnd);
	      }
	    }
	  },

	  render() {
	    const { prefixCls } = this.props;
	    return (
	      <div className={`${prefixCls}-input-wrap`}>
	        {this.getInput()}
	        {this.getClearButton()}
	      </div>
	    );
	  },
	});

	const formatOption = (option, disabledOptions) => {
	  let value = `${option}`;
	  if (option < 10) {
	    value = `0${option}`;
	  }

	  let disabled = false;
	  if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
	    disabled = true;
	  }

	  return {
	    value,
	    disabled,
	  };
	};

	const Combobox = React.createClass({
	  propTypes: {
	    formatter: PropTypes.object,
	    prefixCls: PropTypes.string,
	    value: PropTypes.object,
	    onChange: PropTypes.func,
	    showHour: PropTypes.bool,
	    gregorianCalendarLocale: PropTypes.object,
	    showSecond: PropTypes.bool,
	    hourOptions: PropTypes.array,
	    minuteOptions: PropTypes.array,
	    secondOptions: PropTypes.array,
	    disabledHours: PropTypes.func,
	    disabledMinutes: PropTypes.func,
	    disabledSeconds: PropTypes.func,
	    onCurrentSelectPanelChange: PropTypes.func,
	  },

	  onItemChange(type, itemValue) {
	    const { onChange } = this.props;
	    let value = this.props.value;
	    if (value) {
	      value = value.clone();
	    } else {
	      value = this.getNow().clone();
	    }
	    if (type === 'hour') {
	      value.setHourOfDay(itemValue);
	    } else if (type === 'minute') {
	      value.setMinutes(itemValue);
	    } else {
	      value.setSeconds(itemValue);
	    }
	    onChange(value);
	  },

	  onEnterSelectPanel(range) {
	    this.props.onCurrentSelectPanelChange(range);
	  },

	  getHourSelect(hour) {
	    const { prefixCls, hourOptions, disabledHours, showHour } = this.props;
	    if (!showHour) {
	      return null;
	    }
	    const disabledOptions = disabledHours();

	    return (
	      <Select
	        prefixCls={prefixCls}
	        options={hourOptions.map(option => formatOption(option, disabledOptions))}
	        selectedIndex={hourOptions.indexOf(hour)}
	        type="hour"
	        onSelect={this.onItemChange}
	        onMouseEnter={this.onEnterSelectPanel.bind(this, 'hour')}
	      />
	    );
	  },

	  getMinuteSelect(minute) {
	    const { prefixCls, minuteOptions, disabledMinutes } = this.props;
	    const value = this.props.value || this.getNow();
	    const disabledOptions = disabledMinutes(value.getHourOfDay());

	    return (
	      <Select
	        prefixCls={prefixCls}
	        options={minuteOptions.map(option => formatOption(option, disabledOptions))}
	        selectedIndex={minuteOptions.indexOf(minute)}
	        type="minute"
	        onSelect={this.onItemChange}
	        onMouseEnter={this.onEnterSelectPanel.bind(this, 'minute')}
	      />
	    );
	  },

	  getSecondSelect(second) {
	    const { prefixCls, secondOptions, disabledSeconds, showSecond } = this.props;
	    if (!showSecond) {
	      return null;
	    }
	    const value = this.props.value || this.getNow();
	    const disabledOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());

	    return (
	      <Select
	        prefixCls={prefixCls}
	        options={secondOptions.map(option => formatOption(option, disabledOptions))}
	        selectedIndex={secondOptions.indexOf(second)}
	        type="second"
	        onSelect={this.onItemChange}
	        onMouseEnter={this.onEnterSelectPanel.bind(this, 'second')}
	      />
	    );
	  },

	  getNow() {
	    if (this.showNow) {
	      return this.showNow;
	    }
	    const value = new GregorianCalendar(this.props.gregorianCalendarLocale);
	    value.setTime(Date.now());
	    this.showNow = value;
	    return value;
	  },

	  render() {
	    const { prefixCls } = this.props;
	    const value = this.props.value || this.getNow();
	    return (
	      <div className={`${prefixCls}-combobox`}>
	        {this.getHourSelect(value.getHourOfDay())}
	        {this.getMinuteSelect(value.getMinutes())}
	        {this.getSecondSelect(value.getSeconds())}
	      </div>
	    );
	  },
	});


	function generateOptions(length, disabledOptions, hideDisabledOptions) {
	  const arr = [];
	  for (let value = 0; value < length; value++) {
	    if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
	      arr.push(value);
	    }
	  }
	  return arr;
	}

	const Panel = React.createClass({
	  propTypes: {
	    prefixCls: PropTypes.string,
	    value: PropTypes.object,
	    locale: PropTypes.object,
	    placeholder: PropTypes.string,
	    gregorianCalendarLocale: PropTypes.object,
	    formatter: PropTypes.object,
	    disabledHours: PropTypes.func,
	    disabledMinutes: PropTypes.func,
	    disabledSeconds: PropTypes.func,
	    hideDisabledOptions: PropTypes.bool,
	    onChange: PropTypes.func,
	    onEsc: PropTypes.func,
	    allowEmpty: PropTypes.bool,
	    showHour: PropTypes.bool,
	    showSecond: PropTypes.bool,
	    onClear: PropTypes.func,
	  },

	  mixins: [CommonMixin],

	  getDefaultProps() {
	    return {
	      onChange: noop,
	      onClear: noop,
	    };
	  },

	  getInitialState() {
	    return {
	      value: this.props.value,
	      selectionRange: [],
	    };
	  },

	  componentWillReceiveProps(nextProps) {
	    const value = nextProps.value;
	    if (value) {
	      this.setState({
	        value,
	      });
	    }
	  },

	  onChange(newValue) {
	    this.setState({ value: newValue });
	    this.props.onChange(newValue);
	  },

	  onClear() {
	    this.props.onClear();
	  },

	  onCurrentSelectPanelChange(currentSelectPanel) {
	    this.setState({ currentSelectPanel });
	  },

	  render() {
	    const { locale, prefixCls, placeholder, disabledHours, disabledMinutes, disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showSecond, formatter, gregorianCalendarLocale } = this.props;
	    const value = this.state.value;
	    const disabledHourOptions = disabledHours();
	    const disabledMinuteOptions = disabledMinutes(value ? value.getHourOfDay() : null);
	    const disabledSecondOptions = disabledSeconds(value ? value.getHourOfDay() : null, value ? value.getMinutes() : null);
	    const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
	    const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
	    const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);

	    return (
	      <div className={`${prefixCls}-inner`}>
	        <Header
	          prefixCls={prefixCls}
	          gregorianCalendarLocale={gregorianCalendarLocale}
	          locale={locale}
	          value={value}
	          currentSelectPanel={this.state.currentSelectPanel}
	          onEsc={this.props.onEsc}
	          formatter={formatter}
	          placeholder={placeholder}
	          hourOptions={hourOptions}
	          minuteOptions={minuteOptions}
	          secondOptions={secondOptions}
	          disabledHours={disabledHours}
	          disabledMinutes={disabledMinutes}
	          disabledSeconds={disabledSeconds}
	          onChange={this.onChange}
	          onClear={this.onClear}
	          allowEmpty={allowEmpty}
	        />
	        <Combobox
	          prefixCls={prefixCls}
	          value={value}
	          gregorianCalendarLocale={gregorianCalendarLocale}
	          formatter={formatter}
	          onChange={this.onChange}
	          showHour={showHour}
	          showSecond={showSecond}
	          hourOptions={hourOptions}
	          minuteOptions={minuteOptions}
	          secondOptions={secondOptions}
	          disabledHours={disabledHours}
	          disabledMinutes={disabledMinutes}
	          disabledSeconds={disabledSeconds}
	          onCurrentSelectPanelChange={this.onCurrentSelectPanelChange}
	        />
	      </div>
	    );
	  },
	});

	function refFn(field, component) {
	  this[field] = component;
	}

	const Picker = React.createClass({
	  propTypes: {
	    prefixCls: PropTypes.string,
	    locale: PropTypes.object,
	    value: PropTypes.object,
	    disabled: PropTypes.bool,
	    allowEmpty: PropTypes.bool,
	    defaultValue: PropTypes.object,
	    open: PropTypes.bool,
	    defaultOpen: PropTypes.bool,
	    align: PropTypes.object,
	    placement: PropTypes.any,
	    transitionName: PropTypes.string,
	    getPopupContainer: PropTypes.func,
	    placeholder: PropTypes.string,
	    formatter: PropTypes.any,
	    showHour: PropTypes.bool,
	    style: PropTypes.object,
	    className: PropTypes.string,
	    showSecond: PropTypes.bool,
	    disabledHours: PropTypes.func,
	    disabledMinutes: PropTypes.func,
	    disabledSeconds: PropTypes.func,
	    hideDisabledOptions: PropTypes.bool,
	    onChange: PropTypes.func,
	    onOpen: PropTypes.func,
	    onClose: PropTypes.func,
	  },

	  mixins: [CommonMixin],

	  getDefaultProps() {
	    return {
	      defaultOpen: false,
	      style: {},
	      className: '',
	      align: {},
	      allowEmpty: true,
	      showHour: true,
	      showSecond: true,
	      disabledHours: noop,
	      disabledMinutes: noop,
	      disabledSeconds: noop,
	      hideDisabledOptions: false,
	      placement: 'bottomLeft',
	      onChange: noop,
	      onOpen: noop,
	      onClose: noop,
	    };
	  },

	  getInitialState() {
	    this.savePanelRef = refFn.bind(this, 'panelInstance');
	    const { defaultOpen, defaultValue, open = defaultOpen, value = defaultValue } = this.props;
	    return {
	      open,
	      value,
	    };
	  },

	  componentWillReceiveProps(nextProps) {
	    const { value, open } = nextProps;
	    if ('value' in nextProps) {
	      this.setState({
	        value,
	      });
	    }
	    if (open !== undefined) {
	      this.setState({open});
	    }
	  },

	  onPanelChange(value) {
	    this.setValue(value);
	  },

	  onPanelClear() {
	    this.setValue(null);
	    this.setOpen(false);
	  },

	  onVisibleChange(open) {
	    this.setOpen(open);
	  },

	  onEsc() {
	    this.setOpen(false);
	    this.refs.picker.focus();
	  },

	  onKeyDown(e) {
	    if (e.keyCode === 40) {
	      this.setOpen(true);
	    }
	  },

	  setValue(value) {
	    if (!('value' in this.props)) {
	      this.setState({
	        value,
	      });
	    }
	    this.props.onChange(value);
	  },

	  getFormatter() {
	    const formatter = this.props.formatter;
	    const locale = this.props.locale;
	    if (formatter) {
	      if (formatter === this.lastFormatter) {
	        return this.normalFormatter;
	      }
	      this.normalFormatter = getFormatter(formatter, locale);
	      this.lastFormatter = formatter;
	      return this.normalFormatter;
	    }
	    if (!this.props.showSecond) {
	      if (!this.notShowSecondFormatter) {
	        this.notShowSecondFormatter = getFormatter('HH:mm', locale);
	      }
	      return this.notShowSecondFormatter;
	    }
	    if (!this.props.showHour) {
	      if (!this.notShowHourFormatter) {
	        this.notShowHourFormatter = getFormatter('mm:ss', locale);
	      }
	      return this.notShowHourFormatter;
	    }
	    if (!this.normalFormatter) {
	      this.normalFormatter = getFormatter('HH:mm:ss', locale);
	    }
	    return this.normalFormatter;
	  },

	  getPanelElement() {
	    const { prefixCls, defaultValue, locale, placeholder, disabledHours,
	      disabledMinutes, disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showSecond } = this.props;
	    return (
	      <Panel
	        prefixCls={`${prefixCls}-panel`}
	        ref={this.savePanelRef}
	        value={this.state.value}
	        onChange={this.onPanelChange}
	        gregorianCalendarLocale={locale.calendar}
	        onClear={this.onPanelClear}
	        defaultValue={defaultValue}
	        showHour={showHour}
	        onEsc={this.onEsc}
	        showSecond={showSecond}
	        locale={locale}
	        allowEmpty={allowEmpty}
	        formatter={this.getFormatter()}
	        placeholder={placeholder}
	        disabledHours={disabledHours}
	        disabledMinutes={disabledMinutes}
	        disabledSeconds={disabledSeconds}
	        hideDisabledOptions={hideDisabledOptions}
	      />
	    );
	  },

	  setOpen(open, callback) {
	    const {onOpen, onClose} = this.props;
	    if (this.state.open !== open) {
	      this.setState({
	        open,
	      }, callback);
	      const event = {
	        open,
	      };
	      if (open) {
	        onOpen(event);
	      } else {
	        onClose(event);
	      }
	    }
	  },

	  render() {
	    const { prefixCls, placeholder, placement, align, disabled, transitionName, style, className, showHour, showSecond, getPopupContainer } = this.props;
	    const { open, value } = this.state;
	    let popupClassName;
	    if (!showHour || !showSecond) {
	      popupClassName = `${prefixCls}-panel-narrow`;
	    }
	    return (
	      <Trigger
	        prefixCls={`${prefixCls}-panel`}
	        popupClassName={popupClassName}
	        popup={this.getPanelElement()}
	        popupAlign={align}
	        builtinPlacements={placements}
	        popupPlacement={placement}
	        action={disabled ? [] : ['click']}
	        destroyPopupOnHide
	        getPopupContainer={getPopupContainer}
	        popupTransitionName={transitionName}
	        popupVisible={open}
	        onPopupVisibleChange={this.onVisibleChange}
	      >
	        <span className={`${prefixCls} ${className}`} style={style}>
	          <input className={`${prefixCls}-input`}
	                 ref="picker" type="text" placeholder={placeholder}
	                 readOnly
	                 onKeyDown={this.onKeyDown}
	                 disabled={disabled} value={value && this.getFormatter().format(value)}/>
	          <span className={`${prefixCls}-icon`}/>
	        </span>
	      </Trigger>
	    );
	  },
	});

	RC.TimePicker = Picker;
}(Smart.RC)

