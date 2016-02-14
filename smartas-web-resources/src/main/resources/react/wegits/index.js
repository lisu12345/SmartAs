//v0.12.1 - 2016.2.14
+ function(Namespace) {
	var UI = Namespace.register("Smart.UI");
	
	// matchMedia polyfill for
	// https://github.com/WickyNilliams/enquire.js/issues/82
	if (typeof window !== 'undefined') {
	  const matchMediaPolyfill = function matchMediaPolyfill() {
	    return {
	      matches: false,
	      addListener: function () {
	      },
	      removeListener: function () {
	      }
	    };
	  };
	  window.matchMedia = window.matchMedia || matchMediaPolyfill;
	}
	
}(Smart.Namespace)