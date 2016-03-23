'use strict';

+function (Namespace) {
	var EasyUI = Namespace.register("Smart.EasyUI");
	EasyUI.DataGrid = React.createClass({
		displayName: 'DataGrid',


		getDefaultProps: function getDefaultProps() {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true
			};
		},

		shouldComponentUpdate: function shouldComponentUpdate() {
			return false;
		},

		getColumns: function getColumns() {
			return React.Children.map(this.props.children, function (node) {
				return _.omit(node.props, 'children');
			});
		},

		componentDidMount: function componentDidMount() {
			$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
				columns: [this.columns]
			}, _.omit(this.props, 'children')));
		},
		render: function render() {
			return React.createElement('table', { className: 'smart easyui-datagrid' });
		}
	});

	EasyUI.DataGrid.Column = React.createClass({
		displayName: 'Column',

		shouldComponentUpdate: function shouldComponentUpdate() {
			return false;
		},
		render: function render() {
			return null;
		}
	});
}(Smart.Namespace);