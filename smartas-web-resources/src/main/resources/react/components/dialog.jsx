//V5.4.0 - 2016/3/8
+ function(RC) {
  const {
    noop
  } = _, {
    Align, Animate, DOMWrap, Util
  } = RC, {
    KeyCode
  } = Util, {
    PropTypes
  } = React;

function getScroll(w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  const method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}

function setTransformOrigin(node, value) {
  const style = node.style;
  ['Webkit', 'Moz', 'Ms', 'ms'].forEach((prefix)=> {
    style[`${prefix}TransformOrigin`] = value;
  });
  style[`transformOrigin`] = value;
}

function offset(el) {
  const rect = el.getBoundingClientRect();
  const pos = {
    left: rect.left,
    top: rect.top,
  };
  const doc = el.ownerDocument;
  const w = doc.defaultView || doc.parentWindow;
  pos.left += getScroll(w);
  pos.top += getScroll(w, 1);
  return pos;
}

const Dialog = React.createClass({
  propTypes: {
    onAfterClose: PropTypes.func,
    onClose: PropTypes.func,
    closable: PropTypes.bool,
    maskClosable: PropTypes.bool,
    visible: PropTypes.bool,
    mousePosition: PropTypes.object,
  },

  getDefaultProps() {
    return {
      onAfterClose: noop,
      onClose: noop,
    };
  },

  componentDidMount() {
    this.componentDidUpdate({});
  },

  componentDidUpdate(prevProps) {
    const props = this.props;
    if (props.visible) {
      // first show
      if (!prevProps.visible) {
        this.lastOutSideFocusNode = document.activeElement;
        ReactDOM.findDOMNode(this.refs.dialog).focus();
      }
    } else if (prevProps.visible) {
      if (props.mask && this.lastOutSideFocusNode) {
        try {
          this.lastOutSideFocusNode.focus();
        } catch (e) {
          this.lastOutSideFocusNode = null;
        }
        this.lastOutSideFocusNode = null;
      }
    }
  },

  onAnimateLeave() {
    this.props.onAfterClose();
  },

  onMaskClick(e) {
    if (this.props.closable && this.props.maskClosable) {
      this.close(e);
    }
    ReactDOM.findDOMNode(this.refs.dialog).focus();
  },

  onKeyDown(e) {
    const props = this.props;
    if (props.closable) {
      if (e.keyCode === KeyCode.ESC) {
        this.close(e);
      }
    }
    // keep focus inside dialog
    if (props.visible) {
      if (e.keyCode === KeyCode.TAB) {
        const activeElement = document.activeElement;
        const dialogRoot = ReactDOM.findDOMNode(this.refs.dialog);
        const sentinel = this.refs.sentinel;
        if (e.shiftKey) {
          if (activeElement === dialogRoot) {
            sentinel.focus();
          }
        } else if (activeElement === this.refs.sentinel) {
          dialogRoot.focus();
        }
      }
    }
  },

  onAlign(dialogNode) {
    const mousePosition = this.props.mousePosition;
    if (this.props.visible) {
      if (mousePosition) {
        const elOffset = offset(dialogNode);
        setTransformOrigin(dialogNode, `${mousePosition.x - elOffset.left}px ${mousePosition.y - elOffset.top}px`);
      } else {
        setTransformOrigin(dialogNode, '');
      }
    }
  },

  getDialogElement() {
    const props = this.props;
    const closable = props.closable;
    const prefixCls = props.prefixCls;
    const dest = {};
    if (props.width !== undefined) {
      dest.width = props.width;
    }
    if (props.height !== undefined) {
      dest.height = props.height;
    }
    if (props.zIndex !== undefined) {
      dest.zIndex = props.zIndex;
    }

    let footer;
    if (props.footer) {
      footer = (<div className={`${prefixCls}-footer`} ref="footer">{props.footer}</div>);
    }

    let header;
    if (props.title) {
      header = (<div className={`${prefixCls}-header`} ref="header">
        <div className={`${prefixCls}-title`}>{props.title}</div>
      </div>);
    }

    let closer;
    if (closable) {
      closer = (<a tabIndex="0" onClick={this.close} className={`${prefixCls}-close`}>
        <span className={`${prefixCls}-close-x`} />
      </a>);
    }

    const style = {...props.style, ...dest};
    const dialogProps = {
      className: [props.prefixCls, props.className].join(' '),
      tabIndex: '0',
      role: 'dialog',
      ref: 'dialog',
      style: style,
      onKeyDown: this.onKeyDown,
    };
    const transitionName = this.getTransitionName();
    const dialogElement = (<DOMWrap {...dialogProps}
      hiddenClassName={`${prefixCls}-hidden`}>
      <div className={`${prefixCls}-content`}>
        {closer}
        {header}
        <div className={`${prefixCls}-body`} style={props.bodyStyle} ref="body">{props.children}</div>
        {footer}
      </div>
      <div tabIndex="0" ref="sentinel" style={{width: 0, height: 0, overflow: 'hidden'}}>sentinel</div>
    </DOMWrap>);
    // add key for align to keep animate children stable
    return (<Animate key="dialog"
                     showProp="dialogVisible"
                     onLeave={this.onAnimateLeave}
                     transitionName={transitionName}
                     component=""
                     transitionAppear>
      <Align align={props.align}
             key="dialog"
             onAlign={this.onAlign}
             dialogVisible={props.visible}
             childrenProps={{
               visible: 'dialogVisible',
             }}
             monitorBufferTime={80}
             monitorWindowResize
             disabled={!props.visible}>
        {dialogElement}
      </Align>
    </Animate>);
  },

  getMaskElement() {
    const props = this.props;
    const maskProps = {
      onClick: this.onMaskClick,
    };

    if (props.zIndex) {
      maskProps.style = {zIndex: props.zIndex};
    }
    let maskElement;
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (<DOMWrap {...maskProps} key="mask"
                                             className={`${props.prefixCls}-mask`}
                                            visible={props.visible}
                                            hiddenClassName={`${props.prefixCls}-mask-hidden`} />);
      if (maskTransition) {
        maskElement = (<Animate key="mask" showProp="visible"
                                transitionAppear component=""
                                transitionName={maskTransition}>{maskElement}</Animate>);
      }
    }
    return maskElement;
  },

  getMaskTransitionName() {
    const props = this.props;
    let transitionName = props.maskTransitionName;
    const animation = props.maskAnimation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  },

  getTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    const animation = props.animation;
    if (!transitionName && animation) {
      transitionName = `${props.prefixCls}-${animation}`;
    }
    return transitionName;
  },
  
  getElement(part) {
    return this.refs[part];
  },

  close(e) {
    this.props.onClose(e);
  },

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const className = {
      [`${prefixCls}-wrap`]: 1,
    };

    return (<div className={classNames(className)} ref="root">
      {[this.getMaskElement(), this.getDialogElement()]}
    </div>);
  },
}); 

	function copy(obj, fields) {
	  const ret = {};
	  fields.forEach((f)=> {
	    if (obj[f] !== undefined) {
	      ret[f] = obj[f];
	    }
	  });
	  return ret;
	}

	class DialogWrap extends React.Component {
	  constructor(props) {
	    super(props);
	    this.state = {
	      visible: props.visible,
	    };
	    ['onClose', 'cleanDialogContainer'].forEach((m) => {
	      this[m] = this[m].bind(this);
	    });
	  }

	  componentDidMount() {
	    this.componentDidUpdate();
	  }

	  componentWillReceiveProps(props) {
	    if ('visible' in props) {
	      this.setState({
	        visible: props.visible,
	      });
	    }
	  }

	  shouldComponentUpdate(nextProps, nextState) {
	    return !!(this.state.visible || nextState.visible);
	  }

	  componentDidUpdate() {
	    if (this.dialogRendered) {
	    	this.dialogInstance = ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement(), this.getDialogContainer());
	    }
	  }

	  componentWillUnmount() {
	    if (this.dialogContainer) {
	      if (this.state.visible) {
	        ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement({
	          onAfterClose: this.cleanDialogContainer,
	          onClose: noop,
	          visible: false,
	        }), this.dialogContainer);
	      } else {
	        this.cleanDialogContainer();
	      }
	    }
	  }

	  onClose(e) {
	    this.props.onClose(e);
	  }

	  getDialogContainer() {
	    if (!this.dialogContainer) {
	      this.dialogContainer = document.createElement('div');
	      this.dialogContainer.className = `${this.props.prefixCls}-container`;
	      document.body.appendChild(this.dialogContainer);
	    }
	    return this.dialogContainer;
	  }

	  getDialogElement(extra) {
	    const props = this.props;
	    let dialogProps = copy(props, [
	      'className', 'closable', 'maskClosable', 'align',
	      'title', 'footer', 'mask',
	      'animation', 'transitionName',
	      'maskAnimation', 'maskTransitionName', 'mousePosition',
	      'prefixCls', 'style', 'width',
	      'height', 'zIndex', 'bodyStyle',
	    ]);
	    dialogProps = {
	      ...dialogProps,
	      onClose: this.onClose,
	      visible: this.state.visible,
	      ...extra,
	    };
	    return (<Dialog {...dialogProps} key="dialog">
	      {props.children}
	    </Dialog>);
	  }
	  getElement(part) {
	    return this.dialogInstance.getElement(part);
	  }
	  cleanDialogContainer() {
	    ReactDOM.unmountComponentAtNode(this.getDialogContainer());
	    document.body.removeChild(this.dialogContainer);
	    this.dialogContainer = null;
	  }

	  render() {
	    this.dialogRendered = this.dialogRendered || this.state.visible;
	    return null;
	  }
	}

	DialogWrap.defaultProps = {
	  className: '',
	  align: {
	    points: ['tc', 'tc'],
	    offset: [0, 100],
	  },
	  mask: true,
	  closable: true,
	  maskClosable: true,
	  prefixCls: 'rc-dialog',
	  onClose: noop,
	};

	DialogWrap.propTypes = {
	  className: React.PropTypes.string,
	  align: React.PropTypes.shape({
	    align: React.PropTypes.array,
	    offset: React.PropTypes.arrayOf(React.PropTypes.number),
	  }),
	  mask: React.PropTypes.bool,
	  closable: React.PropTypes.bool,
	  maskClosable: React.PropTypes.bool,
	  prefixCls: React.PropTypes.string,
	  visible: React.PropTypes.bool,
	  onClose: React.PropTypes.func,
	};
	RC.Dialog = DialogWrap;      	      
}(Smart.RC);