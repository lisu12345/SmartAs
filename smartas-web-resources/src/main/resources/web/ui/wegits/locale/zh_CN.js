'use strict';

+(function (Namespace, RC) {
  var UI = Namespace.register("Smart.UI");
  var Locale = RC.Locale;
  var GregorianCalendar = Locale.GregorianCalendar;
  var Timepicker = Locale.Timepicker;
  var Calendar = Locale.Calendar;
  var assign = _.assign;

  var locale = {
    // 统一合并为完整的 Locale
    TimePicker: assign({}, GregorianCalendar, {
      lang: assign({
        placeholder: '请选择时间'
      }, Timepicker)
    }),
    // 统一合并为完整的 Locale
    Calendar: assign({}, GregorianCalendar, {
      lang: assign({
        placeholder: '请选择时间',
        timePlaceholder: '请选择时间',
        ok: '确 定'
      }, Calendar)
    })
  };

  UI.Locale = locale;
})(Smart.Namespace, Smart.RC);