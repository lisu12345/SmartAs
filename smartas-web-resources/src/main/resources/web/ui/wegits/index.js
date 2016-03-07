"use strict";

//v0.12.8 - 2016.3.7
+(function (Namespace) {
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
})(Smart.Namespace);