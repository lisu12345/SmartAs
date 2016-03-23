'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+function (RC) {
		var _ref = _;
		var noop = _ref.noop;
		var GregorianCalendar = RC.GregorianCalendar;
		var DateTimeFormat = RC.DateTimeFormat;
		var KeyCode = RC.KeyCode;
		var Locale = RC.Locale;
		var classnames = RC.classnames;
		var Util = RC.Util;
		var Trigger = RC.Trigger;
		var createChainedFunction = Util.createChainedFunction;
		var Children = Util.Children;
		var _React = React;
		var Component = _React.Component;
		var PropTypes = _React.PropTypes;
		var toFragment = Children.mapSelf;

		var defaultDisabledTime = {
				disabledHours: function disabledHours() {
						return [];
				},
				disabledMinutes: function disabledMinutes() {
						return [];
				},
				disabledSeconds: function disabledSeconds() {
						return [];
				}
		};

		function getTodayTime(value) {
				var today = value.clone();
				today.setTime(Date.now());
				return today;
		}

		function getTitleString(value) {
				return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
		}

		function getTodayTimeStr(value) {
				var today = getTodayTime(value);
				return getTitleString(today);
		}

		function _getFormatter(format, locale) {
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
				var disabledTimeConfig = disabledTime ? disabledTime(value) : {};
				disabledTimeConfig = _extends({}, defaultDisabledTime, disabledTimeConfig);
				return disabledTimeConfig;
		}

		function isTimeValidByConfig(value, disabledTimeConfig) {
				var invalidTime = false;
				if (value) {
						var hour = value.getHourOfDay();
						var minutes = value.getMinutes();
						var seconds = value.getSeconds();
						var disabledHours = disabledTimeConfig.disabledHours();
						if (disabledHours.indexOf(hour) === -1) {
								var disabledMinutes = disabledTimeConfig.disabledMinutes(hour);
								if (disabledMinutes.indexOf(minutes) === -1) {
										var disabledSeconds = disabledTimeConfig.disabledSeconds(hour, minutes);
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
				var disabledTimeConfig = getTimeConfig(value, disabledTime);
				return isTimeValidByConfig(value, disabledTimeConfig);
		}

		function _isAllowedDate(value, disabledDate, disabledTime) {
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

		var DateConstants = {
				DATE_ROW_COUNT: 6,
				DATE_COL_COUNT: 7
		};

		var DateTHead = function (_React$Component) {
				_inherits(DateTHead, _React$Component);

				function DateTHead() {
						_classCallCheck(this, DateTHead);

						return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTHead).apply(this, arguments));
				}

				_createClass(DateTHead, [{
						key: 'render',
						value: function render() {
								var props = this.props;
								var value = props.value;
								var locale = props.locale;
								var prefixCls = props.prefixCls;
								var veryShortWeekdays = [];
								var weekDays = [];
								var firstDayOfWeek = value.getFirstDayOfWeek();
								var showWeekNumberEl = void 0;

								for (var dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
										var index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
										veryShortWeekdays[dateColIndex] = locale.format.veryShortWeekdays[index];
										weekDays[dateColIndex] = locale.format.weekdays[index];
								}

								if (props.showWeekNumber) {
										showWeekNumberEl = React.createElement(
												'th',
												{ role: 'columnheader', className: prefixCls + '-column-header ' + prefixCls + '-week-number-header' },
												React.createElement(
														'span',
														{ className: prefixCls + '-column-header-inner' },
														'x'
												)
										);
								}
								var weekDaysEls = weekDays.map(function (day, xindex) {
										return React.createElement(
												'th',
												{ key: xindex, role: 'columnheader', title: day, className: prefixCls + '-column-header' },
												React.createElement(
														'span',
														{ className: prefixCls + '-column-header-inner' },
														veryShortWeekdays[xindex]
												)
										);
								});
								return React.createElement(
										'thead',
										null,
										React.createElement(
												'tr',
												{ role: 'row' },
												showWeekNumberEl,
												weekDaysEls
										)
								);
						}
				}]);

				return DateTHead;
		}(React.Component);

		function isSameDay(one, two) {
				return one && two && one.compareToDay(two) === 0;
		}

		function beforeCurrentMonthYear(current, today) {
				if (current.getYear() < today.getYear()) {
						return 1;
				}
				return current.getYear() === today.getYear() && current.getMonth() < today.getMonth();
		}

		function afterCurrentMonthYear(current, today) {
				if (current.getYear() > today.getYear()) {
						return 1;
				}
				return current.getYear() === today.getYear() && current.getMonth() > today.getMonth();
		}

		function getIdFromDate(date) {
				return 'rc-calendar-' + date.getYear() + '-' + date.getMonth() + '-' + date.getDayOfMonth();
		}

		function handleDayClick(current) {
				this.props.onSelect(current);
		}

		function handleCellMouseEnter(current) {
				this.props.onDayHover(current);
		}

		var DateTBody = React.createClass({
				displayName: 'DateTBody',
				getDefaultProps: function getDefaultProps() {
						return {
								onDayHover: noop
						};
				},
				render: function render() {
						var props = this.props;
						var iIndex = void 0;
						var jIndex = void 0;
						var current = void 0;
						var dateTable = [];
						var showWeekNumber = props.showWeekNumber;
						var value = props.value;
						var selectedValue = props.selectedValue;
						var today = value.clone();
						var prefixCls = props.prefixCls;
						var cellClass = prefixCls + '-cell';
						var weekNumberCellClass = prefixCls + '-week-number-cell';
						var dateClass = prefixCls + '-date';
						var dateRender = props.dateRender;
						var disabledDate = props.disabledDate;
						var todayClass = prefixCls + '-today';
						var selectedClass = prefixCls + '-selected-day';
						var inRangeClass = prefixCls + '-in-range-cell';
						var lastMonthDayClass = prefixCls + '-last-month-cell';
						var nextMonthDayClass = prefixCls + '-next-month-btn-day';
						var disabledClass = prefixCls + '-disabled-cell';
						var firstDisableClass = prefixCls + '-disabled-cell-first-of-row';
						var lastDisableClass = prefixCls + '-disabled-cell-last-of-row';
						today.setTime(Date.now());
						var month1 = value.clone();
						month1.set(value.getYear(), value.getMonth(), 1);
						var day = month1.getDayOfWeek();
						var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
						// calculate last month
						var lastMonth1 = month1.clone();
						lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
						var passed = 0;
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
						var tableHtml = [];
						passed = 0;
						for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
								var weekNumberCell = void 0;
								var dateCells = [];
								if (showWeekNumber) {
										weekNumberCell = React.createElement(
												'td',
												{ key: dateTable[passed].getWeekOfYear(), role: 'gridcell',
														className: weekNumberCellClass },
												dateTable[passed].getWeekOfYear()
										);
								}
								for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
										var next = null;
										var last = null;
										current = dateTable[passed];
										if (jIndex < DateConstants.DATE_COL_COUNT - 1) {
												next = dateTable[passed + 1];
										}
										if (jIndex > 0) {
												last = dateTable[passed - 1];
										}
										var cls = cellClass;
										var disabled = false;
										var selected = false;

										if (isSameDay(current, today)) {
												cls += ' ' + todayClass;
										}

										var isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
										var isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

										if (selectedValue && Array.isArray(selectedValue)) {
												if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
														var startValue = selectedValue[0];
														var endValue = selectedValue[1];
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

										var dateHtml = void 0;
										if (dateRender) {
												dateHtml = dateRender(current, value);
										} else {
												dateHtml = React.createElement(
														'span',
														{
																key: getIdFromDate(current),
																className: dateClass,
																'aria-selected': selected,
																'aria-disabled': disabled },
														current.getDayOfMonth()
												);
										}

										dateCells.push(React.createElement(
												'td',
												{ key: passed,
														onClick: disabled ? noop : handleDayClick.bind(this, current),
														onMouseEnter: disabled ? noop : handleCellMouseEnter.bind(this, current),
														role: 'gridcell',
														title: getTitleString(current), className: cls },
												dateHtml
										));

										passed++;
								}
								tableHtml.push(React.createElement(
										'tr',
										{
												key: iIndex,
												role: 'row' },
										weekNumberCell,
										dateCells
								));
						}
						return React.createElement(
								'tbody',
								{ className: prefixCls + 'tbody' },
								tableHtml
						);
				}
		});

		var DateTable = function (_React$Component2) {
				_inherits(DateTable, _React$Component2);

				function DateTable() {
						_classCallCheck(this, DateTable);

						return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTable).apply(this, arguments));
				}

				_createClass(DateTable, [{
						key: 'render',
						value: function render() {
								var props = this.props;
								var prefixCls = props.prefixCls;
								return React.createElement(
										'table',
										{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
										React.createElement(DateTHead, props),
										React.createElement(DateTBody, props)
								);
						}
				}]);

				return DateTable;
		}(React.Component);

		function copyTime(target, source) {
				if (source) {
						target.setHourOfDay(source.getHourOfDay());
						target.setMinutes(source.getMinutes());
						target.setSeconds(source.getSeconds());
				}
				return target;
		}

		var DateInput = React.createClass({
				displayName: 'DateInput',

				propTypes: {
						formatter: PropTypes.object,
						locale: PropTypes.object,
						gregorianCalendarLocale: PropTypes.object,
						disabledDate: PropTypes.func,
						onChange: PropTypes.func,
						onClear: PropTypes.func,
						placeholder: PropTypes.string,
						onSelect: PropTypes.func,
						selectedValue: PropTypes.object
				},

				getInitialState: function getInitialState() {
						var selectedValue = this.props.selectedValue;
						return {
								str: selectedValue && this.props.formatter.format(selectedValue) || '',
								invalid: false
						};
				},
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
						// when popup show, click body will call this, bug!
						var selectedValue = nextProps.selectedValue;
						this.setState({
								str: selectedValue && nextProps.formatter.format(selectedValue) || '',
								invalid: false
						});
				},
				onInputChange: function onInputChange(event) {
						var str = event.target.value;
						this.setState({
								str: str
						});
						var value = void 0;
						var _props = this.props;
						var disabledDate = _props.disabledDate;
						var formatter = _props.formatter;
						var gregorianCalendarLocale = _props.gregorianCalendarLocale;
						var onChange = _props.onChange;

						if (str) {
								try {
										value = copyTime(formatter.parse(str, {
												locale: gregorianCalendarLocale,
												obeyCount: true
										}), this.props.selectedValue);
								} catch (ex) {
										this.setState({
												invalid: true
										});
										return;
								}
								if (value && (!disabledDate || !disabledDate(value))) {
										var originalValue = this.props.selectedValue;
										if (originalValue && value) {
												if (originalValue.getTime() !== value.getTime()) {
														onChange(value);
												}
										} else if (originalValue !== value) {
												onChange(value);
										}
								} else {
										this.setState({
												invalid: true
										});
										return;
								}
						} else {
								onChange(null);
						}
						this.setState({
								invalid: false
						});
				},
				onClear: function onClear() {
						this.setState({ str: '' });
						this.props.onClear(null);
				},
				getRootDOMNode: function getRootDOMNode() {
						return ReactDOM.findDOMNode(this);
				},
				render: function render() {
						var props = this.props;
						var _state = this.state;
						var invalid = _state.invalid;
						var str = _state.str;
						var selectedValue = props.selectedValue;
						var locale = props.locale;
						var prefixCls = props.prefixCls;
						var placeholder = props.placeholder;
						var onChange = props.onChange;
						var timePicker = props.timePicker;
						var disabledTime = props.disabledTime;
						var gregorianCalendarLocale = props.gregorianCalendarLocale;

						var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
						var disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
						return React.createElement(
								'div',
								{ className: prefixCls + '-input-wrap' },
								React.createElement(
										'div',
										{ className: prefixCls + '-time-picker-wrap' },
										timePicker ? React.cloneElement(timePicker, _extends({
												showClear: false,
												allowEmpty: false,
												getPopupContainer: this.getRootDOMNode,
												gregorianCalendarLocale: gregorianCalendarLocale,
												value: selectedValue,
												onChange: onChange
										}, disabledTimeConfig)) : null
								),
								React.createElement(
										'div',
										{ className: prefixCls + '-date-input-wrap' },
										React.createElement('input', { className: prefixCls + '-input  ' + invalidClass,
												value: str,
												placeholder: placeholder,
												onChange: this.onInputChange })
								),
								props.showClear ? React.createElement('a', { className: prefixCls + '-clear-btn',
										role: 'button',
										title: locale.clear,
										onClick: this.onClear }) : null
						);
				}
		});

		function TodayButton(_ref2) {
				var prefixCls = _ref2.prefixCls;
				var locale = _ref2.locale;
				var value = _ref2.value;
				var timePicker = _ref2.timePicker;
				var disabledDate = _ref2.disabledDate;
				var disabledTime = _ref2.disabledTime;
				var onToday = _ref2.onToday;

				var disabledToday = false;
				var localeNow = locale.today;
				if (timePicker) {
						localeNow = locale.now || locale.today;
				}
				var disabledTodayClass = '';
				if (disabledDate) {
						disabledToday = !_isAllowedDate(getTodayTime(value), disabledDate, disabledTime);
						if (disabledToday) {
								disabledTodayClass = prefixCls + '-today-btn-disabled';
						}
				}
				return React.createElement(
						'a',
						{ className: prefixCls + '-today-btn ' + disabledTodayClass,
								role: 'button',
								onClick: disabledToday ? null : onToday,
								title: getTodayTimeStr(value) },
						localeNow
				);
		}

		function OkButton(_ref3) {
				var prefixCls = _ref3.prefixCls;
				var locale = _ref3.locale;
				var okDisabled = _ref3.okDisabled;
				var onOk = _ref3.onOk;

				var className = prefixCls + '-ok-btn';
				if (okDisabled) {
						className += ' ' + prefixCls + '-ok-btn-disabled';
				}
				return React.createElement(
						'a',
						{ className: className,
								role: 'button',
								onClick: okDisabled ? null : onOk },
						locale.ok
				);
		}

		var DecadePanel = function () {

				var ROW = 4;
				var COL = 3;

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setState({
								value: next
						});
				}

				function chooseDecade(year, event) {
						var next = this.state.value.clone();
						next.setYear(year);
						next.rollSetMonth(this.state.value.getMonth());
						this.props.onSelect(next);
						event.preventDefault();
				}

				var DecadePanel = function (_React$Component3) {
						_inherits(DecadePanel, _React$Component3);

						function DecadePanel(props) {
								_classCallCheck(this, DecadePanel);

								var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(DecadePanel).call(this, props));

								_this3.state = {
										value: props.value || props.defaultValue
								};

								// bind methods
								_this3.prefixCls = props.rootPrefixCls + '-decade-panel';
								_this3.nextCentury = goYear.bind(_this3, 100);
								_this3.previousCentury = goYear.bind(_this3, -100);
								return _this3;
						}

						_createClass(DecadePanel, [{
								key: 'render',
								value: function render() {
										var _this4 = this;

										var value = this.state.value;
										var locale = this.props.locale;
										var currentYear = value.getYear();
										var startYear = parseInt(currentYear / 100, 10) * 100;
										var preYear = startYear - 10;
										var endYear = startYear + 99;
										var decades = [];
										var index = 0;
										var prefixCls = this.prefixCls;

										for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
												decades[rowIndex] = [];
												for (var colIndex = 0; colIndex < COL; colIndex++) {
														var startDecade = preYear + index * 10;
														var endDecade = preYear + index * 10 + 9;
														decades[rowIndex][colIndex] = {
																startDecade: startDecade,
																endDecade: endDecade
														};
														index++;
												}
										}

										var decadesEls = decades.map(function (row, decadeIndex) {
												var tds = row.map(function (decadeData) {
														var _classNameMap;

														var dStartDecade = decadeData.startDecade;
														var dEndDecade = decadeData.endDecade;
														var isLast = dStartDecade < startYear;
														var isNext = dEndDecade > endYear;
														var classNameMap = (_classNameMap = {}, _defineProperty(_classNameMap, prefixCls + '-cell', 1), _defineProperty(_classNameMap, prefixCls + '-selected-cell', dStartDecade <= currentYear && currentYear <= dEndDecade), _defineProperty(_classNameMap, prefixCls + '-last-century-cell', isLast), _defineProperty(_classNameMap, prefixCls + '-next-century-cell', isNext), _classNameMap);
														var content = void 0;
														var clickHandler = void 0;
														if (isLast) {
																clickHandler = _this4.previousCentury;
														} else if (isNext) {
																clickHandler = _this4.nextCentury;
														} else {
																content = dStartDecade + '-' + dEndDecade;
																clickHandler = chooseDecade.bind(_this4, dStartDecade);
														}
														return React.createElement(
																'td',
																{
																		key: dStartDecade,
																		onClick: clickHandler,
																		role: 'gridcell',
																		className: classnames(classNameMap)
																},
																React.createElement(
																		'a',
																		{
																				className: prefixCls + '-decade' },
																		content
																)
														);
												});
												return React.createElement(
														'tr',
														{ key: decadeIndex, role: 'row' },
														tds
												);
										});

										return React.createElement(
												'div',
												{ className: this.prefixCls },
												React.createElement(
														'div',
														{ className: prefixCls + '-header' },
														React.createElement(
																'a',
																{ className: prefixCls + '-prev-century-btn',
																		role: 'button',
																		onClick: this.previousCentury,
																		title: locale.previousCentury },
																'«'
														),
														React.createElement(
																'div',
																{ className: prefixCls + '-century' },
																startYear,
																'-',
																endYear
														),
														React.createElement(
																'a',
																{ className: prefixCls + '-next-century-btn',
																		role: 'button',
																		onClick: this.nextCentury,
																		title: locale.nextCentury },
																'»'
														)
												),
												React.createElement(
														'div',
														{ className: prefixCls + '-body' },
														React.createElement(
																'table',
																{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
																React.createElement(
																		'tbody',
																		{ className: prefixCls + '-tbody' },
																		decadesEls
																)
														)
												)
										);
								}
						}]);

						return DecadePanel;
				}(React.Component);

				DecadePanel.propTypes = {
						locale: PropTypes.object,
						value: PropTypes.object,
						defaultValue: PropTypes.object,
						rootPrefixCls: PropTypes.string
				};

				DecadePanel.defaultProps = {
						onSelect: function onSelect() {}
				};
				return DecadePanel;
		}();

		var YearPanel = function () {

				var ROW = 4;
				var COL = 3;

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setState({ value: next });
				}

				function chooseYear(year) {
						var next = this.state.value.clone();
						next.setYear(year);
						next.rollSetMonth(this.state.value.getMonth());
						this.props.onSelect(next);
				}

				var YearPanel = function (_React$Component4) {
						_inherits(YearPanel, _React$Component4);

						function YearPanel(props) {
								_classCallCheck(this, YearPanel);

								var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(YearPanel).call(this, props));

								_this5.prefixCls = props.rootPrefixCls + '-year-panel';
								_this5.state = {
										value: props.value || props.defaultValue
								};
								_this5.nextDecade = goYear.bind(_this5, 10);
								_this5.previousDecade = goYear.bind(_this5, -10);
								['showDecadePanel', 'onDecadePanelSelect'].forEach(function (method) {
										_this5[method] = _this5[method].bind(_this5);
								});
								return _this5;
						}

						_createClass(YearPanel, [{
								key: 'onDecadePanelSelect',
								value: function onDecadePanelSelect(current) {
										this.setState({
												value: current,
												showDecadePanel: 0
										});
								}
						}, {
								key: 'getYears',
								value: function getYears() {
										var value = this.state.value;
										var currentYear = value.getYear();
										var startYear = parseInt(currentYear / 10, 10) * 10;
										var previousYear = startYear - 1;
										var endYear = startYear + 9;
										var years = [];
										var index = 0;
										for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
												years[rowIndex] = [];
												for (var colIndex = 0; colIndex < COL; colIndex++) {
														var year = previousYear + index;
														var content = void 0;
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
																title: content
														};
														index++;
												}
										}
										return years;
								}
						}, {
								key: 'showDecadePanel',
								value: function showDecadePanel() {
										this.setState({
												showDecadePanel: 1
										});
								}
						}, {
								key: 'render',
								value: function render() {
										var _this6 = this;

										var props = this.props;
										var value = this.state.value;
										var locale = props.locale;
										var years = this.getYears();
										var currentYear = value.getYear();
										var startYear = parseInt(currentYear / 10, 10) * 10;
										var endYear = startYear + 9;
										var prefixCls = this.prefixCls;

										var yeasEls = years.map(function (row, index) {
												var tds = row.map(function (yearData) {
														var _classNameMap2;

														var classNameMap = (_classNameMap2 = {}, _defineProperty(_classNameMap2, prefixCls + '-cell', 1), _defineProperty(_classNameMap2, prefixCls + '-selected-cell', yearData.year === currentYear), _defineProperty(_classNameMap2, prefixCls + '-last-decade-cell', yearData.year < startYear), _defineProperty(_classNameMap2, prefixCls + '-next-decade-cell', yearData.year > endYear), _classNameMap2);
														var clickHandler = void 0;
														if (yearData.year < startYear) {
																clickHandler = _this6.previousDecade;
														} else if (yearData.year > endYear) {
																clickHandler = _this6.nextDecade;
														} else {
																clickHandler = chooseYear.bind(_this6, yearData.year);
														}
														return React.createElement(
																'td',
																{ role: 'gridcell',
																		title: yearData.title,
																		key: yearData.content,
																		onClick: clickHandler,
																		className: classnames(classNameMap)
																},
																React.createElement(
																		'a',
																		{
																				className: prefixCls + '-year' },
																		yearData.content
																)
														);
												});
												return React.createElement(
														'tr',
														{ key: index, role: 'row' },
														tds
												);
										});

										var decadePanel = void 0;
										if (this.state.showDecadePanel) {
												decadePanel = React.createElement(DecadePanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls,
														onSelect: this.onDecadePanelSelect });
										}

										return React.createElement(
												'div',
												{ className: this.prefixCls },
												React.createElement(
														'div',
														null,
														React.createElement(
																'div',
																{ className: prefixCls + '-header' },
																React.createElement(
																		'a',
																		{ className: prefixCls + '-prev-decade-btn',
																				role: 'button',
																				onClick: this.previousDecade,
																				title: locale.previousDecade },
																		'«'
																),
																React.createElement(
																		'a',
																		{ className: prefixCls + '-decade-select',
																				role: 'button',
																				onClick: this.showDecadePanel,
																				title: locale.decadeSelect },
																		React.createElement(
																				'span',
																				{ className: prefixCls + '-decade-select-content' },
																				startYear,
																				'-',
																				endYear
																		),
																		React.createElement(
																				'span',
																				{ className: prefixCls + '-decade-select-arrow' },
																				'x'
																		)
																),
																React.createElement(
																		'a',
																		{ className: prefixCls + '-next-decade-btn',
																				role: 'button',
																				onClick: this.nextDecade,
																				title: locale.nextDecade },
																		'»'
																)
														),
														React.createElement(
																'div',
																{ className: prefixCls + '-body' },
																React.createElement(
																		'table',
																		{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
																		React.createElement(
																				'tbody',
																				{ className: prefixCls + '-tbody' },
																				yeasEls
																		)
																)
														)
												),
												decadePanel
										);
								}
						}]);

						return YearPanel;
				}(React.Component);

				YearPanel.propTypes = {
						rootPrefixCls: PropTypes.string,
						value: PropTypes.object,
						defaultValue: PropTypes.object
				};

				YearPanel.defaultProps = {
						onSelect: function onSelect() {}
				};

				return YearPanel;
		}();

		var MonthTable = function () {

				var ROW = 4;
				var COL = 3;

				function chooseMonth(month) {
						var next = this.state.value.clone();
						next.rollSetMonth(month);
						this.setAndSelectValue(next);
				}

				var MonthTable = function (_Component) {
						_inherits(MonthTable, _Component);

						function MonthTable(props) {
								_classCallCheck(this, MonthTable);

								var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(MonthTable).call(this, props));

								_this7.state = {
										value: props.value
								};
								return _this7;
						}

						_createClass(MonthTable, [{
								key: 'componentWillReceiveProps',
								value: function componentWillReceiveProps(nextProps) {
										if ('value' in nextProps) {
												this.setState({
														value: nextProps.value
												});
										}
								}
						}, {
								key: 'getMonths',
								value: function getMonths() {
										var props = this.props;
										var value = this.state.value;
										var current = value.clone();
										var locale = props.locale;
										var months = [];
										var shortMonths = locale.format.shortMonths;
										var index = 0;
										for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
												months[rowIndex] = [];
												for (var colIndex = 0; colIndex < COL; colIndex++) {
														current.rollSetMonth(index);
														months[rowIndex][colIndex] = {
																value: index,
																content: shortMonths[index],
																title: shortMonths[index]
														};
														index++;
												}
										}
										return months;
								}
						}, {
								key: 'setAndSelectValue',
								value: function setAndSelectValue(value) {
										this.setState({
												value: value
										});
										this.props.onSelect(value);
								}
						}, {
								key: 'render',
								value: function render() {
										var _this8 = this;

										var props = this.props;
										var value = this.state.value;
										var today = value.clone();
										today.setTime(Date.now());
										var months = this.getMonths();
										var currentMonth = value.getMonth();
										var prefixCls = props.prefixCls;
										var locale = props.locale;

										var monthsEls = months.map(function (month, index) {
												var tds = month.map(function (monthData) {
														var _classNameMap3;

														var disabled = false;
														if (props.disabledDate) {
																var testValue = value.clone();
																testValue.rollSetMonth(monthData.value);
																disabled = props.disabledDate(testValue);
														}
														var classNameMap = (_classNameMap3 = {}, _defineProperty(_classNameMap3, prefixCls + '-cell', 1), _defineProperty(_classNameMap3, prefixCls + '-cell-disabled', disabled), _defineProperty(_classNameMap3, prefixCls + '-selected-cell', monthData.value === currentMonth), _defineProperty(_classNameMap3, prefixCls + '-current-cell', today.getYear() === value.getYear() && monthData.value === today.getMonth()), _classNameMap3);
														var cellEl = void 0;
														if (props.cellRender) {
																var currentValue = value.clone();
																currentValue.rollSetMonth(monthData.value);
																cellEl = props.cellRender(currentValue, locale);
														} else {
																cellEl = React.createElement(
																		'a',
																		{ className: prefixCls + '-month' },
																		monthData.content
																);
														}
														return React.createElement(
																'td',
																{ role: 'gridcell',
																		key: monthData.value,
																		onClick: disabled ? null : chooseMonth.bind(_this8, monthData.value),
																		title: monthData.title,
																		className: classnames(classNameMap) },
																cellEl
														);
												});
												return React.createElement(
														'tr',
														{ key: index, role: 'row' },
														tds
												);
										});

										return React.createElement(
												'table',
												{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
												React.createElement(
														'tbody',
														{ className: prefixCls + '-tbody' },
														monthsEls
												)
										);
								}
						}]);

						return MonthTable;
				}(Component);

				MonthTable.defaultProps = {
						onSelect: noop
				};
				MonthTable.propTypes = {
						onSelect: PropTypes.func,
						cellRender: PropTypes.func,
						prefixCls: PropTypes.string,
						value: PropTypes.object
				};
				return MonthTable;
		}();

		var MonthPanel = function () {

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setAndChangeValue(next);
				}

				var MonthPanel = React.createClass({
						displayName: 'MonthPanel',

						propTypes: {
								onChange: PropTypes.func,
								disabledDate: PropTypes.func,
								onSelect: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										onChange: noop,
										onSelect: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								// bind methods
								this.nextYear = goYear.bind(this, 1);
								this.previousYear = goYear.bind(this, -1);
								this.prefixCls = props.rootPrefixCls + '-month-panel';
								return {
										value: props.value || props.defaultValue
								};
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								if ('value' in nextProps) {
										this.setState({
												value: nextProps.value
										});
								}
						},
						onYearPanelSelect: function onYearPanelSelect(current) {
								this.setState({
										showYearPanel: 0
								});
								this.setAndChangeValue(current);
						},
						setAndChangeValue: function setAndChangeValue(value) {
								this.setValue(value);
								this.props.onChange(value);
						},
						setAndSelectValue: function setAndSelectValue(value) {
								this.setValue(value);
								this.props.onSelect(value);
						},
						setValue: function setValue(value) {
								if (!('value' in this.props)) {
										this.setState({
												value: value
										});
								}
						},
						showYearPanel: function showYearPanel() {
								this.setState({
										showYearPanel: 1
								});
						},
						render: function render() {
								var props = this.props;
								var value = this.state.value;
								var locale = props.locale;
								var year = value.getYear();
								var prefixCls = this.prefixCls;
								var yearPanel = void 0;
								if (this.state.showYearPanel) {
										yearPanel = React.createElement(YearPanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls,
												onSelect: this.onYearPanelSelect });
								}
								return React.createElement(
										'div',
										{ className: prefixCls, style: props.style },
										React.createElement(
												'div',
												null,
												React.createElement(
														'div',
														{ className: prefixCls + '-header' },
														React.createElement(
																'a',
																{ className: prefixCls + '-prev-year-btn',
																		role: 'button',
																		onClick: this.previousYear,
																		title: locale.previousYear },
																'«'
														),
														React.createElement(
																'a',
																{ className: prefixCls + '-year-select',
																		role: 'button',
																		onClick: this.showYearPanel,
																		title: locale.yearSelect },
																React.createElement(
																		'span',
																		{ className: prefixCls + '-year-select-content' },
																		year
																),
																React.createElement(
																		'span',
																		{ className: prefixCls + '-year-select-arrow' },
																		'x'
																)
														),
														React.createElement(
																'a',
																{ className: prefixCls + '-next-year-btn',
																		role: 'button',
																		onClick: this.nextYear,
																		title: locale.nextYear },
																'»'
														)
												),
												React.createElement(
														'div',
														{ className: prefixCls + '-body' },
														React.createElement(MonthTable, {
																disabledDate: props.disabledDate,
																onSelect: this.setAndSelectValue,
																locale: locale,
																value: value,
																prefixCls: prefixCls })
												)
										),
										yearPanel
								);
						}
				});

				return MonthPanel;
		}();

		var CalendarHeader = function () {
				function goMonth(direction) {
						var next = this.props.value.clone();
						next.addMonth(direction);
						this.props.onValueChange(next);
				}

				function goYear(direction) {
						var next = this.props.value.clone();
						next.addYear(direction);
						this.props.onValueChange(next);
				}

				var CalendarHeader = React.createClass({
						displayName: 'CalendarHeader',

						propTypes: {
								locale: PropTypes.object,
								value: PropTypes.object,
								onValueChange: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										enableNext: 1,
										enablePrev: 1
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								this.yearFormatter = _getFormatter(props.locale.yearFormat, props.locale);
								this.monthFormatter = _getFormatter(props.locale.monthFormat, props.locale);
								this.nextMonth = goMonth.bind(this, 1);
								this.previousMonth = goMonth.bind(this, -1);
								this.nextYear = goYear.bind(this, 1);
								this.previousYear = goYear.bind(this, -1);
								return {};
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var locale = this.props.locale;
								var nextLocale = nextProps.locale;

								if (nextLocale !== locale) {
										this.yearFormatter = _getFormatter(nextLocale.yearFormat, nextLocale);
										this.monthFormatter = _getFormatter(nextLocale.monthFormat, nextLocale);
								}
						},
						onSelect: function onSelect(value) {
								this.setState({
										showMonthPanel: 0,
										showYearPanel: 0
								});
								this.props.onValueChange(value);
						},
						getMonthYearElement: function getMonthYearElement() {
								var props = this.props;
								var prefixCls = props.prefixCls;
								var locale = props.locale;
								var value = this.props.value;
								var monthBeforeYear = locale.monthBeforeYear;
								var selectClassName = prefixCls + '-' + (monthBeforeYear ? 'my-select' : 'ym-select');
								var year = React.createElement(
										'a',
										{ className: prefixCls + '-year-select',
												role: 'button',
												onClick: this.showYearPanel,
												title: locale.monthSelect },
										this.yearFormatter.format(value)
								);
								var month = React.createElement(
										'a',
										{ className: prefixCls + '-month-select',
												role: 'button',
												onClick: this.showMonthPanel,
												title: locale.monthSelect },
										this.monthFormatter.format(value)
								);
								var my = [];
								if (monthBeforeYear) {
										my = [month, year];
								} else {
										my = [year, month];
								}
								return React.createElement(
										'span',
										{ className: selectClassName },
										toFragment(my)
								);
						},
						showIf: function showIf(condition, el) {
								return condition ? el : null;
						},
						showMonthPanel: function showMonthPanel() {
								this.setState({
										showMonthPanel: 1,
										showYearPanel: 0
								});
						},
						showYearPanel: function showYearPanel() {
								this.setState({
										showMonthPanel: 0,
										showYearPanel: 1
								});
						},
						render: function render() {
								var props = this.props;
								var enableNext = props.enableNext;
								var enablePrev = props.enablePrev;
								var prefixCls = props.prefixCls;
								var locale = props.locale;
								var value = props.value;

								var state = this.state;
								var PanelClass = null;
								if (state.showMonthPanel) {
										PanelClass = MonthPanel;
								} else if (state.showYearPanel) {
										PanelClass = YearPanel;
								}
								var panel = void 0;
								if (PanelClass) {
										panel = React.createElement(PanelClass, { locale: locale, defaultValue: value, rootPrefixCls: prefixCls, onSelect: this.onSelect });
								}
								return React.createElement(
										'div',
										{ className: prefixCls + '-header' },
										React.createElement(
												'div',
												{ style: { position: 'relative' } },
												this.showIf(enablePrev, React.createElement(
														'a',
														{ className: prefixCls + '-prev-year-btn',
																role: 'button',
																onClick: this.previousYear,
																title: locale.previousYear },
														'«'
												)),
												this.showIf(enablePrev, React.createElement(
														'a',
														{ className: prefixCls + '-prev-month-btn',
																role: 'button',
																onClick: this.previousMonth,
																title: locale.previousMonth },
														'‹'
												)),
												this.getMonthYearElement(),
												this.showIf(enableNext, React.createElement(
														'a',
														{ className: prefixCls + '-next-month-btn',
																onClick: this.nextMonth,
																title: locale.nextMonth },
														'›'
												)),
												this.showIf(enableNext, React.createElement(
														'a',
														{ className: prefixCls + '-next-year-btn',
																onClick: this.nextYear,
																title: locale.nextYear },
														'»'
												))
										),
										panel
								);
						}
				});

				return CalendarHeader;
		}();

		var CalendarFooter = React.createClass({
				displayName: 'CalendarFooter',

				propTypes: {
						onSelect: PropTypes.func,
						value: PropTypes.object,
						defaultValue: PropTypes.object
				},

				onSelect: function onSelect(value) {
						this.props.onSelect(value);
				},
				getRootDOMNode: function getRootDOMNode() {
						return ReactDOM.findDOMNode(this);
				},
				render: function render() {
						var props = this.props;
						var value = props.value;
						var prefixCls = props.prefixCls;
						var showDateInput = props.showDateInput;
						var disabledTime = props.disabledTime;
						var gregorianCalendarLocale = props.gregorianCalendarLocale;
						var selectedValue = props.selectedValue;

						var timePicker = !showDateInput && props.timePicker || null;
						var disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
						var footerEl = null;
						if (props.showToday || timePicker) {
								var nowEl = void 0;
								if (props.showToday) {
										nowEl = React.createElement(TodayButton, _extends({}, props, { value: value }));
								}
								var okBtn = void 0;
								if (props.showOk) {
										okBtn = React.createElement(OkButton, props);
								}
								var footerBtn = void 0;
								if (nowEl || okBtn) {
										footerBtn = React.createElement(
												'span',
												{ className: prefixCls + '-footer-btn' },
												toFragment([nowEl, okBtn])
										);
								}
								if (timePicker) {
										timePicker = React.cloneElement(timePicker, _extends({
												onChange: this.onSelect,
												allowEmpty: false,
												gregorianCalendarLocale: gregorianCalendarLocale
										}, disabledTimeConfig, {
												getPopupContainer: this.getRootDOMNode,
												value: selectedValue
										}));
								}
								footerEl = React.createElement(
										'div',
										{ className: prefixCls + '-footer' },
										timePicker,
										footerBtn
								);
						}

						return footerEl;
				}
		});

		var CalendarMixin = function () {
				function getNow() {
						var value = new GregorianCalendar();
						value.setTime(Date.now());
						return value;
				}

				function getNowByCurrentStateValue(value) {
						var ret = void 0;
						if (value) {
								ret = value.clone();
								ret.setTime(Date.now());
						} else {
								ret = getNow();
						}
						return ret;
				}

				var CalendarMixin = {
						propTypes: {
								value: PropTypes.object,
								defaultValue: PropTypes.object,
								onKeyDown: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										onKeyDown: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								var value = props.value || props.defaultValue || getNow();
								return {
										value: value,
										selectedValue: props.selectedValue || props.defaultSelectedValue
								};
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var value = nextProps.value;
								var selectedValue = nextProps.selectedValue;

								if ('value' in nextProps) {
										value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
										this.setState({
												value: value
										});
								}
								if ('selectedValue' in nextProps) {
										this.setState({
												selectedValue: selectedValue
										});
								}
						},
						onSelect: function onSelect(value, cause) {
								if (value) {
										this.setValue(value);
								}
								this.setSelectedValue(value, cause);
						},
						renderRoot: function renderRoot(newProps) {
								var _className;

								var props = this.props;
								var prefixCls = props.prefixCls;

								var className = (_className = {}, _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, props.className, !!props.className), _defineProperty(_className, newProps.className, !!newProps.className), _className);

								return React.createElement(
										'div',
										{ className: '' + classnames(className),
												style: this.props.style,
												tabIndex: '0', onKeyDown: this.onKeyDown },
										newProps.children
								);
						},
						setSelectedValue: function setSelectedValue(selectedValue, cause) {
								if (this.isAllowedDate(selectedValue)) {
										if (!('selectedValue' in this.props)) {
												this.setState({
														selectedValue: selectedValue
												});
										}
										this.props.onSelect(selectedValue, cause);
								}
						},
						setValue: function setValue(value) {
								var originalValue = this.state.value;
								if (!('value' in this.props)) {
										this.setState({
												value: value
										});
								}
								if (originalValue && value && originalValue.getTime() !== value.getTime() || !originalValue && value || originalValue && !value) {
										this.props.onChange(value);
								}
						},
						isAllowedDate: function isAllowedDate(value) {
								var disabledDate = this.props.disabledDate;
								var disabledTime = this.props.disabledTime;
								return _isAllowedDate(value, disabledDate, disabledTime);
						}
				};

				return CalendarMixin;
		}();

		var CommonMixin = function () {
				return {
						propTypes: {
								className: PropTypes.string,
								locale: PropTypes.object,
								style: PropTypes.object,
								visible: PropTypes.bool,
								onSelect: PropTypes.func,
								prefixCls: PropTypes.string,
								onChange: PropTypes.func,
								onOk: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										locale: Locale.Calendar,
										style: {},
										visible: true,
										prefixCls: 'rc-calendar',
										className: '',
										onSelect: noop,
										onChange: noop,
										onClear: noop
								};
						},
						shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
								return this.props.visible || nextProps.visible;
						},
						getFormatter: function getFormatter() {
								var formatter = this.props.formatter;
								var locale = this.props.locale;
								if (formatter) {
										if (formatter === this.lastFormatter) {
												return this.normalFormatter;
										}
										this.normalFormatter = _getFormatter(formatter, locale);
										this.lastFormatter = formatter;
										return this.normalFormatter;
								}
								if (!this.showDateFormatter) {
										this.showDateFormatter = _getFormatter('yyyy-MM-dd', locale);
								}
								return this.showDateFormatter;
						}
				};
		}();

		var Calendar = function () {
				function goStartMonth() {
						var next = this.state.value.clone();
						next.setDayOfMonth(1);
						this.setValue(next);
				}

				function goEndMonth() {
						var next = this.state.value.clone();
						next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
						this.setValue(next);
				}

				function goMonth(direction) {
						var next = this.state.value.clone();
						next.addMonth(direction);
						this.setValue(next);
				}

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setValue(next);
				}

				function goWeek(direction) {
						var next = this.state.value.clone();
						next.addWeekOfYear(direction);
						this.setValue(next);
				}

				function goDay(direction) {
						var next = this.state.value.clone();
						next.addDayOfMonth(direction);
						this.setValue(next);
				}

				var Calendar = React.createClass({
						displayName: 'Calendar',

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
								onChange: PropTypes.func
						},

						mixins: [CommonMixin, CalendarMixin],

						getDefaultProps: function getDefaultProps() {
								return {
										showToday: true,
										showDateInput: true,
										timePicker: null,
										onOk: noop
								};
						},
						getInitialState: function getInitialState() {
								// bind methods
								this.nextMonth = goMonth.bind(this, 1);
								this.previousMonth = goMonth.bind(this, -1);
								this.nextYear = goYear.bind(this, 1);
								this.previousYear = goYear.bind(this, -1);
								return {};
						},
						onKeyDown: function onKeyDown(event) {
								if (event.target.nodeName.toLowerCase() === 'input') {
										return undefined;
								}
								var keyCode = event.keyCode;
								// mac
								var ctrlKey = event.ctrlKey || event.metaKey;
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
						onClear: function onClear() {
								this.onSelect(null);
								this.props.onClear();
						},
						onOk: function onOk() {
								var selectedValue = this.state.selectedValue;

								if (this.isAllowedDate(selectedValue)) {
										this.props.onOk(selectedValue);
								}
						},
						onDateInputChange: function onDateInputChange(value) {
								this.onSelect(value, {
										source: 'dateInput'
								});
						},
						onDateTableSelect: function onDateTableSelect(value) {
								this.onSelect(value);
						},
						chooseToday: function chooseToday() {
								var today = this.state.value.clone();
								today.setTime(Date.now());
								this.onSelect(today);
						},
						render: function render() {
								var props = this.props;
								var locale = props.locale;
								var prefixCls = props.prefixCls;
								var disabledDate = props.disabledDate;
								var dateInputPlaceholder = props.dateInputPlaceholder;
								var timePicker = props.timePicker;
								var disabledTime = props.disabledTime;

								var state = this.state;
								var value = state.value;
								var selectedValue = state.selectedValue;

								var dateInputElement = props.showDateInput ? React.createElement(DateInput, { formatter: this.getFormatter(),
										key: 'date-input',
										timePicker: timePicker,
										gregorianCalendarLocale: value.locale,
										locale: locale,
										placeholder: dateInputPlaceholder,
										showClear: true,
										disabledTime: disabledTime,
										disabledDate: disabledDate,
										onClear: this.onClear,
										prefixCls: prefixCls,
										selectedValue: selectedValue,
										onChange: this.onDateInputChange }) : null;
								var children = [dateInputElement, React.createElement(
										'div',
										{ key: 'date-panel',
												className: prefixCls + '-date-panel' },
										React.createElement(CalendarHeader, {
												locale: locale,
												onValueChange: this.setValue,
												value: value,
												prefixCls: prefixCls }),
										React.createElement(
												'div',
												{ className: prefixCls + '-calendar-body' },
												React.createElement(DateTable, {
														locale: locale,
														value: value,
														selectedValue: selectedValue,
														prefixCls: prefixCls,
														dateRender: props.dateRender,
														onSelect: this.onDateTableSelect,
														disabledDate: disabledDate,
														showWeekNumber: props.showWeekNumber })
										),
										React.createElement(CalendarFooter, {
												locale: locale,
												showOk: props.showOk,
												prefixCls: prefixCls,
												showToday: props.showToday,
												disabledTime: disabledTime,
												gregorianCalendarLocale: value.locale,
												showDateInput: props.showDateInput,
												timePicker: timePicker,
												selectedValue: selectedValue,
												value: value,
												disabledDate: disabledDate,
												onOk: this.onOk,
												onSelect: this.onSelect,
												onToday: this.chooseToday
										})
								)];

								return this.renderRoot({
										children: children,
										className: props.showWeekNumber ? prefixCls + '-week-number' : ''
								});
						}
				});

				return Calendar;
		}();

		var FullCalendar = function () {
				var CalendarHeader = function (_Component2) {
						_inherits(CalendarHeader, _Component2);

						function CalendarHeader() {
								_classCallCheck(this, CalendarHeader);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarHeader).apply(this, arguments));
						}

						_createClass(CalendarHeader, [{
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
								key: 'getYearSelectElement',
								value: function getYearSelectElement(year) {
										var _props2 = this.props;
										var yearSelectOffset = _props2.yearSelectOffset;
										var yearSelectTotal = _props2.yearSelectTotal;
										var locale = _props2.locale;
										var prefixCls = _props2.prefixCls;
										var Select = _props2.Select;

										var start = year - yearSelectOffset;
										var end = start + yearSelectTotal;
										var suffix = locale.year === '年' ? '年' : '';

										var options = [];
										for (var index = start; index < end; index++) {
												options.push(React.createElement(
														Select.Option,
														{ key: '' + index },
														index + suffix
												));
										}
										return React.createElement(
												Select,
												{
														className: prefixCls + '-header-year-select',
														onChange: this.onYearChange.bind(this),
														dropdownStyle: { zIndex: 2000 },
														dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', fontSize: 12 },
														optionLabelProp: 'children',
														value: String(year),
														showSearch: false },
												options
										);
								}
						}, {
								key: 'getMonthSelectElement',
								value: function getMonthSelectElement(month) {
										var props = this.props;
										var months = props.locale.format.months;
										var prefixCls = props.prefixCls;

										var options = [];
										var Select = props.Select;

										for (var index = 0; index < 12; index++) {
												options.push(React.createElement(
														Select.Option,
														{ key: '' + index },
														months[index]
												));
										}

										return React.createElement(
												Select,
												{
														className: prefixCls + '-header-month-select',
														dropdownStyle: { zIndex: 2000 },
														dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12 },
														optionLabelProp: 'children',
														value: String(month),
														showSearch: false,
														onChange: this.onMonthChange.bind(this) },
												options
										);
								}
						}, {
								key: 'changeTypeToDate',
								value: function changeTypeToDate() {
										this.props.onTypeChange('date');
								}
						}, {
								key: 'changeTypeToMonth',
								value: function changeTypeToMonth() {
										this.props.onTypeChange('month');
								}
						}, {
								key: 'render',
								value: function render() {
										var _props3 = this.props;
										var value = _props3.value;
										var locale = _props3.locale;
										var prefixCls = _props3.prefixCls;
										var type = _props3.type;
										var showTypeSwitch = _props3.showTypeSwitch;
										var headerComponents = _props3.headerComponents;

										var year = value.getYear();
										var month = value.getMonth();
										var yearSelect = this.getYearSelectElement(year);
										var monthSelect = type === 'month' ? null : this.getMonthSelectElement(month);
										var switchCls = prefixCls + '-header-switcher';
										var typeSwitcher = showTypeSwitch ? React.createElement(
												'span',
												{ className: switchCls },
												type === 'date' ? React.createElement(
														'span',
														{ className: switchCls + '-focus' },
														locale.month
												) : React.createElement(
														'span',
														{ onClick: this.changeTypeToDate.bind(this), className: switchCls + '-normal' },
														locale.month
												),
												type === 'month' ? React.createElement(
														'span',
														{ className: switchCls + '-focus' },
														locale.year
												) : React.createElement(
														'span',
														{ onClick: this.changeTypeToMonth.bind(this), className: switchCls + '-normal' },
														locale.year
												)
										) : null;

										return React.createElement(
												'div',
												{ className: prefixCls + '-header' },
												typeSwitcher,
												monthSelect,
												yearSelect,
												headerComponents
										);
								}
						}]);

						return CalendarHeader;
				}(Component);

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
						headerComponents: PropTypes.array
				};
				CalendarHeader.defaultProps = {
						yearSelectOffset: 10,
						yearSelectTotal: 20,
						onValueChange: noop,
						onTypeChange: noop
				};

				var FullCalendar = React.createClass({
						displayName: 'FullCalendar',

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
								showHeader: PropTypes.bool
						},
						mixins: [CommonMixin, CalendarMixin],
						getDefaultProps: function getDefaultProps() {
								return {
										defaultType: 'date',
										fullscreen: false,
										showTypeSwitch: true,
										showHeader: true,
										onTypeChange: function onTypeChange() {}
								};
						},
						getInitialState: function getInitialState() {
								var type = void 0;
								if ('type' in this.props) {
										type = this.props.type;
								} else {
										type = this.props.defaultType;
								}
								return { type: type };
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								if ('type' in nextProps) {
										this.setState({
												type: nextProps.type
										});
								}
						},
						onMonthSelect: function onMonthSelect(value) {
								this.onSelect(value, { target: 'month' });
						},
						setType: function setType(type) {
								if (!('type' in this.props)) {
										this.setState({ type: type });
								}
								this.props.onTypeChange(type);
						},
						render: function render() {
								var props = this.props;
								var locale = props.locale;
								var prefixCls = props.prefixCls;
								var fullscreen = props.fullscreen;
								var showHeader = props.showHeader;
								var headerComponent = props.headerComponent;
								var headerRender = props.headerRender;
								var _state2 = this.state;
								var value = _state2.value;
								var type = _state2.type;


								var header = null;
								if (showHeader) {
										if (headerRender) {
												header = headerRender(value, type, locale);
										} else {
												var TheHeader = headerComponent || CalendarHeader;
												header = React.createElement(TheHeader, _extends({ key: 'calendar-header'
												}, props, {
														prefixCls: prefixCls + '-full',
														type: type,
														value: value,
														onTypeChange: this.setType,
														onValueChange: this.setValue }));
										}
								}

								var table = type === 'date' ? React.createElement(DateTable, {
										dateRender: props.dateCellRender,
										locale: locale,
										prefixCls: prefixCls,
										onSelect: this.onSelect,
										value: value }) : React.createElement(MonthTable, {
										cellRender: props.monthCellRender,
										locale: locale,
										onSelect: this.onMonthSelect,
										prefixCls: prefixCls + '-month-panel',
										value: value });

								var children = [header, React.createElement(
										'div',
										{ key: 'calendar-body', className: prefixCls + '-calendar-body' },
										table
								)];

								var className = [prefixCls + '-full'];

								if (fullscreen) {
										className.push(prefixCls + '-fullscreen');
								}

								return this.renderRoot({ children: children, className: className.join(' ') });
						}
				});

				return FullCalendar;
		}();

		var MonthCalendar = function () {
				var MonthCalendar = React.createClass({
						displayName: 'MonthCalendar',

						mixins: [CommonMixin, CalendarMixin],

						onKeyDown: function onKeyDown(event) {
								var keyCode = event.keyCode;
								var ctrlKey = event.ctrlKey || event.metaKey;
								var stateValue = this.state.value;
								var value = stateValue;
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
						render: function render() {
								var props = this.props;
								var children = React.createElement(MonthPanel, { locale: props.locale,
										disabledDate: props.disabledDate,
										style: { position: 'relative' },
										value: this.state.value,
										rootPrefixCls: props.prefixCls,
										onChange: this.setValue,
										onSelect: this.onSelect });
								return this.renderRoot({
										children: children
								});
						}
				});
		}();

		var RangeCalendar = function () {
				var CalendarPart = React.createClass({
						displayName: 'CalendarPart',
						render: function render() {
								var props = this.props;
								var value = props.value;
								var direction = props.direction;
								var prefixCls = props.prefixCls;
								var locale = props.locale;
								var selectedValue = props.selectedValue;
								var formatter = props.formatter;
								var placeholder = props.placeholder;
								var disabledDate = props.disabledDate;
								var timePicker = props.timePicker;
								var disabledTime = props.disabledTime;

								var rangeClassName = prefixCls + '-range';
								var newProps = { locale: locale, value: value, prefixCls: prefixCls };
								var index = direction === 'left' ? 0 : 1;
								return React.createElement(
										'div',
										{ className: rangeClassName + '-part ' + rangeClassName + '-' + direction },
										React.createElement(DateInput, { formatter: formatter,
												locale: locale,
												prefixCls: prefixCls,
												timePicker: timePicker,
												disabledDate: disabledDate,
												placeholder: placeholder,
												disabledTime: disabledTime,
												gregorianCalendarLocale: value.locale,
												showClear: false,
												selectedValue: selectedValue[index],
												onChange: props.onInputSelect }),
										React.createElement(
												'div',
												{ style: { outline: 'none' } },
												React.createElement(CalendarHeader, _extends({}, newProps, {
														enableNext: direction === 'right',
														enablePrev: direction === 'left',
														onValueChange: props.onValueChange })),
												React.createElement(
														'div',
														{ className: prefixCls + '-calendar-body' },
														React.createElement(DateTable, _extends({}, newProps, {
																selectedValue: selectedValue,
																dateRender: props.dateRender,
																onSelect: props.onSelect,
																onDayHover: props.onDayHover,
																disabledDate: disabledDate,
																showWeekNumber: props.showWeekNumber }))
												),
												React.createElement(CalendarFooter, _extends({}, newProps, {
														disabledDate: props.disabledDate,
														timeDisabled: !selectedValue[index] || !!selectedValue.hovering,
														onToday: this.chooseToday
												}))
										)
								);
						}
				});

				function getNow() {
						var selectedValue = new GregorianCalendar();
						selectedValue.setTime(Date.now());
						return selectedValue;
				}

				function onValueChange(direction, current) {
						var value = void 0;
						value = current;
						if (direction === 'right') {
								value.addMonth(-1);
						}
						this.fireValueChange(value);
				}

				function normalizeAnchor(props, init) {
						var selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
						var value = props.value;
						if (Array.isArray(value)) {
								value = value[0];
						}
						var defaultValue = props.defaultValue;
						if (Array.isArray(defaultValue)) {
								defaultValue = defaultValue[0];
						}
						return value || init && defaultValue || selectedValue[0] || init && getNow();
				}

				function onInputSelect(direction, value) {
						if (!value) {
								return;
						}
						var originalValue = this.state.selectedValue;
						var selectedValue = originalValue.concat();
						var index = direction === 'left' ? 0 : 1;
						selectedValue[index] = value;
						if (selectedValue[0] && selectedValue[1]) {
								if (this.compare(selectedValue[0], selectedValue[1]) > 0) {
										selectedValue[1 - index] = undefined;
								}
						}
						this.fireSelectValueChange(selectedValue);
				}

				var RangeCalendar = React.createClass({
						displayName: 'RangeCalendar',

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
								onClear: PropTypes.func
						},

						mixins: [CommonMixin],

						getDefaultProps: function getDefaultProps() {
								return {
										defaultSelectedValue: [],
										onValueChange: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								var selectedValue = props.selectedValue || props.defaultSelectedValue;
								var value = normalizeAnchor(props, 1);
								return { selectedValue: selectedValue, value: value };
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var newState = {};
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
						onSelect: function onSelect(value) {
								var originalValue = this.state.selectedValue;
								var selectedValue = originalValue.concat();
								var changed = false;
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
						onDayHover: function onDayHover(hoverValue) {
								var selectedValue = this.state.selectedValue;
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
						onToday: function onToday() {
								this.setState({
										value: getTodayTime(this.state.value)
								});
						},
						onOk: function onOk() {
								this.props.onOk(this.state.selectedValue);
						},
						getStartValue: function getStartValue() {
								var value = this.state.value;
								var selectedValue = this.state.selectedValue;
								// keep selectedTime when select date
								if (selectedValue[0] && this.props.timePicker) {
										value = value.clone();
										syncTime(selectedValue[0], value);
								}
								return value;
						},
						getEndValue: function getEndValue() {
								var endValue = this.state.value.clone();
								endValue.addMonth(1);
								var selectedValue = this.state.selectedValue;
								// keep selectedTime when select date
								if (selectedValue[1] && this.props.timePicker) {
										syncTime(selectedValue[1], endValue);
								}
								return endValue;
						},
						compare: function compare(v1, v2) {
								if (this.props.timePicker) {
										return v1.getTime() - v2.getTime();
								}
								return v1.compareToDay(v2);
						},
						fireSelectValueChange: function fireSelectValueChange(selectedValue, direct) {
								if (!('selectedValue' in this.props)) {
										this.setState({ selectedValue: selectedValue });
								}
								this.props.onChange(selectedValue);
								if (direct || selectedValue[0] && selectedValue[1] && !selectedValue.hovering) {
										this.props.onSelect(selectedValue);
								}
						},
						fireValueChange: function fireValueChange(value) {
								var props = this.props;
								if (!('value' in props)) {
										this.setState({ value: value });
								}
								props.onValueChange(value);
						},
						clear: function clear() {
								this.fireSelectValueChange([], true);
								this.props.onClear();
						},
						render: function render() {
								var _className2;

								var props = this.props;
								var state = this.state;
								var prefixCls = props.prefixCls;
								var dateInputPlaceholder = props.dateInputPlaceholder;

								var className = (_className2 = {}, _defineProperty(_className2, props.className, !!props.className), _defineProperty(_className2, prefixCls, 1), _defineProperty(_className2, prefixCls + '-hidden', !props.visible), _defineProperty(_className2, prefixCls + '-range', 1), _defineProperty(_className2, prefixCls + '-week-number', props.showWeekNumber), _className2);
								var classes = classnames(className);
								var newProps = {
										selectedValue: state.selectedValue,
										onSelect: this.onSelect,
										onDayHover: this.onDayHover
								};

								var placeholder1 = void 0;
								var placeholder2 = void 0;

								if (dateInputPlaceholder) {
										if (Array.isArray(dateInputPlaceholder)) {
												var _dateInputPlaceholder = _slicedToArray(dateInputPlaceholder, 2);

												placeholder1 = _dateInputPlaceholder[0];
												placeholder2 = _dateInputPlaceholder[1];
										} else {
												placeholder1 = placeholder2 = dateInputPlaceholder;
										}
								}
								return React.createElement(
										'div',
										{ className: classes, style: props.style,
												tabIndex: '0' },
										React.createElement('a', { className: prefixCls + '-clear-btn', role: 'button', title: '清除', onClick: this.clear }),
										React.createElement(CalendarPart, _extends({}, props, newProps, { direction: 'left',
												formatter: this.getFormatter(),
												value: this.getStartValue(),
												placeholder: placeholder1,
												onInputSelect: onInputSelect.bind(this, 'left'),
												onValueChange: onValueChange.bind(this, 'left') })),
										React.createElement(
												'span',
												{ className: prefixCls + '-range-middle' },
												'~'
										),
										React.createElement(CalendarPart, _extends({}, props, newProps, { direction: 'right',
												formatter: this.getFormatter(),
												placeholder: placeholder2,
												value: this.getEndValue(),
												onInputSelect: onInputSelect.bind(this, 'right'),
												onValueChange: onValueChange.bind(this, 'right') })),
										React.createElement(
												'div',
												{ className: prefixCls + '-range-bottom' },
												React.createElement(TodayButton, _extends({}, props, { value: state.value,
														onToday: this.onToday })),
												React.createElement(OkButton, _extends({}, props, { value: state.value,
														onOk: this.onOk,
														okDisabled: state.selectedValue.length !== 2 || state.selectedValue.hovering
												}))
										)
								);
						}
				});

				return RangeCalendar;
		}();

		var Picker = function () {
				var autoAdjustOverflow = {
						adjustX: 1,
						adjustY: 1
				};

				var targetOffset = [0, 0];

				var placements = {
						bottomLeft: {
								points: ['tl', 'tl'],
								overflow: autoAdjustOverflow,
								offset: [0, -3],
								targetOffset: targetOffset
						},
						bottomRight: {
								points: ['tr', 'tr'],
								overflow: autoAdjustOverflow,
								offset: [0, -3],
								targetOffset: targetOffset
						},
						topRight: {
								points: ['br', 'br'],
								overflow: autoAdjustOverflow,
								offset: [0, 3],
								targetOffset: targetOffset
						},
						topLeft: {
								points: ['bl', 'bl'],
								overflow: autoAdjustOverflow,
								offset: [0, 3],
								targetOffset: targetOffset
						}
				};

				function refFn(field, component) {
						this[field] = component;
				}

				var Picker = React.createClass({
						displayName: 'Picker',

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
								value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
								defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
								align: PropTypes.object
						},

						getDefaultProps: function getDefaultProps() {
								return {
										prefixCls: 'rc-calendar-picker',
										style: {},
										align: {},
										placement: 'bottomLeft',
										defaultOpen: false,
										onChange: noop,
										onOpen: noop,
										onClose: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								var open = void 0;
								if ('open' in props) {
										open = props.open;
								} else {
										open = props.defaultOpen;
								}
								var value = props.value || props.defaultValue;
								this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
								return { open: open, value: value };
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var value = nextProps.value;
								var open = nextProps.open;

								if ('value' in nextProps) {
										this.setState({ value: value });
								}
								if (open !== undefined) {
										this.setState({ open: open });
								}
						},
						onCalendarKeyDown: function onCalendarKeyDown(event) {
								if (event.keyCode === KeyCode.ESC) {
										event.stopPropagation();
										this.close(this.focus);
								}
						},
						onCalendarSelect: function onCalendarSelect(value) {
								var cause = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

								var props = this.props;
								if (!('value' in props)) {
										this.setState({
												value: value
										});
								}
								if (!props.calendar.props.timePicker && cause.source !== 'dateInput') {
										this.close(this.focus);
								}
								props.onChange(value);
						},
						onCalendarOk: function onCalendarOk() {
								this.close(this.focus);
						},
						onCalendarClear: function onCalendarClear() {
								this.close(this.focus);
						},
						onVisibleChange: function onVisibleChange(open) {
								var _this10 = this;

								this.setOpen(open, function () {
										if (open) {
												ReactDOM.findDOMNode(_this10.calendarInstance).focus();
										}
								});
						},
						getCalendarElement: function getCalendarElement() {
								var props = this.props;
								var state = this.state;
								var calendarProp = props.calendar;
								var value = state.value;

								var defaultValue = void 0;
								// RangeCalendar
								if (Array.isArray(value)) {
										defaultValue = value[0];
								} else {
										defaultValue = value;
								}
								var extraProps = {
										ref: this.saveCalendarRef,
										defaultValue: defaultValue || calendarProp.props.defaultValue,
										defaultSelectedValue: value,
										onKeyDown: this.onCalendarKeyDown,
										onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
										onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
										onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear)
								};

								return React.cloneElement(calendarProp, extraProps);
						},
						setOpen: function setOpen(open, callback) {
								var _props4 = this.props;
								var onOpen = _props4.onOpen;
								var onClose = _props4.onClose;

								if (this.state.open !== open) {
										this.setState({
												open: open
										}, callback);
										var event = {
												open: open
										};
										if (open) {
												onOpen(event);
										} else {
												onClose(event);
										}
								}
						},
						open: function open(callback) {
								this.setOpen(true, callback);
						},
						close: function close(callback) {
								this.setOpen(false, callback);
						},
						focus: function focus() {
								if (!this.state.open) {
										ReactDOM.findDOMNode(this).focus();
								}
						},
						render: function render() {
								var props = this.props;
								var prefixCls = props.prefixCls;
								var placement = props.placement;
								var style = props.style;
								var getCalendarContainer = props.getCalendarContainer;
								var align = props.align;
								var animation = props.animation;
								var disabled = props.disabled;
								var transitionName = props.transitionName;
								var children = props.children;

								var state = this.state;
								return React.createElement(
										Trigger,
										{ popup: this.getCalendarElement(),
												popupAlign: align,
												builtinPlacements: placements,
												popupPlacement: placement,
												action: disabled ? [] : ['click'],
												destroyPopupOnHide: true,
												getPopupContainer: getCalendarContainer,
												popupStyle: style,
												popupAnimation: animation,
												popupTransitionName: transitionName,
												popupVisible: state.open,
												onPopupVisibleChange: this.onVisibleChange,
												prefixCls: prefixCls },
										children(state, props)
								);
						}
				});

				return Picker;
		}();

		RC.Calendar = Calendar;
		RC.FullCalendar = FullCalendar;
		RC.MonthCalendar = MonthCalendar;
		RC.RangeCalendar = RangeCalendar;
		RC.DatePicker = Picker;
}(Smart.RC);