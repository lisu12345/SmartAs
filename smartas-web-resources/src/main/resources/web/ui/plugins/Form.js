"use strict";

+(function (Namespace) {
	var UI = Namespace.register("Smart.UI"),
	    AT = Smart.UI.ActionTypes;
	UI.Form = React.createClass({
		displayName: "Form",

		propTypes: {
			name: React.PropTypes.string.isRequired
		},
		// 返回底层的dom节点
		getDom: function getDom() {
			return this.refs.form;
		},

		getInitialState: function getInitialState() {
			return {};
		},
		render: function render() {
			var p = this.props,
			    s = this.state;
			return React.createElement(
				"form",
				null,
				this.props.children
			);
		}
	});
})(Smart.Namespace);