'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+function (UI, RC) {
  var Tooltip = RC.Tooltip;
  var getPlacements = UI.getPlacements;

  var placements = getPlacements();
  var prefixCls = 'ant-popover';

  var Popover = React.createClass({
    displayName: 'Popover',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: prefixCls,
        placement: 'top',
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        overlayStyle: {}
      };
    },
    render: function render() {
      var transitionName = {
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      }[this.props.placement];

      return React.createElement(
        Tooltip,
        _extends({ transitionName: transitionName,
          builtinPlacements: placements,
          ref: 'tooltip'
        }, this.props, {
          overlay: this.getOverlay() }),
        this.props.children
      );
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.refs.tooltip.getPopupDomNode();
    },
    getOverlay: function getOverlay() {
      return React.createElement(
        'div',
        null,
        this.props.title && React.createElement(
          'div',
          { className: prefixCls + '-title' },
          this.props.title
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-inner-content' },
          this.props.overlay
        )
      );
    }
  });

  UI.Popover = Popover;
}(Smart.UI, Smart.RC);