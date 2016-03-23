'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var classNames = RC.classNames;
  var Animate = RC.Animate;
  var Icon = UI.Icon;
  var Button = UI.Button;
  var Checkbox = UI.Checkbox;
  var _React = React;
  var Component = _React.Component;
  var PropTypes = _React.PropTypes;

  var Operation = React.createClass({
    displayName: 'Operation',

    propTypes: {
      className: PropTypes.string,
      leftArrowText: PropTypes.string,
      rightArrowText: PropTypes.string,
      moveToLeft: PropTypes.func,
      moveToRight: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        leftArrowText: '',
        rightArrowText: '',
        moveToLeft: noop,
        moveToRight: noop
      };
    },
    render: function render() {
      var _props = this.props;
      var moveToLeft = _props.moveToLeft;
      var moveToRight = _props.moveToRight;
      var leftArrowText = _props.leftArrowText;
      var rightArrowText = _props.rightArrowText;
      var leftActive = _props.leftActive;
      var rightActive = _props.rightActive;
      var className = _props.className;

      var moveToLeftButton = React.createElement(
        Button,
        { type: 'primary', size: 'small', disabled: !leftActive, onClick: moveToLeft },
        React.createElement(
          'span',
          null,
          React.createElement(Icon, { type: 'left' }),
          leftArrowText
        )
      );
      var moveToRightButton = React.createElement(
        Button,
        { type: 'primary', size: 'small', disabled: !rightActive, onClick: moveToRight },
        React.createElement(
          'span',
          null,
          rightArrowText,
          React.createElement(Icon, { type: 'right' })
        )
      );
      return React.createElement(
        'div',
        { className: className },
        moveToLeftButton,
        moveToRightButton
      );
    }
  });

  var Search = React.createClass({
    displayName: 'Search',

    propTypes: {
      prefixCls: PropTypes.string,
      placeholder: PropTypes.string,
      onChange: PropTypes.func,
      handleClear: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        placeholder: '',
        onChange: noop,
        handleClear: noop
      };
    },
    handleChange: function handleChange(e) {
      this.props.onChange(e);
    },

    handleClear: function handleClear(e) {
      e.preventDefault();
      this.props.handleClear(e);
    },

    render: function render() {
      var _props2 = this.props;
      var placeholder = _props2.placeholder;
      var value = _props2.value;
      var prefixCls = _props2.prefixCls;

      return React.createElement(
        'div',
        null,
        React.createElement('input', { placeholder: placeholder, className: prefixCls + ' ant-input', value: value, ref: 'input',
          onChange: this.handleChange }),
        value && value.length > 0 ? React.createElement(
          'a',
          { href: '#', className: prefixCls + '-action', onClick: this.handleClear },
          React.createElement(Icon, { type: 'cross-circle' })
        ) : React.createElement(
          'span',
          { className: prefixCls + '-action' },
          React.createElement(Icon, { type: 'search' })
        )
      );
    }
  });

  var List = React.createClass({
    displayName: 'List',

    /*constructor(props) {
      super(props);
      this.state = {
        mounted: false,
      };
    }*/

    propTypes: {
      prefixCls: PropTypes.string,
      dataSource: PropTypes.array,
      showSearch: PropTypes.bool,
      searchPlaceholder: PropTypes.string,
      titleText: PropTypes.string,
      style: PropTypes.object,
      handleFilter: PropTypes.func,
      handleSelect: PropTypes.func,
      handleSelectAll: PropTypes.func,
      render: PropTypes.func,
      body: PropTypes.func,
      footer: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        dataSource: [],
        titleText: '',
        showSearch: false,
        searchPlaceholder: '',
        handleFilter: noop,
        handleSelect: noop,
        handleSelectAll: noop,
        render: noop,
        // advanced
        body: noop,
        footer: noop
      };
    },
    getInitialState: function getInitialState() {
      return {
        mounted: false
      };
    },
    componentDidMount: function componentDidMount() {
      var _this = this;

      setTimeout(function () {
        _this.setState({
          mounted: true
        });
      }, 0);
    },

    handleSelectALl: function handleSelectALl() {
      this.props.handleSelectAll();
    },

    handleSelect: function handleSelect(selectedItem) {
      var checkedKeys = this.props.checkedKeys;

      var result = checkedKeys.some(function (key) {
        return key === selectedItem.key;
      });
      this.props.handleSelect(selectedItem, !result);
    },

    handleFilter: function handleFilter(e) {
      this.props.handleFilter(e);
    },

    handleClear: function handleClear() {
      this.props.handleClear();
    },

    renderCheckbox: function renderCheckbox(props) {
      var _classNames;

      var prefixCls = props.prefixCls;

      var checkboxCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-checkbox', true), _defineProperty(_classNames, prefixCls + '-checkbox-indeterminate', props.checkPart), _defineProperty(_classNames, prefixCls + '-checkbox-checked', !props.checkPart && props.checked), _defineProperty(_classNames, prefixCls + '-checkbox-disabled', !!props.disabled), _classNames));
      var customEle = null;
      if (typeof props.checkable !== 'boolean') {
        customEle = props.checkable;
      }
      return React.createElement(
        'span',
        { ref: 'checkbox',
          className: checkboxCls,
          onClick: !props.disabled && this.handleSelectALl },
        customEle
      );
    },

    matchFilter: function matchFilter(text, filterText) {
      var regex = new RegExp(filterText);
      return text.match(regex);
    },

    render: function render() {
      var _classNames2,
          _this2 = this;

      var _props3 = this.props;
      var prefixCls = _props3.prefixCls;
      var dataSource = _props3.dataSource;
      var titleText = _props3.titleText;
      var filter = _props3.filter;
      var checkedKeys = _props3.checkedKeys;
      var notFoundContent = _props3.notFoundContent;
      var checkStatus = _props3.checkStatus;
      var body = _props3.body;
      var footer = _props3.footer;
      var showSearch = _props3.showSearch;
      var searchPlaceholder = _props3.searchPlaceholder;

      // Custom Layout

      var footerDom = footer(_extends({}, this.props));
      var bodyDom = body(_extends({}, this.props));

      var listCls = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls, true), _defineProperty(_classNames2, prefixCls + '-with-footer', !!footerDom), _classNames2));

      var showItems = dataSource.filter(function (item) {
        var itemText = _this2.props.render(item);
        var filterResult = _this2.matchFilter(itemText, filter);
        return !!filterResult;
      }).map(function (item) {
        var renderedText = _this2.props.render(item);
        return React.createElement(
          'li',
          { onClick: _this2.handleSelect.bind(_this2, item), key: item.key, title: renderedText },
          React.createElement(Checkbox, { checked: checkedKeys.some(function (key) {
              return key === item.key;
            }) }),
          renderedText
        );
      });

      return React.createElement(
        'div',
        _extends({ className: listCls }, this.props),
        React.createElement(
          'div',
          { className: prefixCls + '-header' },
          this.renderCheckbox({
            prefixCls: 'ant-transfer',
            checked: checkStatus === 'all',
            checkPart: checkStatus === 'part',
            checkable: React.createElement('span', { className: 'ant-transfer-checkbox-inner' })
          }),
          React.createElement(
            'span',
            { className: prefixCls + '-header-selected' },
            React.createElement(
              'span',
              null,
              (checkedKeys.length > 0 ? checkedKeys.length + '/' : '') + dataSource.length,
              ' 条'
            ),
            React.createElement(
              'span',
              { className: prefixCls + '-header-title' },
              titleText
            )
          )
        ),
        bodyDom || React.createElement(
          'div',
          { className: showSearch ? prefixCls + '-body ' + prefixCls + '-body-with-search' : prefixCls + '-body' },
          showSearch ? React.createElement(
            'div',
            { className: prefixCls + '-body-search-wrapper' },
            React.createElement(Search, { prefixCls: prefixCls + '-search',
              onChange: this.handleFilter.bind(this),
              handleClear: this.handleClear.bind(this),
              placeholder: searchPlaceholder,
              value: filter })
          ) : null,
          React.createElement(
            Animate,
            { component: 'ul',
              transitionName: this.state.mounted ? prefixCls + '-highlight' : '',
              transitionLeave: false },
            showItems.length > 0 ? showItems : React.createElement(
              'div',
              { className: prefixCls + '-body-not-found' },
              notFoundContent
            )
          )
        ),
        footerDom ? React.createElement(
          'div',
          { className: prefixCls + '-footer' },
          footerDom
        ) : null
      );
    }
  });

  var Transfer = React.createClass({
    displayName: 'Transfer',

    /*constructor(props) {
      super(props);
        this.state = {
        leftFilter: '',
        rightFilter: '',
        leftCheckedKeys: [],
        rightCheckedKeys: [],
      };
    }*/

    propTypes: {
      prefixCls: PropTypes.string,
      dataSource: PropTypes.array,
      render: PropTypes.func,
      targetKeys: PropTypes.array,
      onChange: PropTypes.func,
      height: PropTypes.number,
      listStyle: PropTypes.object,
      className: PropTypes.string,
      titles: PropTypes.array,
      operations: PropTypes.array,
      showSearch: PropTypes.bool,
      searchPlaceholder: PropTypes.string,
      notFoundContent: PropTypes.node,
      body: PropTypes.func,
      footer: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-transfer',
        dataSource: [],
        render: noop,
        targetKeys: [],
        onChange: noop,
        titles: ['源列表', '目的列表'],
        operations: [],
        showSearch: false,
        searchPlaceholder: '请输入搜索内容',
        notFoundContent: 'Not Found',
        body: noop,
        footer: noop
      };
    },
    getInitialState: function getInitialState() {
      return {
        leftFilter: '',
        rightFilter: '',
        leftCheckedKeys: [],
        rightCheckedKeys: []
      };
    },

    splitDataSource: function splitDataSource() {
      var _props4 = this.props;
      var targetKeys = _props4.targetKeys;
      var dataSource = _props4.dataSource;

      var leftDataSource = [].concat(_toConsumableArray(dataSource));
      var rightDataSource = [];

      if (targetKeys.length > 0) {
        targetKeys.forEach(function (targetKey) {
          rightDataSource.push(leftDataSource.filter(function (data, index) {
            if (data.key === targetKey) {
              leftDataSource.splice(index, 1);
              return true;
            }
            return false;
          })[0]);
        });
      }

      return {
        leftDataSource: leftDataSource,
        rightDataSource: rightDataSource
      };
    },

    moveTo: function moveTo(direction) {
      var targetKeys = this.props.targetKeys;
      var _state = this.state;
      var leftCheckedKeys = _state.leftCheckedKeys;
      var rightCheckedKeys = _state.rightCheckedKeys;

      var moveKeys = direction === 'right' ? leftCheckedKeys : rightCheckedKeys;
      // move items to target box
      var newTargetKeys = direction === 'right' ? moveKeys.concat(targetKeys) : targetKeys.filter(function (targetKey) {
        return !moveKeys.some(function (checkedKey) {
          return targetKey === checkedKey;
        });
      });

      // empty checked keys
      this.setState(_defineProperty({}, direction === 'right' ? 'leftCheckedKeys' : 'rightCheckedKeys', []));

      this.props.onChange(newTargetKeys, direction, moveKeys);
    },

    getGlobalCheckStatus: function getGlobalCheckStatus(direction) {
      var _splitDataSource = this.splitDataSource();

      var leftDataSource = _splitDataSource.leftDataSource;
      var rightDataSource = _splitDataSource.rightDataSource;
      var _state2 = this.state;
      var leftFilter = _state2.leftFilter;
      var rightFilter = _state2.rightFilter;
      var leftCheckedKeys = _state2.leftCheckedKeys;
      var rightCheckedKeys = _state2.rightCheckedKeys;

      var dataSource = direction === 'left' ? leftDataSource : rightDataSource;
      var filter = direction === 'left' ? leftFilter : rightFilter;
      var checkedKeys = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
      var filteredDataSource = this.filterDataSource(dataSource, filter);

      var globalCheckStatus = undefined;

      if (checkedKeys.length > 0) {
        if (checkedKeys.length < filteredDataSource.length) {
          globalCheckStatus = 'part';
        } else {
          globalCheckStatus = 'all';
        }
      } else {
        globalCheckStatus = 'none';
      }
      return globalCheckStatus;
    },

    filterDataSource: function filterDataSource(dataSource, filter) {
      var _this3 = this;

      return dataSource.filter(function (item) {
        var itemText = _this3.props.render(item);
        return _this3.matchFilter(itemText, filter);
      });
    },

    matchFilter: function matchFilter(text, filterText) {
      var regex = new RegExp(filterText);
      return text.match(regex);
    },

    handleSelectAll: function handleSelectAll(direction) {
      var _splitDataSource2 = this.splitDataSource();

      var leftDataSource = _splitDataSource2.leftDataSource;
      var rightDataSource = _splitDataSource2.rightDataSource;
      var _state3 = this.state;
      var leftFilter = _state3.leftFilter;
      var rightFilter = _state3.rightFilter;

      var dataSource = direction === 'left' ? leftDataSource : rightDataSource;
      var filter = direction === 'left' ? leftFilter : rightFilter;
      var checkStatus = this.getGlobalCheckStatus(direction);
      var holder = checkStatus === 'all' ? [] : this.filterDataSource(dataSource, filter).map(function (item) {
        return item.key;
      });

      this.setState(_defineProperty({}, direction + 'CheckedKeys', holder));
    },

    handleFilter: function handleFilter(direction, e) {
      var _setState3;

      this.setState((_setState3 = {}, _defineProperty(_setState3, direction + 'CheckedKeys', []), _defineProperty(_setState3, direction + 'Filter', e.target.value), _setState3));
    },

    handleClear: function handleClear(direction) {
      this.setState(_defineProperty({}, direction + 'Filter', ''));
    },

    handleSelect: function handleSelect(direction, selectedItem, checked) {
      var _state4 = this.state;
      var leftCheckedKeys = _state4.leftCheckedKeys;
      var rightCheckedKeys = _state4.rightCheckedKeys;

      var holder = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
      var index = undefined;
      holder.forEach(function (key, i) {
        if (key === selectedItem.key) {
          index = i;
        }
      });
      if (index > -1) {
        holder.splice(index, 1);
      }
      if (checked) {
        holder.push(selectedItem.key);
      }
      this.setState(_defineProperty({}, direction + 'CheckedKeys', holder));
    },

    render: function render() {
      var _classNames3;

      var _props5 = this.props;
      var prefixCls = _props5.prefixCls;
      var titles = _props5.titles;
      var operations = _props5.operations;
      var showSearch = _props5.showSearch;
      var notFoundContent = _props5.notFoundContent;
      var searchPlaceholder = _props5.searchPlaceholder;
      var body = _props5.body;
      var footer = _props5.footer;
      var listStyle = _props5.listStyle;
      var className = _props5.className;
      var _state5 = this.state;
      var leftFilter = _state5.leftFilter;
      var rightFilter = _state5.rightFilter;
      var leftCheckedKeys = _state5.leftCheckedKeys;
      var rightCheckedKeys = _state5.rightCheckedKeys;

      var _splitDataSource3 = this.splitDataSource();

      var leftDataSource = _splitDataSource3.leftDataSource;
      var rightDataSource = _splitDataSource3.rightDataSource;

      var leftActive = rightCheckedKeys.length > 0;
      var rightActive = leftCheckedKeys.length > 0;

      var leftCheckStatus = this.getGlobalCheckStatus('left');
      var rightCheckStatus = this.getGlobalCheckStatus('right');

      var cls = classNames((_classNames3 = {}, _defineProperty(_classNames3, className, !!className), _defineProperty(_classNames3, 'prefixCls', true), _classNames3));

      return React.createElement(
        'div',
        { className: cls },
        React.createElement(List, { titleText: titles[0],
          dataSource: leftDataSource,
          filter: leftFilter,
          style: listStyle,
          checkedKeys: leftCheckedKeys,
          checkStatus: leftCheckStatus,
          handleFilter: this.handleFilter.bind(this, 'left'),
          handleClear: this.handleClear.bind(this, 'left'),
          handleSelect: this.handleSelect.bind(this, 'left'),
          handleSelectAll: this.handleSelectAll.bind(this, 'left'),
          position: 'left',
          render: this.props.render,
          showSearch: showSearch,
          searchPlaceholder: searchPlaceholder,
          notFoundContent: notFoundContent,
          body: body,
          footer: footer,
          prefixCls: prefixCls + '-list' }),
        React.createElement(Operation, { rightActive: rightActive,
          rightArrowText: operations[0],
          moveToRight: this.moveTo.bind(this, 'right'),
          leftActive: leftActive,
          leftArrowText: operations[1],
          moveToLeft: this.moveTo.bind(this, 'left'),
          className: prefixCls + '-operation' }),
        React.createElement(List, { titleText: titles[1],
          dataSource: rightDataSource,
          filter: rightFilter,
          style: listStyle,
          checkedKeys: rightCheckedKeys,
          checkStatus: rightCheckStatus,
          handleFilter: this.handleFilter.bind(this, 'right'),
          handleClear: this.handleClear.bind(this, 'right'),
          handleSelect: this.handleSelect.bind(this, 'right'),
          handleSelectAll: this.handleSelectAll.bind(this, 'right'),
          position: 'right',
          render: this.props.render,
          showSearch: showSearch,
          searchPlaceholder: searchPlaceholder,
          notFoundContent: notFoundContent,
          body: body,
          footer: footer,
          prefixCls: prefixCls + '-list' })
      );
    }
  });

  Transfer.List = List;
  Transfer.Operation = Operation;
  Transfer.Search = Search;

  UI.Transfer = Transfer;
})(Smart.UI, Smart.RC);