+(function(UI,RC) {
	 const {noop} = _,
    {classNames,Animate} = RC,
    {Icon,Button,Checkbox} = UI,
    {Component, PropTypes} = React;


  const Operation = React.createClass({
    propTypes: {
      className: PropTypes.string,
      leftArrowText: PropTypes.string,
      rightArrowText: PropTypes.string,
      moveToLeft: PropTypes.func,
      moveToRight: PropTypes.func,
    },
    getDefaultProps: function() {
      return {
        leftArrowText: '',
        rightArrowText: '',
        moveToLeft: noop,
        moveToRight: noop,
      }
    },
    render: function() {
      const {
        moveToLeft,
        moveToRight,
        leftArrowText,
        rightArrowText,
        leftActive,
        rightActive,
        className,
      } = this.props;

      const moveToLeftButton = (
        <Button type="primary" size="small" disabled={!leftActive} onClick={moveToLeft}>
          {<span><Icon type="left" />{leftArrowText}</span>}
        </Button>
      );
      const moveToRightButton = (
        <Button type="primary" size="small" disabled={!rightActive} onClick={moveToRight}>
          {<span>{rightArrowText}<Icon type="right" /></span>}
        </Button>
      );
      return (
        <div className={className}>
          {moveToLeftButton}
          {moveToRightButton}
        </div>
      );
    }
  });



  const Search  = React.createClass({
    /*constructor(props) {
      super(props);
    }*/
    propTypes: {
      prefixCls: PropTypes.string,
      placeholder: PropTypes.string,
      onChange: PropTypes.func,
      handleClear: PropTypes.func,
    },
    getDefaultProps: function() {
      return {
        placeholder: '请输入搜索内容',
        onChange: noop,
        handleClear: noop,
      }
    },
    handleChange: function(e) {
      this.props.onChange(e);
    },

    handleClear: function(e) {
      e.preventDefault();
      this.props.handleClear(e);
    },

    render: function() {
      const { placeholder, value, prefixCls } = this.props;
      return (
        <div>
          <input placeholder={placeholder} className={`${prefixCls} ant-input`} value={ value } ref="input"
            onChange={this.handleChange}/>
          { value && value.length > 0 ?
            <a href="#" className={`${prefixCls}-action`} onClick={this.handleClear}>
              <Icon type="cross-circle" />
            </a>
            : <span className={`${prefixCls}-action`}><Icon type="search" /></span>
          }
        </div>
      );
    }
  });


  const List = React.createClass({
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
      footer: PropTypes.func,
    },
    getDefaultProps: function() {
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
        footer: noop,
      }
    },
    getInitialState: function() {
      return {
        mounted: false,
      }
    },
    componentDidMount: function() {
      setTimeout(() => {
        this.setState({
          mounted: true,
        });
      }, 0);
    },

    handleSelectALl: function() {
      this.props.handleSelectAll();
    },

    handleSelect: function(selectedItem) {
      const { checkedKeys } = this.props;
      const result = checkedKeys.some((key) => key === selectedItem.key);
      this.props.handleSelect(selectedItem, !result);
    },

    handleFilter: function(e) {
      this.props.handleFilter(e);
    },

    handleClear: function() {
      this.props.handleClear();
    },

    renderCheckbox: function(props) {
      const { prefixCls } = props;
      const checkboxCls = classNames({
        [`${prefixCls}-checkbox`]: true,
        [`${prefixCls}-checkbox-indeterminate`]: props.checkPart,
        [`${prefixCls}-checkbox-checked`]: (!props.checkPart) && props.checked,
        [`${prefixCls}-checkbox-disabled`]: !!props.disabled,
      });
      let customEle = null;
      if (typeof props.checkable !== 'boolean') {
        customEle = props.checkable;
      }
      return (
        <span ref="checkbox"
          className={checkboxCls}
          onClick={(!props.disabled) && this.handleSelectALl}>
          {customEle}
        </span>
      );
    },

    matchFilter: function(text, filterText) {
      const regex = new RegExp(filterText);
      return text.match(regex);
    },

    render: function() {
      const { prefixCls, dataSource, titleText, filter, checkedKeys,
              checkStatus, body, footer, showSearch } = this.props;

      // Custom Layout
      const footerDom = footer({ ...this.props });
      const bodyDom = body({ ...this.props });

      const listCls = classNames({
        [prefixCls]: true,
        [`${prefixCls}-with-footer`]: !!footerDom,
      });

      const showItems = dataSource.map((item) => {
        // apply filter
        const itemText = this.props.render(item);
        const filterResult = this.matchFilter(itemText, filter);
        const renderedText = this.props.render(item);

        if (filterResult) {
          return (
            <li onClick={this.handleSelect.bind(this, item)} key={item.key} title={renderedText}>
              <Checkbox checked={checkedKeys.some(key => key === item.key)} />
              {renderedText}
            </li>
          );
        }
      }).filter(item => !!item);

      return (
        <div className={listCls} {...this.props}>
          <div className={`${prefixCls}-header`}>
            {this.renderCheckbox({
              prefixCls: 'ant-transfer',
              checked: checkStatus === 'all',
              checkPart: checkStatus === 'part',
              checkable: <span className={`ant-transfer-checkbox-inner`}></span>
            })}<span className={`${prefixCls}-header-selected`}><span>{(checkedKeys.length > 0 ? checkedKeys.length + '/' : '') + dataSource.length} 条</span>
            <span className={`${prefixCls}-header-title`}>{titleText}</span></span>
          </div>
          { bodyDom ||
          <div className={ showSearch ? `${prefixCls}-body ${prefixCls}-body-with-search` : `${prefixCls}-body`}>
            { showSearch ? <div className={`${prefixCls}-body-search-wrapper`}>
              <Search prefixCls={`${prefixCls}-search`} onChange={this.handleFilter} handleClear={this.handleClear} value={filter} />
            </div> : null }
            <Animate component="ul"
              transitionName={this.state.mounted ? `${prefixCls}-highlight` : ''}
              transitionLeave={false}>
              {showItems.length > 0 ? showItems : <div className={`${prefixCls}-body-not-found`}>Not Found</div>}
            </Animate>
          </div>}
          { footerDom ? <div className={`${prefixCls}-footer`}>
            { footerDom }
          </div> : null }
        </div>
      );
    }
  });

  const Transfer = React.createClass({
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
      body: PropTypes.func,
      footer: PropTypes.func,
    },
    getDefaultProps: function() {
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
        body: noop,
        footer: noop,
      }
    },
    getInitialState: function(){
      return {
        leftFilter: '',
        rightFilter: '',
        leftCheckedKeys: [],
        rightCheckedKeys: [],
      }
    },

    splitDataSource: function() {
      const { targetKeys, dataSource } = this.props;

      let leftDataSource = Object.assign([], dataSource);
      let rightDataSource = [];

      if (targetKeys.length > 0) {
        targetKeys.forEach((targetKey) => {
          rightDataSource.push(leftDataSource.filter((data, index) => {
            if (data.key === targetKey) {
              leftDataSource.splice(index, 1);
              return true;
            }
          })[0]);
        });
      }

      return {
        leftDataSource,
        rightDataSource,
      };
    },

    moveTo: function(direction) {
      const { targetKeys } = this.props;
      const { leftCheckedKeys, rightCheckedKeys } = this.state;
      const moveKeys = direction === 'right' ? leftCheckedKeys : rightCheckedKeys;
      // move items to target box
      const newTargetKeys = direction === 'right'
        ? moveKeys.concat(targetKeys)
        : targetKeys.filter(targetKey => !moveKeys.some(checkedKey => targetKey === checkedKey));

      // empty checked keys
      this.setState({
        [direction === 'right' ? 'leftCheckedKeys' : 'rightCheckedKeys']: [],
      });

      this.props.onChange(newTargetKeys, direction, moveKeys);
    },

    getGlobalCheckStatus: function(direction) {
      const { leftDataSource, rightDataSource } = this.splitDataSource();
      const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

      const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
      const filter = direction === 'left' ? leftFilter : rightFilter;
      const checkedKeys = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
      const filteredDataSource = this.filterDataSource(dataSource, filter);

      let globalCheckStatus;

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

    filterDataSource: function(dataSource, filter) {
      return dataSource.filter(item => {
        const itemText = this.props.render(item);
        return this.matchFilter(itemText, filter);
      });
    },

    matchFilter: function(text, filterText) {
      const regex = new RegExp(filterText);
      return text.match(regex);
    },

    handleSelectAll: function(direction) {
      const { leftDataSource, rightDataSource } = this.splitDataSource();
      const { leftFilter, rightFilter } = this.state;
      const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
      const filter = direction === 'left' ? leftFilter : rightFilter;
      const checkStatus = this.getGlobalCheckStatus(direction);
      const holder = (checkStatus === 'all') ? [] :
        this.filterDataSource(dataSource, filter).map(item => item.key);

      this.setState({
        [`${direction}CheckedKeys`]: holder,
      });
    },

    handleFilter: function(direction, e) {
      this.setState({
        // deselect all
        [`${direction}CheckedKeys`]: [],
        // add filter
        [`${direction}Filter`]: e.target.value,
      });
    },

    handleClear: function(direction) {
      this.setState({
        [`${direction}Filter`]: '',
      });
    },

    handleSelect: function(direction, selectedItem, checked) {
      const { leftCheckedKeys, rightCheckedKeys } = this.state;
      const holder = direction === 'left' ? leftCheckedKeys : rightCheckedKeys;
      let index;
      holder.forEach((key, i) => {
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
      this.setState({
        [`${direction}CheckedKeys`]: holder,
      });
    },

    render: function() {
      const {
        prefixCls, titles, operations, showSearch,
        searchPlaceholder, body, footer, listStyle, className,
      } = this.props;
      const { leftFilter, rightFilter, leftCheckedKeys, rightCheckedKeys } = this.state;

      const { leftDataSource, rightDataSource } = this.splitDataSource();
      const leftActive = rightCheckedKeys.length > 0;
      const rightActive = leftCheckedKeys.length > 0;

      const leftCheckStatus = this.getGlobalCheckStatus('left');
      const rightCheckStatus = this.getGlobalCheckStatus('right');

      const cls = classNames({
        [className]: !!className,
        prefixCls: true,
      });

      return (
        <div className={cls}>
          <List titleText={titles[0]}
            dataSource={leftDataSource}
            filter={leftFilter}
            style={listStyle}
            checkedKeys={leftCheckedKeys}
            checkStatus={leftCheckStatus}
            handleFilter={this.handleFilter.bind(this, 'left')}
            handleClear={this.handleClear.bind(this, 'left')}
            handleSelect={this.handleSelect.bind(this, 'left')}
            handleSelectAll={this.handleSelectAll.bind(this, 'left')}
            position="left"
            render={this.props.render}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            body={body}
            footer={footer}
            prefixCls={`${prefixCls}-list`}/>
          <Operation rightActive={rightActive}
            rightArrowText={operations[0]}
            moveToRight={this.moveTo.bind(this, 'right')}
            leftActive={leftActive}
            leftArrowText={operations[1]}
            moveToLeft={this.moveTo.bind(this, 'left')}
            className={`${prefixCls}-operation`}/>
          <List titleText={titles[1]}
            dataSource={rightDataSource}
            filter={rightFilter}
            style={listStyle}
            checkedKeys={rightCheckedKeys}
            checkStatus={rightCheckStatus}
            handleFilter={this.handleFilter.bind(this, 'right')}
            handleClear={this.handleClear.bind(this, 'right')}
            handleSelect={this.handleSelect.bind(this, 'right')}
            handleSelectAll={this.handleSelectAll.bind(this, 'right')}
            position="right"
            render={this.props.render}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            body={body}
            footer={footer}
            prefixCls={`${prefixCls}-list`}/>
        </div>
      );
    }
  });


  Transfer.List = List;
  Transfer.Operation =Operation;
  Transfer.Search = Search;

  UI.Transfer = Transfer;
	
})(Smart.UI,Smart.RC);

