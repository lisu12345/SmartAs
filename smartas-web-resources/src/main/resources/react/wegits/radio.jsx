+(function(UI,RC) {
	
	const {Radio} = RC;

	const AntRadio = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'ant-radio'
	    };
	  },
	  render() {
	    const { prefixCls, children, checked, disabled, className } = this.props;
	    const classString = classNames({
	      [prefixCls]: true,
	      [prefixCls + '-checked']: checked,
	      [prefixCls + '-disabled']: disabled,
	      [className]: !!className,
	    });
	    return (
	      <label className={classString}>
	        <Radio {...this.props} children={null} />
	        {children}
	      </label>
	    );
	  }
	});


	function getCheckedValue(children) {
	  let checkedValue = null;
	  React.Children.forEach(children, (radio) => {
	    if (radio.props && radio.props.checked) {
	      checkedValue = radio.props.value;
	    }
	  });
	  return checkedValue;
	}

	const RadioGroup = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'ant-radio-group',
	      disabled: false,
	      onChange() {
	      }
	    };
	  },
	  getInitialState() {
	    let props = this.props;
	    return {
	      value: props.value || props.defaultValue || getCheckedValue(props.children)
	    };
	  },
	  componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps || getCheckedValue(nextProps.children)) {
	      this.setState({
	        value: nextProps.value || getCheckedValue(nextProps.children)
	      });
	    }
	  },
	  onRadioChange(ev) {
	    this.setState({
	      value: ev.target.value
	    });
	    this.props.onChange(ev);
	  },
	  render() {
	    const props = this.props;
	    const children = React.Children.map(props.children, (radio) => {
	      if (radio.props) {
	        return React.cloneElement(radio, {
	          key: radio.props.value,
	          ...radio.props,
	          onChange: this.onRadioChange,
	          checked: this.state.value === radio.props.value,
	          disabled: radio.props.disabled || this.props.disabled,
	        });
	      }
	      return radio;
	    });
	    return (
	      <div className={`${props.prefixCls} ${props.prefixCls}-${props.size}`}>
	        {children}
	      </div>
	    );
	  },
	});


	const RadioButton = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'ant-radio-button',
	    };
	  },
	  render() {
	    return (
	      <AntRadio {...this.props} />
	    );
	  }
	});

	AntRadio.Button = RadioButton;
	AntRadio.Group = RadioGroup;
	UI.Radio = AntRadio;
})(Smart.UI,Smart.RC);