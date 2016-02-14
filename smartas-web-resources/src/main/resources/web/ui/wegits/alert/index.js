'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var Animate = RC.Animate;
	var Icon = UI.Icon;
	UI.Alert = React.createClass({
		displayName: 'Alert',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-alert',
				showIcon: false,
				onClose: function onClose() {}
			};
		},
		getInitialState: function getInitialState() {
			return {
				closing: true,
				closed: false
			};
		},
		handleClose: function handleClose(e) {
			e.preventDefault();
			var dom = ReactDOM.findDOMNode(this);
			dom.style.height = dom.offsetHeight + 'px';
			// Magic code
			// 重复一次后才能正确设置 height
			dom.style.height = dom.offsetHeight + 'px';

			this.setState({
				closing: false
			});
			this.props.onClose.call(this, e);
		},
		animationEnd: function animationEnd() {
			this.setState({
				closed: true,
				closing: true
			});
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var closable = _props.closable;
			var description = _props.description;
			var type = _props.type;
			var prefixCls = _props.prefixCls;
			var message = _props.message;
			var closeText = _props.closeText;
			var showIcon = _props.showIcon;

			var iconType = '';
			switch (type) {
				case 'success':
					iconType = 'check-circle';
					break;
				case 'info':
					iconType = 'info-circle';
					break;
				case 'error':
					iconType = 'exclamation-circle';
					break;
				case 'warn':
					iconType = 'exclamation-circle';
					break;
				default:
					iconType = 'default';
			}

			// use outline icon in alert with description
			if (!!description) {
				iconType += '-o';
			}

			var alertCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-close', !this.state.closing), _defineProperty(_classNames, prefixCls + '-with-description', !!description), _defineProperty(_classNames, prefixCls + '-no-icon', !showIcon), _classNames));

			// closeable when closeText is assigned
			if (closeText) {
				closable = true;
			}

			return this.state.closed ? null : React.createElement(
				Animate,
				{ component: '',
					showProp: 'data-show',
					transitionName: 'slide-up',
					onEnd: this.animationEnd },
				React.createElement(
					'div',
					{ 'data-show': this.state.closing, className: alertCls },
					showIcon ? React.createElement(Icon, { className: 'ant-alert-icon', type: iconType }) : null,
					React.createElement(
						'span',
						{ className: prefixCls + '-message' },
						message
					),
					React.createElement(
						'span',
						{ className: prefixCls + '-description' },
						description
					),
					closable ? React.createElement(
						'a',
						{ onClick: this.handleClose, className: prefixCls + '-close-icon' },
						closeText || React.createElement(Icon, { type: 'cross' })
					) : null
				)
			);
		}
	});
})(Smart.UI, Smart.RC);