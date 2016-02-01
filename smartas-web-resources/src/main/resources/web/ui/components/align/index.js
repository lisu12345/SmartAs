'use strict';

// export this package's api
+(function (RC) {
	var noop = _.noop,
	    rcUtil = RC.Util,
	    Dom = rcUtil.Dom,
	    align = Dom.align,
	    PropTypes = React.PropTypes,
	    isWindow = rcUtil.isWindow;

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