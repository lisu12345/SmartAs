'use strict';

+(function (Namespace) {
  var RC = Namespace.register("Smart.RC");
  var locale = {
    Pagination: {
      // Options.jsx
      items_per_page: '条/页',
      jump_to: '跳至',
      page: '页',

      // Pager.jsx
      first_page: '第一页',
      last_page: '最后一页',

      // Pagination.jsx
      prev_page: '上一页',
      next_page: '下一页',
      prev_5: '向前 5 页',
      next_5: '向后 5 页'
    },

    Table: {
      filterTitle: '筛选',
      filterConfirm: '确定',
      filterReset: '重置',
      emptyText: '暂无数据'
    },
    /*
     * zh-cn locale
     * @ignore
     * @author yiminghe@gmail.com
     */
    GregorianCalendar: {
      // in minutes
      timezoneOffset: 8 * 60,
      firstDayOfWeek: 1,
      minimalDaysInFirstWeek: 1
    },
    DateTimeFormat: {
      eras: ['公元前', '公元'],
      months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      shortMonths: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
      weekdays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
      shortWeekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      veryShortWeekdays: ['日', '一', '二', '三', '四', '五', '六'],
      ampms: ['上午', '下午'],
      datePatterns: ['yyyy\'年\'M\'月\'d\'日\' EEEE', 'yyyy\'年\'M\'月\'d\'日\'', 'yyyy-M-d', 'yy-M-d'],
      timePatterns: ['ahh\'时\'mm\'分\'ss\'秒\' \'GMT\'Z', 'ahh\'时\'mm\'分\'ss\'秒\'', 'H:mm:ss', 'ah:mm'],
      dateTimePattern: '{date} {time}'
    },
    TimePicker: {
      clear: '清除'
    },
    //format: DateTimeFormat,
    //calendar: GregorianCalendar,
    Calendar: {
      today: '今天',
      now: '此刻',
      ok: '确定',
      clear: '清除',
      month: '月',
      year: '年',
      previousMonth: '上个月 (翻页上键)',
      nextMonth: '下个月 (翻页下键)',
      monthSelect: '选择月份',
      yearSelect: '选择年份',
      decadeSelect: '选择年代',
      yearFormat: 'yyyy\'年\'',
      monthFormat: 'M\'月\'',
      dateFormat: 'yyyy\'年\'M\'月\'d\'日\'',
      previousYear: '上一年 (Control键加左方向键)',
      nextYear: '下一年 (Control键加右方向键)',
      previousDecade: '上一年代',
      nextDecade: '下一年代',
      previousCentury: '上一世纪',
      nextCentury: '下一世纪'
    }
  };
  //format: DateTimeFormat,
  var DateTimeFormat = locale.DateTimeFormat;
  var GregorianCalendar = locale.GregorianCalendar;

  locale.TimePicker.format = DateTimeFormat;
  locale.TimePicker.calendar = GregorianCalendar;
  locale.Calendar.format = DateTimeFormat;

  RC.Locale = locale;
})(Smart.Namespace);