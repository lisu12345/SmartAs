"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

//v0.12.12 - 2016.3.21
+(function (Namespace) {
	var logger = Log.getLogger("Smart.UI");
	var UI = Namespace.register("Smart.UI");

	// matchMedia polyfill for
	// https://github.com/WickyNilliams/enquire.js/issues/82
	if (typeof window !== 'undefined') {
		var matchMediaPolyfill = function matchMediaPolyfill() {
			return {
				matches: false,
				addListener: function addListener() {},
				removeListener: function removeListener() {}
			};
		};
		window.matchMedia = window.matchMedia || matchMediaPolyfill;
	}

	var autoAdjustOverflow = {
		adjustX: 1,
		adjustY: 1
	};

	var targetOffset = [0, 0];

	UI.getPlacements = function getPlacements() {
		var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var _config$arrowWidth = config.arrowWidth;
		var arrowWidth = _config$arrowWidth === undefined ? 5 : _config$arrowWidth;
		var _config$horizontalArr = config.horizontalArrowShift;
		var horizontalArrowShift = _config$horizontalArr === undefined ? 16 : _config$horizontalArr;
		var _config$verticalArrow = config.verticalArrowShift;
		var verticalArrowShift = _config$verticalArrow === undefined ? 12 : _config$verticalArrow;

		return {
			left: {
				points: ['cr', 'cl'],
				overflow: autoAdjustOverflow,
				offset: [-4, 0],
				targetOffset: targetOffset
			},
			right: {
				points: ['cl', 'cr'],
				overflow: autoAdjustOverflow,
				offset: [4, 0],
				targetOffset: targetOffset
			},
			top: {
				points: ['bc', 'tc'],
				overflow: autoAdjustOverflow,
				offset: [0, -4],
				targetOffset: targetOffset
			},
			bottom: {
				points: ['tc', 'bc'],
				overflow: autoAdjustOverflow,
				offset: [0, 4],
				targetOffset: targetOffset
			},
			topLeft: {
				points: ['bl', 'tc'],
				overflow: autoAdjustOverflow,
				offset: [-(horizontalArrowShift + arrowWidth), -4],
				targetOffset: targetOffset
			},
			leftTop: {
				points: ['tr', 'cl'],
				overflow: autoAdjustOverflow,
				offset: [-4, -(verticalArrowShift + arrowWidth)],
				targetOffset: targetOffset
			},
			topRight: {
				points: ['br', 'tc'],
				overflow: autoAdjustOverflow,
				offset: [horizontalArrowShift + arrowWidth, -4],
				targetOffset: targetOffset
			},
			rightTop: {
				points: ['tl', 'cr'],
				overflow: autoAdjustOverflow,
				offset: [4, -(verticalArrowShift + arrowWidth)],
				targetOffset: targetOffset
			},
			bottomRight: {
				points: ['tr', 'bc'],
				overflow: autoAdjustOverflow,
				offset: [horizontalArrowShift + arrowWidth, 4],
				targetOffset: targetOffset
			},
			rightBottom: {
				points: ['bl', 'cr'],
				overflow: autoAdjustOverflow,
				offset: [4, verticalArrowShift + arrowWidth],
				targetOffset: targetOffset
			},
			bottomLeft: {
				points: ['tl', 'bc'],
				overflow: autoAdjustOverflow,
				offset: [-(horizontalArrowShift + arrowWidth), 4],
				targetOffset: targetOffset
			},
			leftBottom: {
				points: ['br', 'cl'],
				overflow: autoAdjustOverflow,
				offset: [-4, verticalArrowShift + arrowWidth],
				targetOffset: targetOffset
			}
		};
	};

	var URL_REX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
	UI.forward = function (url, qs) {
		//location.hash = hash;
		var inner = URL_REX.test(url);
		if (qs) {
			if ($.isPlainObject(qs)) {
				qs = $.param(qs);
			}
			url += '?' + qs;
		}
		if (inner) {
			location.href = url;
		} else {
			location.hash = '!' + url;
		}
	};
	UI.url = function (url, qs) {
		if (qs) {
			if ($.isPlainObject(qs)) {
				qs = $.param(qs);
			}
			url += '?' + qs;
		}
		return '#!' + url;
	};

	var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var shortDaysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	var shortMonthsInYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	var longMonthsInYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var shortMonthsToNumber = {
		'Jan': '01',
		'Feb': '02',
		'Mar': '03',
		'Apr': '04',
		'May': '05',
		'Jun': '06',
		'Jul': '07',
		'Aug': '08',
		'Sep': '09',
		'Oct': '10',
		'Nov': '11',
		'Dec': '12'
	};

	var YYYYMMDD_MATCHER = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[Z\-+]?(\d{2}:?\d{2})?/;

	var DateFormat = (function () {
		function numberToLongDay(value) {
			// 0 to Sunday
			// 1 to Monday
			return daysInWeek[parseInt(value, 10)] || value;
		}

		function numberToShortDay(value) {
			// 0 to Sun
			// 1 to Mon
			return shortDaysInWeek[parseInt(value, 10)] || value;
		}

		function numberToShortMonth(value) {
			// 1 to Jan
			// 2 to Feb
			var monthArrayIndex = parseInt(value, 10) - 1;
			return shortMonthsInYear[monthArrayIndex] || value;
		}

		function numberToLongMonth(value) {
			// 1 to January
			// 2 to February
			var monthArrayIndex = parseInt(value, 10) - 1;
			return longMonthsInYear[monthArrayIndex] || value;
		}

		function shortMonthToNumber(value) {
			// Jan to 01
			// Feb to 02
			return shortMonthsToNumber[value] || value;
		}

		function parseTime(value) {
			// 10:54:50.546
			// => hour: 10, minute: 54, second: 50, millis: 546
			// 10:54:50
			// => hour: 10, minute: 54, second: 50, millis: ''
			var time = value,
			    hour,
			    minute,
			    second,
			    millis = '',
			    delimited,
			    timeArray;

			if (time.indexOf('.') !== -1) {
				delimited = time.split('.');
				// split time and milliseconds
				time = delimited[0];
				millis = delimited[delimited.length - 1];
			}

			timeArray = time.split(':');

			if (timeArray.length === 3) {
				hour = timeArray[0];
				minute = timeArray[1];
				// '20 GMT-0200 (BRST)'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
				// => 20
				// '20Z'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
				// => 20
				second = timeArray[2].replace(/\s.+/, '').replace(/[a-z]/gi, '');
				// '01:10:20 GMT-0200 (BRST)'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
				// => 01:10:20
				// '01:10:20Z'.replace(/\s.+/, '').replace(/[a-z]/gi, '');
				// => 01:10:20
				time = time.replace(/\s.+/, '').replace(/[a-z]/gi, '');
				return {
					time: time,
					hour: hour,
					minute: minute,
					second: second,
					millis: millis
				};
			}

			return {
				time: '',
				hour: '',
				minute: '',
				second: '',
				millis: ''
			};
		}

		function padding(value, length) {
			var paddingCount = length - String(value).length;
			for (var i = 0; i < paddingCount; i++) {
				value = '0' + value;
			}
			return value;
		}

		return {

			parseDate: function parseDate(value) {
				var values, subValues;

				var parsedDate = {
					date: null,
					year: null,
					month: null,
					dayOfMonth: null,
					dayOfWeek: null,
					time: null
				};

				if (typeof value == 'number') {
					return this.parseDate(new Date(value));
				} else if (typeof value.getFullYear == 'function') {
					parsedDate.year = String(value.getFullYear());
					// d = new Date(1900, 1, 1) // 1 for Feb instead of Jan.
					// => Thu Feb 01 1900 00:00:00
					parsedDate.month = String(value.getMonth() + 1);
					parsedDate.dayOfMonth = String(value.getDate());
					parsedDate.time = parseTime(value.toTimeString() + '.' + value.getMilliseconds());
				} else if (value.search(YYYYMMDD_MATCHER) != -1) {
					/* 2009-04-19T16:11:05+02:00 || 2009-04-19T16:11:05Z */
					values = value.split(/[T\+-]/);
					parsedDate.year = values[0];
					parsedDate.month = values[1];
					parsedDate.dayOfMonth = values[2];
					parsedDate.time = parseTime(values[3].split('.')[0]);
				} else {
					values = value.split(' ');
					if (values.length === 6 && isNaN(values[5])) {
						// values[5] == year
						/*
       * This change is necessary to make `Mon Apr 28 2014 05:30:00 GMT-0300` work
       * like `case 7`
       * otherwise it will be considered like `Wed Jan 13 10:43:41 CET 2010
       * Fixes: https://github.com/phstc/jquery-dateFormat/issues/64
       */
						values[values.length] = '()';
					}
					switch (values.length) {
						case 6:
							/* Wed Jan 13 10:43:41 CET 2010 */
							parsedDate.year = values[5];
							parsedDate.month = shortMonthToNumber(values[1]);
							parsedDate.dayOfMonth = values[2];
							parsedDate.time = parseTime(values[3]);
							break;
						case 2:
							/* 2009-12-18 10:54:50.546 */
							subValues = values[0].split('-');
							parsedDate.year = subValues[0];
							parsedDate.month = subValues[1];
							parsedDate.dayOfMonth = subValues[2];
							parsedDate.time = parseTime(values[1]);
							break;
						case 7:
						/* Tue Mar 01 2011 12:01:42 GMT-0800 (PST) */
						case 9:
						/* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0800 (China Standard Time) */
						case 10:
							/* added by Larry, for Fri Apr 08 2011 00:00:00 GMT+0200 (W. Europe Daylight Time) */
							parsedDate.year = values[3];
							parsedDate.month = shortMonthToNumber(values[1]);
							parsedDate.dayOfMonth = values[2];
							parsedDate.time = parseTime(values[4]);
							break;
						case 1:
							/* added by Jonny, for 2012-02-07CET00:00:00 (Doctrine Entity -> Json Serializer) */
							subValues = values[0].split('');
							parsedDate.year = subValues[0] + subValues[1] + subValues[2] + subValues[3];
							parsedDate.month = subValues[5] + subValues[6];
							parsedDate.dayOfMonth = subValues[8] + subValues[9];
							parsedDate.time = parseTime(subValues[13] + subValues[14] + subValues[15] + subValues[16] + subValues[17] + subValues[18] + subValues[19] + subValues[20]);
							break;
						default:
							return null;
					}
				}

				if (parsedDate.time) {
					parsedDate.date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth, parsedDate.time.hour, parsedDate.time.minute, parsedDate.time.second, parsedDate.time.millis);
				} else {
					parsedDate.date = new Date(parsedDate.year, parsedDate.month - 1, parsedDate.dayOfMonth);
				}

				parsedDate.dayOfWeek = String(parsedDate.date.getDay());

				return parsedDate;
			},

			format: function format(value, _format) {
				try {
					var parsedDate = this.parseDate(value);

					if (parsedDate === null) {
						return value;
					}

					var year = parsedDate.year,
					    month = parsedDate.month,
					    dayOfMonth = parsedDate.dayOfMonth,
					    dayOfWeek = parsedDate.dayOfWeek,
					    time = parsedDate.time;
					var hour;

					var pattern = '',
					    retValue = '',
					    unparsedRest = '',
					    inQuote = false;

					/* Issue 1 - variable scope issue in format.date (Thanks jakemonO) */
					for (var i = 0; i < _format.length; i++) {
						var currentPattern = _format.charAt(i);
						// Look-Ahead Right (LALR)
						var nextRight = _format.charAt(i + 1);

						if (inQuote) {
							if (currentPattern == "'") {
								retValue += pattern === '' ? "'" : pattern;
								pattern = '';
								inQuote = false;
							} else {
								pattern += currentPattern;
							}
							continue;
						}
						pattern += currentPattern;
						unparsedRest = '';
						switch (pattern) {
							case 'ddd':
								retValue += numberToLongDay(dayOfWeek);
								pattern = '';
								break;
							case 'dd':
								if (nextRight === 'd') {
									break;
								}
								retValue += padding(dayOfMonth, 2);
								pattern = '';
								break;
							case 'd':
								if (nextRight === 'd') {
									break;
								}
								retValue += parseInt(dayOfMonth, 10);
								pattern = '';
								break;
							case 'D':
								if (dayOfMonth == 1 || dayOfMonth == 21 || dayOfMonth == 31) {
									dayOfMonth = parseInt(dayOfMonth, 10) + 'st';
								} else if (dayOfMonth == 2 || dayOfMonth == 22) {
									dayOfMonth = parseInt(dayOfMonth, 10) + 'nd';
								} else if (dayOfMonth == 3 || dayOfMonth == 23) {
									dayOfMonth = parseInt(dayOfMonth, 10) + 'rd';
								} else {
									dayOfMonth = parseInt(dayOfMonth, 10) + 'th';
								}
								retValue += dayOfMonth;
								pattern = '';
								break;
							case 'MMMM':
								retValue += numberToLongMonth(month);
								pattern = '';
								break;
							case 'MMM':
								if (nextRight === 'M') {
									break;
								}
								retValue += numberToShortMonth(month);
								pattern = '';
								break;
							case 'MM':
								if (nextRight === 'M') {
									break;
								}
								retValue += padding(month, 2);
								pattern = '';
								break;
							case 'M':
								if (nextRight === 'M') {
									break;
								}
								retValue += parseInt(month, 10);
								pattern = '';
								break;
							case 'y':
							case 'yyy':
								if (nextRight === 'y') {
									break;
								}
								retValue += pattern;
								pattern = '';
								break;
							case 'yy':
								if (nextRight === 'y') {
									break;
								}
								retValue += String(year).slice(-2);
								pattern = '';
								break;
							case 'yyyy':
								retValue += year;
								pattern = '';
								break;
							case 'HH':
								retValue += padding(time.hour, 2);
								pattern = '';
								break;
							case 'H':
								if (nextRight === 'H') {
									break;
								}
								retValue += parseInt(time.hour, 10);
								pattern = '';
								break;
							case 'hh':
								/* time.hour is '00' as string == is used instead of === */
								hour = parseInt(time.hour, 10) === 0 ? 12 : time.hour < 13 ? time.hour : time.hour - 12;
								retValue += padding(hour, 2);
								pattern = '';
								break;
							case 'h':
								if (nextRight === 'h') {
									break;
								}
								hour = parseInt(time.hour, 10) === 0 ? 12 : time.hour < 13 ? time.hour : time.hour - 12;
								retValue += parseInt(hour, 10);
								// Fixing issue https://github.com/phstc/jquery-dateFormat/issues/21
								// retValue = parseInt(retValue, 10);
								pattern = '';
								break;
							case 'mm':
								retValue += padding(time.minute, 2);
								pattern = '';
								break;
							case 'm':
								if (nextRight === 'm') {
									break;
								}
								retValue += time.minute;
								pattern = '';
								break;
							case 'ss':
								/* ensure only seconds are added to the return string */
								retValue += padding(time.second.substring(0, 2), 2);
								pattern = '';
								break;
							case 's':
								if (nextRight === 's') {
									break;
								}
								retValue += time.second;
								pattern = '';
								break;
							case 'S':
							case 'SS':
								if (nextRight === 'S') {
									break;
								}
								retValue += pattern;
								pattern = '';
								break;
							case 'SSS':
								retValue += padding(time.millis.substring(0, 3), 3);
								pattern = '';
								break;
							case 'a':
								retValue += time.hour >= 12 ? 'PM' : 'AM';
								pattern = '';
								break;
							case 'p':
								retValue += time.hour >= 12 ? 'p.m.' : 'a.m.';
								pattern = '';
								break;
							case 'E':
								retValue += numberToShortDay(dayOfWeek);
								pattern = '';
								break;
							case "'":
								pattern = '';
								inQuote = true;
								break;
							default:
								retValue += currentPattern;
								pattern = '';
								break;
						}
					}
					retValue += unparsedRest;
					return retValue;
				} catch (e) {
					logger.error('format error.', e);
					return value;
				}
			},
			/*
    * JavaScript Pretty Date
    * Copyright (c) 2011 John Resig (ejohn.org)
    * Licensed under the MIT and GPL licenses.
    *
    * Takes an ISO time and returns a string representing how long ago the date
    * represents
    *
    * ('2008-01-28T20:24:17Z') // => '2 hours ago'
    * ('2008-01-27T22:24:17Z') // => 'Yesterday'
    * ('2008-01-26T22:24:17Z') // => '2 days ago'
    * ('2008-01-14T22:24:17Z') // => '2 weeks ago'
    * ('2007-12-15T22:24:17Z') // => 'more than 5 weeks ago'
    *
    */
			prettyDate: function prettyDate(time) {
				var date;
				var diff;
				var abs_diff;
				var day_diff;
				var abs_day_diff;
				var tense;

				if (typeof time === 'string' || typeof time === 'number') {
					date = new Date(time);
				}

				if ((typeof time === "undefined" ? "undefined" : _typeof(time)) === 'object') {
					date = new Date(time.toString());
				}

				diff = (new Date().getTime() - date.getTime()) / 1000;

				abs_diff = Math.abs(diff);
				abs_day_diff = Math.floor(abs_diff / 86400);

				if (isNaN(abs_day_diff)) {
					return;
				}

				tense = diff < 0 ? 'from now' : 'ago';

				if (abs_diff < 60) {
					if (diff >= 0) return 'just now';else return 'in a moment';
				} else if (abs_diff < 120) {
					return '1 minute ' + tense;
				} else if (abs_diff < 3600) {
					return Math.floor(abs_diff / 60) + ' minutes ' + tense;
				} else if (abs_diff < 7200) {
					return '1 hour ' + tense;
				} else if (abs_diff < 86400) {
					return Math.floor(abs_diff / 3600) + ' hours ' + tense;
				} else if (abs_day_diff === 1) {
					if (diff >= 0) return 'Yesterday';else return 'Tomorrow';
				} else if (abs_day_diff < 7) {
					return abs_day_diff + ' days ' + tense;
				} else if (abs_day_diff === 7) {
					return '1 week ' + tense;
				} else if (abs_day_diff < 31) {
					return Math.ceil(abs_day_diff / 7) + ' weeks ' + tense;
				} else {
					return 'more than 5 weeks ' + tense;
				}
			},
			toBrowserTimeZone: function toBrowserTimeZone(value, format) {
				return this.format(new Date(value), format || 'MM/dd/yyyy HH:mm:ss');
			}
		};
	})();
	UI.DateFormat = DateFormat;
})(Smart.Namespace);
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI) {

  var Col = React.createClass({
    displayName: "Col",

    propTypes: {
      span: React.PropTypes.string,
      order: React.PropTypes.string,
      offset: React.PropTypes.string,
      push: React.PropTypes.string,
      pull: React.PropTypes.string,
      className: React.PropTypes.string,
      children: React.PropTypes.node
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var span = _props.span;
      var order = _props.order;
      var offset = _props.offset;
      var push = _props.push;
      var pull = _props.pull;
      var className = _props.className;

      var others = _objectWithoutProperties(_props, ["span", "order", "offset", "push", "pull", "className"]);

      var classes = classNames((_classNames = {}, _defineProperty(_classNames, "col-" + span, span), _defineProperty(_classNames, "col-order-" + order, order), _defineProperty(_classNames, "col-offset-" + offset, offset), _defineProperty(_classNames, "col-push-" + push, push), _defineProperty(_classNames, "col-pull-" + pull, pull), _defineProperty(_classNames, className, className), _classNames));
      return React.createElement(
        "div",
        _extends({}, others, { className: classes }),
        this.props.children
      );
    }
  });

  var Row = React.createClass({
    displayName: "Row",

    propTypes: {
      type: React.PropTypes.string,
      align: React.PropTypes.string,
      justify: React.PropTypes.string,
      className: React.PropTypes.string,
      children: React.PropTypes.node
    },
    render: function render() {
      var _classNames2;

      var _props2 = this.props;
      var type = _props2.type;
      var justify = _props2.justify;
      var align = _props2.align;
      var className = _props2.className;

      var others = _objectWithoutProperties(_props2, ["type", "justify", "align", "className"]);

      var classes = classNames((_classNames2 = {
        row: true
      }, _defineProperty(_classNames2, "row-" + type, type), _defineProperty(_classNames2, "row-" + type + "-" + justify, justify), _defineProperty(_classNames2, "row-" + type + "-" + align, align), _defineProperty(_classNames2, className, className), _classNames2));
      return React.createElement(
        "div",
        _extends({}, others, { className: classes }),
        this.props.children
      );
    }
  });

  UI.Row = Row;
  UI.Col = Col;
})(Smart.UI);
"use strict";

