"use strict";

+(function (Namespace) {
	var NS = Namespace.register("Smart.UI");

	NS.HelloMessage = React.createClass({
		displayName: "HelloMessage",

		render: function render() {
			return React.createElement(
				"div",
				null,
				"Hello ",
				this.props.name
			);
		}
	});
})(Smart.Namespace);