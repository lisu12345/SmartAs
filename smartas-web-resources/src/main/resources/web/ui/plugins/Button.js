'use strict';

+function (Namespace) {
	var UI = Namespace.register("Smart.LigerUI");
	UI.Button = React.createClass({
		displayName: 'Button',

		propTypes: {
			name: React.PropTypes.string,
			id: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			value: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				disabled: false
			};
		},

		getInitialState: function getInitialState() {
			return {
				mouseOver: false
			};
		},

		doMouseEnter: function doMouseEnter() {
			this.setState({
				mouseOver: true
			});
		},
		doMouseLeave: function doMouseLeave() {
			this.setState({
				mouseOver: false
			});
		},
		doClick: function doClick(disabled, event) {
			if (disabled) {
				//event.stopPropagation();
				return;
			}
			this.props.onClick && this.props.onClick(event);
		},

		render: function render() {
			var p = this.props,
			    s = this.state;
			return React.createElement(
				'div',
				{ onClick: this.doClick.bind(this, p.disabled), onMouseEnter: this.doMouseEnter, onMouseLeave: this.doMouseLeave, className: classNames('l-button l-button-hasicon', { 'l-button-disabled': p.disabled, 'l-button-over': s.mouseOver }) },
				React.createElement('div', { className: 'l-button-l' }),
				React.createElement('div', { className: 'l-button-r' }),
				React.createElement(
					'span',
					null,
					p.value
				)
			);
		}
	});
}(Smart.Namespace);