+ function(RC) {
  const {noop} = _, 
    {Trigger} = RC, 
    {PropTypes} = React;

  const autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1,
  };

  const targetOffset = [0, 0];

  const placements = {
    left: {
      points: ['cr', 'cl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset,
    },
    right: {
      points: ['cl', 'cr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset,
    },
    top: {
      points: ['bc', 'tc'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset,
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset,
    },
    topLeft: {
      points: ['bl', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset,
    },
    leftTop: {
      points: ['tr', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset,
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset,
    },
    rightTop: {
      points: ['tl', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset,
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset,
    },
    rightBottom: {
      points: ['bl', 'br'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset,
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset,
    },
    leftBottom: {
      points: ['br', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset,
    },
  };

  const Tooltip = React.createClass({
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
        targetOffset: PropTypes.array,
      }),
      arrowContent: PropTypes.any,
    },

    getDefaultProps() {
      return {
        prefixCls: 'rc-tooltip',
        mouseEnterDelay: 0,
        destroyTooltipOnHide: false,
        mouseLeaveDelay: 0.1,
        align: {},
        placement: 'right',
        trigger: ['hover'],
        arrowContent: null,
      };
    },

    getPopupElement() {
      const {arrowContent, overlay, prefixCls} = this.props;
      return ([
        <div className={`${prefixCls}-arrow`} key="arrow">
          {arrowContent}
        </div>,
        <div className={`${prefixCls}-inner`} key="content">
          {overlay}
        </div>,
      ]);
    },

    getPopupDomNode() {
      return this.refs.trigger.popupDomNode;
    },

    render() {
      const {overlayClassName, trigger,
        mouseEnterDelay, mouseLeaveDelay,
        overlayStyle, prefixCls,
        children, onVisibleChange,
        transitionName, animation,
        placement, align,
        destroyTooltipOnHide,
        defaultVisible, getTooltipContainer, ...restProps} = this.props;
      const extraProps = {...restProps};
      if ('visible' in this.props) {
        extraProps.popupVisible = this.props.visible;
      }
      return (<Trigger popupClassName={overlayClassName}
                       ref="trigger"
                       prefixCls={prefixCls}
                       popup={this.getPopupElement()}
                       action={trigger}
                       builtinPlacements={placements}
                       popupPlacement={placement}
                       popupAlign={align}
                       getPopupContainer={getTooltipContainer}
                       onPopupVisibleChange={onVisibleChange}
                       popupTransitionName={transitionName}
                       popupAnimation={animation}
                       defaultPopupVisible={defaultVisible}
                       destroyPopupOnHide={destroyTooltipOnHide}
                       mouseLeaveDelay={mouseLeaveDelay}
                       popupStyle={overlayStyle}
                       mouseEnterDelay={mouseEnterDelay}
        {...extraProps}>
        {children}
      </Trigger>);
    },
  });
  
  RC.Tooltip = Tooltip;
}(Smart.RC);