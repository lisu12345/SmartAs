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