+ function(UI) {

	UI.Icon = props => {
		const className = classNames(props.className, ` anticon anticon-${props.type}`);
		return <i {..._.assign({}, props, {className})}/>;
	};

}(Smart.UI);