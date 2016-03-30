"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (UI, RC) {
	var Table = UI.Table;
	var Button = UI.Button;
	var Icon = UI.Icon;
	var AT = Smart.ActionTypes;

	var Header = React.createClass({
		displayName: "Header",

		propTypes: {
			title: React.PropTypes.string
		},
		render: function render() {
			var title = this.props.title;

			if (title) {
				return React.createElement(
					"div",
					{ className: "grid-head" },
					React.createElement(
						"div",
						{ className: "grid-title" },
						title
					)
				);
			}
			return null;
		}
	});

	var Toolbar = React.createClass({
		displayName: "Toolbar",

		propTypes: {
			toolbar: React.PropTypes.array,
			service: React.PropTypes.object.isRequired
		},
		render: function render() {
			var toolbar = this.props.toolbar;

			if (_.size(toolbar)) {
				return React.createElement(
					"div",
					{ className: "grid-toolbar" },
					React.createElement(
						"table",
						{ style: { cellspacing: 0, cellpadding: 0 } },
						React.createElement(
							"tbody",
							null,
							React.createElement(
								"tr",
								null,
								_.map(toolbar, function (value, key) {
									var bar = void 0;
									if (value === '-') {
										bar = React.createElement("span", { className: "btn-separator" });
									} else {
										bar = React.createElement(
											Button,
											{ type: "grid", onClick: value.handler.bind(this) },
											value.icon ? React.createElement(Icon, { type: value.icon }) : '',
											React.createElement(
												"span",
												null,
												value.text
											)
										);
									}
									return React.createElement(
										"td",
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

	var Grid = React.createClass({
		displayName: "Grid",

		propTypes: {
			service: React.PropTypes.object.isRequired,
			rownumbers: React.PropTypes.bool,
			pageSize: React.PropTypes.number,
			toolbar: React.PropTypes.array,
			rowSelection: React.PropTypes.object,
			qs: React.PropTypes.object,
			QForm: React.PropTypes.func
		},
		getDefaultProps: function getDefaultProps() {
			return {
				rownumbers: true,
				pageSize: 10,
				current: 1,
				qs: null,
				toolbar: []
			};
		},
		getInitialState: function getInitialState() {
			var _props = this.props;
			var service = _props.service;
			var current = _props.current;
			var pageSize = _props.pageSize;
			var _self = this;
			var pagination = {
				total: 0,
				current: current,
				showSizeChanger: true,
				showTotal: function showTotal(total) {
					return "共 " + total + " 条";
				},
				onShowSizeChange: function onShowSizeChange(current, pageSize) {
					service.listPage(current, pageSize, _.assign({}, _self.props.qs, _self.state.qs));
				},
				onChange: function onChange(current, pageSize) {
					service.listPage(current, pageSize, _.assign({}, _self.props.qs, _self.state.qs));
				}
			};
			return { pagination: pagination, data: [], current: current, pageSize: pageSize };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var service = nextProps.service;
			var qs = nextProps.qs;

			service.listPage(1, 10, qs);
		},
		componentWillMount: function componentWillMount() {
			var service = this.props.service;

			this.unsubscribe = service.subscribe(function (action) {
				var type = action.type;
				var data = action.data;
				var method = action.method;

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
				if (method === 'refresh') {
					if (data) {
						service.listPage(data.page, data.pageSize, _.assign({}, this.props.qs, data.qs));
						return;
					}
					service.listPage(this.state.current, this.state.pageSize, _.assign({}, this.props.qs, this.state.qs));
					return;
				}
			}.bind(this));
			service.listPage(1, 10, this.props.qs);
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.unsubscribe) {
				this.unsubscribe();
				this.unsubscribe = null;
			}
		},
		queryReset: function queryReset(e) {
			this.refs.qform.resetFields();
		},
		querySubmit: function querySubmit(e) {
			e.preventDefault();

			var service = this.props.service;

			var qs = this.refs.qform.getFormatFieldsValue();
			this.state.qs = qs;
			service.refresh();
		},

		render: function render() {
			var _state = this.state;
			var data = _state.data;
			var pagination = _state.pagination;
			var _props2 = this.props;
			var service = _props2.service;
			var _rowKey = _props2.rowKey;
			var rownumbers = _props2.rownumbers;
			var columns = _props2.columns;
			var title = _props2.title;
			var toolbar = _props2.toolbar;
			var rowSelection = _props2.rowSelection;
			var QForm = _props2.QForm;

			var props = _objectWithoutProperties(_props2, ["service", "rowKey", "rownumbers", "columns", "title", "toolbar", "rowSelection", "QForm"]);

			var Form = null;
			if (QForm) {
				Form = React.createElement(
					"div",
					null,
					React.createElement(
						QForm,
						{ ref: "qform", querySubmit: this.querySubmit },
						React.createElement(
							Button,
							{ type: "primary", htmlType: "submit" },
							"查询"
						),
						" ",
						React.createElement(
							Button,
							{ onClick: this.queryReset },
							"重置"
						)
					)
				);
			}
			return React.createElement(
				"div",
				{ className: "ant-grid" },
				QForm && Form,
				React.createElement(Header, { title: title }),
				React.createElement(Toolbar, { toolbar: toolbar, service: service }),
				React.createElement(Table, _extends({ size: "grid" }, props, { rowSelection: rowSelection,
					rowKey: function rowKey(record) {
						return record[_rowKey];
					},
					columns: columns,
					rownumbers: rownumbers,
					dataSource: data,
					pagination: pagination, height: this.props.height }))
			);
		}
	});

	UI.Grid = Grid;
}(Smart.UI, Smart.RC);