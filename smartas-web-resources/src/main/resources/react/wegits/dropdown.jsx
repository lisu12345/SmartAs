+function(UI,RC){
	const {Dropdown} = RC,
	 	{Button,ButtonGroup,Icon} = UI;

	const AntDropdown = React.createClass({
	  getDefaultProps() {
	    return {
	      transitionName: 'slide-up',
	      prefixCls: 'ant-dropdown',
	      mouseEnterDelay: 0.15,
          mouseLeaveDelay: 0.1,
	    };
	  },
	  render() {
	    const { overlay, ...otherProps } = this.props;
	    const menu = React.cloneElement(overlay, {
	      openTransitionName: 'zoom-big',
	    });
	    return (
	      <Dropdown {...otherProps} overlay={menu} />
	    );
	  }
	});

	const DropdownButton = React.createClass({
	  getDefaultProps() {
	    return {
	      align: {
	        points: ['tr', 'br'],
	        overlay: {
	          adjustX: 1,
	          adjustY: 1,
	        },
	        offset: [0, 4],
	        targetOffset: [0, 0],
	      },
	      type: 'default',
	    };
	  },
	  render() {
	    const { type, overlay, trigger, align, children, className, ...restProps } = this.props;
	    const cls = classNames({
	      'ant-dropdown-button': true,
	      className: !!className,
	    });
	    return (
	      <ButtonGroup {...restProps} className={cls}>
	        <Button type={type}>{children}</Button>
	        <Dropdown align={align} overlay={overlay} trigger={trigger}>
	          <Button type={type}>
	            <Icon type="down" />
	          </Button>
	        </Dropdown>
	      </ButtonGroup>
	    );
	  }
	});

	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
}(Smart.UI,Smart.RC);

