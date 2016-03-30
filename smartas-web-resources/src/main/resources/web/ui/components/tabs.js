'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (RC) {
	var _ref = _;
	var noop = _ref.noop;var Animate = RC.Animate;
	var Util = RC.Util;var KeyCode = Util.KeyCode;
	var offset = Util.offset;var _React = React;
	var PropTypes = _React.PropTypes;


	var tabBarExtraContentStyle = {
		float: 'right'
	};

	function _componentDidUpdate(component) {
		var refs = component.refs;
		var containerNode = refs.nav;
		var containerOffset = offset(containerNode);
		var inkBarNode = refs.inkBar;
		var activeTab = refs.activeTab;
		var tabPosition = component.props.tabPosition;
		if (activeTab) {
			var tabNode = activeTab;
			var tabOffset = offset(tabNode);
			if (tabPosition === 'top' || tabPosition === 'bottom') {
				var left = tabOffset.left - containerOffset.left;
				inkBarNode.style.left = left + 'px';
				inkBarNode.style.top = '';
				inkBarNode.style.bottom = '';
				inkBarNode.style.right = containerNode.offsetWidth - left - tabNode.offsetWidth + 'px';
			} else {
				var top = tabOffset.top - containerOffset.top;
				inkBarNode.style.left = '';
				inkBarNode.style.right = '';
				inkBarNode.style.top = top + 'px';
				inkBarNode.style.bottom = containerNode.offsetHeight - top - tabNode.offsetHeight + 'px';
			}
		}
		inkBarNode.style.display = activeTab ? 'block' : 'none';
	}

	var InkBarMixin = {
		componentDidUpdate: function componentDidUpdate() {
			_componentDidUpdate(this);
		},
		componentDidMount: function componentDidMount() {
			_componentDidUpdate(this);
		}
	};

	var TabPane = React.createClass({
		displayName: 'TabPane',

		propTypes: {
			onDestroy: React.PropTypes.func
		},

		componentWillUnmount: function componentWillUnmount() {
			if (this.props.onDestroy) {
				this.props.onDestroy();
			}
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.rootPrefixCls + '-tabpane';
			var cls = props.active ? '' : prefixCls + '-hidden';
			cls += ' ' + prefixCls;
			return React.createElement(
				'div',
				{ className: cls },
				props.children
			);
		}
	});

	var Nav = React.createClass({
		displayName: 'Nav',

		propTypes: {
			tabPosition: PropTypes.string,
			tabBarExtraContent: PropTypes.any,
			onTabClick: PropTypes.func
		},

		mixins: [InkBarMixin],

		getInitialState: function getInitialState() {
			return {
				next: false,
				offset: 0,
				prev: false
			};
		},
		componentDidMount: function componentDidMount() {
			this.componentDidUpdate();
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var props = this.props;
			if (prevProps && prevProps.tabPosition !== props.tabPosition) {
				this.setOffset(0);
				return;
			}
			var navNode = this.refs.nav;
			var navNodeWH = this.getOffsetWH(navNode);
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			var minOffset = navWrapNodeWH - navNodeWH;
			var _state = this.state;
			var next = _state.next;
			var prev = _state.prev;

			if (minOffset >= 0) {
				next = false;
				this.setOffset(0);
				offset = 0;
			} else if (minOffset < offset) {
				next = true;
			} else {
				next = false;
				this.setOffset(minOffset);
				offset = minOffset;
			}

			if (offset < 0) {
				prev = true;
			} else {
				prev = false;
			}

			this.setNext(next);
			this.setPrev(prev);

			var nextPrev = { next: next, prev: prev };
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
		onTabClick: function onTabClick(key) {
			this.props.onTabClick(key);
		},


		// work around eslint warning
		setNextPrev: function setNextPrev(nextPrev, callback) {
			this.setState(nextPrev, callback);
		},
		getTabs: function getTabs() {
			var _this = this;

			var props = this.props;
			var children = props.panels;
			var activeKey = props.activeKey;
			var rst = [];
			var prefixCls = props.prefixCls;

			React.Children.forEach(children, function (child) {
				var key = child.key;
				var cls = activeKey === key ? prefixCls + '-tab-active' : '';
				cls += ' ' + prefixCls + '-tab';
				var events = {};
				if (child.props.disabled) {
					cls += ' ' + prefixCls + '-tab-disabled';
				} else {
					events = {
						onClick: _this.onTabClick.bind(_this, key)
					};
				}
				var ref = {};
				if (activeKey === key) {
					ref.ref = 'activeTab';
				}
				rst.push(React.createElement(
					'div',
					_extends({}, events, {
						className: cls,
						key: key
					}, ref),
					React.createElement(
						'div',
						{ className: prefixCls + '-tab-inner' },
						child.props.tab
					)
				));
			});

			return rst;
		},
		getOffsetWH: function getOffsetWH(node) {
			var tabPosition = this.props.tabPosition;
			var prop = 'offsetWidth';
			if (tabPosition === 'left' || tabPosition === 'right') {
				prop = 'offsetHeight';
			}
			return node[prop];
		},
		getOffsetLT: function getOffsetLT(node) {
			var tabPosition = this.props.tabPosition;
			var prop = 'left';
			if (tabPosition === 'left' || tabPosition === 'right') {
				prop = 'top';
			}
			return node.getBoundingClientRect()[prop];
		},
		setOffset: function setOffset(offset) {
			var target = Math.min(0, offset);
			if (this.state.offset !== target) {
				this.setState({
					offset: target
				});
			}
		},
		setPrev: function setPrev(v) {
			if (this.state.prev !== v) {
				this.setState({
					prev: v
				});
			}
		},
		setNext: function setNext(v) {
			if (this.state.next !== v) {
				this.setState({
					next: v
				});
			}
		},
		isNextPrevShown: function isNextPrevShown(state) {
			return state.next || state.prev;
		},
		scrollToActiveTab: function scrollToActiveTab() {
			var _refs = this.refs;
			var activeTab = _refs.activeTab;
			var navWrap = _refs.navWrap;

			if (activeTab) {
				var activeTabWH = this.getOffsetWH(activeTab);
				var navWrapNodeWH = this.getOffsetWH(navWrap);
				var _offset = this.state.offset;

				var wrapOffset = this.getOffsetLT(navWrap);
				var activeTabOffset = this.getOffsetLT(activeTab);
				if (wrapOffset > activeTabOffset) {
					_offset += wrapOffset - activeTabOffset;
					this.setState({ offset: _offset });
				} else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
					_offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
					this.setState({ offset: _offset });
				}
			}
		},
		prev: function prev() {
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			this.setOffset(offset + navWrapNodeWH);
		},
		next: function next() {
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			this.setOffset(offset - navWrapNodeWH);
		},
		render: function render() {
			var props = this.props;
			var state = this.state;
			var prefixCls = props.prefixCls;
			var tabs = this.getTabs();
			var tabMovingDirection = props.tabMovingDirection;
			var tabPosition = props.tabPosition;
			var inkBarClass = prefixCls + '-ink-bar';
			if (tabMovingDirection) {
				inkBarClass += ' ' + prefixCls + '-ink-bar-transition-' + tabMovingDirection;
			}
			var nextButton = void 0;
			var prevButton = void 0;

			var showNextPrev = state.prev || state.next;

			if (showNextPrev) {
				var _cx, _cx2;

				prevButton = React.createElement(
					'span',
					{
						onClick: state.prev ? this.prev : noop,
						unselectable: 'unselectable',
						className: cx((_cx = {}, _defineProperty(_cx, prefixCls + '-tab-prev', 1), _defineProperty(_cx, prefixCls + '-tab-btn-disabled', !state.prev), _cx)) },
					React.createElement('span', { className: prefixCls + '-tab-prev-icon' })
				);

				nextButton = React.createElement(
					'span',
					{
						onClick: state.next ? this.next : noop,
						unselectable: 'unselectable',
						className: cx((_cx2 = {}, _defineProperty(_cx2, prefixCls + '-tab-next', 1), _defineProperty(_cx2, prefixCls + '-tab-btn-disabled', !state.next), _cx2)) },
					React.createElement('span', { className: prefixCls + '-tab-next-icon' })
				);
			}

			var navOffset = {};
			if (tabPosition === 'left' || tabPosition === 'right') {
				navOffset = {
					top: state.offset
				};
			} else {
				navOffset = {
					left: state.offset
				};
			}

			var tabBarExtraContent = this.props.tabBarExtraContent;

			return React.createElement(
				'div',
				{ className: prefixCls + '-tabs-bar' },
				tabBarExtraContent ? React.createElement(
					'div',
					{ style: tabBarExtraContentStyle },
					tabBarExtraContent
				) : null,
				React.createElement(
					'div',
					{ className: prefixCls + '-nav-container ' + (showNextPrev ? prefixCls + '-nav-container-scrolling' : ''),
						style: props.style,
						ref: 'container' },
					prevButton,
					nextButton,
					React.createElement(
						'div',
						{ className: prefixCls + '-nav-wrap', ref: 'navWrap' },
						React.createElement(
							'div',
							{ className: prefixCls + '-nav-scroll' },
							React.createElement(
								'div',
								{ className: prefixCls + '-nav', ref: 'nav', style: navOffset },
								React.createElement('div', { className: inkBarClass, ref: 'inkBar' }),
								tabs
							)
						)
					)
				)
			);
		}
	});
	function getDefaultActiveKey(props) {
		var activeKey = void 0;
		React.Children.forEach(props.children, function (child) {
			if (!activeKey && !child.props.disabled) {
				activeKey = child.key;
			}
		});
		return activeKey;
	}

	var Tabs = React.createClass({
		displayName: 'Tabs',

		propTypes: {
			destroyInactiveTabPane: PropTypes.bool,
			onTabClick: PropTypes.func,
			onChange: PropTypes.func,
			children: PropTypes.any,
			tabBarExtraContent: PropTypes.any,
			animation: PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-tabs',
				destroyInactiveTabPane: false,
				tabBarExtraContent: null,
				onChange: noop,
				tabPosition: 'top',
				style: {},
				contentStyle: {},
				navStyle: {},
				onTabClick: noop
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var activeKey = void 0;
			if ('activeKey' in props) {
				activeKey = props.activeKey;
			} else if ('defaultActiveKey' in props) {
				activeKey = props.defaultActiveKey;
			} else {
				activeKey = getDefaultActiveKey(props);
			}
			// cache panels
			this.renderPanels = {};
			return { activeKey: activeKey };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var newActiveKey = this.state.activeKey;
			if ('activeKey' in nextProps) {
				newActiveKey = nextProps.activeKey;
				if (!newActiveKey) {
					this.setState({
						activeKey: newActiveKey
					});
					return;
				}
			}
			var found = void 0;
			React.Children.forEach(nextProps.children, function (child) {
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
		onTabDestroy: function onTabDestroy(key) {
			delete this.renderPanels[key];
		},
		onTabClick: function onTabClick(key) {
			this.setActiveKey(key);
			this.props.onTabClick(key);
			if (this.state.activeKey !== key) {
				this.props.onChange(key);
			}
		},
		onKeyDown: function onKeyDown(e) {
			if (e.target !== ReactDOM.findDOMNode(this)) {
				return;
			}
			var eventKeyCode = e.keyCode;
			switch (eventKeyCode) {
				case KeyCode.RIGHT:
				case KeyCode.DOWN:
					e.preventDefault();
					var nextKey = this.getNextActiveKey(true);
					this.onTabClick(nextKey);
					break;
				case KeyCode.LEFT:
				case KeyCode.UP:
					e.preventDefault();
					var previousKey = this.getNextActiveKey(false);
					this.onTabClick(previousKey);
					break;
				default:
			}
		},
		getNextActiveKey: function getNextActiveKey(next) {
			var activeKey = this.state.activeKey;
			var children = [];
			React.Children.forEach(this.props.children, function (c) {
				if (!c.props.disabled) {
					if (next) {
						children.push(c);
					} else {
						children.unshift(c);
					}
				}
			});
			var length = children.length;
			var ret = length && children[0].key;
			children.forEach(function (child, i) {
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
		getTabPanes: function getTabPanes() {
			var _this2 = this;

			var state = this.state;
			var props = this.props;
			var activeKey = state.activeKey;
			var children = props.children;
			var newChildren = [];
			var renderPanels = this.renderPanels;

			React.Children.forEach(children, function (c) {
				var child = c;
				var key = child.key;
				var active = activeKey === key;
				if (active || renderPanels[key]) {
					child = active ? child : renderPanels[key];
					renderPanels[key] = React.cloneElement(child, {
						active: active,
						onDestroy: _this2.onTabDestroy.bind(_this2, key),
						// eventKey: key,
						rootPrefixCls: props.prefixCls
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
						rootPrefixCls: props.prefixCls
					}, []));
				}
			});

			return newChildren;
		},
		getIndexPair: function getIndexPair(props, currentActiveKey, activeKey) {
			var keys = [];
			React.Children.forEach(props.children, function (c) {
				keys.push(c.key);
			});
			var currentIndex = keys.indexOf(currentActiveKey);
			var nextIndex = keys.indexOf(activeKey);
			return { currentIndex: currentIndex, nextIndex: nextIndex };
		},
		setActiveKey: function setActiveKey(activeKey, ps) {
			var props = ps || this.props;
			var currentActiveKey = this.state.activeKey;
			if (currentActiveKey === activeKey || 'activeKey' in props && props === this.props) {
				return;
			}
			if (!currentActiveKey) {
				this.setState({
					activeKey: activeKey
				});
			} else {
				var _getIndexPair = this.getIndexPair(props, currentActiveKey, activeKey);

				var currentIndex = _getIndexPair.currentIndex;
				var nextIndex = _getIndexPair.nextIndex;
				// removed

				if (currentIndex === -1) {
					var newPair = this.getIndexPair(this.props, currentActiveKey, activeKey);
					currentIndex = newPair.currentIndex;
					nextIndex = newPair.nextIndex;
				}
				var tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
				this.setState({
					activeKey: activeKey,
					tabMovingDirection: tabMovingDirection
				});
			}
		},
		render: function render() {
			var props = this.props;
			var destroyInactiveTabPane = props.destroyInactiveTabPane;
			var prefixCls = props.prefixCls;
			var tabPosition = props.tabPosition;

			var cls = prefixCls + ' ' + prefixCls + '-' + tabPosition;
			var tabMovingDirection = this.state.tabMovingDirection;
			if (props.className) {
				cls += ' ' + props.className;
			}
			var animation = this.props.animation;
			var tabPanes = this.getTabPanes();
			var transitionName = void 0;
			transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
			if (!transitionName && animation) {
				transitionName = prefixCls + '-' + animation + '-' + (tabMovingDirection || 'backward');
			}
			if (destroyInactiveTabPane) {
				tabPanes = tabPanes.filter(function (panel) {
					return panel.props.active;
				});
			}
			if (transitionName) {
				if (destroyInactiveTabPane) {
					tabPanes = React.createElement(
						Animate,
						{ exclusive: true,
							transitionName: transitionName },
						tabPanes
					);
				} else {
					tabPanes = React.createElement(
						Animate,
						{ showProp: 'active',
							exclusive: true,
							transitionName: transitionName },
						tabPanes
					);
				}
			}
			var contents = [React.createElement(Nav, { prefixCls: prefixCls,
				key: 'nav',
				tabBarExtraContent: this.props.tabBarExtraContent,
				tabPosition: tabPosition,
				style: props.navStyle,
				onTabClick: this.onTabClick,
				tabMovingDirection: tabMovingDirection,
				panels: this.props.children,
				activeKey: this.state.activeKey }), React.createElement(
				'div',
				{ className: prefixCls + '-content',
					style: props.contentStyle,
					key: 'content' },
				tabPanes
			)];
			if (tabPosition === 'bottom') {
				contents.reverse();
			}
			return React.createElement(
				'div',
				{ className: cls,
					tabIndex: '0',
					style: props.style,
					onKeyDown: this.onKeyDown },
				contents
			);
		}
	});

	Tabs.TabPane = TabPane;
	RC.Tabs = Tabs;
}(Smart.RC);