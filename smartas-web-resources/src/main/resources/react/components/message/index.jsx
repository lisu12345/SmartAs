+ function(UI) {
  const {
    Icon, Animate, util
  } = UI;
  const createChainedFunction = util.createChainedFunction,
    guid = util.guid;

  const Notice = React.createClass({
    propTypes: {
      duration: React.PropTypes.number,
      onClose: React.PropTypes.func,
      children: React.PropTypes.any,
    },

    getDefaultProps() {
      return {
        onEnd() {},
          duration: 1.5,
          style: {
            right: '50%',
          },
      };
    },

    componentDidMount() {
      this.clearCloseTimer();
      if (this.props.duration) {
        this.closeTimer = setTimeout(() => {
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
        [`${componentClass}`]: 1, [`${componentClass}-closable`]: props.closable, [props.className]: !!props.className,
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
        const key = notice.key = notice.key || guid();
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
        const noticeNodes = this.state.notices.map((notice) => {
          const onClose = createChainedFunction(this.remove.bind(this, notice.key), notice.onClose);
          return (<Notice prefixCls={props.prefixCls} {...notice} onClose={onClose}>{notice.content}</Notice>);
        });
        const className = {
          [props.prefixCls]: 1, [props.className]: !!props.className,
        };
        return (
          <div className={classNames(className)} style={props.style}>
            <Animate transitionName={this.getTransitionName()}>{noticeNodes}</Animate>
          </div>
        );
      },
  });

  Notification.newInstance = (props) => {
    const notificationProps = props || {};
    const div = document.createElement('div');
    document.body.appendChild(div);
    const notification = ReactDOM.render(<Notification {...notificationProps}/>, div);
      return {
        notice(noticeProps) {
            notification.add(noticeProps);
          },
          removeNotice(key) {
            notification.remove(key);
          },
          component: notification,
          destroy() {
            React.unmountComponentAtNode(div);
            document.body.removeChild(div);
          },
      };
    };


    let defaultDuration = 1.5;
    let top;
    let messageInstance;
    let key = 1;

    function getMessageInstance() {
      messageInstance = messageInstance || Notification.newInstance({
        prefixCls: 'ant-message',
        transitionName: 'move-up',
        style: {
          top: top
        } // 覆盖原来的样式
      });
      return messageInstance;
    }

    function notice(content, duration = defaultDuration, type, onClose) {
      let iconClass = ({
        'info': 'ant-message-info',
        'success': 'ant-message-success',
        'error': 'ant-message-error',
        'warn': 'ant-message-warn',
        'loading': 'ant-message-loading'
      })[type];

      let iconType = ({
        'info': 'info-circle',
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warn': 'exclamation-circle',
        'loading': 'loading'
      })[type];

      let instance = getMessageInstance();
      instance.notice({
        key: key,
        duration: duration,
        style: {},
        content: <div className={'ant-message-custom-content ' + iconClass}>
        <Icon className={iconClass} type={iconType} />
        <span>{content}</span>
      </div>,
        onClose: onClose
      });
      return (function() {
        let target = key++;
        return function() {
          instance.removeNotice(target);
        };
      })();
    }

    const message = {
      info(content, duration, onClose) {
          return notice(content, duration, 'info', onClose);
        },
        success(content, duration, onClose) {
          return notice(content, duration, 'success', onClose);
        },
        error(content, duration, onClose) {
          return notice(content, duration, 'error', onClose);
        },
        warn(content, duration, onClose) {
          return notice(content, duration, 'warn', onClose);
        },
        loading(content, duration, onClose) {
          return notice(content, duration, 'loading', onClose);
        },
        config(options) {
          if (options.top) {
            top = options.top;
          }
        }
    };
    UI.message = message;
  }(Smart.UI);