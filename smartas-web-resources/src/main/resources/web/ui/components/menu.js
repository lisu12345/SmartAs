'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (RC) {
  var noop = _.noop,
      rcUtil = RC.util,
      PropTypes = React.PropTypes,
      assign = _.assign,
      Animate = RC.Animate,
      DOMWrap = RC.DOMWrap,
      guid = rcUtil.guid,
      createChainedFunction = rcUtil.createChainedFunction,
      KeyCode = rcUtil.KeyCode,
      scrollIntoView = rcUtil.scrollIntoView;

  var now = Date.now();

  function getKeyFromChildrenIndex(child, menuEventKey, index) {
    var prefix = menuEventKey || '';
    return child.key || prefix + 'item_' + now + '_' + index;
  }

  function allDisabled(arr) {
    if (!arr.length) {
      return true;
    }
    return arr.every(function (c) {
      return !!c.props.disabled;
    });
  }

  function getActiveKey(props, originalActiveKey) {
    var activeKey = originalActiveKey;
    var children = props.children;
    var eventKey = props.eventKey;
    if (activeKey) {
      var found = void 0;
      React.Children.forEach(children, function (c, i) {
        if (!c.props.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
          found = true;
        }
      });
      if (found) {
        return activeKey;
      }
    }
    activeKey = null;
    if (props.defaultActiveFirst) {
      React.Children.forEach(children, function (c, i) {
        if (!activeKey && !c.props.disabled) {
          activeKey = getKeyFromChildrenIndex(c, eventKey, i);
        }
      });
      return activeKey;
    }
    return activeKey;
  }

  function saveRef(index, subIndex, c) {
    if (c) {
      if (subIndex !== undefined) {
        this.instanceArray[index] = this.instanceArray[index] || [];
        this.instanceArray[index][subIndex] = c;
      } else {
        this.instanceArray[index] = c;
      }
    }
  }

  var MenuMixin = {
    propTypes: {
      focusable: React.PropTypes.bool,
      multiple: React.PropTypes.bool,
      style: React.PropTypes.object,
      defaultActiveFirst: React.PropTypes.bool,
      visible: React.PropTypes.bool,
      activeKey: React.PropTypes.string,
      selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultOpenKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      children: React.PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-menu',
        className: '',
        mode: 'vertical',
        level: 1,
        inlineIndent: 24,
        visible: true,
        focusable: true,
        style: {}
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      return {
        activeKey: getActiveKey(props, props.activeKey)
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var props = void 0;
      if (nextProps.activeKey) {
        props = {
          activeKey: getActiveKey(nextProps, nextProps.activeKey)
        };
      } else {
        var originalActiveKey = this.state.activeKey;
        var activeKey = getActiveKey(nextProps, originalActiveKey);
        // fix: this.setState(), parent.render(),
        if (activeKey !== originalActiveKey) {
          props = {
            activeKey: activeKey
          };
        }
      }
      if (props) {
        this.setState(props);
      }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible;
    },
    componentWillMount: function componentWillMount() {
      this.instanceArray = [];
    },


    // all keyboard events callbacks run from here at first
    onKeyDown: function onKeyDown(e) {
      var _this = this;

      var keyCode = e.keyCode;
      var handled = void 0;
      this.getFlatInstanceArray().forEach(function (obj) {
        if (obj && obj.props.active) {
          handled = obj.onKeyDown(e);
        }
      });
      if (handled) {
        return 1;
      }
      var activeItem = null;
      if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
        activeItem = this.step(keyCode === KeyCode.UP ? -1 : 1);
      }
      if (activeItem) {
        e.preventDefault();
        this.setState({
          activeKey: activeItem.props.eventKey
        }, function () {
          scrollIntoView(ReactDOM.findDOMNode(activeItem), ReactDOM.findDOMNode(_this), {
            onlyScrollIfNeeded: true
          });
        });
        return 1;
      } else if (activeItem === undefined) {
        e.preventDefault();
        this.setState({
          activeKey: null
        });
        return 1;
      }
    },
    onCommonItemHover: function onCommonItemHover(e) {
      var mode = this.props.mode;
      var key = e.key;
      var hover = e.hover;
      var trigger = e.trigger;

      var activeKey = this.state.activeKey;
      if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
        this.setState({
          activeKey: hover ? key : null
        });
      } else {}
      // keep active for sub menu for click active
      // empty

      // clear last open status
      if (hover && mode !== 'inline') {
        var activeItem = this.getFlatInstanceArray().filter(function (c) {
          return c && c.props.eventKey === activeKey;
        })[0];
        if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
          this.onOpenChange({
            item: activeItem,
            key: activeItem.props.eventKey,
            open: false
          });
        }
      }
    },
    getFlatInstanceArray: function getFlatInstanceArray() {
      var instanceArray = this.instanceArray;
      var hasInnerArray = instanceArray.some(function (a) {
        return Array.isArray(a);
      });
      if (hasInnerArray) {
        instanceArray = [];
        this.instanceArray.forEach(function (a) {
          if (Array.isArray(a)) {
            instanceArray.push.apply(instanceArray, a);
          } else {
            instanceArray.push(a);
          }
        });
        this.instanceArray = instanceArray;
      }
      return instanceArray;
    },
    renderCommonMenuItem: function renderCommonMenuItem(child, i, subIndex, extraProps) {
      var state = this.state;
      var props = this.props;
      var key = getKeyFromChildrenIndex(child, props.eventKey, i);
      var childProps = child.props;
      /*if(!childProps){
        return null;
      }*/
      var newChildProps = assign({
        mode: props.mode,
        level: props.level,
        inlineIndent: props.inlineIndent,
        renderMenuItem: this.renderMenuItem,
        rootPrefixCls: props.prefixCls,
        index: i,
        parentMenu: this,
        ref: childProps.disabled ? undefined : createChainedFunction(child.ref, saveRef.bind(this, i, subIndex)),
        eventKey: key,
        closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
        onItemHover: this.onItemHover,
        active: !childProps.disabled && key === state.activeKey,
        multiple: props.multiple,
        onClick: this.onClick,
        openTransitionName: this.getOpenTransitionName(),
        openAnimation: props.openAnimation,
        onOpenChange: this.onOpenChange,
        onDeselect: this.onDeselect,
        onDestroy: this.onDestroy,
        onSelect: this.onSelect
      }, extraProps);
      if (props.mode === 'inline') {
        newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
      }
      return React.cloneElement(child, newChildProps);
    },
    renderRoot: function renderRoot(props) {
      var _classes;

      this.instanceArray = [];
      var classes = (_classes = {}, _defineProperty(_classes, props.prefixCls, 1), _defineProperty(_classes, props.prefixCls + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
      var domProps = {
        className: classNames(classes),
        role: 'menu',
        'aria-activedescendant': ''
      };
      if (props.id) {
        domProps.id = props.id;
      }
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }
      return(
        // ESLint is not smart enough to know that the type of `children` was checked.
        React.createElement(
          DOMWrap,
          _extends({ style: props.style,
            tag: 'ul',
            hiddenClassName: props.prefixCls + '-hidden',
            visible: props.visible }, domProps),
          ' ',
          React.Children.map(props.children, this.renderMenuItem),
          ' '
        )
      );
    },
    step: function step(direction) {
      var children = this.getFlatInstanceArray();
      var activeKey = this.state.activeKey;
      var len = children.length;
      if (direction < 0) {
        children = children.concat().reverse();
      }
      // find current activeIndex
      var activeIndex = -1;
      children.every(function (c, ci) {
        if (c && c.props.eventKey === activeKey) {
          activeIndex = ci;
          return false;
        }
        return true;
      });
      if (!this.props.defaultActiveFirst && activeIndex !== -1) {
        if (allDisabled(children.slice(activeIndex, len - 1))) {
          return undefined;
        }
      }
      var start = (activeIndex + 1) % len;
      var i = start;
      for (;;) {
        var child = children[i];
        if (!child || child.props.disabled) {
          i = (i + 1 + len) % len;
          // complete a loop
          if (i === start) {
            return null;
          }
        } else {
          return child;
        }
      }
    }
  };

  var Menu = React.createClass({
    displayName: 'Menu',

    propTypes: {
      openSubMenuOnMouseEnter: React.PropTypes.bool,
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultOpenKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      mode: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      openTransitionName: React.PropTypes.string,
      openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
      level: React.PropTypes.number,
      eventKey: React.PropTypes.string,
      selectable: React.PropTypes.bool,
      children: React.PropTypes.any
    },

    mixins: [MenuMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        openSubMenuOnMouseEnter: true,
        closeSubMenuOnMouseLeave: true,
        selectable: true,
        onClick: noop,
        onSelect: noop,
        onOpen: noop,
        onClose: noop,
        onDeselect: noop,
        defaultSelectedKeys: [],
        defaultOpenKeys: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var selectedKeys = props.defaultSelectedKeys;
      var openKeys = props.defaultOpenKeys;
      if ('selectedKeys' in props) {
        selectedKeys = props.selectedKeys || [];
      }
      if ('openKeys' in props) {
        openKeys = props.openKeys || [];
      }
      return {
        selectedKeys: selectedKeys, openKeys: openKeys
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var props = {};
      if ('selectedKeys' in nextProps) {
        props.selectedKeys = nextProps.selectedKeys;
      }
      if ('openKeys' in nextProps) {
        props.openKeys = nextProps.openKeys;
      }
      this.setState(props);
    },
    onDestroy: function onDestroy(key) {
      var state = this.state;
      var props = this.props;
      var selectedKeys = state.selectedKeys;
      var openKeys = state.openKeys;
      var index = selectedKeys.indexOf(key);
      if (!('selectedKeys' in props) && index !== -1) {
        selectedKeys.splice(index, 1);
      }
      index = openKeys.indexOf(key);
      if (!('openKeys' in props) && index !== -1) {
        openKeys.splice(index, 1);
      }
    },
    onItemHover: function onItemHover(e) {
      var _this2 = this;

      var item = e.item;
      // special for top sub menu

      if (this.props.mode !== 'inline' && !this.props.closeSubMenuOnMouseLeave && item.isSubMenu) {
        (function () {
          var activeKey = _this2.state.activeKey;
          var activeItem = _this2.getFlatInstanceArray().filter(function (c) {
            return c && c.props.eventKey === activeKey;
          })[0];
          if (activeItem && activeItem.props.open) {
            _this2.onOpenChange({
              key: item.props.eventKey,
              item: e.item,
              open: true
            });
          }
        })();
      }

      this.onCommonItemHover(e);
    },
    onSelect: function onSelect(selectInfo) {
      var props = this.props;
      if (props.selectable) {
        // root menu
        var selectedKeys = this.state.selectedKeys;
        var selectedKey = selectInfo.key;
        if (props.multiple) {
          selectedKeys = selectedKeys.concat([selectedKey]);
        } else {
          selectedKeys = [selectedKey];
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys
          });
        }
        props.onSelect(assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    onClick: function onClick(e) {
      var props = this.props;
      props.onClick(e);
    },
    onOpenChange: function onOpenChange(e) {
      var openKeys = this.state.openKeys;
      var props = this.props;
      var changed = true;
      if (e.open) {
        changed = openKeys.indexOf(e.key) === -1;
        if (changed) {
          openKeys = openKeys.concat(e.key);
        }
      } else {
        var index = openKeys.indexOf(e.key);
        changed = index !== -1;
        if (changed) {
          openKeys = openKeys.concat();
          openKeys.splice(index, 1);
        }
      }
      if (changed) {
        if (!('openKeys' in this.props)) {
          // hack: batch does not update state
          this.state.openKeys = openKeys;
          this.setState({
            openKeys: openKeys
          });
        }
        var info = assign({
          openKeys: openKeys
        }, e);
        if (e.open) {
          props.onOpen(info);
        } else {
          props.onClose(info);
        }
      }
    },
    onDeselect: function onDeselect(selectInfo) {
      var props = this.props;
      if (props.selectable) {
        var selectedKeys = this.state.selectedKeys.concat();
        var selectedKey = selectInfo.key;
        var index = selectedKeys.indexOf(selectedKey);
        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys
          });
        }
        props.onDeselect(assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    getOpenTransitionName: function getOpenTransitionName() {
      var props = this.props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;
      if (!transitionName && typeof animationName === 'string') {
        transitionName = props.prefixCls + '-open-' + animationName;
      }
      return transitionName;
    },
    isInlineMode: function isInlineMode() {
      return this.props.mode === 'inline';
    },
    lastOpenSubMenu: function lastOpenSubMenu() {
      var _this3 = this;

      var lastOpen = [];
      if (this.state.openKeys.length) {
        lastOpen = this.getFlatInstanceArray().filter(function (c) {
          return c && _this3.state.openKeys.indexOf(c.props.eventKey) !== -1;
        });
      }
      return lastOpen[0];
    },
    renderMenuItem: function renderMenuItem(c, i, subIndex) {
      var key = getKeyFromChildrenIndex(c, this.props.eventKey, i);
      var state = this.state;
      var extraProps = {
        openKeys: state.openKeys,
        open: state.openKeys.indexOf(key) !== -1,
        selectedKeys: state.selectedKeys,
        selected: state.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },
    render: function render() {
      var props = assign({}, this.props);
      props.className += ' ' + props.prefixCls + '-root';
      return this.renderRoot(props);
    }
  });

  var MenuItem = React.createClass({
    displayName: 'MenuItem',

    propTypes: {
      rootPrefixCls: React.PropTypes.string,
      eventKey: React.PropTypes.string,
      active: React.PropTypes.bool,
      selected: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      title: React.PropTypes.string,
      onSelect: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      parentMenu: React.PropTypes.object,
      onItemHover: React.PropTypes.func,
      onDestroy: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        onSelect: function onSelect() {},
        onMouseEnter: function onMouseEnter() {}
      };
    },
    componentWillUnmount: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        return true;
      }
    },
    onMouseLeave: function onMouseLeave() {
      var _this4 = this;

      var eventKey = this.props.eventKey;
      var parentMenu = this.props.parentMenu;
      parentMenu.menuItemMouseLeaveTimer = setTimeout(function () {
        if (_this4.isMounted() && _this4.props.active) {
          _this4.props.onItemHover({
            key: eventKey,
            item: _this4,
            hover: false,
            trigger: 'mouseleave'
          });
        }
      }, 30);
    },
    onMouseEnter: function onMouseEnter() {
      var props = this.props;
      var parentMenu = this.props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      var eventKey = props.eventKey;
      props.onItemHover({
        key: eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
    },
    onClick: function onClick(e) {
      var props = this.props;
      var eventKey = props.eventKey;
      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e
      };
      props.onClick(info);
      if (props.multiple) {
        if (props.selected) {
          props.onDeselect(info);
        } else {
          props.onSelect(info);
        }
      } else if (!props.selected) {
        props.onSelect(info);
      }
    },
    getPrefixCls: function getPrefixCls() {
      return this.props.rootPrefixCls + '-item';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getSelectedClassName: function getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    render: function render() {
      var props = this.props;
      var classes = {};
      classes[this.getActiveClassName()] = !props.disabled && props.active;
      classes[this.getSelectedClassName()] = props.selected;
      classes[this.getDisabledClassName()] = props.disabled;
      classes[this.getPrefixCls()] = true;
      classes[props.className] = !!props.className;
      var attrs = {
        title: props.title,
        className: classNames(classes),
        role: 'menuitem',
        'aria-selected': props.selected,
        'aria-disabled': props.disabled
      };
      var mouseEvent = {};
      if (!props.disabled) {
        mouseEvent = {
          onClick: this.onClick,
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return React.createElement(
        'li',
        _extends({ style: style }, attrs, mouseEvent),
        props.children
      );
    }
  });

  var MenuItemGroup = React.createClass({
    displayName: 'MenuItemGroup',

    propTypes: {
      renderMenuItem: PropTypes.func,
      index: PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        disabled: true
      };
    },
    renderInnerMenuItem: function renderInnerMenuItem(item, subIndex) {
      var renderMenuItem = this.props.renderMenuItem;
      return renderMenuItem(item, this.props.index, subIndex);
    },
    render: function render() {
      var props = this.props;
      var className = props.className || '';
      var rootPrefixCls = props.rootPrefixCls;

      className += ' ' + rootPrefixCls + '-item-group';
      var titleClassName = rootPrefixCls + '-item-group-title';
      var listClassName = rootPrefixCls + '-item-group-list';
      return React.createElement(
        'li',
        { className: className },
        React.createElement(
          'div',
          { className: titleClassName },
          props.title
        ),
        React.createElement(
          'ul',
          { className: listClassName },
          React.Children.map(props.children, this.renderInnerMenuItem)
        )
      );
    }
  });

  var SubPopupMenu = React.createClass({
    displayName: 'SubPopupMenu',

    propTypes: {
      onSelect: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      onOpenChange: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      openTransitionName: React.PropTypes.string,
      openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      visible: React.PropTypes.bool,
      children: React.PropTypes.any
    },

    mixins: [MenuMixin],

    onDeselect: function onDeselect(selectInfo) {
      this.props.onDeselect(selectInfo);
    },
    onSelect: function onSelect(selectInfo) {
      this.props.onSelect(selectInfo);
    },
    onClick: function onClick(e) {
      this.props.onClick(e);
    },
    onOpenChange: function onOpenChange(e) {
      this.props.onOpenChange(e);
    },
    onDestroy: function onDestroy(key) {
      this.props.onDestroy(key);
    },
    onItemHover: function onItemHover(e) {
      this.onCommonItemHover(e);
    },
    getOpenTransitionName: function getOpenTransitionName() {
      return this.props.openTransitionName;
    },
    renderMenuItem: function renderMenuItem(c, i, subIndex) {
      var props = this.props;
      var key = getKeyFromChildrenIndex(c, props.eventKey, i);
      var extraProps = {
        openKeys: props.openKeys,
        selectedKeys: props.selectedKeys,
        open: props.openKeys.indexOf(key) !== -1,
        selected: props.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: true
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },
    render: function render() {
      var renderFirst = this.renderFirst;
      this.renderFirst = 1;
      this.haveOpened = this.haveOpened || this.props.visible;
      if (!this.haveOpened) {
        return null;
      }
      var transitionAppear = true;
      if (!renderFirst && this.props.visible) {
        transitionAppear = false;
      }
      var props = assign({}, this.props);
      props.className += ' ' + props.prefixCls + '-sub';
      var animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (_typeof(props.openAnimation) === 'object') {
        animProps.animation = assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      return React.createElement(
        Animate,
        _extends({}, animProps, {
          showProp: 'visible',
          component: '',
          transitionAppear: transitionAppear }),
        this.renderRoot(props)
      );
    }
  });

  var SubMenuStateMixin = {
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate();
    },
    componentDidUpdate: function componentDidUpdate() {
      if (this.props.mode !== 'inline') {
        if (this.props.open) {
          this.bindRootCloseHandlers();
        } else {
          this.unbindRootCloseHandlers();
        }
      }
    },
    handleDocumentKeyUp: function handleDocumentKeyUp(e) {
      if (e.keyCode === KeyCode.ESC) {
        this.props.onItemHover({
          key: this.props.eventKey,
          item: this,
          hover: false
        });
      }
    },
    handleDocumentClick: function handleDocumentClick(e) {
      // If the click originated from within this component
      // don't do anything.
      if (rcUtil.Dom.contains(ReactDOM.findDOMNode(this), e.target)) {
        return;
      }
      var props = this.props;
      props.onItemHover({
        hover: false,
        item: this,
        key: this.props.eventKey
      });
      this.triggerOpenChange(false);
    },
    bindRootCloseHandlers: function bindRootCloseHandlers() {
      if (!this._onDocumentClickListener) {
        this._onDocumentClickListener = rcUtil.Dom.addEventListener(document, 'click', this.handleDocumentClick);
        this._onDocumentKeyupListener = rcUtil.Dom.addEventListener(document, 'keyup', this.handleDocumentKeyUp);
      }
    },
    unbindRootCloseHandlers: function unbindRootCloseHandlers() {
      if (this._onDocumentClickListener) {
        this._onDocumentClickListener.remove();
        this._onDocumentClickListener = null;
      }

      if (this._onDocumentKeyupListener) {
        this._onDocumentKeyupListener.remove();
        this._onDocumentKeyupListener = null;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      this.unbindRootCloseHandlers();
    }
  };

  var Divider = React.createClass({
    displayName: 'Divider',
    getDefaultProps: function getDefaultProps() {
      return {
        disabled: true
      };
    },
    render: function render() {
      var props = this.props;
      var className = props.className || '';
      var rootPrefixCls = props.rootPrefixCls;
      className += ' ' + (rootPrefixCls + '-item-divider');
      return React.createElement('li', _extends({}, props, { className: className }));
    }
  });

  var SubMenu = React.createClass({
    displayName: 'SubMenu',

    propTypes: {
      parentMenu: React.PropTypes.object,
      title: React.PropTypes.node,
      onClick: React.PropTypes.func,
      onOpenChange: React.PropTypes.func,
      rootPrefixCls: React.PropTypes.string,
      eventKey: React.PropTypes.string,
      multiple: React.PropTypes.bool,
      active: React.PropTypes.bool,
      open: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      openSubMenuOnMouseEnter: React.PropTypes.bool,
      onDeselect: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      onItemHover: React.PropTypes.func
    },

    mixins: [SubMenuStateMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        onMouseEnter: function onMouseEnter() {},

        title: ''
      };
    },
    getInitialState: function getInitialState() {
      this.isSubMenu = 1;
      return {
        defaultActiveFirst: false
      };
    },
    componentWillUnmount: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },
    onDestroy: function onDestroy(key) {
      this.props.onDestroy(key);
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      var menu = this.menuInstance;

      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        this.setState({
          defaultActiveFirst: true
        });
        return true;
      }

      if (keyCode === KeyCode.RIGHT) {
        if (this.props.open) {
          menu.onKeyDown(e);
        } else {
          this.triggerOpenChange(true);
          this.setState({
            defaultActiveFirst: true
          });
        }
        return true;
      }
      if (keyCode === KeyCode.LEFT) {
        var handled = void 0;
        if (this.props.open) {
          handled = menu.onKeyDown(e);
        } else {
          return undefined;
        }
        if (!handled) {
          this.triggerOpenChange(false);
          handled = true;
        }
        return handled;
      }

      if (this.props.open && (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN)) {
        return menu.onKeyDown(e);
      }
    },
    onSubTreeMouseEnter: function onSubTreeMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    },
    onOpenChange: function onOpenChange(e) {
      this.props.onOpenChange(this.addKeyPath(e));
    },
    onMouseEnter: function onMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
      var props = this.props;
      var parentMenu = props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
      if (props.openSubMenuOnMouseEnter) {
        this.triggerOpenChange(true);
      }
      this.setState({
        defaultActiveFirst: false
      });
    },
    onMouseLeave: function onMouseLeave() {
      var _this5 = this;

      // prevent popup menu and submenu gap
      this.leaveTimer = setTimeout(function () {
        // leave whole sub tree
        // still active
        if (_this5.isMounted() && _this5.props.active) {
          _this5.props.onItemHover({
            key: _this5.props.eventKey,
            item: _this5,
            hover: false,
            trigger: 'mouseleave'
          });
        }
        if (_this5.isMounted() && _this5.props.open) {
          if (_this5.props.closeSubMenuOnMouseLeave) {
            _this5.triggerOpenChange(false);
          }
        }
      }, 100);
    },
    onClick: function onClick() {
      if (this.props.openSubMenuOnMouseEnter) {
        return;
      }
      this.triggerOpenChange(!this.props.open, 'click');
      this.setState({
        defaultActiveFirst: false
      });
    },
    onSubMenuClick: function onSubMenuClick(info) {
      this.props.onClick(this.addKeyPath(info));
    },
    onSelect: function onSelect(info) {
      this.props.onSelect(info);
    },
    onDeselect: function onDeselect(info) {
      this.props.onDeselect(info);
    },
    getPrefixCls: function getPrefixCls() {
      return this.props.rootPrefixCls + '-submenu';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    getOpenClassName: function getOpenClassName() {
      return this.props.rootPrefixCls + '-submenu-open';
    },
    saveMenuInstance: function saveMenuInstance(c) {
      this.menuInstance = c;
    },
    addKeyPath: function addKeyPath(info) {
      return assign({}, info, {
        keyPath: (info.keyPath || []).concat(this.props.eventKey)
      });
    },
    triggerOpenChange: function triggerOpenChange(open, type) {
      var key = this.props.eventKey;
      this.onOpenChange({
        key: key,
        item: this,
        trigger: type,
        open: open
      });
    },
    renderChildren: function renderChildren(children) {
      var props = this.props;
      var baseProps = {
        mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
        visible: props.open,
        level: props.level + 1,
        inlineIndent: props.inlineIndent,
        focusable: false,
        onClick: this.onSubMenuClick,
        onSelect: this.onSelect,
        onDeselect: this.onDeselect,
        onDestroy: this.onDestroy,
        selectedKeys: props.selectedKeys,
        eventKey: props.eventKey + '-menu-',
        openKeys: props.openKeys,
        openTransitionName: props.openTransitionName,
        openAnimation: props.openAnimation,
        onOpenChange: this.onOpenChange,
        closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
        defaultActiveFirst: this.state.defaultActiveFirst,
        multiple: props.multiple,
        prefixCls: props.rootPrefixCls,
        id: this._menuId,
        ref: this.saveMenuInstance
      };
      return React.createElement(
        SubPopupMenu,
        baseProps,
        children
      );
    },
    render: function render() {
      var _classes2;

      this.haveOpen = this.haveOpen || this.props.open;
      var props = this.props;
      var prefixCls = this.getPrefixCls();
      var classes = (_classes2 = {}, _defineProperty(_classes2, props.className, !!props.className), _defineProperty(_classes2, prefixCls + '-' + props.mode, 1), _classes2);

      classes[this.getOpenClassName()] = this.props.open;
      classes[this.getActiveClassName()] = props.active;
      classes[this.getDisabledClassName()] = props.disabled;
      this._menuId = this._menuId || guid();
      classes[prefixCls] = true;
      classes[prefixCls + '-' + props.mode] = 1;
      var clickEvents = {};
      var mouseEvents = {};
      var titleMouseEvents = {};
      if (!props.disabled) {
        clickEvents = {
          onClick: this.onClick
        };
        mouseEvents = {
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onSubTreeMouseEnter
        };
        // only works in title, not outer li
        titleMouseEvents = {
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return React.createElement(
        'li',
        _extends({ className: classNames(classes) }, mouseEvents),
        React.createElement(
          'div',
          _extends({
            style: style,
            className: prefixCls + '-title'
          }, titleMouseEvents, clickEvents, {
            'aria-open': props.open,
            'aria-owns': this._menuId,
            'aria-haspopup': 'true' }),
          props.title
        ),
        this.renderChildren(props.children)
      );
    }
  });

  Menu.Divider = Divider;
  Menu.Item = MenuItem;
  Menu.SubMenu = SubMenu;
  Menu.ItemGroup = MenuItemGroup;

  RC.MenuItem = MenuItem;
  RC.MenuItemGroup = MenuItemGroup;
  RC.SubMenu = SubMenu;
  RC.Menu = Menu;
}(Smart.RC);