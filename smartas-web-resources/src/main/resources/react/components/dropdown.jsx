+ function(RC) {
	const {Trigger} = RC,
		{PropTypes} = React;
	
	const autoAdjustOverflow = {
	  adjustX: 1,
	  adjustY: 1,
	};

	const targetOffset = [0, 0];

	const placements = {
	  topLeft: {
	    points: ['bl', 'tl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, -3],
	    targetOffset,
	  },
	  bottomLeft: {
	    points: ['tl', 'bl'],
	    overflow: autoAdjustOverflow,
	    offset: [0, 3],
	    targetOffset,
	  },
	};

	/*

	 var MenuItem = Menu.Item;

	 var menu = <Menu><MenuItem>1</MenuItem></Menu>;

	 <DropDown trigger="click" animationName="" overlay={<>} onSelect={}>
	 <button>open</button>
	 </DropDown>
	 */

	const Dropdown = React.createClass({
	  propTypes: {
	    minOverlayWidthMatchTrigger: PropTypes.bool,
	    onVisibleChange: PropTypes.func,
	    prefixCls: PropTypes.string,
	    children: PropTypes.any,
	    transitionName: PropTypes.string,
	    overlayClassName: PropTypes.string,
	    animation: PropTypes.any,
	    align: PropTypes.object,
	    overlayStyle: PropTypes.object,
	    placement: PropTypes.string,
	    trigger: PropTypes.array,
	  },

	  getDefaultProps() {
	    return {
	      minOverlayWidthMatchTrigger: true,
	      prefixCls: 'rc-dropdown',
	      trigger: ['hover'],
	      overlayClassName: '',
	      overlayStyle: {},
	      defaultVisible: false,
	      onVisibleChange() {
	      },
	      placement: 'bottomLeft',
	    };
	  },

	  getInitialState() {
	    const props = this.props;
	    if ('visible' in props) {
	      return {
	        visible: props.visible,
	      };
	    }
	    return {
	      visible: props.defaultVisible,
	    };
	  },

	  componentWillReceiveProps(props) {
	    if ('visible' in props) {
	      this.setState({
	        visible: props.visible,
	      });
	    }
	  },

	  onClick(e) {
	    const props = this.props;
	    const overlayProps = props.overlay.props;
	    if (!('visible' in props)) {
	      this.setState({
	        visible: false,
	      });
	    }
	    if (overlayProps.onClick) {
	      overlayProps.onClick(e);
	    }
	  },

	  onVisibleChange(v) {
	    const props = this.props;
	    if (!('visible' in props)) {
	      this.setState({
	        visible: v,
	      });
	    }
	    props.onVisibleChange(v);
	  },

	  getMenuElement() {
	    const props = this.props;
	    return React.cloneElement(props.overlay, {
	      prefixCls: `${props.prefixCls}-menu`,
	      onClick: this.onClick,
	    });
	  },

	  getPopupDomNode() {
	    return this.refs.trigger.getPopupDomNode();
	  },

	  afterVisibleChange(visible) {
	    if (visible && this.props.minOverlayWidthMatchTrigger) {
	      const overlayNode = this.getPopupDomNode();
	      const rootNode = ReactDOM.findDOMNode(this);
	      if (rootNode.offsetWidth > overlayNode.offsetWidth) {
	        overlayNode.style.width = rootNode.offsetWidth + 'px';
	      }
	    }
	  },

	  render() {
	    const {prefixCls, children,
	      transitionName, animation,
	      align, placement,
	      overlayClassName, overlayStyle,
	      trigger} = this.props;
	    return (<Trigger prefixCls={prefixCls}
	                     ref="trigger"
	                     popupClassName={overlayClassName}
	                     popupStyle={overlayStyle}
	                     builtinPlacements={placements}
	                     action={trigger}
	                     popupPlacement={placement}
	                     popupAlign={align}
	                     popupTransitionName={transitionName}
	                     popupAnimation={animation}
	                     popupVisible={this.state.visible}
	                     afterPopupVisibleChange={this.afterVisibleChange}
	                     popup={this.getMenuElement()}
	                     onPopupVisibleChange={this.onVisibleChange}
	      >{children}</Trigger>);
	  },
	});	
	
	RC.Dropdown = Dropdown;
}(Smart.RC)
