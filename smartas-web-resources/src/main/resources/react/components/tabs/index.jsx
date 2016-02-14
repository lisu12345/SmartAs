+ function(RC) {
	const {
		noop
	} = _, {
		Animate, Util
	} = RC, {
		KeyCode,
		offset
	} = Util, {
		PropTypes
	} = React;

	const tabBarExtraContentStyle = {
	  float: 'right',
	};

	function componentDidUpdate(component) {
	  const refs = component.refs;
	  const containerNode = refs.nav;
	  const containerOffset = offset(containerNode);
	  const inkBarNode = refs.inkBar;
	  const activeTab = refs.activeTab;
	  const tabPosition = component.props.tabPosition;
	  if (activeTab) {
	    const tabNode = activeTab;
	    const tabOffset = offset(tabNode);
	    if (tabPosition === 'top' || tabPosition === 'bottom') {
	      const left = tabOffset.left - containerOffset.left;
	      inkBarNode.style.left = left + 'px';
	      inkBarNode.style.top = '';
	      inkBarNode.style.bottom = '';
	      inkBarNode.style.right = (containerNode.offsetWidth - left - tabNode.offsetWidth) + 'px';
	    } else {
	      const top = tabOffset.top - containerOffset.top;
	      inkBarNode.style.left = '';
	      inkBarNode.style.right = '';
	      inkBarNode.style.top = top + 'px';
	      inkBarNode.style.bottom = (containerNode.offsetHeight - top - tabNode.offsetHeight) + 'px';
	    }
	  }
	  inkBarNode.style.display = activeTab ? 'block' : 'none';
	}

	const InkBarMixin = {
	  componentDidUpdate() {
	    componentDidUpdate(this);
	  },

	  componentDidMount() {
	    componentDidUpdate(this);
	  },
	};



	const TabPane = React.createClass({
	  propTypes: {
	    onDestroy: React.PropTypes.func,
	  },

	  componentWillUnmount() {
	    if (this.props.onDestroy) {
	      this.props.onDestroy();
	    }
	  },

	  render() {
	    const props = this.props;
	    const prefixCls = `${props.rootPrefixCls}-tabpane`;
	    let cls = props.active ? '' : `${prefixCls}-hidden`;
	    cls += ' ' + prefixCls;
	    return (
	      <div className={cls}>
	        {props.children}
	      </div>
	    );
	  },
	});

	const Nav = React.createClass({
	  propTypes: {
	    tabPosition: PropTypes.string,
	    tabBarExtraContent: PropTypes.any,
	    onTabClick: PropTypes.func,
	  },

	  mixins: [InkBarMixin],

	  getInitialState() {
	    return {
	      next: false,
	      offset: 0,
	      prev: false,
	    };
	  },

	  componentDidMount() {
	    this.componentDidUpdate();
	  },

	  componentDidUpdate(prevProps) {
	    const props = this.props;
	    if (prevProps && prevProps.tabPosition !== props.tabPosition) {
	      this.setOffset(0);
	      return;
	    }
	    const navNode = this.refs.nav;
	    const navNodeWH = this.getOffsetWH(navNode);
	    const navWrapNode = this.refs.navWrap;
	    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    const state = this.state;
	    let offset = state.offset;
	    const minOffset = navWrapNodeWH - navNodeWH;
	    let {next, prev} = this.state;
	    if (minOffset >= 0) {
	      next = false;
	      this.setOffset(0);
	      offset = 0;
	    } else if (minOffset < offset) {
	      next = (true);
	    } else {
	      next = (false);
	      this.setOffset(minOffset);
	      offset = minOffset;
	    }

	    if (offset < 0) {
	      prev = (true);
	    } else {
	      prev = (false);
	    }

	    this.setNext(next);
	    this.setPrev(prev);

	    const nextPrev = {next, prev};
	    // wait next,prev show hide
	    if (this.isNextPrevShown(state) !== this.isNextPrevShown(nextPrev)) {
	      this.setNextPrev({}, this.scrollToActiveTab);
	    } else {
	      // can not use props.activeKey
	      if (!prevProps || props.activeKey !== prevProps.activeKey) {
	        this.scrollToActiveTab();
	      }
	    }
	  },

	  onTabClick(key) {
	    this.props.onTabClick(key);
	  },

	  // work around eslint warning
	  setNextPrev(nextPrev, callback) {
	    this.setState(nextPrev, callback);
	  },

	  getTabs() {
	    const props = this.props;
	    const children = props.panels;
	    const activeKey = props.activeKey;
	    const rst = [];
	    const prefixCls = props.prefixCls;

	    React.Children.forEach(children, (child)=> {
	      const key = child.key;
	      let cls = activeKey === key ? `${prefixCls}-tab-active` : '';
	      cls += ` ${prefixCls}-tab`;
	      let events = {};
	      if (child.props.disabled) {
	        cls += ` ${prefixCls}-tab-disabled`;
	      } else {
	        events = {
	          onClick: this.onTabClick.bind(this, key),
	        };
	      }
	      const ref = {};
	      if (activeKey === key) {
	        ref.ref = 'activeTab';
	      }
	      rst.push(<div {...events}
	        className={cls}
	        key={key}
	        {...ref}>
	        <div className={`${prefixCls}-tab-inner`}>{child.props.tab}</div>
	      </div>);
	    });

	    return rst;
	  },

	  getOffsetWH(node) {
	    const tabPosition = this.props.tabPosition;
	    let prop = 'offsetWidth';
	    if (tabPosition === 'left' || tabPosition === 'right') {
	      prop = 'offsetHeight';
	    }
	    return node[prop];
	  },

	  getOffsetLT(node) {
	    const tabPosition = this.props.tabPosition;
	    let prop = 'left';
	    if (tabPosition === 'left' || tabPosition === 'right') {
	      prop = 'top';
	    }
	    return node.getBoundingClientRect()[prop];
	  },

	  setOffset(offset) {
	    const target = Math.min(0, offset);
	    if (this.state.offset !== target) {
	      this.setState({
	        offset: target,
	      });
	    }
	  },

	  setPrev(v) {
	    if (this.state.prev !== v) {
	      this.setState({
	        prev: v,
	      });
	    }
	  },

	  setNext(v) {
	    if (this.state.next !== v) {
	      this.setState({
	        next: v,
	      });
	    }
	  },

	  isNextPrevShown(state) {
	    return state.next || state.prev;
	  },

	  scrollToActiveTab() {
	    const {activeTab, navWrap} = this.refs;
	    if (activeTab) {
	      const activeTabWH = this.getOffsetWH(activeTab);
	      const navWrapNodeWH = this.getOffsetWH(navWrap);
	      let {offset} = this.state;
	      const wrapOffset = this.getOffsetLT(navWrap);
	      const activeTabOffset = this.getOffsetLT(activeTab);
	      if (wrapOffset > activeTabOffset) {
	        offset += (wrapOffset - activeTabOffset);
	        this.setState({offset});
	      } else if ((wrapOffset + navWrapNodeWH) < (activeTabOffset + activeTabWH)) {
	        offset -= (activeTabOffset + activeTabWH) - (wrapOffset + navWrapNodeWH);
	        this.setState({offset});
	      }
	    }
	  },

	  prev() {
	    const navWrapNode = this.refs.navWrap;
	    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    const state = this.state;
	    const offset = state.offset;
	    this.setOffset(offset + navWrapNodeWH);
	  },

	  next() {
	    const navWrapNode = this.refs.navWrap;
	    const navWrapNodeWH = this.getOffsetWH(navWrapNode);
	    const state = this.state;
	    const offset = state.offset;
	    this.setOffset(offset - navWrapNodeWH);
	  },

	  render() {
	    const props = this.props;
	    const state = this.state;
	    const prefixCls = props.prefixCls;
	    const tabs = this.getTabs();
	    const tabMovingDirection = props.tabMovingDirection;
	    const tabPosition = props.tabPosition;
	    let inkBarClass = `${prefixCls}-ink-bar`;
	    if (tabMovingDirection) {
	      inkBarClass += ` ${prefixCls}-ink-bar-transition-${tabMovingDirection}`;
	    }
	    let nextButton;
	    let prevButton;

	    const showNextPrev = state.prev || state.next;

	    if (showNextPrev) {
	      prevButton = (<span
	        onClick={state.prev ? this.prev : noop}
	        unselectable="unselectable"
	        className={cx({
	          [`${prefixCls}-tab-prev`]: 1,
	          [`${prefixCls}-tab-btn-disabled`]: !state.prev,
	        })}>
	        <span className={`${prefixCls}-tab-prev-icon`}></span>
	      </span>);

	      nextButton = (<span
	        onClick={state.next ? this.next : noop}
	        unselectable="unselectable"
	        className={cx({
	          [`${prefixCls}-tab-next`]: 1,
	          [`${prefixCls}-tab-btn-disabled`]: !state.next,
	        })}>
	        <span className={`${prefixCls}-tab-next-icon`}></span>
	      </span>);
	    }

	    let navOffset = {};
	    if (tabPosition === 'left' || tabPosition === 'right') {
	      navOffset = {
	        top: state.offset,
	      };
	    } else {
	      navOffset = {
	        left: state.offset,
	      };
	    }

	    const tabBarExtraContent = this.props.tabBarExtraContent;

	    return (<div className={`${prefixCls}-tabs-bar`}>
	      {tabBarExtraContent ? <div style={tabBarExtraContentStyle}>{tabBarExtraContent}</div> : null}
	      <div className={`${prefixCls}-nav-container ${showNextPrev ? `${prefixCls}-nav-container-scrolling` : ''}`}
	           style={props.style}
	           ref="container">
	        {prevButton}
	        {nextButton}
	        <div className={`${prefixCls}-nav-wrap`} ref="navWrap">
	          <div className={`${prefixCls}-nav-scroll`}>
	            <div className={`${prefixCls}-nav`} ref="nav" style={navOffset}>
	              <div className={inkBarClass} ref="inkBar"/>
	              {tabs}
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>);
	  },
	});
	function getDefaultActiveKey(props) {
	  let activeKey;
	  React.Children.forEach(props.children, (child) => {
	    if (!activeKey && !child.props.disabled) {
	      activeKey = child.key;
	    }
	  });
	  return activeKey;
	}

	const Tabs = React.createClass({
	  propTypes: {
	    destroyInactiveTabPane: PropTypes.bool,
	    onTabClick: PropTypes.func,
	    onChange: PropTypes.func,
	    children: PropTypes.any,
	    tabBarExtraContent: PropTypes.any,
	    animation: PropTypes.string,
	  },

	  getDefaultProps() {
	    return {
	      prefixCls: 'rc-tabs',
	      destroyInactiveTabPane: false,
	      tabBarExtraContent: null,
	      onChange: noop,
	      tabPosition: 'top',
	      style: {},
	      contentStyle: {},
	      navStyle: {},
	      onTabClick: noop,
	    };
	  },

	  getInitialState() {
	    const props = this.props;
	    let activeKey;
	    if ('activeKey' in props) {
	      activeKey = props.activeKey;
	    } else if ('defaultActiveKey' in props) {
	      activeKey = props.defaultActiveKey;
	    } else {
	      activeKey = getDefaultActiveKey(props);
	    }
	    // cache panels
	    this.renderPanels = {};
	    return {activeKey};
	  },

	  componentWillReceiveProps(nextProps) {
	    let newActiveKey = this.state.activeKey;
	    if ('activeKey' in nextProps) {
	      newActiveKey = nextProps.activeKey;
	      if (!newActiveKey) {
	        this.setState({
	          activeKey: newActiveKey,
	        });
	        return;
	      }
	    }
	    let found;
	    React.Children.forEach(nextProps.children, (child) => {
	      if (child.key === newActiveKey) {
	        found = true;
	      }
	    });
	    if (found) {
	      this.setActiveKey(newActiveKey, nextProps);
	    } else {
	      this.setActiveKey(getDefaultActiveKey(nextProps), nextProps);
	    }
	  },

	  onTabDestroy(key) {
	    delete this.renderPanels[key];
	  },

	  onTabClick(key) {
	    this.setActiveKey(key);
	    this.props.onTabClick(key);
	    if (this.state.activeKey !== key) {
	      this.props.onChange(key);
	    }
	  },

	  onKeyDown(e) {
	    if (e.target !== ReactDOM.findDOMNode(this)) {
	      return;
	    }
	    const eventKeyCode = e.keyCode;
	    switch (eventKeyCode) {
	    case KeyCode.RIGHT:
	    case KeyCode.DOWN:
	      e.preventDefault();
	      const nextKey = this.getNextActiveKey(true);
	      this.onTabClick(nextKey);
	      break;
	    case KeyCode.LEFT:
	    case KeyCode.UP:
	      e.preventDefault();
	      const previousKey = this.getNextActiveKey(false);
	      this.onTabClick(previousKey);
	      break;
	    default:
	    }
	  },

	  getNextActiveKey(next) {
	    const activeKey = this.state.activeKey;
	    const children = [];
	    React.Children.forEach(this.props.children, (c) => {
	      if (!c.props.disabled) {
	        if (next) {
	          children.push(c);
	        } else {
	          children.unshift(c);
	        }
	      }
	    });
	    const length = children.length;
	    let ret = length && children[0].key;
	    children.forEach((child, i) => {
	      if (child.key === activeKey) {
	        if (i === length - 1) {
	          ret = children[0].key;
	        } else {
	          ret = children[i + 1].key;
	        }
	      }
	    });
	    return ret;
	  },

	  getTabPanes() {
	    const state = this.state;
	    const props = this.props;
	    const activeKey = state.activeKey;
	    const children = props.children;
	    const newChildren = [];
	    const renderPanels = this.renderPanels;

	    React.Children.forEach(children, (c) => {
	      let child = c;
	      const key = child.key;
	      const active = activeKey === key;
	      if (active || renderPanels[key]) {
	        child = active ? child : renderPanels[key];
	        renderPanels[key] = React.cloneElement(child, {
	          active: active,
	          onDestroy: this.onTabDestroy.bind(this, key),
	          // eventKey: key,
	          rootPrefixCls: props.prefixCls,
	        });
	        newChildren.push(renderPanels[key]);
	      } else {
	        // do not change owner ...
	        // or else will destroy and reinit
	        // newChildren.push(<TabPane active={false}
	        //  key={key}
	        //  eventKey={key}
	        //  rootPrefixCls={this.props.prefixCls}></TabPane>);
	        // return
	        // lazy load
	        newChildren.push(React.cloneElement(child, {
	          active: false,
	          // eventKey: key,
	          rootPrefixCls: props.prefixCls,
	        }, []));
	      }
	    });

	    return newChildren;
	  },

	  getIndexPair(props, currentActiveKey, activeKey) {
	    const keys = [];
	    React.Children.forEach(props.children, c => {
	      keys.push(c.key);
	    });
	    const currentIndex = keys.indexOf(currentActiveKey);
	    const nextIndex = keys.indexOf(activeKey);
	    return {currentIndex, nextIndex};
	  },

	  setActiveKey(activeKey, ps) {
	    const props = ps || this.props;
	    const currentActiveKey = this.state.activeKey;
	    if (currentActiveKey === activeKey || (('activeKey' in props) && (props === this.props))) {
	      return;
	    }
	    if (!currentActiveKey) {
	      this.setState({
	        activeKey: activeKey,
	      });
	    } else {
	      let {currentIndex, nextIndex} = this.getIndexPair(props, currentActiveKey, activeKey);
	      // removed
	      if (currentIndex === -1) {
	        const newPair = this.getIndexPair(this.props, currentActiveKey, activeKey);
	        currentIndex = newPair.currentIndex;
	        nextIndex = newPair.nextIndex;
	      }
	      const tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
	      this.setState({
	        activeKey: activeKey,
	        tabMovingDirection: tabMovingDirection,
	      });
	    }
	  },

	  render() {
	    const props = this.props;
	    const {destroyInactiveTabPane, prefixCls, tabPosition} = props;
	    let cls = `${prefixCls} ${prefixCls}-${tabPosition}`;
	    const tabMovingDirection = this.state.tabMovingDirection;
	    if (props.className) {
	      cls += ' ' + props.className;
	    }
	    const animation = this.props.animation;
	    let tabPanes = this.getTabPanes();
	    let transitionName;
	    transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
	    if (!transitionName && animation) {
	      transitionName = `${prefixCls}-${animation}-${tabMovingDirection || 'backward'}`;
	    }
	    if (destroyInactiveTabPane) {
	      tabPanes = tabPanes.filter((panel)=> {
	        return panel.props.active;
	      });
	    }
	    if (transitionName) {
	      if (destroyInactiveTabPane) {
	        tabPanes = (<Animate exclusive
	                             transitionName={transitionName}>
	          {tabPanes}
	        </Animate>);
	      } else {
	        tabPanes = (<Animate showProp="active"
	                             exclusive
	                             transitionName={transitionName}>
	          {tabPanes}
	        </Animate>);
	      }
	    }
	    const contents = [
	      (<Nav prefixCls={prefixCls}
	            key="nav"
	            tabBarExtraContent={this.props.tabBarExtraContent}
	            tabPosition={tabPosition}
	            style={props.navStyle}
	            onTabClick={this.onTabClick}
	            tabMovingDirection={tabMovingDirection}
	            panels={this.props.children}
	            activeKey={this.state.activeKey}/>),
	      (<div className={`${prefixCls}-content`}
	            style={props.contentStyle}
	            key="content">
	        {tabPanes}
	      </div>),
	    ];
	    if (tabPosition === 'bottom') {
	      contents.reverse();
	    }
	    return (
	      <div className={cls}
	           tabIndex="0"
	           style={props.style}
	           onKeyDown={this.onKeyDown}>
	        {contents}
	      </div>
	    );
	  },
	});

	Tabs.TabPane = TabPane;
	RC.Tabs = Tabs;
}(Smart.RC)