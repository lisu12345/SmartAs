'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
	var Table = UI.Table;
	var Button = UI.Button;
	var Icon = UI.Icon;

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

	var Header = React.createClass({
		displayName: 'Header',

		propTypes: {
			title: React.PropTypes.string
		},
		render: function render() {
			var title = this.props.title;

			if (title) {
				return React.createElement(
					'div',
					{ className: 'grid-head' },
					React.createElement(
						'div',
						{ className: 'grid-title' },
						title
					)
				);
			}
			return null;
		}
	});

	var Toolbar = React.createClass({
		displayName: 'Toolbar',

		propTypes: {
			toolbar: React.PropTypes.array,
			service: React.PropTypes.object.isRequired
		},
		render: function render() {
			var toolbar = this.props.toolbar;

			if (toolbar) {
				return React.createElement(
					'div',
					{ className: 'grid-toolbar' },
					React.createElement(
						'table',
						{ style: { cellspacing: 0, cellpadding: 0 } },
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								null,
								_.map(toolbar, function (value, key) {
									var bar = undefined;
									if (value === '-') {
										bar = React.createElement('span', { className: 'btn-separator' });
									} else {
										bar = React.createElement(
											Button,
											{ type: 'grid', onClick: value.handler.bind(this) },
											value.icon ? React.createElement(Icon, { type: value.icon }) : '',
											React.createElement(
												'span',
												null,
												value.text
											)
										);
									}
									return React.createElement(
										'td',
										{ key: key },
										bar
									);
								})
							)
						)
					)
				);
			}
			return null;
		}
	});

	var rowSelection = {
		onChange: function onChange(selectedRowKeys) {
			console.log('selectedRowKeys changed: ' + selectedRowKeys);
		},
		onSelect: function onSelect(record, selected, selectedRows) {
			console.log(record, selected, selectedRows);
		},
		onSelectAll: function onSelectAll(selected, selectedRows) {
			console.log(selected, selectedRows);
		}
	};

	var Grid = React.createClass({
		displayName: 'Grid',

		propTypes: {
			service: React.PropTypes.object.isRequired,
			rownumbers: React.PropTypes.bool,
			pageSize: React.PropTypes.number,
			toolbar: React.PropTypes.array
		},
		getDefaultProps: function getDefaultProps() {
			return {
				rownumbers: true,
				pageSize: 10,
				current: 1,
				toolbar: []
			};
		},
		getInitialState: function getInitialState() {
			var _props = this.props;
			var service = _props.service;
			var current = _props.current;
			var pageSize = _props.pageSize;

			var pagination = {
				total: 0,
				current: current,
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
			return { pagination: pagination, data: [], current: current, pageSize: pageSize };
		},
		componentDidMount: function componentDidMount() {
			var service = this.props.service;

			service.subscribe((function (action) {
				var type = action.type;
				var data = action.data;
				var method = action.method;

				if (method === 'refresh') {
					if (data) {
						service.listPage(data.qs, data.page, data.pageSize);
						return;
					}
					service.listPage( /*this.state.qs,*/this.state.current, this.state.pageSize);
					return;
				}
				if (method === 'listPage') {
					this.setState({
						data: data.data,
						current: data.page,
						pageSize: data.pageSize,
						pagination: {
							total: data.length
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
			var pagination = _state.pagination;var _props2 = this.props;
			var service = _props2.service;
			var _rowKey = _props2.rowKey;
			var rownumbers = _props2.rownumbers;
			var columns = _props2.columns;
			var title = _props2.title;
			var toolbar = _props2.toolbar;

			var props = _objectWithoutProperties(_props2, ['service', 'rowKey', 'rownumbers', 'columns', 'title', 'toolbar']);

			return React.createElement(
				'div',
				{ className: 'ant-grid' },
				React.createElement(Header, { title: title }),
				React.createElement(Toolbar, { toolbar: toolbar, service: service }),
				React.createElement(Table, _extends({ size: 'grid' }, props, { rowSelection: rowSelection,
					rowKey: function rowKey(record) {
						return record[_rowKey];
					},
					columns: rownumbers ? _.concat(ROWNUMBERS, columns) : columns,
					dataSource: data,
					pagination: pagination }))
			);
		}
	});

	UI.Grid = Grid;
})(Smart.UI, Smart.RC);