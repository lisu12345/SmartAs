+ function(Namespace) {
	var HelloMessage = React.createClass({
		render: function() {
			return <div>Hello {this.props.name}</div>;
		}
	});
}(Smart.Namespace)