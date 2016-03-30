'use strict';

+function (Namespace) {
  var RC = Namespace.register("Smart.RC");
  var locale = {
    Pagination: {
      // Options.jsx
      items_per_page: '/page',
      jump_to: 'Goto',
      page: '',

      // Pager.jsx
      first_page: 'First Page',
      last_page: 'Last Page',

      // Pagination.jsx
      prev_page: 'Previous Page',
      next_page: 'Next Page',
      prev_5: 'Previsous 5 Pages',
      next_5: 'Next 5 Pages'
    },
    Table: {
      filterTitle: '筛选',
      filterConfirm: '确定',
      filterReset: '重置',
      emptyText: '暂无数据'
    },
    /*
     * en-us locale
     * @ignore
     * @author yiminghe@gmail.com
     */
    GregorianCalendar: {
      // in minutes
      timezoneOffset: -8 * 60,
      firstDayOfWeek: 0,
      minimalDaysInFirstWeek: 1
    },
    DateTimeFormat: {
      eras: ['BC', 'AD'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortWeekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      veryShortWeekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      ampms: ['AM', 'PM'],
      datePatterns: ['EEEE, MMMM d, yyyy', 'MMMM d, yyyy', 'MMM d, yyyy', 'M/d/yy'],
      timePatterns: ['h:mm:ss a \'GMT\'Z', 'h:mm:ss a', 'h:mm:ss a', 'h:mm a'],
      dateTimePattern: '{date} {time}'
    },
    TimePicker: {
      clear: 'Clear'
    },
    //format: DateTimeFormat,
    //calendar: GregorianCalendar,
    Calendar: {
      today: 'Today',
      now: 'Now',
      ok: 'Ok',
      clear: 'Clear',
      month: 'Month',
      year: 'Year',
      monthSelect: 'Choose a month',
      yearSelect: 'Choose a year',
      decadeSelect: 'Choose a decade',
      yearFormat: 'yyyy',
      dateFormat: 'M/d/yyyy',
      monthFormat: 'MMMM',
      monthBeforeYear: true,
      previousMonth: 'Previous month (PageUp)',
      nextMonth: 'Next month (PageDown)',
      previousYear: 'Last year (Control + left)',
      nextYear: 'Next year (Control + right)',
      previousDecade: 'Last decade',
      nextDecade: 'Next decade',
      previousCentury: 'Last century',
      nextCentury: 'Next century'
    }
  };

  //format: DateTimeFormat,
  var DateTimeFormat = locale.DateTimeFormat;
  var GregorianCalendar = locale.GregorianCalendar;


  locale.TimePicker.format = DateTimeFormat;
  locale.TimePicker.calendar = GregorianCalendar;
  locale.Calendar.format = DateTimeFormat;

  RC.Locale = locale;
}(Smart.Namespace);