+(function (UI) {

	UI.Icon = function (props) {
		var className = classNames(props.className, " anticon anticon-" + props.type);
		return React.createElement("i", _.assign({}, props, { className: className }));
	};
})(Smart.UI);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//扩展了paths属性,提供数组结构的面包屑控件
+(function (UI) {
		var _React = React;
		var cloneElement = _React.cloneElement;

		var BreadcrumbItem = React.createClass({
				displayName: 'BreadcrumbItem',
				getDefaultProps: function getDefaultProps() {
						return {
								prefixCls: 'ant-breadcrumb',
								separator: '/'
						};
				},

				propTypes: {
						prefixCls: React.PropTypes.string,
						separator: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
						href: React.PropTypes.string
				},
				render: function render() {
						var _props = this.props;
						var prefixCls = _props.prefixCls;
						var separator = _props.separator;
						var children = _props.children;

						var link = React.createElement(
								'a',
								_extends({ className: prefixCls + '-link' }, this.props),
								children
						);
						if (typeof this.props.href === 'undefined') {
								link = React.createElement(
										'span',
										_extends({ className: prefixCls + '-link' }, this.props),
										children
								);
						}
						return React.createElement(
								'span',
								null,
								link,
								React.createElement(
										'span',
										{ className: prefixCls + '-separator' },
										separator
								)
						);
				}
		});

		var Breadcrumb = React.createClass({
				displayName: 'Breadcrumb',
				getDefaultProps: function getDefaultProps() {
						return {
								prefixCls: 'ant-breadcrumb',
								separator: '/'
						};
				},

				propTypes: {
						prefixCls: React.PropTypes.string,
						separator: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
						routes: React.PropTypes.array,
						paths: React.PropTypes.array,
						params: React.PropTypes.object
				},
				render: function render() {
						var crumbs = undefined;
						var _props2 = this.props;
						var separator = _props2.separator;
						var prefixCls = _props2.prefixCls;
						var routes = _props2.routes;
						var paths = _props2.paths;
						var params = _props2.params;
						var children = _props2.children;

						if (paths && paths.length > 0) {
								crumbs = paths.map(function (name, i) {
										return React.createElement(
												BreadcrumbItem,
												{ separator: separator, key: name },
												name
										);
								});
						} else if (routes && routes.length > 0) {
								(function () {
										var paths = [];
										crumbs = routes.map(function (route, i) {
												if (!route.breadcrumbName) {
														return null;
												}
												var name = route.breadcrumbName.replace(/\:(.*)/g, function (replacement, key) {
														return params[key] || replacement;
												});

												var link = undefined;
												var path = route.path.replace(/^\//, '');
												Object.keys(params).forEach(function (key) {
														path = path.replace(':' + key, params[key]);
												});
												if (path) {
														paths.push(path);
												}

												if (i === routes.length - 1) {
														link = React.createElement(
																'span',
																null,
																name
														);
												} else {
														link = React.createElement(
																'a',
																{ href: '#/' + paths.join('/') },
																name
														);
												}
												return React.createElement(
														BreadcrumbItem,
														{ separator: separator, key: name },
														link
												);
										});
								})();
						} else {
								crumbs = React.Children.map(children, function (element, index) {
										return cloneElement(element, {
												separator: separator,
												key: index
										});
								});
						}
						return React.createElement(
								'div',
								{ className: prefixCls },
								crumbs
						);
				}
		});

		Breadcrumb.Item = BreadcrumbItem;
		UI.Breadcrumb = Breadcrumb;
})(Smart.UI);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (UI, RC) {
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

  var Group = (function (_React$Component) {
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
  })(React.Component);

  Group.propTypes = {
    children: React.PropTypes.any
  };

  var Input = (function (_React$Component2) {
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
  })(React.Component);

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
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
		var _ref = _;
		var assign = _ref.assign;
		var Icon = UI.Icon;
		var Progress = RC.Progress;
		var Progresscircle = Progress.Circle;

		var prefixCls = 'ant-progress';

		var statusColorMap = {
				normal: '#2db7f5',
				exception: '#ff5500',
				success: '#87d068'
		};

		var Line = React.createClass({
				displayName: 'Line',

				propTypes: {
						status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
						showInfo: React.PropTypes.bool,
						percent: React.PropTypes.number,
						strokeWidth: React.PropTypes.number,
						trailColor: React.PropTypes.string,
						format: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string, React.PropTypes.func])
				},
				getDefaultProps: function getDefaultProps() {
						return {
								percent: 0,
								strokeWidth: 10,
								status: 'normal', // exception active
								showInfo: true,
								trailColor: '#f3f3f3'
						};
				},
				render: function render() {
						var props = assign({}, this.props);

						if (parseInt(props.percent, 10) === 100) {
								props.status = 'success';
						}

						var progressInfo = undefined;
						var fullCls = '';

						if (props.format) {
								warning(typeof props.format === 'function', 'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
						}

						var text = props.format || props.percent + '%';
						if (typeof props.format === 'string') {
								// 向下兼容原来的字符串替换方式
								text = props.format.replace('${percent}', props.percent);
						} else if (typeof props.format === 'function') {
								text = props.format(props.percent);
						}

						if (props.showInfo === true) {
								if (props.status === 'exception') {
										progressInfo = React.createElement(
												'span',
												{ className: prefixCls + '-line-text' },
												props.format ? text : React.createElement(Icon, { type: 'exclamation' })
										);
								} else if (props.status === 'success') {
										progressInfo = React.createElement(
												'span',
												{ className: prefixCls + '-line-text' },
												props.format ? text : React.createElement(Icon, { type: 'check' })
										);
								} else {
										progressInfo = React.createElement(
												'span',
												{ className: prefixCls + '-line-text' },
												text
										);
								}
						} else {
								fullCls = ' ' + prefixCls + '-line-wrap-full';
						}
						var percentStyle = {
								width: props.percent + '%',
								height: props.strokeWidth
						};

						return React.createElement(
								'div',
								{ className: prefixCls + '-line-wrap clearfix status-' + props.status + fullCls, style: props.style },
								progressInfo,
								React.createElement(
										'div',
										{ className: prefixCls + '-line-outer' },
										React.createElement(
												'div',
												{ className: prefixCls + '-line-inner' },
												React.createElement('div', { className: prefixCls + '-line-bg', style: percentStyle })
										)
								)
						);
				}
		});

		var Circle = React.createClass({
				displayName: 'Circle',

				propTypes: {
						status: React.PropTypes.oneOf(['normal', 'exception', 'success']),
						percent: React.PropTypes.number,
						strokeWidth: React.PropTypes.number,
						width: React.PropTypes.number,
						trailColor: React.PropTypes.string,
						format: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string, React.PropTypes.func])
				},
				getDefaultProps: function getDefaultProps() {
						return {
								width: 132,
								percent: 0,
								strokeWidth: 6,
								status: 'normal', // exception
								trailColor: '#f3f3f3'
						};
				},
				render: function render() {
						var props = assign({}, this.props);

						if (parseInt(props.percent, 10) === 100) {
								props.status = 'success';
						}

						var style = {
								width: props.width,
								height: props.width,
								fontSize: props.width * 0.16 + 6
						};
						var progressInfo = undefined;
						var text = props.format || props.percent + '%';

						if (props.format) {
								warning(typeof props.format === 'function', 'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
						}

						if (typeof props.format === 'string') {
								// 向下兼容原来的字符串替换方式
								text = props.format.replace('${percent}', props.percent);
						} else if (typeof props.format === 'function') {
								text = props.format(props.percent);
						}

						if (props.status === 'exception') {
								progressInfo = React.createElement(
										'span',
										{ className: prefixCls + '-circle-text' },
										props.format ? text : React.createElement(Icon, { type: 'exclamation' })
								);
						} else if (props.status === 'success') {
								progressInfo = React.createElement(
										'span',
										{ className: prefixCls + '-circle-text' },
										props.format ? text : React.createElement(Icon, { type: 'check' })
								);
						} else {
								progressInfo = React.createElement(
										'span',
										{ className: prefixCls + '-circle-text' },
										text
								);
						}

						return React.createElement(
								'div',
								{ className: prefixCls + '-circle-wrap status-' + props.status, style: props.style },
								React.createElement(
										'div',
										{ className: prefixCls + '-circle-inner', style: style },
										React.createElement(Progresscircle, { percent: props.percent, strokeWidth: props.strokeWidth,
												strokeColor: statusColorMap[props.status], trailColor: props.trailColor }),
										progressInfo
								)
						);
				}
		});

		UI.Progress = {
				Line: Line,
				Circle: Circle
		};
})(Smart.UI, Smart.RC);
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

