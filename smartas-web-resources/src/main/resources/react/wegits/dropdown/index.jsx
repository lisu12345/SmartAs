+function(UI,RC){
	const {Dropdown} = RC,
	 	{Button,ButtonGroup,Icon} = UI;

	const AntDropdown = React.createClass({
	  getDefaultProps() {
	    return {
	      transitionName: 'slide-up',
	      prefixCls: 'ant-dropdown',
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


	const align = {
	  points: ['tr', 'br'],
	  overlay: {
	    adjustX: 1,
	    adjustY: 1,
	  },
	  offset: [0, 3],
	  targetOffset: [0, 0],
	};

	const DropdownButton = React.createClass({
	  getDefaultProps() {
	    return {
	      align,
	      type: 'default',
	    };
	  },
	  render() {
	    return (
	      <ButtonGroup className="ant-dropdown-button">
	        <Button type={this.props.type}>
	          {this.props.children}
	        </Button>
	        <AntDropdown {...this.props}>
	          <Button type={this.props.type}>
	            <Icon type="down" />
	          </Button>
	        </AntDropdown>
	      </ButtonGroup>
	    );
	  }
	});

	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
}(Smart.UI,Smart.RC);

