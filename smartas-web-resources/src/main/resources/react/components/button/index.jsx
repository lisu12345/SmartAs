+function(UI){
	let findDOMNode = ReactDOM.findDOMNode;
	const rxTwoCNChar = /^[\u4e00-\u9fa5]{2,2}$/;
	const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
	function isString(str) {
	  return typeof str === 'string';
	}

	const prefix = 'ant-btn-';

	// Insert one space between two chinese characters automatically.
	function insertSpace(child) {
	  if (isString(child) && isTwoCNChar(child)) {
	    return child.split('').join(' ');
	  }

	  if (isString(child.type) && isTwoCNChar(child.props.children)) {
	    return React.cloneElement(child, {},
	                              child.props.children.split('').join(' '));
	  }

	  return child;
	}

	class Button extends React.Component {
	  componentDidMount() {
	    if (window && window.PIE) {
	      window.PIE.attach(findDOMNode(this));
	    }
	  }
	  render() {
	    const props = this.props;
	    const {type, shape, size, onClick, className, htmlType, children, ...others} = props;

	    // large => lg
	    // small => sm
	    const sizeCls = ({
	      'large': 'lg',
	      'small': 'sm'
	    })[size] || '';

	    const classes = classNames({
	      'ant-btn': true,
	      [prefix + type]: type,
	      [prefix + shape]: shape,
	      [prefix + sizeCls]: sizeCls,
	      [prefix + 'loading']: ('loading' in props && props.loading !== false),
	      [className]: className
	    });

	    const kids = React.Children.map(children, insertSpace);

	    return <button {...others} type={htmlType || 'button'} className={classes} onClick={onClick}>
	      {kids}
	    </button>;
	  }
	}

	Button.propTypes = {
	  type: React.PropTypes.string,
	  shape: React.PropTypes.string,
	  size: React.PropTypes.string,
	  htmlType: React.PropTypes.string,
	  onClick: React.PropTypes.func,
	  loading: React.PropTypes.bool,
	  className: React.PropTypes.string,
	};

	Button.defaultProps = {
	  onClick() {},
	};
	
	
	const prefixGroup = 'ant-btn-group-';

	class ButtonGroup extends React.Component {
	  render() {
	    const {size, className, ...others} = this.props;

	    // large => lg
	    // small => sm
	    const sizeCls = ({
	      'large': 'lg',
	      'small': 'sm'
	    })[size] || '';

	    const classes = classNames({
	      'ant-btn-group': true,
	      [prefixGroup + sizeCls]: sizeCls,
	      [className]: className
	    });

	    return <div {...others} className={classes} />;
	  }
	}
	ButtonGroup.propTypes = {
	  size: React.PropTypes.string,
	};
	UI.Button = Button;
	Button.Group = ButtonGroup;
}(Smart.UI);
