+ function(RC) {
	const KEYCODE = RC.KeyCode,
		LOCALE = RC.locale.pagination,
		{noop} = _;

	class Pager extends React.Component {
	  render() {
	    const props = this.props;
	    const locale = props.locale;
	    const prefixCls = `${props.rootPrefixCls}-item`;
	    let cls = `${prefixCls} ${prefixCls}-${props.page}`;

	    if (props.active) {
	      cls = `${cls} ${prefixCls}-active`;
	    }

	    let title;
	    if (props.page === 1) {
	      title = locale.first_page;
	    } else if (props.last) {
	      title = (locale.last_page + ': ' + props.page);
	    } else {
	      title = (props.page);
	    }
	    return (
	      <li title={title} className={cls} onClick={props.onClick}>
	        <a>{props.page}</a>
	      </li>
	    );
	  }
	}

	Pager.propTypes = {
	  page: React.PropTypes.number,
	  active: React.PropTypes.bool,
	  last: React.PropTypes.bool,
	  locale: React.PropTypes.object,
	}; 



	class Options extends React.Component {
	  constructor(props) {
	    super(props);

	    this.state = {
	      current: props.current,
	      _current: props.current,
	    };

	    ['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach((method) => this[method] = this[method].bind(this));
	  }
	  _buildOptionText(value) {
	    return `${value} ${this.props.locale.items_per_page}`;
	  }

	  _changeSize(value) {
	    this.props.changeSize(Number(value));
	  }

	  _handleChange(evt) {
	    const _val = evt.target.value;

	    this.setState({
	      _current: _val,
	    });
	  }

	  _go(e) {
	    const _val = e.target.value;
	    if (_val === '') {
	      return;
	    }
	    let val = Number(this.state._current);
	    if (isNaN(val)) {
	      val = this.state.current;
	    }
	    if (e.keyCode === KEYCODE.ENTER) {
	      const c = this.props.quickGo(val);
	      this.setState({
	        _current: c,
	        current: c,
	      });
	    }
	  }

	  render() {
	    const props = this.props;
	    const state = this.state;
	    const locale = props.locale;
	    const prefixCls = `${props.rootPrefixCls}-options`;
	    const changeSize = props.changeSize;
	    const quickGo = props.quickGo;
	    const buildOptionText = props.buildOptionText || this._buildOptionText;
	    const Select = props.selectComponentClass;
	    let changeSelect = null;
	    let goInput = null;

	    if (!(changeSize || quickGo)) {
	      return null;
	    }

	    if (changeSize && Select) {
	      const Option = Select.Option;
	      const defaultOption = props.pageSize || props.pageSizeOptions[0];
	      const options = props.pageSizeOptions.map((opt, i) => (
	        <Option key={i} value={opt}>{buildOptionText(opt)}</Option>
	      ));

	      changeSelect = (
	        <Select
	          prefixCls={props.selectPrefixCls} showSearch={false}
	          className={`${prefixCls}-size-changer`}
	          optionLabelProp="children"
	          defaultValue={'' + defaultOption} onChange={this._changeSize}>
	          {options}
	       </Select>
	      );
	    }

	    if (quickGo) {
	      goInput = (
	        <div title="Quick jump to page" className={`${prefixCls}-quick-jumper`}>
	          {locale.jump_to}
	          <input type="text" value={state._current} onChange={this._handleChange.bind(this)} onKeyUp={this._go.bind(this)}/>
	          {locale.page}
	        </div>
	      );
	    }

	    return (
	      <div className={`${prefixCls}`}>
	        {changeSelect}
	        {goInput}
	      </div>
	    );
	  }

	}

	Options.propTypes = {
	  changeSize: React.PropTypes.func,
	  quickGo: React.PropTypes.func,
	  selectComponentClass: React.PropTypes.func,
	  current: React.PropTypes.number,
	  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
	  pageSize: React.PropTypes.number,
	  buildOptionText: React.PropTypes.func,
	  locale: React.PropTypes.object,
	};

	Options.defaultProps = {
	  pageSizeOptions: ['10', '20', '30', '40'],
	};
	

	class Pagination extends React.Component {
	  constructor(props) {
	    super(props);

	    const hasOnChange = props.onChange !== noop;
	    const hasCurrent = ('current' in props);
	    if (hasCurrent && !hasOnChange) {
	      console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
	    }

	    let current = props.defaultCurrent;
	    if ('current' in props) {
	      current = props.current;
	    }

	    this.state = {
	      current: current,
	      _current: current,
	      pageSize: props.pageSize,
	    };

	    [
	      'render',
	      '_handleChange',
	      '_handleKeyUp',
	      '_handleKeyDown',
	      '_changePageSize',
	      '_isValid',
	      '_prev',
	      '_next',
	      '_hasPrev',
	      '_hasNext',
	      '_jumpPrev',
	      '_jumpNext',
	    ].forEach((method) => this[method] = this[method].bind(this));
	  }

	  componentWillReceiveProps(nextProps) {
	    if ('current' in nextProps) {
	      this.setState({
	        current: nextProps.current,
	      });
	    }

	    if ('pageSize' in nextProps) {
	      this.setState({
	        pageSize: nextProps.pageSize,
	      });
	    }
	  }

	  // private methods

	  _calcPage(p) {
	    let pageSize = p;
	    if (typeof pageSize === 'undefined') {
	      pageSize = this.state.pageSize;
	    }
	    return Math.floor((this.props.total - 1) / pageSize) + 1;
	  }

	  _isValid(page) {
	    return typeof page === 'number' && page >= 1 && page !== this.state.current;
	  }

	  _handleKeyDown(evt) {
	    if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
	      evt.preventDefault();
	    }
	  }

	  _handleKeyUp(evt) {
	    const _val = evt.target.value;
	    let val;

	    if (_val === '') {
	      val = _val;
	    } else if (isNaN(Number(_val))) {
	      val = this.state._current;
	    } else {
	      val = Number(_val);
	    }

	    this.setState({
	      _current: val,
	    });

	    if (evt.keyCode === KEYCODE.ENTER) {
	      this._handleChange(val);
	    } else if (evt.keyCode === KEYCODE.ARROW_UP) {
	      this._handleChange(val - 1);
	    } else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
	      this._handleChange(val + 1);
	    }
	  }

	  _changePageSize(size) {
	    if (typeof size === 'number') {
	      let current = this.state.current;

	      this.setState({
	        pageSize: size,
	      });

	      if (this.state.current > this._calcPage(size)) {
	        current = this._calcPage(size);
	        this.setState({
	          current: current,
	          _current: current,
	        });
	      }

	      this.props.onShowSizeChange(current, size);
	    }
	  }

	  _handleChange(p) {
	    let page = p;
	    if (this._isValid(page)) {
	      if (page > this._calcPage()) {
	        page = this._calcPage();
	      }

	      if (!('current' in this.props)) {
	        this.setState({
	          current: page,
	          _current: page,
	        });
	      }

	      this.props.onChange(page);

	      return page;
	    }

	    return this.state.current;
	  }

	  _prev() {
	    if (this._hasPrev()) {
	      this._handleChange(this.state.current - 1);
	    }
	  }

	  _next() {
	    if (this._hasNext()) {
	      this._handleChange(this.state.current + 1);
	    }
	  }

	  _jumpPrev() {
	    this._handleChange(Math.max(1, this.state.current - 5));
	  }

	  _jumpNext() {
	    this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
	  }

	  _hasPrev() {
	    return this.state.current > 1;
	  }

	  _hasNext() {
	    return this.state.current < this._calcPage();
	  }

	  render() {
	    const props = this.props;
	    const locale = props.locale;

	    const prefixCls = props.prefixCls;
	    const allPages = this._calcPage();
	    const pagerList = [];
	    let jumpPrev = null;
	    let jumpNext = null;
	    let firstPager = null;
	    let lastPager = null;

	    if (props.simple) {
	      return (
	        <ul className={`${prefixCls} ${prefixCls}-simple ${props.className}`}>
	          <li title={locale.prev_page} onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
	            <a></a>
	          </li>
	          <div title={`${this.state.current}/${allPages}`} className={`${prefixCls}-simple-pager`}>
	            <input type="text" value={this.state._current} onKeyDown={this._handleKeyDown} onKeyUp={this._handleKeyUp} onChange={this._handleKeyUp} />
	            <span className={`${prefixCls}-slash`}>／</span>
	            {allPages}
	          </div>
	          <li title={locale.next_page} onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
	            <a></a>
	          </li>
	        </ul>
	      );
	    }

	    if (allPages <= 9) {
	      for (let i = 1; i <= allPages; i++) {
	        const active = this.state.current === i;
	        pagerList.push(<Pager locale={locale} rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
	      }
	    } else {
	      jumpPrev = (<li title={locale.prev_5} key="prev" onClick={this._jumpPrev} className={`${prefixCls}-jump-prev`}>
	        <a></a>
	      </li>);
	      jumpNext = (<li title={locale.next_5} key="next" onClick={this._jumpNext} className={`${prefixCls}-jump-next`}>
	        <a></a>
	      </li>);
	      lastPager = (<Pager
	        locale={props.locale}
	        last rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, allPages)} key={allPages} page={allPages} active={false} />);
	      firstPager = (<Pager
	        locale={props.locale}
	        rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, 1)} key={1} page={1} active={false} />);

	      const current = this.state.current;

	      let left = Math.max(1, current - 2);
	      let right = Math.min(current + 2, allPages);

	      if (current - 1 <= 2) {
	        right = 1 + 4;
	      }

	      if (allPages - current <= 2) {
	        left = allPages - 4;
	      }

	      for (let i = left; i <= right; i++) {
	        const active = current === i;
	        pagerList.push(<Pager
	          locale={props.locale}
	          rootPrefixCls={prefixCls} onClick={this._handleChange.bind(this, i)} key={i} page={i} active={active} />);
	      }

	      if (current - 1 >= 4) {
	        pagerList.unshift(jumpPrev);
	      }
	      if (allPages - current >= 4) {
	        pagerList.push(jumpNext);
	      }

	      if (left !== 1) {
	        pagerList.unshift(firstPager);
	      }
	      if (right !== allPages) {
	        pagerList.push(lastPager);
	      }
	    }

	    let totalText = null;

	    if (props.showTotal) {
	      totalText = <span className={`${prefixCls}-total-text`}>{props.showTotal(props.total)}</span>;
	    }

	    return (
	      <ul className={`${prefixCls} ${props.className}`}
	        unselectable="unselectable">
	        {totalText}
	        <li title={locale.prev_page} onClick={this._prev} className={(this._hasPrev() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-prev`}>
	          <a></a>
	        </li>
	        {pagerList}
	        <li title={locale.next_page} onClick={this._next} className={(this._hasNext() ? '' : `${prefixCls}-disabled `) + `${prefixCls}-next`}>
	          <a></a>
	        </li>
	        <Options
	          locale={props.locale}
	          rootPrefixCls={prefixCls}
	          selectComponentClass={props.selectComponentClass}
	          selectPrefixCls={props.selectPrefixCls}
	          changeSize={this.props.showSizeChanger ? this._changePageSize.bind(this) : null}
	          current={this.state.current}
	          pageSize={this.props.pageSize}
	          pageSizeOptions={this.props.pageSizeOptions}
	          quickGo={this.props.showQuickJumper ? this._handleChange.bind(this) : null} />
	      </ul>
	    );
	  }

	}

	Pagination.propTypes = {
	  current: React.PropTypes.number,
	  defaultCurrent: React.PropTypes.number,
	  total: React.PropTypes.number,
	  pageSize: React.PropTypes.number,
	  onChange: React.PropTypes.func,
	  showSizeChanger: React.PropTypes.bool,
	  onShowSizeChange: React.PropTypes.func,
	  selectComponentClass: React.PropTypes.func,
	  showQuickJumper: React.PropTypes.bool,
	  pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
	  showTotal: React.PropTypes.func,
	  locale: React.PropTypes.object,
	};

	Pagination.defaultProps = {
	  defaultCurrent: 1,
	  total: 0,
	  pageSize: 10,
	  onChange: noop,
	  className: '',
	  selectPrefixCls: 'rc-select',
	  prefixCls: 'rc-pagination',
	  selectComponentClass: null,
	  showQuickJumper: false,
	  showSizeChanger: false,
	  onShowSizeChange: noop,
	  locale: LOCALE,
	};


	RC.Pagination = Pagination;
}(Smart.RC)
