+ function(Namespace, RC) {
	var UI = Namespace.register("Smart.UI");
	const {Locale} = RC,
		{GregorianCalendar,Timepicker,Calendar} = Locale,
		assign = _.assign;

	const locale = {
		// 统一合并为完整的 Locale
		TimePicker: assign({}, GregorianCalendar, {
			lang: assign({
				placeholder: 'Select a time',
			}, Timepicker)
		}),

		// 统一合并为完整的 Locale
		 Calendar: assign({}, GregorianCalendar, {
			lang: assign({
				placeholder: 'Select date',
				timePlaceholder: 'Select time',
			},  Calendar)
		}),

	};

	UI.Locale = locale;
}(Smart.Namespace, Smart.RC)