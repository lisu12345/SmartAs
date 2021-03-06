+ function(UI,RC) {
	 
	const RcCheckbox = RC.Checkbox;

	const Checkbox = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'ant-checkbox'
	    };
	  },
	  render() {
	    return <RcCheckbox {...this.props} />;
	  }
	});


	const Group = React.createClass({
	  getDefaultProps() {
	    return {
	      options: [],
	      defaultValue: [],
	      onChange() {},
	    };
	  },
	  propTypes: {
	    defaultValue: React.PropTypes.array,
	    value: React.PropTypes.array,
	    options: React.PropTypes.array.isRequired,
	    onChange: React.PropTypes.func,
	  },
	  getInitialState() {
		const props = this.props;
	    let value;
	    if ('value' in props) {
	      value = props.value;
	    } else if ('defaultValue' in props) {
	      value = props.defaultValue;
	    }
	    return { value };
	  },
	  componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
	      this.setState({
	        value: nextProps.value || [],
	      });
	    }
	  },
	  toggleOption(option) {
	    const optionIndex = this.state.value.indexOf(option);
	    const value = this.state.value;
	    if (optionIndex === - 1) {
	      value.push(option);
	    } else {
	      value.splice(optionIndex, 1);
	    }
	    if (!('value' in this.props)) {
	      this.setState({ value });
	    }
	    this.props.onChange(value);
	  },
	  render() {
	    const options = this.props.options;
	    return (
	      <div className="ant-checkbox-group">
	        {
	          options.map(option =>
	            <label className="ant-checkbox-group-item" key={option}>
	              <Checkbox disabled={this.props.disabled}
	                checked={this.state.value.indexOf(option) !== -1}
	                onChange={this.toggleOption.bind(this, option)} />
	              {option}
	            </label>
	          )
	        }
	      </div>
	    );
	  },
	});
	
	Checkbox.Group = Group
	UI.Checkbox = Checkbox;
}(Smart.UI,Smart.RC);