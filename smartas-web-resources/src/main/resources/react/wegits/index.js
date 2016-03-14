//v0.12.10 - 2016.3.14
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

	const autoAdjustOverflow = {
	  adjustX: 1,
	  adjustY: 1,
	};

	const targetOffset = [0, 0];

	UI.getPlacements = function getPlacements(config = {}) {
	  const { arrowWidth = 5, horizontalArrowShift = 16, verticalArrowShift = 12 } = config;
	  return {
	    left: {
	      points: ['cr', 'cl'],
	      overflow: autoAdjustOverflow,
	      offset: [-4, 0],
	      targetOffset,
	    },
	    right: {
	      points: ['cl', 'cr'],
	      overflow: autoAdjustOverflow,
	      offset: [4, 0],
	      targetOffset,
	    },
	    top: {
	      points: ['bc', 'tc'],
	      overflow: autoAdjustOverflow,
	      offset: [0, -4],
	      targetOffset,
	    },
	    bottom: {
	      points: ['tc', 'bc'],
	      overflow: autoAdjustOverflow,
	      offset: [0, 4],
	      targetOffset,
	    },
	    topLeft: {
	      points: ['bl', 'tc'],
	      overflow: autoAdjustOverflow,
	      offset: [-(horizontalArrowShift + arrowWidth), -4],
	      targetOffset,
	    },
	    leftTop: {
	      points: ['tr', 'cl'],
	      overflow: autoAdjustOverflow,
	      offset: [-4, -(verticalArrowShift + arrowWidth)],
	      targetOffset,
	    },
	    topRight: {
	      points: ['br', 'tc'],
	      overflow: autoAdjustOverflow,
	      offset: [horizontalArrowShift + arrowWidth, -4],
	      targetOffset,
	    },
	    rightTop: {
	      points: ['tl', 'cr'],
	      overflow: autoAdjustOverflow,
	      offset: [4, -(verticalArrowShift + arrowWidth)],
	      targetOffset,
	    },
	    bottomRight: {
	      points: ['tr', 'bc'],
	      overflow: autoAdjustOverflow,
	      offset: [horizontalArrowShift + arrowWidth, 4],
	      targetOffset,
	    },
	    rightBottom: {
	      points: ['bl', 'cr'],
	      overflow: autoAdjustOverflow,
	      offset: [4, verticalArrowShift + arrowWidth],
	      targetOffset,
	    },
	    bottomLeft: {
	      points: ['tl', 'bc'],
	      overflow: autoAdjustOverflow,
	      offset: [-(horizontalArrowShift + arrowWidth), 4],
	      targetOffset,
	    },
	    leftBottom: {
	      points: ['br', 'cl'],
	      overflow: autoAdjustOverflow,
	      offset: [-4, verticalArrowShift + arrowWidth],
	      targetOffset,
	    },
	  };
	}
	
}(Smart.Namespace)