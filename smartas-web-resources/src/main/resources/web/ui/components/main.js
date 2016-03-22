'use strict';

//2016.2.1
+(function (Namespace) {
	var RC = Namespace.register("Smart.RC");
	var assign = _.assign;

	var velocity = $.Velocity;

	function animate(node, show, transitionName, done) {
		var ok = undefined;

		function complete() {
			if (!ok) {
				ok = true;
				done();
			}
		}

		// Fix safari flash bug
		node.style.display = show ? 'block' : 'none';
		velocity(node, transitionName, {
			duration: 240,
			complete: complete,
			easing: 'easeInOutQuad'
		});
		return {
			stop: function stop() {
				velocity(node, 'finish');
				complete();
			}
		};
	}

	var animation = {
		enter: function enter(node, done) {
			return animate(node, false, 'slideDown', done);
		},
		leave: function leave(node, done) {
			return animate(node, true, 'slideUp', done);
		},
		appear: function appear(node, done) {
			return animate(node, false, 'slideDown', done);
		}
	};

	RC.Animation = animation;
	RC.animation = animation;

	var DOMWrap = React.createClass({
		displayName: 'DOMWrap',

		propTypes: {
			tag: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				tag: 'div'
			};
		},
		render: function render() {
			var props = assign({}, this.props);
			if (!props.visible) {
				props.className = props.className || '';
				props.className += ' ' + props.hiddenClassName;
			}
			var Tag = props.tag;
			return React.createElement(Tag, props);
		}
	});
	RC.DOMWrap = DOMWrap;
})(Smart.Namespace);
"use strict";

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

(function webpackUniversalModuleDefinition(root, factory) {
	root["Slider"] = factory(root["React"], root["ReactDOM"]);
})(window, function (__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_7__) {
	return (/******/(function (modules) {
			// webpackBootstrap
			/******/ // The module cache
			/******/var installedModules = {};

			/******/ // The require function
			/******/function __webpack_require__(moduleId) {

				/******/ // Check if module is in cache
				/******/if (installedModules[moduleId])
					/******/return installedModules[moduleId].exports;

				/******/ // Create a new module (and put it into the cache)
				/******/var module = installedModules[moduleId] = {
					/******/exports: {},
					/******/id: moduleId,
					/******/loaded: false
					/******/ };

				/******/ // Execute the module function
				/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

				/******/ // Flag the module as loaded
				/******/module.loaded = true;

				/******/ // Return the exports of the module
				/******/return module.exports;
				/******/
			}

			/******/ // expose the modules object (__webpack_modules__)
			/******/__webpack_require__.m = modules;

			/******/ // expose the module cache
			/******/__webpack_require__.c = installedModules;

			/******/ // __webpack_public_path__
			/******/__webpack_require__.p = "";

			/******/ // Load entry module and return exports
			/******/return __webpack_require__(0);
			/******/
		})(
		/************************************************************************/
		/******/[
		/* 0 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			module.exports = __webpack_require__(1);

			/***/
		},
		/* 1 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _innerSlider = __webpack_require__(3);

			var _objectAssign = __webpack_require__(11);

			var _objectAssign2 = _interopRequireDefault(_objectAssign);

			var _json2mq = __webpack_require__(18);

			var _json2mq2 = _interopRequireDefault(_json2mq);

			var _reactResponsiveMixin = __webpack_require__(20);

			var _reactResponsiveMixin2 = _interopRequireDefault(_reactResponsiveMixin);

			var _defaultProps = __webpack_require__(13);

			var _defaultProps2 = _interopRequireDefault(_defaultProps);

			var Slider = _react2['default'].createClass({
				displayName: 'Slider',

				mixins: [_reactResponsiveMixin2['default']],
				getInitialState: function getInitialState() {
					return {
						breakpoint: null
					};
				},
				componentDidMount: function componentDidMount() {
					var _this = this;

					if (this.props.responsive) {
						var breakpoints = this.props.responsive.map(function (breakpt) {
							return breakpt.breakpoint;
						});
						breakpoints.sort(function (x, y) {
							return x - y;
						});

						breakpoints.forEach(function (breakpoint, index) {
							var bQuery;
							if (index === 0) {
								bQuery = (0, _json2mq2['default'])({ minWidth: 0, maxWidth: breakpoint });
							} else {
								bQuery = (0, _json2mq2['default'])({ minWidth: breakpoints[index - 1], maxWidth: breakpoint });
							}
							_this.media(bQuery, function () {
								_this.setState({ breakpoint: breakpoint });
							});
						});

						// Register media query for full screen. Need to support resize from small to large
						var query = (0, _json2mq2['default'])({ minWidth: breakpoints.slice(-1)[0] });

						this.media(query, function () {
							_this.setState({ breakpoint: null });
						});
					}
				},
				render: function render() {
					var _this2 = this;

					var settings;
					var newProps;
					if (this.state.breakpoint) {
						newProps = this.props.responsive.filter(function (resp) {
							return resp.breakpoint === _this2.state.breakpoint;
						});
						settings = newProps[0].settings === 'unslick' ? 'unslick' : (0, _objectAssign2['default'])({}, this.props, newProps[0].settings);
					} else {
						settings = (0, _objectAssign2['default'])({}, _defaultProps2['default'], this.props);
					}
					if (settings === 'unslick') {
						// if 'unslick' responsive breakpoint setting used, just return the <Slider> tag nested HTML
						return _react2['default'].createElement('div', null, this.props.children);
					} else {
						return _react2['default'].createElement(_innerSlider.InnerSlider, settings, this.props.children);
					}
				}
			});

			module.exports = Slider;

			/***/
		},
		/* 2 */
		/***/function (module, exports) {

			module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

			/***/
		},
		/* 3 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			var _extends = Object.assign || function (target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}return target;
			};

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _mixinsEventHandlers = __webpack_require__(4);

			var _mixinsEventHandlers2 = _interopRequireDefault(_mixinsEventHandlers);

			var _mixinsHelpers = __webpack_require__(8);

			var _mixinsHelpers2 = _interopRequireDefault(_mixinsHelpers);

			var _initialState = __webpack_require__(12);

			var _initialState2 = _interopRequireDefault(_initialState);

			var _defaultProps = __webpack_require__(13);

			var _defaultProps2 = _interopRequireDefault(_defaultProps);

			var _classnames = __webpack_require__(14);

			var _classnames2 = _interopRequireDefault(_classnames);

			var _track = __webpack_require__(15);

			var _dots = __webpack_require__(16);

			var _arrows = __webpack_require__(17);

			var InnerSlider = _react2['default'].createClass({
				displayName: 'InnerSlider',

				mixins: [_mixinsHelpers2['default'], _mixinsEventHandlers2['default']],
				getInitialState: function getInitialState() {
					return _initialState2['default'];
				},
				getDefaultProps: function getDefaultProps() {
					return _defaultProps2['default'];
				},
				componentWillMount: function componentWillMount() {
					if (this.props.init) {
						this.props.init();
					}
					this.setState({
						mounted: true
					});
					var lazyLoadedList = [];
					for (var i = 0; i < this.props.children.length; i++) {
						if (i >= this.state.currentSlide && i < this.state.currentSlide + this.props.slidesToShow) {
							lazyLoadedList.push(i);
						}
					}

					if (this.props.lazyLoad && this.state.lazyLoadedList.length === 0) {
						this.setState({
							lazyLoadedList: lazyLoadedList
						});
					}
				},
				componentDidMount: function componentDidMount() {
					// Hack for autoplay -- Inspect Later
					this.initialize(this.props);
					this.adaptHeight();
					if (window.addEventListener) {
						window.addEventListener('resize', this.onWindowResized);
					} else {
						window.attachEvent('onresize', this.onWindowResized);
					}
				},
				componentWillUnmount: function componentWillUnmount() {
					if (window.addEventListener) {
						window.removeEventListener('resize', this.onWindowResized);
					} else {
						window.detachEvent('onresize', this.onWindowResized);
					}
					if (this.state.autoPlayTimer) {
						window.clearTimeout(this.state.autoPlayTimer);
					}
				},
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
					if (this.props.slickGoTo != nextProps.slickGoTo) {
						this.changeSlide({
							message: 'index',
							index: nextProps.slickGoTo,
							currentSlide: this.state.currentSlide
						});
					} else {
						this.update(nextProps);
					}
				},
				componentDidUpdate: function componentDidUpdate() {
					this.adaptHeight();
				},
				onWindowResized: function onWindowResized() {
					this.update(this.props);
				},
				render: function render() {
					var className = (0, _classnames2['default'])('slick-initialized', 'slick-slider', this.props.className);

					var trackProps = {
						fade: this.props.fade,
						cssEase: this.props.cssEase,
						speed: this.props.speed,
						infinite: this.props.infinite,
						centerMode: this.props.centerMode,
						currentSlide: this.state.currentSlide,
						lazyLoad: this.props.lazyLoad,
						lazyLoadedList: this.state.lazyLoadedList,
						rtl: this.props.rtl,
						slideWidth: this.state.slideWidth,
						slidesToShow: this.props.slidesToShow,
						slideCount: this.state.slideCount,
						trackStyle: this.state.trackStyle,
						variableWidth: this.props.variableWidth
					};

					var dots;

					if (this.props.dots === true && this.state.slideCount > this.props.slidesToShow) {
						var dotProps = {
							dotsClass: this.props.dotsClass,
							slideCount: this.state.slideCount,
							slidesToShow: this.props.slidesToShow,
							currentSlide: this.state.currentSlide,
							slidesToScroll: this.props.slidesToScroll,
							clickHandler: this.changeSlide
						};

						dots = _react2['default'].createElement(_dots.Dots, dotProps);
					}

					var prevArrow, nextArrow;

					var arrowProps = {
						infinite: this.props.infinite,
						centerMode: this.props.centerMode,
						currentSlide: this.state.currentSlide,
						slideCount: this.state.slideCount,
						slidesToShow: this.props.slidesToShow,
						prevArrow: this.props.prevArrow,
						nextArrow: this.props.nextArrow,
						clickHandler: this.changeSlide
					};

					if (this.props.arrows) {
						prevArrow = _react2['default'].createElement(_arrows.PrevArrow, arrowProps);
						nextArrow = _react2['default'].createElement(_arrows.NextArrow, arrowProps);
					}

					return _react2['default'].createElement('div', { className: className, onMouseEnter: this.onInnerSliderEnter, onMouseLeave: this.onInnerSliderLeave }, _react2['default'].createElement('div', {
						ref: 'list',
						className: 'slick-list',
						onMouseDown: this.swipeStart,
						onMouseMove: this.state.dragging ? this.swipeMove : null,
						onMouseUp: this.swipeEnd,
						onMouseLeave: this.state.dragging ? this.swipeEnd : null,
						onTouchStart: this.swipeStart,
						onTouchMove: this.state.dragging ? this.swipeMove : null,
						onTouchEnd: this.swipeEnd,
						onTouchCancel: this.state.dragging ? this.swipeEnd : null }, _react2['default'].createElement(_track.Track, _extends({ ref: 'track' }, trackProps), this.props.children)), prevArrow, nextArrow, dots);
				}
			});
			exports.InnerSlider = InnerSlider;

			/***/
		},
		/* 4 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _trackHelper = __webpack_require__(5);

			var _helpers = __webpack_require__(8);

			var _helpers2 = _interopRequireDefault(_helpers);

			var _objectAssign = __webpack_require__(11);

			var _objectAssign2 = _interopRequireDefault(_objectAssign);

			var EventHandlers = {
				// Event handler for previous and next
				changeSlide: function changeSlide(options) {
					var indexOffset, previousInt, slideOffset, unevenOffset, targetSlide;
					unevenOffset = this.state.slideCount % this.props.slidesToScroll !== 0;
					indexOffset = unevenOffset ? 0 : (this.state.slideCount - this.state.currentSlide) % this.props.slidesToScroll;

					if (options.message === 'previous') {
						slideOffset = indexOffset === 0 ? this.props.slidesToScroll : this.props.slidesToShow - indexOffset;
						previousInt = this.state.currentSlide - slideOffset;
						targetSlide = previousInt === -1 ? this.state.slideCount - 1 : previousInt;
					} else if (options.message === 'next') {
						slideOffset = indexOffset === 0 ? this.props.slidesToScroll : indexOffset;
						targetSlide = this.state.currentSlide + slideOffset;
					} else if (options.message === 'dots') {
						// Click on dots
						targetSlide = options.index * options.slidesToScroll;
						if (targetSlide === options.currentSlide) {
							return;
						}
					} else if (options.message === 'index') {
						targetSlide = options.index;
						if (targetSlide === options.currentSlide) {
							return;
						}
					}

					this.slideHandler(targetSlide);
				},
				// Accessiblity handler for previous and next
				keyHandler: function keyHandler(e) {},
				// Focus on selecting a slide (click handler on track)
				selectHandler: function selectHandler(e) {},
				swipeStart: function swipeStart(e) {
					var touches, posX, posY;

					if (this.props.swipe === false || 'ontouchend' in document && this.props.swipe === false) {
						return;
					} else if (this.props.draggable === false && e.type.indexOf('mouse') !== -1) {
						return;
					}
					posX = e.touches !== undefined ? e.touches[0].pageX : e.clientX;
					posY = e.touches !== undefined ? e.touches[0].pageY : e.clientY;
					this.setState({
						dragging: true,
						touchObject: {
							startX: posX,
							startY: posY,
							curX: posX,
							curY: posY
						}
					});
				},
				swipeMove: function swipeMove(e) {
					if (!this.state.dragging) {
						return;
					}
					if (this.state.animating) {
						return;
					}
					var swipeLeft;
					var curLeft, positionOffset;
					var touchObject = this.state.touchObject;

					curLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2['default'])({
						slideIndex: this.state.currentSlide,
						trackRef: this.refs.track
					}, this.props, this.state));
					touchObject.curX = e.touches ? e.touches[0].pageX : e.clientX;
					touchObject.curY = e.touches ? e.touches[0].pageY : e.clientY;
					touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(touchObject.curX - touchObject.startX, 2)));

					positionOffset = (this.props.rtl === false ? 1 : -1) * (touchObject.curX > touchObject.startX ? 1 : -1);

					var currentSlide = this.state.currentSlide;
					var dotCount = Math.ceil(this.state.slideCount / this.props.slidesToScroll);
					var swipeDirection = this.swipeDirection(this.state.touchObject);
					var touchSwipeLength = touchObject.swipeLength;

					if (this.props.infinite === false) {
						if (currentSlide === 0 && swipeDirection === 'right' || currentSlide + 1 >= dotCount && swipeDirection === 'left') {
							touchSwipeLength = touchObject.swipeLength * this.props.edgeFriction;

							if (this.state.edgeDragged === false && this.props.edgeEvent) {
								this.props.edgeEvent(swipeDirection);
								this.setState({ edgeDragged: true });
							}
						}
					}

					if (this.state.swiped === false && this.props.swipeEvent) {
						this.props.swipeEvent(swipeDirection);
						this.setState({ swiped: true });
					}

					swipeLeft = curLeft + touchSwipeLength * positionOffset;
					this.setState({
						touchObject: touchObject,
						swipeLeft: swipeLeft,
						trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2['default'])({ left: swipeLeft }, this.props, this.state))
					});

					if (Math.abs(touchObject.curX - touchObject.startX) < Math.abs(touchObject.curY - touchObject.startY) * 0.8) {
						return;
					}
					if (touchObject.swipeLength > 4) {
						e.preventDefault();
					}
				},
				swipeEnd: function swipeEnd(e) {
					if (!this.state.dragging) {
						return;
					}
					var touchObject = this.state.touchObject;
					var minSwipe = this.state.listWidth / this.props.touchThreshold;
					var swipeDirection = this.swipeDirection(touchObject);

					// reset the state of touch related state variables.
					this.setState({
						dragging: false,
						edgeDragged: false,
						swiped: false,
						swipeLeft: null,
						touchObject: {}
					});
					// Fix for #13
					if (!touchObject.swipeLength) {
						return;
					}
					if (touchObject.swipeLength > minSwipe) {
						e.preventDefault();
						if (swipeDirection === 'left') {
							this.slideHandler(this.state.currentSlide + this.props.slidesToScroll);
						} else if (swipeDirection === 'right') {
							this.slideHandler(this.state.currentSlide - this.props.slidesToScroll);
						} else {
							this.slideHandler(this.state.currentSlide);
						}
					} else {
						// Adjust the track back to it's original position.
						var currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2['default'])({
							slideIndex: this.state.currentSlide,
							trackRef: this.refs.track
						}, this.props, this.state));

						this.setState({
							trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2['default'])({ left: currentLeft }, this.props, this.state))
						});
					}
				},
				onInnerSliderEnter: function onInnerSliderEnter(e) {
					if (this.props.autoplay && this.props.pauseOnHover) {
						this.pause();
					}
				},
				onInnerSliderLeave: function onInnerSliderLeave(e) {
					if (this.props.autoplay && this.props.pauseOnHover) {
						this.autoPlay();
					}
				}
			};

			exports['default'] = EventHandlers;
			module.exports = exports['default'];

			/***/
		},
		/* 5 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _ReactDOM = __webpack_require__(6);

			var _ReactDOM2 = _interopRequireDefault(_ReactDOM);

			var checkSpecKeys = function checkSpecKeys(spec, keysArray) {
				return keysArray.reduce(function (value, key) {
					return value && spec.hasOwnProperty(key);
				}, true) ? null : console.error('Keys Missing', spec);
			};

			var getTrackCSS = function getTrackCSS(spec) {
				checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth']);

				var trackWidth;

				if (spec.variableWidth) {
					trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
				} else if (spec.centerMode) {
					trackWidth = (spec.slideCount + 2 * (spec.slidesToShow + 1)) * spec.slideWidth;
				} else {
					trackWidth = (spec.slideCount + 2 * spec.slidesToShow) * spec.slideWidth;
				}

				var style = {
					opacity: 1,
					width: trackWidth,
					WebkitTransform: 'translate3d(' + spec.left + 'px, 0px, 0px)',
					transform: 'translate3d(' + spec.left + 'px, 0px, 0px)',
					transition: '',
					WebkitTransition: '',
					msTransform: 'translateX(' + spec.left + 'px)'
				};

				// Fallback for IE8
				if (!window.addEventListener && window.attachEvent) {
					style.marginLeft = spec.left + 'px';
				}

				return style;
			};

			exports.getTrackCSS = getTrackCSS;
			var getTrackAnimateCSS = function getTrackAnimateCSS(spec) {
				checkSpecKeys(spec, ['left', 'variableWidth', 'slideCount', 'slidesToShow', 'slideWidth', 'speed', 'cssEase']);

				var style = getTrackCSS(spec);
				// useCSS is true by default so it can be undefined
				style.WebkitTransition = '-webkit-transform ' + spec.speed + 'ms ' + spec.cssEase;
				style.transition = 'transform ' + spec.speed + 'ms ' + spec.cssEase;
				return style;
			};

			exports.getTrackAnimateCSS = getTrackAnimateCSS;
			var getTrackLeft = function getTrackLeft(spec) {

				checkSpecKeys(spec, ['slideIndex', 'trackRef', 'infinite', 'centerMode', 'slideCount', 'slidesToShow', 'slidesToScroll', 'slideWidth', 'listWidth', 'variableWidth']);

				var slideOffset = 0;
				var targetLeft;
				var targetSlide;

				if (spec.fade) {
					return 0;
				}

				if (spec.infinite) {
					if (spec.slideCount > spec.slidesToShow) {
						slideOffset = spec.slideWidth * spec.slidesToShow * -1;
					}
					if (spec.slideCount % spec.slidesToScroll !== 0) {
						if (spec.slideIndex + spec.slidesToScroll > spec.slideCount && spec.slideCount > spec.slidesToShow) {
							if (spec.slideIndex > spec.slideCount) {
								slideOffset = (spec.slidesToShow - (spec.slideIndex - spec.slideCount)) * spec.slideWidth * -1;
							} else {
								slideOffset = spec.slideCount % spec.slidesToScroll * spec.slideWidth * -1;
							}
						}
					}
				}

				if (spec.centerMode) {
					if (spec.infinite) {
						slideOffset += spec.slideWidth * Math.floor(spec.slidesToShow / 2);
					} else {
						slideOffset = spec.slideWidth * Math.floor(spec.slidesToShow / 2);
					}
				}

				targetLeft = spec.slideIndex * spec.slideWidth * -1 + slideOffset;

				if (spec.variableWidth === true) {
					var targetSlideIndex;
					if (spec.slideCount <= spec.slidesToShow || spec.infinite === false) {
						targetSlide = _ReactDOM2['default'].findDOMNode(spec.trackRef).childNodes[spec.slideIndex];
					} else {
						targetSlideIndex = spec.slideIndex + spec.slidesToShow;
						targetSlide = _ReactDOM2['default'].findDOMNode(spec.trackRef).childNodes[targetSlideIndex];
					}
					targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
					if (spec.centerMode === true) {
						if (spec.infinite === false) {
							targetSlide = _ReactDOM2['default'].findDOMNode(spec.trackRef).children[spec.slideIndex];
						} else {
							targetSlide = _ReactDOM2['default'].findDOMNode(spec.trackRef).children[spec.slideIndex + spec.slidesToShow + 1];
						}

						targetLeft = targetSlide ? targetSlide.offsetLeft * -1 : 0;
						targetLeft += (spec.listWidth - targetSlide.offsetWidth) / 2;
					}
				}

				return targetLeft;
			};
			exports.getTrackLeft = getTrackLeft;

			/***/
		},
		/* 6 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _reactDom = __webpack_require__(7);

			var _reactDom2 = _interopRequireDefault(_reactDom);

			var ReactDOM = _react2['default'].version >= '0.14.0' ? _reactDom2['default'] : _react2['default'];

			exports['default'] = ReactDOM;
			module.exports = exports['default'];

			/***/
		},
		/* 7 */
		/***/function (module, exports) {

			module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

			/***/
		},
		/* 8 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _ReactDOM = __webpack_require__(6);

			var _ReactDOM2 = _interopRequireDefault(_ReactDOM);

			var _reactLibReactTransitionEvents = __webpack_require__(9);

			var _reactLibReactTransitionEvents2 = _interopRequireDefault(_reactLibReactTransitionEvents);

			var _trackHelper = __webpack_require__(5);

			var _objectAssign = __webpack_require__(11);

			var _objectAssign2 = _interopRequireDefault(_objectAssign);

			var helpers = {
				initialize: function initialize(props) {
					var slideCount = _react2['default'].Children.count(props.children);
					var listWidth = this.getWidth(_ReactDOM2['default'].findDOMNode(this.refs.list));
					var trackWidth = this.getWidth(_ReactDOM2['default'].findDOMNode(this.refs.track));
					var slideWidth = this.getWidth(_ReactDOM2['default'].findDOMNode(this)) / props.slidesToShow;

					var currentSlide = props.rtl ? slideCount - 1 - props.initialSlide : props.initialSlide;

					this.setState({
						slideCount: slideCount,
						slideWidth: slideWidth,
						listWidth: listWidth,
						trackWidth: trackWidth,
						currentSlide: currentSlide
					}, function () {

						var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2['default'])({
							slideIndex: this.state.currentSlide,
							trackRef: this.refs.track
						}, props, this.state));
						// getCSS function needs previously set state
						var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2['default'])({ left: targetLeft }, props, this.state));

						this.setState({ trackStyle: trackStyle });

						this.autoPlay(); // once we're set up, trigger the initial autoplay.
					});
				},
				update: function update(props) {
					// This method has mostly same code as initialize method.
					// Refactor it
					var slideCount = _react2['default'].Children.count(props.children);
					var listWidth = this.getWidth(_ReactDOM2['default'].findDOMNode(this.refs.list));
					var trackWidth = this.getWidth(_ReactDOM2['default'].findDOMNode(this.refs.track));
					var slideWidth = this.getWidth(_ReactDOM2['default'].findDOMNode(this)) / props.slidesToShow;

					this.setState({
						slideCount: slideCount,
						slideWidth: slideWidth,
						listWidth: listWidth,
						trackWidth: trackWidth
					}, function () {

						var targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2['default'])({
							slideIndex: this.state.currentSlide,
							trackRef: this.refs.track
						}, props, this.state));
						// getCSS function needs previously set state
						var trackStyle = (0, _trackHelper.getTrackCSS)((0, _objectAssign2['default'])({ left: targetLeft }, props, this.state));

						this.setState({ trackStyle: trackStyle });
					});
				},
				getWidth: function getWidth(elem) {
					return elem.getBoundingClientRect().width || elem.offsetWidth;
				},
				adaptHeight: function adaptHeight() {
					if (this.props.adaptiveHeight) {
						var selector = '[data-index="' + this.state.currentSlide + '"]';
						if (this.refs.list) {
							var slickList = _ReactDOM2['default'].findDOMNode(this.refs.list);
							slickList.style.height = slickList.querySelector(selector).offsetHeight + 'px';
						}
					}
				},
				slideHandler: function slideHandler(index) {
					var _this = this;

					// Functionality of animateSlide and postSlide is merged into this function
					// console.log('slideHandler', index);
					var targetSlide, currentSlide;
					var targetLeft, currentLeft;
					var _callback2;

					if (this.props.waitForAnimate && this.state.animating) {
						return;
					}

					if (this.state.currentSlide === index) {
						return;
					}

					if (this.props.fade) {
						currentSlide = this.state.currentSlide;

						//  Shifting targetSlide back into the range
						if (index < 0) {
							targetSlide = index + this.state.slideCount;
						} else if (index >= this.state.slideCount) {
							targetSlide = index - this.state.slideCount;
						} else {
							targetSlide = index;
						}

						if (this.props.lazyLoad && this.state.lazyLoadedList.indexOf(targetSlide) < 0) {
							this.setState({
								lazyLoadedList: this.state.lazyLoadedList.concat(targetSlide)
							});
						}

						_callback2 = function callback() {
							_this.setState({
								animating: false
							});
							if (_this.props.afterChange) {
								_this.props.afterChange(currentSlide);
							}
							_reactLibReactTransitionEvents2['default'].removeEndEventListener(_ReactDOM2['default'].findDOMNode(_this.refs.track).children[currentSlide], _callback2);
						};

						this.setState({
							animating: true,
							currentSlide: targetSlide
						}, function () {
							_reactLibReactTransitionEvents2['default'].addEndEventListener(_ReactDOM2['default'].findDOMNode(this.refs.track).children[currentSlide], _callback2);
						});

						if (this.props.beforeChange) {
							this.props.beforeChange(this.state.currentSlide, currentSlide);
						}

						this.autoPlay();
						return;
					}

					targetSlide = index;
					if (targetSlide < 0) {
						if (this.props.infinite === false) {
							currentSlide = 0;
						} else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
							currentSlide = this.state.slideCount - this.state.slideCount % this.props.slidesToScroll;
						} else {
							currentSlide = this.state.slideCount + targetSlide;
						}
					} else if (targetSlide >= this.state.slideCount) {
						if (this.props.infinite === false) {
							currentSlide = this.state.slideCount - this.props.slidesToShow;
						} else if (this.state.slideCount % this.props.slidesToScroll !== 0) {
							currentSlide = 0;
						} else {
							currentSlide = targetSlide - this.state.slideCount;
						}
					} else {
						currentSlide = targetSlide;
					}

					targetLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2['default'])({
						slideIndex: targetSlide,
						trackRef: this.refs.track
					}, this.props, this.state));

					currentLeft = (0, _trackHelper.getTrackLeft)((0, _objectAssign2['default'])({
						slideIndex: currentSlide,
						trackRef: this.refs.track
					}, this.props, this.state));

					if (this.props.infinite === false) {
						targetLeft = currentLeft;
					}

					if (this.props.beforeChange) {
						this.props.beforeChange(this.state.currentSlide, currentSlide);
					}

					if (this.props.lazyLoad) {
						var loaded = true;
						var slidesToLoad = [];
						for (var i = targetSlide; i < targetSlide + this.props.slidesToShow; i++) {
							loaded = loaded && this.state.lazyLoadedList.indexOf(i) >= 0;
							if (!loaded) {
								slidesToLoad.push(i);
							}
						}
						if (!loaded) {
							this.setState({
								lazyLoadedList: this.state.lazyLoadedList.concat(slidesToLoad)
							});
						}
					}

					// Slide Transition happens here.
					// animated transition happens to target Slide and
					// non - animated transition happens to current Slide
					// If CSS transitions are false, directly go the current slide.

					if (this.props.useCSS === false) {

						this.setState({
							currentSlide: currentSlide,
							trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2['default'])({ left: currentLeft }, this.props, this.state))
						}, function () {
							if (this.props.afterChange) {
								this.props.afterChange(currentSlide);
							}
						});
					} else {

						var nextStateChanges = {
							animating: false,
							currentSlide: currentSlide,
							trackStyle: (0, _trackHelper.getTrackCSS)((0, _objectAssign2['default'])({ left: currentLeft }, this.props, this.state)),
							swipeLeft: null
						};

						_callback2 = function _callback() {
							_this.setState(nextStateChanges);
							if (_this.props.afterChange) {
								_this.props.afterChange(currentSlide);
							}
							_reactLibReactTransitionEvents2['default'].removeEndEventListener(_ReactDOM2['default'].findDOMNode(_this.refs.track), _callback2);
						};

						this.setState({
							animating: true,
							currentSlide: targetSlide,
							trackStyle: (0, _trackHelper.getTrackAnimateCSS)((0, _objectAssign2['default'])({ left: targetLeft }, this.props, this.state))
						}, function () {
							_reactLibReactTransitionEvents2['default'].addEndEventListener(_ReactDOM2['default'].findDOMNode(this.refs.track), _callback2);
						});
					}

					this.autoPlay();
				},
				swipeDirection: function swipeDirection(touchObject) {
					var xDist, yDist, r, swipeAngle;

					xDist = touchObject.startX - touchObject.curX;
					yDist = touchObject.startY - touchObject.curY;
					r = Math.atan2(yDist, xDist);

					swipeAngle = Math.round(r * 180 / Math.PI);
					if (swipeAngle < 0) {
						swipeAngle = 360 - Math.abs(swipeAngle);
					}
					if (swipeAngle <= 45 && swipeAngle >= 0 || swipeAngle <= 360 && swipeAngle >= 315) {
						return this.props.rtl === false ? 'left' : 'right';
					}
					if (swipeAngle >= 135 && swipeAngle <= 225) {
						return this.props.rtl === false ? 'right' : 'left';
					}

					return 'vertical';
				},
				autoPlay: function autoPlay() {
					var _this2 = this;

					var play = function play() {
						if (_this2.state.mounted) {
							var nextIndex = _this2.props.rtl ? _this2.state.currentSlide - _this2.props.slidesToScroll : _this2.state.currentSlide + _this2.props.slidesToScroll;

							_this2.slideHandler(nextIndex);
						}
					};
					if (this.props.autoplay) {
						window.clearTimeout(this.state.autoPlayTimer);
						this.setState({
							autoPlayTimer: window.setTimeout(play, this.props.autoplaySpeed)
						});
					}
				},
				pause: function pause() {
					if (this.state.autoPlayTimer) {
						window.clearTimeout(this.state.autoPlayTimer);
					}
				}
			};

			exports['default'] = helpers;
			module.exports = exports['default'];

			/***/
		},
		/* 9 */
		/***/function (module, exports, __webpack_require__) {

			/**
    * Copyright 2013-2015, Facebook, Inc.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree. An additional grant
    * of patent rights can be found in the PATENTS file in the same directory.
    *
    * @providesModule ReactTransitionEvents
    */

			'use strict';

			var ExecutionEnvironment = __webpack_require__(10);

			/**
    * EVENT_NAME_MAP is used to determine which event fired when a
    * transition/animation ends, based on the style property used to
    * define that event.
    */
			var EVENT_NAME_MAP = {
				transitionend: {
					'transition': 'transitionend',
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'mozTransitionEnd',
					'OTransition': 'oTransitionEnd',
					'msTransition': 'MSTransitionEnd'
				},

				animationend: {
					'animation': 'animationend',
					'WebkitAnimation': 'webkitAnimationEnd',
					'MozAnimation': 'mozAnimationEnd',
					'OAnimation': 'oAnimationEnd',
					'msAnimation': 'MSAnimationEnd'
				}
			};

			var endEvents = [];

			function detectEvents() {
				var testEl = document.createElement('div');
				var style = testEl.style;

				// On some platforms, in particular some releases of Android 4.x,
				// the un-prefixed "animation" and "transition" properties are defined on the
				// style object but the events that fire will still be prefixed, so we need
				// to check if the un-prefixed events are useable, and if not remove them
				// from the map
				if (!('AnimationEvent' in window)) {
					delete EVENT_NAME_MAP.animationend.animation;
				}

				if (!('TransitionEvent' in window)) {
					delete EVENT_NAME_MAP.transitionend.transition;
				}

				for (var baseEventName in EVENT_NAME_MAP) {
					var baseEvents = EVENT_NAME_MAP[baseEventName];
					for (var styleName in baseEvents) {
						if (styleName in style) {
							endEvents.push(baseEvents[styleName]);
							break;
						}
					}
				}
			}

			if (ExecutionEnvironment.canUseDOM) {
				detectEvents();
			}

			// We use the raw {add|remove}EventListener() call because EventListener
			// does not know how to remove event listeners and we really should
			// clean up. Also, these events are not triggered in older browsers
			// so we should be A-OK here.

			function addEventListener(node, eventName, eventListener) {
				node.addEventListener(eventName, eventListener, false);
			}

			function removeEventListener(node, eventName, eventListener) {
				node.removeEventListener(eventName, eventListener, false);
			}

			var ReactTransitionEvents = {
				addEndEventListener: function addEndEventListener(node, eventListener) {
					if (endEvents.length === 0) {
						// If CSS transitions are not supported, trigger an "end animation"
						// event immediately.
						window.setTimeout(eventListener, 0);
						return;
					}
					endEvents.forEach(function (endEvent) {
						addEventListener(node, endEvent, eventListener);
					});
				},

				removeEndEventListener: function removeEndEventListener(node, eventListener) {
					if (endEvents.length === 0) {
						return;
					}
					endEvents.forEach(function (endEvent) {
						removeEventListener(node, endEvent, eventListener);
					});
				}
			};

			module.exports = ReactTransitionEvents;

			/***/
		},
		/* 10 */
		/***/function (module, exports) {

			/**
    * Copyright 2013-2015, Facebook, Inc.
    * All rights reserved.
    *
    * This source code is licensed under the BSD-style license found in the
    * LICENSE file in the root directory of this source tree. An additional grant
    * of patent rights can be found in the PATENTS file in the same directory.
    *
    * @providesModule ExecutionEnvironment
    */

			'use strict';

			var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

			/**
    * Simple, lightweight module assisting with the detection and context of
    * Worker. Helps avoid circular dependencies and allows code to reason about
    * whether or not they are in a Worker, even if they never include the main
    * `ReactWorker` dependency.
    */
			var ExecutionEnvironment = {

				canUseDOM: canUseDOM,

				canUseWorkers: typeof Worker !== 'undefined',

				canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

				canUseViewport: canUseDOM && !!window.screen,

				isInWorker: !canUseDOM // For now, this is true - might change in the future.

			};

			module.exports = ExecutionEnvironment;

			/***/
		},
		/* 11 */
		/***/function (module, exports) {

			'use strict';

			function ToObject(val) {
				if (val == null) {
					throw new TypeError('Object.assign cannot be called with null or undefined');
				}

				return Object(val);
			}

			module.exports = Object.assign || function (target, source) {
				var from;
				var keys;
				var to = ToObject(target);

				for (var s = 1; s < arguments.length; s++) {
					from = arguments[s];
					keys = Object.keys(Object(from));

					for (var i = 0; i < keys.length; i++) {
						to[keys[i]] = from[keys[i]];
					}
				}

				return to;
			};

			/***/
		},
		/* 12 */
		/***/function (module, exports) {

			"use strict";

			var initialState = {
				animating: false,
				dragging: false,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				// listWidth: null,
				// listHeight: null,
				// loadIndex: 0,
				slideCount: null,
				slideWidth: null,
				// sliding: false,
				// slideOffset: 0,
				swipeLeft: null,
				touchObject: {
					startX: 0,
					startY: 0,
					curX: 0,
					curY: 0
				},

				lazyLoadedList: [],

				// added for react
				initialized: false,
				edgeDragged: false,
				swiped: false, // used by swipeEvent. differentites between touch and swipe.
				trackStyle: {},
				trackWidth: 0

				// Removed
				// transformsEnabled: false,
				// $nextArrow: null,
				// $prevArrow: null,
				// $dots: null,
				// $list: null,
				// $slideTrack: null,
				// $slides: null,
			};

			module.exports = initialState;

			/***/
		},
		/* 13 */
		/***/function (module, exports) {

			'use strict';

			var defaultProps = {
				className: '',
				// accessibility: true,
				adaptiveHeight: false,
				arrows: true,
				autoplay: false,
				autoplaySpeed: 3000,
				centerMode: false,
				centerPadding: '50px',
				cssEase: 'ease',
				dots: false,
				dotsClass: 'slick-dots',
				draggable: true,
				easing: 'linear',
				edgeFriction: 0.35,
				fade: false,
				focusOnSelect: false,
				infinite: true,
				initialSlide: 0,
				lazyLoad: false,
				pauseOnHover: false,
				responsive: null,
				rtl: false,
				slide: 'div',
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: true,
				swipeToSlide: false,
				touchMove: true,
				touchThreshold: 5,
				useCSS: true,
				variableWidth: false,
				vertical: false,
				waitForAnimate: true,
				afterChange: null,
				beforeChange: null,
				edgeEvent: null,
				init: null,
				swipeEvent: null,
				// nextArrow, prevArrow are react componets
				nextArrow: null,
				prevArrow: null
			};

			module.exports = defaultProps;

			/***/
		},
		/* 14 */
		/***/function (module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_RESULT__; /*!
                                      Copyright (c) 2015 Jed Watson.
                                      Licensed under the MIT License (MIT), see
                                      http://jedwatson.github.io/classnames
                                      */

			(function () {
				'use strict';

				function classNames() {

					var classes = '';

					for (var i = 0; i < arguments.length; i++) {
						var arg = arguments[i];
						if (!arg) continue;

						var argType = typeof arg === "undefined" ? "undefined" : _typeof(arg);

						if ('string' === argType || 'number' === argType) {
							classes += ' ' + arg;
						} else if (Array.isArray(arg)) {
							classes += ' ' + classNames.apply(null, arg);
						} else if ('object' === argType) {
							for (var key in arg) {
								if (arg.hasOwnProperty(key) && arg[key]) {
									classes += ' ' + key;
								}
							}
						}
					}

					return classes.substr(1);
				}

				if (typeof module !== 'undefined' && module.exports) {
					module.exports = classNames;
				} else if (true) {
					// AMD. Register as an anonymous module.
					!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
						return classNames;
					}).call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
				} else {
					window.classNames = classNames;
				}
			})();

			/***/
		},
		/* 15 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _objectAssign = __webpack_require__(11);

			var _objectAssign2 = _interopRequireDefault(_objectAssign);

			var _classnames = __webpack_require__(14);

			var _classnames2 = _interopRequireDefault(_classnames);

			var getSlideClasses = function getSlideClasses(spec) {
				var slickActive, slickCenter, slickCloned;
				var centerOffset, index;

				if (spec.rtl) {
					index = spec.slideCount - 1 - spec.index;
				} else {
					index = spec.index;
				}

				slickCloned = index < 0 || index >= spec.slideCount;
				if (spec.centerMode) {
					centerOffset = Math.floor(spec.slidesToShow / 2);
					slickCenter = (index - spec.currentSlide) % spec.slideCount === 0;
					if (index > spec.currentSlide - centerOffset - 1 && index <= spec.currentSlide + centerOffset) {
						slickActive = true;
					}
				} else {
					slickActive = spec.currentSlide <= index && index < spec.currentSlide + spec.slidesToShow;
				}
				return (0, _classnames2['default'])({
					'slick-slide': true,
					'slick-active': slickActive,
					'slick-center': slickCenter,
					'slick-cloned': slickCloned
				});
			};

			var getSlideStyle = function getSlideStyle(spec) {
				var style = {};

				if (spec.variableWidth === undefined || spec.variableWidth === false) {
					style.width = spec.slideWidth;
				}

				if (spec.fade) {
					style.position = 'relative';
					style.left = -spec.index * spec.slideWidth;
					style.opacity = spec.currentSlide === spec.index ? 1 : 0;
					style.transition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
					style.WebkitTransition = 'opacity ' + spec.speed + 'ms ' + spec.cssEase;
				}

				return style;
			};

			var renderSlides = function renderSlides(spec) {
				var key;
				var slides = [];
				var preCloneSlides = [];
				var postCloneSlides = [];
				var count = _react2['default'].Children.count(spec.children);
				var child;

				_react2['default'].Children.forEach(spec.children, function (elem, index) {
					if (!spec.lazyLoad | (spec.lazyLoad && spec.lazyLoadedList.indexOf(index) >= 0)) {
						child = elem;
					} else {
						child = _react2['default'].createElement('div', null);
					}
					var childStyle = getSlideStyle((0, _objectAssign2['default'])({}, spec, { index: index }));
					var slickClasses = getSlideClasses((0, _objectAssign2['default'])({ index: index }, spec));
					var cssClasses;

					if (child.props.className) {
						cssClasses = (0, _classnames2['default'])(slickClasses, child.props.className);
					} else {
						cssClasses = slickClasses;
					}

					slides.push(_react2['default'].cloneElement(child, {
						key: index,
						'data-index': index,
						className: cssClasses,
						style: (0, _objectAssign2['default'])({}, child.props.style || {}, childStyle)
					}));

					// variableWidth doesn't wrap properly.
					if (spec.infinite && spec.fade === false) {
						var infiniteCount = spec.variableWidth ? spec.slidesToShow + 1 : spec.slidesToShow;

						if (index >= count - infiniteCount) {
							key = -(count - index);
							preCloneSlides.push(_react2['default'].cloneElement(child, {
								key: key,
								'data-index': key,
								className: getSlideClasses((0, _objectAssign2['default'])({ index: key }, spec)),
								style: (0, _objectAssign2['default'])({}, child.props.style || {}, childStyle)
							}));
						}

						if (index < infiniteCount) {
							key = count + index;
							postCloneSlides.push(_react2['default'].cloneElement(child, {
								key: key,
								'data-index': key,
								className: getSlideClasses((0, _objectAssign2['default'])({ index: key }, spec)),
								style: (0, _objectAssign2['default'])({}, child.props.style || {}, childStyle)
							}));
						}
					}
				});

				if (spec.rtl) {
					return preCloneSlides.concat(slides, postCloneSlides).reverse();
				} else {
					return preCloneSlides.concat(slides, postCloneSlides);
				}
			};

			var Track = _react2['default'].createClass({
				displayName: 'Track',

				render: function render() {
					var slides = renderSlides(this.props);
					return _react2['default'].createElement('div', { className: 'slick-track', style: this.props.trackStyle }, slides);
				}
			});
			exports.Track = Track;

			/***/
		},
		/* 16 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _classnames = __webpack_require__(14);

			var _classnames2 = _interopRequireDefault(_classnames);

			var getDotCount = function getDotCount(spec) {
				var dots;
				dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
				return dots;
			};

			var Dots = _react2['default'].createClass({
				displayName: 'Dots',

				clickHandler: function clickHandler(options, e) {
					// In Autoplay the focus stays on clicked button even after transition
					// to next slide. That only goes away by click somewhere outside
					e.preventDefault();
					this.props.clickHandler(options);
				},
				render: function render() {
					var _this = this;

					var dotCount = getDotCount({
						slideCount: this.props.slideCount,
						slidesToScroll: this.props.slidesToScroll
					});

					// Apply join & split to Array to pre-fill it for IE8
					//
					// Credit: http://stackoverflow.com/a/13735425/1849458
					var dots = Array.apply(null, Array(dotCount + 1).join('0').split('')).map(function (x, i) {

						var className = (0, _classnames2['default'])({
							'slick-active': _this.props.currentSlide === i * _this.props.slidesToScroll
						});

						var dotOptions = {
							message: 'dots',
							index: i,
							slidesToScroll: _this.props.slidesToScroll,
							currentSlide: _this.props.currentSlide
						};

						return _react2['default'].createElement('li', { key: i, className: className }, _react2['default'].createElement('button', { onClick: _this.clickHandler.bind(_this, dotOptions) }, i));
					});

					return _react2['default'].createElement('ul', { className: this.props.dotsClass, style: { display: 'block' } }, dots);
				}
			});
			exports.Dots = Dots;

			/***/
		},
		/* 17 */
		/***/function (module, exports, __webpack_require__) {

			'use strict';

			Object.defineProperty(exports, '__esModule', {
				value: true
			});

			var _extends = Object.assign || function (target) {
				for (var i = 1; i < arguments.length; i++) {
					var source = arguments[i];for (var key in source) {
						if (Object.prototype.hasOwnProperty.call(source, key)) {
							target[key] = source[key];
						}
					}
				}return target;
			};

			function _interopRequireDefault(obj) {
				return obj && obj.__esModule ? obj : { 'default': obj };
			}

			var _react = __webpack_require__(2);

			var _react2 = _interopRequireDefault(_react);

			var _classnames = __webpack_require__(14);

			var _classnames2 = _interopRequireDefault(_classnames);

			var PrevArrow = _react2['default'].createClass({
				displayName: 'PrevArrow',

				clickHandler: function clickHandler(options, e) {
					e.preventDefault();
					this.props.clickHandler(options, e);
				},
				render: function render() {
					var prevClasses = { 'slick-prev': true };
					var prevHandler = this.clickHandler.bind(this, { message: 'previous' });

					if (!this.props.infinite && (this.props.currentSlide === 0 || this.props.slideCount <= this.props.slidesToShow)) {
						prevClasses['slick-disabled'] = true;
						prevHandler = null;
					}

					var prevArrowProps = {
						key: '0',
						ref: 'previous',
						'data-role': 'none',
						className: (0, _classnames2['default'])(prevClasses),
						style: { display: 'block' },
						onClick: prevHandler
					};
					var prevArrow;

					if (this.props.prevArrow) {
						prevArrow = _react2['default'].createElement(this.props.prevArrow, prevArrowProps);
					} else {
						prevArrow = _react2['default'].createElement('button', _extends({ key: '0', type: 'button' }, prevArrowProps), ' Previous');
					}

					return prevArrow;
				}
			});

			exports.PrevArrow = PrevArrow;
			var NextArrow = _react2['default'].createClass({
				displayName: 'NextArrow',

				clickHandler: function clickHandler(options, e) {
					e.preventDefault();
					this.props.clickHandler(options, e);
				},
				render: function render() {
					var nextClasses = { 'slick-next': true };
					var nextHandler = this.clickHandler.bind(this, { message: 'next' });

					if (!this.props.infinite) {
						if (this.props.centerMode && this.props.currentSlide >= this.props.slideCount - 1) {
							nextClasses['slick-disabled'] = true;
							nextHandler = null;
						} else {
							if (this.props.currentSlide >= this.props.slideCount - this.props.slidesToShow) {
								nextClasses['slick-disabled'] = true;
								nextHandler = null;
							}
						}

						if (this.props.slideCount <= this.props.slidesToShow) {
							nextClasses['slick-disabled'] = true;
							nextHandler = null;
						}
					}

					var nextArrowProps = {
						key: '1',
						ref: 'next',
						'data-role': 'none',
						className: (0, _classnames2['default'])(nextClasses),
						style: { display: 'block' },
						onClick: nextHandler
					};

					var nextArrow;

					if (this.props.nextArrow) {
						nextArrow = _react2['default'].createElement(this.props.nextArrow, nextArrowProps);
					} else {
						nextArrow = _react2['default'].createElement('button', _extends({ key: '1', type: 'button' }, nextArrowProps), ' Next');
					}

					return nextArrow;
				}
			});
			exports.NextArrow = NextArrow;

			/***/
		},
		/* 18 */
		/***/function (module, exports, __webpack_require__) {

			var camel2hyphen = __webpack_require__(19);

			var isDimension = function isDimension(feature) {
				var re = /[height|width]$/;
				return re.test(feature);
			};

			var obj2mq = function obj2mq(obj) {
				var mq = '';
				var features = Object.keys(obj);
				features.forEach(function (feature, index) {
					var value = obj[feature];
					feature = camel2hyphen(feature);
					// Add px to dimension features
					if (isDimension(feature) && typeof value === 'number') {
						value = value + 'px';
					}
					if (value === true) {
						mq += feature;
					} else if (value === false) {
						mq += 'not ' + feature;
					} else {
						mq += '(' + feature + ': ' + value + ')';
					}
					if (index < features.length - 1) {
						mq += ' and ';
					}
				});
				return mq;
			};

			var json2mq = function json2mq(query) {
				var mq = '';
				if (typeof query === 'string') {
					return query;
				}
				// Handling array of media queries
				if (query instanceof Array) {
					query.forEach(function (q, index) {
						mq += obj2mq(q);
						if (index < query.length - 1) {
							mq += ', ';
						}
					});
					return mq;
				}
				// Handling single media query
				return obj2mq(query);
			};

			module.exports = json2mq;

			/***/
		},
		/* 19 */
		/***/function (module, exports) {

			var camel2hyphen = function camel2hyphen(str) {
				return str.replace(/[A-Z]/g, function (match) {
					return '-' + match.toLowerCase();
				}).toLowerCase();
			};

			module.exports = camel2hyphen;

			/***/
		},
		/* 20 */
		/***/function (module, exports, __webpack_require__) {

			var canUseDOM = __webpack_require__(21);
			var enquire = canUseDOM && __webpack_require__(22);
			var json2mq = __webpack_require__(18);

			var ResponsiveMixin = {
				media: function media(query, handler) {
					query = json2mq(query);
					if (typeof handler === 'function') {
						handler = {
							match: handler
						};
					}
					enquire.register(query, handler);

					// Queue the handlers to unregister them at unmount 
					if (!this._responsiveMediaHandlers) {
						this._responsiveMediaHandlers = [];
					}
					this._responsiveMediaHandlers.push({ query: query, handler: handler });
				},
				componentWillUnmount: function componentWillUnmount() {
					if (this._responsiveMediaHandlers) {
						this._responsiveMediaHandlers.forEach(function (obj) {
							enquire.unregister(obj.query, obj.handler);
						});
					}
				}
			};

			module.exports = ResponsiveMixin;

			/***/
		},
		/* 21 */
		/***/function (module, exports) {

			var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

			module.exports = canUseDOM;

			/***/
		},
		/* 22 */
		/***/function (module, exports, __webpack_require__) {

			var __WEBPACK_AMD_DEFINE_RESULT__; /*!
                                      * enquire.js v2.1.1 - Awesome Media Queries in JavaScript
                                      * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/enquire.js
                                      * License: MIT (http://www.opensource.org/licenses/mit-license.php)
                                      */

			;(function (name, context, factory) {
				var matchMedia = window.matchMedia;

				if (typeof module !== 'undefined' && module.exports) {
					module.exports = factory(matchMedia);
				} else if (true) {
					!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
						return context[name] = factory(matchMedia);
					}).call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
				} else {
					context[name] = factory(matchMedia);
				}
			})('enquire', this, function (matchMedia) {

				'use strict';

				/*jshint unused:false */
				/**
     * Helper function for iterating over a collection
     *
     * @param collection
     * @param fn
     */

				function each(collection, fn) {
					var i = 0,
					    length = collection.length,
					    cont;

					for (i; i < length; i++) {
						cont = fn(collection[i], i);
						if (cont === false) {
							break; //allow early exit
						}
					}
				}

				/**
     * Helper function for determining whether target object is an array
     *
     * @param target the object under test
     * @return {Boolean} true if array, false otherwise
     */
				function isArray(target) {
					return Object.prototype.toString.apply(target) === '[object Array]';
				}

				/**
     * Helper function for determining whether target object is a function
     *
     * @param target the object under test
     * @return {Boolean} true if function, false otherwise
     */
				function isFunction(target) {
					return typeof target === 'function';
				}

				/**
     * Delegate to handle a media query being matched and unmatched.
     *
     * @param {object} options
     * @param {function} options.match callback for when the media query is matched
     * @param {function} [options.unmatch] callback for when the media query is unmatched
     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
     * @constructor
     */
				function QueryHandler(options) {
					this.options = options;
					!options.deferSetup && this.setup();
				}
				QueryHandler.prototype = {

					/**
      * coordinates setup of the handler
      *
      * @function
      */
					setup: function setup() {
						if (this.options.setup) {
							this.options.setup();
						}
						this.initialised = true;
					},

					/**
      * coordinates setup and triggering of the handler
      *
      * @function
      */
					on: function on() {
						!this.initialised && this.setup();
						this.options.match && this.options.match();
					},

					/**
      * coordinates the unmatch event for the handler
      *
      * @function
      */
					off: function off() {
						this.options.unmatch && this.options.unmatch();
					},

					/**
      * called when a handler is to be destroyed.
      * delegates to the destroy or unmatch callbacks, depending on availability.
      *
      * @function
      */
					destroy: function destroy() {
						this.options.destroy ? this.options.destroy() : this.off();
					},

					/**
      * determines equality by reference.
      * if object is supplied compare options, if function, compare match callback
      *
      * @function
      * @param {object || function} [target] the target for comparison
      */
					equals: function equals(target) {
						return this.options === target || this.options.match === target;
					}

				};
				/**
     * Represents a single media query, manages it's state and registered handlers for this query
     *
     * @constructor
     * @param {string} query the media query string
     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
     */
				function MediaQuery(query, isUnconditional) {
					this.query = query;
					this.isUnconditional = isUnconditional;
					this.handlers = [];
					this.mql = matchMedia(query);

					var self = this;
					this.listener = function (mql) {
						self.mql = mql;
						self.assess();
					};
					this.mql.addListener(this.listener);
				}
				MediaQuery.prototype = {

					/**
      * add a handler for this query, triggering if already active
      *
      * @param {object} handler
      * @param {function} handler.match callback for when query is activated
      * @param {function} [handler.unmatch] callback for when query is deactivated
      * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
      * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
      */
					addHandler: function addHandler(handler) {
						var qh = new QueryHandler(handler);
						this.handlers.push(qh);

						this.matches() && qh.on();
					},

					/**
      * removes the given handler from the collection, and calls it's destroy methods
      * 
      * @param {object || function} handler the handler to remove
      */
					removeHandler: function removeHandler(handler) {
						var handlers = this.handlers;
						each(handlers, function (h, i) {
							if (h.equals(handler)) {
								h.destroy();
								return !handlers.splice(i, 1); //remove from array and exit each early
							}
						});
					},

					/**
      * Determine whether the media query should be considered a match
      * 
      * @return {Boolean} true if media query can be considered a match, false otherwise
      */
					matches: function matches() {
						return this.mql.matches || this.isUnconditional;
					},

					/**
      * Clears all handlers and unbinds events
      */
					clear: function clear() {
						each(this.handlers, function (handler) {
							handler.destroy();
						});
						this.mql.removeListener(this.listener);
						this.handlers.length = 0; //clear array
					},

					/*
      * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
      */
					assess: function assess() {
						var action = this.matches() ? 'on' : 'off';

						each(this.handlers, function (handler) {
							handler[action]();
						});
					}
				};
				/**
     * Allows for registration of query handlers.
     * Manages the query handler's state and is responsible for wiring up browser events
     *
     * @constructor
     */
				function MediaQueryDispatch() {
					if (!matchMedia) {
						throw new Error('matchMedia not present, legacy browsers require a polyfill');
					}

					this.queries = {};
					this.browserIsIncapable = !matchMedia('only all').matches;
				}

				MediaQueryDispatch.prototype = {

					/**
      * Registers a handler for the given media query
      *
      * @param {string} q the media query
      * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
      * @param {function} options.match fired when query matched
      * @param {function} [options.unmatch] fired when a query is no longer matched
      * @param {function} [options.setup] fired when handler first triggered
      * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
      * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
      */
					register: function register(q, options, shouldDegrade) {
						var queries = this.queries,
						    isUnconditional = shouldDegrade && this.browserIsIncapable;

						if (!queries[q]) {
							queries[q] = new MediaQuery(q, isUnconditional);
						}

						//normalise to object in an array
						if (isFunction(options)) {
							options = { match: options };
						}
						if (!isArray(options)) {
							options = [options];
						}
						each(options, function (handler) {
							queries[q].addHandler(handler);
						});

						return this;
					},

					/**
      * unregisters a query and all it's handlers, or a specific handler for a query
      *
      * @param {string} q the media query to target
      * @param {object || function} [handler] specific handler to unregister
      */
					unregister: function unregister(q, handler) {
						var query = this.queries[q];

						if (query) {
							if (handler) {
								query.removeHandler(handler);
							} else {
								query.clear();
								delete this.queries[q];
							}
						}

						return this;
					}
				};

				return new MediaQueryDispatch();
			});

			/***/
		}
		/******/])
	);
});
;
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (RC) {
  var _ref = _;
  var assign = _ref.assign;

  var util = {};
  RC.Util = RC.util = util;
  /**
   * @ignore
   * some key-codes definition and utils from closure-library
   * @author yiminghe@gmail.com
   */

  var KeyCode = {
    /**
     * MAC_ENTER
     */
    MAC_ENTER: 3,
    /**
     * BACKSPACE
     */
    BACKSPACE: 8,
    /**
     * TAB
     */
    TAB: 9,
    /**
     * NUMLOCK on FF/Safari Mac
     */
    NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
    /**
     * ENTER
     */
    ENTER: 13,
    /**
     * SHIFT
     */
    SHIFT: 16,
    /**
     * CTRL
     */
    CTRL: 17,
    /**
     * ALT
     */
    ALT: 18,
    /**
     * PAUSE
     */
    PAUSE: 19,
    /**
     * CAPS_LOCK
     */
    CAPS_LOCK: 20,
    /**
     * ESC
     */
    ESC: 27,
    /**
     * SPACE
     */
    SPACE: 32,
    /**
     * PAGE_UP
     */
    PAGE_UP: 33, // also NUM_NORTH_EAST
    /**
     * PAGE_DOWN
     */
    PAGE_DOWN: 34, // also NUM_SOUTH_EAST
    /**
     * END
     */
    END: 35, // also NUM_SOUTH_WEST
    /**
     * HOME
     */
    HOME: 36, // also NUM_NORTH_WEST
    /**
     * LEFT
     */
    LEFT: 37, // also NUM_WEST
    /**
     * UP
     */
    UP: 38, // also NUM_NORTH
    /**
     * RIGHT
     */
    RIGHT: 39, // also NUM_EAST
    /**
     * DOWN
     */
    DOWN: 40, // also NUM_SOUTH
    /**
     * PRINT_SCREEN
     */
    PRINT_SCREEN: 44,
    /**
     * INSERT
     */
    INSERT: 45, // also NUM_INSERT
    /**
     * DELETE
     */
    DELETE: 46, // also NUM_DELETE
    /**
     * ZERO
     */
    ZERO: 48,
    /**
     * ONE
     */
    ONE: 49,
    /**
     * TWO
     */
    TWO: 50,
    /**
     * THREE
     */
    THREE: 51,
    /**
     * FOUR
     */
    FOUR: 52,
    /**
     * FIVE
     */
    FIVE: 53,
    /**
     * SIX
     */
    SIX: 54,
    /**
     * SEVEN
     */
    SEVEN: 55,
    /**
     * EIGHT
     */
    EIGHT: 56,
    /**
     * NINE
     */
    NINE: 57,
    /**
     * QUESTION_MARK
     */
    QUESTION_MARK: 63, // needs localization
    /**
     * A
     */
    A: 65,
    /**
     * B
     */
    B: 66,
    /**
     * C
     */
    C: 67,
    /**
     * D
     */
    D: 68,
    /**
     * E
     */
    E: 69,
    /**
     * F
     */
    F: 70,
    /**
     * G
     */
    G: 71,
    /**
     * H
     */
    H: 72,
    /**
     * I
     */
    I: 73,
    /**
     * J
     */
    J: 74,
    /**
     * K
     */
    K: 75,
    /**
     * L
     */
    L: 76,
    /**
     * M
     */
    M: 77,
    /**
     * N
     */
    N: 78,
    /**
     * O
     */
    O: 79,
    /**
     * P
     */
    P: 80,
    /**
     * Q
     */
    Q: 81,
    /**
     * R
     */
    R: 82,
    /**
     * S
     */
    S: 83,
    /**
     * T
     */
    T: 84,
    /**
     * U
     */
    U: 85,
    /**
     * V
     */
    V: 86,
    /**
     * W
     */
    W: 87,
    /**
     * X
     */
    X: 88,
    /**
     * Y
     */
    Y: 89,
    /**
     * Z
     */
    Z: 90,
    /**
     * META
     */
    META: 91, // WIN_KEY_LEFT
    /**
     * WIN_KEY_RIGHT
     */
    WIN_KEY_RIGHT: 92,
    /**
     * CONTEXT_MENU
     */
    CONTEXT_MENU: 93,
    /**
     * NUM_ZERO
     */
    NUM_ZERO: 96,
    /**
     * NUM_ONE
     */
    NUM_ONE: 97,
    /**
     * NUM_TWO
     */
    NUM_TWO: 98,
    /**
     * NUM_THREE
     */
    NUM_THREE: 99,
    /**
     * NUM_FOUR
     */
    NUM_FOUR: 100,
    /**
     * NUM_FIVE
     */
    NUM_FIVE: 101,
    /**
     * NUM_SIX
     */
    NUM_SIX: 102,
    /**
     * NUM_SEVEN
     */
    NUM_SEVEN: 103,
    /**
     * NUM_EIGHT
     */
    NUM_EIGHT: 104,
    /**
     * NUM_NINE
     */
    NUM_NINE: 105,
    /**
     * NUM_MULTIPLY
     */
    NUM_MULTIPLY: 106,
    /**
     * NUM_PLUS
     */
    NUM_PLUS: 107,
    /**
     * NUM_MINUS
     */
    NUM_MINUS: 109,
    /**
     * NUM_PERIOD
     */
    NUM_PERIOD: 110,
    /**
     * NUM_DIVISION
     */
    NUM_DIVISION: 111,
    /**
     * F1
     */
    F1: 112,
    /**
     * F2
     */
    F2: 113,
    /**
     * F3
     */
    F3: 114,
    /**
     * F4
     */
    F4: 115,
    /**
     * F5
     */
    F5: 116,
    /**
     * F6
     */
    F6: 117,
    /**
     * F7
     */
    F7: 118,
    /**
     * F8
     */
    F8: 119,
    /**
     * F9
     */
    F9: 120,
    /**
     * F10
     */
    F10: 121,
    /**
     * F11
     */
    F11: 122,
    /**
     * F12
     */
    F12: 123,
    /**
     * NUMLOCK
     */
    NUMLOCK: 144,
    /**
     * SEMICOLON
     */
    SEMICOLON: 186, // needs localization
    /**
     * DASH
     */
    DASH: 189, // needs localization
    /**
     * EQUALS
     */
    EQUALS: 187, // needs localization
    /**
     * COMMA
     */
    COMMA: 188, // needs localization
    /**
     * PERIOD
     */
    PERIOD: 190, // needs localization
    /**
     * SLASH
     */
    SLASH: 191, // needs localization
    /**
     * APOSTROPHE
     */
    APOSTROPHE: 192, // needs localization
    /**
     * SINGLE_QUOTE
     */
    SINGLE_QUOTE: 222, // needs localization
    /**
     * OPEN_SQUARE_BRACKET
     */
    OPEN_SQUARE_BRACKET: 219, // needs localization
    /**
     * BACKSLASH
     */
    BACKSLASH: 220, // needs localization
    /**
     * CLOSE_SQUARE_BRACKET
     */
    CLOSE_SQUARE_BRACKET: 221, // needs localization
    /**
     * WIN_KEY
     */
    WIN_KEY: 224,
    /**
     * MAC_FF_META
     */
    MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
    /**
     * WIN_IME
     */
    WIN_IME: 229
  };

  /*
   whether text and modified key is entered at the same time.
   */
  KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
    var keyCode = e.keyCode;
    if (e.altKey && !e.ctrlKey || e.metaKey ||
    // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }

    // The following keys are quite harmless, even in combination with
    // CTRL, ALT or SHIFT.
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  };

  /*
   whether character is entered.
   */
  KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }

    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }

    // Safari sends zero key code for non-latin characters.
    if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
      return true;
    }

    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  };

  util.KeyCode = KeyCode;
  RC.KeyCode = KeyCode;

  /**
   * Safe chained function
   *
   * Will only create a new function if needed,
   * otherwise will pass back existing functions or null.
   *
   * @returns {function|null}
   */
  function createChainedFunction() {
    var args = arguments;
    return function chainedFunction() {
      for (var i = 0; i < args.length; i++) {
        if (args[i] && args[i].apply) {
          args[i].apply(this, arguments);
        }
      }
    };
  }
  util.createChainedFunction = createChainedFunction;

  function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
      return !!ret;
    }

    if (objA === objB) {
      return true;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
      return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    var len = keysA.length;
    if (len !== keysB.length) {
      return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
      var key = keysA[i];
      if (!bHasOwnProperty(key)) {
        return false;
      }
      var valueA = objA[key];
      var valueB = objB[key];

      var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
      if (_ret === false || _ret === void 0 && valueA !== valueB) {
        return false;
      }
    }

    return true;
  };
  util.shallowEqual = shallowEqual;

  var PureRenderMixin = {
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
  };

  util.PureRenderMixin = PureRenderMixin;

  var seed = 0;

  function guid() {
    return Date.now() + '_' + seed++;
  };

  util.guid = guid;
  util.uid = guid;
  util.getUuid = guid;

  util.warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };

  var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

  function getClientPosition(elem) {
    var box, x, y;
    var doc = elem.ownerDocument;
    var body = doc.body;
    var docElem = doc && doc.documentElement;
    // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
    box = elem.getBoundingClientRect();

    // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
    // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
    // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

    x = box.left;
    y = box.top;

    // In IE, most of the time, 2 extra pixels are added to the top and left
    // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
    // IE6 standards mode, this border can be overridden by setting the
    // document element's border to zero -- thus, we cannot rely on the
    // offset always being 2 pixels.

    // In quirks mode, the offset can be determined by querying the body's
    // clientLeft/clientTop, but in standards mode, it is found by querying
    // the document element's clientLeft/clientTop.  Since we already called
    // getClientBoundingRect we have already forced a reflow, so it is not
    // too expensive just to query them all.

    // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
    // 窗口边框标准是设 documentElement ,quirks 时设置 body
    // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
    // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
    // 标准 ie 下 docElem.clientTop 就是 border-top
    // ie7 html 即窗口边框改变不了。永远为 2
    // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;

    return {
      left: x,
      top: y
    };
  }

  function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      //ie6,7,8 standard mode
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        //quirks mode
        ret = d.body[method];
      }
    }
    return ret;
  }

  function getScrollLeft(w) {
    return getScroll(w);
  }

  function getScrollTop(w) {
    return getScroll(w, true);
  }

  function getOffset(el) {
    var pos = getClientPosition(el);
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScrollLeft(w);
    pos.top += getScrollTop(w);
    return pos;
  }

  function _getComputedStyle(elem, name, computedStyle) {
    var val = '';
    var d = elem.ownerDocument;

    // https://github.com/kissyteam/kissy/issues/61
    if (computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null)) {
      val = computedStyle.getPropertyValue(name) || computedStyle[name];
    }

    return val;
  }

  var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
  var RE_POS = /^(top|right|bottom|left)$/,
      CURRENT_STYLE = 'currentStyle',
      RUNTIME_STYLE = 'runtimeStyle',
      LEFT = 'left',
      PX = 'px';

  function _getComputedStyleIE(elem, name) {
    // currentStyle maybe null
    // http://msdn.microsoft.com/en-us/library/ms535231.aspx
    var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

    // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
    // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
    // 在 ie 下不对，需要直接用 offset 方式
    // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    // exclude left right for relativity
    if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
      // Remember the original values
      var style = elem.style,
          left = style[LEFT],
          rsLeft = elem[RUNTIME_STYLE][LEFT];

      // prevent flashing of content
      elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

      // Put in the new values to get a computed value out
      style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
      ret = style.pixelLeft + PX;

      // Revert the changed values
      style[LEFT] = left;

      elem[RUNTIME_STYLE][LEFT] = rsLeft;
    }
    return ret === '' ? 'auto' : ret;
  }

  var getComputedStyleX;
  if (typeof window !== 'undefined') {
    getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
  }

  // 设置 elem 相对 elem.ownerDocument 的坐标
  function setOffset(elem, offset) {
    // set position first, in-case top/left are set even on static elem
    if (css(elem, 'position') === 'static') {
      elem.style.position = 'relative';
    }

    var old = getOffset(elem),
        ret = {},
        current,
        key;

    for (key in offset) {
      current = parseFloat(css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
    css(elem, ret);
  }

  function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      fn(arr[i]);
    }
  }

  function isBorderBoxFn(elem) {
    return getComputedStyleX(elem, 'boxSizing') === 'border-box';
  }

  var BOX_MODELS = ['margin', 'border', 'padding'],
      CONTENT_INDEX = -1,
      PADDING_INDEX = 2,
      BORDER_INDEX = 1,
      MARGIN_INDEX = 0;

  function swap(elem, options, callback) {
    var old = {},
        style = elem.style,
        name;

    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = style[name];
      style[name] = options[name];
    }

    callback.call(elem);

    // Revert the old values
    for (name in options) {
      style[name] = old[name];
    }
  }

  function getPBMWidth(elem, props, which) {
    var value = 0,
        prop,
        j,
        i;
    for (j = 0; j < props.length; j++) {
      prop = props[j];
      if (prop) {
        for (i = 0; i < which.length; i++) {
          var cssProp;
          if (prop === 'border') {
            cssProp = prop + which[i] + 'Width';
          } else {
            cssProp = prop + which[i];
          }
          value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
        }
      }
    }
    return value;
  }

  /**
   * A crude way of determining if an object is a window
   * @member util
   */
  function isWindow(obj) {
    // must use == for ie8
    /*jshint eqeqeq:false*/
    return obj != null && obj == obj.window;
  }

  var domUtils = {};

  each(['Width', 'Height'], function (name) {
    domUtils['doc' + name] = function (refWin) {
      var d = refWin.document;
      return Math.max(
      //firefox chrome documentElement.scrollHeight< body.scrollHeight
      //ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d.documentElement['scroll' + name],
      //quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d.body['scroll' + name], domUtils['viewport' + name](d));
    };

    domUtils['viewport' + name] = function (win) {
      // pc browser includes scrollbar in window.innerWidth
      var prop = 'client' + name,
          doc = win.document,
          body = doc.body,
          documentElement = doc.documentElement,
          documentElementProp = documentElement[prop];
      // 标准模式取 documentElement
      // backcompat 取 body
      return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
    };
  });

  /*
   得到元素的大小信息
   @param elem
   @param name
   @param {String} [extra]  'padding' : (css width) + padding
   'border' : (css width) + padding + border
   'margin' : (css width) + padding + border + margin
   */
  function getWH(elem, name, extra) {
    if (isWindow(elem)) {
      return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
    } else if (elem.nodeType === 9) {
      return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
    }
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'],
        borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    var computedStyle = getComputedStyleX(elem);
    var isBorderBox = isBorderBoxFn(elem, computedStyle);
    var cssBoxValue = 0;
    if (borderBoxValue == null || borderBoxValue <= 0) {
      borderBoxValue = undefined;
      // Fall back to computed then un computed css if necessary
      cssBoxValue = getComputedStyleX(elem, name);
      if (cssBoxValue == null || Number(cssBoxValue) < 0) {
        cssBoxValue = elem.style[name] || 0;
      }
      // Normalize '', auto, and prepare for extra
      cssBoxValue = parseFloat(cssBoxValue) || 0;
    }
    if (extra === undefined) {
      extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
    }
    var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
    var val = borderBoxValue || cssBoxValue;
    if (extra === CONTENT_INDEX) {
      if (borderBoxValueOrIsBorderBox) {
        return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
      } else {
        return cssBoxValue;
      }
    } else if (borderBoxValueOrIsBorderBox) {
      return val + (extra === BORDER_INDEX ? 0 : extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
    } else {
      return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
    }
  }

  var cssShow = {
    position: 'absolute',
    visibility: 'hidden',
    display: 'block'
  };

  // fix #119 : https://github.com/kissyteam/kissy/issues/119
  function getWHIgnoreDisplay(elem) {
    var val,
        args = arguments;
    // in case elem is window
    // elem.offsetWidth === undefined
    if (elem.offsetWidth !== 0) {
      val = getWH.apply(undefined, args);
    } else {
      swap(elem, cssShow, function () {
        val = getWH.apply(undefined, args);
      });
    }
    return val;
  }

  each(['width', 'height'], function (name) {
    var first = name.charAt(0).toUpperCase() + name.slice(1);
    domUtils['outer' + first] = function (el, includeMargin) {
      return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
    };
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

    domUtils[name] = function (elem, val) {
      if (val !== undefined) {
        if (elem) {
          var computedStyle = getComputedStyleX(elem);
          var isBorderBox = isBorderBoxFn(elem);
          if (isBorderBox) {
            val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
          }
          return css(elem, name, val);
        }
        return;
      }
      return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
    };
  });

  function css(el, name, value) {
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      for (var i in name) {
        css(el, i, name[i]);
      }
      return;
    }
    if (typeof value !== 'undefined') {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      el.style[name] = value;
    } else {
      return getComputedStyleX(el, name);
    }
  }

  function mix(to, from) {
    for (var i in from) {
      to[i] = from[i];
    }
    return to;
  }

  var utils = {
    getWindow: function getWindow(node) {
      var doc = node.ownerDocument || node;
      return doc.defaultView || doc.parentWindow || node;
    },
    offset: function offset(el, value) {
      if (typeof value !== 'undefined') {
        setOffset(el, value);
      } else {
        return getOffset(el);
      }
    },
    isWindow: isWindow,
    each: each,
    css: css,
    clone: function clone(obj) {
      var ret = {};
      for (var i in obj) {
        ret[i] = obj[i];
      }
      var overflow = obj.overflow;
      if (overflow) {
        for (i in obj) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
      return ret;
    },
    mix: mix,
    getWindowScrollLeft: function getWindowScrollLeft(w) {
      return getScrollLeft(w);
    },
    getWindowScrollTop: function getWindowScrollTop(w) {
      return getScrollTop(w);
    },

    scrollLeft: function scrollLeft(w, v) {
      if (isWindow(w)) {
        if (v === undefined) {
          return getScrollLeft(w);
        } else {
          window.scrollTo(v, getScrollTop(w));
        }
      } else {
        if (v === undefined) {
          return w.scrollLeft;
        } else {
          w.scrollLeft = v;
        }
      }
    },
    scrollTop: function scrollTop(w, v) {
      if (isWindow(w)) {
        if (v === undefined) {
          return getScrollTop(w);
        } else {
          window.scrollTo(getScrollLeft(w), v);
        }
      } else {
        if (v === undefined) {
          return w.scrollTop;
        } else {
          w.scrollTop = v;
        }
      }
    },
    merge: function merge() {
      var ret = {};
      for (var i = 0; i < arguments.length; i++) {
        utils.mix(ret, arguments[i]);
      }
      return ret;
    },
    viewportWidth: 0,
    viewportHeight: 0
  };
  mix(utils, domUtils);
  mix(util, utils);

  util.scrollIntoView = function (elem, container, config) {
    config = config || {};
    // document 归一化到 window
    if (container.nodeType === 9) {
      container = util.getWindow(container);
    }

    var allowHorizontalScroll = config.allowHorizontalScroll;
    var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
    var alignWithTop = config.alignWithTop;
    var alignWithLeft = config.alignWithLeft;

    allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

    var isWin = util.isWindow(container);
    var elemOffset = util.offset(elem);
    var eh = util.outerHeight(elem);
    var ew = util.outerWidth(elem);
    var containerOffset, ch, cw, containerScroll, diffTop, diffBottom, win, winScroll, ww, wh;

    if (isWin) {
      win = container;
      wh = util.height(win);
      ww = util.width(win);
      winScroll = {
        left: util.scrollLeft(win),
        top: util.scrollTop(win)
      };
      // elem 相对 container 可视视窗的距离
      diffTop = {
        left: elemOffset.left - winScroll.left,
        top: elemOffset.top - winScroll.top
      };
      diffBottom = {
        left: elemOffset.left + ew - (winScroll.left + ww),
        top: elemOffset.top + eh - (winScroll.top + wh)
      };
      containerScroll = winScroll;
    } else {
      containerOffset = util.offset(container);
      ch = container.clientHeight;
      cw = container.clientWidth;
      containerScroll = {
        left: container.scrollLeft,
        top: container.scrollTop
      };
      // elem 相对 container 可视视窗的距离
      // 注意边框, offset 是边框到根节点
      diffTop = {
        left: elemOffset.left - (containerOffset.left + (parseFloat(util.css(container, 'borderLeftWidth')) || 0)),
        top: elemOffset.top - (containerOffset.top + (parseFloat(util.css(container, 'borderTopWidth')) || 0))
      };
      diffBottom = {
        left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(util.css(container, 'borderRightWidth')) || 0)),
        top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0))
      };
    }

    if (diffTop.top < 0 || diffBottom.top > 0) {
      // 强制向上
      if (alignWithTop === true) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else if (alignWithTop === false) {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      } else {
        // 自动调整
        if (diffTop.top < 0) {
          util.scrollTop(container, containerScroll.top + diffTop.top);
        } else {
          util.scrollTop(container, containerScroll.top + diffBottom.top);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
        if (alignWithTop) {
          util.scrollTop(container, containerScroll.top + diffTop.top);
        } else {
          util.scrollTop(container, containerScroll.top + diffBottom.top);
        }
      }
    }

    if (allowHorizontalScroll) {
      if (diffTop.left < 0 || diffBottom.left > 0) {
        // 强制向上
        if (alignWithLeft === true) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else if (alignWithLeft === false) {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        } else {
          // 自动调整
          if (diffTop.left < 0) {
            util.scrollLeft(container, containerScroll.left + diffTop.left);
          } else {
            util.scrollLeft(container, containerScroll.left + diffBottom.left);
          }
        }
      } else {
        if (!onlyScrollIfNeeded) {
          alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
          if (alignWithLeft) {
            util.scrollLeft(container, containerScroll.left + diffTop.left);
          } else {
            util.scrollLeft(container, containerScroll.left + diffBottom.left);
          }
        }
      }
    }
  };

  var addDOMEventListener = (function () {
    /**
     * @ignore
     * base event object for custom and dom event.
     * @author yiminghe@gmail.com
     */

    function returnFalse() {
      return false;
    }

    function returnTrue() {
      return true;
    }

    function EventBaseObject() {
      this.timeStamp = Date.now();
      this.target = undefined;
      this.currentTarget = undefined;
    }

    EventBaseObject.prototype = {
      isEventObject: 1,

      constructor: EventBaseObject,

      isDefaultPrevented: returnFalse,

      isPropagationStopped: returnFalse,

      isImmediatePropagationStopped: returnFalse,

      preventDefault: function preventDefault() {
        this.isDefaultPrevented = returnTrue;
      },
      stopPropagation: function stopPropagation() {
        this.isPropagationStopped = returnTrue;
      },
      stopImmediatePropagation: function stopImmediatePropagation() {
        this.isImmediatePropagationStopped = returnTrue;
        // fixed 1.2
        // call stopPropagation implicitly
        this.stopPropagation();
      },
      halt: function halt(immediate) {
        if (immediate) {
          this.stopImmediatePropagation();
        } else {
          this.stopPropagation();
        }
        this.preventDefault();
      }
    };

    var TRUE = true;
    var FALSE = false;
    var commonProps = ['altKey', 'bubbles', 'cancelable', 'ctrlKey', 'currentTarget', 'eventPhase', 'metaKey', 'shiftKey', 'target', 'timeStamp', 'view', 'type'];

    function isNullOrUndefined(w) {
      return w === null || w === undefined;
    }

    var eventNormalizers = [{
      reg: /^key/,
      props: ['char', 'charCode', 'key', 'keyCode', 'which'],
      fix: function fix(event, nativeEvent) {
        if (isNullOrUndefined(event.which)) {
          event.which = !isNullOrUndefined(nativeEvent.charCode) ? nativeEvent.charCode : nativeEvent.keyCode;
        }

        // add metaKey to non-Mac browsers (use ctrl for PC 's and Meta for Macs)
        if (event.metaKey === undefined) {
          event.metaKey = event.ctrlKey;
        }
      }
    }, {
      reg: /^touch/,
      props: ['touches', 'changedTouches', 'targetTouches']
    }, {
      reg: /^hashchange$/,
      props: ['newURL', 'oldURL']
    }, {
      reg: /^gesturechange$/i,
      props: ['rotation', 'scale']
    }, {
      reg: /^(mousewheel|DOMMouseScroll)$/,
      props: [],
      fix: function fix(event, nativeEvent) {
        var deltaX = undefined;
        var deltaY = undefined;
        var delta = undefined;
        var wheelDelta = nativeEvent.wheelDelta;
        var axis = nativeEvent.axis;
        var wheelDeltaY = nativeEvent.wheelDeltaY;
        var wheelDeltaX = nativeEvent.wheelDeltaX;
        var detail = nativeEvent.detail;

        // ie/webkit
        if (wheelDelta) {
          delta = wheelDelta / 120;
        }

        // gecko
        if (detail) {
          // press control e.detail == 1 else e.detail == 3
          delta = 0 - (detail % 3 === 0 ? detail / 3 : detail);
        }

        // Gecko
        if (axis !== undefined) {
          if (axis === event.HORIZONTAL_AXIS) {
            deltaY = 0;
            deltaX = 0 - delta;
          } else if (axis === event.VERTICAL_AXIS) {
            deltaX = 0;
            deltaY = delta;
          }
        }

        // Webkit
        if (wheelDeltaY !== undefined) {
          deltaY = wheelDeltaY / 120;
        }
        if (wheelDeltaX !== undefined) {
          deltaX = -1 * wheelDeltaX / 120;
        }

        // 默认 deltaY (ie)
        if (!deltaX && !deltaY) {
          deltaY = delta;
        }

        if (deltaX !== undefined) {
          /**
           * deltaX of mousewheel event
           * @property deltaX
           * @member Event.DomEvent.Object
           */
          event.deltaX = deltaX;
        }

        if (deltaY !== undefined) {
          /**
           * deltaY of mousewheel event
           * @property deltaY
           * @member Event.DomEvent.Object
           */
          event.deltaY = deltaY;
        }

        if (delta !== undefined) {
          /**
           * delta of mousewheel event
           * @property delta
           * @member Event.DomEvent.Object
           */
          event.delta = delta;
        }
      }
    }, {
      reg: /^mouse|contextmenu|click|mspointer|(^DOMMouseScroll$)/i,
      props: ['buttons', 'clientX', 'clientY', 'button', 'offsetX', 'relatedTarget', 'which', 'fromElement', 'toElement', 'offsetY', 'pageX', 'pageY', 'screenX', 'screenY'],
      fix: function fix(event, nativeEvent) {
        var eventDoc = undefined;
        var doc = undefined;
        var body = undefined;
        var target = event.target;
        var button = nativeEvent.button;

        // Calculate pageX/Y if missing and clientX/Y available
        if (target && isNullOrUndefined(event.pageX) && !isNullOrUndefined(nativeEvent.clientX)) {
          eventDoc = target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = nativeEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = nativeEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }

        // which for click: 1 === left; 2 === middle; 3 === right
        // do not use button
        if (!event.which && button !== undefined) {
          if (button & 1) {
            event.which = 1;
          } else if (button & 2) {
            event.which = 3;
          } else if (button & 4) {
            event.which = 2;
          } else {
            event.which = 0;
          }
        }

        // add relatedTarget, if necessary
        if (!event.relatedTarget && event.fromElement) {
          event.relatedTarget = event.fromElement === target ? event.toElement : event.fromElement;
        }

        return event;
      }
    }];

    function retTrue() {
      return TRUE;
    }

    function retFalse() {
      return FALSE;
    }

    function DomEventObject(nativeEvent) {
      var type = nativeEvent.type;

      var isNative = typeof nativeEvent.stopPropagation === 'function' || typeof nativeEvent.cancelBubble === 'boolean';

      EventBaseObject.call(this);

      this.nativeEvent = nativeEvent;

      // in case dom event has been mark as default prevented by lower dom node
      var isDefaultPrevented = retFalse;
      if ('defaultPrevented' in nativeEvent) {
        isDefaultPrevented = nativeEvent.defaultPrevented ? retTrue : retFalse;
      } else if ('getPreventDefault' in nativeEvent) {
        // https://bugzilla.mozilla.org/show_bug.cgi?id=691151
        isDefaultPrevented = nativeEvent.getPreventDefault() ? retTrue : retFalse;
      } else if ('returnValue' in nativeEvent) {
        isDefaultPrevented = nativeEvent.returnValue === FALSE ? retTrue : retFalse;
      }

      this.isDefaultPrevented = isDefaultPrevented;

      var fixFns = [];
      var fixFn = undefined;
      var l = undefined;
      var prop = undefined;
      var props = commonProps.concat();

      eventNormalizers.forEach(function (normalizer) {
        if (type.match(normalizer.reg)) {
          props = props.concat(normalizer.props);
          if (normalizer.fix) {
            fixFns.push(normalizer.fix);
          }
        }
      });

      l = props.length;

      // clone properties of the original event object
      while (l) {
        prop = props[--l];
        this[prop] = nativeEvent[prop];
      }

      // fix target property, if necessary
      if (!this.target && isNative) {
        this.target = nativeEvent.srcElement || document; // srcElement might not be defined either
      }

      // check if target is a text node (safari)
      if (this.target && this.target.nodeType === 3) {
        this.target = this.target.parentNode;
      }

      l = fixFns.length;

      while (l) {
        fixFn = fixFns[--l];
        fixFn(this, nativeEvent);
      }

      this.timeStamp = nativeEvent.timeStamp || Date.now();
    }

    var EventBaseObjectProto = EventBaseObject.prototype;

    assign(DomEventObject.prototype, EventBaseObjectProto, {
      constructor: DomEventObject,

      preventDefault: function preventDefault() {
        var e = this.nativeEvent;

        // if preventDefault exists run it on the original event
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          // otherwise set the returnValue property of the original event to FALSE (IE)
          e.returnValue = FALSE;
        }

        EventBaseObjectProto.preventDefault.call(this);
      },
      stopPropagation: function stopPropagation() {
        var e = this.nativeEvent;

        // if stopPropagation exists run it on the original event
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          // otherwise set the cancelBubble property of the original event to TRUE (IE)
          e.cancelBubble = TRUE;
        }

        EventBaseObjectProto.stopPropagation.call(this);
      }
    });

    return function addEventListener(target, eventType, callback) {
      function wrapCallback(e) {
        var ne = new DomEventObject(e);
        callback.call(target, ne);
      }

      if (target.addEventListener) {
        target.addEventListener(eventType, wrapCallback, false);
        return {
          remove: function remove() {
            target.removeEventListener(eventType, wrapCallback, false);
          }
        };
      } else if (target.attachEvent) {
        target.attachEvent('on' + eventType, wrapCallback);
        return {
          remove: function remove() {
            target.detachEvent('on' + eventType, wrapCallback);
          }
        };
      }
    };
  })();

  util.Dom = {
    addEventListener: function addEventListener(target, eventType, cb) {
      /* eslint camelcase: 2 */
      var callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
        ReactDOM.unstable_batchedUpdates(cb, e);
      } : cb;
      return addDOMEventListener(target, eventType, callback);
    },
    contains: function contains(root, n) {
      var node = n;
      while (node) {
        if (node === root) {
          return true;
        }
        node = node.parentNode;
      }

      return false;
    }
  };

  util.Children = {
    toArray: function toArray(children) {
      var ret = [];
      React.Children.forEach(children, function each(c) {
        ret.push(c);
      });
      return ret;
    },
    mapSelf: function mapSelf(children) {
      // return ReactFragment
      return React.Children.map(children, _.identity);
    }
  };

  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };

  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
  };

  function hoistNonReactStatics(targetComponent, sourceComponent) {
    var keys = Object.getOwnPropertyNames(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
        targetComponent[keys[i]] = sourceComponent[keys[i]];
      }
    }

    return targetComponent;
  };

  util.hoistStatics = hoistNonReactStatics;

  var hasOwn = ({}).hasOwnProperty;

  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(null, arg));
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }
  RC.classnames = RC.classNames = classNames;
  window.classnames = window.classNames = classNames;

  function arrayTreeFilter(data, filterFn, options) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    var children = data || [];
    var result = [];
    var level = 0;
    var foundItem;
    do {
      var foundItem = children.filter(function (item) {
        return filterFn(item, level);
      })[0];
      if (!foundItem) {
        break;
      }
      result.push(foundItem);
      children = foundItem[options.childrenKeyName] || [];
      level += 1;
    } while (children.length > 0);
    return result;
  }
  RC.arrayTreeFilter = util.arrayTreeFilter = arrayTreeFilter;
})(Smart.RC);
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * align dom node flexibly
 * @author yiminghe@gmail.com
 */

+(function (RC) {

  var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

  var getComputedStyleX = undefined;

  function css(el, name, v) {
    var value = v;
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      for (var i in name) {
        if (name.hasOwnProperty(i)) {
          css(el, i, name[i]);
        }
      }
      return undefined;
    }
    if (typeof value !== 'undefined') {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      el.style[name] = value;
      return undefined;
    }
    return getComputedStyleX(el, name);
  }

  function getClientPosition(elem) {
    var box = undefined;
    var x = undefined;
    var y = undefined;
    var doc = elem.ownerDocument;
    var body = doc.body;
    var docElem = doc && doc.documentElement;
    // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
    box = elem.getBoundingClientRect();

    // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
    // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
    // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

    x = box.left;
    y = box.top;

    // In IE, most of the time, 2 extra pixels are added to the top and left
    // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
    // IE6 standards mode, this border can be overridden by setting the
    // document element's border to zero -- thus, we cannot rely on the
    // offset always being 2 pixels.

    // In quirks mode, the offset can be determined by querying the body's
    // clientLeft/clientTop, but in standards mode, it is found by querying
    // the document element's clientLeft/clientTop.  Since we already called
    // getClientBoundingRect we have already forced a reflow, so it is not
    // too expensive just to query them all.

    // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
    // 窗口边框标准是设 documentElement ,quirks 时设置 body
    // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
    // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
    // 标准 ie 下 docElem.clientTop 就是 border-top
    // ie7 html 即窗口边框改变不了。永远为 2
    // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;

    return { left: x, top: y };
  }

  function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      // ie6,7,8 standard mode
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        // quirks mode
        ret = d.body[method];
      }
    }
    return ret;
  }

  function getScrollLeft(w) {
    return getScroll(w);
  }

  function getScrollTop(w) {
    return getScroll(w, true);
  }

  function getOffset(el) {
    var pos = getClientPosition(el);
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScrollLeft(w);
    pos.top += getScrollTop(w);
    return pos;
  }
  function _getComputedStyle(elem, name, cs) {
    var computedStyle = cs;
    var val = '';
    var d = elem.ownerDocument;
    computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

    // https://github.com/kissyteam/kissy/issues/61
    if (computedStyle) {
      val = computedStyle.getPropertyValue(name) || computedStyle[name];
    }

    return val;
  }

  var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
  var RE_POS = /^(top|right|bottom|left)$/;
  var CURRENT_STYLE = 'currentStyle';
  var RUNTIME_STYLE = 'runtimeStyle';
  var LEFT = 'left';
  var PX = 'px';

  function _getComputedStyleIE(elem, name) {
    // currentStyle maybe null
    // http://msdn.microsoft.com/en-us/library/ms535231.aspx
    var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

    // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
    // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
    // 在 ie 下不对，需要直接用 offset 方式
    // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    // exclude left right for relativity
    if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
      // Remember the original values
      var style = elem.style;
      var left = style[LEFT];
      var rsLeft = elem[RUNTIME_STYLE][LEFT];

      // prevent flashing of content
      elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

      // Put in the new values to get a computed value out
      style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
      ret = style.pixelLeft + PX;

      // Revert the changed values
      style[LEFT] = left;

      elem[RUNTIME_STYLE][LEFT] = rsLeft;
    }
    return ret === '' ? 'auto' : ret;
  }

  if (typeof window !== 'undefined') {
    getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
  }

  function getOffsetDirection(dir, option) {
    if (dir === 'left') {
      return option.useCssRight ? 'right' : dir;
    }
    return option.useCssBottom ? 'bottom' : dir;
  }

  function oppositeOffsetDirection(dir) {
    if (dir === 'left') {
      return 'right';
    } else if (dir === 'right') {
      return 'left';
    } else if (dir === 'top') {
      return 'bottom';
    } else if (dir === 'bottom') {
      return 'top';
    }
  }

  // 设置 elem 相对 elem.ownerDocument 的坐标
  function setOffset(elem, offset, option) {
    // set position first, in-case top/left are set even on static elem
    if (css(elem, 'position') === 'static') {
      elem.style.position = 'relative';
    }
    var presetH = -999;
    var presetV = -999;
    var horizontalProperty = getOffsetDirection('left', option);
    var verticalProperty = getOffsetDirection('top', option);
    var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
    var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

    if (horizontalProperty !== 'left') {
      presetH = 999;
    }

    if (verticalProperty !== 'top') {
      presetV = 999;
    }

    if ('left' in offset) {
      elem.style[oppositeHorizontalProperty] = '';
      elem.style[horizontalProperty] = presetH + 'px';
    }
    if ('top' in offset) {
      elem.style[oppositeVerticalProperty] = '';
      elem.style[verticalProperty] = presetV + 'px';
    }
    var old = getOffset(elem);
    var ret = {};
    var key = undefined;
    for (key in offset) {
      if (offset.hasOwnProperty(key)) {
        var dir = getOffsetDirection(key, option);
        var preset = key === 'left' ? presetH : presetV;
        if (dir === key) {
          ret[dir] = preset + offset[key] - old[key];
        } else {
          ret[dir] = preset + old[key] - offset[key];
        }
      }
    }
    css(elem, ret);
  }

  function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      fn(arr[i]);
    }
  }

  function isBorderBoxFn(elem) {
    return getComputedStyleX(elem, 'boxSizing') === 'border-box';
  }

  var BOX_MODELS = ['margin', 'border', 'padding'];
  var CONTENT_INDEX = -1;
  var PADDING_INDEX = 2;
  var BORDER_INDEX = 1;
  var MARGIN_INDEX = 0;

  function swap(elem, options, callback) {
    var old = {};
    var style = elem.style;
    var name = undefined;

    // Remember the old values, and insert the new ones
    for (name in options) {
      if (options.hasOwnProperty(name)) {
        old[name] = style[name];
        style[name] = options[name];
      }
    }

    callback.call(elem);

    // Revert the old values
    for (name in options) {
      if (options.hasOwnProperty(name)) {
        style[name] = old[name];
      }
    }
  }

  function getPBMWidth(elem, props, which) {
    var value = 0;
    var prop = undefined;
    var j = undefined;
    var i = undefined;
    for (j = 0; j < props.length; j++) {
      prop = props[j];
      if (prop) {
        for (i = 0; i < which.length; i++) {
          var cssProp = undefined;
          if (prop === 'border') {
            cssProp = prop + which[i] + 'Width';
          } else {
            cssProp = prop + which[i];
          }
          value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
        }
      }
    }
    return value;
  }

  /**
   * A crude way of determining if an object is a window
   * @member util
   */
  function isWindow(obj) {
    // must use == for ie8
    /* eslint eqeqeq:0 */
    return obj !== null && obj !== undefined && obj == obj.window;
  }

  var domUtils = {};

  each(['Width', 'Height'], function (name) {
    domUtils['doc' + name] = function (refWin) {
      var d = refWin.document;
      return Math.max(
      // firefox chrome documentElement.scrollHeight< body.scrollHeight
      // ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d.documentElement['scroll' + name],
      // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d.body['scroll' + name], domUtils['viewport' + name](d));
    };

    domUtils['viewport' + name] = function (win) {
      // pc browser includes scrollbar in window.innerWidth
      var prop = 'client' + name;
      var doc = win.document;
      var body = doc.body;
      var documentElement = doc.documentElement;
      var documentElementProp = documentElement[prop];
      // 标准模式取 documentElement
      // backcompat 取 body
      return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
    };
  });

  /*
   得到元素的大小信息
   @param elem
   @param name
   @param {String} [extra]  'padding' : (css width) + padding
   'border' : (css width) + padding + border
   'margin' : (css width) + padding + border + margin
   */
  function getWH(elem, name, ex) {
    var extra = ex;
    if (isWindow(elem)) {
      return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
    } else if (elem.nodeType === 9) {
      return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
    }
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
    var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    var computedStyle = getComputedStyleX(elem);
    var isBorderBox = isBorderBoxFn(elem, computedStyle);
    var cssBoxValue = 0;
    if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
      borderBoxValue = undefined;
      // Fall back to computed then un computed css if necessary
      cssBoxValue = getComputedStyleX(elem, name);
      if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
        cssBoxValue = elem.style[name] || 0;
      }
      // Normalize '', auto, and prepare for extra
      cssBoxValue = parseFloat(cssBoxValue) || 0;
    }
    if (extra === undefined) {
      extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
    }
    var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
    var val = borderBoxValue || cssBoxValue;
    if (extra === CONTENT_INDEX) {
      if (borderBoxValueOrIsBorderBox) {
        return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
      }
      return cssBoxValue;
    } else if (borderBoxValueOrIsBorderBox) {
      if (extra === BORDER_INDEX) {
        return val;
      }
      return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
    }
    return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
  }

  var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };

  // fix #119 : https://github.com/kissyteam/kissy/issues/119
  function getWHIgnoreDisplay() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var val = undefined;
    var elem = args[0];
    // in case elem is window
    // elem.offsetWidth === undefined
    if (elem.offsetWidth !== 0) {
      val = getWH.apply(undefined, args);
    } else {
      swap(elem, cssShow, function () {
        val = getWH.apply(undefined, args);
      });
    }
    return val;
  }

  each(['width', 'height'], function (name) {
    var first = name.charAt(0).toUpperCase() + name.slice(1);
    domUtils['outer' + first] = function (el, includeMargin) {
      return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
    };
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

    domUtils[name] = function (elem, v) {
      var val = v;
      if (val !== undefined) {
        if (elem) {
          var computedStyle = getComputedStyleX(elem);
          var isBorderBox = isBorderBoxFn(elem);
          if (isBorderBox) {
            val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
          }
          return css(elem, name, val);
        }
        return undefined;
      }
      return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
    };
  });

  function mix(to, from) {
    for (var i in from) {
      if (from.hasOwnProperty(i)) {
        to[i] = from[i];
      }
    }
    return to;
  }

  var utils = {
    getWindow: function getWindow(node) {
      if (node && node.document && node.setTimeout) {
        return node;
      }
      var doc = node.ownerDocument || node;
      return doc.defaultView || doc.parentWindow;
    },
    offset: function offset(el, value, option) {
      if (typeof value !== 'undefined') {
        setOffset(el, value, option || {});
      } else {
        return getOffset(el);
      }
    },

    isWindow: isWindow,
    each: each,
    css: css,
    clone: function clone(obj) {
      var i = undefined;
      var ret = {};
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret[i] = obj[i];
        }
      }
      var overflow = obj.overflow;
      if (overflow) {
        for (i in obj) {
          if (obj.hasOwnProperty(i)) {
            ret.overflow[i] = obj.overflow[i];
          }
        }
      }
      return ret;
    },

    mix: mix,
    getWindowScrollLeft: function getWindowScrollLeft(w) {
      return getScrollLeft(w);
    },
    getWindowScrollTop: function getWindowScrollTop(w) {
      return getScrollTop(w);
    },
    merge: function merge() {
      var ret = {};

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var i = 0; i < args.length; i++) {
        utils.mix(ret, args[i]);
      }
      return ret;
    },

    viewportWidth: 0,
    viewportHeight: 0
  };

  mix(utils, domUtils);

  /**
   * 得到会导致元素显示不全的祖先元素
   */

  function getOffsetParent(element) {
    // ie 这个也不是完全可行
    /*
     <div style="width: 50px;height: 100px;overflow: hidden">
     <div style="width: 50px;height: 100px;position: relative;" id="d6">
     元素 6 高 100px 宽 50px<br/>
     </div>
     </div>
     */
    // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
    //  In other browsers it only includes elements with position absolute, relative or
    // fixed, not elements with overflow set to auto or scroll.
    //        if (UA.ie && ieMode < 8) {
    //            return element.offsetParent;
    //        }
    // 统一的 offsetParent 方法
    var doc = element.ownerDocument;
    var body = doc.body;
    var parent = undefined;
    var positionStyle = utils.css(element, 'position');
    var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

    if (!skipStatic) {
      return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
    }

    for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
      positionStyle = utils.css(parent, 'position');
      if (positionStyle !== 'static') {
        return parent;
      }
    }
    return null;
  }

  function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
    var pos = utils.clone(elFuturePos);
    var size = {
      width: elRegion.width,
      height: elRegion.height
    };

    if (overflow.adjustX && pos.left < visibleRect.left) {
      pos.left = visibleRect.left;
    }

    // Left edge inside and right edge outside viewport, try to resize it.
    if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
      size.width -= pos.left + size.width - visibleRect.right;
    }

    // Right edge outside viewport, try to move it.
    if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
      // 保证左边界和可视区域左边界对齐
      pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
    }

    // Top edge outside viewport, try to move it.
    if (overflow.adjustY && pos.top < visibleRect.top) {
      pos.top = visibleRect.top;
    }

    // Top edge inside and bottom edge outside viewport, try to resize it.
    if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
      size.height -= pos.top + size.height - visibleRect.bottom;
    }

    // Bottom edge outside viewport, try to move it.
    if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
      // 保证上边界和可视区域上边界对齐
      pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
    }

    return utils.mix(pos, size);
  }

  /**
   * 获得元素的显示部分的区域
   */
  function getVisibleRectForElement(element) {
    var visibleRect = {
      left: 0,
      right: Infinity,
      top: 0,
      bottom: Infinity
    };
    var el = getOffsetParent(element);
    var scrollX = undefined;
    var scrollY = undefined;
    var winSize = undefined;
    var doc = element.ownerDocument;
    var win = doc.defaultView || doc.parentWindow;
    var body = doc.body;
    var documentElement = doc.documentElement;

    // Determine the size of the visible rect by climbing the dom accounting for
    // all scrollable containers.
    while (el) {
      // clientWidth is zero for inline block elements in ie.
      if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
      // body may have overflow set on it, yet we still get the entire
      // viewport. In some browsers, el.offsetParent may be
      // document.documentElement, so check for that too.
      el !== body && el !== documentElement && utils.css(el, 'overflow') !== 'visible') {
        var pos = utils.offset(el);
        // add border
        pos.left += el.clientLeft;
        pos.top += el.clientTop;
        visibleRect.top = Math.max(visibleRect.top, pos.top);
        visibleRect.right = Math.min(visibleRect.right,
        // consider area without scrollBar
        pos.left + el.clientWidth);
        visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
        visibleRect.left = Math.max(visibleRect.left, pos.left);
      } else if (el === body || el === documentElement) {
        break;
      }
      el = getOffsetParent(el);
    }

    // Clip by window's viewport.
    scrollX = utils.getWindowScrollLeft(win);
    scrollY = utils.getWindowScrollTop(win);
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    winSize = {
      width: utils.viewportWidth(win),
      height: utils.viewportHeight(win)
    };
    visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
    return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
  }

  function getRegion(node) {
    var offset = undefined;
    var w = undefined;
    var h = undefined;
    if (!utils.isWindow(node) && node.nodeType !== 9) {
      offset = utils.offset(node);
      w = utils.outerWidth(node);
      h = utils.outerHeight(node);
    } else {
      var win = utils.getWindow(node);
      offset = {
        left: utils.getWindowScrollLeft(win),
        top: utils.getWindowScrollTop(win)
      };
      w = utils.viewportWidth(win);
      h = utils.viewportHeight(win);
    }
    offset.width = w;
    offset.height = h;
    return offset;
  }

  /**
  * 获取 node 上的 align 对齐点 相对于页面的坐标
  */

  function getAlignOffset(region, align) {
    var V = align.charAt(0);
    var H = align.charAt(1);
    var w = region.width;
    var h = region.height;
    var x = undefined;
    var y = undefined;

    x = region.left;
    y = region.top;

    if (V === 'c') {
      y += h / 2;
    } else if (V === 'b') {
      y += h;
    }

    if (H === 'c') {
      x += w / 2;
    } else if (H === 'r') {
      x += w;
    }

    return {
      left: x,
      top: y
    };
  }

  function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
    var xy = undefined;
    var diff = undefined;
    var p1 = undefined;
    var p2 = undefined;

    xy = {
      left: elRegion.left,
      top: elRegion.top
    };

    p1 = getAlignOffset(refNodeRegion, points[1]);
    p2 = getAlignOffset(elRegion, points[0]);

    diff = [p2.left - p1.left, p2.top - p1.top];

    return {
      left: xy.left - diff[0] + offset[0] - targetOffset[0],
      top: xy.top - diff[1] + offset[1] - targetOffset[1]
    };
  }

  // http://yiminghe.iteye.com/blog/1124720

  function isFailX(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
  }

  function isFailY(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
  }

  function flip(points, reg, map) {
    var ret = [];
    utils.each(points, function (p) {
      ret.push(p.replace(reg, function (m) {
        return map[m];
      }));
    });
    return ret;
  }

  function flipOffset(offset, index) {
    offset[index] = -offset[index];
    return offset;
  }

  function convertOffset(str, offsetLen) {
    var n = undefined;
    if (/%$/.test(str)) {
      n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
    } else {
      n = parseInt(str, 10);
    }
    return n || 0;
  }

  function normalizeOffset(offset, el) {
    offset[0] = convertOffset(offset[0], el.width);
    offset[1] = convertOffset(offset[1], el.height);
  }

  function domAlign(el, refNode, align) {
    var points = align.points;
    var offset = align.offset || [0, 0];
    var targetOffset = align.targetOffset || [0, 0];
    var overflow = align.overflow;
    var target = align.target || refNode;
    var source = align.source || el;
    offset = [].concat(offset);
    targetOffset = [].concat(targetOffset);
    overflow = overflow || {};
    var newOverflowCfg = {};

    var fail = 0;
    // 当前节点可以被放置的显示区域
    var visibleRect = getVisibleRectForElement(source);
    // 当前节点所占的区域, left/top/width/height
    var elRegion = getRegion(source);
    // 参照节点所占的区域, left/top/width/height
    var refNodeRegion = getRegion(target);
    // 将 offset 转换成数值，支持百分比
    normalizeOffset(offset, elRegion);
    normalizeOffset(targetOffset, refNodeRegion);
    // 当前节点将要被放置的位置
    var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset);
    // 当前节点将要所处的区域
    var newElRegion = utils.merge(elRegion, elFuturePos);

    // 如果可视区域不能完全放置当前节点时允许调整
    if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
      if (overflow.adjustX) {
        // 如果横向不能放下
        if (isFailX(elFuturePos, elRegion, visibleRect)) {
          fail = 1;
          // 对齐位置反下
          points = flip(points, /[lr]/ig, {
            l: 'r',
            r: 'l'
          });
          // 偏移量也反下
          offset = flipOffset(offset, 0);
          targetOffset = flipOffset(targetOffset, 0);
        }
      }

      if (overflow.adjustY) {
        // 如果纵向不能放下
        if (isFailY(elFuturePos, elRegion, visibleRect)) {
          fail = 1;
          // 对齐位置反下
          points = flip(points, /[tb]/ig, {
            t: 'b',
            b: 't'
          });
          // 偏移量也反下
          offset = flipOffset(offset, 1);
          targetOffset = flipOffset(targetOffset, 1);
        }
      }

      // 如果失败，重新计算当前节点将要被放置的位置
      if (fail) {
        elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset);
        utils.mix(newElRegion, elFuturePos);
      }

      // 检查反下后的位置是否可以放下了
      // 如果仍然放不下只有指定了可以调整当前方向才调整
      newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

      newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

      // 确实要调整，甚至可能会调整高度宽度
      if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
        newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
      }
    }

    // need judge to in case set fixed with in css on height auto element
    if (newElRegion.width !== elRegion.width) {
      utils.css(source, 'width', source.width() + newElRegion.width - elRegion.width);
    }

    if (newElRegion.height !== elRegion.height) {
      utils.css(source, 'height', source.height() + newElRegion.height - elRegion.height);
    }

    // https://github.com/kissyteam/kissy/issues/190
    // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
    // 相对于屏幕位置没变，而 left/top 变了
    // 例如 <div 'relative'><el absolute></div>
    utils.offset(source, {
      left: newElRegion.left,
      top: newElRegion.top
    }, {
      useCssRight: align.useCssRight,
      useCssBottom: align.useCssBottom
    });

    return {
      points: points,
      offset: offset,
      targetOffset: targetOffset,
      overflow: newOverflowCfg
    };
  }

  domAlign.__getOffsetParent = getOffsetParent;

  domAlign.__getVisibleRectForElement = getVisibleRectForElement;

  RC.domAlign = domAlign;

  /**
   *  2012-04-26 yiminghe@gmail.com
   *   - 优化智能对齐算法
   *   - 慎用 resizeXX
   *
   *  2011-07-13 yiminghe@gmail.com note:
   *   - 增加智能对齐，以及大小调整选项
   **/
})(Smart.RC);
'use strict';

+(function (RC) {
  var EVENT_NAME_MAP = {
    transitionend: {
      transition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'mozTransitionEnd',
      OTransition: 'oTransitionEnd',
      msTransition: 'MSTransitionEnd'
    },

    animationend: {
      animation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      OAnimation: 'oAnimationEnd',
      msAnimation: 'MSAnimationEnd'
    }
  };

  var endEvents = [];

  function detectEvents() {
    var testEl = document.createElement('div');
    var style = testEl.style;

    if (!('AnimationEvent' in window)) {
      delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
      delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (var baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        var baseEvents = EVENT_NAME_MAP[baseEventName];
        for (var styleName in baseEvents) {
          if (styleName in style) {
            endEvents.push(baseEvents[styleName]);
            break;
          }
        }
      }
    }
  }

  if (typeof window !== 'undefined') {
    detectEvents();
  }

  function addEventListener(node, eventName, eventListener) {
    node.addEventListener(eventName, eventListener, false);
  }

  function removeEventListener(node, eventName, eventListener) {
    node.removeEventListener(eventName, eventListener, false);
  }

  var Event = {
    addEndEventListener: function addEndEventListener(node, eventListener) {
      if (endEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return;
      }
      endEvents.forEach(function (endEvent) {
        addEventListener(node, endEvent, eventListener);
      });
    },

    endEvents: endEvents,

    removeEndEventListener: function removeEndEventListener(node, eventListener) {
      if (endEvents.length === 0) {
        return;
      }
      endEvents.forEach(function (endEvent) {
        removeEventListener(node, endEvent, eventListener);
      });
    }
  };

  var SPACE = ' ';
  var RE_CLASS = /[\n\t\r]/g;

  function norm(elemClass) {
    return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
  }

  var Css = {
    addClass: function addClass(elem, className) {
      elem.className += ' ' + className;
    },
    removeClass: function removeClass(elem, n) {
      var elemClass = elem.className.trim();
      var className = norm(elemClass);
      var needle = n.trim();
      needle = SPACE + needle + SPACE;
      // 一个 cls 有可能多次出现：'link link2 link link3 link'
      while (className.indexOf(needle) >= 0) {
        className = className.replace(needle, SPACE);
      }
      elem.className = className.trim();
    }
  };

  var isCssAnimationSupported = Event.endEvents.length !== 0;

  function getDuration(node, name) {
    var style = window.getComputedStyle(node);
    var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
    var ret = '';
    for (var i = 0; i < prefixes.length; i++) {
      ret = style.getPropertyValue(prefixes[i] + name);
      if (ret) {
        break;
      }
    }
    return ret;
  }

  function fixBrowserByTimeout(node) {
    if (isCssAnimationSupported) {
      var transitionDuration = parseFloat(getDuration(node, 'transition-duration')) || 0;
      var animationDuration = parseFloat(getDuration(node, 'animation-duration')) || 0;
      var time = Math.max(transitionDuration, animationDuration);
      // sometimes, browser bug
      node.rcEndAnimTimeout = setTimeout(function () {
        node.rcEndAnimTimeout = null;
        if (node.rcEndListener) {
          node.rcEndListener();
        }
      }, time * 1000 + 200);
    }
  }

  function clearBrowserBugTimeout(node) {
    if (node.rcEndAnimTimeout) {
      clearTimeout(node.rcEndAnimTimeout);
      node.rcEndAnimTimeout = null;
    }
  }

  var cssAnimation = function cssAnimation(node, transitionName, callback) {
    var className = transitionName;
    var activeClassName = className + '-active';

    if (node.rcEndListener) {
      node.rcEndListener();
    }

    node.rcEndListener = function (e) {
      if (e && e.target !== node) {
        return;
      }

      if (node.rcAnimTimeout) {
        clearTimeout(node.rcAnimTimeout);
        node.rcAnimTimeout = null;
      }

      clearBrowserBugTimeout(node);

      Css.removeClass(node, className);
      Css.removeClass(node, activeClassName);

      Event.removeEndEventListener(node, node.rcEndListener);
      node.rcEndListener = null;

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (callback) {
        callback();
      }
    };

    Event.addEndEventListener(node, node.rcEndListener);

    Css.addClass(node, className);

    node.rcAnimTimeout = setTimeout(function () {
      node.rcAnimTimeout = null;
      Css.addClass(node, activeClassName);
      fixBrowserByTimeout(node);
    }, 0);

    return {
      stop: function stop() {
        if (node.rcEndListener) {
          node.rcEndListener();
        }
      }
    };
  };

  cssAnimation.style = function (node, style, callback) {
    if (node.rcEndListener) {
      node.rcEndListener();
    }

    node.rcEndListener = function (e) {
      if (e && e.target !== node) {
        return;
      }

      if (node.rcAnimTimeout) {
        clearTimeout(node.rcAnimTimeout);
        node.rcAnimTimeout = null;
      }

      clearBrowserBugTimeout(node);

      Event.removeEndEventListener(node, node.rcEndListener);
      node.rcEndListener = null;

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (callback) {
        callback();
      }
    };

    Event.addEndEventListener(node, node.rcEndListener);

    node.rcAnimTimeout = setTimeout(function () {
      for (var s in style) {
        if (style.hasOwnProperty(s)) {
          node.style[s] = style[s];
        }
      }
      node.rcAnimTimeout = null;
      fixBrowserByTimeout(node);
    }, 0);
  };

  cssAnimation.setTransition = function (node, p, value) {
    var property = p;
    var v = value;
    if (value === undefined) {
      v = property;
      property = '';
    }
    property = property || '';
    ['Webkit', 'Moz', 'O',
    // ms is special .... !
    'ms'].forEach(function (prefix) {
      node.style[prefix + 'Transition' + property] = v;
    });
  };

  cssAnimation.addClass = Css.addClass;
  cssAnimation.removeClass = Css.removeClass;
  cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

  RC.cssAnimation = cssAnimation;
  RC.cssAnimate = cssAnimation;
})(Smart.RC);
'use strict';

// export this package's api
+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Util = RC.Util;
	var Dom = Util.Dom;
	var isWindow = Util.isWindow;
	var align = RC.domAlign;
	var _React = React;
	var PropTypes = _React.PropTypes;

	function buffer(fn, ms) {
		var timer = undefined;
		return function bufferFn() {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(fn, ms);
		};
	}

	var Align = React.createClass({
		displayName: 'Align',

		propTypes: {
			childrenProps: PropTypes.object,
			align: PropTypes.object.isRequired,
			target: PropTypes.func,
			onAlign: PropTypes.func,
			monitorBufferTime: PropTypes.number,
			monitorWindowResize: PropTypes.bool,
			disabled: PropTypes.bool,
			children: PropTypes.any
		},

		getDefaultProps: function getDefaultProps() {
			return {
				target: function target() {
					return window;
				},
				onAlign: function onAlign() {},

				monitorBufferTime: 50,
				monitorWindowResize: false,
				disabled: false
			};
		},
		componentDidMount: function componentDidMount() {
			var props = this.props;
			// if parent ref not attached .... use document.getElementById
			if (!props.disabled) {
				var source = ReactDOM.findDOMNode(this);
				props.onAlign(source, align(source, props.target(), props.align));
				if (props.monitorWindowResize) {
					this.startMonitorWindowResize();
				}
			}
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var reAlign = false;
			var props = this.props;
			var currentTarget = undefined;

			if (!props.disabled) {
				if (prevProps.disabled || prevProps.align !== props.align) {
					reAlign = true;
					currentTarget = props.target();
				} else {
					var lastTarget = prevProps.target();
					currentTarget = props.target();
					if (isWindow(lastTarget) && isWindow(currentTarget)) {
						reAlign = false;
					} else if (lastTarget !== currentTarget) {
						reAlign = true;
					}
				}
			}

			if (reAlign) {
				var source = ReactDOM.findDOMNode(this);
				props.onAlign(source, align(source, currentTarget, props.align));
			}

			if (props.monitorWindowResize && !props.disabled) {
				this.startMonitorWindowResize();
			} else {
				this.stopMonitorWindowResize();
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			this.stopMonitorWindowResize();
		},
		onWindowResize: function onWindowResize() {
			var props = this.props;
			if (!props.disabled) {
				var source = ReactDOM.findDOMNode(this);
				props.onAlign(source, align(source, props.target(), props.align));
			}
		},
		startMonitorWindowResize: function startMonitorWindowResize() {
			if (!this.resizeHandler) {
				this.resizeHandler = Dom.addEventListener(window, 'resize', buffer(this.onWindowResize, this.props.monitorBufferTime));
			}
		},
		stopMonitorWindowResize: function stopMonitorWindowResize() {
			if (this.resizeHandler) {
				this.resizeHandler.remove();
				this.resizeHandler = null;
			}
		},
		render: function render() {
			var _props = this.props;
			var childrenProps = _props.childrenProps;
			var children = _props.children;

			var child = React.Children.only(children);
			if (childrenProps) {
				var newProps = {};
				for (var prop in childrenProps) {
					if (childrenProps.hasOwnProperty(prop)) {
						newProps[prop] = this.props[childrenProps[prop]];
					}
				}
				return React.cloneElement(child, newProps);
			}
			return child;
		}
	});
	RC.Align = Align;
})(Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var cssAnimate = RC.cssAnimate;
	var isCssAnimationSupported = cssAnimate.isCssAnimationSupported;

	var animUtil = {
		isAppearSupported: function isAppearSupported(props) {
			return props.transitionName && props.transitionAppear || props.animation.appear;
		},
		isEnterSupported: function isEnterSupported(props) {
			return props.transitionName && props.transitionEnter || props.animation.enter;
		},
		isLeaveSupported: function isLeaveSupported(props) {
			return props.transitionName && props.transitionLeave || props.animation.leave;
		},
		allowAppearCallback: function allowAppearCallback(props) {
			return props.transitionAppear || props.animation.appear;
		},
		allowEnterCallback: function allowEnterCallback(props) {
			return props.transitionEnter || props.animation.enter;
		},
		allowLeaveCallback: function allowLeaveCallback(props) {
			return props.transitionLeave || props.animation.leave;
		}
	};

	function toArrayChildren(children) {
		var ret = [];
		React.Children.forEach(children, function (child) {
			ret.push(child);
		});
		return ret;
	}

	function findChildInChildrenByKey(children, key) {
		var ret = null;
		if (children) {
			children.forEach(function (child) {
				if (ret) {
					return;
				}
				if (child.key === key) {
					ret = child;
				}
			});
		}
		return ret;
	}

	function findShownChildInChildrenByKey(children, key, showProp) {
		var ret = null;
		if (children) {
			children.forEach(function (child) {
				if (child.key === key && child.props[showProp]) {
					if (ret) {
						throw new Error('two child with same key for <rc-animate> children');
					}
					ret = child;
				}
			});
		}
		return ret;
	}

	function findHiddenChildInChildrenByKey(children, key, showProp) {
		var found = 0;
		if (children) {
			children.forEach(function (child) {
				if (found) {
					return;
				}
				found = child.key === key && !child.props[showProp];
			});
		}
		return found;
	}

	function isSameChildren(c1, c2, showProp) {
		var same = c1.length === c2.length;
		if (same) {
			c1.forEach(function (child, index) {
				var child2 = c2[index];
				if (child.key !== child2.key) {
					same = false;
				} else if (showProp && child.props[showProp] !== child2.props[showProp]) {
					same = false;
				}
			});
		}
		return same;
	}

	function mergeChildren(prev, next) {
		var ret = [];

		// For each key of `next`, the list of keys to insert before that key in
		// the combined list
		var nextChildrenPending = {};
		var pendingChildren = [];
		prev.forEach(function (child) {
			if (findChildInChildrenByKey(next, child.key)) {
				if (pendingChildren.length) {
					nextChildrenPending[child.key] = pendingChildren;
					pendingChildren = [];
				}
			} else {
				pendingChildren.push(child);
			}
		});

		next.forEach(function (child) {
			if (nextChildrenPending.hasOwnProperty(child.key)) {
				ret = ret.concat(nextChildrenPending[child.key]);
			}
			ret.push(child);
		});

		ret = ret.concat(pendingChildren);

		return ret;
	}

	var transitionMap = {
		enter: 'transitionEnter',
		appear: 'transitionAppear',
		leave: 'transitionLeave'
	};

	var AnimateChild = React.createClass({
		displayName: 'AnimateChild',

		propTypes: {
			children: React.PropTypes.any
		},

		componentWillUnmount: function componentWillUnmount() {
			this.stop();
		},
		componentWillEnter: function componentWillEnter(done) {
			if (animUtil.isEnterSupported(this.props)) {
				this.transition('enter', done);
			} else {
				done();
			}
		},
		componentWillAppear: function componentWillAppear(done) {
			if (animUtil.isAppearSupported(this.props)) {
				this.transition('appear', done);
			} else {
				done();
			}
		},
		componentWillLeave: function componentWillLeave(done) {
			if (animUtil.isLeaveSupported(this.props)) {
				this.transition('leave', done);
			} else {
				done();
			}
		},
		transition: function transition(animationType, finishCallback) {
			var _this = this;

			var node = ReactDOM.findDOMNode(this);
			var props = this.props;
			var transitionName = props.transitionName;
			this.stop();
			var end = function end() {
				_this.stopper = null;
				finishCallback();
			};
			if ((isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
				this.stopper = cssAnimate(node, transitionName + '-' + animationType, end);
			} else {
				this.stopper = props.animation[animationType](node, end);
			}
		},
		stop: function stop() {
			var stopper = this.stopper;
			if (stopper) {
				this.stopper = null;
				stopper.stop();
			}
		},
		render: function render() {
			return this.props.children;
		}
	});

	var defaultKey = 'rc_animate_' + Date.now();

	function getChildrenFromProps(props) {
		var children = props.children;
		if (React.isValidElement(children)) {
			if (!children.key) {
				return React.cloneElement(children, {
					key: defaultKey
				});
			}
		}
		return children;
	}

	var Animate = React.createClass({
		displayName: 'Animate',

		propTypes: {
			component: React.PropTypes.any,
			animation: React.PropTypes.object,
			transitionName: React.PropTypes.string,
			transitionEnter: React.PropTypes.bool,
			transitionAppear: React.PropTypes.bool,
			exclusive: React.PropTypes.bool,
			transitionLeave: React.PropTypes.bool,
			onEnd: React.PropTypes.func,
			onEnter: React.PropTypes.func,
			onLeave: React.PropTypes.func,
			onAppear: React.PropTypes.func,
			showProp: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				animation: {},
				component: 'span',
				transitionEnter: true,
				transitionLeave: true,
				transitionAppear: false,
				onEnd: noop,
				onEnter: noop,
				onLeave: noop,
				onAppear: noop
			};
		},
		getInitialState: function getInitialState() {
			this.currentlyAnimatingKeys = {};
			this.keysToEnter = [];
			this.keysToLeave = [];
			return {
				children: toArrayChildren(getChildrenFromProps(this.props))
			};
		},
		componentDidMount: function componentDidMount() {
			var _this2 = this;

			var showProp = this.props.showProp;
			var children = this.state.children;
			if (showProp) {
				children = children.filter(function (child) {
					return !!child.props[showProp];
				});
			}
			children.forEach(function (child) {
				_this2.performAppear(child.key);
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var _this3 = this;

			this.nextProps = nextProps;
			var nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
			var props = this.props;
			// exclusive needs immediate response
			if (props.exclusive) {
				Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
					_this3.stop(key);
				});
			}
			var showProp = props.showProp;
			var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
			// last props children if exclusive
			var currentChildren = props.exclusive ? toArrayChildren(getChildrenFromProps(props)) : this.state.children;
			// in case destroy in showProp mode
			var newChildren = [];
			if (showProp) {
				currentChildren.forEach(function (currentChild) {
					var nextChild = findChildInChildrenByKey(nextChildren, currentChild.key);
					var newChild = undefined;
					if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
						newChild = React.cloneElement(nextChild || currentChild, _defineProperty({}, showProp, true));
					} else {
						newChild = nextChild;
					}
					if (newChild) {
						newChildren.push(newChild);
					}
				});
				nextChildren.forEach(function (nextChild) {
					if (!findChildInChildrenByKey(currentChildren, nextChild.key)) {
						newChildren.push(nextChild);
					}
				});
			} else {
				newChildren = mergeChildren(currentChildren, nextChildren);
			}

			// need render to avoid update
			this.setState({
				children: newChildren
			});

			nextChildren.forEach(function (child) {
				var key = child.key;
				if (currentlyAnimatingKeys[key]) {
					return;
				}
				var hasPrev = findChildInChildrenByKey(currentChildren, key);
				if (showProp) {
					var showInNext = child.props[showProp];
					if (hasPrev) {
						var showInNow = findShownChildInChildrenByKey(currentChildren, key, showProp);
						if (!showInNow && showInNext) {
							_this3.keysToEnter.push(key);
						}
					} else if (showInNext) {
						_this3.keysToEnter.push(key);
					}
				} else if (!hasPrev) {
					_this3.keysToEnter.push(key);
				}
			});

			currentChildren.forEach(function (child) {
				var key = child.key;
				if (currentlyAnimatingKeys[key]) {
					return;
				}
				var hasNext = findChildInChildrenByKey(nextChildren, key);
				if (showProp) {
					var showInNow = child.props[showProp];
					if (hasNext) {
						var showInNext = findShownChildInChildrenByKey(nextChildren, key, showProp);
						if (!showInNext && showInNow) {
							_this3.keysToLeave.push(key);
						}
					} else if (showInNow) {
						_this3.keysToLeave.push(key);
					}
				} else if (!hasNext) {
					_this3.keysToLeave.push(key);
				}
			});
		},
		componentDidUpdate: function componentDidUpdate() {
			if (this.isMounted()) {
				var keysToEnter = this.keysToEnter;
				this.keysToEnter = [];
				keysToEnter.forEach(this.performEnter);
				var keysToLeave = this.keysToLeave;
				this.keysToLeave = [];
				keysToLeave.forEach(this.performLeave);
			}
		},
		performEnter: function performEnter(key) {
			// may already remove by exclusive
			if (this.refs[key]) {
				this.currentlyAnimatingKeys[key] = true;
				this.refs[key].componentWillEnter(this.handleDoneAdding.bind(this, key, 'enter'));
			}
		},
		performAppear: function performAppear(key) {
			if (this.refs[key]) {
				this.currentlyAnimatingKeys[key] = true;
				this.refs[key].componentWillAppear(this.handleDoneAdding.bind(this, key, 'appear'));
			}
		},
		handleDoneAdding: function handleDoneAdding(key, type) {
			var props = this.props;
			delete this.currentlyAnimatingKeys[key];
			// if update on exclusive mode, skip check
			if (props.exclusive && props !== this.nextProps) {
				return;
			}
			var currentChildren = toArrayChildren(getChildrenFromProps(props));
			if (!this.isValidChildByKey(currentChildren, key)) {
				// exclusive will not need this
				this.performLeave(key);
			} else {
				if (type === 'appear') {
					if (animUtil.allowAppearCallback(props)) {
						props.onAppear(key);
						props.onEnd(key, true);
					}
				} else {
					if (animUtil.allowEnterCallback(props)) {
						props.onEnter(key);
						props.onEnd(key, true);
					}
				}
			}
		},
		performLeave: function performLeave(key) {
			// may already remove by exclusive
			if (this.refs[key]) {
				this.currentlyAnimatingKeys[key] = true;
				this.refs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
			}
		},
		handleDoneLeaving: function handleDoneLeaving(key) {
			var props = this.props;
			delete this.currentlyAnimatingKeys[key];
			// if update on exclusive mode, skip check
			if (props.exclusive && props !== this.nextProps) {
				return;
			}
			var currentChildren = toArrayChildren(getChildrenFromProps(props));
			// in case state change is too fast
			if (this.isValidChildByKey(currentChildren, key)) {
				this.performEnter(key);
			} else {
				if (animUtil.allowLeaveCallback(props)) {
					props.onLeave(key);
					props.onEnd(key, false);
				}
				if (this.isMounted() && !isSameChildren(this.state.children, currentChildren, props.showProp)) {
					this.setState({
						children: currentChildren
					});
				}
			}
		},
		isValidChildByKey: function isValidChildByKey(currentChildren, key) {
			var showProp = this.props.showProp;
			if (showProp) {
				return findShownChildInChildrenByKey(currentChildren, key, showProp);
			}
			return findChildInChildrenByKey(currentChildren, key);
		},
		stop: function stop(key) {
			delete this.currentlyAnimatingKeys[key];
			var component = this.refs[key];
			if (component) {
				component.stop();
			}
		},
		render: function render() {
			var props = this.props;
			this.nextProps = props;
			var stateChildren = this.state.children;
			var children = null;
			if (stateChildren) {
				children = stateChildren.map(function (child) {
					if (child === null) {
						return child;
					}
					if (!child.key) {
						throw new Error('must set key for <rc-animate> children');
					}
					return React.createElement(
						AnimateChild,
						{
							key: child.key,
							ref: child.key,
							animation: props.animation,
							transitionName: props.transitionName,
							transitionEnter: props.transitionEnter,
							transitionAppear: props.transitionAppear,
							transitionLeave: props.transitionLeave },
						child
					);
				});
			}
			var Component = props.component;
			if (Component) {
				return React.createElement(
					Component,
					this.props,
					children
				);
			}
			return children[0] || null;
		}
	});

	RC.Animate = Animate;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (RC) {
  var PropTypes = React.PropTypes;
  var findDOMNode = ReactDOM.findDOMNode;
  var _ref = _;
  var noop = _ref.noop;
  var assign = _ref.assign;
  var Util = RC.Util;
  var Align = RC.Align;
  var Animate = RC.Animate;
  var Dom = Util.Dom;
  var createChainedFunction = Util.createChainedFunction;

  function isPointsEq(a1, a2) {
    return a1[0] === a2[0] && a1[1] === a2[1];
  }

  function getAlignFromPlacement(builtinPlacements, placementStr, align) {
    var baseAlign = builtinPlacements[placementStr] || {};
    return _extends({}, baseAlign, align);
  }

  function _getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
    var points = align.points;
    for (var placement in builtinPlacements) {
      if (builtinPlacements.hasOwnProperty(placement)) {
        if (isPointsEq(builtinPlacements[placement].points, points)) {
          return prefixCls + '-placement-' + placement;
        }
      }
    }
    return '';
  }

  var PopupInner = React.createClass({
    displayName: 'PopupInner',

    propTypes: {
      hiddenClassName: PropTypes.string,
      className: PropTypes.string,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      children: PropTypes.any
    },
    render: function render() {
      var props = this.props;
      var className = props.className;
      if (!props.visible) {
        className += ' ' + props.hiddenClassName;
      }
      return React.createElement(
        'div',
        { className: className,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          style: props.style },
        props.children
      );
    }
  });

  var Popup = React.createClass({
    displayName: 'Popup',

    propTypes: {
      visible: PropTypes.bool,
      wrap: PropTypes.object,
      style: PropTypes.object,
      getClassNameFromAlign: PropTypes.func,
      onMouseEnter: PropTypes.func,
      className: PropTypes.string,
      onMouseLeave: PropTypes.func
    },

    componentDidMount: function componentDidMount() {
      this.rootNode = this.getPopupDomNode();
    },
    onAlign: function onAlign(popupDomNode, align) {
      var props = this.props;
      var alignClassName = props.getClassNameFromAlign(props.align);
      var currentAlignClassName = props.getClassNameFromAlign(align);
      if (alignClassName !== currentAlignClassName) {
        this.currentAlignClassName = currentAlignClassName;
        popupDomNode.className = this.getClassName(currentAlignClassName);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      return ReactDOM.findDOMNode(this);
    },
    getTarget: function getTarget() {
      return ReactDOM.findDOMNode(this.props.wrap);
    },
    getTransitionName: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    },
    getClassName: function getClassName(currentAlignClassName) {
      var props = this.props;
      var prefixCls = props.prefixCls;

      var className = prefixCls + ' ' + props.className + ' ';
      className += currentAlignClassName;
      return className;
    },
    render: function render() {
      var props = this.props;
      var align = props.align;
      var style = props.style;
      var visible = props.visible;
      var prefixCls = props.prefixCls;
      var destroyPopupOnHide = props.destroyPopupOnHide;

      var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
      var hiddenClassName = prefixCls + '-hidden';
      if (!visible) {
        this.currentAlignClassName = null;
      }
      if (destroyPopupOnHide) {
        return React.createElement(
          Animate,
          { component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName() },
          visible ? React.createElement(
            Align,
            { target: this.getTarget,
              key: 'popup',
              monitorWindowResize: true,
              align: align,
              onAlign: this.onAlign },
            React.createElement(
              PopupInner,
              { className: className,
                visible: true,
                onMouseEnter: props.onMouseEnter,
                onMouseLeave: props.onMouseLeave,
                style: style },
              props.children
            )
          ) : null
        );
      }
      return React.createElement(
        Animate,
        { component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          showProp: 'xVisible' },
        React.createElement(
          Align,
          { target: this.getTarget,
            key: 'popup',
            monitorWindowResize: true,
            xVisible: visible,
            childrenProps: {
              visible: 'xVisible'
            },
            disabled: !visible,
            align: align,
            onAlign: this.onAlign },
          React.createElement(
            PopupInner,
            { className: className,
              hiddenClassName: hiddenClassName,
              onMouseEnter: props.onMouseEnter,
              onMouseLeave: props.onMouseLeave,
              style: style },
            props.children
          )
        )
      );
    }
  });

  function returnEmptyString() {
    return '';
  }

  var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

  var Trigger = React.createClass({
    displayName: 'Trigger',

    propTypes: {
      action: PropTypes.any,
      getPopupClassNameFromAlign: PropTypes.any,
      onPopupVisibleChange: PropTypes.func,
      afterPopupVisibleChange: PropTypes.func,
      popup: PropTypes.node.isRequired,
      popupStyle: PropTypes.object,
      popupClassName: PropTypes.string,
      popupPlacement: PropTypes.string,
      builtinPlacements: PropTypes.object,
      popupTransitionName: PropTypes.string,
      popupAnimation: PropTypes.any,
      mouseEnterDelay: PropTypes.number,
      mouseLeaveDelay: PropTypes.number,
      getPopupContainer: PropTypes.func,
      destroyPopupOnHide: PropTypes.bool,
      popupAlign: PropTypes.object,
      popupVisible: PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-trigger-popup',
        getPopupClassNameFromAlign: returnEmptyString,
        onPopupVisibleChange: noop,
        afterPopupVisibleChange: noop,
        popupClassName: '',
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0.1,
        popupStyle: {},
        destroyPopupOnHide: false,
        popupAlign: {},
        defaultPopupVisible: false,
        action: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var popupVisible = undefined;
      if ('popupVisible' in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }
      return { popupVisible: popupVisible };
    },
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate({}, {
        popupVisible: this.state.popupVisible
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('popupVisible' in nextProps) {
        this.setState({
          popupVisible: !!nextProps.popupVisible
        });
      }
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
      var _this = this;

      var props = this.props;
      var state = this.state;
      if (this.popupRendered) {
        var _ret = (function () {
          var self = _this;
          ReactDOM.unstable_renderSubtreeIntoContainer(_this, _this.getPopupElement(), _this.getPopupContainer(), function renderPopup() {
            if (this.isMounted()) {
              self.popupDomNode = findDOMNode(this);
            } else {
              self.popupDomNode = null;
            }
            if (prevState.popupVisible !== state.popupVisible) {
              props.afterPopupVisibleChange(state.popupVisible);
            }
          });
          if (props.action.indexOf('click') !== -1) {
            if (state.popupVisible) {
              if (!_this.clickOutsideHandler) {
                _this.clickOutsideHandler = Dom.addEventListener(document, 'mousedown', _this.onDocumentClick);
                _this.touchOutsideHandler = Dom.addEventListener(document, 'touchstart', _this.onDocumentClick);
              }
              return {
                v: undefined
              };
            }
          }
          if (_this.clickOutsideHandler) {
            _this.clickOutsideHandler.remove();
            _this.touchOutsideHandler.remove();
            _this.clickOutsideHandler = null;
            _this.touchOutsideHandler = null;
          }
        })();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      var popupContainer = this.popupContainer;
      if (popupContainer) {
        ReactDOM.unmountComponentAtNode(popupContainer);
        if (this.props.getPopupContainer) {
          var mountNode = this.props.getPopupContainer(findDOMNode(this));
          mountNode.removeChild(popupContainer);
        } else {
          document.body.removeChild(popupContainer);
        }
        this.popupContainer = null;
      }
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.touchOutsideHandler.remove();
        this.clickOutsideHandler = null;
        this.touchOutsideHandler = null;
      }
    },
    onMouseEnter: function onMouseEnter() {
      this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
    },
    onMouseLeave: function onMouseLeave() {
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    },
    onFocus: function onFocus() {
      this.focusTime = Date.now();
      this.setPopupVisible(true);
    },
    onMouseDown: function onMouseDown() {
      this.preClickTime = Date.now();
    },
    onTouchStart: function onTouchStart() {
      this.preTouchTime = Date.now();
    },
    onBlur: function onBlur() {
      this.setPopupVisible(false);
    },
    onClick: function onClick(event) {
      // focus will trigger click
      if (this.focusTime) {
        var preTime = undefined;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      event.preventDefault();
      this.setPopupVisible(!this.state.popupVisible);
    },
    onDocumentClick: function onDocumentClick(event) {
      var target = event.target;
      var root = findDOMNode(this);
      var popupNode = this.getPopupDomNode();
      if (!Dom.contains(root, target) && !Dom.contains(popupNode, target)) {
        this.setPopupVisible(false);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      // for test
      return this.popupDomNode;
    },
    getPopupContainer: function getPopupContainer() {
      if (!this.popupContainer) {
        this.popupContainer = document.createElement('div');
        if (this.props.getPopupContainer) {
          var mountNode = this.props.getPopupContainer(findDOMNode(this));
          mountNode.appendChild(this.popupContainer);
        } else {
          document.body.appendChild(this.popupContainer);
        }
      }
      return this.popupContainer;
    },
    getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
      var className = [];
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var builtinPlacements = props.builtinPlacements;
      var prefixCls = props.prefixCls;

      if (popupPlacement && builtinPlacements) {
        className.push(_getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
      }
      if (props.getPopupClassNameFromAlign) {
        className.push(props.getPopupClassNameFromAlign(align));
      }
      return className.join(' ');
    },
    getPopupAlign: function getPopupAlign() {
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var popupAlign = props.popupAlign;
      var builtinPlacements = props.builtinPlacements;

      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getPopupElement: function getPopupElement() {
      var props = this.props;
      var state = this.state;
      var mouseProps = {};
      if (props.action.indexOf('hover') !== -1) {
        mouseProps.onMouseEnter = this.onMouseEnter;
        mouseProps.onMouseLeave = this.onMouseLeave;
      }
      return React.createElement(
        Popup,
        _extends({ prefixCls: props.prefixCls,
          destroyPopupOnHide: props.destroyPopupOnHide,
          visible: state.popupVisible,
          className: props.popupClassName,
          action: props.action,
          align: this.getPopupAlign(),
          animation: props.popupAnimation,
          getClassNameFromAlign: this.getPopupClassNameFromAlign
        }, mouseProps, {
          wrap: this,
          style: props.popupStyle,
          transitionName: props.popupTransitionName }),
        props.popup
      );
    },
    setPopupVisible: function setPopupVisible(popupVisible) {
      if (this.state.popupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({
            popupVisible: popupVisible
          });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }
    },
    delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
      var _this2 = this;

      var delay = delayS * 1000;
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (delay) {
        this.delayTimer = setTimeout(function () {
          _this2.setPopupVisible(visible);
          _this2.delayTimer = null;
        }, delay);
      } else {
        this.setPopupVisible(visible);
      }
    },
    render: function render() {
      this.popupRendered = this.popupRendered || this.state.popupVisible;
      var props = this.props;
      var children = props.children;
      var child = React.Children.only(children);
      var childProps = child.props || {};
      var newChildProps = {};
      var trigger = props.action;
      if (trigger.indexOf('click') !== -1) {
        newChildProps.onClick = createChainedFunction(this.onClick, childProps.onClick);
        newChildProps.onMouseDown = createChainedFunction(this.onMouseDown, childProps.onMouseDown);
        newChildProps.onTouchStart = createChainedFunction(this.onTouchStart, childProps.onTouchStart);
      }
      if (trigger.indexOf('hover') !== -1) {
        newChildProps.onMouseEnter = createChainedFunction(this.onMouseEnter, childProps.onMouseEnter);
        newChildProps.onMouseLeave = createChainedFunction(this.onMouseLeave, childProps.onMouseLeave);
      }
      if (trigger.indexOf('focus') !== -1) {
        newChildProps.onFocus = createChainedFunction(this.onFocus, childProps.onFocus);
        newChildProps.onBlur = createChainedFunction(this.onBlur, childProps.onBlur);
      }

      ALL_HANDLERS.forEach(function (handler) {
        var newFn = undefined;
        if (props[handler] && newChildProps[handler]) {
          newFn = createChainedFunction(props[handler], newChildProps[handler]);
        } else {
          newFn = props[handler] || newChildProps[handler];
        }
        if (newFn) {
          newChildProps[handler] = newFn;
        }
      });

      return React.cloneElement(child, newChildProps);
    }
  });

  RC.Trigger = Trigger;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var Animate = RC.Animate;
	var Util = RC.Util;
	var createChainedFunction = Util.createChainedFunction;
	var getUuid = Util.getUuid;

	var Notice = React.createClass({
		displayName: 'Notice',

		propTypes: {
			duration: React.PropTypes.number,
			onClose: React.PropTypes.func,
			children: React.PropTypes.any
		},

		getDefaultProps: function getDefaultProps() {
			return {
				onEnd: function onEnd() {},

				duration: 1.5,
				style: {
					right: '50%'
				}
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			this.clearCloseTimer();
			if (this.props.duration) {
				this.closeTimer = setTimeout(function () {
					_this.close();
				}, this.props.duration * 1000);
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			this.componentDidMount();
		},
		componentWillUnmount: function componentWillUnmount() {
			this.clearCloseTimer();
		},
		clearCloseTimer: function clearCloseTimer() {
			if (this.closeTimer) {
				clearTimeout(this.closeTimer);
				this.closeTimer = null;
			}
		},
		close: function close() {
			this.clearCloseTimer();
			this.props.onClose();
		},
		render: function render() {
			var _className;

			var props = this.props;
			var componentClass = props.prefixCls + '-notice';
			var className = (_className = {}, _defineProperty(_className, '' + componentClass, 1), _defineProperty(_className, componentClass + '-closable', props.closable), _defineProperty(_className, props.className, !!props.className), _className);
			return React.createElement(
				'div',
				{ className: classNames(className), style: props.style },
				React.createElement(
					'div',
					{ className: componentClass + '-content' },
					this.props.children
				),
				props.closable ? React.createElement(
					'a',
					{ tabIndex: '0', onClick: this.close, className: componentClass + '-close' },
					React.createElement('span', { className: componentClass + '-close-x' })
				) : null
			);
		}
	});

	var Notification = React.createClass({
		displayName: 'Notification',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-notification',
				animation: 'fade',
				style: {
					'top': 65,
					left: '50%'
				}
			};
		},
		getInitialState: function getInitialState() {
			return {
				notices: []
			};
		},
		getTransitionName: function getTransitionName() {
			var props = this.props;
			var transitionName = props.transitionName;
			if (!transitionName && props.animation) {
				transitionName = props.prefixCls + '-' + props.animation;
			}
			return transitionName;
		},
		add: function add(notice) {
			var key = notice.key = notice.key || getUuid();
			var notices = this.state.notices;
			if (!notices.filter(function (v) {
				return v.key === key;
			}).length) {
				this.setState({
					notices: notices.concat(notice)
				});
			}
		},
		remove: function remove(key) {
			var notices = this.state.notices.filter(function (notice) {
				return notice.key !== key;
			});
			this.setState({
				notices: notices
			});
		},
		render: function render() {
			var _this2 = this,
			    _className2;

			var props = this.props;
			var noticeNodes = this.state.notices.map(function (notice) {
				var onClose = createChainedFunction(_this2.remove.bind(_this2, notice.key), notice.onClose);
				return React.createElement(
					Notice,
					_extends({ prefixCls: props.prefixCls }, notice, { onClose: onClose }),
					notice.content
				);
			});
			var className = (_className2 = {}, _defineProperty(_className2, props.prefixCls, 1), _defineProperty(_className2, props.className, !!props.className), _className2);
			return React.createElement(
				'div',
				{ className: classnames(className), style: props.style },
				React.createElement(
					Animate,
					{ transitionName: this.getTransitionName() },
					noticeNodes
				)
			);
		}
	});

	Notification.newInstance = function newNotificationInstance(properties) {
		var props = properties || {};
		var div = document.createElement('div');
		document.body.appendChild(div);
		var notification = ReactDOM.render(React.createElement(Notification, props), div);
		return {
			notice: function notice(noticeProps) {
				notification.add(noticeProps);
			},
			removeNotice: function removeNotice(key) {
				notification.remove(key);
			},

			component: notification,
			destroy: function destroy() {
				ReactDOM.unmountComponentAtNode(div);
				document.body.removeChild(div);
			}
		};
	};

	RC.Notification = Notification;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var Checkbox = (function (_React$Component) {
		_inherits(Checkbox, _React$Component);

		function Checkbox(props) {
			_classCallCheck(this, Checkbox);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));

			_this.handleChange = _this.handleChange.bind(_this);
			var checked = false;
			if ('checked' in props) {
				checked = props.checked;
			} else {
				checked = props.defaultChecked;
			}
			_this.state = { checked: checked };
			return _this;
		}

		_createClass(Checkbox, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('checked' in nextProps) {
					this.setState({
						checked: nextProps.checked
					});
				}
			}
		}, {
			key: 'handleChange',
			value: function handleChange(e) {
				var checked = e.target.checked;
				if (!('checked' in this.props)) {
					this.setState({
						checked: checked ? 1 : 0
					});
				}
				this.props.onChange(e, this.state.checked);
			}
		}, {
			key: 'render',
			value: function render() {
				var _classnames;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var checked = this.state.checked;
				if (typeof checked === 'boolean') {
					checked = checked ? 1 : 0;
				}
				var className = classnames((_classnames = {}, _defineProperty(_classnames, props.className, !!props.className), _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, prefixCls + '-checked', checked), _defineProperty(_classnames, prefixCls + '-checked-' + checked, !!checked), _defineProperty(_classnames, prefixCls + '-disabled', props.disabled), _classnames));
				return React.createElement(
					'span',
					{ className: className,
						style: props.style },
					React.createElement('span', { className: prefixCls + '-inner' }),
					React.createElement('input', _extends({}, props, {
						defaultChecked: !!props.defaultChecked,
						className: prefixCls + '-input',
						checked: !!checked,
						onChange: this.handleChange
					}))
				);
			}
		}]);

		return Checkbox;
	})(React.Component);

	Checkbox.propTypes = {
		prefixCls: React.PropTypes.string,
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		className: React.PropTypes.string,
		defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		onChange: React.PropTypes.func
	};

	Checkbox.defaultProps = {
		prefixCls: 'rc-checkbox',
		style: {},
		type: 'checkbox',
		className: '',
		defaultChecked: 0,
		onChange: function onChange() {}
	};

	RC.Checkbox = Checkbox;
})(Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var classNames = RC.classNames;
	var _ref = _;
	var noop = _ref.noop;

	function preventDefault(e) {
		e.preventDefault();
	}

	var InputNumber = React.createClass({
		displayName: 'InputNumber',

		propTypes: {
			onChange: React.PropTypes.func,
			step: React.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-input-number',
				max: Infinity,
				min: -Infinity,
				step: 1,
				style: {},
				defaultValue: '',
				onChange: noop
			};
		},
		getInitialState: function getInitialState() {
			var value = undefined;
			var props = this.props;
			if ('value' in props) {
				value = props.value;
			} else {
				value = props.defaultValue;
			}
			value = this.toPrecisionAsStep(value);
			return {
				inputValue: value,
				value: value,
				focused: props.autoFocus
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = this.toPrecisionAsStep(nextProps.value);
				this.setState({
					inputValue: value,
					value: value
				});
			}
		},
		onChange: function onChange(event) {
			this.setInputValue(event.target.value.trim());
		},
		onKeyDown: function onKeyDown(e) {
			if (e.keyCode === 38) {
				this.up(e);
			} else if (e.keyCode === 40) {
				this.down(e);
			}
		},
		onFocus: function onFocus() {
			this.setState({
				focused: true
			});
		},
		onBlur: function onBlur(event) {
			var props = this.props;
			var val = event.target.value.trim();
			this.setState({
				focused: false
			});
			if (val === '') {
				val = '';
			} else if (!isNaN(val)) {
				val = Number(val);
				if (val < props.min) {
					val = props.min;
				}
				if (val > props.max) {
					val = props.max;
				}
			} else {
				val = this.state.value;
			}
			this.setValue(val);
		},
		setValue: function setValue(v) {
			if (!('value' in this.props)) {
				this.setState({
					value: v,
					inputValue: v
				});
			}
			this.props.onChange(v);
		},
		setInputValue: function setInputValue(v) {
			this.setState({
				inputValue: v
			});
		},
		getPrecision: function getPrecision() {
			var props = this.props;
			var stepString = props.step.toString();
			if (stepString.indexOf('e-') >= 0) {
				return parseInt(stepString.slice(stepString.indexOf('-e')), 10);
			}
			var precision = 0;
			if (stepString.indexOf('.') >= 0) {
				precision = stepString.length - stepString.indexOf('.') - 1;
			}
			return precision;
		},
		getPrecisionFactor: function getPrecisionFactor() {
			var precision = this.getPrecision();
			return Math.pow(10, precision);
		},
		toPrecisionAsStep: function toPrecisionAsStep(num) {
			if (isNaN(num) || num === '') {
				return num;
			}
			var precision = this.getPrecision();
			return Number(Number(num).toFixed(precision));
		},
		upStep: function upStep(val) {
			var stepNum = this.props.step;
			var precisionFactor = this.getPrecisionFactor();
			return (precisionFactor * val + precisionFactor * stepNum) / precisionFactor;
		},
		downStep: function downStep(val) {
			var stepNum = this.props.step;
			var precisionFactor = this.getPrecisionFactor();
			return (precisionFactor * val - precisionFactor * stepNum) / precisionFactor;
		},
		step: function step(type, e) {
			if (e) {
				e.preventDefault();
			}
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var value = this.state.value;
			if (isNaN(value)) {
				return;
			}
			var val = this[type + 'Step'](value);
			if (val > props.max || val < props.min) {
				return;
			}
			this.setValue(val);
			this.refs.input.focus();
		},
		down: function down(e) {
			this.step('down', e);
		},
		up: function up(e) {
			this.step('up', e);
		},
		render: function render() {
			var _classNames;

			var props = this.props;
			var prefixCls = props.prefixCls;
			var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, prefixCls + '-disabled', props.disabled), _defineProperty(_classNames, prefixCls + '-focused', this.state.focused), _classNames));
			var upDisabledClass = '';
			var downDisabledClass = '';
			var value = this.state.value;
			if (!isNaN(value)) {
				var val = Number(value);
				if (val >= props.max) {
					upDisabledClass = prefixCls + '-handler-up-disabled';
				}
				if (val <= props.min) {
					downDisabledClass = prefixCls + '-handler-up-disabled';
				}
			} else {
				upDisabledClass = prefixCls + '-handler-up-disabled';
				downDisabledClass = prefixCls + '-handler-up-disabled';
			}

			// focus state, show input value
			// unfocus state, show valid value
			var inputDisplayValue = undefined;
			if (this.state.focused) {
				inputDisplayValue = this.state.inputValue;
			} else {
				inputDisplayValue = this.state.value;
			}

			// ref for test
			return React.createElement(
				'div',
				{ className: classes, style: props.style },
				React.createElement(
					'div',
					{ className: prefixCls + '-handler-wrap' },
					React.createElement(
						'a',
						{ unselectable: 'unselectable',
							ref: 'up',
							onClick: upDisabledClass ? noop : this.up,
							onMouseDown: preventDefault,
							className: prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass },
						React.createElement('span', { unselectable: 'unselectable', className: prefixCls + '-handler-up-inner',
							onClick: preventDefault })
					),
					React.createElement(
						'a',
						{ unselectable: 'unselectable',
							ref: 'down',
							onMouseDown: preventDefault,
							onClick: downDisabledClass ? noop : this.down,
							className: prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass },
						React.createElement('span', { unselectable: 'unselectable', className: prefixCls + '-handler-down-inner',
							onClick: preventDefault })
					)
				),
				React.createElement(
					'div',
					{ className: prefixCls + '-input-wrap' },
					React.createElement('input', { className: prefixCls + '-input',
						autoComplete: 'off',
						onFocus: this.onFocus,
						onBlur: this.onBlur,
						onKeyDown: this.onKeyDown,
						autoFocus: props.autoFocus,
						readOnly: props.readOnly,
						disabled: props.disabled,
						max: props.max,
						min: props.min,
						name: props.name,
						onChange: this.onChange,
						ref: 'input',
						value: inputDisplayValue })
				)
			);
		}
	});

	RC.InputNumber = InputNumber;
})(Smart.RC);
'use strict';

+(function (RC) {
	var Trigger = RC.Trigger;
	var _React = React;
	var PropTypes = _React.PropTypes;

	var autoAdjustOverflow = {
		adjustX: 1,
		adjustY: 1
	};

	var targetOffset = [0, 0];

	var placements = {
		topLeft: {
			points: ['bl', 'tl'],
			overflow: autoAdjustOverflow,
			offset: [0, -3],
			targetOffset: targetOffset
		},
		bottomLeft: {
			points: ['tl', 'bl'],
			overflow: autoAdjustOverflow,
			offset: [0, 3],
			targetOffset: targetOffset
		}
	};

	/*
 
  var MenuItem = Menu.Item;
 
  var menu = <Menu><MenuItem>1</MenuItem></Menu>;
 
  <DropDown trigger="click" animationName="" overlay={<>} onSelect={}>
  <button>open</button>
  </DropDown>
  */

	var Dropdown = React.createClass({
		displayName: 'Dropdown',

		propTypes: {
			minOverlayWidthMatchTrigger: PropTypes.bool,
			onVisibleChange: PropTypes.func,
			prefixCls: PropTypes.string,
			children: PropTypes.any,
			transitionName: PropTypes.string,
			overlayClassName: PropTypes.string,
			animation: PropTypes.any,
			align: PropTypes.object,
			overlayStyle: PropTypes.object,
			placement: PropTypes.string,
			trigger: PropTypes.array
		},

		getDefaultProps: function getDefaultProps() {
			return {
				minOverlayWidthMatchTrigger: true,
				prefixCls: 'rc-dropdown',
				trigger: ['hover'],
				overlayClassName: '',
				overlayStyle: {},
				defaultVisible: false,
				onVisibleChange: function onVisibleChange() {},

				placement: 'bottomLeft'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			if ('visible' in props) {
				return {
					visible: props.visible
				};
			}
			return {
				visible: props.defaultVisible
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(props) {
			if ('visible' in props) {
				this.setState({
					visible: props.visible
				});
			}
		},
		onClick: function onClick(e) {
			var props = this.props;
			var overlayProps = props.overlay.props;
			if (!('visible' in props)) {
				this.setState({
					visible: false
				});
			}
			if (overlayProps.onClick) {
				overlayProps.onClick(e);
			}
		},
		onVisibleChange: function onVisibleChange(v) {
			var props = this.props;
			if (!('visible' in props)) {
				this.setState({
					visible: v
				});
			}
			props.onVisibleChange(v);
		},
		getMenuElement: function getMenuElement() {
			var props = this.props;
			return React.cloneElement(props.overlay, {
				prefixCls: props.prefixCls + '-menu',
				onClick: this.onClick
			});
		},
		getPopupDomNode: function getPopupDomNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		afterVisibleChange: function afterVisibleChange(visible) {
			if (visible && this.props.minOverlayWidthMatchTrigger) {
				var overlayNode = this.getPopupDomNode();
				var rootNode = ReactDOM.findDOMNode(this);
				if (rootNode.offsetWidth > overlayNode.offsetWidth) {
					overlayNode.style.width = rootNode.offsetWidth + 'px';
				}
			}
		},
		render: function render() {
			var _props = this.props;
			var prefixCls = _props.prefixCls;
			var children = _props.children;
			var transitionName = _props.transitionName;
			var animation = _props.animation;
			var align = _props.align;
			var placement = _props.placement;
			var overlayClassName = _props.overlayClassName;
			var overlayStyle = _props.overlayStyle;
			var trigger = _props.trigger;

			return React.createElement(
				Trigger,
				{ prefixCls: prefixCls,
					ref: 'trigger',
					popupClassName: overlayClassName,
					popupStyle: overlayStyle,
					builtinPlacements: placements,
					action: trigger,
					popupPlacement: placement,
					popupAlign: align,
					popupTransitionName: transitionName,
					popupAnimation: animation,
					popupVisible: this.state.visible,
					afterPopupVisibleChange: this.afterVisibleChange,
					popup: this.getMenuElement(),
					onPopupVisibleChange: this.onVisibleChange
				},
				children
			);
		}
	});

	RC.Dropdown = Dropdown;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (RC) {
	var Checkbox = RC.Checkbox;

	var Radio = React.createClass({
		displayName: 'Radio',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-radio',
				type: 'radio'
			};
		},
		render: function render() {
			return React.createElement(Checkbox, _extends({}, this.props, { ref: 'checkbox' }));
		}
	});

	RC.Radio = Radio;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
  var noop = _.noop,
      rcUtil = RC.util,
      PropTypes = React.PropTypes,
      assign = _.assign,
      Animate = RC.Animate,
      DOMWrap = RC.DOMWrap,
      guid = rcUtil.guid,
      createChainedFunction = rcUtil.createChainedFunction,
      KeyCode = rcUtil.KeyCode,
      scrollIntoView = rcUtil.scrollIntoView;

  var now = Date.now();

  function getKeyFromChildrenIndex(child, menuEventKey, index) {
    var prefix = menuEventKey || '';
    return child.key || prefix + 'item_' + now + '_' + index;
  }

  function allDisabled(arr) {
    if (!arr.length) {
      return true;
    }
    return arr.every(function (c) {
      return !!c.props.disabled;
    });
  }

  function getActiveKey(props, originalActiveKey) {
    var activeKey = originalActiveKey;
    var children = props.children;
    var eventKey = props.eventKey;
    if (activeKey) {
      var found = undefined;
      React.Children.forEach(children, function (c, i) {
        if (!c.props.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
          found = true;
        }
      });
      if (found) {
        return activeKey;
      }
    }
    activeKey = null;
    if (props.defaultActiveFirst) {
      React.Children.forEach(children, function (c, i) {
        if (!activeKey && !c.props.disabled) {
          activeKey = getKeyFromChildrenIndex(c, eventKey, i);
        }
      });
      return activeKey;
    }
    return activeKey;
  }

  function saveRef(index, subIndex, c) {
    if (c) {
      if (subIndex !== undefined) {
        this.instanceArray[index] = this.instanceArray[index] || [];
        this.instanceArray[index][subIndex] = c;
      } else {
        this.instanceArray[index] = c;
      }
    }
  }

  var MenuMixin = {
    propTypes: {
      focusable: React.PropTypes.bool,
      multiple: React.PropTypes.bool,
      style: React.PropTypes.object,
      defaultActiveFirst: React.PropTypes.bool,
      visible: React.PropTypes.bool,
      activeKey: React.PropTypes.string,
      selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultOpenKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      children: React.PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-menu',
        className: '',
        mode: 'vertical',
        level: 1,
        inlineIndent: 24,
        visible: true,
        focusable: true,
        style: {}
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      return {
        activeKey: getActiveKey(props, props.activeKey)
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var props = undefined;
      if (nextProps.activeKey) {
        props = {
          activeKey: getActiveKey(nextProps, nextProps.activeKey)
        };
      } else {
        var originalActiveKey = this.state.activeKey;
        var activeKey = getActiveKey(nextProps, originalActiveKey);
        // fix: this.setState(), parent.render(),
        if (activeKey !== originalActiveKey) {
          props = {
            activeKey: activeKey
          };
        }
      }
      if (props) {
        this.setState(props);
      }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible;
    },
    componentWillMount: function componentWillMount() {
      this.instanceArray = [];
    },

    // all keyboard events callbacks run from here at first
    onKeyDown: function onKeyDown(e) {
      var _this = this;

      var keyCode = e.keyCode;
      var handled = undefined;
      this.getFlatInstanceArray().forEach(function (obj) {
        if (obj && obj.props.active) {
          handled = obj.onKeyDown(e);
        }
      });
      if (handled) {
        return 1;
      }
      var activeItem = null;
      if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
        activeItem = this.step(keyCode === KeyCode.UP ? -1 : 1);
      }
      if (activeItem) {
        e.preventDefault();
        this.setState({
          activeKey: activeItem.props.eventKey
        }, function () {
          scrollIntoView(ReactDOM.findDOMNode(activeItem), ReactDOM.findDOMNode(_this), {
            onlyScrollIfNeeded: true
          });
        });
        return 1;
      } else if (activeItem === undefined) {
        e.preventDefault();
        this.setState({
          activeKey: null
        });
        return 1;
      }
    },
    onCommonItemHover: function onCommonItemHover(e) {
      var mode = this.props.mode;
      var key = e.key;
      var hover = e.hover;
      var trigger = e.trigger;

      var activeKey = this.state.activeKey;
      if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
        this.setState({
          activeKey: hover ? key : null
        });
      } else {}
      // keep active for sub menu for click active
      // empty

      // clear last open status
      if (hover && mode !== 'inline') {
        var activeItem = this.getFlatInstanceArray().filter(function (c) {
          return c && c.props.eventKey === activeKey;
        })[0];
        if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
          this.onOpenChange({
            item: activeItem,
            key: activeItem.props.eventKey,
            open: false
          });
        }
      }
    },
    getFlatInstanceArray: function getFlatInstanceArray() {
      var instanceArray = this.instanceArray;
      var hasInnerArray = instanceArray.some(function (a) {
        return Array.isArray(a);
      });
      if (hasInnerArray) {
        instanceArray = [];
        this.instanceArray.forEach(function (a) {
          if (Array.isArray(a)) {
            instanceArray.push.apply(instanceArray, a);
          } else {
            instanceArray.push(a);
          }
        });
        this.instanceArray = instanceArray;
      }
      return instanceArray;
    },
    renderCommonMenuItem: function renderCommonMenuItem(child, i, subIndex, extraProps) {
      var state = this.state;
      var props = this.props;
      var key = getKeyFromChildrenIndex(child, props.eventKey, i);
      var childProps = child.props;
      /*if(!childProps){
        return null;
      }*/
      var newChildProps = assign({
        mode: props.mode,
        level: props.level,
        inlineIndent: props.inlineIndent,
        renderMenuItem: this.renderMenuItem,
        rootPrefixCls: props.prefixCls,
        index: i,
        parentMenu: this,
        ref: childProps.disabled ? undefined : createChainedFunction(child.ref, saveRef.bind(this, i, subIndex)),
        eventKey: key,
        closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
        onItemHover: this.onItemHover,
        active: !childProps.disabled && key === state.activeKey,
        multiple: props.multiple,
        onClick: this.onClick,
        openTransitionName: this.getOpenTransitionName(),
        openAnimation: props.openAnimation,
        onOpenChange: this.onOpenChange,
        onDeselect: this.onDeselect,
        onDestroy: this.onDestroy,
        onSelect: this.onSelect
      }, extraProps);
      if (props.mode === 'inline') {
        newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
      }
      return React.cloneElement(child, newChildProps);
    },
    renderRoot: function renderRoot(props) {
      var _classes;

      this.instanceArray = [];
      var classes = (_classes = {}, _defineProperty(_classes, props.prefixCls, 1), _defineProperty(_classes, props.prefixCls + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
      var domProps = {
        className: classNames(classes),
        role: 'menu',
        'aria-activedescendant': ''
      };
      if (props.id) {
        domProps.id = props.id;
      }
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }
      return(
        // ESLint is not smart enough to know that the type of `children` was checked.
        React.createElement(
          DOMWrap,
          _extends({ style: props.style,
            tag: 'ul',
            hiddenClassName: props.prefixCls + '-hidden',
            visible: props.visible }, domProps),
          ' ',
          React.Children.map(props.children, this.renderMenuItem),
          ' '
        )
      );
    },
    step: function step(direction) {
      var children = this.getFlatInstanceArray();
      var activeKey = this.state.activeKey;
      var len = children.length;
      if (direction < 0) {
        children = children.concat().reverse();
      }
      // find current activeIndex
      var activeIndex = -1;
      children.every(function (c, ci) {
        if (c && c.props.eventKey === activeKey) {
          activeIndex = ci;
          return false;
        }
        return true;
      });
      if (!this.props.defaultActiveFirst && activeIndex !== -1) {
        if (allDisabled(children.slice(activeIndex, len - 1))) {
          return undefined;
        }
      }
      var start = (activeIndex + 1) % len;
      var i = start;
      for (;;) {
        var child = children[i];
        if (!child || child.props.disabled) {
          i = (i + 1 + len) % len;
          // complete a loop
          if (i === start) {
            return null;
          }
        } else {
          return child;
        }
      }
    }
  };

  var Menu = React.createClass({
    displayName: 'Menu',

    propTypes: {
      openSubMenuOnMouseEnter: React.PropTypes.bool,
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultOpenKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      mode: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      openTransitionName: React.PropTypes.string,
      openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
      level: React.PropTypes.number,
      eventKey: React.PropTypes.string,
      selectable: React.PropTypes.bool,
      children: React.PropTypes.any
    },

    mixins: [MenuMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        openSubMenuOnMouseEnter: true,
        closeSubMenuOnMouseLeave: true,
        selectable: true,
        onClick: noop,
        onSelect: noop,
        onOpen: noop,
        onClose: noop,
        onDeselect: noop,
        defaultSelectedKeys: [],
        defaultOpenKeys: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var selectedKeys = props.defaultSelectedKeys;
      var openKeys = props.defaultOpenKeys;
      if ('selectedKeys' in props) {
        selectedKeys = props.selectedKeys || [];
      }
      if ('openKeys' in props) {
        openKeys = props.openKeys || [];
      }
      return {
        selectedKeys: selectedKeys, openKeys: openKeys
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var props = {};
      if ('selectedKeys' in nextProps) {
        props.selectedKeys = nextProps.selectedKeys;
      }
      if ('openKeys' in nextProps) {
        props.openKeys = nextProps.openKeys;
      }
      this.setState(props);
    },
    onDestroy: function onDestroy(key) {
      var state = this.state;
      var props = this.props;
      var selectedKeys = state.selectedKeys;
      var openKeys = state.openKeys;
      var index = selectedKeys.indexOf(key);
      if (!('selectedKeys' in props) && index !== -1) {
        selectedKeys.splice(index, 1);
      }
      index = openKeys.indexOf(key);
      if (!('openKeys' in props) && index !== -1) {
        openKeys.splice(index, 1);
      }
    },
    onItemHover: function onItemHover(e) {
      var _this2 = this;

      var item = e.item;
      // special for top sub menu

      if (this.props.mode !== 'inline' && !this.props.closeSubMenuOnMouseLeave && item.isSubMenu) {
        (function () {
          var activeKey = _this2.state.activeKey;
          var activeItem = _this2.getFlatInstanceArray().filter(function (c) {
            return c && c.props.eventKey === activeKey;
          })[0];
          if (activeItem && activeItem.props.open) {
            _this2.onOpenChange({
              key: item.props.eventKey,
              item: e.item,
              open: true
            });
          }
        })();
      }

      this.onCommonItemHover(e);
    },
    onSelect: function onSelect(selectInfo) {
      var props = this.props;
      if (props.selectable) {
        // root menu
        var selectedKeys = this.state.selectedKeys;
        var selectedKey = selectInfo.key;
        if (props.multiple) {
          selectedKeys = selectedKeys.concat([selectedKey]);
        } else {
          selectedKeys = [selectedKey];
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys
          });
        }
        props.onSelect(assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    onClick: function onClick(e) {
      var props = this.props;
      props.onClick(e);
    },
    onOpenChange: function onOpenChange(e) {
      var openKeys = this.state.openKeys;
      var props = this.props;
      var changed = true;
      if (e.open) {
        changed = openKeys.indexOf(e.key) === -1;
        if (changed) {
          openKeys = openKeys.concat(e.key);
        }
      } else {
        var index = openKeys.indexOf(e.key);
        changed = index !== -1;
        if (changed) {
          openKeys = openKeys.concat();
          openKeys.splice(index, 1);
        }
      }
      if (changed) {
        if (!('openKeys' in this.props)) {
          // hack: batch does not update state
          this.state.openKeys = openKeys;
          this.setState({
            openKeys: openKeys
          });
        }
        var info = assign({
          openKeys: openKeys
        }, e);
        if (e.open) {
          props.onOpen(info);
        } else {
          props.onClose(info);
        }
      }
    },
    onDeselect: function onDeselect(selectInfo) {
      var props = this.props;
      if (props.selectable) {
        var selectedKeys = this.state.selectedKeys.concat();
        var selectedKey = selectInfo.key;
        var index = selectedKeys.indexOf(selectedKey);
        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys
          });
        }
        props.onDeselect(assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    getOpenTransitionName: function getOpenTransitionName() {
      var props = this.props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;
      if (!transitionName && typeof animationName === 'string') {
        transitionName = props.prefixCls + '-open-' + animationName;
      }
      return transitionName;
    },
    isInlineMode: function isInlineMode() {
      return this.props.mode === 'inline';
    },
    lastOpenSubMenu: function lastOpenSubMenu() {
      var _this3 = this;

      var lastOpen = [];
      if (this.state.openKeys.length) {
        lastOpen = this.getFlatInstanceArray().filter(function (c) {
          return c && _this3.state.openKeys.indexOf(c.props.eventKey) !== -1;
        });
      }
      return lastOpen[0];
    },
    renderMenuItem: function renderMenuItem(c, i, subIndex) {
      var key = getKeyFromChildrenIndex(c, this.props.eventKey, i);
      var state = this.state;
      var extraProps = {
        openKeys: state.openKeys,
        open: state.openKeys.indexOf(key) !== -1,
        selectedKeys: state.selectedKeys,
        selected: state.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },
    render: function render() {
      var props = assign({}, this.props);
      props.className += ' ' + props.prefixCls + '-root';
      return this.renderRoot(props);
    }
  });

  var MenuItem = React.createClass({
    displayName: 'MenuItem',

    propTypes: {
      rootPrefixCls: React.PropTypes.string,
      eventKey: React.PropTypes.string,
      active: React.PropTypes.bool,
      selected: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      title: React.PropTypes.string,
      onSelect: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      parentMenu: React.PropTypes.object,
      onItemHover: React.PropTypes.func,
      onDestroy: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        onSelect: function onSelect() {},
        onMouseEnter: function onMouseEnter() {}
      };
    },
    componentWillUnmount: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        return true;
      }
    },
    onMouseLeave: function onMouseLeave() {
      var _this4 = this;

      var eventKey = this.props.eventKey;
      var parentMenu = this.props.parentMenu;
      parentMenu.menuItemMouseLeaveTimer = setTimeout(function () {
        if (_this4.isMounted() && _this4.props.active) {
          _this4.props.onItemHover({
            key: eventKey,
            item: _this4,
            hover: false,
            trigger: 'mouseleave'
          });
        }
      }, 30);
    },
    onMouseEnter: function onMouseEnter() {
      var props = this.props;
      var parentMenu = this.props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      var eventKey = props.eventKey;
      props.onItemHover({
        key: eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
    },
    onClick: function onClick(e) {
      var props = this.props;
      var eventKey = props.eventKey;
      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e
      };
      props.onClick(info);
      if (props.multiple) {
        if (props.selected) {
          props.onDeselect(info);
        } else {
          props.onSelect(info);
        }
      } else if (!props.selected) {
        props.onSelect(info);
      }
    },
    getPrefixCls: function getPrefixCls() {
      return this.props.rootPrefixCls + '-item';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getSelectedClassName: function getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    render: function render() {
      var props = this.props;
      var classes = {};
      classes[this.getActiveClassName()] = !props.disabled && props.active;
      classes[this.getSelectedClassName()] = props.selected;
      classes[this.getDisabledClassName()] = props.disabled;
      classes[this.getPrefixCls()] = true;
      classes[props.className] = !!props.className;
      var attrs = {
        title: props.title,
        className: classNames(classes),
        role: 'menuitem',
        'aria-selected': props.selected,
        'aria-disabled': props.disabled
      };
      var mouseEvent = {};
      if (!props.disabled) {
        mouseEvent = {
          onClick: this.onClick,
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return React.createElement(
        'li',
        _extends({ style: style }, attrs, mouseEvent),
        props.children
      );
    }
  });

  var MenuItemGroup = React.createClass({
    displayName: 'MenuItemGroup',

    propTypes: {
      renderMenuItem: PropTypes.func,
      index: PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        disabled: true
      };
    },
    renderInnerMenuItem: function renderInnerMenuItem(item, subIndex) {
      var renderMenuItem = this.props.renderMenuItem;
      return renderMenuItem(item, this.props.index, subIndex);
    },
    render: function render() {
      var props = this.props;
      var className = props.className || '';
      var rootPrefixCls = props.rootPrefixCls;

      className += ' ' + rootPrefixCls + '-item-group';
      var titleClassName = rootPrefixCls + '-item-group-title';
      var listClassName = rootPrefixCls + '-item-group-list';
      return React.createElement(
        'li',
        { className: className },
        React.createElement(
          'div',
          { className: titleClassName },
          props.title
        ),
        React.createElement(
          'ul',
          { className: listClassName },
          React.Children.map(props.children, this.renderInnerMenuItem)
        )
      );
    }
  });

  var SubPopupMenu = React.createClass({
    displayName: 'SubPopupMenu',

    propTypes: {
      onSelect: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      onOpenChange: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      openTransitionName: React.PropTypes.string,
      openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      visible: React.PropTypes.bool,
      children: React.PropTypes.any
    },

    mixins: [MenuMixin],

    onDeselect: function onDeselect(selectInfo) {
      this.props.onDeselect(selectInfo);
    },
    onSelect: function onSelect(selectInfo) {
      this.props.onSelect(selectInfo);
    },
    onClick: function onClick(e) {
      this.props.onClick(e);
    },
    onOpenChange: function onOpenChange(e) {
      this.props.onOpenChange(e);
    },
    onDestroy: function onDestroy(key) {
      this.props.onDestroy(key);
    },
    onItemHover: function onItemHover(e) {
      this.onCommonItemHover(e);
    },
    getOpenTransitionName: function getOpenTransitionName() {
      return this.props.openTransitionName;
    },
    renderMenuItem: function renderMenuItem(c, i, subIndex) {
      var props = this.props;
      var key = getKeyFromChildrenIndex(c, props.eventKey, i);
      var extraProps = {
        openKeys: props.openKeys,
        selectedKeys: props.selectedKeys,
        open: props.openKeys.indexOf(key) !== -1,
        selected: props.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: true
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },
    render: function render() {
      var renderFirst = this.renderFirst;
      this.renderFirst = 1;
      this.haveOpened = this.haveOpened || this.props.visible;
      if (!this.haveOpened) {
        return null;
      }
      var transitionAppear = true;
      if (!renderFirst && this.props.visible) {
        transitionAppear = false;
      }
      var props = assign({}, this.props);
      props.className += ' ' + props.prefixCls + '-sub';
      var animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (_typeof(props.openAnimation) === 'object') {
        animProps.animation = assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      return React.createElement(
        Animate,
        _extends({}, animProps, {
          showProp: 'visible',
          component: '',
          transitionAppear: transitionAppear }),
        this.renderRoot(props)
      );
    }
  });

  var SubMenuStateMixin = {
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate();
    },
    componentDidUpdate: function componentDidUpdate() {
      if (this.props.mode !== 'inline') {
        if (this.props.open) {
          this.bindRootCloseHandlers();
        } else {
          this.unbindRootCloseHandlers();
        }
      }
    },
    handleDocumentKeyUp: function handleDocumentKeyUp(e) {
      if (e.keyCode === KeyCode.ESC) {
        this.props.onItemHover({
          key: this.props.eventKey,
          item: this,
          hover: false
        });
      }
    },
    handleDocumentClick: function handleDocumentClick(e) {
      // If the click originated from within this component
      // don't do anything.
      if (rcUtil.Dom.contains(ReactDOM.findDOMNode(this), e.target)) {
        return;
      }
      var props = this.props;
      props.onItemHover({
        hover: false,
        item: this,
        key: this.props.eventKey
      });
      this.triggerOpenChange(false);
    },
    bindRootCloseHandlers: function bindRootCloseHandlers() {
      if (!this._onDocumentClickListener) {
        this._onDocumentClickListener = rcUtil.Dom.addEventListener(document, 'click', this.handleDocumentClick);
        this._onDocumentKeyupListener = rcUtil.Dom.addEventListener(document, 'keyup', this.handleDocumentKeyUp);
      }
    },
    unbindRootCloseHandlers: function unbindRootCloseHandlers() {
      if (this._onDocumentClickListener) {
        this._onDocumentClickListener.remove();
        this._onDocumentClickListener = null;
      }

      if (this._onDocumentKeyupListener) {
        this._onDocumentKeyupListener.remove();
        this._onDocumentKeyupListener = null;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      this.unbindRootCloseHandlers();
    }
  };

  var Divider = React.createClass({
    displayName: 'Divider',
    getDefaultProps: function getDefaultProps() {
      return {
        disabled: true
      };
    },
    render: function render() {
      var props = this.props;
      var className = props.className || '';
      var rootPrefixCls = props.rootPrefixCls;
      className += ' ' + (rootPrefixCls + '-item-divider');
      return React.createElement('li', _extends({}, props, { className: className }));
    }
  });

  var SubMenu = React.createClass({
    displayName: 'SubMenu',

    propTypes: {
      parentMenu: React.PropTypes.object,
      title: React.PropTypes.node,
      onClick: React.PropTypes.func,
      onOpenChange: React.PropTypes.func,
      rootPrefixCls: React.PropTypes.string,
      eventKey: React.PropTypes.string,
      multiple: React.PropTypes.bool,
      active: React.PropTypes.bool,
      open: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      openSubMenuOnMouseEnter: React.PropTypes.bool,
      onDeselect: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      onItemHover: React.PropTypes.func
    },

    mixins: [SubMenuStateMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        onMouseEnter: function onMouseEnter() {},

        title: ''
      };
    },
    getInitialState: function getInitialState() {
      this.isSubMenu = 1;
      return {
        defaultActiveFirst: false
      };
    },
    componentWillUnmount: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },
    onDestroy: function onDestroy(key) {
      this.props.onDestroy(key);
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      var menu = this.menuInstance;

      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        this.setState({
          defaultActiveFirst: true
        });
        return true;
      }

      if (keyCode === KeyCode.RIGHT) {
        if (this.props.open) {
          menu.onKeyDown(e);
        } else {
          this.triggerOpenChange(true);
          this.setState({
            defaultActiveFirst: true
          });
        }
        return true;
      }
      if (keyCode === KeyCode.LEFT) {
        var handled = undefined;
        if (this.props.open) {
          handled = menu.onKeyDown(e);
        } else {
          return undefined;
        }
        if (!handled) {
          this.triggerOpenChange(false);
          handled = true;
        }
        return handled;
      }

      if (this.props.open && (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN)) {
        return menu.onKeyDown(e);
      }
    },
    onSubTreeMouseEnter: function onSubTreeMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    },
    onOpenChange: function onOpenChange(e) {
      this.props.onOpenChange(this.addKeyPath(e));
    },
    onMouseEnter: function onMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
      var props = this.props;
      var parentMenu = props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
      if (props.openSubMenuOnMouseEnter) {
        this.triggerOpenChange(true);
      }
      this.setState({
        defaultActiveFirst: false
      });
    },
    onMouseLeave: function onMouseLeave() {
      var _this5 = this;

      // prevent popup menu and submenu gap
      this.leaveTimer = setTimeout(function () {
        // leave whole sub tree
        // still active
        if (_this5.isMounted() && _this5.props.active) {
          _this5.props.onItemHover({
            key: _this5.props.eventKey,
            item: _this5,
            hover: false,
            trigger: 'mouseleave'
          });
        }
        if (_this5.isMounted() && _this5.props.open) {
          if (_this5.props.closeSubMenuOnMouseLeave) {
            _this5.triggerOpenChange(false);
          }
        }
      }, 100);
    },
    onClick: function onClick() {
      if (this.props.openSubMenuOnMouseEnter) {
        return;
      }
      this.triggerOpenChange(!this.props.open, 'click');
      this.setState({
        defaultActiveFirst: false
      });
    },
    onSubMenuClick: function onSubMenuClick(info) {
      this.props.onClick(this.addKeyPath(info));
    },
    onSelect: function onSelect(info) {
      this.props.onSelect(info);
    },
    onDeselect: function onDeselect(info) {
      this.props.onDeselect(info);
    },
    getPrefixCls: function getPrefixCls() {
      return this.props.rootPrefixCls + '-submenu';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    getOpenClassName: function getOpenClassName() {
      return this.props.rootPrefixCls + '-submenu-open';
    },
    saveMenuInstance: function saveMenuInstance(c) {
      this.menuInstance = c;
    },
    addKeyPath: function addKeyPath(info) {
      return assign({}, info, {
        keyPath: (info.keyPath || []).concat(this.props.eventKey)
      });
    },
    triggerOpenChange: function triggerOpenChange(open, type) {
      var key = this.props.eventKey;
      this.onOpenChange({
        key: key,
        item: this,
        trigger: type,
        open: open
      });
    },
    renderChildren: function renderChildren(children) {
      var props = this.props;
      var baseProps = {
        mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
        visible: props.open,
        level: props.level + 1,
        inlineIndent: props.inlineIndent,
        focusable: false,
        onClick: this.onSubMenuClick,
        onSelect: this.onSelect,
        onDeselect: this.onDeselect,
        onDestroy: this.onDestroy,
        selectedKeys: props.selectedKeys,
        eventKey: props.eventKey + '-menu-',
        openKeys: props.openKeys,
        openTransitionName: props.openTransitionName,
        openAnimation: props.openAnimation,
        onOpenChange: this.onOpenChange,
        closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
        defaultActiveFirst: this.state.defaultActiveFirst,
        multiple: props.multiple,
        prefixCls: props.rootPrefixCls,
        id: this._menuId,
        ref: this.saveMenuInstance
      };
      return React.createElement(
        SubPopupMenu,
        baseProps,
        children
      );
    },
    render: function render() {
      var _classes2;

      this.haveOpen = this.haveOpen || this.props.open;
      var props = this.props;
      var prefixCls = this.getPrefixCls();
      var classes = (_classes2 = {}, _defineProperty(_classes2, props.className, !!props.className), _defineProperty(_classes2, prefixCls + '-' + props.mode, 1), _classes2);

      classes[this.getOpenClassName()] = this.props.open;
      classes[this.getActiveClassName()] = props.active;
      classes[this.getDisabledClassName()] = props.disabled;
      this._menuId = this._menuId || guid();
      classes[prefixCls] = true;
      classes[prefixCls + '-' + props.mode] = 1;
      var clickEvents = {};
      var mouseEvents = {};
      var titleMouseEvents = {};
      if (!props.disabled) {
        clickEvents = {
          onClick: this.onClick
        };
        mouseEvents = {
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onSubTreeMouseEnter
        };
        // only works in title, not outer li
        titleMouseEvents = {
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return React.createElement(
        'li',
        _extends({ className: classNames(classes) }, mouseEvents),
        React.createElement(
          'div',
          _extends({
            style: style,
            className: prefixCls + '-title'
          }, titleMouseEvents, clickEvents, {
            'aria-open': props.open,
            'aria-owns': this._menuId,
            'aria-haspopup': 'true' }),
          props.title
        ),
        this.renderChildren(props.children)
      );
    }
  });

  Menu.Divider = Divider;
  Menu.Item = MenuItem;
  Menu.SubMenu = SubMenu;
  Menu.ItemGroup = MenuItemGroup;

  RC.MenuItem = MenuItem;
  RC.MenuItemGroup = MenuItemGroup;
  RC.SubMenu = SubMenu;
  RC.Menu = Menu;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Menu = RC.Menu;
	var MenuItem = RC.MenuItem;
	var MenuItemGroup = RC.MenuItemGroup;
	var Animate = RC.Animate;
	var Util = RC.Util;
	var Trigger = RC.Trigger;
	var KeyCode = Util.KeyCode;
	var scrollIntoView = Util.scrollIntoView;
	var _React = React;
	var cloneElement = _React.cloneElement;
	var PropTypes = _React.PropTypes;
	var _ReactDOM = ReactDOM;
	var findDOMNode = _ReactDOM.findDOMNode;

	function getValuePropValue(child) {
		var props = child.props;
		if ('value' in props) {
			return props.value;
		}
		if (child.key) {
			return child.key;
		}
		throw new Error('no key or value for ' + child);
	}

	function getPropValue(child, prop) {
		if (prop === 'value') {
			return getValuePropValue(child);
		}
		return child.props[prop];
	}

	function isCombobox(props) {
		return props.combobox;
	}

	function isMultipleOrTags(props) {
		return props.multiple || props.tags;
	}

	function isMultipleOrTagsOrCombobox(props) {
		return isMultipleOrTags(props) || isCombobox(props);
	}

	function isSingleMode(props) {
		return !isMultipleOrTagsOrCombobox(props);
	}

	function toArray(value) {
		var ret = value;
		if (value === undefined) {
			ret = [];
		} else if (!Array.isArray(value)) {
			ret = [value];
		}
		return ret;
	}

	function getSelectKeys(menuItems, value) {
		if (value === null || value === undefined) {
			return [];
		}
		var selectedKeys = [];
		React.Children.forEach(menuItems, function (item) {
			if (item.type === MenuItemGroup) {
				selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
			} else {
				var itemValue = getValuePropValue(item);
				var itemKey = item.key;
				if (value.indexOf(itemValue) !== -1 && itemKey) {
					selectedKeys.push(itemKey);
				}
			}
		});
		return selectedKeys;
	}

	var OptGroup = (function (_React$Component) {
		_inherits(OptGroup, _React$Component);

		function OptGroup() {
			_classCallCheck(this, OptGroup);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(OptGroup).apply(this, arguments));
		}

		return OptGroup;
	})(React.Component);

	var Option = (function (_React$Component2) {
		_inherits(Option, _React$Component2);

		function Option() {
			_classCallCheck(this, Option);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
		}

		return Option;
	})(React.Component);

	var FilterMixin = {
		filterOption: function filterOption(input, child) {
			if (!input) {
				return true;
			}
			var filterOption = this.props.filterOption;
			if (!filterOption) {
				return true;
			}
			if (child.props.disabled) {
				return false;
			}
			return filterOption.call(this, input, child);
		},
		renderFilterOptions: function renderFilterOptions(inputValue) {
			return this.renderFilterOptionsFromChildren(this.props.children, true, inputValue);
		},
		renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren(children, showNotFound, iv) {
			var _this3 = this;

			var sel = [];
			var props = this.props;
			var inputValue = iv === undefined ? this.state.inputValue : iv;
			var childrenKeys = [];
			var tags = props.tags;
			React.Children.forEach(children, function (child) {
				if (child.type === OptGroup) {
					var innerItems = _this3.renderFilterOptionsFromChildren(child.props.children, false);
					if (innerItems.length) {
						var label = child.props.label;
						var key = child.key;
						if (!key && typeof label === 'string') {
							key = label;
						} else if (!label && key) {
							label = key;
						}
						sel.push(React.createElement(
							MenuItemGroup,
							{ key: key, title: label },
							innerItems
						));
					}
					return;
				}
				var childValue = getValuePropValue(child);
				if (_this3.filterOption(inputValue, child)) {
					sel.push(React.createElement(MenuItem, _extends({
						value: childValue,
						key: childValue
					}, child.props)));
				}
				if (tags && !child.props.disabled) {
					childrenKeys.push(childValue);
				}
			});
			if (tags) {
				// tags value must be string
				var value = this.state.value || [];
				value = value.filter(function (singleValue) {
					return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
				});
				sel = sel.concat(value.map(function (singleValue) {
					return React.createElement(
						MenuItem,
						{ value: singleValue, key: singleValue },
						singleValue
					);
				}));
				if (inputValue) {
					var notFindInputItem = sel.every(function (option) {
						return getValuePropValue(option) !== inputValue;
					});
					if (notFindInputItem) {
						sel.unshift(React.createElement(
							MenuItem,
							{ value: inputValue, key: inputValue },
							inputValue
						));
					}
				}
			}
			if (!sel.length && showNotFound && props.notFoundContent) {
				sel = [React.createElement(
					MenuItem,
					{ disabled: true, value: 'NOT_FOUND', key: 'NOT_FOUND' },
					props.notFoundContent
				)];
			}
			return sel;
		}
	};

	var DropdownMenu = React.createClass({
		displayName: 'DropdownMenu',

		propTypes: {
			prefixCls: PropTypes.string,
			menuItems: PropTypes.any,
			search: PropTypes.any,
			visible: PropTypes.bool
		},

		componentDidMount: function componentDidMount() {
			this.scrollActiveItemToView();
			this.lastVisible = this.props.visible;
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
			if (!nextProps.visible) {
				this.lastVisible = false;
			}
			// freeze when hide
			return nextProps.visible;
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var props = this.props;
			if (!prevProps.visible && props.visible) {
				this.scrollActiveItemToView();
			}
			this.lastVisible = props.visible;
		},
		scrollActiveItemToView: function scrollActiveItemToView() {
			// scroll into view
			var itemComponent = findDOMNode(this.firstActiveItem);
			if (itemComponent) {
				scrollIntoView(itemComponent, findDOMNode(this.refs.menu), {
					onlyScrollIfNeeded: true
				});
			}
		},
		renderMenu: function renderMenu() {
			var _this4 = this;

			var props = this.props;
			var menuItems = props.menuItems;
			var defaultActiveFirstOption = props.defaultActiveFirstOption;
			var value = props.value;
			var dropdownMenuStyle = props.dropdownMenuStyle;
			var prefixCls = props.prefixCls;
			var multiple = props.multiple;
			var onMenuDeselect = props.onMenuDeselect;
			var onMenuSelect = props.onMenuSelect;

			if (menuItems && menuItems.length) {
				var _ret = (function () {
					var menuProps = {};
					if (multiple) {
						menuProps.onDeselect = onMenuDeselect;
						menuProps.onSelect = onMenuSelect;
					} else {
						menuProps.onClick = onMenuSelect;
					}
					var selectedKeys = getSelectKeys(menuItems, value);
					var activeKeyProps = {};

					var clonedMenuItems = menuItems;
					if (selectedKeys.length) {
						(function () {
							if (props.visible && !_this4.lastVisible) {
								activeKeyProps.activeKey = selectedKeys[0];
							}
							var foundFirst = false;
							// set firstActiveItem via cloning menus
							// for scroll into view
							var clone = function clone(item) {
								if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
									foundFirst = true;
									return cloneElement(item, {
										ref: function ref(_ref2) {
											_this4.firstActiveItem = _ref2;
										}
									});
								}
								return item;
							};

							clonedMenuItems = menuItems.map(function (item) {
								if (item.type === MenuItemGroup) {
									var children = item.props.children.map(clone);
									return cloneElement(item, {}, children);
								}
								return clone(item);
							});
						})();
					}

					return {
						v: React.createElement(
							Menu,
							_extends({
								ref: 'menu',
								defaultActiveFirst: defaultActiveFirstOption,
								style: dropdownMenuStyle
							}, activeKeyProps, {
								multiple: multiple,
								focusable: false
							}, menuProps, {
								selectedKeys: selectedKeys,
								prefixCls: prefixCls + '-menu' }),
							clonedMenuItems
						)
					};
				})();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
			return null;
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				this.props.search,
				this.renderMenu()
			);
		}
	});

	var BUILT_IN_PLACEMENTS = {
		bottomLeft: {
			points: ['tl', 'bl'],
			offset: [0, 4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		},
		topLeft: {
			points: ['bl', 'tl'],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		}
	};

	var SelectTrigger = React.createClass({
		displayName: 'SelectTrigger',

		propTypes: {
			dropdownMatchSelectWidth: PropTypes.bool,
			visible: PropTypes.bool,
			filterOption: PropTypes.any,
			options: PropTypes.any,
			prefixCls: PropTypes.string,
			popupClassName: PropTypes.string,
			children: PropTypes.any
		},

		componentDidUpdate: function componentDidUpdate() {
			if (this.props.dropdownMatchSelectWidth && this.props.visible) {
				var dropdownDOMNode = this.getPopupDOMNode();
				if (dropdownDOMNode) {
					dropdownDOMNode.style.width = ReactDOM.findDOMNode(this).offsetWidth + 'px';
				}
			}
		},
		getInnerMenu: function getInnerMenu() {
			return this.popupMenu && this.popupMenu.refs.menu;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		getDropdownElement: function getDropdownElement(newProps) {
			var props = this.props;
			return React.createElement(DropdownMenu, _extends({
				ref: this.saveMenu
			}, newProps, {
				prefixCls: this.getDropdownPrefixCls(),
				onMenuSelect: props.onMenuSelect,
				onMenuDeselect: props.onMenuDeselect,
				value: props.value,
				defaultActiveFirstOption: props.defaultActiveFirstOption,
				dropdownMenuStyle: props.dropdownMenuStyle
			}));
		},
		getDropdownTransitionName: function getDropdownTransitionName() {
			var props = this.props;
			var transitionName = props.transitionName;
			if (!transitionName && props.animation) {
				transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
			}
			return transitionName;
		},
		getDropdownPrefixCls: function getDropdownPrefixCls() {
			return this.props.prefixCls + '-dropdown';
		},
		saveMenu: function saveMenu(menu) {
			this.popupMenu = menu;
		},
		render: function render() {
			var _popupClassName;

			var props = this.props;
			var multiple = props.multiple;
			var visible = props.visible;

			var dropdownPrefixCls = this.getDropdownPrefixCls();
			var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, props.dropdownClassName, !!props.dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
			var search = multiple || props.combobox || !props.showSearch ? null : React.createElement(
				'span',
				{ className: dropdownPrefixCls + '-search' },
				props.inputElement
			);
			var popupElement = this.getDropdownElement({
				menuItems: props.options,
				search: search,
				multiple: multiple,
				visible: visible
			});
			return React.createElement(
				Trigger,
				_extends({}, props, {
					action: props.disabled ? [] : ['click'],
					ref: 'trigger',
					popupPlacement: 'bottomLeft',
					builtinPlacements: BUILT_IN_PLACEMENTS,
					prefixCls: dropdownPrefixCls,
					popupTransitionName: this.getDropdownTransitionName(),
					onPopupVisibleChange: props.onDropdownVisibleChange,
					popup: popupElement,
					popupVisible: visible,
					popupClassName: classnames(popupClassName),
					popupStyle: props.dropdownStyle
				}),
				props.children
			);
		}
	});

	function filterFn(input, child) {
		return String(getPropValue(child, this.props.optionFilterProp)).indexOf(input) > -1;
	}

	function saveRef(name, component) {
		this[name] = component;
	}

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			defaultActiveFirstOption: PropTypes.bool,
			multiple: PropTypes.bool,
			filterOption: PropTypes.any,
			showSearch: PropTypes.bool,
			disabled: PropTypes.bool,
			showArrow: PropTypes.bool,
			tags: PropTypes.bool,
			transitionName: PropTypes.string,
			optionLabelProp: PropTypes.string,
			optionFilterProp: PropTypes.string,
			animation: PropTypes.string,
			choiceTransitionName: PropTypes.string,
			onChange: PropTypes.func,
			onSelect: PropTypes.func,
			onSearch: PropTypes.func,
			searchPlaceholder: PropTypes.string,
			placeholder: PropTypes.any,
			onDeselect: PropTypes.func,
			value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			dropdownStyle: PropTypes.object,
			maxTagTextLength: PropTypes.number
		},
		mixins: [FilterMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-select',
				filterOption: filterFn,
				defaultOpen: false,
				defaultActiveFirstOption: true,
				showSearch: true,
				allowClear: false,
				placeholder: '',
				searchPlaceholder: '',
				defaultValue: [],
				onChange: noop,
				onSelect: noop,
				onSearch: noop,
				onDeselect: noop,
				showArrow: true,
				dropdownMatchSelectWidth: true,
				dropdownStyle: {},
				dropdownMenuStyle: {},
				optionFilterProp: 'value',
				optionLabelProp: 'value',
				notFoundContent: 'Not Found'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var value = [];
			if ('value' in props) {
				value = toArray(props.value);
			} else {
				value = toArray(props.defaultValue);
			}
			var label = this.getLabelFromProps(props, value, 1);
			var inputValue = '';
			if (props.combobox) {
				inputValue = value.length ? String(value[0]) : '';
			}
			this.saveInputRef = saveRef.bind(this, 'inputInstance');
			var open = props.open;
			if (open === undefined) {
				open = props.defaultOpen;
			}
			return { value: value, inputValue: inputValue, label: label, open: open };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = toArray(nextProps.value);
				var label = this.getLabelFromProps(nextProps, value);
				this.setState({
					value: value,
					label: label
				});
				if (nextProps.combobox) {
					this.setState({
						inputValue: value.length ? String(value[0]) : ''
					});
				}
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			var state = this.state;
			var props = this.props;
			if (state.open && isMultipleOrTags(props)) {
				var inputNode = this.getInputDOMNode();
				if (inputNode.value) {
					inputNode.style.width = '';
					inputNode.style.width = inputNode.scrollWidth + 'px';
				} else {
					inputNode.style.width = '';
				}
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.dropdownContainer) {
				ReactDOM.unmountComponentAtNode(this.dropdownContainer);
				document.body.removeChild(this.dropdownContainer);
				this.dropdownContainer = null;
			}
		},
		onInputChange: function onInputChange(event) {
			var val = event.target.value;
			var props = this.props;

			this.setState({
				inputValue: val,
				open: true
			});
			if (isCombobox(props)) {
				this.fireChange([val], [val]);
			}
			props.onSearch(val);
		},
		onDropdownVisibleChange: function onDropdownVisibleChange(open) {
			this.setOpenState(open);
		},

		// combobox ignore
		onKeyDown: function onKeyDown(event) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var keyCode = event.keyCode;
			if (this.state.open && !this.getInputDOMNode()) {
				this.onInputKeyDown(event);
			} else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
				this.setOpenState(true);
				event.preventDefault();
			}
		},
		onInputKeyDown: function onInputKeyDown(event) {
			var props = this.props;
			var state = this.state;
			var keyCode = event.keyCode;
			if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
				var value = state.value.concat();
				if (value.length) {
					var label = state.label.concat();
					var popValue = value.pop();
					label.pop();
					props.onDeselect(popValue);
					this.fireChange(value, label);
				}
				return;
			}
			if (keyCode === KeyCode.DOWN) {
				if (!state.open) {
					this.openIfHasChildren();
					event.preventDefault();
					event.stopPropagation();
					return;
				}
			} else if (keyCode === KeyCode.ESC) {
				if (state.open) {
					this.setOpenState(false);
					event.preventDefault();
					event.stopPropagation();
				}
				return;
			}

			if (state.open) {
				var menu = this.refs.trigger.getInnerMenu();
				if (menu && menu.onKeyDown(event)) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		},
		onMenuSelect: function onMenuSelect(_ref3) {
			var item = _ref3.item;

			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var selectedValue = getValuePropValue(item);
			var selectedLabel = this.getLabelFromOption(item);
			props.onSelect(selectedValue, item);
			if (isMultipleOrTags(props)) {
				if (value.indexOf(selectedValue) !== -1) {
					return;
				}
				value = value.concat([selectedValue]);
				label = label.concat([selectedLabel]);
			} else {
				if (value[0] === selectedValue) {
					this.setOpenState(false);
					return;
				}
				value = [selectedValue];
				label = [selectedLabel];
				this.setOpenState(false);
			}
			this.fireChange(value, label);
			this.setState({
				inputValue: ''
			});
			if (isCombobox(props)) {
				this.setState({
					inputValue: getPropValue(item, props.optionLabelProp)
				});
			}
		},
		onMenuDeselect: function onMenuDeselect(_ref4) {
			var item = _ref4.item;
			var domEvent = _ref4.domEvent;

			if (domEvent.type === 'click') {
				this.removeSelected(getValuePropValue(item));
			}
			if (!isMultipleOrTags(this.props)) {
				this.setOpenState(false);
			}
			this.setState({
				inputValue: ''
			});
		},
		onPlaceholderClick: function onPlaceholderClick() {
			this.getInputDOMNode().focus();
		},
		onClearSelection: function onClearSelection(event) {
			var props = this.props;
			var state = this.state;
			if (props.disabled) {
				return;
			}
			event.stopPropagation();
			if (state.inputValue || state.value.length) {
				this.fireChange([], []);
				this.setOpenState(false);
				this.setState({
					inputValue: ''
				});
			}
		},
		getLabelBySingleValue: function getLabelBySingleValue(children, value) {
			var _this5 = this;

			if (value === undefined) {
				return null;
			}
			var label = null;
			React.Children.forEach(children, function (child) {
				if (child.type === OptGroup) {
					var maybe = _this5.getLabelBySingleValue(child.props.children, value);
					if (maybe !== null) {
						label = maybe;
					}
				} else if (getValuePropValue(child) === value) {
					label = _this5.getLabelFromOption(child);
				}
			});
			return label;
		},
		getLabelFromOption: function getLabelFromOption(child) {
			return getPropValue(child, this.props.optionLabelProp);
		},
		getLabelFromProps: function getLabelFromProps(props, value, init) {
			var label = [];
			if ('label' in props) {
				label = toArray(props.label);
			} else if (init && 'defaultLabel' in props) {
				label = toArray(props.defaultLabel);
			} else {
				label = this.getLabelByValue(props.children, value);
			}
			return label;
		},
		getVLForOnChange: function getVLForOnChange(vls) {
			if (vls !== undefined) {
				return isMultipleOrTags(this.props) ? vls : vls[0];
			}
			return vls;
		},
		getLabelByValue: function getLabelByValue(children, values) {
			var _this6 = this;

			return values.map(function (value) {
				var label = _this6.getLabelBySingleValue(children, value);
				if (label === null) {
					return value;
				}
				return label;
			});
		},
		getDropdownContainer: function getDropdownContainer() {
			if (!this.dropdownContainer) {
				this.dropdownContainer = document.createElement('div');
				document.body.appendChild(this.dropdownContainer);
			}
			return this.dropdownContainer;
		},
		getSearchPlaceholderElement: function getSearchPlaceholderElement(hidden) {
			var props = this.props;
			if (props.searchPlaceholder) {
				return React.createElement(
					'span',
					{
						style: { display: hidden ? 'none' : 'block' },
						onClick: this.onPlaceholderClick,
						className: props.prefixCls + '-search__field__placeholder' },
					props.searchPlaceholder
				);
			}
			return null;
		},
		getInputElement: function getInputElement() {
			var props = this.props;
			return React.createElement(
				'span',
				{ className: props.prefixCls + '-search__field__wrap' },
				React.createElement('input', { ref: this.saveInputRef,
					onChange: this.onInputChange,
					onKeyDown: this.onInputKeyDown,
					value: this.state.inputValue,
					disabled: props.disabled,
					className: props.prefixCls + '-search__field',
					role: 'textbox' }),
				isMultipleOrTags(props) ? null : this.getSearchPlaceholderElement(!!this.state.inputValue)
			);
		},
		getInputDOMNode: function getInputDOMNode() {
			return this.inputInstance;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDOMNode();
		},
		getPopupMenuComponent: function getPopupMenuComponent() {
			return this.refs.trigger.getInnerMenu();
		},
		setOpenState: function setOpenState(open) {
			var _this7 = this;

			var props = this.props;
			var refs = this.refs;

			this.setState({
				open: open
			}, function () {
				if (open || isMultipleOrTagsOrCombobox(props)) {
					if (_this7.getInputDOMNode()) {
						_this7.getInputDOMNode().focus();
					}
				} else if (refs.selection) {
					refs.selection.focus();
				}
			});
		},
		removeSelected: function removeSelected(selectedValue) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var label = this.state.label.concat();
			var index = this.state.value.indexOf(selectedValue);
			var value = this.state.value.filter(function (singleValue) {
				return singleValue !== selectedValue;
			});
			if (index !== -1) {
				label.splice(index, 1);
			}
			var canMultiple = isMultipleOrTags(props);
			if (canMultiple) {
				props.onDeselect(selectedValue);
			}
			this.fireChange(value, label);
		},
		openIfHasChildren: function openIfHasChildren() {
			var props = this.props;
			if (React.Children.count(props.children) || isSingleMode(props)) {
				this.setOpenState(true);
			}
		},
		fireChange: function fireChange(value, label) {
			var props = this.props;
			if (!('value' in props)) {
				this.setState({
					value: value, label: label
				});
			}
			props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label));
		},
		renderTopControlNode: function renderTopControlNode() {
			var _this8 = this;

			var _state = this.state;
			var value = _state.value;
			var label = _state.label;

			var props = this.props;
			var choiceTransitionName = props.choiceTransitionName;
			var prefixCls = props.prefixCls;
			var maxTagTextLength = props.maxTagTextLength;
			// single and not combobox, input is inside dropdown

			if (isSingleMode(props)) {
				var innerNode = React.createElement(
					'span',
					{ key: 'placeholder',
						className: prefixCls + '-selection__placeholder' },
					props.placeholder
				);
				if (label.length) {
					innerNode = React.createElement(
						'span',
						{ key: 'value' },
						label[0]
					);
				}
				return React.createElement(
					'span',
					{ className: prefixCls + '-selection__rendered' },
					innerNode
				);
			}

			var selectedValueNodes = [];
			if (isMultipleOrTags(props)) {
				selectedValueNodes = value.map(function (singleValue, index) {
					var content = label[index];
					var title = content;
					if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
						content = content.slice(0, maxTagTextLength) + '...';
					}
					return React.createElement(
						'li',
						{ className: prefixCls + '-selection__choice',
							key: singleValue,
							title: title },
						React.createElement(
							'span',
							{ className: prefixCls + '-selection__choice__content' },
							content
						),
						React.createElement('span', { className: prefixCls + '-selection__choice__remove',
							onClick: _this8.removeSelected.bind(_this8, singleValue) })
					);
				});
			}
			selectedValueNodes.push(React.createElement(
				'li',
				{ className: prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
				this.getInputElement()
			));
			var className = prefixCls + '-selection__rendered';
			if (isMultipleOrTags(props) && choiceTransitionName) {
				return React.createElement(
					Animate,
					{ className: className,
						component: 'ul',
						transitionName: choiceTransitionName },
					selectedValueNodes
				);
			}
			return React.createElement(
				'ul',
				{ className: className },
				selectedValueNodes
			);
		},
		render: function render() {
			var _rootCls;

			var props = this.props;
			var multiple = isMultipleOrTags(props);
			var state = this.state;
			var className = props.className;
			var disabled = props.disabled;
			var allowClear = props.allowClear;
			var prefixCls = props.prefixCls;

			var ctrlNode = this.renderTopControlNode();
			var extraSelectionProps = {};
			var open = this.state.open;

			var options = [];
			if (open) {
				options = this.renderFilterOptions();
			}
			if (open && (isMultipleOrTagsOrCombobox(props) || !props.showSearch) && !options.length) {
				open = false;
			}
			if (!isCombobox(props)) {
				extraSelectionProps = {
					onKeyDown: this.onKeyDown,
					tabIndex: 0
				};
			}
			var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', open), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _rootCls);

			var clear = React.createElement('span', { key: 'clear',
				className: prefixCls + '-selection__clear',
				onClick: this.onClearSelection });
			return React.createElement(
				SelectTrigger,
				_extends({}, props, {
					options: options,
					multiple: multiple,
					disabled: disabled,
					visible: open,
					inputValue: state.inputValue,
					inputElement: this.getInputElement(),
					value: state.value,
					onDropdownVisibleChange: this.onDropdownVisibleChange,
					onMenuSelect: this.onMenuSelect,
					onMenuDeselect: this.onMenuDeselect,
					ref: 'trigger' }),
				React.createElement(
					'span',
					{
						style: props.style,
						className: classnames(rootCls) },
					React.createElement(
						'span',
						_extends({ ref: 'selection',
							key: 'selection',
							className: prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
							role: 'combobox',
							'aria-autocomplete': 'list',
							'aria-haspopup': 'true',
							'aria-expanded': open
						}, extraSelectionProps),
						ctrlNode,
						allowClear && !isMultipleOrTags(props) ? clear : null,
						multiple || !props.showArrow ? null : React.createElement(
							'span',
							{ key: 'arrow', className: prefixCls + '-arrow', tabIndex: '-1', style: { outline: 'none' } },
							React.createElement('b', null)
						),
						multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null
					)
				)
			);
		}
	});
	Select.Option = Option;
	Select.OptGroup = OptGroup;
	RC.Select = Select;
})(Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;

	var Switch = React.createClass({
		displayName: 'Switch',

		propTypes: {
			className: React.PropTypes.string,
			prefixCls: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			style: React.PropTypes.object,
			checkedChildren: React.PropTypes.any,
			unCheckedChildren: React.PropTypes.any,
			onChange: React.PropTypes.func
		},
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-switch',
				style: {},
				checkedChildren: null,
				unCheckedChildren: null,
				className: '',
				defaultChecked: false,
				onChange: noop
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var checked = false;
			if ('checked' in props) {
				checked = !!props.checked;
			} else {
				checked = !!props.defaultChecked;
			}
			return {
				checked: checked
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('checked' in nextProps) {
				this.setState({
					checked: !!nextProps.checked
				});
			}
		},
		toggle: function toggle() {
			var checked = !this.state.checked;
			this.setState({
				checked: checked
			});
			this.props.onChange(checked);
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var className = _props.className;
			var prefixCls = _props.prefixCls;
			var disabled = _props.disabled;
			var style = _props.style;
			var checkedChildren = _props.checkedChildren;
			var unCheckedChildren = _props.unCheckedChildren;

			var checked = this.state.checked;
			var switchClassName = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
			return React.createElement(
				'span',
				{ className: switchClassName,
					onClick: disabled ? noop : this.toggle,
					style: style },
				React.createElement(
					'span',
					{ className: prefixCls + '-inner' },
					checked ? checkedChildren : unCheckedChildren
				)
			);
		}
	});

	RC.Switch = Switch;
})(Smart.RC);
'use strict';

+(function (RC) {
	var _ref = _;
	var assign = _ref.assign;

	var defaultProps = {
		strokeWidth: 1,
		strokeColor: '#3FC7FA',
		trailWidth: 1,
		trailColor: '#D9D9D9'
	};

	var Line = React.createClass({
		displayName: 'Line',
		render: function render() {
			var props = assign({}, this.props);
			var pathStyle = {
				'strokeDasharray': '100px, 100px',
				'strokeDashoffset': 100 - props.percent + 'px',
				'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s linear'
			};

			['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach(function (item) {
				if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
					props.trailWidth = props.strokeWidth;
					return;
				}
				if (item === 'strokeWidth' && props.strokeWidth && (!parseFloat(props.strokeWidth) || parseFloat(props.strokeWidth) > 100 || parseFloat(props.strokeWidth) < 0)) {
					props[item] = defaultProps[item];
					return;
				}
				if (!props[item]) {
					props[item] = defaultProps[item];
				}
			});

			var strokeWidth = props.strokeWidth;
			var center = strokeWidth / 2;
			var right = 100 - strokeWidth / 2;
			var pathString = 'M ' + center + ',' + center + ' L ' + right + ',' + center;
			var viewBoxString = '0 0 100 ' + strokeWidth;

			return React.createElement(
				'svg',
				{ className: 'rc-progress-line', viewBox: viewBoxString, preserveAspectRatio: 'none' },
				React.createElement('path', { className: 'rc-progress-line-trail', d: pathString, strokeLinecap: 'round',
					stroke: props.trailColor, strokeWidth: props.trailWidth, fillOpacity: '0' }),
				React.createElement('path', { className: 'rc-progress-line-path', d: pathString, strokeLinecap: 'round',
					stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
			);
		}
	});

	var Circle = React.createClass({
		displayName: 'Circle',
		render: function render() {
			var props = assign({}, this.props);
			var strokeWidth = props.strokeWidth;
			var radius = 50 - strokeWidth / 2;
			var pathString = 'M 50,50 m 0,-' + radius + '\n\t     a ' + radius + ',' + radius + ' 0 1 1 0,' + 2 * radius + '\n\t     a ' + radius + ',' + radius + ' 0 1 1 0,-' + 2 * radius;
			var len = Math.PI * 2 * radius;
			var pathStyle = {
				'strokeDasharray': len + 'px ' + len + 'px',
				'strokeDashoffset': (100 - props.percent) / 100 * len + 'px',
				'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
			};
			['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach(function (item) {
				if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
					props.trailWidth = props.strokeWidth;
					return;
				}
				if (!props[item]) {
					props[item] = defaultProps[item];
				}
			});

			return React.createElement(
				'svg',
				{ className: 'rc-progress-circle', viewBox: '0 0 100 100' },
				React.createElement('path', { className: 'rc-progress-circle-trail', d: pathString, stroke: props.trailColor,
					strokeWidth: props.trailWidth, fillOpacity: '0' }),
				React.createElement('path', { className: 'rc-progress-circle-path', d: pathString, strokeLinecap: 'round',
					stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
			);
		}
	});

	RC.Progress = {
		Line: Line,
		Circle: Circle
	};
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (RC) {
  var _ref = _;
  var noop = _ref.noop;
  var Trigger = RC.Trigger;
  var _React = React;
  var PropTypes = _React.PropTypes;

  var autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
  };

  var targetOffset = [0, 0];

  var placements = {
    left: {
      points: ['cr', 'cl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    },
    right: {
      points: ['cl', 'cr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    top: {
      points: ['bc', 'tc'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    topLeft: {
      points: ['bl', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    leftTop: {
      points: ['tr', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    rightTop: {
      points: ['tl', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    rightBottom: {
      points: ['bl', 'br'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    leftBottom: {
      points: ['br', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    }
  };

  var Tooltip = React.createClass({
    displayName: 'Tooltip',

    propTypes: {
      trigger: PropTypes.any,
      children: PropTypes.any,
      defaultVisible: PropTypes.bool,
      visible: PropTypes.bool,
      placement: PropTypes.string,
      transitionName: PropTypes.string,
      animation: PropTypes.any,
      onVisibleChange: PropTypes.func,
      afterVisibleChange: PropTypes.func,
      overlay: PropTypes.node.isRequired,
      overlayStyle: PropTypes.object,
      overlayClassName: PropTypes.string,
      prefixCls: PropTypes.string,
      mouseEnterDelay: PropTypes.number,
      mouseLeaveDelay: PropTypes.number,
      getTooltipContainer: PropTypes.func,
      destroyTooltipOnHide: PropTypes.bool,
      align: PropTypes.shape({
        offset: PropTypes.array,
        targetOffset: PropTypes.array
      }),
      arrowContent: PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-tooltip',
        mouseEnterDelay: 0,
        destroyTooltipOnHide: false,
        mouseLeaveDelay: 0.1,
        align: {},
        placement: 'right',
        trigger: ['hover'],
        arrowContent: null
      };
    },
    getPopupElement: function getPopupElement() {
      var _props = this.props;
      var arrowContent = _props.arrowContent;
      var overlay = _props.overlay;
      var prefixCls = _props.prefixCls;

      return [React.createElement(
        'div',
        { className: prefixCls + '-arrow', key: 'arrow' },
        arrowContent
      ), React.createElement(
        'div',
        { className: prefixCls + '-inner', key: 'content' },
        overlay
      )];
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.refs.trigger.popupDomNode;
    },
    render: function render() {
      var _props2 = this.props;
      var overlayClassName = _props2.overlayClassName;
      var trigger = _props2.trigger;
      var mouseEnterDelay = _props2.mouseEnterDelay;
      var mouseLeaveDelay = _props2.mouseLeaveDelay;
      var overlayStyle = _props2.overlayStyle;
      var prefixCls = _props2.prefixCls;
      var children = _props2.children;
      var onVisibleChange = _props2.onVisibleChange;
      var transitionName = _props2.transitionName;
      var animation = _props2.animation;
      var placement = _props2.placement;
      var align = _props2.align;
      var destroyTooltipOnHide = _props2.destroyTooltipOnHide;
      var defaultVisible = _props2.defaultVisible;
      var getTooltipContainer = _props2.getTooltipContainer;

      var restProps = _objectWithoutProperties(_props2, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

      var extraProps = _extends({}, restProps);
      if ('visible' in this.props) {
        extraProps.popupVisible = this.props.visible;
      }
      return React.createElement(
        Trigger,
        _extends({ popupClassName: overlayClassName,
          ref: 'trigger',
          prefixCls: prefixCls,
          popup: this.getPopupElement(),
          action: trigger,
          builtinPlacements: placements,
          popupPlacement: placement,
          popupAlign: align,
          getPopupContainer: getTooltipContainer,
          onPopupVisibleChange: onVisibleChange,
          popupTransitionName: transitionName,
          popupAnimation: animation,
          defaultPopupVisible: defaultVisible,
          destroyPopupOnHide: destroyTooltipOnHide,
          mouseLeaveDelay: mouseLeaveDelay,
          popupStyle: overlayStyle,
          mouseEnterDelay: mouseEnterDelay
        }, extraProps),
        children
      );
    }
  });

  RC.Tooltip = Tooltip;
})(Smart.RC);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//V5.4.0 - 2016/3/8
+(function (RC) {
  var _ref = _;
  var noop = _ref.noop;var Align = RC.Align;
  var Animate = RC.Animate;
  var DOMWrap = RC.DOMWrap;
  var Util = RC.Util;var KeyCode = Util.KeyCode;var _React = React;
  var PropTypes = _React.PropTypes;

  function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        ret = d.body[method];
      }
    }
    return ret;
  }

  function setTransformOrigin(node, value) {
    var style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
      style[prefix + 'TransformOrigin'] = value;
    });
    style['transformOrigin'] = value;
  }

  function offset(el) {
    var rect = el.getBoundingClientRect();
    var pos = {
      left: rect.left,
      top: rect.top
    };
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    pos.top += getScroll(w, 1);
    return pos;
  }

  var Dialog = React.createClass({
    displayName: 'Dialog',

    propTypes: {
      onAfterClose: PropTypes.func,
      onClose: PropTypes.func,
      closable: PropTypes.bool,
      maskClosable: PropTypes.bool,
      visible: PropTypes.bool,
      mousePosition: PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
      return {
        onAfterClose: noop,
        onClose: noop
      };
    },
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate({});
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
      var props = this.props;
      if (props.visible) {
        // first show
        if (!prevProps.visible) {
          this.lastOutSideFocusNode = document.activeElement;
          ReactDOM.findDOMNode(this.refs.dialog).focus();
        }
      } else if (prevProps.visible) {
        if (props.mask && this.lastOutSideFocusNode) {
          try {
            this.lastOutSideFocusNode.focus();
          } catch (e) {
            this.lastOutSideFocusNode = null;
          }
          this.lastOutSideFocusNode = null;
        }
      }
    },
    onAnimateLeave: function onAnimateLeave() {
      this.props.onAfterClose();
    },
    onMaskClick: function onMaskClick(e) {
      if (this.props.closable && this.props.maskClosable) {
        this.close(e);
      }
      ReactDOM.findDOMNode(this.refs.dialog).focus();
    },
    onKeyDown: function onKeyDown(e) {
      var props = this.props;
      if (props.closable) {
        if (e.keyCode === KeyCode.ESC) {
          this.close(e);
        }
      }
      // keep focus inside dialog
      if (props.visible) {
        if (e.keyCode === KeyCode.TAB) {
          var activeElement = document.activeElement;
          var dialogRoot = ReactDOM.findDOMNode(this.refs.dialog);
          var sentinel = this.refs.sentinel;
          if (e.shiftKey) {
            if (activeElement === dialogRoot) {
              sentinel.focus();
            }
          } else if (activeElement === this.refs.sentinel) {
            dialogRoot.focus();
          }
        }
      }
    },
    onAlign: function onAlign(dialogNode) {
      var mousePosition = this.props.mousePosition;
      if (this.props.visible) {
        if (mousePosition) {
          var elOffset = offset(dialogNode);
          setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + 'px ' + (mousePosition.y - elOffset.top) + 'px');
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    },
    getDialogElement: function getDialogElement() {
      var props = this.props;
      var closable = props.closable;
      var prefixCls = props.prefixCls;
      var dest = {};
      if (props.width !== undefined) {
        dest.width = props.width;
      }
      if (props.height !== undefined) {
        dest.height = props.height;
      }
      if (props.zIndex !== undefined) {
        dest.zIndex = props.zIndex;
      }

      var footer = undefined;
      if (props.footer) {
        footer = React.createElement(
          'div',
          { className: prefixCls + '-footer', ref: 'footer' },
          props.footer
        );
      }

      var header = undefined;
      if (props.title) {
        header = React.createElement(
          'div',
          { className: prefixCls + '-header', ref: 'header' },
          React.createElement(
            'div',
            { className: prefixCls + '-title' },
            props.title
          )
        );
      }

      var closer = undefined;
      if (closable) {
        closer = React.createElement(
          'a',
          { tabIndex: '0', onClick: this.close, className: prefixCls + '-close' },
          React.createElement('span', { className: prefixCls + '-close-x' })
        );
      }

      var style = _extends({}, props.style, dest);
      var dialogProps = {
        className: [props.prefixCls, props.className].join(' '),
        tabIndex: '0',
        role: 'dialog',
        ref: 'dialog',
        style: style,
        onKeyDown: this.onKeyDown
      };
      var transitionName = this.getTransitionName();
      var dialogElement = React.createElement(
        DOMWrap,
        _extends({}, dialogProps, {
          hiddenClassName: prefixCls + '-hidden' }),
        React.createElement(
          'div',
          { className: prefixCls + '-content' },
          closer,
          header,
          React.createElement(
            'div',
            { className: prefixCls + '-body', style: props.bodyStyle, ref: 'body' },
            props.children
          ),
          footer
        ),
        React.createElement(
          'div',
          { tabIndex: '0', ref: 'sentinel', style: { width: 0, height: 0, overflow: 'hidden' } },
          'sentinel'
        )
      );
      // add key for align to keep animate children stable
      return React.createElement(
        Animate,
        { key: 'dialog',
          showProp: 'dialogVisible',
          onLeave: this.onAnimateLeave,
          transitionName: transitionName,
          component: '',
          transitionAppear: true },
        React.createElement(
          Align,
          { align: props.align,
            key: 'dialog',
            onAlign: this.onAlign,
            dialogVisible: props.visible,
            childrenProps: {
              visible: 'dialogVisible'
            },
            monitorBufferTime: 80,
            monitorWindowResize: true,
            disabled: !props.visible },
          dialogElement
        )
      );
    },
    getMaskElement: function getMaskElement() {
      var props = this.props;
      var maskProps = {
        onClick: this.onMaskClick
      };

      if (props.zIndex) {
        maskProps.style = { zIndex: props.zIndex };
      }
      var maskElement = undefined;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = React.createElement(DOMWrap, _extends({}, maskProps, { key: 'mask',
          className: props.prefixCls + '-mask',
          visible: props.visible,
          hiddenClassName: props.prefixCls + '-mask-hidden' }));
        if (maskTransition) {
          maskElement = React.createElement(
            Animate,
            { key: 'mask', showProp: 'visible',
              transitionAppear: true, component: '',
              transitionName: maskTransition },
            maskElement
          );
        }
      }
      return maskElement;
    },
    getMaskTransitionName: function getMaskTransitionName() {
      var props = this.props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    getTransitionName: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      var animation = props.animation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    getElement: function getElement(part) {
      return this.refs[part];
    },
    close: function close(e) {
      this.props.onClose(e);
    },
    render: function render() {
      var props = this.props;
      var prefixCls = props.prefixCls;
      var className = _defineProperty({}, prefixCls + '-wrap', 1);

      return React.createElement(
        'div',
        { className: classNames(className), ref: 'root' },
        [this.getMaskElement(), this.getDialogElement()]
      );
    }
  });

  function copy(obj, fields) {
    var ret = {};
    fields.forEach(function (f) {
      if (obj[f] !== undefined) {
        ret[f] = obj[f];
      }
    });
    return ret;
  }

  var DialogWrap = (function (_React$Component) {
    _inherits(DialogWrap, _React$Component);

    function DialogWrap(props) {
      _classCallCheck(this, DialogWrap);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogWrap).call(this, props));

      _this.state = {
        visible: props.visible
      };
      ['onClose', 'cleanDialogContainer'].forEach(function (m) {
        _this[m] = _this[m].bind(_this);
      });
      return _this;
    }

    _createClass(DialogWrap, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.componentDidUpdate();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        if ('visible' in props) {
          this.setState({
            visible: props.visible
          });
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !!(this.state.visible || nextState.visible);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.dialogRendered) {
          this.dialogInstance = ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement(), this.getDialogContainer());
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.dialogContainer) {
          if (this.state.visible) {
            ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement({
              onAfterClose: this.cleanDialogContainer,
              onClose: noop,
              visible: false
            }), this.dialogContainer);
          } else {
            this.cleanDialogContainer();
          }
        }
      }
    }, {
      key: 'onClose',
      value: function onClose(e) {
        this.props.onClose(e);
      }
    }, {
      key: 'getDialogContainer',
      value: function getDialogContainer() {
        if (!this.dialogContainer) {
          this.dialogContainer = document.createElement('div');
          this.dialogContainer.className = this.props.prefixCls + '-container';
          document.body.appendChild(this.dialogContainer);
        }
        return this.dialogContainer;
      }
    }, {
      key: 'getDialogElement',
      value: function getDialogElement(extra) {
        var props = this.props;
        var dialogProps = copy(props, ['className', 'closable', 'maskClosable', 'align', 'title', 'footer', 'mask', 'animation', 'transitionName', 'maskAnimation', 'maskTransitionName', 'mousePosition', 'prefixCls', 'style', 'width', 'height', 'zIndex', 'bodyStyle']);
        dialogProps = _extends({}, dialogProps, {
          onClose: this.onClose,
          visible: this.state.visible
        }, extra);
        return React.createElement(
          Dialog,
          _extends({}, dialogProps, { key: 'dialog' }),
          props.children
        );
      }
    }, {
      key: 'getElement',
      value: function getElement(part) {
        return this.dialogInstance.getElement(part);
      }
    }, {
      key: 'cleanDialogContainer',
      value: function cleanDialogContainer() {
        ReactDOM.unmountComponentAtNode(this.getDialogContainer());
        document.body.removeChild(this.dialogContainer);
        this.dialogContainer = null;
      }
    }, {
      key: 'render',
      value: function render() {
        this.dialogRendered = this.dialogRendered || this.state.visible;
        return null;
      }
    }]);

    return DialogWrap;
  })(React.Component);

  DialogWrap.defaultProps = {
    className: '',
    align: {
      points: ['tc', 'tc'],
      offset: [0, 100]
    },
    mask: true,
    closable: true,
    maskClosable: true,
    prefixCls: 'rc-dialog',
    onClose: noop
  };

  DialogWrap.propTypes = {
    className: React.PropTypes.string,
    align: React.PropTypes.shape({
      align: React.PropTypes.array,
      offset: React.PropTypes.arrayOf(React.PropTypes.number)
    }),
    mask: React.PropTypes.bool,
    closable: React.PropTypes.bool,
    maskClosable: React.PropTypes.bool,
    prefixCls: React.PropTypes.string,
    visible: React.PropTypes.bool,
    onClose: React.PropTypes.func
  };
  RC.Dialog = DialogWrap;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;var Animate = RC.Animate;
	var Util = RC.Util;var KeyCode = Util.KeyCode;
	var offset = Util.offset;var _React = React;
	var PropTypes = _React.PropTypes;

	var tabBarExtraContentStyle = {
		float: 'right'
	};

	function _componentDidUpdate(component) {
		var refs = component.refs;
		var containerNode = refs.nav;
		var containerOffset = offset(containerNode);
		var inkBarNode = refs.inkBar;
		var activeTab = refs.activeTab;
		var tabPosition = component.props.tabPosition;
		if (activeTab) {
			var tabNode = activeTab;
			var tabOffset = offset(tabNode);
			if (tabPosition === 'top' || tabPosition === 'bottom') {
				var left = tabOffset.left - containerOffset.left;
				inkBarNode.style.left = left + 'px';
				inkBarNode.style.top = '';
				inkBarNode.style.bottom = '';
				inkBarNode.style.right = containerNode.offsetWidth - left - tabNode.offsetWidth + 'px';
			} else {
				var top = tabOffset.top - containerOffset.top;
				inkBarNode.style.left = '';
				inkBarNode.style.right = '';
				inkBarNode.style.top = top + 'px';
				inkBarNode.style.bottom = containerNode.offsetHeight - top - tabNode.offsetHeight + 'px';
			}
		}
		inkBarNode.style.display = activeTab ? 'block' : 'none';
	}

	var InkBarMixin = {
		componentDidUpdate: function componentDidUpdate() {
			_componentDidUpdate(this);
		},
		componentDidMount: function componentDidMount() {
			_componentDidUpdate(this);
		}
	};

	var TabPane = React.createClass({
		displayName: 'TabPane',

		propTypes: {
			onDestroy: React.PropTypes.func
		},

		componentWillUnmount: function componentWillUnmount() {
			if (this.props.onDestroy) {
				this.props.onDestroy();
			}
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.rootPrefixCls + '-tabpane';
			var cls = props.active ? '' : prefixCls + '-hidden';
			cls += ' ' + prefixCls;
			return React.createElement(
				'div',
				{ className: cls },
				props.children
			);
		}
	});

	var Nav = React.createClass({
		displayName: 'Nav',

		propTypes: {
			tabPosition: PropTypes.string,
			tabBarExtraContent: PropTypes.any,
			onTabClick: PropTypes.func
		},

		mixins: [InkBarMixin],

		getInitialState: function getInitialState() {
			return {
				next: false,
				offset: 0,
				prev: false
			};
		},
		componentDidMount: function componentDidMount() {
			this.componentDidUpdate();
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var props = this.props;
			if (prevProps && prevProps.tabPosition !== props.tabPosition) {
				this.setOffset(0);
				return;
			}
			var navNode = this.refs.nav;
			var navNodeWH = this.getOffsetWH(navNode);
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			var minOffset = navWrapNodeWH - navNodeWH;
			var _state = this.state;
			var next = _state.next;
			var prev = _state.prev;

			if (minOffset >= 0) {
				next = false;
				this.setOffset(0);
				offset = 0;
			} else if (minOffset < offset) {
				next = true;
			} else {
				next = false;
				this.setOffset(minOffset);
				offset = minOffset;
			}

			if (offset < 0) {
				prev = true;
			} else {
				prev = false;
			}

			this.setNext(next);
			this.setPrev(prev);

			var nextPrev = { next: next, prev: prev };
			// wait next,prev show hide
			if (this.isNextPrevShown(state) !== this.isNextPrevShown(nextPrev)) {
				this.setNextPrev({}, this.scrollToActiveTab);
			} else {
				// can not use props.activeKey
				if (!prevProps || props.activeKey !== prevProps.activeKey) {
					this.scrollToActiveTab();
				}
			}
		},
		onTabClick: function onTabClick(key) {
			this.props.onTabClick(key);
		},

		// work around eslint warning
		setNextPrev: function setNextPrev(nextPrev, callback) {
			this.setState(nextPrev, callback);
		},
		getTabs: function getTabs() {
			var _this = this;

			var props = this.props;
			var children = props.panels;
			var activeKey = props.activeKey;
			var rst = [];
			var prefixCls = props.prefixCls;

			React.Children.forEach(children, function (child) {
				var key = child.key;
				var cls = activeKey === key ? prefixCls + '-tab-active' : '';
				cls += ' ' + prefixCls + '-tab';
				var events = {};
				if (child.props.disabled) {
					cls += ' ' + prefixCls + '-tab-disabled';
				} else {
					events = {
						onClick: _this.onTabClick.bind(_this, key)
					};
				}
				var ref = {};
				if (activeKey === key) {
					ref.ref = 'activeTab';
				}
				rst.push(React.createElement(
					'div',
					_extends({}, events, {
						className: cls,
						key: key
					}, ref),
					React.createElement(
						'div',
						{ className: prefixCls + '-tab-inner' },
						child.props.tab
					)
				));
			});

			return rst;
		},
		getOffsetWH: function getOffsetWH(node) {
			var tabPosition = this.props.tabPosition;
			var prop = 'offsetWidth';
			if (tabPosition === 'left' || tabPosition === 'right') {
				prop = 'offsetHeight';
			}
			return node[prop];
		},
		getOffsetLT: function getOffsetLT(node) {
			var tabPosition = this.props.tabPosition;
			var prop = 'left';
			if (tabPosition === 'left' || tabPosition === 'right') {
				prop = 'top';
			}
			return node.getBoundingClientRect()[prop];
		},
		setOffset: function setOffset(offset) {
			var target = Math.min(0, offset);
			if (this.state.offset !== target) {
				this.setState({
					offset: target
				});
			}
		},
		setPrev: function setPrev(v) {
			if (this.state.prev !== v) {
				this.setState({
					prev: v
				});
			}
		},
		setNext: function setNext(v) {
			if (this.state.next !== v) {
				this.setState({
					next: v
				});
			}
		},
		isNextPrevShown: function isNextPrevShown(state) {
			return state.next || state.prev;
		},
		scrollToActiveTab: function scrollToActiveTab() {
			var _refs = this.refs;
			var activeTab = _refs.activeTab;
			var navWrap = _refs.navWrap;

			if (activeTab) {
				var activeTabWH = this.getOffsetWH(activeTab);
				var navWrapNodeWH = this.getOffsetWH(navWrap);
				var _offset = this.state.offset;

				var wrapOffset = this.getOffsetLT(navWrap);
				var activeTabOffset = this.getOffsetLT(activeTab);
				if (wrapOffset > activeTabOffset) {
					_offset += wrapOffset - activeTabOffset;
					this.setState({ offset: _offset });
				} else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
					_offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
					this.setState({ offset: _offset });
				}
			}
		},
		prev: function prev() {
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			this.setOffset(offset + navWrapNodeWH);
		},
		next: function next() {
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			this.setOffset(offset - navWrapNodeWH);
		},
		render: function render() {
			var props = this.props;
			var state = this.state;
			var prefixCls = props.prefixCls;
			var tabs = this.getTabs();
			var tabMovingDirection = props.tabMovingDirection;
			var tabPosition = props.tabPosition;
			var inkBarClass = prefixCls + '-ink-bar';
			if (tabMovingDirection) {
				inkBarClass += ' ' + prefixCls + '-ink-bar-transition-' + tabMovingDirection;
			}
			var nextButton = undefined;
			var prevButton = undefined;

			var showNextPrev = state.prev || state.next;

			if (showNextPrev) {
				var _cx, _cx2;

				prevButton = React.createElement(
					'span',
					{
						onClick: state.prev ? this.prev : noop,
						unselectable: 'unselectable',
						className: cx((_cx = {}, _defineProperty(_cx, prefixCls + '-tab-prev', 1), _defineProperty(_cx, prefixCls + '-tab-btn-disabled', !state.prev), _cx)) },
					React.createElement('span', { className: prefixCls + '-tab-prev-icon' })
				);

				nextButton = React.createElement(
					'span',
					{
						onClick: state.next ? this.next : noop,
						unselectable: 'unselectable',
						className: cx((_cx2 = {}, _defineProperty(_cx2, prefixCls + '-tab-next', 1), _defineProperty(_cx2, prefixCls + '-tab-btn-disabled', !state.next), _cx2)) },
					React.createElement('span', { className: prefixCls + '-tab-next-icon' })
				);
			}

			var navOffset = {};
			if (tabPosition === 'left' || tabPosition === 'right') {
				navOffset = {
					top: state.offset
				};
			} else {
				navOffset = {
					left: state.offset
				};
			}

			var tabBarExtraContent = this.props.tabBarExtraContent;

			return React.createElement(
				'div',
				{ className: prefixCls + '-tabs-bar' },
				tabBarExtraContent ? React.createElement(
					'div',
					{ style: tabBarExtraContentStyle },
					tabBarExtraContent
				) : null,
				React.createElement(
					'div',
					{ className: prefixCls + '-nav-container ' + (showNextPrev ? prefixCls + '-nav-container-scrolling' : ''),
						style: props.style,
						ref: 'container' },
					prevButton,
					nextButton,
					React.createElement(
						'div',
						{ className: prefixCls + '-nav-wrap', ref: 'navWrap' },
						React.createElement(
							'div',
							{ className: prefixCls + '-nav-scroll' },
							React.createElement(
								'div',
								{ className: prefixCls + '-nav', ref: 'nav', style: navOffset },
								React.createElement('div', { className: inkBarClass, ref: 'inkBar' }),
								tabs
							)
						)
					)
				)
			);
		}
	});
	function getDefaultActiveKey(props) {
		var activeKey = undefined;
		React.Children.forEach(props.children, function (child) {
			if (!activeKey && !child.props.disabled) {
				activeKey = child.key;
			}
		});
		return activeKey;
	}

	var Tabs = React.createClass({
		displayName: 'Tabs',

		propTypes: {
			destroyInactiveTabPane: PropTypes.bool,
			onTabClick: PropTypes.func,
			onChange: PropTypes.func,
			children: PropTypes.any,
			tabBarExtraContent: PropTypes.any,
			animation: PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-tabs',
				destroyInactiveTabPane: false,
				tabBarExtraContent: null,
				onChange: noop,
				tabPosition: 'top',
				style: {},
				contentStyle: {},
				navStyle: {},
				onTabClick: noop
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var activeKey = undefined;
			if ('activeKey' in props) {
				activeKey = props.activeKey;
			} else if ('defaultActiveKey' in props) {
				activeKey = props.defaultActiveKey;
			} else {
				activeKey = getDefaultActiveKey(props);
			}
			// cache panels
			this.renderPanels = {};
			return { activeKey: activeKey };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var newActiveKey = this.state.activeKey;
			if ('activeKey' in nextProps) {
				newActiveKey = nextProps.activeKey;
				if (!newActiveKey) {
					this.setState({
						activeKey: newActiveKey
					});
					return;
				}
			}
			var found = undefined;
			React.Children.forEach(nextProps.children, function (child) {
				if (child.key === newActiveKey) {
					found = true;
				}
			});
			if (found) {
				this.setActiveKey(newActiveKey, nextProps);
			} else {
				this.setActiveKey(getDefaultActiveKey(nextProps), nextProps);
			}
		},
		onTabDestroy: function onTabDestroy(key) {
			delete this.renderPanels[key];
		},
		onTabClick: function onTabClick(key) {
			this.setActiveKey(key);
			this.props.onTabClick(key);
			if (this.state.activeKey !== key) {
				this.props.onChange(key);
			}
		},
		onKeyDown: function onKeyDown(e) {
			if (e.target !== ReactDOM.findDOMNode(this)) {
				return;
			}
			var eventKeyCode = e.keyCode;
			switch (eventKeyCode) {
				case KeyCode.RIGHT:
				case KeyCode.DOWN:
					e.preventDefault();
					var nextKey = this.getNextActiveKey(true);
					this.onTabClick(nextKey);
					break;
				case KeyCode.LEFT:
				case KeyCode.UP:
					e.preventDefault();
					var previousKey = this.getNextActiveKey(false);
					this.onTabClick(previousKey);
					break;
				default:
			}
		},
		getNextActiveKey: function getNextActiveKey(next) {
			var activeKey = this.state.activeKey;
			var children = [];
			React.Children.forEach(this.props.children, function (c) {
				if (!c.props.disabled) {
					if (next) {
						children.push(c);
					} else {
						children.unshift(c);
					}
				}
			});
			var length = children.length;
			var ret = length && children[0].key;
			children.forEach(function (child, i) {
				if (child.key === activeKey) {
					if (i === length - 1) {
						ret = children[0].key;
					} else {
						ret = children[i + 1].key;
					}
				}
			});
			return ret;
		},
		getTabPanes: function getTabPanes() {
			var _this2 = this;

			var state = this.state;
			var props = this.props;
			var activeKey = state.activeKey;
			var children = props.children;
			var newChildren = [];
			var renderPanels = this.renderPanels;

			React.Children.forEach(children, function (c) {
				var child = c;
				var key = child.key;
				var active = activeKey === key;
				if (active || renderPanels[key]) {
					child = active ? child : renderPanels[key];
					renderPanels[key] = React.cloneElement(child, {
						active: active,
						onDestroy: _this2.onTabDestroy.bind(_this2, key),
						// eventKey: key,
						rootPrefixCls: props.prefixCls
					});
					newChildren.push(renderPanels[key]);
				} else {
					// do not change owner ...
					// or else will destroy and reinit
					// newChildren.push(<TabPane active={false}
					//  key={key}
					//  eventKey={key}
					//  rootPrefixCls={this.props.prefixCls}></TabPane>);
					// return
					// lazy load
					newChildren.push(React.cloneElement(child, {
						active: false,
						// eventKey: key,
						rootPrefixCls: props.prefixCls
					}, []));
				}
			});

			return newChildren;
		},
		getIndexPair: function getIndexPair(props, currentActiveKey, activeKey) {
			var keys = [];
			React.Children.forEach(props.children, function (c) {
				keys.push(c.key);
			});
			var currentIndex = keys.indexOf(currentActiveKey);
			var nextIndex = keys.indexOf(activeKey);
			return { currentIndex: currentIndex, nextIndex: nextIndex };
		},
		setActiveKey: function setActiveKey(activeKey, ps) {
			var props = ps || this.props;
			var currentActiveKey = this.state.activeKey;
			if (currentActiveKey === activeKey || 'activeKey' in props && props === this.props) {
				return;
			}
			if (!currentActiveKey) {
				this.setState({
					activeKey: activeKey
				});
			} else {
				var _getIndexPair = this.getIndexPair(props, currentActiveKey, activeKey);

				var currentIndex = _getIndexPair.currentIndex;
				var nextIndex = _getIndexPair.nextIndex;
				// removed

				if (currentIndex === -1) {
					var newPair = this.getIndexPair(this.props, currentActiveKey, activeKey);
					currentIndex = newPair.currentIndex;
					nextIndex = newPair.nextIndex;
				}
				var tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
				this.setState({
					activeKey: activeKey,
					tabMovingDirection: tabMovingDirection
				});
			}
		},
		render: function render() {
			var props = this.props;
			var destroyInactiveTabPane = props.destroyInactiveTabPane;
			var prefixCls = props.prefixCls;
			var tabPosition = props.tabPosition;

			var cls = prefixCls + ' ' + prefixCls + '-' + tabPosition;
			var tabMovingDirection = this.state.tabMovingDirection;
			if (props.className) {
				cls += ' ' + props.className;
			}
			var animation = this.props.animation;
			var tabPanes = this.getTabPanes();
			var transitionName = undefined;
			transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
			if (!transitionName && animation) {
				transitionName = prefixCls + '-' + animation + '-' + (tabMovingDirection || 'backward');
			}
			if (destroyInactiveTabPane) {
				tabPanes = tabPanes.filter(function (panel) {
					return panel.props.active;
				});
			}
			if (transitionName) {
				if (destroyInactiveTabPane) {
					tabPanes = React.createElement(
						Animate,
						{ exclusive: true,
							transitionName: transitionName },
						tabPanes
					);
				} else {
					tabPanes = React.createElement(
						Animate,
						{ showProp: 'active',
							exclusive: true,
							transitionName: transitionName },
						tabPanes
					);
				}
			}
			var contents = [React.createElement(Nav, { prefixCls: prefixCls,
				key: 'nav',
				tabBarExtraContent: this.props.tabBarExtraContent,
				tabPosition: tabPosition,
				style: props.navStyle,
				onTabClick: this.onTabClick,
				tabMovingDirection: tabMovingDirection,
				panels: this.props.children,
				activeKey: this.state.activeKey }), React.createElement(
				'div',
				{ className: prefixCls + '-content',
					style: props.contentStyle,
					key: 'content' },
				tabPanes
			)];
			if (tabPosition === 'bottom') {
				contents.reverse();
			}
			return React.createElement(
				'div',
				{ className: cls,
					tabIndex: '0',
					style: props.style,
					onKeyDown: this.onKeyDown },
				contents
			);
		}
	});

	Tabs.TabPane = TabPane;
	RC.Tabs = Tabs;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

//V1.5.0 - 2016.2.15
+(function (RC) {
  //message

  function newMessages() {
    return {
      'default': 'Validation error on field %s',
      required: '%s is required',
      'enum': '%s must be one of %s',
      whitespace: '%s cannot be empty',
      date: {
        format: '%s date %s is invalid for format %s',
        parse: '%s date could not be parsed, %s is invalid ',
        invalid: '%s date %s is invalid'
      },
      types: {
        string: '%s is not a %s',
        method: '%s is not a %s (function)',
        array: '%s is not an %s',
        object: '%s is not an %s',
        number: '%s is not a %s',
        date: '%s is not a %s',
        boolean: '%s is not a %s',
        integer: '%s is not an %s',
        float: '%s is not a %s',
        regexp: '%s is not a valid %s',
        email: '%s is not a valid %s',
        url: '%s is not a valid %s',
        hex: '%s is not a valid %s'
      },
      string: {
        len: '%s must be exactly %s characters',
        min: '%s must be at least %s characters',
        max: '%s cannot be longer than %s characters',
        range: '%s must be between %s and %s characters'
      },
      number: {
        len: '%s must equal %s',
        min: '%s cannot be less than %s',
        max: '%s cannot be greater than %s',
        range: '%s must be between %s and %s'
      },
      array: {
        len: '%s must be exactly %s in length',
        min: '%s cannot be less than %s in length',
        max: '%s cannot be greater than %s in length',
        range: '%s must be between %s and %s in length'
      },
      pattern: {
        mismatch: '%s value %s does not match pattern %s'
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }

  var defaultMessages = newMessages();

  ////util
  var formatRegExp = /%[sdj%]/g;

  var util = (function () {

    function format() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var i = 1;
      var f = args[0];
      var len = args.length;
      if (typeof f === 'function') {
        return f.apply(null, args.slice(1));
      }
      if (typeof f === 'string') {
        var str = String(f).replace(formatRegExp, function (x) {
          if (x === '%%') {
            return '%';
          }
          if (i >= len) {
            return x;
          }
          switch (x) {
            case '%s':
              return String(args[i++]);
            case '%d':
              return Number(args[i++]);
            case '%j':
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return '[Circular]';
              }
              break;
            default:
              return x;
          }
        });
        for (var arg = args[i]; i < len; arg = args[++i]) {
          str += ' ' + arg;
        }
        return str;
      }
      return f;
    }

    function isNativeStringType(type) {
      return type === 'string' || type === 'url' || type === 'hex' || type === 'email';
    }

    function isEmptyValue(value, type) {
      if (value === undefined || value === null) {
        return true;
      }
      if (type === 'array' && Array.isArray(value) && !value.length) {
        return true;
      }
      if (isNativeStringType(type) && typeof value === 'string' && !value) {
        return true;
      }
      return false;
    }

    function isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    }

    function asyncParallelArray(arr, func, callback) {
      var results = [];
      var total = 0;
      var arrLength = arr.length;

      function count(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === arrLength) {
          callback(results);
        }
      }

      arr.forEach(function (a) {
        func(a, count);
      });
    }

    function asyncSerialArray(arr, func, callback) {
      var index = 0;
      var arrLength = arr.length;

      function next(errors) {
        if (errors.length) {
          callback(errors);
          return;
        }
        var original = index;
        index = index + 1;
        if (original < arrLength) {
          func(arr[original], next);
        } else {
          callback([]);
        }
      }

      next([]);
    }

    function flattenObjArr(objArr) {
      var ret = [];
      Object.keys(objArr).forEach(function (k) {
        ret.push.apply(ret, objArr[k]);
      });
      return ret;
    }

    function asyncMap(objArr, option, func, callback) {
      if (option.first) {
        var flattenArr = flattenObjArr(objArr);
        return asyncSerialArray(flattenArr, func, callback);
      }
      var firstFields = option.firstFields || [];
      if (firstFields === true) {
        firstFields = Object.keys(objArr);
      }
      var objArrKeys = Object.keys(objArr);
      var objArrLength = objArrKeys.length;
      var total = 0;
      var results = [];
      var next = function next(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
        }
      };
      objArrKeys.forEach(function (key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func, next);
        } else {
          asyncParallelArray(arr, func, next);
        }
      });
    }

    function complementError(rule) {
      return function (oe) {
        if (oe && oe.message) {
          oe.field = oe.field || rule.fullField;
          return oe;
        }
        return {
          message: oe,
          field: oe.field || rule.fullField
        };
      };
    }

    return {
      format: format,
      isEmptyValue: isEmptyValue,
      isEmptyObject: isEmptyObject,
      asyncMap: asyncMap,
      complementError: complementError
    };
  })();

  var format = util.format;
  var isEmptyValue = util.isEmptyValue;
  var isEmptyObject = util.isEmptyObject;
  var complementError = util.complementError;
  var asyncMap = util.asyncMap;

  //rule

  var rules = (function () {
    var ENUM = 'enum';

    /**
     *  Rule for validating a value exists in an enumerable list.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function enumerable(rule, value, source, errors, options) {
      rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
      if (rule[ENUM].indexOf(value) === -1) {
        errors.push(util.format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
      }
    }

    /**
     *  Rule for validating a regular expression pattern.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function pattern_r(rule, value, source, errors, options) {
      if (rule.pattern instanceof RegExp) {
        if (!rule.pattern.test(value)) {
          errors.push(util.format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }

    /**
     *  Rule for validating minimum and maximum allowed values.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function range(rule, value, source, errors, options) {
      var len = typeof rule.len === 'number';
      var min = typeof rule.min === 'number';
      var max = typeof rule.max === 'number';
      var val = value;
      var key = null;
      var num = typeof value === 'number';
      var str = typeof value === 'string';
      var arr = Array.isArray(value);
      if (num) {
        key = 'number';
      } else if (str) {
        key = 'string';
      } else if (arr) {
        key = 'array';
      }
      // if the value is not of a supported type for range validation
      // the validation rule rule should use the
      // type property to also test for a particular type
      if (!key) {
        return false;
      }
      if (str || arr) {
        val = value.length;
      }
      if (len) {
        if (val !== rule.len) {
          errors.push(util.format(options.messages[key].len, rule.fullField, rule.len));
        }
      } else if (min && !max && val < rule.min) {
        errors.push(util.format(options.messages[key].min, rule.fullField, rule.min));
      } else if (max && !min && val > rule.max) {
        errors.push(util.format(options.messages[key].max, rule.fullField, rule.max));
      } else if (min && max && (val < rule.min || val > rule.max)) {
        errors.push(util.format(options.messages[key].range, rule.fullField, rule.min, rule.max));
      }
    }

    /**
     *  Rule for validating required fields.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function required(rule, value, source, errors, options, type) {
      if (rule.required && (!source.hasOwnProperty(rule.field) || util.isEmptyValue(value, type))) {
        errors.push(util.format(options.messages.required, rule.fullField));
      }
    }

    var pattern = {
      email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(([\/\w\.-]*)?)(\?[-_+=~\.;&%\w]*)?(\#[-_\/\!\w]*)?( *)?$/i,
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
    };

    var types = {
      integer: function integer(value) {
        return types.number(value) && parseInt(value, 10) === value;
      },
      float: function float(value) {
        return types.number(value) && !types.integer(value);
      },
      array: function array(value) {
        return Array.isArray(value);
      },
      regexp: function regexp(value) {
        if (value instanceof RegExp) {
          return true;
        }
        try {
          return !!new RegExp(value);
        } catch (e) {
          return false;
        }
      },
      date: function date(value) {
        return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
      },
      number: function number(value) {
        if (isNaN(value)) {
          return false;
        }
        return typeof value === 'number';
      },
      object: function object(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !types.array(value);
      },
      method: function method(value) {
        return typeof value === 'function';
      },
      email: function email(value) {
        return typeof value === 'string' && !!value.match(pattern.email);
      },
      url: function url(value) {
        return typeof value === 'string' && !!value.match(pattern.url);
      },
      hex: function hex(value) {
        return typeof value === 'string' && !!value.match(pattern.hex);
      }
    };

    /**
     *  Rule for validating the type of a value.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function type(rule, value, source, errors, options) {
      if (rule.required && value === undefined) {
        required(rule, value, source, errors, options);
        return;
      }
      var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
      var ruleType = rule.type;
      if (custom.indexOf(ruleType) > -1) {
        if (!types[ruleType](value)) {
          errors.push(util.format(options.messages.types[ruleType], rule.fullField, rule.type));
        }
        // straight typeof check
      } else if (ruleType && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== rule.type) {
          errors.push(util.format(options.messages.types[ruleType], rule.fullField, rule.type));
        }
    }

    /**
     *  Rule for validating whitespace.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function whitespace(rule, value, source, errors, options) {
      if (/^\s+$/.test(value) || value === '') {
        errors.push(util.format(options.messages.whitespace, rule.fullField));
      }
    }

    return {
      required: required,
      whitespace: whitespace,
      type: type,
      range: range,
      'enum': enumerable,
      pattern: pattern_r
    };
  })();

  /////////////////////////

  var validators = (function () {
    /**
     *  Validates an array.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function array(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, 'array') && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options, 'array');
        if (!isEmptyValue(value, 'array')) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a boolean.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function boolean(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    function date(rule, value, callback, source, options) {
      // console.log('integer rule called %j', rule);
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      // console.log('validate on %s value', value);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (!isEmptyValue(value)) {
          rules.type(rule, value, source, errors, options);
          if (value) {
            rules.range(rule, value.getTime(), source, errors, options);
          }
        }
      }
      callback(errors);
    }

    /**
     *  Validates an enumerable list.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function enumerable(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value) {
          rules[ENUM](rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a number is a floating point number.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function floatFn(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a number is an integer.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function integer(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a function.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function method(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a number.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function number(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates an object.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function object(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a regular expression pattern.
     *
     *  Performs validation when a rule only contains
     *  a pattern property but is not declared as a string type.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function pattern(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, 'string') && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (!isEmptyValue(value, 'string')) {
          rules.pattern(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates the regular expression type.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function regexp(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (!isEmptyValue(value)) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Performs validation for string types.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function string(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, 'string') && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options, 'string');
        if (!isEmptyValue(value, 'string')) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
          rules.pattern(rule, value, source, errors, options);
          if (rule.whitespace === true) {
            rules.whitespace(rule, value, source, errors, options);
          }
        }
      }
      callback(errors);
    }

    function type(rule, value, callback, source, options) {
      var ruleType = rule.type;
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, ruleType) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options, ruleType);
        if (!isEmptyValue(value, ruleType)) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    return {
      string: string,
      method: method,
      number: number,
      boolean: boolean,
      regexp: regexp,
      integer: integer,
      'float': floatFn,
      array: array,
      object: object,
      'enum': enumerable,
      pattern: pattern,
      email: type,
      url: type,
      date: date,
      hex: type
    };
  })();

  //////////////////

  var error = rules;
  var _ref = _;
  var mergeWith = _ref.mergeWith;

  function mergeCustomizer(objValue, srcValue) {
    if ((typeof objValue === 'undefined' ? 'undefined' : _typeof(objValue)) !== 'object') {
      return srcValue;
    }
  }

  /**
   *  Encapsulates a validation schema.
   *
   *  @param descriptor An object declaring validation rules
   *  for this schema.
   */
  function Schema(descriptor) {
    this.rules = null;
    this._messages = defaultMessages;
    this.define(descriptor);
  }

  Schema.prototype = {
    messages: function messages(_messages) {
      if (_messages) {
        this._messages = mergeWith(newMessages(), _messages, mergeCustomizer);
      }
      return this._messages;
    },
    define: function define(rules) {
      if (!rules) {
        throw new Error('Cannot configure a schema with no rules');
      }
      if ((typeof rules === 'undefined' ? 'undefined' : _typeof(rules)) !== 'object' || Array.isArray(rules)) {
        throw new Error('Rules must be an object');
      }
      this.rules = {};
      var z = undefined;
      var item = undefined;
      for (z in rules) {
        if (rules.hasOwnProperty(z)) {
          item = rules[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_) {
      var _this = this;

      var o = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var oc = arguments[2];

      var source = source_;
      var options = o;
      if (!this.rules) {
        throw new Error('Cannot validate with no rules.');
      }
      var callback = oc;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      function complete(results) {
        var i = undefined;
        var field = undefined;
        var errors = [];
        var fields = {};

        function add(e) {
          if (Array.isArray(e)) {
            errors = errors.concat.apply(errors, e);
          } else {
            errors.push(e);
          }
        }

        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          for (i = 0; i < errors.length; i++) {
            field = errors[i].field;
            fields[field] = fields[field] || [];
            fields[field].push(errors[i]);
          }
        }
        callback(errors, fields);
      }

      if (options.messages) {
        var messages = this.messages();
        if (messages === defaultMessages) {
          messages = newMessages();
        }
        mergeWith(messages, options.messages, mergeCustomizer);
        options.messages = messages;
      } else {
        options.messages = this.messages();
      }

      options.error = error;
      var arr = undefined;
      var value = undefined;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function (z) {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach(function (r) {
          var rule = r;
          if (typeof rule.transform === 'function') {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === 'function') {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          rule.validator = _this.getValidationMethod(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule: rule,
            value: value,
            source: source,
            field: z
          });
        });
      });
      var errorFields = {};
      asyncMap(series, options, function (data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === 'object' || rule.type === 'array') && _typeof(rule.fields) === 'object';
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function cb() {
          var e = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }

          errors = errors.map(complementError(rule));

          if ((options.first || options.fieldFirst) && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            // if rule is required but the target object
            // does not exist fail at the rule level and don't
            // go deeper
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              }
              return doIt(errors);
            }
            var fieldsSchema = data.rule.fields;
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = fieldsSchema[f];
                fieldSchema.fullField = rule.fullField + '.' + f;
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function (errs) {
              doIt(errs && errs.length ? errors.concat(errs) : errs);
            });
          }
        }

        rule.validator(rule, data.value, cb, data.source, options);
      }, function (results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === undefined && rule.pattern instanceof RegExp) {
        rule.type = 'pattern';
      }
      if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format('Unknown rule type %s', rule.type));
      }
      return rule.type || 'string';
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === 'function') {
        return rule.validator;
      }
      return validators[rule.type] || false;
    }
  };

  Schema.register = function register(type, validator) {
    if (typeof validator !== 'function') {
      throw new Error('Cannot register a validator by type, validator is not a function');
    }
    validators[type] = validator;
  };

  Schema.messages = defaultMessages;
  RC.Schema = Schema;
  RC.AsyncValidator = Schema;
})(Smart.RC);
'use strict';

+(function (RC) {
	var Util = RC.Util;
	var warning = Util.warning;
	var uid = Util.uid;
	var _React = React;
	var PropTypes = _React.PropTypes;

	var empty = _.noop;

	function getError(option, xhr) {
		var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
		var err = new Error(msg);
		err.status = xhr.status;
		err.method = 'post';
		err.url = option.action;
		return err;
	}

	function getBody(xhr) {
		var text = xhr.responseText || xhr.response;
		if (!text) {
			return text;
		}

		try {
			return JSON.parse(text);
		} catch (e) {
			return text;
		}
	}

	function request(option) {
		if (typeof XMLHttpRequest === 'undefined') {
			return;
		}

		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			xhr.upload.onprogress = function progress(e) {
				if (e.total > 0) {
					e.percent = e.loaded / e.total * 100;
				}
				option.onProgress(e);
			};
		}

		var formData = new FormData();
		formData.append(option.filename, option.file);
		if (option.data) {
			Object.keys(option.data).map(function (key) {
				formData.append(key, option.data[key]);
			});
		}

		xhr.onerror = function error(e) {
			option.onError(e);
		};

		xhr.onload = function onload() {
			if (xhr.status !== 200) {
				return option.onError(getError(option, xhr), getBody(xhr));
			}

			option.onSuccess(getBody(xhr));
		};

		if (option.withCredentials && 'withCredentials' in xhr) {
			xhr.withCredentials = true;
		}

		xhr.open('post', option.action, true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		var headers = option.headers || {};
		for (var h in headers) {
			if (headers.hasOwnProperty(h)) {
				xhr.setRequestHeader(h, headers[h]);
			}
		}
		xhr.send(formData);
	}

	var iframeStyle = {
		position: 'absolute',
		top: 0,
		opacity: 0,
		filter: 'alpha(opacity=0)',
		left: 0,
		zIndex: 9999
	};
	var IframeUploader = React.createClass({
		displayName: 'IframeUploader',

		propTypes: {
			onStart: PropTypes.func,
			multiple: PropTypes.bool,
			children: PropTypes.any,
			data: PropTypes.object,
			action: PropTypes.string,
			name: PropTypes.string
		},

		componentDidMount: function componentDidMount() {
			this.updateIframeWH();
			this.initIframe();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateIframeWH();
		},
		onLoad: function onLoad() {
			if (!this.loading) {
				return;
			}
			var props = this.props;
			var response = undefined;
			var eventFile = this.file;
			try {
				var doc = this.getIframeDocument();
				var script = doc.getElementsByTagName('script')[0];
				if (script && script.parentNode === doc.body) {
					doc.body.removeChild(script);
				}
				response = doc.body.innerHTML;
				props.onSuccess(response, eventFile);
			} catch (err) {
				warning(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
				response = 'cross-domain';
				props.onError(err, null, eventFile);
			}
			this.enableIframe();
			this.initIframe();
		},
		onChange: function onChange() {
			var target = this.getFormInputNode();
			// ie8/9 don't support FileList Object
			// http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
			var file = this.file = {
				uid: uid(),
				name: target.value
			};
			this.props.onStart(this.getFileForMultiple(file));
			var formNode = this.getFormNode();
			var dataSpan = this.getFormDataNode();
			var data = this.props.data;
			if (typeof data === 'function') {
				data = data();
			}
			var inputs = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
				}
			}
			dataSpan.innerHTML = inputs.join('');
			formNode.submit();
			dataSpan.innerHTML = '';
			this.disabledIframe();
		},
		getIframeNode: function getIframeNode() {
			return this.refs.iframe;
		},
		getIframeDocument: function getIframeDocument() {
			return this.getIframeNode().contentDocument;
		},
		getFormNode: function getFormNode() {
			return this.getIframeDocument().getElementById('form');
		},
		getFormInputNode: function getFormInputNode() {
			return this.getIframeDocument().getElementById('input');
		},
		getFormDataNode: function getFormDataNode() {
			return this.getIframeDocument().getElementById('data');
		},
		getFileForMultiple: function getFileForMultiple(file) {
			return this.props.multiple ? [file] : file;
		},
		getIframeHTML: function getIframeHTML(domain) {
			var domainScript = '';
			var domainInput = '';
			if (domain) {
				domainScript = '<script>document.domain="' + domain + '";</script>';
				domainInput = '<input name="_documentDomain" value="' + domain + '" />';
			}
			return '\n\t    <!DOCTYPE html>\n\t    <html>\n\t    <head>\n\t    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t    <style>\n\t    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n\t    </style>\n\t    ' + domainScript + '\n\t    </head>\n\t    <body>\n\t    <form method="post"\n\t    encType="multipart/form-data"\n\t    action="' + this.props.action + '" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">\n\t    <input id="input" type="file"\n\t     name="' + this.props.name + '"\n\t     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>\n\t    ' + domainInput + '\n\t    <span id="data"></span>\n\t    </form>\n\t    </body>\n\t    </html>\n\t    ';
		},
		initIframeSrc: function initIframeSrc() {
			if (this.domain) {
				this.getIframeNode().src = 'javascript:void((function(){\n\t        var d = document;\n\t        d.open();\n\t        d.domain=\'' + this.domain + '\';\n\t        d.write(\'\');\n\t        d.close();\n\t      })())';
			}
		},
		initIframe: function initIframe() {
			var iframeNode = this.getIframeNode();
			var win = iframeNode.contentWindow;
			var doc = undefined;
			this.domain = this.domain || '';
			this.initIframeSrc();
			try {
				doc = win.document;
			} catch (e) {
				this.domain = document.domain;
				this.initIframeSrc();
				win = iframeNode.contentWindow;
				doc = win.document;
			}
			doc.open('text/html', 'replace');
			doc.write(this.getIframeHTML(this.domain));
			doc.close();
			this.getFormInputNode().onchange = this.onChange;
		},
		enableIframe: function enableIframe() {
			this.loading = false;
			this.getIframeNode().style.display = '';
		},
		disabledIframe: function disabledIframe() {
			this.loading = true;
			this.getIframeNode().style.display = 'none';
		},
		updateIframeWH: function updateIframeWH() {
			var rootNode = ReactDOM.findDOMNode(this);
			var iframeNode = this.getIframeNode();
			iframeNode.style.height = rootNode.offsetHeight + 'px';
			iframeNode.style.width = rootNode.offsetWidth + 'px';
		},
		render: function render() {
			return React.createElement(
				'span',
				{ style: { position: 'relative', zIndex: 0 } },
				React.createElement('iframe', { ref: 'iframe',
					onLoad: this.onLoad,
					style: iframeStyle }),
				this.props.children
			);
		}
	});

	var AjaxUpload = React.createClass({
		displayName: 'AjaxUpload',

		propTypes: {
			multiple: PropTypes.bool,
			onStart: PropTypes.func,
			data: PropTypes.object,
			headers: PropTypes.object,
			beforeUpload: PropTypes.func,
			withCredentials: PropTypes.bool
		},

		onChange: function onChange(e) {
			var files = e.target.files;
			this.uploadFiles(files);
		},
		onClick: function onClick() {
			var el = this.refs.file;
			if (!el) {
				return;
			}
			el.click();
			el.value = '';
		},
		onKeyDown: function onKeyDown(e) {
			if (e.key === 'Enter') {
				this.onClick();
			}
		},
		onFileDrop: function onFileDrop(e) {
			if (e.type === 'dragover') {
				return e.preventDefault();
			}

			var files = e.dataTransfer.files;
			this.uploadFiles(files);

			e.preventDefault();
		},
		uploadFiles: function uploadFiles(files) {
			var len = files.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var file = files.item(i);
					file.uid = uid();
					this.upload(file);
				}
				if (this.props.multiple) {
					this.props.onStart(Array.prototype.slice.call(files));
				} else {
					this.props.onStart(Array.prototype.slice.call(files)[0]);
				}
			}
		},
		upload: function upload(file) {
			var _this = this;

			var props = this.props;
			if (!props.beforeUpload) {
				return this.post(file);
			}

			var before = props.beforeUpload(file);
			if (before && before.then) {
				before.then(function () {
					_this.post(file);
				});
			} else if (before !== false) {
				this.post(file);
			}
		},
		post: function post(file) {
			var props = this.props;
			var data = props.data;
			if (typeof data === 'function') {
				data = data();
			}

			request({
				action: props.action,
				filename: props.name,
				file: file,
				data: data,
				headers: props.headers,
				withCredentials: props.withCredentials,
				onProgress: function onProgress(e) {
					props.onProgress(e, file);
				},
				onSuccess: function onSuccess(ret) {
					props.onSuccess(ret, file);
				},
				onError: function onError(err, ret) {
					props.onError(err, ret, file);
				}
			});
		},
		render: function render() {
			var hidden = { display: 'none' };
			var props = this.props;
			return React.createElement(
				'span',
				{
					onClick: this.onClick,
					onKeyDown: this.onKeyDown,
					onDrop: this.onFileDrop,
					onDragOver: this.onFileDrop,
					role: 'button',
					tabIndex: '0'
				},
				React.createElement('input', { type: 'file',
					ref: 'file',
					style: hidden,
					accept: props.accept,
					multiple: this.props.multiple,
					onChange: this.onChange }),
				props.children
			);
		}
	});

	var Upload = React.createClass({
		displayName: 'Upload',

		propTypes: {
			forceAjax: PropTypes.bool,
			action: PropTypes.string,
			name: PropTypes.string,
			multipart: PropTypes.bool,
			onError: PropTypes.func,
			onSuccess: PropTypes.func,
			onProgress: PropTypes.func,
			onStart: PropTypes.func,
			data: PropTypes.object,
			headers: PropTypes.object,
			accept: PropTypes.string,
			multiple: PropTypes.bool,
			beforeUpload: PropTypes.func,
			withCredentials: PropTypes.bool
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: {},
				headers: {},
				name: 'file',
				forceAjax: false,
				multipart: false,
				onProgress: empty,
				onStart: empty,
				onError: empty,
				onSuccess: empty,
				multiple: false,
				beforeUpload: null,
				withCredentials: false
			};
		},
		render: function render() {
			var props = this.props;
			// node 渲染根据 ua 强制设置 forceAjax 或者支持FormData的情况使用AjaxUpload
			if (props.forceAjax || typeof FormData !== 'undefined') {
				return React.createElement(AjaxUpload, props);
			}

			return React.createElement(IframeUpload, props);
		}
	});

	RC.Upload = Upload;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (RC) {
	var classNames = RC.classNames;

	var Step = React.createClass({
		displayName: 'Step',

		propTypes: {
			className: React.PropTypes.string,
			prefixCls: React.PropTypes.string,
			style: React.PropTypes.object,
			tailWidth: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
			status: React.PropTypes.string,
			iconPrefix: React.PropTypes.string,
			icon: React.PropTypes.string,
			//maxDescriptionWidth: React.PropTypes.number,
			maxDescriptionWidth: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
			stepLast: React.PropTypes.bool,
			stepNumber: React.PropTypes.string,
			description: React.PropTypes.any,
			title: React.PropTypes.any
		},
		render: function render() {
			var _classNames, _classNames2;

			var _props = this.props;
			var className = _props.className;
			var prefixCls = _props.prefixCls;
			var style = _props.style;
			var tailWidth = _props.tailWidth;
			var _props$status = _props.status;
			var status = _props$status === undefined ? 'wait' : _props$status;
			var iconPrefix = _props.iconPrefix;
			var icon = _props.icon;
			var maxDescriptionWidth = _props.maxDescriptionWidth;
			var stepLast = _props.stepLast;
			var stepNumber = _props.stepNumber;
			var description = _props.description;
			var title = _props.title;

			var restProps = _objectWithoutProperties(_props, ['className', 'prefixCls', 'style', 'tailWidth', 'status', 'iconPrefix', 'icon', 'maxDescriptionWidth', 'stepLast', 'stepNumber', 'description', 'title']);

			var iconClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-icon', true), _defineProperty(_classNames, iconPrefix + 'icon', true), _defineProperty(_classNames, iconPrefix + 'icon-' + (icon || 'check'), true), _classNames));
			var iconNode = icon || status === 'finish' ? React.createElement('span', { className: iconClassName }) : React.createElement(
				'span',
				{ className: prefixCls + '-icon' },
				stepNumber
			);
			var classString = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-item', true), _defineProperty(_classNames2, prefixCls + '-item-last', stepLast), _defineProperty(_classNames2, prefixCls + '-status-' + status, true), _defineProperty(_classNames2, prefixCls + '-custom', icon), _classNames2));
			return React.createElement(
				'div',
				_extends({}, restProps, { className: classString, style: { width: tailWidth } }),
				stepLast ? '' : React.createElement(
					'div',
					{ className: prefixCls + '-tail' },
					React.createElement('i', null)
				),
				React.createElement(
					'div',
					{ className: prefixCls + '-head' },
					React.createElement(
						'div',
						{ className: prefixCls + '-head-inner' },
						iconNode
					)
				),
				React.createElement(
					'div',
					{ className: prefixCls + '-main', style: { maxWidth: maxDescriptionWidth } },
					React.createElement(
						'div',
						{ className: prefixCls + '-title' },
						title
					),
					description ? React.createElement(
						'div',
						{ className: prefixCls + '-description' },
						description
					) : ''
				)
			);
		}
	});

	var Steps = React.createClass({
		displayName: 'Steps',

		propTypes: {
			direction: React.PropTypes.string,
			children: React.PropTypes.any
		},
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-steps',
				iconPrefix: 'rc',
				maxDescriptionWidth: 120,
				direction: '',
				current: 0
			};
		},
		getInitialState: function getInitialState() {
			return {
				init: false,
				tailWidth: 0
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			if (this.props.direction === 'vertical') {
				return;
			}
			var $dom = ReactDOM.findDOMNode(this);
			var len = $dom.children.length - 1;
			this._itemsWidth = new Array(len + 1);

			var i = undefined;
			for (i = 0; i <= len - 1; i++) {
				var $item = $dom.children[i].children;
				this._itemsWidth[i] = Math.ceil($item[0].offsetWidth + $item[1].children[0].offsetWidth);
			}
			this._itemsWidth[i] = Math.ceil($dom.children[len].offsetWidth);
			this._previousStepsWidth = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
			this._update();

			/*
    * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
    * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
    */
			$dom.children[len].style.position = 'absolute';

			/*
    * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
    * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
    * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，_resize里面会判断要不要更新。
    */
			setTimeout(function () {
				_this._resize();
			});

			if (window.attachEvent) {
				window.attachEvent('onresize', this._resize);
			} else {
				window.addEventListener('resize', this._resize);
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			this._resize();
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.props.direction === 'vertical') {
				return;
			}
			if (window.attachEvent) {
				window.detachEvent('onresize', this._resize);
			} else {
				window.removeEventListener('resize', this._resize);
			}
		},

		_previousStepsWidth: 0,
		_itemsWidth: [],
		_resize: function _resize() {
			var w = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
			if (this._previousStepsWidth === w) {
				return;
			}
			this._previousStepsWidth = w;
			this._update();
		},
		_update: function _update() {
			var len = this.props.children.length - 1;
			var tw = 0;
			this._itemsWidth.forEach(function (w) {
				tw += w;
			});
			var dw = Math.floor((this._previousStepsWidth - tw) / len) - 1;
			if (dw <= 0) {
				return;
			}
			this.setState({
				init: true,
				tailWidth: dw
			});
		},
		render: function render() {
			var _this2 = this;

			var props = this.props;
			var prefixCls = props.prefixCls;
			var children = props.children;
			var maxDescriptionWidth = props.maxDescriptionWidth;
			var iconPrefix = props.iconPrefix;
			var len = children.length - 1;
			var iws = this._itemsWidth;
			var clsName = prefixCls;
			clsName += props.size === 'small' ? ' ' + prefixCls + '-small' : '';
			clsName += props.direction === 'vertical' ? ' ' + prefixCls + '-vertical' : '';

			return React.createElement(
				'div',
				{ className: clsName },
				React.Children.map(children, function (ele, idx) {
					var np = {
						stepNumber: (idx + 1).toString(),
						stepLast: idx === len,
						tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + _this2.state.tailWidth,
						prefixCls: prefixCls,
						iconPrefix: iconPrefix,
						maxDescriptionWidth: maxDescriptionWidth
					};
					if (!ele.props.status) {
						if (idx === props.current) {
							np.status = 'process';
						} else if (idx < props.current) {
							np.status = 'finish';
						} else {
							np.status = 'wait';
						}
					}
					return React.cloneElement(ele, np);
				}, this)
			);
		}
	});

	Steps.Step = Step;
	RC.Steps = Steps;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export this package's api
+(function (RC) {
	var Trigger = RC.Trigger;
	var arrayTreeFilter = RC.arrayTreeFilter;
	var _ReactDOM = ReactDOM;
	var findDOMNode = _ReactDOM.findDOMNode;

	var Menus = (function (_React$Component) {
		_inherits(Menus, _React$Component);

		function Menus(props) {
			_classCallCheck(this, Menus);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menus).call(this));

			var value = props.value;
			var defaultValue = props.defaultValue;

			var initialValue = value || defaultValue || [];
			_this.state = {
				activeValue: initialValue,
				value: initialValue
			};
			return _this;
		}

		_createClass(Menus, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.scrollActiveItemToView();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('value' in nextProps) {
					this.setState({
						value: nextProps.value || []
					});
				}
				// sync activeValue with value when panel open
				if (nextProps.visible && !this.props.visible) {
					this.setState({
						activeValue: this.state.value
					});
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				if (!prevProps.visible && this.props.visible) {
					this.scrollActiveItemToView();
				}
			}
		}, {
			key: 'onSelect',
			value: function onSelect(targetOption, menuIndex) {
				if (!targetOption || targetOption.disabled) {
					return;
				}
				var activeValue = this.state.activeValue;
				activeValue = activeValue.slice(0, menuIndex + 1);
				activeValue[menuIndex] = targetOption.value;
				var activeOptions = this.getActiveOptions(activeValue);
				if (targetOption.isLeaf === false && !targetOption.children && this.props.loadData) {
					this.setState({ activeValue: activeValue });
					this.props.loadData(activeOptions);
					return;
				}
				if (!targetOption.children || !targetOption.children.length) {
					this.props.onChange(activeOptions, { visible: false });
					// set value to activeValue when select leaf option
					this.setState({ value: activeValue });
				} else if (this.props.changeOnSelect) {
					this.props.onChange(activeOptions, { visible: true });
					// set value to activeValue on every select
					this.setState({ value: activeValue });
				}
				this.setState({ activeValue: activeValue });
			}
		}, {
			key: 'getOption',
			value: function getOption(option, menuIndex) {
				var _props = this.props;
				var prefixCls = _props.prefixCls;
				var expandTrigger = _props.expandTrigger;

				var onSelect = this.onSelect.bind(this, option, menuIndex);
				var expandProps = {
					onClick: onSelect
				};
				var menuItemCls = prefixCls + '-menu-item';
				if (expandTrigger === 'hover' && option.children && option.children.length > 0) {
					expandProps = {
						onMouseEnter: onSelect
					};
					menuItemCls += ' ' + prefixCls + '-menu-item-expand';
				}
				if (this.isActiveOption(option)) {
					menuItemCls += ' ' + prefixCls + '-menu-item-active';
					expandProps.ref = 'activeItem' + menuIndex;
				}
				if (option.disabled) {
					menuItemCls += ' ' + prefixCls + '-menu-item-disabled';
				}
				return React.createElement(
					'li',
					_extends({ key: option.value,
						className: menuItemCls,
						title: option.label
					}, expandProps),
					option.label
				);
			}
		}, {
			key: 'getActiveOptions',
			value: function getActiveOptions(values) {
				var activeValue = values || this.state.activeValue;
				var options = this.props.options;
				return arrayTreeFilter(options, function (o, level) {
					return o.value === activeValue[level];
				});
			}
		}, {
			key: 'getShowOptions',
			value: function getShowOptions() {
				var options = this.props.options;

				var result = this.getActiveOptions().map(function (activeOption) {
					return activeOption.children;
				}).filter(function (activeOption) {
					return !!activeOption;
				});
				result.unshift(options);
				return result;
			}
		}, {
			key: 'scrollActiveItemToView',
			value: function scrollActiveItemToView() {
				// scroll into view
				var optionsLength = this.getShowOptions().length;
				for (var i = 0; i < optionsLength; i++) {
					var itemComponent = this.refs['activeItem' + i];
					if (itemComponent) {
						var target = findDOMNode(itemComponent);
						target.parentNode.scrollTop = target.offsetTop;
					}
				}
			}
		}, {
			key: 'isActiveOption',
			value: function isActiveOption(option) {
				return this.state.activeValue.some(function (value) {
					return value === option.value;
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var prefixCls = this.props.prefixCls;

				return React.createElement(
					'div',
					null,
					this.getShowOptions().map(function (options, menuIndex) {
						return React.createElement(
							'ul',
							{ className: prefixCls + '-menu', key: menuIndex },
							options.map(function (option) {
								return _this2.getOption(option, menuIndex);
							})
						);
					})
				);
			}
		}]);

		return Menus;
	})(React.Component);

	Menus.defaultProps = {
		options: [],
		onChange: function onChange() {},
		onSelect: function onSelect() {},

		prefixCls: 'rc-cascader-menus',
		visible: false,
		expandTrigger: 'click',
		changeOnSelect: false
	};

	Menus.propTypes = {
		options: React.PropTypes.array.isRequired,
		prefixCls: React.PropTypes.string,
		expandTrigger: React.PropTypes.string,
		onChange: React.PropTypes.func,
		loadData: React.PropTypes.func,
		visible: React.PropTypes.bool,
		changeOnSelect: React.PropTypes.bool
	};

	var BUILT_IN_PLACEMENTS = {
		bottomLeft: {
			points: ['tl', 'bl'],
			offset: [0, 4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		},
		topLeft: {
			points: ['bl', 'tl'],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		}
	};

	var Cascader = (function (_React$Component2) {
		_inherits(Cascader, _React$Component2);

		function Cascader(props) {
			_classCallCheck(this, Cascader);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Cascader).call(this));

			_this3.state = {
				popupVisible: props.popupVisible
			};
			['handleChange', 'handlePopupVisibleChange', 'setPopupVisible', 'getPopupDOMNode'].forEach(function (method) {
				return _this3[method] = _this3[method].bind(_this3);
			});
			return _this3;
		}

		_createClass(Cascader, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('popupVisible' in nextProps) {
					this.setState({
						popupVisible: nextProps.popupVisible
					});
				}
			}
		}, {
			key: 'getPopupDOMNode',
			value: function getPopupDOMNode() {
				return this.refs.trigger.getPopupDomNode();
			}
		}, {
			key: 'setPopupVisible',
			value: function setPopupVisible(popupVisible) {
				if (!('popupVisible' in this.props)) {
					this.setState({ popupVisible: popupVisible });
				}
				this.props.onPopupVisibleChange(popupVisible);
			}
		}, {
			key: 'handleChange',
			value: function handleChange(options, setProps) {
				this.props.onChange(options.map(function (o) {
					return o.value;
				}), options);
				this.setPopupVisible(setProps.visible);
			}
		}, {
			key: 'handlePopupVisibleChange',
			value: function handlePopupVisibleChange(popupVisible) {
				this.setPopupVisible(popupVisible);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var prefixCls = props.prefixCls;
				var transitionName = props.transitionName;
				var popupClassName = props.popupClassName;
				// Did not show popup when there is no options

				var menus = React.createElement('div', null);
				var emptyMenuClassName = '';
				if (props.options && props.options.length > 0) {
					menus = React.createElement(Menus, _extends({}, props, {
						onChange: this.handleChange,
						onSelect: this.props.onSelect,
						visible: this.state.popupVisible }));
				} else {
					emptyMenuClassName = ' ' + prefixCls + '-menus-empty';
				}
				return React.createElement(
					Trigger,
					{ ref: 'trigger',
						popupPlacement: 'bottomLeft',
						builtinPlacements: BUILT_IN_PLACEMENTS,
						popupTransitionName: transitionName,
						action: props.disabled ? [] : ['click'],
						popupVisible: props.disabled ? false : this.state.popupVisible,
						onPopupVisibleChange: this.handlePopupVisibleChange,
						prefixCls: prefixCls + '-menus',
						popupClassName: popupClassName + emptyMenuClassName,
						popup: menus },
					props.children
				);
			}
		}]);

		return Cascader;
	})(React.Component);

	Cascader.defaultProps = {
		options: [],
		onChange: function onChange() {},
		onSelect: function onSelect() {},
		onPopupVisibleChange: function onPopupVisibleChange() {},

		disabled: false,
		transitionName: '',
		prefixCls: 'rc-cascader',
		popupClassName: ''
	};

	Cascader.propTypes = {
		options: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		onPopupVisibleChange: React.PropTypes.func,
		popupVisible: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		transitionName: React.PropTypes.string,
		popupClassName: React.PropTypes.string,
		prefixCls: React.PropTypes.string
	};

	RC.Cascader = Cascader;
})(Smart.RC);
'use strict';

+(function (RC) {
	var Locale = RC.Locale;
	var Util = RC.Util;
	var warning = Util.warning;

	var toInt = parseInt;
	/*
  * @ignore
  * const for gregorian date
  * @author yiminghe@gmail.com
  */

	var Const = {
		/*
   * Enum indicating sunday
   * @type Number
   * @member Date.Gregorian
   */
		SUNDAY: 0,
		/*
   * Enum indicating monday
   * @type Number
   * @member Date.Gregorian
   */
		MONDAY: 1,
		/*
   * Enum indicating tuesday
   * @type Number
   * @member Date.Gregorian
   */
		TUESDAY: 2,
		/*
   * Enum indicating wednesday
   * @type Number
   * @member Date.Gregorian
   */
		WEDNESDAY: 3,
		/*
   * Enum indicating thursday
   * @type Number
   * @member Date.Gregorian
   */
		THURSDAY: 4,
		/*
   * Enum indicating friday
   * @type Number
   * @member Date.Gregorian
   */
		FRIDAY: 5,
		/*
   * Enum indicating saturday
   * @type Number
   * @member Date.Gregorian
   */
		SATURDAY: 6,
		/*
   * Enum indicating january
   * @type Number
   * @member Date.Gregorian
   */
		JANUARY: 0,
		/*
   * Enum indicating february
   * @type Number
   * @member Date.Gregorian
   */
		FEBRUARY: 1,
		/*
   * Enum indicating march
   * @type Number
   * @member Date.Gregorian
   */
		MARCH: 2,
		/*
   * Enum indicating april
   * @type Number
   * @member Date.Gregorian
   */
		APRIL: 3,
		/*
   * Enum indicating may
   * @type Number
   * @member Date.Gregorian
   */
		MAY: 4,
		/*
   * Enum indicating june
   * @type Number
   * @member Date.Gregorian
   */
		JUNE: 5,
		/*
   * Enum indicating july
   * @type Number
   * @member Date.Gregorian
   */
		JULY: 6,
		/*
   * Enum indicating august
   * @type Number
   * @member Date.Gregorian
   */
		AUGUST: 7,
		/*
   * Enum indicating september
   * @type Number
   * @member Date.Gregorian
   */
		SEPTEMBER: 8,
		/*
   * Enum indicating october
   * @type Number
   * @member Date.Gregorian
   */
		OCTOBER: 9,
		/*
   * Enum indicating november
   * @type Number
   * @member Date.Gregorian
   */
		NOVEMBER: 10,
		/*
   * Enum indicating december
   * @type Number
   * @member Date.Gregorian
   */
		DECEMBER: 11
	};

	/*
  * utils for gregorian date
  * @ignore
  * @author yiminghe@gmail.com
  */

	var floor = Math.floor;
	var ACCUMULATED_DAYS_IN_MONTH
	//   1/1 2/1 3/1 4/1 5/1 6/1 7/1 8/1 9/1 10/1 11/1 12/1
	= [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

	var ACCUMULATED_DAYS_IN_MONTH_LEAP
	//   1/1 2/1   3/1   4/1   5/1   6/1   7/1   8/1   9/1
	// 10/1   11/1   12/1
	= [0, 31, 59 + 1, 90 + 1, 120 + 1, 151 + 1, 181 + 1, 212 + 1, 243 + 1, 273 + 1, 304 + 1, 334 + 1];

	var DAYS_OF_YEAR = 365;
	var DAYS_OF_4YEAR = 365 * 4 + 1;
	var DAYS_OF_100YEAR = DAYS_OF_4YEAR * 25 - 1;
	var DAYS_OF_400YEAR = DAYS_OF_100YEAR * 4 + 1;
	var exports = {};

	function getDayOfYear(year, month, dayOfMonth) {
		return dayOfMonth + (exports.isLeapYear(year) ? ACCUMULATED_DAYS_IN_MONTH_LEAP[month] : ACCUMULATED_DAYS_IN_MONTH[month]);
	}

	function getDayOfWeekFromFixedDate(fixedDate) {
		// The fixed day 1 (January 1, 1 Gregorian) is Monday.
		if (fixedDate >= 0) {
			return fixedDate % 7;
		}
		return exports.mod(fixedDate, 7);
	}

	function getGregorianYearFromFixedDate(fixedDate) {
		var d0 = undefined;
		var d1 = undefined;
		var d2 = undefined;
		var d3 = undefined;
		var n400 = undefined;
		var n100 = undefined;
		var n4 = undefined;
		var n1 = undefined;
		var year = undefined;
		d0 = fixedDate - 1;

		n400 = floor(d0 / DAYS_OF_400YEAR);
		d1 = exports.mod(d0, DAYS_OF_400YEAR);
		n100 = floor(d1 / DAYS_OF_100YEAR);
		d2 = exports.mod(d1, DAYS_OF_100YEAR);
		n4 = floor(d2 / DAYS_OF_4YEAR);
		d3 = exports.mod(d2, DAYS_OF_4YEAR);
		n1 = floor(d3 / DAYS_OF_YEAR);

		year = 400 * n400 + 100 * n100 + 4 * n4 + n1;

		// ?
		if (!(n100 === 4 || n1 === 4)) {
			++year;
		}

		return year;
	}

	var Utils = exports = {
		each: function each(arr, fn) {
			for (var i = 0, len = arr.length; i < len; i++) {
				if (fn(arr[i], i, arr) === false) {
					break;
				}
			}
		},
		mix: function mix(t, s) {
			for (var p in s) {
				if (s.hasOwnProperty(p)) {
					t[p] = s[p];
				}
			}
		},
		isLeapYear: function isLeapYear(year) {
			if ((year & 3) !== 0) {
				return false;
			}
			return year % 100 !== 0 || year % 400 === 0;
		},
		mod: function mod(x, y) {
			// 负数时不是镜像关系
			return x - y * floor(x / y);
		},

		// month: 0 based
		getFixedDate: function getFixedDate(year, month, dayOfMonth) {
			var prevYear = year - 1;
			// 考虑公元前
			return DAYS_OF_YEAR * prevYear + floor(prevYear / 4) - floor(prevYear / 100) + floor(prevYear / 400) + getDayOfYear(year, month, dayOfMonth);
		},
		getGregorianDateFromFixedDate: function getGregorianDateFromFixedDate(fixedDate) {
			var year = getGregorianYearFromFixedDate(fixedDate);
			var jan1 = exports.getFixedDate(year, Const.JANUARY, 1);
			var isLeap = exports.isLeapYear(year);
			var ACCUMULATED_DAYS = isLeap ? ACCUMULATED_DAYS_IN_MONTH_LEAP : ACCUMULATED_DAYS_IN_MONTH;
			var daysDiff = fixedDate - jan1;
			var month = undefined;

			for (var i = 0; i < ACCUMULATED_DAYS.length; i++) {
				if (ACCUMULATED_DAYS[i] <= daysDiff) {
					month = i;
				} else {
					break;
				}
			}

			var dayOfMonth = fixedDate - jan1 - ACCUMULATED_DAYS[month] + 1;
			var dayOfWeek = getDayOfWeekFromFixedDate(fixedDate);

			return {
				year: year,
				month: month,
				dayOfMonth: dayOfMonth,
				dayOfWeek: dayOfWeek,
				isLeap: isLeap
			};
		}
	};

	var defaultLocale = Locale.GregorianCalendar;

	/*
 * GregorianCalendar class.
 *
 * - no arguments:
 *   Constructs a default GregorianCalendar using the current time
 *   in the default time zone with the default locale.
 * - one argument locale:
 *   Constructs a GregorianCalendar
 *   based on the current time in the default time zone with the given locale.
 *
 * @class Date.Gregorian
 */
	function GregorianCalendar(loc) {
		var locale = loc || defaultLocale;

		this.locale = locale;

		this.fields = [];

		/*
   * The currently set time for this date.
   * @protected
   * @type Number|undefined
   */
		this.time = undefined;
		/*
   * The timezoneOffset in minutes used by this date.
   * @type Number
   * @protected
   */

		this.timezoneOffset = locale.timezoneOffset;

		/*
   * The first day of the week
   * @type Number
   * @protected
   */
		this.firstDayOfWeek = locale.firstDayOfWeek;

		/*
   * The number of days required for the first week in a month or year,
   * with possible values from 1 to 7.
   * @@protected
   * @type Number
   */
		this.minimalDaysInFirstWeek = locale.minimalDaysInFirstWeek;

		this.fieldsComputed = false;
	}

	Utils.mix(GregorianCalendar, Const);

	Utils.mix(GregorianCalendar, {
		Utils: Utils,

		defaultLocale: defaultLocale,

		/*
   * Determines if the given year is a leap year.
   * Returns true if the given year is a leap year. To specify BC year numbers,
   * 1 - year number must be given. For example, year BC 4 is specified as -3.
   * @param {Number} year the given year.
   * @returns {Boolean} true if the given year is a leap year; false otherwise.
   * @static
   * @method
   */
		isLeapYear: Utils.isLeapYear,

		/*
   * Enum indicating year field of date
   * @type Number
   */
		YEAR: 1,
		/*
   * Enum indicating month field of date
   * @type Number
   */
		MONTH: 2,
		/*
   * Enum indicating the day of the month
   * @type Number
   */
		DAY_OF_MONTH: 3,
		/*
   * Enum indicating the hour (24).
   * @type Number
   */
		HOUR_OF_DAY: 4,
		/*
   * Enum indicating the minute of the day
   * @type Number
   */
		MINUTES: 5,
		/*
   * Enum indicating the second of the day
   * @type Number
   */
		SECONDS: 6,
		/*
   * Enum indicating the millisecond of the day
   * @type Number
   */
		MILLISECONDS: 7,
		/*
   * Enum indicating the week number within the current year
   * @type Number
   */
		WEEK_OF_YEAR: 8,
		/*
   * Enum indicating the week number within the current month
   * @type Number
   */
		WEEK_OF_MONTH: 9,

		/*
   * Enum indicating the day of the day number within the current year
   * @type Number
   */
		DAY_OF_YEAR: 10,
		/*
   * Enum indicating the day of the week
   * @type Number
   */
		DAY_OF_WEEK: 11,
		/*
   * Enum indicating the day of the ordinal number of the day of the week
   * @type Number
   */
		DAY_OF_WEEK_IN_MONTH: 12,

		/*
   * Enum indicating am
   * @type Number
   */
		AM: 0,
		/*
   * Enum indicating pm
   * @type Number
   */
		PM: 1
	});

	var FIELDS = ['', 'Year', 'Month', 'DayOfMonth', 'HourOfDay', 'Minutes', 'Seconds', 'Milliseconds', 'WeekOfYear', 'WeekOfMonth', 'DayOfYear', 'DayOfWeek', 'DayOfWeekInMonth'];

	var YEAR = GregorianCalendar.YEAR;
	var MONTH = GregorianCalendar.MONTH;
	var DAY_OF_MONTH = GregorianCalendar.DAY_OF_MONTH;
	var HOUR_OF_DAY = GregorianCalendar.HOUR_OF_DAY;
	var MINUTE = GregorianCalendar.MINUTES;
	var SECONDS = GregorianCalendar.SECONDS;

	var MILLISECONDS = GregorianCalendar.MILLISECONDS;
	var DAY_OF_WEEK_IN_MONTH = GregorianCalendar.DAY_OF_WEEK_IN_MONTH;
	var DAY_OF_YEAR = GregorianCalendar.DAY_OF_YEAR;
	var DAY_OF_WEEK = GregorianCalendar.DAY_OF_WEEK;

	var WEEK_OF_MONTH = GregorianCalendar.WEEK_OF_MONTH;
	var WEEK_OF_YEAR = GregorianCalendar.WEEK_OF_YEAR;

	var MONTH_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based
	var LEAP_MONTH_LENGTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0-based

	var ONE_SECOND = 1000;
	var ONE_MINUTE = 60 * ONE_SECOND;
	var ONE_HOUR = 60 * ONE_MINUTE;
	var ONE_DAY = 24 * ONE_HOUR;
	var ONE_WEEK = ONE_DAY * 7;

	var EPOCH_OFFSET = 719163; // Fixed date of January 1, 1970 (Gregorian)

	var mod = Utils.mod;
	var _isLeapYear = Utils.isLeapYear;
	var floorDivide = Math.floor;

	var MIN_VALUES = [undefined, 1, // YEAR
	GregorianCalendar.JANUARY, // MONTH
	1, // DAY_OF_MONTH
	0, // HOUR_OF_DAY
	0, // MINUTE
	0, // SECONDS
	0, // MILLISECONDS

	1, // WEEK_OF_YEAR
	undefined, // WEEK_OF_MONTH

	1, // DAY_OF_YEAR
	GregorianCalendar.SUNDAY, // DAY_OF_WEEK
	1];

	// DAY_OF_WEEK_IN_MONTH
	var MAX_VALUES = [undefined, 292278994, // YEAR
	GregorianCalendar.DECEMBER, // MONTH
	undefined, // DAY_OF_MONTH
	23, // HOUR_OF_DAY
	59, // MINUTE
	59, // SECONDS
	999, // MILLISECONDS
	undefined, // WEEK_OF_YEAR
	undefined, // WEEK_OF_MONTH
	undefined, // DAY_OF_YEAR
	GregorianCalendar.SATURDAY, // DAY_OF_WEEK
	undefined];

	// ------------------- private start

	// DAY_OF_WEEK_IN_MONTH
	function getMonthLength(year, month) {
		return _isLeapYear(year) ? LEAP_MONTH_LENGTH[month] : MONTH_LENGTH[month];
	}

	function getYearLength(year) {
		return _isLeapYear(year) ? 366 : 365;
	}

	function adjustDayOfMonth(self) {
		var fields = self.fields;
		var year = fields[YEAR];
		var month = fields[MONTH];
		var monthLen = getMonthLength(year, month);
		var dayOfMonth = fields[DAY_OF_MONTH];
		if (dayOfMonth > monthLen) {
			self.set(DAY_OF_MONTH, monthLen);
		}
	}

	function getDayOfWeekDateOnOrBefore(fixedDate, dayOfWeek) {
		// 1.1.1 is monday
		// one week has 7 days
		return fixedDate - mod(fixedDate - dayOfWeek, 7);
	}

	function getWeekNumber(self, fixedDay1, fixedDate) {
		var fixedDay1st = getDayOfWeekDateOnOrBefore(fixedDay1 + 6, self.firstDayOfWeek);
		var nDays = fixedDay1st - fixedDay1;
		if (nDays >= self.minimalDaysInFirstWeek) {
			fixedDay1st -= 7;
		}
		var normalizedDayOfPeriod = fixedDate - fixedDay1st;
		return floorDivide(normalizedDayOfPeriod / 7) + 1;
	}

	// ------------------- private end

	GregorianCalendar.prototype = {
		constructor: GregorianCalendar,

		isGregorianCalendar: 1,

		/*
   * Determines if current year is a leap year.
   * Returns true if the given year is a leap year. To specify BC year numbers,
   * 1 - year number must be given. For example, year BC 4 is specified as -3.
   * @returns {Boolean} true if the given year is a leap year; false otherwise.
   * @method
   * @member Date.Gregorian
   */
		isLeapYear: function isLeapYear() {
			return _isLeapYear(this.getYear());
		},

		/*
   * Return local info for current date instance
   * @returns {Object}
   */
		getLocale: function getLocale() {
			return this.locale;
		},

		/*
   * Returns the minimum value for
   * the given calendar field of this GregorianCalendar instance.
   * The minimum value is defined as the smallest value
   * returned by the get method for any possible time value,
   * taking into consideration the current values of the getFirstDayOfWeek,
   * getMinimalDaysInFirstWeek.
   * @param field the calendar field.
   * @returns {Number} the minimum value for the given calendar field.
   */
		getActualMinimum: function getActualMinimum(field) {
			if (MIN_VALUES[field] !== undefined) {
				return MIN_VALUES[field];
			}
			if (field === WEEK_OF_MONTH) {
				var cal = this.clone();
				cal.clear();
				cal.set(this.fields[YEAR], this.fields[MONTH], 1);
				return cal.get(WEEK_OF_MONTH);
			}

			throw new Error('minimum value not defined!');
		},

		/*
   * Returns the maximum value for the given calendar field
   * of this GregorianCalendar instance.
   * The maximum value is defined as the largest value returned
   * by the get method for any possible time value, taking into consideration
   * the current values of the getFirstDayOfWeek, getMinimalDaysInFirstWeek methods.
   * @param field the calendar field.
   * @returns {Number} the maximum value for the given calendar field.
   */
		getActualMaximum: function getActualMaximum(field) {
			if (MAX_VALUES[field] !== undefined) {
				return MAX_VALUES[field];
			}
			var value = undefined;
			var fields = this.fields;
			switch (field) {
				case DAY_OF_MONTH:
					value = getMonthLength(fields[YEAR], fields[MONTH]);
					break;

				case WEEK_OF_YEAR:
					var endOfYear = this.clone();
					endOfYear.clear();
					endOfYear.set(fields[YEAR], GregorianCalendar.DECEMBER, 31);
					value = endOfYear.get(WEEK_OF_YEAR);
					if (value === 1) {
						value = 52;
					}
					break;

				case WEEK_OF_MONTH:
					var endOfMonth = this.clone();
					endOfMonth.clear();
					endOfMonth.set(fields[YEAR], fields[MONTH], getMonthLength(fields[YEAR], fields[MONTH]));
					value = endOfMonth.get(WEEK_OF_MONTH);
					break;

				case DAY_OF_YEAR:
					value = getYearLength(fields[YEAR]);
					break;

				case DAY_OF_WEEK_IN_MONTH:
					value = toInt((getMonthLength(fields[YEAR], fields[MONTH]) - 1) / 7) + 1;
					break;
				default:
					break;
			}
			if (value === undefined) {
				throw new Error('maximum value not defined!');
			}
			return value;
		},

		/*
   * Determines if the given calendar field has a value set,
   * including cases that the value has been set by internal fields calculations
   * triggered by a get method call.
   * @param field the calendar field to be cleared.
   * @returns {boolean} true if the given calendar field has a value set; false otherwise.
   */
		isSet: function isSet(field) {
			return this.fields[field] !== undefined;
		},

		/*
   * Converts the time value (millisecond offset from the Epoch)
   * to calendar field values.
   * @protected
   */
		computeFields: function computeFields() {
			var time = this.time;
			var timezoneOffset = this.timezoneOffset * ONE_MINUTE;
			var fixedDate = toInt(timezoneOffset / ONE_DAY);
			var timeOfDay = timezoneOffset % ONE_DAY;
			fixedDate += toInt(time / ONE_DAY);
			timeOfDay += time % ONE_DAY;
			if (timeOfDay >= ONE_DAY) {
				timeOfDay -= ONE_DAY;
				fixedDate++;
			} else {
				while (timeOfDay < 0) {
					timeOfDay += ONE_DAY;
					fixedDate--;
				}
			}

			fixedDate += EPOCH_OFFSET;

			var date = Utils.getGregorianDateFromFixedDate(fixedDate);

			var year = date.year;

			var fields = this.fields;
			fields[YEAR] = year;
			fields[MONTH] = date.month;
			fields[DAY_OF_MONTH] = date.dayOfMonth;
			fields[DAY_OF_WEEK] = date.dayOfWeek;

			if (timeOfDay !== 0) {
				fields[HOUR_OF_DAY] = toInt(timeOfDay / ONE_HOUR);
				var r = timeOfDay % ONE_HOUR;
				fields[MINUTE] = toInt(r / ONE_MINUTE);
				r %= ONE_MINUTE;
				fields[SECONDS] = toInt(r / ONE_SECOND);
				fields[MILLISECONDS] = r % ONE_SECOND;
			} else {
				fields[HOUR_OF_DAY] = fields[MINUTE] = fields[SECONDS] = fields[MILLISECONDS] = 0;
			}

			var fixedDateJan1 = Utils.getFixedDate(year, GregorianCalendar.JANUARY, 1);
			var dayOfYear = fixedDate - fixedDateJan1 + 1;
			var fixDateMonth1 = fixedDate - date.dayOfMonth + 1;

			fields[DAY_OF_YEAR] = dayOfYear;
			fields[DAY_OF_WEEK_IN_MONTH] = toInt((date.dayOfMonth - 1) / 7) + 1;

			var weekOfYear = getWeekNumber(this, fixedDateJan1, fixedDate);

			// 本周没有足够的时间在当前年
			if (weekOfYear === 0) {
				// If the date belongs to the last week of the
				// previous year, use the week number of "12/31" of
				// the "previous" year.
				var fixedDec31 = fixedDateJan1 - 1;
				var prevJan1 = fixedDateJan1 - getYearLength(year - 1);
				weekOfYear = getWeekNumber(this, prevJan1, fixedDec31);
			} else
				// 本周是年末最后一周，可能有足够的时间在新的一年
				if (weekOfYear >= 52) {
					var nextJan1 = fixedDateJan1 + getYearLength(year);
					var nextJan1st = getDayOfWeekDateOnOrBefore(nextJan1 + 6, this.firstDayOfWeek);
					var nDays = nextJan1st - nextJan1;
					// 本周有足够天数在新的一年
					if (nDays >= this.minimalDaysInFirstWeek &&
					// 当天确实在本周，weekOfYear === 53 时是不需要这个判断
					fixedDate >= nextJan1st - 7) {
						weekOfYear = 1;
					}
				}

			fields[WEEK_OF_YEAR] = weekOfYear;
			fields[WEEK_OF_MONTH] = getWeekNumber(this, fixDateMonth1, fixedDate);

			this.fieldsComputed = true;
		},

		/*
   * Converts calendar field values to the time value
   * (millisecond offset from the Epoch).
   * @protected
   */
		computeTime: function computeTime() {
			var year = undefined;
			var fields = this.fields;
			if (this.isSet(YEAR)) {
				year = fields[YEAR];
			} else {
				year = new Date().getFullYear();
			}
			var timeOfDay = 0;
			if (this.isSet(HOUR_OF_DAY)) {
				timeOfDay += fields[HOUR_OF_DAY];
			}
			timeOfDay *= 60;
			timeOfDay += fields[MINUTE] || 0;
			timeOfDay *= 60;
			timeOfDay += fields[SECONDS] || 0;
			timeOfDay *= 1000;
			timeOfDay += fields[MILLISECONDS] || 0;
			var fixedDate = 0;
			fields[YEAR] = year;
			fixedDate = fixedDate + this.getFixedDate();
			// millis represents local wall-clock time in milliseconds.
			var millis = (fixedDate - EPOCH_OFFSET) * ONE_DAY + timeOfDay;
			millis -= this.timezoneOffset * ONE_MINUTE;
			this.time = millis;
			this.computeFields();
		},

		/*
   * Fills in any unset fields in the calendar fields. First,
   * the computeTime() method is called if the time value (millisecond offset from the Epoch)
   * has not been calculated from calendar field values.
   * Then, the computeFields() method is called to calculate all calendar field values.
   * @protected
   */
		complete: function complete() {
			if (this.time === undefined) {
				this.computeTime();
			}
			if (!this.fieldsComputed) {
				this.computeFields();
			}
		},
		getFixedDate: function getFixedDate() {
			var self = this;

			var fields = self.fields;

			var firstDayOfWeekCfg = self.firstDayOfWeek;

			var year = fields[YEAR];

			var month = GregorianCalendar.JANUARY;

			if (self.isSet(MONTH)) {
				month = fields[MONTH];
				if (month > GregorianCalendar.DECEMBER) {
					year += toInt(month / 12);
					month %= 12;
				} else if (month < GregorianCalendar.JANUARY) {
					year += floorDivide(month / 12);
					month = mod(month, 12);
				}
			}

			// Get the fixed date since Jan 1, 1 (Gregorian). We are on
			// the first day of either `month' or January in 'year'.
			var fixedDate = Utils.getFixedDate(year, month, 1);
			var firstDayOfWeek = undefined;
			var dayOfWeek = self.firstDayOfWeek;

			if (self.isSet(DAY_OF_WEEK)) {
				dayOfWeek = fields[DAY_OF_WEEK];
			}

			if (self.isSet(MONTH)) {
				if (self.isSet(DAY_OF_MONTH)) {
					fixedDate += fields[DAY_OF_MONTH] - 1;
				} else {
					if (self.isSet(WEEK_OF_MONTH)) {
						firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);

						// If we have enough days in the first week, then
						// move to the previous week.
						if (firstDayOfWeek - fixedDate >= self.minimalDaysInFirstWeek) {
							firstDayOfWeek -= 7;
						}

						if (dayOfWeek !== firstDayOfWeekCfg) {
							firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
						}

						fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_MONTH] - 1);
					} else {
						var dowim = undefined;
						if (self.isSet(DAY_OF_WEEK_IN_MONTH)) {
							dowim = fields[DAY_OF_WEEK_IN_MONTH];
						} else {
							dowim = 1;
						}
						var lastDate = 7 * dowim;
						if (dowim < 0) {
							lastDate = getMonthLength(year, month) + 7 * (dowim + 1);
						}
						fixedDate = getDayOfWeekDateOnOrBefore(fixedDate + lastDate - 1, dayOfWeek);
					}
				}
			} else {
				// We are on the first day of the year.
				if (self.isSet(DAY_OF_YEAR)) {
					fixedDate += fields[DAY_OF_YEAR] - 1;
				} else if (self.isSet(WEEK_OF_YEAR)) {
					firstDayOfWeek = getDayOfWeekDateOnOrBefore(fixedDate + 6, firstDayOfWeekCfg);
					// If we have enough days in the first week, then move
					// to the previous week.
					if (firstDayOfWeek - fixedDate >= self.minimalDaysInFirstWeek) {
						firstDayOfWeek -= 7;
					}
					if (dayOfWeek !== firstDayOfWeekCfg) {
						firstDayOfWeek = getDayOfWeekDateOnOrBefore(firstDayOfWeek + 6, dayOfWeek);
					}
					fixedDate = firstDayOfWeek + 7 * (fields[WEEK_OF_YEAR] - 1);
				}
			}

			return fixedDate;
		},

		/*
   * Returns this Calendar's time value in milliseconds
   * @member Date.Gregorian
   * @returns {Number} the current time as UTC milliseconds from the epoch.
   */
		getTime: function getTime() {
			if (this.time === undefined) {
				this.computeTime();
			}
			return this.time;
		},

		/*
   * Sets this Calendar's current time from the given long value.
   * @param time the new time in UTC milliseconds from the epoch.
   */
		setTime: function setTime(time) {
			this.time = time;
			this.fieldsComputed = false;
			this.complete();
		},

		/*
   * Returns the value of the given calendar field.
   * @param field the given calendar field.
   * @returns {Number} the value for the given calendar field.
   */
		get: function get(field) {
			this.complete();
			return this.fields[field];
		},

		/*
   * Returns the year of the given calendar field.
   * @method getYear
   * @returns {Number} the year for the given calendar field.
   */

		/*
   * Returns the month of the given calendar field.
   * @method getMonth
   * @returns {Number} the month for the given calendar field.
   */

		/*
   * Returns the day of month of the given calendar field.
   * @method getDayOfMonth
   * @returns {Number} the day of month for the given calendar field.
   */

		/*
   * Returns the hour of day of the given calendar field.
   * @method getHourOfDay
   * @returns {Number} the hour of day for the given calendar field.
   */

		/*
   * Returns the minute of the given calendar field.
   * @method getMinute
   * @returns {Number} the minute for the given calendar field.
   */

		/*
   * Returns the second of the given calendar field.
   * @method getSecond
   * @returns {Number} the second for the given calendar field.
   */

		/*
   * Returns the millisecond of the given calendar field.
   * @method getMilliSecond
   * @returns {Number} the millisecond for the given calendar field.
   */

		/*
   * Returns the week of year of the given calendar field.
   * @method getWeekOfYear
   * @returns {Number} the week of year for the given calendar field.
   */

		/*
   * Returns the week of month of the given calendar field.
   * @method getWeekOfMonth
   * @returns {Number} the week of month for the given calendar field.
   */

		/*
   * Returns the day of year of the given calendar field.
   * @method getDayOfYear
   * @returns {Number} the day of year for the given calendar field.
   */

		/*
   * Returns the day of week of the given calendar field.
   * @method getDayOfWeek
   * @returns {Number} the day of week for the given calendar field.
   */

		/*
   * Returns the day of week in month of the given calendar field.
   * @method getDayOfWeekInMonth
   * @returns {Number} the day of week in month for the given calendar field.
   */

		/*
   * Sets the given calendar field to the given value.
   * @param field the given calendar field.
   * @param v the value to be set for the given calendar field.
   */
		set: function set(field, v) {
			var len = arguments.length;
			if (len === 2) {
				this.fields[field] = v;
			} else if (len < MILLISECONDS + 1) {
				for (var i = 0; i < len; i++) {
					this.fields[YEAR + i] = arguments[i];
				}
			} else {
				throw new Error('illegal arguments for GregorianCalendar set');
			}
			this.time = undefined;
		},

		/*
   * Set the year of the given calendar field.
   * @method setYear
   */

		/*
   * Set the month of the given calendar field.
   * @method setMonth
   */

		/*
   * Set the day of month of the given calendar field.
   * @method setDayOfMonth
   */

		/*
   * Set the hour of day of the given calendar field.
   * @method setHourOfDay
   */

		/*
   * Set the minute of the given calendar field.
   * @method setMinute
   */

		/*
   * Set the second of the given calendar field.
   * @method setSecond
   */

		/*
   * Set the millisecond of the given calendar field.
   * @method setMilliSecond
   */

		/*
   * Set the week of year of the given calendar field.
   * @method setWeekOfYear
   */

		/*
   * Set the week of month of the given calendar field.
   * @method setWeekOfMonth
   */

		/*
   * Set the day of year of the given calendar field.
   * @method setDayOfYear
   */

		/*
   * Set the day of week of the given calendar field.
   * @method setDayOfWeek
   */

		/*
   * Set the day of week in month of the given calendar field.
   * @method setDayOfWeekInMonth
   */

		/*
   * add for specified field based on two rules:
   *
   *  - Add rule 1. The value of field after the call minus the value of field before the
   *  call is amount, modulo any overflow that has occurred in field
   *  Overflow occurs when a field value exceeds its range and,
   *  as a result, the next larger field is incremented or
   *  decremented and the field value is adjusted back into its range.
   *
   *  - Add rule 2. If a smaller field is expected to be invariant,
   *  but it is impossible for it to be equal to its
   *  prior value because of changes in its minimum or maximum after
   *  field is changed, then its value is adjusted to be as close
   *  as possible to its expected value. A smaller field represents a
   *  smaller unit of time. HOUR_OF_DAY is a smaller field than
   *  DAY_OF_MONTH. No adjustment is made to smaller fields
   *  that are not expected to be invariant. The calendar system
   *  determines what fields are expected to be invariant.
   *
   *
   *      @example
   *      use('date/gregorian',function(S, GregorianCalendar){
   *          const d = new GregorianCalendar();
   *          d.set(2012, GregorianCalendar.JANUARY, 31);
   *          d.add(Gregorian.MONTH,1);
   *          // 2012-2-29
   *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
   *          d.add(Gregorian.MONTH,12);
   *          // 2013-2-28
   *          document.writeln('<p>'+d.getYear()+'-'+d.getMonth()+'-'+d.getDayOfWeek())
   *      });
   *
   * @param field the calendar field.
   * @param {Number} amount he amount of date or time to be added to the field.
   */
		add: function add(field, a) {
			if (!a) {
				return;
			}
			var amount = a;
			var self = this;
			var fields = self.fields;
			// computer and retrieve original value
			var value = self.get(field);
			if (field === YEAR) {
				value += amount;
				self.set(YEAR, value);
				adjustDayOfMonth(self);
			} else if (field === MONTH) {
				value += amount;
				var yearAmount = floorDivide(value / 12);
				value = mod(value, 12);
				if (yearAmount) {
					self.set(YEAR, fields[YEAR] + yearAmount);
				}
				self.set(MONTH, value);
				adjustDayOfMonth(self);
			} else {
				switch (field) {
					case HOUR_OF_DAY:
						amount *= ONE_HOUR;
						break;
					case MINUTE:
						amount *= ONE_MINUTE;
						break;
					case SECONDS:
						amount *= ONE_SECOND;
						break;
					case MILLISECONDS:
						break;
					case WEEK_OF_MONTH:
					case WEEK_OF_YEAR:
					case DAY_OF_WEEK_IN_MONTH:
						amount *= ONE_WEEK;
						break;
					case DAY_OF_WEEK:
					case DAY_OF_YEAR:
					case DAY_OF_MONTH:
						amount *= ONE_DAY;
						break;
					default:
						throw new Error('illegal field for add');
				}
				self.setTime(self.time + amount);
			}
		},

		/*
   * add the year of the given calendar field.
   * @method addYear
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the month of the given calendar field.
   * @method addMonth
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the day of month of the given calendar field.
   * @method addDayOfMonth
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the hour of day of the given calendar field.
   * @method addHourOfDay
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the minute of the given calendar field.
   * @method addMinute
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the second of the given calendar field.
   * @method addSecond
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the millisecond of the given calendar field.
   * @method addMilliSecond
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the week of year of the given calendar field.
   * @method addWeekOfYear
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the week of month of the given calendar field.
   * @method addWeekOfMonth
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the day of year of the given calendar field.
   * @method addDayOfYear
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the day of week of the given calendar field.
   * @method addDayOfWeek
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * add the day of week in month of the given calendar field.
   * @method addDayOfWeekInMonth
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * Get rolled value for the field
   * @protected
   */
		getRolledValue: function getRolledValue(value, a, min, max) {
			var amount = a;
			var diff = value - min;
			var range = max - min + 1;
			amount %= range;
			return min + (diff + amount + range) % range;
		},

		/*
   * Adds a signed amount to the specified calendar field without changing larger fields.
   * A negative roll amount means to subtract from field without changing
   * larger fields. If the specified amount is 0, this method performs nothing.
   *
   *
   *
   *      @example
   *      const d = new GregorianCalendar();
   *      d.set(1999, GregorianCalendar.AUGUST, 31);
   *      // 1999-4-30
   *      // Tuesday June 1, 1999
   *      d.set(1999, GregorianCalendar.JUNE, 1);
   *      d.add(Gregorian.WEEK_OF_MONTH,-1); // === d.add(Gregorian.WEEK_OF_MONTH,
   *      d.get(Gregorian.WEEK_OF_MONTH));
   *      // 1999-06-29
   *
   *
   * @param field the calendar field.
   * @param {Number} amount the signed amount to add to field.
   */
		roll: function roll(field, amount) {
			if (!amount) {
				return;
			}
			var self = this;
			// computer and retrieve original value
			var value = self.get(field);
			var min = self.getActualMinimum(field);
			var max = self.getActualMaximum(field);
			value = self.getRolledValue(value, amount, min, max);

			self.set(field, value);

			// consider compute time priority
			switch (field) {
				case MONTH:
					adjustDayOfMonth(self);
					break;
				default:
					// other fields are set already when get
					self.updateFieldsBySet(field);
					break;
			}
		},

		/*
   * keep field stable.
   *
   * 2015-09-29 setMonth 2 vs rollSetMonth 2
   *
   */
		rollSet: function rollSet(field, v) {
			this.set(field, v);
			switch (field) {
				case MONTH:
					adjustDayOfMonth(this);
					break;
				default:
					// other fields are set already when get
					this.updateFieldsBySet(field);
					break;
			}
		},

		/*
   * roll the year of the given calendar field.
   * @method rollYear
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the month of the given calendar field.
   * @param {Number} amount the signed amount to add to field.
   * @method rollMonth
   */

		/*
   * roll the day of month of the given calendar field.
   * @method rollDayOfMonth
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the hour of day of the given calendar field.
   * @method rollHourOfDay
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the minute of the given calendar field.
   * @method rollMinute
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the second of the given calendar field.
   * @method rollSecond
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the millisecond of the given calendar field.
   * @method rollMilliSecond
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the week of year of the given calendar field.
   * @method rollWeekOfYear
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the week of month of the given calendar field.
   * @method rollWeekOfMonth
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the day of year of the given calendar field.
   * @method rollDayOfYear
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * roll the day of week of the given calendar field.
   * @method rollDayOfWeek
   * @param {Number} amount the signed amount to add to field.
   */

		/*
   * remove other priority fields when call getFixedDate
   * precondition: other fields are all set or computed
   * @protected
   */
		updateFieldsBySet: function updateFieldsBySet(field) {
			var fields = this.fields;
			switch (field) {
				case WEEK_OF_MONTH:
					fields[DAY_OF_MONTH] = undefined;
					break;
				case DAY_OF_YEAR:
					fields[MONTH] = undefined;
					break;
				case DAY_OF_WEEK:
					fields[DAY_OF_MONTH] = undefined;
					break;
				case WEEK_OF_YEAR:
					fields[DAY_OF_YEAR] = undefined;
					fields[MONTH] = undefined;
					break;
				default:
					break;
			}
		},

		/*
   * get current date instance's timezone offset
   * @returns {Number}
   */
		getTimezoneOffset: function getTimezoneOffset() {
			return this.timezoneOffset;
		},

		/*
   * set current date instance's timezone offset
   */
		setTimezoneOffset: function setTimezoneOffset(timezoneOffset) {
			if (this.timezoneOffset !== timezoneOffset) {
				this.fieldsComputed = undefined;
				this.timezoneOffset = timezoneOffset;
			}
		},

		/*
   * set first day of week for current date instance
   */
		setFirstDayOfWeek: function setFirstDayOfWeek(firstDayOfWeek) {
			if (this.firstDayOfWeek !== firstDayOfWeek) {
				this.firstDayOfWeek = firstDayOfWeek;
				this.fieldsComputed = false;
			}
		},

		/*
   * Gets what the first day of the week is; e.g., SUNDAY in the U.S., MONDAY in France.
   * @returns {Number} the first day of the week.
   */
		getFirstDayOfWeek: function getFirstDayOfWeek() {
			return this.firstDayOfWeek;
		},

		/*
   * Sets what the minimal days required in the first week of the year are; For example,
   * if the first week is defined as one that contains the first day of the first month of a year,
   * call this method with value 1.
   * If it must be a full week, use value 7.
   * @param minimalDaysInFirstWeek the given minimal days required in the first week of the year.
   */
		setMinimalDaysInFirstWeek: function setMinimalDaysInFirstWeek(minimalDaysInFirstWeek) {
			if (this.minimalDaysInFirstWeek !== minimalDaysInFirstWeek) {
				this.minimalDaysInFirstWeek = minimalDaysInFirstWeek;
				this.fieldsComputed = false;
			}
		},

		/*
   * Gets what the minimal days required in the first week of the year are; e.g.,
   * if the first week is defined as one that contains the first day of the first month of a year,
   * this method returns 1.
   * If the minimal days required must be a full week, this method returns 7.
   * @returns {Number} the minimal days required in the first week of the year.
   */
		getMinimalDaysInFirstWeek: function getMinimalDaysInFirstWeek() {
			return this.minimalDaysInFirstWeek;
		},

		/*
   * Returns the number of weeks in the week year
   * represented by this GregorianCalendar.
   *
   * For example, if this GregorianCalendar's date is
   * December 31, 2008 with the ISO
   * 8601 compatible setting, this method will return 53 for the
   * period: December 29, 2008 to January 3, 2010
   * while getActualMaximum(WEEK_OF_YEAR) will return
   * 52 for the period: December 31, 2007 to December 28, 2008.
   *
   * @return {Number} the number of weeks in the week year.
   */
		getWeeksInWeekYear: function getWeeksInWeekYear() {
			var weekYear = this.getWeekYear();
			if (weekYear === this.get(YEAR)) {
				return this.getActualMaximum(WEEK_OF_YEAR);
			}
			// Use the 2nd week for calculating the max of WEEK_OF_YEAR
			var gc = this.clone();
			gc.clear();
			gc.setWeekDate(weekYear, 2, this.get(DAY_OF_WEEK));
			return gc.getActualMaximum(WEEK_OF_YEAR);
		},

		/*
   * Returns the week year represented by this GregorianCalendar.
   * The dates in the weeks between 1 and the
   * maximum week number of the week year have the same week year value
   * that may be one year before or after the calendar year value.
   *
   * @return {Number} the week year represented by this GregorianCalendar.
   */
		getWeekYear: function getWeekYear() {
			var year = this.get(YEAR); // implicitly  complete
			var weekOfYear = this.get(WEEK_OF_YEAR);
			var month = this.get(MONTH);
			if (month === GregorianCalendar.JANUARY) {
				if (weekOfYear >= 52) {
					--year;
				}
			} else if (month === GregorianCalendar.DECEMBER) {
				if (weekOfYear === 1) {
					++year;
				}
			}
			return year;
		},

		/*
   * Sets this GregorianCalendar to the date given by the date specifiers - weekYear,
   * weekOfYear, and dayOfWeek. weekOfYear follows the WEEK_OF_YEAR numbering.
   * The dayOfWeek value must be one of the DAY_OF_WEEK values: SUNDAY to SATURDAY.
   *
   * @param weekYear    the week year
   * @param weekOfYear  the week number based on weekYear
   * @param dayOfWeek   the day of week value
   */
		setWeekDate: function setWeekDate(weekYear, weekOfYear, dayOfWeek) {
			if (dayOfWeek < GregorianCalendar.SUNDAY || dayOfWeek > GregorianCalendar.SATURDAY) {
				throw new Error('invalid dayOfWeek: ' + dayOfWeek);
			}
			var fields = this.fields;
			// To avoid changing the time of day fields by date
			// calculations, use a clone with the GMT time zone.
			var gc = this.clone();
			gc.clear();
			gc.setTimezoneOffset(0);
			gc.set(YEAR, weekYear);
			gc.set(WEEK_OF_YEAR, 1);
			gc.set(DAY_OF_WEEK, this.getFirstDayOfWeek());
			var days = dayOfWeek - this.getFirstDayOfWeek();
			if (days < 0) {
				days += 7;
			}
			days += 7 * (weekOfYear - 1);
			if (days !== 0) {
				gc.add(DAY_OF_YEAR, days);
			} else {
				gc.complete();
			}
			fields[YEAR] = gc.get(YEAR);
			fields[MONTH] = gc.get(MONTH);
			fields[DAY_OF_MONTH] = gc.get(DAY_OF_MONTH);
			this.complete();
		},

		/*
   * Creates and returns a copy of this object.
   * @returns {Date.Gregorian}
   */
		clone: function clone() {
			if (this.time === undefined) {
				this.computeTime();
			}
			var cal = new GregorianCalendar(this.locale);
			cal.setTimezoneOffset(cal.getTimezoneOffset());
			cal.setFirstDayOfWeek(cal.getFirstDayOfWeek());
			cal.setMinimalDaysInFirstWeek(cal.getMinimalDaysInFirstWeek());
			cal.setTime(this.time);
			return cal;
		},

		/*
   * Compares this GregorianCalendar to the specified Object.
   * The result is true if and only if the argument is a GregorianCalendar object
   * that represents the same time value (millisecond offset from the Epoch)
   * under the same Calendar parameters and Gregorian change date as this object.
   * @param {Date.Gregorian} obj the object to compare with.
   * @returns {boolean} true if this object is equal to obj; false otherwise.
   */
		equals: function equals(obj) {
			return this.getTime() === obj.getTime() && this.firstDayOfWeek === obj.firstDayOfWeek && this.timezoneOffset === obj.timezoneOffset && this.minimalDaysInFirstWeek === obj.minimalDaysInFirstWeek;
		},
		compareToDay: function compareToDay(d2) {
			var d1Year = this.getYear();
			var d2Year = d2.getYear();
			var d1Month = this.getMonth();
			var d2Month = d2.getMonth();
			var d1Day = this.getDayOfMonth();
			var d2Day = d2.getDayOfMonth();
			if (d1Year !== d2Year) {
				return d1Year - d2Year;
			}
			if (d1Month !== d2Month) {
				return d1Month - d2Month;
			}
			return d1Day - d2Day;
		},

		/*
   * Sets all the calendar field values or specified field and the time value
   * (millisecond offset from the Epoch) of this Calendar undefined.
   * This means that isSet() will return false for all the calendar fields,
   * and the date and time calculations will treat the fields as if they had never been set.
   * @param [field] the calendar field to be cleared.
   */
		clear: function clear(field) {
			if (field === undefined) {
				this.field = [];
			} else {
				this.fields[field] = undefined;
			}
			this.time = undefined;
			this.fieldsComputed = false;
		},
		toString: function toString() {
			// for debug
			var v = this;
			return '[GregorianCalendar]: ' + v.getYear() + '/' + v.getMonth() + '/' + v.getDayOfMonth() + ' ' + v.getHourOfDay() + ':' + v.getMinutes() + ':' + v.getSeconds();
		}
	};

	var GregorianCalendarProto = GregorianCalendar.prototype;

	Utils.each(FIELDS, function (f, index) {
		if (f) {
			GregorianCalendarProto['get' + f] = function get() {
				return this.get(index);
			};

			GregorianCalendarProto['isSet' + f] = function isSet() {
				return this.isSet(index);
			};

			GregorianCalendarProto['set' + f] = function set(v) {
				return this.set(index, v);
			};

			GregorianCalendarProto['add' + f] = function add(v) {
				return this.add(index, v);
			};

			GregorianCalendarProto['roll' + f] = function roll(v) {
				return this.roll(index, v);
			};

			GregorianCalendarProto['rollSet' + f] = function rollSet(v) {
				return this.rollSet(index, v);
			};
		}
	});
	/*
  http://docs.oracle.com/javase/7/docs/api/java/util/GregorianCalendar.html
 
  TODO
  - day saving time
  - i18n
  - julian calendar
  */

	RC.GregorianCalendar = GregorianCalendar;

	/**
  * @ignore
  * DateTimeFormat for
  * Inspired by DateTimeFormat from JDK.
  * @author yiminghe@gmail.com
  */

	var enUsLocale = Locale.GregorianCalendar;
	var MAX_VALUE = Number.MAX_VALUE;

	/**
  * date or time style enum
  * @enum {Number} Date.Formatter.Style
  */
	var DateTimeStyle = {
		/**
   * full style
   */
		FULL: 0,
		/**
   * long style
   */
		LONG: 1,
		/**
   * medium style
   */
		MEDIUM: 2,
		/**
   * short style
   */
		SHORT: 3
	};

	/*
  Letter    Date or Time Component    Presentation    Examples
  G    Era designator    Text    AD
  y    Year    Year    1996; 96
  Y    WeekYear    WeekYear    1996; 96
  M    Month in year    Month    July; Jul; 07
  w    Week in year    Number    27
  W    Week in month    Number    2
  D    Day in year    Number    189
  d    Day in month    Number    10
  F    Day of week in month    Number    2
  E    Day in week    Text    Tuesday; Tue
  a    Am/pm marker    Text    PM
  H    Hour in day (0-23)    Number    0
  k    Hour in day (1-24)    Number    24
  K    Hour in am/pm (0-11)    Number    0
  h    Hour in am/pm (1-12)    Number    12
  m    Minute in hour    Number    30
  s    Second in minute    Number    55
  S    Millisecond    Number    978
  x z    Time zone    General time zone    Pacific Standard Time; PST; GMT-08:00
  Z    Time zone    RFC 822 time zone    -0800
  */

	var patternChars = new Array(GregorianCalendar.DAY_OF_WEEK_IN_MONTH + 2).join('1');
	var ERA = 0;
	var calendarIndexMap = {};

	patternChars = patternChars.split('');
	patternChars[ERA] = 'G';
	patternChars[GregorianCalendar.YEAR] = 'y';
	patternChars[GregorianCalendar.MONTH] = 'M';
	patternChars[GregorianCalendar.DAY_OF_MONTH] = 'd';
	patternChars[GregorianCalendar.HOUR_OF_DAY] = 'H';
	patternChars[GregorianCalendar.MINUTES] = 'm';
	patternChars[GregorianCalendar.SECONDS] = 's';
	patternChars[GregorianCalendar.MILLISECONDS] = 'S';
	patternChars[GregorianCalendar.WEEK_OF_YEAR] = 'w';
	patternChars[GregorianCalendar.WEEK_OF_MONTH] = 'W';
	patternChars[GregorianCalendar.DAY_OF_YEAR] = 'D';
	patternChars[GregorianCalendar.DAY_OF_WEEK_IN_MONTH] = 'F';
	patternChars.push('Y');

	patternChars.forEach(function (v, key) {
		var k = key;
		if (v === 'Y') {
			k = GregorianCalendar.YEAR;
		}
		if (v) {
			calendarIndexMap[v] = k;
		}
	});

	function mix(t, s) {
		for (var p in s) {
			if (s.hasOwnProperty(p)) {
				t[p] = s[p];
			}
		}
	}

	var SUBSTITUTE_REG = /\\?\{([^{}]+)\}/g;
	var EMPTY = '';

	function substitute(str, o, regexp) {
		if (typeof str !== 'string' || !o) {
			return str;
		}

		return str.replace(regexp || SUBSTITUTE_REG, function (match, name) {
			if (match.charAt(0) === '\\') {
				return match.slice(1);
			}
			return o[name] === undefined ? EMPTY : o[name];
		});
	}

	patternChars = patternChars.join('') + 'ahkKZE';

	function encode(lastField, count, compiledPattern) {
		compiledPattern.push({
			field: lastField,
			count: count
		});
	}

	function compile(pattern) {
		var length = pattern.length;
		var inQuote = false;
		var compiledPattern = [];
		var tmpBuffer = null;
		var count = 0;
		var lastField = -1;

		for (var i = 0; i < length; i++) {
			var c = pattern.charAt(i);

			if (c === '\'') {
				// '' is treated as a single quote regardless of being
				// in a quoted section.
				if (i + 1 < length) {
					c = pattern.charAt(i + 1);
					if (c === '\'') {
						i++;
						if (count !== 0) {
							encode(lastField, count, compiledPattern);
							lastField = -1;
							count = 0;
						}
						if (inQuote) {
							tmpBuffer += c;
						}
						continue;
					}
				}
				if (!inQuote) {
					if (count !== 0) {
						encode(lastField, count, compiledPattern);
						lastField = -1;
						count = 0;
					}
					tmpBuffer = '';
					inQuote = true;
				} else {
					compiledPattern.push({
						text: tmpBuffer
					});
					inQuote = false;
				}
				continue;
			}
			if (inQuote) {
				tmpBuffer += c;
				continue;
			}
			if (!(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z')) {
				if (count !== 0) {
					encode(lastField, count, compiledPattern);
					lastField = -1;
					count = 0;
				}
				compiledPattern.push({
					text: c
				});
				continue;
			}

			if (patternChars.indexOf(c) === -1) {
				throw new Error('Illegal pattern character "' + c + '"');
			}

			if (lastField === -1 || lastField === c) {
				lastField = c;
				count++;
				continue;
			}
			encode(lastField, count, compiledPattern);
			lastField = c;
			count = 1;
		}

		if (inQuote) {
			throw new Error('Unterminated quote');
		}

		if (count !== 0) {
			encode(lastField, count, compiledPattern);
		}

		return compiledPattern;
	}

	var zeroDigit = '0';

	// TODO zeroDigit localization??
	function zeroPaddingNumber(value, minDigits, maxDigits_, b) {
		// Optimization for 1, 2 and 4 digit numbers. This should
		// cover most cases of formatting date/time related items.
		// Note: This optimization code assumes that maxDigits is
		// either 2 or Integer.MAX_VALUE (maxIntCount in format()).
		var buffer = b || [];
		var maxDigits = maxDigits_ || MAX_VALUE;
		if (value >= 0) {
			if (value < 100 && minDigits >= 1 && minDigits <= 2) {
				if (value < 10 && minDigits === 2) {
					buffer.push(zeroDigit);
				}
				buffer.push(value);
				return buffer.join('');
			} else if (value >= 1000 && value < 10000) {
				if (minDigits === 4) {
					buffer.push(value);
					return buffer.join('');
				}
				if (minDigits === 2 && maxDigits === 2) {
					return zeroPaddingNumber(value % 100, 2, 2, buffer);
				}
			}
		}
		buffer.push(value + '');
		return buffer.join('');
	}

	/**
  *
  * date time formatter for GregorianCalendar
  *
  *      @example
  *
  *          const calendar = new GregorianCalendar(2013,9,24);
  *          // ' to escape
  *          const formatter = new GregorianCalendarFormat("'today is' ''yyyy/MM/dd a''");
  *          document.write(formatter.format(calendar));
  *
  * @class GregorianCalendarFormat
  * @param {String} pattern patter string of date formatter
  *
  * <table border="1">
  * <thead valign="bottom">
  * <tr><th class="head">Letter</th>
  * <th class="head">Date or Time Component</th>
  * <th class="head">Presentation</th>
  * <th class="head">Examples</th>
  * </tr>
  * </thead>
  * <tbody valign="top">
  * <tr><td>G</td>
  * <td>Era designator</td>
  * <td>Text</td>
  * <td>AD</td>
  * </tr>
  * <tr><td>y</td>
  * <td>Year</td>
  * <td>Year</td>
  * <td>1996; 96</td>
  * </tr>
  * <tr><td>M</td>
  * <td>Month in year</td>
  * <td>Month</td>
  * <td>July; Jul; 07</td>
  * </tr>
  * <tr><td>w</td>
  * <td>Week in year</td>
  * <td>Number</td>
  * <td>27</td>
  * </tr>
  * <tr><td>W</td>
  * <td>Week in month</td>
  * <td>Number</td>
  * <td>2</td>
  * </tr>
  * <tr><td>D</td>
  * <td>Day in year</td>
  * <td>Number</td>
  * <td>189</td>
  * </tr>
  * <tr><td>d</td>
  * <td>Day in month</td>
  * <td>Number</td>
  * <td>10</td>
  * </tr>
  * <tr><td>F</td>
  * <td>Day of week in month</td>
  * <td>Number</td>
  * <td>2</td>
  * </tr>
  * <tr><td>E</td>
  * <td>Day in week</td>
  * <td>Text</td>
  * <td>Tuesday; Tue</td>
  * </tr>
  * <tr><td>a</td>
  * <td>Am/pm marker</td>
  * <td>Text</td>
  * <td>PM</td>
  * </tr>
  * <tr><td>H</td>
  *       <td>Hour in day (0-23)</td>
  * <td>Number</td>
  * <td>0</td>
  * </tr>
  * <tr><td>k</td>
  *       <td>Hour in day (1-24)</td>
  * <td>Number</td>
  * <td>24</td>
  * </tr>
  * <tr><td>K</td>
  * <td>Hour in am/pm (0-11)</td>
  * <td>Number</td>
  * <td>0</td>
  * </tr>
  * <tr><td>h</td>
  * <td>Hour in am/pm (1-12)</td>
  * <td>Number</td>
  * <td>12</td>
  * </tr>
  * <tr><td>m</td>
  * <td>Minute in hour</td>
  * <td>Number</td>
  * <td>30</td>
  * </tr>
  * <tr><td>s</td>
  * <td>Second in minute</td>
  * <td>Number</td>
  * <td>55</td>
  * </tr>
  * <tr><td>S</td>
  * <td>Millisecond</td>
  * <td>Number</td>
  * <td>978</td>
  * </tr>
  * <tr><td>x/z</td>
  * <td>Time zone</td>
  * <td>General time zone</td>
  * <td>Pacific Standard Time; PST; GMT-08:00</td>
  * </tr>
  * <tr><td>Z</td>
  * <td>Time zone</td>
  * <td>RFC 822 time zone</td>
  * <td>-0800</td>
  * </tr>
  * </tbody>
  * </table>
  * @param {Object} locale format locale
  */
	function DateTimeFormat(pattern, locale) {
		this.locale = locale || enUsLocale;
		this.originalPattern = pattern;
		this.pattern = compile(pattern);
	}

	function formatField(field, count, locale, calendar) {
		var current = undefined;
		var value = undefined;
		switch (field) {
			case 'G':
				value = calendar.getYear() > 0 ? 1 : 0;
				current = locale.eras[value];
				break;
			case 'Y':
				value = calendar.getWeekYear();
				if (value <= 0) {
					value = 1 - value;
				}
				current = zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2);
				break;
			case 'y':
				value = calendar.getYear();
				if (value <= 0) {
					value = 1 - value;
				}
				current = zeroPaddingNumber(value, 2, count !== 2 ? MAX_VALUE : 2);
				break;
			case 'M':
				value = calendar.getMonth();
				if (count >= 4) {
					current = locale.months[value];
				} else if (count === 3) {
					current = locale.shortMonths[value];
				} else {
					current = zeroPaddingNumber(value + 1, count);
				}
				break;
			case 'k':
				current = zeroPaddingNumber(calendar.getHourOfDay() || 24, count);
				break;
			case 'E':
				value = calendar.getDayOfWeek();
				current = count >= 4 ? locale.weekdays[value] : locale.shortWeekdays[value];
				break;
			case 'a':
				current = locale.ampms[calendar.getHourOfDay() >= 12 ? 1 : 0];
				break;
			case 'h':
				current = zeroPaddingNumber(calendar.getHourOfDay() % 12 || 12, count);
				break;
			case 'K':
				current = zeroPaddingNumber(calendar.getHourOfDay() % 12, count);
				break;
			case 'Z':
				var offset = calendar.getTimezoneOffset();
				var parts = [offset < 0 ? '-' : '+'];
				offset = Math.abs(offset);
				parts.push(zeroPaddingNumber(Math.floor(offset / 60) % 100, 2), zeroPaddingNumber(offset % 60, 2));
				current = parts.join('');
				break;
			default:
				// case 'd':
				// case 'H':
				// case 'm':
				// case 's':
				// case 'S':
				// case 'D':
				// case 'F':
				// case 'w':
				// case 'W':
				var index = calendarIndexMap[field];
				value = calendar.get(index);
				current = zeroPaddingNumber(value, count);
		}
		return current;
	}

	function matchPartString(dateStr, startIndex, match, mLen) {
		for (var i = 0; i < mLen; i++) {
			if (dateStr.charAt(startIndex + i) !== match.charAt(i)) {
				return false;
			}
		}
		return true;
	}

	function matchField(dateStr, startIndex, matches) {
		var matchedLen = -1;
		var index = -1;
		var i = undefined;
		var len = matches.length;
		for (i = 0; i < len; i++) {
			var m = matches[i];
			var mLen = m.length;
			if (mLen > matchedLen && matchPartString(dateStr, startIndex, m, mLen)) {
				matchedLen = mLen;
				index = i;
			}
		}
		return index >= 0 ? {
			value: index,
			startIndex: startIndex + matchedLen
		} : null;
	}

	function getLeadingNumberLen(str) {
		var i = undefined;
		var c = undefined;
		var len = str.length;
		for (i = 0; i < len; i++) {
			c = str.charAt(i);
			if (c < '0' || c > '9') {
				break;
			}
		}
		return i;
	}

	function matchNumber(dateStr, startIndex, count, obeyCount) {
		var str = dateStr;
		var n = undefined;
		if (obeyCount) {
			if (dateStr.length < startIndex + count) {
				return null;
			}
			str = dateStr.slice(startIndex, startIndex + count);
			if (!str.match(/^\d+$/)) {
				throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + this.originalPattern);
			}
		} else {
			str = str.slice(startIndex);
		}
		n = parseInt(str, 10);
		if (isNaN(n)) {
			throw new Error('GregorianCalendarFormat parse error, dateStr: ' + dateStr + ', patter: ' + this.originalPattern);
		}
		return {
			value: n,
			startIndex: startIndex + getLeadingNumberLen(str)
		};
	}

	function parseField(calendar, dateStr, startIndex_, field, count, obeyCount, tmp) {
		var match = undefined;
		var year = undefined;
		var hour = undefined;
		var startIndex = startIndex_;
		if (dateStr.length <= startIndex) {
			return startIndex;
		}
		var locale = this.locale;
		switch (field) {
			case 'G':
				match = matchField(dateStr, startIndex, locale.eras);
				if (match) {
					if (calendar.isSetYear()) {
						if (match.value === 0) {
							year = calendar.getYear();
							calendar.setYear(1 - year);
						}
					} else {
						tmp.era = match.value;
					}
				}
				break;
			case 'y':
				match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
				if (match) {
					year = match.value;
					if ('era' in tmp) {
						if (tmp.era === 0) {
							year = 1 - year;
						}
					}
					calendar.setYear(year);
				}
				break;
			case 'M':
				var month = undefined;
				if (count >= 3) {
					match = matchField(dateStr, startIndex, locale[count === 3 ? 'shortMonths' : 'months']);
					if (match) {
						month = match.value;
					}
				} else {
					match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
					if (match) {
						month = match.value - 1;
					}
				}
				if (match) {
					calendar.setMonth(month);
				}
				break;
			case 'k':
				match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
				if (match) {
					calendar.setHourOfDay(match.value % 24);
				}
				break;
			case 'E':
				match = matchField(dateStr, startIndex, locale[count > 3 ? 'weekdays' : 'shortWeekdays']);
				if (match) {
					calendar.setDayOfWeek(match.value);
				}
				break;
			case 'a':
				match = matchField(dateStr, startIndex, locale.ampms);
				if (match) {
					if (calendar.isSetHourOfDay()) {
						if (match.value) {
							hour = calendar.getHourOfDay();
							if (hour < 12) {
								calendar.setHourOfDay((hour + 12) % 24);
							}
						}
					} else {
						tmp.ampm = match.value;
					}
				}
				break;
			case 'h':
				match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
				if (match) {
					hour = match.value %= 12;
					if (tmp.ampm) {
						hour += 12;
					}
					calendar.setHourOfDay(hour);
				}
				break;
			case 'K':
				match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
				if (match) {
					hour = match.value;
					if (tmp.ampm) {
						hour += 12;
					}
					calendar.setHourOfDay(hour);
				}
				break;
			case 'Z':
				// let sign = 1;
				var zoneChar = dateStr.charAt(startIndex);
				if (zoneChar === '-') {
					// sign = -1;
					startIndex++;
				} else if (zoneChar === '+') {
					startIndex++;
				} else {
					break;
				}
				match = matchNumber.call(this, dateStr, startIndex, 2, true);
				if (match) {
					var zoneOffset = match.value * 60;
					startIndex = match.startIndex;
					match = matchNumber.call(this, dateStr, startIndex, 2, true);
					if (match) {
						zoneOffset += match.value;
					}
					calendar.setTimezoneOffset(zoneOffset);
				}
				break;
			default:
				// case 'd':
				// case 'H':
				// case 'm':
				// case 's':
				// case 'S':
				// case 'D':
				// case 'F':
				// case 'w':
				// case 'W'
				match = matchNumber.call(this, dateStr, startIndex, count, obeyCount);
				if (match) {
					var index = calendarIndexMap[field];
					calendar.set(index, match.value);
				}
		}
		if (match) {
			startIndex = match.startIndex;
		}
		return startIndex;
	}

	mix(DateTimeFormat.prototype, {
		/*
   * format a GregorianDate instance according to specified pattern
   * @param {GregorianCalendar} calendar GregorianDate instance
   * @returns {string} formatted string of GregorianDate instance
   */

		format: function format(calendar) {
			if (!calendar.isGregorianCalendar) {
				throw new Error('calendar must be type of GregorianCalendar');
			}
			var i = undefined;
			var ret = [];
			var pattern = this.pattern;
			var len = pattern.length;
			for (i = 0; i < len; i++) {
				var comp = pattern[i];
				if (comp.text) {
					ret.push(comp.text);
				} else if ('field' in comp) {
					ret.push(formatField(comp.field, comp.count, this.locale, calendar));
				}
			}
			return ret.join('');
		},

		/*
   * parse a formatted string of GregorianDate instance according to specified pattern
   * @param {String} dateStr formatted string of GregorianDate
   * @returns {GregorianCalendar}
   */
		parse: function parse(dateStr, option_) {
			var option = option_ || {};
			var calendarLocale = option.locale;
			var calendar = new GregorianCalendar(calendarLocale);
			var i = undefined;
			var j = undefined;
			var tmp = {};
			var obeyCount = option.obeyCount || false;
			var dateStrLen = dateStr.length;
			var errorIndex = -1;
			var startIndex = 0;
			var oldStartIndex = 0;
			var pattern = this.pattern;
			var len = pattern.length;
			/* eslint no-labels: 0 no-empty-label:0 */
			loopPattern: {
				for (i = 0; errorIndex < 0 && i < len; i++) {
					var comp = pattern[i];
					var text = undefined;
					var textLen = undefined;
					oldStartIndex = startIndex;
					text = comp.text;
					if (text) {
						textLen = text.length;
						if (textLen + startIndex > dateStrLen) {
							errorIndex = startIndex;
						} else {
							for (j = 0; j < textLen; j++) {
								if (text.charAt(j) !== dateStr.charAt(j + startIndex)) {
									errorIndex = startIndex;
									break loopPattern;
								}
							}
							startIndex += textLen;
						}
					} else if ('field' in comp) {
						if (!option.obeyCount) {
							var nextComp = pattern[i + 1];
							obeyCount = false;
							if (nextComp) {
								if ('field' in nextComp) {
									obeyCount = true;
								} else {
									var c = nextComp.text.charAt(0);
									if (c >= '0' && c <= '9') {
										obeyCount = true;
									}
								}
							}
						}
						startIndex = parseField.call(this, calendar, dateStr, startIndex, comp.field, comp.count, obeyCount, tmp);
						if (startIndex === oldStartIndex) {
							errorIndex = startIndex;
						}
					}
				}
			}

			if (errorIndex >= 0) {
				warning(false, 'error when parsing date: ' + dateStr + ', position: ' + dateStr.slice(0, errorIndex) + '^');
				return undefined;
			}
			return calendar;
		}
	});

	mix(DateTimeFormat, {
		Style: DateTimeStyle,

		/*
   * get a formatter instance of short style pattern.
   * en-us: M/d/yy h:mm a
   * zh-cn: yy-M-d ah:mm
   * @param {Object} locale locale object
   * @returns {GregorianCalendar}
   * @static
   */
		getInstance: function getInstance(locale) {
			return this.getDateTimeInstance(DateTimeStyle.SHORT, DateTimeStyle.SHORT, locale);
		},

		/*
   * get a formatter instance of specified date style.
   * @param {Date.Formatter.Style} dateStyle date format style
   * @param {Object} locale
   * @returns {GregorianCalendar}
   * @static
   */
		getDateInstance: function getDateInstance(dateStyle, locale) {
			return this.getDateTimeInstance(dateStyle, undefined, locale);
		},

		/*
   * get a formatter instance of specified date style and time style.
   * @param {Date.Formatter.Style} dateStyle date format style
   * @param {Date.Formatter.Style} timeStyle time format style
   * @param {Object} locale
   * @returns {GregorianCalendar}
   * @static
   */
		getDateTimeInstance: function getDateTimeInstance(dateStyle, timeStyle, locale_) {
			var locale = locale_ || enUsLocale;
			var datePattern = '';
			if (dateStyle !== undefined) {
				datePattern = locale.datePatterns[dateStyle];
			}
			var timePattern = '';
			if (timeStyle !== undefined) {
				timePattern = locale.timePatterns[timeStyle];
			}
			var pattern = datePattern;
			if (timePattern) {
				if (datePattern) {
					pattern = substitute(locale.dateTimePattern, {
						date: datePattern,
						time: timePattern
					});
				} else {
					pattern = timePattern;
				}
			}
			return new DateTimeFormat(pattern, locale);
		},

		/*
   * get a formatter instance of specified time style.
   * @param {Date.Formatter.Style} timeStyle time format style
   * @param {Object} locale
   * @returns {GregorianCalendar}
   * @static
   */
		getTimeInstance: function getTimeInstance(timeStyle, locale) {
			return this.getDateTimeInstance(undefined, timeStyle, locale);
		}
	});

	DateTimeFormat.version = '2.0';

	RC.DateTimeFormat = DateTimeFormat;
})(Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Locale = RC.Locale;
	var Trigger = RC.Trigger;
	var DateTimeFormat = RC.DateTimeFormat;
	var GregorianCalendar = RC.GregorianCalendar;
	var classnames = RC.classnames;
	var _React = React;
	var PropTypes = _React.PropTypes;

	function _getFormatter(format, locale) {
		if (typeof format === 'string') {
			return new DateTimeFormat(format, locale.format);
		}
		return format;
	}

	var autoAdjustOverflow = {
		adjustX: 1,
		adjustY: 1
	};

	var targetOffset = [0, 0];

	var placements = {
		bottomLeft: {
			points: ['tl', 'tl'],
			overflow: autoAdjustOverflow,
			offset: [0, -3],
			targetOffset: targetOffset
		},
		bottomRight: {
			points: ['tr', 'tr'],
			overflow: autoAdjustOverflow,
			offset: [0, -3],
			targetOffset: targetOffset
		},
		topRight: {
			points: ['br', 'br'],
			overflow: autoAdjustOverflow,
			offset: [0, 3],
			targetOffset: targetOffset
		},
		topLeft: {
			points: ['bl', 'bl'],
			overflow: autoAdjustOverflow,
			offset: [0, 3],
			targetOffset: targetOffset
		}
	};

	function createSelection(field, start, end) {
		if (field.createTextRange) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
			field.focus();
		} else if (field.setSelectionRange) {
			field.focus();
			field.setSelectionRange(start, end);
		} else if (typeof field.selectionStart !== 'undefined') {
			field.selectionStart = start;
			field.selectionEnd = end;
			field.focus();
		}
	}

	//import enUs from '../locale/en_US';
	var CommonMixin = {
		propTypes: {
			prefixCls: PropTypes.string,
			locale: PropTypes.object
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-time-picker',
				locale: Locale.TimePicker
			};
		}
	};

	var scrollTo = function scrollTo(element, to, duration) {
		var requestAnimationFrame = window.requestAnimationFrame || function requestAnimationFrameTimeout() {
			return setTimeout(arguments[0], 10);
		};
		// jump to target if duration zero
		if (duration <= 0) {
			element.scrollTop = to;
			return;
		}
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;

		requestAnimationFrame(function () {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop === to) return;
			scrollTo(element, to, duration - 10);
		});
	};

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			prefixCls: PropTypes.string,
			options: PropTypes.array,
			gregorianCalendarLocale: PropTypes.object,
			selectedIndex: PropTypes.number,
			type: PropTypes.string,
			onSelect: PropTypes.func,
			onMouseEnter: PropTypes.func
		},

		componentDidMount: function componentDidMount() {
			// jump to selected option
			this.scrollToSelected(0);
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			// smooth scroll to selected option
			if (prevProps.selectedIndex !== this.props.selectedIndex) {
				this.scrollToSelected(120);
			}
		},
		onSelect: function onSelect(value) {
			var _props = this.props;
			var onSelect = _props.onSelect;
			var type = _props.type;

			onSelect(type, value);
		},
		getOptions: function getOptions() {
			var _this = this;

			var _props2 = this.props;
			var options = _props2.options;
			var selectedIndex = _props2.selectedIndex;
			var prefixCls = _props2.prefixCls;

			return options.map(function (item, index) {
				var _classnames;

				var cls = classnames((_classnames = {}, _defineProperty(_classnames, prefixCls + '-select-option-selected', selectedIndex === index), _defineProperty(_classnames, prefixCls + '-select-option-disabled', item.disabled), _classnames));
				var onclick = null;
				if (!item.disabled) {
					onclick = _this.onSelect.bind(_this, +item.value);
				}
				return React.createElement(
					'li',
					{ className: cls, key: index, onClick: onclick, disabled: item.disabled },
					item.value
				);
			});
		},
		scrollToSelected: function scrollToSelected(duration) {
			// move to selected item
			var select = ReactDOM.findDOMNode(this);
			var list = ReactDOM.findDOMNode(this.refs.list);
			var index = this.props.selectedIndex;
			if (index < 0) {
				index = 0;
			}
			var topOption = list.children[index];
			var to = topOption.offsetTop;
			scrollTo(select, to, duration);
		},
		render: function render() {
			if (this.props.options.length === 0) {
				return null;
			}

			var prefixCls = this.props.prefixCls;

			return React.createElement(
				'div',
				{ className: prefixCls + '-select',
					onMouseEnter: this.props.onMouseEnter },
				React.createElement(
					'ul',
					{ ref: 'list' },
					this.getOptions()
				)
			);
		}
	});

	var Header = React.createClass({
		displayName: 'Header',

		propTypes: {
			formatter: PropTypes.object,
			prefixCls: PropTypes.string,
			gregorianCalendarLocale: PropTypes.object,
			locale: PropTypes.object,
			disabledDate: PropTypes.func,
			placeholder: PropTypes.string,
			value: PropTypes.object,
			hourOptions: PropTypes.array,
			minuteOptions: PropTypes.array,
			secondOptions: PropTypes.array,
			disabledHours: PropTypes.func,
			disabledMinutes: PropTypes.func,
			disabledSeconds: PropTypes.func,
			onChange: PropTypes.func,
			onClear: PropTypes.func,
			onEsc: PropTypes.func,
			allowEmpty: PropTypes.bool,
			currentSelectPanel: PropTypes.string
		},

		getInitialState: function getInitialState() {
			var value = this.props.value;
			return {
				str: value && this.props.formatter.format(value) || '',
				invalid: false
			};
		},
		componentDidMount: function componentDidMount() {
			this.timer = setTimeout(this.selectRange, 0);
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var value = nextProps.value;
			this.setState({
				str: value && nextProps.formatter.format(value) || '',
				invalid: false
			});
		},
		componentDidUpdate: function componentDidUpdate() {
			this.timer = setTimeout(this.selectRange, 0);
		},
		componentWillUnmount: function componentWillUnmount() {
			clearTimeout(this.timer);
		},
		onInputChange: function onInputChange(event) {
			var str = event.target.value;
			this.setState({
				str: str
			});
			var value = null;
			var _props3 = this.props;
			var formatter = _props3.formatter;
			var gregorianCalendarLocale = _props3.gregorianCalendarLocale;
			var hourOptions = _props3.hourOptions;
			var minuteOptions = _props3.minuteOptions;
			var secondOptions = _props3.secondOptions;
			var disabledHours = _props3.disabledHours;
			var disabledMinutes = _props3.disabledMinutes;
			var disabledSeconds = _props3.disabledSeconds;
			var onChange = _props3.onChange;
			var allowEmpty = _props3.allowEmpty;

			if (str) {
				var originalValue = this.props.value;
				try {
					value = formatter.parse(str, {
						locale: gregorianCalendarLocale,
						obeyCount: true
					});
				} catch (ex) {
					this.setState({
						invalid: true
					});
					return;
				}

				if (value) {
					// if time value not allowed, response warning.
					if (hourOptions.indexOf(value.getHourOfDay()) < 0 || minuteOptions.indexOf(value.getMinutes()) < 0 || secondOptions.indexOf(value.getSeconds()) < 0) {
						this.setState({
							invalid: true
						});
						return;
					}

					// if time value is disabled, response warning.
					var disabledHourOptions = disabledHours();
					var disabledMinuteOptions = disabledMinutes(value.getHourOfDay());
					var disabledSecondOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());
					if (disabledHourOptions && disabledHourOptions.indexOf(value.getHourOfDay()) >= 0 || disabledMinuteOptions && disabledMinuteOptions.indexOf(value.getMinutes()) >= 0 || disabledSecondOptions && disabledSecondOptions.indexOf(value.getSeconds()) >= 0) {
						this.setState({
							invalid: true
						});
						return;
					}

					if (originalValue && value) {
						if (originalValue.getHourOfDay() !== value.getHourOfDay() || originalValue.getMinutes() !== value.getMinutes() || originalValue.getSeconds() !== value.getSeconds()) {
							// keep other fields for rc-calendar
							var changedValue = originalValue.clone();
							changedValue.setHourOfDay(value.getHourOfDay());
							changedValue.setMinutes(value.getMinutes());
							changedValue.setSeconds(value.getSeconds());
							onChange(changedValue);
						}
					} else if (originalValue !== value) {
						onChange(value);
					}
				} else {
					this.setState({
						invalid: true
					});
					return;
				}
			} else if (allowEmpty) {
				onChange(null);
			} else {
				this.setState({
					invalid: true
				});
				return;
			}

			this.setState({
				invalid: false
			});
		},
		onKeyDown: function onKeyDown(e) {
			if (e.keyCode === 27) {
				this.props.onEsc();
			}
		},
		onClear: function onClear() {
			this.setState({ str: '' });
			this.props.onClear();
		},
		getClearButton: function getClearButton() {
			var _props4 = this.props;
			var locale = _props4.locale;
			var prefixCls = _props4.prefixCls;
			var allowEmpty = _props4.allowEmpty;

			if (!allowEmpty) {
				return null;
			}
			return React.createElement('a', { className: prefixCls + '-clear-btn', role: 'button', title: locale.clear, onMouseDown: this.onClear });
		},
		getInput: function getInput() {
			var _props5 = this.props;
			var prefixCls = _props5.prefixCls;
			var placeholder = _props5.placeholder;
			var _state = this.state;
			var invalid = _state.invalid;
			var str = _state.str;

			var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
			return React.createElement('input', { className: prefixCls + '-input  ' + invalidClass,
				ref: 'input',
				onKeyDown: this.onKeyDown,
				value: str,
				placeholder: placeholder, onChange: this.onInputChange });
		},
		selectRange: function selectRange() {
			this.refs.input.focus();
			if (this.props.currentSelectPanel && this.refs.input.value) {
				var selectionRangeStart = 0;
				var selectionRangeEnd = 0;
				if (this.props.currentSelectPanel === 'hour') {
					selectionRangeStart = 0;
					selectionRangeEnd = this.refs.input.value.indexOf(':');
				} else if (this.props.currentSelectPanel === 'minute') {
					selectionRangeStart = this.refs.input.value.indexOf(':') + 1;
					selectionRangeEnd = this.refs.input.value.lastIndexOf(':');
				} else if (this.props.currentSelectPanel === 'second') {
					selectionRangeStart = this.refs.input.value.lastIndexOf(':') + 1;
					selectionRangeEnd = this.refs.input.value.length;
				}
				if (selectionRangeEnd - selectionRangeStart === 2) {
					createSelection(this.refs.input, selectionRangeStart, selectionRangeEnd);
				}
			}
		},
		render: function render() {
			var prefixCls = this.props.prefixCls;

			return React.createElement(
				'div',
				{ className: prefixCls + '-input-wrap' },
				this.getInput(),
				this.getClearButton()
			);
		}
	});

	var formatOption = function formatOption(option, disabledOptions) {
		var value = '' + option;
		if (option < 10) {
			value = '0' + option;
		}

		var disabled = false;
		if (disabledOptions && disabledOptions.indexOf(option) >= 0) {
			disabled = true;
		}

		return {
			value: value,
			disabled: disabled
		};
	};

	var Combobox = React.createClass({
		displayName: 'Combobox',

		propTypes: {
			formatter: PropTypes.object,
			prefixCls: PropTypes.string,
			value: PropTypes.object,
			onChange: PropTypes.func,
			showHour: PropTypes.bool,
			gregorianCalendarLocale: PropTypes.object,
			showSecond: PropTypes.bool,
			hourOptions: PropTypes.array,
			minuteOptions: PropTypes.array,
			secondOptions: PropTypes.array,
			disabledHours: PropTypes.func,
			disabledMinutes: PropTypes.func,
			disabledSeconds: PropTypes.func,
			onCurrentSelectPanelChange: PropTypes.func
		},

		onItemChange: function onItemChange(type, itemValue) {
			var onChange = this.props.onChange;

			var value = this.props.value;
			if (value) {
				value = value.clone();
			} else {
				value = this.getNow().clone();
			}
			if (type === 'hour') {
				value.setHourOfDay(itemValue);
			} else if (type === 'minute') {
				value.setMinutes(itemValue);
			} else {
				value.setSeconds(itemValue);
			}
			onChange(value);
		},
		onEnterSelectPanel: function onEnterSelectPanel(range) {
			this.props.onCurrentSelectPanelChange(range);
		},
		getHourSelect: function getHourSelect(hour) {
			var _props6 = this.props;
			var prefixCls = _props6.prefixCls;
			var hourOptions = _props6.hourOptions;
			var disabledHours = _props6.disabledHours;
			var showHour = _props6.showHour;

			if (!showHour) {
				return null;
			}
			var disabledOptions = disabledHours();

			return React.createElement(Select, {
				prefixCls: prefixCls,
				options: hourOptions.map(function (option) {
					return formatOption(option, disabledOptions);
				}),
				selectedIndex: hourOptions.indexOf(hour),
				type: 'hour',
				onSelect: this.onItemChange,
				onMouseEnter: this.onEnterSelectPanel.bind(this, 'hour')
			});
		},
		getMinuteSelect: function getMinuteSelect(minute) {
			var _props7 = this.props;
			var prefixCls = _props7.prefixCls;
			var minuteOptions = _props7.minuteOptions;
			var disabledMinutes = _props7.disabledMinutes;

			var value = this.props.value || this.getNow();
			var disabledOptions = disabledMinutes(value.getHourOfDay());

			return React.createElement(Select, {
				prefixCls: prefixCls,
				options: minuteOptions.map(function (option) {
					return formatOption(option, disabledOptions);
				}),
				selectedIndex: minuteOptions.indexOf(minute),
				type: 'minute',
				onSelect: this.onItemChange,
				onMouseEnter: this.onEnterSelectPanel.bind(this, 'minute')
			});
		},
		getSecondSelect: function getSecondSelect(second) {
			var _props8 = this.props;
			var prefixCls = _props8.prefixCls;
			var secondOptions = _props8.secondOptions;
			var disabledSeconds = _props8.disabledSeconds;
			var showSecond = _props8.showSecond;

			if (!showSecond) {
				return null;
			}
			var value = this.props.value || this.getNow();
			var disabledOptions = disabledSeconds(value.getHourOfDay(), value.getMinutes());

			return React.createElement(Select, {
				prefixCls: prefixCls,
				options: secondOptions.map(function (option) {
					return formatOption(option, disabledOptions);
				}),
				selectedIndex: secondOptions.indexOf(second),
				type: 'second',
				onSelect: this.onItemChange,
				onMouseEnter: this.onEnterSelectPanel.bind(this, 'second')
			});
		},
		getNow: function getNow() {
			if (this.showNow) {
				return this.showNow;
			}
			var value = new GregorianCalendar(this.props.gregorianCalendarLocale);
			value.setTime(Date.now());
			this.showNow = value;
			return value;
		},
		render: function render() {
			var prefixCls = this.props.prefixCls;

			var value = this.props.value || this.getNow();
			return React.createElement(
				'div',
				{ className: prefixCls + '-combobox' },
				this.getHourSelect(value.getHourOfDay()),
				this.getMinuteSelect(value.getMinutes()),
				this.getSecondSelect(value.getSeconds())
			);
		}
	});

	function generateOptions(length, disabledOptions, hideDisabledOptions) {
		var arr = [];
		for (var value = 0; value < length; value++) {
			if (!disabledOptions || disabledOptions.indexOf(value) < 0 || !hideDisabledOptions) {
				arr.push(value);
			}
		}
		return arr;
	}

	var Panel = React.createClass({
		displayName: 'Panel',

		propTypes: {
			prefixCls: PropTypes.string,
			value: PropTypes.object,
			locale: PropTypes.object,
			placeholder: PropTypes.string,
			gregorianCalendarLocale: PropTypes.object,
			formatter: PropTypes.object,
			disabledHours: PropTypes.func,
			disabledMinutes: PropTypes.func,
			disabledSeconds: PropTypes.func,
			hideDisabledOptions: PropTypes.bool,
			onChange: PropTypes.func,
			onEsc: PropTypes.func,
			allowEmpty: PropTypes.bool,
			showHour: PropTypes.bool,
			showSecond: PropTypes.bool,
			onClear: PropTypes.func
		},

		mixins: [CommonMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				onChange: noop,
				onClear: noop
			};
		},
		getInitialState: function getInitialState() {
			return {
				value: this.props.value,
				selectionRange: []
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var value = nextProps.value;
			if (value) {
				this.setState({
					value: value
				});
			}
		},
		onChange: function onChange(newValue) {
			this.setState({ value: newValue });
			this.props.onChange(newValue);
		},
		onClear: function onClear() {
			this.props.onClear();
		},
		onCurrentSelectPanelChange: function onCurrentSelectPanelChange(currentSelectPanel) {
			this.setState({ currentSelectPanel: currentSelectPanel });
		},
		render: function render() {
			var _props9 = this.props;
			var locale = _props9.locale;
			var prefixCls = _props9.prefixCls;
			var placeholder = _props9.placeholder;
			var disabledHours = _props9.disabledHours;
			var disabledMinutes = _props9.disabledMinutes;
			var disabledSeconds = _props9.disabledSeconds;
			var hideDisabledOptions = _props9.hideDisabledOptions;
			var allowEmpty = _props9.allowEmpty;
			var showHour = _props9.showHour;
			var showSecond = _props9.showSecond;
			var formatter = _props9.formatter;
			var gregorianCalendarLocale = _props9.gregorianCalendarLocale;

			var value = this.state.value;
			var disabledHourOptions = disabledHours();
			var disabledMinuteOptions = disabledMinutes(value ? value.getHourOfDay() : null);
			var disabledSecondOptions = disabledSeconds(value ? value.getHourOfDay() : null, value ? value.getMinutes() : null);
			var hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions);
			var minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions);
			var secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions);

			return React.createElement(
				'div',
				{ className: prefixCls + '-inner' },
				React.createElement(Header, {
					prefixCls: prefixCls,
					gregorianCalendarLocale: gregorianCalendarLocale,
					locale: locale,
					value: value,
					currentSelectPanel: this.state.currentSelectPanel,
					onEsc: this.props.onEsc,
					formatter: formatter,
					placeholder: placeholder,
					hourOptions: hourOptions,
					minuteOptions: minuteOptions,
					secondOptions: secondOptions,
					disabledHours: disabledHours,
					disabledMinutes: disabledMinutes,
					disabledSeconds: disabledSeconds,
					onChange: this.onChange,
					onClear: this.onClear,
					allowEmpty: allowEmpty
				}),
				React.createElement(Combobox, {
					prefixCls: prefixCls,
					value: value,
					gregorianCalendarLocale: gregorianCalendarLocale,
					formatter: formatter,
					onChange: this.onChange,
					showHour: showHour,
					showSecond: showSecond,
					hourOptions: hourOptions,
					minuteOptions: minuteOptions,
					secondOptions: secondOptions,
					disabledHours: disabledHours,
					disabledMinutes: disabledMinutes,
					disabledSeconds: disabledSeconds,
					onCurrentSelectPanelChange: this.onCurrentSelectPanelChange
				})
			);
		}
	});

	function refFn(field, component) {
		this[field] = component;
	}

	var Picker = React.createClass({
		displayName: 'Picker',

		propTypes: {
			prefixCls: PropTypes.string,
			locale: PropTypes.object,
			value: PropTypes.object,
			disabled: PropTypes.bool,
			allowEmpty: PropTypes.bool,
			defaultValue: PropTypes.object,
			open: PropTypes.bool,
			defaultOpen: PropTypes.bool,
			align: PropTypes.object,
			placement: PropTypes.any,
			transitionName: PropTypes.string,
			getPopupContainer: PropTypes.func,
			placeholder: PropTypes.string,
			formatter: PropTypes.any,
			showHour: PropTypes.bool,
			style: PropTypes.object,
			className: PropTypes.string,
			showSecond: PropTypes.bool,
			disabledHours: PropTypes.func,
			disabledMinutes: PropTypes.func,
			disabledSeconds: PropTypes.func,
			hideDisabledOptions: PropTypes.bool,
			onChange: PropTypes.func,
			onOpen: PropTypes.func,
			onClose: PropTypes.func
		},

		mixins: [CommonMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				defaultOpen: false,
				style: {},
				className: '',
				align: {},
				allowEmpty: true,
				showHour: true,
				showSecond: true,
				disabledHours: noop,
				disabledMinutes: noop,
				disabledSeconds: noop,
				hideDisabledOptions: false,
				placement: 'bottomLeft',
				onChange: noop,
				onOpen: noop,
				onClose: noop
			};
		},
		getInitialState: function getInitialState() {
			this.savePanelRef = refFn.bind(this, 'panelInstance');
			var _props10 = this.props;
			var defaultOpen = _props10.defaultOpen;
			var defaultValue = _props10.defaultValue;
			var _props10$open = _props10.open;
			var open = _props10$open === undefined ? defaultOpen : _props10$open;
			var _props10$value = _props10.value;
			var value = _props10$value === undefined ? defaultValue : _props10$value;

			return {
				open: open,
				value: value
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var value = nextProps.value;
			var open = nextProps.open;

			if ('value' in nextProps) {
				this.setState({
					value: value
				});
			}
			if (open !== undefined) {
				this.setState({ open: open });
			}
		},
		onPanelChange: function onPanelChange(value) {
			this.setValue(value);
		},
		onPanelClear: function onPanelClear() {
			this.setValue(null);
			this.setOpen(false);
		},
		onVisibleChange: function onVisibleChange(open) {
			this.setOpen(open);
		},
		onEsc: function onEsc() {
			this.setOpen(false);
			this.refs.picker.focus();
		},
		onKeyDown: function onKeyDown(e) {
			if (e.keyCode === 40) {
				this.setOpen(true);
			}
		},
		setValue: function setValue(value) {
			if (!('value' in this.props)) {
				this.setState({
					value: value
				});
			}
			this.props.onChange(value);
		},
		getFormatter: function getFormatter() {
			var formatter = this.props.formatter;
			var locale = this.props.locale;
			if (formatter) {
				if (formatter === this.lastFormatter) {
					return this.normalFormatter;
				}
				this.normalFormatter = _getFormatter(formatter, locale);
				this.lastFormatter = formatter;
				return this.normalFormatter;
			}
			if (!this.props.showSecond) {
				if (!this.notShowSecondFormatter) {
					this.notShowSecondFormatter = _getFormatter('HH:mm', locale);
				}
				return this.notShowSecondFormatter;
			}
			if (!this.props.showHour) {
				if (!this.notShowHourFormatter) {
					this.notShowHourFormatter = _getFormatter('mm:ss', locale);
				}
				return this.notShowHourFormatter;
			}
			if (!this.normalFormatter) {
				this.normalFormatter = _getFormatter('HH:mm:ss', locale);
			}
			return this.normalFormatter;
		},
		getPanelElement: function getPanelElement() {
			var _props11 = this.props;
			var prefixCls = _props11.prefixCls;
			var defaultValue = _props11.defaultValue;
			var locale = _props11.locale;
			var placeholder = _props11.placeholder;
			var disabledHours = _props11.disabledHours;
			var disabledMinutes = _props11.disabledMinutes;
			var disabledSeconds = _props11.disabledSeconds;
			var hideDisabledOptions = _props11.hideDisabledOptions;
			var allowEmpty = _props11.allowEmpty;
			var showHour = _props11.showHour;
			var showSecond = _props11.showSecond;

			return React.createElement(Panel, {
				prefixCls: prefixCls + '-panel',
				ref: this.savePanelRef,
				value: this.state.value,
				onChange: this.onPanelChange,
				gregorianCalendarLocale: locale.calendar,
				onClear: this.onPanelClear,
				defaultValue: defaultValue,
				showHour: showHour,
				onEsc: this.onEsc,
				showSecond: showSecond,
				locale: locale,
				allowEmpty: allowEmpty,
				formatter: this.getFormatter(),
				placeholder: placeholder,
				disabledHours: disabledHours,
				disabledMinutes: disabledMinutes,
				disabledSeconds: disabledSeconds,
				hideDisabledOptions: hideDisabledOptions
			});
		},
		setOpen: function setOpen(open, callback) {
			var _props12 = this.props;
			var onOpen = _props12.onOpen;
			var onClose = _props12.onClose;

			if (this.state.open !== open) {
				this.setState({
					open: open
				}, callback);
				var event = {
					open: open
				};
				if (open) {
					onOpen(event);
				} else {
					onClose(event);
				}
			}
		},
		render: function render() {
			var _props13 = this.props;
			var prefixCls = _props13.prefixCls;
			var placeholder = _props13.placeholder;
			var placement = _props13.placement;
			var align = _props13.align;
			var disabled = _props13.disabled;
			var transitionName = _props13.transitionName;
			var style = _props13.style;
			var className = _props13.className;
			var showHour = _props13.showHour;
			var showSecond = _props13.showSecond;
			var getPopupContainer = _props13.getPopupContainer;
			var _state2 = this.state;
			var open = _state2.open;
			var value = _state2.value;

			var popupClassName = undefined;
			if (!showHour || !showSecond) {
				popupClassName = prefixCls + '-panel-narrow';
			}
			return React.createElement(
				Trigger,
				{
					prefixCls: prefixCls + '-panel',
					popupClassName: popupClassName,
					popup: this.getPanelElement(),
					popupAlign: align,
					builtinPlacements: placements,
					popupPlacement: placement,
					action: disabled ? [] : ['click'],
					destroyPopupOnHide: true,
					getPopupContainer: getPopupContainer,
					popupTransitionName: transitionName,
					popupVisible: open,
					onPopupVisibleChange: this.onVisibleChange
				},
				React.createElement(
					'span',
					{ className: prefixCls + ' ' + className, style: style },
					React.createElement('input', { className: prefixCls + '-input',
						ref: 'picker', type: 'text', placeholder: placeholder,
						readOnly: true,
						onKeyDown: this.onKeyDown,
						disabled: disabled, value: value && this.getFormatter().format(value) }),
					React.createElement('span', { className: prefixCls + '-icon' })
				)
			);
		}
	});

	RC.TimePicker = Picker;
})(Smart.RC);
'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
		var _ref = _;
		var noop = _ref.noop;
		var GregorianCalendar = RC.GregorianCalendar;
		var DateTimeFormat = RC.DateTimeFormat;
		var KeyCode = RC.KeyCode;
		var Locale = RC.Locale;
		var classnames = RC.classnames;
		var Util = RC.Util;
		var Trigger = RC.Trigger;
		var createChainedFunction = Util.createChainedFunction;
		var Children = Util.Children;
		var _React = React;
		var Component = _React.Component;
		var PropTypes = _React.PropTypes;
		var toFragment = Children.mapSelf;

		var defaultDisabledTime = {
				disabledHours: function disabledHours() {
						return [];
				},
				disabledMinutes: function disabledMinutes() {
						return [];
				},
				disabledSeconds: function disabledSeconds() {
						return [];
				}
		};

		function getTodayTime(value) {
				var today = value.clone();
				today.setTime(Date.now());
				return today;
		}

		function getTitleString(value) {
				return value.getYear() + '-' + (value.getMonth() + 1) + '-' + value.getDayOfMonth();
		}

		function getTodayTimeStr(value) {
				var today = getTodayTime(value);
				return getTitleString(today);
		}

		function _getFormatter(format, locale) {
				if (typeof format === 'string') {
						return new DateTimeFormat(format, locale.format);
				}
				return format;
		}

		function syncTime(from, to) {
				to.setHourOfDay(from.getHourOfDay());
				to.setMinutes(from.getMinutes());
				to.setSeconds(from.getSeconds());
		}

		function getTimeConfig(value, disabledTime) {
				var disabledTimeConfig = disabledTime ? disabledTime(value) : {};
				disabledTimeConfig = _extends({}, defaultDisabledTime, disabledTimeConfig);
				return disabledTimeConfig;
		}

		function isTimeValidByConfig(value, disabledTimeConfig) {
				var invalidTime = false;
				if (value) {
						var hour = value.getHourOfDay();
						var minutes = value.getMinutes();
						var seconds = value.getSeconds();
						var disabledHours = disabledTimeConfig.disabledHours();
						if (disabledHours.indexOf(hour) === -1) {
								var disabledMinutes = disabledTimeConfig.disabledMinutes(hour);
								if (disabledMinutes.indexOf(minutes) === -1) {
										var disabledSeconds = disabledTimeConfig.disabledSeconds(hour, minutes);
										invalidTime = disabledSeconds.indexOf(seconds) !== -1;
								} else {
										invalidTime = true;
								}
						} else {
								invalidTime = true;
						}
				}
				return !invalidTime;
		}

		function isTimeValid(value, disabledTime) {
				var disabledTimeConfig = getTimeConfig(value, disabledTime);
				return isTimeValidByConfig(value, disabledTimeConfig);
		}

		function _isAllowedDate(value, disabledDate, disabledTime) {
				if (disabledDate) {
						if (disabledDate(value)) {
								return false;
						}
				}
				if (disabledTime) {
						if (!isTimeValid(value, disabledTime)) {
								return false;
						}
				}
				return true;
		}

		var DateConstants = {
				DATE_ROW_COUNT: 6,
				DATE_COL_COUNT: 7
		};

		var DateTHead = (function (_React$Component) {
				_inherits(DateTHead, _React$Component);

				function DateTHead() {
						_classCallCheck(this, DateTHead);

						return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTHead).apply(this, arguments));
				}

				_createClass(DateTHead, [{
						key: 'render',
						value: function render() {
								var props = this.props;
								var value = props.value;
								var locale = props.locale;
								var prefixCls = props.prefixCls;
								var veryShortWeekdays = [];
								var weekDays = [];
								var firstDayOfWeek = value.getFirstDayOfWeek();
								var showWeekNumberEl = undefined;

								for (var dateColIndex = 0; dateColIndex < DateConstants.DATE_COL_COUNT; dateColIndex++) {
										var index = (firstDayOfWeek + dateColIndex) % DateConstants.DATE_COL_COUNT;
										veryShortWeekdays[dateColIndex] = locale.format.veryShortWeekdays[index];
										weekDays[dateColIndex] = locale.format.weekdays[index];
								}

								if (props.showWeekNumber) {
										showWeekNumberEl = React.createElement(
												'th',
												{ role: 'columnheader', className: prefixCls + '-column-header ' + prefixCls + '-week-number-header' },
												React.createElement(
														'span',
														{ className: prefixCls + '-column-header-inner' },
														'x'
												)
										);
								}
								var weekDaysEls = weekDays.map(function (day, xindex) {
										return React.createElement(
												'th',
												{ key: xindex, role: 'columnheader', title: day, className: prefixCls + '-column-header' },
												React.createElement(
														'span',
														{ className: prefixCls + '-column-header-inner' },
														veryShortWeekdays[xindex]
												)
										);
								});
								return React.createElement(
										'thead',
										null,
										React.createElement(
												'tr',
												{ role: 'row' },
												showWeekNumberEl,
												weekDaysEls
										)
								);
						}
				}]);

				return DateTHead;
		})(React.Component);

		function isSameDay(one, two) {
				return one && two && one.compareToDay(two) === 0;
		}

		function beforeCurrentMonthYear(current, today) {
				if (current.getYear() < today.getYear()) {
						return 1;
				}
				return current.getYear() === today.getYear() && current.getMonth() < today.getMonth();
		}

		function afterCurrentMonthYear(current, today) {
				if (current.getYear() > today.getYear()) {
						return 1;
				}
				return current.getYear() === today.getYear() && current.getMonth() > today.getMonth();
		}

		function getIdFromDate(date) {
				return 'rc-calendar-' + date.getYear() + '-' + date.getMonth() + '-' + date.getDayOfMonth();
		}

		function handleDayClick(current) {
				this.props.onSelect(current);
		}

		function handleCellMouseEnter(current) {
				this.props.onDayHover(current);
		}

		var DateTBody = React.createClass({
				displayName: 'DateTBody',
				getDefaultProps: function getDefaultProps() {
						return {
								onDayHover: noop
						};
				},
				render: function render() {
						var props = this.props;
						var iIndex = undefined;
						var jIndex = undefined;
						var current = undefined;
						var dateTable = [];
						var showWeekNumber = props.showWeekNumber;
						var value = props.value;
						var selectedValue = props.selectedValue;
						var today = value.clone();
						var prefixCls = props.prefixCls;
						var cellClass = prefixCls + '-cell';
						var weekNumberCellClass = prefixCls + '-week-number-cell';
						var dateClass = prefixCls + '-date';
						var dateRender = props.dateRender;
						var disabledDate = props.disabledDate;
						var todayClass = prefixCls + '-today';
						var selectedClass = prefixCls + '-selected-day';
						var inRangeClass = prefixCls + '-in-range-cell';
						var lastMonthDayClass = prefixCls + '-last-month-cell';
						var nextMonthDayClass = prefixCls + '-next-month-btn-day';
						var disabledClass = prefixCls + '-disabled-cell';
						var firstDisableClass = prefixCls + '-disabled-cell-first-of-row';
						var lastDisableClass = prefixCls + '-disabled-cell-last-of-row';
						today.setTime(Date.now());
						var month1 = value.clone();
						month1.set(value.getYear(), value.getMonth(), 1);
						var day = month1.getDayOfWeek();
						var lastMonthDiffDay = (day + 7 - value.getFirstDayOfWeek()) % 7;
						// calculate last month
						var lastMonth1 = month1.clone();
						lastMonth1.addDayOfMonth(0 - lastMonthDiffDay);
						var passed = 0;
						for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
								for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
										current = lastMonth1;
										if (passed) {
												current = current.clone();
												current.addDayOfMonth(passed);
										}
										dateTable.push(current);
										passed++;
								}
						}
						var tableHtml = [];
						passed = 0;
						for (iIndex = 0; iIndex < DateConstants.DATE_ROW_COUNT; iIndex++) {
								var weekNumberCell = undefined;
								var dateCells = [];
								if (showWeekNumber) {
										weekNumberCell = React.createElement(
												'td',
												{ key: dateTable[passed].getWeekOfYear(), role: 'gridcell',
														className: weekNumberCellClass },
												dateTable[passed].getWeekOfYear()
										);
								}
								for (jIndex = 0; jIndex < DateConstants.DATE_COL_COUNT; jIndex++) {
										var next = null;
										var last = null;
										current = dateTable[passed];
										if (jIndex < DateConstants.DATE_COL_COUNT - 1) {
												next = dateTable[passed + 1];
										}
										if (jIndex > 0) {
												last = dateTable[passed - 1];
										}
										var cls = cellClass;
										var disabled = false;
										var selected = false;

										if (isSameDay(current, today)) {
												cls += ' ' + todayClass;
										}

										var isBeforeCurrentMonthYear = beforeCurrentMonthYear(current, value);
										var isAfterCurrentMonthYear = afterCurrentMonthYear(current, value);

										if (selectedValue && Array.isArray(selectedValue)) {
												if (!isBeforeCurrentMonthYear && !isAfterCurrentMonthYear) {
														var startValue = selectedValue[0];
														var endValue = selectedValue[1];
														if (startValue) {
																if (isSameDay(current, startValue)) {
																		selected = true;
																}
														}
														if (startValue && endValue) {
																if (isSameDay(current, endValue) && !selectedValue.hovering) {
																		selected = true;
																} else if (current.compareToDay(startValue) > 0 && current.compareToDay(endValue) < 0) {
																		cls += ' ' + inRangeClass;
																}
														}
												}
										} else if (isSameDay(current, selectedValue)) {
												selected = true;
										}
										if (isBeforeCurrentMonthYear) {
												cls += ' ' + lastMonthDayClass;
										}
										if (isAfterCurrentMonthYear) {
												cls += ' ' + nextMonthDayClass;
										}

										if (disabledDate) {
												if (disabledDate(current, value)) {
														disabled = true;

														if (!last || !disabledDate(last, value)) {
																cls += ' ' + firstDisableClass;
														}

														if (!next || !disabledDate(next, value)) {
																cls += ' ' + lastDisableClass;
														}
												}
										}

										if (selected) {
												cls += ' ' + selectedClass;
										}

										if (disabled) {
												cls += ' ' + disabledClass;
										}

										var dateHtml = undefined;
										if (dateRender) {
												dateHtml = dateRender(current, value);
										} else {
												dateHtml = React.createElement(
														'span',
														{
																key: getIdFromDate(current),
																className: dateClass,
																'aria-selected': selected,
																'aria-disabled': disabled },
														current.getDayOfMonth()
												);
										}

										dateCells.push(React.createElement(
												'td',
												{ key: passed,
														onClick: disabled ? noop : handleDayClick.bind(this, current),
														onMouseEnter: disabled ? noop : handleCellMouseEnter.bind(this, current),
														role: 'gridcell',
														title: getTitleString(current), className: cls },
												dateHtml
										));

										passed++;
								}
								tableHtml.push(React.createElement(
										'tr',
										{
												key: iIndex,
												role: 'row' },
										weekNumberCell,
										dateCells
								));
						}
						return React.createElement(
								'tbody',
								{ className: prefixCls + 'tbody' },
								tableHtml
						);
				}
		});

		var DateTable = (function (_React$Component2) {
				_inherits(DateTable, _React$Component2);

				function DateTable() {
						_classCallCheck(this, DateTable);

						return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTable).apply(this, arguments));
				}

				_createClass(DateTable, [{
						key: 'render',
						value: function render() {
								var props = this.props;
								var prefixCls = props.prefixCls;
								return React.createElement(
										'table',
										{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
										React.createElement(DateTHead, props),
										React.createElement(DateTBody, props)
								);
						}
				}]);

				return DateTable;
		})(React.Component);

		function copyTime(target, source) {
				if (source) {
						target.setHourOfDay(source.getHourOfDay());
						target.setMinutes(source.getMinutes());
						target.setSeconds(source.getSeconds());
				}
				return target;
		}

		var DateInput = React.createClass({
				displayName: 'DateInput',

				propTypes: {
						formatter: PropTypes.object,
						locale: PropTypes.object,
						gregorianCalendarLocale: PropTypes.object,
						disabledDate: PropTypes.func,
						onChange: PropTypes.func,
						onClear: PropTypes.func,
						placeholder: PropTypes.string,
						onSelect: PropTypes.func,
						selectedValue: PropTypes.object
				},

				getInitialState: function getInitialState() {
						var selectedValue = this.props.selectedValue;
						return {
								str: selectedValue && this.props.formatter.format(selectedValue) || '',
								invalid: false
						};
				},
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
						// when popup show, click body will call this, bug!
						var selectedValue = nextProps.selectedValue;
						this.setState({
								str: selectedValue && nextProps.formatter.format(selectedValue) || '',
								invalid: false
						});
				},
				onInputChange: function onInputChange(event) {
						var str = event.target.value;
						this.setState({
								str: str
						});
						var value = undefined;
						var _props = this.props;
						var disabledDate = _props.disabledDate;
						var formatter = _props.formatter;
						var gregorianCalendarLocale = _props.gregorianCalendarLocale;
						var onChange = _props.onChange;

						if (str) {
								try {
										value = copyTime(formatter.parse(str, {
												locale: gregorianCalendarLocale,
												obeyCount: true
										}), this.props.selectedValue);
								} catch (ex) {
										this.setState({
												invalid: true
										});
										return;
								}
								if (value && (!disabledDate || !disabledDate(value))) {
										var originalValue = this.props.selectedValue;
										if (originalValue && value) {
												if (originalValue.getTime() !== value.getTime()) {
														onChange(value);
												}
										} else if (originalValue !== value) {
												onChange(value);
										}
								} else {
										this.setState({
												invalid: true
										});
										return;
								}
						} else {
								onChange(null);
						}
						this.setState({
								invalid: false
						});
				},
				onClear: function onClear() {
						this.setState({ str: '' });
						this.props.onClear(null);
				},
				getRootDOMNode: function getRootDOMNode() {
						return ReactDOM.findDOMNode(this);
				},
				render: function render() {
						var props = this.props;
						var _state = this.state;
						var invalid = _state.invalid;
						var str = _state.str;
						var selectedValue = props.selectedValue;
						var locale = props.locale;
						var prefixCls = props.prefixCls;
						var placeholder = props.placeholder;
						var onChange = props.onChange;
						var timePicker = props.timePicker;
						var disabledTime = props.disabledTime;
						var gregorianCalendarLocale = props.gregorianCalendarLocale;

						var invalidClass = invalid ? prefixCls + '-input-invalid' : '';
						var disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
						return React.createElement(
								'div',
								{ className: prefixCls + '-input-wrap' },
								React.createElement(
										'div',
										{ className: prefixCls + '-time-picker-wrap' },
										timePicker ? React.cloneElement(timePicker, _extends({
												showClear: false,
												allowEmpty: false,
												getPopupContainer: this.getRootDOMNode,
												gregorianCalendarLocale: gregorianCalendarLocale,
												value: selectedValue,
												onChange: onChange
										}, disabledTimeConfig)) : null
								),
								React.createElement(
										'div',
										{ className: prefixCls + '-date-input-wrap' },
										React.createElement('input', { className: prefixCls + '-input  ' + invalidClass,
												value: str,
												placeholder: placeholder,
												onChange: this.onInputChange })
								),
								props.showClear ? React.createElement('a', { className: prefixCls + '-clear-btn',
										role: 'button',
										title: locale.clear,
										onClick: this.onClear }) : null
						);
				}
		});

		function TodayButton(_ref2) {
				var prefixCls = _ref2.prefixCls;
				var locale = _ref2.locale;
				var value = _ref2.value;
				var timePicker = _ref2.timePicker;
				var disabledDate = _ref2.disabledDate;
				var disabledTime = _ref2.disabledTime;
				var onToday = _ref2.onToday;

				var disabledToday = false;
				var localeNow = locale.today;
				if (timePicker) {
						localeNow = locale.now || locale.today;
				}
				var disabledTodayClass = '';
				if (disabledDate) {
						disabledToday = !_isAllowedDate(getTodayTime(value), disabledDate, disabledTime);
						if (disabledToday) {
								disabledTodayClass = prefixCls + '-today-btn-disabled';
						}
				}
				return React.createElement(
						'a',
						{ className: prefixCls + '-today-btn ' + disabledTodayClass,
								role: 'button',
								onClick: disabledToday ? null : onToday,
								title: getTodayTimeStr(value) },
						localeNow
				);
		}

		function OkButton(_ref3) {
				var prefixCls = _ref3.prefixCls;
				var locale = _ref3.locale;
				var okDisabled = _ref3.okDisabled;
				var onOk = _ref3.onOk;

				var className = prefixCls + '-ok-btn';
				if (okDisabled) {
						className += ' ' + prefixCls + '-ok-btn-disabled';
				}
				return React.createElement(
						'a',
						{ className: className,
								role: 'button',
								onClick: okDisabled ? null : onOk },
						locale.ok
				);
		}

		var DecadePanel = (function () {

				var ROW = 4;
				var COL = 3;

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setState({
								value: next
						});
				}

				function chooseDecade(year, event) {
						var next = this.state.value.clone();
						next.setYear(year);
						next.rollSetMonth(this.state.value.getMonth());
						this.props.onSelect(next);
						event.preventDefault();
				}

				var DecadePanel = (function (_React$Component3) {
						_inherits(DecadePanel, _React$Component3);

						function DecadePanel(props) {
								_classCallCheck(this, DecadePanel);

								var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(DecadePanel).call(this, props));

								_this3.state = {
										value: props.value || props.defaultValue
								};

								// bind methods
								_this3.prefixCls = props.rootPrefixCls + '-decade-panel';
								_this3.nextCentury = goYear.bind(_this3, 100);
								_this3.previousCentury = goYear.bind(_this3, -100);
								return _this3;
						}

						_createClass(DecadePanel, [{
								key: 'render',
								value: function render() {
										var _this4 = this;

										var value = this.state.value;
										var locale = this.props.locale;
										var currentYear = value.getYear();
										var startYear = parseInt(currentYear / 100, 10) * 100;
										var preYear = startYear - 10;
										var endYear = startYear + 99;
										var decades = [];
										var index = 0;
										var prefixCls = this.prefixCls;

										for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
												decades[rowIndex] = [];
												for (var colIndex = 0; colIndex < COL; colIndex++) {
														var startDecade = preYear + index * 10;
														var endDecade = preYear + index * 10 + 9;
														decades[rowIndex][colIndex] = {
																startDecade: startDecade,
																endDecade: endDecade
														};
														index++;
												}
										}

										var decadesEls = decades.map(function (row, decadeIndex) {
												var tds = row.map(function (decadeData) {
														var _classNameMap;

														var dStartDecade = decadeData.startDecade;
														var dEndDecade = decadeData.endDecade;
														var isLast = dStartDecade < startYear;
														var isNext = dEndDecade > endYear;
														var classNameMap = (_classNameMap = {}, _defineProperty(_classNameMap, prefixCls + '-cell', 1), _defineProperty(_classNameMap, prefixCls + '-selected-cell', dStartDecade <= currentYear && currentYear <= dEndDecade), _defineProperty(_classNameMap, prefixCls + '-last-century-cell', isLast), _defineProperty(_classNameMap, prefixCls + '-next-century-cell', isNext), _classNameMap);
														var content = undefined;
														var clickHandler = undefined;
														if (isLast) {
																clickHandler = _this4.previousCentury;
														} else if (isNext) {
																clickHandler = _this4.nextCentury;
														} else {
																content = dStartDecade + '-' + dEndDecade;
																clickHandler = chooseDecade.bind(_this4, dStartDecade);
														}
														return React.createElement(
																'td',
																{
																		key: dStartDecade,
																		onClick: clickHandler,
																		role: 'gridcell',
																		className: classnames(classNameMap)
																},
																React.createElement(
																		'a',
																		{
																				className: prefixCls + '-decade' },
																		content
																)
														);
												});
												return React.createElement(
														'tr',
														{ key: decadeIndex, role: 'row' },
														tds
												);
										});

										return React.createElement(
												'div',
												{ className: this.prefixCls },
												React.createElement(
														'div',
														{ className: prefixCls + '-header' },
														React.createElement(
																'a',
																{ className: prefixCls + '-prev-century-btn',
																		role: 'button',
																		onClick: this.previousCentury,
																		title: locale.previousCentury },
																'«'
														),
														React.createElement(
																'div',
																{ className: prefixCls + '-century' },
																startYear,
																'-',
																endYear
														),
														React.createElement(
																'a',
																{ className: prefixCls + '-next-century-btn',
																		role: 'button',
																		onClick: this.nextCentury,
																		title: locale.nextCentury },
																'»'
														)
												),
												React.createElement(
														'div',
														{ className: prefixCls + '-body' },
														React.createElement(
																'table',
																{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
																React.createElement(
																		'tbody',
																		{ className: prefixCls + '-tbody' },
																		decadesEls
																)
														)
												)
										);
								}
						}]);

						return DecadePanel;
				})(React.Component);

				DecadePanel.propTypes = {
						locale: PropTypes.object,
						value: PropTypes.object,
						defaultValue: PropTypes.object,
						rootPrefixCls: PropTypes.string
				};

				DecadePanel.defaultProps = {
						onSelect: function onSelect() {}
				};
				return DecadePanel;
		})();

		var YearPanel = (function () {

				var ROW = 4;
				var COL = 3;

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setState({ value: next });
				}

				function chooseYear(year) {
						var next = this.state.value.clone();
						next.setYear(year);
						next.rollSetMonth(this.state.value.getMonth());
						this.props.onSelect(next);
				}

				var YearPanel = (function (_React$Component4) {
						_inherits(YearPanel, _React$Component4);

						function YearPanel(props) {
								_classCallCheck(this, YearPanel);

								var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(YearPanel).call(this, props));

								_this5.prefixCls = props.rootPrefixCls + '-year-panel';
								_this5.state = {
										value: props.value || props.defaultValue
								};
								_this5.nextDecade = goYear.bind(_this5, 10);
								_this5.previousDecade = goYear.bind(_this5, -10);
								['showDecadePanel', 'onDecadePanelSelect'].forEach(function (method) {
										_this5[method] = _this5[method].bind(_this5);
								});
								return _this5;
						}

						_createClass(YearPanel, [{
								key: 'onDecadePanelSelect',
								value: function onDecadePanelSelect(current) {
										this.setState({
												value: current,
												showDecadePanel: 0
										});
								}
						}, {
								key: 'getYears',
								value: function getYears() {
										var value = this.state.value;
										var currentYear = value.getYear();
										var startYear = parseInt(currentYear / 10, 10) * 10;
										var previousYear = startYear - 1;
										var endYear = startYear + 9;
										var years = [];
										var index = 0;
										for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
												years[rowIndex] = [];
												for (var colIndex = 0; colIndex < COL; colIndex++) {
														var year = previousYear + index;
														var content = undefined;
														if (year < startYear) {
																content = '';
														} else if (year > endYear) {
																content = '';
														} else {
																content = year + '';
														}
														years[rowIndex][colIndex] = {
																content: content,
																year: year,
																title: content
														};
														index++;
												}
										}
										return years;
								}
						}, {
								key: 'showDecadePanel',
								value: function showDecadePanel() {
										this.setState({
												showDecadePanel: 1
										});
								}
						}, {
								key: 'render',
								value: function render() {
										var _this6 = this;

										var props = this.props;
										var value = this.state.value;
										var locale = props.locale;
										var years = this.getYears();
										var currentYear = value.getYear();
										var startYear = parseInt(currentYear / 10, 10) * 10;
										var endYear = startYear + 9;
										var prefixCls = this.prefixCls;

										var yeasEls = years.map(function (row, index) {
												var tds = row.map(function (yearData) {
														var _classNameMap2;

														var classNameMap = (_classNameMap2 = {}, _defineProperty(_classNameMap2, prefixCls + '-cell', 1), _defineProperty(_classNameMap2, prefixCls + '-selected-cell', yearData.year === currentYear), _defineProperty(_classNameMap2, prefixCls + '-last-decade-cell', yearData.year < startYear), _defineProperty(_classNameMap2, prefixCls + '-next-decade-cell', yearData.year > endYear), _classNameMap2);
														var clickHandler = undefined;
														if (yearData.year < startYear) {
																clickHandler = _this6.previousDecade;
														} else if (yearData.year > endYear) {
																clickHandler = _this6.nextDecade;
														} else {
																clickHandler = chooseYear.bind(_this6, yearData.year);
														}
														return React.createElement(
																'td',
																{ role: 'gridcell',
																		title: yearData.title,
																		key: yearData.content,
																		onClick: clickHandler,
																		className: classnames(classNameMap)
																},
																React.createElement(
																		'a',
																		{
																				className: prefixCls + '-year' },
																		yearData.content
																)
														);
												});
												return React.createElement(
														'tr',
														{ key: index, role: 'row' },
														tds
												);
										});

										var decadePanel = undefined;
										if (this.state.showDecadePanel) {
												decadePanel = React.createElement(DecadePanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls,
														onSelect: this.onDecadePanelSelect });
										}

										return React.createElement(
												'div',
												{ className: this.prefixCls },
												React.createElement(
														'div',
														null,
														React.createElement(
																'div',
																{ className: prefixCls + '-header' },
																React.createElement(
																		'a',
																		{ className: prefixCls + '-prev-decade-btn',
																				role: 'button',
																				onClick: this.previousDecade,
																				title: locale.previousDecade },
																		'«'
																),
																React.createElement(
																		'a',
																		{ className: prefixCls + '-decade-select',
																				role: 'button',
																				onClick: this.showDecadePanel,
																				title: locale.decadeSelect },
																		React.createElement(
																				'span',
																				{ className: prefixCls + '-decade-select-content' },
																				startYear,
																				'-',
																				endYear
																		),
																		React.createElement(
																				'span',
																				{ className: prefixCls + '-decade-select-arrow' },
																				'x'
																		)
																),
																React.createElement(
																		'a',
																		{ className: prefixCls + '-next-decade-btn',
																				role: 'button',
																				onClick: this.nextDecade,
																				title: locale.nextDecade },
																		'»'
																)
														),
														React.createElement(
																'div',
																{ className: prefixCls + '-body' },
																React.createElement(
																		'table',
																		{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
																		React.createElement(
																				'tbody',
																				{ className: prefixCls + '-tbody' },
																				yeasEls
																		)
																)
														)
												),
												decadePanel
										);
								}
						}]);

						return YearPanel;
				})(React.Component);

				YearPanel.propTypes = {
						rootPrefixCls: PropTypes.string,
						value: PropTypes.object,
						defaultValue: PropTypes.object
				};

				YearPanel.defaultProps = {
						onSelect: function onSelect() {}
				};

				return YearPanel;
		})();

		var MonthTable = (function () {

				var ROW = 4;
				var COL = 3;

				function chooseMonth(month) {
						var next = this.state.value.clone();
						next.rollSetMonth(month);
						this.setAndSelectValue(next);
				}

				var MonthTable = (function (_Component) {
						_inherits(MonthTable, _Component);

						function MonthTable(props) {
								_classCallCheck(this, MonthTable);

								var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(MonthTable).call(this, props));

								_this7.state = {
										value: props.value
								};
								return _this7;
						}

						_createClass(MonthTable, [{
								key: 'componentWillReceiveProps',
								value: function componentWillReceiveProps(nextProps) {
										if ('value' in nextProps) {
												this.setState({
														value: nextProps.value
												});
										}
								}
						}, {
								key: 'getMonths',
								value: function getMonths() {
										var props = this.props;
										var value = this.state.value;
										var current = value.clone();
										var locale = props.locale;
										var months = [];
										var shortMonths = locale.format.shortMonths;
										var index = 0;
										for (var rowIndex = 0; rowIndex < ROW; rowIndex++) {
												months[rowIndex] = [];
												for (var colIndex = 0; colIndex < COL; colIndex++) {
														current.rollSetMonth(index);
														months[rowIndex][colIndex] = {
																value: index,
																content: shortMonths[index],
																title: shortMonths[index]
														};
														index++;
												}
										}
										return months;
								}
						}, {
								key: 'setAndSelectValue',
								value: function setAndSelectValue(value) {
										this.setState({
												value: value
										});
										this.props.onSelect(value);
								}
						}, {
								key: 'render',
								value: function render() {
										var _this8 = this;

										var props = this.props;
										var value = this.state.value;
										var today = value.clone();
										today.setTime(Date.now());
										var months = this.getMonths();
										var currentMonth = value.getMonth();
										var prefixCls = props.prefixCls;
										var locale = props.locale;

										var monthsEls = months.map(function (month, index) {
												var tds = month.map(function (monthData) {
														var _classNameMap3;

														var disabled = false;
														if (props.disabledDate) {
																var testValue = value.clone();
																testValue.rollSetMonth(monthData.value);
																disabled = props.disabledDate(testValue);
														}
														var classNameMap = (_classNameMap3 = {}, _defineProperty(_classNameMap3, prefixCls + '-cell', 1), _defineProperty(_classNameMap3, prefixCls + '-cell-disabled', disabled), _defineProperty(_classNameMap3, prefixCls + '-selected-cell', monthData.value === currentMonth), _defineProperty(_classNameMap3, prefixCls + '-current-cell', today.getYear() === value.getYear() && monthData.value === today.getMonth()), _classNameMap3);
														var cellEl = undefined;
														if (props.cellRender) {
																var currentValue = value.clone();
																currentValue.rollSetMonth(monthData.value);
																cellEl = props.cellRender(currentValue, locale);
														} else {
																cellEl = React.createElement(
																		'a',
																		{ className: prefixCls + '-month' },
																		monthData.content
																);
														}
														return React.createElement(
																'td',
																{ role: 'gridcell',
																		key: monthData.value,
																		onClick: disabled ? null : chooseMonth.bind(_this8, monthData.value),
																		title: monthData.title,
																		className: classnames(classNameMap) },
																cellEl
														);
												});
												return React.createElement(
														'tr',
														{ key: index, role: 'row' },
														tds
												);
										});

										return React.createElement(
												'table',
												{ className: prefixCls + '-table', cellSpacing: '0', role: 'grid' },
												React.createElement(
														'tbody',
														{ className: prefixCls + '-tbody' },
														monthsEls
												)
										);
								}
						}]);

						return MonthTable;
				})(Component);

				MonthTable.defaultProps = {
						onSelect: noop
				};
				MonthTable.propTypes = {
						onSelect: PropTypes.func,
						cellRender: PropTypes.func,
						prefixCls: PropTypes.string,
						value: PropTypes.object
				};
				return MonthTable;
		})();

		var MonthPanel = (function () {

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setAndChangeValue(next);
				}

				var MonthPanel = React.createClass({
						displayName: 'MonthPanel',

						propTypes: {
								onChange: PropTypes.func,
								disabledDate: PropTypes.func,
								onSelect: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										onChange: noop,
										onSelect: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								// bind methods
								this.nextYear = goYear.bind(this, 1);
								this.previousYear = goYear.bind(this, -1);
								this.prefixCls = props.rootPrefixCls + '-month-panel';
								return {
										value: props.value || props.defaultValue
								};
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								if ('value' in nextProps) {
										this.setState({
												value: nextProps.value
										});
								}
						},
						onYearPanelSelect: function onYearPanelSelect(current) {
								this.setState({
										showYearPanel: 0
								});
								this.setAndChangeValue(current);
						},
						setAndChangeValue: function setAndChangeValue(value) {
								this.setValue(value);
								this.props.onChange(value);
						},
						setAndSelectValue: function setAndSelectValue(value) {
								this.setValue(value);
								this.props.onSelect(value);
						},
						setValue: function setValue(value) {
								if (!('value' in this.props)) {
										this.setState({
												value: value
										});
								}
						},
						showYearPanel: function showYearPanel() {
								this.setState({
										showYearPanel: 1
								});
						},
						render: function render() {
								var props = this.props;
								var value = this.state.value;
								var locale = props.locale;
								var year = value.getYear();
								var prefixCls = this.prefixCls;
								var yearPanel = undefined;
								if (this.state.showYearPanel) {
										yearPanel = React.createElement(YearPanel, { locale: locale, value: value, rootPrefixCls: props.rootPrefixCls,
												onSelect: this.onYearPanelSelect });
								}
								return React.createElement(
										'div',
										{ className: prefixCls, style: props.style },
										React.createElement(
												'div',
												null,
												React.createElement(
														'div',
														{ className: prefixCls + '-header' },
														React.createElement(
																'a',
																{ className: prefixCls + '-prev-year-btn',
																		role: 'button',
																		onClick: this.previousYear,
																		title: locale.previousYear },
																'«'
														),
														React.createElement(
																'a',
																{ className: prefixCls + '-year-select',
																		role: 'button',
																		onClick: this.showYearPanel,
																		title: locale.yearSelect },
																React.createElement(
																		'span',
																		{ className: prefixCls + '-year-select-content' },
																		year
																),
																React.createElement(
																		'span',
																		{ className: prefixCls + '-year-select-arrow' },
																		'x'
																)
														),
														React.createElement(
																'a',
																{ className: prefixCls + '-next-year-btn',
																		role: 'button',
																		onClick: this.nextYear,
																		title: locale.nextYear },
																'»'
														)
												),
												React.createElement(
														'div',
														{ className: prefixCls + '-body' },
														React.createElement(MonthTable, {
																disabledDate: props.disabledDate,
																onSelect: this.setAndSelectValue,
																locale: locale,
																value: value,
																prefixCls: prefixCls })
												)
										),
										yearPanel
								);
						}
				});

				return MonthPanel;
		})();

		var CalendarHeader = (function () {
				function goMonth(direction) {
						var next = this.props.value.clone();
						next.addMonth(direction);
						this.props.onValueChange(next);
				}

				function goYear(direction) {
						var next = this.props.value.clone();
						next.addYear(direction);
						this.props.onValueChange(next);
				}

				var CalendarHeader = React.createClass({
						displayName: 'CalendarHeader',

						propTypes: {
								locale: PropTypes.object,
								value: PropTypes.object,
								onValueChange: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										enableNext: 1,
										enablePrev: 1
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								this.yearFormatter = _getFormatter(props.locale.yearFormat, props.locale);
								this.monthFormatter = _getFormatter(props.locale.monthFormat, props.locale);
								this.nextMonth = goMonth.bind(this, 1);
								this.previousMonth = goMonth.bind(this, -1);
								this.nextYear = goYear.bind(this, 1);
								this.previousYear = goYear.bind(this, -1);
								return {};
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var locale = this.props.locale;
								var nextLocale = nextProps.locale;

								if (nextLocale !== locale) {
										this.yearFormatter = _getFormatter(nextLocale.yearFormat, nextLocale);
										this.monthFormatter = _getFormatter(nextLocale.monthFormat, nextLocale);
								}
						},
						onSelect: function onSelect(value) {
								this.setState({
										showMonthPanel: 0,
										showYearPanel: 0
								});
								this.props.onValueChange(value);
						},
						getMonthYearElement: function getMonthYearElement() {
								var props = this.props;
								var prefixCls = props.prefixCls;
								var locale = props.locale;
								var value = this.props.value;
								var monthBeforeYear = locale.monthBeforeYear;
								var selectClassName = prefixCls + '-' + (monthBeforeYear ? 'my-select' : 'ym-select');
								var year = React.createElement(
										'a',
										{ className: prefixCls + '-year-select',
												role: 'button',
												onClick: this.showYearPanel,
												title: locale.monthSelect },
										this.yearFormatter.format(value)
								);
								var month = React.createElement(
										'a',
										{ className: prefixCls + '-month-select',
												role: 'button',
												onClick: this.showMonthPanel,
												title: locale.monthSelect },
										this.monthFormatter.format(value)
								);
								var my = [];
								if (monthBeforeYear) {
										my = [month, year];
								} else {
										my = [year, month];
								}
								return React.createElement(
										'span',
										{ className: selectClassName },
										toFragment(my)
								);
						},
						showIf: function showIf(condition, el) {
								return condition ? el : null;
						},
						showMonthPanel: function showMonthPanel() {
								this.setState({
										showMonthPanel: 1,
										showYearPanel: 0
								});
						},
						showYearPanel: function showYearPanel() {
								this.setState({
										showMonthPanel: 0,
										showYearPanel: 1
								});
						},
						render: function render() {
								var props = this.props;
								var enableNext = props.enableNext;
								var enablePrev = props.enablePrev;
								var prefixCls = props.prefixCls;
								var locale = props.locale;
								var value = props.value;

								var state = this.state;
								var PanelClass = null;
								if (state.showMonthPanel) {
										PanelClass = MonthPanel;
								} else if (state.showYearPanel) {
										PanelClass = YearPanel;
								}
								var panel = undefined;
								if (PanelClass) {
										panel = React.createElement(PanelClass, { locale: locale, defaultValue: value, rootPrefixCls: prefixCls, onSelect: this.onSelect });
								}
								return React.createElement(
										'div',
										{ className: prefixCls + '-header' },
										React.createElement(
												'div',
												{ style: { position: 'relative' } },
												this.showIf(enablePrev, React.createElement(
														'a',
														{ className: prefixCls + '-prev-year-btn',
																role: 'button',
																onClick: this.previousYear,
																title: locale.previousYear },
														'«'
												)),
												this.showIf(enablePrev, React.createElement(
														'a',
														{ className: prefixCls + '-prev-month-btn',
																role: 'button',
																onClick: this.previousMonth,
																title: locale.previousMonth },
														'‹'
												)),
												this.getMonthYearElement(),
												this.showIf(enableNext, React.createElement(
														'a',
														{ className: prefixCls + '-next-month-btn',
																onClick: this.nextMonth,
																title: locale.nextMonth },
														'›'
												)),
												this.showIf(enableNext, React.createElement(
														'a',
														{ className: prefixCls + '-next-year-btn',
																onClick: this.nextYear,
																title: locale.nextYear },
														'»'
												))
										),
										panel
								);
						}
				});

				return CalendarHeader;
		})();

		var CalendarFooter = React.createClass({
				displayName: 'CalendarFooter',

				propTypes: {
						onSelect: PropTypes.func,
						value: PropTypes.object,
						defaultValue: PropTypes.object
				},

				onSelect: function onSelect(value) {
						this.props.onSelect(value);
				},
				getRootDOMNode: function getRootDOMNode() {
						return ReactDOM.findDOMNode(this);
				},
				render: function render() {
						var props = this.props;
						var value = props.value;
						var prefixCls = props.prefixCls;
						var showDateInput = props.showDateInput;
						var disabledTime = props.disabledTime;
						var gregorianCalendarLocale = props.gregorianCalendarLocale;
						var selectedValue = props.selectedValue;

						var timePicker = !showDateInput && props.timePicker || null;
						var disabledTimeConfig = disabledTime && timePicker ? getTimeConfig(selectedValue, disabledTime) : null;
						var footerEl = null;
						if (props.showToday || timePicker) {
								var nowEl = undefined;
								if (props.showToday) {
										nowEl = React.createElement(TodayButton, _extends({}, props, { value: value }));
								}
								var okBtn = undefined;
								if (props.showOk) {
										okBtn = React.createElement(OkButton, props);
								}
								var footerBtn = undefined;
								if (nowEl || okBtn) {
										footerBtn = React.createElement(
												'span',
												{ className: prefixCls + '-footer-btn' },
												toFragment([nowEl, okBtn])
										);
								}
								if (timePicker) {
										timePicker = React.cloneElement(timePicker, _extends({
												onChange: this.onSelect,
												allowEmpty: false,
												gregorianCalendarLocale: gregorianCalendarLocale
										}, disabledTimeConfig, {
												getPopupContainer: this.getRootDOMNode,
												value: selectedValue
										}));
								}
								footerEl = React.createElement(
										'div',
										{ className: prefixCls + '-footer' },
										timePicker,
										footerBtn
								);
						}

						return footerEl;
				}
		});

		var CalendarMixin = (function () {
				function getNow() {
						var value = new GregorianCalendar();
						value.setTime(Date.now());
						return value;
				}

				function getNowByCurrentStateValue(value) {
						var ret = undefined;
						if (value) {
								ret = value.clone();
								ret.setTime(Date.now());
						} else {
								ret = getNow();
						}
						return ret;
				}

				var CalendarMixin = {
						propTypes: {
								value: PropTypes.object,
								defaultValue: PropTypes.object,
								onKeyDown: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										onKeyDown: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								var value = props.value || props.defaultValue || getNow();
								return {
										value: value,
										selectedValue: props.selectedValue || props.defaultSelectedValue
								};
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var value = nextProps.value;
								var selectedValue = nextProps.selectedValue;

								if ('value' in nextProps) {
										value = value || nextProps.defaultValue || getNowByCurrentStateValue(this.state.value);
										this.setState({
												value: value
										});
								}
								if ('selectedValue' in nextProps) {
										this.setState({
												selectedValue: selectedValue
										});
								}
						},
						onSelect: function onSelect(value, cause) {
								if (value) {
										this.setValue(value);
								}
								this.setSelectedValue(value, cause);
						},
						renderRoot: function renderRoot(newProps) {
								var _className;

								var props = this.props;
								var prefixCls = props.prefixCls;

								var className = (_className = {}, _defineProperty(_className, prefixCls, 1), _defineProperty(_className, prefixCls + '-hidden', !props.visible), _defineProperty(_className, props.className, !!props.className), _defineProperty(_className, newProps.className, !!newProps.className), _className);

								return React.createElement(
										'div',
										{ className: '' + classnames(className),
												style: this.props.style,
												tabIndex: '0', onKeyDown: this.onKeyDown },
										newProps.children
								);
						},
						setSelectedValue: function setSelectedValue(selectedValue, cause) {
								if (this.isAllowedDate(selectedValue)) {
										if (!('selectedValue' in this.props)) {
												this.setState({
														selectedValue: selectedValue
												});
										}
										this.props.onSelect(selectedValue, cause);
								}
						},
						setValue: function setValue(value) {
								var originalValue = this.state.value;
								if (!('value' in this.props)) {
										this.setState({
												value: value
										});
								}
								if (originalValue && value && originalValue.getTime() !== value.getTime() || !originalValue && value || originalValue && !value) {
										this.props.onChange(value);
								}
						},
						isAllowedDate: function isAllowedDate(value) {
								var disabledDate = this.props.disabledDate;
								var disabledTime = this.props.disabledTime;
								return _isAllowedDate(value, disabledDate, disabledTime);
						}
				};

				return CalendarMixin;
		})();

		var CommonMixin = (function () {
				return {
						propTypes: {
								className: PropTypes.string,
								locale: PropTypes.object,
								style: PropTypes.object,
								visible: PropTypes.bool,
								onSelect: PropTypes.func,
								prefixCls: PropTypes.string,
								onChange: PropTypes.func,
								onOk: PropTypes.func
						},

						getDefaultProps: function getDefaultProps() {
								return {
										locale: Locale.Calendar,
										style: {},
										visible: true,
										prefixCls: 'rc-calendar',
										className: '',
										onSelect: noop,
										onChange: noop,
										onClear: noop
								};
						},
						shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
								return this.props.visible || nextProps.visible;
						},
						getFormatter: function getFormatter() {
								var formatter = this.props.formatter;
								var locale = this.props.locale;
								if (formatter) {
										if (formatter === this.lastFormatter) {
												return this.normalFormatter;
										}
										this.normalFormatter = _getFormatter(formatter, locale);
										this.lastFormatter = formatter;
										return this.normalFormatter;
								}
								if (!this.showDateFormatter) {
										this.showDateFormatter = _getFormatter('yyyy-MM-dd', locale);
								}
								return this.showDateFormatter;
						}
				};
		})();

		var Calendar = (function () {
				function goStartMonth() {
						var next = this.state.value.clone();
						next.setDayOfMonth(1);
						this.setValue(next);
				}

				function goEndMonth() {
						var next = this.state.value.clone();
						next.setDayOfMonth(next.getActualMaximum(GregorianCalendar.MONTH));
						this.setValue(next);
				}

				function goMonth(direction) {
						var next = this.state.value.clone();
						next.addMonth(direction);
						this.setValue(next);
				}

				function goYear(direction) {
						var next = this.state.value.clone();
						next.addYear(direction);
						this.setValue(next);
				}

				function goWeek(direction) {
						var next = this.state.value.clone();
						next.addWeekOfYear(direction);
						this.setValue(next);
				}

				function goDay(direction) {
						var next = this.state.value.clone();
						next.addDayOfMonth(direction);
						this.setValue(next);
				}

				var Calendar = React.createClass({
						displayName: 'Calendar',

						propTypes: {
								value: PropTypes.object,
								selectedValue: PropTypes.object,
								defaultValue: PropTypes.object,
								className: PropTypes.string,
								locale: PropTypes.object,
								showWeekNumber: PropTypes.bool,
								style: PropTypes.object,
								showToday: PropTypes.bool,
								showDateInput: PropTypes.bool,
								visible: PropTypes.bool,
								onSelect: PropTypes.func,
								onOk: PropTypes.func,
								prefixCls: PropTypes.string,
								onKeyDown: PropTypes.func,
								timePicker: PropTypes.element,
								dateInputPlaceholder: PropTypes.string,
								onClear: PropTypes.func,
								onChange: PropTypes.func
						},

						mixins: [CommonMixin, CalendarMixin],

						getDefaultProps: function getDefaultProps() {
								return {
										showToday: true,
										showDateInput: true,
										timePicker: null,
										onOk: noop
								};
						},
						getInitialState: function getInitialState() {
								// bind methods
								this.nextMonth = goMonth.bind(this, 1);
								this.previousMonth = goMonth.bind(this, -1);
								this.nextYear = goYear.bind(this, 1);
								this.previousYear = goYear.bind(this, -1);
								return {};
						},
						onKeyDown: function onKeyDown(event) {
								if (event.target.nodeName.toLowerCase() === 'input') {
										return undefined;
								}
								var keyCode = event.keyCode;
								// mac
								var ctrlKey = event.ctrlKey || event.metaKey;
								switch (keyCode) {
										case KeyCode.DOWN:
												goWeek.call(this, 1);
												event.preventDefault();
												return 1;
										case KeyCode.UP:
												goWeek.call(this, -1);
												event.preventDefault();
												return 1;
										case KeyCode.LEFT:
												if (ctrlKey) {
														this.previousYear();
												} else {
														goDay.call(this, -1);
												}
												event.preventDefault();
												return 1;
										case KeyCode.RIGHT:
												if (ctrlKey) {
														this.nextYear();
												} else {
														goDay.call(this, 1);
												}
												event.preventDefault();
												return 1;
										case KeyCode.HOME:
												goStartMonth.call(this);
												event.preventDefault();
												return 1;
										case KeyCode.END:
												goEndMonth.call(this);
												event.preventDefault();
												return 1;
										case KeyCode.PAGE_DOWN:
												this.nextMonth();
												event.preventDefault();
												return 1;
										case KeyCode.PAGE_UP:
												this.previousMonth();
												event.preventDefault();
												return 1;
										case KeyCode.ENTER:
												this.onSelect(this.state.value);
												event.preventDefault();
												return 1;
										default:
												this.props.onKeyDown(event);
												return 1;
								}
						},
						onClear: function onClear() {
								this.onSelect(null);
								this.props.onClear();
						},
						onOk: function onOk() {
								var selectedValue = this.state.selectedValue;

								if (this.isAllowedDate(selectedValue)) {
										this.props.onOk(selectedValue);
								}
						},
						onDateInputChange: function onDateInputChange(value) {
								this.onSelect(value, {
										source: 'dateInput'
								});
						},
						onDateTableSelect: function onDateTableSelect(value) {
								this.onSelect(value);
						},
						chooseToday: function chooseToday() {
								var today = this.state.value.clone();
								today.setTime(Date.now());
								this.onSelect(today);
						},
						render: function render() {
								var props = this.props;
								var locale = props.locale;
								var prefixCls = props.prefixCls;
								var disabledDate = props.disabledDate;
								var dateInputPlaceholder = props.dateInputPlaceholder;
								var timePicker = props.timePicker;
								var disabledTime = props.disabledTime;

								var state = this.state;
								var value = state.value;
								var selectedValue = state.selectedValue;

								var dateInputElement = props.showDateInput ? React.createElement(DateInput, { formatter: this.getFormatter(),
										key: 'date-input',
										timePicker: timePicker,
										gregorianCalendarLocale: value.locale,
										locale: locale,
										placeholder: dateInputPlaceholder,
										showClear: true,
										disabledTime: disabledTime,
										disabledDate: disabledDate,
										onClear: this.onClear,
										prefixCls: prefixCls,
										selectedValue: selectedValue,
										onChange: this.onDateInputChange }) : null;
								var children = [dateInputElement, React.createElement(
										'div',
										{ key: 'date-panel',
												className: prefixCls + '-date-panel' },
										React.createElement(CalendarHeader, {
												locale: locale,
												onValueChange: this.setValue,
												value: value,
												prefixCls: prefixCls }),
										React.createElement(
												'div',
												{ className: prefixCls + '-calendar-body' },
												React.createElement(DateTable, {
														locale: locale,
														value: value,
														selectedValue: selectedValue,
														prefixCls: prefixCls,
														dateRender: props.dateRender,
														onSelect: this.onDateTableSelect,
														disabledDate: disabledDate,
														showWeekNumber: props.showWeekNumber })
										),
										React.createElement(CalendarFooter, {
												locale: locale,
												showOk: props.showOk,
												prefixCls: prefixCls,
												showToday: props.showToday,
												disabledTime: disabledTime,
												gregorianCalendarLocale: value.locale,
												showDateInput: props.showDateInput,
												timePicker: timePicker,
												selectedValue: selectedValue,
												value: value,
												disabledDate: disabledDate,
												onOk: this.onOk,
												onSelect: this.onSelect,
												onToday: this.chooseToday
										})
								)];

								return this.renderRoot({
										children: children,
										className: props.showWeekNumber ? prefixCls + '-week-number' : ''
								});
						}
				});

				return Calendar;
		})();

		var FullCalendar = (function () {
				var CalendarHeader = (function (_Component2) {
						_inherits(CalendarHeader, _Component2);

						function CalendarHeader() {
								_classCallCheck(this, CalendarHeader);

								return _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarHeader).apply(this, arguments));
						}

						_createClass(CalendarHeader, [{
								key: 'onYearChange',
								value: function onYearChange(year) {
										var newValue = this.props.value.clone();
										newValue.setYear(parseInt(year, 10));
										this.props.onValueChange(newValue);
								}
						}, {
								key: 'onMonthChange',
								value: function onMonthChange(month) {
										var newValue = this.props.value.clone();
										newValue.setMonth(parseInt(month, 10));
										this.props.onValueChange(newValue);
								}
						}, {
								key: 'getYearSelectElement',
								value: function getYearSelectElement(year) {
										var _props2 = this.props;
										var yearSelectOffset = _props2.yearSelectOffset;
										var yearSelectTotal = _props2.yearSelectTotal;
										var locale = _props2.locale;
										var prefixCls = _props2.prefixCls;
										var Select = _props2.Select;

										var start = year - yearSelectOffset;
										var end = start + yearSelectTotal;
										var suffix = locale.year === '年' ? '年' : '';

										var options = [];
										for (var index = start; index < end; index++) {
												options.push(React.createElement(
														Select.Option,
														{ key: '' + index },
														index + suffix
												));
										}
										return React.createElement(
												Select,
												{
														className: prefixCls + '-header-year-select',
														onChange: this.onYearChange.bind(this),
														dropdownStyle: { zIndex: 2000 },
														dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', fontSize: 12 },
														optionLabelProp: 'children',
														value: String(year),
														showSearch: false },
												options
										);
								}
						}, {
								key: 'getMonthSelectElement',
								value: function getMonthSelectElement(month) {
										var props = this.props;
										var months = props.locale.format.months;
										var prefixCls = props.prefixCls;

										var options = [];
										var Select = props.Select;

										for (var index = 0; index < 12; index++) {
												options.push(React.createElement(
														Select.Option,
														{ key: '' + index },
														months[index]
												));
										}

										return React.createElement(
												Select,
												{
														className: prefixCls + '-header-month-select',
														dropdownStyle: { zIndex: 2000 },
														dropdownMenuStyle: { maxHeight: 250, overflow: 'auto', overflowX: 'hidden', fontSize: 12 },
														optionLabelProp: 'children',
														value: String(month),
														showSearch: false,
														onChange: this.onMonthChange.bind(this) },
												options
										);
								}
						}, {
								key: 'changeTypeToDate',
								value: function changeTypeToDate() {
										this.props.onTypeChange('date');
								}
						}, {
								key: 'changeTypeToMonth',
								value: function changeTypeToMonth() {
										this.props.onTypeChange('month');
								}
						}, {
								key: 'render',
								value: function render() {
										var _props3 = this.props;
										var value = _props3.value;
										var locale = _props3.locale;
										var prefixCls = _props3.prefixCls;
										var type = _props3.type;
										var showTypeSwitch = _props3.showTypeSwitch;
										var headerComponents = _props3.headerComponents;

										var year = value.getYear();
										var month = value.getMonth();
										var yearSelect = this.getYearSelectElement(year);
										var monthSelect = type === 'month' ? null : this.getMonthSelectElement(month);
										var switchCls = prefixCls + '-header-switcher';
										var typeSwitcher = showTypeSwitch ? React.createElement(
												'span',
												{ className: switchCls },
												type === 'date' ? React.createElement(
														'span',
														{ className: switchCls + '-focus' },
														locale.month
												) : React.createElement(
														'span',
														{ onClick: this.changeTypeToDate.bind(this), className: switchCls + '-normal' },
														locale.month
												),
												type === 'month' ? React.createElement(
														'span',
														{ className: switchCls + '-focus' },
														locale.year
												) : React.createElement(
														'span',
														{ onClick: this.changeTypeToMonth.bind(this), className: switchCls + '-normal' },
														locale.year
												)
										) : null;

										return React.createElement(
												'div',
												{ className: prefixCls + '-header' },
												typeSwitcher,
												monthSelect,
												yearSelect,
												headerComponents
										);
								}
						}]);

						return CalendarHeader;
				})(Component);

				CalendarHeader.propTypes = {
						value: PropTypes.object,
						locale: PropTypes.object,
						yearSelectOffset: PropTypes.number,
						yearSelectTotal: PropTypes.number,
						onValueChange: PropTypes.func,
						onTypeChange: PropTypes.func,
						Select: PropTypes.func,
						prefixCls: PropTypes.string,
						type: PropTypes.string,
						showTypeSwitch: PropTypes.bool,
						headerComponents: PropTypes.array
				};
				CalendarHeader.defaultProps = {
						yearSelectOffset: 10,
						yearSelectTotal: 20,
						onValueChange: noop,
						onTypeChange: noop
				};

				var FullCalendar = React.createClass({
						displayName: 'FullCalendar',

						propTypes: {
								defaultType: PropTypes.string,
								type: PropTypes.string,
								onTypeChange: PropTypes.func,
								fullscreen: PropTypes.bool,
								monthCellRender: PropTypes.func,
								dateCellRender: PropTypes.func,
								showTypeSwitch: PropTypes.bool,
								Select: PropTypes.func.isRequired,
								headerComponents: PropTypes.array,
								headerComponent: PropTypes.object, // The whole header component
								headerRender: PropTypes.func,
								showHeader: PropTypes.bool
						},
						mixins: [CommonMixin, CalendarMixin],
						getDefaultProps: function getDefaultProps() {
								return {
										defaultType: 'date',
										fullscreen: false,
										showTypeSwitch: true,
										showHeader: true,
										onTypeChange: function onTypeChange() {}
								};
						},
						getInitialState: function getInitialState() {
								var type = undefined;
								if ('type' in this.props) {
										type = this.props.type;
								} else {
										type = this.props.defaultType;
								}
								return { type: type };
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								if ('type' in nextProps) {
										this.setState({
												type: nextProps.type
										});
								}
						},
						onMonthSelect: function onMonthSelect(value) {
								this.onSelect(value, { target: 'month' });
						},
						setType: function setType(type) {
								if (!('type' in this.props)) {
										this.setState({ type: type });
								}
								this.props.onTypeChange(type);
						},
						render: function render() {
								var props = this.props;
								var locale = props.locale;
								var prefixCls = props.prefixCls;
								var fullscreen = props.fullscreen;
								var showHeader = props.showHeader;
								var headerComponent = props.headerComponent;
								var headerRender = props.headerRender;
								var _state2 = this.state;
								var value = _state2.value;
								var type = _state2.type;

								var header = null;
								if (showHeader) {
										if (headerRender) {
												header = headerRender(value, type, locale);
										} else {
												var TheHeader = headerComponent || CalendarHeader;
												header = React.createElement(TheHeader, _extends({ key: 'calendar-header'
												}, props, {
														prefixCls: prefixCls + '-full',
														type: type,
														value: value,
														onTypeChange: this.setType,
														onValueChange: this.setValue }));
										}
								}

								var table = type === 'date' ? React.createElement(DateTable, {
										dateRender: props.dateCellRender,
										locale: locale,
										prefixCls: prefixCls,
										onSelect: this.onSelect,
										value: value }) : React.createElement(MonthTable, {
										cellRender: props.monthCellRender,
										locale: locale,
										onSelect: this.onMonthSelect,
										prefixCls: prefixCls + '-month-panel',
										value: value });

								var children = [header, React.createElement(
										'div',
										{ key: 'calendar-body', className: prefixCls + '-calendar-body' },
										table
								)];

								var className = [prefixCls + '-full'];

								if (fullscreen) {
										className.push(prefixCls + '-fullscreen');
								}

								return this.renderRoot({ children: children, className: className.join(' ') });
						}
				});

				return FullCalendar;
		})();

		var MonthCalendar = (function () {
				var MonthCalendar = React.createClass({
						displayName: 'MonthCalendar',

						mixins: [CommonMixin, CalendarMixin],

						onKeyDown: function onKeyDown(event) {
								var keyCode = event.keyCode;
								var ctrlKey = event.ctrlKey || event.metaKey;
								var stateValue = this.state.value;
								var value = stateValue;
								switch (keyCode) {
										case KeyCode.DOWN:
												value = stateValue.clone();
												value.addMonth(3);
												break;
										case KeyCode.UP:
												value = stateValue.clone();
												value.addMonth(-3);
												break;
										case KeyCode.LEFT:
												value = stateValue.clone();
												if (ctrlKey) {
														value.addYear(-1);
												} else {
														value.addMonth(-1);
												}
												break;
										case KeyCode.RIGHT:
												value = stateValue.clone();
												if (ctrlKey) {
														value.addYear(1);
												} else {
														value.addMonth(1);
												}
												break;
										case KeyCode.ENTER:
												this.onSelect(stateValue);
												event.preventDefault();
												return 1;
										default:
												return undefined;
								}
								if (value !== stateValue) {
										this.setValue(value);
										event.preventDefault();
										return 1;
								}
						},
						render: function render() {
								var props = this.props;
								var children = React.createElement(MonthPanel, { locale: props.locale,
										disabledDate: props.disabledDate,
										style: { position: 'relative' },
										value: this.state.value,
										rootPrefixCls: props.prefixCls,
										onChange: this.setValue,
										onSelect: this.onSelect });
								return this.renderRoot({
										children: children
								});
						}
				});
		})();

		var RangeCalendar = (function () {
				var CalendarPart = React.createClass({
						displayName: 'CalendarPart',
						render: function render() {
								var props = this.props;
								var value = props.value;
								var direction = props.direction;
								var prefixCls = props.prefixCls;
								var locale = props.locale;
								var selectedValue = props.selectedValue;
								var formatter = props.formatter;
								var placeholder = props.placeholder;
								var disabledDate = props.disabledDate;
								var timePicker = props.timePicker;
								var disabledTime = props.disabledTime;

								var rangeClassName = prefixCls + '-range';
								var newProps = { locale: locale, value: value, prefixCls: prefixCls };
								var index = direction === 'left' ? 0 : 1;
								return React.createElement(
										'div',
										{ className: rangeClassName + '-part ' + rangeClassName + '-' + direction },
										React.createElement(DateInput, { formatter: formatter,
												locale: locale,
												prefixCls: prefixCls,
												timePicker: timePicker,
												disabledDate: disabledDate,
												placeholder: placeholder,
												disabledTime: disabledTime,
												gregorianCalendarLocale: value.locale,
												showClear: false,
												selectedValue: selectedValue[index],
												onChange: props.onInputSelect }),
										React.createElement(
												'div',
												{ style: { outline: 'none' } },
												React.createElement(CalendarHeader, _extends({}, newProps, {
														enableNext: direction === 'right',
														enablePrev: direction === 'left',
														onValueChange: props.onValueChange })),
												React.createElement(
														'div',
														{ className: prefixCls + '-calendar-body' },
														React.createElement(DateTable, _extends({}, newProps, {
																selectedValue: selectedValue,
																dateRender: props.dateRender,
																onSelect: props.onSelect,
																onDayHover: props.onDayHover,
																disabledDate: disabledDate,
																showWeekNumber: props.showWeekNumber }))
												),
												React.createElement(CalendarFooter, _extends({}, newProps, {
														disabledDate: props.disabledDate,
														timeDisabled: !selectedValue[index] || !!selectedValue.hovering,
														onToday: this.chooseToday
												}))
										)
								);
						}
				});

				function getNow() {
						var selectedValue = new GregorianCalendar();
						selectedValue.setTime(Date.now());
						return selectedValue;
				}

				function onValueChange(direction, current) {
						var value = undefined;
						value = current;
						if (direction === 'right') {
								value.addMonth(-1);
						}
						this.fireValueChange(value);
				}

				function normalizeAnchor(props, init) {
						var selectedValue = props.selectedValue || init && props.defaultSelectedValue || [];
						var value = props.value;
						if (Array.isArray(value)) {
								value = value[0];
						}
						var defaultValue = props.defaultValue;
						if (Array.isArray(defaultValue)) {
								defaultValue = defaultValue[0];
						}
						return value || init && defaultValue || selectedValue[0] || init && getNow();
				}

				function onInputSelect(direction, value) {
						if (!value) {
								return;
						}
						var originalValue = this.state.selectedValue;
						var selectedValue = originalValue.concat();
						var index = direction === 'left' ? 0 : 1;
						selectedValue[index] = value;
						if (selectedValue[0] && selectedValue[1]) {
								if (this.compare(selectedValue[0], selectedValue[1]) > 0) {
										selectedValue[1 - index] = undefined;
								}
						}
						this.fireSelectValueChange(selectedValue);
				}

				var RangeCalendar = React.createClass({
						displayName: 'RangeCalendar',

						propTypes: {
								defaultValue: PropTypes.any,
								timePicker: PropTypes.any,
								value: PropTypes.any,
								selectedValue: PropTypes.array,
								defaultSelectedValue: PropTypes.array,
								onOk: PropTypes.func,
								onChange: PropTypes.func,
								onSelect: PropTypes.func,
								onValueChange: PropTypes.func,
								formatter: PropTypes.object,
								onClear: PropTypes.func
						},

						mixins: [CommonMixin],

						getDefaultProps: function getDefaultProps() {
								return {
										defaultSelectedValue: [],
										onValueChange: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								var selectedValue = props.selectedValue || props.defaultSelectedValue;
								var value = normalizeAnchor(props, 1);
								return { selectedValue: selectedValue, value: value };
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var newState = {};
								if ('value' in nextProps) {
										if (nextProps.value) {
												newState.value = nextProps.value;
										} else {
												newState.value = normalizeAnchor(nextProps, 0);
										}
										this.setState(newState);
								}
								if ('selectedValue' in nextProps) {
										newState.selectedValue = nextProps.selectedValue;
										this.setState(newState);
								}
						},
						onSelect: function onSelect(value) {
								var originalValue = this.state.selectedValue;
								var selectedValue = originalValue.concat();
								var changed = false;
								if (!selectedValue.length || selectedValue.length === 2 && !originalValue.hovering) {
										selectedValue.length = 1;
										selectedValue[0] = value;
										changed = true;
								} else if (this.compare(selectedValue[0], value) <= 0) {
										selectedValue[1] = value;
										changed = true;
								} else if (this.compare(selectedValue[0], value) > 0) {
										selectedValue.length = 1;
										selectedValue[0] = value;
										changed = true;
								}
								if (changed) {
										this.fireSelectValueChange(selectedValue);
								}
						},
						onDayHover: function onDayHover(hoverValue) {
								var selectedValue = this.state.selectedValue;
								if (!selectedValue.length || selectedValue.length === 2 && !selectedValue.hovering) {
										return;
								}
								if (this.compare(hoverValue, selectedValue[0]) < 0) {
										return;
								}
								selectedValue = selectedValue.concat();
								selectedValue[1] = hoverValue;
								selectedValue.hovering = 1;
								this.fireSelectValueChange(selectedValue);
						},
						onToday: function onToday() {
								this.setState({
										value: getTodayTime(this.state.value)
								});
						},
						onOk: function onOk() {
								this.props.onOk(this.state.selectedValue);
						},
						getStartValue: function getStartValue() {
								var value = this.state.value;
								var selectedValue = this.state.selectedValue;
								// keep selectedTime when select date
								if (selectedValue[0] && this.props.timePicker) {
										value = value.clone();
										syncTime(selectedValue[0], value);
								}
								return value;
						},
						getEndValue: function getEndValue() {
								var endValue = this.state.value.clone();
								endValue.addMonth(1);
								var selectedValue = this.state.selectedValue;
								// keep selectedTime when select date
								if (selectedValue[1] && this.props.timePicker) {
										syncTime(selectedValue[1], endValue);
								}
								return endValue;
						},
						compare: function compare(v1, v2) {
								if (this.props.timePicker) {
										return v1.getTime() - v2.getTime();
								}
								return v1.compareToDay(v2);
						},
						fireSelectValueChange: function fireSelectValueChange(selectedValue, direct) {
								if (!('selectedValue' in this.props)) {
										this.setState({ selectedValue: selectedValue });
								}
								this.props.onChange(selectedValue);
								if (direct || selectedValue[0] && selectedValue[1] && !selectedValue.hovering) {
										this.props.onSelect(selectedValue);
								}
						},
						fireValueChange: function fireValueChange(value) {
								var props = this.props;
								if (!('value' in props)) {
										this.setState({ value: value });
								}
								props.onValueChange(value);
						},
						clear: function clear() {
								this.fireSelectValueChange([], true);
								this.props.onClear();
						},
						render: function render() {
								var _className2;

								var props = this.props;
								var state = this.state;
								var prefixCls = props.prefixCls;
								var dateInputPlaceholder = props.dateInputPlaceholder;

								var className = (_className2 = {}, _defineProperty(_className2, props.className, !!props.className), _defineProperty(_className2, prefixCls, 1), _defineProperty(_className2, prefixCls + '-hidden', !props.visible), _defineProperty(_className2, prefixCls + '-range', 1), _defineProperty(_className2, prefixCls + '-week-number', props.showWeekNumber), _className2);
								var classes = classnames(className);
								var newProps = {
										selectedValue: state.selectedValue,
										onSelect: this.onSelect,
										onDayHover: this.onDayHover
								};

								var placeholder1 = undefined;
								var placeholder2 = undefined;

								if (dateInputPlaceholder) {
										if (Array.isArray(dateInputPlaceholder)) {
												var _dateInputPlaceholder = _slicedToArray(dateInputPlaceholder, 2);

												placeholder1 = _dateInputPlaceholder[0];
												placeholder2 = _dateInputPlaceholder[1];
										} else {
												placeholder1 = placeholder2 = dateInputPlaceholder;
										}
								}
								return React.createElement(
										'div',
										{ className: classes, style: props.style,
												tabIndex: '0' },
										React.createElement('a', { className: prefixCls + '-clear-btn', role: 'button', title: '清除', onClick: this.clear }),
										React.createElement(CalendarPart, _extends({}, props, newProps, { direction: 'left',
												formatter: this.getFormatter(),
												value: this.getStartValue(),
												placeholder: placeholder1,
												onInputSelect: onInputSelect.bind(this, 'left'),
												onValueChange: onValueChange.bind(this, 'left') })),
										React.createElement(
												'span',
												{ className: prefixCls + '-range-middle' },
												'~'
										),
										React.createElement(CalendarPart, _extends({}, props, newProps, { direction: 'right',
												formatter: this.getFormatter(),
												placeholder: placeholder2,
												value: this.getEndValue(),
												onInputSelect: onInputSelect.bind(this, 'right'),
												onValueChange: onValueChange.bind(this, 'right') })),
										React.createElement(
												'div',
												{ className: prefixCls + '-range-bottom' },
												React.createElement(TodayButton, _extends({}, props, { value: state.value,
														onToday: this.onToday })),
												React.createElement(OkButton, _extends({}, props, { value: state.value,
														onOk: this.onOk,
														okDisabled: state.selectedValue.length !== 2 || state.selectedValue.hovering
												}))
										)
								);
						}
				});

				return RangeCalendar;
		})();

		var Picker = (function () {
				var autoAdjustOverflow = {
						adjustX: 1,
						adjustY: 1
				};

				var targetOffset = [0, 0];

				var placements = {
						bottomLeft: {
								points: ['tl', 'tl'],
								overflow: autoAdjustOverflow,
								offset: [0, -3],
								targetOffset: targetOffset
						},
						bottomRight: {
								points: ['tr', 'tr'],
								overflow: autoAdjustOverflow,
								offset: [0, -3],
								targetOffset: targetOffset
						},
						topRight: {
								points: ['br', 'br'],
								overflow: autoAdjustOverflow,
								offset: [0, 3],
								targetOffset: targetOffset
						},
						topLeft: {
								points: ['bl', 'bl'],
								overflow: autoAdjustOverflow,
								offset: [0, 3],
								targetOffset: targetOffset
						}
				};

				function refFn(field, component) {
						this[field] = component;
				}

				var Picker = React.createClass({
						displayName: 'Picker',

						propTypes: {
								onChange: PropTypes.func,
								onOpen: PropTypes.func,
								onClose: PropTypes.func,
								children: PropTypes.func,
								getCalendarContainer: PropTypes.func,
								calendar: PropTypes.element,
								style: PropTypes.object,
								open: PropTypes.bool,
								defaultOpen: PropTypes.bool,
								prefixCls: PropTypes.string,
								placement: PropTypes.any,
								value: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
								defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
								align: PropTypes.object
						},

						getDefaultProps: function getDefaultProps() {
								return {
										prefixCls: 'rc-calendar-picker',
										style: {},
										align: {},
										placement: 'bottomLeft',
										defaultOpen: false,
										onChange: noop,
										onOpen: noop,
										onClose: noop
								};
						},
						getInitialState: function getInitialState() {
								var props = this.props;
								var open = undefined;
								if ('open' in props) {
										open = props.open;
								} else {
										open = props.defaultOpen;
								}
								var value = props.value || props.defaultValue;
								this.saveCalendarRef = refFn.bind(this, 'calendarInstance');
								return { open: open, value: value };
						},
						componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
								var value = nextProps.value;
								var open = nextProps.open;

								if ('value' in nextProps) {
										this.setState({ value: value });
								}
								if (open !== undefined) {
										this.setState({ open: open });
								}
						},
						onCalendarKeyDown: function onCalendarKeyDown(event) {
								if (event.keyCode === KeyCode.ESC) {
										event.stopPropagation();
										this.close(this.focus);
								}
						},
						onCalendarSelect: function onCalendarSelect(value) {
								var cause = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

								var props = this.props;
								if (!('value' in props)) {
										this.setState({
												value: value
										});
								}
								if (!props.calendar.props.timePicker && cause.source !== 'dateInput') {
										this.close(this.focus);
								}
								props.onChange(value);
						},
						onCalendarOk: function onCalendarOk() {
								this.close(this.focus);
						},
						onCalendarClear: function onCalendarClear() {
								this.close(this.focus);
						},
						onVisibleChange: function onVisibleChange(open) {
								var _this10 = this;

								this.setOpen(open, function () {
										if (open) {
												ReactDOM.findDOMNode(_this10.calendarInstance).focus();
										}
								});
						},
						getCalendarElement: function getCalendarElement() {
								var props = this.props;
								var state = this.state;
								var calendarProp = props.calendar;
								var value = state.value;

								var defaultValue = undefined;
								// RangeCalendar
								if (Array.isArray(value)) {
										defaultValue = value[0];
								} else {
										defaultValue = value;
								}
								var extraProps = {
										ref: this.saveCalendarRef,
										defaultValue: defaultValue || calendarProp.props.defaultValue,
										defaultSelectedValue: value,
										onKeyDown: this.onCalendarKeyDown,
										onOk: createChainedFunction(calendarProp.props.onOk, this.onCalendarOk),
										onSelect: createChainedFunction(calendarProp.props.onSelect, this.onCalendarSelect),
										onClear: createChainedFunction(calendarProp.props.onClear, this.onCalendarClear)
								};

								return React.cloneElement(calendarProp, extraProps);
						},
						setOpen: function setOpen(open, callback) {
								var _props4 = this.props;
								var onOpen = _props4.onOpen;
								var onClose = _props4.onClose;

								if (this.state.open !== open) {
										this.setState({
												open: open
										}, callback);
										var event = {
												open: open
										};
										if (open) {
												onOpen(event);
										} else {
												onClose(event);
										}
								}
						},
						open: function open(callback) {
								this.setOpen(true, callback);
						},
						close: function close(callback) {
								this.setOpen(false, callback);
						},
						focus: function focus() {
								if (!this.state.open) {
										ReactDOM.findDOMNode(this).focus();
								}
						},
						render: function render() {
								var props = this.props;
								var prefixCls = props.prefixCls;
								var placement = props.placement;
								var style = props.style;
								var getCalendarContainer = props.getCalendarContainer;
								var align = props.align;
								var animation = props.animation;
								var disabled = props.disabled;
								var transitionName = props.transitionName;
								var children = props.children;

								var state = this.state;
								return React.createElement(
										Trigger,
										{ popup: this.getCalendarElement(),
												popupAlign: align,
												builtinPlacements: placements,
												popupPlacement: placement,
												action: disabled ? [] : ['click'],
												destroyPopupOnHide: true,
												getPopupContainer: getCalendarContainer,
												popupStyle: style,
												popupAnimation: animation,
												popupTransitionName: transitionName,
												popupVisible: state.open,
												onPopupVisibleChange: this.onVisibleChange,
												prefixCls: prefixCls },
										children(state, props)
								);
						}
				});

				return Picker;
		})();

		RC.Calendar = Calendar;
		RC.FullCalendar = FullCalendar;
		RC.MonthCalendar = MonthCalendar;
		RC.RangeCalendar = RangeCalendar;
		RC.DatePicker = Picker;
})(Smart.RC);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//v3.3.2 - 2016.2.14
+(function (RC) {
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

	var Handle = (function (_React$Component) {
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
	})(React.Component);

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

	var Slider = (function (_React$Component2) {
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

			var upperBound = undefined;
			var lowerBound = undefined;
			if (props.range) {
				lowerBound = _this2.trimAlignValue(value[0]);
				upperBound = _this2.trimAlignValue(value[1]);
			} else {
				upperBound = _this2.trimAlignValue(value);
			}

			var recent = undefined;
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
					var value = nextProps.value !== undefined ? nextProps.value : upperBound;
					var nextValue = this.trimAlignValue(value, nextProps);
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
	})(React.Component);

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
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//v1.1.0 - 2016.2.14
+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var assign = _ref.assign;
	var classNames = RC.classNames;
	var Animate = RC.Animate;
	var _React = React;
	var PropTypes = _React.PropTypes;

	function browser(ua) {
		var tem = undefined;
		var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
		if (/trident/i.test(M[1])) {
			tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
			return 'IE ' + (tem[1] || '');
		}
		if (M[1] === 'Chrome') {
			tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
			if (tem) return tem.slice(1).join(' ').replace('OPR', 'Opera');
		}
		M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
		tem = ua.match(/version\/(\d+)/i);
		if (tem) {
			M.splice(1, 1, tem[1]);
		}
		return M.join(' ');
	}

	// export function getOffset(el) {
	//   const obj = el.getBoundingClientRect();
	//   return {
	//     left: obj.left + document.body.scrollLeft,
	//     top: obj.top + document.body.scrollTop,
	//     width: obj.width,
	//     height: obj.height
	//   };
	// }

	// // iscroll offset
	// offset = function (el) {
	//   var left = -el.offsetLeft,
	//     top = -el.offsetTop;

	//   // jshint -W084
	//   while (el = el.offsetParent) {
	//     left -= el.offsetLeft;
	//     top -= el.offsetTop;
	//   }
	//   // jshint +W084

	//   return {
	//     left: left,
	//     top: top
	//   };
	// }

	function getOffset(ele) {
		var el = ele;
		var _x = 0;
		var _y = 0;
		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return { top: _y, left: _x };
	}

	function getChildrenlength(children) {
		var len = 1;
		if (Array.isArray(children)) {
			len = children.length;
		}
		return len;
	}

	function getSiblingPosition(index, len, siblingPosition) {
		if (len === 1) {
			siblingPosition.first = true;
			siblingPosition.last = true;
		} else {
			siblingPosition.first = index === 0;
			siblingPosition.last = index === len - 1;
		}
		return siblingPosition;
	}

	function loopAllChildren(childs, callback) {
		var loop = function loop(children, level) {
			var len = getChildrenlength(children);
			React.Children.forEach(children, function (item, index) {
				var pos = level + '-' + index;
				if (item.props.children && item.type && item.type.isTreeNode) {
					loop(item.props.children, pos);
				}
				callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}));
			});
		};
		loop(childs, 0);
	}

	function filterMinPosition(arr) {
		var a = [];
		arr.forEach(function (item) {
			var b = a.filter(function (i) {
				return item.indexOf(i) === 0 && (item[i.length] === '-' || !item[i.length]);
			});
			if (!b.length) {
				a.push(item);
			}
		});
		return a;
	}
	// console.log(filterMinPosition(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

	function isInclude(smallArray, bigArray) {
		return smallArray.every(function (ii, i) {
			return ii === bigArray[i];
		});
	}
	// console.log(isInclude(['0', '1'], ['0', '10', '1']));

	// TODO 效率差, 需要缓存优化
	function handleCheckState(obj, checkedPositionArr, checkIt) {
		var stripTail = function stripTail(str) {
			var arr = str.match(/(.+)(-[^-]+)$/);
			var st = '';
			if (arr && arr.length === 3) {
				st = arr[1];
			}
			return st;
		};
		// console.log(stripTail('0-101-000'));
		var splitPosition = function splitPosition(pos) {
			return pos.split('-');
		};
		checkedPositionArr.forEach(function (_pos) {
			// 设置子节点，全选或全不选
			var _posArr = splitPosition(_pos);
			Object.keys(obj).forEach(function (i) {
				var iArr = splitPosition(i);
				if (iArr.length > _posArr.length && isInclude(_posArr, iArr)) {
					obj[i].checkPart = false;
					obj[i].checked = checkIt;
				}
			});
			// 循环设置父节点的 选中 或 半选状态
			var loop = function loop(__pos) {
				var _posLen = splitPosition(__pos).length;
				if (_posLen <= 2) {
					// e.g. '0-0', '0-1'
					return;
				}
				var sibling = 0;
				var siblingChecked = 0;
				var parentPosition = stripTail(__pos);
				Object.keys(obj).forEach(function (i) {
					var iArr = splitPosition(i);
					if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
						sibling++;
						if (obj[i].checked) {
							siblingChecked++;
						} else if (obj[i].checkPart) {
							siblingChecked += 0.5;
						}
					}
				});
				var parent = obj[parentPosition];
				// sibling 不会等于0
				// 全不选 - 全选 - 半选
				if (siblingChecked === 0) {
					parent.checked = false;
					parent.checkPart = false;
				} else if (siblingChecked === sibling) {
					parent.checked = true;
					parent.checkPart = false;
				} else {
					parent.checkPart = true;
					parent.checked = false;
				}
				loop(parentPosition);
			};
			loop(_pos);
		});
	}

	function getCheckKeys(treeNodesStates) {
		var checkPartKeys = [];
		var checkedKeys = [];
		var checkedNodes = [];
		var checkedNodesKeys = [];
		Object.keys(treeNodesStates).forEach(function (item) {
			var itemObj = treeNodesStates[item];
			if (itemObj.checked) {
				checkedKeys.push(itemObj.key);
				checkedNodes.push(itemObj.node);
				checkedNodesKeys.push({ key: itemObj.key, node: itemObj.node, pos: item });
			} else if (itemObj.checkPart) {
				checkPartKeys.push(itemObj.key);
			}
		});
		return {
			checkPartKeys: checkPartKeys, checkedKeys: checkedKeys, checkedNodes: checkedNodes, checkedNodesKeys: checkedNodesKeys, treeNodesStates: treeNodesStates
		};
	}

	function getTreeNodesStates(children, checkedKeys, checkIt, unCheckKey) {
		var checkedPosition = [];
		var treeNodesStates = {};
		loopAllChildren(children, function (item, index, pos, newKey, siblingPosition) {
			var checked = false;
			if (checkedKeys.indexOf(newKey) !== -1) {
				checked = true;
				checkedPosition.push(pos);
			}
			treeNodesStates[pos] = {
				node: item,
				key: newKey,
				checked: checked,
				checkPart: false,
				siblingPosition: siblingPosition
			};
		});

		// debugger
		handleCheckState(treeNodesStates, filterMinPosition(checkedPosition.sort()), true);

		if (!checkIt && unCheckKey) {
			var pos = undefined;
			Object.keys(treeNodesStates).forEach(function (item) {
				var itemObj = treeNodesStates[item];
				if (itemObj.key === unCheckKey) {
					pos = item;
					itemObj.checked = checkIt;
					itemObj.checkPart = false;
				}
			});
			handleCheckState(treeNodesStates, [pos], checkIt);
		}

		return getCheckKeys(treeNodesStates);
	}

	var Tree = (function (_React$Component) {
		_inherits(Tree, _React$Component);

		function Tree(props) {
			_classCallCheck(this, Tree);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tree).call(this, props));

			['onKeyDown', 'onCheck'].forEach(function (m) {
				_this[m] = _this[m].bind(_this);
			});
			_this.contextmenuKeys = [];

			_this.state = {
				expandedKeys: _this.getDefaultExpandedKeys(props),
				checkedKeys: _this.getDefaultCheckedKeys(props),
				selectedKeys: _this.getDefaultSelectedKeys(props),
				dragNodesKeys: '',
				dragOverNodeKey: '',
				dropNodeKey: ''
			};
			return _this;
		}

		_createClass(Tree, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
				var checkedKeys = this.getDefaultCheckedKeys(nextProps, true);
				var selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
				var st = {};
				if (expandedKeys) {
					st.expandedKeys = expandedKeys;
				}
				if (checkedKeys) {
					st.checkedKeys = checkedKeys;
				}
				if (selectedKeys) {
					st.selectedKeys = selectedKeys;
				}
				this.setState(st);
			}
		}, {
			key: 'onDragStart',
			value: function onDragStart(e, treeNode) {
				this.dragNode = treeNode;
				this.dragNodesKeys = this.getDragNodes(treeNode);
				var st = {
					dragNodesKeys: this.dragNodesKeys
				};
				var expandedKeys = this.getExpandedKeys(treeNode, false);
				if (expandedKeys) {
					// Controlled expand, save and then reset
					this.getRawExpandedKeys();
					st.expandedKeys = expandedKeys;
				}
				this.setState(st);
				this.props.onDragStart({
					event: e,
					node: treeNode
				});
			}
		}, {
			key: 'onDragEnterGap',
			value: function onDragEnterGap(e, treeNode) {
				// console.log(e.pageY, getOffset(treeNode.refs.selectHandle), treeNode.props.eventKey);
				var offsetTop = getOffset(treeNode.refs.selectHandle).top;
				var offsetHeight = treeNode.refs.selectHandle.offsetHeight;
				var pageY = e.pageY;
				var gapHeight = 2;
				if (pageY > offsetTop + offsetHeight - gapHeight) {
					this.dropPosition = 1;
					return 1;
				}
				if (pageY < offsetTop + gapHeight) {
					this.dropPosition = -1;
					return -1;
				}
				this.dropPosition = 0;
				return 0;
			}
		}, {
			key: 'onDragEnter',
			value: function onDragEnter(e, treeNode) {
				var enterGap = this.onDragEnterGap(e, treeNode);
				if (this.dragNode.props.eventKey === treeNode.props.eventKey && enterGap === 0) {
					this.setState({
						dragOverNodeKey: ''
					});
					return;
				}
				var st = {
					dragOverNodeKey: treeNode.props.eventKey
				};
				var expandedKeys = this.getExpandedKeys(treeNode, true);
				if (expandedKeys) {
					this.getRawExpandedKeys();
					st.expandedKeys = expandedKeys;
				}
				this.setState(st);
				this.props.onDragEnter({
					event: e,
					node: treeNode,
					expandedKeys: expandedKeys && [].concat(_toConsumableArray(expandedKeys)) || [].concat(_toConsumableArray(this.state.expandedKeys))
				});
			}
		}, {
			key: 'onDragOver',
			value: function onDragOver(e, treeNode) {
				this.props.onDragOver({ event: e, node: treeNode });
			}
		}, {
			key: 'onDragLeave',
			value: function onDragLeave(e, treeNode) {
				this.props.onDragLeave({ event: e, node: treeNode });
			}
		}, {
			key: 'onDrop',
			value: function onDrop(e, treeNode) {
				var key = treeNode.props.eventKey;
				this.setState({
					dragOverNodeKey: '',
					dropNodeKey: key
				});
				if (this.dragNodesKeys.indexOf(key) > -1) {
					if (console.warn) {
						console.warn('can not drop to dragNode(include it\'s children node)');
					}
					return false;
				}

				var posArr = treeNode.props.pos.split('-');
				var res = {
					event: e,
					node: treeNode,
					dragNode: this.dragNode,
					dragNodesKeys: [].concat(_toConsumableArray(this.dragNodesKeys)),
					dropPosition: this.dropPosition + Number(posArr[posArr.length - 1])
				};
				if (this.dropPosition !== 0) {
					res.dropToGap = true;
				}
				if ('expandedKeys' in this.props) {
					res.rawExpandedKeys = [].concat(_toConsumableArray(this._rawExpandedKeys)) || [].concat(_toConsumableArray(this.state.expandedKeys));
				}
				this.props.onDrop(res);
			}
		}, {
			key: 'onExpand',
			value: function onExpand(treeNode) {
				var _this2 = this;

				var expand = !treeNode.props.expanded;
				var controlled = 'expandedKeys' in this.props;
				var expandedKeys = [].concat(_toConsumableArray(this.state.expandedKeys));
				var index = expandedKeys.indexOf(treeNode.props.eventKey);
				if (!controlled) {
					if (expand) {
						if (index === -1) {
							expandedKeys.push(treeNode.props.eventKey);
						}
					} else {
						expandedKeys.splice(index, 1);
					}
					this.setState({ expandedKeys: expandedKeys });
					// remember the return object, such as expandedKeys, must clone!!
					// so you can avoid outer code change it.
					this.props.onExpand(treeNode, expand, [].concat(_toConsumableArray(expandedKeys)));
				} else {
					this.props.onExpand(treeNode, !expand, [].concat(_toConsumableArray(expandedKeys)));
				}

				// after data loaded, need set new expandedKeys
				if (expand && this.props.loadData) {
					return this.props.loadData(treeNode).then(function () {
						if (!controlled) {
							_this2.setState({ expandedKeys: expandedKeys });
						}
					});
				}
			}
		}, {
			key: 'onCheck',
			value: function onCheck(treeNode) {
				var checked = !treeNode.props.checked;
				if (treeNode.props.checkPart) {
					checked = true;
				}
				var key = treeNode.key || treeNode.props.eventKey;
				var checkedKeys = [].concat(_toConsumableArray(this.state.checkedKeys));
				if (checked && checkedKeys.indexOf(key) === -1) {
					checkedKeys.push(key);
				}
				var checkKeys = getTreeNodesStates(this.props.children, checkedKeys, checked, key);
				var newSt = {
					event: 'check',
					node: treeNode,
					checked: checked,
					checkedNodes: checkKeys.checkedNodes
				};
				checkedKeys = checkKeys.checkedKeys;
				if (!('checkedKeys' in this.props)) {
					this.setState({
						checkedKeys: checkedKeys
					});
				}
				this.props.onCheck(checkedKeys, newSt);
			}
		}, {
			key: 'onSelect',
			value: function onSelect(treeNode) {
				var props = this.props;
				var selectedKeys = [].concat(_toConsumableArray(this.state.selectedKeys));
				var eventKey = treeNode.props.eventKey;
				var index = selectedKeys.indexOf(eventKey);
				var selected = undefined;
				if (index !== -1) {
					selected = false;
					selectedKeys.splice(index, 1);
				} else {
					selected = true;
					if (!props.multiple) {
						selectedKeys.length = 0;
					}
					selectedKeys.push(eventKey);
				}
				var selectedNodes = [];
				if (selectedKeys.length) {
					loopAllChildren(this.props.children, function (item) {
						if (selectedKeys.indexOf(item.key) !== -1) {
							selectedNodes.push(item);
						}
					});
				}
				var newSt = {
					event: 'select',
					node: treeNode,
					selected: selected,
					selectedNodes: selectedNodes
				};
				if (!('selectedKeys' in this.props)) {
					this.setState({
						selectedKeys: selectedKeys
					});
				}
				props.onSelect(selectedKeys, newSt);
			}
		}, {
			key: 'onMouseEnter',
			value: function onMouseEnter(e, treeNode) {
				this.props.onMouseEnter({ event: e, node: treeNode });
			}
		}, {
			key: 'onMouseLeave',
			value: function onMouseLeave(e, treeNode) {
				this.props.onMouseLeave({ event: e, node: treeNode });
			}
		}, {
			key: 'onContextMenu',
			value: function onContextMenu(e, treeNode) {
				var selectedKeys = [].concat(_toConsumableArray(this.state.selectedKeys));
				var eventKey = treeNode.props.eventKey;
				if (this.contextmenuKeys.indexOf(eventKey) === -1) {
					this.contextmenuKeys.push(eventKey);
				}
				this.contextmenuKeys.forEach(function (key) {
					var index = selectedKeys.indexOf(key);
					if (index !== -1) {
						selectedKeys.splice(index, 1);
					}
				});
				if (selectedKeys.indexOf(eventKey) === -1) {
					selectedKeys.push(eventKey);
				}
				this.setState({
					selectedKeys: selectedKeys
				});
				this.props.onRightClick({ event: e, node: treeNode });
			}

			// all keyboard events callbacks run from here at first

		}, {
			key: 'onKeyDown',
			value: function onKeyDown(e) {
				e.preventDefault();
			}
		}, {
			key: 'getFilterExpandedKeys',
			value: function getFilterExpandedKeys(props) {
				var defaultExpandedKeys = props.defaultExpandedKeys;
				var expandedPositionArr = [];
				if (props.autoExpandParent) {
					loopAllChildren(props.children, function (item, index, pos, newKey) {
						if (defaultExpandedKeys.indexOf(newKey) > -1) {
							expandedPositionArr.push(pos);
						}
					});
				}
				var filterExpandedKeys = [];
				loopAllChildren(props.children, function (item, index, pos, newKey) {
					if (props.defaultExpandAll) {
						filterExpandedKeys.push(newKey);
					} else if (props.autoExpandParent) {
						expandedPositionArr.forEach(function (p) {
							if ((p.split('-').length > pos.split('-').length && isInclude(pos.split('-'), p.split('-')) || pos === p) && filterExpandedKeys.indexOf(newKey) === -1) {
								filterExpandedKeys.push(newKey);
							}
						});
					}
				});
				return filterExpandedKeys.length ? filterExpandedKeys : defaultExpandedKeys;
			}
		}, {
			key: 'getDefaultExpandedKeys',
			value: function getDefaultExpandedKeys(props, willReceiveProps) {
				var expandedKeys = willReceiveProps ? undefined : this.getFilterExpandedKeys(props);
				if ('expandedKeys' in props) {
					expandedKeys = props.expandedKeys || [];
				}
				return expandedKeys;
			}
		}, {
			key: 'getDefaultCheckedKeys',
			value: function getDefaultCheckedKeys(props, willReceiveProps) {
				var checkedKeys = willReceiveProps ? undefined : props.defaultCheckedKeys;
				if ('checkedKeys' in props) {
					checkedKeys = props.checkedKeys || [];
				}
				return checkedKeys;
			}
		}, {
			key: 'getDefaultSelectedKeys',
			value: function getDefaultSelectedKeys(props, willReceiveProps) {
				var getKeys = function getKeys(keys) {
					if (props.multiple) {
						return [].concat(_toConsumableArray(keys));
					}
					if (keys.length) {
						return [keys[0]];
					}
					return keys;
				};
				var selectedKeys = willReceiveProps ? undefined : getKeys(props.defaultSelectedKeys);
				if ('selectedKeys' in props) {
					selectedKeys = getKeys(props.selectedKeys);
				}
				return selectedKeys;
			}
		}, {
			key: 'getRawExpandedKeys',
			value: function getRawExpandedKeys() {
				if (!this._rawExpandedKeys && 'expandedKeys' in this.props) {
					this._rawExpandedKeys = [].concat(_toConsumableArray(this.state.expandedKeys));
				}
			}
		}, {
			key: 'getOpenTransitionName',
			value: function getOpenTransitionName() {
				var props = this.props;
				var transitionName = props.openTransitionName;
				var animationName = props.openAnimation;
				if (!transitionName && typeof animationName === 'string') {
					transitionName = props.prefixCls + '-open-' + animationName;
				}
				return transitionName;
			}
		}, {
			key: 'getDragNodes',
			value: function getDragNodes(treeNode) {
				var dragNodesKeys = [];
				var tPArr = treeNode.props.pos.split('-');
				loopAllChildren(this.props.children, function (item, index, pos, newKey) {
					var pArr = pos.split('-');
					if (treeNode.props.pos === pos || tPArr.length < pArr.length && isInclude(tPArr, pArr)) {
						dragNodesKeys.push(newKey);
					}
				});
				return dragNodesKeys;
			}
		}, {
			key: 'getExpandedKeys',
			value: function getExpandedKeys(treeNode, expand) {
				var key = treeNode.props.eventKey;
				var expandedKeys = this.state.expandedKeys;
				var expandedIndex = expandedKeys.indexOf(key);
				var exKeys = undefined;
				if (expandedIndex > -1 && !expand) {
					exKeys = [].concat(_toConsumableArray(expandedKeys));
					exKeys.splice(expandedIndex, 1);
					return exKeys;
				}
				if (expand && expandedKeys.indexOf(key) === -1) {
					return expandedKeys.concat([key]);
				}
			}
		}, {
			key: 'filterTreeNode',
			value: function filterTreeNode(treeNode) {
				var ftn = this.props.filterTreeNode;
				if (typeof ftn !== 'function' || treeNode.props.disabled) {
					return false;
				}
				return ftn.call(this, treeNode);
			}
		}, {
			key: 'renderTreeNode',
			value: function renderTreeNode(child, index) {
				var level = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

				var pos = level + '-' + index;
				var key = child.key || pos;
				var state = this.state;
				var props = this.props;
				var cloneProps = {
					ref: 'treeNode-' + key,
					root: this,
					eventKey: key,
					pos: pos,
					selectable: props.selectable,
					loadData: props.loadData,
					onMouseEnter: props.onMouseEnter,
					onMouseLeave: props.onMouseLeave,
					onRightClick: props.onRightClick,
					prefixCls: props.prefixCls,
					showLine: props.showLine,
					showIcon: props.showIcon,
					checkable: props.checkable,
					draggable: props.draggable,
					dragOver: state.dragOverNodeKey === key && this.dropPosition === 0,
					dragOverGapTop: state.dragOverNodeKey === key && this.dropPosition === -1,
					dragOverGapBottom: state.dragOverNodeKey === key && this.dropPosition === 1,
					expanded: state.expandedKeys.indexOf(key) !== -1,
					selected: state.selectedKeys.indexOf(key) !== -1,
					checked: this.checkedKeys.indexOf(key) !== -1,
					checkPart: this.checkPartKeys.indexOf(key) !== -1,
					openTransitionName: this.getOpenTransitionName(),
					openAnimation: props.openAnimation,
					filterTreeNode: this.filterTreeNode.bind(this)
				};
				if (this.treeNodesStates[pos]) {
					assign(cloneProps, this.treeNodesStates[pos].siblingPosition);
				}
				return React.cloneElement(child, cloneProps);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var domProps = {
					className: classNames(props.className, props.prefixCls),
					role: 'tree-node'
				};
				if (props.focusable) {
					domProps.tabIndex = '0';
					domProps.onKeyDown = this.onKeyDown;
				}
				// console.log(this.state.expandedKeys, this._rawExpandedKeys, props.children);
				var checkKeys = getTreeNodesStates(props.children, this.state.checkedKeys, true);
				this.checkPartKeys = checkKeys.checkPartKeys;
				this.checkedKeys = checkKeys.checkedKeys;
				this.treeNodesStates = checkKeys.treeNodesStates;

				return React.createElement(
					'ul',
					_extends({}, domProps, { unselectable: true, ref: 'tree' }),
					React.Children.map(props.children, this.renderTreeNode, this)
				);
			}
		}]);

		return Tree;
	})(React.Component);

	Tree.propTypes = {
		prefixCls: PropTypes.string,
		children: PropTypes.any,
		showLine: PropTypes.bool,
		showIcon: PropTypes.bool,
		selectable: PropTypes.bool,
		multiple: PropTypes.bool,
		checkable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
		draggable: PropTypes.bool,
		autoExpandParent: PropTypes.bool,
		defaultExpandAll: PropTypes.bool,
		expandedKeys: PropTypes.arrayOf(PropTypes.string),
		defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
		checkedKeys: PropTypes.arrayOf(PropTypes.string),
		defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
		selectedKeys: PropTypes.arrayOf(PropTypes.string),
		defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
		onExpand: PropTypes.func,
		onCheck: PropTypes.func,
		onSelect: PropTypes.func,
		loadData: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onRightClick: PropTypes.func,
		onDragStart: PropTypes.func,
		onDragEnter: PropTypes.func,
		onDragOver: PropTypes.func,
		onDragLeave: PropTypes.func,
		onDrop: PropTypes.func,
		filterTreeNode: PropTypes.func,
		openTransitionName: PropTypes.string,
		openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	};

	Tree.defaultProps = {
		prefixCls: 'rc-tree',
		showLine: false,
		showIcon: true,
		selectable: true,
		multiple: false,
		checkable: false,
		draggable: false,
		autoExpandParent: true,
		defaultExpandAll: false,
		defaultExpandedKeys: [],
		defaultCheckedKeys: [],
		defaultSelectedKeys: [],
		onExpand: noop,
		onCheck: noop,
		onSelect: noop,
		onDragStart: noop,
		onDragEnter: noop,
		onDragOver: noop,
		onDragLeave: noop,
		onDrop: noop
	};

	var browserUa = browser(window.navigator.userAgent || '');
	var ieOrEdge = /.*(IE|Edge).+/.test(browserUa);
	// const uaArray = browserUa.split(' ');
	// const gtIE8 = uaArray.length !== 2 || uaArray[0].indexOf('IE') === -1 || Number(uaArray[1]) > 8;

	var defaultTitle = '---';

	var TreeNode = (function (_React$Component2) {
		_inherits(TreeNode, _React$Component2);

		function TreeNode(props) {
			_classCallCheck(this, TreeNode);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(TreeNode).call(this, props));

			['onExpand', 'onCheck', 'onContextMenu', 'onMouseEnter', 'onMouseLeave', 'onDragStart', 'onDragEnter', 'onDragOver', 'onDragLeave', 'onDrop'].forEach(function (m) {
				_this3[m] = _this3[m].bind(_this3);
			});
			_this3.state = {
				dataLoading: false,
				dragNodeHighlight: false
			};
			return _this3;
		}

		_createClass(TreeNode, [{
			key: 'onCheck',
			value: function onCheck() {
				this.props.root.onCheck(this);
			}
		}, {
			key: 'onSelect',
			value: function onSelect() {
				this.props.root.onSelect(this);
			}
		}, {
			key: 'onMouseEnter',
			value: function onMouseEnter(e) {
				e.preventDefault();
				this.props.root.onMouseEnter(e, this);
			}
		}, {
			key: 'onMouseLeave',
			value: function onMouseLeave(e) {
				e.preventDefault();
				this.props.root.onMouseLeave(e, this);
			}
		}, {
			key: 'onContextMenu',
			value: function onContextMenu(e) {
				e.preventDefault();
				this.props.root.onContextMenu(e, this);
			}
		}, {
			key: 'onDragStart',
			value: function onDragStart(e) {
				// console.log('dragstart', this.props.eventKey, e);
				// e.preventDefault();
				e.stopPropagation();
				this.setState({
					dragNodeHighlight: true
				});
				this.props.root.onDragStart(e, this);
				try {
					// ie throw error
					e.dataTransfer.setData('text/plain', 'firefox-need-it');
				} finally {
					// empty
				}
			}
		}, {
			key: 'onDragEnter',
			value: function onDragEnter(e) {
				// console.log('dragenter', this.props.eventKey, e);
				e.preventDefault();
				e.stopPropagation();
				this.props.root.onDragEnter(e, this);
			}
		}, {
			key: 'onDragOver',
			value: function onDragOver(e) {
				// console.log(this.props.eventKey, e);
				// todo disabled
				e.preventDefault();
				e.stopPropagation();
				this.props.root.onDragOver(e, this);
				return false;
			}
		}, {
			key: 'onDragLeave',
			value: function onDragLeave(e) {
				// console.log(this.props.eventKey, e);
				e.stopPropagation();
				this.props.root.onDragLeave(e, this);
			}
		}, {
			key: 'onDrop',
			value: function onDrop(e) {
				e.preventDefault();
				e.stopPropagation();
				this.setState({
					dragNodeHighlight: false
				});
				this.props.root.onDrop(e, this);
			}
		}, {
			key: 'onExpand',
			value: function onExpand() {
				var _this4 = this;

				var callbackPromise = this.props.root.onExpand(this);
				if (callbackPromise && (typeof callbackPromise === 'undefined' ? 'undefined' : _typeof(callbackPromise)) === 'object') {
					(function () {
						var setLoading = function setLoading(dataLoading) {
							_this4.setState({ dataLoading: dataLoading });
						};
						setLoading(true);
						callbackPromise.then(function () {
							setLoading(false);
						}, function () {
							setLoading(false);
						});
					})();
				}
			}

			// keyboard event support

		}, {
			key: 'onKeyDown',
			value: function onKeyDown(e) {
				e.preventDefault();
			}
		}, {
			key: 'renderSwitcher',
			value: function renderSwitcher(props, expandedState) {
				var prefixCls = props.prefixCls;
				var switcherCls = _defineProperty({}, prefixCls + '-switcher', true);
				if (!props.showLine) {
					switcherCls[prefixCls + '-noline_' + expandedState] = true;
				} else if (props.pos === '0-0') {
					switcherCls[prefixCls + '-roots_' + expandedState] = true;
				} else {
					switcherCls[prefixCls + '-center_' + expandedState] = !props.last;
					switcherCls[prefixCls + '-bottom_' + expandedState] = props.last;
				}
				if (props.disabled) {
					switcherCls[prefixCls + '-switcher-disabled'] = true;
					return React.createElement('span', { className: classNames(switcherCls) });
				}
				return React.createElement('span', { className: classNames(switcherCls), onClick: this.onExpand });
			}
		}, {
			key: 'renderCheckbox',
			value: function renderCheckbox(props) {
				var prefixCls = props.prefixCls;
				var checkboxCls = _defineProperty({}, prefixCls + '-checkbox', true);
				if (props.checkPart) {
					checkboxCls[prefixCls + '-checkbox-indeterminate'] = true;
				} else if (props.checked) {
					checkboxCls[prefixCls + '-checkbox-checked'] = true;
				}
				var customEle = null;
				if (typeof props.checkable !== 'boolean') {
					customEle = props.checkable;
				}
				if (props.disabled || props.disableCheckbox) {
					checkboxCls[prefixCls + '-checkbox-disabled'] = true;
					return React.createElement(
						'span',
						{ ref: 'checkbox', className: classNames(checkboxCls) },
						customEle
					);
				}
				return React.createElement(
					'span',
					{ ref: 'checkbox', className: classNames(checkboxCls), onClick: this.onCheck },
					customEle
				);
			}
		}, {
			key: 'renderChildren',
			value: function renderChildren(props) {
				var renderFirst = this.renderFirst;
				this.renderFirst = 1;
				var transitionAppear = true;
				if (!renderFirst && props.expanded) {
					transitionAppear = false;
				}
				var children = props.children;
				var newChildren = children;
				var allTreeNode = undefined;
				if (Array.isArray(children)) {
					allTreeNode = children.every(function (item) {
						return item.type === TreeNode;
					});
				}
				if (children && (children.type === TreeNode || allTreeNode)) {
					var _cls;

					var cls = (_cls = {}, _defineProperty(_cls, props.prefixCls + '-child-tree', true), _defineProperty(_cls, props.prefixCls + '-child-tree-open', props.expanded), _cls);
					if (props.showLine) {
						cls[props.prefixCls + '-line'] = !props.last;
					}
					var animProps = {};
					if (props.openTransitionName) {
						animProps.transitionName = props.openTransitionName;
					} else if (_typeof(props.openAnimation) === 'object') {
						animProps.animation = assign({}, props.openAnimation);
						if (!transitionAppear) {
							delete animProps.animation.appear;
						}
					}
					newChildren = React.createElement(
						Animate,
						_extends({}, animProps, {
							showProp: 'expanded',
							transitionAppear: transitionAppear,
							component: '' }),
						React.createElement(
							'ul',
							{ className: classNames(cls), expanded: props.expanded },
							React.Children.map(children, function (item, index) {
								return props.root.renderTreeNode(item, index, props.pos);
							}, props.root)
						)
					);
				}
				return newChildren;
			}
		}, {
			key: 'render',
			value: function render() {
				var _iconEleCls,
				    _this5 = this;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var expandedState = props.expanded ? 'open' : 'close';

				var iconEleCls = (_iconEleCls = {}, _defineProperty(_iconEleCls, prefixCls + '-iconEle', true), _defineProperty(_iconEleCls, prefixCls + '-icon_loading', this.state.dataLoading), _defineProperty(_iconEleCls, prefixCls + '-icon__' + expandedState, true), _iconEleCls);

				var canRenderSwitcher = true;
				var content = props.title;
				var newChildren = this.renderChildren(props);
				if (!newChildren || newChildren === props.children) {
					// content = newChildren;
					newChildren = null;
					if (!props.loadData || props.isLeaf) {
						canRenderSwitcher = false;
					}
				}

				var selectHandle = function selectHandle() {
					var icon = props.showIcon || props.loadData && _this5.state.dataLoading ? React.createElement('span', { className: classNames(iconEleCls) }) : null;
					var title = React.createElement(
						'span',
						{ className: prefixCls + '-title' },
						content
					);
					var domProps = {};
					if (!props.disabled) {
						if (props.selected || _this5.state.dragNodeHighlight) {
							domProps.className = prefixCls + '-node-selected';
						}
						domProps.onClick = function (e) {
							e.preventDefault();
							if (props.selectable) {
								_this5.onSelect();
							}
							// not fire check event
							// if (props.checkable) {
							//   this.onCheck();
							// }
						};
						if (props.onRightClick) {
							domProps.onContextMenu = _this5.onContextMenu;
						}
						if (props.onMouseEnter) {
							domProps.onMouseEnter = _this5.onMouseEnter;
						}
						if (props.onMouseLeave) {
							domProps.onMouseLeave = _this5.onMouseLeave;
						}
						if (props.draggable) {
							if (ieOrEdge) {
								// ie bug!
								domProps.href = '#';
							}
							domProps.draggable = true;
							domProps['aria-grabbed'] = true;
							domProps.onDragStart = _this5.onDragStart;
						}
					}
					return React.createElement(
						'a',
						_extends({ ref: 'selectHandle', title: typeof content === 'string' ? content : '' }, domProps),
						icon,
						title
					);
				};

				var liProps = {};
				if (props.draggable) {
					liProps.onDragEnter = this.onDragEnter;
					liProps.onDragOver = this.onDragOver;
					liProps.onDragLeave = this.onDragLeave;
					liProps.onDrop = this.onDrop;
				}

				var disabledCls = '';
				var dragOverCls = '';
				if (props.disabled) {
					disabledCls = prefixCls + '-treenode-disabled';
				} else if (props.dragOver) {
					dragOverCls = 'drag-over';
				} else if (props.dragOverGapTop) {
					dragOverCls = 'drag-over-gap-top';
				} else if (props.dragOverGapBottom) {
					dragOverCls = 'drag-over-gap-bottom';
				}

				var filterCls = props.filterTreeNode(this) ? 'filter-node' : '';

				var noopSwitcher = function noopSwitcher() {
					var _cls2;

					var cls = (_cls2 = {}, _defineProperty(_cls2, prefixCls + '-switcher', true), _defineProperty(_cls2, prefixCls + '-switcher-noop', true), _cls2);
					if (props.showLine) {
						cls[prefixCls + '-center_docu'] = !props.last;
						cls[prefixCls + '-bottom_docu'] = props.last;
					} else {
						cls[prefixCls + '-noline_docu'] = true;
					}
					return React.createElement('span', { className: classNames(cls) });
				};

				return React.createElement(
					'li',
					_extends({}, liProps, { ref: 'li', className: classNames(props.className, disabledCls, dragOverCls, filterCls) }),
					canRenderSwitcher ? this.renderSwitcher(props, expandedState) : noopSwitcher(),
					props.checkable ? this.renderCheckbox(props) : null,
					selectHandle(),
					newChildren
				);
			}
		}]);

		return TreeNode;
	})(React.Component);

	TreeNode.isTreeNode = 1;

	TreeNode.propTypes = {
		prefixCls: PropTypes.string,
		disabled: PropTypes.bool,
		disableCheckbox: PropTypes.bool,
		expanded: PropTypes.bool,
		isLeaf: PropTypes.bool,
		root: PropTypes.object,
		onSelect: PropTypes.func
	};

	TreeNode.defaultProps = {
		title: defaultTitle
	};

	Tree.TreeNode = TreeNode;
	RC.TreeNode = TreeNode;
	RC.Tree = Tree;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//v1.1.5 - 2016.2.14
+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var assign = _ref.assign;
	var classnames = RC.classnames;
	var Animate = RC.Animate;
	var KeyCode = RC.KeyCode;
	var Tree = RC.Tree;
	var TreeNode = RC.TreeNode;
	var Trigger = RC.Trigger;
	var _React = React;
	var PropTypes = _React.PropTypes;

	function getValuePropValue(child) {
		var props = child.props;
		if ('value' in props) {
			return props.value;
		}
		if (child.key) {
			return child.key;
		}
		throw new Error('no key or value for ' + child);
	}

	function getPropValue(child, prop) {
		if (prop === 'value') {
			return getValuePropValue(child);
		}
		return child.props[prop];
	}

	function isCombobox(props) {
		return props.combobox;
	}

	function isMultipleOrTags(props) {
		return props.multiple || props.tags || props.treeCheckable;
	}

	function isMultipleOrTagsOrCombobox(props) {
		return isMultipleOrTags(props) || isCombobox(props);
	}

	function isSingleMode(props) {
		return !isMultipleOrTagsOrCombobox(props);
	}

	function toArray(value) {
		var ret = value;
		if (value === undefined) {
			ret = [];
		} else if (!Array.isArray(value)) {
			ret = [value];
		}
		return ret;
	}

	function isInclude(smallArray, bigArray) {
		// attention: [0,0,1] [0,0,10]
		return smallArray.every(function (ii, i) {
			return ii === bigArray[i];
		});
	}
	function getCheckedKeys(node, checkedKeys, allCheckedNodesKeys) {
		var nodeKey = node.props.eventKey;
		var newCks = [].concat(_toConsumableArray(checkedKeys));
		var nodePos = undefined;
		var unCheck = allCheckedNodesKeys.some(function (item) {
			if (item.key === nodeKey) {
				nodePos = item.pos;
				return true;
			}
		});
		if (unCheck) {
			(function () {
				var nArr = nodePos.split('-');
				newCks = [];
				allCheckedNodesKeys.forEach(function (item) {
					var iArr = item.pos.split('-');
					if (item.pos === nodePos || nArr.length > iArr.length && isInclude(iArr, nArr) || nArr.length < iArr.length && isInclude(nArr, iArr)) {
						// 过滤掉 父级节点 和 所有子节点。
						// 因为 node节点 不选时，其 父级节点 和 所有子节点 都不选。
						return;
					}
					newCks.push(item.key);
				});
			})();
		} else {
			newCks.push(nodeKey);
		}
		return newCks;
	}

	function loopAllChildren(childs, callback) {
		var loop = function loop(children, level) {
			React.Children.forEach(children, function (item, index) {
				var pos = level + '-' + index;
				if (item.props.children) {
					loop(item.props.children, pos);
				}
				callback(item, index, pos, getValuePropValue(item));
			});
		};
		loop(childs, 0);
	}

	function filterMinPos(arr) {
		var a = [];
		arr.forEach(function (item) {
			var b = a.filter(function (i) {
				return item.indexOf(i) === 0 && (item[i.length] === '-' || !item[i.length]);
			});
			if (!b.length) {
				a.push(item);
			}
		});
		return a;
	}
	// console.log(filterMinPos(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

	function handleCheckState(obj, checkedPosArr, checkIt) {
		var stripTail = function stripTail(str) {
			var arr = str.match(/(.+)(-[^-]+)$/);
			var st = '';
			if (arr && arr.length === 3) {
				st = arr[1];
			}
			return st;
		};
		// stripTail('x-xx-sss-xx')
		var splitPos = function splitPos(pos) {
			return pos.split('-');
		};
		checkedPosArr.forEach(function (_pos) {
			// 设置子节点，全选或全不选
			Object.keys(obj).forEach(function (i) {
				if (splitPos(i).length > splitPos(_pos).length && i.indexOf(_pos) === 0) {
					obj[i].checkPart = false;
					obj[i].checked = checkIt;
				}
			});
			// 循环设置父节点的 选中 或 半选状态
			var loop = function loop(__pos) {
				var _posLen = splitPos(__pos).length;
				if (_posLen <= 2) {
					// e.g. '0-0', '0-1'
					return;
				}
				var sibling = 0;
				var siblingChecked = 0;
				var parentPos = stripTail(__pos);
				Object.keys(obj).forEach(function (i) {
					if (splitPos(i).length === _posLen && i.indexOf(parentPos) === 0) {
						sibling++;
						if (obj[i].checked) {
							siblingChecked++;
						} else if (obj[i].checkPart) {
							siblingChecked += 0.5;
						}
					}
				});
				var parent = obj[parentPos];
				// sibling 不会等于0
				// 全不选 - 全选 - 半选
				if (siblingChecked === 0) {
					parent.checked = false;
					parent.checkPart = false;
				} else if (siblingChecked === sibling) {
					parent.checked = true;
					parent.checkPart = false;
				} else {
					parent.checkPart = true;
					parent.checked = false;
				}
				loop(parentPos);
			};
			loop(_pos);
		});
	}

	function getCheckValues(treeNodesStates) {
		var checkedValues = [];
		Object.keys(treeNodesStates).forEach(function (item) {
			var itemObj = treeNodesStates[item];
			if (itemObj.checked && !itemObj.node.props.children) {
				checkedValues.push(getValuePropValue(itemObj.node));
			}
		});
		return {
			checkedValues: checkedValues
		};
	}

	function getTreeNodesStates(children, values) {
		var checkedPos = [];
		var treeNodesStates = {};
		loopAllChildren(children, function (item, index, pos, value) {
			var checked = false;
			if (values.indexOf(value) !== -1) {
				checked = true;
				checkedPos.push(pos);
			}
			treeNodesStates[pos] = {
				node: item,
				checked: checked,
				checkPart: false
			};
		});

		handleCheckState(treeNodesStates, filterMinPos(checkedPos.sort()), true);

		return getCheckValues(treeNodesStates);
	}

	var _TreeNode = (function (_React$Component) {
		_inherits(_TreeNode, _React$Component);

		function _TreeNode() {
			_classCallCheck(this, _TreeNode);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(_TreeNode).apply(this, arguments));
		}

		return _TreeNode;
	})(React.Component);

	_TreeNode.propTypes = {
		value: React.PropTypes.string
	};

	var BUILT_IN_PLACEMENTS = {
		bottomLeft: {
			points: ['tl', 'bl'],
			offset: [0, 4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		},
		topLeft: {
			points: ['bl', 'tl'],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		}
	};

	var SelectTrigger = React.createClass({
		displayName: 'SelectTrigger',

		propTypes: {
			dropdownMatchSelectWidth: PropTypes.bool,
			visible: PropTypes.bool,
			filterTreeNode: PropTypes.any,
			treeNodes: PropTypes.any,
			prefixCls: PropTypes.string,
			popupClassName: PropTypes.string,
			children: PropTypes.any
		},

		componentDidUpdate: function componentDidUpdate() {
			if (this.props.dropdownMatchSelectWidth && this.props.visible) {
				var dropdownDOMNode = this.getPopupDOMNode();
				if (dropdownDOMNode) {
					dropdownDOMNode.style.width = ReactDOM.findDOMNode(this).offsetWidth + 'px';
				}
			}
		},
		getPopupEleRefs: function getPopupEleRefs() {
			return this.popupEle && this.popupEle.refs;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		getDropdownTransitionName: function getDropdownTransitionName() {
			var props = this.props;
			var transitionName = props.transitionName;
			if (!transitionName && props.animation) {
				transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
			}
			return transitionName;
		},
		getDropdownPrefixCls: function getDropdownPrefixCls() {
			return this.props.prefixCls + '-dropdown';
		},
		filterTree: function filterTree(treeNode) {
			var props = this.props;
			return props.inputValue && treeNode.props[props.treeNodeFilterProp].indexOf(props.inputValue) > -1;
		},
		filterTreeNode: function filterTreeNode(input, child) {
			if (!input) {
				return true;
			}
			var filterTreeNode = this.props.filterTreeNode;
			if (!filterTreeNode) {
				return true;
			}
			if (child.props.disabled) {
				return false;
			}
			return filterTreeNode.call(this, input, child);
		},
		savePopupElement: function savePopupElement(ele) {
			this.popupEle = ele;
		},
		renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren(children) {
			var _this2 = this;

			var posArr = [];
			var filterPos = [];
			var props = this.props;
			var inputValue = props.inputValue;

			loopAllChildren(children, function (child, index, pos) {
				if (_this2.filterTreeNode(inputValue, child)) {
					posArr.push(pos);
				}
			});
			posArr = filterMinPos(posArr);

			var filterChildren = {};
			loopAllChildren(children, function (child, index, pos) {
				posArr.forEach(function (item) {
					if (item.indexOf(pos) === 0 && filterPos.indexOf(pos) === -1) {
						filterPos.push(pos);
						filterChildren[pos] = child;
					}
				});
			});

			var level = {};
			filterPos.forEach(function (pos) {
				var arr = pos.split('-');
				var key = String(arr.length - 1);
				level[key] = level[key] || [];
				level[key].push(pos);
			});

			var childrenArr = [];

			function loop(arr, cur, callback) {
				arr.forEach(function (c, index) {
					if (cur.indexOf(c.pos) === 0) {
						if (c.children) {
							if (cur.split('-').length === c.pos.split('-').length + 1) {
								callback(arr, index);
							} else {
								loop(c.children, cur, callback);
							}
						} else {
							callback(arr, index);
						}
					}
				});
			}
			var levelArr = Object.keys(level).sort(function (a, b) {
				return a - b;
			});
			if (levelArr.length > 0) {
				level[levelArr[0]].forEach(function (pos, index) {
					childrenArr[index] = {
						pos: pos,
						node: filterChildren[pos]
					};
				});
				var loopFn = function loopFn(cur) {
					loop(childrenArr, cur, function (arr, index) {
						arr[index].children = arr[index].children || [];
						arr[index].children.push({
							pos: cur,
							node: filterChildren[cur]
						});
					});
				};
				for (var i = 1; i < levelArr.length; i++) {
					level[levelArr[i]].forEach(loopFn);
				}
			}
			return childrenArr;
		},
		renderTree: function renderTree(treeNodes, newTreeNodes, multiple) {
			var props = this.props;

			var loop = function loop(data) {
				return data.map(function (item) {
					var tProps = { key: item.node.key };
					assign(tProps, item.node.props);
					if (tProps.children) {
						delete tProps.children;
					}
					if (item.children) {
						return React.createElement(
							TreeNode,
							tProps,
							loop(item.children)
						);
					}
					return React.createElement(TreeNode, tProps);
				});
			};

			var trProps = {
				multiple: multiple,
				prefixCls: props.prefixCls + '-tree',
				showIcon: props.treeIcon,
				showLine: props.treeLine,
				defaultExpandAll: props.treeDefaultExpandAll,
				checkable: props.treeCheckable,
				filterTreeNode: this.filterTree
			};
			var vals = props.value || props.defaultValue;
			var keys = [];
			loopAllChildren(treeNodes, function (child) {
				if (vals.indexOf(getValuePropValue(child)) > -1) {
					keys.push(child.key);
				}
			});
			// 为避免混乱，checkable 模式下，select 失效
			if (trProps.checkable) {
				trProps.selectable = false;
				trProps.checkedKeys = keys;
				trProps.onCheck = props.onSelect;
			} else {
				trProps.selectedKeys = keys;
				trProps.onSelect = props.onSelect;
			}

			// async loadData
			if (props.loadData) {
				trProps.loadData = props.loadData;
			}

			return React.createElement(
				Tree,
				_extends({ ref: this.savePopupElement }, trProps),
				loop(newTreeNodes)
			);
		},
		render: function render() {
			var _popupClassName;

			var props = this.props;
			var multiple = props.multiple;
			var dropdownPrefixCls = this.getDropdownPrefixCls();
			var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, props.dropdownClassName, !!props.dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
			var visible = props.visible;
			var search = multiple || props.combobox || !props.showSearch ? null : React.createElement(
				'span',
				{ className: dropdownPrefixCls + '-search' },
				props.inputElement
			);
			var treeNodes = this.renderFilterOptionsFromChildren(props.treeData || props.treeNodes);
			var notFoundContent = undefined;
			if (!treeNodes.length) {
				if (props.notFoundContent) {
					notFoundContent = React.createElement(
						'span',
						null,
						props.notFoundContent
					);
				}
				if (!search) {
					visible = false;
				}
			}
			var popupElement = React.createElement(
				'div',
				null,
				search,
				notFoundContent ? notFoundContent : this.renderTree(props.treeData || props.treeNodes, treeNodes, multiple)
			);

			return React.createElement(
				Trigger,
				{ action: props.disabled ? [] : ['click'],
					ref: 'trigger',
					popupPlacement: 'bottomLeft',
					builtinPlacements: BUILT_IN_PLACEMENTS,
					prefixCls: dropdownPrefixCls,
					popupTransitionName: this.getDropdownTransitionName(),
					onPopupVisibleChange: props.onDropdownVisibleChange,
					popup: popupElement,
					popupVisible: visible,
					popupClassName: classnames(popupClassName),
					popupStyle: props.dropdownStyle
				},
				this.props.children
			);
		}
	});

	function filterFn(input, child) {
		return String(getPropValue(child, this.props.treeNodeFilterProp)).indexOf(input) > -1;
	}

	function saveRef(name, component) {
		this[name] = component;
	}

	function loopTreeData(data) {
		var level = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

		return data.map(function (item, index) {
			var pos = level + '-' + index;
			var props = {
				title: item.label,
				value: item.value,
				key: item.key || item.value || pos
			};
			var ret = undefined;
			if (item.children && item.children.length) {
				ret = React.createElement(
					_TreeNode,
					props,
					loopTreeData(item.children, pos)
				);
			} else {
				ret = React.createElement(_TreeNode, _extends({}, props, { isLeaf: item.isLeaf }));
			}
			return ret;
		});
	}

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			children: PropTypes.any,
			multiple: PropTypes.bool,
			filterTreeNode: PropTypes.any,
			showSearch: PropTypes.bool,
			disabled: PropTypes.bool,
			showArrow: PropTypes.bool,
			tags: PropTypes.bool,
			transitionName: PropTypes.string,
			animation: PropTypes.string,
			choiceTransitionName: PropTypes.string,
			onClick: PropTypes.func,
			onChange: PropTypes.func,
			onSelect: PropTypes.func,
			onSearch: PropTypes.func,
			searchPlaceholder: PropTypes.string,
			placeholder: PropTypes.any,
			value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
			defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
			label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			dropdownStyle: PropTypes.object,
			maxTagTextLength: PropTypes.number,
			treeIcon: PropTypes.bool,
			treeLine: PropTypes.bool,
			treeDefaultExpandAll: PropTypes.bool,
			treeCheckable: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
			treeNodeLabelProp: PropTypes.string,
			treeNodeFilterProp: PropTypes.string,
			treeData: PropTypes.array,
			loadData: PropTypes.func
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-tree-select',
				filterTreeNode: filterFn,
				showSearch: true,
				allowClear: false,
				placeholder: '',
				searchPlaceholder: '',
				defaultValue: [],
				onClick: noop,
				onChange: noop,
				onSelect: noop,
				onSearch: noop,
				showArrow: true,
				dropdownMatchSelectWidth: true,
				dropdownStyle: {},
				notFoundContent: 'Not Found',
				treeIcon: false,
				treeLine: false,
				treeDefaultExpandAll: false,
				treeCheckable: false,
				treeNodeFilterProp: 'value',
				treeNodeLabelProp: 'title'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var value = [];
			if ('value' in props) {
				value = toArray(props.value);
			} else {
				value = toArray(props.defaultValue);
			}
			if (this.props.treeCheckable) {
				value = getTreeNodesStates(this.renderTreeData() || this.props.children, value).checkedValues;
			}
			var label = this.getLabelFromProps(props, value, 1);
			var inputValue = '';
			if (props.combobox) {
				inputValue = value[0] || '';
			}
			this.saveInputRef = saveRef.bind(this, 'inputInstance');
			return { value: value, inputValue: inputValue, label: label };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = toArray(nextProps.value);
				if (nextProps.treeCheckable) {
					value = getTreeNodesStates(this.renderTreeData(nextProps) || nextProps.children, value).checkedValues;
				}
				var label = this.getLabelFromProps(nextProps, value);
				this.setState({
					value: value,
					label: label
				});
				if (nextProps.combobox) {
					this.setState({
						inputValue: value[0] || ''
					});
				}
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			var state = this.state;
			var props = this.props;
			if (state.open && isMultipleOrTags(props)) {
				var inputNode = this.getInputDOMNode();
				if (inputNode.value) {
					inputNode.style.width = '';
					inputNode.style.width = inputNode.scrollWidth + 'px';
				} else {
					inputNode.style.width = '';
				}
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.dropdownContainer) {
				ReactDOM.unmountComponentAtNode(this.dropdownContainer);
				document.body.removeChild(this.dropdownContainer);
				this.dropdownContainer = null;
			}
		},
		onInputChange: function onInputChange(event) {
			var val = event.target.value;
			var props = this.props;
			this.setState({
				inputValue: val,
				open: true
			});
			if (isCombobox(props)) {
				this.fireChange([val], [val]);
			}
			props.onSearch(val);
		},
		onDropdownVisibleChange: function onDropdownVisibleChange(open) {
			this.setOpenState(open);
		},

		// combobox ignore
		onKeyDown: function onKeyDown(event) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var keyCode = event.keyCode;
			if (this.state.open && !this.getInputDOMNode()) {
				this.onInputKeyDown(event);
			} else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
				this.setOpenState(true);
				event.preventDefault();
			}
		},
		onInputKeyDown: function onInputKeyDown(event) {
			var props = this.props;
			var state = this.state;
			var keyCode = event.keyCode;
			if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
				var value = state.value.concat();
				if (value.length) {
					var label = state.label.concat();
					value.pop();
					label.pop();
					this.fireChange(value, label);
				}
				return;
			}

			if (keyCode === KeyCode.DOWN) {
				if (!state.open) {
					this.openIfHasChildren();
					event.preventDefault();
					event.stopPropagation();
					return;
				}
			} else if (keyCode === KeyCode.ESC) {
				if (state.open) {
					this.setOpenState(false);
					event.preventDefault();
					event.stopPropagation();
				}
				return;
			}

			if (state.open) {
				// const menu = this.refs.trigger.getPopupEleRefs();
				// if (menu && menu.onKeyDown(event)) {
				//   event.preventDefault();
				//   event.stopPropagation();
				// }
			}
		},
		onSelect: function onSelect(selectedKeys, info) {
			var _this3 = this;

			var check = info.event === 'check';
			if (info.selected === false) {
				this.onDeselect(info);
				return;
			}
			var item = info.node;
			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var selectedValue = getValuePropValue(item);
			var selectedLabel = this.getLabelFromNode(item);
			props.onSelect(selectedValue, item);
			if (isMultipleOrTags(props)) {
				if (check) {
					// TODO treeCheckable does not support tags/dynamic
					var checkedNodes = info.checkedNodes;

					checkedNodes = checkedNodes.filter(function (n) {
						return !n.props.children;
					});
					value = checkedNodes.map(function (n) {
						return getValuePropValue(n);
					});
					label = checkedNodes.map(function (n) {
						return _this3.getLabelFromNode(n);
					});
				} else {
					if (value.indexOf(selectedValue) !== -1) {
						return;
					}
					value = value.concat([selectedValue]);
					label = label.concat([selectedLabel]);
				}
				if (!check && value.indexOf(selectedValue) !== -1) {
					// 设置 multiple 时会有bug。（isValueChange 已有检查，此处注释掉）
					// return;
				}
			} else {
					if (value[0] === selectedValue) {
						this.setOpenState(false);
						return;
					}
					value = [selectedValue];
					label = [selectedLabel];
					this.setOpenState(false);
				}

			this.fireChange(value, label, { triggerValue: selectedValue, triggerNode: item, checked: info.checked });
			this.setState({
				inputValue: ''
			});
			if (isCombobox(props)) {
				this.setState({
					inputValue: getPropValue(item, props.treeNodeLabelProp)
				});
			}
		},
		onDeselect: function onDeselect(info) {
			this.removeSelected(getValuePropValue(info.node));
			if (!isMultipleOrTags(this.props)) {
				this.setOpenState(false);
			}
			this.setState({
				inputValue: ''
			});
		},
		onPlaceholderClick: function onPlaceholderClick() {
			this.getInputDOMNode().focus();
		},
		onClearSelection: function onClearSelection(event) {
			var props = this.props;
			var state = this.state;
			if (props.disabled) {
				return;
			}
			event.stopPropagation();
			if (state.inputValue || state.value.length) {
				this.fireChange([], []);
				this.setOpenState(false);
				this.setState({
					inputValue: ''
				});
			}
		},
		getLabelBySingleValue: function getLabelBySingleValue(children, value) {
			var _this4 = this;

			if (value === undefined) {
				return null;
			}
			var label = null;
			var loop = function loop(childs) {
				React.Children.forEach(childs, function (item) {
					if (item.props.children) {
						loop(item.props.children);
					}
					if (getValuePropValue(item) === value) {
						label = _this4.getLabelFromNode(item);
					}
				});
			};
			loop(children, 0);
			return label;
		},
		getLabelFromNode: function getLabelFromNode(child) {
			return getPropValue(child, this.props.treeNodeLabelProp);
		},
		getLabelFromProps: function getLabelFromProps(props, value, init) {
			var label = [];
			if ('label' in props) {
				label = toArray(props.label);
			} else if (init && 'defaultLabel' in props) {
				label = toArray(props.defaultLabel);
			} else {
				label = this.getLabelByValue(this.renderTreeData(props) || props.children, value);
			}
			return label;
		},
		getVLForOnChange: function getVLForOnChange(vls) {
			if (vls !== undefined) {
				return isMultipleOrTags(this.props) ? vls : vls[0];
			}
			return vls;
		},
		getLabelByValue: function getLabelByValue(children, values) {
			var _this5 = this;

			return values.map(function (value) {
				var label = _this5.getLabelBySingleValue(children, value);
				if (label === null) {
					return value;
				}
				return label;
			});
		},
		getDropdownContainer: function getDropdownContainer() {
			if (!this.dropdownContainer) {
				this.dropdownContainer = document.createElement('div');
				document.body.appendChild(this.dropdownContainer);
			}
			return this.dropdownContainer;
		},
		getSearchPlaceholderElement: function getSearchPlaceholderElement(hidden) {
			var props = this.props;
			if (props.searchPlaceholder) {
				return React.createElement(
					'span',
					{
						style: { display: hidden ? 'none' : 'block' },
						onClick: this.onPlaceholderClick,
						className: props.prefixCls + '-search__field__placeholder' },
					props.searchPlaceholder
				);
			}
			return null;
		},
		getInputElement: function getInputElement() {
			var props = this.props;
			return React.createElement(
				'span',
				{ className: props.prefixCls + '-search__field__wrap' },
				React.createElement('input', { ref: this.saveInputRef,
					onChange: this.onInputChange,
					onKeyDown: this.onInputKeyDown,
					value: this.state.inputValue,
					disabled: props.disabled,
					className: props.prefixCls + '-search__field',
					role: 'textbox' }),
				isMultipleOrTags(props) ? null : this.getSearchPlaceholderElement(!!this.state.inputValue)
			);
		},
		getInputDOMNode: function getInputDOMNode() {
			return this.inputInstance;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDOMNode();
		},
		getPopupComponentRefs: function getPopupComponentRefs() {
			return this.refs.trigger.getPopupEleRefs();
		},
		setOpenState: function setOpenState(open) {
			var _this6 = this;

			var refs = this.refs;
			this.setState({
				open: open
			}, function () {
				if (open || isMultipleOrTagsOrCombobox(_this6.props)) {
					if (_this6.getInputDOMNode()) {
						_this6.getInputDOMNode().focus();
					}
				} else if (refs.selection) {
					refs.selection.focus();
				}
			});
		},
		removeSelected: function removeSelected(selectedValue, e) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			if (e) {
				e.stopPropagation();
			}
			var label = this.state.label.concat();
			var index = this.state.value.indexOf(selectedValue);
			var value = this.state.value.filter(function (singleValue) {
				return singleValue !== selectedValue;
			});
			if (index !== -1) {
				label.splice(index, 1);
			}
			this.fireChange(value, label, { triggerValue: selectedValue, clear: true });
		},
		openIfHasChildren: function openIfHasChildren() {
			var props = this.props;
			if (React.Children.count(props.children) || isSingleMode(props)) {
				this.setOpenState(true);
			}
		},
		isValueChange: function isValueChange(value) {
			var sv = this.state.value;
			if (typeof sv === 'string') {
				sv = [sv];
			}
			if (value.length !== sv.length || !value.every(function (val, index) {
				return sv[index] === val;
			})) {
				return true;
			}
		},
		fireChange: function fireChange(value, label, extraInfo) {
			var props = this.props;
			if (!('value' in props)) {
				this.setState({
					value: value, label: label
				});
			}
			if (this.isValueChange(value)) {
				var ex = { preValue: [].concat(_toConsumableArray(this.state.value)) };
				if (extraInfo) {
					assign(ex, extraInfo);
				}
				props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label), ex);
			}
		},
		renderTopControlNode: function renderTopControlNode() {
			var _this7 = this;

			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var choiceTransitionName = props.choiceTransitionName;
			var prefixCls = props.prefixCls;
			var maxTagTextLength = props.maxTagTextLength;
			// single and not combobox, input is inside dropdown

			if (isSingleMode(props)) {
				var placeholder = React.createElement(
					'span',
					{ key: 'placeholder',
						className: prefixCls + '-selection__placeholder' },
					props.placeholder
				);
				var innerNode = placeholder;
				if (this.state.label[0]) {
					innerNode = React.createElement(
						'span',
						{ key: 'value' },
						this.state.label[0]
					);
				}
				return React.createElement(
					'span',
					{ className: prefixCls + '-selection__rendered' },
					innerNode
				);
			}

			var selectedValueNodes = [];
			if (isMultipleOrTags(props)) {
				selectedValueNodes = value.map(function (singleValue, index) {
					var content = label[index];
					var title = content;
					if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
						content = content.slice(0, maxTagTextLength) + '...';
					}
					return React.createElement(
						'li',
						{ className: prefixCls + '-selection__choice',
							key: singleValue,
							title: title },
						React.createElement(
							'span',
							{ className: prefixCls + '-selection__choice__content' },
							content
						),
						React.createElement('span', { className: prefixCls + '-selection__choice__remove',
							onClick: _this7.removeSelected.bind(_this7, singleValue) })
					);
				});
			}
			selectedValueNodes.push(React.createElement(
				'li',
				{ className: prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
				this.getInputElement()
			));
			var className = prefixCls + '-selection__rendered';
			if (isMultipleOrTags(props) && choiceTransitionName) {
				return React.createElement(
					Animate,
					{ className: className,
						component: 'ul',
						transitionName: choiceTransitionName },
					selectedValueNodes
				);
			}
			return React.createElement(
				'ul',
				{ className: className },
				selectedValueNodes
			);
		},
		renderTreeData: function renderTreeData(props) {
			var validProps = props || this.props;
			if (validProps.treeData) {
				return loopTreeData(validProps.treeData);
			}
		},
		render: function render() {
			var _rootCls;

			var props = this.props;
			var multiple = isMultipleOrTags(props);
			var state = this.state;
			var className = props.className;
			var disabled = props.disabled;
			var allowClear = props.allowClear;
			var prefixCls = props.prefixCls;

			var ctrlNode = this.renderTopControlNode();
			var extraSelectionProps = {};
			if (!isCombobox(props)) {
				extraSelectionProps = {
					onKeyDown: this.onKeyDown,
					tabIndex: 0
				};
			}
			var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', state.open), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _rootCls);

			var clear = React.createElement('span', { key: 'clear',
				className: prefixCls + '-selection__clear',
				onClick: this.onClearSelection });
			return React.createElement(
				SelectTrigger,
				_extends({}, props, {
					treeNodes: props.children,
					treeData: this.renderTreeData(),
					multiple: multiple,
					disabled: disabled,
					visible: state.open,
					inputValue: state.inputValue,
					inputElement: this.getInputElement(),
					value: state.value,
					onDropdownVisibleChange: this.onDropdownVisibleChange,
					onSelect: this.onSelect,
					ref: 'trigger' }),
				React.createElement(
					'span',
					{
						style: props.style,
						onClick: props.onClick,
						className: classnames(rootCls) },
					React.createElement(
						'span',
						_extends({ ref: 'selection',
							key: 'selection',
							className: prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
							role: 'combobox',
							'aria-autocomplete': 'list',
							'aria-haspopup': 'true',
							'aria-expanded': state.open
						}, extraSelectionProps),
						ctrlNode,
						allowClear && !isMultipleOrTags(props) ? clear : null,
						multiple || !props.showArrow ? null : React.createElement(
							'span',
							{ key: 'arrow', className: prefixCls + '-arrow', tabIndex: '-1', style: { outline: 'none' } },
							React.createElement('b', null)
						),
						multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null
					)
				)
			);
		}
	});

	Select.TreeNode = _TreeNode;
	RC.TreeSelect = Select;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//v0.14.1-2016.3.9
+(function (RC) {
	var AsyncValidate = RC.AsyncValidate;
	var Util = RC.Util;
	var AsyncValidator = RC.AsyncValidator;
	var GregorianCalendar = RC.GregorianCalendar;
	var hoistStatics = Util.hoistStatics;
	var scrollIntoView = Util.scrollIntoView;
	var _React = React;
	var Component = _React.Component;

	function getDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
	}

	function argumentContainer(Container, WrappedComponent) {
		/* eslint no-param-reassign:0 */
		Container.displayName = 'Form(' + getDisplayName(WrappedComponent) + ')';
		Container.WrappedComponent = WrappedComponent;
		return hoistStatics(Container, WrappedComponent);
	}

	function getValueFromEvent(e) {
		// support custom element
		if (!e || !e.target) {
			return e;
		}
		var target = e.target;

		return target.type === 'checkbox' ? target.checked : target.value;
	}

	function getErrorStrs(errors) {
		if (errors) {
			return errors.map(function (e) {
				if ('message' in e) {
					return e.message;
				}
				return e;
			});
		}
		return errors;
	}

	function isEmptyObject(obj) {
		return Object.keys(obj).length === 0;
	}

	function flattenArray(arr) {
		return Array.prototype.concat.apply([], arr);
	}

	function mirror(obj) {
		return obj;
	}

	function hasRules(validate) {
		if (validate) {
			return validate.some(function (item) {
				return !!item.rules && item.rules.length;
			});
		}
		return false;
	}

	function getParams(ns, opt, cb) {
		var names = ns;
		var callback = cb;
		var options = opt;
		if (cb === undefined) {
			if (typeof names === 'function') {
				callback = names;
				options = {};
				names = undefined;
			} else if (Array.isArray(ns)) {
				if (typeof options === 'function') {
					callback = options;
					options = {};
				} else {
					options = options || {};
				}
			} else {
				callback = options;
				options = names || {};
				names = undefined;
			}
		}
		return {
			names: names,
			callback: callback,
			options: options
		};
	}

	///createBaseForm

	var defaultValidateTrigger = 'onChange';
	var defaultTrigger = defaultValidateTrigger;

	function createBaseForm() {
		var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mixins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
		var mapPropsToFields = option.mapPropsToFields;
		var onFieldsChange = option.onFieldsChange;
		var fieldNameProp = option.fieldNameProp;
		var fieldMetaProp = option.fieldMetaProp;
		var validateMessages = option.validateMessages;
		var _option$mapProps = option.mapProps;
		var mapProps = _option$mapProps === undefined ? mirror : _option$mapProps;
		var _option$formPropName = option.formPropName;
		var formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName;
		var withRef = option.withRef;

		function decorate(WrappedComponent) {
			var Form = React.createClass({
				displayName: 'Form',

				mixins: mixins,

				getInitialState: function getInitialState() {
					var fields = undefined;
					if (mapPropsToFields) {
						fields = mapPropsToFields(this.props);
					}
					this.fields = fields || {};
					this.fieldsMeta = {};
					this.cachedBind = {};
					return {
						submitting: false
					};
				},
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
					if (mapPropsToFields) {
						var fields = mapPropsToFields(nextProps);
						if (fields) {
							var instanceFields = this.fields = _extends({}, this.fields);
							for (var fieldName in fields) {
								if (fields.hasOwnProperty(fieldName)) {
									instanceFields[fieldName] = _extends({}, fields[fieldName], {
										// keep instance
										instance: instanceFields[fieldName] && instanceFields[fieldName].instance
									});
								}
							}
						}
					}
				},
				onChange: function onChange(name, action, event) {
					var fieldMeta = this.getFieldMeta(name);
					var validate = fieldMeta.validate;

					if (fieldMeta[action]) {
						fieldMeta[action](event);
					}
					var value = getValueFromEvent(event);
					var field = this.getField(name, true);
					this.setFields(_defineProperty({}, name, _extends({}, field, {
						value: value,
						dirty: hasRules(validate)
					})));
				},
				onChangeValidate: function onChangeValidate(name, action, event) {
					var fieldMeta = this.getFieldMeta(name);
					if (fieldMeta[action]) {
						fieldMeta[action](event);
					}
					var value = getValueFromEvent(event);
					var field = this.getField(name, true);
					field.value = value;
					field.dirty = true;
					this.validateFieldsInternal([field], {
						action: action,
						options: {
							firstFields: !!fieldMeta.validateFirst
						}
					});
				},
				getCacheBind: function getCacheBind(name, action, fn) {
					var cache = this.cachedBind[name] = this.cachedBind[name] || {};
					if (!cache[action]) {
						cache[action] = fn.bind(this, name, action);
					}
					return cache[action];
				},
				getFieldMeta: function getFieldMeta(name) {
					return this.fieldsMeta[name];
				},
				getField: function getField(name, copy) {
					var ret = this.fields[name];
					if (ret) {
						ret.name = name;
					}
					if (copy) {
						if (ret) {
							return _extends({}, ret);
						}
						return {
							name: name
						};
					}
					return ret;
				},
				getFieldProps: function getFieldProps(name) {
					var _this = this;

					var fieldOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
					var rules = fieldOption.rules;
					var _fieldOption$trigger = fieldOption.trigger;
					var trigger = _fieldOption$trigger === undefined ? defaultTrigger : _fieldOption$trigger;
					var _fieldOption$valuePro = fieldOption.valuePropName;
					var valuePropName = _fieldOption$valuePro === undefined ? 'value' : _fieldOption$valuePro;
					var _fieldOption$validate = fieldOption.validateTrigger;
					var validateTrigger = _fieldOption$validate === undefined ? defaultValidateTrigger : _fieldOption$validate;
					var _fieldOption$validate2 = fieldOption.validate;
					var validate = _fieldOption$validate2 === undefined ? [] : _fieldOption$validate2;

					var fieldMeta = this.fieldsMeta[name] || {};

					if ('initialValue' in fieldOption) {
						fieldMeta.initialValue = fieldOption.initialValue;
					}

					var inputProps = _defineProperty({}, valuePropName, fieldMeta.initialValue);

					if (fieldNameProp) {
						inputProps[fieldNameProp] = name;
					}

					var validateRules = validate.map(function (item) {
						var newItem = _extends({}, item, {
							trigger: item.trigger || []
						});
						if (typeof newItem.trigger === 'string') {
							newItem.trigger = [newItem.trigger];
						}
						return newItem;
					});

					if (rules) {
						validateRules.push({
							trigger: validateTrigger ? [].concat(validateTrigger) : [],
							rules: rules
						});
					}

					validateRules.filter(function (item) {
						return !!item.rules && item.rules.length;
					}).map(function (item) {
						return item.trigger;
					}).reduce(function (pre, curr) {
						return pre.concat(curr);
					}, []).forEach(function (action) {
						inputProps[action] = _this.getCacheBind(name, action, _this.onChangeValidate);
					});

					function checkRule(item) {
						return item.trigger.indexOf(trigger) === -1 || !item.rules || !item.rules.length;
					}

					if (trigger && validateRules.every(checkRule)) {
						inputProps[trigger] = this.getCacheBind(name, trigger, this.onChange);
					}
					var field = this.getField(name);
					if (field && 'value' in field) {
						inputProps[valuePropName] = field.value;
					}

					inputProps.ref = this.getCacheBind(name, name + '__ref', this.saveRef);

					var meta = _extends({}, fieldMeta, fieldOption, {
						validate: validateRules
					});

					this.fieldsMeta[name] = meta;

					if (fieldMetaProp) {
						inputProps[fieldMetaProp] = meta;
					}

					return inputProps;
				},
				getFieldMember: function getFieldMember(name, member) {
					var field = this.getField(name);
					return field && field[member];
				},
				getFieldError: function getFieldError(name) {
					return getErrorStrs(this.getFieldMember(name, 'errors'));
				},
				getValidFieldsName: function getValidFieldsName() {
					var fieldsMeta = this.fieldsMeta;
					return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
						return !fieldsMeta[name].hidden;
					}) : [];
				},
				getFieldsValue: function getFieldsValue(names) {
					var _this2 = this;

					var fields = names || this.getValidFieldsName();
					var allValues = {};
					fields.forEach(function (f) {
						allValues[f] = _this2.getFieldValue(f);
					});
					return allValues;
				},
				getFormatFieldsValue: function getFormatFieldsValue(names) {
					var _this3 = this;

					var fields = names || this.getValidFieldsName();
					var allValues = {};
					fields.forEach(function (f) {
						allValues[f] = _this3.getFormatValue(f);
					});
					return allValues;
				},
				getFieldValue: function getFieldValue(name) {
					var fields = this.fields;

					return this.getValueFromFields(name, fields);
				},
				getFieldInstance: function getFieldInstance(name) {
					var fields = this.fields;

					return fields[name] && fields[name].instance;
				},
				getFormatValue: function getFormatValue(name) {
					var fieldsMeta = this.fieldsMeta;
					var fields = this.fields;

					var field = fields[name];
					var fieldMeta = fieldsMeta[name];
					if (field && 'value' in field) {
						if (field.instance.getFormatter) {
							var calendar = new GregorianCalendar();
							calendar.setTime(field.value);
							return field.instance.getFormatter().format(calendar);
						}
						return field.value;
					}
					return fieldMeta && fieldMeta.initialValue;
				},
				getValueFromFields: function getValueFromFields(name, fields) {
					var fieldsMeta = this.fieldsMeta;

					var field = fields[name];
					var fieldMeta = fieldsMeta[name];
					if (field && 'value' in field) {
						return field.value;
					}
					return fieldMeta && fieldMeta.initialValue;
				},
				getRules: function getRules(fieldMeta, action) {
					var actionRules = fieldMeta.validate.filter(function (item) {
						return !action || item.trigger.indexOf(action) >= 0;
					}).map(function (item) {
						return item.rules;
					});
					return flattenArray(actionRules);
				},
				setFields: function setFields(fields) {
					var _this4 = this;

					var originalFields = this.fields;
					var nowFields = _extends({}, originalFields, fields);
					var fieldsMeta = this.fieldsMeta;
					var nowValues = {};
					Object.keys(fieldsMeta).forEach(function (f) {
						nowValues[f] = _this4.getValueFromFields(f, nowFields);
					});
					var changedFieldsName = Object.keys(fields);
					Object.keys(nowValues).forEach(function (f) {
						var value = nowValues[f];
						var fieldMeta = fieldsMeta[f];
						if (fieldMeta && fieldMeta.normalize) {
							var nowValue = fieldMeta.normalize(value, _this4.getValueFromFields(f, originalFields), nowValues);
							if (nowValue !== value) {
								nowFields[f] = _extends({}, nowFields[f], {
									value: nowValue
								});
								if (changedFieldsName.indexOf(f) === -1) {
									changedFieldsName.push(f);
								}
							}
						}
					});
					this.fields = nowFields;
					if (onFieldsChange) {
						(function () {
							var changedFields = {};
							changedFieldsName.forEach(function (f) {
								changedFields[f] = nowFields[f];
							});
							onFieldsChange(_this4.props, changedFields);
						})();
					}
					this.forceUpdate();
				},
				setFieldsValue: function setFieldsValue(fieldsValue) {
					var fields = {};
					for (var name in fieldsValue) {
						if (fieldsValue.hasOwnProperty(name)) {
							fields[name] = {
								name: name,
								value: fieldsValue[name]
							};
						}
					}
					this.setFields(fields);
				},
				setFieldsInitialValue: function setFieldsInitialValue(initialValues) {
					var fieldsMeta = this.fieldsMeta;
					for (var name in initialValues) {
						if (initialValues.hasOwnProperty(name)) {
							var fieldMeta = fieldsMeta[name];
							fieldsMeta[name] = _extends({}, fieldMeta, {
								initialValue: initialValues[name]
							});
						}
					}
				},
				saveRef: function saveRef(name, _, component) {
					if (!component) {
						// after destroy, delete data
						delete this.fieldsMeta[name];
						delete this.fields[name];
						return;
					}
					var fieldMeta = this.getFieldMeta(name);
					if (fieldMeta && fieldMeta.ref) {
						if (typeof fieldMeta.ref === 'string') {
							throw new Error('can not set ref string for ' + name);
						}
						fieldMeta.ref(component);
					}
					this.fields[name] = this.fields[name] || {};
					this.fields[name].instance = component;
				},
				validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
					var _this5 = this;

					var fieldNames = _ref.fieldNames;
					var action = _ref.action;
					var _ref$options = _ref.options;
					var options = _ref$options === undefined ? {} : _ref$options;

					var allRules = {};
					var allValues = {};
					var allFields = {};
					var alreadyErrors = {};
					fields.forEach(function (field) {
						var name = field.name;
						if (options.force !== true && field.dirty === false) {
							if (field.errors) {
								alreadyErrors[name] = {
									errors: field.errors,
									instance: field.instance
								};
							}
							return;
						}
						var fieldMeta = _this5.getFieldMeta(name);
						var newField = _extends({}, field);
						newField.errors = undefined;
						newField.validating = true;
						newField.dirty = true;
						allRules[name] = _this5.getRules(fieldMeta, action);
						allValues[name] = newField.value;
						allFields[name] = newField;
					});
					this.setFields(allFields);
					var nowFields = this.fields;
					// in case normalize
					Object.keys(allValues).forEach(function (f) {
						allValues[f] = nowFields[f].value;
					});
					if (callback && isEmptyObject(allFields)) {
						callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.getFieldsValue(fieldNames));
						return;
					}
					var validator = new AsyncValidator(allRules);
					if (validateMessages) {
						validator.messages(validateMessages);
					}
					validator.validate(allValues, options, function (errors) {
						var errorsGroup = _extends({}, alreadyErrors);
						if (errors && errors.length) {
							errors.forEach(function (e) {
								var fieldName = e.field;
								if (!errorsGroup[fieldName]) {
									errorsGroup[fieldName] = {
										errors: []
									};
								}
								var fieldErrors = errorsGroup[fieldName].errors;
								fieldErrors.push(e);
							});
						}
						var expired = [];
						var nowAllFields = {};
						Object.keys(allRules).forEach(function (name) {
							var fieldErrors = errorsGroup[name];
							var nowField = _this5.getField(name, true);
							// avoid concurrency problems
							if (nowField.value !== allValues[name]) {
								expired.push({
									name: name,
									instance: nowField.instance
								});
							} else {
								nowField.errors = fieldErrors && fieldErrors.errors;
								nowField.value = allValues[name];
								nowField.validating = false;
								nowField.dirty = false;
								nowAllFields[name] = nowField;
							}
							if (fieldErrors) {
								fieldErrors.instance = nowField.instance;
							}
						});
						_this5.setFields(nowAllFields);
						if (callback) {
							if (expired.length) {
								expired.forEach(function (_ref2) {
									var name = _ref2.name;
									var instance = _ref2.instance;

									var fieldErrors = [{
										message: name + ' need to revalidate',
										field: name
									}];
									errorsGroup[name] = {
										expired: true,
										instance: instance,
										errors: fieldErrors
									};
								});
							}
							callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this5.getFieldsValue(fieldNames));
						}
					});
				},
				validateFields: function validateFields(ns, opt, cb) {
					var _this6 = this;

					var _getParams = getParams(ns, opt, cb);

					var names = _getParams.names;
					var callback = _getParams.callback;
					var options = _getParams.options;

					var fieldNames = names || this.getValidFieldsName();
					var fields = fieldNames.map(function (name) {
						var fieldMeta = _this6.getFieldMeta(name);
						if (!hasRules(fieldMeta.validate)) {
							return null;
						}
						var field = _this6.getField(name, true);
						field.value = _this6.getFieldValue(name);
						return field;
					}).filter(function (f) {
						return !!f;
					});
					if (!fields.length) {
						if (callback) {
							callback(null, this.getFieldsValue(fieldNames));
						}
						return;
					}
					if (!('firstFields' in options)) {
						options.firstFields = fieldNames.filter(function (name) {
							var fieldMeta = _this6.getFieldMeta(name);
							return !!fieldMeta.validateFirst;
						});
					}
					this.validateFieldsInternal(fields, {
						fieldNames: fieldNames,
						options: options
					}, callback);
				},
				isFieldValidating: function isFieldValidating(name) {
					return this.getFieldMember(name, 'validating');
				},
				isFieldsValidating: function isFieldsValidating(ns) {
					var names = ns || this.getValidFieldsName();
					return names.some(this.isFieldValidating);
				},
				isSubmitting: function isSubmitting() {
					return this.state.submitting;
				},
				submit: function submit(callback) {
					var _this7 = this;

					var fn = function fn() {
						_this7.setState({
							submitting: false
						});
					};
					this.setState({
						submitting: true
					});
					callback(fn);
				},
				resetFields: function resetFields(ns) {
					var newFields = {};
					var fields = this.fields;

					var changed = false;
					var names = ns || Object.keys(fields);
					names.forEach(function (name) {
						var field = fields[name];
						if (field && 'value' in field) {
							changed = true;
							newFields[name] = {
								instance: field.instance
							};
						}
					});
					if (changed) {
						this.setFields(newFields);
					}
				},
				render: function render() {
					var formProps = _defineProperty({}, formPropName, this.getForm());
					if (withRef) {
						formProps.ref = 'wrappedComponent';
					}
					var props = mapProps.call(this, _extends({}, formProps, this.props));
					return React.createElement(WrappedComponent, props);
				}
			});

			return argumentContainer(Form, WrappedComponent);
		}

		return decorate;
	}

	///

	var formMixin = {
		getForm: function getForm() {
			return {
				getFieldsValue: this.getFieldsValue,
				getFieldValue: this.getFieldValue,
				getFieldInstance: this.getFieldInstance,
				setFieldsValue: this.setFieldsValue,
				setFields: this.setFields,
				setFieldsInitialValue: this.setFieldsInitialValue,
				getFieldProps: this.getFieldProps,
				getFieldError: this.getFieldError,
				isFieldValidating: this.isFieldValidating,
				isFieldsValidating: this.isFieldsValidating,
				isSubmitting: this.isSubmitting,
				submit: this.submit,
				validateFields: this.validateFields,
				resetFields: this.resetFields
			};
		}
	};

	function createForm(options) {
		return createBaseForm(options, [formMixin]);
	}

	////

	function computedStyle(el, prop) {
		var getComputedStyle = window.getComputedStyle;
		var style =
		// If we have getComputedStyle
		getComputedStyle ?
		// Query it
		// TODO: From CSS-Query notes, we might need (node, null) for FF
		getComputedStyle(el) :

		// Otherwise, we are in IE and use currentStyle
		el.currentStyle;
		if (style) {
			return style[
			// Switch to camelCase for CSSOM
			// DEV: Grabbed from jQuery
			// https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
			// https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
			prop.replace(/-(\w)/gi, function (word, letter) {
				return letter.toUpperCase();
			})];
		}
		return undefined;
	}

	function getScrollableContainer(n) {
		var node = n;
		var nodeName = undefined;
		/* eslint no-cond-assign:0 */
		while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
			var overflowY = computedStyle(node, 'overflowY');
			if (overflowY === 'auto' || overflowY === 'scroll') {
				return node;
			}
			node = node.parentNode;
		}
		return nodeName === 'body' ? node.ownerDocument : node;
	}

	var mixin = {
		getForm: function getForm() {
			return _extends({}, formMixin.getForm.call(this), {
				validateFieldsAndScroll: this.validateFieldsAndScroll
			});
		},
		validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
			var _getParams2 = getParams(ns, opt, cb);

			var names = _getParams2.names;
			var callback = _getParams2.callback;
			var options = _getParams2.options;

			function newCb(error, values) {
				if (error) {
					var firstNode = undefined;
					var firstTop = undefined;
					for (var name in error) {
						if (error.hasOwnProperty(name) && error[name].instance) {
							var node = ReactDOM.findDOMNode(error[name].instance);
							var top = node.getBoundingClientRect().top;
							if (firstTop === undefined || firstTop > top) {
								firstTop = top;
								firstNode = node;
							}
						}
					}
					if (firstNode) {
						var c = options.container || getScrollableContainer(firstNode);
						scrollIntoView(firstNode, c, {
							onlyScrollIfNeeded: true
						});
					}
				}

				if (typeof callback === 'function') {
					callback(error, values);
				}
			}

			return this.validateFields(names, options, newCb);
		}
	};

	function createDOMForm(option) {
		return createBaseForm(_extends({}, option), [mixin]);
	}

	RC.createForm = createForm;
	RC.createDOMForm = createDOMForm;
})(Smart.RC);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var KEYCODE = RC.KeyCode;
	var LOCALE = RC.Locale.Pagination;
	var _ref = _;
	var noop = _ref.noop;

	var Pager = (function (_React$Component) {
		_inherits(Pager, _React$Component);

		function Pager() {
			_classCallCheck(this, Pager);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Pager).apply(this, arguments));
		}

		_createClass(Pager, [{
			key: 'render',
			value: function render() {
				var props = this.props;
				var locale = props.locale;
				var prefixCls = props.rootPrefixCls + '-item';
				var cls = prefixCls + ' ' + prefixCls + '-' + props.page;

				if (props.active) {
					cls = cls + ' ' + prefixCls + '-active';
				}

				var title = undefined;
				if (props.page === 1) {
					title = locale.first_page;
				} else if (props.last) {
					title = locale.last_page + ': ' + props.page;
				} else {
					title = props.page;
				}
				return React.createElement(
					'li',
					{ title: title, className: cls, onClick: props.onClick },
					React.createElement(
						'a',
						null,
						props.page
					)
				);
			}
		}]);

		return Pager;
	})(React.Component);

	Pager.propTypes = {
		page: React.PropTypes.number,
		active: React.PropTypes.bool,
		last: React.PropTypes.bool,
		locale: React.PropTypes.object
	};

	var Options = (function (_React$Component2) {
		_inherits(Options, _React$Component2);

		function Options(props) {
			_classCallCheck(this, Options);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Options).call(this, props));

			_this2.state = {
				current: props.current,
				_current: props.current
			};

			['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach(function (method) {
				return _this2[method] = _this2[method].bind(_this2);
			});
			return _this2;
		}

		_createClass(Options, [{
			key: '_buildOptionText',
			value: function _buildOptionText(value) {
				return value + ' ' + this.props.locale.items_per_page;
			}
		}, {
			key: '_changeSize',
			value: function _changeSize(value) {
				this.props.changeSize(Number(value));
			}
		}, {
			key: '_handleChange',
			value: function _handleChange(evt) {
				var _val = evt.target.value;

				this.setState({
					_current: _val
				});
			}
		}, {
			key: '_go',
			value: function _go(e) {
				var _val = e.target.value;
				if (_val === '') {
					return;
				}
				var val = Number(this.state._current);
				if (isNaN(val)) {
					val = this.state.current;
				}
				if (e.keyCode === KEYCODE.ENTER) {
					var c = this.props.quickGo(val);
					this.setState({
						_current: c,
						current: c
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var props = this.props;
				var state = this.state;
				var locale = props.locale;
				var prefixCls = props.rootPrefixCls + '-options';
				var changeSize = props.changeSize;
				var quickGo = props.quickGo;
				var buildOptionText = props.buildOptionText || this._buildOptionText;
				var Select = props.selectComponentClass;
				var changeSelect = null;
				var goInput = null;

				if (!(changeSize || quickGo)) {
					return null;
				}

				if (changeSize && Select) {
					(function () {
						var Option = Select.Option;
						var defaultOption = props.pageSize || props.pageSizeOptions[0];
						var options = props.pageSizeOptions.map(function (opt, i) {
							return React.createElement(
								Option,
								{ key: i, value: opt },
								buildOptionText(opt)
							);
						});

						changeSelect = React.createElement(
							Select,
							{
								prefixCls: props.selectPrefixCls, showSearch: false,
								className: prefixCls + '-size-changer',
								optionLabelProp: 'children',
								defaultValue: '' + defaultOption, onChange: _this3._changeSize },
							options
						);
					})();
				}

				if (quickGo) {
					goInput = React.createElement(
						'div',
						{ title: 'Quick jump to page', className: prefixCls + '-quick-jumper' },
						locale.jump_to,
						React.createElement('input', { type: 'text', value: state._current, onChange: this._handleChange.bind(this), onKeyUp: this._go.bind(this) }),
						locale.page
					);
				}

				return React.createElement(
					'div',
					{ className: '' + prefixCls },
					changeSelect,
					goInput
				);
			}
		}]);

		return Options;
	})(React.Component);

	Options.propTypes = {
		changeSize: React.PropTypes.func,
		quickGo: React.PropTypes.func,
		selectComponentClass: React.PropTypes.func,
		current: React.PropTypes.number,
		pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
		pageSize: React.PropTypes.number,
		buildOptionText: React.PropTypes.func,
		locale: React.PropTypes.object
	};

	Options.defaultProps = {
		pageSizeOptions: ['10', '20', '30', '40']
	};

	var Pagination = (function (_React$Component3) {
		_inherits(Pagination, _React$Component3);

		function Pagination(props) {
			_classCallCheck(this, Pagination);

			var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

			var hasOnChange = props.onChange !== noop;
			var hasCurrent = 'current' in props;
			if (hasCurrent && !hasOnChange) {
				console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
			}

			var current = props.defaultCurrent;
			if ('current' in props) {
				current = props.current;
			}

			_this4.state = {
				current: current,
				_current: current,
				pageSize: props.pageSize
			};

			['render', '_handleChange', '_handleKeyUp', '_handleKeyDown', '_changePageSize', '_isValid', '_prev', '_next', '_hasPrev', '_hasNext', '_jumpPrev', '_jumpNext'].forEach(function (method) {
				return _this4[method] = _this4[method].bind(_this4);
			});
			return _this4;
		}

		_createClass(Pagination, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('current' in nextProps) {
					this.setState({
						current: nextProps.current
					});
				}

				if ('pageSize' in nextProps) {
					this.setState({
						pageSize: nextProps.pageSize
					});
				}
			}

			// private methods

		}, {
			key: '_calcPage',
			value: function _calcPage(p) {
				var pageSize = p;
				if (typeof pageSize === 'undefined') {
					pageSize = this.state.pageSize;
				}
				return Math.floor((this.props.total - 1) / pageSize) + 1;
			}
		}, {
			key: '_isValid',
			value: function _isValid(page) {
				return typeof page === 'number' && page >= 1 && page !== this.state.current;
			}
		}, {
			key: '_handleKeyDown',
			value: function _handleKeyDown(evt) {
				if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
					evt.preventDefault();
				}
			}
		}, {
			key: '_handleKeyUp',
			value: function _handleKeyUp(evt) {
				var _val = evt.target.value;
				var val = undefined;

				if (_val === '') {
					val = _val;
				} else if (isNaN(Number(_val))) {
					val = this.state._current;
				} else {
					val = Number(_val);
				}

				this.setState({
					_current: val
				});

				if (evt.keyCode === KEYCODE.ENTER) {
					this._handleChange(val);
				} else if (evt.keyCode === KEYCODE.ARROW_UP) {
					this._handleChange(val - 1);
				} else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
					this._handleChange(val + 1);
				}
			}
		}, {
			key: '_changePageSize',
			value: function _changePageSize(size) {
				if (typeof size === 'number') {
					var current = this.state.current;

					this.setState({
						pageSize: size
					});

					if (this.state.current > this._calcPage(size)) {
						current = this._calcPage(size);
						this.setState({
							current: current,
							_current: current
						});
					}

					this.props.onShowSizeChange(current, size);
				}
			}
		}, {
			key: '_handleChange',
			value: function _handleChange(p) {
				var page = p;
				if (this._isValid(page)) {
					if (page > this._calcPage()) {
						page = this._calcPage();
					}

					if (!('current' in this.props)) {
						this.setState({
							current: page,
							_current: page
						});
					}

					this.props.onChange(page);

					return page;
				}

				return this.state.current;
			}
		}, {
			key: '_prev',
			value: function _prev() {
				if (this._hasPrev()) {
					this._handleChange(this.state.current - 1);
				}
			}
		}, {
			key: '_next',
			value: function _next() {
				if (this._hasNext()) {
					this._handleChange(this.state.current + 1);
				}
			}
		}, {
			key: '_jumpPrev',
			value: function _jumpPrev() {
				this._handleChange(Math.max(1, this.state.current - 5));
			}
		}, {
			key: '_jumpNext',
			value: function _jumpNext() {
				this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
			}
		}, {
			key: '_hasPrev',
			value: function _hasPrev() {
				return this.state.current > 1;
			}
		}, {
			key: '_hasNext',
			value: function _hasNext() {
				return this.state.current < this._calcPage();
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var locale = props.locale;

				var prefixCls = props.prefixCls;
				var allPages = this._calcPage();
				var pagerList = [];
				var jumpPrev = null;
				var jumpNext = null;
				var firstPager = null;
				var lastPager = null;

				if (props.simple) {
					return React.createElement(
						'ul',
						{ className: prefixCls + ' ' + prefixCls + '-simple ' + props.className },
						React.createElement(
							'li',
							{ title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
							React.createElement('a', null)
						),
						React.createElement(
							'div',
							{ title: this.state.current + '/' + allPages, className: prefixCls + '-simple-pager' },
							React.createElement('input', { type: 'text', value: this.state._current, onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp, onChange: this._handleKeyUp }),
							React.createElement(
								'span',
								{ className: prefixCls + '-slash' },
								'／'
							),
							allPages
						),
						React.createElement(
							'li',
							{ title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
							React.createElement('a', null)
						)
					);
				}

				if (allPages <= 9) {
					for (var i = 1; i <= allPages; i++) {
						var active = this.state.current === i;
						pagerList.push(React.createElement(Pager, { locale: locale, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
					}
				} else {
					jumpPrev = React.createElement(
						'li',
						{ title: locale.prev_5, key: 'prev', onClick: this._jumpPrev, className: prefixCls + '-jump-prev' },
						React.createElement('a', null)
					);
					jumpNext = React.createElement(
						'li',
						{ title: locale.next_5, key: 'next', onClick: this._jumpNext, className: prefixCls + '-jump-next' },
						React.createElement('a', null)
					);
					lastPager = React.createElement(Pager, {
						locale: props.locale,
						last: true, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, allPages), key: allPages, page: allPages, active: false });
					firstPager = React.createElement(Pager, {
						locale: props.locale,
						rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, 1), key: 1, page: 1, active: false });

					var current = this.state.current;

					var left = Math.max(1, current - 2);
					var right = Math.min(current + 2, allPages);

					if (current - 1 <= 2) {
						right = 1 + 4;
					}

					if (allPages - current <= 2) {
						left = allPages - 4;
					}

					for (var i = left; i <= right; i++) {
						var active = current === i;
						pagerList.push(React.createElement(Pager, {
							locale: props.locale,
							rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
					}

					if (current - 1 >= 4) {
						pagerList.unshift(jumpPrev);
					}
					if (allPages - current >= 4) {
						pagerList.push(jumpNext);
					}

					if (left !== 1) {
						pagerList.unshift(firstPager);
					}
					if (right !== allPages) {
						pagerList.push(lastPager);
					}
				}

				var totalText = null;

				if (props.showTotal) {
					totalText = React.createElement(
						'span',
						{ className: prefixCls + '-total-text' },
						props.showTotal(props.total)
					);
				}

				return React.createElement(
					'ul',
					{ className: prefixCls + ' ' + props.className,
						unselectable: 'unselectable' },
					totalText,
					React.createElement(
						'li',
						{ title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
						React.createElement('a', null)
					),
					pagerList,
					React.createElement(
						'li',
						{ title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
						React.createElement('a', null)
					),
					React.createElement(Options, {
						locale: props.locale,
						rootPrefixCls: prefixCls,
						selectComponentClass: props.selectComponentClass,
						selectPrefixCls: props.selectPrefixCls,
						changeSize: this.props.showSizeChanger ? this._changePageSize.bind(this) : null,
						current: this.state.current,
						pageSize: this.props.pageSize,
						pageSizeOptions: this.props.pageSizeOptions,
						quickGo: this.props.showQuickJumper ? this._handleChange.bind(this) : null })
				);
			}
		}]);

		return Pagination;
	})(React.Component);

	Pagination.propTypes = {
		current: React.PropTypes.number,
		defaultCurrent: React.PropTypes.number,
		total: React.PropTypes.number,
		pageSize: React.PropTypes.number,
		onChange: React.PropTypes.func,
		showSizeChanger: React.PropTypes.bool,
		onShowSizeChange: React.PropTypes.func,
		selectComponentClass: React.PropTypes.func,
		showQuickJumper: React.PropTypes.bool,
		pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
		showTotal: React.PropTypes.func,
		locale: React.PropTypes.object
	};

	Pagination.defaultProps = {
		defaultCurrent: 1,
		total: 0,
		pageSize: 10,
		onChange: noop,
		className: '',
		selectPrefixCls: 'rc-select',
		prefixCls: 'rc-pagination',
		selectComponentClass: null,
		showQuickJumper: false,
		showSizeChanger: false,
		onShowSizeChange: noop,
		locale: LOCALE
	};

	RC.Pagination = Pagination;
})(Smart.RC);
'use strict';

+(function (RC) {
	var objectAssign = _.assign;

	var TableRow = React.createClass({
		displayName: 'TableRow',

		propTypes: {
			onDestroy: React.PropTypes.func,
			record: React.PropTypes.object,
			prefixCls: React.PropTypes.string
		},

		componentWillUnmount: function componentWillUnmount() {
			this.props.onDestroy(this.props.record);
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.prefixCls;
			var columns = props.columns;
			var record = props.record;
			var index = props.index;
			var cells = [];
			var expanded = props.expanded;
			var expandable = props.expandable;
			var expandIconAsCell = props.expandIconAsCell;
			var indent = props.indent;
			var indentSize = props.indentSize;
			var needIndentSpaced = props.needIndentSpaced;
			var onRowClick = props.onRowClick;

			for (var i = 0; i < columns.length; i++) {
				var col = columns[i];
				var colClassName = col.className || '';
				var render = col.render;
				var text = record[col.dataIndex];

				var expandIcon = null;
				var tdProps = undefined;
				var colSpan = undefined;
				var rowSpan = undefined;
				var notRender = false;
				var indentText = undefined;

				if (i === 0 && expandable) {
					expandIcon = React.createElement('span', {
						className: prefixCls + '-expand-icon ' + prefixCls + '-' + (expanded ? 'expanded' : 'collapsed'),
						onClick: props.onExpand.bind(null, !expanded, record) });
				} else if (i === 0 && needIndentSpaced) {
					expandIcon = React.createElement('span', {
						className: prefixCls + '-expand-icon ' + prefixCls + '-spaced' });
				}

				if (expandIconAsCell && i === 0) {
					cells.push(React.createElement(
						'td',
						{ className: prefixCls + '-expand-icon-cell',
							key: 'rc-table-expand-icon-cell' },
						expandIcon
					));
					expandIcon = null;
				}

				if (render) {
					text = render(text, record, index) || {};
					tdProps = text.props || {};

					if (typeof text !== 'string' && !React.isValidElement(text) && 'children' in text) {
						text = text.children;
					}
					rowSpan = tdProps.rowSpan;
					colSpan = tdProps.colSpan;
				}

				if (rowSpan === 0 || colSpan === 0) {
					notRender = true;
				}

				indentText = i === 0 ? React.createElement('span', { style: { paddingLeft: indentSize * indent + 'px' }, className: prefixCls + '-indent indent-level-' + indent }) : null;

				if (!notRender) {
					cells.push(React.createElement(
						'td',
						{ key: col.key, colSpan: colSpan, rowSpan: rowSpan, className: '' + colClassName },
						indentText,
						expandIcon,
						text
					));
				}
			}
			return React.createElement(
				'tr',
				{ onClick: onRowClick ? onRowClick.bind(null, record, index) : null, className: prefixCls + ' ' + props.className, style: { display: props.visible ? '' : 'none' } },
				cells
			);
		}
	});

	var Table = React.createClass({
		displayName: 'Table',

		propTypes: {
			data: React.PropTypes.array,
			expandIconAsCell: React.PropTypes.bool,
			expandedRowKeys: React.PropTypes.array,
			defaultExpandedRowKeys: React.PropTypes.array,
			useFixedHeader: React.PropTypes.bool,
			columns: React.PropTypes.array,
			prefixCls: React.PropTypes.string,
			bodyStyle: React.PropTypes.object,
			style: React.PropTypes.object,
			rowKey: React.PropTypes.func,
			rowClassName: React.PropTypes.func,
			expandedRowClassName: React.PropTypes.func,
			childrenColumnName: React.PropTypes.string,
			onExpandedRowsChange: React.PropTypes.func,
			indentSize: React.PropTypes.number,
			onRowClick: React.PropTypes.func,
			columnsPageRange: React.PropTypes.array,
			columnsPageSize: React.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: [],
				useFixedHeader: false,
				expandIconAsCell: false,
				columns: [],
				defaultExpandedRowKeys: [],
				rowKey: function rowKey(o) {
					return o.key;
				},
				rowClassName: function rowClassName() {
					return '';
				},
				expandedRowClassName: function expandedRowClassName() {
					return '';
				},
				onExpandedRowsChange: function onExpandedRowsChange() {},

				prefixCls: 'rc-table',
				bodyStyle: {},
				style: {},
				childrenColumnName: 'children',
				indentSize: 15,
				columnsPageSize: 5
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			return {
				expandedRowKeys: props.expandedRowKeys || props.defaultExpandedRowKeys,
				data: this.props.data,
				currentColumnsPage: 0
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('data' in nextProps) {
				this.setState({
					data: nextProps.data
				});
			}
			if ('expandedRowKeys' in nextProps) {
				this.setState({
					expandedRowKeys: nextProps.expandedRowKeys
				});
			}
		},
		onExpandedRowsChange: function onExpandedRowsChange(expandedRowKeys) {
			if (!this.props.expandedRowKeys) {
				this.setState({
					expandedRowKeys: expandedRowKeys
				});
			}
			this.props.onExpandedRowsChange(expandedRowKeys);
		},
		onExpanded: function onExpanded(expanded, record) {
			var info = this.findExpandedRow(record);
			if (info && !expanded) {
				this.onRowDestroy(record);
			} else if (!info && expanded) {
				var expandedRows = this.getExpandedRows().concat();
				expandedRows.push(this.props.rowKey(record));
				this.onExpandedRowsChange(expandedRows);
			}
		},
		onRowDestroy: function onRowDestroy(record) {
			var expandedRows = this.getExpandedRows().concat();
			var rowKey = this.props.rowKey(record);
			var index = -1;
			expandedRows.forEach(function (r, i) {
				if (r === rowKey) {
					index = i;
				}
			});
			if (index !== -1) {
				expandedRows.splice(index, 1);
			}
			this.onExpandedRowsChange(expandedRows);
		},
		getExpandedRows: function getExpandedRows() {
			return this.props.expandedRowKeys || this.state.expandedRowKeys;
		},
		getThs: function getThs() {
			var ths = [];
			if (this.props.expandIconAsCell) {
				ths.push({
					key: 'rc-table-expandIconAsCell',
					className: this.props.prefixCls + '-expand-icon-th',
					title: ''
				});
			}
			ths = ths.concat(this.getCurrentColumns());
			return ths.map(function (c) {
				if (c.colSpan !== 0) {
					return React.createElement(
						'th',
						{ key: c.key, colSpan: c.colSpan, className: c.className || '' },
						c.title
					);
				}
			});
		},
		getExpandedRow: function getExpandedRow(key, content, visible, className) {
			var prefixCls = this.props.prefixCls;
			return React.createElement(
				'tr',
				{ key: key + '-extra-row', style: { display: visible ? '' : 'none' }, className: prefixCls + '-expanded-row ' + className },
				this.props.expandIconAsCell ? React.createElement('td', { key: 'rc-table-expand-icon-placeholder' }) : '',
				React.createElement(
					'td',
					{ colSpan: this.props.columns.length },
					content
				)
			);
		},
		getRowsByData: function getRowsByData(data, visible, indent) {
			var props = this.props;
			var columns = this.getCurrentColumns();
			var childrenColumnName = props.childrenColumnName;
			var expandedRowRender = props.expandedRowRender;
			var expandIconAsCell = props.expandIconAsCell;
			var rst = [];
			var keyFn = props.rowKey;
			var rowClassName = props.rowClassName;
			var expandedRowClassName = props.expandedRowClassName;
			var needIndentSpaced = props.data.some(function (record) {
				return record[childrenColumnName] && record[childrenColumnName].length > 0;
			});
			var onRowClick = props.onRowClick;
			for (var i = 0; i < data.length; i++) {
				var record = data[i];
				var key = keyFn ? keyFn(record, i) : undefined;
				var childrenColumn = record[childrenColumnName];
				var isRowExpanded = this.isRowExpanded(record);
				var expandedRowContent = undefined;
				if (expandedRowRender && isRowExpanded) {
					expandedRowContent = expandedRowRender(record, i);
				}
				var className = rowClassName(record, i);
				rst.push(React.createElement(TableRow, {
					indent: indent,
					indentSize: props.indentSize,
					needIndentSpaced: needIndentSpaced,
					className: className,
					record: record,
					expandIconAsCell: expandIconAsCell,
					onDestroy: this.onRowDestroy,
					index: i,
					visible: visible,
					onExpand: this.onExpanded,
					expandable: childrenColumn || expandedRowRender,
					expanded: isRowExpanded,
					prefixCls: props.prefixCls + '-row',
					childrenColumnName: childrenColumnName,
					columns: columns,
					onRowClick: onRowClick,
					key: key }));

				var subVisible = visible && isRowExpanded;

				if (expandedRowContent && isRowExpanded) {
					rst.push(this.getExpandedRow(key, expandedRowContent, subVisible, expandedRowClassName(record, i)));
				}
				if (childrenColumn) {
					rst = rst.concat(this.getRowsByData(childrenColumn, subVisible, indent + 1));
				}
			}
			return rst;
		},
		getRows: function getRows() {
			return this.getRowsByData(this.state.data, true, 0);
		},
		getColGroup: function getColGroup() {
			var cols = [];
			if (this.props.expandIconAsCell) {
				cols.push(React.createElement('col', { className: this.props.prefixCls + '-expand-icon-col', key: 'rc-table-expand-icon-col' }));
			}
			cols = cols.concat(this.props.columns.map(function (c) {
				return React.createElement('col', { key: c.key, style: { width: c.width } });
			}));
			return React.createElement(
				'colgroup',
				null,
				cols
			);
		},
		getCurrentColumns: function getCurrentColumns() {
			var _this = this;

			var _props = this.props;
			var columns = _props.columns;
			var columnsPageRange = _props.columnsPageRange;
			var columnsPageSize = _props.columnsPageSize;
			var prefixCls = _props.prefixCls;
			var currentColumnsPage = this.state.currentColumnsPage;

			if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
				return columns;
			}
			return columns.map(function (column, i) {
				var newColumn = objectAssign({}, column);
				if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
					var pageIndexStart = columnsPageRange[0] + currentColumnsPage * columnsPageSize;
					var pageIndexEnd = columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
					if (pageIndexEnd > columnsPageRange[1]) {
						pageIndexEnd = columnsPageRange[1];
					}
					if (i < pageIndexStart || i > pageIndexEnd) {
						newColumn.className = newColumn.className || '';
						newColumn.className += ' ' + prefixCls + '-column-hidden';
					}
					newColumn = _this.wrapPageColumn(newColumn, i === pageIndexStart, i === pageIndexEnd);
				}
				return newColumn;
			});
		},
		getMaxColumnsPage: function getMaxColumnsPage() {
			var _props2 = this.props;
			var columnsPageRange = _props2.columnsPageRange;
			var columnsPageSize = _props2.columnsPageSize;

			return Math.floor((columnsPageRange[1] - columnsPageRange[0] - 1) / columnsPageSize);
		},
		goToColumnsPage: function goToColumnsPage(currentColumnsPage) {
			var maxColumnsPage = this.getMaxColumnsPage();
			var page = currentColumnsPage;
			if (page < 0) {
				page = 0;
			}
			if (page > maxColumnsPage) {
				page = maxColumnsPage;
			}
			this.setState({
				currentColumnsPage: page
			});
		},
		prevColumnsPage: function prevColumnsPage() {
			this.goToColumnsPage(this.state.currentColumnsPage - 1);
		},
		nextColumnsPage: function nextColumnsPage() {
			this.goToColumnsPage(this.state.currentColumnsPage + 1);
		},
		wrapPageColumn: function wrapPageColumn(column, hasPrev, hasNext) {
			var prefixCls = this.props.prefixCls;
			var currentColumnsPage = this.state.currentColumnsPage;

			var maxColumnsPage = this.getMaxColumnsPage();
			var prevHandlerCls = prefixCls + '-prev-columns-page';
			if (currentColumnsPage === 0) {
				prevHandlerCls += ' ' + prefixCls + '-prev-columns-page-disabled';
			}
			var prevHandler = React.createElement('span', { className: prevHandlerCls, onClick: this.prevColumnsPage });
			var nextHandlerCls = prefixCls + '-next-columns-page';
			if (currentColumnsPage === maxColumnsPage) {
				nextHandlerCls += ' ' + prefixCls + '-next-columns-page-disabled';
			}
			var nextHandler = React.createElement('span', { className: nextHandlerCls, onClick: this.nextColumnsPage });
			if (hasPrev) {
				column.title = React.createElement(
					'span',
					null,
					prevHandler,
					column.title
				);
				column.className = (column.className || '') + (' ' + prefixCls + '-column-has-prev');
			}
			if (hasNext) {
				column.title = React.createElement(
					'span',
					null,
					column.title,
					nextHandler
				);
				column.className = (column.className || '') + (' ' + prefixCls + '-column-has-next');
			}
			return column;
		},
		findExpandedRow: function findExpandedRow(record) {
			var keyFn = this.props.rowKey;
			var currentRowKey = keyFn(record);
			var rows = this.getExpandedRows().filter(function (i) {
				return i === currentRowKey;
			});
			return rows[0] || null;
		},
		isRowExpanded: function isRowExpanded(record) {
			return !!this.findExpandedRow(record);
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.prefixCls;
			var columns = this.getThs();
			var rows = this.getRows();
			var className = props.prefixCls;
			if (props.className) {
				className += ' ' + props.className;
			}
			if (props.columnsPageRange) {
				className += ' ' + prefixCls + '-columns-paging';
			}
			var headerTable = undefined;
			var thead = React.createElement(
				'thead',
				{ className: prefixCls + '-thead' },
				React.createElement(
					'tr',
					null,
					columns
				)
			);
			if (props.useFixedHeader) {
				headerTable = React.createElement(
					'div',
					{ className: prefixCls + '-header' },
					React.createElement(
						'table',
						null,
						this.getColGroup(),
						thead
					)
				);
				thead = null;
			}
			return React.createElement(
				'div',
				{ className: className, style: props.style },
				headerTable,
				React.createElement(
					'div',
					{ className: prefixCls + '-body', style: props.bodyStyle },
					React.createElement(
						'table',
						null,
						this.getColGroup(),
						thead,
						React.createElement(
							'tbody',
							{ className: prefixCls + '-tbody' },
							rows
						)
					)
				)
			);
		}
	});

	RC.Table = Table;
})(Smart.RC);