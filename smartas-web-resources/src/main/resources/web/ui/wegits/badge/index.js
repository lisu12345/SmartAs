'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
	var Animate = RC.Animate;
	var assign = _.assign;
	var isCssAnimationSupported = Animate.isCssAnimationSupported;

	function getNumberArray(num) {
		return num ? num.toString().split('').reverse().map(function (i) {
			return Number(i);
		}) : [];
	}

	var ScrollNumber = (function (_React$Component) {
		_inherits(ScrollNumber, _React$Component);

		function ScrollNumber(props) {
			_classCallCheck(this, ScrollNumber);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollNumber).call(this, props));

			_this.state = {
				animateStarted: true,
				count: props.count
			};
			return _this;
		}

		_createClass(ScrollNumber, [{
			key: 'getPositionByNum',
			value: function getPositionByNum(num, i) {
				if (this.state.animateStarted) {
					return 10 + num;
				}
				var currentDigit = getNumberArray(this.state.count)[i];
				var lastDigit = getNumberArray(this.lastCount)[i];
				// 同方向则在同一侧切换数字
				if (this.state.count > this.lastCount) {
					if (currentDigit >= lastDigit) {
						return 10 + num;
					} else {
						return 20 + num;
					}
				} else {
					if (currentDigit <= lastDigit) {
						return 10 + num;
					} else {
						return num;
					}
				}
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this2 = this;

				if ('count' in nextProps && nextProps.count) {
					if (this.lastCount === this.state.count) {
						return;
					}
					this.lastCount = this.state.count;
					// 复原数字初始位置
					this.setState({
						animateStarted: true
					}, function () {
						// 等待数字位置复原完毕
						// 开始设置完整的数字
						setTimeout(function () {
							_this2.setState({
								animateStarted: false,
								count: nextProps.count
							}, function () {
								_this2.props.onAnimated();
							});
						}, 5);
					});
				}
			}
		}, {
			key: 'renderNumberList',
			value: function renderNumberList() {
				var childrenToReturn = [];
				for (var i = 0; i < 30; i++) {
					childrenToReturn.push(React.createElement(
						'p',
						{ key: i },
						i % 10
					));
				}
				return childrenToReturn;
			}
		}, {
			key: 'renderCurrentNumber',
			value: function renderCurrentNumber(num, i) {
				var position = this.getPositionByNum(num, i);
				var height = this.props.height;
				var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
				return React.createElement('span', {
					className: this.props.prefixCls + '-only',
					style: {
						transition: removeTransition && 'none',
						transform: 'translate3d(0, ' + -position * height + 'px, 0)',
						height: height
					},
					key: i
				}, this.renderNumberList());
			}
		}, {
			key: 'renderNumberElement',
			value: function renderNumberElement() {
				var _this3 = this;

				var state = this.state;
				if (!state.count || isNaN(state.count)) {
					return state.count;
				}
				return getNumberArray(state.count).map(function (num, i) {
					return _this3.renderCurrentNumber(num, i);
				}).reverse();
			}
		}, {
			key: 'render',
			value: function render() {
				var props = assign({}, this.props, {
					className: this.props.prefixCls + ' ' + this.props.className
				});
				var isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';
				if (isBrowser && isCssAnimationSupported) {
					return React.createElement(this.props.component, props, this.renderNumberElement());
				} else {
					return React.createElement(this.props.component, props, props.count);
				}
			}
		}]);

		return ScrollNumber;
	})(React.Component);

	ScrollNumber.defaultProps = {
		prefixCls: 'ant-scroll-number',
		count: null,
		component: 'sup',
		onAnimated: function onAnimated() {},
		height: 18
	};

	ScrollNumber.propTypes = {
		count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		component: React.PropTypes.string,
		onAnimated: React.PropTypes.func,
		height: React.PropTypes.number
	};

	var AntBadge = (function (_React$Component2) {
		_inherits(AntBadge, _React$Component2);

		function AntBadge(props) {
			_classCallCheck(this, AntBadge);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(AntBadge).call(this, props));
		}

		_createClass(AntBadge, [{
			key: 'render',
			value: function render() {
				var _classNames;

				var _props = this.props;
				var count = _props.count;
				var prefixCls = _props.prefixCls;
				var overflowCount = _props.overflowCount;
				var className = _props.className;
				var style = _props.style;
				var children = _props.children;

				var dot = this.props.dot;

				count = count > overflowCount ? overflowCount + '+' : count;

				// dot mode don't need count
				if (dot) {
					count = '';
				}

				// null undefined "" "0" 0
				var hidden = (!count || count === '0') && !dot;
				var scrollNumberCls = prefixCls + (dot ? '-dot' : '-count');
				var badgeCls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-not-a-wrapper', !children), _classNames));

				return React.createElement(
					'span',
					_extends({ className: badgeCls, title: count }, this.props, { style: null }),
					children,
					React.createElement(
						Animate,
						{ component: '',
							showProp: 'data-show',
							transitionName: prefixCls + '-zoom',
							transitionAppear: true },
						hidden ? null : React.createElement(ScrollNumber, { 'data-show': !hidden, className: scrollNumberCls,
							count: count, style: style })
					)
				);
			}
		}]);

		return AntBadge;
	})(React.Component);

	AntBadge.defaultProps = {
		prefixCls: 'ant-badge',
		count: null,
		dot: false,
		overflowCount: 99
	};

	AntBadge.propTypes = {
		count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		dot: React.PropTypes.bool,
		overflowCount: React.PropTypes.number
	};
	UI.Badge = AntBadge;
})(Smart.UI, Smart.RC);