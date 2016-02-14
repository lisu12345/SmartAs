+ function(RC) {

	const {noop} = _,
		{cssAnimate} = RC,
		{isCssAnimationSupported} = cssAnimate;
	
	const animUtil = {
	  isAppearSupported(props) {
	    return props.transitionName && props.transitionAppear || props.animation.appear;
	  },
	  isEnterSupported(props) {
	    return props.transitionName && props.transitionEnter || props.animation.enter;
	  },
	  isLeaveSupported(props) {
	    return props.transitionName && props.transitionLeave || props.animation.leave;
	  },


	  allowAppearCallback(props) {
	    return props.transitionAppear || props.animation.appear;
	  },
	  allowEnterCallback(props) {
	    return props.transitionEnter || props.animation.enter;
	  },
	  allowLeaveCallback(props) {
	    return props.transitionLeave || props.animation.leave;
	  },
	};


	function toArrayChildren(children) {
	  const ret = [];
	  React.Children.forEach(children, (child)=> {
	    ret.push(child);
	  });
	  return ret;
	}

	function findChildInChildrenByKey(children, key) {
	  let ret = null;
	  if (children) {
	    children.forEach((child) => {
	      if (ret) {
	        return;
	      }
	      if (child.key === key) {
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}

	function findShownChildInChildrenByKey(children, key, showProp) {
	  let ret = null;
	  if (children) {
	    children.forEach((child) => {
	      if (child.key === key && child.props[showProp]) {
	        if (ret) {
	          throw new Error('two child with same key for <rc-animate> children');
	        }
	        ret = child;
	      }
	    });
	  }
	  return ret;
	}

	function findHiddenChildInChildrenByKey(children, key, showProp) {
	  let found = 0;
	  if (children) {
	    children.forEach((child) => {
	      if (found) {
	        return;
	      }
	      found = child.key === key && !child.props[showProp];
	    });
	  }
	  return found;
	}

	function isSameChildren(c1, c2, showProp) {
	  let same = c1.length === c2.length;
	  if (same) {
	    c1.forEach((child, index) => {
	      const child2 = c2[index];
	      if (child.key !== child2.key) {
	        same = false;
	      } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
	        same = false;
	      }
	    });
	  }
	  return same;
	}

	function mergeChildren(prev, next) {
	  let ret = [];

	  // For each key of `next`, the list of keys to insert before that key in
	  // the combined list
	  const nextChildrenPending = {};
	  let pendingChildren = [];
	  prev.forEach((child) => {
	    if (findChildInChildrenByKey(next, child.key)) {
	      if (pendingChildren.length) {
	        nextChildrenPending[child.key] = pendingChildren;
	        pendingChildren = [];
	      }
	    } else {
	      pendingChildren.push(child);
	    }
	  });

	  next.forEach((child) => {
	    if (nextChildrenPending.hasOwnProperty(child.key)) {
	      ret = ret.concat(nextChildrenPending[child.key]);
	    }
	    ret.push(child);
	  });

	  ret = ret.concat(pendingChildren);

	  return ret;
	}

	const transitionMap = {
	  enter: 'transitionEnter',
	  appear: 'transitionAppear',
	  leave: 'transitionLeave',
	};

	const AnimateChild = React.createClass({
	  propTypes: {
	    children: React.PropTypes.any,
	  },

	  componentWillUnmount() {
	    this.stop();
	  },

	  componentWillEnter(done) {
	    if (animUtil.isEnterSupported(this.props)) {
	      this.transition('enter', done);
	    } else {
	      done();
	    }
	  },

	  componentWillAppear(done) {
	    if (animUtil.isAppearSupported(this.props)) {
	      this.transition('appear', done);
	    } else {
	      done();
	    }
	  },

	  componentWillLeave(done) {
	    if (animUtil.isLeaveSupported(this.props)) {
	      this.transition('leave', done);
	    } else {
	      done();
	    }
	  },

	  transition(animationType, finishCallback) {
	    const node = ReactDOM.findDOMNode(this);
	    const props = this.props;
	    const transitionName = props.transitionName;
	    this.stop();
	    const end = () => {
	      this.stopper = null;
	      finishCallback();
	    };
	    if ((isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
	      this.stopper = cssAnimate(node, transitionName + '-' + animationType, end);
	    } else {
	      this.stopper = props.animation[animationType](node, end);
	    }
	  },

	  stop() {
	    const stopper = this.stopper;
	    if (stopper) {
	      this.stopper = null;
	      stopper.stop();
	    }
	  },

	  render() {
	    return this.props.children;
	  },
	});

	const defaultKey = 'rc_animate_' + Date.now();

	function getChildrenFromProps(props) {
	  const children = props.children;
	  if (React.isValidElement(children)) {
	    if (!children.key) {
	      return React.cloneElement(children, {
	        key: defaultKey,
	      });
	    }
	  }
	  return children;
	}



	const Animate = React.createClass({
	  propTypes: {
	    component: React.PropTypes.any,
	    animation: React.PropTypes.object,
	    transitionName: React.PropTypes.string,
	    transitionEnter: React.PropTypes.bool,
	    transitionAppear: React.PropTypes.bool,
	    exclusive: React.PropTypes.bool,
	    transitionLeave: React.PropTypes.bool,
	    onEnd: React.PropTypes.func,
	    onEnter: React.PropTypes.func,
	    onLeave: React.PropTypes.func,
	    onAppear: React.PropTypes.func,
	    showProp: React.PropTypes.string,
	  },

	  getDefaultProps() {
	    return {
	      animation: {},
	      component: 'span',
	      transitionEnter: true,
	      transitionLeave: true,
	      transitionAppear: false,
	      onEnd: noop,
	      onEnter: noop,
	      onLeave: noop,
	      onAppear: noop,
	    };
	  },

	  getInitialState() {
	    this.currentlyAnimatingKeys = {};
	    this.keysToEnter = [];
	    this.keysToLeave = [];
	    return {
	      children: toArrayChildren(getChildrenFromProps(this.props)),
	    };
	  },

	  componentDidMount() {
	    const showProp = this.props.showProp;
	    let children = this.state.children;
	    if (showProp) {
	      children = children.filter((child) => {
	        return !!child.props[showProp];
	      });
	    }
	    children.forEach((child) => {
	      this.performAppear(child.key);
	    });
	  },

	  componentWillReceiveProps(nextProps) {
	    this.nextProps = nextProps;
	    const nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
	    const props = this.props;
	    // exclusive needs immediate response
	    if (props.exclusive) {
	      Object.keys(this.currentlyAnimatingKeys).forEach((key) => {
	        this.stop(key);
	      });
	    }
	    const showProp = props.showProp;
	    const currentlyAnimatingKeys = this.currentlyAnimatingKeys;
	    // last props children if exclusive
	    const currentChildren = props.exclusive ? toArrayChildren(getChildrenFromProps(props)) : this.state.children;
	    // in case destroy in showProp mode
	    let newChildren = [];
	    if (showProp) {
	      currentChildren.forEach((currentChild)=> {
	        const nextChild = findChildInChildrenByKey(nextChildren, currentChild.key);
	        let newChild;
	        if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
	          newChild = React.cloneElement(nextChild || currentChild, {
	            [showProp]: true,
	          });
	        } else {
	          newChild = nextChild;
	        }
	        if (newChild) {
	          newChildren.push(newChild);
	        }
	      });
	      nextChildren.forEach((nextChild) => {
	        if (!findChildInChildrenByKey(currentChildren, nextChild.key)) {
	          newChildren.push(nextChild);
	        }
	      });
	    } else {
	      newChildren = mergeChildren(
	        currentChildren,
	        nextChildren
	      );
	    }

	    // need render to avoid update
	    this.setState({
	      children: newChildren,
	    });

	    nextChildren.forEach((child)=> {
	      const key = child.key;
	      if (currentlyAnimatingKeys[key]) {
	        return;
	      }
	      const hasPrev = findChildInChildrenByKey(currentChildren, key);
	      if (showProp) {
	        const showInNext = child.props[showProp];
	        if (hasPrev) {
	          const showInNow = findShownChildInChildrenByKey(currentChildren, key, showProp);
	          if (!showInNow && showInNext) {
	            this.keysToEnter.push(key);
	          }
	        } else if (showInNext) {
	          this.keysToEnter.push(key);
	        }
	      } else if (!hasPrev) {
	        this.keysToEnter.push(key);
	      }
	    });

	    currentChildren.forEach((child)=> {
	      const key = child.key;
	      if (currentlyAnimatingKeys[key]) {
	        return;
	      }
	      const hasNext = findChildInChildrenByKey(nextChildren, key);
	      if (showProp) {
	        const showInNow = child.props[showProp];
	        if (hasNext) {
	          const showInNext = findShownChildInChildrenByKey(nextChildren, key, showProp);
	          if (!showInNext && showInNow) {
	            this.keysToLeave.push(key);
	          }
	        } else if (showInNow) {
	          this.keysToLeave.push(key);
	        }
	      } else if (!hasNext) {
	        this.keysToLeave.push(key);
	      }
	    });
	  },

	  componentDidUpdate() {
	    if (this.isMounted()) {
	      const keysToEnter = this.keysToEnter;
	      this.keysToEnter = [];
	      keysToEnter.forEach(this.performEnter);
	      const keysToLeave = this.keysToLeave;
	      this.keysToLeave = [];
	      keysToLeave.forEach(this.performLeave);
	    }
	  },

	  performEnter(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillEnter(
	        this.handleDoneAdding.bind(this, key, 'enter')
	      );
	    }
	  },

	  performAppear(key) {
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillAppear(
	        this.handleDoneAdding.bind(this, key, 'appear')
	      );
	    }
	  },

	  handleDoneAdding(key, type) {
	    const props = this.props;
	    delete this.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== this.nextProps) {
	      return;
	    }
	    const currentChildren = toArrayChildren(getChildrenFromProps(props));
	    if (!this.isValidChildByKey(currentChildren, key)) {
	      // exclusive will not need this
	      this.performLeave(key);
	    } else {
	      if (type === 'appear') {
	        if (animUtil.allowAppearCallback(props)) {
	          props.onAppear(key);
	          props.onEnd(key, true);
	        }
	      } else {
	        if (animUtil.allowEnterCallback(props)) {
	          props.onEnter(key);
	          props.onEnd(key, true);
	        }
	      }
	    }
	  },

	  performLeave(key) {
	    // may already remove by exclusive
	    if (this.refs[key]) {
	      this.currentlyAnimatingKeys[key] = true;
	      this.refs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
	    }
	  },

	  handleDoneLeaving(key) {
	    const props = this.props;
	    delete this.currentlyAnimatingKeys[key];
	    // if update on exclusive mode, skip check
	    if (props.exclusive && props !== this.nextProps) {
	      return;
	    }
	    const currentChildren = toArrayChildren(getChildrenFromProps(props));
	    // in case state change is too fast
	    if (this.isValidChildByKey(currentChildren, key)) {
	      this.performEnter(key);
	    } else {
	      if (animUtil.allowLeaveCallback(props)) {
	        props.onLeave(key);
	        props.onEnd(key, false);
	      }
	      if (this.isMounted() && !isSameChildren(this.state.children, currentChildren, props.showProp)) {
	        this.setState({
	          children: currentChildren,
	        });
	      }
	    }
	  },

	  isValidChildByKey(currentChildren, key) {
	    const showProp = this.props.showProp;
	    if (showProp) {
	      return findShownChildInChildrenByKey(currentChildren, key, showProp);
	    }
	    return findChildInChildrenByKey(currentChildren, key);
	  },

	  stop(key) {
	    delete this.currentlyAnimatingKeys[key];
	    const component = this.refs[key];
	    if (component) {
	      component.stop();
	    }
	  },

	  render() {
	    const props = this.props;
	    this.nextProps = props;
	    const stateChildren = this.state.children;
	    let children = null;
	    if (stateChildren) {
	      children = stateChildren.map((child) => {
	        if (child === null) {
	          return child;
	        }
	        if (!child.key) {
	          throw new Error('must set key for <rc-animate> children');
	        }
	        return (<AnimateChild
	          key={child.key}
	          ref={child.key}
	          animation={props.animation}
	          transitionName={props.transitionName}
	          transitionEnter={props.transitionEnter}
	          transitionAppear={props.transitionAppear}
	          transitionLeave={props.transitionLeave}>
	          {child}
	        </AnimateChild>);
	      });
	    }
	    const Component = props.component;
	    if (Component) {
	      return <Component {...this.props}>{children}</Component>;
	    }
	    return children[0] || null;
	  },
	});

	RC.Animate = Animate;
}(Smart.RC);