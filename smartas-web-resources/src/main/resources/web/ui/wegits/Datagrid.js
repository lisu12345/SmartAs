'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
	var Table = UI.Table;

	var ROWNUMBERS = {
		title: '',
		dataIndex: 'id',
		className: 'cell-rownumber',
		render: function render(id, row, index) {
			return React.createElement(
				'span',
				null,
				index + 1
			);
		}
	};

	var Grid = React.createClass({
		displayName: 'Grid',

		propTypes: {
			service: React.PropTypes.object.isRequired,
			rownumbers: React.PropTypes.bool
		},
		getDefaultProps: function getDefaultProps() {
			return {
				rownumbers: true
			};
		},
		getInitialState: function getInitialState() {
			var service = this.props.service;

			var pagination = {
				total: 0,
				current: 1,
				showSizeChanger: true,
				showTotal: function showTotal(total) {
					return '共 ' + total + ' 条';
				},
				onShowSizeChange: function onShowSizeChange(current, pageSize) {
					service.listPage(current, pageSize);
				},
				onChange: function onChange(current, pageSize) {
					service.listPage(current, pageSize);
				}
			};
			return { pagination: pagination, data: [] };
		},
		componentDidMount: function componentDidMount() {
			var service = this.props.service;

			service.subscribe((function (action) {
				var type = action.type;
				var data = action.data;
				var method = action.method;

				if (method === 'listPage') {
					var pageSize = data.pageSize;
					var page = data.page;
					var length = data.length;

					this.setState({
						data: data.data,
						pagination: {
							total: length
						}
					});
					return;
				}
			}).bind(this));
			service.listPage(1, 10);
		},
		render: function render() {
			var _state = this.state;
			var data = _state.data;
			var pagination = _state.pagination;var _props = this.props;
			var service = _props.service;
			var _rowKey = _props.rowKey;
			var rownumbers = _props.rownumbers;
			var columns = _props.columns;

			var props = _objectWithoutProperties(_props, ['service', 'rowKey', 'rownumbers', 'columns']);

			return React.createElement(Table, _extends({ size: 'grid' }, props, {
				rowKey: function rowKey(record) {
					return record[_rowKey];
				},
				columns: rownumbers ? _.concat(ROWNUMBERS, columns) : columns,
				dataSource: data,
				pagination: pagination }));
		}
	});

	UI.Grid = Grid;
})(Smart.UI, Smart.RC);