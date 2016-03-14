'use strict';

//v0.12.10 - 2016.3.14
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

	var autoAdjustOverflow = {
		adjustX: 1,
		adjustY: 1
	};

	var targetOffset = [0, 0];

	UI.getPlacements = function getPlacements() {
		var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var _config$arrowWidth = config.arrowWidth;
		var arrowWidth = _config$arrowWidth === undefined ? 5 : _config$arrowWidth;
		var _config$horizontalArr = config.horizontalArrowShift;
		var horizontalArrowShift = _config$horizontalArr === undefined ? 16 : _config$horizontalArr;
		var _config$verticalArrow = config.verticalArrowShift;
		var verticalArrowShift = _config$verticalArrow === undefined ? 12 : _config$verticalArrow;

		return {
			left: {
				points: ['cr', 'cl'],
				overflow: autoAdjustOverflow,
				offset: [-4, 0],
				targetOffset: targetOffset
			},
			right: {
				points: ['cl', 'cr'],
				overflow: autoAdjustOverflow,
				offset: [4, 0],
				targetOffset: targetOffset
			},
			top: {
				points: ['bc', 'tc'],
				overflow: autoAdjustOverflow,
				offset: [0, -4],
				targetOffset: targetOffset
			},
			bottom: {
				points: ['tc', 'bc'],
				overflow: autoAdjustOverflow,
				offset: [0, 4],
				targetOffset: targetOffset
			},
			topLeft: {
				points: ['bl', 'tc'],
				overflow: autoAdjustOverflow,
				offset: [-(horizontalArrowShift + arrowWidth), -4],
				targetOffset: targetOffset
			},
			leftTop: {
				points: ['tr', 'cl'],
				overflow: autoAdjustOverflow,
				offset: [-4, -(verticalArrowShift + arrowWidth)],
				targetOffset: targetOffset
			},
			topRight: {
				points: ['br', 'tc'],
				overflow: autoAdjustOverflow,
				offset: [horizontalArrowShift + arrowWidth, -4],
				targetOffset: targetOffset
			},
			rightTop: {
				points: ['tl', 'cr'],
				overflow: autoAdjustOverflow,
				offset: [4, -(verticalArrowShift + arrowWidth)],
				targetOffset: targetOffset
			},
			bottomRight: {
				points: ['tr', 'bc'],
				overflow: autoAdjustOverflow,
				offset: [horizontalArrowShift + arrowWidth, 4],
				targetOffset: targetOffset
			},
			rightBottom: {
				points: ['bl', 'cr'],
				overflow: autoAdjustOverflow,
				offset: [4, verticalArrowShift + arrowWidth],
				targetOffset: targetOffset
			},
			bottomLeft: {
				points: ['tl', 'bc'],
				overflow: autoAdjustOverflow,
				offset: [-(horizontalArrowShift + arrowWidth), 4],
				targetOffset: targetOffset
			},
			leftBottom: {
				points: ['br', 'cl'],
				overflow: autoAdjustOverflow,
				offset: [-4, verticalArrowShift + arrowWidth],
				targetOffset: targetOffset
			}
		};
	};
})(Smart.Namespace);