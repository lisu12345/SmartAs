
+ function(RC) {
	const {Animate,Util} = RC,
		{createChainedFunction,getUuid} = Util;
	
	const Notice = React.createClass({
	  propTypes: {
	    duration: React.PropTypes.number,
	    onClose: React.PropTypes.func,
	    children: React.PropTypes.any,
	  },

	  getDefaultProps() {
	    return {
	      onEnd() {
	      },
	      duration: 1.5,
	      style: {
	        right: '50%',
	      },
	    };
	  },

	  componentDidMount() {
	    this.clearCloseTimer();
	    if (this.props.duration) {
	      this.closeTimer = setTimeout(()=> {
	        this.close();
	      }, this.props.duration * 1000);
	    }
	  },

	  componentDidUpdate() {
	    this.componentDidMount();
	  },

	  componentWillUnmount() {
	    this.clearCloseTimer();
	  },

	  clearCloseTimer() {
	    if (this.closeTimer) {
	      clearTimeout(this.closeTimer);
	      this.closeTimer = null;
	    }
	  },

	  close() {
	    this.clearCloseTimer();
	    this.props.onClose();
	  },

	  render() {
	    const props = this.props;
	    const componentClass = `${props.prefixCls}-notice`;
	    const className = {
	      [`${componentClass}`]: 1,
	      [`${componentClass}-closable`]: props.closable,
	      [props.className]: !!props.className,
	    };
	    return (
	      <div className={classNames(className)} style={props.style}>
	        <div className={`${componentClass}-content`}>{this.props.children}</div>
	        {props.closable ?
	          <a tabIndex="0" onClick={this.close} className={`${componentClass}-close`}>
	            <span className={`${componentClass}-close-x`}></span>
	          </a> : null
	        }
	      </div>
	    );
	  },
	});
	
	
	const Notification = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'rc-notification',
	      animation: 'fade',
	      style: {
	        'top': 65,
	        left: '50%',
	      },
	    };
	  },

	  getInitialState() {
	    return {
	      notices: [],
	    };
	  },

	  getTransitionName() {
	    const props = this.props;
	    let transitionName = props.transitionName;
	    if (!transitionName && props.animation) {
	      transitionName = `${props.prefixCls}-${props.animation}`;
	    }
	    return transitionName;
	  },

	  add(notice) {
	    const key = notice.key = notice.key || getUuid();
	    const notices = this.state.notices;
	    if (!notices.filter((v) => v.key === key).length) {
	      this.setState({
	        notices: notices.concat(notice),
	      });
	    }
	  },

	  remove(key) {
	    const notices = this.state.notices.filter((notice) => {
	      return notice.key !== key;
	    });
	    this.setState({
	      notices: notices,
	    });
	  },

	  render() {
	    const props = this.props;
	    const noticeNodes = this.state.notices.map((notice)=> {
	      const onClose = createChainedFunction(this.remove.bind(this, notice.key), notice.onClose);
	      return (<Notice prefixCls={props.prefixCls} {...notice} onClose={onClose}>{notice.content}</Notice>);
	    });
	    const className = {
	      [props.prefixCls]: 1,
	      [props.className]: !!props.className,
	    };
	    return (
	      <div className={classnames(className)} style={props.style}>
	        <Animate transitionName={this.getTransitionName()}>{noticeNodes}</Animate>
	      </div>
	    );
	  },
	});

	Notification.newInstance = function newNotificationInstance(properties) {
	  const props = properties || {};
	  const div = document.createElement('div');
	  document.body.appendChild(div);
	  const notification = ReactDOM.render(<Notification {...props}/>, div);
	  return {
	    notice(noticeProps) {
	      notification.add(noticeProps);
	    },
	    removeNotice(key) {
	      notification.remove(key);
	    },
	    component: notification,
	    destroy() {
	      ReactDOM.unmountComponentAtNode(div);
	      document.body.removeChild(div);
	    },
	  };
	};
	
	RC.Notification = Notification;
}(Smart.RC)
