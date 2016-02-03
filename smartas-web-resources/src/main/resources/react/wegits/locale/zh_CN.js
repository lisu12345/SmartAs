+ function(Namespace,RC) {
  var UI = Namespace.register("Smart.UI");
  const {Locale} = RC,
    {GregorianCalendar,Timepicker,Calendar} = Locale,
    assign = _.assign;

  const locale = {
    // 统一合并为完整的 Locale
    Timepicker: assign({}, GregorianCalendar, {
      lang: assign({
        placeholder: '请选择时间',
      }, Timepicker)
    }),
    // 统一合并为完整的 Locale
    Calendar: assign({}, GregorianCalendar, {
      lang: assign({
        placeholder: '请选择时间',
        timePlaceholder: '请选择时间',
        ok: '确 定',
      }, Calendar)
    }),
  };
  
  UI.Locale = locale;
}(Smart.Namespace,Smart.RC)