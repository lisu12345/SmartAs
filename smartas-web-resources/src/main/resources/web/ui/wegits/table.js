'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var objectAssign = _.assign;
  var Table = RC.Table;
  var classNames = RC.classNames;
  var Menu = RC.Menu;
  var SubMenu = RC.SubMenu;
  var MenuItem = RC.MenuItem;
  var Locale = RC.Locale;
  var Radio = UI.Radio;
  var Pagination = UI.Pagination;
  var Icon = UI.Icon;
  var Spin = UI.Spin;
  var Dropdown = UI.Dropdown;
  var Checkbox = UI.Checkbox;

  var rownumberColumn = {
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

  var defaultLocale = Locale.Table;

  var FilterMenu = React.createClass({
    displayName: 'FilterMenu',
    getInitialState: function getInitialState() {
      return {
        selectedKeys: this.props.selectedKeys,
        keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
        visible: false
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      this.setState({
        selectedKeys: nextProps.selectedKeys
      });
    },
    getDefaultProps: function getDefaultProps() {
      return {
        handleFilter: function handleFilter() {},

        column: null
      };
    },
    setSelectedKeys: function setSelectedKeys(_ref2) {
      var selectedKeys = _ref2.selectedKeys;

      this.setState({ selectedKeys: selectedKeys });
    },
    handleClearFilters: function handleClearFilters() {
      this.setState({
        selectedKeys: []
      }, this.handleConfirm);
    },
    handleConfirm: function handleConfirm() {
      this.setState({
        visible: false
      });
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setState({
        visible: visible
      });
      if (!visible) {
        this.props.confirmFilter(this.props.column, this.state.selectedKeys);
      }
    },
    renderMenuItem: function renderMenuItem(item) {
      return React.createElement(
        MenuItem,
        { key: item.value },
        React.createElement(Checkbox, { checked: this.state.selectedKeys.indexOf(item.value) >= 0 }),
        item.text
      );
    },
    renderMenus: function renderMenus(items) {
      var _this = this;

      var menuItems = items.map(function (item) {
        if (item.children && item.children.length > 0) {
          var _ret = (function () {
            var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;
            var containSelected = Object.keys(keyPathOfSelectedItem).some(function (key) {
              var keyPath = keyPathOfSelectedItem[key];
              return keyPath.indexOf(item.value) >= 0;
            });
            var subMenuCls = containSelected ? 'ant-dropdown-submenu-contain-selected' : '';
            return {
              v: React.createElement(
                SubMenu,
                { title: item.text, className: subMenuCls, key: item.value },
                item.children.map(function (child) {
                  return _this.renderMenuItem(child);
                })
              )
            };
          })();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return _this.renderMenuItem(item);
      });
      return menuItems;
    },
    handleMenuItemClick: function handleMenuItemClick(info) {
      if (info.keyPath.length <= 1) {
        return;
      }
      var keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
      if (this.state.selectedKeys.indexOf(info.key) >= 0) {
        // deselect SubMenu child
        delete keyPathOfSelectedItem[info.key];
      } else {
        // select SubMenu child
        keyPathOfSelectedItem[info.key] = info.keyPath;
      }
      this.setState({ keyPathOfSelectedItem: keyPathOfSelectedItem });
    },
    render: function render() {
      var _props = this.props;
      var column = _props.column;
      var locale = _props.locale;
      // default multiple selection in filter dropdown

      var multiple = true;
      if ('filterMultiple' in column) {
        multiple = column.filterMultiple;
      }
      var menus = React.createElement(
        'div',
        { className: 'ant-table-filter-dropdown' },
        React.createElement(
          Menu,
          { multiple: multiple,
            prefixCls: 'ant-dropdown-menu',
            onSelect: this.setSelectedKeys,
            onDeselect: this.setSelectedKeys,
            selectedKeys: this.state.selectedKeys },
          this.renderMenus(column.filters)
        ),
        React.createElement(
          'div',
          { className: 'ant-table-filter-dropdown-btns' },
          React.createElement(
            'a',
            { className: 'ant-table-filter-dropdown-link confirm',
              onClick: this.handleConfirm },
            locale.filterConfirm
          ),
          React.createElement(
            'a',
            { className: 'ant-table-filter-dropdown-link clear',
              onClick: this.handleClearFilters },
            locale.filterReset
          )
        )
      );

      var dropdownSelectedClass = '';
      if (this.props.selectedKeys.length > 0) {
        dropdownSelectedClass = 'ant-table-filter-selected';
      }

      return React.createElement(
        Dropdown,
        { trigger: ['click'],
          overlay: menus,
          visible: this.state.visible,
          onVisibleChange: this.onVisibleChange,
          closeOnSelect: false },
        React.createElement(Icon, { title: locale.filterTitle, type: 'filter', className: dropdownSelectedClass })
      );
    }
  });

  var defaultPagination = {
    pageSize: 10,
    current: 1,
    onChange: noop,
    onShowSizeChange: noop
  };

  var AntTable = React.createClass({
    displayName: 'AntTable',
    getInitialState: function getInitialState() {
      return {
        // 减少状态
        selectedRowKeys: this.props.selectedRowKeys || [],
        filters: {},
        selectionDirty: false,
        sortColumn: '',
        sortOrder: '',
        sorter: null,
        radioIndex: null,
        pagination: this.hasPagination() ? objectAssign({
          size: this.props.size
        }, defaultPagination, this.props.pagination) : {}
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        dataSource: [],
        prefixCls: 'ant-table',
        useFixedHeader: false,
        rowSelection: null,
        className: '',
        size: 'large',
        loading: false,
        bordered: false,
        indentSize: 20,
        onChange: noop,
        locale: {},
        rownumbers: false
      };
    },

    propTypes: {
      dataSource: React.PropTypes.array,
      prefixCls: React.PropTypes.string,
      useFixedHeader: React.PropTypes.bool,
      rowSelection: React.PropTypes.object,
      className: React.PropTypes.string,
      size: React.PropTypes.string,
      loading: React.PropTypes.bool,
      bordered: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      locale: React.PropTypes.object,
      rownumbers: React.PropTypes.bool
    },

    getDefaultSelection: function getDefaultSelection() {
      var _this2 = this;

      if (!this.props.rowSelection || !this.props.rowSelection.getCheckboxProps) {
        return [];
      }
      return this.getCurrentPageData().filter(function (item) {
        return _this2.props.rowSelection.getCheckboxProps(item).defaultChecked;
      }).map(function (record, rowIndex) {
        return _this2.getRecordKey(record, rowIndex);
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('pagination' in nextProps && nextProps.pagination !== false) {
        this.setState({
          pagination: objectAssign({}, this.state.pagination, nextProps.pagination)
        });
      }
      // dataSource 的变化会清空选中项
      if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
        this.setState({
          selectionDirty: false
        });
      }
      if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
        this.setState({
          selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
        });
      }
    },
    setSelectedRowKeys: function setSelectedRowKeys(selectedRowKeys) {
      if (this.props.rowSelection && !('selectedRowKeys' in this.props.rowSelection)) {
        this.setState({ selectedRowKeys: selectedRowKeys });
      }
      if (this.props.rowSelection && this.props.rowSelection.onChange) {
        this.props.rowSelection.onChange(selectedRowKeys);
      }
    },
    hasPagination: function hasPagination() {
      return this.props.pagination !== false;
    },
    toggleSortOrder: function toggleSortOrder(order, column) {
      var sortColumn = this.state.sortColumn;
      var sortOrder = this.state.sortOrder;
      var sorter = undefined;
      // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
      var isSortColumn = this.isSortColumn(column);
      if (!isSortColumn) {
        // 当前列未排序
        sortOrder = order;
        sortColumn = column;
      } else {
        // 当前列已排序
        if (sortOrder === order) {
          // 切换为未排序状态
          sortOrder = '';
          sortColumn = null;
        } else {
          // 切换为排序状态
          sortOrder = order;
        }
      }
      if (typeof column.sorter === 'function') {
        sorter = function sorter() {
          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var result = column.sorter.apply(this, args);
          if (sortOrder === 'ascend') {
            return result;
          } else if (sortOrder === 'descend') {
            return -result;
          }
        };
      }
      var newState = {
        sortOrder: sortOrder,
        sortColumn: sortColumn,
        sorter: sorter
      };
      this.setState(newState);
      this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
    },
    handleFilter: function handleFilter(column, nextFilters) {
      var _this3 = this;

      var filters = objectAssign({}, this.state.filters, _defineProperty({}, this.getColumnKey(column), nextFilters));
      // Remove filters not in current columns
      var currentColumnKeys = this.props.columns.map(function (c) {
        return _this3.getColumnKey(c);
      });
      Object.keys(filters).forEach(function (columnKey) {
        if (currentColumnKeys.indexOf(columnKey) < 0) {
          delete filters[columnKey];
        }
      });
      var newState = {
        selectionDirty: false,
        filters: filters
      };
      this.setState(newState);
      this.setSelectedRowKeys([]);
      this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
    },
    handleSelect: function handleSelect(record, rowIndex, e) {
      var _this4 = this;

      var checked = e.target.checked;
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var key = this.getRecordKey(record, rowIndex);
      if (checked) {
        selectedRowKeys.push(this.getRecordKey(record, rowIndex));
      } else {
        selectedRowKeys = selectedRowKeys.filter(function (i) {
          return key !== i;
        });
      }
      this.setState({
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelect) {
        var data = this.getCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this4.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelect(record, checked, selectedRows);
      }
    },
    handleRadioSelect: function handleRadioSelect(record, rowIndex, e) {
      var _this5 = this;

      var checked = e.target.checked;
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var key = this.getRecordKey(record, rowIndex);
      selectedRowKeys = [key];
      this.setState({
        radioIndex: key,
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelect) {
        var data = this.getCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this5.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelect(record, checked, selectedRows);
      }
    },
    handleSelectAllRow: function handleSelectAllRow(e) {
      var _this6 = this;

      var checked = e.target.checked;
      var data = this.getCurrentPageData();
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var changableRowKeys = data.filter(function (item) {
        return !_this6.props.rowSelection.getCheckboxProps || !_this6.props.rowSelection.getCheckboxProps(item).disabled;
      }).map(function (item, i) {
        return _this6.getRecordKey(item, i);
      });
      if (checked) {
        changableRowKeys.forEach(function (key) {
          if (selectedRowKeys.indexOf(key) < 0) {
            selectedRowKeys.push(key);
          }
        });
      } else {
        changableRowKeys.forEach(function (key) {
          if (selectedRowKeys.indexOf(key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
          }
        });
      }
      this.setState({
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelectAll) {
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this6.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelectAll(checked, selectedRows);
      }
    },
    handlePageChange: function handlePageChange(current) {
      var pagination = objectAssign({}, this.state.pagination);
      if (current) {
        pagination.current = current;
      } else {
        pagination.current = pagination.current || 1;
      }
      pagination.onChange(pagination.current, pagination.pageSize);

      var newState = {
        selectionDirty: false,
        pagination: pagination
      };
      this.setState(newState);
      this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
    },
    onRadioChange: function onRadioChange(ev) {
      this.setState({
        radioIndex: ev.target.value
      });
    },
    renderSelectionRadio: function renderSelectionRadio(value, record, index) {
      var rowIndex = this.getRecordKey(record, index); // 从 1 开始
      var props = {};
      if (this.props.rowSelection.getCheckboxProps) {
        props = this.props.rowSelection.getCheckboxProps.call(this, record);
      }
      var checked = undefined;
      if (this.state.selectionDirty) {
        checked = this.state.radioIndex === rowIndex;
      } else {
        checked = this.state.radioIndex === rowIndex || this.getDefaultSelection().indexOf(rowIndex) >= 0;
      }
      return React.createElement(Radio, { disabled: props.disabled,
        onChange: this.handleRadioSelect.bind(this, record, rowIndex),
        value: rowIndex, checked: checked });
    },
    renderSelectionCheckBox: function renderSelectionCheckBox(value, record, index) {
      var rowIndex = this.getRecordKey(record, index); // 从 1 开始
      var checked = undefined;
      if (this.state.selectionDirty) {
        checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
      } else {
        checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0 || this.getDefaultSelection().indexOf(rowIndex) >= 0;
      }
      var props = {};
      if (this.props.rowSelection.getCheckboxProps) {
        props = this.props.rowSelection.getCheckboxProps.call(this, record);
      }
      return React.createElement(Checkbox, { checked: checked, disabled: props.disabled,
        onChange: this.handleSelect.bind(this, record, rowIndex) });
    },
    getRecordKey: function getRecordKey(record, index) {
      if (this.props.rowKey) {
        return this.props.rowKey(record, index);
      }
      return record.key || index;
    },
    renderRowSelection: function renderRowSelection() {
      var _this7 = this;

      var columns = this.props.columns.concat();
      if (this.props.rowSelection) {
        var data = this.getCurrentPageData().filter(function (item) {
          if (_this7.props.rowSelection.getCheckboxProps) {
            return !_this7.props.rowSelection.getCheckboxProps(item).disabled;
          }
          return true;
        });
        var checked = undefined;
        if (!data.length) {
          checked = false;
        } else {
          checked = this.state.selectionDirty ? data.every(function (item, i) {
            return _this7.state.selectedRowKeys.indexOf(_this7.getRecordKey(item, i)) >= 0;
          }) : data.every(function (item, i) {
            return _this7.state.selectedRowKeys.indexOf(_this7.getRecordKey(item, i)) >= 0;
          }) || data.every(function (item) {
            return _this7.props.rowSelection.getCheckboxProps && _this7.props.rowSelection.getCheckboxProps(item).defaultChecked;
          });
        }
        var selectionColumn = undefined;
        if (this.props.rowSelection.type === 'radio') {
          selectionColumn = {
            key: 'selection-column',
            render: this.renderSelectionRadio,
            className: 'ant-table-selection-column'
          };
        } else {
          var checkboxAllDisabled = data.every(function (item) {
            return _this7.props.rowSelection.getCheckboxProps && _this7.props.rowSelection.getCheckboxProps(item).disabled;
          });
          var checkboxAll = React.createElement(Checkbox, { checked: checked,
            disabled: checkboxAllDisabled,
            onChange: this.handleSelectAllRow });
          selectionColumn = {
            key: 'selection-column',
            title: checkboxAll,
            render: this.renderSelectionCheckBox,
            className: 'ant-table-selection-column'
          };
        }
        if (columns[0] && columns[0].key === 'selection-column') {
          columns[0] = selectionColumn;
        } else {
          columns.unshift(selectionColumn);
        }
      }
      return columns;
    },
    getColumnKey: function getColumnKey(column, index) {
      return column.key || column.dataIndex || index;
    },
    isSortColumn: function isSortColumn(column) {
      if (!column || !this.state.sortColumn) {
        return false;
      }
      var colKey = this.getColumnKey(column);
      var isSortColumn = this.getColumnKey(this.state.sortColumn) === colKey;
      return isSortColumn;
    },
    renderColumnsDropdown: function renderColumnsDropdown(columns) {
      var _this8 = this;

      var locale = objectAssign({}, defaultLocale, this.props.locale);
      return columns.map(function (originColumn, i) {
        var column = objectAssign({}, originColumn);
        var key = _this8.getColumnKey(column, i);
        var filterDropdown = undefined;
        var sortButton = undefined;
        if (column.filters && column.filters.length > 0) {
          var colFilters = _this8.state.filters[key] || [];
          filterDropdown = React.createElement(FilterDropdown, { locale: locale, column: column,
            selectedKeys: colFilters,
            confirmFilter: _this8.handleFilter });
        }
        if (column.sorter) {
          var isSortColumn = _this8.isSortColumn(column);
          if (isSortColumn) {
            column.className = column.className || '';
            if (_this8.state.sortOrder) {
              column.className += ' ant-table-column-sort';
            }
          }
          var isAscend = isSortColumn && _this8.state.sortOrder === 'ascend';
          var isDescend = isSortColumn && _this8.state.sortOrder === 'descend';
          sortButton = React.createElement(
            'div',
            { className: 'ant-table-column-sorter' },
            React.createElement(
              'span',
              { className: 'ant-table-column-sorter-up ' + (isAscend ? 'on' : 'off'),
                title: '↑',
                onClick: _this8.toggleSortOrder.bind(_this8, 'ascend', column) },
              React.createElement(Icon, { type: 'caret-up' })
            ),
            React.createElement(
              'span',
              { className: 'ant-table-column-sorter-down ' + (isDescend ? 'on' : 'off'),
                title: '↓',
                onClick: _this8.toggleSortOrder.bind(_this8, 'descend', column) },
              React.createElement(Icon, { type: 'caret-down' })
            )
          );
        }
        column.title = React.createElement(
          'span',
          null,
          column.title,
          sortButton,
          filterDropdown
        );
        return column;
      });
    },
    handleShowSizeChange: function handleShowSizeChange(current, pageSize) {
      var pagination = this.state.pagination;
      pagination.onShowSizeChange(current, pageSize);

      var nextPagination = objectAssign(pagination, {
        pageSize: pageSize
      });
      this.setState({ pagination: nextPagination });
    },
    renderPagination: function renderPagination() {
      // 强制不需要分页
      if (!this.hasPagination()) {
        return null;
      }
      var classString = classNames({
        'ant-table-pagination': true,
        mini: this.props.size === 'middle' || this.props.size === 'small'
      });
      var total = this.state.pagination.total || this.getLocalData().length;
      var pageSize = this.state.pagination.pageSize;
      return total > 0 ? React.createElement(Pagination, _extends({}, this.state.pagination, {
        className: classString,
        onChange: this.handlePageChange,
        total: total,
        pageSize: pageSize,
        onShowSizeChange: this.handleShowSizeChange })) : null;
    },
    prepareParamsArguments: function prepareParamsArguments(state) {
      // 准备筛选、排序、分页的参数
      var pagination = state.pagination;
      var filters = state.filters;
      var sorter = {};
      if (state.sortColumn && state.sortOrder && state.sortColumn.dataIndex) {
        sorter.field = state.sortColumn.dataIndex;
        sorter.order = state.sortOrder;
      }
      return [pagination, filters, sorter];
    },
    findColumn: function findColumn(myKey) {
      var _this9 = this;

      return this.props.columns.filter(function (c) {
        return _this9.getColumnKey(c) === myKey;
      })[0];
    },
    getCurrentPageData: function getCurrentPageData(dataSource) {
      var data = this.getLocalData(dataSource);
      var current = undefined;
      var pageSize = undefined;
      var state = this.state;
      // 如果没有分页的话，默认全部展示
      if (!this.hasPagination()) {
        pageSize = Number.MAX_VALUE;
        current = 1;
      } else {
        pageSize = state.pagination.pageSize;
        current = state.pagination.current;
      }
      // 分页
      // ---
      // 当数据量少于每页数量时，直接设置数据
      // 否则进行读取分页数据
      if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
        data = data.filter(function (item, i) {
          return i >= (current - 1) * pageSize && i < current * pageSize;
        });
      }
      return data;
    },
    getLocalData: function getLocalData(dataSource) {
      var _this10 = this;

      var state = this.state;
      var data = dataSource || this.props.dataSource;
      // 排序
      if (state.sortOrder && state.sorter) {
        data = data.sort(state.sorter);
      }
      // 筛选
      if (state.filters) {
        Object.keys(state.filters).forEach(function (columnKey) {
          var col = _this10.findColumn(columnKey);
          if (!col) {
            return;
          }
          var values = state.filters[columnKey] || [];
          if (values.length === 0) {
            return;
          }
          data = col.onFilter ? data.filter(function (record) {
            return values.some(function (v) {
              return col.onFilter(v, record);
            });
          }) : data;
        });
      }
      return data;
    },
    render: function render() {
      var _classNames;

      var data = this.getCurrentPageData();
      var columns = this.renderRowSelection();

      if (this.props.rownumbers) {
        columns.unshift(rownumberColumn);
      }

      var expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
      var locale = objectAssign({}, defaultLocale, this.props.locale);

      var classString = classNames((_classNames = {}, _defineProperty(_classNames, 'ant-table-' + this.props.size, true), _defineProperty(_classNames, 'ant-table-bordered', this.props.bordered), _defineProperty(_classNames, this.props.className, !!this.props.className), _classNames));

      columns = this.renderColumnsDropdown(columns);
      columns = columns.map(function (column, i) {
        var newColumn = objectAssign({}, column);
        newColumn.key = newColumn.key || newColumn.dataIndex || i;
        return newColumn;
      });
      var emptyText = undefined;
      var emptyClass = '';
      if (!data || data.length === 0) {
        emptyText = React.createElement(
          'div',
          { className: 'ant-table-placeholder' },
          React.createElement(Icon, { type: 'frown' }),
          locale.emptyText
        );
        emptyClass = ' ant-table-empty';
      }

      var table = React.createElement(
        'div',
        null,
        React.createElement(Table, _extends({}, this.props, {
          data: data,
          columns: columns,
          className: classString,
          expandIconColumnIndex: columns[0].key === 'selection-column' ? 1 : 0,
          expandIconAsCell: expandIconAsCell })),
        emptyText
      );
      if (this.props.loading) {
        // if there is no pagination or no data,
        // the height of spin should decrease by half of pagination
        var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? 'ant-table-with-pagination' : 'ant-table-without-pagination';
        var spinClassName = paginationPatchClass + ' ant-table-spin-holder';
        table = React.createElement(
          Spin,
          { className: spinClassName },
          table
        );
      }
      return React.createElement(
        'div',
        { className: 'clearfix' + emptyClass },
        table,
        this.renderPagination()
      );
    }
  });

  UI.Table = AntTable;
})(Smart.UI, Smart.RC);