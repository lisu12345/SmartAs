+ function(RC) {
	const {Checkbox} = RC;
	
	var Radio = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'rc-radio',
	      type: 'radio'
	    };
	  },

	  render() {
	    return <Checkbox {...this.props} ref="checkbox"/>;
	  }
	});
	
	RC.Radio = Radio;
}(Smart.RC)
