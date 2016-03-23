'use strict';

+function (UI) {
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
		function getOffset(element) {
				var rect = element.getBoundingClientRect();
				var body = document.body;
				var clientTop = element.clientTop || body.clientTop || 0;
				var clientLeft = element.clientLeft || body.clientLeft || 0;
				var scrollTop = getScroll(window, true);
				var scrollLeft = getScroll(window);

				return {
						top: rect.top + scrollTop - clientTop,
						left: rect.left + scrollLeft - clientLeft
				};
		}
		UI.Affix = React.createClass({
				displayName: 'Affix',
				getDefaultProps: function getDefaultProps() {
						return {
								offset: 0
						};
				},


				propTypes: {
						offset: React.PropTypes.number
				},

				getInitialState: function getInitialState() {
						return {
								affix: false,
								affixStyle: null
						};
				},
				handleScroll: function handleScroll() {
						var affix = this.state.affix;
						var scrollTop = getScroll(window, true);
						var elemOffset = getOffset(ReactDOM.findDOMNode(this));

						if (!affix && elemOffset.top - this.props.offset < scrollTop) {
								this.setState({
										affix: true,
										affixStyle: {
												top: this.props.offset,
												left: elemOffset.left,
												width: ReactDOM.findDOMNode(this).offsetWidth
										}
								});
						}

						if (affix && elemOffset.top - this.props.offset > scrollTop) {
								this.setState({
										affix: false,
										affixStyle: null
								});
						}
				},
				componentDidMount: function componentDidMount() {
						var win = $(window);
						this.scrollEvent = win.on('scroll', this.handleScroll);
						this.resizeEvent = win.on('resize', this.handleScroll);
				},
				componentWillUnmount: function componentWillUnmount() {
						var win = $(window);
						if (this.scrollEvent) {
								win.off('scroll', this.scrollEvent);
								this.scrollEvent = null;
						}
						if (this.resizeEvent) {
								win.off('resize', this.resizeEvent);
								this.resizeEvent = null;
						}
				},
				render: function render() {
						var className = classNames(this.props.className, {
								'ant-affix': this.state.affix
						});

						return React.createElement(
								'div',
								this.props,
								React.createElement(
										'div',
										{ className: className, style: this.state.affixStyle },
										this.props.children
								)
						);
				}
		});
}(Smart.UI);