+ function(UI, RC) {
  const {Tooltip} = RC,
        {noop} = _,
        {Icon,Button,getPlacements} = UI;

  const placements = getPlacements();
  const prefixCls = 'ant-popover';
  const transitionNames = {
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
    rightBottom: 'zoom-left',
  };

  UI.Popconfirm = React.createClass({
    getInitialState() {
      return {
        visible: false
      };
    },
    getDefaultProps() {
      return {
        transitionName: '',
        placement: 'top',
        trigger: 'click',
        overlayStyle: {},
        onConfirm: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        onVisibleChange() {},
      };
    },
    componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        this.setState({ visible: nextProps.visible });
      }
    },
    confirm() {
      this.setVisible(false);
      this.props.onConfirm.call(this);
    },
    cancel() {
      this.setVisible(false);
      this.props.onCancel.call(this);
    },
    onVisibleChange(visible) {
      this.setVisible(visible);
    },
    setVisible(visible) {
      if (!('visible' in this.props)) {
        this.setState({ visible });
      }
      this.props.onVisibleChange(visible);
    },
    render() {
      const {title, okText, cancelText, placement, overlayStyle, trigger,...restProps} = this.props;
      const overlay = (
	      <div>
	        <div className={`${prefixCls}-inner-content`}>
	          <div className={`${prefixCls}-message`}>
              <Icon type="exclamation-circle" />
              <div className={`${prefixCls}-message-title`}>{title}</div>
            </div>
	          <div className={`${prefixCls}-buttons`}>
	            <Button onClick={this.cancel} type="ghost" size="small">{cancelText}</Button>
	            <Button onClick={this.confirm} type="primary" size="small">{okText}</Button>
	          </div>
	        </div>
	      </div>
	    );

      const transitionName = transitionNames[placement];

      return (
        <Tooltip {...restProps} 
             placement={placement}
             builtinPlacements={placements}
             overlayStyle={overlayStyle}
             prefixCls={prefixCls}
             onVisibleChange={this.onVisibleChange}
             transitionName={transitionName}
             visible={this.state.visible}
             trigger={trigger}
             overlay={overlay}>
          {this.props.children}
        </Tooltip>
      );
    }
  });
}(Smart.UI,Smart.RC)
