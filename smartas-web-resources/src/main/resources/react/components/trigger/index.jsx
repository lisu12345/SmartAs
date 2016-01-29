+ function(UI) {

const noop = _.noop,
    rcUtil = UI.util,
    Dom = rcUtil.Dom,
    createChainedFunction = rcUtil.createChainedFunction,
    PropTypes = React.PropTypes,
    findDOMNode = ReactDOM.findDOMNode,
    assign = _.assign,
    Animate = UI.Animate,
    Align = UI.Align;

	function isPointsEq(a1, a2) {
		return a1[0] === a2[0] && a1[1] === a2[1];
	}

	function getAlignFromPlacement(builtinPlacements, placementStr, align) {
		const baseAlign = builtinPlacements[placementStr] || {};
		return {...baseAlign, ...align
		};
	}

	function getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
		const points = align.points;
		for (const placement in builtinPlacements) {
			if (builtinPlacements.hasOwnProperty(placement)) {
				if (isPointsEq(builtinPlacements[placement].points, points)) {
					return `${prefixCls}-placement-${placement}`;
				}
			}
		}
		return '';
	}

	const PopupInner = React.createClass({
		propTypes: {
			hiddenClassName: PropTypes.string,
			className: PropTypes.string,
			onMouseEnter: PropTypes.func,
			onMouseLeave: PropTypes.func,
			children: PropTypes.any,
		},
		render() {
			const props = this.props;
			let className = props.className;
			if (!props.visible) {
				className += ' ' + props.hiddenClassName;
			}
			return (<div className={className}
                 onMouseEnter={props.onMouseEnter}
                 onMouseLeave={props.onMouseLeave}
                 style={props.style}>{props.children}</div>);
		},
	});

	const Popup = React.createClass({
  propTypes: {
    visible: PropTypes.bool,
    wrap: PropTypes.object,
    style: PropTypes.object,
    getClassNameFromAlign: PropTypes.func,
    onMouseEnter: PropTypes.func,
    className: PropTypes.string,
    onMouseLeave: PropTypes.func,
  },

  componentDidMount() {
    this.rootNode = this.getPopupDomNode();
  },

  onAlign(popupDomNode, align) {
    const props = this.props;
    const alignClassName = props.getClassNameFromAlign(props.align);
    const currentAlignClassName = props.getClassNameFromAlign(align);
    if (alignClassName !== currentAlignClassName) {
      this.currentAlignClassName = currentAlignClassName;
      popupDomNode.className = this.getClassName(currentAlignClassName);
    }
  },

  getPopupDomNode() {
    return ReactDOM.findDOMNode(this);
  },

  getTarget() {
    return ReactDOM.findDOMNode(this.props.wrap);
  },

  getTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${props.prefixCls}-${props.animation}`;
    }
    return transitionName;
  },

  getClassName(currentAlignClassName) {
    const props = this.props;
    const {prefixCls} = props;
    let className = prefixCls + ' ' + props.className + ' ';
    className += currentAlignClassName;
    return className;
  },

  render() {
    const props = this.props;
    const {align, style, visible, prefixCls, destroyPopupOnHide} = props;
    const className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
    const hiddenClassName = `${prefixCls}-hidden`;
    if (!visible) {
      this.currentAlignClassName = null;
    }
    if (destroyPopupOnHide) {
      return (<Animate component=""
                       exclusive
                       transitionAppear
                       transitionName={this.getTransitionName()}>
        {visible ? (<Align target={this.getTarget}
                         key="popup"
                         monitorWindowResize
                         align={align}
                         onAlign={this.onAlign}>
          <PopupInner className={className}
                      visible
                      onMouseEnter={props.onMouseEnter}
                      onMouseLeave={props.onMouseLeave}
                      style={style}>
            {props.children}
          </PopupInner>
        </Align>) : null}
      </Animate>);
    }
    return (<Animate component=""
                     exclusive
                     transitionAppear
                     transitionName={this.getTransitionName()}
                     showProp="xVisible">
      <Align target={this.getTarget}
             key="popup"
             monitorWindowResize
             xVisible={visible}
             childrenProps={{
               visible: 'xVisible',
             }}
             disabled={!visible}
             align={align}
             onAlign={this.onAlign}>
        <PopupInner className={className}
                    hiddenClassName={hiddenClassName}
                    onMouseEnter={props.onMouseEnter}
                    onMouseLeave={props.onMouseLeave}
                    style={style}>
          {props.children}
        </PopupInner>
      </Align>
    </Animate>);
  },
});

function returnEmptyString() {
  return '';
}

const ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter',
  'onMouseLeave', 'onFocus', 'onBlur'];

const Trigger = React.createClass({
  propTypes: {
    action: PropTypes.any,
    getPopupClassNameFromAlign: PropTypes.any,
    onPopupVisibleChange: PropTypes.func,
    afterPopupVisibleChange: PropTypes.func,
    popup: PropTypes.node.isRequired,
    popupStyle: PropTypes.object,
    popupClassName: PropTypes.string,
    popupPlacement: PropTypes.string,
    builtinPlacements: PropTypes.object,
    popupTransitionName: PropTypes.string,
    popupAnimation: PropTypes.any,
    mouseEnterDelay: PropTypes.number,
    mouseLeaveDelay: PropTypes.number,
    getPopupContainer: PropTypes.func,
    destroyPopupOnHide: PropTypes.bool,
    popupAlign: PropTypes.object,
    popupVisible: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      prefixCls: 'rc-trigger-popup',
      getPopupClassNameFromAlign: returnEmptyString,
      onPopupVisibleChange: noop,
      afterPopupVisibleChange: noop,
      popupClassName: '',
      mouseEnterDelay: 0,
      mouseLeaveDelay: 0.1,
      popupStyle: {},
      destroyPopupOnHide: false,
      popupAlign: {},
      defaultPopupVisible: false,
      action: [],
    };
  },

  getInitialState() {
    const props = this.props;
    let popupVisible;
    if ('popupVisible' in props) {
      popupVisible = !!props.popupVisible;
    } else {
      popupVisible = !!props.defaultPopupVisible;
    }
    return {popupVisible};
  },

  componentDidMount() {
    this.componentDidUpdate({}, {
      popupVisible: this.state.popupVisible,
    });
  },

  componentWillReceiveProps(nextProps) {
    if ('popupVisible' in nextProps) {
      this.setState({
        popupVisible: !!nextProps.popupVisible,
      });
    }
  },

  componentDidUpdate(prevProps, prevState) {
    const props = this.props;
    const state = this.state;
    if (this.popupRendered) {
      const self = this;
      ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getPopupElement(), this.getPopupContainer(), function renderPopup() {
        if (this.isMounted()) {
          self.popupDomNode = findDOMNode(this);
        } else {
          self.popupDomNode = null;
        }
        if (prevState.popupVisible !== state.popupVisible) {
          props.afterPopupVisibleChange(state.popupVisible);
        }
      });
      if (props.action.indexOf('click') !== -1) {
        if (state.popupVisible) {
          if (!this.clickOutsideHandler) {
            this.clickOutsideHandler = Dom.addEventListener(document, 'mousedown', this.onDocumentClick);
            this.touchOutsideHandler = Dom.addEventListener(document, 'touchstart', this.onDocumentClick);
          }
          return;
        }
      }
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.touchOutsideHandler.remove();
        this.clickOutsideHandler = null;
        this.touchOutsideHandler = null;
      }
    }
  },

  componentWillUnmount() {
    const popupContainer = this.popupContainer;
    if (popupContainer) {
      ReactDOM.unmountComponentAtNode(popupContainer);
      if (this.props.getPopupContainer) {
        const mountNode = this.props.getPopupContainer(findDOMNode(this));
        mountNode.removeChild(popupContainer);
      } else {
        document.body.removeChild(popupContainer);
      }
      this.popupContainer = null;
    }
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (this.clickOutsideHandler) {
      this.clickOutsideHandler.remove();
      this.touchOutsideHandler.remove();
      this.clickOutsideHandler = null;
      this.touchOutsideHandler = null;
    }
  },

  onMouseEnter() {
    this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
  },

  onMouseLeave() {
    this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
  },

  onFocus() {
    this.focusTime = Date.now();
    this.setPopupVisible(true);
  },

  onMouseDown() {
    this.preClickTime = Date.now();
  },

  onTouchStart() {
    this.preTouchTime = Date.now();
  },

  onBlur() {
    this.setPopupVisible(false);
  },

  onClick(event) {
    // focus will trigger click
    if (this.focusTime) {
      let preTime;
      if (this.preClickTime && this.preTouchTime) {
        preTime = Math.min(this.preClickTime, this.preTouchTime);
      } else if (this.preClickTime) {
        preTime = this.preClickTime;
      } else if (this.preTouchTime) {
        preTime = this.preTouchTime;
      }
      if (Math.abs(preTime - this.focusTime) < 20) {
        return;
      }
      this.focusTime = 0;
    }
    this.preClickTime = 0;
    this.preTouchTime = 0;
    event.preventDefault();
    this.setPopupVisible(!this.state.popupVisible);
  },

  onDocumentClick(event) {
    const target = event.target;
    const root = findDOMNode(this);
    const popupNode = this.getPopupDomNode();
    if (!Dom.contains(root, target) && !Dom.contains(popupNode, target)) {
      this.setPopupVisible(false);
    }
  },

  getPopupDomNode() {
    // for test
    return this.popupDomNode;
  },

  getPopupContainer() {
    if (!this.popupContainer) {
      this.popupContainer = document.createElement('div');
      if (this.props.getPopupContainer) {
        const mountNode = this.props.getPopupContainer(findDOMNode(this));
        mountNode.appendChild(this.popupContainer);
      } else {
        document.body.appendChild(this.popupContainer);
      }
    }
    return this.popupContainer;
  },

  getPopupClassNameFromAlign(align) {
    const className = [];
    const props = this.props;
    const {popupPlacement, builtinPlacements, prefixCls} = props;
    if (popupPlacement && builtinPlacements) {
      className.push(getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
    }
    if (props.getPopupClassNameFromAlign) {
      className.push(props.getPopupClassNameFromAlign(align));
    }
    return className.join(' ');
  },

  getPopupAlign() {
    const props = this.props;
    const {popupPlacement, popupAlign, builtinPlacements} = props;
    if (popupPlacement && builtinPlacements) {
      return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
    }
    return popupAlign;
  },

  getPopupElement() {
    const props = this.props;
    const state = this.state;
    const mouseProps = {};
    if (props.action.indexOf('hover') !== -1) {
      mouseProps.onMouseEnter = this.onMouseEnter;
      mouseProps.onMouseLeave = this.onMouseLeave;
    }
    return (<Popup prefixCls={props.prefixCls}
                   destroyPopupOnHide={props.destroyPopupOnHide}
                   visible={state.popupVisible}
                   className={props.popupClassName}
                   action={props.action}
                   align={this.getPopupAlign()}
                   animation={props.popupAnimation}
                   getClassNameFromAlign={this.getPopupClassNameFromAlign}
      {...mouseProps}
                   wrap={this}
                   style={props.popupStyle}
                   transitionName={props.popupTransitionName}>
      {props.popup}
    </Popup>);
  },

  setPopupVisible(popupVisible) {
    if (this.state.popupVisible !== popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({
          popupVisible,
        });
      }
      this.props.onPopupVisibleChange(popupVisible);
    }
  },

  delaySetPopupVisible(visible, delayS) {
    const delay = delayS * 1000;
    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = null;
    }
    if (delay) {
      this.delayTimer = setTimeout(() => {
        this.setPopupVisible(visible);
        this.delayTimer = null;
      }, delay);
    } else {
      this.setPopupVisible(visible);
    }
  },

  render() {
    this.popupRendered = this.popupRendered || this.state.popupVisible;
    const props = this.props;
    const children = props.children;
    const child = React.Children.only(children);
    const childProps = child.props || {};
    const newChildProps = {};
    const trigger = props.action;
    if (trigger.indexOf('click') !== -1) {
      newChildProps.onClick = createChainedFunction(this.onClick, childProps.onClick);
      newChildProps.onMouseDown = createChainedFunction(this.onMouseDown, childProps.onMouseDown);
      newChildProps.onTouchStart = createChainedFunction(this.onTouchStart, childProps.onTouchStart);
    }
    if (trigger.indexOf('hover') !== -1) {
      newChildProps.onMouseEnter = createChainedFunction(this.onMouseEnter, childProps.onMouseEnter);
      newChildProps.onMouseLeave = createChainedFunction(this.onMouseLeave, childProps.onMouseLeave);
    }
    if (trigger.indexOf('focus') !== -1) {
      newChildProps.onFocus = createChainedFunction(this.onFocus, childProps.onFocus);
      newChildProps.onBlur = createChainedFunction(this.onBlur, childProps.onBlur);
    }

    ALL_HANDLERS.forEach(handler => {
      let newFn;
      if (props[handler] && newChildProps[handler]) {
        newFn = createChainedFunction(props[handler], newChildProps[handler]);
      } else {
        newFn = props[handler] || newChildProps[handler];
      }
      if (newFn) {
        newChildProps[handler] = newFn;
      }
    });

    return React.cloneElement(child, newChildProps);
  },
});

UI.Trigger = Trigger;
}(Smart.UI)