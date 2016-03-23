'use strict';

+function (UI, RC) {
		var _ref = _;
		var assign = _ref.assign;
		var Icon = UI.Icon;
		var Progress = RC.Progress;
		var Progresscircle = Progress.Circle;

		var prefixCls = 'ant-progress';

		var statusColorMap = {
				normal: '#2db7f5',
				exception: '#ff5500',
				success: '#87d068'
		};

		var Line = React.createClass({
				displayName: 'Line',

				propTypes: {
						status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
						showInfo: React.PropTypes.bool,
						percent: React.PropTypes.number,
						strokeWidth: React.PropTypes.number,
						trailColor: React.PropTypes.string,
						format: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string, React.PropTypes.func])
				},
				getDefaultProps: function getDefaultProps() {
						return {
								percent: 0,
								strokeWidth: 10,
								status: 'normal', // exception active
								showInfo: true,
								trailColor: '#f3f3f3'
						};
				},
				render: function render() {
						var props = assign({}, this.props);

						if (parseInt(props.percent, 10) === 100) {
								props.status = 'success';
						}

						var progressInfo = void 0;
						var fullCls = '';

						if (props.format) {
								warning(typeof props.format === 'function', 'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
						}

						var text = props.format || props.percent + '%';
						if (typeof props.format === 'string') {
								// 向下兼容原来的字符串替换方式
								text = props.format.replace('${percent}', props.percent);
						} else if (typeof props.format === 'function') {
								text = props.format(props.percent);
						}

						if (props.showInfo === true) {
								if (props.status === 'exception') {
										progressInfo = React.createElement(
												'span',
												{ className: prefixCls + '-line-text' },
												props.format ? text : React.createElement(Icon, { type: 'exclamation' })
										);
								} else if (props.status === 'success') {
										progressInfo = React.createElement(
												'span',
												{ className: prefixCls + '-line-text' },
												props.format ? text : React.createElement(Icon, { type: 'check' })
										);
								} else {
										progressInfo = React.createElement(
												'span',
												{ className: prefixCls + '-line-text' },
												text
										);
								}
						} else {
								fullCls = ' ' + prefixCls + '-line-wrap-full';
						}
						var percentStyle = {
								width: props.percent + '%',
								height: props.strokeWidth
						};

						return React.createElement(
								'div',
								{ className: prefixCls + '-line-wrap clearfix status-' + props.status + fullCls, style: props.style },
								progressInfo,
								React.createElement(
										'div',
										{ className: prefixCls + '-line-outer' },
										React.createElement(
												'div',
												{ className: prefixCls + '-line-inner' },
												React.createElement('div', { className: prefixCls + '-line-bg', style: percentStyle })
										)
								)
						);
				}
		});

		var Circle = React.createClass({
				displayName: 'Circle',

				propTypes: {
						status: React.PropTypes.oneOf(['normal', 'exception', 'success']),
						percent: React.PropTypes.number,
						strokeWidth: React.PropTypes.number,
						width: React.PropTypes.number,
						trailColor: React.PropTypes.string,
						format: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string, React.PropTypes.func])
				},
				getDefaultProps: function getDefaultProps() {
						return {
								width: 132,
								percent: 0,
								strokeWidth: 6,
								status: 'normal', // exception
								trailColor: '#f3f3f3'
						};
				},
				render: function render() {
						var props = assign({}, this.props);

						if (parseInt(props.percent, 10) === 100) {
								props.status = 'success';
						}

						var style = {
								width: props.width,
								height: props.width,
								fontSize: props.width * 0.16 + 6
						};
						var progressInfo = void 0;
						var text = props.format || props.percent + '%';

						if (props.format) {
								warning(typeof props.format === 'function', 'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
						}

						if (typeof props.format === 'string') {
								// 向下兼容原来的字符串替换方式
								text = props.format.replace('${percent}', props.percent);
						} else if (typeof props.format === 'function') {
								text = props.format(props.percent);
						}

						if (props.status === 'exception') {
								progressInfo = React.createElement(
										'span',
										{ className: prefixCls + '-circle-text' },
										props.format ? text : React.createElement(Icon, { type: 'exclamation' })
								);
						} else if (props.status === 'success') {
								progressInfo = React.createElement(
										'span',
										{ className: prefixCls + '-circle-text' },
										props.format ? text : React.createElement(Icon, { type: 'check' })
								);
						} else {
								progressInfo = React.createElement(
										'span',
										{ className: prefixCls + '-circle-text' },
										text
								);
						}

						return React.createElement(
								'div',
								{ className: prefixCls + '-circle-wrap status-' + props.status, style: props.style },
								React.createElement(
										'div',
										{ className: prefixCls + '-circle-inner', style: style },
										React.createElement(Progresscircle, { percent: props.percent, strokeWidth: props.strokeWidth,
												strokeColor: statusColorMap[props.status], trailColor: props.trailColor }),
										progressInfo
								)
						);
				}
		});

		UI.Progress = {
				Line: Line,
				Circle: Circle
		};
}(Smart.UI, Smart.RC);