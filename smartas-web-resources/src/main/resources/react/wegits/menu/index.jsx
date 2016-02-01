+ function(UI,RC) {
  const noop = _.noop,
    rcUtil = RC.Util,
    guid = rcUtil.guid,
    createChainedFunction = rcUtil.createChainedFunction,
    KeyCode = rcUtil.KeyCode,
    animation = RC.Animation,
    DOMWrap = RC.DOMWrap,
    PropTypes = React.PropTypes,
    assign = _.assign,
    Animate = UI.Animate,
    scrollIntoView = rcUtil.scrollIntoView;

  const now = Date.now();

  function getKeyFromChildrenIndex(child, menuEventKey, index) {
    const prefix = menuEventKey || '';
    return child.key || prefix + 'item_' + now + '_' + index;
  }


  function allDisabled(arr) {
    if (!arr.length) {
      return true;
    }
    return arr.every(c => !!c.props.disabled);
  }

  function getActiveKey(props, originalActiveKey) {
    let activeKey = originalActiveKey;
    const children = props.children;
    const eventKey = props.eventKey;
    if (activeKey) {
      let found;
      React.Children.forEach(children, (c, i) => {
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
      React.Children.forEach(children, (c, i) => {
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

  const MenuMixin = {
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
      children: React.PropTypes.any,
    },

    getDefaultProps() {
      return {
        prefixCls: 'rc-menu',
        className: '',
        mode: 'vertical',
        level: 1,
        inlineIndent: 24,
        visible: true,
        focusable: true,
        style: {},
      };
    },

    getInitialState() {
      const props = this.props;
      return {
        activeKey: getActiveKey(props, props.activeKey),
      };
    },

    componentWillReceiveProps(nextProps) {
      let props;
      if (nextProps.activeKey) {
        props = {
          activeKey: getActiveKey(nextProps, nextProps.activeKey),
        };
      } else {
        const originalActiveKey = this.state.activeKey;
        const activeKey = getActiveKey(nextProps, originalActiveKey);
        // fix: this.setState(), parent.render(),
        if (activeKey !== originalActiveKey) {
          props = {
            activeKey,
          };
        }
      }
      if (props) {
        this.setState(props);
      }
    },

    shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible;
    },

    componentWillMount() {
      this.instanceArray = [];
    },

    // all keyboard events callbacks run from here at first
    onKeyDown(e) {
      const keyCode = e.keyCode;
      let handled;
      this.getFlatInstanceArray().forEach((obj) => {
        if (obj && obj.props.active) {
          handled = obj.onKeyDown(e);
        }
      });
      if (handled) {
        return 1;
      }
      let activeItem = null;
      if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
        activeItem = this.step(keyCode === KeyCode.UP ? -1 : 1);
      }
      if (activeItem) {
        e.preventDefault();
        this.setState({
          activeKey: activeItem.props.eventKey,
        }, () => {
          scrollIntoView(ReactDOM.findDOMNode(activeItem), ReactDOM.findDOMNode(this), {
            onlyScrollIfNeeded: true,
          });
        });
        return 1;
      } else if (activeItem === undefined) {
        e.preventDefault();
        this.setState({
          activeKey: null,
        });
        return 1;
      }
    },

    onCommonItemHover(e) {
      const {
        mode
      } = this.props;
      const {
        key, hover, trigger
      } = e;
      const activeKey = this.state.activeKey;
      if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
        this.setState({
          activeKey: hover ? key : null,
        });
      } else {
        // keep active for sub menu for click active
        // empty
      }
      // clear last open status
      if (hover && mode !== 'inline') {
        const activeItem = this.getFlatInstanceArray().filter((c) => {
          return c && c.props.eventKey === activeKey;
        })[0];
        if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
          this.onOpenChange({
            item: activeItem,
            key: activeItem.props.eventKey,
            open: false,
          });
        }
      }
    },

    getFlatInstanceArray() {
      let instanceArray = this.instanceArray;
      const hasInnerArray = instanceArray.some((a) => {
        return Array.isArray(a);
      });
      if (hasInnerArray) {
        instanceArray = [];
        this.instanceArray.forEach((a) => {
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

    renderCommonMenuItem(child, i, subIndex, extraProps) {
      const state = this.state;
      const props = this.props;
      const key = getKeyFromChildrenIndex(child, props.eventKey, i);
      const childProps = child.props;
      /*if(!childProps){
        return null;
      }*/
      const newChildProps = assign({
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
        onSelect: this.onSelect,
      }, extraProps);
      if (props.mode === 'inline') {
        newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
      }
      return React.cloneElement(child, newChildProps);
    },

    renderRoot(props) {
      this.instanceArray = [];
      const classes = {
        [props.prefixCls]: 1, [`${props.prefixCls}-${props.mode}`]: 1, [props.className]: !!props.className,
      };
      const domProps = {
        className: classNames(classes),
        role: 'menu',
        'aria-activedescendant': '',
      };
      if (props.id) {
        domProps.id = props.id;
      }
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }
      return (
        // ESLint is not smart enough to know that the type of `children` was checked.
        <DOMWrap style = {
          props.style
        }
        tag = "ul"
        hiddenClassName = {
          `${props.prefixCls}-hidden`
        }
        visible = {
          props.visible
        } {...domProps
        } > {
          React.Children.map(props.children, this.renderMenuItem)
        } </DOMWrap>
      );
    },

    step(direction) {
      let children = this.getFlatInstanceArray();
      const activeKey = this.state.activeKey;
      const len = children.length;
      if (direction < 0) {
        children = children.concat().reverse();
      }
      // find current activeIndex
      let activeIndex = -1;
      children.every((c, ci) => {
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
      const start = (activeIndex + 1) % len;
      let i = start;
      for (;;) {
        const child = children[i];
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
    },
  };

  const Menu = React.createClass({
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
      children: React.PropTypes.any,
    },

    mixins: [MenuMixin],

    getDefaultProps() {
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
        defaultOpenKeys: [],
      };
    },

    getInitialState() {
      const props = this.props;
      let selectedKeys = props.defaultSelectedKeys;
      let openKeys = props.defaultOpenKeys;
      if ('selectedKeys' in props) {
        selectedKeys = props.selectedKeys || [];
      }
      if ('openKeys' in props) {
        openKeys = props.openKeys || [];
      }
      return {
        selectedKeys, openKeys,
      };
    },

    componentWillReceiveProps(nextProps) {
      const props = {};
      if ('selectedKeys' in nextProps) {
        props.selectedKeys = nextProps.selectedKeys;
      }
      if ('openKeys' in nextProps) {
        props.openKeys = nextProps.openKeys;
      }
      this.setState(props);
    },

    onDestroy(key) {
      const state = this.state;
      const props = this.props;
      const selectedKeys = state.selectedKeys;
      const openKeys = state.openKeys;
      let index = selectedKeys.indexOf(key);
      if (!('selectedKeys' in props) && index !== -1) {
        selectedKeys.splice(index, 1);
      }
      index = openKeys.indexOf(key);
      if (!('openKeys' in props) && index !== -1) {
        openKeys.splice(index, 1);
      }
    },

    onItemHover(e) {
      const {
        item
      } = e;
      // special for top sub menu
      if (this.props.mode !== 'inline' && !this.props.closeSubMenuOnMouseLeave && item.isSubMenu) {
        const activeKey = this.state.activeKey;
        const activeItem = this.getFlatInstanceArray().filter((c) => {
          return c && c.props.eventKey === activeKey;
        })[0];
        if (activeItem && activeItem.props.open) {
          this.onOpenChange({
            key: item.props.eventKey,
            item: e.item,
            open: true,
          });
        }
      }

      this.onCommonItemHover(e);
    },

    onSelect(selectInfo) {
      const props = this.props;
      if (props.selectable) {
        // root menu
        let selectedKeys = this.state.selectedKeys;
        const selectedKey = selectInfo.key;
        if (props.multiple) {
          selectedKeys = selectedKeys.concat([selectedKey]);
        } else {
          selectedKeys = [selectedKey];
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys,
          });
        }
        props.onSelect(assign({}, selectInfo, {
          selectedKeys: selectedKeys,
        }));
      }
    },

    onClick(e) {
      const props = this.props;
      props.onClick(e);
    },

    onOpenChange(e) {
      let openKeys = this.state.openKeys;
      const props = this.props;
      let changed = true;
      if (e.open) {
        changed = openKeys.indexOf(e.key) === -1;
        if (changed) {
          openKeys = openKeys.concat(e.key);
        }
      } else {
        const index = openKeys.indexOf(e.key);
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
            openKeys
          });
        }
        const info = assign({
          openKeys
        }, e);
        if (e.open) {
          props.onOpen(info);
        } else {
          props.onClose(info);
        }
      }
    },

    onDeselect(selectInfo) {
      const props = this.props;
      if (props.selectable) {
        const selectedKeys = this.state.selectedKeys.concat();
        const selectedKey = selectInfo.key;
        const index = selectedKeys.indexOf(selectedKey);
        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys,
          });
        }
        props.onDeselect(assign({}, selectInfo, {
          selectedKeys: selectedKeys,
        }));
      }
    },

    getOpenTransitionName() {
      const props = this.props;
      let transitionName = props.openTransitionName;
      const animationName = props.openAnimation;
      if (!transitionName && typeof animationName === 'string') {
        transitionName = `${props.prefixCls}-open-${animationName}`;
      }
      return transitionName;
    },

    isInlineMode() {
      return this.props.mode === 'inline';
    },

    lastOpenSubMenu() {
      let lastOpen = [];
      if (this.state.openKeys.length) {
        lastOpen = this.getFlatInstanceArray().filter((c) => {
          return c && this.state.openKeys.indexOf(c.props.eventKey) !== -1;
        });
      }
      return lastOpen[0];
    },

    renderMenuItem(c, i, subIndex) {
      const key = getKeyFromChildrenIndex(c, this.props.eventKey, i);
      const state = this.state;
      const extraProps = {
        openKeys: state.openKeys,
        open: state.openKeys.indexOf(key) !== -1,
        selectedKeys: state.selectedKeys,
        selected: state.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter,
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },

    render() {
      const props = assign({}, this.props);
      props.className += ` ${props.prefixCls}-root`;
      return this.renderRoot(props);
    },
  });


  const MenuItem = React.createClass({
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
      onDestroy: React.PropTypes.func,
    },

    getDefaultProps() {
      return {
        onSelect() {},
          onMouseEnter() {},
      };
    },

    componentWillUnmount() {
      const props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },

    onKeyDown(e) {
      const keyCode = e.keyCode;
      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        return true;
      }
    },

    onMouseLeave() {
      const eventKey = this.props.eventKey;
      const parentMenu = this.props.parentMenu;
      parentMenu.menuItemMouseLeaveTimer = setTimeout(() => {
        if (this.isMounted() && this.props.active) {
          this.props.onItemHover({
            key: eventKey,
            item: this,
            hover: false,
            trigger: 'mouseleave',
          });
        }
      }, 30);
    },

    onMouseEnter() {
      const props = this.props;
      const parentMenu = this.props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      const eventKey = props.eventKey;
      props.onItemHover({
        key: eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter',
      });
    },

    onClick(e) {
      const props = this.props;
      const eventKey = props.eventKey;
      const info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e,
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

    getPrefixCls() {
      return this.props.rootPrefixCls + '-item';
    },

    getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },

    getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    },

    getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },

    render() {
      const props = this.props;
      const classes = {};
      classes[this.getActiveClassName()] = !props.disabled && props.active;
      classes[this.getSelectedClassName()] = props.selected;
      classes[this.getDisabledClassName()] = props.disabled;
      classes[this.getPrefixCls()] = true;
      classes[props.className] = !!props.className;
      const attrs = {
        title: props.title,
        className: classNames(classes),
        role: 'menuitem',
        'aria-selected': props.selected,
        'aria-disabled': props.disabled,
      };
      let mouseEvent = {};
      if (!props.disabled) {
        mouseEvent = {
          onClick: this.onClick,
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter,
        };
      }
      const style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return <li style = {style} {...attrs} {...mouseEvent}>{props.children}</li>;
    },
  });


  const MenuItemGroup = React.createClass({
    propTypes: {
      renderMenuItem: PropTypes.func,
      index: PropTypes.number,
    },

    getDefaultProps() {
      return {
        disabled: true,
      };
    },

    renderInnerMenuItem(item, subIndex) {
      const renderMenuItem = this.props.renderMenuItem;
      return renderMenuItem(item, this.props.index, subIndex);
    },

    render() {
      const props = this.props;
      let className = props.className || '';
      const rootPrefixCls = props.rootPrefixCls;

      className += ` ${rootPrefixCls}-item-group`;
      const titleClassName = `${rootPrefixCls}-item-group-title`;
      const listClassName = `${rootPrefixCls}-item-group-list`;
      return (<li className={className}>
      <div className={titleClassName}>{props.title}</div>
      <ul className={listClassName}>
        {React.Children.map(props.children, this.renderInnerMenuItem)}
      </ul>
    </li>);
    },
  });



  const SubPopupMenu = React.createClass({
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
      children: React.PropTypes.any,
    },

    mixins: [MenuMixin],

    onDeselect(selectInfo) {
      this.props.onDeselect(selectInfo);
    },

    onSelect(selectInfo) {
      this.props.onSelect(selectInfo);
    },

    onClick(e) {
      this.props.onClick(e);
    },

    onOpenChange(e) {
      this.props.onOpenChange(e);
    },

    onDestroy(key) {
      this.props.onDestroy(key);
    },

    onItemHover(e) {
      this.onCommonItemHover(e);
    },

    getOpenTransitionName() {
      return this.props.openTransitionName;
    },

    renderMenuItem(c, i, subIndex) {
      const props = this.props;
      const key = getKeyFromChildrenIndex(c, props.eventKey, i);
      const extraProps = {
        openKeys: props.openKeys,
        selectedKeys: props.selectedKeys,
        open: props.openKeys.indexOf(key) !== -1,
        selected: props.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: true,
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },

    render() {
      const renderFirst = this.renderFirst;
      this.renderFirst = 1;
      this.haveOpened = this.haveOpened || this.props.visible;
      if (!this.haveOpened) {
        return null;
      }
      let transitionAppear = true;
      if (!renderFirst && this.props.visible) {
        transitionAppear = false;
      }
      const props = assign({}, this.props);
      props.className += ` ${props.prefixCls}-sub`;
      const animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (typeof props.openAnimation === 'object') {
        animProps.animation = assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      return <Animate {...animProps}
      showProp = "visible"
      component = ""
      transitionAppear = {transitionAppear}>{this.renderRoot(props)}</Animate>;
    },
  });


  const SubMenuStateMixin = {
    componentDidMount() {
        this.componentDidUpdate();
      },

      componentDidUpdate() {
        if (this.props.mode !== 'inline') {
          if (this.props.open) {
            this.bindRootCloseHandlers();
          } else {
            this.unbindRootCloseHandlers();
          }
        }
      },

      handleDocumentKeyUp(e) {
        if (e.keyCode === KeyCode.ESC) {
          this.props.onItemHover({
            key: this.props.eventKey,
            item: this,
            hover: false,
          });
        }
      },

      handleDocumentClick(e) {
        // If the click originated from within this component
        // don't do anything.
        if (rcUtil.Dom.contains(ReactDOM.findDOMNode(this), e.target)) {
          return;
        }
        const props = this.props;
        props.onItemHover({
          hover: false,
          item: this,
          key: this.props.eventKey,
        });
        this.triggerOpenChange(false);
      },

      bindRootCloseHandlers() {
        if (!this._onDocumentClickListener) {
          this._onDocumentClickListener = rcUtil.Dom.addEventListener(document, 'click', this.handleDocumentClick);
          this._onDocumentKeyupListener = rcUtil.Dom.addEventListener(document, 'keyup', this.handleDocumentKeyUp);
        }
      },

      unbindRootCloseHandlers() {
        if (this._onDocumentClickListener) {
          this._onDocumentClickListener.remove();
          this._onDocumentClickListener = null;
        }

        if (this._onDocumentKeyupListener) {
          this._onDocumentKeyupListener.remove();
          this._onDocumentKeyupListener = null;
        }
      },

      componentWillUnmount() {
        this.unbindRootCloseHandlers();
      },
  };


  const Divider = React.createClass({
    getDefaultProps() {
        return {
          disabled: true,
        };
      },

      render() {
        const props = this.props;
        let className = props.className || '';
        const rootPrefixCls = props.rootPrefixCls;
        className += ' ' + `${rootPrefixCls}-item-divider`;
        return <li {...props} className = {className}></li>;
      },
  });

  const AntMenu = React.createClass({
    getDefaultProps() {
        return {
          prefixCls: 'ant-menu',
          onClick: noop,
          onOpen: noop,
          onClose: noop,
          className: '',
          theme: 'light', // or dark
        };
      },
      getInitialState() {
        return {
          openKeys: []
        };
      },
      handleClick(e) {
        this.setState({
          openKeys: []
        });
        this.props.onClick(e);
      },
      handleOpenKeys(e) {
        this.setState({
          openKeys: e.openKeys
        });
        this.props.onOpen(e);
      },
      handleCloseKeys(e) {
        this.setState({
          openKeys: e.openKeys
        });
        this.props.onClose(e);
      },
      render() {
        let openAnimation = this.props.openAnimation || this.props.openTransitionName;
        if (!openAnimation) {
          switch (this.props.mode) {
            case 'horizontal':
              openAnimation = 'slide-up';
              break;
            case 'vertical':
              openAnimation = 'zoom-big';
              break;
            case 'inline':
              openAnimation = animation;
              break;
            default:
          }
        }

        let props = {};
        const className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
        if (this.props.mode !== 'inline') {
          // 这组属性的目的是
          // 弹出型的菜单需要点击后立即关闭
          // 另外，弹出型的菜单的受控模式没有使用场景
          props = {
            openKeys: this.state.openKeys,
            onClick: this.handleClick,
            onOpen: this.handleOpenKeys,
            onClose: this.handleCloseKeys,
            openTransitionName: openAnimation,
            className,
          };
        } else {
          props = {
            openAnimation,
            className,
          };
        }
        return <Menu {...this.props} {...props}></Menu>
      }
  });

  const SubMenu = React.createClass({
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
      onItemHover: React.PropTypes.func,
    },

    mixins: [SubMenuStateMixin],

    getDefaultProps() {
      return {
        onMouseEnter() {},
          title: '',
      };
    },

    getInitialState() {
      this.isSubMenu = 1;
      return {
        defaultActiveFirst: false,
      };
    },

    componentWillUnmount() {
      const props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },

    onDestroy(key) {
      this.props.onDestroy(key);
    },

    onKeyDown(e) {
      const keyCode = e.keyCode;
      const menu = this.menuInstance;

      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        this.setState({
          defaultActiveFirst: true,
        });
        return true;
      }

      if (keyCode === KeyCode.RIGHT) {
        if (this.props.open) {
          menu.onKeyDown(e);
        } else {
          this.triggerOpenChange(true);
          this.setState({
            defaultActiveFirst: true,
          });
        }
        return true;
      }
      if (keyCode === KeyCode.LEFT) {
        let handled;
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

    onSubTreeMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    },

    onOpenChange(e) {
      this.props.onOpenChange(this.addKeyPath(e));
    },

    onMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
      const props = this.props;
      const parentMenu = props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter',
      });
      if (props.openSubMenuOnMouseEnter) {
        this.triggerOpenChange(true);
      }
      this.setState({
        defaultActiveFirst: false,
      });
    },

    onMouseLeave() {
      // prevent popup menu and submenu gap
      this.leaveTimer = setTimeout(() => {
        // leave whole sub tree
        // still active
        if (this.isMounted() && this.props.active) {
          this.props.onItemHover({
            key: this.props.eventKey,
            item: this,
            hover: false,
            trigger: 'mouseleave',
          });
        }
        if (this.isMounted() && this.props.open) {
          if (this.props.closeSubMenuOnMouseLeave) {
            this.triggerOpenChange(false);
          }
        }
      }, 100);
    },

    onClick() {
      if (this.props.openSubMenuOnMouseEnter) {
        return;
      }
      this.triggerOpenChange(!this.props.open, 'click');
      this.setState({
        defaultActiveFirst: false,
      });
    },

    onSubMenuClick(info) {
      this.props.onClick(this.addKeyPath(info));
    },

    onSelect(info) {
      this.props.onSelect(info);
    },

    onDeselect(info) {
      this.props.onDeselect(info);
    },

    getPrefixCls() {
      return this.props.rootPrefixCls + '-submenu';
    },

    getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },

    getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },

    getOpenClassName() {
      return this.props.rootPrefixCls + '-submenu-open';
    },

    saveMenuInstance(c) {
      this.menuInstance = c;
    },

    addKeyPath(info) {
      return assign({}, info, {
        keyPath: (info.keyPath || []).concat(this.props.eventKey),
      });
    },

    triggerOpenChange(open, type) {
      const key = this.props.eventKey;
      this.onOpenChange({
        key: key,
        item: this,
        trigger: type,
        open: open,
      });
    },

    renderChildren(children) {
      const props = this.props;
      const baseProps = {
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
        ref: this.saveMenuInstance,
      };
      return <SubPopupMenu {...baseProps}>{children}</SubPopupMenu>;
    },

    render() {
      this.haveOpen = this.haveOpen || this.props.open;
      const props = this.props;
      const prefixCls = this.getPrefixCls();
      const classes = {
        [props.className]: !!props.className, [`${prefixCls}-${props.mode}`]: 1,
      };

      classes[this.getOpenClassName()] = this.props.open;
      classes[this.getActiveClassName()] = props.active;
      classes[this.getDisabledClassName()] = props.disabled;
      this._menuId = this._menuId || guid();
      classes[prefixCls] = true;
      classes[prefixCls + '-' + props.mode] = 1;
      let clickEvents = {};
      let mouseEvents = {};
      let titleMouseEvents = {};
      if (!props.disabled) {
        clickEvents = {
          onClick: this.onClick,
        };
        mouseEvents = {
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onSubTreeMouseEnter,
        };
        // only works in title, not outer li
        titleMouseEvents = {
          onMouseEnter: this.onMouseEnter,
        };
      }
      const style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return (
        <li className={classNames(classes)} {...mouseEvents}>
        <div
          style={style}
          className={prefixCls + '-title'}
          {...titleMouseEvents}
          {...clickEvents}
          aria-open={props.open}
          aria-owns={this._menuId}
          aria-haspopup="true">{props.title}</div>
        {this.renderChildren(props.children)}
      </li>
      );
    },
  });

  AntMenu.Divider = Divider;
  AntMenu.Item = MenuItem;
  AntMenu.SubMenu = SubMenu;
  AntMenu.ItemGroup = MenuItemGroup;
  UI.Menu = AntMenu;
  UI.MenuItem = MenuItem;
  UI.SubMenu = SubMenu;
  UI.MenuItemGroup = MenuItemGroup;
}(Smart.UI,Smart.RC)