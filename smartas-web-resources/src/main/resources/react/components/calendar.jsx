+function(RC) {
	const {noop} = _,
		{GregorianCalendar,DateTimeFormat,KeyCode,Locale,classnames,Util,Trigger} = RC,
		{createChainedFunction,Children} = Util,
		{Component,PropTypes} = React,
		toFragment = Children.mapSelf;

	const defaultDisabledTime = {
	  disabledHours() {
	    return [];
	  },
	  disabledMinutes() {
	    return [];
	  },
	  disabledSeconds() {
	    return [];
	  },
	};

	function getTodayTime(value) {
	  const today = value.clone();
	  today.setTime(Date.now());
	  return today;
	}

	function getTitleString(value) {
	  return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
	}

	function getTodayTimeStr(value) {
	  const today = getTodayTime(value);
	  return getTitleString(today);
	}

	function getFormatter(format, locale) {
	  if (typeof format === 'string') {
	    return new DateTimeFormat(format, locale.format);
	  }
	  return format;
	}

	function syncTime(from, to) {
	  to.setHourOfDay(from.getHourOfDay());
	  to.setMinutes(from.getMinutes());
	  to.setSeconds(from.getSeconds());
	}

	function getTimeConfig(value, disabledTime) {
	  let disabledTimeConfig = disabledTime ? disabledTime(value) : {};
	  disabledTimeConfig = {
	    ...defaultDisabledTime,
	    ...disabledTimeConfig,
	  };
	  return disabledTimeConfig;
	}

	function isTimeValidByConfig(value, disabledTimeConfig) {
	  let invalidTime = false;
	  if (value) {
	    const hour = value.getHourOfDay();
	    const minutes = value.getMinutes();
	    const seconds = value.getSeconds();
	    const disabledHours = disabledTimeConfig.disabledHours();
	    if (disabledHours.indexOf(hour) === -1) {
	      const disabledMinutes = disabledTimeConfig.disabledMinutes(hour);
	      if (disabledMinutes.indexOf(minutes) === -1) {
	        const disabledSeconds = disabledTimeConfig.disabledSeconds(hour, minutes);
	        invalidTime = disabledSeconds.indexOf(seconds) !== -1;
	      } else {
	        invalidTime = true;
	      }
	    } else {
	      invalidTime = true;
	    }
	  }
	  return !invalidTime;
	}

	function isTimeValid(value, disabledTime) {
	  const disabledTimeConfig = getTimeConfig(value, disabledTime);
	  return isTimeValidByConfig(value, disabledTimeConfig);
	}

	function isAllowedDate(value, disabledDate, disabledTime) {
	  if (disabledDate) {
	    if (disabledDate(value)) {
	      return false;
	    }
	  }
	  if (disabledTime) {
	    if (!isTimeValid(value, disabledTime)) {
	      return false;
	    }
	  }
	  return true;
	}

	const DateConstants = {
		DATE_ROW_COUNT: 6,
		DATE_COL_COUNT: 7,
	};


	class DateTHead extends React.Component {
	  render() {
	    const props = this.props;
	    const value = props.value;
	    const locale = props.locale;
	    const prefixCls = props.prefixCls;
	    const veryShortWeekdays = [];
	    const weekDays = [];
	    const firstDayOfWeek = value.getFirstDayOfWeek();
	    let showWeekNumberEl;

	    for (let dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
	      const index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
	      veryShortWeekdays[dateColIndex] = locale.format.veryShortWeekdays[index];
	      weekDays[dateColIndex] = locale.format.weekdays[index];
	    }

	    if (props.showWeekNumber) {
	      showWeekNumberEl = (
	        <th role="columnheader" className = {`${prefixCls}-column-header ${prefixCls}-week-number-header`}>
	          <span className ={`${prefixCls}-column-header-inner`}>x</span>
	        </th>);
	    }
	    const weekDaysEls = weekDays.map((day, xindex)=> {
	      return (
	        <th key={xindex} role="columnheader" title={day} className ={`${prefixCls}-column-header`}>
	          <span className = {`${prefixCls}-column-header-inner`}>
	          {veryShortWeekdays[xindex]}
	          </span>
	        </th>);
	    });
	    return (<thead>
	      <tr role="row">
	              {showWeekNumberEl}
	              {weekDaysEls}
	      </tr>
	    </thead>);
	  }
	}

	function isSameDay(one, two) {
	  return one && two && one.compareToDay(two) === 0;
	}

	function beforeCurrentMonthYear(current, today) {
	  if (current.getYear() < today.getYear()) {
	    return 1;
	  }
	  return current.getYear() === today.getYear() &&
	    current.getMonth() < today.getMonth();
	}

	function afterCurrentMonthYear(current, today) {
	  if (current.getYear() > today.getYear()) {
	    return 1;
	  }
	  return current.getYear() === today.getYear() &&
	    current.getMonth() > today.getMonth();
	}

	function getIdFromDate(date) {
	  return 'rc-calendar-' + date.getYear() +
	    '-' + date.getMonth() + '-' +
	    date.getDayOfMonth();
	}

	function handleDayClick(current) {
	  this.props.onSelect(current);
	}

	function handleCellMouseEnter(current) {
	  this.props.onDayHover(current);
	}

	const DateTBody = React.createClass({
	  getDefaultProps() {
	    return {
	      onDayHover: noop,
	    };
	  },

	  render() {
	    const props = this.props;
	    let iIndex;
	    let jIndex;
	    let current;
	    const dateTable = [];
	    const showWeekNumber = props.showWeekNumber;
	    const value = props.value;
	    const selectedValue = props.selectedValue;
	    const today = value.clone();
	    const prefixCls = props.prefixCls;
	    const cellClass = prefixCls + '-cell';
	    const weekNumberCellClass = prefixCls + ('-week-number-cell');
	    const dateClass = prefixCls + ('-date');
	    const dateRender = props.dateRender;
	    const disabledDate = props.disabledDate;
	    const todayClass = prefixCls + ('-today');
	    const selectedClass = prefixCls + ('-selected-day');
	    const inRangeClass = prefixCls + ('-in-range-cell');
	    const lastMonthDayClass = prefixCls + ('-last-month-cell');
	    const nextMonthDayClass = prefixCls + ('-next-month-btn-day');
	    const disabledClass = prefixCls + ('-disabled-cell');
	    const firstDisableClass = prefixCls + ('-disabled-cell-first-of-row');
	    const lastDisableClass = prefixCls + ('-disabled-cell-last-of-row');
	    today.setTime(Date.now());
	    const month1 = value.clone();
	    month1.set(value.getYear(), value.getMonth(), 1);
	    const day = month1.getDayOfWeek();
	    const lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
	    // calculate last month
	    const lastMonth1 = month1.clone();
	    lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
	    let passed = 0;
	    for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
	      for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
	        current = lastMonth1;
	        if (passed) {
	          current = current.clone();
	          current.addDayOfMonth(passed);
	        }
	        dateTable.push(current);
	        passed++;
	      }
	    }
	    const tableHtml = [];
	    passed = 0;
	    for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
	      let weekNumberCell;
	      const dateCells = [];
	      if (showWeekNumber) {
	        weekNumberCell = (
	          <td key={dateTable[passed].getWeekOfYear()} role="gridcell"
	              className={weekNumberCellClass}>{dateTable[passed].getWeekOfYear()}</td>
	        );
	      }
	      for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
	        let next = null;
	        let last = null;
	        current = dateTable[passed];
	        if (jIndex < DateConstants.DATE_COL_COUNT - 1) {
	          next = dateTable[passed + 1];
	        }
	        if (jIndex > 0) {
	          last = dateTable[passed - 1];
	        }
	        let cls = cellClass;
	        let disabled = false;
	        let selected = false;

	        if (isSameDay(current, today)) {
	          cls += ' ' + todayClass;
	        }

	        const isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
	        const isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

	        if (selectedValue && Array.isArray(selectedValue)) {
	          if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
	            const startValue = selectedValue[0];
	            const endValue = selectedValue[1];
	            if (startValue) {
	              if (isSameDay(current, startValue)) {
	                selected = true;
	              }
	            }
	            if (startValue && endValue) {
	              if (isSameDay(current, endValue) && !selectedValue.hovering) {
	                selected = true;
	              } else if (current.compareToDay(startValue) > 0 && current.compareToDay(endValue) < 0) {
	                cls += ' ' + inRangeClass;
	              }
	            }
	          }
	        } else if (isSameDay(current, selectedValue)) {
	          selected = true;
	        }
	        if (isBeforeCurrentMonthYear) {
	          cls += ' ' + lastMonthDayClass;
	        }
	        if (isAfterCurrentMonthYear) {
	          cls += ' ' + nextMonthDayClass;
	        }

	        if (disabledDate) {
	          if (disabledDate(current, value)) {
	            disabled = true;

	            if (!last || !disabledDate(last, value)) {
	              cls += ' ' + firstDisableClass;
	            }

	            if (!next || !disabledDate(next, value)) {
	              cls += ' ' + lastDisableClass;
	            }
	          }
	        }

	        if (selected) {
	          cls += ' ' + selectedClass;
	        }

	        if (disabled) {
	          cls += ' ' + disabledClass;
	        }

	        let dateHtml;
	        if (dateRender) {
	          dateHtml = dateRender(current, value);
	        } else {
	          dateHtml = (
	            <span
	              key={getIdFromDate(current)}
	              className={dateClass}
	              aria-selected={selected}
	              aria-disabled={disabled}>
	              {current.getDayOfMonth()}
	            </span>);
	        }

	        dateCells.push(
	          <td key={passed}
	              onClick={disabled ? noop : handleDayClick.bind(this, current)}
	              onMouseEnter={disabled ? noop : handleCellMouseEnter.bind(this, current)}
	              role="gridcell"
	              title={getTitleString(current)} className={cls}>
	            {dateHtml}
	          </td>);

	        passed++;
	      }
	      tableHtml.push(
	        <tr
	          key={iIndex}
	          role="row">
	          {weekNumberCell}
	          {dateCells}
	        </tr>);
	    }
	    return (<tbody className={prefixCls + ('tbody')}>
	    {tableHtml}
	    </tbody>);
	  },
	});

	class DateTable extends React.Component {
	  render() {
	    const props = this.props;
	    const prefixCls = props.prefixCls;
	    return (<table className = {`${prefixCls}-table`} cellSpacing="0" role="grid">
	      <DateTHead {...props}/>
	      <DateTBody {...props}/>
	    </table>);
	  }
	}
	
	
	function copyTime(target, source) {
	  if (source) {
	    target.setHourOfDay(source.getHourOfDay());
	    target.setMinutes(source.getMinutes());
	    target.setSeconds(source.getSeconds());
	  }
	  return target;
	}

	const DateInput = React.createClass({
	  propTypes: {
	    formatter: PropTypes.object,
	    locale: PropTypes.object,
	    gregorianCalendarLocale: PropTypes.object,
	    disabledDate: PropTypes.func,
	    onChange: PropTypes.func,
	    onClear: PropTypes.func,
	    placeholder: PropTypes.string,
	    onSelect: PropTypes.func,
	    selectedValue: PropTypes.object,
	  },

	  getInitialState() {
	    const selectedValue = this.props.selectedValue;
	    return {
	      str: selectedValue && this.props.formatter.format(selectedValue) || '',
	      invalid: false,
	    };
	  },

	  componentWillReceiveProps(nextProps) {
	    // when popup show, click body will call this, bug!
	    const selectedValue = nextProps.selectedValue;
	    this.setState({
	      str: selectedValue && nextProps.formatter.format(selectedValue) || '',
	      invalid: false,
	    });
	  },

	  onInputChange(event) {
	    const str = event.target.value;
	    this.setState({
	      str,
	    });
	    let value;
	    const {disabledDate, formatter, gregorianCalendarLocale, onChange} = this.props;
	    if (str) {
	      try {
	        value = copyTime(formatter.parse(str, {
	          locale: gregorianCalendarLocale,
	          obeyCount: true,
	        }), this.props.selectedValue);
	      } catch (ex) {
	        this.setState({
	          invalid: true,
	        });
	        return;
	      }
	      if (value && (!disabledDate || !disabledDate(value))) {
	        const originalValue = this.props.selectedValue;
	        if (originalValue && value) {
	          if (originalValue.getTime() !== value.getTime()) {
	            onChange(value);
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
	    } else {
	      onChange(null);
	    }
	    this.setState({
	      invalid: false,
	    });
	  },

	  onClear() {
	    this.setState({str: ''});
	    this.props.onClear(null);
	  },

	  getRootDOMNode() {
	    return ReactDOM.findDOMNode(this);
	  },

	  render() {
	    const props = this.props;
	    const {invalid, str} = this.state;
	    const {selectedValue, locale, prefixCls, placeholder, onChange, timePicker, disabledTime, gregorianCalendarLocale} = props;
	    const invalidClass = invalid ? `${prefixCls}-input-invalid` : '';
	    const disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
	    return (<div className={`${prefixCls}-input-wrap`}>
	      <div className={`${prefixCls}-time-picker-wrap`}>
	        {timePicker ? React.cloneElement(timePicker, {
	          showClear: false,
	          allowEmpty: false,
	          getPopupContainer: this.getRootDOMNode,
	          gregorianCalendarLocale,
	          value: selectedValue,
	          onChange,
	          ...disabledTimeConfig,
	        }) : null}
	      </div>
	      <div className={`${prefixCls}-date-input-wrap`}>
	        <input className={`${prefixCls}-input  ${invalidClass}`}
	               value={str}
	               placeholder={placeholder}
	               onChange={this.onInputChange}/>
	      </div>
	      {props.showClear ? <a className={`${prefixCls}-clear-btn`}
	                            role="button"
	                            title={locale.clear}
	                            onClick={this.onClear}/> : null}
	    </div>);
	  },
	});

	
	function TodayButton({prefixCls, locale, value, timePicker, disabledDate, disabledTime, onToday}) {
	  let disabledToday = false;
	  let localeNow = locale.today;
	  if (timePicker) {
	    localeNow = locale.now || locale.today;
	  }
	  let disabledTodayClass = '';
	  if (disabledDate) {
	    disabledToday = !isAllowedDate(getTodayTime(value), disabledDate, disabledTime);
	    if (disabledToday) {
	      disabledTodayClass = `${prefixCls}-today-btn-disabled`;
	    }
	  }
	  return (<a className={`${prefixCls}-today-btn ${disabledTodayClass}`}
	             role="button"
	             onClick={disabledToday ? null : onToday}
	             title={getTodayTimeStr(value)}>{localeNow}</a>);
	}

	function OkButton({prefixCls, locale, okDisabled, onOk }) {
	  let className = `${prefixCls}-ok-btn`;
	  if (okDisabled) {
	    className += ` ${prefixCls}-ok-btn-disabled`;
	  }
	  return (<a className={className}
	             role="button"
	             onClick={okDisabled ? null : onOk}>{locale.ok}</a>);
	}


	const DecadePanel = function(){

		const ROW = 4;
		const COL = 3;

		function goYear(direction) {
		  const next = this.state.value.clone();
		  next.addYear(direction);
		  this.setState({
		    value: next,
		  });
		}

		function chooseDecade(year, event) {
		  const next = this.state.value.clone();
		  next.setYear(year);
		  next.rollSetMonth(this.state.value.getMonth());
		  this.props.onSelect(next);
		  event.preventDefault();
		}

		class DecadePanel extends React.Component {
		  constructor(props) {
		    super(props);
		    this.state = {
		      value: props.value || props.defaultValue,
		    };

		    // bind methods
		    this.prefixCls = props.rootPrefixCls + '-decade-panel';
		    this.nextCentury = goYear.bind(this, 100);
		    this.previousCentury = goYear.bind(this, -100);
		  }

		  render() {
		    const value = this.state.value;
		    const locale = this.props.locale;
		    const currentYear = value.getYear();
		    const startYear = parseInt(currentYear / 100, 10) * 100;
		    const preYear = startYear - 10;
		    const endYear = startYear + 99;
		    const decades = [];
		    let index = 0;
		    const prefixCls = this.prefixCls;

		    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
		      decades[rowIndex] = [];
		      for (let colIndex = 0; colIndex < COL; colIndex++) {
		        const startDecade = preYear + index * 10;
		        const endDecade = preYear + index * 10 + 9;
		        decades[rowIndex][colIndex] = {
		          startDecade: startDecade,
		          endDecade: endDecade,
		        };
		        index++;
		      }
		    }

		    const decadesEls = decades.map((row, decadeIndex) => {
		      const tds = row.map(decadeData => {
		        const dStartDecade = decadeData.startDecade;
		        const dEndDecade = decadeData.endDecade;
		        const isLast = dStartDecade < startYear;
		        const isNext = dEndDecade > endYear;
		        const classNameMap = {
		          [`${prefixCls}-cell`]: 1,
		          [`${prefixCls}-selected-cell`]: dStartDecade <= currentYear && currentYear <= dEndDecade,
		          [`${prefixCls}-last-century-cell`]: isLast,
		          [`${prefixCls}-next-century-cell`]: isNext,
		        };
		        let content;
		        let clickHandler;
		        if (isLast) {
		          clickHandler = this.previousCentury;
		        } else if (isNext) {
		          clickHandler = this.nextCentury;
		        } else {
		          content = dStartDecade + '-' + dEndDecade;
		          clickHandler = chooseDecade.bind(this, dStartDecade);
		        }
		        return (<td
		          key={dStartDecade}
		          onClick={clickHandler}
		          role="gridcell"
		          className={classnames(classNameMap)}
		          >
		          <a
		            className={`${prefixCls}-decade`}>
		            {content}
		          </a>
		        </td>);
		      });
		      return (<tr key={decadeIndex} role="row">{tds}</tr>);
		    });

		    return (
		      <div className={this.prefixCls}>
		        <div className={`${prefixCls}-header`}>
		          <a className={`${prefixCls}-prev-century-btn`}
		             role="button"
		             onClick={this.previousCentury}
		             title={locale.previousCentury}>
		            «
		          </a>

		          <div className={`${prefixCls}-century`}>
		            {startYear}-{endYear}
		          </div>
		          <a className={`${prefixCls}-next-century-btn`}
		             role="button"
		             onClick={this.nextCentury}
		             title={locale.nextCentury}>
		            »
		          </a>
		        </div>
		        <div className={`${prefixCls}-body`}>
		          <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
		            <tbody className={`${prefixCls}-tbody`}>
		            {decadesEls}
		            </tbody>
		          </table>
		        </div>
		      </div>);
		  }
		}

		DecadePanel.propTypes = {
		  locale: PropTypes.object,
		  value: PropTypes.object,
		  defaultValue: PropTypes.object,
		  rootPrefixCls: PropTypes.string,
		};

		DecadePanel.defaultProps = {
		  onSelect() {
		  },
		};
		return DecadePanel;
	}();

	const YearPanel = function(){

		const ROW = 4;
		const COL = 3;

		function goYear(direction) {
		  const next = this.state.value.clone();
		  next.addYear(direction);
		  this.setState({value: next});
		}

		function chooseYear(year) {
		  const next = this.state.value.clone();
		  next.setYear(year);
		  next.rollSetMonth(this.state.value.getMonth());
		  this.props.onSelect(next);
		}

		class YearPanel extends React.Component {
		  constructor(props) {
		    super(props);
		    this.prefixCls = props.rootPrefixCls + '-year-panel';
		    this.state = {
		      value: props.value || props.defaultValue,
		    };
		    this.nextDecade = goYear.bind(this, 10);
		    this.previousDecade = goYear.bind(this, -10);
		    ['showDecadePanel', 'onDecadePanelSelect'].forEach(method => {
		      this[method] = this[method].bind(this);
		    });
		  }

		  onDecadePanelSelect(current) {
		    this.setState({
		      value: current,
		      showDecadePanel: 0,
		    });
		  }

		  getYears() {
		    const value = this.state.value;
		    const currentYear = value.getYear();
		    const startYear = parseInt(currentYear / 10, 10) * 10;
		    const previousYear = startYear - 1;
		    const endYear = startYear + 9;
		    const years = [];
		    let index = 0;
		    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
		      years[rowIndex] = [];
		      for (let colIndex = 0; colIndex < COL; colIndex++) {
		        const year = previousYear + index;
		        let content;
		        if (year < startYear) {
		          content = '';
		        } else if (year > endYear) {
		          content = '';
		        } else {
		          content = year + '';
		        }
		        years[rowIndex][colIndex] = {
		          content: content,
		          year: year,
		          title: content,
		        };
		        index++;
		      }
		    }
		    return years;
		  }

		  showDecadePanel() {
		    this.setState({
		      showDecadePanel: 1,
		    });
		  }

		  render() {
		    const props = this.props;
		    const value = this.state.value;
		    const locale = props.locale;
		    const years = this.getYears();
		    const currentYear = value.getYear();
		    const startYear = parseInt(currentYear / 10, 10) * 10;
		    const endYear = startYear + 9;
		    const prefixCls = this.prefixCls;

		    const yeasEls = years.map((row, index) => {
		      const tds = row.map(yearData => {
		        const classNameMap = {
		          [`${prefixCls}-cell`]: 1,
		          [`${prefixCls}-selected-cell`]: yearData.year === currentYear,
		          [`${prefixCls}-last-decade-cell`]: yearData.year < startYear,
		          [`${prefixCls}-next-decade-cell`]: yearData.year > endYear,
		        };
		        let clickHandler;
		        if (yearData.year < startYear) {
		          clickHandler = this.previousDecade;
		        } else if (yearData.year > endYear) {
		          clickHandler = this.nextDecade;
		        } else {
		          clickHandler = chooseYear.bind(this, yearData.year);
		        }
		        return (
		          <td role="gridcell"
		              title={yearData.title}
		              key={yearData.content}
		              onClick={clickHandler}
		              className={classnames(classNameMap)}
		            >
		            <a
		              className={`${prefixCls}-year`}>
		              {yearData.content}
		            </a>
		          </td>);
		      });
		      return (<tr key={index} role="row">{tds}</tr>);
		    });

		    let decadePanel;
		    if (this.state.showDecadePanel) {
		      decadePanel = (<DecadePanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls}
		                                  onSelect={this.onDecadePanelSelect}/>);
		    }

		    return (
		      <div className={this.prefixCls}>
		        <div>
		          <div className={`${prefixCls}-header`}>
		            <a className={`${prefixCls}-prev-decade-btn`}
		               role="button"
		               onClick={this.previousDecade}
		               title={locale.previousDecade}>
		              «
		            </a>
		            <a className={`${prefixCls}-decade-select`}
		               role="button"
		               onClick={this.showDecadePanel}
		               title={locale.decadeSelect}>
		              <span className={`${prefixCls}-decade-select-content`}>
		                {startYear}-{endYear}
		              </span>
		              <span className={`${prefixCls}-decade-select-arrow`}>x</span>
		            </a>

		            <a className={`${prefixCls}-next-decade-btn`}
		               role="button"
		               onClick={this.nextDecade}
		               title={locale.nextDecade}>
		              »
		            </a>
		          </div>
		          <div className={`${prefixCls}-body`}>
		            <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
		              <tbody className={`${prefixCls}-tbody`}>
		              {yeasEls}
		              </tbody>
		            </table>
		          </div>
		        </div>
		        {decadePanel}
		      </div>);
		  }
		}

		YearPanel.propTypes = {
		  rootPrefixCls: PropTypes.string,
		  value: PropTypes.object,
		  defaultValue: PropTypes.object,
		};

		YearPanel.defaultProps = {
		  onSelect() {
		  },
		};

		return YearPanel;
	}();


	const  MonthTable = function(){

		const ROW = 4;
		const COL = 3;

		function chooseMonth(month) {
		  const next = this.state.value.clone();
		  next.rollSetMonth(month);
		  this.setAndSelectValue(next);
		}

		class MonthTable extends Component {
		  constructor(props) {
		    super(props);

		    this.state = {
		      value: props.value,
		    };
		  }
		  componentWillReceiveProps(nextProps) {
		    if ('value' in nextProps) {
		      this.setState({
		        value: nextProps.value,
		      });
		    }
		  }
		  getMonths() {
		    const props = this.props;
		    const value = this.state.value;
		    const current = value.clone();
		    const locale = props.locale;
		    const months = [];
		    const shortMonths = locale.format.shortMonths;
		    let index = 0;
		    for (let rowIndex = 0; rowIndex < ROW; rowIndex++) {
		      months[rowIndex] = [];
		      for (let colIndex = 0; colIndex < COL; colIndex++) {
		        current.rollSetMonth(index);
		        months[rowIndex][colIndex] = {
		          value: index,
		          content: shortMonths[index],
		          title: shortMonths[index],
		        };
		        index++;
		      }
		    }
		    return months;
		  }
		  setAndSelectValue(value) {
		    this.setState({
		      value,
		    });
		    this.props.onSelect(value);
		  }
		  render() {
		    const props = this.props;
		    const value = this.state.value;
		    const today = value.clone();
		    today.setTime(Date.now());
		    const months = this.getMonths();
		    const currentMonth = value.getMonth();
		    const {prefixCls, locale} = props;
		    const monthsEls = months.map((month, index)=> {
		      const tds = month.map(monthData => {
		        let disabled = false;
		        if (props.disabledDate) {
		          const testValue = value.clone();
		          testValue.rollSetMonth(monthData.value);
		          disabled = props.disabledDate(testValue);
		        }
		        const classNameMap = {
		          [`${prefixCls}-cell`]: 1,
		          [`${prefixCls}-cell-disabled`]: disabled,
		          [`${prefixCls}-selected-cell`]: monthData.value === currentMonth,
		          [`${prefixCls}-current-cell`]: today.getYear() === value.getYear() &&
		            monthData.value === today.getMonth(),
		        };
		        let cellEl;
		        if (props.cellRender) {
		          const currentValue = value.clone();
		          currentValue.rollSetMonth(monthData.value);
		          cellEl = props.cellRender(currentValue, locale);
		        } else {
		          cellEl = <a className={`${prefixCls}-month`}>{monthData.content}</a>;
		        }
		        return (
		          <td role="gridcell"
		              key={monthData.value}
		              onClick={disabled ? null : chooseMonth.bind(this, monthData.value)}
		              title={monthData.title}
		              className={classnames(classNameMap)}>
		            {cellEl}
		          </td>);
		      });
		      return (<tr key={index} role="row">{tds}</tr>);
		    });

		    return (
		      <table className={`${prefixCls}-table`} cellSpacing="0" role="grid">
		        <tbody className={`${prefixCls}-tbody`}>
		        {monthsEls}
		        </tbody>
		      </table>
		    );
		  }
		}

		MonthTable.defaultProps = {
		  onSelect: noop,
		};
		MonthTable.propTypes = {
		  onSelect: PropTypes.func,
		  cellRender: PropTypes.func,
		  prefixCls: PropTypes.string,
		  value: PropTypes.object,
		};
		return MonthTable;
	}();

	const MonthPanel = function(){

		function goYear(direction) {
		  const next = this.state.value.clone();
		  next.addYear(direction);
		  this.setAndChangeValue(next);
		}

		const MonthPanel = React.createClass({
		  propTypes: {
		    onChange: PropTypes.func,
		    disabledDate: PropTypes.func,
		    onSelect: PropTypes.func,
		  },

		  getDefaultProps() {
		    return {
		      onChange: noop,
		      onSelect: noop,
		    };
		  },

		  getInitialState() {
		    const props = this.props;
		    // bind methods
		    this.nextYear = goYear.bind(this, 1);
		    this.previousYear = goYear.bind(this, -1);
		    this.prefixCls = props.rootPrefixCls + '-month-panel';
		    return {
		      value: props.value || props.defaultValue,
		    };
		  },

		  componentWillReceiveProps(nextProps) {
		    if ('value' in nextProps) {
		      this.setState({
		        value: nextProps.value,
		      });
		    }
		  },

		  onYearPanelSelect(current) {
		    this.setState({
		      showYearPanel: 0,
		    });
		    this.setAndChangeValue(current);
		  },


		  setAndChangeValue(value) {
		    this.setValue(value);
		    this.props.onChange(value);
		  },

		  setAndSelectValue(value) {
		    this.setValue(value);
		    this.props.onSelect(value);
		  },

		  setValue(value) {
		    if (!('value' in this.props)) {
		      this.setState({
		        value,
		      });
		    }
		  },

		  showYearPanel() {
		    this.setState({
		      showYearPanel: 1,
		    });
		  },

		  render() {
		    const props = this.props;
		    const value = this.state.value;
		    const locale = props.locale;
		    const year = value.getYear();
		    const prefixCls = this.prefixCls;
		    let yearPanel;
		    if (this.state.showYearPanel) {
		      yearPanel = (<YearPanel locale={locale} value={value} rootPrefixCls={props.rootPrefixCls}
		                              onSelect={this.onYearPanelSelect}/>);
		    }
		    return (
		      <div className={prefixCls} style={props.style}>
		        <div>
		          <div className={`${prefixCls}-header`}>
		            <a className={`${prefixCls}-prev-year-btn`}
		               role="button"
		               onClick={this.previousYear}
		               title={locale.previousYear}>
		              «
		            </a>

		            <a className={`${prefixCls}-year-select`}
		               role="button"
		               onClick={this.showYearPanel}
		               title={locale.yearSelect}>
		              <span className={`${prefixCls}-year-select-content`}>{year}</span>
		              <span className={`${prefixCls}-year-select-arrow`}>x</span>
		            </a>

		            <a className={`${prefixCls}-next-year-btn`}
		               role="button"
		               onClick={this.nextYear}
		               title={locale.nextYear}>
		              »
		            </a>
		          </div>
		          <div className={`${prefixCls}-body`}>
		            <MonthTable
		              disabledDate={props.disabledDate}
		              onSelect={this.setAndSelectValue}
		              locale={locale}
		              value={value}
		              prefixCls={prefixCls} />
		          </div>
		        </div>
		        {yearPanel}
		      </div>);
		  },
		});

		return MonthPanel;

	}();


	const CalendarHeader = function(){
		function goMonth(direction) {
		  const next = this.props.value.clone();
		  next.addMonth(direction);
		  this.props.onValueChange(next);
		}

		function goYear(direction) {
		  const next = this.props.value.clone();
		  next.addYear(direction);
		  this.props.onValueChange(next);
		}

		const CalendarHeader = React.createClass({
		  propTypes: {
		    locale: PropTypes.object,
		    value: PropTypes.object,
		    onValueChange: PropTypes.func,
		  },

		  getDefaultProps() {
		    return {
		      enableNext: 1,
		      enablePrev: 1,
		    };
		  },

		  getInitialState() {
		    const props = this.props;
		    this.yearFormatter = getFormatter(props.locale.yearFormat, props.locale);
		    this.monthFormatter = getFormatter(props.locale.monthFormat, props.locale);
		    this.nextMonth = goMonth.bind(this, 1);
		    this.previousMonth = goMonth.bind(this, -1);
		    this.nextYear = goYear.bind(this, 1);
		    this.previousYear = goYear.bind(this, -1);
		    return {};
		  },

		  componentWillReceiveProps(nextProps) {
		    const locale = this.props.locale;
		    const {locale: nextLocale} = nextProps;
		    if (nextLocale !== locale) {
		      this.yearFormatter = getFormatter(nextLocale.yearFormat, nextLocale);
		      this.monthFormatter = getFormatter(nextLocale.monthFormat, nextLocale);
		    }
		  },

		  onSelect(value) {
		    this.setState({
		      showMonthPanel: 0,
		      showYearPanel: 0,
		    });
		    this.props.onValueChange(value);
		  },

		  getMonthYearElement() {
		    const props = this.props;
		    const prefixCls = props.prefixCls;
		    const locale = props.locale;
		    const value = this.props.value;
		    const monthBeforeYear = locale.monthBeforeYear;
		    const selectClassName = `${prefixCls}-${monthBeforeYear ? 'my-select' : 'ym-select'}`;
		    const year = (<a className={`${prefixCls}-year-select`}
		                     role="button"
		                     onClick={this.showYearPanel}
		                     title={locale.monthSelect}>{this.yearFormatter.format(value)}</a>);
		    const month = (<a className={`${prefixCls}-month-select`}
		                      role="button"
		                      onClick={this.showMonthPanel}
		                      title={locale.monthSelect}>{this.monthFormatter.format(value)}</a>);
		    let my = [];
		    if (monthBeforeYear) {
		      my = [month, year];
		    } else {
		      my = [year, month];
		    }
		    return (<span className={selectClassName}>
		    {toFragment(my)}
		    </span>);
		  },

		  showIf(condition, el) {
		    return condition ? el : null;
		  },

		  showMonthPanel() {
		    this.setState({
		      showMonthPanel: 1,
		      showYearPanel: 0,
		    });
		  },

		  showYearPanel() {
		    this.setState({
		      showMonthPanel: 0,
		      showYearPanel: 1,
		    });
		  },

		  render() {
		    const props = this.props;
		    const {enableNext, enablePrev, prefixCls, locale, value} = props;
		    const state = this.state;
		    let PanelClass = null;
		    if (state.showMonthPanel) {
		      PanelClass = MonthPanel;
		    } else if (state.showYearPanel) {
		      PanelClass = YearPanel;
		    }
		    let panel;
		    if (PanelClass) {
		      panel = <PanelClass locale={locale} defaultValue={value} rootPrefixCls={prefixCls} onSelect={this.onSelect}/>;
		    }
		    return (<div className={`${prefixCls}-header`}>
		      <div style={{position: 'relative'}}>
		        {this.showIf(enablePrev, <a className={`${prefixCls}-prev-year-btn`}
		                                    role="button"
		                                    onClick={this.previousYear}
		                                    title={locale.previousYear}>
		          «
		        </a>)}
		        {this.showIf(enablePrev, <a className={`${prefixCls}-prev-month-btn`}
		                                    role="button"
		                                    onClick={this.previousMonth}
		                                    title={locale.previousMonth}>
		          ‹
		        </a>)}
		        {this.getMonthYearElement()}
		        {this.showIf(enableNext, <a className={`${prefixCls}-next-month-btn`}
		                                    onClick={this.nextMonth}
		                                    title={locale.nextMonth}>
		          ›
		        </a>)}
		        {this.showIf(enableNext, <a className={`${prefixCls}-next-year-btn`}
		                                    onClick={this.nextYear}
		                                    title={locale.nextYear}>
		          »
		        </a>)}
		      </div>
		      {panel}
		    </div>);
		  },
		});

		return CalendarHeader;

	}();


	const CalendarFooter = React.createClass({
	  propTypes: {
	    onSelect: PropTypes.func,
	    value: PropTypes.object,
	    defaultValue: PropTypes.object,
	  },

	  onSelect(value) {
	    this.props.onSelect(value);
	  },

	  getRootDOMNode() {
	    return ReactDOM.findDOMNode(this);
	  },

	  render() {
	    const props = this.props;
	    const {value, prefixCls, showDateInput, disabledTime, gregorianCalendarLocale, selectedValue} = props;
	    let timePicker = !showDateInput && props.timePicker || null;
	    const disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
	    let footerEl = null;
	    if (props.showToday || timePicker) {
	      let nowEl;
	      if (props.showToday) {
	        nowEl = <TodayButton {...props} value={value}/>;
	      }
	      let okBtn;
	      if (props.showOk) {
	        okBtn = <OkButton {...props}/>;
	      }
	      let footerBtn;
	      if (nowEl || okBtn) {
	        footerBtn = <span className={`${prefixCls}-footer-btn`}>{toFragment([nowEl, okBtn])}</span>;
	      }
	      if (timePicker) {
	        timePicker = React.cloneElement(timePicker, {
	          onChange: this.onSelect,
	          allowEmpty: false,
	          gregorianCalendarLocale,
	          ...disabledTimeConfig,
	          getPopupContainer: this.getRootDOMNode,
	          value: selectedValue,
	        });
	      }
	      footerEl = (
	        <div className={`${prefixCls}-footer`}>
	          {timePicker}
	          {footerBtn}
	        </div>);
	    }

	    return footerEl;
	  },
	});

	const CalendarMixin = function(){
		function getNow() {
		  const value = new GregorianCalendar();
		  value.setTime(Date.now());
		  return value;
		}

		function getNowByCurrentStateValue(value) {
		  let ret;
		  if (value) {
		    ret = value.clone();
		    ret.setTime(Date.now());
		  } else {
		    ret = getNow();
		  }
		  return ret;
		}

		const CalendarMixin = {
		  propTypes: {
		    value: PropTypes.object,
		    defaultValue: PropTypes.object,
		    onKeyDown: PropTypes.func,
		  },

		  getDefaultProps() {
		    return {
		      onKeyDown: noop,
		    };
		  },

		  getInitialState() {
		    const props = this.props;
		    const value = props.value || props.defaultValue || getNow();
		    return {
		      value,
		      selectedValue: props.selectedValue || props.defaultSelectedValue,
		    };
		  },

		  componentWillReceiveProps(nextProps) {
		    let {value} = nextProps;
		    const {selectedValue} = nextProps;
		    if ('value' in nextProps) {
		      value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
		      this.setState({
		        value,
		      });
		    }
		    if ('selectedValue' in nextProps) {
		      this.setState({
		        selectedValue,
		      });
		    }
		  },

		  onSelect(value, cause) {
		    if (value) {
		      this.setValue(value);
		    }
		    this.setSelectedValue(value, cause);
		  },

		  renderRoot(newProps) {
		    const props = this.props;
		    const prefixCls = props.prefixCls;

		    const className = {
		      [prefixCls]: 1,
		      [`${prefixCls}-hidden`]: !props.visible,
		      [props.className]: !!props.className,
		      [newProps.className]: !!newProps.className,
		    };

		    return (
		      <div className={`${classnames(className)}`}
		           style={this.props.style}
		           tabIndex="0" onKeyDown={this.onKeyDown}>
		        {newProps.children}
		      </div>
		    );
		  },

		  setSelectedValue(selectedValue, cause) {
		    if (this.isAllowedDate(selectedValue)) {
		      if (!('selectedValue' in this.props)) {
		        this.setState({
		          selectedValue,
		        });
		      }
		      this.props.onSelect(selectedValue, cause);
		    }
		  },

		  setValue(value) {
		    const originalValue = this.state.value;
		    if (!('value' in this.props)) {
		      this.setState({
		        value,
		      });
		    }
		    if (originalValue && value && originalValue.getTime() !== value.getTime() ||
		      (!originalValue && value) ||
		      (originalValue && !value)) {
		      this.props.onChange(value);
		    }
		  },

		  isAllowedDate(value) {
		    const disabledDate = this.props.disabledDate;
		    const disabledTime = this.props.disabledTime;
		    return isAllowedDate(value, disabledDate, disabledTime);
		  },
		};

		return CalendarMixin;

	}();

	const CommonMixin = function(){
		return {
		  propTypes: {
		    className: PropTypes.string,
		    locale: PropTypes.object,
		    style: PropTypes.object,
		    visible: PropTypes.bool,
		    onSelect: PropTypes.func,
		    prefixCls: PropTypes.string,
		    onChange: PropTypes.func,
		    onOk: PropTypes.func,
		  },

		  getDefaultProps() {
		    return {
		      locale: Locale.Calendar,
		      style: {},
		      visible: true,
		      prefixCls: 'rc-calendar',
		      className: '',
		      onSelect: noop,
		      onChange: noop,
		      onClear: noop,
		    };
		  },

		  shouldComponentUpdate(nextProps) {
		    return this.props.visible || nextProps.visible;
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
		    if (!this.showDateFormatter) {
		      this.showDateFormatter = getFormatter('yyyy-MM-dd', locale);
		    }
		    return this.showDateFormatter;
		  },
		};

	}();

	const Calendar = function(){
		function goStartMonth() {
		  const next = this.state.value.clone();
		  next.setDayOfMonth(1);
		  this.setValue(next);
		}

		function goEndMonth() {
		  const next = this.state.value.clone();
		  next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
		  this.setValue(next);
		}

		function goMonth(direction) {
		  const next = this.state.value.clone();
		  next.addMonth(direction);
		  this.setValue(next);
		}

		function goYear(direction) {
		  const next = this.state.value.clone();
		  next.addYear(direction);
		  this.setValue(next);
		}

		function goWeek(direction) {
		  const next = this.state.value.clone();
		  next.addWeekOfYear(direction);
		  this.setValue(next);
		}

		function goDay(direction) {
		  const next = this.state.value.clone();
		  next.addDayOfMonth(direction);
		  this.setValue(next);
		}

		const Calendar = React.createClass({
		  propTypes: {
		    value: PropTypes.object,
		    selectedValue: PropTypes.object,
		    defaultValue: PropTypes.object,
		    className: PropTypes.string,
		    locale: PropTypes.object,
		    showWeekNumber: PropTypes.bool,
		    style: PropTypes.object,
		    showToday: PropTypes.bool,
		    showDateInput: PropTypes.bool,
		    visible: PropTypes.bool,
		    onSelect: PropTypes.func,
		    onOk: PropTypes.func,
		    prefixCls: PropTypes.string,
		    onKeyDown: PropTypes.func,
		    timePicker: PropTypes.element,
		    dateInputPlaceholder: PropTypes.string,
		    onClear: PropTypes.func,
		    onChange: PropTypes.func,
		  },

		  mixins: [CommonMixin, CalendarMixin],

		  getDefaultProps() {
		    return {
		      showToday: true,
		      showDateInput: true,
		      timePicker: null,
		      onOk: noop,
		    };
		  },

		  getInitialState() {
		    // bind methods
		    this.nextMonth = goMonth.bind(this, 1);
		    this.previousMonth = goMonth.bind(this, -1);
		    this.nextYear = goYear.bind(this, 1);
		    this.previousYear = goYear.bind(this, -1);
		    return {};
		  },

		  onKeyDown(event) {
		    if (event.target.nodeName.toLowerCase() === 'input') {
		      return undefined;
		    }
		    const keyCode = event.keyCode;
		    // mac
		    const ctrlKey = event.ctrlKey || event.metaKey;
		    switch (keyCode) {
		      case KeyCode.DOWN:
		        goWeek.call(this, 1);
		        event.preventDefault();
		        return 1;
		      case KeyCode.UP:
		        goWeek.call(this, -1);
		        event.preventDefault();
		        return 1;
		      case KeyCode.LEFT:
		        if (ctrlKey) {
		          this.previousYear();
		        } else {
		          goDay.call(this, -1);
		        }
		        event.preventDefault();
		        return 1;
		      case KeyCode.RIGHT:
		        if (ctrlKey) {
		          this.nextYear();
		        } else {
		          goDay.call(this, 1);
		        }
		        event.preventDefault();
		        return 1;
		      case KeyCode.HOME:
		        goStartMonth.call(this);
		        event.preventDefault();
		        return 1;
		      case KeyCode.END:
		        goEndMonth.call(this);
		        event.preventDefault();
		        return 1;
		      case KeyCode.PAGE_DOWN:
		        this.nextMonth();
		        event.preventDefault();
		        return 1;
		      case KeyCode.PAGE_UP:
		        this.previousMonth();
		        event.preventDefault();
		        return 1;
		      case KeyCode.ENTER:
		        this.onSelect(this.state.value);
		        event.preventDefault();
		        return 1;
		      default:
		        this.props.onKeyDown(event);
		        return 1;
		    }
		  },

		  onClear() {
		    this.onSelect(null);
		    this.props.onClear();
		  },

		  onOk() {
		    const {selectedValue} = this.state;
		    if (this.isAllowedDate(selectedValue)) {
		      this.props.onOk(selectedValue);
		    }
		  },

		  onDateInputChange(value) {
		    this.onSelect(value, {
		      source: 'dateInput',
		    });
		  },

		  onDateTableSelect(value) {
		    this.onSelect(value);
		  },

		  chooseToday() {
		    const today = this.state.value.clone();
		    today.setTime(Date.now());
		    this.onSelect(today);
		  },

		  render() {
		    const props = this.props;
		    const {locale, prefixCls, disabledDate, dateInputPlaceholder, timePicker, disabledTime} = props;
		    const state = this.state;
		    const {value, selectedValue} = state;
		    const dateInputElement = props.showDateInput ? (
		      <DateInput formatter={this.getFormatter()}
		                 key="date-input"
		                 timePicker={timePicker}
		                 gregorianCalendarLocale={value.locale}
		                 locale={locale}
		                 placeholder={dateInputPlaceholder}
		                 showClear
		                 disabledTime={disabledTime}
		                 disabledDate={disabledDate}
		                 onClear={this.onClear}
		                 prefixCls={prefixCls}
		                 selectedValue={selectedValue}
		                 onChange={this.onDateInputChange}/>
		    ) : null;
		    const children = [dateInputElement, (<div key="date-panel"
		                                              className={`${prefixCls}-date-panel`}>
		      <CalendarHeader
		        locale={locale}
		        onValueChange={this.setValue}
		        value={value}
		        prefixCls={prefixCls}/>

		      <div className={`${prefixCls}-calendar-body`}>
		        <DateTable
		          locale={locale}
		          value={value}
		          selectedValue={selectedValue}
		          prefixCls={prefixCls}
		          dateRender={props.dateRender}
		          onSelect={this.onDateTableSelect}
		          disabledDate={disabledDate}
		          showWeekNumber={props.showWeekNumber}/>
		      </div>

		      <CalendarFooter
		        locale={locale}
		        showOk={props.showOk}
		        prefixCls={prefixCls}
		        showToday={props.showToday}
		        disabledTime={disabledTime}
		        gregorianCalendarLocale={value.locale}
		        showDateInput={props.showDateInput}
		        timePicker={timePicker}
		        selectedValue={selectedValue}
		        value={value}
		        disabledDate={disabledDate}
		        onOk={this.onOk}
		        onSelect={this.onSelect}
		        onToday={this.chooseToday}
		      />
		    </div>)];

		    return this.renderRoot({
		      children,
		      className: props.showWeekNumber ? `${prefixCls}-week-number` : '',
		    });
		  },
		});

		return Calendar;

	}();


	const FullCalendar = function(){

		class CalendarHeader extends Component {
		  onYearChange(year) {
		    const newValue = this.props.value.clone();
		    newValue.setYear(parseInt(year, 10));
		    this.props.onValueChange(newValue);
		  }

		  onMonthChange(month) {
		    const newValue = this.props.value.clone();
		    newValue.setMonth(parseInt(month, 10));
		    this.props.onValueChange(newValue);
		  }

		  getYearSelectElement(year) {
		    const {yearSelectOffset, yearSelectTotal, locale, prefixCls, Select} = this.props;
		    const start = year - yearSelectOffset;
		    const end = start + yearSelectTotal;
		    const suffix = locale.year === '年' ? '年' : '';

		    const options = [];
		    for (let index = start; index < end; index++) {
		      options.push(<Select.Option key={`${index}`}>{index + suffix}</Select.Option>);
		    }
		    return (
		      <Select
		        className={`${prefixCls}-header-year-select`}
		        onChange={this.onYearChange.bind(this)}
		        dropdownStyle={{ zIndex: 2000 }}
		        dropdownMenuStyle={{maxHeight: 250, overflow: 'auto', fontSize: 12}}
		        optionLabelProp="children"
		        value={String(year)}
		        showSearch={false}>
		        { options }
		      </Select>
		    );
		  }

		  getMonthSelectElement(month) {
		    const props = this.props;
		    const months = props.locale.format.months;
		    const {prefixCls} = props;
		    const options = [];
		    const Select = props.Select;

		    for (let index = 0; index < 12; index++) {
		      options.push(<Select.Option key={`${index}`}>{months[index]}</Select.Option>);
		    }

		    return (
		      <Select
		        className={`${prefixCls}-header-month-select`}
		        dropdownStyle={{ zIndex: 2000 }}
		        dropdownMenuStyle={{maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12}}
		        optionLabelProp="children"
		        value={String(month)}
		        showSearch={false}
		        onChange={this.onMonthChange.bind(this)}>
		        { options }
		      </Select>
		    );
		  }

		  changeTypeToDate() {
		    this.props.onTypeChange('date');
		  }

		  changeTypeToMonth() {
		    this.props.onTypeChange('month');
		  }

		  render() {
		    const {value, locale, prefixCls, type, showTypeSwitch, headerComponents} = this.props;
		    const year = value.getYear();
		    const month = value.getMonth();
		    const yearSelect = this.getYearSelectElement(year);
		    const monthSelect = type === 'month' ? null : this.getMonthSelectElement(month);
		    const switchCls = `${prefixCls}-header-switcher`;
		    const typeSwitcher = showTypeSwitch ? (
		      <span className={switchCls}>
		        { type === 'date' ?
		        <span className={`${switchCls}-focus`}>{locale.month}</span> :
		        <span onClick={this.changeTypeToDate.bind(this)} className={`${switchCls}-normal`}>{locale.month}</span>
		          }
		        { type === 'month' ?
		        <span className={`${switchCls}-focus`}>{locale.year}</span> :
		        <span onClick={this.changeTypeToMonth.bind(this)} className={`${switchCls}-normal`}>{locale.year}</span>
		          }
		      </span>
		    ) : null;

		    return (
		      <div className={`${prefixCls}-header`}>
		        { typeSwitcher }
		        { monthSelect }
		        { yearSelect }
		        { headerComponents }
		      </div>
		    );
		  }
		}
		CalendarHeader.propTypes = {
		  value: PropTypes.object,
		  locale: PropTypes.object,
		  yearSelectOffset: PropTypes.number,
		  yearSelectTotal: PropTypes.number,
		  onValueChange: PropTypes.func,
		  onTypeChange: PropTypes.func,
		  Select: PropTypes.func,
		  prefixCls: PropTypes.string,
		  type: PropTypes.string,
		  showTypeSwitch: PropTypes.bool,
		  headerComponents: PropTypes.array,
		};
		CalendarHeader.defaultProps = {
		  yearSelectOffset: 10,
		  yearSelectTotal: 20,
		  onValueChange: noop,
		  onTypeChange: noop,
		};

		const FullCalendar = React.createClass({
		  propTypes: {
		    defaultType: PropTypes.string,
		    type: PropTypes.string,
		    onTypeChange: PropTypes.func,
		    fullscreen: PropTypes.bool,
		    monthCellRender: PropTypes.func,
		    dateCellRender: PropTypes.func,
		    showTypeSwitch: PropTypes.bool,
		    Select: PropTypes.func.isRequired,
		    headerComponents: PropTypes.array,
		    headerComponent: PropTypes.object, // The whole header component
		    headerRender: PropTypes.func,
		    showHeader: PropTypes.bool,
		  },
		  mixins: [CommonMixin, CalendarMixin],
		  getDefaultProps() {
		    return {
		      defaultType: 'date',
		      fullscreen: false,
		      showTypeSwitch: true,
		      showHeader: true,
		      onTypeChange() {},
		    };
		  },
		  getInitialState() {
		    let type;
		    if ('type' in this.props) {
		      type = this.props.type;
		    } else {
		      type = this.props.defaultType;
		    }
		    return { type };
		  },
		  componentWillReceiveProps(nextProps) {
		    if ('type' in nextProps) {
		      this.setState({
		        type: nextProps.type,
		      });
		    }
		  },
		  onMonthSelect(value) {
		    this.onSelect(value, { target: 'month' });
		  },
		  setType(type) {
		    if (!('type' in this.props)) {
		      this.setState({ type });
		    }
		    this.props.onTypeChange(type);
		  },
		  render() {
		    const props = this.props;
		    const {locale, prefixCls, fullscreen, showHeader, headerComponent, headerRender} = props;
		    const {value, type} = this.state;

		    let header = null;
		    if (showHeader) {
		      if (headerRender) {
		        header = headerRender(value, type, locale);
		      } else {
		        const TheHeader = headerComponent || CalendarHeader;
		        header = (
		          <TheHeader key="calendar-header"
		            {...props}
		            prefixCls={`${prefixCls}-full`}
		            type={type}
		            value={value}
		            onTypeChange={this.setType}
		            onValueChange={this.setValue}/>
		        );
		      }
		    }

		    const table = type === 'date' ? (
		      <DateTable
		        dateRender={props.dateCellRender}
		        locale={locale}
		        prefixCls={prefixCls}
		        onSelect={this.onSelect}
		        value={value} />
		    ) : (
		      <MonthTable
		        cellRender={props.monthCellRender}
		        locale={locale}
		        onSelect={this.onMonthSelect}
		        prefixCls={`${prefixCls}-month-panel`}
		        value={value} />
		    );

		    const children = [
		      header,
		      (<div key="calendar-body" className={`${prefixCls}-calendar-body`}>
		        { table }
		      </div>),
		    ];


		    const className = [`${prefixCls}-full`];

		    if (fullscreen) {
		      className.push(`${prefixCls}-fullscreen`);
		    }

		    return this.renderRoot({ children, className: className.join(' ') });
		  },
		});

		return FullCalendar;

	}();


	const MonthCalendar = function(){
		const MonthCalendar = React.createClass({
		  mixins: [CommonMixin, CalendarMixin],

		  onKeyDown(event) {
		    const keyCode = event.keyCode;
		    const ctrlKey = event.ctrlKey || event.metaKey;
		    const stateValue = this.state.value;
		    let value = stateValue;
		    switch (keyCode) {
		      case KeyCode.DOWN:
		        value = stateValue.clone();
		        value.addMonth(3);
		        break;
		      case KeyCode.UP:
		        value = stateValue.clone();
		        value.addMonth(-3);
		        break;
		      case KeyCode.LEFT:
		        value = stateValue.clone();
		        if (ctrlKey) {
		          value.addYear(-1);
		        } else {
		          value.addMonth(-1);
		        }
		        break;
		      case KeyCode.RIGHT:
		        value = stateValue.clone();
		        if (ctrlKey) {
		          value.addYear(1);
		        } else {
		          value.addMonth(1);
		        }
		        break;
		      case KeyCode.ENTER:
		        this.onSelect(stateValue);
		        event.preventDefault();
		        return 1;
		      default:
		        return undefined;
		    }
		    if (value !== stateValue) {
		      this.setValue(value);
		      event.preventDefault();
		      return 1;
		    }
		  },

		  render() {
		    const props = this.props;
		    const children = (<MonthPanel locale={props.locale}
		                                  disabledDate={props.disabledDate}
		                                  style={{position: 'relative'}}
		                                  value={this.state.value}
		                                  rootPrefixCls={props.prefixCls}
		                                  onChange={this.setValue}
		                                  onSelect={this.onSelect}/>);
		    return this.renderRoot({
		      children,
		    });
		  },
		});

	}();

	const RangeCalendar = function(){
		const CalendarPart = React.createClass({
		  render() {
		    const props = this.props;
		    const {value, direction, prefixCls,
		      locale, selectedValue, formatter, placeholder,
		      disabledDate, timePicker, disabledTime} = props;
		    const rangeClassName = `${prefixCls}-range`;
		    const newProps = {locale, value, prefixCls};
		    const index = direction === 'left' ? 0 : 1;
		    return (<div className={`${rangeClassName}-part ${rangeClassName}-${direction}`}>
		      <DateInput formatter={formatter}
		                 locale={locale}
		                 prefixCls={prefixCls}
		                 timePicker={timePicker}
		                 disabledDate={disabledDate}
		                 placeholder={placeholder}
		                 disabledTime={disabledTime}
		                 gregorianCalendarLocale={value.locale}
		                 showClear={false}
		                 selectedValue={selectedValue[index]}
		                 onChange={props.onInputSelect}/>
		      <div style={{outline: 'none'}}>
		        <CalendarHeader
		          {...newProps}
		          enableNext={direction === 'right'}
		          enablePrev={direction === 'left'}
		          onValueChange={props.onValueChange}/>
		        <div className={`${prefixCls}-calendar-body`}>
		          <DateTable
		            {...newProps}
		            selectedValue={selectedValue}
		            dateRender={props.dateRender}
		            onSelect={props.onSelect}
		            onDayHover={props.onDayHover}
		            disabledDate={disabledDate}
		            showWeekNumber={props.showWeekNumber}/>
		        </div>
		        <CalendarFooter
		          {...newProps}
		          disabledDate={props.disabledDate}
		          timeDisabled={!selectedValue[index] || !!selectedValue.hovering}
		          onToday={this.chooseToday}
		        />
		      </div>
		    </div>);
		  },
		});


		function getNow() {
		  const selectedValue = new GregorianCalendar();
		  selectedValue.setTime(Date.now());
		  return selectedValue;
		}

		function onValueChange(direction, current) {
		  let value;
		  value = current;
		  if (direction === 'right') {
		    value.addMonth(-1);
		  }
		  this.fireValueChange(value);
		}

		function normalizeAnchor(props, init) {
		  const selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
		  let value = props.value;
		  if (Array.isArray(value)) {
		    value = value[0];
		  }
		  let defaultValue = props.defaultValue;
		  if (Array.isArray(defaultValue)) {
		    defaultValue = defaultValue[0];
		  }
		  return value || init && defaultValue || selectedValue[0] || init && getNow();
		}

		function onInputSelect(direction, value) {
		  if (!value) {
		    return;
		  }
		  const originalValue = this.state.selectedValue;
		  const selectedValue = originalValue.concat();
		  const index = direction === 'left' ? 0 : 1;
		  selectedValue[index] = value;
		  if (selectedValue[0] && selectedValue[1]) {
		    if (this.compare(selectedValue[0], selectedValue[1]) > 0) {
		      selectedValue[1 - index] = undefined;
		    }
		  }
		  this.fireSelectValueChange(selectedValue);
		}

		const RangeCalendar = React.createClass({
		  propTypes: {
		    defaultValue: PropTypes.any,
		    timePicker: PropTypes.any,
		    value: PropTypes.any,
		    selectedValue: PropTypes.array,
		    defaultSelectedValue: PropTypes.array,
		    onOk: PropTypes.func,
		    onChange: PropTypes.func,
		    onSelect: PropTypes.func,
		    onValueChange: PropTypes.func,
		    formatter: PropTypes.object,
		    onClear: PropTypes.func,
		  },

		  mixins: [CommonMixin],

		  getDefaultProps() {
		    return {
		      defaultSelectedValue: [],
		      onValueChange: noop,
		    };
		  },

		  getInitialState() {
		    const props = this.props;
		    const selectedValue = props.selectedValue || props.defaultSelectedValue;
		    const value = normalizeAnchor(props, 1);
		    return {selectedValue, value};
		  },

		  componentWillReceiveProps(nextProps) {
		    const newState = {};
		    if ('value' in nextProps) {
		      if (nextProps.value) {
		        newState.value = nextProps.value;
		      } else {
		        newState.value = normalizeAnchor(nextProps, 0);
		      }
		      this.setState(newState);
		    }
		    if ('selectedValue' in nextProps) {
		      newState.selectedValue = nextProps.selectedValue;
		      this.setState(newState);
		    }
		  },

		  onSelect(value) {
		    const originalValue = this.state.selectedValue;
		    const selectedValue = originalValue.concat();
		    let changed = false;
		    if (!selectedValue.length || selectedValue.length === 2 && !originalValue.hovering) {
		      selectedValue.length = 1;
		      selectedValue[0] = value;
		      changed = true;
		    } else if (this.compare(selectedValue[0], value) <= 0) {
		      selectedValue[1] = value;
		      changed = true;
		    } else if (this.compare(selectedValue[0], value) > 0) {
		      selectedValue.length = 1;
		      selectedValue[0] = value;
		      changed = true;
		    }
		    if (changed) {
		      this.fireSelectValueChange(selectedValue);
		    }
		  },

		  onDayHover(hoverValue) {
		    let selectedValue = this.state.selectedValue;
		    if (!selectedValue.length || selectedValue.length === 2 && !selectedValue.hovering) {
		      return;
		    }
		    if (this.compare(hoverValue, selectedValue[0]) < 0) {
		      return;
		    }
		    selectedValue = selectedValue.concat();
		    selectedValue[1] = hoverValue;
		    selectedValue.hovering = 1;
		    this.fireSelectValueChange(selectedValue);
		  },

		  onToday() {
		    this.setState({
		      value: getTodayTime(this.state.value),
		    });
		  },

		  onOk() {
		    this.props.onOk(this.state.selectedValue);
		  },

		  getStartValue() {
		    let value = this.state.value;
		    const selectedValue = this.state.selectedValue;
		    // keep selectedTime when select date
		    if (selectedValue[0] && this.props.timePicker) {
		      value = value.clone();
		      syncTime(selectedValue[0], value);
		    }
		    return value;
		  },

		  getEndValue() {
		    const endValue = this.state.value.clone();
		    endValue.addMonth(1);
		    const selectedValue = this.state.selectedValue;
		    // keep selectedTime when select date
		    if (selectedValue[1] && this.props.timePicker) {
		      syncTime(selectedValue[1], endValue);
		    }
		    return endValue;
		  },

		  compare(v1, v2) {
		    if (this.props.timePicker) {
		      return v1.getTime() - v2.getTime();
		    }
		    return v1.compareToDay(v2);
		  },

		  fireSelectValueChange(selectedValue, direct) {
		    if (!('selectedValue' in this.props)) {
		      this.setState({selectedValue});
		    }
		    this.props.onChange(selectedValue);
		    if (direct || selectedValue[0] && selectedValue[1] && !selectedValue.hovering) {
		      this.props.onSelect(selectedValue);
		    }
		  },

		  fireValueChange(value) {
		    const props = this.props;
		    if (!('value' in props)) {
		      this.setState({value});
		    }
		    props.onValueChange(value);
		  },

		  clear() {
		    this.fireSelectValueChange([], true);
		    this.props.onClear();
		  },

		  render() {
		    const props = this.props;
		    const state = this.state;
		    const {prefixCls, dateInputPlaceholder} = props;
		    const className = {
		      [props.className]: !!props.className,
		      [prefixCls]: 1,
		      [`${prefixCls}-hidden`]: !props.visible,
		      [prefixCls + '-range']: 1,
		      [`${prefixCls}-week-number`]: props.showWeekNumber,
		    };
		    const classes = classnames(className);
		    const newProps = {
		      selectedValue: state.selectedValue,
		      onSelect: this.onSelect,
		      onDayHover: this.onDayHover,
		    };

		    let placeholder1;
		    let placeholder2;

		    if (dateInputPlaceholder) {
		      if (Array.isArray(dateInputPlaceholder)) {
		        [placeholder1, placeholder2] = dateInputPlaceholder;
		      } else {
		        placeholder1 = placeholder2 = dateInputPlaceholder;
		      }
		    }
		    return (<div className={classes} style={props.style}
		                 tabIndex="0">
		      <a className={`${prefixCls}-clear-btn`} role="button" title="清除" onClick={this.clear}/>
		      <CalendarPart {...props} {...newProps} direction="left"
		                                             formatter={this.getFormatter()}
		                                             value={this.getStartValue()}
		                                             placeholder={placeholder1}
		                                             onInputSelect={onInputSelect.bind(this, 'left')}
		                                             onValueChange={onValueChange.bind(this, 'left')}/>
		      <span className={`${prefixCls}-range-middle`}>~</span>
		      <CalendarPart {...props} {...newProps} direction="right"
		                                             formatter={this.getFormatter()}
		                                             placeholder={placeholder2}
		                                             value={this.getEndValue()}
		                                             onInputSelect={onInputSelect.bind(this, 'right')}
		                                             onValueChange={onValueChange.bind(this, 'right')}/>

		      <div className={`${prefixCls}-range-bottom`}>
		        <TodayButton {...props} value={state.value}
		                                onToday={this.onToday}/>
		        <OkButton {...props} value={state.value}
		                             onOk={this.onOk}
		                             okDisabled={state.selectedValue.length !== 2 || state.selectedValue.hovering}
		        />
		      </div>
		    </div>);
		  },
		});

		return RangeCalendar;

	}();


	const Picker = function(){
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


		function refFn(field, component) {
		  this[field] = component;
		}

		const Picker = React.createClass({
		  propTypes: {
		    onChange: PropTypes.func,
		    onOpen: PropTypes.func,
		    onClose: PropTypes.func,
		    children: PropTypes.func,
		    getCalendarContainer: PropTypes.func,
		    calendar: PropTypes.element,
		    style: PropTypes.object,
		    open: PropTypes.bool,
		    defaultOpen: PropTypes.bool,
		    prefixCls: PropTypes.string,
		    placement: PropTypes.any,
		    value: PropTypes.oneOfType([
		      PropTypes.object,
		      PropTypes.array,
		    ]),
		    defaultValue: PropTypes.oneOfType([
		      PropTypes.object,
		      PropTypes.array,
		    ]),
		    align: PropTypes.object,
		  },

		  getDefaultProps() {
		    return {
		      prefixCls: 'rc-calendar-picker',
		      style: {},
		      align: {},
		      placement: 'bottomLeft',
		      defaultOpen: false,
		      onChange: noop,
		      onOpen: noop,
		      onClose: noop,
		    };
		  },

		  getInitialState() {
		    const props = this.props;
		    let open;
		    if ('open' in props) {
		      open = props.open;
		    } else {
		      open = props.defaultOpen;
		    }
		    const value = props.value || props.defaultValue;
		    this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
		    return {open, value};
		  },

		  componentWillReceiveProps(nextProps) {
		    const {value, open} = nextProps;
		    if ('value' in nextProps) {
		      this.setState({value});
		    }
		    if (open !== undefined) {
		      this.setState({open});
		    }
		  },

		  onCalendarKeyDown(event) {
		    if (event.keyCode === KeyCode.ESC) {
		      event.stopPropagation();
		      this.close(this.focus);
		    }
		  },

		  onCalendarSelect(value, cause = {}) {
		    const props = this.props;
		    if (!('value' in props)) {
		      this.setState({
		        value: value,
		      });
		    }
		    if (!props.calendar.props.timePicker && cause.source !== 'dateInput') {
		      this.close(this.focus);
		    }
		    props.onChange(value);
		  },

		  onCalendarOk() {
		    this.close(this.focus);
		  },

		  onCalendarClear() {
		    this.close(this.focus);
		  },

		  onVisibleChange(open) {
		    this.setOpen(open, () => {
		      if (open) {
		        ReactDOM.findDOMNode(this.calendarInstance).focus();
		      }
		    });
		  },

		  getCalendarElement() {
		    const props = this.props;
		    const state = this.state;
		    const calendarProp = props.calendar;
		    const {value} = state;
		    let defaultValue;
		    // RangeCalendar
		    if (Array.isArray(value)) {
		      defaultValue = value[0];
		    } else {
		      defaultValue = value;
		    }
		    const extraProps = {
		      ref: this.saveCalendarRef,
		      defaultValue: defaultValue || calendarProp.props.defaultValue,
		      defaultSelectedValue: value,
		      onKeyDown: this.onCalendarKeyDown,
		      onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
		      onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
		      onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear),
		    };

		    return React.cloneElement(calendarProp, extraProps);
		  },

		  setOpen(open, callback) {
		    const {onOpen, onClose} = this.props;
		    if (this.state.open !== open) {
		      this.setState({
		        open: open,
		      }, callback);
		      const event = {
		        open: open,
		      };
		      if (open) {
		        onOpen(event);
		      } else {
		        onClose(event);
		      }
		    }
		  },

		  open(callback) {
		    this.setOpen(true, callback);
		  },

		  close(callback) {
		    this.setOpen(false, callback);
		  },

		  focus() {
		    if (!this.state.open) {
		      ReactDOM.findDOMNode(this).focus();
		    }
		  },

		  render() {
		    const props = this.props;
		    const { prefixCls, placement,
		      style, getCalendarContainer,
		      align, animation,
		      disabled,
		      transitionName, children } = props;
		    const state = this.state;
		    return (<Trigger popup={this.getCalendarElement()}
		                     popupAlign={align}
		                     builtinPlacements={placements}
		                     popupPlacement={placement}
		                     action={disabled ? [] : ['click']}
		                     destroyPopupOnHide
		                     getPopupContainer={getCalendarContainer}
		                     popupStyle={style}
		                     popupAnimation={animation}
		                     popupTransitionName={transitionName}
		                     popupVisible={state.open}
		                     onPopupVisibleChange={this.onVisibleChange}
		                     prefixCls={prefixCls}>
		      {children(state, props)}
		    </Trigger>);
		  },
		});

		return Picker;

	}();

	
	RC.Calendar = Calendar;
	RC.FullCalendar = FullCalendar;
	RC.MonthCalendar = MonthCalendar;
	RC.RangeCalendar = RangeCalendar;
	RC.DatePicker = Picker;
}(Smart.RC)