+(function (UI, RC) {

	var RcCheckbox = RC.Checkbox;

	var Checkbox = React.createClass({
		displayName: 'Checkbox',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-checkbox'
			};
		},
		render: function render() {
			return React.createElement(RcCheckbox, this.props);
		}
	});

	var Group = React.createClass({
		displayName: 'Group',
		getDefaultProps: function getDefaultProps() {
			return {
				options: [],
				defaultValue: [],
				onChange: function onChange() {}
			};
		},

		propTypes: {
			defaultValue: React.PropTypes.array,
			value: React.PropTypes.array,
			options: React.PropTypes.array.isRequired,
			onChange: React.PropTypes.func
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var value = undefined;
			if ('value' in props) {
				value = props.value;
			} else if ('defaultValue' in props) {
				value = props.defaultValue;
			}
			return { value: value };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value || []
				});
			}
		},
		toggleOption: function toggleOption(option) {
			var optionIndex = this.state.value.indexOf(option);
			var value = [].concat(_toConsumableArray(this.state.value));
			if (optionIndex === -1) {
				value.push(option);
			} else {
				value.splice(optionIndex, 1);
			}
			if (!('value' in this.props)) {
				this.setState({ value: value });
			}
			this.props.onChange(value);
		},
		render: function render() {
			var _this = this;

			var options = this.props.options;
			return React.createElement(
				'div',
				{ className: 'ant-checkbox-group' },
				options.map(function (option) {
					return React.createElement(
						'label',
						{ className: 'ant-checkbox-group-item', key: option },
						React.createElement(Checkbox, { disabled: _this.props.disabled,
							checked: _this.state.value.indexOf(option) !== -1,
							onChange: _this.toggleOption.bind(_this, option) }),
						option
					);
				})
			);
		}
	});

	Checkbox.Group = Group;
	UI.Checkbox = Checkbox;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var Switch = RC.Switch;

  var AntSwitch = React.createClass({
    displayName: 'AntSwitch',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-switch',
        size: 'default'
      };
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var size = _props.size;
      var className = _props.className;

      var cls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-' + size, true), _classNames));
      return React.createElement(Switch, _extends({ className: cls }, this.props));
    }
  });

  UI.Switch = AntSwitch;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var Radio = RC.Radio;

	var AntRadio = React.createClass({
		displayName: 'AntRadio',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio'
			};
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var prefixCls = _props.prefixCls;
			var children = _props.children;
			var checked = _props.checked;
			var disabled = _props.disabled;
			var className = _props.className;
			var style = _props.style;

			var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _defineProperty(_classNames, className, !!className), _classNames));
			return React.createElement(
				'label',
				{ className: classString, style: style },
				'>',
				React.createElement(Radio, _extends({}, this.props, { style: null, children: null })),
				children
			);
		}
	});

	function getCheckedValue(children) {
		var value = null;
		var matched = false;
		React.Children.forEach(children, function (radio) {
			if (radio && radio.props && radio.props.checked) {
				value = radio.props.value;
				matched = true;
			}
		});
		return matched ? { value: value } : undefined;
	}

	var RadioGroup = React.createClass({
		displayName: 'RadioGroup',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-group',
				disabled: false,
				onChange: function onChange() {}
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var value = undefined;
			if ('value' in props) {
				value = props.value;
			} else if ('defaultValue' in props) {
				value = props.defaultValue;
			} else {
				var checkedValue = getCheckedValue(props.children);
				value = checkedValue && checkedValue.value;
			}
			return {
				value: value
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value
				});
			} else {
				var checkedValue = getCheckedValue(nextProps.children);
				if (checkedValue) {
					this.setState({
						value: checkedValue.value
					});
				}
			}
		},
		onRadioChange: function onRadioChange(ev) {
			if (!('value' in this.props)) {
				this.setState({
					value: ev.target.value
				});
			}
			this.props.onChange(ev);
		},
		render: function render() {
			var _this = this,
			    _classNames2;

			var props = this.props;
			var children = React.Children.map(props.children, function (radio) {
				if (radio && (radio.type === Radio || radio.type === RadioButton) && radio.props) {
					var keyProps = {};
					if (!('key' in radio) && typeof radio.props.value === 'string') {
						keyProps.key = radio.props.value;
					}
					return React.cloneElement(radio, _extends({}, keyProps, radio.props, {
						onChange: _this.onRadioChange,
						checked: _this.state.value === radio.props.value,
						disabled: radio.props.disabled || _this.props.disabled
					}));
				}
				return radio;
			});
			var classString = classNames((_classNames2 = {}, _defineProperty(_classNames2, props.prefixCls, true), _defineProperty(_classNames2, props.prefixCls + '-' + props.size, props.size), _classNames2));
			return React.createElement(
				'div',
				{ className: classString, style: props.style },
				children
			);
		}
	});

	var RadioButton = React.createClass({
		displayName: 'RadioButton',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-button'
			};
		},
		render: function render() {
			return React.createElement(AntRadio, this.props);
		}
	});

	AntRadio.Button = RadioButton;
	AntRadio.Group = RadioGroup;
	UI.Radio = AntRadio;
})(Smart.UI, Smart.RC);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//export default Form;
+(function (UI, RC) {
	var createDOMForm = RC.createDOMForm;

	var ValueMixin = {
		setValue: function setValue(field, e) {
			var v = e;
			var target = e && e.target;
			if (target) {
				if (('' + target.nodeName).toLowerCase() === 'input' && target.type === 'checkbox') {
					v = target.checked;
				} else {
					v = e.target.value;
				}
			}
			var newFormData = {};
			newFormData[field] = v;
			this.setState({
				formData: _extends({}, this.state.formData, newFormData)
			});
		}
	};

	function prefixClsFn(prefixCls) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return args.map(function (s) {
			return prefixCls + '-' + s;
		}).join(' ');
	}

	var FormItem = (function (_React$Component) {
		_inherits(FormItem, _React$Component);

		function FormItem() {
			_classCallCheck(this, FormItem);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(FormItem).apply(this, arguments));
		}

		_createClass(FormItem, [{
			key: '_getLayoutClass',
			value: function _getLayoutClass(colDef) {
				if (!colDef) {
					return '';
				}
				var span = colDef.span;
				var offset = colDef.offset;

				var col = span ? 'col-' + span : '';
				var offsetCol = offset ? ' col-offset-' + offset : '';
				return col + offsetCol;
			}
		}, {
			key: 'getHelpMsg',
			value: function getHelpMsg() {
				var context = this.context;
				var props = this.props;
				if (props.help === undefined && context.form) {
					return (context.form.getFieldError(this.getId()) || []).join(', ');
				}

				return props.help;
			}
		}, {
			key: 'getId',
			value: function getId() {
				return this.props.children.props && this.props.children.props.id;
			}
		}, {
			key: 'getMeta',
			value: function getMeta() {
				return this.props.children.props && this.props.children.props.__meta;
			}
		}, {
			key: 'renderHelp',
			value: function renderHelp() {
				var props = this.props;
				var prefixCls = props.prefixCls;
				var help = this.getHelpMsg();
				return React.createElement(
					'div',
					{ className: !!help ? prefixClsFn(prefixCls, 'explain') : '', key: 'help' },
					help
				);
			}
		}, {
			key: 'getValidateStatus',
			value: function getValidateStatus() {
				var _context$form = this.context.form;
				var isFieldValidating = _context$form.isFieldValidating;
				var getFieldError = _context$form.getFieldError;
				var getFieldValue = _context$form.getFieldValue;

				var field = this.getId();

				if (isFieldValidating(field)) {
					return 'validating';
				} else if (!!getFieldError(field)) {
					return 'error';
				} else if (getFieldValue(field) !== undefined) {
					return 'success';
				}

				return '';
			}
		}, {
			key: 'renderValidateWrapper',
			value: function renderValidateWrapper(c1, c2, c3) {
				var classes = '';
				var form = this.context.form;
				var props = this.props;
				var validateStatus = props.validateStatus === undefined && form ? this.getValidateStatus() : props.validateStatus;

				if (validateStatus) {
					classes = classNames({
						'has-feedback': props.hasFeedback,
						'has-success': validateStatus === 'success',
						'has-warning': validateStatus === 'warning',
						'has-error': validateStatus === 'error',
						'is-validating': validateStatus === 'validating'
					});
				}
				return React.createElement(
					'div',
					{ className: this.props.prefixCls + '-item-control ' + classes },
					c1,
					c2,
					c3
				);
			}
		}, {
			key: 'renderWrapper',
			value: function renderWrapper(children) {
				var wrapperCol = this.props.wrapperCol;
				return React.createElement(
					'div',
					{ className: this._getLayoutClass(wrapperCol), key: 'wrapper' },
					children
				);
			}
		}, {
			key: 'isRequired',
			value: function isRequired() {
				if (this.context.form) {
					var meta = this.getMeta() || {};
					var validate = meta.validate || [];

					return validate.filter(function (item) {
						return !!item.rules;
					}).some(function (item) {
						return item.rules.some(function (rule) {
							return rule.required;
						});
					});
				}
				return false;
			}
		}, {
			key: 'renderLabel',
			value: function renderLabel() {
				var _classNames;

				var props = this.props;
				var labelCol = props.labelCol;
				var required = props.required === undefined ? this.isRequired() : props.required;

				var className = classNames((_classNames = {}, _defineProperty(_classNames, this._getLayoutClass(labelCol), true), _defineProperty(_classNames, props.prefixCls + '-item-required', required), _classNames));

				return props.label ? React.createElement(
					'label',
					{ htmlFor: props.id || this.getId(), className: className, required: required, key: 'label' },
					props.label
				) : null;
			}
		}, {
			key: 'renderChildren',
			value: function renderChildren() {
				var props = this.props;
				var children = React.Children.map(props.children, function (child) {
					if (child && typeof child.type === 'function' && !child.props.size) {
						return React.cloneElement(child, { size: 'large' });
					}
					return child;
				});
				return [this.renderLabel(), this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), props.extra))];
			}
		}, {
			key: 'renderFormItem',
			value: function renderFormItem(children) {
				var _itemClassName;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, prefixCls + '-item', true), _defineProperty(_itemClassName, prefixCls + '-item-with-help', !!this.getHelpMsg()), _defineProperty(_itemClassName, '' + props.className, !!props.className), _itemClassName);

				return React.createElement(
					'div',
					{ className: classNames(itemClassName) },
					children
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var children = this.renderChildren();
				return this.renderFormItem(children);
			}
		}]);

		return FormItem;
	})(React.Component);

	FormItem.propTypes = {
		prefixCls: React.PropTypes.string,
		label: React.PropTypes.node,
		labelCol: React.PropTypes.object,
		help: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
		validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
		hasFeedback: React.PropTypes.bool,
		wrapperCol: React.PropTypes.object,
		className: React.PropTypes.string,
		id: React.PropTypes.string,
		children: React.PropTypes.node
	};

	FormItem.defaultProps = {
		hasFeedback: false,
		prefixCls: 'ant-form'
	};

	FormItem.contextTypes = {
		form: React.PropTypes.object
	};

	var Form = (function (_React$Component2) {
		_inherits(Form, _React$Component2);

		function Form() {
			_classCallCheck(this, Form);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
		}

		_createClass(Form, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return {
					form: this.props.form
				};
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames2;

				var _props = this.props;
				var prefixCls = _props.prefixCls;
				var className = _props.className;

				var formClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-horizontal', this.props.horizontal), _defineProperty(_classNames2, prefixCls + '-inline', this.props.inline), _classNames2));

				return React.createElement(
					'form',
					_extends({}, this.props, { className: formClassName }),
					this.props.children
				);
			}
		}]);

		return Form;
	})(React.Component);

	Form.propTypes = {
		prefixCls: React.PropTypes.string,
		horizontal: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		form: React.PropTypes.object,
		children: React.PropTypes.any,
		onSubmit: React.PropTypes.func
	};

	Form.defaultProps = {
		prefixCls: 'ant-form',
		onSubmit: function onSubmit(e) {
			e.preventDefault();
		}
	};

	Form.childContextTypes = {
		form: React.PropTypes.object
	};

	Form.create = function () {
		var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var options = _extends({}, o, {
			fieldNameProp: 'id',
			fieldMetaProp: '__meta'
		});

		return createDOMForm(options);
	};
	Form.Item = FormItem;

	// @Deprecated
	Form.ValueMixin = ValueMixin;

	// 对于 import { Form, Input } from 'antd/lib/form/';
	// 的方式做向下兼容
	// https://github.com/ant-design/ant-design/pull/566
	Form.Form = Form;
	Form.Input = UI.Input;
	UI.Form = Form;
	UI.FormItem = FormItem;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
  var InputNumber = RC.InputNumber;
  var classNames = RC.classNames;
  var _ref = _;
  var noop = _ref.noop;

  var AntInputNumber = React.createClass({
    displayName: 'AntInputNumber',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-input-number',
        step: 1
      };
    },
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var size = _props.size;

      var other = _objectWithoutProperties(_props, ['className', 'size']);

      var inputNumberClass = classNames(_defineProperty({
        'ant-input-number-lg': size === 'large',
        'ant-input-number-sm': size === 'small'
      }, className, !!className));

      return React.createElement(InputNumber, _extends({ className: inputNumberClass }, other));
    }
  });

  UI.InputNumber = AntInputNumber;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Icon = UI.Icon;
  var Notification = RC.Notification;

  var defaultDuration = 1.5;
  var top = undefined;
  var messageInstance = undefined;
  var key = 1;

  function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
      prefixCls: 'ant-message',
      transitionName: 'move-up',
      style: {
        top: top
      } // 覆盖原来的样式
    });
    return messageInstance;
  }

  function notice(content) {
    var duration = arguments.length <= 1 || arguments[1] === undefined ? defaultDuration : arguments[1];
    var type = arguments[2];
    var onClose = arguments[3];

    var iconClass = ({
      info: 'ant-message-info',
      success: 'ant-message-success',
      error: 'ant-message-error',
      warn: 'ant-message-warn',
      loading: 'ant-message-loading'
    })[type];

    var iconType = ({
      info: 'info-circle',
      success: 'check-circle',
      error: 'exclamation-circle',
      warn: 'exclamation-circle',
      loading: 'loading'
    })[type];

    var instance = getMessageInstance();
    instance.notice({
      key: key,
      duration: duration,
      style: {},
      content: React.createElement(
        'div',
        { className: 'ant-message-custom-content ' + iconClass },
        React.createElement(Icon, { className: iconClass, type: iconType }),
        React.createElement(
          'span',
          null,
          content
        )
      ),
      onClose: onClose
    });
    return (function () {
      var target = key++;
      return function () {
        instance.removeNotice(target);
      };
    })();
  }

  var message = {
    info: function info(content, duration, onClose) {
      return notice(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
      return notice(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
      return notice(content, duration, 'error', onClose);
    },
    warn: function warn(content, duration, onClose) {
      return notice(content, duration, 'warn', onClose);
    },
    loading: function loading(content, duration, onClose) {
      return notice(content, duration, 'loading', onClose);
    },
    config: function config(options) {
      if (options.top) {
        top = options.top;
      }
    },
    destroy: function destroy() {
      if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
      }
    }
  };

  UI.message = message;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Notification = RC.Notification;
  var Icon = UI.Icon;
  var _ref = _;
  var assign = _ref.assign;

  var top = 24;
  var notificationInstance = undefined;

  function getNotificationInstance() {
    if (notificationInstance) {
      return notificationInstance;
    }
    notificationInstance = Notification.newInstance({
      prefixCls: 'ant-notification',
      style: {
        top: top,
        right: 0
      }
    });
    return notificationInstance;
  }

  function notice(args) {
    var duration = undefined;
    if (args.duration === undefined) {
      duration = 4.5;
    } else {
      duration = args.duration;
    }

    if (args.icon) {
      var prefixCls = ' ant-notification-notice-content-icon-';
      var iconType = '';
      switch (args.icon) {
        case 'success':
          iconType = 'check-circle-o';
          break;
        case 'info':
          iconType = 'info-circle-o';
          break;
        case 'error':
          iconType = 'exclamation-circle-o';
          break;
        case 'warn':
          iconType = 'question-circle-o';
          break;
        default:
          iconType = 'info-circle';
      }

      getNotificationInstance().notice({
        content: React.createElement(
          'div',
          null,
          React.createElement(Icon, { className: prefixCls + 'icon-' + args.icon + prefixCls + 'icon', type: iconType }),
          React.createElement(
            'div',
            { className: prefixCls + 'message' },
            args.message
          ),
          React.createElement(
            'div',
            { className: prefixCls + 'description' },
            args.description
          )
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      });
    } else {
      var prefixCls = 'ant-notification-notice-content-';
      if (!args.btn) {
        getNotificationInstance().notice({
          content: React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: prefixCls + 'message' },
              args.message
            ),
            React.createElement(
              'div',
              { className: prefixCls + 'description' },
              args.description
            )
          ),
          duration: duration,
          closable: true,
          onClose: args.onClose,
          key: args.key,
          style: {}
        });
      } else {
        getNotificationInstance().notice({
          content: React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: prefixCls + 'message' },
              args.message
            ),
            React.createElement(
              'div',
              { className: prefixCls + 'description' },
              args.description
            ),
            React.createElement(
              'span',
              { className: prefixCls + 'btn' },
              args.btn
            )
          ),
          duration: duration,
          closable: true,
          onClose: args.onClose,
          key: args.key,
          style: {}
        });
      }
    }
  }

  var api = {
    open: function open(args) {
      notice(args);
    },
    close: function close(key) {
      if (notificationInstance) {
        notificationInstance.removeNotice(key);
      }
    },
    config: function config(options) {
      top = isNaN(options.top) ? 24 : options.top;
    },
    destroy: function destroy() {
      if (notificationInstance) {
        notificationInstance.destroy();
        notificationInstance = null;
      }
    }
  };

  ['success', 'info', 'warn', 'error'].forEach(function (type) {
    api[type] = function (args) {
      var newArgs = assign({}, args, {
        icon: type
      });
      return api.open(newArgs);
    };
  });

  UI.notification = api;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI) {
	function getScroll(w, top) {
		var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
		var method = 'scroll' + (top ? 'Top' : 'Left');
		if (typeof ret !== 'number') {
			var d = w.document;
			//ie6,7,8 standard mode
			ret = d.documentElement[method];
			if (typeof ret !== 'number') {
				//quirks mode
				ret = d.body[method];
			}
		}
		return ret;
	}
	function getOffset(element) {
		var rect = element.getBoundingClientRect();
		var body = document.body;
		var clientTop = element.clientTop || body.clientTop || 0;
		var clientLeft = element.clientLeft || body.clientLeft || 0;
		var scrollTop = getScroll(window, true);
		var scrollLeft = getScroll(window);

		return {
			top: rect.top + scrollTop - clientTop,
			left: rect.left + scrollLeft - clientLeft
		};
	}
	UI.Affix = React.createClass({
		displayName: 'Affix',
		getDefaultProps: function getDefaultProps() {
			return {
				offset: 0
			};
		},

		propTypes: {
			offset: React.PropTypes.number
		},

		getInitialState: function getInitialState() {
			return {
				affix: false,
				affixStyle: null
			};
		},
		handleScroll: function handleScroll() {
			var affix = this.state.affix;
			var scrollTop = getScroll(window, true);
			var elemOffset = getOffset(ReactDOM.findDOMNode(this));

			if (!affix && elemOffset.top - this.props.offset < scrollTop) {
				this.setState({
					affix: true,
					affixStyle: {
						top: this.props.offset,
						left: elemOffset.left,
						width: ReactDOM.findDOMNode(this).offsetWidth
					}
				});
			}

			if (affix && elemOffset.top - this.props.offset > scrollTop) {
				this.setState({
					affix: false,
					affixStyle: null
				});
			}
		},
		componentDidMount: function componentDidMount() {
			var win = $(window);
			this.scrollEvent = win.on('scroll', this.handleScroll);
			this.resizeEvent = win.on('resize', this.handleScroll);
		},
		componentWillUnmount: function componentWillUnmount() {
			var win = $(window);
			if (this.scrollEvent) {
				win.off('scroll', this.scrollEvent);
				this.scrollEvent = null;
			}
			if (this.resizeEvent) {
				win.off('resize', this.resizeEvent);
				this.resizeEvent = null;
			}
		},
		render: function render() {
			var className = classNames(this.props.className, {
				'ant-affix': this.state.affix
			});

			return React.createElement(
				'div',
				this.props,
				React.createElement(
					'div',
					{ className: className, style: this.state.affixStyle },
					this.props.children
				)
			);
		}
	});
})(Smart.UI);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var Animate = RC.Animate;
	var Icon = UI.Icon;
	UI.Alert = React.createClass({
		displayName: 'Alert',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-alert',
				showIcon: false,
				onClose: function onClose() {},

				type: 'info'
			};
		},
		getInitialState: function getInitialState() {
			return {
				closing: true,
				closed: false
			};
		},
		handleClose: function handleClose(e) {
			e.preventDefault();
			var dom = ReactDOM.findDOMNode(this);
			dom.style.height = dom.offsetHeight + 'px';
			// Magic code
			// 重复一次后才能正确设置 height
			dom.style.height = dom.offsetHeight + 'px';

			this.setState({
				closing: false
			});
			this.props.onClose.call(this, e);
		},
		animationEnd: function animationEnd() {
			this.setState({
				closed: true,
				closing: true
			});
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var closable = _props.closable;
			var description = _props.description;
			var type = _props.type;
			var prefixCls = _props.prefixCls;
			var message = _props.message;
			var closeText = _props.closeText;
			var showIcon = _props.showIcon;

			var iconType = '';
			switch (type) {
				case 'success':
					iconType = 'check-circle';
					break;
				case 'info':
					iconType = 'info-circle';
					break;
				case 'error':
					iconType = 'exclamation-circle';
					break;
				case 'warn':
					iconType = 'exclamation-circle';
					break;
				default:
					iconType = 'default';
			}

			// use outline icon in alert with description
			if (!!description) {
				iconType += '-o';
			}

			var alertCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-close', !this.state.closing), _defineProperty(_classNames, prefixCls + '-with-description', !!description), _defineProperty(_classNames, prefixCls + '-no-icon', !showIcon), _classNames));

			// closeable when closeText is assigned
			if (closeText) {
				closable = true;
			}

			return this.state.closed ? null : React.createElement(
				Animate,
				{ component: '',
					showProp: 'data-show',
					transitionName: 'slide-up',
					onEnd: this.animationEnd },
				React.createElement(
					'div',
					{ 'data-show': this.state.closing, className: alertCls },
					showIcon ? React.createElement(Icon, { className: 'ant-alert-icon', type: iconType }) : null,
					React.createElement(
						'span',
						{ className: prefixCls + '-message' },
						message
					),
					React.createElement(
						'span',
						{ className: prefixCls + '-description' },
						description
					),
					closable ? React.createElement(
						'a',
						{ onClick: this.handleClose, className: prefixCls + '-close-icon' },
						closeText || React.createElement(Icon, { type: 'cross' })
					) : null
				)
			);
		}
	});
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
	var Animate = RC.Animate;
	var assign = _.assign;
	var isCssAnimationSupported = Animate.isCssAnimationSupported;

	function getNumberArray(num) {
		return num ? num.toString().split('').reverse().map(function (i) {
			return Number(i);
		}) : [];
	}

	var ScrollNumber = (function (_React$Component) {
		_inherits(ScrollNumber, _React$Component);

		function ScrollNumber(props) {
			_classCallCheck(this, ScrollNumber);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollNumber).call(this, props));

			_this.state = {
				animateStarted: true,
				count: props.count
			};
			return _this;
		}

		_createClass(ScrollNumber, [{
			key: 'getPositionByNum',
			value: function getPositionByNum(num, i) {
				if (this.state.animateStarted) {
					return 10 + num;
				}
				var currentDigit = getNumberArray(this.state.count)[i];
				var lastDigit = getNumberArray(this.lastCount)[i];
				// 同方向则在同一侧切换数字
				if (this.state.count > this.lastCount) {
					if (currentDigit >= lastDigit) {
						return 10 + num;
					}
					return 20 + num;
				}
				if (currentDigit <= lastDigit) {
					return 10 + num;
				}
				return num;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this2 = this;

				if ('count' in nextProps) {
					if (this.state.count === nextProps.count) {
						return;
					}
					this.lastCount = this.state.count;
					// 复原数字初始位置
					this.setState({
						animateStarted: true
					}, function () {
						// 等待数字位置复原完毕
						// 开始设置完整的数字
						setTimeout(function () {
							_this2.setState({
								animateStarted: false,
								count: nextProps.count
							}, function () {
								_this2.props.onAnimated();
							});
						}, 5);
					});
				}
			}
		}, {
			key: 'renderNumberList',
			value: function renderNumberList() {
				var childrenToReturn = [];
				for (var i = 0; i < 30; i++) {
					childrenToReturn.push(React.createElement(
						'p',
						{ key: i },
						i % 10
					));
				}
				return childrenToReturn;
			}
		}, {
			key: 'renderCurrentNumber',
			value: function renderCurrentNumber(num, i) {
				var position = this.getPositionByNum(num, i);
				var height = this.props.height;
				var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
				return React.createElement('span', {
					className: this.props.prefixCls + '-only',
					style: {
						transition: removeTransition && 'none',
						transform: 'translate3d(0, ' + -position * height + 'px, 0)',
						WebkitTransform: 'translate3d(0, ' + -position * height + 'px, 0)',
						height: height
					},
					key: i
				}, this.renderNumberList());
			}
		}, {
			key: 'renderNumberElement',
			value: function renderNumberElement() {
				var _this3 = this;

				var state = this.state;
				if (!state.count || isNaN(state.count)) {
					return state.count;
				}
				return getNumberArray(state.count).map(function (num, i) {
					return _this3.renderCurrentNumber(num, i);
				}).reverse();
			}
		}, {
			key: 'render',
			value: function render() {
				var props = assign({}, this.props, {
					className: this.props.prefixCls + ' ' + this.props.className
				});
				var isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';
				if (isBrowser && isCssAnimationSupported) {
					return React.createElement(this.props.component, props, this.renderNumberElement());
				}
				return React.createElement(this.props.component, props, props.count);
			}
		}]);

		return ScrollNumber;
	})(React.Component);

	ScrollNumber.defaultProps = {
		prefixCls: 'ant-scroll-number',
		count: null,
		component: 'sup',
		onAnimated: function onAnimated() {},
		height: 18
	};

	ScrollNumber.propTypes = {
		count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		component: React.PropTypes.string,
		onAnimated: React.PropTypes.func,
		height: React.PropTypes.number
	};

	var AntBadge = (function (_React$Component2) {
		_inherits(AntBadge, _React$Component2);

		function AntBadge() {
			_classCallCheck(this, AntBadge);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(AntBadge).apply(this, arguments));
		}

		_createClass(AntBadge, [{
			key: 'render',
			value: function render() {
				var _classNames;

				var _props = this.props;
				var count = _props.count;
				var prefixCls = _props.prefixCls;
				var overflowCount = _props.overflowCount;
				var className = _props.className;
				var style = _props.style;
				var children = _props.children;

				var dot = this.props.dot;

				count = count > overflowCount ? overflowCount + '+' : count;

				// dot mode don't need count
				if (dot) {
					count = '';
				}

				// null undefined "" "0" 0
				var hidden = (!count || count === '0') && !dot;
				var scrollNumberCls = prefixCls + (dot ? '-dot' : '-count');
				var badgeCls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-not-a-wrapper', !children), _classNames));

				return React.createElement(
					'span',
					_extends({ className: badgeCls, title: count }, this.props, { style: null }),
					children,
					React.createElement(
						Animate,
						{ component: '',
							showProp: 'data-show',
							transitionName: prefixCls + '-zoom',
							transitionAppear: true },
						hidden ? null : React.createElement(ScrollNumber, { 'data-show': !hidden, className: scrollNumberCls,
							count: count, style: style })
					)
				);
			}
		}]);

		return AntBadge;
	})(React.Component);

	AntBadge.defaultProps = {
		prefixCls: 'ant-badge',
		count: null,
		dot: false,
		overflowCount: 99
	};

	AntBadge.propTypes = {
		count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		dot: React.PropTypes.bool,
		overflowCount: React.PropTypes.number
	};
	UI.Badge = AntBadge;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI) {
	var findDOMNode = ReactDOM.findDOMNode;
	var rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
	var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
	function isString(str) {
		return typeof str === 'string';
	}

	var prefix = 'ant-btn-';

	// Insert one space between two chinese characters automatically.
	function insertSpace(child) {
		if (isString(child) && isTwoCNChar(child)) {
			return child.split('').join(' ');
		}

		if (isString(child.type) && isTwoCNChar(child.props.children)) {
			return React.cloneElement(child, {}, child.props.children.split('').join(' '));
		}

		return child;
	}

	function clearButton(button) {
		button.className = button.className.replace(prefix + 'clicked', '');
	}

	var Button = (function (_React$Component) {
		_inherits(Button, _React$Component);

		function Button() {
			_classCallCheck(this, Button);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
		}

		_createClass(Button, [{
			key: 'handleClick',
			value: function handleClick() {
				var _props;

				// Add click effect
				var buttonNode = findDOMNode(this);
				clearButton(buttonNode);
				setTimeout(function () {
					return buttonNode.className += ' ' + prefix + 'clicked';
				}, 10);
				clearTimeout(this.timeout);
				this.timeout = setTimeout(function () {
					return clearButton(buttonNode);
				}, 500);

				(_props = this.props).onClick.apply(_props, arguments);
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames;

				var props = this.props;
				var type = props.type;
				var shape = props.shape;
				var size = props.size;
				var className = props.className;
				var htmlType = props.htmlType;
				var children = props.children;

				var others = _objectWithoutProperties(props, ['type', 'shape', 'size', 'className', 'htmlType', 'children']);

				// large => lg
				// small => sm

				var sizeCls = ({
					'large': 'lg',
					'small': 'sm'
				})[size] || '';

				var classes = classNames((_classNames = {
					'ant-btn': true
				}, _defineProperty(_classNames, prefix + type, type), _defineProperty(_classNames, prefix + shape, shape), _defineProperty(_classNames, prefix + sizeCls, sizeCls), _defineProperty(_classNames, prefix + 'loading', 'loading' in props && props.loading !== false), _defineProperty(_classNames, className, className), _classNames));

				var kids = React.Children.map(children, insertSpace);

				return React.createElement(
					'button',
					_extends({}, others, {
						type: htmlType || 'button',
						className: classes,
						onClick: this.handleClick.bind(this) }),
					kids
				);
			}
		}]);

		return Button;
	})(React.Component);

	Button.propTypes = {
		type: React.PropTypes.oneOf(['primary', 'ghost', 'dashed']),
		shape: React.PropTypes.oneOf(['circle', 'circle-outline']),
		size: React.PropTypes.oneOf(['large', 'small']),
		htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
		onClick: React.PropTypes.func,
		loading: React.PropTypes.bool,
		className: React.PropTypes.string
	};

	Button.defaultProps = {
		onClick: function onClick() {}
	};

	var prefixGroup = 'ant-btn-group-';

	var ButtonGroup = (function (_React$Component2) {
		_inherits(ButtonGroup, _React$Component2);

		function ButtonGroup() {
			_classCallCheck(this, ButtonGroup);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonGroup).apply(this, arguments));
		}

		_createClass(ButtonGroup, [{
			key: 'render',
			value: function render() {
				var _classNames2;

				var _props2 = this.props;
				var size = _props2.size;
				var className = _props2.className;

				var others = _objectWithoutProperties(_props2, ['size', 'className']);

				// large => lg
				// small => sm

				var sizeCls = ({
					'large': 'lg',
					'small': 'sm'
				})[size] || '';

				var classes = classNames((_classNames2 = {
					'ant-btn-group': true
				}, _defineProperty(_classNames2, prefixGroup + sizeCls, sizeCls), _defineProperty(_classNames2, className, className), _classNames2));

				return React.createElement('div', _extends({}, others, { className: classes }));
			}
		}]);

		return ButtonGroup;
	})(React.Component);

	ButtonGroup.propTypes = {
		size: React.PropTypes.oneOf(['large', 'small'])
	};
	Button.Group = ButtonGroup;
	UI.Button = Button;
	UI.ButtonGroup = ButtonGroup;
})(Smart.UI);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var animation = RC.animation;
  var Menu = RC.Menu;
  var MenuItemGroup = RC.MenuItemGroup;
  var MenuItem = RC.MenuItem;
  var Item = Menu.Item;
  var Divider = Menu.Divider;
  var SubMenu = Menu.SubMenu;
  var ItemGroup = Menu.ItemGroup;

  var AntMenu = React.createClass({
    displayName: 'AntMenu',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-menu',
        onClick: noop,
        onOpen: noop,
        onClose: noop,
        className: '',
        theme: 'light' };
    },
    // or dark
    getInitialState: function getInitialState() {
      return {
        openKeys: []
      };
    },
    handleClick: function handleClick(e) {
      this.setState({
        openKeys: []
      });
      this.props.onClick(e);
    },
    handleOpenKeys: function handleOpenKeys(e) {
      this.setState({
        openKeys: e.openKeys
      });
      this.props.onOpen(e);
    },
    handleCloseKeys: function handleCloseKeys(e) {
      this.setState({
        openKeys: e.openKeys
      });
      this.props.onClose(e);
    },
    render: function render() {
      var openAnimation = this.props.openAnimation || this.props.openTransitionName;
      if (!openAnimation) {
        switch (this.props.mode) {
          case 'horizontal':
            openAnimation = 'slide-up';
            break;
          case 'vertical':
            openAnimation = 'zoom-big';
            break;
          case 'inline':
            openAnimation = animation;
            break;
          default:
        }
      }

      var props = {};
      var className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
      if (this.props.mode !== 'inline') {
        // 这组属性的目的是
        // 弹出型的菜单需要点击后立即关闭
        // 另外，弹出型的菜单的受控模式没有使用场景
        props = {
          openKeys: this.state.openKeys,
          onClick: this.handleClick,
          onOpen: this.handleOpenKeys,
          onClose: this.handleCloseKeys,
          openTransitionName: openAnimation,
          className: className
        };
      } else {
        props = {
          openAnimation: openAnimation,
          className: className
        };
      }
      return React.createElement(Menu, _extends({}, this.props, props));
    }
  });

  AntMenu.Divider = Divider;
  AntMenu.Item = Item;
  AntMenu.SubMenu = SubMenu;
  AntMenu.ItemGroup = ItemGroup;

  UI.Menu = AntMenu;
  UI.MenuItem = Item;
  UI.SubMenu = SubMenu;
  UI.MenuItemGroup = ItemGroup;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var Select = RC.Select;
  var Option = Select.Option;
  var OptGroup = Select.OptGroup;

  var AntSelect = React.createClass({
    displayName: 'AntSelect',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-select',
        transitionName: 'slide-up',
        optionLabelProp: 'children',
        choiceTransitionName: 'zoom',
        showSearch: false
      };
    },
    render: function render() {
      var _props = this.props;
      var size = _props.size;
      var className = _props.className;
      var combobox = _props.combobox;
      var notFoundContent = _props.notFoundContent;

      var cls = classNames(_defineProperty({
        'ant-select-lg': size === 'large',
        'ant-select-sm': size === 'small'
      }, className, !!className));

      if (combobox) {
        notFoundContent = null;
      }

      return React.createElement(Select, _extends({}, this.props, {
        className: cls,
        notFoundContent: notFoundContent }));
    }
  });

  AntSelect.Option = Option;
  AntSelect.OptGroup = OptGroup;

  UI.Select = AntSelect;
  UI.Option = Option;
  UI.OptGroup = OptGroup;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
	var Dropdown = RC.Dropdown;
	var Button = UI.Button;
	var ButtonGroup = UI.ButtonGroup;
	var Icon = UI.Icon;

	var AntDropdown = React.createClass({
		displayName: 'AntDropdown',
		getDefaultProps: function getDefaultProps() {
			return {
				transitionName: 'slide-up',
				prefixCls: 'ant-dropdown',
				mouseEnterDelay: 0.15,
				mouseLeaveDelay: 0.1
			};
		},
		render: function render() {
			var _props = this.props;
			var overlay = _props.overlay;

			var otherProps = _objectWithoutProperties(_props, ['overlay']);

			var menu = React.cloneElement(overlay, {
				openTransitionName: 'zoom-big'
			});
			return React.createElement(Dropdown, _extends({}, otherProps, { overlay: menu }));
		}
	});

	var DropdownButton = React.createClass({
		displayName: 'DropdownButton',
		getDefaultProps: function getDefaultProps() {
			return {
				align: {
					points: ['tr', 'br'],
					overlay: {
						adjustX: 1,
						adjustY: 1
					},
					offset: [0, 4],
					targetOffset: [0, 0]
				},
				type: 'default'
			};
		},
		render: function render() {
			var _props2 = this.props;
			var type = _props2.type;
			var overlay = _props2.overlay;
			var trigger = _props2.trigger;
			var align = _props2.align;
			var children = _props2.children;
			var className = _props2.className;

			var restProps = _objectWithoutProperties(_props2, ['type', 'overlay', 'trigger', 'align', 'children', 'className']);

			var cls = classNames({
				'ant-dropdown-button': true,
				className: !!className
			});
			return React.createElement(
				ButtonGroup,
				_extends({}, restProps, { className: cls }),
				React.createElement(
					Button,
					{ type: type },
					children
				),
				React.createElement(
					AntDropdown,
					{ align: align, overlay: overlay, trigger: trigger },
					React.createElement(
						Button,
						{ type: type },
						React.createElement(Icon, { type: 'down' })
					)
				)
			);
		}
	});

	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var noop = _.noop,
      PropTypes = React.PropTypes,
      rcUtil = RC.Util,
      Dom = rcUtil.Dom,
      Dialog = RC.Dialog,
      Icon = UI.Icon,
      Button = UI.Button;

  var mousePosition = undefined;
  var mousePositionEventBinded = undefined;

  var AntModal = React.createClass({
    displayName: 'AntModal',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-modal',
        onOk: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        width: 520,
        transitionName: 'zoom',
        maskAnimation: 'fade',
        confirmLoading: false,
        visible: false
      };
    },

    propTypes: {
      prefixCls: PropTypes.string,
      onOk: PropTypes.func,
      onCancel: PropTypes.func,
      okText: PropTypes.node,
      cancelText: PropTypes.node,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      confirmLoading: PropTypes.bool,
      visible: PropTypes.bool,
      align: PropTypes.object,
      footer: PropTypes.node,
      title: PropTypes.node,
      closable: PropTypes.bool
    },

    handleCancel: function handleCancel(e) {
      this.props.onCancel(e);
    },
    handleOk: function handleOk() {
      this.props.onOk();
    },
    componentDidMount: function componentDidMount() {
      if (mousePositionEventBinded) {
        return;
      }
      // 只有点击事件支持从鼠标位置动画展开
      Dom.addEventListener(document.documentElement, 'click', function (e) {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        };
        // 20ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开
        setTimeout(function () {
          return mousePosition = null;
        }, 20);
      });
      mousePositionEventBinded = true;
    },
    render: function render() {
      var props = this.props;
      var defaultFooter = [React.createElement(
        Button,
        { key: 'cancel',
          type: 'ghost',
          size: 'large',
          onClick: this.handleCancel },
        props.cancelText
      ), React.createElement(
        Button,
        { key: 'confirm',
          type: 'primary',
          size: 'large',
          loading: props.confirmLoading,
          onClick: this.handleOk },
        props.okText
      )];
      var footer = props.footer || defaultFooter;
      return React.createElement(Dialog, _extends({ onClose: this.handleCancel, footer: footer }, props, {
        visible: props.visible, mousePosition: mousePosition }));
    }
  });
  function confirm(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var d = undefined;
    props = props || {};
    props.iconClassName = props.iconClassName || 'question-circle';

    var iconClassType = props.iconClassName;

    var width = props.width || 416;

    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
      props.okCancel = true;
    }

    props.okText = props.okText || (props.okCancel ? '确定' : '知道了');
    props.cancelText = props.cancelText || '取消';

    function close() {
      d.setState({
        visible: false
      });
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    }

    function onCancel() {
      var cancelFn = props.onCancel;
      if (cancelFn) {
        var ret = undefined;
        if (cancelFn.length) {
          ret = cancelFn(close);
        } else {
          ret = cancelFn();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }

    function onOk() {
      var okFn = props.onOk;
      if (okFn) {
        var ret = undefined;
        if (okFn.length) {
          ret = okFn(close);
        } else {
          ret = okFn();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }

    var body = React.createElement(
      'div',
      { className: 'ant-confirm-body' },
      React.createElement(Icon, { type: iconClassType }),
      React.createElement(
        'span',
        { className: 'ant-confirm-title' },
        props.title
      ),
      React.createElement(
        'div',
        { className: 'ant-confirm-content' },
        props.content
      )
    );

    var footer = null;
    if (props.okCancel) {
      footer = React.createElement(
        'div',
        { className: 'ant-confirm-btns' },
        React.createElement(
          Button,
          { type: 'ghost', size: 'large', onClick: onCancel },
          props.cancelText
        ),
        React.createElement(
          Button,
          { type: 'primary', size: 'large', onClick: onOk },
          props.okText
        )
      );
    } else {
      footer = React.createElement(
        'div',
        { className: 'ant-confirm-btns' },
        React.createElement(
          Button,
          { type: 'primary', size: 'large', onClick: onOk },
          props.okText
        )
      );
    }

    ReactDOM.render(React.createElement(
      AntModal,
      {
        prefixCls: 'ant-modal',
        className: 'ant-confirm',
        visible: true,
        closable: false,
        title: '',
        transitionName: 'zoom',
        footer: '',
        maskTransitionName: 'fade', width: width },
      React.createElement(
        'div',
        { style: { zoom: 1, overflow: 'hidden' } },
        body,
        ' ',
        footer
      )
    ), div, function () {
      d = this;
    });
  }

  AntModal.info = function (props) {
    props.iconClassName = 'info-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.success = function (props) {
    props.iconClassName = 'check-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.error = function (props) {
    props.iconClassName = 'exclamation-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.confirm = function (props) {
    props.okCancel = true;
    return confirm(props);
  };

  function dialog(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var d = undefined;
    props = props || {};
    props.iconClassName = props.iconClassName || 'question-circle';

    var iconClassType = props.iconClassName;

    var width = props.width || 600;

    props.okText = props.okText || (props.okCancel ? '确定' : '知道了');
    props.cancelText = props.cancelText || '取消';

    function close() {
      d.setState({
        visible: false
      });
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    }

    ReactDOM.render(React.createElement(
      AntModal,
      {
        prefixCls: 'ant-modal',
        className: 'ant-dialog',
        visible: true,
        maskClosable: false,
        onClose: close,
        title: props.title,
        transitionName: 'zoom',
        footer: '',
        maskTransitionName: 'fade', width: width },
      React.createElement(
        'div',
        { style: { zoom: 1, overflow: 'hidden' } },
        React.cloneElement(props.content, { close: close })
      )
    ), div, function () {
      d = this;
    });
  }

  AntModal.dialog = function (props) {
    props.okCancel = true;
    return dialog(props);
  };

  UI.Modal = AntModal;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var Tooltip = RC.Tooltip;
  var getPlacements = UI.getPlacements;

  var placements = getPlacements({
    verticalArrowShift: 8
  });

  UI.Tooltip = React.createClass({
    displayName: 'Tooltip',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-tooltip',
        placement: 'top',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1
      };
    },
    getInitialState: function getInitialState() {
      return {
        visible: false
      };
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setState({ visible: visible });
    },
    render: function render() {
      var transitionName = ({
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      })[this.props.placement];

      // Hide tooltip when there is no title
      var visible = this.state.visible;
      if (!this.props.title) {
        visible = false;
      }

      return React.createElement(
        Tooltip,
        _extends({ transitionName: transitionName,
          builtinPlacements: placements,
          overlay: this.props.title,
          visible: visible,
          onVisibleChange: this.onVisibleChange
        }, this.props),
        this.props.children
      );
    }
  });
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var Tabs = RC.Tabs;
  var _React = React;
  var cloneElement = _React.cloneElement;
  var Icon = UI.Icon;

  var AntTabs = (function (_React$Component) {
    _inherits(AntTabs, _React$Component);

    function AntTabs(props) {
      _classCallCheck(this, AntTabs);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntTabs).call(this, props));

      ['createNewTab', 'removeTab', 'handleChange'].forEach(function (method) {
        return _this[method] = _this[method].bind(_this);
      });
      return _this;
    }

    _createClass(AntTabs, [{
      key: 'createNewTab',
      value: function createNewTab(targetKey) {
        this.props.onEdit(targetKey, 'add');
      }
    }, {
      key: 'removeTab',
      value: function removeTab(targetKey, e) {
        e.stopPropagation();
        if (!targetKey) {
          return;
        }
        this.props.onEdit(targetKey, 'remove');
      }
    }, {
      key: 'handleChange',
      value: function handleChange(activeKey) {
        this.props.onChange(activeKey);
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames,
            _this2 = this;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var size = _props.size;
        var tabPosition = _props.tabPosition;
        var animation = _props.animation;
        var type = _props.type;
        var children = _props.children;
        var tabBarExtraContent = _props.tabBarExtraContent;

        var className = classNames((_classNames = {}, _defineProperty(_classNames, this.props.className, !!this.props.className), _defineProperty(_classNames, prefixCls + '-mini', size === 'small' || size === 'mini'), _defineProperty(_classNames, prefixCls + '-vertical', tabPosition === 'left' || tabPosition === 'right'), _defineProperty(_classNames, prefixCls + '-card', type.indexOf('card') >= 0), _defineProperty(_classNames, prefixCls + '-' + type, true), _classNames));
        if (tabPosition === 'left' || tabPosition === 'right' || type.indexOf('card') >= 0) {
          animation = null;
        }
        // only card type tabs can be added and closed
        if (type === 'editable-card') {
          children = children.map(function (child, index) {
            return cloneElement(child, {
              tab: React.createElement(
                'div',
                null,
                child.props.tab,
                React.createElement(Icon, { type: 'cross', onClick: _this2.removeTab.bind(_this2, child.key) })
              ),
              key: child.key || index
            });
          });
          // Add new tab handler
          tabBarExtraContent = React.createElement(
            'span',
            null,
            React.createElement(Icon, { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
            tabBarExtraContent
          );
        }
        return React.createElement(
          Tabs,
          _extends({}, this.props, {
            className: className,
            tabBarExtraContent: React.createElement(
              'div',
              { className: prefixCls + '-extra-content' },
              tabBarExtraContent
            ),
            onChange: this.handleChange,
            animation: animation }),
          children
        );
      }
    }]);

    return AntTabs;
  })(React.Component);

  AntTabs.defaultProps = {
    prefixCls: 'ant-tabs',
    animation: 'slide-horizontal',
    type: 'line', // or 'card' 'editable-card'
    onChange: function onChange() {},
    onEdit: function onEdit() {}
  };

  AntTabs.TabPane = Tabs.TabPane;
  UI.Tabs = AntTabs;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
  var Tooltip = RC.Tooltip;
  var _ref = _;
  var noop = _ref.noop;
  var Icon = UI.Icon;
  var Button = UI.Button;
  var getPlacements = UI.getPlacements;

  var placements = getPlacements();
  var prefixCls = 'ant-popover';
  var transitionNames = {
    top: 'zoom-down',
    bottom: 'zoom-up',
    left: 'zoom-right',
    right: 'zoom-left',
    topLeft: 'zoom-down',
    bottomLeft: 'zoom-up',
    leftTop: 'zoom-right',
    rightTop: 'zoom-left',
    topRight: 'zoom-down',
    bottomRight: 'zoom-up',
    leftBottom: 'zoom-right',
    rightBottom: 'zoom-left'
  };

  UI.Popconfirm = React.createClass({
    displayName: 'Popconfirm',
    getInitialState: function getInitialState() {
      return {
        visible: false
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        transitionName: '',
        placement: 'top',
        trigger: 'click',
        overlayStyle: {},
        onConfirm: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        onVisibleChange: function onVisibleChange() {}
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        this.setState({ visible: nextProps.visible });
      }
    },
    confirm: function confirm() {
      this.setVisible(false);
      this.props.onConfirm.call(this);
    },
    cancel: function cancel() {
      this.setVisible(false);
      this.props.onCancel.call(this);
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setVisible(visible);
    },
    setVisible: function setVisible(visible) {
      if (!('visible' in this.props)) {
        this.setState({ visible: visible });
      }
      this.props.onVisibleChange(visible);
    },
    render: function render() {
      var _props = this.props;
      var title = _props.title;
      var okText = _props.okText;
      var cancelText = _props.cancelText;
      var placement = _props.placement;
      var overlayStyle = _props.overlayStyle;
      var trigger = _props.trigger;

      var restProps = _objectWithoutProperties(_props, ['title', 'okText', 'cancelText', 'placement', 'overlayStyle', 'trigger']);

      var overlay = React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: prefixCls + '-inner-content' },
          React.createElement(
            'div',
            { className: prefixCls + '-message' },
            React.createElement(Icon, { type: 'exclamation-circle' }),
            React.createElement(
              'div',
              { className: prefixCls + '-message-title' },
              title
            )
          ),
          React.createElement(
            'div',
            { className: prefixCls + '-buttons' },
            React.createElement(
              Button,
              { onClick: this.cancel, type: 'ghost', size: 'small' },
              cancelText
            ),
            React.createElement(
              Button,
              { onClick: this.confirm, type: 'primary', size: 'small' },
              okText
            )
          )
        )
      );

      var transitionName = transitionNames[placement];

      return React.createElement(
        Tooltip,
        _extends({}, restProps, {
          placement: placement,
          builtinPlacements: placements,
          overlayStyle: overlayStyle,
          prefixCls: prefixCls,
          onVisibleChange: this.onVisibleChange,
          transitionName: transitionName,
          visible: this.state.visible,
          trigger: trigger,
          overlay: overlay }),
        this.props.children
      );
    }
  });
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var Upload = RC.Upload;
  var Animate = RC.Animate;
  var _ref = _;
  var assign = _ref.assign;
  var noop = _ref.noop;
  var Icon = UI.Icon;
  var Progress = UI.Progress;
  var Line = Progress.Line;

  var prefixCls = 'ant-upload';

  function getFileItem(file, fileList) {
    var matchWay = !file.uid ? 'byName' : 'byUid';
    var target = fileList.filter(function (item) {
      if (matchWay === 'byName') {
        return item.name === file.name;
      }
      return item.uid === file.uid;
    })[0];
    return target;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  var previewFile = function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  var UploadList = React.createClass({
    displayName: 'UploadList',
    getDefaultProps: function getDefaultProps() {
      return {
        listType: 'text', // or picture
        items: [],
        progressAttr: {
          strokeWidth: 3,
          showInfo: false
        }
      };
    },
    handleClose: function handleClose(file) {
      this.props.onRemove(file);
    },
    componentDidUpdate: function componentDidUpdate() {
      var _this = this;

      if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
        return;
      }
      this.props.items.forEach(function (file) {
        if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
          return;
        }
        /*eslint-disable */
        file.thumbUrl = '';
        /*eslint-enable */
        previewFile(file.originFileObj, function (previewDataUrl) {
          /*eslint-disable */
          file.thumbUrl = previewDataUrl;
          /*eslint-enable */
          _this.forceUpdate();
        });
      });
    },
    render: function render() {
      var _this2 = this,
          _classNames2;

      var list = this.props.items.map(function (file) {
        var _classNames;

        var progress = undefined;
        var icon = React.createElement(Icon, { type: 'paper-clip' });

        if (_this2.props.listType === 'picture' || _this2.props.listType === 'picture-card') {
          if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
            if (_this2.props.listType === 'picture-card') {
              icon = React.createElement(
                'div',
                { className: prefixCls + '-list-item-uploading-text' },
                '文件上传中'
              );
            } else {
              icon = React.createElement(Icon, { className: prefixCls + '-list-item-thumbnail', type: 'picture' });
            }
          } else {
            icon = React.createElement(
              'a',
              { className: prefixCls + '-list-item-thumbnail',
                href: file.url,
                target: '_blank' },
              React.createElement('img', { src: file.thumbUrl || file.url, alt: file.name })
            );
          }
        }

        if (file.status === 'uploading') {
          progress = React.createElement(
            'div',
            { className: prefixCls + '-list-item-progress' },
            React.createElement(Line, _extends({}, _this2.props.progressAttr, { percent: file.percent }))
          );
        }
        var infoUploadingClass = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-list-item', true), _defineProperty(_classNames, prefixCls + '-list-item-' + file.status, true), _classNames));
        return React.createElement(
          'div',
          { className: infoUploadingClass, key: file.uid },
          React.createElement(
            'div',
            { className: prefixCls + '-list-item-info' },
            icon,
            React.createElement(
              'span',
              { className: prefixCls + '-list-item-name' },
              file.name
            ),
            _this2.props.listType === 'picture-card' && file.status !== 'uploading' ? React.createElement(
              'span',
              null,
              React.createElement(
                'a',
                { href: file.url, target: '_blank', style: { pointerEvents: file.url ? '' : 'none' } },
                React.createElement(Icon, { type: 'eye-o' })
              ),
              React.createElement(Icon, { type: 'delete', onClick: _this2.handleClose.bind(_this2, file) })
            ) : React.createElement(Icon, { type: 'cross', onClick: _this2.handleClose.bind(_this2, file) })
          ),
          progress
        );
      });
      var listClassNames = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-list', true), _defineProperty(_classNames2, prefixCls + '-list-' + this.props.listType, true), _classNames2));
      return React.createElement(
        'div',
        { className: listClassNames },
        React.createElement(
          Animate,
          { transitionName: prefixCls + '-margin-top' },
          list
        )
      );
    }
  });

  function T() {
    return true;
  }

  // Fix IE file.status problem
  // via coping a new Object
  function fileToObject(file) {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.filename || file.name,
      size: file.size,
      type: file.type,
      uid: file.uid,
      response: file.response,
      error: file.error,
      percent: 0,
      originFileObj: file
    };
  }

  /**
   * 生成Progress percent: 0.1 -> 0.98
   *   - for ie
   */
  function genPercentAdd() {
    var k = 0.1;
    var i = 0.01;
    var end = 0.98;
    return function (s) {
      var start = s;
      if (start >= end) {
        return start;
      }

      start += k;
      k = k - i;
      if (k < 0.001) {
        k = 0.001;
      }
      return start * 100;
    };
  }

  var AntUpload = React.createClass({
    displayName: 'AntUpload',
    getInitialState: function getInitialState() {
      return {
        fileList: this.props.fileList || this.props.defaultFileList || [],
        dragState: 'drop'
      };
    },
    onStart: function onStart(file) {
      if (this.recentUploadStatus === false) return;

      var targetItem = undefined;
      var nextFileList = this.state.fileList.concat();
      if (file.length > 0) {
        targetItem = file.map(function (f) {
          var fileObject = fileToObject(f);
          fileObject.status = 'uploading';
          return fileObject;
        });
        nextFileList = nextFileList.concat(targetItem);
      } else {
        targetItem = fileToObject(file);
        targetItem.status = 'uploading';
        nextFileList.push(targetItem);
      }
      this.onChange({
        file: targetItem,
        fileList: nextFileList
      });
      // fix ie progress
      if (!window.FormData) {
        this.autoUpdateProgress(0, targetItem);
      }
    },
    autoUpdateProgress: function autoUpdateProgress(percent, file) {
      var _this3 = this;

      var getPercent = genPercentAdd();
      var curPercent = 0;
      this.progressTimer = setInterval(function () {
        curPercent = getPercent(curPercent);
        _this3.onProgress({
          percent: curPercent
        }, file);
      }, 200);
    },
    removeFile: function removeFile(file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      var index = fileList.indexOf(targetItem);
      if (index !== -1) {
        fileList.splice(index, 1);
        return fileList;
      }
      return null;
    },
    onSuccess: function onSuccess(response, file) {
      this.clearProgressTimer();
      // 服务器端需要返回标准 json 字符串
      // 否则视为失败
      try {
        if (typeof response === 'string') {
          JSON.parse(response);
        }
      } catch (e) {
        this.onError(new Error('No response'), response, file);
        return;
      }
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      // 之前已经删除
      if (targetItem) {
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
          file: targetItem,
          fileList: fileList
        });
      }
    },
    onProgress: function onProgress(e, file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      if (!targetItem) return;
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: targetItem,
        fileList: this.state.fileList
      });
    },
    onError: function onError(error, response, file) {
      this.clearProgressTimer();
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.handleRemove(targetItem);
    },
    beforeUpload: function beforeUpload(file) {
      this.recentUploadStatus = this.props.beforeUpload(file);
      return this.recentUploadStatus;
    },
    handleRemove: function handleRemove(file) {
      var fileList = this.removeFile(file);
      if (fileList) {
        this.onChange({
          file: file,
          fileList: fileList
        });
      }
    },
    handleManualRemove: function handleManualRemove(file) {
      /*eslint-disable */
      file.status = 'removed';
      /*eslint-enable */
      this.handleRemove(file);
    },
    onChange: function onChange(info) {
      this.setState({
        fileList: info.fileList
      });
      this.props.onChange(info);
    },
    getDefaultProps: function getDefaultProps() {
      return {
        type: 'select',
        // do not set
        // name: '',
        multiple: false,
        action: '',
        data: {},
        accept: '',
        onChange: noop,
        beforeUpload: T,
        showUploadList: true,
        listType: 'text', // or pictrue
        className: ''
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('fileList' in nextProps) {
        this.setState({
          fileList: nextProps.fileList || []
        });
      }
    },
    onFileDrop: function onFileDrop(e) {
      this.setState({
        dragState: e.type
      });
    },
    clearProgressTimer: function clearProgressTimer() {
      clearInterval(this.progressTimer);
    },
    render: function render() {
      var type = this.props.type || 'select';
      var props = assign({}, this.props, {
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        beforeUpload: this.beforeUpload
      });
      var uploadList = undefined;
      if (this.props.showUploadList) {
        uploadList = React.createElement(UploadList, { listType: this.props.listType,
          items: this.state.fileList,
          onRemove: this.handleManualRemove });
      }
      if (type === 'drag') {
        var dragUploadingClass = this.state.fileList.some(function (file) {
          return file.status === 'uploading';
        }) ? prefixCls + '-drag-uploading' : '';
        var draggingClass = this.state.dragState === 'dragover' ? prefixCls + '-drag-hover' : '';
        return React.createElement(
          'span',
          { className: this.props.className },
          React.createElement(
            'div',
            { className: prefixCls + ' ' + prefixCls + '-drag ' + dragUploadingClass + ' ' + draggingClass,
              onDrop: this.onFileDrop,
              onDragOver: this.onFileDrop,
              onDragLeave: this.onFileDrop },
            React.createElement(
              Upload,
              props,
              React.createElement(
                'div',
                { className: prefixCls + '-drag-container' },
                this.props.children
              )
            )
          ),
          uploadList
        );
      } else if (type === 'select') {
        var _classNames3;

        var uploadButtonCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls, true), _defineProperty(_classNames3, prefixCls + '-select', true), _defineProperty(_classNames3, prefixCls + '-select-' + this.props.listType, true), _classNames3));
        if (this.props.listType === 'picture-card') {
          return React.createElement(
            'span',
            { className: this.props.className },
            uploadList,
            React.createElement(
              'div',
              { className: uploadButtonCls },
              React.createElement(
                Upload,
                props,
                this.props.children
              )
            )
          );
        }
        return React.createElement(
          'span',
          { className: this.props.className },
          React.createElement(
            'div',
            { className: uploadButtonCls },
            React.createElement(
              Upload,
              props,
              this.props.children
            )
          ),
          uploadList
        );
      }
    }
  });

  AntUpload.Dragger = React.createClass({
    displayName: 'Dragger',
    render: function render() {
      return React.createElement(AntUpload, _extends({}, this.props, { type: 'drag', style: { height: this.props.height } }));
    }
  });
  UI.Upload = AntUpload;
})(Smart.UI, Smart.RC);
"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var Animate = RC.Animate;
  var Icon = UI.Icon;

  var AntTag = (function (_React$Component) {
    _inherits(AntTag, _React$Component);

    function AntTag(props) {
      _classCallCheck(this, AntTag);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntTag).call(this, props));

      _this.state = {
        closing: false,
        closed: false
      };
      return _this;
    }

    _createClass(AntTag, [{
      key: "close",
      value: function close(e) {
        var dom = ReactDOM.findDOMNode(this);
        dom.style.width = dom.offsetWidth + "px";
        // It's Magic Code, don't know why
        dom.style.width = dom.offsetWidth + "px";
        this.setState({
          closing: true
        });
        this.props.onClose(e);
      }
    }, {
      key: "animationEnd",
      value: function animationEnd(key, existed) {
        if (!existed) {
          this.setState({
            closed: true,
            closing: false
          });
          this.props.afterClose();
        }
      }
    }, {
      key: "render",
      value: function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var closable = _props.closable;
        var color = _props.color;
        var className = _props.className;
        var children = _props.children;

        var restProps = _objectWithoutProperties(_props, ["prefixCls", "closable", "color", "className", "children"]);

        var close = closable ? React.createElement(Icon, { type: "cross", onClick: this.close.bind(this) }) : '';
        var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + "-" + color, !!color), _defineProperty(_classNames, prefixCls + "-close", this.state.closing), _defineProperty(_classNames, className, !!className), _classNames));
        return React.createElement(
          Animate,
          { component: "",
            showProp: "data-show",
            transitionName: prefixCls + "-zoom",
            transitionAppear: true,
            onEnd: this.animationEnd.bind(this) },
          this.state.closed ? null : React.createElement(
            "div",
            _extends({ "data-show": !this.state.closing }, restProps, { className: classString }),
            React.createElement(
              "span",
              { className: prefixCls + "-text" },
              children
            ),
            close
          )
        );
      }
    }]);

    return AntTag;
  })(React.Component);

  AntTag.defaultProps = {
    prefixCls: 'ant-tag',
    closable: false,
    onClose: function onClose() {},
    afterClose: function afterClose() {}
  };

  UI.Tag = AntTag;
})(Smart.UI, Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var isCssAnimationSupported = RC.cssAnimation.isCssAnimationSupported;

  var AntSpin = React.createClass({
    displayName: 'AntSpin',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-spin',
        spining: true
      };
    },

    propTypes: {
      className: React.PropTypes.string,
      size: React.PropTypes.oneOf(['small', 'default', 'large'])
    },

    isNestedPattern: function isNestedPattern() {
      return !!(this.props && this.props.children);
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var className = _props.className;
      var size = _props.size;
      var prefixCls = _props.prefixCls;

      var spinClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-spining', this.props.spining), _classNames));

      var spinElement = undefined;
      if (!isCssAnimationSupported) {
        // not support for animation, just use text instead
        spinElement = React.createElement(
          'div',
          { className: spinClassName },
          '加载中...'
        );
      } else {
        spinElement = React.createElement(
          'div',
          { className: spinClassName },
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-first' }),
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-second' }),
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-third' })
        );
      }

      if (this.isNestedPattern()) {
        return React.createElement(
          'div',
          { className: this.props.spining ? prefixCls + '-nested-loading' : '' },
          spinElement,
          React.createElement(
            'div',
            { className: prefixCls + '-container' },
            this.props.children
          )
        );
      }
      return spinElement;
    }
  });
  UI.Spin = AntSpin;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var Tooltip = RC.Tooltip;
  var getPlacements = UI.getPlacements;

  var placements = getPlacements();
  var prefixCls = 'ant-popover';

  var Popover = React.createClass({
    displayName: 'Popover',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: prefixCls,
        placement: 'top',
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        overlayStyle: {}
      };
    },
    render: function render() {
      var transitionName = ({
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      })[this.props.placement];

      return React.createElement(
        Tooltip,
        _extends({ transitionName: transitionName,
          builtinPlacements: placements,
          ref: 'tooltip'
        }, this.props, {
          overlay: this.getOverlay() }),
        this.props.children
      );
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.refs.tooltip.getPopupDomNode();
    },
    getOverlay: function getOverlay() {
      return React.createElement(
        'div',
        null,
        this.props.title && React.createElement(
          'div',
          { className: prefixCls + '-title' },
          this.props.title
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-inner-content' },
          this.props.overlay
        )
      );
    }
  });

  UI.Popover = Popover;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var Pagination = RC.Pagination;
  var Locale = RC.Locale;
  var Select = UI.Select;

  var MiniSelect = (function (_React$Component) {
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
  })(React.Component);

  MiniSelect.Option = Select.Option;

  var AntPagination = (function (_React$Component2) {
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
  })(React.Component);

  AntPagination.defaultProps = {
    locale: Locale.Pagination,
    className: '',
    prefixCls: 'ant-pagination'
  };

  UI.Pagination = AntPagination;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var objectAssign = _.assign;
  var Table = RC.Table;
  var classNames = RC.classNames;
  var Menu = RC.Menu;
  var SubMenu = RC.SubMenu;
  var MenuItem = RC.MenuItem;
  var Locale = RC.Locale;
  var Radio = UI.Radio;
  var Pagination = UI.Pagination;
  var Icon = UI.Icon;
  var Spin = UI.Spin;
  var Dropdown = UI.Dropdown;
  var Checkbox = UI.Checkbox;

  function flatArray() {
    var data = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var childrenName = arguments.length <= 1 || arguments[1] === undefined ? 'children' : arguments[1];

    var result = [];
    var loop = function loop(array) {
      array.forEach(function (item) {
        var newItem = _extends({}, item);
        delete newItem[childrenName];
        result.push(newItem);
        if (item[childrenName] && item[childrenName].length > 0) {
          loop(item[childrenName]);
        }
      });
    };
    loop(data);
    return result;
  }

  var rownumberColumn = {
    title: '',
    dataIndex: 'id',
    className: 'cell-rownumber',
    render: function render(id, row, index) {
      return React.createElement(
        'span',
        null,
        index + 1
      );
    }
  };

  var defaultLocale = Locale.Table;

  var FilterMenu = React.createClass({
    displayName: 'FilterMenu',
    getInitialState: function getInitialState() {
      return {
        selectedKeys: this.props.selectedKeys,
        keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
        visible: false
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      this.setState({
        selectedKeys: nextProps.selectedKeys
      });
    },
    getDefaultProps: function getDefaultProps() {
      return {
        handleFilter: function handleFilter() {},

        column: null
      };
    },
    setSelectedKeys: function setSelectedKeys(_ref2) {
      var selectedKeys = _ref2.selectedKeys;

      this.setState({ selectedKeys: selectedKeys });
    },
    handleClearFilters: function handleClearFilters() {
      this.setState({
        selectedKeys: []
      }, this.handleConfirm);
    },
    handleConfirm: function handleConfirm() {
      this.setState({
        visible: false
      });
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setState({
        visible: visible
      });
      if (!visible) {
        this.props.confirmFilter(this.props.column, this.state.selectedKeys);
      }
    },
    renderMenuItem: function renderMenuItem(item) {
      return React.createElement(
        MenuItem,
        { key: item.value },
        React.createElement(Checkbox, { checked: this.state.selectedKeys.indexOf(item.value) >= 0 }),
        item.text
      );
    },
    renderMenus: function renderMenus(items) {
      var _this = this;

      var menuItems = items.map(function (item) {
        if (item.children && item.children.length > 0) {
          var _ret = (function () {
            var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;
            var containSelected = Object.keys(keyPathOfSelectedItem).some(function (key) {
              var keyPath = keyPathOfSelectedItem[key];
              return keyPath.indexOf(item.value) >= 0;
            });
            var subMenuCls = containSelected ? 'ant-dropdown-submenu-contain-selected' : '';
            return {
              v: React.createElement(
                SubMenu,
                { title: item.text, className: subMenuCls, key: item.value },
                item.children.map(function (child) {
                  return _this.renderMenuItem(child);
                })
              )
            };
          })();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return _this.renderMenuItem(item);
      });
      return menuItems;
    },
    handleMenuItemClick: function handleMenuItemClick(info) {
      if (info.keyPath.length <= 1) {
        return;
      }
      var keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
      if (this.state.selectedKeys.indexOf(info.key) >= 0) {
        // deselect SubMenu child
        delete keyPathOfSelectedItem[info.key];
      } else {
        // select SubMenu child
        keyPathOfSelectedItem[info.key] = info.keyPath;
      }
      this.setState({ keyPathOfSelectedItem: keyPathOfSelectedItem });
    },
    render: function render() {
      var _props = this.props;
      var column = _props.column;
      var locale = _props.locale;
      // default multiple selection in filter dropdown

      var multiple = true;
      if ('filterMultiple' in column) {
        multiple = column.filterMultiple;
      }
      var menus = React.createElement(
        'div',
        { className: 'ant-table-filter-dropdown' },
        React.createElement(
          Menu,
          { multiple: multiple,
            onClick: this.handleMenuItemClick,
            prefixCls: 'ant-dropdown-menu',
            onSelect: this.setSelectedKeys,
            onDeselect: this.setSelectedKeys,
            selectedKeys: this.state.selectedKeys },
          this.renderMenus(column.filters)
        ),
        React.createElement(
          'div',
          { className: 'ant-table-filter-dropdown-btns' },
          React.createElement(
            'a',
            { className: 'ant-table-filter-dropdown-link confirm',
              onClick: this.handleConfirm },
            locale.filterConfirm
          ),
          React.createElement(
            'a',
            { className: 'ant-table-filter-dropdown-link clear',
              onClick: this.handleClearFilters },
            locale.filterReset
          )
        )
      );

      var dropdownSelectedClass = '';
      if (this.props.selectedKeys.length > 0) {
        dropdownSelectedClass = 'ant-table-filter-selected';
      }

      return React.createElement(
        Dropdown,
        { trigger: ['click'],
          overlay: menus,
          visible: this.state.visible,
          onVisibleChange: this.onVisibleChange,
          closeOnSelect: false },
        React.createElement(Icon, { title: locale.filterTitle, type: 'filter', className: dropdownSelectedClass })
      );
    }
  });

  var defaultPagination = {
    pageSize: 10,
    current: 1,
    onChange: noop,
    onShowSizeChange: noop
  };

  var AntTable = React.createClass({
    displayName: 'AntTable',
    getInitialState: function getInitialState() {
      return {
        // 减少状态
        selectedRowKeys: this.props.selectedRowKeys || [],
        filters: {},
        selectionDirty: false,
        sortColumn: '',
        sortOrder: '',
        sorter: null,
        radioIndex: null,
        pagination: this.hasPagination() ? objectAssign({
          size: this.props.size
        }, defaultPagination, this.props.pagination) : {}
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        dataSource: [],
        prefixCls: 'ant-table',
        useFixedHeader: false,
        rowSelection: null,
        className: '',
        size: 'large',
        loading: false,
        bordered: false,
        indentSize: 20,
        onChange: noop,
        locale: {},
        rownumbers: false
      };
    },

    propTypes: {
      dataSource: React.PropTypes.array,
      prefixCls: React.PropTypes.string,
      useFixedHeader: React.PropTypes.bool,
      rowSelection: React.PropTypes.object,
      className: React.PropTypes.string,
      size: React.PropTypes.string,
      loading: React.PropTypes.bool,
      bordered: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      locale: React.PropTypes.object,
      rownumbers: React.PropTypes.bool
    },

    getDefaultSelection: function getDefaultSelection() {
      var _this2 = this;

      if (!this.props.rowSelection || !this.props.rowSelection.getCheckboxProps) {
        return [];
      }
      return this.getFlatCurrentPageData().filter(function (item) {
        return _this2.props.rowSelection.getCheckboxProps(item).defaultChecked;
      }).map(function (record, rowIndex) {
        return _this2.getRecordKey(record, rowIndex);
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('pagination' in nextProps && nextProps.pagination !== false) {
        this.setState({
          pagination: objectAssign({}, defaultPagination, this.state.pagination, nextProps.pagination)
        });
      }
      // dataSource 的变化会清空选中项
      if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
        this.setState({
          selectionDirty: false
        });
      }
      if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
        this.setState({
          selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
        });
      }
    },
    setSelectedRowKeys: function setSelectedRowKeys(selectedRowKeys) {
      var _this3 = this;

      if (this.props.rowSelection && !('selectedRowKeys' in this.props.rowSelection)) {
        this.setState({ selectedRowKeys: selectedRowKeys });
      }
      if (this.props.rowSelection && this.props.rowSelection.onChange) {
        var data = this.getFlatCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this3.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onChange(selectedRowKeys, selectedRows);
      }
    },
    hasPagination: function hasPagination() {
      return this.props.pagination !== false;
    },
    toggleSortOrder: function toggleSortOrder(order, column) {
      var _props2;

      var sortColumn = this.state.sortColumn;
      var sortOrder = this.state.sortOrder;
      var sorter = undefined;
      // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
      var isSortColumn = this.isSortColumn(column);
      if (!isSortColumn) {
        // 当前列未排序
        sortOrder = order;
        sortColumn = column;
      } else {
        // 当前列已排序
        if (sortOrder === order) {
          // 切换为未排序状态
          sortOrder = '';
          sortColumn = null;
        } else {
          // 切换为排序状态
          sortOrder = order;
        }
      }
      if (typeof column.sorter === 'function') {
        sorter = function sorter(a, b) {
          var result = column.sorter(a, b);
          if (result !== 0) {
            return sortOrder === 'descend' ? -result : result;
          }
          return a.index - b.index;
        };
      }
      var newState = {
        sortOrder: sortOrder,
        sortColumn: sortColumn,
        sorter: sorter
      };
      this.setState(newState);
      (_props2 = this.props).onChange.apply(_props2, _toConsumableArray(this.prepareParamsArguments(_extends({}, this.state, newState))));
    },
    handleFilter: function handleFilter(column, nextFilters) {
      var _this4 = this,
          _props3;

      var filters = objectAssign({}, this.state.filters, _defineProperty({}, this.getColumnKey(column), nextFilters));
      // Remove filters not in current columns
      var currentColumnKeys = this.props.columns.map(function (c) {
        return _this4.getColumnKey(c);
      });
      Object.keys(filters).forEach(function (columnKey) {
        if (currentColumnKeys.indexOf(columnKey) < 0) {
          delete filters[columnKey];
        }
      });
      var newState = {
        selectionDirty: false,
        filters: filters
      };
      this.setState(newState);
      this.setSelectedRowKeys([]);
      (_props3 = this.props).onChange.apply(_props3, _toConsumableArray(this.prepareParamsArguments(_extends({}, this.state, newState))));
    },
    handleSelect: function handleSelect(record, rowIndex, e) {
      var _this5 = this;

      var checked = e.target.checked;
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var key = this.getRecordKey(record, rowIndex);
      if (checked) {
        selectedRowKeys.push(this.getRecordKey(record, rowIndex));
      } else {
        selectedRowKeys = selectedRowKeys.filter(function (i) {
          return key !== i;
        });
      }
      this.setState({
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelect) {
        var data = this.getFlatCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this5.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelect(record, checked, selectedRows);
      }
    },
    handleRadioSelect: function handleRadioSelect(record, rowIndex, e) {
      var _this6 = this;

      var checked = e.target.checked;
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var key = this.getRecordKey(record, rowIndex);
      selectedRowKeys = [key];
      this.setState({
        radioIndex: key,
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelect) {
        var data = this.getFlatCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this6.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelect(record, checked, selectedRows);
      }
    },
    handleSelectAllRow: function handleSelectAllRow(e) {
      var _this7 = this;

      var checked = e.target.checked;
      var data = this.getFlatCurrentPageData();
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var changableRowKeys = data.filter(function (item) {
        return !_this7.props.rowSelection.getCheckboxProps || !_this7.props.rowSelection.getCheckboxProps(item).disabled;
      }).map(function (item, i) {
        return _this7.getRecordKey(item, i);
      });

      // 记录变化的列
      var changeRowKeys = [];
      if (checked) {
        changableRowKeys.forEach(function (key) {
          if (selectedRowKeys.indexOf(key) < 0) {
            selectedRowKeys.push(key);
            changeRowKeys.push(key);
          }
        });
      } else {
        changableRowKeys.forEach(function (key) {
          if (selectedRowKeys.indexOf(key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
            changeRowKeys.push(key);
          }
        });
      }
      this.setState({
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelectAll) {
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this7.getRecordKey(row, i)) >= 0;
        });
        var changeRows = data.filter(function (row, i) {
          return changeRowKeys.indexOf(_this7.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelectAll(checked, selectedRows, changeRows);
      }
    },
    handlePageChange: function handlePageChange(current) {
      var _props4;

      var pagination = objectAssign({}, this.state.pagination);
      if (current) {
        pagination.current = current;
      } else {
        pagination.current = pagination.current || 1;
      }
      pagination.onChange(pagination.current, pagination.pageSize);

      var newState = {
        selectionDirty: false,
        pagination: pagination
      };
      this.setState(newState);
      (_props4 = this.props).onChange.apply(_props4, _toConsumableArray(this.prepareParamsArguments(_extends({}, this.state, newState))));
    },
    onRadioChange: function onRadioChange(ev) {
      this.setState({
        radioIndex: ev.target.value
      });
    },
    renderSelectionRadio: function renderSelectionRadio(value, record, index) {
      var rowIndex = this.getRecordKey(record, index); // 从 1 开始
      var props = {};
      if (this.props.rowSelection.getCheckboxProps) {
        props = this.props.rowSelection.getCheckboxProps.call(this, record);
      }
      var checked = undefined;
      if (this.state.selectionDirty) {
        checked = this.state.radioIndex === rowIndex;
      } else {
        checked = this.state.radioIndex === rowIndex || this.getDefaultSelection().indexOf(rowIndex) >= 0;
      }
      return React.createElement(Radio, { disabled: props.disabled,
        onChange: this.handleRadioSelect.bind(this, record, rowIndex),
        value: rowIndex, checked: checked });
    },
    renderSelectionCheckBox: function renderSelectionCheckBox(value, record, index) {
      var rowIndex = this.getRecordKey(record, index); // 从 1 开始
      var checked = undefined;
      if (this.state.selectionDirty) {
        checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
      } else {
        checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0 || this.getDefaultSelection().indexOf(rowIndex) >= 0;
      }
      var props = {};
      if (this.props.rowSelection.getCheckboxProps) {
        props = this.props.rowSelection.getCheckboxProps.call(this, record);
      }
      return React.createElement(Checkbox, { checked: checked, disabled: props.disabled,
        onChange: this.handleSelect.bind(this, record, rowIndex) });
    },
    getRecordKey: function getRecordKey(record, index) {
      if (this.props.rowKey) {
        return this.props.rowKey(record, index);
      }
      return record.key || index;
    },
    renderRowSelection: function renderRowSelection() {
      var _this8 = this;

      var columns = this.props.columns.concat();
      if (this.props.rowSelection) {
        var data = this.getFlatCurrentPageData().filter(function (item) {
          if (_this8.props.rowSelection.getCheckboxProps) {
            return !_this8.props.rowSelection.getCheckboxProps(item).disabled;
          }
          return true;
        });
        var checked = undefined;
        if (!data.length) {
          checked = false;
        } else {
          checked = this.state.selectionDirty ? data.every(function (item, i) {
            return _this8.state.selectedRowKeys.indexOf(_this8.getRecordKey(item, i)) >= 0;
          }) : data.every(function (item, i) {
            return _this8.state.selectedRowKeys.indexOf(_this8.getRecordKey(item, i)) >= 0;
          }) || data.every(function (item) {
            return _this8.props.rowSelection.getCheckboxProps && _this8.props.rowSelection.getCheckboxProps(item).defaultChecked;
          });
        }
        var selectionColumn = undefined;
        if (this.props.rowSelection.type === 'radio') {
          selectionColumn = {
            key: 'selection-column',
            render: this.renderSelectionRadio,
            className: 'ant-table-selection-column'
          };
        } else {
          var checkboxAllDisabled = data.every(function (item) {
            return _this8.props.rowSelection.getCheckboxProps && _this8.props.rowSelection.getCheckboxProps(item).disabled;
          });
          var checkboxAll = React.createElement(Checkbox, { checked: checked,
            disabled: checkboxAllDisabled,
            onChange: this.handleSelectAllRow });
          selectionColumn = {
            key: 'selection-column',
            title: checkboxAll,
            render: this.renderSelectionCheckBox,
            className: 'ant-table-selection-column'
          };
        }
        if (columns[0] && columns[0].key === 'selection-column') {
          columns[0] = selectionColumn;
        } else {
          columns.unshift(selectionColumn);
        }
      }
      return columns;
    },
    getColumnKey: function getColumnKey(column, index) {
      return column.key || column.dataIndex || index;
    },
    isSortColumn: function isSortColumn(column) {
      if (!column || !this.state.sortColumn) {
        return false;
      }
      var colKey = this.getColumnKey(column);
      var isSortColumn = this.getColumnKey(this.state.sortColumn) === colKey;
      return isSortColumn;
    },
    renderColumnsDropdown: function renderColumnsDropdown(columns) {
      var _this9 = this;

      var locale = objectAssign({}, defaultLocale, this.props.locale);
      return columns.map(function (originColumn, i) {
        var column = objectAssign({}, originColumn);
        var key = _this9.getColumnKey(column, i);
        var filterDropdown = undefined;
        var sortButton = undefined;
        if (column.filters && column.filters.length > 0) {
          var colFilters = _this9.state.filters[key] || [];
          filterDropdown = React.createElement(FilterDropdown, { locale: locale, column: column,
            selectedKeys: colFilters,
            confirmFilter: _this9.handleFilter });
        }
        if (column.sorter) {
          var isSortColumn = _this9.isSortColumn(column);
          if (isSortColumn) {
            column.className = column.className || '';
            if (_this9.state.sortOrder) {
              column.className += ' ant-table-column-sort';
            }
          }
          var isAscend = isSortColumn && _this9.state.sortOrder === 'ascend';
          var isDescend = isSortColumn && _this9.state.sortOrder === 'descend';
          sortButton = React.createElement(
            'div',
            { className: 'ant-table-column-sorter' },
            React.createElement(
              'span',
              { className: 'ant-table-column-sorter-up ' + (isAscend ? 'on' : 'off'),
                title: '↑',
                onClick: _this9.toggleSortOrder.bind(_this9, 'ascend', column) },
              React.createElement(Icon, { type: 'caret-up' })
            ),
            React.createElement(
              'span',
              { className: 'ant-table-column-sorter-down ' + (isDescend ? 'on' : 'off'),
                title: '↓',
                onClick: _this9.toggleSortOrder.bind(_this9, 'descend', column) },
              React.createElement(Icon, { type: 'caret-down' })
            )
          );
        }
        column.title = React.createElement(
          'span',
          null,
          column.title,
          sortButton,
          filterDropdown
        );
        return column;
      });
    },
    handleShowSizeChange: function handleShowSizeChange(current, pageSize) {
      var _props5;

      var pagination = this.state.pagination;
      pagination.onShowSizeChange(current, pageSize);
      var nextPagination = _extends({}, pagination, { pageSize: pageSize, current: current });
      this.setState({ pagination: nextPagination });
      (_props5 = this.props).onChange.apply(_props5, _toConsumableArray(this.prepareParamsArguments(_extends({}, this.state, {
        pagination: nextPagination
      }))));
    },
    renderPagination: function renderPagination() {
      // 强制不需要分页
      if (!this.hasPagination()) {
        return null;
      }
      var classString = classNames({
        'ant-table-pagination': true,
        mini: this.props.size === 'middle' || this.props.size === 'small'
      });
      var total = this.state.pagination.total || this.getLocalData().length;
      var pageSize = this.state.pagination.pageSize;
      return total > 0 ? React.createElement(Pagination, _extends({}, this.state.pagination, {
        className: classString,
        onChange: this.handlePageChange,
        total: total,
        pageSize: pageSize,
        onShowSizeChange: this.handleShowSizeChange })) : null;
    },
    prepareParamsArguments: function prepareParamsArguments(state) {
      // 准备筛选、排序、分页的参数
      var pagination = state.pagination;
      var filters = state.filters;
      var sorter = {};
      if (state.sortColumn && state.sortOrder && state.sortColumn.dataIndex) {
        sorter.field = state.sortColumn.dataIndex;
        sorter.order = state.sortOrder;
      }
      return [pagination, filters, sorter];
    },
    findColumn: function findColumn(myKey) {
      var _this10 = this;

      return this.props.columns.filter(function (c) {
        return _this10.getColumnKey(c) === myKey;
      })[0];
    },
    getCurrentPageData: function getCurrentPageData() {
      var data = this.getLocalData();
      var current = undefined;
      var pageSize = undefined;
      var state = this.state;
      // 如果没有分页的话，默认全部展示
      if (!this.hasPagination()) {
        pageSize = Number.MAX_VALUE;
        current = 1;
      } else {
        pageSize = state.pagination.pageSize;
        current = state.pagination.current;
      }
      // 分页
      // ---
      // 当数据量少于等于每页数量时，直接设置数据
      // 否则进行读取分页数据
      if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
        data = data.filter(function (item, i) {
          return i >= (current - 1) * pageSize && i < current * pageSize;
        });
      }
      return data;
    },
    getFlatCurrentPageData: function getFlatCurrentPageData() {
      return flatArray(this.getCurrentPageData());
    },
    getLocalData: function getLocalData() {
      var _this11 = this;

      var state = this.state;
      var data = this.props.dataSource || [];
      // 排序
      if (state.sortOrder && state.sorter) {
        data = data.slice(0);
        for (var i = 0; i < data.length; i++) {
          data[i].index = i;
        }
        data = data.sort(state.sorter);
      }
      // 筛选
      if (state.filters) {
        Object.keys(state.filters).forEach(function (columnKey) {
          var col = _this11.findColumn(columnKey);
          if (!col) {
            return;
          }
          var values = state.filters[columnKey] || [];
          if (values.length === 0) {
            return;
          }
          data = col.onFilter ? data.filter(function (record) {
            return values.some(function (v) {
              return col.onFilter(v, record);
            });
          }) : data;
        });
      }
      return data;
    },
    render: function render() {
      var _classNames;

      var data = this.getCurrentPageData();
      var columns = this.renderRowSelection();
      //行编号
      if (this.props.rownumbers) {
        columns.unshift(rownumberColumn);
      }
      ///
      var expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
      var locale = objectAssign({}, defaultLocale, this.props.locale);

      var classString = classNames((_classNames = {}, _defineProperty(_classNames, 'ant-table-' + this.props.size, true), _defineProperty(_classNames, 'ant-table-bordered', this.props.bordered), _defineProperty(_classNames, this.props.className, !!this.props.className), _classNames));

      columns = this.renderColumnsDropdown(columns);
      columns = columns.map(function (column, i) {
        var newColumn = objectAssign({}, column);
        newColumn.key = newColumn.key || newColumn.dataIndex || i;
        return newColumn;
      });
      var emptyText = undefined;
      var emptyClass = '';
      if (!data || data.length === 0) {
        emptyText = React.createElement(
          'div',
          { className: 'ant-table-placeholder' },
          React.createElement(Icon, { type: 'frown' }),
          locale.emptyText
        );
        emptyClass = ' ant-table-empty';
      }

      var table = React.createElement(
        'div',
        null,
        React.createElement(Table, _extends({}, this.props, {
          data: data,
          columns: columns,
          className: classString,
          expandIconColumnIndex: columns[0] && columns[0].key === 'selection-column' ? 1 : 0,
          expandIconAsCell: expandIconAsCell })),
        emptyText
      );
      if (this.props.loading) {
        // if there is no pagination or no data,
        // the height of spin should decrease by half of pagination
        var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? 'ant-table-with-pagination' : 'ant-table-without-pagination';
        var spinClassName = paginationPatchClass + ' ant-table-spin-holder';
        table = React.createElement(
          Spin,
          { className: spinClassName },
          table
        );
      }
      return React.createElement(
        'div',
        { className: 'clearfix' + emptyClass },
        table,
        this.renderPagination()
      );
    }
  });

  UI.Table = AntTable;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Steps = RC.Steps;

  var AntSteps = React.createClass({
    displayName: 'AntSteps',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-steps',
        iconPrefix: 'ant',
        size: 'default',
        maxDescriptionWidth: 100,
        current: 0
      };
    },
    render: function render() {
      var maxDescriptionWidth = this.props.maxDescriptionWidth;
      if (this.props.direction === 'vertical') {
        maxDescriptionWidth = 'auto';
      }
      return React.createElement(
        Steps,
        { size: this.props.size,
          current: this.props.current,
          direction: this.props.direction,
          iconPrefix: this.props.iconPrefix,
          maxDescriptionWidth: maxDescriptionWidth,
          prefixCls: this.props.prefixCls },
        this.props.children
      );
    }
  });

  AntSteps.Step = Steps.Step;

  UI.Steps = AntSteps;
})(Smart.UI, Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var classNames = RC.classNames;

  var TimelineItem = React.createClass({
    displayName: 'TimelineItem',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-timeline',
        color: 'blue',
        last: false,
        pending: false
      };
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var color = _props.color;
      var last = _props.last;
      var children = _props.children;
      var pending = _props.pending;

      var itemClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-last', last), _defineProperty(_classNames, prefixCls + '-item-pending', pending), _classNames));
      return React.createElement(
        'li',
        { className: itemClassName },
        React.createElement('div', { className: prefixCls + '-item-tail' }),
        React.createElement('div', { className: prefixCls + '-item-head ' + prefixCls + '-item-head-' + color }),
        React.createElement(
          'div',
          { className: prefixCls + '-item-content' },
          children
        )
      );
    }
  });

  var Timeline = React.createClass({
    displayName: 'Timeline',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-timeline'
      };
    },
    render: function render() {
      var _classNames2;

      var _props2 = this.props;
      var prefixCls = _props2.prefixCls;
      var children = _props2.children;
      var pending = _props2.pending;

      var pendingNode = typeof pending === 'boolean' ? null : pending;
      var className = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls, true), _defineProperty(_classNames2, prefixCls + '-pending', !!pending), _classNames2));
      return React.createElement(
        'ul',
        { className: className },
        React.Children.map(children, function (ele, idx) {
          return React.cloneElement(ele, {
            last: idx === children.length - 1
          });
        }),
        !!pending ? React.createElement(
          TimelineItem,
          { pending: !!pending },
          pendingNode
        ) : null
      );
    }
  });

  Timeline.Item = TimelineItem;
  UI.Timeline = Timeline;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export this package's api
