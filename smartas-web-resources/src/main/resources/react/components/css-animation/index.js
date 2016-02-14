+ function(RC) {
  const EVENT_NAME_MAP = {
    transitionend: {
      transition: 'transitionend',
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'mozTransitionEnd',
      OTransition: 'oTransitionEnd',
      msTransition: 'MSTransitionEnd',
    },

    animationend: {
      animation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'mozAnimationEnd',
      OAnimation: 'oAnimationEnd',
      msAnimation: 'MSAnimationEnd',
    },
  };

  const endEvents = [];

  function detectEvents() {
    const testEl = document.createElement('div');
    const style = testEl.style;

    if (!('AnimationEvent' in window)) {
      delete EVENT_NAME_MAP.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
      delete EVENT_NAME_MAP.transitionend.transition;
    }

    for (const baseEventName in EVENT_NAME_MAP) {
      if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
        const baseEvents = EVENT_NAME_MAP[baseEventName];
        for (const styleName in baseEvents) {
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

  const Event = {
    addEndEventListener(node, eventListener) {
      if (endEvents.length === 0) {
        window.setTimeout(eventListener, 0);
        return;
      }
      endEvents.forEach((endEvent) => {
        addEventListener(node, endEvent, eventListener);
      });
    },

    endEvents: endEvents,

    removeEndEventListener(node, eventListener) {
      if (endEvents.length === 0) {
        return;
      }
      endEvents.forEach((endEvent) => {
        removeEventListener(node, endEvent, eventListener);
      });
    },
  };


  const SPACE = ' ';
  const RE_CLASS = /[\n\t\r]/g;

  function norm(elemClass) {
    return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
  }

  const Css = {
    addClass(elem, className) {
      elem.className += ' ' + className;
    },

    removeClass(elem, n) {
      const elemClass = elem.className.trim();
      let className = norm(elemClass);
      let needle = n.trim();
      needle = SPACE + needle + SPACE;
      // 一个 cls 有可能多次出现：'link link2 link link3 link'
      while (className.indexOf(needle) >= 0) {
        className = className.replace(needle, SPACE);
      }
      elem.className = className.trim();
    },
  };


  const isCssAnimationSupported = Event.endEvents.length !== 0;


  function getDuration(node, name) {
    const style = window.getComputedStyle(node);
    const prefixes = ['-webkit-', '-moz-', '-o-', 'ms-', ''];
    let ret = '';
    for (let i = 0; i < prefixes.length; i++) {
      ret = style.getPropertyValue(prefixes[i] + name);
      if (ret) {
        break;
      }
    }
    return (ret);
  }

  function fixBrowserByTimeout(node) {
    if (isCssAnimationSupported) {
      const transitionDuration = parseFloat(getDuration(node, 'transition-duration')) || 0;
      const animationDuration = parseFloat(getDuration(node, 'animation-duration')) || 0;
      const time = Math.max(transitionDuration, animationDuration);
      // sometimes, browser bug
      node.rcEndAnimTimeout = setTimeout(() => {
        node.rcEndAnimTimeout = null;
        if (node.rcEndListener) {
          node.rcEndListener();
        }
      }, (time) * 1000 + 200);
    }
  }

  function clearBrowserBugTimeout(node) {
    if (node.rcEndAnimTimeout) {
      clearTimeout(node.rcEndAnimTimeout);
      node.rcEndAnimTimeout = null;
    }
  }

  const cssAnimation = (node, transitionName, callback) => {
    const className = transitionName;
    const activeClassName = className + '-active';

    if (node.rcEndListener) {
      node.rcEndListener();
    }

    node.rcEndListener = (e) => {
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

      Event.removeEndEventListener(node, node.rcEndListener);
      node.rcEndListener = null;

      // Usually this optional callback is used for informing an owner of
      // a leave animation and telling it to remove the child.
      if (callback) {
        callback();
      }
    };

    Event.addEndEventListener(node, node.rcEndListener);

    Css.addClass(node, className);

    node.rcAnimTimeout = setTimeout(() => {
      node.rcAnimTimeout = null;
      Css.addClass(node, activeClassName);
      fixBrowserByTimeout(node);
    }, 0);

    return {
      stop() {
        if (node.rcEndListener) {
          node.rcEndListener();
        }
      },
    };
  };

  cssAnimation.style = (node, style, callback) => {
    if (node.rcEndListener) {
      node.rcEndListener();
    }

    node.rcEndListener = (e) => {
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

    node.rcAnimTimeout = setTimeout(() => {
      for (const s in style) {
        if (style.hasOwnProperty(s)) {
          node.style[s] = style[s];
        }
      }
      node.rcAnimTimeout = null;
      fixBrowserByTimeout(node);
    }, 0);
  };

  cssAnimation.setTransition = (node, p, value) => {
    let property = p;
    let v = value;
    if (value === undefined) {
      v = property;
      property = '';
    }
    property = property || '';
    ['Webkit',
      'Moz',
      'O',
      // ms is special .... !
      'ms'].forEach((prefix) => {
        node.style[`${prefix}Transition${property}`] = v;
      });
  };

  cssAnimation.addClass = Css.addClass;
  cssAnimation.removeClass = Css.removeClass;
  cssAnimation.isCssAnimationSupported = isCssAnimationSupported;

  RC.cssAnimation = cssAnimation;
  RC.cssAnimate = cssAnimation;
}(Smart.RC);
