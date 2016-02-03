+ function(RC) {
	const {Locale,Util} = RC,
		{warning} = Util;
	const toInt = parseInt;
	/*
	 * @ignore
	 * const for gregorian date
	 * @author yiminghe@gmail.com
	 */

	const Const = {
		/*
		 * Enum indicating sunday
		 * @type Number
		 * @member Date.Gregorian
		 */
		SUNDAY: 0,
		/*
		 * Enum indicating monday
		 * @type Number
		 * @member Date.Gregorian
		 */
		MONDAY: 1,
		/*
		 * Enum indicating tuesday
		 * @type Number
		 * @member Date.Gregorian
		 */
		TUESDAY: 2,
		/*
		 * Enum indicating wednesday
		 * @type Number
		 * @member Date.Gregorian
		 */
		WEDNESDAY: 3,
		/*
		 * Enum indicating thursday
		 * @type Number
		 * @member Date.Gregorian
		 */
		THURSDAY: 4,
		/*
		 * Enum indicating friday
		 * @type Number
		 * @member Date.Gregorian
		 */
		FRIDAY: 5,
		/*
		 * Enum indicating saturday
		 * @type Number
		 * @member Date.Gregorian
		 */
		SATURDAY: 6,
		/*
		 * Enum indicating january
		 * @type Number
		 * @member Date.Gregorian
		 */
		JANUARY: 0,
		/*
		 * Enum indicating february
		 * @type Number
		 * @member Date.Gregorian
		 */
		FEBRUARY: 1,
		/*
		 * Enum indicating march
		 * @type Number
		 * @member Date.Gregorian
		 */
		MARCH: 2,
		/*
		 * Enum indicating april
		 * @type Number
		 * @member Date.Gregorian
		 */
		APRIL: 3,
		/*
		 * Enum indicating may
		 * @type Number
		 * @member Date.Gregorian
		 */
		MAY: 4,
		/*
		 * Enum indicating june
		 * @type Number
		 * @member Date.Gregorian
		 */
		JUNE: 5,
		/*
		 * Enum indicating july
		 * @type Number
		 * @member Date.Gregorian
		 */
		JULY: 6,
		/*
		 * Enum indicating august
		 * @type Number
		 * @member Date.Gregorian
		 */
		AUGUST: 7,
		/*
		 * Enum indicating september
		 * @type Number
		 * @member Date.Gregorian
		 */
		SEPTEMBER: 8,
		/*
		 * Enum indicating october
		 * @type Number
		 * @member Date.Gregorian
		 */
		OCTOBER: 9,
		/*
		 * Enum indicating november
		 * @type Number
		 * @member Date.Gregorian
		 */
		NOVEMBER: 10,
		/*
		 * Enum indicating december
		 * @type Number
		 * @member Date.Gregorian
		 */
		DECEMBER: 11,
	};


	/*
	 * utils for gregorian date
	 * @ignore
	 * @author yiminghe@gmail.com
	 */

	const floor = Math.floor;
	const ACCUMULATED_DAYS_IN_MONTH
	  //   1/1 2/1 3/1 4/1 5/1 6/1 7/1 8/1 9/1 10/1 11/1 12/1
	  = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

	const ACCUMULATED_DAYS_IN_MONTH_LEAP
	  //   1/1 2/1   3/1   4/1   5/1   6/1   7/1   8/1   9/1
	  // 10/1   11/1   12/1
	  = [0, 31, 59 + 1, 90 + 1, 120 + 1, 151 + 1, 181 + 1,
	  212 + 1, 243 + 1, 273 + 1, 304 + 1, 334 + 1];

	const DAYS_OF_YEAR = 365;
	const DAYS_OF_4YEAR = 365 * 4 + 1;
	const DAYS_OF_100YEAR = DAYS_OF_4YEAR * 25 - 1;
	const DAYS_OF_400YEAR = DAYS_OF_100YEAR * 4 + 1;
	let exports = {};

	function getDayOfYear(year, month, dayOfMonth) {
	  return dayOfMonth + (exports.isLeapYear(year) ?
	      ACCUMULATED_DAYS_IN_MONTH_LEAP[month] :
	      ACCUMULATED_DAYS_IN_MONTH[month]);
	}

	function getDayOfWeekFromFixedDate(fixedDate) {
	  // The fixed day 1 (January 1, 1 Gregorian) is Monday.
	  if (fixedDate >= 0) {
	    return fixedDate % 7;
	  }
	  return exports.mod(fixedDate, 7);
	}

	function getGregorianYearFromFixedDate(fixedDate) {
	  let d0;
	  let d1;
	  let d2;
	  let d3;
	  let n400;
	  let n100;
	  let n4;
	  let n1;
	  let year;
	  d0 = fixedDate - 1;

	  n400 = floor(d0 / DAYS_OF_400YEAR);
	  d1 = exports.mod(d0, DAYS_OF_400YEAR);
	  n100 = floor(d1 / DAYS_OF_100YEAR);
	  d2 = exports.mod(d1, DAYS_OF_100YEAR);
	  n4 = floor(d2 / DAYS_OF_4YEAR);
	  d3 = exports.mod(d2, DAYS_OF_4YEAR);
	  n1 = floor(d3 / DAYS_OF_YEAR);

	  year = 400 * n400 + 100 * n100 + 4 * n4 + n1;

	  // ?
	  if (!(n100 === 4 || n1 === 4)) {
	    ++year;
	  }

	  return year;
	}

	const Utils = exports = {
	  each(arr, fn) {
	    for (let i = 0, len = arr.length; i < len; i++) {
	      if (fn(arr[i], i, arr) === false) {
	        break;
	      }
	    }
	  },

	  mix(t, s) {
	    for (const p in s) {
	      if (s.hasOwnProperty(p)) {
	        t[p] = s[p];
	      }
	    }
	  },

	  isLeapYear(year) {
	    if ((year & 3) !== 0) {
	      return false;
	    }
	    return (year % 100 !== 0) || (year % 400 === 0);
	  },

	  mod(x, y) {
	    // 负数时不是镜像关系
	    return (x - y * floor(x / y));
	  },

	  // month: 0 based
	  getFixedDate(year, month, dayOfMonth) {
	    const prevYear = year - 1;
	    // 考虑公元前
	    return DAYS_OF_YEAR * prevYear + floor(prevYear / 4) -
	      floor(prevYear / 100) + floor(prevYear / 400) +
	      getDayOfYear(year, month, dayOfMonth);
	  },

	  getGregorianDateFromFixedDate(fixedDate) {
	    const year = getGregorianYearFromFixedDate(fixedDate);
	    const jan1 = exports.getFixedDate(year, Const.JANUARY, 1);
	    const isLeap = exports.isLeapYear(year);
	    const ACCUMULATED_DAYS = isLeap ? ACCUMULATED_DAYS_IN_MONTH_LEAP : ACCUMULATED_DAYS_IN_MONTH;
	    const daysDiff = fixedDate - jan1;
	    let month;

	    for (let i = 0; i < ACCUMULATED_DAYS.length; i++) {
	      if (ACCUMULATED_DAYS[i] <= daysDiff) {
	        month = i;
	      } else {
	        break;
	      }
	    }

	    const dayOfMonth = fixedDate - jan1 - ACCUMULATED_DAYS[month] + 1;
	    const dayOfWeek = getDayOfWeekFromFixedDate(fixedDate);

	    return {
	      year: year,
	      month: month,
	      dayOfMonth: dayOfMonth,
	      dayOfWeek: dayOfWeek,
	      isLeap: isLeap,
	    };
	  },
	};

	const defaultLocale = Locale.GregorianCalendar;


		/*
	 * GregorianCalendar class.
	 *
	 * - no arguments:
	 *   Constructs a default GregorianCalendar using the current time
	 *   in the default time zone with the default locale.
	 * - one argument locale:
	 *   Constructs a GregorianCalendar
	 *   based on the current time in the default time zone with the given locale.
	 *
	 * @class Date.Gregorian
	 */
	function GregorianCalendar(loc) {
	  const locale = loc || defaultLocale;

	  this.locale = locale;

	  this.fields = [];

	  /*
	   * The currently set time for this date.
	   * @protected
	   * @type Number|undefined
	   */
	  this.time = undefined;
	  /*
	   * The timezoneOffset in minutes used by this date.
	   * @type Number
	   * @protected
	   */

	  this.timezoneOffset = locale.timezoneOffset;

	  /*
	   * The first day of the week
	   * @type Number
	   * @protected
	   */
	  this.firstDayOfWeek = locale.firstDayOfWeek;

	  /*
	   * The number of days required for the first week in a month or year,
	   * with possible values from 1 to 7.
	   * @@protected
	   * @type Number
	   */
	  this.minimalDaysInFirstWeek = locale.minimalDaysInFirstWeek;

	  this.fieldsComputed = false;
	}

	Utils.mix(GregorianCalendar, Const);

	Utils.mix(GregorianCalendar, {
	  Utils: Utils,

	  defaultLocale: defaultLocale,

	  /*
	   * Determines if the given year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @param {Number} year the given year.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @static
	   * @method
	   */
	  isLeapYear: Utils.isLeapYear,

	  /*
	   * Enum indicating year field of date
	   * @type Number
	   */
	  YEAR: 1,
	  /*
	   * Enum indicating month field of date
	   * @type Number
	   */
	  MONTH: 2,
	  /*
	   * Enum indicating the day of the month
	   * @type Number
	   */
	  DAY_OF_MONTH: 3,
	  /*
	   * Enum indicating the hour (24).
	   * @type Number
	   */
	  HOUR_OF_DAY: 4,
	  /*
	   * Enum indicating the minute of the day
	   * @type Number
	   */
	  MINUTES: 5,
	  /*
	   * Enum indicating the second of the day
	   * @type Number
	   */
	  SECONDS: 6,
	  /*
	   * Enum indicating the millisecond of the day
	   * @type Number
	   */
	  MILLISECONDS: 7,
	  /*
	   * Enum indicating the week number within the current year
	   * @type Number
	   */
	  WEEK_OF_YEAR: 8,
	  /*
	   * Enum indicating the week number within the current month
	   * @type Number
	   */
	  WEEK_OF_MONTH: 9,

	  /*
	   * Enum indicating the day of the day number within the current year
	   * @type Number
	   */
	  DAY_OF_YEAR: 10,
	  /*
	   * Enum indicating the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK: 11,
	  /*
	   * Enum indicating the day of the ordinal number of the day of the week
	   * @type Number
	   */
	  DAY_OF_WEEK_IN_MONTH: 12,

	  /*
	   * Enum indicating am
	   * @type Number
	   */
	  AM: 0,
	  /*
	   * Enum indicating pm
	   * @type Number
	   */
	  PM: 1,
	});

	const FIELDS = ['',
	  'Year', 'Month', 'DayOfMonth',
	  'HourOfDay',
	  'Minutes', 'Seconds', 'Milliseconds', 'WeekOfYear',
	  'WeekOfMonth', 'DayOfYear', 'DayOfWeek',
	  'DayOfWeekInMonth',
	];

	const YEAR = GregorianCalendar.YEAR;
	const MONTH = GregorianCalendar.MONTH;
	const DAY_OF_MONTH = GregorianCalendar.DAY_OF_MONTH;
	const HOUR_OF_DAY = GregorianCalendar.HOUR_OF_DAY;
	const MINUTE = GregorianCalendar.MINUTES;
	const SECONDS = GregorianCalendar.SECONDS;

	const MILLISECONDS = GregorianCalendar.MILLISECONDS;
	const DAY_OF_WEEK_IN_MONTH = GregorianCalendar.DAY_OF_WEEK_IN_MONTH;
	const DAY_OF_YEAR = GregorianCalendar.DAY_OF_YEAR;
	const DAY_OF_WEEK = GregorianCalendar.DAY_OF_WEEK;

	const WEEK_OF_MONTH = GregorianCalendar.WEEK_OF_MONTH;
	const WEEK_OF_YEAR = GregorianCalendar.WEEK_OF_YEAR;

	const MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	const LEAP_MONTH_LENGTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based

	const ONE_SECOND = 1000;
	const ONE_MINUTE = 60 * ONE_SECOND;
	const ONE_HOUR = 60 * ONE_MINUTE;
	const ONE_DAY = 24 * ONE_HOUR;
	const ONE_WEEK = ONE_DAY * 7;

	const EPOCH_OFFSET = 719163; // Fixed date of January 1, 1970 (Gregorian)

	const mod = Utils.mod;
	const isLeapYear = Utils.isLeapYear;
	const floorDivide = Math.floor;

	const MIN_VALUES = [
	  undefined,
	  1,              // YEAR
	  GregorianCalendar.JANUARY,        // MONTH
	  1,              // DAY_OF_MONTH
	  0,              // HOUR_OF_DAY
	  0,              // MINUTE
	  0,              // SECONDS
	  0,              // MILLISECONDS

	  1,              // WEEK_OF_YEAR
	  undefined,              // WEEK_OF_MONTH

	  1,              // DAY_OF_YEAR
	  GregorianCalendar.SUNDAY,         // DAY_OF_WEEK
	  1,             // DAY_OF_WEEK_IN_MONTH
	];

	const MAX_VALUES = [
	  undefined,
	  292278994,      // YEAR
	  GregorianCalendar.DECEMBER,       // MONTH
	  undefined, // DAY_OF_MONTH
	  23,             // HOUR_OF_DAY
	  59,             // MINUTE
	  59,             // SECONDS
	  999,            // MILLISECONDS
	  undefined,             // WEEK_OF_YEAR
	  undefined,              // WEEK_OF_MONTH
	  undefined,            // DAY_OF_YEAR
	  GregorianCalendar.SATURDAY,       // DAY_OF_WEEK
	  undefined,              // DAY_OF_WEEK_IN_MONTH
	];

	// ------------------- private start

	function getMonthLength(year, month) {
	  return isLeapYear(year) ? LEAP_MONTH_LENGTH[month] : MONTH_LENGTH[month];
	}

	function getYearLength(year) {
	  return isLeapYear(year) ? 366 : 365;
	}

	function adjustDayOfMonth(self) {
	  const fields = self.fields;
	  const year = fields[YEAR];
	  const month = fields[MONTH];
	  const monthLen = getMonthLength(year, month);
	  const dayOfMonth = fields[DAY_OF_MONTH];
	  if (dayOfMonth > monthLen) {
	    self.set(DAY_OF_MONTH, monthLen);
	  }
	}

	function getDayOfWeekDateOnOrBefore(fixedDate, dayOfWeek) {
	  // 1.1.1 is monday
	  // one week has 7 days
	  return fixedDate - mod(fixedDate - dayOfWeek, 7);
	}

	function getWeekNumber(self, fixedDay1, fixedDate) {
	  let fixedDay1st = getDayOfWeekDateOnOrBefore(fixedDay1 + 6, self.firstDayOfWeek);
	  const nDays = (fixedDay1st - fixedDay1);
	  if (nDays >= self.minimalDaysInFirstWeek) {
	    fixedDay1st -= 7;
	  }
	  const normalizedDayOfPeriod = (fixedDate - fixedDay1st);
	  return floorDivide(normalizedDayOfPeriod / 7) + 1;
	}

	// ------------------- private end

	GregorianCalendar.prototype = {
	  constructor: GregorianCalendar,

	  isGregorianCalendar: 1,

	  /*
	   * Determines if current year is a leap year.
	   * Returns true if the given year is a leap year. To specify BC year numbers,
	   * 1 - year number must be given. For example, year BC 4 is specified as -3.
	   * @returns {Boolean} true if the given year is a leap year; false otherwise.
	   * @method
	   * @member Date.Gregorian
	   */
	  isLeapYear() {
	    return isLeapYear(this.getYear());
	  },

	  /*
	   * Return local info for current date instance
	   * @returns {Object}
	   */
	  getLocale() {
	    return this.locale;
	  },

	  /*
	   * Returns the minimum value for
	   * the given calendar field of this GregorianCalendar instance.
	   * The minimum value is defined as the smallest value
	   * returned by the get method for any possible time value,
	   * taking into consideration the current values of the getFirstDayOfWeek,
	   * getMinimalDaysInFirstWeek.
	   * @param field the calendar field.
	   * @returns {Number} the minimum value for the given calendar field.
	   */
	  getActualMinimum(field) {
	    if (MIN_VALUES[field] !== undefined) {
	      return MIN_VALUES[field];
	    }
	    if (field === WEEK_OF_MONTH) {
	      const cal = this.clone();
	      cal.clear();
	      cal.set(this.fields[YEAR], this.fields[MONTH], 1);
	      return cal.get(WEEK_OF_MONTH);
	    }

	    throw new Error('minimum value not defined!');
	  },

	  /*
	   * Returns the maximum value for the given calendar field
	   * of this GregorianCalendar instance.
	   * The maximum value is defined as the largest value returned
	   * by the get method for any possible time value, taking into consideration
	   * the current values of the getFirstDayOfWeek, getMinimalDaysInFirstWeek methods.
	   * @param field the calendar field.
	   * @returns {Number} the maximum value for the given calendar field.
	   */
	  getActualMaximum(field) {
	    if (MAX_VALUES[field] !== undefined) {
	      return MAX_VALUES[field];
	    }
	    let value;
	    const fields = this.fields;
	    switch (field) {
	    case DAY_OF_MONTH:
	      value = getMonthLength(fields[YEAR], fields[MONTH]);
	      break;

	    case WEEK_OF_YEAR:
	      const endOfYear = this.clone();
	      endOfYear.clear();
	      endOfYear.set(fields[YEAR], GregorianCalendar.DECEMBER, 31);
	      value = endOfYear.get(WEEK_OF_YEAR);
	      if (value === 1) {
	        value = 52;
	      }
	      break;

	    case WEEK_OF_MONTH:
	      const endOfMonth = this.clone();
	      endOfMonth.clear();
	      endOfMonth.set(fields[YEAR], fields[MONTH], getMonthLength(fields[YEAR], fields[MONTH]));
	      value = endOfMonth.get(WEEK_OF_MONTH);
	      break;

	    case DAY_OF_YEAR:
	      value = getYearLength(fields[YEAR]);
	      break;

	    case DAY_OF_WEEK_IN_MONTH:
	      value = toInt((getMonthLength(fields[YEAR], fields[MONTH]) - 1) / 7) + 1;
	      break;
	    default :
	      break;
	    }
	    if (value === undefined) {
	      throw new Error('maximum value not defined!');
	    }
	    return value;
	  },

	  /*
	   * Determines if the given calendar field has a value set,
	   * including cases that the value has been set by internal fields calculations
	   * triggered by a get method call.
	   * @param field the calendar field to be cleared.
	   * @returns {boolean} true if the given calendar field has a value set; false otherwise.
	   */
	  isSet(field) {
	    return this.fields[field] !== undefined;
	  },

	  /*
	   * Converts the time value (millisecond offset from the Epoch)
	   * to calendar field values.
	   * @protected
	   */
	  computeFields() {
	    const time = this.time;
	    const timezoneOffset = this.timezoneOffset * ONE_MINUTE;
	    let fixedDate = toInt(timezoneOffset / ONE_DAY);
	    let timeOfDay = timezoneOffset % ONE_DAY;
	    fixedDate += toInt(time / ONE_DAY);
	    timeOfDay += time % ONE_DAY;
	    if (timeOfDay >= ONE_DAY) {
	      timeOfDay -= ONE_DAY;
	      fixedDate++;
	    } else {
	      while (timeOfDay < 0) {
	        timeOfDay += ONE_DAY;
	        fixedDate--;
	      }
	    }

	    fixedDate += EPOCH_OFFSET;

	    const date = Utils.getGregorianDateFromFixedDate(fixedDate);

	    const year = date.year;

	    const fields = this.fields;
	    fields[YEAR] = year;
	    fields[MONTH] = date.month;
	    fields[DAY_OF_MONTH] = date.dayOfMonth;
	    fields[DAY_OF_WEEK] = date.dayOfWeek;

	    if (timeOfDay !== 0) {
	      fields[HOUR_OF_DAY] = toInt(timeOfDay / ONE_HOUR);
	      let r = timeOfDay % ONE_HOUR;
	      fields[MINUTE] = toInt(r / ONE_MINUTE);
	      r %= ONE_MINUTE;
	      fields[SECONDS] = toInt(r / ONE_SECOND);
	      fields[MILLISECONDS] = r % ONE_SECOND;
	    } else {
	      fields[HOUR_OF_DAY] =
	        fields[MINUTE] =
	          fields[SECONDS] =
	            fields[MILLISECONDS] = 0;
	    }

	    const fixedDateJan1 = Utils.getFixedDate(year, GregorianCalendar.JANUARY, 1);
	    const dayOfYear = fixedDate - fixedDateJan1 + 1;
	    const fixDateMonth1 = fixedDate - date.dayOfMonth + 1;

	    fields[DAY_OF_YEAR] = dayOfYear;
	    fields[DAY_OF_WEEK_IN_MONTH] = toInt((date.dayOfMonth - 1) / 7) + 1;

	    let weekOfYear = getWeekNumber(this, fixedDateJan1, fixedDate);

	    // 本周没有足够的时间在当前年
	    if (weekOfYear === 0) {
	      // If the date belongs to the last week of the
	      // previous year, use the week number of "12/31" of
	      // the "previous" year.
	      const fixedDec31 = fixedDateJan1 - 1;
	      const prevJan1 = fixedDateJan1 - getYearLength(year - 1);
	      weekOfYear = getWeekNumber(this, prevJan1, fixedDec31);
	    } else
	    // 本周是年末最后一周，可能有足够的时间在新的一年
	    if (weekOfYear >= 52) {
	      const nextJan1 = fixedDateJan1 + getYearLength(year);
	      const nextJan1st = getDayOfWeekDateOnOrBefore(nextJan1 + 6, this.firstDayOfWeek);
	      const nDays = nextJan1st - nextJan1;
	      // 本周有足够天数在新的一年
	      if (nDays >= this.minimalDaysInFirstWeek &&
	          // 当天确实在本周，weekOfYear === 53 时是不需要这个判断
	        fixedDate >= (nextJan1st - 7)
	      ) {
	        weekOfYear = 1;
	      }
	    }

	    fields[WEEK_OF_YEAR] = weekOfYear;
	    fields[WEEK_OF_MONTH] = getWeekNumber(this, fixDateMonth1, fixedDate);

	    this.fieldsComputed = true;
	  },

	  /*
	   * Converts calendar field values to the time value
	   * (millisecond offset from the Epoch).
	   * @protected
	   */
	  computeTime() {
	    let year;
	    const fields = this.fields;
	    if (this.isSet(YEAR)) {
	      year = fields[YEAR];
	    } else {
	      year = new Date().getFullYear();
	    }
	    let timeOfDay = 0;
	    if (this.isSet(HOUR_OF_DAY)) {
	      timeOfDay += fields[HOUR_OF_DAY];
	    }
	    timeOfDay *= 60;
	    timeOfDay += fields[MINUTE] || 0;
	    timeOfDay *= 60;
	    timeOfDay += fields[SECONDS] || 0;
	    timeOfDay *= 1000;
	    timeOfDay += fields[MILLISECONDS] || 0;
	    let fixedDate = 0;
	    fields[YEAR] = year;
	    fixedDate = fixedDate + this.getFixedDate();
	    // millis represents local wall-clock time in milliseconds.
	    let millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;
	    millis -= this.timezoneOffset * ONE_MINUTE;
	    this.time = millis;
	    this.computeFields();
	  },

	  /*
	   * Fills in any unset fields in the calendar fields. First,
	   * the computeTime() method is called if the time value (millisecond offset from the Epoch)
	   * has not been calculated from calendar field values.
	   * Then, the computeFields() method is called to calculate all calendar field values.
	   * @protected
	   */
	  complete() {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    if (!this.fieldsComputed) {
	      this.computeFields();
	    }
	  },

	  getFixedDate() {
	    const self = this;

	    const fields = self.fields;

	    const firstDayOfWeekCfg = self.firstDayOfWeek;

	    let year = fields[YEAR];

	    let month = GregorianCalendar.JANUARY;

	    if (self.isSet(MONTH)) {
	      month = fields[MONTH];
	      if (month > GregorianCalendar.DECEMBER) {
	        year += toInt(month / 12);
	        month %= 12;
	      } else if (month < GregorianCalendar.JANUARY) {
	        year += floorDivide(month / 12);
	        month = mod(month, 12);
	      }
	    }

	    // Get the fixed date since Jan 1, 1 (Gregorian). We are on
	    // the first day of either `month' or January in 'year'.
	    let fixedDate = Utils.getFixedDate(year, month, 1);
	    let firstDayOfWeek;
	    let dayOfWeek = self.firstDayOfWeek;

	    if (self.isSet(DAY_OF_WEEK)) {
	      dayOfWeek = fields[DAY_OF_WEEK];
	    }

	    if (self.isSet(MONTH)) {
	      if (self.isSet(DAY_OF_MONTH)) {
	        fixedDate += fields[DAY_OF_MONTH] - 1;
	      } else {
	        if (self.isSet(WEEK_OF_MONTH)) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);

	          // If we have enough days in the first week, then
	          // move to the previous week.
	          if ((firstDayOfWeek - fixedDate) >= self.minimalDaysInFirstWeek) {
	            firstDayOfWeek -= 7;
	          }

	          if (dayOfWeek !== firstDayOfWeekCfg) {
	            firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	          }

	          fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_MONTH] - 1);
	        } else {
	          let dowim;
	          if (self.isSet(DAY_OF_WEEK_IN_MONTH)) {
	            dowim = fields[DAY_OF_WEEK_IN_MONTH];
	          } else {
	            dowim = 1;
	          }
	          let lastDate = (7 * dowim);
	          if (dowim < 0) {
	            lastDate = getMonthLength(year, month) + (7 * (dowim + 1));
	          }
	          fixedDate = getDayOfWeekDateOnOrBefore(fixedDate + lastDate - 1, dayOfWeek);
	        }
	      }
	    } else {
	      // We are on the first day of the year.
	      if (self.isSet(DAY_OF_YEAR)) {
	        fixedDate += fields[DAY_OF_YEAR] - 1;
	      } else if (self.isSet(WEEK_OF_YEAR)) {
	        firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
	        // If we have enough days in the first week, then move
	        // to the previous week.
	        if ((firstDayOfWeek - fixedDate) >= self.minimalDaysInFirstWeek) {
	          firstDayOfWeek -= 7;
	        }
	        if (dayOfWeek !== firstDayOfWeekCfg) {
	          firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
	        }
	        fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_YEAR] - 1);
	      }
	    }

	    return fixedDate;
	  },

	  /*
	   * Returns this Calendar's time value in milliseconds
	   * @member Date.Gregorian
	   * @returns {Number} the current time as UTC milliseconds from the epoch.
	   */
	  getTime() {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    return this.time;
	  },

	  /*
	   * Sets this Calendar's current time from the given long value.
	   * @param time the new time in UTC milliseconds from the epoch.
	   */
	  setTime(time) {
	    this.time = time;
	    this.fieldsComputed = false;
	    this.complete();
	  },

	  /*
	   * Returns the value of the given calendar field.
	   * @param field the given calendar field.
	   * @returns {Number} the value for the given calendar field.
	   */
	  get(field) {
	    this.complete();
	    return this.fields[field];
	  },

	  /*
	   * Returns the year of the given calendar field.
	   * @method getYear
	   * @returns {Number} the year for the given calendar field.
	   */

	  /*
	   * Returns the month of the given calendar field.
	   * @method getMonth
	   * @returns {Number} the month for the given calendar field.
	   */

	  /*
	   * Returns the day of month of the given calendar field.
	   * @method getDayOfMonth
	   * @returns {Number} the day of month for the given calendar field.
	   */

	  /*
	   * Returns the hour of day of the given calendar field.
	   * @method getHourOfDay
	   * @returns {Number} the hour of day for the given calendar field.
	   */

	  /*
	   * Returns the minute of the given calendar field.
	   * @method getMinute
	   * @returns {Number} the minute for the given calendar field.
	   */

	  /*
	   * Returns the second of the given calendar field.
	   * @method getSecond
	   * @returns {Number} the second for the given calendar field.
	   */

	  /*
	   * Returns the millisecond of the given calendar field.
	   * @method getMilliSecond
	   * @returns {Number} the millisecond for the given calendar field.
	   */

	  /*
	   * Returns the week of year of the given calendar field.
	   * @method getWeekOfYear
	   * @returns {Number} the week of year for the given calendar field.
	   */

	  /*
	   * Returns the week of month of the given calendar field.
	   * @method getWeekOfMonth
	   * @returns {Number} the week of month for the given calendar field.
	   */

	  /*
	   * Returns the day of year of the given calendar field.
	   * @method getDayOfYear
	   * @returns {Number} the day of year for the given calendar field.
	   */

	  /*
	   * Returns the day of week of the given calendar field.
	   * @method getDayOfWeek
	   * @returns {Number} the day of week for the given calendar field.
	   */

	  /*
	   * Returns the day of week in month of the given calendar field.
	   * @method getDayOfWeekInMonth
	   * @returns {Number} the day of week in month for the given calendar field.
	   */

	  /*
	   * Sets the given calendar field to the given value.
	   * @param field the given calendar field.
	   * @param v the value to be set for the given calendar field.
	   */
	  set(field, v) {
	    const len = arguments.length;
	    if (len === 2) {
	      this.fields[field] = v;
	    } else if (len < MILLISECONDS + 1) {
	      for (let i = 0; i < len; i++) {
	        this.fields[YEAR + i] = arguments[i];
	      }
	    } else {
	      throw new Error('illegal arguments for GregorianCalendar set');
	    }
	    this.time = undefined;
	  },

	  /*
	   * Set the year of the given calendar field.
	   * @method setYear
	   */

	  /*
	   * Set the month of the given calendar field.
	   * @method setMonth
	   */

	  /*
	   * Set the day of month of the given calendar field.
	   * @method setDayOfMonth
	   */

	  /*
	   * Set the hour of day of the given calendar field.
	   * @method setHourOfDay
	   */

	  /*
	   * Set the minute of the given calendar field.
	   * @method setMinute
	   */

	  /*
	   * Set the second of the given calendar field.
	   * @method setSecond
	   */

	  /*
	   * Set the millisecond of the given calendar field.
	   * @method setMilliSecond
	   */

	  /*
	   * Set the week of year of the given calendar field.
	   * @method setWeekOfYear
	   */

	  /*
	   * Set the week of month of the given calendar field.
	   * @method setWeekOfMonth
	   */

	  /*
	   * Set the day of year of the given calendar field.
	   * @method setDayOfYear
	   */

	  /*
	   * Set the day of week of the given calendar field.
	   * @method setDayOfWeek
	   */

	  /*
	   * Set the day of week in month of the given calendar field.
	   * @method setDayOfWeekInMonth
	   */

	  /*
	   * add for specified field based on two rules:
	   *
	   *  - Add rule 1. The value of field after the call minus the value of field before the
	   *  call is amount, modulo any overflow that has occurred in field
	   *  Overflow occurs when a field value exceeds its range and,
	   *  as a result, the next larger field is incremented or
	   *  decremented and the field value is adjusted back into its range.
	   *
	   *  - Add rule 2. If a smaller field is expected to be invariant,
	   *  but it is impossible for it to be equal to its
	   *  prior value because of changes in its minimum or maximum after
	   *  field is changed, then its value is adjusted to be as close
	   *  as possible to its expected value. A smaller field represents a
	   *  smaller unit of time. HOUR_OF_DAY is a smaller field than
	   *  DAY_OF_MONTH. No adjustment is made to smaller fields
	   *  that are not expected to be invariant. The calendar system
	   *  determines what fields are expected to be invariant.
	   *
	   *
	   *      @example
	   *      use('date/gregorian',function(S, GregorianCalendar){
	   *          const d = new GregorianCalendar();
	   *          d.set(2012, GregorianCalendar.JANUARY, 31);
	   *          d.add(Gregorian.MONTH,1);
	   *          // 2012-2-29
	   *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	   *          d.add(Gregorian.MONTH,12);
	   *          // 2013-2-28
	   *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
	   *      });
	   *
	   * @param field the calendar field.
	   * @param {Number} amount he amount of date or time to be added to the field.
	   */
	  add(field, a) {
	    if (!a) {
	      return;
	    }
	    let amount = a;
	    const self = this;
	    const fields = self.fields;
	    // computer and retrieve original value
	    let value = self.get(field);
	    if (field === YEAR) {
	      value += amount;
	      self.set(YEAR, value);
	      adjustDayOfMonth(self);
	    } else if (field === MONTH) {
	      value += amount;
	      const yearAmount = floorDivide(value / 12);
	      value = mod(value, 12);
	      if (yearAmount) {
	        self.set(YEAR, fields[YEAR] + yearAmount);
	      }
	      self.set(MONTH, value);
	      adjustDayOfMonth(self);
	    } else {
	      switch (field) {
	      case HOUR_OF_DAY:
	        amount *= ONE_HOUR;
	        break;
	      case MINUTE:
	        amount *= ONE_MINUTE;
	        break;
	      case SECONDS:
	        amount *= ONE_SECOND;
	        break;
	      case MILLISECONDS:
	        break;
	      case WEEK_OF_MONTH:
	      case WEEK_OF_YEAR:
	      case DAY_OF_WEEK_IN_MONTH:
	        amount *= ONE_WEEK;
	        break;
	      case DAY_OF_WEEK:
	      case DAY_OF_YEAR:
	      case DAY_OF_MONTH:
	        amount *= ONE_DAY;
	        break;
	      default:
	        throw new Error('illegal field for add');
	      }
	      self.setTime(self.time + amount);
	    }
	  },

	  /*
	   * add the year of the given calendar field.
	   * @method addYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the month of the given calendar field.
	   * @method addMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of month of the given calendar field.
	   * @method addDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the hour of day of the given calendar field.
	   * @method addHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the minute of the given calendar field.
	   * @method addMinute
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the second of the given calendar field.
	   * @method addSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the millisecond of the given calendar field.
	   * @method addMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the week of year of the given calendar field.
	   * @method addWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the week of month of the given calendar field.
	   * @method addWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of year of the given calendar field.
	   * @method addDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of week of the given calendar field.
	   * @method addDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * add the day of week in month of the given calendar field.
	   * @method addDayOfWeekInMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * Get rolled value for the field
	   * @protected
	   */
	  getRolledValue(value, a, min, max) {
	    let amount = a;
	    const diff = value - min;
	    const range = max - min + 1;
	    amount %= range;
	    return min + (diff + amount + range) % range;
	  },

	  /*
	   * Adds a signed amount to the specified calendar field without changing larger fields.
	   * A negative roll amount means to subtract from field without changing
	   * larger fields. If the specified amount is 0, this method performs nothing.
	   *
	   *
	   *
	   *      @example
	   *      const d = new GregorianCalendar();
	   *      d.set(1999, GregorianCalendar.AUGUST, 31);
	   *      // 1999-4-30
	   *      // Tuesday June 1, 1999
	   *      d.set(1999, GregorianCalendar.JUNE, 1);
	   *      d.add(Gregorian.WEEK_OF_MONTH,-1); // === d.add(Gregorian.WEEK_OF_MONTH,
	   *      d.get(Gregorian.WEEK_OF_MONTH));
	   *      // 1999-06-29
	   *
	   *
	   * @param field the calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   */
	  roll(field, amount) {
	    if (!amount) {
	      return;
	    }
	    const self = this;
	    // computer and retrieve original value
	    let value = self.get(field);
	    const min = self.getActualMinimum(field);
	    const max = self.getActualMaximum(field);
	    value = self.getRolledValue(value, amount, min, max);

	    self.set(field, value);

	    // consider compute time priority
	    switch (field) {
	    case MONTH:
	      adjustDayOfMonth(self);
	      break;
	    default:
	      // other fields are set already when get
	      self.updateFieldsBySet(field);
	      break;
	    }
	  },

	  /*
	   * keep field stable.
	   *
	   * 2015-09-29 setMonth 2 vs rollSetMonth 2
	   *
	   */
	  rollSet(field, v) {
	    this.set(field, v);
	    switch (field) {
	    case MONTH:
	      adjustDayOfMonth(this);
	      break;
	    default:
	      // other fields are set already when get
	      this.updateFieldsBySet(field);
	      break;
	    }
	  },

	  /*
	   * roll the year of the given calendar field.
	   * @method rollYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the month of the given calendar field.
	   * @param {Number} amount the signed amount to add to field.
	   * @method rollMonth
	   */

	  /*
	   * roll the day of month of the given calendar field.
	   * @method rollDayOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the hour of day of the given calendar field.
	   * @method rollHourOfDay
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the minute of the given calendar field.
	   * @method rollMinute
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the second of the given calendar field.
	   * @method rollSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the millisecond of the given calendar field.
	   * @method rollMilliSecond
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the week of year of the given calendar field.
	   * @method rollWeekOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the week of month of the given calendar field.
	   * @method rollWeekOfMonth
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the day of year of the given calendar field.
	   * @method rollDayOfYear
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * roll the day of week of the given calendar field.
	   * @method rollDayOfWeek
	   * @param {Number} amount the signed amount to add to field.
	   */

	  /*
	   * remove other priority fields when call getFixedDate
	   * precondition: other fields are all set or computed
	   * @protected
	   */
	  updateFieldsBySet(field) {
	    const fields = this.fields;
	    switch (field) {
	    case WEEK_OF_MONTH:
	      fields[DAY_OF_MONTH] = undefined;
	      break;
	    case DAY_OF_YEAR:
	      fields[MONTH] = undefined;
	      break;
	    case DAY_OF_WEEK:
	      fields[DAY_OF_MONTH] = undefined;
	      break;
	    case WEEK_OF_YEAR:
	      fields[DAY_OF_YEAR] = undefined;
	      fields[MONTH] = undefined;
	      break;
	    default:
	      break;
	    }
	  },

	  /*
	   * get current date instance's timezone offset
	   * @returns {Number}
	   */
	  getTimezoneOffset() {
	    return this.timezoneOffset;
	  },

	  /*
	   * set current date instance's timezone offset
	   */
	  setTimezoneOffset(timezoneOffset) {
	    if (this.timezoneOffset !== timezoneOffset) {
	      this.fieldsComputed = undefined;
	      this.timezoneOffset = timezoneOffset;
	    }
	  },

	  /*
	   * set first day of week for current date instance
	   */
	  setFirstDayOfWeek(firstDayOfWeek) {
	    if (this.firstDayOfWeek !== firstDayOfWeek) {
	      this.firstDayOfWeek = firstDayOfWeek;
	      this.fieldsComputed = false;
	    }
	  },

	  /*
	   * Gets what the first day of the week is; e.g., SUNDAY in the U.S., MONDAY in France.
	   * @returns {Number} the first day of the week.
	   */
	  getFirstDayOfWeek() {
	    return this.firstDayOfWeek;
	  },

	  /*
	   * Sets what the minimal days required in the first week of the year are; For example,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * call this method with value 1.
	   * If it must be a full week, use value 7.
	   * @param minimalDaysInFirstWeek the given minimal days required in the first week of the year.
	   */
	  setMinimalDaysInFirstWeek(minimalDaysInFirstWeek) {
	    if (this.minimalDaysInFirstWeek !== minimalDaysInFirstWeek) {
	      this.minimalDaysInFirstWeek = minimalDaysInFirstWeek;
	      this.fieldsComputed = false;
	    }
	  },

	  /*
	   * Gets what the minimal days required in the first week of the year are; e.g.,
	   * if the first week is defined as one that contains the first day of the first month of a year,
	   * this method returns 1.
	   * If the minimal days required must be a full week, this method returns 7.
	   * @returns {Number} the minimal days required in the first week of the year.
	   */
	  getMinimalDaysInFirstWeek() {
	    return this.minimalDaysInFirstWeek;
	  },

	  /*
	   * Returns the number of weeks in the week year
	   * represented by this GregorianCalendar.
	   *
	   * For example, if this GregorianCalendar's date is
	   * December 31, 2008 with the ISO
	   * 8601 compatible setting, this method will return 53 for the
	   * period: December 29, 2008 to January 3, 2010
	   * while getActualMaximum(WEEK_OF_YEAR) will return
	   * 52 for the period: December 31, 2007 to December 28, 2008.
	   *
	   * @return {Number} the number of weeks in the week year.
	   */
	  getWeeksInWeekYear() {
	    const weekYear = this.getWeekYear();
	    if (weekYear === this.get(YEAR)) {
	      return this.getActualMaximum(WEEK_OF_YEAR);
	    }
	    // Use the 2nd week for calculating the max of WEEK_OF_YEAR
	    const gc = this.clone();
	    gc.clear();
	    gc.setWeekDate(weekYear, 2, this.get(DAY_OF_WEEK));
	    return gc.getActualMaximum(WEEK_OF_YEAR);
	  },

	  /*
	   * Returns the week year represented by this GregorianCalendar.
	   * The dates in the weeks between 1 and the
	   * maximum week number of the week year have the same week year value
	   * that may be one year before or after the calendar year value.
	   *
	   * @return {Number} the week year represented by this GregorianCalendar.
	   */
	  getWeekYear() {
	    let year = this.get(YEAR); // implicitly  complete
	    const weekOfYear = this.get(WEEK_OF_YEAR);
	    const month = this.get(MONTH);
	    if (month === GregorianCalendar.JANUARY) {
	      if (weekOfYear >= 52) {
	        --year;
	      }
	    } else if (month === GregorianCalendar.DECEMBER) {
	      if (weekOfYear === 1) {
	        ++year;
	      }
	    }
	    return year;
	  },
	  /*
	   * Sets this GregorianCalendar to the date given by the date specifiers - weekYear,
	   * weekOfYear, and dayOfWeek. weekOfYear follows the WEEK_OF_YEAR numbering.
	   * The dayOfWeek value must be one of the DAY_OF_WEEK values: SUNDAY to SATURDAY.
	   *
	   * @param weekYear    the week year
	   * @param weekOfYear  the week number based on weekYear
	   * @param dayOfWeek   the day of week value
	   */
	  setWeekDate(weekYear, weekOfYear, dayOfWeek) {
	    if (dayOfWeek < GregorianCalendar.SUNDAY || dayOfWeek > GregorianCalendar.SATURDAY) {
	      throw new Error('invalid dayOfWeek: ' + dayOfWeek);
	    }
	    const fields = this.fields;
	    // To avoid changing the time of day fields by date
	    // calculations, use a clone with the GMT time zone.
	    const gc = this.clone();
	    gc.clear();
	    gc.setTimezoneOffset(0);
	    gc.set(YEAR, weekYear);
	    gc.set(WEEK_OF_YEAR, 1);
	    gc.set(DAY_OF_WEEK, this.getFirstDayOfWeek());
	    let days = dayOfWeek - this.getFirstDayOfWeek();
	    if (days < 0) {
	      days += 7;
	    }
	    days += 7 * (weekOfYear - 1);
	    if (days !== 0) {
	      gc.add(DAY_OF_YEAR, days);
	    } else {
	      gc.complete();
	    }
	    fields[YEAR] = gc.get(YEAR);
	    fields[MONTH] = gc.get(MONTH);
	    fields[DAY_OF_MONTH] = gc.get(DAY_OF_MONTH);
	    this.complete();
	  },
	  /*
	   * Creates and returns a copy of this object.
	   * @returns {Date.Gregorian}
	   */
	  clone() {
	    if (this.time === undefined) {
	      this.computeTime();
	    }
	    const cal = new GregorianCalendar(this.locale);
	    cal.setTimezoneOffset(cal.getTimezoneOffset());
	    cal.setFirstDayOfWeek(cal.getFirstDayOfWeek());
	    cal.setMinimalDaysInFirstWeek(cal.getMinimalDaysInFirstWeek());
	    cal.setTime(this.time);
	    return cal;
	  },

	  /*
	   * Compares this GregorianCalendar to the specified Object.
	   * The result is true if and only if the argument is a GregorianCalendar object
	   * that represents the same time value (millisecond offset from the Epoch)
	   * under the same Calendar parameters and Gregorian change date as this object.
	   * @param {Date.Gregorian} obj the object to compare with.
	   * @returns {boolean} true if this object is equal to obj; false otherwise.
	   */
	  equals(obj) {
	    return this.getTime() === obj.getTime() &&
	      this.firstDayOfWeek === obj.firstDayOfWeek &&
	      this.timezoneOffset === obj.timezoneOffset &&
	      this.minimalDaysInFirstWeek === obj.minimalDaysInFirstWeek;
	  },

	  compareToDay(d2) {
	    const d1Year = this.getYear();
	    const d2Year = d2.getYear();
	    const d1Month = this.getMonth();
	    const d2Month = d2.getMonth();
	    const d1Day = this.getDayOfMonth();
	    const d2Day = d2.getDayOfMonth();
	    if (d1Year !== d2Year) {
	      return d1Year - d2Year;
	    }
	    if (d1Month !== d2Month) {
	      return d1Month - d2Month;
	    }
	    return d1Day - d2Day;
	  },

	  /*
	   * Sets all the calendar field values or specified field and the time value
	   * (millisecond offset from the Epoch) of this Calendar undefined.
	   * This means that isSet() will return false for all the calendar fields,
	   * and the date and time calculations will treat the fields as if they had never been set.
	   * @param [field] the calendar field to be cleared.
	   */
	  clear(field) {
	    if (field === undefined) {
	      this.field = [];
	    } else {
	      this.fields[field] = undefined;
	    }
	    this.time = undefined;
	    this.fieldsComputed = false;
	  },

	  toString() {
	    // for debug
	    const v = this;
	    return '[GregorianCalendar]: ' + v.getYear() + '/' + v.getMonth() + '/' + v.getDayOfMonth() +
	      ' ' + v.getHourOfDay() + ':' + v.getMinutes() + ':' + v.getSeconds();
	  },
	};

	const GregorianCalendarProto = GregorianCalendar.prototype;

	Utils.each(FIELDS, (f, index) => {
	  if (f) {
	    GregorianCalendarProto['get' + f] = function get() {
	      return this.get(index);
	    };

	    GregorianCalendarProto['isSet' + f] = function isSet() {
	      return this.isSet(index);
	    };

	    GregorianCalendarProto['set' + f] = function set(v) {
	      return this.set(index, v);
	    };

	    GregorianCalendarProto['add' + f] = function add(v) {
	      return this.add(index, v);
	    };

	    GregorianCalendarProto['roll' + f] = function roll(v) {
	      return this.roll(index, v);
	    };

	    GregorianCalendarProto['rollSet' + f] = function rollSet(v) {
	      return this.rollSet(index, v);
	    };
	  }
	});
	/*
	 http://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html

	 TODO
	 - day saving time
	 - i18n
	 - julian calendar
	 */


	RC.GregorianCalendar = GregorianCalendar;
	
	
	
	
	
	/**
	 * @ignore
	 * DateTimeFormat for
	 * Inspired by DateTimeFormat from JDK.
	 * @author yiminghe@gmail.com
	 */

	const enUsLocale = Locale.GregorianCalendar;
	const MAX_VALUE = Number.MAX_VALUE;

	/**
	 * date or time style enum
	 * @enum {Number} Date.Formatter.Style
	 */
	const DateTimeStyle = {
	  /**
	   * full style
	   */
	  FULL: 0,
	  /**
	   * long style
	   */
	  LONG: 1,
	  /**
	   * medium style
	   */
	  MEDIUM: 2,
	  /**
	   * short style
	   */
	  SHORT: 3,
	};

	/*
	 Letter    Date or Time Component    Presentation    Examples
	 G    Era designator    Text    AD
	 y    Year    Year    1996; 96
	 Y    WeekYear    WeekYear    1996; 96
	 M    Month in year    Month    July; Jul; 07
	 w    Week in year    Number    27
	 W    Week in month    Number    2
	 D    Day in year    Number    189
	 d    Day in month    Number    10
	 F    Day of week in month    Number    2
	 E    Day in week    Text    Tuesday; Tue
	 a    Am/pm marker    Text    PM
	 H    Hour in day (0-23)    Number    0
	 k    Hour in day (1-24)    Number    24
	 K    Hour in am/pm (0-11)    Number    0
	 h    Hour in am/pm (1-12)    Number    12
	 m    Minute in hour    Number    30
	 s    Second in minute    Number    55
	 S    Millisecond    Number    978
	 x z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00
	 Z    Time zone    RFC 822 time zone    -0800
	 */

	let patternChars = new Array(GregorianCalendar.DAY_OF_WEEK_IN_MONTH + 2).join('1');
	const ERA = 0;
	const calendarIndexMap = {};

	patternChars = patternChars.split('');
	patternChars[ERA] = 'G';
	patternChars[GregorianCalendar.YEAR] = 'y';
	patternChars[GregorianCalendar.MONTH] = 'M';
	patternChars[GregorianCalendar.DAY_OF_MONTH] = 'd';
	patternChars[GregorianCalendar.HOUR_OF_DAY] = 'H';
	patternChars[GregorianCalendar.MINUTES] = 'm';
	patternChars[GregorianCalendar.SECONDS] = 's';
	patternChars[GregorianCalendar.MILLISECONDS] = 'S';
	patternChars[GregorianCalendar.WEEK_OF_YEAR] = 'w';
	patternChars[GregorianCalendar.WEEK_OF_MONTH] = 'W';
	patternChars[GregorianCalendar.DAY_OF_YEAR] = 'D';
	patternChars[GregorianCalendar.DAY_OF_WEEK_IN_MONTH] = 'F';
	patternChars.push('Y');

	patternChars.forEach((v, key)=> {
	  let k = key;
	  if (v === 'Y') {
	    k = GregorianCalendar.YEAR;
	  }
	  if (v) {
	    calendarIndexMap[v] = k;
	  }
	});

	function mix(t, s) {
	  for (const p in s) {
	    if (s.hasOwnProperty(p)) {
	      t[p] = s[p];
	    }
	  }
	}

	const SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g;
	const EMPTY = '';

	function substitute(str, o, regexp) {
	  if (typeof str !== 'string' || !o) {
	    return str;
	  }

	  return str.replace(regexp || SUBSTITUTE_REG, (match, name) => {
	    if (match.charAt(0) === '\\') {
	      return match.slice(1);
	    }
	    return (o[name] === undefined) ? EMPTY : o[name];
	  });
	}

	patternChars = patternChars.join('') + 'ahkKZE';

	function encode(lastField, count, compiledPattern) {
	  compiledPattern.push({
	    field: lastField,
	    count: count,
	  });
	}

	function compile(pattern) {
	  const length = pattern.length;
	  let inQuote = false;
	  const compiledPattern = [];
	  let tmpBuffer = null;
	  let count = 0;
	  let lastField = -1;

	  for (let i = 0; i < length; i++) {
	    let c = pattern.charAt(i);

	    if (c === '\'') {
	      // '' is treated as a single quote regardless of being
	      // in a quoted section.
	      if ((i + 1) < length) {
	        c = pattern.charAt(i + 1);
	        if (c === '\'') {
	          i++;
	          if (count !== 0) {
	            encode(lastField, count, compiledPattern);
	            lastField = -1;
	            count = 0;
	          }
	          if (inQuote) {
	            tmpBuffer += c;
	          }
	          continue;
	        }
	      }
	      if (!inQuote) {
	        if (count !== 0) {
	          encode(lastField, count, compiledPattern);
	          lastField = -1;
	          count = 0;
	        }
	        tmpBuffer = '';
	        inQuote = true;
	      } else {
	        compiledPattern.push({
	          text: tmpBuffer,
	        });
	        inQuote = false;
	      }
	      continue;
	    }
	    if (inQuote) {
	      tmpBuffer += c;
	      continue;
	    }
	    if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
	      if (count !== 0) {
	        encode(lastField, count, compiledPattern);
	        lastField = -1;
	        count = 0;
	      }
	      compiledPattern.push({
	        text: c,
	      });
	      continue;
	    }

	    if (patternChars.indexOf(c) === -1) {
	      throw new Error('Illegal pattern character "' + c + '"');
	    }

	    if (lastField === -1 || lastField === c) {
	      lastField = c;
	      count++;
	      continue;
	    }
	    encode(lastField, count, compiledPattern);
	    lastField = c;
	    count = 1;
	  }

	  if (inQuote) {
	    throw new Error('Unterminated quote');
	  }

	  if (count !== 0) {
	    encode(lastField, count, compiledPattern);
	  }

	  return compiledPattern;
	}

	const zeroDigit = '0';

	// TODO zeroDigit localization??
	function zeroPaddingNumber(value, minDigits, maxDigits_, b) {
	  // Optimization for 1, 2 and 4 digit numbers. This should
	  // cover most cases of formatting date/time related items.
	  // Note: This optimization code assumes that maxDigits is
	  // either 2 or Integer.MAX_VALUE (maxIntCount in format()).
	  const buffer = b || [];
	  const maxDigits = maxDigits_ || MAX_VALUE;
	  if (value >= 0) {
	    if (value < 100 && minDigits >= 1 && minDigits <= 2) {
	      if (value < 10 && minDigits === 2) {
	        buffer.push(zeroDigit);
	      }
	      buffer.push(value);
	      return buffer.join('');
	    } else if (value >= 1000 && value < 10000) {
	      if (minDigits === 4) {
	        buffer.push(value);
	        return buffer.join('');
	      }
	      if (minDigits === 2 && maxDigits === 2) {
	        return zeroPaddingNumber(value % 100, 2, 2, buffer);
	      }
	    }
	  }
	  buffer.push(value + '');
	  return buffer.join('');
	}

	/**
	 *
	 * date time formatter for GregorianCalendar
	 *
	 *      @example
	 *
	 *          const calendar = new GregorianCalendar(2013,9,24);
	 *          // ' to escape
	 *          const formatter = new GregorianCalendarFormat("'today is' ''yyyy/MM/dd a''");
	 *          document.write(formatter.format(calendar));
	 *
	 * @class GregorianCalendarFormat
	 * @param {String} pattern patter string of date formatter
	 *
	 * <table border="1">
	 * <thead valign="bottom">
	 * <tr><th class="head">Letter</th>
	 * <th class="head">Date or Time Component</th>
	 * <th class="head">Presentation</th>
	 * <th class="head">Examples</th>
	 * </tr>
	 * </thead>
	 * <tbody valign="top">
	 * <tr><td>G</td>
	 * <td>Era designator</td>
	 * <td>Text</td>
	 * <td>AD</td>
	 * </tr>
	 * <tr><td>y</td>
	 * <td>Year</td>
	 * <td>Year</td>
	 * <td>1996; 96</td>
	 * </tr>
	 * <tr><td>M</td>
	 * <td>Month in year</td>
	 * <td>Month</td>
	 * <td>July; Jul; 07</td>
	 * </tr>
	 * <tr><td>w</td>
	 * <td>Week in year</td>
	 * <td>Number</td>
	 * <td>27</td>
	 * </tr>
	 * <tr><td>W</td>
	 * <td>Week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>D</td>
	 * <td>Day in year</td>
	 * <td>Number</td>
	 * <td>189</td>
	 * </tr>
	 * <tr><td>d</td>
	 * <td>Day in month</td>
	 * <td>Number</td>
	 * <td>10</td>
	 * </tr>
	 * <tr><td>F</td>
	 * <td>Day of week in month</td>
	 * <td>Number</td>
	 * <td>2</td>
	 * </tr>
	 * <tr><td>E</td>
	 * <td>Day in week</td>
	 * <td>Text</td>
	 * <td>Tuesday; Tue</td>
	 * </tr>
	 * <tr><td>a</td>
	 * <td>Am/pm marker</td>
	 * <td>Text</td>
	 * <td>PM</td>
	 * </tr>
	 * <tr><td>H</td>
	 *       <td>Hour in day (0-23)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>k</td>
	 *       <td>Hour in day (1-24)</td>
	 * <td>Number</td>
	 * <td>24</td>
	 * </tr>
	 * <tr><td>K</td>
	 * <td>Hour in am/pm (0-11)</td>
	 * <td>Number</td>
	 * <td>0</td>
	 * </tr>
	 * <tr><td>h</td>
	 * <td>Hour in am/pm (1-12)</td>
	 * <td>Number</td>
	 * <td>12</td>
	 * </tr>
	 * <tr><td>m</td>
	 * <td>Minute in hour</td>
	 * <td>Number</td>
	 * <td>30</td>
	 * </tr>
	 * <tr><td>s</td>
	 * <td>Second in minute</td>
	 * <td>Number</td>
	 * <td>55</td>
	 * </tr>
	 * <tr><td>S</td>
	 * <td>Millisecond</td>
	 * <td>Number</td>
	 * <td>978</td>
	 * </tr>
	 * <tr><td>x/z</td>
	 * <td>Time zone</td>
	 * <td>General time zone</td>
	 * <td>Pacific Standard Time; PST; GMT-08:00</td>
	 * </tr>
	 * <tr><td>Z</td>
	 * <td>Time zone</td>
	 * <td>RFC 822 time zone</td>
	 * <td>-0800</td>
	 * </tr>
	 * </tbody>
	 * </table>
	 * @param {Object} locale format locale
	 */
	function DateTimeFormat(pattern, locale) {
	  this.locale = locale || enUsLocale;
	  this.originalPattern = pattern;
	  this.pattern = compile(pattern);
	}

	function formatField(field, count, locale, calendar) {
	  let current;
	  let value;
	  switch (field) {
	    case 'G':
	      value = calendar.getYear() > 0 ? 1 : 0;
	      current = locale.eras[value];
	      break;
	    case 'Y':
	      value = calendar.getWeekYear();
	      if (value <= 0) {
	        value = 1 - value;
	      }
	      current = (zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2));
	      break;
	    case 'y':
	      value = calendar.getYear();
	      if (value <= 0) {
	        value = 1 - value;
	      }
	      current = (zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2));
	      break;
	    case 'M':
	      value = calendar.getMonth();
	      if (count >= 4) {
	        current = locale.months[value];
	      } else if (count === 3) {
	        current = locale.shortMonths[value];
	      } else {
	        current = zeroPaddingNumber(value + 1, count);
	      }
	      break;
	    case 'k':
	      current = zeroPaddingNumber(calendar.getHourOfDay() || 24,
	        count);
	      break;
	    case 'E':
	      value = calendar.getDayOfWeek();
	      current = count >= 4 ?
	        locale.weekdays[value] :
	        locale.shortWeekdays[value];
	      break;
	    case 'a':
	      current = locale.ampms[calendar.getHourOfDay() >= 12 ?
	        1 :
	        0];
	      break;
	    case 'h':
	      current = zeroPaddingNumber(calendar.
	        getHourOfDay() % 12 || 12, count);
	      break;
	    case 'K':
	      current = zeroPaddingNumber(calendar.
	        getHourOfDay() % 12, count);
	      break;
	    case 'Z':
	      let offset = calendar.getTimezoneOffset();
	      const parts = [offset < 0 ? '-' : '+'];
	      offset = Math.abs(offset);
	      parts.push(zeroPaddingNumber(Math.floor(offset / 60) % 100, 2),
	        zeroPaddingNumber(offset % 60, 2));
	      current = parts.join('');
	      break;
	    default :
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W':
	      const index = calendarIndexMap[field];
	      value = calendar.get(index);
	      current = zeroPaddingNumber(value, count);
	  }
	  return current;
	}

	function matchPartString(dateStr, startIndex, match, mLen) {
	  for (let i = 0; i < mLen; i++) {
	    if (dateStr.charAt(startIndex + i) !== match.charAt(i)) {
	      return false;
	    }
	  }
	  return true;
	}

	function matchField(dateStr, startIndex, matches) {
	  let matchedLen = -1;
	  let index = -1;
	  let i;
	  const len = matches.length;
	  for (i = 0; i < len; i++) {
	    const m = matches[i];
	    const mLen = m.length;
	    if (mLen > matchedLen &&
	      matchPartString(dateStr, startIndex, m, mLen)) {
	      matchedLen = mLen;
	      index = i;
	    }
	  }
	  return index >= 0 ? {
	    value: index,
	    startIndex: startIndex + matchedLen,
	  } : null;
	}

	function getLeadingNumberLen(str) {
	  let i;
	  let c;
	  const len = str.length;
	  for (i = 0; i < len; i++) {
	    c = str.charAt(i);
	    if (c < '0' || c > '9') {
	      break;
	    }
	  }
	  return i;
	}

	function matchNumber(dateStr, startIndex, count, obeyCount) {
	  let str = dateStr;
	  let n;
	  if (obeyCount) {
	    if (dateStr.length < startIndex + count) {
	      return null;
	    }
	    str = dateStr.slice(startIndex, startIndex + count);
	    if (!str.match(/^\d+$/)) {
	      throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + (this.originalPattern));
	    }
	  } else {
	    str = str.slice(startIndex);
	  }
	  n = parseInt(str, 10);
	  if (isNaN(n)) {
	    throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + (this.originalPattern));
	  }
	  return {
	    value: n,
	    startIndex: startIndex + getLeadingNumberLen(str),
	  };
	}

	function parseField(calendar, dateStr, startIndex_, field, count, obeyCount, tmp) {
	  let match;
	  let year;
	  let hour;
	  let startIndex = startIndex_;
	  if (dateStr.length <= startIndex) {
	    return startIndex;
	  }
	  const locale = this.locale;
	  switch (field) {
	    case 'G':
	      match = matchField(dateStr, startIndex, locale.eras);
	      if (match) {
	        if (calendar.isSetYear()) {
	          if (match.value === 0) {
	            year = calendar.getYear();
	            calendar.setYear(1 - year);
	          }
	        } else {
	          tmp.era = match.value;
	        }
	      }
	      break;
	    case 'y':
	      match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
	      if (match) {
	        year = match.value;
	        if ('era' in tmp) {
	          if (tmp.era === 0) {
	            year = 1 - year;
	          }
	        }
	        calendar.setYear(year);
	      }
	      break;
	    case 'M':
	      let month;
	      if (count >= 3) {
	        match = matchField(dateStr, startIndex, locale[count === 3 ?
	          'shortMonths' : 'months']);
	        if (match) {
	          month = match.value;
	        }
	      } else {
	        match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
	        if (match) {
	          month = match.value - 1;
	        }
	      }
	      if (match) {
	        calendar.setMonth(month);
	      }
	      break;
	    case 'k':
	      match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
	      if (match) {
	        calendar.setHourOfDay(match.value % 24);
	      }
	      break;
	    case 'E':
	      match = matchField(dateStr, startIndex, locale[count > 3 ?
	        'weekdays' :
	        'shortWeekdays']);
	      if (match) {
	        calendar.setDayOfWeek(match.value);
	      }
	      break;
	    case 'a':
	      match = matchField(dateStr, startIndex, locale.ampms);
	      if (match) {
	        if (calendar.isSetHourOfDay()) {
	          if (match.value) {
	            hour = calendar.getHourOfDay();
	            if (hour < 12) {
	              calendar.setHourOfDay((hour + 12) % 24);
	            }
	          }
	        } else {
	          tmp.ampm = match.value;
	        }
	      }
	      break;
	    case 'h':
	      match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
	      if (match) {
	        hour = match.value %= 12;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'K':
	      match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
	      if (match) {
	        hour = match.value;
	        if (tmp.ampm) {
	          hour += 12;
	        }
	        calendar.setHourOfDay(hour);
	      }
	      break;
	    case 'Z':
	      // let sign = 1;
	      const zoneChar = dateStr.charAt(startIndex);
	      if (zoneChar === '-') {
	        // sign = -1;
	        startIndex++;
	      } else if (zoneChar === '+') {
	        startIndex++;
	      } else {
	        break;
	      }
	      match = matchNumber.call(this, dateStr, startIndex, 2, true);
	      if (match) {
	        let zoneOffset = match.value * 60;
	        startIndex = match.startIndex;
	        match = matchNumber.call(this, dateStr, startIndex, 2, true);
	        if (match) {
	          zoneOffset += match.value;
	        }
	        calendar.setTimezoneOffset(zoneOffset);
	      }
	      break;
	    default :
	      // case 'd':
	      // case 'H':
	      // case 'm':
	      // case 's':
	      // case 'S':
	      // case 'D':
	      // case 'F':
	      // case 'w':
	      // case 'W'
	      match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
	      if (match) {
	        const index = calendarIndexMap[field];
	        calendar.set(index, match.value);
	      }
	  }
	  if (match) {
	    startIndex = match.startIndex;
	  }
	  return startIndex;
	}

	mix(DateTimeFormat.prototype, {
	  /*
	   * format a GregorianDate instance according to specified pattern
	   * @param {GregorianCalendar} calendar GregorianDate instance
	   * @returns {string} formatted string of GregorianDate instance
	   */
	  format(calendar) {
	    if (!calendar.isGregorianCalendar) {
	      throw new Error('calendar must be type of GregorianCalendar');
	    }
	    let i;
	    const ret = [];
	    const pattern = this.pattern;
	    const len = pattern.length;
	    for (i = 0; i < len; i++) {
	      const comp = pattern[i];
	      if (comp.text) {
	        ret.push(comp.text);
	      } else if ('field' in comp) {
	        ret.push(formatField(comp.field, comp.count, this.locale, calendar));
	      }
	    }
	    return ret.join('');
	  },

	  /*
	   * parse a formatted string of GregorianDate instance according to specified pattern
	   * @param {String} dateStr formatted string of GregorianDate
	   * @returns {GregorianCalendar}
	   */
	  parse(dateStr, option_) {
	    const option = option_ || {};
	    const calendarLocale = option.locale;
	    const calendar = new GregorianCalendar(calendarLocale);
	    let i;
	    let j;
	    const tmp = {};
	    let obeyCount = option.obeyCount || false;
	    const dateStrLen = dateStr.length;
	    let errorIndex = -1;
	    let startIndex = 0;
	    let oldStartIndex = 0;
	    const pattern = this.pattern;
	    const len = pattern.length;
	    /* eslint no-labels: 0 no-empty-label:0 */
	    loopPattern: {
	      for (i = 0; errorIndex < 0 && i < len; i++) {
	        const comp = pattern[i];
	        let text;
	        let textLen;
	        oldStartIndex = startIndex;
	        text = comp.text;
	        if (text) {
	          textLen = text.length;
	          if ((textLen + startIndex) > dateStrLen) {
	            errorIndex = startIndex;
	          } else {
	            for (j = 0; j < textLen; j++) {
	              if (text.charAt(j) !== dateStr.charAt(j + startIndex)) {
	                errorIndex = startIndex;
	                break loopPattern;
	              }
	            }
	            startIndex += textLen;
	          }
	        } else if ('field' in comp) {
	          if (!option.obeyCount) {
	            const nextComp = pattern[i + 1];
	            obeyCount = false;
	            if (nextComp) {
	              if ('field' in nextComp) {
	                obeyCount = true;
	              } else {
	                const c = nextComp.text.charAt(0);
	                if (c >= '0' && c <= '9') {
	                  obeyCount = true;
	                }
	              }
	            }
	          }
	          startIndex = parseField.call(this, calendar,
	            dateStr,
	            startIndex,
	            comp.field,
	            comp.count,
	            obeyCount,
	            tmp);
	          if (startIndex === oldStartIndex) {
	            errorIndex = startIndex;
	          }
	        }
	      }
	    }

	    if (errorIndex >= 0) {
	      warning(false, 'error when parsing date: ' + dateStr + ', position: ' + dateStr.slice(0, errorIndex) + '^');
	      return undefined;
	    }
	    return calendar;
	  },
	});

	mix(DateTimeFormat, {
	  Style: DateTimeStyle,

	  /*
	   * get a formatter instance of short style pattern.
	   * en-us: M/d/yy h:mm a
	   * zh-cn: yy-M-d ah:mm
	   * @param {Object} locale locale object
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getInstance(locale) {
	    return this.getDateTimeInstance(DateTimeStyle.SHORT, DateTimeStyle.SHORT, locale);
	  },

	  /*
	   * get a formatter instance of specified date style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getDateInstance(dateStyle, locale) {
	    return this.getDateTimeInstance(dateStyle, undefined, locale);
	  },

	  /*
	   * get a formatter instance of specified date style and time style.
	   * @param {Date.Formatter.Style} dateStyle date format style
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getDateTimeInstance(dateStyle, timeStyle, locale_) {
	    const locale = locale_ || enUsLocale;
	    let datePattern = '';
	    if (dateStyle !== undefined) {
	      datePattern = locale.datePatterns[dateStyle];
	    }
	    let timePattern = '';
	    if (timeStyle !== undefined) {
	      timePattern = locale.timePatterns[timeStyle];
	    }
	    let pattern = datePattern;
	    if (timePattern) {
	      if (datePattern) {
	        pattern = substitute(locale.dateTimePattern, {
	          date: datePattern,
	          time: timePattern,
	        });
	      } else {
	        pattern = timePattern;
	      }
	    }
	    return new DateTimeFormat(pattern, locale);
	  },

	  /*
	   * get a formatter instance of specified time style.
	   * @param {Date.Formatter.Style} timeStyle time format style
	   * @param {Object} locale
	   * @returns {GregorianCalendar}
	   * @static
	   */
	  getTimeInstance(timeStyle, locale) {
	    return this.getDateTimeInstance(undefined, timeStyle, locale);
	  },
	});

	DateTimeFormat.version = '@VERSION@';

	RC.DateTimeFormat = DateTimeFormat;
	 
}(Smart.RC)