+(function (UI, RC) {
	var Cascader = RC.Cascader;
	var arrayTreeFilter = RC.arrayTreeFilter;
	var classNames = RC.classNames;
	var Input = UI.Input;
	var Icon = UI.Icon;

	var AntCascader = (function (_React$Component) {
		_inherits(AntCascader, _React$Component);

		function AntCascader(props) {
			_classCallCheck(this, AntCascader);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntCascader).call(this, props));

			_this.state = {
				value: props.value || props.defaultValue || [],
				popupVisible: false
			};
			['handleChange', 'handlePopupVisibleChange', 'setValue', 'getLabel', 'clearSelection'].forEach(function (method) {
				return _this[method] = _this[method].bind(_this);
			});
			return _this;
		}

		_createClass(AntCascader, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('value' in nextProps) {
					this.setState({ value: nextProps.value || [] });
				}
			}
		}, {
			key: 'handleChange',
			value: function handleChange(value, selectedOptions) {
				this.setValue(value, selectedOptions);
			}
		}, {
			key: 'handlePopupVisibleChange',
			value: function handlePopupVisibleChange(popupVisible) {
				this.setState({ popupVisible: popupVisible });
				this.props.onPopupVisibleChange(popupVisible);
			}
		}, {
			key: 'setValue',
			value: function setValue(value) {
				var selectedOptions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

				if (!('value' in this.props)) {
					this.setState({ value: value });
				}
				this.props.onChange(value, selectedOptions);
			}
		}, {
			key: 'getLabel',
			value: function getLabel() {
				var _this2 = this;

				var _props = this.props;
				var options = _props.options;
				var displayRender = _props.displayRender;

				var label = arrayTreeFilter(options, function (o, level) {
					return o.value === _this2.state.value[level];
				}).map(function (o) {
					return o.label;
				});
				return displayRender(label);
			}
		}, {
			key: 'clearSelection',
			value: function clearSelection(e) {
				e.preventDefault();
				e.stopPropagation();
				this.setValue([]);
				this.setState({ popupVisible: false });
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames, _classNames2;

				var _props2 = this.props;
				var prefixCls = _props2.prefixCls;
				var children = _props2.children;
				var placeholder = _props2.placeholder;
				var size = _props2.size;
				var disabled = _props2.disabled;
				var className = _props2.className;
				var style = _props2.style;
				var allowClear = _props2.allowClear;

				var otherProps = _objectWithoutProperties(_props2, ['prefixCls', 'children', 'placeholder', 'size', 'disabled', 'className', 'style', 'allowClear']);

				var sizeCls = classNames({
					'ant-input-lg': size === 'large',
					'ant-input-sm': size === 'small'
				});
				var clearIcon = allowClear && !disabled && this.state.value.length > 0 ? React.createElement(Icon, { type: 'cross-circle',
					className: prefixCls + '-picker-clear',
					onClick: this.clearSelection }) : null;
				var arrowCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-picker-arrow', true), _defineProperty(_classNames, prefixCls + '-picker-arrow-expand', this.state.popupVisible), _classNames));
				var pickerCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-picker', true), _defineProperty(_classNames2, prefixCls + '-picker-disabled', disabled), _classNames2));

				// Fix bug of https://github.com/facebook/react/pull/5004
				delete otherProps.onChange;
				return React.createElement(
					Cascader,
					_extends({}, this.props, {
						value: this.state.value,
						popupVisible: this.state.popupVisible,
						onPopupVisibleChange: this.handlePopupVisibleChange,
						onChange: this.handleChange }),
					children || React.createElement(
						'span',
						{
							style: style,
							className: pickerCls },
						React.createElement(Input, _extends({}, otherProps, {
							placeholder: placeholder,
							className: prefixCls + '-input ant-input ' + sizeCls,
							style: { width: '100%' },
							value: this.getLabel(),
							disabled: disabled,
							readOnly: true })),
						clearIcon,
						React.createElement(Icon, { type: 'down', className: arrowCls })
					)
				);
			}
		}]);

		return AntCascader;
	})(React.Component);

	AntCascader.defaultProps = {
		prefixCls: 'ant-cascader',
		placeholder: '请选择',
		transitionName: 'slide-up',
		popupPlacement: 'bottomLeft',
		onChange: function onChange() {},

		options: [],
		displayRender: function displayRender(label) {
			return label.join(' / ');
		},

		disabled: false,
		allowClear: true,
		onPopupVisibleChange: function onPopupVisibleChange() {}
	};

	UI.Cascader = AntCascader;
})(Smart.UI, Smart.RC);
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
    return '' + v;
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
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
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
})(Smart.UI, Smart.RC);
'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
  var Slider = RC.Slider;

  var AntSlider = React.createClass({
    displayName: 'AntSlider',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-slider',
        tipTransitionName: 'zoom-down'
      };
    },
    render: function render() {
      var _props = this.props;
      var isIncluded = _props.isIncluded;
      var marks = _props.marks;
      var index = _props.index;
      var defaultIndex = _props.defaultIndex;

      var rest = _objectWithoutProperties(_props, ['isIncluded', 'marks', 'index', 'defaultIndex']);

      if (isIncluded !== undefined) {
        // 兼容 `isIncluded`
        rest.included = isIncluded;
      }

      if (Array.isArray(marks)) {
        // 兼容当 marks 为数组的情况
        rest.min = 0;
        rest.max = marks.length - 1;
        rest.step = 1;

        if (index !== undefined) {
          rest.value = index;
        }
        if (defaultIndex !== undefined) {
          rest.defaultValue = defaultIndex;
        }

        rest.marks = {};
        marks.forEach(function (val, idx) {
          rest.marks[idx] = val;
        });
      } else {
        rest.marks = marks;
      }

      return React.createElement(Slider, rest);
    }
  });

  UI.Slider = AntSlider;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var Tree = RC.Tree;
  var animation = RC.animation;

  var AntTree = React.createClass({
    displayName: 'AntTree',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-tree',
        checkable: false,
        showIcon: false,
        openAnimation: animation
      };
    },
    render: function render() {
      var props = this.props;
      var checkable = props.checkable;
      if (checkable) {
        checkable = React.createElement('span', { className: props.prefixCls + '-checkbox-inner' });
      }
      return React.createElement(
        Tree,
        _extends({}, props, { checkable: checkable }),
        this.props.children
      );
    }
  });

  AntTree.TreeNode = Tree.TreeNode;
  UI.Tree = AntTree;
  UI.TreeNode = Tree.TreeNode;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var TreeSelect = RC.TreeSelect;
	var classNames = RC.classNames;
	var TreeNode = TreeSelect.TreeNode;
	var SHOW_ALL = TreeSelect.SHOW_ALL;
	var SHOW_PARENT = TreeSelect.SHOW_PARENT;
	var SHOW_CHILD = TreeSelect.SHOW_CHILD;

	var AntTreeSelect = React.createClass({
		displayName: 'AntTreeSelect',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-select',
				transitionName: 'slide-up',
				choiceTransitionName: 'zoom',
				showSearch: false
			};
		},
		// openAnimation: animation,
		render: function render() {
			var _classNames;

			var props = this.props;
			var _props = this.props;
			var size = _props.size;
			var className = _props.className;
			var combobox = _props.combobox;
			var notFoundContent = _props.notFoundContent;
			var prefixCls = _props.prefixCls;

			var cls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, className, !!className), _classNames));

			if (combobox) {
				notFoundContent = null;
			}

			var checkable = props.treeCheckable;
			if (checkable) {
				checkable = React.createElement('span', { className: prefixCls + '-tree-checkbox-inner' });
			}

			return React.createElement(TreeSelect, _extends({}, this.props, {
				treeCheckable: checkable,
				className: cls,
				notFoundContent: notFoundContent }));
		}
	});

	AntTreeSelect.TreeNode = TreeNode;
	AntTreeSelect.SHOW_ALL = SHOW_ALL;
	AntTreeSelect.SHOW_PARENT = SHOW_PARENT;
	AntTreeSelect.SHOW_CHILD = SHOW_CHILD;
	UI.TreeSelect = AntTreeSelect;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Carousel = Slider;
  var _ref = _;
  var assign = _ref.assign;

  var AntCarousel = React.createClass({
    displayName: 'AntCarousel',
    getDefaultProps: function getDefaultProps() {
      return {
        dots: true,
        arrows: false
      };
    },
    render: function render() {
      var props = assign({}, this.props);

      if (props.effect === 'fade') {
        props.fade = true;
        props.draggable = false;
      }

      var className = 'ant-carousel';
      if (props.vertical) {
        className = className + ' ant-carousel-vertical';
      }

      return React.createElement(
        'div',
        { className: className },
        React.createElement(Carousel, props)
      );
    }
  });

  UI.Carousel = AntCarousel;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var classNames = RC.classNames;
  var Animate = RC.Animate;
  var Icon = UI.Icon;
  var Button = UI.Button;
  var Checkbox = UI.Checkbox;
  var _React = React;
  var Component = _React.Component;
  var PropTypes = _React.PropTypes;

  var Operation = React.createClass({
    displayName: 'Operation',

    propTypes: {
      className: PropTypes.string,
      leftArrowText: PropTypes.string,
      rightArrowText: PropTypes.string,
      moveToLeft: PropTypes.func,
      moveToRight: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        leftArrowText: '',
        rightArrowText: '',
        moveToLeft: noop,
        moveToRight: noop
      };
    },
    render: function render() {
      var _props = this.props;
      var moveToLeft = _props.moveToLeft;
      var moveToRight = _props.moveToRight;
      var leftArrowText = _props.leftArrowText;
      var rightArrowText = _props.rightArrowText;
      var leftActive = _props.leftActive;
      var rightActive = _props.rightActive;
      var className = _props.className;

      var moveToLeftButton = React.createElement(
        Button,
        { type: 'primary', size: 'small', disabled: !leftActive, onClick: moveToLeft },
        React.createElement(
          'span',
          null,
          React.createElement(Icon, { type: 'left' }),
          leftArrowText
        )
      );
      var moveToRightButton = React.createElement(
        Button,
        { type: 'primary', size: 'small', disabled: !rightActive, onClick: moveToRight },
        React.createElement(
          'span',
          null,
          rightArrowText,
          React.createElement(Icon, { type: 'right' })
        )
      );
      return React.createElement(
        'div',
        { className: className },
        moveToLeftButton,
        moveToRightButton
      );
    }
  });

  var Search = React.createClass({
    displayName: 'Search',

    propTypes: {
      prefixCls: PropTypes.string,
      placeholder: PropTypes.string,
      onChange: PropTypes.func,
      handleClear: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        placeholder: '',
        onChange: noop,
        handleClear: noop
      };
    },
    handleChange: function handleChange(e) {
      this.props.onChange(e);
    },

    handleClear: function handleClear(e) {
      e.preventDefault();
      this.props.handleClear(e);
    },

    render: function render() {
      var _props2 = this.props;
      var placeholder = _props2.placeholder;
      var value = _props2.value;
      var prefixCls = _props2.prefixCls;

      return React.createElement(
        'div',
        null,
        React.createElement('input', { placeholder: placeholder, className: prefixCls + ' ant-input', value: value, ref: 'input',
          onChange: this.handleChange }),
        value && value.length > 0 ? React.createElement(
          'a',
          { href: '#', className: prefixCls + '-action', onClick: this.handleClear },
          React.createElement(Icon, { type: 'cross-circle' })
        ) : React.createElement(
          'span',
          { className: prefixCls + '-action' },
          React.createElement(Icon, { type: 'search' })
        )
      );
    }
  });

  var List = React.createClass({
    displayName: 'List',

    /*constructor(props) {
      super(props);
      this.state = {
        mounted: false,
      };
    }*/

    propTypes: {
      prefixCls: PropTypes.string,
      dataSource: PropTypes.array,
      showSearch: PropTypes.bool,
      searchPlaceholder: PropTypes.string,
      titleText: PropTypes.string,
      style: PropTypes.object,
      handleFilter: PropTypes.func,
      handleSelect: PropTypes.func,
      handleSelectAll: PropTypes.func,
      render: PropTypes.func,
      body: PropTypes.func,
      footer: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        dataSource: [],
        titleText: '',
        showSearch: false,
        searchPlaceholder: '',
        handleFilter: noop,
        handleSelect: noop,
        handleSelectAll: noop,
        render: noop,
        // advanced
        body: noop,
        footer: noop
      };
    },
    getInitialState: function getInitialState() {
      return {
        mounted: false
      };
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      setTimeout(function () {
        _this.setState({
          mounted: true
        });
      }, 0);
    },

    handleSelectALl: function handleSelectALl() {
      this.props.handleSelectAll();
    },

    handleSelect: function handleSelect(selectedItem) {
      var checkedKeys = this.props.checkedKeys;

      var result = checkedKeys.some(function (key) {
        return key === selectedItem.key;
      });
      this.props.handleSelect(selectedItem, !result);
    },

    handleFilter: function handleFilter(e) {
      this.props.handleFilter(e);
    },

    handleClear: function handleClear() {
      this.props.handleClear();
    },

    renderCheckbox: function renderCheckbox(props) {
      var _classNames;

      var prefixCls = props.prefixCls;

      var checkboxCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-checkbox', true), _defineProperty(_classNames, prefixCls + '-checkbox-indeterminate', props.checkPart), _defineProperty(_classNames, prefixCls + '-checkbox-checked', !props.checkPart && props.checked), _defineProperty(_classNames, prefixCls + '-checkbox-disabled', !!props.disabled), _classNames));
      var customEle = null;
      if (typeof props.checkable !== 'boolean') {
        customEle = props.checkable;
      }
      return React.createElement(
        'span',
        { ref: 'checkbox',
          className: checkboxCls,
          onClick: !props.disabled && this.handleSelectALl },
        customEle
      );
    },

    matchFilter: function matchFilter(text, filterText) {
      var regex = new RegExp(filterText);
      return text.match(regex);
    },

    render: function render() {
      var _classNames2,
          _this2 = this;

      var _props3 = this.props;
      var prefixCls = _props3.prefixCls;
      var dataSource = _props3.dataSource;
      var titleText = _props3.titleText;
      var filter = _props3.filter;
      var checkedKeys = _props3.checkedKeys;
      var notFoundContent = _props3.notFoundContent;
      var checkStatus = _props3.checkStatus;
      var body = _props3.body;
      var footer = _props3.footer;
      var showSearch = _props3.showSearch;
      var searchPlaceholder = _props3.searchPlaceholder;

      // Custom Layout

      var footerDom = footer(_extends({}, this.props));
      var bodyDom = body(_extends({}, this.props));

      var listCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls, true), _defineProperty(_classNames2, prefixCls + '-with-footer', !!footerDom), _classNames2));

      var showItems = dataSource.filter(function (item) {
        var itemText = _this2.props.render(item);
        var filterResult = _this2.matchFilter(itemText, filter);
        return !!filterResult;
      }).map(function (item) {
        var renderedText = _this2.props.render(item);
        return React.createElement(
          'li',
          { onClick: _this2.handleSelect.bind(_this2, item), key: item.key, title: renderedText },
          React.createElement(Checkbox, { checked: checkedKeys.some(function (key) {
              return key === item.key;
            }) }),
          renderedText
        );
      });

      return React.createElement(
        'div',
        _extends({ className: listCls }, this.props),
        React.createElement(
          'div',
          { className: prefixCls + '-header' },
          this.renderCheckbox({
            prefixCls: 'ant-transfer',
            checked: checkStatus === 'all',
            checkPart: checkStatus === 'part',
            checkable: React.createElement('span', { className: 'ant-transfer-checkbox-inner' })
          }),
          React.createElement(
            'span',
            { className: prefixCls + '-header-selected' },
            React.createElement(
              'span',
              null,
              (checkedKeys.length > 0 ? checkedKeys.length + '/' : '') + dataSource.length,
              ' 条'
            ),
            React.createElement(
              'span',
              { className: prefixCls + '-header-title' },
              titleText
            )
          )
        ),
        bodyDom || React.createElement(
          'div',
          { className: showSearch ? prefixCls + '-body ' + prefixCls + '-body-with-search' : prefixCls + '-body' },
          showSearch ? React.createElement(
            'div',
            { className: prefixCls + '-body-search-wrapper' },
            React.createElement(Search, { prefixCls: prefixCls + '-search',
              onChange: this.handleFilter.bind(this),
              handleClear: this.handleClear.bind(this),
              placeholder: searchPlaceholder,
              value: filter })
          ) : null,
          React.createElement(
            Animate,
            { component: 'ul',
              transitionName: this.state.mounted ? prefixCls + '-highlight' : '',
              transitionLeave: false },
            showItems.length > 0 ? showItems : React.createElement(
              'div',
              { className: prefixCls + '-body-not-found' },
              notFoundContent
            )
          )
        ),
        footerDom ? React.createElement(
          'div',
          { className: prefixCls + '-footer' },
          footerDom
        ) : null
      );
    }
  });

  var Transfer = React.createClass({
    displayName: 'Transfer',

    /*constructor(props) {
      super(props);
        this.state = {
        leftFilter: '',
        rightFilter: '',
        leftCheckedKeys: [],
        rightCheckedKeys: [],
      };
    }*/

    propTypes: {
      prefixCls: PropTypes.string,
      dataSource: PropTypes.array,
      render: PropTypes.func,
      targetKeys: PropTypes.array,
      onChange: PropTypes.func,
      height: PropTypes.number,
      listStyle: PropTypes.object,
      className: PropTypes.string,
      titles: PropTypes.array,
      operations: PropTypes.array,
      showSearch: PropTypes.bool,
      searchPlaceholder: PropTypes.string,
      notFoundContent: PropTypes.node,
      body: PropTypes.func,
      footer: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-transfer',
        dataSource: [],
        render: noop,
        targetKeys: [],
        onChange: noop,
        titles: ['源列表', '目的列表'],
        operations: [],
        showSearch: false,
        searchPlaceholder: '请输入搜索内容',
        notFoundContent: 'Not Found',
        body: noop,
        footer: noop
      };
    },
    getInitialState: function getInitialState() {
      return {
        leftFilter: '',
        rightFilter: '',
        leftCheckedKeys: [],
        rightCheckedKeys: []
      };
    },

    splitDataSource: function splitDataSource() {
      var _props4 = this.props;
      var targetKeys = _props4.targetKeys;
      var dataSource = _props4.dataSource;

      var leftDataSource = [].concat(_toConsumableArray(dataSource));
      var rightDataSource = [];

      if (targetKeys.length > 0) {
        targetKeys.forEach(function (targetKey) {
          rightDataSource.push(leftDataSource.filter(function (data, index) {
            if (data.key === targetKey) {
              leftDataSource.splice(index, 1);
              return true;
            }
            return false;
          })[0]);
        });
      }

      return {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };
    },

    moveTo: function moveTo(direction) {
      var targetKeys = this.props.targetKeys;
      var _state = this.state;
      var leftCheckedKeys = _state.leftCheckedKeys;
      var rightCheckedKeys = _state.rightCheckedKeys;

      var moveKeys = direction === 'right' ? leftCheckedKeys : rightCheckedKeys;
      // move items to target box
      var newTargetKeys = direction === 'right' ? moveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return !moveKeys.some(function (checkedKey) {
          return targetKey === checkedKey;
        });
      });

      // empty checked keys
      this.setState(_defineProperty({}, direction === 'right' ? 'leftCheckedKeys' : 'rightCheckedKeys', []));

      this.props.onChange(newTargetKeys, direction, moveKeys);
    },

    getGlobalCheckStatus: function getGlobalCheckStatus(direction) {
      var _splitDataSource = this.splitDataSource();

      var leftDataSource = _splitDataSource.leftDataSource;
      var rightDataSource = _splitDataSource.rightDataSource;
      var _state2 = this.state;
      var leftFilter = _state2.leftFilter;
      var rightFilter = _state2.rightFilter;
      var leftCheckedKeys = _state2.leftCheckedKeys;
      var rightCheckedKeys = _state2.rightCheckedKeys;

      var dataSource = direction === 'left' ? leftDataSource : rightDataSource;
      var filter = direction === 'left' ? leftFilter : rightFilter;
      var checkedKeys = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
      var filteredDataSource = this.filterDataSource(dataSource, filter);

      var globalCheckStatus = undefined;

      if (checkedKeys.length > 0) {
        if (checkedKeys.length < filteredDataSource.length) {
          globalCheckStatus = 'part';
        } else {
          globalCheckStatus = 'all';
        }
      } else {
        globalCheckStatus = 'none';
      }
      return globalCheckStatus;
    },

    filterDataSource: function filterDataSource(dataSource, filter) {
      var _this3 = this;

      return dataSource.filter(function (item) {
        var itemText = _this3.props.render(item);
        return _this3.matchFilter(itemText, filter);
      });
    },

    matchFilter: function matchFilter(text, filterText) {
      var regex = new RegExp(filterText);
      return text.match(regex);
    },

    handleSelectAll: function handleSelectAll(direction) {
      var _splitDataSource2 = this.splitDataSource();

      var leftDataSource = _splitDataSource2.leftDataSource;
      var rightDataSource = _splitDataSource2.rightDataSource;
      var _state3 = this.state;
      var leftFilter = _state3.leftFilter;
      var rightFilter = _state3.rightFilter;

      var dataSource = direction === 'left' ? leftDataSource : rightDataSource;
      var filter = direction === 'left' ? leftFilter : rightFilter;
      var checkStatus = this.getGlobalCheckStatus(direction);
      var holder = checkStatus === 'all' ? [] : this.filterDataSource(dataSource, filter).map(function (item) {
        return item.key;
      });

      this.setState(_defineProperty({}, direction + 'CheckedKeys', holder));
    },

    handleFilter: function handleFilter(direction, e) {
      var _setState3;

      this.setState((_setState3 = {}, _defineProperty(_setState3, direction + 'CheckedKeys', []), _defineProperty(_setState3, direction + 'Filter', e.target.value), _setState3));
    },

    handleClear: function handleClear(direction) {
      this.setState(_defineProperty({}, direction + 'Filter', ''));
    },

    handleSelect: function handleSelect(direction, selectedItem, checked) {
      var _state4 = this.state;
      var leftCheckedKeys = _state4.leftCheckedKeys;
      var rightCheckedKeys = _state4.rightCheckedKeys;

      var holder = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
      var index = undefined;
      holder.forEach(function (key, i) {
        if (key === selectedItem.key) {
          index = i;
        }
      });
      if (index > -1) {
        holder.splice(index, 1);
      }
      if (checked) {
        holder.push(selectedItem.key);
      }
      this.setState(_defineProperty({}, direction + 'CheckedKeys', holder));
    },

    render: function render() {
      var _classNames3;

      var _props5 = this.props;
      var prefixCls = _props5.prefixCls;
      var titles = _props5.titles;
      var operations = _props5.operations;
      var showSearch = _props5.showSearch;
      var notFoundContent = _props5.notFoundContent;
      var searchPlaceholder = _props5.searchPlaceholder;
      var body = _props5.body;
      var footer = _props5.footer;
      var listStyle = _props5.listStyle;
      var className = _props5.className;
      var _state5 = this.state;
      var leftFilter = _state5.leftFilter;
      var rightFilter = _state5.rightFilter;
      var leftCheckedKeys = _state5.leftCheckedKeys;
      var rightCheckedKeys = _state5.rightCheckedKeys;

      var _splitDataSource3 = this.splitDataSource();

      var leftDataSource = _splitDataSource3.leftDataSource;
      var rightDataSource = _splitDataSource3.rightDataSource;

      var leftActive = rightCheckedKeys.length > 0;
      var rightActive = leftCheckedKeys.length > 0;

      var leftCheckStatus = this.getGlobalCheckStatus('left');
      var rightCheckStatus = this.getGlobalCheckStatus('right');

      var cls = classNames((_classNames3 = {}, _defineProperty(_classNames3, className, !!className), _defineProperty(_classNames3, 'prefixCls', true), _classNames3));

      return React.createElement(
        'div',
        { className: cls },
        React.createElement(List, { titleText: titles[0],
          dataSource: leftDataSource,
          filter: leftFilter,
          style: listStyle,
          checkedKeys: leftCheckedKeys,
          checkStatus: leftCheckStatus,
          handleFilter: this.handleFilter.bind(this, 'left'),
          handleClear: this.handleClear.bind(this, 'left'),
          handleSelect: this.handleSelect.bind(this, 'left'),
          handleSelectAll: this.handleSelectAll.bind(this, 'left'),
          position: 'left',
          render: this.props.render,
          showSearch: showSearch,
          searchPlaceholder: searchPlaceholder,
          notFoundContent: notFoundContent,
          body: body,
          footer: footer,
          prefixCls: prefixCls + '-list' }),
        React.createElement(Operation, { rightActive: rightActive,
          rightArrowText: operations[0],
          moveToRight: this.moveTo.bind(this, 'right'),
          leftActive: leftActive,
          leftArrowText: operations[1],
          moveToLeft: this.moveTo.bind(this, 'left'),
          className: prefixCls + '-operation' }),
        React.createElement(List, { titleText: titles[1],
          dataSource: rightDataSource,
          filter: rightFilter,
          style: listStyle,
          checkedKeys: rightCheckedKeys,
          checkStatus: rightCheckStatus,
          handleFilter: this.handleFilter.bind(this, 'right'),
          handleClear: this.handleClear.bind(this, 'right'),
          handleSelect: this.handleSelect.bind(this, 'right'),
          handleSelectAll: this.handleSelectAll.bind(this, 'right'),
          position: 'right',
          render: this.props.render,
          showSearch: showSearch,
          searchPlaceholder: searchPlaceholder,
          notFoundContent: notFoundContent,
          body: body,
          footer: footer,
          prefixCls: prefixCls + '-list' })
      );
    }
  });

  Transfer.List = List;
  Transfer.Operation = Operation;
  Transfer.Search = Search;

  UI.Transfer = Transfer;
})(Smart.UI, Smart.RC);