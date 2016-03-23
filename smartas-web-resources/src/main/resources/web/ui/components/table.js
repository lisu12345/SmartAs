'use strict';

+function (RC) {
	var objectAssign = _.assign;

	var TableRow = React.createClass({
		displayName: 'TableRow',

		propTypes: {
			onDestroy: React.PropTypes.func,
			record: React.PropTypes.object,
			prefixCls: React.PropTypes.string
		},

		componentWillUnmount: function componentWillUnmount() {
			this.props.onDestroy(this.props.record);
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.prefixCls;
			var columns = props.columns;
			var record = props.record;
			var index = props.index;
			var cells = [];
			var expanded = props.expanded;
			var expandable = props.expandable;
			var expandIconAsCell = props.expandIconAsCell;
			var indent = props.indent;
			var indentSize = props.indentSize;
			var needIndentSpaced = props.needIndentSpaced;
			var onRowClick = props.onRowClick;

			for (var i = 0; i < columns.length; i++) {
				var col = columns[i];
				var colClassName = col.className || '';
				var render = col.render;
				var text = record[col.dataIndex];

				var expandIcon = null;
				var tdProps = void 0;
				var colSpan = void 0;
				var rowSpan = void 0;
				var notRender = false;
				var indentText = void 0;

				if (i === 0 && expandable) {
					expandIcon = React.createElement('span', {
						className: prefixCls + '-expand-icon ' + prefixCls + '-' + (expanded ? 'expanded' : 'collapsed'),
						onClick: props.onExpand.bind(null, !expanded, record) });
				} else if (i === 0 && needIndentSpaced) {
					expandIcon = React.createElement('span', {
						className: prefixCls + '-expand-icon ' + prefixCls + '-spaced' });
				}

				if (expandIconAsCell && i === 0) {
					cells.push(React.createElement(
						'td',
						{ className: prefixCls + '-expand-icon-cell',
							key: 'rc-table-expand-icon-cell' },
						expandIcon
					));
					expandIcon = null;
				}

				if (render) {
					text = render(text, record, index) || {};
					tdProps = text.props || {};

					if (typeof text !== 'string' && !React.isValidElement(text) && 'children' in text) {
						text = text.children;
					}
					rowSpan = tdProps.rowSpan;
					colSpan = tdProps.colSpan;
				}

				if (rowSpan === 0 || colSpan === 0) {
					notRender = true;
				}

				indentText = i === 0 ? React.createElement('span', { style: { paddingLeft: indentSize * indent + 'px' }, className: prefixCls + '-indent indent-level-' + indent }) : null;

				if (!notRender) {
					cells.push(React.createElement(
						'td',
						{ key: col.key, colSpan: colSpan, rowSpan: rowSpan, className: '' + colClassName },
						indentText,
						expandIcon,
						text
					));
				}
			}
			return React.createElement(
				'tr',
				{ onClick: onRowClick ? onRowClick.bind(null, record, index) : null, className: prefixCls + ' ' + props.className, style: { display: props.visible ? '' : 'none' } },
				cells
			);
		}
	});

	var Table = React.createClass({
		displayName: 'Table',

		propTypes: {
			data: React.PropTypes.array,
			expandIconAsCell: React.PropTypes.bool,
			expandedRowKeys: React.PropTypes.array,
			defaultExpandedRowKeys: React.PropTypes.array,
			useFixedHeader: React.PropTypes.bool,
			columns: React.PropTypes.array,
			prefixCls: React.PropTypes.string,
			bodyStyle: React.PropTypes.object,
			style: React.PropTypes.object,
			rowKey: React.PropTypes.func,
			rowClassName: React.PropTypes.func,
			expandedRowClassName: React.PropTypes.func,
			childrenColumnName: React.PropTypes.string,
			onExpandedRowsChange: React.PropTypes.func,
			indentSize: React.PropTypes.number,
			onRowClick: React.PropTypes.func,
			columnsPageRange: React.PropTypes.array,
			columnsPageSize: React.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: [],
				useFixedHeader: false,
				expandIconAsCell: false,
				columns: [],
				defaultExpandedRowKeys: [],
				rowKey: function rowKey(o) {
					return o.key;
				},
				rowClassName: function rowClassName() {
					return '';
				},
				expandedRowClassName: function expandedRowClassName() {
					return '';
				},
				onExpandedRowsChange: function onExpandedRowsChange() {},

				prefixCls: 'rc-table',
				bodyStyle: {},
				style: {},
				childrenColumnName: 'children',
				indentSize: 15,
				columnsPageSize: 5
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			return {
				expandedRowKeys: props.expandedRowKeys || props.defaultExpandedRowKeys,
				data: this.props.data,
				currentColumnsPage: 0
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('data' in nextProps) {
				this.setState({
					data: nextProps.data
				});
			}
			if ('expandedRowKeys' in nextProps) {
				this.setState({
					expandedRowKeys: nextProps.expandedRowKeys
				});
			}
		},
		onExpandedRowsChange: function onExpandedRowsChange(expandedRowKeys) {
			if (!this.props.expandedRowKeys) {
				this.setState({
					expandedRowKeys: expandedRowKeys
				});
			}
			this.props.onExpandedRowsChange(expandedRowKeys);
		},
		onExpanded: function onExpanded(expanded, record) {
			var info = this.findExpandedRow(record);
			if (info && !expanded) {
				this.onRowDestroy(record);
			} else if (!info && expanded) {
				var expandedRows = this.getExpandedRows().concat();
				expandedRows.push(this.props.rowKey(record));
				this.onExpandedRowsChange(expandedRows);
			}
		},
		onRowDestroy: function onRowDestroy(record) {
			var expandedRows = this.getExpandedRows().concat();
			var rowKey = this.props.rowKey(record);
			var index = -1;
			expandedRows.forEach(function (r, i) {
				if (r === rowKey) {
					index = i;
				}
			});
			if (index !== -1) {
				expandedRows.splice(index, 1);
			}
			this.onExpandedRowsChange(expandedRows);
		},
		getExpandedRows: function getExpandedRows() {
			return this.props.expandedRowKeys || this.state.expandedRowKeys;
		},
		getThs: function getThs() {
			var ths = [];
			if (this.props.expandIconAsCell) {
				ths.push({
					key: 'rc-table-expandIconAsCell',
					className: this.props.prefixCls + '-expand-icon-th',
					title: ''
				});
			}
			ths = ths.concat(this.getCurrentColumns());
			return ths.map(function (c) {
				if (c.colSpan !== 0) {
					return React.createElement(
						'th',
						{ key: c.key, colSpan: c.colSpan, className: c.className || '' },
						c.title
					);
				}
			});
		},
		getExpandedRow: function getExpandedRow(key, content, visible, className) {
			var prefixCls = this.props.prefixCls;
			return React.createElement(
				'tr',
				{ key: key + '-extra-row', style: { display: visible ? '' : 'none' }, className: prefixCls + '-expanded-row ' + className },
				this.props.expandIconAsCell ? React.createElement('td', { key: 'rc-table-expand-icon-placeholder' }) : '',
				React.createElement(
					'td',
					{ colSpan: this.props.columns.length },
					content
				)
			);
		},
		getRowsByData: function getRowsByData(data, visible, indent) {
			var props = this.props;
			var columns = this.getCurrentColumns();
			var childrenColumnName = props.childrenColumnName;
			var expandedRowRender = props.expandedRowRender;
			var expandIconAsCell = props.expandIconAsCell;
			var rst = [];
			var keyFn = props.rowKey;
			var rowClassName = props.rowClassName;
			var expandedRowClassName = props.expandedRowClassName;
			var needIndentSpaced = props.data.some(function (record) {
				return record[childrenColumnName] && record[childrenColumnName].length > 0;
			});
			var onRowClick = props.onRowClick;
			for (var i = 0; i < data.length; i++) {
				var record = data[i];
				var key = keyFn ? keyFn(record, i) : undefined;
				var childrenColumn = record[childrenColumnName];
				var isRowExpanded = this.isRowExpanded(record);
				var expandedRowContent = void 0;
				if (expandedRowRender && isRowExpanded) {
					expandedRowContent = expandedRowRender(record, i);
				}
				var className = rowClassName(record, i);
				rst.push(React.createElement(TableRow, {
					indent: indent,
					indentSize: props.indentSize,
					needIndentSpaced: needIndentSpaced,
					className: className,
					record: record,
					expandIconAsCell: expandIconAsCell,
					onDestroy: this.onRowDestroy,
					index: i,
					visible: visible,
					onExpand: this.onExpanded,
					expandable: childrenColumn || expandedRowRender,
					expanded: isRowExpanded,
					prefixCls: props.prefixCls + '-row',
					childrenColumnName: childrenColumnName,
					columns: columns,
					onRowClick: onRowClick,
					key: key }));

				var subVisible = visible && isRowExpanded;

				if (expandedRowContent && isRowExpanded) {
					rst.push(this.getExpandedRow(key, expandedRowContent, subVisible, expandedRowClassName(record, i)));
				}
				if (childrenColumn) {
					rst = rst.concat(this.getRowsByData(childrenColumn, subVisible, indent + 1));
				}
			}
			return rst;
		},
		getRows: function getRows() {
			return this.getRowsByData(this.state.data, true, 0);
		},
		getColGroup: function getColGroup() {
			var cols = [];
			if (this.props.expandIconAsCell) {
				cols.push(React.createElement('col', { className: this.props.prefixCls + '-expand-icon-col', key: 'rc-table-expand-icon-col' }));
			}
			cols = cols.concat(this.props.columns.map(function (c) {
				return React.createElement('col', { key: c.key, style: { width: c.width } });
			}));
			return React.createElement(
				'colgroup',
				null,
				cols
			);
		},
		getCurrentColumns: function getCurrentColumns() {
			var _this = this;

			var _props = this.props;
			var columns = _props.columns;
			var columnsPageRange = _props.columnsPageRange;
			var columnsPageSize = _props.columnsPageSize;
			var prefixCls = _props.prefixCls;
			var currentColumnsPage = this.state.currentColumnsPage;

			if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
				return columns;
			}
			return columns.map(function (column, i) {
				var newColumn = objectAssign({}, column);
				if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
					var pageIndexStart = columnsPageRange[0] + currentColumnsPage * columnsPageSize;
					var pageIndexEnd = columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
					if (pageIndexEnd > columnsPageRange[1]) {
						pageIndexEnd = columnsPageRange[1];
					}
					if (i < pageIndexStart || i > pageIndexEnd) {
						newColumn.className = newColumn.className || '';
						newColumn.className += ' ' + prefixCls + '-column-hidden';
					}
					newColumn = _this.wrapPageColumn(newColumn, i === pageIndexStart, i === pageIndexEnd);
				}
				return newColumn;
			});
		},
		getMaxColumnsPage: function getMaxColumnsPage() {
			var _props2 = this.props;
			var columnsPageRange = _props2.columnsPageRange;
			var columnsPageSize = _props2.columnsPageSize;

			return Math.floor((columnsPageRange[1] - columnsPageRange[0] - 1) / columnsPageSize);
		},
		goToColumnsPage: function goToColumnsPage(currentColumnsPage) {
			var maxColumnsPage = this.getMaxColumnsPage();
			var page = currentColumnsPage;
			if (page < 0) {
				page = 0;
			}
			if (page > maxColumnsPage) {
				page = maxColumnsPage;
			}
			this.setState({
				currentColumnsPage: page
			});
		},
		prevColumnsPage: function prevColumnsPage() {
			this.goToColumnsPage(this.state.currentColumnsPage - 1);
		},
		nextColumnsPage: function nextColumnsPage() {
			this.goToColumnsPage(this.state.currentColumnsPage + 1);
		},
		wrapPageColumn: function wrapPageColumn(column, hasPrev, hasNext) {
			var prefixCls = this.props.prefixCls;
			var currentColumnsPage = this.state.currentColumnsPage;

			var maxColumnsPage = this.getMaxColumnsPage();
			var prevHandlerCls = prefixCls + '-prev-columns-page';
			if (currentColumnsPage === 0) {
				prevHandlerCls += ' ' + prefixCls + '-prev-columns-page-disabled';
			}
			var prevHandler = React.createElement('span', { className: prevHandlerCls, onClick: this.prevColumnsPage });
			var nextHandlerCls = prefixCls + '-next-columns-page';
			if (currentColumnsPage === maxColumnsPage) {
				nextHandlerCls += ' ' + prefixCls + '-next-columns-page-disabled';
			}
			var nextHandler = React.createElement('span', { className: nextHandlerCls, onClick: this.nextColumnsPage });
			if (hasPrev) {
				column.title = React.createElement(
					'span',
					null,
					prevHandler,
					column.title
				);
				column.className = (column.className || '') + (' ' + prefixCls + '-column-has-prev');
			}
			if (hasNext) {
				column.title = React.createElement(
					'span',
					null,
					column.title,
					nextHandler
				);
				column.className = (column.className || '') + (' ' + prefixCls + '-column-has-next');
			}
			return column;
		},
		findExpandedRow: function findExpandedRow(record) {
			var keyFn = this.props.rowKey;
			var currentRowKey = keyFn(record);
			var rows = this.getExpandedRows().filter(function (i) {
				return i === currentRowKey;
			});
			return rows[0] || null;
		},
		isRowExpanded: function isRowExpanded(record) {
			return !!this.findExpandedRow(record);
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.prefixCls;
			var columns = this.getThs();
			var rows = this.getRows();
			var className = props.prefixCls;
			if (props.className) {
				className += ' ' + props.className;
			}
			if (props.columnsPageRange) {
				className += ' ' + prefixCls + '-columns-paging';
			}
			var headerTable = void 0;
			var thead = React.createElement(
				'thead',
				{ className: prefixCls + '-thead' },
				React.createElement(
					'tr',
					null,
					columns
				)
			);
			if (props.useFixedHeader) {
				headerTable = React.createElement(
					'div',
					{ className: prefixCls + '-header' },
					React.createElement(
						'table',
						null,
						this.getColGroup(),
						thead
					)
				);
				thead = null;
			}
			return React.createElement(
				'div',
				{ className: className, style: props.style },
				headerTable,
				React.createElement(
					'div',
					{ className: prefixCls + '-body', style: props.bodyStyle },
					React.createElement(
						'table',
						null,
						this.getColGroup(),
						thead,
						React.createElement(
							'tbody',
							{ className: prefixCls + '-tbody' },
							rows
						)
					)
				)
			);
		}
	});

	RC.Table = Table;
}(Smart.RC);