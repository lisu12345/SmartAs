'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Locale = RC.Locale;
	var Trigger = RC.Trigger;
	var DateTimeFormat = RC.DateTimeFormat;
	var GregorianCalendar = RC.GregorianCalendar;
	var classnames = RC.classnames;
	var _React = React;
	var PropTypes = _React.PropTypes;


	function _getFormatter(format, locale) {
		if (typeof format === 'string') {
			return new DateTimeFormat(format, locale.format);
		}
		return format;
	}

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

	function createSelection(field, start, end) {
		if (field.createTextRange) {
			var selRange = field.createTextRange();
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
	var CommonMixin = {
		propTypes: {
			prefixCls: PropTypes.string,
			locale: PropTypes.object
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-time-picker',
				locale: Locale.TimePicker
			};
		}
	};

	var scrollTo = function scrollTo(element, to, duration) {
		var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
			return setTimeout(arguments[0], 10);
		};
		// jump to target if duration zero
		if (duration <= 0) {
			element.scrollTop = to;
			return;
		}
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;

		requestAnimationFrame(function () {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop === to) return;
			scrollTo(element, to, duration - 10);
		});
	};

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			prefixCls: PropTypes.string,
			options: PropTypes.array,
			gregorianCalendarLocale: PropTypes.object,
			selectedIndex: PropTypes.number,
			type: PropTypes.string,
			onSelect: PropTypes.func,
			onMouseEnter: PropTypes.func
		},

		componentDidMount: function componentDidMount() {
			// jump to selected option
			this.scrollToSelected(0);
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			// smooth scroll to selected option
			if (prevProps.selectedIndex !== this.props.selectedIndex) {
				this.scrollToSelected(120);
			}
		},
		onSelect: function onSelect(value) {
			var _props = this.props;
			var onSelect = _props.onSelect;
			var type = _props.type;

			onSelect(type, value);
		},
		getOptions: function getOptions() {
			var _this = this;

			var _props2 = this.props;
			var options = _props2.options;
			var selectedIndex = _props2.selectedIndex;
			var prefixCls = _props2.prefixCls;

			return options.map(function (item, index) {
				var _classnames;

				var cls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-select-option-selected', selectedIndex === index), _defineProperty(_classnames, prefixCls + '-select-option-disabled', item.disabled), _classnames));
				var onclick = null;
				if (!item.disabled) {
					onclick = _this.onSelect.bind(_this, +item.value);
				}
				return React.createElement(
					'li',
					{ className: cls, key: index, onClick: onclick, disabled: item.disabled },
					item.value
				);
			});
		},
		scrollToSelected: function scrollToSelected(duration) {
			// move to selected item
			var select = ReactDOM.findDOMNode(this);
			var list = ReactDOM.findDOMNode(this.refs.list);
			var index = this.props.selectedIndex;
			if (index < 0) {
				index = 0;
			}
			var topOption = list.children[index];
			var to = topOption.offsetTop;
			scrollTo(select, to, duration);
		},
		render: function render() {
			if (this.props.options.length === 0) {
				return null;
			}

			var prefixCls = this.props.prefixCls;


			return React.createElement(
				'div',
				{ className: prefixCls + '-select',
					onMouseEnter: this.props.onMouseEnter },
				React.createElement(
					'ul',
					{ ref: 'list' },
					this.getOptions()
				)
			);
		}
	});

	var Header = React.createClass({
		displayName: 'Header',

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
			currentSelectPanel: PropTypes.string
		},

		getInitialState: function getInitialState() {
			var value = this.props.value;
			return {
				str: value && this.props.formatter.format(value) || '',
				invalid: false
			};
		},
		componentDidMount: function componentDidMount() {
			this.timer = setTimeout(this.selectRange, 0);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var value = nextProps.value;
			this.setState({
				str: value && nextProps.formatter.format(value) || '',
				invalid: false
			});
		},
		componentDidUpdate: function componentDidUpdate() {
			this.timer = setTimeout(this.selectRange, 0);
		},
		componentWillUnmount: function componentWillUnmount() {
			clearTimeout(this.timer);
		},
		onInputChange: function onInputChange(event) {
			var str = event.target.value;
			this.setState({
				str: str
			});
			var value = null;
			var _props3 = this.props;
			var formatter = _props3.formatter;
			var gregorianCalendarLocale = _props3.gregorianCalendarLocale;
			var hourOptions = _props3.hourOptions;
			var minuteOptions = _props3.minuteOptions;
			var secondOptions = _props3.secondOptions;
			var disabledHours = _props3.disabledHours;
			var disabledMinutes = _props3.disabledMinutes;
			var disabledSeconds = _props3.disabledSeconds;
			var onChange = _props3.onChange;
			var allowEmpty = _props3.allowEmpty;


			if (str) {
				var originalValue = this.props.value;
				try {
					value = formatter.parse(str, {
						locale: gregorianCalendarLocale,
						obeyCount: true
					});
				} catch (ex) {
					this.setState({
						invalid: true
					});
					return;
				}

				if (value) {
					// if time value not allowed, response warning.
					if (hourOptions.indexOf(value.getHourOfDay()) < 0 || minuteOptions.indexOf(value.getMinutes()) < 0 || secondOptions.indexOf(value.getSeconds()) < 0) {
						this.setState({
							invalid: true
						});
						return;
					}

					// if time value is disabled, response warning.
					var disabledHourOptions = disabledHours();
					var disabledMinuteOptions = disabledMinutes(value.getHourOfDay());
					var disabledSecondOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());
					if (disabledHourOptions && disabledHourOptions.indexOf(value.getHourOfDay()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(value.getMinutes()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(value.getSeconds()) >= 0) {
						this.setState({
							invalid: true
						});
						return;
					}

					if (originalValue && value) {
						if (originalValue.getHourOfDay() !== value.getHourOfDay() || originalValue.getMinutes() !== value.getMinutes() || originalValue.getSeconds() !== value.getSeconds()) {
							// keep other fields for rc-calendar
							var changedValue = originalValue.clone();
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
						invalid: true
					});
					return;
				}
			} else if (allowEmpty) {
				onChange(null);
			} else {
				this.setState({
					invalid: true
				});
				return;
			}

			this.setState({
				invalid: false
			});
		},
		onKeyDown: function onKeyDown(e) {
			if (e.keyCode === 27) {
				this.props.onEsc();
			}
		},
		onClear: function onClear() {
			this.setState({ str: '' });
			this.props.onClear();
		},
		getClearButton: function getClearButton() {
			var _props4 = this.props;
			var locale = _props4.locale;
			var prefixCls = _props4.prefixCls;
			var allowEmpty = _props4.allowEmpty;

			if (!allowEmpty) {
				return null;
			}
			return React.createElement('a', { className: prefixCls + '-clear-btn', role: 'button', title: locale.clear, onMouseDown: this.onClear });
		},
		getInput: function getInput() {
			var _props5 = this.props;
			var prefixCls = _props5.prefixCls;
			var placeholder = _props5.placeholder;
			var _state = this.state;
			var invalid = _state.invalid;
			var str = _state.str;

			var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
			return React.createElement('input', { className: prefixCls + '-input  ' + invalidClass,
				ref: 'input',
				onKeyDown: this.onKeyDown,
				value: str,
				placeholder: placeholder, onChange: this.onInputChange });
		},
		selectRange: function selectRange() {
			this.refs.input.focus();
			if (this.props.currentSelectPanel && this.refs.input.value) {
				var selectionRangeStart = 0;
				var selectionRangeEnd = 0;
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
		render: function render() {
			var prefixCls = this.props.prefixCls;

			return React.createElement(
				'div',
				{ className: prefixCls + '-input-wrap' },
				this.getInput(),
				this.getClearButton()
			);
		}
	});

	var formatOption = function formatOption(option, disabledOptions) {
		var value = '' + option;
		if (option < 10) {
			value = '0' + option;
		}

		var disabled = false;
		if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
			disabled = true;
		}

		return {
			value: value,
			disabled: disabled
		};
	};

	var Combobox = React.createClass({
		displayName: 'Combobox',

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
			onCurrentSelectPanelChange: PropTypes.func
		},

		onItemChange: function onItemChange(type, itemValue) {
			var onChange = this.props.onChange;

			var value = this.props.value;
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
		onEnterSelectPanel: function onEnterSelectPanel(range) {
			this.props.onCurrentSelectPanelChange(range);
		},
		getHourSelect: function getHourSelect(hour) {
			var _props6 = this.props;
			var prefixCls = _props6.prefixCls;
			var hourOptions = _props6.hourOptions;
			var disabledHours = _props6.disabledHours;
			var showHour = _props6.showHour;

			if (!showHour) {
				return null;
			}
			var disabledOptions = disabledHours();

			return React.createElement(Select, {
				prefixCls: prefixCls,
				options: hourOptions.map(function (option) {
					return formatOption(option, disabledOptions);
				}),
				selectedIndex: hourOptions.indexOf(hour),
				type: 'hour',
				onSelect: this.onItemChange,
				onMouseEnter: this.onEnterSelectPanel.bind(this, 'hour')
			});
		},
		getMinuteSelect: function getMinuteSelect(minute) {
			var _props7 = this.props;
			var prefixCls = _props7.prefixCls;
			var minuteOptions = _props7.minuteOptions;
			var disabledMinutes = _props7.disabledMinutes;

			var value = this.props.value || this.getNow();
			var disabledOptions = disabledMinutes(value.getHourOfDay());

			return React.createElement(Select, {
				prefixCls: prefixCls,
				options: minuteOptions.map(function (option) {
					return formatOption(option, disabledOptions);
				}),
				selectedIndex: minuteOptions.indexOf(minute),
				type: 'minute',
				onSelect: this.onItemChange,
				onMouseEnter: this.onEnterSelectPanel.bind(this, 'minute')
			});
		},
		getSecondSelect: function getSecondSelect(second) {
			var _props8 = this.props;
			var prefixCls = _props8.prefixCls;
			var secondOptions = _props8.secondOptions;
			var disabledSeconds = _props8.disabledSeconds;
			var showSecond = _props8.showSecond;

			if (!showSecond) {
				return null;
			}
			var value = this.props.value || this.getNow();
			var disabledOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());

			return React.createElement(Select, {
				prefixCls: prefixCls,
				options: secondOptions.map(function (option) {
					return formatOption(option, disabledOptions);
				}),
				selectedIndex: secondOptions.indexOf(second),
				type: 'second',
				onSelect: this.onItemChange,
				onMouseEnter: this.onEnterSelectPanel.bind(this, 'second')
			});
		},
		getNow: function getNow() {
			if (this.showNow) {
				return this.showNow;
			}
			var value = new GregorianCalendar(this.props.gregorianCalendarLocale);
			value.setTime(Date.now());
			this.showNow = value;
			return value;
		},
		render: function render() {
			var prefixCls = this.props.prefixCls;

			var value = this.props.value || this.getNow();
			return React.createElement(
				'div',
				{ className: prefixCls + '-combobox' },
				this.getHourSelect(value.getHourOfDay()),
				this.getMinuteSelect(value.getMinutes()),
				this.getSecondSelect(value.getSeconds())
			);
		}
	});

	function generateOptions(length, disabledOptions, hideDisabledOptions) {
		var arr = [];
		for (var value = 0; value < length; value++) {
			if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
				arr.push(value);
			}
		}
		return arr;
	}

	var Panel = React.createClass({
		displayName: 'Panel',

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
			onClear: PropTypes.func
		},

		mixins: [CommonMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				onChange: noop,
				onClear: noop
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value,
				selectionRange: []
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var value = nextProps.value;
			if (value) {
				this.setState({
					value: value
				});
			}
		},
		onChange: function onChange(newValue) {
			this.setState({ value: newValue });
			this.props.onChange(newValue);
		},
		onClear: function onClear() {
			this.props.onClear();
		},
		onCurrentSelectPanelChange: function onCurrentSelectPanelChange(currentSelectPanel) {
			this.setState({ currentSelectPanel: currentSelectPanel });
		},
		render: function render() {
			var _props9 = this.props;
			var locale = _props9.locale;
			var prefixCls = _props9.prefixCls;
			var placeholder = _props9.placeholder;
			var disabledHours = _props9.disabledHours;
			var disabledMinutes = _props9.disabledMinutes;
			var disabledSeconds = _props9.disabledSeconds;
			var hideDisabledOptions = _props9.hideDisabledOptions;
			var allowEmpty = _props9.allowEmpty;
			var showHour = _props9.showHour;
			var showSecond = _props9.showSecond;
			var formatter = _props9.formatter;
			var gregorianCalendarLocale = _props9.gregorianCalendarLocale;

			var value = this.state.value;
			var disabledHourOptions = disabledHours();
			var disabledMinuteOptions = disabledMinutes(value ? value.getHourOfDay() : null);
			var disabledSecondOptions = disabledSeconds(value ? value.getHourOfDay() : null, value ? value.getMinutes() : null);
			var hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
			var minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
			var secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);

			return React.createElement(
				'div',
				{ className: prefixCls + '-inner' },
				React.createElement(Header, {
					prefixCls: prefixCls,
					gregorianCalendarLocale: gregorianCalendarLocale,
					locale: locale,
					value: value,
					currentSelectPanel: this.state.currentSelectPanel,
					onEsc: this.props.onEsc,
					formatter: formatter,
					placeholder: placeholder,
					hourOptions: hourOptions,
					minuteOptions: minuteOptions,
					secondOptions: secondOptions,
					disabledHours: disabledHours,
					disabledMinutes: disabledMinutes,
					disabledSeconds: disabledSeconds,
					onChange: this.onChange,
					onClear: this.onClear,
					allowEmpty: allowEmpty
				}),
				React.createElement(Combobox, {
					prefixCls: prefixCls,
					value: value,
					gregorianCalendarLocale: gregorianCalendarLocale,
					formatter: formatter,
					onChange: this.onChange,
					showHour: showHour,
					showSecond: showSecond,
					hourOptions: hourOptions,
					minuteOptions: minuteOptions,
					secondOptions: secondOptions,
					disabledHours: disabledHours,
					disabledMinutes: disabledMinutes,
					disabledSeconds: disabledSeconds,
					onCurrentSelectPanelChange: this.onCurrentSelectPanelChange
				})
			);
		}
	});

	function refFn(field, component) {
		this[field] = component;
	}

	var Picker = React.createClass({
		displayName: 'Picker',

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
			onClose: PropTypes.func
		},

		mixins: [CommonMixin],

		getDefaultProps: function getDefaultProps() {
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
				onClose: noop
			};
		},
		getInitialState: function getInitialState() {
			this.savePanelRef = refFn.bind(this, 'panelInstance');
			var _props10 = this.props;
			var defaultOpen = _props10.defaultOpen;
			var defaultValue = _props10.defaultValue;
			var _props10$open = _props10.open;
			var open = _props10$open === undefined ? defaultOpen : _props10$open;
			var _props10$value = _props10.value;
			var value = _props10$value === undefined ? defaultValue : _props10$value;

			return {
				open: open,
				value: value
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var value = nextProps.value;
			var open = nextProps.open;

			if ('value' in nextProps) {
				this.setState({
					value: value
				});
			}
			if (open !== undefined) {
				this.setState({ open: open });
			}
		},
		onPanelChange: function onPanelChange(value) {
			this.setValue(value);
		},
		onPanelClear: function onPanelClear() {
			this.setValue(null);
			this.setOpen(false);
		},
		onVisibleChange: function onVisibleChange(open) {
			this.setOpen(open);
		},
		onEsc: function onEsc() {
			this.setOpen(false);
			this.refs.picker.focus();
		},
		onKeyDown: function onKeyDown(e) {
			if (e.keyCode === 40) {
				this.setOpen(true);
			}
		},
		setValue: function setValue(value) {
			if (!('value' in this.props)) {
				this.setState({
					value: value
				});
			}
			this.props.onChange(value);
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
			if (!this.props.showSecond) {
				if (!this.notShowSecondFormatter) {
					this.notShowSecondFormatter = _getFormatter('HH:mm', locale);
				}
				return this.notShowSecondFormatter;
			}
			if (!this.props.showHour) {
				if (!this.notShowHourFormatter) {
					this.notShowHourFormatter = _getFormatter('mm:ss', locale);
				}
				return this.notShowHourFormatter;
			}
			if (!this.normalFormatter) {
				this.normalFormatter = _getFormatter('HH:mm:ss', locale);
			}
			return this.normalFormatter;
		},
		getPanelElement: function getPanelElement() {
			var _props11 = this.props;
			var prefixCls = _props11.prefixCls;
			var defaultValue = _props11.defaultValue;
			var locale = _props11.locale;
			var placeholder = _props11.placeholder;
			var disabledHours = _props11.disabledHours;
			var disabledMinutes = _props11.disabledMinutes;
			var disabledSeconds = _props11.disabledSeconds;
			var hideDisabledOptions = _props11.hideDisabledOptions;
			var allowEmpty = _props11.allowEmpty;
			var showHour = _props11.showHour;
			var showSecond = _props11.showSecond;

			return React.createElement(Panel, {
				prefixCls: prefixCls + '-panel',
				ref: this.savePanelRef,
				value: this.state.value,
				onChange: this.onPanelChange,
				gregorianCalendarLocale: locale.calendar,
				onClear: this.onPanelClear,
				defaultValue: defaultValue,
				showHour: showHour,
				onEsc: this.onEsc,
				showSecond: showSecond,
				locale: locale,
				allowEmpty: allowEmpty,
				formatter: this.getFormatter(),
				placeholder: placeholder,
				disabledHours: disabledHours,
				disabledMinutes: disabledMinutes,
				disabledSeconds: disabledSeconds,
				hideDisabledOptions: hideDisabledOptions
			});
		},
		setOpen: function setOpen(open, callback) {
			var _props12 = this.props;
			var onOpen = _props12.onOpen;
			var onClose = _props12.onClose;

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
		render: function render() {
			var _props13 = this.props;
			var prefixCls = _props13.prefixCls;
			var placeholder = _props13.placeholder;
			var placement = _props13.placement;
			var align = _props13.align;
			var disabled = _props13.disabled;
			var transitionName = _props13.transitionName;
			var style = _props13.style;
			var className = _props13.className;
			var showHour = _props13.showHour;
			var showSecond = _props13.showSecond;
			var getPopupContainer = _props13.getPopupContainer;
			var _state2 = this.state;
			var open = _state2.open;
			var value = _state2.value;

			var popupClassName = void 0;
			if (!showHour || !showSecond) {
				popupClassName = prefixCls + '-panel-narrow';
			}
			return React.createElement(
				Trigger,
				{
					prefixCls: prefixCls + '-panel',
					popupClassName: popupClassName,
					popup: this.getPanelElement(),
					popupAlign: align,
					builtinPlacements: placements,
					popupPlacement: placement,
					action: disabled ? [] : ['click'],
					destroyPopupOnHide: true,
					getPopupContainer: getPopupContainer,
					popupTransitionName: transitionName,
					popupVisible: open,
					onPopupVisibleChange: this.onVisibleChange
				},
				React.createElement(
					'span',
					{ className: prefixCls + ' ' + className, style: style },
					React.createElement('input', { className: prefixCls + '-input',
						ref: 'picker', type: 'text', placeholder: placeholder,
						readOnly: true,
						onKeyDown: this.onKeyDown,
						disabled: disabled, value: value && this.getFormatter().format(value) }),
					React.createElement('span', { className: prefixCls + '-icon' })
				)
			);
		}
	});

	RC.TimePicker = Picker;
}(Smart.RC);