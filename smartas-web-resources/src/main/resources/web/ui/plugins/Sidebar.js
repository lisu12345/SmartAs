'use strict';

+(function (Namespace) {
	var UI = Namespace.register("Smart.LigerUI"),
	    AT = Smart.UI.ActionTypes;
	UI.Sidebar = React.createClass({
		displayName: 'Sidebar',

		propTypes: {
			name: React.PropTypes.string,
			id: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			readOnly: React.PropTypes.bool,
			checked: React.PropTypes.bool,
			uncheckable: React.PropTypes.bool,
			action: React.PropTypes.func,
			value: React.PropTypes.string.isRequired
		},
		//返回底层的dom节点
		getDom: function getDom() {
			return this.refs.input;
		},

		getDefaultProps: function getDefaultProps() {
			return {
				disabled: false,
				uncheckable: false,
				readOnly: false,
				checked: false,
				action: function action() {}
			};
		},

		getInitialState: function getInitialState() {
			return {
				checked: this.props.checked || false,
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
		doClick: function doClick(disabled, name, event) {
			//event.preventDefault();
			//event.stopPropagation();
			if (disabled) {
				return;
			}
			//选中框支持取消选中
			var checked = this.checked;
			if (!this.props.uncheckable && checked) {
				return;
			}
			var checkedLink = this.props.checkedLink;
			if (checkedLink) {
				checkedLink.requestChange(this.props.value, !checked, 'radio');
			} else {
				this.setState({
					checked: !checked
				});
			}
		},

		render: function render() {
			var p = this.props,
			    s = this.state,
			    disabled = p.disabled || p.readOnly,
			    checked;
			if (p.checkedLink) {
				checked = p.checkedLink.value === p.value;
			} else {
				checked = s.checked || p.checked;
			}
			this.checked = checked;
			return React.createElement(
				'div',
				{ onMouseEnter: this.doMouseEnter, onMouseLeave: this.doMouseLeave, className: classNames('l-radio-wrapper', { 'l-disabled': disabled, 'l-over': s.mouseOver }) },
				React.createElement('a', { onClick: this.doClick.bind(this, disabled, p.name), className: classNames('l-radio', { 'l-radio-checked': checked }) }),
				React.createElement('input', { ref: 'input', type: 'radio', name: p.name, id: p.id, style: { display: 'none' }, readOnly: disabled, checked: checked, value: p.value })
			);
		}
	});
})(Smart.Namespace);