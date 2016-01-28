'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI) {

	var Css = {
		addClass: function addClass(elem, className) {
			$(elem).addClass(className);
		},
		removeClass: function removeClass(elem, n) {
			$(elem).addClass(n);
		}
	};

	var EVENT_NAME_MAP = {
		transitionend: {
			transition: 'transitionend',
			WebkitTransition: 'webkitTransitionEnd',
			MozTransition: 'mozTransitionEnd',
			OTransition: 'oTransitionEnd',
			msTransition: 'MSTransitionEnd'
		},

		animationend: {
			animation: 'animationend',
			WebkitAnimation: 'webkitAnimationEnd',
			MozAnimation: 'mozAnimationEnd',
			OAnimation: 'oAnimationEnd',
			msAnimation: 'MSAnimationEnd'
		}
	};

	var endEvents = [];

	function detectEvents() {
		var testEl = document.createElement('div');
		var style = testEl.style;

		if (!('AnimationEvent' in window)) {
			delete EVENT_NAME_MAP.animationend.animation;
		}

		if (!('TransitionEvent' in window)) {
			delete EVENT_NAME_MAP.transitionend.transition;
		}

		for (var baseEventName in EVENT_NAME_MAP) {
			if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
				var baseEvents = EVENT_NAME_MAP[baseEventName];
				for (var styleName in baseEvents) {
					if (styleName in style) {
						endEvents.push(baseEvents[styleName]);
						break;
					}
				}
			}
		}
	}

	if (typeof window !== 'undefined') {
		detectEvents();
	}

	function addEventListener(node, eventName, eventListener) {
		node.addEventListener(eventName, eventListener, false);
	}

	function removeEventListener(node, eventName, eventListener) {
		node.removeEventListener(eventName, eventListener, false);
	}

	var TransitionEvents = {
		addEndEventListener: function addEndEventListener(node, eventListener) {
			if (endEvents.length === 0) {
				window.setTimeout(eventListener, 0);
				return;
			}
			endEvents.forEach(function (endEvent) {
				addEventListener(node, endEvent, eventListener);
			});
		},

		endEvents: endEvents,

		removeEndEventListener: function removeEndEventListener(node, eventListener) {
			if (endEvents.length === 0) {
				return;
			}
			endEvents.forEach(function (endEvent) {
				removeEventListener(node, endEvent, eventListener);
			});
		}
	};

	var isCssAnimationSupported = TransitionEvents.endEvents.length !== 0;

	function getDuration(node, name) {
		var style = window.getComputedStyle(node);
		var prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
		var ret = '';
		for (var i = 0; i < prefixes.length; i++) {
			ret = style.getPropertyValue(prefixes[i] + name);
			if (ret) {
				break;
			}
		}
		return ret;
	}

	function fixBrowserByTimeout(node) {
		if (isCssAnimationSupported) {
			var transitionDuration = parseFloat(getDuration(node, 'transition-duration')) || 0;
			var animationDuration = parseFloat(getDuration(node, 'animation-duration')) || 0;
			var time = Math.max(transitionDuration, animationDuration);
			// sometimes, browser bug
			node.rcEndAnimTimeout = setTimeout(function () {
				node.rcEndAnimTimeout = null;
				if (node.rcEndListener) {
					node.rcEndListener();
				}
			}, time * 1000 + 200);
		}
	}

	function clearBrowserBugTimeout(node) {
		if (node.rcEndAnimTimeout) {
			clearTimeout(node.rcEndAnimTimeout);
			node.rcEndAnimTimeout = null;
		}
	}

	var cssAnimation = function cssAnimation(node, transitionName, callback) {
		var className = transitionName;
		var activeClassName = className + '-active';

		if (node.rcEndListener) {
			node.rcEndListener();
		}

		node.rcEndListener = function (e) {
			if (e && e.target !== node) {
				return;
			}

			if (node.rcAnimTimeout) {
				clearTimeout(node.rcAnimTimeout);
				node.rcAnimTimeout = null;
			}

			clearBrowserBugTimeout(node);

			Css.removeClass(node, className);
			Css.removeClass(node, activeClassName);

			TransitionEvents.removeEndEventListener(node, node.rcEndListener);
			node.rcEndListener = null;

			// Usually this optional callback is used for informing an owner of
			// a leave animation and telling it to remove the child.
			if (callback) {
				callback();
			}
		};

		TransitionEvents.addEndEventListener(node, node.rcEndListener);

		Css.addClass(node, className);

		node.rcAnimTimeout = setTimeout(function () {
			node.rcAnimTimeout = null;
			Css.addClass(node, activeClassName);
			fixBrowserByTimeout(node);
		}, 0);

		return {
			stop: function stop() {
				if (node.rcEndListener) {
					node.rcEndListener();
				}
			}
		};
	};

	cssAnimation.style = function (node, style, callback) {
		if (node.rcEndListener) {
			node.rcEndListener();
		}

		node.rcEndListener = function (e) {
			if (e && e.target !== node) {
				return;
			}

			if (node.rcAnimTimeout) {
				clearTimeout(node.rcAnimTimeout);
				node.rcAnimTimeout = null;
			}

			clearBrowserBugTimeout(node);

			Event.removeEndEventListener(node, node.rcEndListener);
			node.rcEndListener = null;

			// Usually this optional callback is used for informing an owner of
			// a leave animation and telling it to remove the child.
			if (callback) {
				callback();
			}
		};

		Event.addEndEventListener(node, node.rcEndListener);

		node.rcAnimTimeout = setTimeout(function () {
			for (var s in style) {
				if (style.hasOwnProperty(s)) {
					node.style[s] = style[s];
				}
			}
			node.rcAnimTimeout = null;
			fixBrowserByTimeout(node);
		}, 0);
	};

	cssAnimation.setTransition = function (node, p, value) {
		var property = p;
		var v = value;
		if (value === undefined) {
			v = property;
			property = '';
		}
		property = property || '';
		['Webkit', 'Moz', 'O',
		// ms is special .... !
		'ms'].forEach(function (prefix) {
			node.style[prefix + 'Transition' + property] = v;
		});
	};

	cssAnimation.addClass = Css.addClass;
	cssAnimation.removeClass = Css.removeClass;
	cssAnimation.isCssAnimationSupported = isCssAnimationSupported;
	UI.cssAnimation = cssAnimation;

	var animUtil = {
		isAppearSupported: function isAppearSupported(props) {
			return props.transitionName && props.transitionAppear || props.animation.appear;
		},
		isEnterSupported: function isEnterSupported(props) {
			return props.transitionName && props.transitionEnter || props.animation.enter;
		},
		isLeaveSupported: function isLeaveSupported(props) {
			return props.transitionName && props.transitionLeave || props.animation.leave;
		},
		allowAppearCallback: function allowAppearCallback(props) {
			return props.transitionAppear || props.animation.appear;
		},
		allowEnterCallback: function allowEnterCallback(props) {
			return props.transitionEnter || props.animation.enter;
		},
		allowLeaveCallback: function allowLeaveCallback(props) {
			return props.transitionLeave || props.animation.leave;
		}
	};

	var transitionMap = {
		enter: 'transitionEnter',
		appear: 'transitionAppear',
		leave: 'transitionLeave'
	};

	var AnimateChild = React.createClass({
		displayName: 'AnimateChild',

		propTypes: {
			children: React.PropTypes.any
		},

		componentWillUnmount: function componentWillUnmount() {
			this.stop();
		},
		componentWillEnter: function componentWillEnter(done) {
			if (animUtil.isEnterSupported(this.props)) {
				this.transition('enter', done);
			} else {
				done();
			}
		},
		componentWillAppear: function componentWillAppear(done) {
			if (animUtil.isAppearSupported(this.props)) {
				this.transition('appear', done);
			} else {
				done();
			}
		},
		componentWillLeave: function componentWillLeave(done) {
			if (animUtil.isLeaveSupported(this.props)) {
				this.transition('leave', done);
			} else {
				done();
			}
		},
		transition: function transition(animationType, finishCallback) {
			var _this = this;

			var node = ReactDOM.findDOMNode(this);
			var props = this.props;
			var transitionName = props.transitionName;
			this.stop();
			var end = function end() {
				_this.stopper = null;
				finishCallback();
			};
			if ((isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
				this.stopper = cssAnimation(node, transitionName + '-' + animationType, end);
			} else {
				this.stopper = props.animation[animationType](node, end);
			}
		},
		stop: function stop() {
			var stopper = this.stopper;
			if (stopper) {
				this.stopper = null;
				stopper.stop();
			}
		},
		render: function render() {
			return this.props.children;
		}
	});

	function toArrayChildren(children) {
		var ret = [];
		React.Children.forEach(children, function (child) {
			ret.push(child);
		});
		return ret;
	}

	function findChildInChildrenByKey(children, key) {
		var ret = null;
		if (children) {
			children.forEach(function (child) {
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
		var ret = null;
		if (children) {
			children.forEach(function (child) {
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
		var found = 0;
		if (children) {
			children.forEach(function (child) {
				if (found) {
					return;
				}
				found = child.key === key && !child.props[showProp];
			});
		}
		return found;
	}

	function isSameChildren(c1, c2, showProp) {
		var same = c1.length === c2.length;
		if (same) {
			c1.forEach(function (child, index) {
				var child2 = c2[index];
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
		var ret = [];

		// For each key of `next`, the list of keys to insert before that key in
		// the combined list
		var nextChildrenPending = {};
		var pendingChildren = [];
		prev.forEach(function (child) {
			if (findChildInChildrenByKey(next, child.key)) {
				if (pendingChildren.length) {
					nextChildrenPending[child.key] = pendingChildren;
					pendingChildren = [];
				}
			} else {
				pendingChildren.push(child);
			}
		});

		next.forEach(function (child) {
			if (nextChildrenPending.hasOwnProperty(child.key)) {
				ret = ret.concat(nextChildrenPending[child.key]);
			}
			ret.push(child);
		});

		ret = ret.concat(pendingChildren);

		return ret;
	}

	var defaultKey = 'rc_animate_' + Date.now();

	function getChildrenFromProps(props) {
		var children = props.children;
		if (React.isValidElement(children)) {
			if (!children.key) {
				return React.cloneElement(children, {
					key: defaultKey
				});
			}
		}
		return children;
	}

	function noop() {}

	var Animate = React.createClass({
		displayName: 'Animate',

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
			showProp: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				animation: {},
				component: 'span',
				transitionEnter: true,
				transitionLeave: true,
				transitionAppear: false,
				onEnd: noop,
				onEnter: noop,
				onLeave: noop,
				onAppear: noop
			};
		},
		getInitialState: function getInitialState() {
			this.currentlyAnimatingKeys = {};
			this.keysToEnter = [];
			this.keysToLeave = [];
			return {
				children: toArrayChildren(getChildrenFromProps(this.props))
			};
		},
		componentDidMount: function componentDidMount() {
			var _this2 = this;

			var showProp = this.props.showProp;
			var children = this.state.children;
			if (showProp) {
				children = children.filter(function (child) {
					return !!child.props[showProp];
				});
			}
			children.forEach(function (child) {
				_this2.performAppear(child.key);
			});
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var _this3 = this;

			this.nextProps = nextProps;
			var nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
			var props = this.props;
			// exclusive needs immediate response
			if (props.exclusive) {
				Object.keys(this.currentlyAnimatingKeys).forEach(function (key) {
					_this3.stop(key);
				});
			}
			var showProp = props.showProp;
			var currentlyAnimatingKeys = this.currentlyAnimatingKeys;
			// last props children if exclusive
			var currentChildren = props.exclusive ? toArrayChildren(getChildrenFromProps(props)) : this.state.children;
			// in case destroy in showProp mode
			var newChildren = [];
			if (showProp) {
				currentChildren.forEach(function (currentChild) {
					var nextChild = findChildInChildrenByKey(nextChildren, currentChild.key);
					var newChild = undefined;
					if ((!nextChild || !nextChild.props[showProp]) && currentChild.props[showProp]) {
						newChild = React.cloneElement(nextChild || currentChild, _defineProperty({}, showProp, true));
					} else {
						newChild = nextChild;
					}
					if (newChild) {
						newChildren.push(newChild);
					}
				});
				nextChildren.forEach(function (nextChild) {
					if (!findChildInChildrenByKey(currentChildren, nextChild.key)) {
						newChildren.push(nextChild);
					}
				});
			} else {
				newChildren = mergeChildren(currentChildren, nextChildren);
			}

			// need render to avoid update
			this.setState({
				children: newChildren
			});

			nextChildren.forEach(function (child) {
				var key = child.key;
				if (currentlyAnimatingKeys[key]) {
					return;
				}
				var hasPrev = findChildInChildrenByKey(currentChildren, key);
				if (showProp) {
					var showInNext = child.props[showProp];
					if (hasPrev) {
						var showInNow = findShownChildInChildrenByKey(currentChildren, key, showProp);
						if (!showInNow && showInNext) {
							_this3.keysToEnter.push(key);
						}
					} else if (showInNext) {
						_this3.keysToEnter.push(key);
					}
				} else if (!hasPrev) {
					_this3.keysToEnter.push(key);
				}
			});

			currentChildren.forEach(function (child) {
				var key = child.key;
				if (currentlyAnimatingKeys[key]) {
					return;
				}
				var hasNext = findChildInChildrenByKey(nextChildren, key);
				if (showProp) {
					var showInNow = child.props[showProp];
					if (hasNext) {
						var showInNext = findShownChildInChildrenByKey(nextChildren, key, showProp);
						if (!showInNext && showInNow) {
							_this3.keysToLeave.push(key);
						}
					} else if (showInNow) {
						_this3.keysToLeave.push(key);
					}
				} else if (!hasNext) {
					_this3.keysToLeave.push(key);
				}
			});
		},
		componentDidUpdate: function componentDidUpdate() {
			if (this.isMounted()) {
				var keysToEnter = this.keysToEnter;
				this.keysToEnter = [];
				keysToEnter.forEach(this.performEnter);
				var keysToLeave = this.keysToLeave;
				this.keysToLeave = [];
				keysToLeave.forEach(this.performLeave);
			}
		},
		performEnter: function performEnter(key) {
			// may already remove by exclusive
			if (this.refs[key]) {
				this.currentlyAnimatingKeys[key] = true;
				this.refs[key].componentWillEnter(this.handleDoneAdding.bind(this, key, 'enter'));
			}
		},
		performAppear: function performAppear(key) {
			if (this.refs[key]) {
				this.currentlyAnimatingKeys[key] = true;
				this.refs[key].componentWillAppear(this.handleDoneAdding.bind(this, key, 'appear'));
			}
		},
		handleDoneAdding: function handleDoneAdding(key, type) {
			var props = this.props;
			delete this.currentlyAnimatingKeys[key];
			// if update on exclusive mode, skip check
			if (props.exclusive && props !== this.nextProps) {
				return;
			}
			var currentChildren = toArrayChildren(getChildrenFromProps(props));
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
		performLeave: function performLeave(key) {
			// may already remove by exclusive
			if (this.refs[key]) {
				this.currentlyAnimatingKeys[key] = true;
				this.refs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
			}
		},
		handleDoneLeaving: function handleDoneLeaving(key) {
			var props = this.props;
			delete this.currentlyAnimatingKeys[key];
			// if update on exclusive mode, skip check
			if (props.exclusive && props !== this.nextProps) {
				return;
			}
			var currentChildren = toArrayChildren(getChildrenFromProps(props));
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
						children: currentChildren
					});
				}
			}
		},
		isValidChildByKey: function isValidChildByKey(currentChildren, key) {
			var showProp = this.props.showProp;
			if (showProp) {
				return findShownChildInChildrenByKey(currentChildren, key, showProp);
			}
			return findChildInChildrenByKey(currentChildren, key);
		},
		stop: function stop(key) {
			delete this.currentlyAnimatingKeys[key];
			var component = this.refs[key];
			if (component) {
				component.stop();
			}
		},
		render: function render() {
			var props = this.props;
			this.nextProps = props;
			var stateChildren = this.state.children;
			var children = null;
			if (stateChildren) {
				children = stateChildren.map(function (child) {
					if (child === null) {
						return child;
					}
					if (!child.key) {
						throw new Error('must set key for <rc-animate> children');
					}
					return React.createElement(
						AnimateChild,
						{
							key: child.key,
							ref: child.key,
							animation: props.animation,
							transitionName: props.transitionName,
							transitionEnter: props.transitionEnter,
							transitionAppear: props.transitionAppear,
							transitionLeave: props.transitionLeave },
						child
					);
				});
			}
			var Component = props.component;
			if (Component) {
				return React.createElement(
					Component,
					this.props,
					' ',
					children,
					' '
				);
			}
			return children[0] || null;
		}
	});

	UI.Animate = Animate;
})(Smart.UI);