'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (RC) {
  var PropTypes = React.PropTypes;
  var findDOMNode = ReactDOM.findDOMNode;
  var _ref = _;
  var noop = _ref.noop;
  var assign = _ref.assign;
  var Util = RC.Util;
  var Align = RC.Align;
  var Animate = RC.Animate;
  var Dom = Util.Dom;
  var createChainedFunction = Util.createChainedFunction;

  function isPointsEq(a1, a2) {
    return a1[0] === a2[0] && a1[1] === a2[1];
  }

  function getAlignFromPlacement(builtinPlacements, placementStr, align) {
    var baseAlign = builtinPlacements[placementStr] || {};
    return _extends({}, baseAlign, align);
  }

  function _getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
    var points = align.points;
    for (var placement in builtinPlacements) {
      if (builtinPlacements.hasOwnProperty(placement)) {
        if (isPointsEq(builtinPlacements[placement].points, points)) {
          return prefixCls + '-placement-' + placement;
        }
      }
    }
    return '';
  }

  var PopupInner = React.createClass({
    displayName: 'PopupInner',

    propTypes: {
      hiddenClassName: PropTypes.string,
      className: PropTypes.string,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      children: PropTypes.any
    },
    render: function render() {
      var props = this.props;
      var className = props.className;
      if (!props.visible) {
        className += ' ' + props.hiddenClassName;
      }
      return React.createElement(
        'div',
        { className: className,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          style: props.style },
        props.children
      );
    }
  });

  var Popup = React.createClass({
    displayName: 'Popup',

    propTypes: {
      visible: PropTypes.bool,
      wrap: PropTypes.object,
      style: PropTypes.object,
      getClassNameFromAlign: PropTypes.func,
      onMouseEnter: PropTypes.func,
      className: PropTypes.string,
      onMouseLeave: PropTypes.func
    },

    componentDidMount: function componentDidMount() {
      this.rootNode = this.getPopupDomNode();
    },
    onAlign: function onAlign(popupDomNode, align) {
      var props = this.props;
      var alignClassName = props.getClassNameFromAlign(props.align);
      var currentAlignClassName = props.getClassNameFromAlign(align);
      if (alignClassName !== currentAlignClassName) {
        this.currentAlignClassName = currentAlignClassName;
        popupDomNode.className = this.getClassName(currentAlignClassName);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      return ReactDOM.findDOMNode(this);
    },
    getTarget: function getTarget() {
      return ReactDOM.findDOMNode(this.props.wrap);
    },
    getTransitionName: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    },
    getClassName: function getClassName(currentAlignClassName) {
      var props = this.props;
      var prefixCls = props.prefixCls;

      var className = prefixCls + ' ' + props.className + ' ';
      className += currentAlignClassName;
      return className;
    },
    render: function render() {
      var props = this.props;
      var align = props.align;
      var style = props.style;
      var visible = props.visible;
      var prefixCls = props.prefixCls;
      var destroyPopupOnHide = props.destroyPopupOnHide;

      var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
      var hiddenClassName = prefixCls + '-hidden';
      if (!visible) {
        this.currentAlignClassName = null;
      }
      if (destroyPopupOnHide) {
        return React.createElement(
          Animate,
          { component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName() },
          visible ? React.createElement(
            Align,
            { target: this.getTarget,
              key: 'popup',
              monitorWindowResize: true,
              align: align,
              onAlign: this.onAlign },
            React.createElement(
              PopupInner,
              { className: className,
                visible: true,
                onMouseEnter: props.onMouseEnter,
                onMouseLeave: props.onMouseLeave,
                style: style },
              props.children
            )
          ) : null
        );
      }
      return React.createElement(
        Animate,
        { component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          showProp: 'xVisible' },
        React.createElement(
          Align,
          { target: this.getTarget,
            key: 'popup',
            monitorWindowResize: true,
            xVisible: visible,
            childrenProps: {
              visible: 'xVisible'
            },
            disabled: !visible,
            align: align,
            onAlign: this.onAlign },
          React.createElement(
            PopupInner,
            { className: className,
              hiddenClassName: hiddenClassName,
              onMouseEnter: props.onMouseEnter,
              onMouseLeave: props.onMouseLeave,
              style: style },
            props.children
          )
        )
      );
    }
  });

  function returnEmptyString() {
    return '';
  }

  var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

  var Trigger = React.createClass({
    displayName: 'Trigger',

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
      popupVisible: PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
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
        action: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var popupVisible = undefined;
      if ('popupVisible' in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }
      return { popupVisible: popupVisible };
    },
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate({}, {
        popupVisible: this.state.popupVisible
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('popupVisible' in nextProps) {
        this.setState({
          popupVisible: !!nextProps.popupVisible
        });
      }
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
      var _this = this;

      var props = this.props;
      var state = this.state;
      if (this.popupRendered) {
        var _ret = (function () {
          var self = _this;
          ReactDOM.unstable_renderSubtreeIntoContainer(_this, _this.getPopupElement(), _this.getPopupContainer(), function renderPopup() {
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
              if (!_this.clickOutsideHandler) {
                _this.clickOutsideHandler = Dom.addEventListener(document, 'mousedown', _this.onDocumentClick);
                _this.touchOutsideHandler = Dom.addEventListener(document, 'touchstart', _this.onDocumentClick);
              }
              return {
                v: undefined
              };
            }
          }
          if (_this.clickOutsideHandler) {
            _this.clickOutsideHandler.remove();
            _this.touchOutsideHandler.remove();
            _this.clickOutsideHandler = null;
            _this.touchOutsideHandler = null;
          }
        })();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      var popupContainer = this.popupContainer;
      if (popupContainer) {
        ReactDOM.unmountComponentAtNode(popupContainer);
        if (this.props.getPopupContainer) {
          var mountNode = this.props.getPopupContainer(findDOMNode(this));
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
    onMouseEnter: function onMouseEnter() {
      this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
    },
    onMouseLeave: function onMouseLeave() {
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    },
    onFocus: function onFocus() {
      this.focusTime = Date.now();
      this.setPopupVisible(true);
    },
    onMouseDown: function onMouseDown() {
      this.preClickTime = Date.now();
    },
    onTouchStart: function onTouchStart() {
      this.preTouchTime = Date.now();
    },
    onBlur: function onBlur() {
      this.setPopupVisible(false);
    },
    onClick: function onClick(event) {
      // focus will trigger click
      if (this.focusTime) {
        var preTime = undefined;
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
    onDocumentClick: function onDocumentClick(event) {
      var target = event.target;
      var root = findDOMNode(this);
      var popupNode = this.getPopupDomNode();
      if (!Dom.contains(root, target) && !Dom.contains(popupNode, target)) {
        this.setPopupVisible(false);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      // for test
      return this.popupDomNode;
    },
    getPopupContainer: function getPopupContainer() {
      if (!this.popupContainer) {
        this.popupContainer = document.createElement('div');
        if (this.props.getPopupContainer) {
          var mountNode = this.props.getPopupContainer(findDOMNode(this));
          mountNode.appendChild(this.popupContainer);
        } else {
          document.body.appendChild(this.popupContainer);
        }
      }
      return this.popupContainer;
    },
    getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
      var className = [];
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var builtinPlacements = props.builtinPlacements;
      var prefixCls = props.prefixCls;

      if (popupPlacement && builtinPlacements) {
        className.push(_getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
      }
      if (props.getPopupClassNameFromAlign) {
        className.push(props.getPopupClassNameFromAlign(align));
      }
      return className.join(' ');
    },
    getPopupAlign: function getPopupAlign() {
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var popupAlign = props.popupAlign;
      var builtinPlacements = props.builtinPlacements;

      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getPopupElement: function getPopupElement() {
      var props = this.props;
      var state = this.state;
      var mouseProps = {};
      if (props.action.indexOf('hover') !== -1) {
        mouseProps.onMouseEnter = this.onMouseEnter;
        mouseProps.onMouseLeave = this.onMouseLeave;
      }
      return React.createElement(
        Popup,
        _extends({ prefixCls: props.prefixCls,
          destroyPopupOnHide: props.destroyPopupOnHide,
          visible: state.popupVisible,
          className: props.popupClassName,
          action: props.action,
          align: this.getPopupAlign(),
          animation: props.popupAnimation,
          getClassNameFromAlign: this.getPopupClassNameFromAlign
        }, mouseProps, {
          wrap: this,
          style: props.popupStyle,
          transitionName: props.popupTransitionName }),
        props.popup
      );
    },
    setPopupVisible: function setPopupVisible(popupVisible) {
      if (this.state.popupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({
            popupVisible: popupVisible
          });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }
    },
    delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
      var _this2 = this;

      var delay = delayS * 1000;
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (delay) {
        this.delayTimer = setTimeout(function () {
          _this2.setPopupVisible(visible);
          _this2.delayTimer = null;
        }, delay);
      } else {
        this.setPopupVisible(visible);
      }
    },
    render: function render() {
      this.popupRendered = this.popupRendered || this.state.popupVisible;
      var props = this.props;
      var children = props.children;
      var child = React.Children.only(children);
      var childProps = child.props || {};
      var newChildProps = {};
      var trigger = props.action;
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

      ALL_HANDLERS.forEach(function (handler) {
        var newFn = undefined;
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
    }
  });

  RC.Trigger = Trigger;
})(Smart.RC);