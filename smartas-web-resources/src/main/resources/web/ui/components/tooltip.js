'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (RC) {
  var _ref = _;
  var noop = _ref.noop;
  var Trigger = RC.Trigger;
  var _React = React;
  var PropTypes = _React.PropTypes;


  var autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
  };

  var targetOffset = [0, 0];

  var placements = {
    left: {
      points: ['cr', 'cl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    },
    right: {
      points: ['cl', 'cr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    top: {
      points: ['bc', 'tc'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    topLeft: {
      points: ['bl', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    leftTop: {
      points: ['tr', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    rightTop: {
      points: ['tl', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    rightBottom: {
      points: ['bl', 'br'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    leftBottom: {
      points: ['br', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    }
  };

  var Tooltip = React.createClass({
    displayName: 'Tooltip',

    propTypes: {
      trigger: PropTypes.any,
      children: PropTypes.any,
      defaultVisible: PropTypes.bool,
      visible: PropTypes.bool,
      placement: PropTypes.string,
      transitionName: PropTypes.string,
      animation: PropTypes.any,
      onVisibleChange: PropTypes.func,
      afterVisibleChange: PropTypes.func,
      overlay: PropTypes.node.isRequired,
      overlayStyle: PropTypes.object,
      overlayClassName: PropTypes.string,
      prefixCls: PropTypes.string,
      mouseEnterDelay: PropTypes.number,
      mouseLeaveDelay: PropTypes.number,
      getTooltipContainer: PropTypes.func,
      destroyTooltipOnHide: PropTypes.bool,
      align: PropTypes.shape({
        offset: PropTypes.array,
        targetOffset: PropTypes.array
      }),
      arrowContent: PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-tooltip',
        mouseEnterDelay: 0,
        destroyTooltipOnHide: false,
        mouseLeaveDelay: 0.1,
        align: {},
        placement: 'right',
        trigger: ['hover'],
        arrowContent: null
      };
    },
    getPopupElement: function getPopupElement() {
      var _props = this.props;
      var arrowContent = _props.arrowContent;
      var overlay = _props.overlay;
      var prefixCls = _props.prefixCls;

      return [React.createElement(
        'div',
        { className: prefixCls + '-arrow', key: 'arrow' },
        arrowContent
      ), React.createElement(
        'div',
        { className: prefixCls + '-inner', key: 'content' },
        overlay
      )];
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.refs.trigger.popupDomNode;
    },
    render: function render() {
      var _props2 = this.props;
      var overlayClassName = _props2.overlayClassName;
      var trigger = _props2.trigger;
      var mouseEnterDelay = _props2.mouseEnterDelay;
      var mouseLeaveDelay = _props2.mouseLeaveDelay;
      var overlayStyle = _props2.overlayStyle;
      var prefixCls = _props2.prefixCls;
      var children = _props2.children;
      var onVisibleChange = _props2.onVisibleChange;
      var transitionName = _props2.transitionName;
      var animation = _props2.animation;
      var placement = _props2.placement;
      var align = _props2.align;
      var destroyTooltipOnHide = _props2.destroyTooltipOnHide;
      var defaultVisible = _props2.defaultVisible;
      var getTooltipContainer = _props2.getTooltipContainer;

      var restProps = _objectWithoutProperties(_props2, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

      var extraProps = _extends({}, restProps);
      if ('visible' in this.props) {
        extraProps.popupVisible = this.props.visible;
      }
      return React.createElement(
        Trigger,
        _extends({ popupClassName: overlayClassName,
          ref: 'trigger',
          prefixCls: prefixCls,
          popup: this.getPopupElement(),
          action: trigger,
          builtinPlacements: placements,
          popupPlacement: placement,
          popupAlign: align,
          getPopupContainer: getTooltipContainer,
          onPopupVisibleChange: onVisibleChange,
          popupTransitionName: transitionName,
          popupAnimation: animation,
          defaultPopupVisible: defaultVisible,
          destroyPopupOnHide: destroyTooltipOnHide,
          mouseLeaveDelay: mouseLeaveDelay,
          popupStyle: overlayStyle,
          mouseEnterDelay: mouseEnterDelay
        }, extraProps),
        children
      );
    }
  });

  RC.Tooltip = Tooltip;
}(Smart.RC);