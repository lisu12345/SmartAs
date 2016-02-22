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
	      [`${prefixCls}-checked`]: checked,
	      [`${prefixCls}-disabled`]: disabled,
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
	  let value = null;
	  let matched = false;
	  React.Children.forEach(children, (radio) => {
	    if (radio.props && radio.props.checked) {
	      value = radio.props.value;
	      matched = true;
	    }
	  });
	  return matched ? { value } : undefined;
	}

	const RadioGroup = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'ant-radio-group',
	      disabled: false,
	      onChange() {
	      },
	    };
	  },
	  getInitialState() {
	    let props = this.props;
	    let value;
	    if ('value' in props) {
	      value = props.value;
	    } else if ('defaultValue' in props) {
	      value = props.defaultValue;
	    } else {
	      const checkedValue = getCheckedValue(props.children);
	      value = checkedValue && checkedValue.value;
	    }
	    return {
	      value,
	    };
	  },
	  componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
	      this.setState({
	        value: nextProps.value,
	      });
	    } else {
	      const checkedValue = getCheckedValue(nextProps.children);
	      if (checkedValue) {
	        this.setState({
	          value: checkedValue.value,
	        });
	      }
	    }
	  },
	  onRadioChange(ev) {
	    if (!('value' in this.props)) {
	      this.setState({
	        value: ev.target.value,
	      });
	    }
	    this.props.onChange(ev);
	  },
	  render() {
	    const props = this.props;
	    const children = React.Children.map(props.children, (radio) => {
	      if (radio.props) {
	        const keyProps = {};
	        if (!('key' in radio) && typeof radio.props.value === 'string') {
	          keyProps.key = radio.props.value;
	        }
	        return React.cloneElement(radio, {
	          ...keyProps,
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