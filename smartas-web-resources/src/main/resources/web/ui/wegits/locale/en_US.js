'use strict';

+function (Namespace, RC) {
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
				placeholder: 'Select a time'
			}, Timepicker)
		}),

		// 统一合并为完整的 Locale
		Calendar: assign({}, GregorianCalendar, {
			lang: assign({
				placeholder: 'Select date',
				timePlaceholder: 'Select time'
			}, Calendar)
		})

	};

	UI.Locale = locale;
}(Smart.Namespace, Smart.RC);