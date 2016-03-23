'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (RC) {
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

			var i = void 0;
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
}(Smart.RC);