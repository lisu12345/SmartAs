'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//v3.3.2 - 2016.2.14
+function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var objectAssign = _.assign;
	var Util = RC.Util;
	var classNames = RC.classNames;
	var Tooltip = RC.Tooltip;
	var DomUtils = Util.Dom;

	var Track = function Track(_ref2) {
		var className = _ref2.className;
		var included = _ref2.included;
		var offset = _ref2.offset;
		var length = _ref2.length;

		var style = {
			left: offset + '%',
			width: length + '%',
			visibility: included ? 'visible' : 'hidden'
		};
		return React.createElement('div', { className: className, style: style });
	};

	var Handle = function (_React$Component) {
		_inherits(Handle, _React$Component);

		function Handle(props) {
			_classCallCheck(this, Handle);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Handle).call(this, props));

			_this.state = {
				isTooltipVisible: false
			};
			return _this;
		}

		_createClass(Handle, [{
			key: 'showTooltip',
			value: function showTooltip() {
				this.setState({
					isTooltipVisible: true
				});
			}
		}, {
			key: 'hideTooltip',
			value: function hideTooltip() {
				this.setState({
					isTooltipVisible: false
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var className = props.className;
				var tipTransitionName = props.tipTransitionName;
				var tipFormatter = props.tipFormatter;
				var offset = props.offset;
				var value = props.value;
				var dragging = props.dragging;
				var noTip = props.noTip;


				var style = { left: offset + '%' };
				var handle = React.createElement('div', { className: className, style: style,
					onMouseUp: this.showTooltip.bind(this),
					onMouseEnter: this.showTooltip.bind(this),
					onMouseLeave: this.hideTooltip.bind(this) });

				if (noTip) {
					return handle;
				}

				var isTooltipVisible = dragging || this.state.isTooltipVisible;
				return React.createElement(
					Tooltip,
					{
						prefixCls: className.replace('slider-handle', 'tooltip'),
						placement: 'top',
						visible: isTooltipVisible,
						overlay: React.createElement(
							'span',
							null,
							tipFormatter(value)
						),
						delay: 0,
						transitionName: tipTransitionName },
					handle
				);
			}
		}]);

		return Handle;
	}(React.Component);

	Handle.propTypes = {
		className: React.PropTypes.string,
		offset: React.PropTypes.number,
		tipTransitionName: React.PropTypes.string,
		tipFormatter: React.PropTypes.func,
		value: React.PropTypes.number,
		dragging: React.PropTypes.bool,
		noTip: React.PropTypes.bool
	};

	function calcPoints(marks, dots, step, min, max) {
		var points = Object.keys(marks).map(parseFloat);
		if (dots) {
			for (var i = min; i <= max; i = i + step) {
				if (points.indexOf(i) >= 0) continue;
				points.push(i);
			}
		}
		return points;
	}

	var Dots = function Dots(_ref3) {
		var prefixCls = _ref3.prefixCls;
		var marks = _ref3.marks;
		var dots = _ref3.dots;
		var step = _ref3.step;
		var included = _ref3.included;
		var lowerBound = _ref3.lowerBound;
		var upperBound = _ref3.upperBound;
		var max = _ref3.max;
		var min = _ref3.min;

		var range = max - min;
		var elements = calcPoints(marks, dots, step, min, max).map(function (point) {
			var _classNames;

			var offset = (point - min) / range * 100 + '%';
			var style = { left: offset };

			var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
			var pointClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-dot', true), _defineProperty(_classNames, prefixCls + '-dot-active', isActived), _classNames));

			return React.createElement('span', { className: pointClassName, style: style, key: point });
		});

		return React.createElement(
			'div',
			{ className: prefixCls + '-step' },
			elements
		);
	};

	var Marks = function Marks(_ref4) {
		var className = _ref4.className;
		var marks = _ref4.marks;
		var included = _ref4.included;
		var upperBound = _ref4.upperBound;
		var lowerBound = _ref4.lowerBound;
		var max = _ref4.max;
		var min = _ref4.min;

		var marksKeys = Object.keys(marks);
		var marksCount = marksKeys.length;
		var unit = 100 / (marksCount - 1);
		var markWidth = unit * 0.9;

		var range = max - min;
		var elements = marksKeys.map(parseFloat).sort(function (a, b) {
			return a - b;
		}).map(function (point) {
			var _classNames2;

			var isActived = !included && point === upperBound || included && point <= upperBound && point >= lowerBound;
			var markClassName = classNames((_classNames2 = {}, _defineProperty(_classNames2, className + '-text', true), _defineProperty(_classNames2, className + '-text-active', isActived), _classNames2));

			var style = { width: markWidth + '%' };
			style.left = (point - min) / range * 100 - markWidth / 2 + '%';

			return React.createElement(
				'span',
				{ className: markClassName, style: style, key: point },
				marks[point]
			);
		});

		return React.createElement(
			'div',
			{ className: className },
			elements
		);
	};

	function isNotTouchEvent(e) {
		return e.touches.length > 1 || e.type.toLowerCase() === 'touchend' && e.touches.length > 0;
	}

	function getTouchPosition(e) {
		return e.touches[0].pageX;
	}

	function getMousePosition(e) {
		return e.pageX;
	}

	function pauseEvent(e) {
		e.stopPropagation();
		e.preventDefault();
	}

	var Slider = function (_React$Component2) {
		_inherits(Slider, _React$Component2);

		function Slider(props) {
			_classCallCheck(this, Slider);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

			var range = props.range;
			var min = props.min;
			var max = props.max;

			var initialValue = range ? [min, min] : min;
			var defaultValue = 'defaultValue' in props ? props.defaultValue : initialValue;
			var value = props.value !== undefined ? props.value : defaultValue;

			var upperBound = void 0;
			var lowerBound = void 0;
			if (props.range) {
				lowerBound = _this2.trimAlignValue(value[0]);
				upperBound = _this2.trimAlignValue(value[1]);
			} else {
				upperBound = _this2.trimAlignValue(value);
			}

			var recent = void 0;
			if (props.range && upperBound === lowerBound) {
				if (lowerBound === max) {
					recent = 'lowerBound';
				}
				if (upperBound === min) {
					recent = 'upperBound';
				}
			} else {
				recent = 'upperBound';
			}

			_this2.state = {
				handle: null,
				recent: recent,
				upperBound: upperBound,
				// If Slider is not range, set `lowerBound` equal to `min`.
				lowerBound: lowerBound || min
			};
			return _this2;
		}

		_createClass(Slider, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (!('value' in nextProps || 'min' in nextProps || 'max' in nextProps)) return;

				var _state = this.state;
				var lowerBound = _state.lowerBound;
				var upperBound = _state.upperBound;

				if (nextProps.range) {
					var value = nextProps.value || [lowerBound, upperBound];
					var nextUpperBound = this.trimAlignValue(value[1], nextProps);
					var nextLowerBound = this.trimAlignValue(value[0], nextProps);
					if (nextLowerBound === lowerBound && nextUpperBound === upperBound) return;

					this.setState({
						upperBound: nextUpperBound,
						lowerBound: nextLowerBound
					});
					if (this.isValueOutOfBounds(upperBound, nextProps) || this.isValueOutOfBounds(lowerBound, nextProps)) {
						this.props.onChange([nextLowerBound, nextUpperBound]);
					}
				} else {
					var _value = nextProps.value !== undefined ? nextProps.value : upperBound;
					var nextValue = this.trimAlignValue(_value, nextProps);
					if (nextValue === upperBound && lowerBound === nextProps.min) return;

					this.setState({
						upperBound: nextValue,
						lowerBound: nextProps.min
					});
					if (this.isValueOutOfBounds(upperBound, nextProps)) {
						this.props.onChange(nextValue);
					}
				}
			}
		}, {
			key: 'onChange',
			value: function onChange(state) {
				var props = this.props;
				var isNotControlled = !('value' in props);
				if (isNotControlled) {
					this.setState(state);
				} else if (state.handle) {
					this.setState({ handle: state.handle });
				}

				var data = objectAssign({}, this.state, state);
				var changedValue = props.range ? [data.lowerBound, data.upperBound] : data.upperBound;
				props.onChange(changedValue);
			}
		}, {
			key: 'onMouseMove',
			value: function onMouseMove(e) {
				var position = getMousePosition(e);
				this.onMove(e, position);
			}
		}, {
			key: 'onTouchMove',
			value: function onTouchMove(e) {
				if (isNotTouchEvent(e)) {
					this.end('touch');
					return;
				}

				var position = getTouchPosition(e);
				this.onMove(e, position);
			}
		}, {
			key: 'onMove',
			value: function onMove(e, position) {
				pauseEvent(e);
				var props = this.props;
				var state = this.state;

				var diffPosition = position - this.startPosition;
				var diffValue = diffPosition / this.getSliderLength() * (props.max - props.min);

				var value = this.trimAlignValue(this.startValue + diffValue);
				var oldValue = state[state.handle];
				if (value === oldValue) return;

				if (props.allowCross && value < state.lowerBound && state.handle === 'upperBound') {
					this.onChange({
						handle: 'lowerBound',
						lowerBound: value,
						upperBound: this.state.lowerBound
					});
					return;
				}
				if (props.allowCross && value > state.upperBound && state.handle === 'lowerBound') {
					this.onChange({
						handle: 'upperBound',
						upperBound: value,
						lowerBound: this.state.upperBound
					});
					return;
				}

				this.onChange(_defineProperty({}, state.handle, value));
			}
		}, {
			key: 'onTouchStart',
			value: function onTouchStart(e) {
				if (isNotTouchEvent(e)) return;

				var position = getTouchPosition(e);
				this.onStart(position);
				this.addDocumentEvents('touch');
				pauseEvent(e);
			}
		}, {
			key: 'onMouseDown',
			value: function onMouseDown(e) {
				var position = getMousePosition(e);
				this.onStart(position);
				this.addDocumentEvents('mouse');
				pauseEvent(e);
			}
		}, {
			key: 'onStart',
			value: function onStart(position) {
				var props = this.props;
				props.onBeforeChange(this.getValue());

				var value = this.calcValueByPos(position);
				this.startValue = value;
				this.startPosition = position;

				var state = this.state;
				var upperBound = state.upperBound;
				var lowerBound = state.lowerBound;


				var valueNeedChanging = 'upperBound';
				if (this.props.range) {
					var isLowerBoundCloser = Math.abs(upperBound - value) > Math.abs(lowerBound - value);
					if (isLowerBoundCloser) {
						valueNeedChanging = 'lowerBound';
					}

					var isAtTheSamePoint = upperBound === lowerBound;
					if (isAtTheSamePoint) {
						valueNeedChanging = state.recent;
					}

					if (isAtTheSamePoint && value !== upperBound) {
						valueNeedChanging = value < upperBound ? 'lowerBound' : 'upperBound';
					}
				}

				this.setState({
					handle: valueNeedChanging,
					recent: valueNeedChanging
				});

				var oldValue = state[valueNeedChanging];
				if (value === oldValue) return;

				this.onChange(_defineProperty({}, valueNeedChanging, value));
			}
		}, {
			key: 'getValue',
			value: function getValue() {
				var _state2 = this.state;
				var lowerBound = _state2.lowerBound;
				var upperBound = _state2.upperBound;

				return this.props.range ? [lowerBound, upperBound] : upperBound;
			}
		}, {
			key: 'getSliderLength',
			value: function getSliderLength() {
				var slider = this.refs.slider;
				if (!slider) {
					return 0;
				}

				return slider.clientWidth;
			}
		}, {
			key: 'getSliderStart',
			value: function getSliderStart() {
				var slider = this.refs.slider;
				var rect = slider.getBoundingClientRect();

				return rect.left;
			}
		}, {
			key: 'getPrecision',
			value: function getPrecision() {
				var props = this.props;
				var stepString = props.step.toString();
				var precision = 0;
				if (stepString.indexOf('.') >= 0) {
					precision = stepString.length - stepString.indexOf('.') - 1;
				}
				return precision;
			}
		}, {
			key: 'isValueOutOfBounds',
			value: function isValueOutOfBounds(value, props) {
				return value < props.min || value > props.max;
			}
		}, {
			key: 'trimAlignValue',
			value: function trimAlignValue(v, nextProps) {
				var state = this.state || {};
				var handle = state.handle;
				var lowerBound = state.lowerBound;
				var upperBound = state.upperBound;

				var _objectAssign = objectAssign({}, this.props, nextProps || {});

				var marks = _objectAssign.marks;
				var step = _objectAssign.step;
				var min = _objectAssign.min;
				var max = _objectAssign.max;
				var allowCross = _objectAssign.allowCross;


				var val = v;
				if (val <= min) {
					val = min;
				}
				if (val >= max) {
					val = max;
				}
				if (!allowCross && handle === 'upperBound' && val <= lowerBound) {
					val = lowerBound;
				}
				if (!allowCross && handle === 'lowerBound' && val >= upperBound) {
					val = upperBound;
				}

				var points = Object.keys(marks).map(parseFloat);
				if (step !== null) {
					var closestStep = Math.round(val / step) * step;
					points.push(closestStep);
				}

				var diffs = points.map(function (point) {
					return Math.abs(val - point);
				});
				var closestPoint = points[diffs.indexOf(Math.min.apply(Math, diffs))];

				return step !== null ? parseFloat(closestPoint.toFixed(this.getPrecision())) : closestPoint;
			}
		}, {
			key: 'calcOffset',
			value: function calcOffset(value) {
				var _props = this.props;
				var min = _props.min;
				var max = _props.max;

				var ratio = (value - min) / (max - min);
				return ratio * 100;
			}
		}, {
			key: 'calcValue',
			value: function calcValue(offset) {
				var _props2 = this.props;
				var min = _props2.min;
				var max = _props2.max;

				var ratio = offset / this.getSliderLength();
				return ratio * (max - min) + min;
			}
		}, {
			key: 'calcValueByPos',
			value: function calcValueByPos(position) {
				var pixelOffset = position - this.getSliderStart();
				var nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
				return nextValue;
			}
		}, {
			key: 'addDocumentEvents',
			value: function addDocumentEvents(type) {
				if (type === 'touch') {
					// just work for chrome iOS Safari and Android Browser
					this.onTouchMoveListener = DomUtils.addEventListener(document, 'touchmove', this.onTouchMove.bind(this));
					this.onTouchUpListener = DomUtils.addEventListener(document, 'touchend', this.end.bind(this, 'touch'));
				} else if (type === 'mouse') {
					this.onMouseMoveListener = DomUtils.addEventListener(document, 'mousemove', this.onMouseMove.bind(this));
					this.onMouseUpListener = DomUtils.addEventListener(document, 'mouseup', this.end.bind(this, 'mouse'));
				}
			}
		}, {
			key: 'removeEvents',
			value: function removeEvents(type) {
				if (type === 'touch') {
					this.onTouchMoveListener.remove();
					this.onTouchUpListener.remove();
				} else if (type === 'mouse') {
					this.onMouseMoveListener.remove();
					this.onMouseUpListener.remove();
				}
			}
		}, {
			key: 'end',
			value: function end(type) {
				this.removeEvents(type);
				this.props.onAfterChange(this.getValue());
				this.setState({ handle: null });
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames3;

				var _state3 = this.state;
				var handle = _state3.handle;
				var upperBound = _state3.upperBound;
				var lowerBound = _state3.lowerBound;
				var _props3 = this.props;
				var className = _props3.className;
				var prefixCls = _props3.prefixCls;
				var disabled = _props3.disabled;
				var dots = _props3.dots;
				var included = _props3.included;
				var range = _props3.range;
				var step = _props3.step;
				var marks = _props3.marks;
				var max = _props3.max;
				var min = _props3.min;
				var tipTransitionName = _props3.tipTransitionName;
				var tipFormatter = _props3.tipFormatter;
				var children = _props3.children;


				var upperOffset = this.calcOffset(upperBound);
				var lowerOffset = this.calcOffset(lowerBound);

				var handleClassName = prefixCls + '-handle';
				var isNoTip = step === null || tipFormatter === null;

				var upper = React.createElement(Handle, { className: handleClassName,
					noTip: isNoTip, tipTransitionName: tipTransitionName, tipFormatter: tipFormatter,
					offset: upperOffset, value: upperBound, dragging: handle === 'upperBound' });

				var lower = null;
				if (range) {
					lower = React.createElement(Handle, { className: handleClassName,
						noTip: isNoTip, tipTransitionName: tipTransitionName, tipFormatter: tipFormatter,
						offset: lowerOffset, value: lowerBound, dragging: handle === 'lowerBound' });
				}

				var sliderClassName = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls, true), _defineProperty(_classNames3, prefixCls + '-disabled', disabled), _defineProperty(_classNames3, className, !!className), _classNames3));
				var isIncluded = included || range;
				return React.createElement(
					'div',
					{ ref: 'slider', className: sliderClassName,
						onTouchStart: disabled ? noop : this.onTouchStart.bind(this),
						onMouseDown: disabled ? noop : this.onMouseDown.bind(this) },
					upper,
					lower,
					React.createElement(Track, { className: prefixCls + '-track', included: isIncluded,
						offset: lowerOffset, length: upperOffset - lowerOffset }),
					React.createElement(Dots, { prefixCls: prefixCls, marks: marks, dots: dots, step: step,
						included: isIncluded, lowerBound: lowerBound,
						upperBound: upperBound, max: max, min: min }),
					React.createElement(Marks, { className: prefixCls + '-mark', marks: marks,
						included: isIncluded, lowerBound: lowerBound,
						upperBound: upperBound, max: max, min: min }),
					children
				);
			}
		}]);

		return Slider;
	}(React.Component);

	Slider.propTypes = {
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		step: React.PropTypes.number,
		defaultValue: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.arrayOf(React.PropTypes.number)]),
		value: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.arrayOf(React.PropTypes.number)]),
		marks: React.PropTypes.object,
		included: React.PropTypes.bool,
		className: React.PropTypes.string,
		prefixCls: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		children: React.PropTypes.any,
		onBeforeChange: React.PropTypes.func,
		onChange: React.PropTypes.func,
		onAfterChange: React.PropTypes.func,
		tipTransitionName: React.PropTypes.string,
		tipFormatter: React.PropTypes.func,
		dots: React.PropTypes.bool,
		range: React.PropTypes.bool,
		allowCross: React.PropTypes.bool
	};

	Slider.defaultProps = {
		prefixCls: 'rc-slider',
		className: '',
		tipTransitionName: '',
		min: 0,
		max: 100,
		step: 1,
		marks: {},
		onBeforeChange: noop,
		onChange: noop,
		onAfterChange: noop,
		tipFormatter: function tipFormatter(value) {
			return value;
		},
		included: true,
		disabled: false,
		dots: false,
		range: false,
		allowCross: true
	};

	RC.Slider = Slider;
}(Smart.RC);