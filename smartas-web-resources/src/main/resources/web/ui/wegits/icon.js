"use strict";

+function (UI) {

	UI.Icon = function (props) {
		var className = classNames(props.className, " anticon anticon-" + props.type);
		return React.createElement("i", _.assign({}, props, { className: className }));
	};
}(Smart.UI);