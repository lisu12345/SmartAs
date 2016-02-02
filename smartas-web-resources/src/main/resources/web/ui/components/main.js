'use strict';

+(function (Namespace) {
	var RC = Namespace.register("Smart.RC");
	var assign = _.assign;

	var velocity = $.Velocity;

	function animate(node, show, transitionName, done) {
		var ok = undefined;

		function complete() {
			if (!ok) {
				ok = true;
				done();
			}
		}

		// Fix safari flash bug
		node.style.display = show ? 'block' : 'none';
		velocity(node, transitionName, {
			duration: 240,
			complete: complete,
			easing: 'easeInOutQuad'
		});
		return {
			stop: function stop() {
				velocity(node, 'finish');
				complete();
			}
		};
	}

	var animation = {
		enter: function enter(node, done) {
			return animate(node, false, 'slideDown', done);
		},
		leave: function leave(node, done) {
			return animate(node, true, 'slideUp', done);
		},
		appear: function appear(node, done) {
			return animate(node, false, 'slideDown', done);
		}
	};

	RC.Animation = animation;
	RC.animation = animation;

	var DOMWrap = React.createClass({
		displayName: 'DOMWrap',

		propTypes: {
			tag: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				tag: 'div'
			};
		},
		render: function render() {
			var props = assign({}, this.props);
			if (!props.visible) {
				props.className = props.className || '';
				props.className += ' ' + props.hiddenClassName;
			}
			var Tag = props.tag;
			return React.createElement(Tag, props);
		}
	});
	RC.DOMWrap = DOMWrap;
})(Smart.Namespace);
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (RC) {
  var util = {};
  RC.Util = RC.util = util;
  /**
   * @ignore
   * some key-codes definition and utils from closure-library
   * @author yiminghe@gmail.com
   */

  var KeyCode = {
    /**
     * MAC_ENTER
     */
    MAC_ENTER: 3,
    /**
     * BACKSPACE
     */
    BACKSPACE: 8,
    /**
     * TAB
     */
    TAB: 9,
    /**
     * NUMLOCK on FF/Safari Mac
     */
    NUM_CENTER: 12, // NUMLOCK on FF/Safari Mac
    /**
     * ENTER
     */
    ENTER: 13,
    /**
     * SHIFT
     */
    SHIFT: 16,
    /**
     * CTRL
     */
    CTRL: 17,
    /**
     * ALT
     */
    ALT: 18,
    /**
     * PAUSE
     */
    PAUSE: 19,
    /**
     * CAPS_LOCK
     */
    CAPS_LOCK: 20,
    /**
     * ESC
     */
    ESC: 27,
    /**
     * SPACE
     */
    SPACE: 32,
    /**
     * PAGE_UP
     */
    PAGE_UP: 33, // also NUM_NORTH_EAST
    /**
     * PAGE_DOWN
     */
    PAGE_DOWN: 34, // also NUM_SOUTH_EAST
    /**
     * END
     */
    END: 35, // also NUM_SOUTH_WEST
    /**
     * HOME
     */
    HOME: 36, // also NUM_NORTH_WEST
    /**
     * LEFT
     */
    LEFT: 37, // also NUM_WEST
    /**
     * UP
     */
    UP: 38, // also NUM_NORTH
    /**
     * RIGHT
     */
    RIGHT: 39, // also NUM_EAST
    /**
     * DOWN
     */
    DOWN: 40, // also NUM_SOUTH
    /**
     * PRINT_SCREEN
     */
    PRINT_SCREEN: 44,
    /**
     * INSERT
     */
    INSERT: 45, // also NUM_INSERT
    /**
     * DELETE
     */
    DELETE: 46, // also NUM_DELETE
    /**
     * ZERO
     */
    ZERO: 48,
    /**
     * ONE
     */
    ONE: 49,
    /**
     * TWO
     */
    TWO: 50,
    /**
     * THREE
     */
    THREE: 51,
    /**
     * FOUR
     */
    FOUR: 52,
    /**
     * FIVE
     */
    FIVE: 53,
    /**
     * SIX
     */
    SIX: 54,
    /**
     * SEVEN
     */
    SEVEN: 55,
    /**
     * EIGHT
     */
    EIGHT: 56,
    /**
     * NINE
     */
    NINE: 57,
    /**
     * QUESTION_MARK
     */
    QUESTION_MARK: 63, // needs localization
    /**
     * A
     */
    A: 65,
    /**
     * B
     */
    B: 66,
    /**
     * C
     */
    C: 67,
    /**
     * D
     */
    D: 68,
    /**
     * E
     */
    E: 69,
    /**
     * F
     */
    F: 70,
    /**
     * G
     */
    G: 71,
    /**
     * H
     */
    H: 72,
    /**
     * I
     */
    I: 73,
    /**
     * J
     */
    J: 74,
    /**
     * K
     */
    K: 75,
    /**
     * L
     */
    L: 76,
    /**
     * M
     */
    M: 77,
    /**
     * N
     */
    N: 78,
    /**
     * O
     */
    O: 79,
    /**
     * P
     */
    P: 80,
    /**
     * Q
     */
    Q: 81,
    /**
     * R
     */
    R: 82,
    /**
     * S
     */
    S: 83,
    /**
     * T
     */
    T: 84,
    /**
     * U
     */
    U: 85,
    /**
     * V
     */
    V: 86,
    /**
     * W
     */
    W: 87,
    /**
     * X
     */
    X: 88,
    /**
     * Y
     */
    Y: 89,
    /**
     * Z
     */
    Z: 90,
    /**
     * META
     */
    META: 91, // WIN_KEY_LEFT
    /**
     * WIN_KEY_RIGHT
     */
    WIN_KEY_RIGHT: 92,
    /**
     * CONTEXT_MENU
     */
    CONTEXT_MENU: 93,
    /**
     * NUM_ZERO
     */
    NUM_ZERO: 96,
    /**
     * NUM_ONE
     */
    NUM_ONE: 97,
    /**
     * NUM_TWO
     */
    NUM_TWO: 98,
    /**
     * NUM_THREE
     */
    NUM_THREE: 99,
    /**
     * NUM_FOUR
     */
    NUM_FOUR: 100,
    /**
     * NUM_FIVE
     */
    NUM_FIVE: 101,
    /**
     * NUM_SIX
     */
    NUM_SIX: 102,
    /**
     * NUM_SEVEN
     */
    NUM_SEVEN: 103,
    /**
     * NUM_EIGHT
     */
    NUM_EIGHT: 104,
    /**
     * NUM_NINE
     */
    NUM_NINE: 105,
    /**
     * NUM_MULTIPLY
     */
    NUM_MULTIPLY: 106,
    /**
     * NUM_PLUS
     */
    NUM_PLUS: 107,
    /**
     * NUM_MINUS
     */
    NUM_MINUS: 109,
    /**
     * NUM_PERIOD
     */
    NUM_PERIOD: 110,
    /**
     * NUM_DIVISION
     */
    NUM_DIVISION: 111,
    /**
     * F1
     */
    F1: 112,
    /**
     * F2
     */
    F2: 113,
    /**
     * F3
     */
    F3: 114,
    /**
     * F4
     */
    F4: 115,
    /**
     * F5
     */
    F5: 116,
    /**
     * F6
     */
    F6: 117,
    /**
     * F7
     */
    F7: 118,
    /**
     * F8
     */
    F8: 119,
    /**
     * F9
     */
    F9: 120,
    /**
     * F10
     */
    F10: 121,
    /**
     * F11
     */
    F11: 122,
    /**
     * F12
     */
    F12: 123,
    /**
     * NUMLOCK
     */
    NUMLOCK: 144,
    /**
     * SEMICOLON
     */
    SEMICOLON: 186, // needs localization
    /**
     * DASH
     */
    DASH: 189, // needs localization
    /**
     * EQUALS
     */
    EQUALS: 187, // needs localization
    /**
     * COMMA
     */
    COMMA: 188, // needs localization
    /**
     * PERIOD
     */
    PERIOD: 190, // needs localization
    /**
     * SLASH
     */
    SLASH: 191, // needs localization
    /**
     * APOSTROPHE
     */
    APOSTROPHE: 192, // needs localization
    /**
     * SINGLE_QUOTE
     */
    SINGLE_QUOTE: 222, // needs localization
    /**
     * OPEN_SQUARE_BRACKET
     */
    OPEN_SQUARE_BRACKET: 219, // needs localization
    /**
     * BACKSLASH
     */
    BACKSLASH: 220, // needs localization
    /**
     * CLOSE_SQUARE_BRACKET
     */
    CLOSE_SQUARE_BRACKET: 221, // needs localization
    /**
     * WIN_KEY
     */
    WIN_KEY: 224,
    /**
     * MAC_FF_META
     */
    MAC_FF_META: 224, // Firefox (Gecko) fires this for the meta key instead of 91
    /**
     * WIN_IME
     */
    WIN_IME: 229
  };

  /*
   whether text and modified key is entered at the same time.
   */
  KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
    var keyCode = e.keyCode;
    if (e.altKey && !e.ctrlKey || e.metaKey ||
    // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }

    // The following keys are quite harmless, even in combination with
    // CTRL, ALT or SHIFT.
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  };

  /*
   whether character is entered.
   */
  KeyCode.isCharacterKey = function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }

    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }

    // Safari sends zero key code for non-latin characters.
    if (window.navigation.userAgent.indexOf('WebKit') !== -1 && keyCode === 0) {
      return true;
    }

    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  };

  util.KeyCode = KeyCode;

  /**
   * Safe chained function
   *
   * Will only create a new function if needed,
   * otherwise will pass back existing functions or null.
   *
   * @returns {function|null}
   */
  function createChainedFunction() {
    var args = arguments;
    return function chainedFunction() {
      for (var i = 0; i < args.length; i++) {
        if (args[i] && args[i].apply) {
          args[i].apply(this, arguments);
        }
      }
    };
  }
  util.createChainedFunction = createChainedFunction;

  function shallowEqual(objA, objB, compare, compareContext) {

    var ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
      return !!ret;
    }

    if (objA === objB) {
      return true;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
      return false;
    }

    var keysA = fetchKeys(objA);
    var keysB = fetchKeys(objB);

    var len = keysA.length;
    if (len !== keysB.length) {
      return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (var i = 0; i < len; i++) {
      var key = keysA[i];
      if (!bHasOwnProperty(key)) {
        return false;
      }
      var valueA = objA[key];
      var valueB = objB[key];

      var _ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
      if (_ret === false || _ret === void 0 && valueA !== valueB) {
        return false;
      }
    }

    return true;
  };
  util.shallowEqual = shallowEqual;

  var PureRenderMixin = {
    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
  };

  util.PureRenderMixin = PureRenderMixin;

  var seed = 0;

  function guid() {
    return Date.now() + '_' + seed++;
  };

  util.guid = guid;
  util.uid = guid;
  util.getUuid = guid;

  util.warning = function (condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.length < 10 || /^[s\W]*$/.test(format)) {
      throw new Error('The warning format should be able to uniquely identify this ' + 'warning. Please, use a more descriptive format than: ' + format);
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    }
  };

  var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

  function getClientPosition(elem) {
    var box, x, y;
    var doc = elem.ownerDocument;
    var body = doc.body;
    var docElem = doc && doc.documentElement;
    // 根据 GBS 最新数据，A-Grade Browsers 都已支持 getBoundingClientRect 方法，不用再考虑传统的实现方式
    box = elem.getBoundingClientRect();

    // 注：jQuery 还考虑减去 docElem.clientLeft/clientTop
    // 但测试发现，这样反而会导致当 html 和 body 有边距/边框样式时，获取的值不正确
    // 此外，ie6 会忽略 html 的 margin 值，幸运地是没有谁会去设置 html 的 margin

    x = box.left;
    y = box.top;

    // In IE, most of the time, 2 extra pixels are added to the top and left
    // due to the implicit 2-pixel inset border.  In IE6/7 quirks mode and
    // IE6 standards mode, this border can be overridden by setting the
    // document element's border to zero -- thus, we cannot rely on the
    // offset always being 2 pixels.

    // In quirks mode, the offset can be determined by querying the body's
    // clientLeft/clientTop, but in standards mode, it is found by querying
    // the document element's clientLeft/clientTop.  Since we already called
    // getClientBoundingRect we have already forced a reflow, so it is not
    // too expensive just to query them all.

    // ie 下应该减去窗口的边框吧，毕竟默认 absolute 都是相对窗口定位的
    // 窗口边框标准是设 documentElement ,quirks 时设置 body
    // 最好禁止在 body 和 html 上边框 ，但 ie < 9 html 默认有 2px ，减去
    // 但是非 ie 不可能设置窗口边框，body html 也不是窗口 ,ie 可以通过 html,body 设置
    // 标准 ie 下 docElem.clientTop 就是 border-top
    // ie7 html 即窗口边框改变不了。永远为 2
    // 但标准 firefox/chrome/ie9 下 docElem.clientTop 是窗口边框，即使设了 border-top 也为 0

    x -= docElem.clientLeft || body.clientLeft || 0;
    y -= docElem.clientTop || body.clientTop || 0;

    return {
      left: x,
      top: y
    };
  }

  function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      //ie6,7,8 standard mode
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        //quirks mode
        ret = d.body[method];
      }
    }
    return ret;
  }

  function getScrollLeft(w) {
    return getScroll(w);
  }

  function getScrollTop(w) {
    return getScroll(w, true);
  }

  function getOffset(el) {
    var pos = getClientPosition(el);
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScrollLeft(w);
    pos.top += getScrollTop(w);
    return pos;
  }

  function _getComputedStyle(elem, name, computedStyle) {
    var val = '';
    var d = elem.ownerDocument;

    // https://github.com/kissyteam/kissy/issues/61
    if (computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null)) {
      val = computedStyle.getPropertyValue(name) || computedStyle[name];
    }

    return val;
  }

  var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
  var RE_POS = /^(top|right|bottom|left)$/,
      CURRENT_STYLE = 'currentStyle',
      RUNTIME_STYLE = 'runtimeStyle',
      LEFT = 'left',
      PX = 'px';

  function _getComputedStyleIE(elem, name) {
    // currentStyle maybe null
    // http://msdn.microsoft.com/en-us/library/ms535231.aspx
    var ret = elem[CURRENT_STYLE] && elem[CURRENT_STYLE][name];

    // 当 width/height 设置为百分比时，通过 pixelLeft 方式转换的 width/height 值
    // 一开始就处理了! CUSTOM_STYLE.height,CUSTOM_STYLE.width ,cssHook 解决@2011-08-19
    // 在 ie 下不对，需要直接用 offset 方式
    // borderWidth 等值也有问题，但考虑到 borderWidth 设为百分比的概率很小，这里就不考虑了

    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels
    // exclude left right for relativity
    if (_RE_NUM_NO_PX.test(ret) && !RE_POS.test(name)) {
      // Remember the original values
      var style = elem.style,
          left = style[LEFT],
          rsLeft = elem[RUNTIME_STYLE][LEFT];

      // prevent flashing of content
      elem[RUNTIME_STYLE][LEFT] = elem[CURRENT_STYLE][LEFT];

      // Put in the new values to get a computed value out
      style[LEFT] = name === 'fontSize' ? '1em' : ret || 0;
      ret = style.pixelLeft + PX;

      // Revert the changed values
      style[LEFT] = left;

      elem[RUNTIME_STYLE][LEFT] = rsLeft;
    }
    return ret === '' ? 'auto' : ret;
  }

  var getComputedStyleX;
  if (typeof window !== 'undefined') {
    getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
  }

  // 设置 elem 相对 elem.ownerDocument 的坐标
  function setOffset(elem, offset) {
    // set position first, in-case top/left are set even on static elem
    if (css(elem, 'position') === 'static') {
      elem.style.position = 'relative';
    }

    var old = getOffset(elem),
        ret = {},
        current,
        key;

    for (key in offset) {
      current = parseFloat(css(elem, key)) || 0;
      ret[key] = current + offset[key] - old[key];
    }
    css(elem, ret);
  }

  function each(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
      fn(arr[i]);
    }
  }

  function isBorderBoxFn(elem) {
    return getComputedStyleX(elem, 'boxSizing') === 'border-box';
  }

  var BOX_MODELS = ['margin', 'border', 'padding'],
      CONTENT_INDEX = -1,
      PADDING_INDEX = 2,
      BORDER_INDEX = 1,
      MARGIN_INDEX = 0;

  function swap(elem, options, callback) {
    var old = {},
        style = elem.style,
        name;

    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = style[name];
      style[name] = options[name];
    }

    callback.call(elem);

    // Revert the old values
    for (name in options) {
      style[name] = old[name];
    }
  }

  function getPBMWidth(elem, props, which) {
    var value = 0,
        prop,
        j,
        i;
    for (j = 0; j < props.length; j++) {
      prop = props[j];
      if (prop) {
        for (i = 0; i < which.length; i++) {
          var cssProp;
          if (prop === 'border') {
            cssProp = prop + which[i] + 'Width';
          } else {
            cssProp = prop + which[i];
          }
          value += parseFloat(getComputedStyleX(elem, cssProp)) || 0;
        }
      }
    }
    return value;
  }

  /**
   * A crude way of determining if an object is a window
   * @member util
   */
  function isWindow(obj) {
    // must use == for ie8
    /*jshint eqeqeq:false*/
    return obj != null && obj == obj.window;
  }

  var domUtils = {};

  each(['Width', 'Height'], function (name) {
    domUtils['doc' + name] = function (refWin) {
      var d = refWin.document;
      return Math.max(
      //firefox chrome documentElement.scrollHeight< body.scrollHeight
      //ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d.documentElement['scroll' + name],
      //quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d.body['scroll' + name], domUtils['viewport' + name](d));
    };

    domUtils['viewport' + name] = function (win) {
      // pc browser includes scrollbar in window.innerWidth
      var prop = 'client' + name,
          doc = win.document,
          body = doc.body,
          documentElement = doc.documentElement,
          documentElementProp = documentElement[prop];
      // 标准模式取 documentElement
      // backcompat 取 body
      return doc.compatMode === 'CSS1Compat' && documentElementProp || body && body[prop] || documentElementProp;
    };
  });

  /*
   得到元素的大小信息
   @param elem
   @param name
   @param {String} [extra]  'padding' : (css width) + padding
   'border' : (css width) + padding + border
   'margin' : (css width) + padding + border + margin
   */
  function getWH(elem, name, extra) {
    if (isWindow(elem)) {
      return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
    } else if (elem.nodeType === 9) {
      return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
    }
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'],
        borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    var computedStyle = getComputedStyleX(elem);
    var isBorderBox = isBorderBoxFn(elem, computedStyle);
    var cssBoxValue = 0;
    if (borderBoxValue == null || borderBoxValue <= 0) {
      borderBoxValue = undefined;
      // Fall back to computed then un computed css if necessary
      cssBoxValue = getComputedStyleX(elem, name);
      if (cssBoxValue == null || Number(cssBoxValue) < 0) {
        cssBoxValue = elem.style[name] || 0;
      }
      // Normalize '', auto, and prepare for extra
      cssBoxValue = parseFloat(cssBoxValue) || 0;
    }
    if (extra === undefined) {
      extra = isBorderBox ? BORDER_INDEX : CONTENT_INDEX;
    }
    var borderBoxValueOrIsBorderBox = borderBoxValue !== undefined || isBorderBox;
    var val = borderBoxValue || cssBoxValue;
    if (extra === CONTENT_INDEX) {
      if (borderBoxValueOrIsBorderBox) {
        return val - getPBMWidth(elem, ['border', 'padding'], which, computedStyle);
      } else {
        return cssBoxValue;
      }
    } else if (borderBoxValueOrIsBorderBox) {
      return val + (extra === BORDER_INDEX ? 0 : extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
    } else {
      return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
    }
  }

  var cssShow = {
    position: 'absolute',
    visibility: 'hidden',
    display: 'block'
  };

  // fix #119 : https://github.com/kissyteam/kissy/issues/119
  function getWHIgnoreDisplay(elem) {
    var val,
        args = arguments;
    // in case elem is window
    // elem.offsetWidth === undefined
    if (elem.offsetWidth !== 0) {
      val = getWH.apply(undefined, args);
    } else {
      swap(elem, cssShow, function () {
        val = getWH.apply(undefined, args);
      });
    }
    return val;
  }

  each(['width', 'height'], function (name) {
    var first = name.charAt(0).toUpperCase() + name.slice(1);
    domUtils['outer' + first] = function (el, includeMargin) {
      return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
    };
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

    domUtils[name] = function (elem, val) {
      if (val !== undefined) {
        if (elem) {
          var computedStyle = getComputedStyleX(elem);
          var isBorderBox = isBorderBoxFn(elem);
          if (isBorderBox) {
            val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
          }
          return css(elem, name, val);
        }
        return;
      }
      return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
    };
  });

  function css(el, name, value) {
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      for (var i in name) {
        css(el, i, name[i]);
      }
      return;
    }
    if (typeof value !== 'undefined') {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      el.style[name] = value;
    } else {
      return getComputedStyleX(el, name);
    }
  }

  function mix(to, from) {
    for (var i in from) {
      to[i] = from[i];
    }
    return to;
  }

  var utils = {
    getWindow: function getWindow(node) {
      var doc = node.ownerDocument || node;
      return doc.defaultView || doc.parentWindow || node;
    },
    offset: function offset(el, value) {
      if (typeof value !== 'undefined') {
        setOffset(el, value);
      } else {
        return getOffset(el);
      }
    },
    isWindow: isWindow,
    each: each,
    css: css,
    clone: function clone(obj) {
      var ret = {};
      for (var i in obj) {
        ret[i] = obj[i];
      }
      var overflow = obj.overflow;
      if (overflow) {
        for (i in obj) {
          ret.overflow[i] = obj.overflow[i];
        }
      }
      return ret;
    },
    mix: mix,
    getWindowScrollLeft: function getWindowScrollLeft(w) {
      return getScrollLeft(w);
    },
    getWindowScrollTop: function getWindowScrollTop(w) {
      return getScrollTop(w);
    },

    scrollLeft: function scrollLeft(w, v) {
      if (isWindow(w)) {
        if (v === undefined) {
          return getScrollLeft(w);
        } else {
          window.scrollTo(v, getScrollTop(w));
        }
      } else {
        if (v === undefined) {
          return w.scrollLeft;
        } else {
          w.scrollLeft = v;
        }
      }
    },
    scrollTop: function scrollTop(w, v) {
      if (isWindow(w)) {
        if (v === undefined) {
          return getScrollTop(w);
        } else {
          window.scrollTo(getScrollLeft(w), v);
        }
      } else {
        if (v === undefined) {
          return w.scrollTop;
        } else {
          w.scrollTop = v;
        }
      }
    },
    merge: function merge() {
      var ret = {};
      for (var i = 0; i < arguments.length; i++) {
        utils.mix(ret, arguments[i]);
      }
      return ret;
    },
    viewportWidth: 0,
    viewportHeight: 0
  };
  mix(utils, domUtils);
  mix(util, utils);

  util.scrollIntoView = function (elem, container, config) {
    config = config || {};
    // document 归一化到 window
    if (container.nodeType === 9) {
      container = util.getWindow(container);
    }

    var allowHorizontalScroll = config.allowHorizontalScroll;
    var onlyScrollIfNeeded = config.onlyScrollIfNeeded;
    var alignWithTop = config.alignWithTop;
    var alignWithLeft = config.alignWithLeft;

    allowHorizontalScroll = allowHorizontalScroll === undefined ? true : allowHorizontalScroll;

    var isWin = util.isWindow(container);
    var elemOffset = util.offset(elem);
    var eh = util.outerHeight(elem);
    var ew = util.outerWidth(elem);
    var containerOffset, ch, cw, containerScroll, diffTop, diffBottom, win, winScroll, ww, wh;

    if (isWin) {
      win = container;
      wh = util.height(win);
      ww = util.width(win);
      winScroll = {
        left: util.scrollLeft(win),
        top: util.scrollTop(win)
      };
      // elem 相对 container 可视视窗的距离
      diffTop = {
        left: elemOffset.left - winScroll.left,
        top: elemOffset.top - winScroll.top
      };
      diffBottom = {
        left: elemOffset.left + ew - (winScroll.left + ww),
        top: elemOffset.top + eh - (winScroll.top + wh)
      };
      containerScroll = winScroll;
    } else {
      containerOffset = util.offset(container);
      ch = container.clientHeight;
      cw = container.clientWidth;
      containerScroll = {
        left: container.scrollLeft,
        top: container.scrollTop
      };
      // elem 相对 container 可视视窗的距离
      // 注意边框, offset 是边框到根节点
      diffTop = {
        left: elemOffset.left - (containerOffset.left + (parseFloat(util.css(container, 'borderLeftWidth')) || 0)),
        top: elemOffset.top - (containerOffset.top + (parseFloat(util.css(container, 'borderTopWidth')) || 0))
      };
      diffBottom = {
        left: elemOffset.left + ew - (containerOffset.left + cw + (parseFloat(util.css(container, 'borderRightWidth')) || 0)),
        top: elemOffset.top + eh - (containerOffset.top + ch + (parseFloat(util.css(container, 'borderBottomWidth')) || 0))
      };
    }

    if (diffTop.top < 0 || diffBottom.top > 0) {
      // 强制向上
      if (alignWithTop === true) {
        util.scrollTop(container, containerScroll.top + diffTop.top);
      } else if (alignWithTop === false) {
        util.scrollTop(container, containerScroll.top + diffBottom.top);
      } else {
        // 自动调整
        if (diffTop.top < 0) {
          util.scrollTop(container, containerScroll.top + diffTop.top);
        } else {
          util.scrollTop(container, containerScroll.top + diffBottom.top);
        }
      }
    } else {
      if (!onlyScrollIfNeeded) {
        alignWithTop = alignWithTop === undefined ? true : !!alignWithTop;
        if (alignWithTop) {
          util.scrollTop(container, containerScroll.top + diffTop.top);
        } else {
          util.scrollTop(container, containerScroll.top + diffBottom.top);
        }
      }
    }

    if (allowHorizontalScroll) {
      if (diffTop.left < 0 || diffBottom.left > 0) {
        // 强制向上
        if (alignWithLeft === true) {
          util.scrollLeft(container, containerScroll.left + diffTop.left);
        } else if (alignWithLeft === false) {
          util.scrollLeft(container, containerScroll.left + diffBottom.left);
        } else {
          // 自动调整
          if (diffTop.left < 0) {
            util.scrollLeft(container, containerScroll.left + diffTop.left);
          } else {
            util.scrollLeft(container, containerScroll.left + diffBottom.left);
          }
        }
      } else {
        if (!onlyScrollIfNeeded) {
          alignWithLeft = alignWithLeft === undefined ? true : !!alignWithLeft;
          if (alignWithLeft) {
            util.scrollLeft(container, containerScroll.left + diffTop.left);
          } else {
            util.scrollLeft(container, containerScroll.left + diffBottom.left);
          }
        }
      }
    }
  };

  util.Dom = {
    addEventListener: function addEventListener(target, eventType, cb) {
      /* eslint camelcase: 2 */
      var callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
        ReactDOM.unstable_batchedUpdates(cb, e);
      } : cb;
      return $(target).on(eventType, callback);
    },
    contains: function contains(root, n) {
      var node = n;
      while (node) {
        if (node === root) {
          return true;
        }
        node = node.parentNode;
      }

      return false;
    }
  };

  util.Children = {
    toArray: function toArray(children) {
      var ret = [];
      React.Children.forEach(children, function each(c) {
        ret.push(c);
      });
      return ret;
    },
    mapSelf: function mapSelf(children) {
      // return ReactFragment
      return React.Children.map(children, mirror);
    }
  };

  ////dom-align

  function getOffsetParent(element) {
    // ie 这个也不是完全可行
    /*
     <div style="width: 50px;height: 100px;overflow: hidden">
     <div style="width: 50px;height: 100px;position: relative;" id="d6">
     元素 6 高 100px 宽 50px<br/>
     </div>
     </div>
     */
    // element.offsetParent does the right thing in ie7 and below. Return parent with layout!
    //  In other browsers it only includes elements with position absolute, relative or
    // fixed, not elements with overflow set to auto or scroll.
    //        if (UA.ie && ieMode < 8) {
    //            return element.offsetParent;
    //        }
    // 统一的 offsetParent 方法
    var doc = element.ownerDocument;
    var body = doc.body;
    var parent = undefined;
    var positionStyle = utils.css(element, 'position');
    var skipStatic = positionStyle === 'fixed' || positionStyle === 'absolute';

    if (!skipStatic) {
      return element.nodeName.toLowerCase() === 'html' ? null : element.parentNode;
    }

    for (parent = element.parentNode; parent && parent !== body; parent = parent.parentNode) {
      positionStyle = utils.css(parent, 'position');
      if (positionStyle !== 'static') {
        return parent;
      }
    }
    return null;
  }

  /**
   * 获得元素的显示部分的区域
   */
  function getVisibleRectForElement(element) {
    var visibleRect = {
      left: 0,
      right: Infinity,
      top: 0,
      bottom: Infinity
    };
    var el = getOffsetParent(element);
    var scrollX = undefined;
    var scrollY = undefined;
    var winSize = undefined;
    var doc = element.ownerDocument;
    var win = doc.defaultView || doc.parentWindow;
    var body = doc.body;
    var documentElement = doc.documentElement;

    // Determine the size of the visible rect by climbing the dom accounting for
    // all scrollable containers.
    while (el) {
      // clientWidth is zero for inline block elements in ie.
      if ((navigator.userAgent.indexOf('MSIE') === -1 || el.clientWidth !== 0) &&
      // body may have overflow set on it, yet we still get the entire
      // viewport. In some browsers, el.offsetParent may be
      // document.documentElement, so check for that too.
      el !== body && el !== documentElement && utils.css(el, 'overflow') !== 'visible') {
        var pos = utils.offset(el);
        // add border
        pos.left += el.clientLeft;
        pos.top += el.clientTop;
        visibleRect.top = Math.max(visibleRect.top, pos.top);
        visibleRect.right = Math.min(visibleRect.right,
        // consider area without scrollBar
        pos.left + el.clientWidth);
        visibleRect.bottom = Math.min(visibleRect.bottom, pos.top + el.clientHeight);
        visibleRect.left = Math.max(visibleRect.left, pos.left);
      } else if (el === body || el === documentElement) {
        break;
      }
      el = getOffsetParent(el);
    }

    // Clip by window's viewport.
    scrollX = utils.getWindowScrollLeft(win);
    scrollY = utils.getWindowScrollTop(win);
    visibleRect.left = Math.max(visibleRect.left, scrollX);
    visibleRect.top = Math.max(visibleRect.top, scrollY);
    winSize = {
      width: utils.viewportWidth(win),
      height: utils.viewportHeight(win)
    };
    visibleRect.right = Math.min(visibleRect.right, scrollX + winSize.width);
    visibleRect.bottom = Math.min(visibleRect.bottom, scrollY + winSize.height);
    return visibleRect.top >= 0 && visibleRect.left >= 0 && visibleRect.bottom > visibleRect.top && visibleRect.right > visibleRect.left ? visibleRect : null;
  }

  function adjustForViewport(elFuturePos, elRegion, visibleRect, overflow) {
    var pos = utils.clone(elFuturePos);
    var size = {
      width: elRegion.width,
      height: elRegion.height
    };

    if (overflow.adjustX && pos.left < visibleRect.left) {
      pos.left = visibleRect.left;
    }

    // Left edge inside and right edge outside viewport, try to resize it.
    if (overflow.resizeWidth && pos.left >= visibleRect.left && pos.left + size.width > visibleRect.right) {
      size.width -= pos.left + size.width - visibleRect.right;
    }

    // Right edge outside viewport, try to move it.
    if (overflow.adjustX && pos.left + size.width > visibleRect.right) {
      // 保证左边界和可视区域左边界对齐
      pos.left = Math.max(visibleRect.right - size.width, visibleRect.left);
    }

    // Top edge outside viewport, try to move it.
    if (overflow.adjustY && pos.top < visibleRect.top) {
      pos.top = visibleRect.top;
    }

    // Top edge inside and bottom edge outside viewport, try to resize it.
    if (overflow.resizeHeight && pos.top >= visibleRect.top && pos.top + size.height > visibleRect.bottom) {
      size.height -= pos.top + size.height - visibleRect.bottom;
    }

    // Bottom edge outside viewport, try to move it.
    if (overflow.adjustY && pos.top + size.height > visibleRect.bottom) {
      // 保证上边界和可视区域上边界对齐
      pos.top = Math.max(visibleRect.bottom - size.height, visibleRect.top);
    }

    return utils.mix(pos, size);
  }

  function getRegion(node) {
    var offset = undefined;
    var w = undefined;
    var h = undefined;
    if (!utils.isWindow(node) && node.nodeType !== 9) {
      offset = utils.offset(node);
      w = utils.outerWidth(node);
      h = utils.outerHeight(node);
    } else {
      var win = utils.getWindow(node);
      offset = {
        left: utils.getWindowScrollLeft(win),
        top: utils.getWindowScrollTop(win)
      };
      w = utils.viewportWidth(win);
      h = utils.viewportHeight(win);
    }
    offset.width = w;
    offset.height = h;
    return offset;
  }

  /**
   * 获取 node 上的 align 对齐点 相对于页面的坐标
   */

  function getAlignOffset(region, align) {
    var V = align.charAt(0);
    var H = align.charAt(1);
    var w = region.width;
    var h = region.height;
    var x = undefined;
    var y = undefined;

    x = region.left;
    y = region.top;

    if (V === 'c') {
      y += h / 2;
    } else if (V === 'b') {
      y += h;
    }

    if (H === 'c') {
      x += w / 2;
    } else if (H === 'r') {
      x += w;
    }

    return {
      left: x,
      top: y
    };
  }

  function getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset) {
    var xy = undefined;
    var diff = undefined;
    var p1 = undefined;
    var p2 = undefined;

    xy = {
      left: elRegion.left,
      top: elRegion.top
    };

    p1 = getAlignOffset(refNodeRegion, points[1]);
    p2 = getAlignOffset(elRegion, points[0]);

    diff = [p2.left - p1.left, p2.top - p1.top];

    return {
      left: xy.left - diff[0] + offset[0] - targetOffset[0],
      top: xy.top - diff[1] + offset[1] - targetOffset[1]
    };
  }

  // http://yiminghe.iteye.com/blog/1124720

  function isFailX(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.left < visibleRect.left || elFuturePos.left + elRegion.width > visibleRect.right;
  }

  function isFailY(elFuturePos, elRegion, visibleRect) {
    return elFuturePos.top < visibleRect.top || elFuturePos.top + elRegion.height > visibleRect.bottom;
  }

  function flip(points, reg, map) {
    var ret = [];
    utils.each(points, function (p) {
      ret.push(p.replace(reg, function (m) {
        return map[m];
      }));
    });
    return ret;
  }

  function flipOffset(offset, index) {
    offset[index] = -offset[index];
    return offset;
  }

  function convertOffset(str, offsetLen) {
    var n = undefined;
    if (/%$/.test(str)) {
      n = parseInt(str.substring(0, str.length - 1), 10) / 100 * offsetLen;
    } else {
      n = parseInt(str, 10);
    }
    return n || 0;
  }

  function normalizeOffset(offset, el) {
    offset[0] = convertOffset(offset[0], el.width);
    offset[1] = convertOffset(offset[1], el.height);
  }

  function domAlign(el, refNode, align) {
    var points = align.points;
    var offset = align.offset || [0, 0];
    var targetOffset = align.targetOffset || [0, 0];
    var overflow = align.overflow;
    var target = align.target || refNode;
    var source = align.source || el;
    offset = [].concat(offset);
    targetOffset = [].concat(targetOffset);
    overflow = overflow || {};
    var newOverflowCfg = {};

    var fail = 0;
    // 当前节点可以被放置的显示区域
    var visibleRect = getVisibleRectForElement(source);
    // 当前节点所占的区域, left/top/width/height
    var elRegion = getRegion(source);
    // 参照节点所占的区域, left/top/width/height
    var refNodeRegion = getRegion(target);
    // 将 offset 转换成数值，支持百分比
    normalizeOffset(offset, elRegion);
    normalizeOffset(targetOffset, refNodeRegion);
    // 当前节点将要被放置的位置
    var elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset);
    // 当前节点将要所处的区域
    var newElRegion = utils.merge(elRegion, elFuturePos);

    // 如果可视区域不能完全放置当前节点时允许调整
    if (visibleRect && (overflow.adjustX || overflow.adjustY)) {
      if (overflow.adjustX) {
        // 如果横向不能放下
        if (isFailX(elFuturePos, elRegion, visibleRect)) {
          fail = 1;
          // 对齐位置反下
          points = flip(points, /[lr]/ig, {
            l: 'r',
            r: 'l'
          });
          // 偏移量也反下
          offset = flipOffset(offset, 0);
          targetOffset = flipOffset(targetOffset, 0);
        }
      }

      if (overflow.adjustY) {
        // 如果纵向不能放下
        if (isFailY(elFuturePos, elRegion, visibleRect)) {
          fail = 1;
          // 对齐位置反下
          points = flip(points, /[tb]/ig, {
            t: 'b',
            b: 't'
          });
          // 偏移量也反下
          offset = flipOffset(offset, 1);
          targetOffset = flipOffset(targetOffset, 1);
        }
      }

      // 如果失败，重新计算当前节点将要被放置的位置
      if (fail) {
        elFuturePos = getElFuturePos(elRegion, refNodeRegion, points, offset, targetOffset);
        utils.mix(newElRegion, elFuturePos);
      }

      // 检查反下后的位置是否可以放下了
      // 如果仍然放不下只有指定了可以调整当前方向才调整
      newOverflowCfg.adjustX = overflow.adjustX && isFailX(elFuturePos, elRegion, visibleRect);

      newOverflowCfg.adjustY = overflow.adjustY && isFailY(elFuturePos, elRegion, visibleRect);

      // 确实要调整，甚至可能会调整高度宽度
      if (newOverflowCfg.adjustX || newOverflowCfg.adjustY) {
        newElRegion = adjustForViewport(elFuturePos, elRegion, visibleRect, newOverflowCfg);
      }
    }

    // need judge to in case set fixed with in css on height auto element
    if (newElRegion.width !== elRegion.width) {
      utils.css(source, 'width', source.width() + newElRegion.width - elRegion.width);
    }

    if (newElRegion.height !== elRegion.height) {
      utils.css(source, 'height', source.height() + newElRegion.height - elRegion.height);
    }

    // https://github.com/kissyteam/kissy/issues/190
    // http://localhost:8888/kissy/src/overlay/demo/other/relative_align/align.html
    // 相对于屏幕位置没变，而 left/top 变了
    // 例如 <div 'relative'><el absolute></div>
    utils.offset(source, {
      left: newElRegion.left,
      top: newElRegion.top
    }, {
      useCssRight: align.useCssRight,
      useCssBottom: align.useCssBottom
    });

    return {
      points: points,
      offset: offset,
      targetOffset: targetOffset,
      overflow: newOverflowCfg
    };
  }

  domAlign.__getOffsetParent = getOffsetParent;

  domAlign.__getVisibleRectForElement = getVisibleRectForElement;

  util.Dom.align = domAlign;

  ////////////////////////////////

  var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
  };

  var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    arguments: true,
    arity: true
  };

  function hoistNonReactStatics(targetComponent, sourceComponent) {
    var keys = Object.getOwnPropertyNames(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
        targetComponent[keys[i]] = sourceComponent[keys[i]];
      }
    }

    return targetComponent;
  };

  util.hoistStatics = hoistNonReactStatics;

  var hasOwn = ({}).hasOwnProperty;

  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;

      var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        classes.push(classNames.apply(null, arg));
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }

    return classes.join(' ');
  }
  util.classnames = util.classNames = classNames;
  window.classnames = window.classNames = classNames;
})(Smart.RC);
'use strict';

// export this package's api
+(function (RC) {
	var noop = _.noop,
	    rcUtil = RC.Util,
	    Dom = rcUtil.Dom,
	    align = Dom.align,
	    PropTypes = React.PropTypes,
	    isWindow = rcUtil.isWindow;

	function buffer(fn, ms) {
		var timer = undefined;
		return function bufferFn() {
			if (timer) {
				clearTimeout(timer);
			}
			timer = setTimeout(fn, ms);
		};
	}

	var Align = React.createClass({
		displayName: 'Align',

		propTypes: {
			childrenProps: PropTypes.object,
			align: PropTypes.object.isRequired,
			target: PropTypes.func,
			onAlign: PropTypes.func,
			monitorBufferTime: PropTypes.number,
			monitorWindowResize: PropTypes.bool,
			disabled: PropTypes.bool,
			children: PropTypes.any
		},

		getDefaultProps: function getDefaultProps() {
			return {
				target: function target() {
					return window;
				},
				onAlign: function onAlign() {},

				monitorBufferTime: 50,
				monitorWindowResize: false,
				disabled: false
			};
		},
		componentDidMount: function componentDidMount() {
			var props = this.props;
			// if parent ref not attached .... use document.getElementById
			if (!props.disabled) {
				var source = ReactDOM.findDOMNode(this);
				props.onAlign(source, align(source, props.target(), props.align));
				if (props.monitorWindowResize) {
					this.startMonitorWindowResize();
				}
			}
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var reAlign = false;
			var props = this.props;
			var currentTarget = undefined;

			if (!props.disabled) {
				if (prevProps.disabled || prevProps.align !== props.align) {
					reAlign = true;
					currentTarget = props.target();
				} else {
					var lastTarget = prevProps.target();
					currentTarget = props.target();
					if (isWindow(lastTarget) && isWindow(currentTarget)) {
						reAlign = false;
					} else if (lastTarget !== currentTarget) {
						reAlign = true;
					}
				}
			}

			if (reAlign) {
				var source = ReactDOM.findDOMNode(this);
				props.onAlign(source, align(source, currentTarget, props.align));
			}

			if (props.monitorWindowResize && !props.disabled) {
				this.startMonitorWindowResize();
			} else {
				this.stopMonitorWindowResize();
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			this.stopMonitorWindowResize();
		},
		onWindowResize: function onWindowResize() {
			var props = this.props;
			if (!props.disabled) {
				var source = ReactDOM.findDOMNode(this);
				props.onAlign(source, align(source, props.target(), props.align));
			}
		},
		startMonitorWindowResize: function startMonitorWindowResize() {
			if (!this.resizeHandler) {
				this.resizeHandler = Dom.addEventListener(window, 'resize', buffer(this.onWindowResize, this.props.monitorBufferTime));
			}
		},
		stopMonitorWindowResize: function stopMonitorWindowResize() {
			if (this.resizeHandler) {
				this.resizeHandler.remove();
				this.resizeHandler = null;
			}
		},
		render: function render() {
			var _props = this.props;
			var childrenProps = _props.childrenProps;
			var children = _props.children;

			var child = React.Children.only(children);
			if (childrenProps) {
				var newProps = {};
				for (var prop in childrenProps) {
					if (childrenProps.hasOwnProperty(prop)) {
						newProps[prop] = this.props[childrenProps[prop]];
					}
				}
				return React.cloneElement(child, newProps);
			}
			return child;
		}
	});
	RC.Align = Align;
})(Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;

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
	RC.cssAnimation = cssAnimation;

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

	RC.Animate = Animate;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (RC) {
  var PropTypes = React.PropTypes;
  var findDOMNode = ReactDOM.findDOMNode;
  var _ref = _;
  var noop = _ref.noop;
  var assign = _ref.assign;
  var Util = RC.Util;
  var Align = RC.Align;
  var Animate = RC.Animate;
  var Dom = Util.Dom;
  var createChainedFunction = Util.createChainedFunction;

  function isPointsEq(a1, a2) {
    return a1[0] === a2[0] && a1[1] === a2[1];
  }

  function getAlignFromPlacement(builtinPlacements, placementStr, align) {
    var baseAlign = builtinPlacements[placementStr] || {};
    return _extends({}, baseAlign, align);
  }

  function _getPopupClassNameFromAlign(builtinPlacements, prefixCls, align) {
    var points = align.points;
    for (var placement in builtinPlacements) {
      if (builtinPlacements.hasOwnProperty(placement)) {
        if (isPointsEq(builtinPlacements[placement].points, points)) {
          return prefixCls + '-placement-' + placement;
        }
      }
    }
    return '';
  }

  var PopupInner = React.createClass({
    displayName: 'PopupInner',

    propTypes: {
      hiddenClassName: PropTypes.string,
      className: PropTypes.string,
      onMouseEnter: PropTypes.func,
      onMouseLeave: PropTypes.func,
      children: PropTypes.any
    },
    render: function render() {
      var props = this.props;
      var className = props.className;
      if (!props.visible) {
        className += ' ' + props.hiddenClassName;
      }
      return React.createElement(
        'div',
        { className: className,
          onMouseEnter: props.onMouseEnter,
          onMouseLeave: props.onMouseLeave,
          style: props.style },
        props.children
      );
    }
  });

  var Popup = React.createClass({
    displayName: 'Popup',

    propTypes: {
      visible: PropTypes.bool,
      wrap: PropTypes.object,
      style: PropTypes.object,
      getClassNameFromAlign: PropTypes.func,
      onMouseEnter: PropTypes.func,
      className: PropTypes.string,
      onMouseLeave: PropTypes.func
    },

    componentDidMount: function componentDidMount() {
      this.rootNode = this.getPopupDomNode();
    },
    onAlign: function onAlign(popupDomNode, align) {
      var props = this.props;
      var alignClassName = props.getClassNameFromAlign(props.align);
      var currentAlignClassName = props.getClassNameFromAlign(align);
      if (alignClassName !== currentAlignClassName) {
        this.currentAlignClassName = currentAlignClassName;
        popupDomNode.className = this.getClassName(currentAlignClassName);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      return ReactDOM.findDOMNode(this);
    },
    getTarget: function getTarget() {
      return ReactDOM.findDOMNode(this.props.wrap);
    },
    getTransitionName: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      if (!transitionName && props.animation) {
        transitionName = props.prefixCls + '-' + props.animation;
      }
      return transitionName;
    },
    getClassName: function getClassName(currentAlignClassName) {
      var props = this.props;
      var prefixCls = props.prefixCls;

      var className = prefixCls + ' ' + props.className + ' ';
      className += currentAlignClassName;
      return className;
    },
    render: function render() {
      var props = this.props;
      var align = props.align;
      var style = props.style;
      var visible = props.visible;
      var prefixCls = props.prefixCls;
      var destroyPopupOnHide = props.destroyPopupOnHide;

      var className = this.getClassName(this.currentAlignClassName || props.getClassNameFromAlign(align));
      var hiddenClassName = prefixCls + '-hidden';
      if (!visible) {
        this.currentAlignClassName = null;
      }
      if (destroyPopupOnHide) {
        return React.createElement(
          Animate,
          { component: '',
            exclusive: true,
            transitionAppear: true,
            transitionName: this.getTransitionName() },
          visible ? React.createElement(
            Align,
            { target: this.getTarget,
              key: 'popup',
              monitorWindowResize: true,
              align: align,
              onAlign: this.onAlign },
            React.createElement(
              PopupInner,
              { className: className,
                visible: true,
                onMouseEnter: props.onMouseEnter,
                onMouseLeave: props.onMouseLeave,
                style: style },
              props.children
            )
          ) : null
        );
      }
      return React.createElement(
        Animate,
        { component: '',
          exclusive: true,
          transitionAppear: true,
          transitionName: this.getTransitionName(),
          showProp: 'xVisible' },
        React.createElement(
          Align,
          { target: this.getTarget,
            key: 'popup',
            monitorWindowResize: true,
            xVisible: visible,
            childrenProps: {
              visible: 'xVisible'
            },
            disabled: !visible,
            align: align,
            onAlign: this.onAlign },
          React.createElement(
            PopupInner,
            { className: className,
              hiddenClassName: hiddenClassName,
              onMouseEnter: props.onMouseEnter,
              onMouseLeave: props.onMouseLeave,
              style: style },
            props.children
          )
        )
      );
    }
  });

  function returnEmptyString() {
    return '';
  }

  var ALL_HANDLERS = ['onClick', 'onMouseDown', 'onTouchStart', 'onMouseEnter', 'onMouseLeave', 'onFocus', 'onBlur'];

  var Trigger = React.createClass({
    displayName: 'Trigger',

    propTypes: {
      action: PropTypes.any,
      getPopupClassNameFromAlign: PropTypes.any,
      onPopupVisibleChange: PropTypes.func,
      afterPopupVisibleChange: PropTypes.func,
      popup: PropTypes.node.isRequired,
      popupStyle: PropTypes.object,
      popupClassName: PropTypes.string,
      popupPlacement: PropTypes.string,
      builtinPlacements: PropTypes.object,
      popupTransitionName: PropTypes.string,
      popupAnimation: PropTypes.any,
      mouseEnterDelay: PropTypes.number,
      mouseLeaveDelay: PropTypes.number,
      getPopupContainer: PropTypes.func,
      destroyPopupOnHide: PropTypes.bool,
      popupAlign: PropTypes.object,
      popupVisible: PropTypes.bool
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-trigger-popup',
        getPopupClassNameFromAlign: returnEmptyString,
        onPopupVisibleChange: noop,
        afterPopupVisibleChange: noop,
        popupClassName: '',
        mouseEnterDelay: 0,
        mouseLeaveDelay: 0.1,
        popupStyle: {},
        destroyPopupOnHide: false,
        popupAlign: {},
        defaultPopupVisible: false,
        action: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var popupVisible = undefined;
      if ('popupVisible' in props) {
        popupVisible = !!props.popupVisible;
      } else {
        popupVisible = !!props.defaultPopupVisible;
      }
      return { popupVisible: popupVisible };
    },
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate({}, {
        popupVisible: this.state.popupVisible
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('popupVisible' in nextProps) {
        this.setState({
          popupVisible: !!nextProps.popupVisible
        });
      }
    },
    componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
      var _this = this;

      var props = this.props;
      var state = this.state;
      if (this.popupRendered) {
        var _ret = (function () {
          var self = _this;
          ReactDOM.unstable_renderSubtreeIntoContainer(_this, _this.getPopupElement(), _this.getPopupContainer(), function renderPopup() {
            if (this.isMounted()) {
              self.popupDomNode = findDOMNode(this);
            } else {
              self.popupDomNode = null;
            }
            if (prevState.popupVisible !== state.popupVisible) {
              props.afterPopupVisibleChange(state.popupVisible);
            }
          });
          if (props.action.indexOf('click') !== -1) {
            if (state.popupVisible) {
              if (!_this.clickOutsideHandler) {
                _this.clickOutsideHandler = Dom.addEventListener(document, 'mousedown', _this.onDocumentClick);
                _this.touchOutsideHandler = Dom.addEventListener(document, 'touchstart', _this.onDocumentClick);
              }
              return {
                v: undefined
              };
            }
          }
          if (_this.clickOutsideHandler) {
            _this.clickOutsideHandler.remove();
            _this.touchOutsideHandler.remove();
            _this.clickOutsideHandler = null;
            _this.touchOutsideHandler = null;
          }
        })();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      var popupContainer = this.popupContainer;
      if (popupContainer) {
        ReactDOM.unmountComponentAtNode(popupContainer);
        if (this.props.getPopupContainer) {
          var mountNode = this.props.getPopupContainer(findDOMNode(this));
          mountNode.removeChild(popupContainer);
        } else {
          document.body.removeChild(popupContainer);
        }
        this.popupContainer = null;
      }
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler.remove();
        this.touchOutsideHandler.remove();
        this.clickOutsideHandler = null;
        this.touchOutsideHandler = null;
      }
    },
    onMouseEnter: function onMouseEnter() {
      this.delaySetPopupVisible(true, this.props.mouseEnterDelay);
    },
    onMouseLeave: function onMouseLeave() {
      this.delaySetPopupVisible(false, this.props.mouseLeaveDelay);
    },
    onFocus: function onFocus() {
      this.focusTime = Date.now();
      this.setPopupVisible(true);
    },
    onMouseDown: function onMouseDown() {
      this.preClickTime = Date.now();
    },
    onTouchStart: function onTouchStart() {
      this.preTouchTime = Date.now();
    },
    onBlur: function onBlur() {
      this.setPopupVisible(false);
    },
    onClick: function onClick(event) {
      // focus will trigger click
      if (this.focusTime) {
        var preTime = undefined;
        if (this.preClickTime && this.preTouchTime) {
          preTime = Math.min(this.preClickTime, this.preTouchTime);
        } else if (this.preClickTime) {
          preTime = this.preClickTime;
        } else if (this.preTouchTime) {
          preTime = this.preTouchTime;
        }
        if (Math.abs(preTime - this.focusTime) < 20) {
          return;
        }
        this.focusTime = 0;
      }
      this.preClickTime = 0;
      this.preTouchTime = 0;
      event.preventDefault();
      this.setPopupVisible(!this.state.popupVisible);
    },
    onDocumentClick: function onDocumentClick(event) {
      var target = event.target;
      var root = findDOMNode(this);
      var popupNode = this.getPopupDomNode();
      if (!Dom.contains(root, target) && !Dom.contains(popupNode, target)) {
        this.setPopupVisible(false);
      }
    },
    getPopupDomNode: function getPopupDomNode() {
      // for test
      return this.popupDomNode;
    },
    getPopupContainer: function getPopupContainer() {
      if (!this.popupContainer) {
        this.popupContainer = document.createElement('div');
        if (this.props.getPopupContainer) {
          var mountNode = this.props.getPopupContainer(findDOMNode(this));
          mountNode.appendChild(this.popupContainer);
        } else {
          document.body.appendChild(this.popupContainer);
        }
      }
      return this.popupContainer;
    },
    getPopupClassNameFromAlign: function getPopupClassNameFromAlign(align) {
      var className = [];
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var builtinPlacements = props.builtinPlacements;
      var prefixCls = props.prefixCls;

      if (popupPlacement && builtinPlacements) {
        className.push(_getPopupClassNameFromAlign(builtinPlacements, prefixCls, align));
      }
      if (props.getPopupClassNameFromAlign) {
        className.push(props.getPopupClassNameFromAlign(align));
      }
      return className.join(' ');
    },
    getPopupAlign: function getPopupAlign() {
      var props = this.props;
      var popupPlacement = props.popupPlacement;
      var popupAlign = props.popupAlign;
      var builtinPlacements = props.builtinPlacements;

      if (popupPlacement && builtinPlacements) {
        return getAlignFromPlacement(builtinPlacements, popupPlacement, popupAlign);
      }
      return popupAlign;
    },
    getPopupElement: function getPopupElement() {
      var props = this.props;
      var state = this.state;
      var mouseProps = {};
      if (props.action.indexOf('hover') !== -1) {
        mouseProps.onMouseEnter = this.onMouseEnter;
        mouseProps.onMouseLeave = this.onMouseLeave;
      }
      return React.createElement(
        Popup,
        _extends({ prefixCls: props.prefixCls,
          destroyPopupOnHide: props.destroyPopupOnHide,
          visible: state.popupVisible,
          className: props.popupClassName,
          action: props.action,
          align: this.getPopupAlign(),
          animation: props.popupAnimation,
          getClassNameFromAlign: this.getPopupClassNameFromAlign
        }, mouseProps, {
          wrap: this,
          style: props.popupStyle,
          transitionName: props.popupTransitionName }),
        props.popup
      );
    },
    setPopupVisible: function setPopupVisible(popupVisible) {
      if (this.state.popupVisible !== popupVisible) {
        if (!('popupVisible' in this.props)) {
          this.setState({
            popupVisible: popupVisible
          });
        }
        this.props.onPopupVisibleChange(popupVisible);
      }
    },
    delaySetPopupVisible: function delaySetPopupVisible(visible, delayS) {
      var _this2 = this;

      var delay = delayS * 1000;
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
      if (delay) {
        this.delayTimer = setTimeout(function () {
          _this2.setPopupVisible(visible);
          _this2.delayTimer = null;
        }, delay);
      } else {
        this.setPopupVisible(visible);
      }
    },
    render: function render() {
      this.popupRendered = this.popupRendered || this.state.popupVisible;
      var props = this.props;
      var children = props.children;
      var child = React.Children.only(children);
      var childProps = child.props || {};
      var newChildProps = {};
      var trigger = props.action;
      if (trigger.indexOf('click') !== -1) {
        newChildProps.onClick = createChainedFunction(this.onClick, childProps.onClick);
        newChildProps.onMouseDown = createChainedFunction(this.onMouseDown, childProps.onMouseDown);
        newChildProps.onTouchStart = createChainedFunction(this.onTouchStart, childProps.onTouchStart);
      }
      if (trigger.indexOf('hover') !== -1) {
        newChildProps.onMouseEnter = createChainedFunction(this.onMouseEnter, childProps.onMouseEnter);
        newChildProps.onMouseLeave = createChainedFunction(this.onMouseLeave, childProps.onMouseLeave);
      }
      if (trigger.indexOf('focus') !== -1) {
        newChildProps.onFocus = createChainedFunction(this.onFocus, childProps.onFocus);
        newChildProps.onBlur = createChainedFunction(this.onBlur, childProps.onBlur);
      }

      ALL_HANDLERS.forEach(function (handler) {
        var newFn = undefined;
        if (props[handler] && newChildProps[handler]) {
          newFn = createChainedFunction(props[handler], newChildProps[handler]);
        } else {
          newFn = props[handler] || newChildProps[handler];
        }
        if (newFn) {
          newChildProps[handler] = newFn;
        }
      });

      return React.cloneElement(child, newChildProps);
    }
  });

  RC.Trigger = Trigger;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var Animate = RC.Animate;
	var Util = RC.Util;
	var createChainedFunction = Util.createChainedFunction;
	var getUuid = Util.getUuid;

	var Notice = React.createClass({
		displayName: 'Notice',

		propTypes: {
			duration: React.PropTypes.number,
			onClose: React.PropTypes.func,
			children: React.PropTypes.any
		},

		getDefaultProps: function getDefaultProps() {
			return {
				onEnd: function onEnd() {},

				duration: 1.5,
				style: {
					right: '50%'
				}
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			this.clearCloseTimer();
			if (this.props.duration) {
				this.closeTimer = setTimeout(function () {
					_this.close();
				}, this.props.duration * 1000);
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			this.componentDidMount();
		},
		componentWillUnmount: function componentWillUnmount() {
			this.clearCloseTimer();
		},
		clearCloseTimer: function clearCloseTimer() {
			if (this.closeTimer) {
				clearTimeout(this.closeTimer);
				this.closeTimer = null;
			}
		},
		close: function close() {
			this.clearCloseTimer();
			this.props.onClose();
		},
		render: function render() {
			var _className;

			var props = this.props;
			var componentClass = props.prefixCls + '-notice';
			var className = (_className = {}, _defineProperty(_className, '' + componentClass, 1), _defineProperty(_className, componentClass + '-closable', props.closable), _defineProperty(_className, props.className, !!props.className), _className);
			return React.createElement(
				'div',
				{ className: classNames(className), style: props.style },
				React.createElement(
					'div',
					{ className: componentClass + '-content' },
					this.props.children
				),
				props.closable ? React.createElement(
					'a',
					{ tabIndex: '0', onClick: this.close, className: componentClass + '-close' },
					React.createElement('span', { className: componentClass + '-close-x' })
				) : null
			);
		}
	});

	var Notification = React.createClass({
		displayName: 'Notification',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-notification',
				animation: 'fade',
				style: {
					'top': 65,
					left: '50%'
				}
			};
		},
		getInitialState: function getInitialState() {
			return {
				notices: []
			};
		},
		getTransitionName: function getTransitionName() {
			var props = this.props;
			var transitionName = props.transitionName;
			if (!transitionName && props.animation) {
				transitionName = props.prefixCls + '-' + props.animation;
			}
			return transitionName;
		},
		add: function add(notice) {
			var key = notice.key = notice.key || getUuid();
			var notices = this.state.notices;
			if (!notices.filter(function (v) {
				return v.key === key;
			}).length) {
				this.setState({
					notices: notices.concat(notice)
				});
			}
		},
		remove: function remove(key) {
			var notices = this.state.notices.filter(function (notice) {
				return notice.key !== key;
			});
			this.setState({
				notices: notices
			});
		},
		render: function render() {
			var _this2 = this,
			    _className2;

			var props = this.props;
			var noticeNodes = this.state.notices.map(function (notice) {
				var onClose = createChainedFunction(_this2.remove.bind(_this2, notice.key), notice.onClose);
				return React.createElement(
					Notice,
					_extends({ prefixCls: props.prefixCls }, notice, { onClose: onClose }),
					notice.content
				);
			});
			var className = (_className2 = {}, _defineProperty(_className2, props.prefixCls, 1), _defineProperty(_className2, props.className, !!props.className), _className2);
			return React.createElement(
				'div',
				{ className: classnames(className), style: props.style },
				React.createElement(
					Animate,
					{ transitionName: this.getTransitionName() },
					noticeNodes
				)
			);
		}
	});

	Notification.newInstance = function newNotificationInstance(properties) {
		var props = properties || {};
		var div = document.createElement('div');
		document.body.appendChild(div);
		var notification = ReactDOM.render(React.createElement(Notification, props), div);
		return {
			notice: function notice(noticeProps) {
				notification.add(noticeProps);
			},
			removeNotice: function removeNotice(key) {
				notification.remove(key);
			},

			component: notification,
			destroy: function destroy() {
				ReactDOM.unmountComponentAtNode(div);
				document.body.removeChild(div);
			}
		};
	};

	RC.Notification = Notification;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var Checkbox = (function (_React$Component) {
		_inherits(Checkbox, _React$Component);

		function Checkbox(props) {
			_classCallCheck(this, Checkbox);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Checkbox).call(this, props));

			_this.handleChange = _this.handleChange.bind(_this);
			var checked = false;
			if ('checked' in props) {
				checked = props.checked;
			} else {
				checked = props.defaultChecked;
			}
			_this.state = { checked: checked };
			return _this;
		}

		_createClass(Checkbox, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('checked' in nextProps) {
					this.setState({
						checked: nextProps.checked
					});
				}
			}
		}, {
			key: 'handleChange',
			value: function handleChange(e) {
				var checked = e.target.checked;
				if (!('checked' in this.props)) {
					this.setState({
						checked: checked ? 1 : 0
					});
				}
				this.props.onChange(e, this.state.checked);
			}
		}, {
			key: 'render',
			value: function render() {
				var _classnames;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var checked = this.state.checked;
				if (typeof checked === 'boolean') {
					checked = checked ? 1 : 0;
				}
				var className = classnames((_classnames = {}, _defineProperty(_classnames, props.className, !!props.className), _defineProperty(_classnames, prefixCls, 1), _defineProperty(_classnames, prefixCls + '-checked', checked), _defineProperty(_classnames, prefixCls + '-checked-' + checked, !!checked), _defineProperty(_classnames, prefixCls + '-disabled', props.disabled), _classnames));
				return React.createElement(
					'span',
					{ className: className,
						style: props.style },
					React.createElement('span', { className: prefixCls + '-inner' }),
					React.createElement('input', _extends({}, props, {
						defaultChecked: !!props.defaultChecked,
						className: prefixCls + '-input',
						checked: !!checked,
						onChange: this.handleChange
					}))
				);
			}
		}]);

		return Checkbox;
	})(React.Component);

	Checkbox.propTypes = {
		prefixCls: React.PropTypes.string,
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		className: React.PropTypes.string,
		defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		onChange: React.PropTypes.func
	};

	Checkbox.defaultProps = {
		prefixCls: 'rc-checkbox',
		style: {},
		type: 'checkbox',
		className: '',
		defaultChecked: 0,
		onChange: function onChange() {}
	};

	RC.Checkbox = Checkbox;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (RC) {
	var Checkbox = RC.Checkbox;

	var Radio = React.createClass({
		displayName: 'Radio',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-radio',
				type: 'radio'
			};
		},
		render: function render() {
			return React.createElement(Checkbox, _extends({}, this.props, { ref: 'checkbox' }));
		}
	});

	RC.Radio = Radio;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
  var noop = _.noop,
      rcUtil = RC.util,
      PropTypes = React.PropTypes,
      assign = _.assign,
      Animate = RC.Animate,
      DOMWrap = RC.DOMWrap,
      guid = rcUtil.guid,
      createChainedFunction = rcUtil.createChainedFunction,
      KeyCode = rcUtil.KeyCode,
      scrollIntoView = rcUtil.scrollIntoView;

  var now = Date.now();

  function getKeyFromChildrenIndex(child, menuEventKey, index) {
    var prefix = menuEventKey || '';
    return child.key || prefix + 'item_' + now + '_' + index;
  }

  function allDisabled(arr) {
    if (!arr.length) {
      return true;
    }
    return arr.every(function (c) {
      return !!c.props.disabled;
    });
  }

  function getActiveKey(props, originalActiveKey) {
    var activeKey = originalActiveKey;
    var children = props.children;
    var eventKey = props.eventKey;
    if (activeKey) {
      var found = undefined;
      React.Children.forEach(children, function (c, i) {
        if (!c.props.disabled && activeKey === getKeyFromChildrenIndex(c, eventKey, i)) {
          found = true;
        }
      });
      if (found) {
        return activeKey;
      }
    }
    activeKey = null;
    if (props.defaultActiveFirst) {
      React.Children.forEach(children, function (c, i) {
        if (!activeKey && !c.props.disabled) {
          activeKey = getKeyFromChildrenIndex(c, eventKey, i);
        }
      });
      return activeKey;
    }
    return activeKey;
  }

  function saveRef(index, subIndex, c) {
    if (c) {
      if (subIndex !== undefined) {
        this.instanceArray[index] = this.instanceArray[index] || [];
        this.instanceArray[index][subIndex] = c;
      } else {
        this.instanceArray[index] = c;
      }
    }
  }

  var MenuMixin = {
    propTypes: {
      focusable: React.PropTypes.bool,
      multiple: React.PropTypes.bool,
      style: React.PropTypes.object,
      defaultActiveFirst: React.PropTypes.bool,
      visible: React.PropTypes.bool,
      activeKey: React.PropTypes.string,
      selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultOpenKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      children: React.PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-menu',
        className: '',
        mode: 'vertical',
        level: 1,
        inlineIndent: 24,
        visible: true,
        focusable: true,
        style: {}
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      return {
        activeKey: getActiveKey(props, props.activeKey)
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var props = undefined;
      if (nextProps.activeKey) {
        props = {
          activeKey: getActiveKey(nextProps, nextProps.activeKey)
        };
      } else {
        var originalActiveKey = this.state.activeKey;
        var activeKey = getActiveKey(nextProps, originalActiveKey);
        // fix: this.setState(), parent.render(),
        if (activeKey !== originalActiveKey) {
          props = {
            activeKey: activeKey
          };
        }
      }
      if (props) {
        this.setState(props);
      }
    },
    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
      return this.props.visible || nextProps.visible;
    },
    componentWillMount: function componentWillMount() {
      this.instanceArray = [];
    },

    // all keyboard events callbacks run from here at first
    onKeyDown: function onKeyDown(e) {
      var _this = this;

      var keyCode = e.keyCode;
      var handled = undefined;
      this.getFlatInstanceArray().forEach(function (obj) {
        if (obj && obj.props.active) {
          handled = obj.onKeyDown(e);
        }
      });
      if (handled) {
        return 1;
      }
      var activeItem = null;
      if (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN) {
        activeItem = this.step(keyCode === KeyCode.UP ? -1 : 1);
      }
      if (activeItem) {
        e.preventDefault();
        this.setState({
          activeKey: activeItem.props.eventKey
        }, function () {
          scrollIntoView(ReactDOM.findDOMNode(activeItem), ReactDOM.findDOMNode(_this), {
            onlyScrollIfNeeded: true
          });
        });
        return 1;
      } else if (activeItem === undefined) {
        e.preventDefault();
        this.setState({
          activeKey: null
        });
        return 1;
      }
    },
    onCommonItemHover: function onCommonItemHover(e) {
      var mode = this.props.mode;
      var key = e.key;
      var hover = e.hover;
      var trigger = e.trigger;

      var activeKey = this.state.activeKey;
      if (!trigger || hover || this.props.closeSubMenuOnMouseLeave || !e.item.isSubMenu || mode === 'inline') {
        this.setState({
          activeKey: hover ? key : null
        });
      } else {}
      // keep active for sub menu for click active
      // empty

      // clear last open status
      if (hover && mode !== 'inline') {
        var activeItem = this.getFlatInstanceArray().filter(function (c) {
          return c && c.props.eventKey === activeKey;
        })[0];
        if (activeItem && activeItem.isSubMenu && activeItem.props.eventKey !== key) {
          this.onOpenChange({
            item: activeItem,
            key: activeItem.props.eventKey,
            open: false
          });
        }
      }
    },
    getFlatInstanceArray: function getFlatInstanceArray() {
      var instanceArray = this.instanceArray;
      var hasInnerArray = instanceArray.some(function (a) {
        return Array.isArray(a);
      });
      if (hasInnerArray) {
        instanceArray = [];
        this.instanceArray.forEach(function (a) {
          if (Array.isArray(a)) {
            instanceArray.push.apply(instanceArray, a);
          } else {
            instanceArray.push(a);
          }
        });
        this.instanceArray = instanceArray;
      }
      return instanceArray;
    },
    renderCommonMenuItem: function renderCommonMenuItem(child, i, subIndex, extraProps) {
      var state = this.state;
      var props = this.props;
      var key = getKeyFromChildrenIndex(child, props.eventKey, i);
      var childProps = child.props;
      /*if(!childProps){
        return null;
      }*/
      var newChildProps = assign({
        mode: props.mode,
        level: props.level,
        inlineIndent: props.inlineIndent,
        renderMenuItem: this.renderMenuItem,
        rootPrefixCls: props.prefixCls,
        index: i,
        parentMenu: this,
        ref: childProps.disabled ? undefined : createChainedFunction(child.ref, saveRef.bind(this, i, subIndex)),
        eventKey: key,
        closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
        onItemHover: this.onItemHover,
        active: !childProps.disabled && key === state.activeKey,
        multiple: props.multiple,
        onClick: this.onClick,
        openTransitionName: this.getOpenTransitionName(),
        openAnimation: props.openAnimation,
        onOpenChange: this.onOpenChange,
        onDeselect: this.onDeselect,
        onDestroy: this.onDestroy,
        onSelect: this.onSelect
      }, extraProps);
      if (props.mode === 'inline') {
        newChildProps.closeSubMenuOnMouseLeave = newChildProps.openSubMenuOnMouseEnter = false;
      }
      return React.cloneElement(child, newChildProps);
    },
    renderRoot: function renderRoot(props) {
      var _classes;

      this.instanceArray = [];
      var classes = (_classes = {}, _defineProperty(_classes, props.prefixCls, 1), _defineProperty(_classes, props.prefixCls + '-' + props.mode, 1), _defineProperty(_classes, props.className, !!props.className), _classes);
      var domProps = {
        className: classNames(classes),
        role: 'menu',
        'aria-activedescendant': ''
      };
      if (props.id) {
        domProps.id = props.id;
      }
      if (props.focusable) {
        domProps.tabIndex = '0';
        domProps.onKeyDown = this.onKeyDown;
      }
      return(
        // ESLint is not smart enough to know that the type of `children` was checked.
        React.createElement(
          DOMWrap,
          _extends({ style: props.style,
            tag: 'ul',
            hiddenClassName: props.prefixCls + '-hidden',
            visible: props.visible }, domProps),
          ' ',
          React.Children.map(props.children, this.renderMenuItem),
          ' '
        )
      );
    },
    step: function step(direction) {
      var children = this.getFlatInstanceArray();
      var activeKey = this.state.activeKey;
      var len = children.length;
      if (direction < 0) {
        children = children.concat().reverse();
      }
      // find current activeIndex
      var activeIndex = -1;
      children.every(function (c, ci) {
        if (c && c.props.eventKey === activeKey) {
          activeIndex = ci;
          return false;
        }
        return true;
      });
      if (!this.props.defaultActiveFirst && activeIndex !== -1) {
        if (allDisabled(children.slice(activeIndex, len - 1))) {
          return undefined;
        }
      }
      var start = (activeIndex + 1) % len;
      var i = start;
      for (;;) {
        var child = children[i];
        if (!child || child.props.disabled) {
          i = (i + 1 + len) % len;
          // complete a loop
          if (i === start) {
            return null;
          }
        } else {
          return child;
        }
      }
    }
  };

  var Menu = React.createClass({
    displayName: 'Menu',

    propTypes: {
      openSubMenuOnMouseEnter: React.PropTypes.bool,
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      selectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultSelectedKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      defaultOpenKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      mode: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onSelect: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      openTransitionName: React.PropTypes.string,
      openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
      level: React.PropTypes.number,
      eventKey: React.PropTypes.string,
      selectable: React.PropTypes.bool,
      children: React.PropTypes.any
    },

    mixins: [MenuMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        openSubMenuOnMouseEnter: true,
        closeSubMenuOnMouseLeave: true,
        selectable: true,
        onClick: noop,
        onSelect: noop,
        onOpen: noop,
        onClose: noop,
        onDeselect: noop,
        defaultSelectedKeys: [],
        defaultOpenKeys: []
      };
    },
    getInitialState: function getInitialState() {
      var props = this.props;
      var selectedKeys = props.defaultSelectedKeys;
      var openKeys = props.defaultOpenKeys;
      if ('selectedKeys' in props) {
        selectedKeys = props.selectedKeys || [];
      }
      if ('openKeys' in props) {
        openKeys = props.openKeys || [];
      }
      return {
        selectedKeys: selectedKeys, openKeys: openKeys
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      var props = {};
      if ('selectedKeys' in nextProps) {
        props.selectedKeys = nextProps.selectedKeys;
      }
      if ('openKeys' in nextProps) {
        props.openKeys = nextProps.openKeys;
      }
      this.setState(props);
    },
    onDestroy: function onDestroy(key) {
      var state = this.state;
      var props = this.props;
      var selectedKeys = state.selectedKeys;
      var openKeys = state.openKeys;
      var index = selectedKeys.indexOf(key);
      if (!('selectedKeys' in props) && index !== -1) {
        selectedKeys.splice(index, 1);
      }
      index = openKeys.indexOf(key);
      if (!('openKeys' in props) && index !== -1) {
        openKeys.splice(index, 1);
      }
    },
    onItemHover: function onItemHover(e) {
      var _this2 = this;

      var item = e.item;
      // special for top sub menu

      if (this.props.mode !== 'inline' && !this.props.closeSubMenuOnMouseLeave && item.isSubMenu) {
        (function () {
          var activeKey = _this2.state.activeKey;
          var activeItem = _this2.getFlatInstanceArray().filter(function (c) {
            return c && c.props.eventKey === activeKey;
          })[0];
          if (activeItem && activeItem.props.open) {
            _this2.onOpenChange({
              key: item.props.eventKey,
              item: e.item,
              open: true
            });
          }
        })();
      }

      this.onCommonItemHover(e);
    },
    onSelect: function onSelect(selectInfo) {
      var props = this.props;
      if (props.selectable) {
        // root menu
        var selectedKeys = this.state.selectedKeys;
        var selectedKey = selectInfo.key;
        if (props.multiple) {
          selectedKeys = selectedKeys.concat([selectedKey]);
        } else {
          selectedKeys = [selectedKey];
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys
          });
        }
        props.onSelect(assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    onClick: function onClick(e) {
      var props = this.props;
      props.onClick(e);
    },
    onOpenChange: function onOpenChange(e) {
      var openKeys = this.state.openKeys;
      var props = this.props;
      var changed = true;
      if (e.open) {
        changed = openKeys.indexOf(e.key) === -1;
        if (changed) {
          openKeys = openKeys.concat(e.key);
        }
      } else {
        var index = openKeys.indexOf(e.key);
        changed = index !== -1;
        if (changed) {
          openKeys = openKeys.concat();
          openKeys.splice(index, 1);
        }
      }
      if (changed) {
        if (!('openKeys' in this.props)) {
          // hack: batch does not update state
          this.state.openKeys = openKeys;
          this.setState({
            openKeys: openKeys
          });
        }
        var info = assign({
          openKeys: openKeys
        }, e);
        if (e.open) {
          props.onOpen(info);
        } else {
          props.onClose(info);
        }
      }
    },
    onDeselect: function onDeselect(selectInfo) {
      var props = this.props;
      if (props.selectable) {
        var selectedKeys = this.state.selectedKeys.concat();
        var selectedKey = selectInfo.key;
        var index = selectedKeys.indexOf(selectedKey);
        if (index !== -1) {
          selectedKeys.splice(index, 1);
        }
        if (!('selectedKeys' in props)) {
          this.setState({
            selectedKeys: selectedKeys
          });
        }
        props.onDeselect(assign({}, selectInfo, {
          selectedKeys: selectedKeys
        }));
      }
    },
    getOpenTransitionName: function getOpenTransitionName() {
      var props = this.props;
      var transitionName = props.openTransitionName;
      var animationName = props.openAnimation;
      if (!transitionName && typeof animationName === 'string') {
        transitionName = props.prefixCls + '-open-' + animationName;
      }
      return transitionName;
    },
    isInlineMode: function isInlineMode() {
      return this.props.mode === 'inline';
    },
    lastOpenSubMenu: function lastOpenSubMenu() {
      var _this3 = this;

      var lastOpen = [];
      if (this.state.openKeys.length) {
        lastOpen = this.getFlatInstanceArray().filter(function (c) {
          return c && _this3.state.openKeys.indexOf(c.props.eventKey) !== -1;
        });
      }
      return lastOpen[0];
    },
    renderMenuItem: function renderMenuItem(c, i, subIndex) {
      var key = getKeyFromChildrenIndex(c, this.props.eventKey, i);
      var state = this.state;
      var extraProps = {
        openKeys: state.openKeys,
        open: state.openKeys.indexOf(key) !== -1,
        selectedKeys: state.selectedKeys,
        selected: state.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: this.props.openSubMenuOnMouseEnter
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },
    render: function render() {
      var props = assign({}, this.props);
      props.className += ' ' + props.prefixCls + '-root';
      return this.renderRoot(props);
    }
  });

  var MenuItem = React.createClass({
    displayName: 'MenuItem',

    propTypes: {
      rootPrefixCls: React.PropTypes.string,
      eventKey: React.PropTypes.string,
      active: React.PropTypes.bool,
      selected: React.PropTypes.bool,
      disabled: React.PropTypes.bool,
      title: React.PropTypes.string,
      onSelect: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      parentMenu: React.PropTypes.object,
      onItemHover: React.PropTypes.func,
      onDestroy: React.PropTypes.func
    },

    getDefaultProps: function getDefaultProps() {
      return {
        onSelect: function onSelect() {},
        onMouseEnter: function onMouseEnter() {}
      };
    },
    componentWillUnmount: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        return true;
      }
    },
    onMouseLeave: function onMouseLeave() {
      var _this4 = this;

      var eventKey = this.props.eventKey;
      var parentMenu = this.props.parentMenu;
      parentMenu.menuItemMouseLeaveTimer = setTimeout(function () {
        if (_this4.isMounted() && _this4.props.active) {
          _this4.props.onItemHover({
            key: eventKey,
            item: _this4,
            hover: false,
            trigger: 'mouseleave'
          });
        }
      }, 30);
    },
    onMouseEnter: function onMouseEnter() {
      var props = this.props;
      var parentMenu = this.props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      var eventKey = props.eventKey;
      props.onItemHover({
        key: eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
    },
    onClick: function onClick(e) {
      var props = this.props;
      var eventKey = props.eventKey;
      var info = {
        key: eventKey,
        keyPath: [eventKey],
        item: this,
        domEvent: e
      };
      props.onClick(info);
      if (props.multiple) {
        if (props.selected) {
          props.onDeselect(info);
        } else {
          props.onSelect(info);
        }
      } else if (!props.selected) {
        props.onSelect(info);
      }
    },
    getPrefixCls: function getPrefixCls() {
      return this.props.rootPrefixCls + '-item';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getSelectedClassName: function getSelectedClassName() {
      return this.getPrefixCls() + '-selected';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    render: function render() {
      var props = this.props;
      var classes = {};
      classes[this.getActiveClassName()] = !props.disabled && props.active;
      classes[this.getSelectedClassName()] = props.selected;
      classes[this.getDisabledClassName()] = props.disabled;
      classes[this.getPrefixCls()] = true;
      classes[props.className] = !!props.className;
      var attrs = {
        title: props.title,
        className: classNames(classes),
        role: 'menuitem',
        'aria-selected': props.selected,
        'aria-disabled': props.disabled
      };
      var mouseEvent = {};
      if (!props.disabled) {
        mouseEvent = {
          onClick: this.onClick,
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return React.createElement(
        'li',
        _extends({ style: style }, attrs, mouseEvent),
        props.children
      );
    }
  });

  var MenuItemGroup = React.createClass({
    displayName: 'MenuItemGroup',

    propTypes: {
      renderMenuItem: PropTypes.func,
      index: PropTypes.number
    },

    getDefaultProps: function getDefaultProps() {
      return {
        disabled: true
      };
    },
    renderInnerMenuItem: function renderInnerMenuItem(item, subIndex) {
      var renderMenuItem = this.props.renderMenuItem;
      return renderMenuItem(item, this.props.index, subIndex);
    },
    render: function render() {
      var props = this.props;
      var className = props.className || '';
      var rootPrefixCls = props.rootPrefixCls;

      className += ' ' + rootPrefixCls + '-item-group';
      var titleClassName = rootPrefixCls + '-item-group-title';
      var listClassName = rootPrefixCls + '-item-group-list';
      return React.createElement(
        'li',
        { className: className },
        React.createElement(
          'div',
          { className: titleClassName },
          props.title
        ),
        React.createElement(
          'ul',
          { className: listClassName },
          React.Children.map(props.children, this.renderInnerMenuItem)
        )
      );
    }
  });

  var SubPopupMenu = React.createClass({
    displayName: 'SubPopupMenu',

    propTypes: {
      onSelect: React.PropTypes.func,
      onClick: React.PropTypes.func,
      onDeselect: React.PropTypes.func,
      onOpenChange: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      openTransitionName: React.PropTypes.string,
      openAnimation: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object]),
      openKeys: React.PropTypes.arrayOf(React.PropTypes.string),
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      visible: React.PropTypes.bool,
      children: React.PropTypes.any
    },

    mixins: [MenuMixin],

    onDeselect: function onDeselect(selectInfo) {
      this.props.onDeselect(selectInfo);
    },
    onSelect: function onSelect(selectInfo) {
      this.props.onSelect(selectInfo);
    },
    onClick: function onClick(e) {
      this.props.onClick(e);
    },
    onOpenChange: function onOpenChange(e) {
      this.props.onOpenChange(e);
    },
    onDestroy: function onDestroy(key) {
      this.props.onDestroy(key);
    },
    onItemHover: function onItemHover(e) {
      this.onCommonItemHover(e);
    },
    getOpenTransitionName: function getOpenTransitionName() {
      return this.props.openTransitionName;
    },
    renderMenuItem: function renderMenuItem(c, i, subIndex) {
      var props = this.props;
      var key = getKeyFromChildrenIndex(c, props.eventKey, i);
      var extraProps = {
        openKeys: props.openKeys,
        selectedKeys: props.selectedKeys,
        open: props.openKeys.indexOf(key) !== -1,
        selected: props.selectedKeys.indexOf(key) !== -1,
        openSubMenuOnMouseEnter: true
      };
      return this.renderCommonMenuItem(c, i, subIndex, extraProps);
    },
    render: function render() {
      var renderFirst = this.renderFirst;
      this.renderFirst = 1;
      this.haveOpened = this.haveOpened || this.props.visible;
      if (!this.haveOpened) {
        return null;
      }
      var transitionAppear = true;
      if (!renderFirst && this.props.visible) {
        transitionAppear = false;
      }
      var props = assign({}, this.props);
      props.className += ' ' + props.prefixCls + '-sub';
      var animProps = {};
      if (props.openTransitionName) {
        animProps.transitionName = props.openTransitionName;
      } else if (_typeof(props.openAnimation) === 'object') {
        animProps.animation = assign({}, props.openAnimation);
        if (!transitionAppear) {
          delete animProps.animation.appear;
        }
      }
      return React.createElement(
        Animate,
        _extends({}, animProps, {
          showProp: 'visible',
          component: '',
          transitionAppear: transitionAppear }),
        this.renderRoot(props)
      );
    }
  });

  var SubMenuStateMixin = {
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate();
    },
    componentDidUpdate: function componentDidUpdate() {
      if (this.props.mode !== 'inline') {
        if (this.props.open) {
          this.bindRootCloseHandlers();
        } else {
          this.unbindRootCloseHandlers();
        }
      }
    },
    handleDocumentKeyUp: function handleDocumentKeyUp(e) {
      if (e.keyCode === KeyCode.ESC) {
        this.props.onItemHover({
          key: this.props.eventKey,
          item: this,
          hover: false
        });
      }
    },
    handleDocumentClick: function handleDocumentClick(e) {
      // If the click originated from within this component
      // don't do anything.
      if (rcUtil.Dom.contains(ReactDOM.findDOMNode(this), e.target)) {
        return;
      }
      var props = this.props;
      props.onItemHover({
        hover: false,
        item: this,
        key: this.props.eventKey
      });
      this.triggerOpenChange(false);
    },
    bindRootCloseHandlers: function bindRootCloseHandlers() {
      if (!this._onDocumentClickListener) {
        this._onDocumentClickListener = rcUtil.Dom.addEventListener(document, 'click', this.handleDocumentClick);
        this._onDocumentKeyupListener = rcUtil.Dom.addEventListener(document, 'keyup', this.handleDocumentKeyUp);
      }
    },
    unbindRootCloseHandlers: function unbindRootCloseHandlers() {
      if (this._onDocumentClickListener) {
        this._onDocumentClickListener.remove();
        this._onDocumentClickListener = null;
      }

      if (this._onDocumentKeyupListener) {
        this._onDocumentKeyupListener.remove();
        this._onDocumentKeyupListener = null;
      }
    },
    componentWillUnmount: function componentWillUnmount() {
      this.unbindRootCloseHandlers();
    }
  };

  var Divider = React.createClass({
    displayName: 'Divider',
    getDefaultProps: function getDefaultProps() {
      return {
        disabled: true
      };
    },
    render: function render() {
      var props = this.props;
      var className = props.className || '';
      var rootPrefixCls = props.rootPrefixCls;
      className += ' ' + (rootPrefixCls + '-item-divider');
      return React.createElement('li', _extends({}, props, { className: className }));
    }
  });

  var SubMenu = React.createClass({
    displayName: 'SubMenu',

    propTypes: {
      parentMenu: React.PropTypes.object,
      title: React.PropTypes.node,
      onClick: React.PropTypes.func,
      onOpenChange: React.PropTypes.func,
      rootPrefixCls: React.PropTypes.string,
      eventKey: React.PropTypes.string,
      multiple: React.PropTypes.bool,
      active: React.PropTypes.bool,
      open: React.PropTypes.bool,
      onSelect: React.PropTypes.func,
      closeSubMenuOnMouseLeave: React.PropTypes.bool,
      openSubMenuOnMouseEnter: React.PropTypes.bool,
      onDeselect: React.PropTypes.func,
      onDestroy: React.PropTypes.func,
      onItemHover: React.PropTypes.func
    },

    mixins: [SubMenuStateMixin],

    getDefaultProps: function getDefaultProps() {
      return {
        onMouseEnter: function onMouseEnter() {},

        title: ''
      };
    },
    getInitialState: function getInitialState() {
      this.isSubMenu = 1;
      return {
        defaultActiveFirst: false
      };
    },
    componentWillUnmount: function componentWillUnmount() {
      var props = this.props;
      if (props.onDestroy) {
        props.onDestroy(props.eventKey);
      }
    },
    onDestroy: function onDestroy(key) {
      this.props.onDestroy(key);
    },
    onKeyDown: function onKeyDown(e) {
      var keyCode = e.keyCode;
      var menu = this.menuInstance;

      if (keyCode === KeyCode.ENTER) {
        this.onClick(e);
        this.setState({
          defaultActiveFirst: true
        });
        return true;
      }

      if (keyCode === KeyCode.RIGHT) {
        if (this.props.open) {
          menu.onKeyDown(e);
        } else {
          this.triggerOpenChange(true);
          this.setState({
            defaultActiveFirst: true
          });
        }
        return true;
      }
      if (keyCode === KeyCode.LEFT) {
        var handled = undefined;
        if (this.props.open) {
          handled = menu.onKeyDown(e);
        } else {
          return undefined;
        }
        if (!handled) {
          this.triggerOpenChange(false);
          handled = true;
        }
        return handled;
      }

      if (this.props.open && (keyCode === KeyCode.UP || keyCode === KeyCode.DOWN)) {
        return menu.onKeyDown(e);
      }
    },
    onSubTreeMouseEnter: function onSubTreeMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
    },
    onOpenChange: function onOpenChange(e) {
      this.props.onOpenChange(this.addKeyPath(e));
    },
    onMouseEnter: function onMouseEnter() {
      if (this.leaveTimer) {
        clearTimeout(this.leaveTimer);
        this.leaveTimer = null;
      }
      var props = this.props;
      var parentMenu = props.parentMenu;
      if (parentMenu.menuItemMouseLeaveTimer) {
        clearTimeout(parentMenu.menuItemMouseLeaveTimer);
        parentMenu.menuItemMouseLeaveTimer = null;
      }
      props.onItemHover({
        key: this.props.eventKey,
        item: this,
        hover: true,
        trigger: 'mouseenter'
      });
      if (props.openSubMenuOnMouseEnter) {
        this.triggerOpenChange(true);
      }
      this.setState({
        defaultActiveFirst: false
      });
    },
    onMouseLeave: function onMouseLeave() {
      var _this5 = this;

      // prevent popup menu and submenu gap
      this.leaveTimer = setTimeout(function () {
        // leave whole sub tree
        // still active
        if (_this5.isMounted() && _this5.props.active) {
          _this5.props.onItemHover({
            key: _this5.props.eventKey,
            item: _this5,
            hover: false,
            trigger: 'mouseleave'
          });
        }
        if (_this5.isMounted() && _this5.props.open) {
          if (_this5.props.closeSubMenuOnMouseLeave) {
            _this5.triggerOpenChange(false);
          }
        }
      }, 100);
    },
    onClick: function onClick() {
      if (this.props.openSubMenuOnMouseEnter) {
        return;
      }
      this.triggerOpenChange(!this.props.open, 'click');
      this.setState({
        defaultActiveFirst: false
      });
    },
    onSubMenuClick: function onSubMenuClick(info) {
      this.props.onClick(this.addKeyPath(info));
    },
    onSelect: function onSelect(info) {
      this.props.onSelect(info);
    },
    onDeselect: function onDeselect(info) {
      this.props.onDeselect(info);
    },
    getPrefixCls: function getPrefixCls() {
      return this.props.rootPrefixCls + '-submenu';
    },
    getActiveClassName: function getActiveClassName() {
      return this.getPrefixCls() + '-active';
    },
    getDisabledClassName: function getDisabledClassName() {
      return this.getPrefixCls() + '-disabled';
    },
    getOpenClassName: function getOpenClassName() {
      return this.props.rootPrefixCls + '-submenu-open';
    },
    saveMenuInstance: function saveMenuInstance(c) {
      this.menuInstance = c;
    },
    addKeyPath: function addKeyPath(info) {
      return assign({}, info, {
        keyPath: (info.keyPath || []).concat(this.props.eventKey)
      });
    },
    triggerOpenChange: function triggerOpenChange(open, type) {
      var key = this.props.eventKey;
      this.onOpenChange({
        key: key,
        item: this,
        trigger: type,
        open: open
      });
    },
    renderChildren: function renderChildren(children) {
      var props = this.props;
      var baseProps = {
        mode: props.mode === 'horizontal' ? 'vertical' : props.mode,
        visible: props.open,
        level: props.level + 1,
        inlineIndent: props.inlineIndent,
        focusable: false,
        onClick: this.onSubMenuClick,
        onSelect: this.onSelect,
        onDeselect: this.onDeselect,
        onDestroy: this.onDestroy,
        selectedKeys: props.selectedKeys,
        eventKey: props.eventKey + '-menu-',
        openKeys: props.openKeys,
        openTransitionName: props.openTransitionName,
        openAnimation: props.openAnimation,
        onOpenChange: this.onOpenChange,
        closeSubMenuOnMouseLeave: props.closeSubMenuOnMouseLeave,
        defaultActiveFirst: this.state.defaultActiveFirst,
        multiple: props.multiple,
        prefixCls: props.rootPrefixCls,
        id: this._menuId,
        ref: this.saveMenuInstance
      };
      return React.createElement(
        SubPopupMenu,
        baseProps,
        children
      );
    },
    render: function render() {
      var _classes2;

      this.haveOpen = this.haveOpen || this.props.open;
      var props = this.props;
      var prefixCls = this.getPrefixCls();
      var classes = (_classes2 = {}, _defineProperty(_classes2, props.className, !!props.className), _defineProperty(_classes2, prefixCls + '-' + props.mode, 1), _classes2);

      classes[this.getOpenClassName()] = this.props.open;
      classes[this.getActiveClassName()] = props.active;
      classes[this.getDisabledClassName()] = props.disabled;
      this._menuId = this._menuId || guid();
      classes[prefixCls] = true;
      classes[prefixCls + '-' + props.mode] = 1;
      var clickEvents = {};
      var mouseEvents = {};
      var titleMouseEvents = {};
      if (!props.disabled) {
        clickEvents = {
          onClick: this.onClick
        };
        mouseEvents = {
          onMouseLeave: this.onMouseLeave,
          onMouseEnter: this.onSubTreeMouseEnter
        };
        // only works in title, not outer li
        titleMouseEvents = {
          onMouseEnter: this.onMouseEnter
        };
      }
      var style = {};
      if (props.mode === 'inline') {
        style.paddingLeft = props.inlineIndent * props.level;
      }
      return React.createElement(
        'li',
        _extends({ className: classNames(classes) }, mouseEvents),
        React.createElement(
          'div',
          _extends({
            style: style,
            className: prefixCls + '-title'
          }, titleMouseEvents, clickEvents, {
            'aria-open': props.open,
            'aria-owns': this._menuId,
            'aria-haspopup': 'true' }),
          props.title
        ),
        this.renderChildren(props.children)
      );
    }
  });

  Menu.Divider = Divider;
  Menu.Item = MenuItem;
  Menu.SubMenu = SubMenu;
  Menu.ItemGroup = MenuItemGroup;

  RC.MenuItem = MenuItem;
  RC.MenuItemGroup = MenuItemGroup;
  RC.SubMenu = SubMenu;
  RC.Menu = Menu;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Menu = RC.Menu;
	var MenuItem = RC.MenuItem;
	var MenuItemGroup = RC.MenuItemGroup;
	var Animate = RC.Animate;
	var Util = RC.Util;
	var Trigger = RC.Trigger;
	var KeyCode = Util.KeyCode;
	var scrollIntoView = Util.scrollIntoView;
	var _React = React;
	var cloneElement = _React.cloneElement;
	var PropTypes = _React.PropTypes;
	var _ReactDOM = ReactDOM;
	var findDOMNode = _ReactDOM.findDOMNode;

	function getValuePropValue(child) {
		var props = child.props;
		if ('value' in props) {
			return props.value;
		}
		if (child.key) {
			return child.key;
		}
		throw new Error('no key or value for ' + child);
	}

	function getPropValue(child, prop) {
		if (prop === 'value') {
			return getValuePropValue(child);
		}
		return child.props[prop];
	}

	function isCombobox(props) {
		return props.combobox;
	}

	function isMultipleOrTags(props) {
		return props.multiple || props.tags;
	}

	function isMultipleOrTagsOrCombobox(props) {
		return isMultipleOrTags(props) || isCombobox(props);
	}

	function isSingleMode(props) {
		return !isMultipleOrTagsOrCombobox(props);
	}

	function toArray(value) {
		var ret = value;
		if (value === undefined) {
			ret = [];
		} else if (!Array.isArray(value)) {
			ret = [value];
		}
		return ret;
	}

	function getSelectKeys(menuItems, value) {
		if (value === null || value === undefined) {
			return [];
		}
		var selectedKeys = [];
		React.Children.forEach(menuItems, function (item) {
			if (item.type === MenuItemGroup) {
				selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
			} else {
				var itemValue = getValuePropValue(item);
				var itemKey = item.key;
				if (value.indexOf(itemValue) !== -1 && itemKey) {
					selectedKeys.push(itemKey);
				}
			}
		});
		return selectedKeys;
	}

	var OptGroup = (function (_React$Component) {
		_inherits(OptGroup, _React$Component);

		function OptGroup() {
			_classCallCheck(this, OptGroup);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(OptGroup).apply(this, arguments));
		}

		return OptGroup;
	})(React.Component);

	var Option = (function (_React$Component2) {
		_inherits(Option, _React$Component2);

		function Option() {
			_classCallCheck(this, Option);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Option).apply(this, arguments));
		}

		return Option;
	})(React.Component);

	var FilterMixin = {
		filterOption: function filterOption(input, child) {
			if (!input) {
				return true;
			}
			var filterOption = this.props.filterOption;
			if (!filterOption) {
				return true;
			}
			if (child.props.disabled) {
				return false;
			}
			return filterOption.call(this, input, child);
		},
		renderFilterOptions: function renderFilterOptions(inputValue) {
			return this.renderFilterOptionsFromChildren(this.props.children, true, inputValue);
		},
		renderFilterOptionsFromChildren: function renderFilterOptionsFromChildren(children, showNotFound, iv) {
			var _this3 = this;

			var sel = [];
			var props = this.props;
			var inputValue = iv === undefined ? this.state.inputValue : iv;
			var childrenKeys = [];
			var tags = props.tags;
			React.Children.forEach(children, function (child) {
				if (child.type === OptGroup) {
					var innerItems = _this3.renderFilterOptionsFromChildren(child.props.children, false);
					if (innerItems.length) {
						var label = child.props.label;
						var key = child.key;
						if (!key && typeof label === 'string') {
							key = label;
						} else if (!label && key) {
							label = key;
						}
						sel.push(React.createElement(
							MenuItemGroup,
							{ key: key, title: label },
							innerItems
						));
					}
					return;
				}
				var childValue = getValuePropValue(child);
				if (_this3.filterOption(inputValue, child)) {
					sel.push(React.createElement(MenuItem, _extends({
						value: childValue,
						key: childValue
					}, child.props)));
				}
				if (tags && !child.props.disabled) {
					childrenKeys.push(childValue);
				}
			});
			if (tags) {
				// tags value must be string
				var value = this.state.value || [];
				value = value.filter(function (singleValue) {
					return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
				});
				sel = sel.concat(value.map(function (singleValue) {
					return React.createElement(
						MenuItem,
						{ value: singleValue, key: singleValue },
						singleValue
					);
				}));
				if (inputValue) {
					var notFindInputItem = sel.every(function (option) {
						return getValuePropValue(option) !== inputValue;
					});
					if (notFindInputItem) {
						sel.unshift(React.createElement(
							MenuItem,
							{ value: inputValue, key: inputValue },
							inputValue
						));
					}
				}
			}
			if (!sel.length && showNotFound && props.notFoundContent) {
				sel = [React.createElement(
					MenuItem,
					{ disabled: true, value: 'NOT_FOUND', key: 'NOT_FOUND' },
					props.notFoundContent
				)];
			}
			return sel;
		}
	};

	var DropdownMenu = React.createClass({
		displayName: 'DropdownMenu',

		propTypes: {
			prefixCls: PropTypes.string,
			menuItems: PropTypes.any,
			search: PropTypes.any,
			visible: PropTypes.bool
		},

		componentDidMount: function componentDidMount() {
			this.scrollActiveItemToView();
			this.lastVisible = this.props.visible;
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
			if (!nextProps.visible) {
				this.lastVisible = false;
			}
			// freeze when hide
			return nextProps.visible;
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var props = this.props;
			if (!prevProps.visible && props.visible) {
				this.scrollActiveItemToView();
			}
			this.lastVisible = props.visible;
		},
		scrollActiveItemToView: function scrollActiveItemToView() {
			// scroll into view
			var itemComponent = findDOMNode(this.firstActiveItem);
			if (itemComponent) {
				scrollIntoView(itemComponent, findDOMNode(this.refs.menu), {
					onlyScrollIfNeeded: true
				});
			}
		},
		renderMenu: function renderMenu() {
			var _this4 = this;

			var props = this.props;
			var menuItems = props.menuItems;
			var defaultActiveFirstOption = props.defaultActiveFirstOption;
			var value = props.value;
			var dropdownMenuStyle = props.dropdownMenuStyle;
			var prefixCls = props.prefixCls;
			var multiple = props.multiple;
			var onMenuDeselect = props.onMenuDeselect;
			var onMenuSelect = props.onMenuSelect;

			if (menuItems && menuItems.length) {
				var _ret = (function () {
					var menuProps = {};
					if (multiple) {
						menuProps.onDeselect = onMenuDeselect;
						menuProps.onSelect = onMenuSelect;
					} else {
						menuProps.onClick = onMenuSelect;
					}
					var selectedKeys = getSelectKeys(menuItems, value);
					var activeKeyProps = {};

					var clonedMenuItems = menuItems;
					if (selectedKeys.length) {
						(function () {
							if (props.visible && !_this4.lastVisible) {
								activeKeyProps.activeKey = selectedKeys[0];
							}
							var foundFirst = false;
							// set firstActiveItem via cloning menus
							// for scroll into view
							var clone = function clone(item) {
								if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
									foundFirst = true;
									return cloneElement(item, {
										ref: function ref(_ref2) {
											_this4.firstActiveItem = _ref2;
										}
									});
								}
								return item;
							};

							clonedMenuItems = menuItems.map(function (item) {
								if (item.type === MenuItemGroup) {
									var children = item.props.children.map(clone);
									return cloneElement(item, {}, children);
								}
								return clone(item);
							});
						})();
					}

					return {
						v: React.createElement(
							Menu,
							_extends({
								ref: 'menu',
								defaultActiveFirst: defaultActiveFirstOption,
								style: dropdownMenuStyle
							}, activeKeyProps, {
								multiple: multiple,
								focusable: false
							}, menuProps, {
								selectedKeys: selectedKeys,
								prefixCls: prefixCls + '-menu' }),
							clonedMenuItems
						)
					};
				})();

				if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
			}
			return null;
		},
		render: function render() {
			return React.createElement(
				'div',
				null,
				this.props.search,
				this.renderMenu()
			);
		}
	});

	var BUILT_IN_PLACEMENTS = {
		bottomLeft: {
			points: ['tl', 'bl'],
			offset: [0, 4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		},
		topLeft: {
			points: ['bl', 'tl'],
			offset: [0, -4],
			overflow: {
				adjustX: 0,
				adjustY: 1
			}
		}
	};

	var SelectTrigger = React.createClass({
		displayName: 'SelectTrigger',

		propTypes: {
			dropdownMatchSelectWidth: PropTypes.bool,
			visible: PropTypes.bool,
			filterOption: PropTypes.any,
			options: PropTypes.any,
			prefixCls: PropTypes.string,
			popupClassName: PropTypes.string,
			children: PropTypes.any
		},

		componentDidUpdate: function componentDidUpdate() {
			if (this.props.dropdownMatchSelectWidth && this.props.visible) {
				var dropdownDOMNode = this.getPopupDOMNode();
				if (dropdownDOMNode) {
					dropdownDOMNode.style.width = ReactDOM.findDOMNode(this).offsetWidth + 'px';
				}
			}
		},
		getInnerMenu: function getInnerMenu() {
			return this.popupMenu && this.popupMenu.refs.menu;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		getDropdownElement: function getDropdownElement(newProps) {
			var props = this.props;
			return React.createElement(DropdownMenu, _extends({
				ref: this.saveMenu
			}, newProps, {
				prefixCls: this.getDropdownPrefixCls(),
				onMenuSelect: props.onMenuSelect,
				onMenuDeselect: props.onMenuDeselect,
				value: props.value,
				defaultActiveFirstOption: props.defaultActiveFirstOption,
				dropdownMenuStyle: props.dropdownMenuStyle
			}));
		},
		getDropdownTransitionName: function getDropdownTransitionName() {
			var props = this.props;
			var transitionName = props.transitionName;
			if (!transitionName && props.animation) {
				transitionName = this.getDropdownPrefixCls() + '-' + props.animation;
			}
			return transitionName;
		},
		getDropdownPrefixCls: function getDropdownPrefixCls() {
			return this.props.prefixCls + '-dropdown';
		},
		saveMenu: function saveMenu(menu) {
			this.popupMenu = menu;
		},
		render: function render() {
			var _popupClassName;

			var props = this.props;
			var multiple = props.multiple;
			var visible = props.visible;

			var dropdownPrefixCls = this.getDropdownPrefixCls();
			var popupClassName = (_popupClassName = {}, _defineProperty(_popupClassName, props.dropdownClassName, !!props.dropdownClassName), _defineProperty(_popupClassName, dropdownPrefixCls + '--' + (multiple ? 'multiple' : 'single'), 1), _popupClassName);
			var search = multiple || props.combobox || !props.showSearch ? null : React.createElement(
				'span',
				{ className: dropdownPrefixCls + '-search' },
				props.inputElement
			);
			var popupElement = this.getDropdownElement({
				menuItems: props.options,
				search: search,
				multiple: multiple,
				visible: visible
			});
			return React.createElement(
				Trigger,
				_extends({}, props, {
					action: props.disabled ? [] : ['click'],
					ref: 'trigger',
					popupPlacement: 'bottomLeft',
					builtinPlacements: BUILT_IN_PLACEMENTS,
					prefixCls: dropdownPrefixCls,
					popupTransitionName: this.getDropdownTransitionName(),
					onPopupVisibleChange: props.onDropdownVisibleChange,
					popup: popupElement,
					popupVisible: visible,
					popupClassName: classnames(popupClassName),
					popupStyle: props.dropdownStyle
				}),
				props.children
			);
		}
	});

	function filterFn(input, child) {
		return String(getPropValue(child, this.props.optionFilterProp)).indexOf(input) > -1;
	}

	function saveRef(name, component) {
		this[name] = component;
	}

	var Select = React.createClass({
		displayName: 'Select',

		propTypes: {
			defaultActiveFirstOption: PropTypes.bool,
			multiple: PropTypes.bool,
			filterOption: PropTypes.any,
			showSearch: PropTypes.bool,
			disabled: PropTypes.bool,
			showArrow: PropTypes.bool,
			tags: PropTypes.bool,
			transitionName: PropTypes.string,
			optionLabelProp: PropTypes.string,
			optionFilterProp: PropTypes.string,
			animation: PropTypes.string,
			choiceTransitionName: PropTypes.string,
			onChange: PropTypes.func,
			onSelect: PropTypes.func,
			onSearch: PropTypes.func,
			searchPlaceholder: PropTypes.string,
			placeholder: PropTypes.any,
			onDeselect: PropTypes.func,
			value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
			dropdownStyle: PropTypes.object,
			maxTagTextLength: PropTypes.number
		},
		mixins: [FilterMixin],

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-select',
				filterOption: filterFn,
				defaultOpen: false,
				defaultActiveFirstOption: true,
				showSearch: true,
				allowClear: false,
				placeholder: '',
				searchPlaceholder: '',
				defaultValue: [],
				onChange: noop,
				onSelect: noop,
				onSearch: noop,
				onDeselect: noop,
				showArrow: true,
				dropdownMatchSelectWidth: true,
				dropdownStyle: {},
				dropdownMenuStyle: {},
				optionFilterProp: 'value',
				optionLabelProp: 'value',
				notFoundContent: 'Not Found'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var value = [];
			if ('value' in props) {
				value = toArray(props.value);
			} else {
				value = toArray(props.defaultValue);
			}
			var label = this.getLabelFromProps(props, value, 1);
			var inputValue = '';
			if (props.combobox) {
				inputValue = value.length ? String(value[0]) : '';
			}
			this.saveInputRef = saveRef.bind(this, 'inputInstance');
			var open = props.open;
			if (open === undefined) {
				open = props.defaultOpen;
			}
			return { value: value, inputValue: inputValue, label: label, open: open };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = toArray(nextProps.value);
				var label = this.getLabelFromProps(nextProps, value);
				this.setState({
					value: value,
					label: label
				});
				if (nextProps.combobox) {
					this.setState({
						inputValue: value.length ? String(value[0]) : ''
					});
				}
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			var state = this.state;
			var props = this.props;
			if (state.open && isMultipleOrTags(props)) {
				var inputNode = this.getInputDOMNode();
				if (inputNode.value) {
					inputNode.style.width = '';
					inputNode.style.width = inputNode.scrollWidth + 'px';
				} else {
					inputNode.style.width = '';
				}
			}
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.dropdownContainer) {
				ReactDOM.unmountComponentAtNode(this.dropdownContainer);
				document.body.removeChild(this.dropdownContainer);
				this.dropdownContainer = null;
			}
		},
		onInputChange: function onInputChange(event) {
			var val = event.target.value;
			var props = this.props;

			this.setState({
				inputValue: val,
				open: true
			});
			if (isCombobox(props)) {
				this.fireChange([val], [val]);
			}
			props.onSearch(val);
		},
		onDropdownVisibleChange: function onDropdownVisibleChange(open) {
			this.setOpenState(open);
		},

		// combobox ignore
		onKeyDown: function onKeyDown(event) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var keyCode = event.keyCode;
			if (this.state.open && !this.getInputDOMNode()) {
				this.onInputKeyDown(event);
			} else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
				this.setOpenState(true);
				event.preventDefault();
			}
		},
		onInputKeyDown: function onInputKeyDown(event) {
			var props = this.props;
			var state = this.state;
			var keyCode = event.keyCode;
			if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
				var value = state.value.concat();
				if (value.length) {
					var label = state.label.concat();
					var popValue = value.pop();
					label.pop();
					props.onDeselect(popValue);
					this.fireChange(value, label);
				}
				return;
			}
			if (keyCode === KeyCode.DOWN) {
				if (!state.open) {
					this.openIfHasChildren();
					event.preventDefault();
					event.stopPropagation();
					return;
				}
			} else if (keyCode === KeyCode.ESC) {
				if (state.open) {
					this.setOpenState(false);
					event.preventDefault();
					event.stopPropagation();
				}
				return;
			}

			if (state.open) {
				var menu = this.refs.trigger.getInnerMenu();
				if (menu && menu.onKeyDown(event)) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		},
		onMenuSelect: function onMenuSelect(_ref3) {
			var item = _ref3.item;

			var value = this.state.value;
			var label = this.state.label;
			var props = this.props;
			var selectedValue = getValuePropValue(item);
			var selectedLabel = this.getLabelFromOption(item);
			props.onSelect(selectedValue, item);
			if (isMultipleOrTags(props)) {
				if (value.indexOf(selectedValue) !== -1) {
					return;
				}
				value = value.concat([selectedValue]);
				label = label.concat([selectedLabel]);
			} else {
				if (value[0] === selectedValue) {
					this.setOpenState(false);
					return;
				}
				value = [selectedValue];
				label = [selectedLabel];
				this.setOpenState(false);
			}
			this.fireChange(value, label);
			this.setState({
				inputValue: ''
			});
			if (isCombobox(props)) {
				this.setState({
					inputValue: getPropValue(item, props.optionLabelProp)
				});
			}
		},
		onMenuDeselect: function onMenuDeselect(_ref4) {
			var item = _ref4.item;
			var domEvent = _ref4.domEvent;

			if (domEvent.type === 'click') {
				this.removeSelected(getValuePropValue(item));
			}
			if (!isMultipleOrTags(this.props)) {
				this.setOpenState(false);
			}
			this.setState({
				inputValue: ''
			});
		},
		onPlaceholderClick: function onPlaceholderClick() {
			this.getInputDOMNode().focus();
		},
		onClearSelection: function onClearSelection(event) {
			var props = this.props;
			var state = this.state;
			if (props.disabled) {
				return;
			}
			event.stopPropagation();
			if (state.inputValue || state.value.length) {
				this.fireChange([], []);
				this.setOpenState(false);
				this.setState({
					inputValue: ''
				});
			}
		},
		getLabelBySingleValue: function getLabelBySingleValue(children, value) {
			var _this5 = this;

			if (value === undefined) {
				return null;
			}
			var label = null;
			React.Children.forEach(children, function (child) {
				if (child.type === OptGroup) {
					var maybe = _this5.getLabelBySingleValue(child.props.children, value);
					if (maybe !== null) {
						label = maybe;
					}
				} else if (getValuePropValue(child) === value) {
					label = _this5.getLabelFromOption(child);
				}
			});
			return label;
		},
		getLabelFromOption: function getLabelFromOption(child) {
			return getPropValue(child, this.props.optionLabelProp);
		},
		getLabelFromProps: function getLabelFromProps(props, value, init) {
			var label = [];
			if ('label' in props) {
				label = toArray(props.label);
			} else if (init && 'defaultLabel' in props) {
				label = toArray(props.defaultLabel);
			} else {
				label = this.getLabelByValue(props.children, value);
			}
			return label;
		},
		getVLForOnChange: function getVLForOnChange(vls) {
			if (vls !== undefined) {
				return isMultipleOrTags(this.props) ? vls : vls[0];
			}
			return vls;
		},
		getLabelByValue: function getLabelByValue(children, values) {
			var _this6 = this;

			return values.map(function (value) {
				var label = _this6.getLabelBySingleValue(children, value);
				if (label === null) {
					return value;
				}
				return label;
			});
		},
		getDropdownContainer: function getDropdownContainer() {
			if (!this.dropdownContainer) {
				this.dropdownContainer = document.createElement('div');
				document.body.appendChild(this.dropdownContainer);
			}
			return this.dropdownContainer;
		},
		getSearchPlaceholderElement: function getSearchPlaceholderElement(hidden) {
			var props = this.props;
			if (props.searchPlaceholder) {
				return React.createElement(
					'span',
					{
						style: { display: hidden ? 'none' : 'block' },
						onClick: this.onPlaceholderClick,
						className: props.prefixCls + '-search__field__placeholder' },
					props.searchPlaceholder
				);
			}
			return null;
		},
		getInputElement: function getInputElement() {
			var props = this.props;
			return React.createElement(
				'span',
				{ className: props.prefixCls + '-search__field__wrap' },
				React.createElement('input', { ref: this.saveInputRef,
					onChange: this.onInputChange,
					onKeyDown: this.onInputKeyDown,
					value: this.state.inputValue,
					disabled: props.disabled,
					className: props.prefixCls + '-search__field',
					role: 'textbox' }),
				isMultipleOrTags(props) ? null : this.getSearchPlaceholderElement(!!this.state.inputValue)
			);
		},
		getInputDOMNode: function getInputDOMNode() {
			return this.inputInstance;
		},
		getPopupDOMNode: function getPopupDOMNode() {
			return this.refs.trigger.getPopupDOMNode();
		},
		getPopupMenuComponent: function getPopupMenuComponent() {
			return this.refs.trigger.getInnerMenu();
		},
		setOpenState: function setOpenState(open) {
			var _this7 = this;

			var props = this.props;
			var refs = this.refs;

			this.setState({
				open: open
			}, function () {
				if (open || isMultipleOrTagsOrCombobox(props)) {
					if (_this7.getInputDOMNode()) {
						_this7.getInputDOMNode().focus();
					}
				} else if (refs.selection) {
					refs.selection.focus();
				}
			});
		},
		removeSelected: function removeSelected(selectedValue) {
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var label = this.state.label.concat();
			var index = this.state.value.indexOf(selectedValue);
			var value = this.state.value.filter(function (singleValue) {
				return singleValue !== selectedValue;
			});
			if (index !== -1) {
				label.splice(index, 1);
			}
			var canMultiple = isMultipleOrTags(props);
			if (canMultiple) {
				props.onDeselect(selectedValue);
			}
			this.fireChange(value, label);
		},
		openIfHasChildren: function openIfHasChildren() {
			var props = this.props;
			if (React.Children.count(props.children) || isSingleMode(props)) {
				this.setOpenState(true);
			}
		},
		fireChange: function fireChange(value, label) {
			var props = this.props;
			if (!('value' in props)) {
				this.setState({
					value: value, label: label
				});
			}
			props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label));
		},
		renderTopControlNode: function renderTopControlNode() {
			var _this8 = this;

			var _state = this.state;
			var value = _state.value;
			var label = _state.label;

			var props = this.props;
			var choiceTransitionName = props.choiceTransitionName;
			var prefixCls = props.prefixCls;
			var maxTagTextLength = props.maxTagTextLength;
			// single and not combobox, input is inside dropdown

			if (isSingleMode(props)) {
				var innerNode = React.createElement(
					'span',
					{ key: 'placeholder',
						className: prefixCls + '-selection__placeholder' },
					props.placeholder
				);
				if (label.length) {
					innerNode = React.createElement(
						'span',
						{ key: 'value' },
						label[0]
					);
				}
				return React.createElement(
					'span',
					{ className: prefixCls + '-selection__rendered' },
					innerNode
				);
			}

			var selectedValueNodes = [];
			if (isMultipleOrTags(props)) {
				selectedValueNodes = value.map(function (singleValue, index) {
					var content = label[index];
					var title = content;
					if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
						content = content.slice(0, maxTagTextLength) + '...';
					}
					return React.createElement(
						'li',
						{ className: prefixCls + '-selection__choice',
							key: singleValue,
							title: title },
						React.createElement(
							'span',
							{ className: prefixCls + '-selection__choice__content' },
							content
						),
						React.createElement('span', { className: prefixCls + '-selection__choice__remove',
							onClick: _this8.removeSelected.bind(_this8, singleValue) })
					);
				});
			}
			selectedValueNodes.push(React.createElement(
				'li',
				{ className: prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
				this.getInputElement()
			));
			var className = prefixCls + '-selection__rendered';
			if (isMultipleOrTags(props) && choiceTransitionName) {
				return React.createElement(
					Animate,
					{ className: className,
						component: 'ul',
						transitionName: choiceTransitionName },
					selectedValueNodes
				);
			}
			return React.createElement(
				'ul',
				{ className: className },
				selectedValueNodes
			);
		},
		render: function render() {
			var _rootCls;

			var props = this.props;
			var multiple = isMultipleOrTags(props);
			var state = this.state;
			var className = props.className;
			var disabled = props.disabled;
			var allowClear = props.allowClear;
			var prefixCls = props.prefixCls;

			var ctrlNode = this.renderTopControlNode();
			var extraSelectionProps = {};
			var open = this.state.open;

			var options = [];
			if (open) {
				options = this.renderFilterOptions();
			}
			if (open && (isMultipleOrTagsOrCombobox(props) || !props.showSearch) && !options.length) {
				open = false;
			}
			if (!isCombobox(props)) {
				extraSelectionProps = {
					onKeyDown: this.onKeyDown,
					tabIndex: 0
				};
			}
			var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', open), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _rootCls);

			var clear = React.createElement('span', { key: 'clear',
				className: prefixCls + '-selection__clear',
				onClick: this.onClearSelection });
			return React.createElement(
				SelectTrigger,
				_extends({}, props, {
					options: options,
					multiple: multiple,
					disabled: disabled,
					visible: open,
					inputValue: state.inputValue,
					inputElement: this.getInputElement(),
					value: state.value,
					onDropdownVisibleChange: this.onDropdownVisibleChange,
					onMenuSelect: this.onMenuSelect,
					onMenuDeselect: this.onMenuDeselect,
					ref: 'trigger' }),
				React.createElement(
					'span',
					{
						style: props.style,
						className: classnames(rootCls) },
					React.createElement(
						'span',
						_extends({ ref: 'selection',
							key: 'selection',
							className: prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
							role: 'combobox',
							'aria-autocomplete': 'list',
							'aria-haspopup': 'true',
							'aria-expanded': open
						}, extraSelectionProps),
						ctrlNode,
						allowClear && !isMultipleOrTags(props) ? clear : null,
						multiple || !props.showArrow ? null : React.createElement(
							'span',
							{ key: 'arrow', className: prefixCls + '-arrow', tabIndex: '-1', style: { outline: 'none' } },
							React.createElement('b', null)
						),
						multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null
					)
				)
			);
		}
	});
	Select.Option = Option;
	Select.OptGroup = OptGroup;
	RC.Select = Select;
})(Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;

	var Switch = React.createClass({
		displayName: 'Switch',

		propTypes: {
			className: React.PropTypes.string,
			prefixCls: React.PropTypes.string,
			disabled: React.PropTypes.bool,
			style: React.PropTypes.object,
			checkedChildren: React.PropTypes.any,
			unCheckedChildren: React.PropTypes.any,
			onChange: React.PropTypes.func
		},
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-switch',
				style: {},
				checkedChildren: null,
				unCheckedChildren: null,
				className: '',
				defaultChecked: false,
				onChange: noop
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var checked = false;
			if ('checked' in props) {
				checked = !!props.checked;
			} else {
				checked = !!props.defaultChecked;
			}
			return {
				checked: checked
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('checked' in nextProps) {
				this.setState({
					checked: !!nextProps.checked
				});
			}
		},
		toggle: function toggle() {
			var checked = !this.state.checked;
			this.setState({
				checked: checked
			});
			this.props.onChange(checked);
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var className = _props.className;
			var prefixCls = _props.prefixCls;
			var disabled = _props.disabled;
			var style = _props.style;
			var checkedChildren = _props.checkedChildren;
			var unCheckedChildren = _props.unCheckedChildren;

			var checked = this.state.checked;
			var switchClassName = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _classNames));
			return React.createElement(
				'span',
				{ className: switchClassName,
					onClick: disabled ? noop : this.toggle,
					style: style },
				React.createElement(
					'span',
					{ className: prefixCls + '-inner' },
					checked ? checkedChildren : unCheckedChildren
				)
			);
		}
	});

	RC.Switch = Switch;
})(Smart.RC);
'use strict';

+(function (RC) {
	var _ref = _;
	var assign = _ref.assign;

	var defaultProps = {
		strokeWidth: 1,
		strokeColor: '#3FC7FA',
		trailWidth: 1,
		trailColor: '#D9D9D9'
	};

	var Line = React.createClass({
		displayName: 'Line',
		render: function render() {
			var props = assign({}, this.props);
			var pathStyle = {
				'strokeDasharray': '100px, 100px',
				'strokeDashoffset': 100 - props.percent + 'px',
				'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s linear'
			};

			['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach(function (item) {
				if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
					props.trailWidth = props.strokeWidth;
					return;
				}
				if (item === 'strokeWidth' && props.strokeWidth && (!parseFloat(props.strokeWidth) || parseFloat(props.strokeWidth) > 100 || parseFloat(props.strokeWidth) < 0)) {
					props[item] = defaultProps[item];
					return;
				}
				if (!props[item]) {
					props[item] = defaultProps[item];
				}
			});

			var strokeWidth = props.strokeWidth;
			var center = strokeWidth / 2;
			var right = 100 - strokeWidth / 2;
			var pathString = 'M ' + center + ',' + center + ' L ' + right + ',' + center;
			var viewBoxString = '0 0 100 ' + strokeWidth;

			return React.createElement(
				'svg',
				{ className: 'rc-progress-line', viewBox: viewBoxString, preserveAspectRatio: 'none' },
				React.createElement('path', { className: 'rc-progress-line-trail', d: pathString, strokeLinecap: 'round',
					stroke: props.trailColor, strokeWidth: props.trailWidth, fillOpacity: '0' }),
				React.createElement('path', { className: 'rc-progress-line-path', d: pathString, strokeLinecap: 'round',
					stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
			);
		}
	});

	var Circle = React.createClass({
		displayName: 'Circle',
		render: function render() {
			var props = assign({}, this.props);
			var strokeWidth = props.strokeWidth;
			var radius = 50 - strokeWidth / 2;
			var pathString = 'M 50,50 m 0,-' + radius + '\n\t     a ' + radius + ',' + radius + ' 0 1 1 0,' + 2 * radius + '\n\t     a ' + radius + ',' + radius + ' 0 1 1 0,-' + 2 * radius;
			var len = Math.PI * 2 * radius;
			var pathStyle = {
				'strokeDasharray': len + 'px ' + len + 'px',
				'strokeDashoffset': (100 - props.percent) / 100 * len + 'px',
				'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
			};
			['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach(function (item) {
				if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
					props.trailWidth = props.strokeWidth;
					return;
				}
				if (!props[item]) {
					props[item] = defaultProps[item];
				}
			});

			return React.createElement(
				'svg',
				{ className: 'rc-progress-circle', viewBox: '0 0 100 100' },
				React.createElement('path', { className: 'rc-progress-circle-trail', d: pathString, stroke: props.trailColor,
					strokeWidth: props.trailWidth, fillOpacity: '0' }),
				React.createElement('path', { className: 'rc-progress-circle-path', d: pathString, strokeLinecap: 'round',
					stroke: props.strokeColor, strokeWidth: props.strokeWidth, fillOpacity: '0', style: pathStyle })
			);
		}
	});

	RC.Progress = {
		Line: Line,
		Circle: Circle
	};
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (RC) {
  var _ref = _;
  var noop = _ref.noop;
  var Trigger = RC.Trigger;
  var _React = React;
  var PropTypes = _React.PropTypes;

  var autoAdjustOverflow = {
    adjustX: 1,
    adjustY: 1
  };

  var targetOffset = [0, 0];

  var placements = {
    left: {
      points: ['cr', 'cl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    },
    right: {
      points: ['cl', 'cr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    top: {
      points: ['bc', 'tc'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    bottom: {
      points: ['tc', 'bc'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    topLeft: {
      points: ['bl', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    leftTop: {
      points: ['tr', 'tl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    },
    topRight: {
      points: ['br', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [0, -3],
      targetOffset: targetOffset
    },
    rightTop: {
      points: ['tl', 'tr'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    bottomRight: {
      points: ['tr', 'br'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    rightBottom: {
      points: ['bl', 'br'],
      overflow: autoAdjustOverflow,
      offset: [3, 0],
      targetOffset: targetOffset
    },
    bottomLeft: {
      points: ['tl', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [0, 3],
      targetOffset: targetOffset
    },
    leftBottom: {
      points: ['br', 'bl'],
      overflow: autoAdjustOverflow,
      offset: [-3, 0],
      targetOffset: targetOffset
    }
  };

  var Tooltip = React.createClass({
    displayName: 'Tooltip',

    propTypes: {
      trigger: PropTypes.any,
      children: PropTypes.any,
      defaultVisible: PropTypes.bool,
      visible: PropTypes.bool,
      placement: PropTypes.string,
      transitionName: PropTypes.string,
      animation: PropTypes.any,
      onVisibleChange: PropTypes.func,
      afterVisibleChange: PropTypes.func,
      overlay: PropTypes.node.isRequired,
      overlayStyle: PropTypes.object,
      overlayClassName: PropTypes.string,
      prefixCls: PropTypes.string,
      mouseEnterDelay: PropTypes.number,
      mouseLeaveDelay: PropTypes.number,
      getTooltipContainer: PropTypes.func,
      destroyTooltipOnHide: PropTypes.bool,
      align: PropTypes.shape({
        offset: PropTypes.array,
        targetOffset: PropTypes.array
      }),
      arrowContent: PropTypes.any
    },

    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'rc-tooltip',
        mouseEnterDelay: 0,
        destroyTooltipOnHide: false,
        mouseLeaveDelay: 0.1,
        align: {},
        placement: 'right',
        trigger: ['hover'],
        arrowContent: null
      };
    },
    getPopupElement: function getPopupElement() {
      var _props = this.props;
      var arrowContent = _props.arrowContent;
      var overlay = _props.overlay;
      var prefixCls = _props.prefixCls;

      return [React.createElement(
        'div',
        { className: prefixCls + '-arrow', key: 'arrow' },
        arrowContent
      ), React.createElement(
        'div',
        { className: prefixCls + '-inner', key: 'content' },
        overlay
      )];
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.refs.trigger.popupDomNode;
    },
    render: function render() {
      var _props2 = this.props;
      var overlayClassName = _props2.overlayClassName;
      var trigger = _props2.trigger;
      var mouseEnterDelay = _props2.mouseEnterDelay;
      var mouseLeaveDelay = _props2.mouseLeaveDelay;
      var overlayStyle = _props2.overlayStyle;
      var prefixCls = _props2.prefixCls;
      var children = _props2.children;
      var onVisibleChange = _props2.onVisibleChange;
      var transitionName = _props2.transitionName;
      var animation = _props2.animation;
      var placement = _props2.placement;
      var align = _props2.align;
      var destroyTooltipOnHide = _props2.destroyTooltipOnHide;
      var defaultVisible = _props2.defaultVisible;
      var getTooltipContainer = _props2.getTooltipContainer;

      var restProps = _objectWithoutProperties(_props2, ['overlayClassName', 'trigger', 'mouseEnterDelay', 'mouseLeaveDelay', 'overlayStyle', 'prefixCls', 'children', 'onVisibleChange', 'transitionName', 'animation', 'placement', 'align', 'destroyTooltipOnHide', 'defaultVisible', 'getTooltipContainer']);

      var extraProps = _extends({}, restProps);
      if ('visible' in this.props) {
        extraProps.popupVisible = this.props.visible;
      }
      return React.createElement(
        Trigger,
        _extends({ popupClassName: overlayClassName,
          ref: 'trigger',
          prefixCls: prefixCls,
          popup: this.getPopupElement(),
          action: trigger,
          builtinPlacements: placements,
          popupPlacement: placement,
          popupAlign: align,
          getPopupContainer: getTooltipContainer,
          onPopupVisibleChange: onVisibleChange,
          popupTransitionName: transitionName,
          popupAnimation: animation,
          defaultPopupVisible: defaultVisible,
          destroyPopupOnHide: destroyTooltipOnHide,
          mouseLeaveDelay: mouseLeaveDelay,
          popupStyle: overlayStyle,
          mouseEnterDelay: mouseEnterDelay
        }, extraProps),
        children
      );
    }
  });

  RC.Tooltip = Tooltip;
})(Smart.RC);
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
  var _ref = _;
  var noop = _ref.noop;var Align = RC.Align;
  var Animate = RC.Animate;
  var DOMWrap = RC.DOMWrap;
  var Util = RC.Util;var KeyCode = Util.KeyCode;var _React = React;
  var PropTypes = _React.PropTypes;

  function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        ret = d.body[method];
      }
    }
    return ret;
  }

  function setTransformOrigin(node, value) {
    var style = node.style;
    ['Webkit', 'Moz', 'Ms', 'ms'].forEach(function (prefix) {
      style[prefix + 'TransformOrigin'] = value;
    });
    style['transformOrigin'] = value;
  }

  function offset(el) {
    var rect = el.getBoundingClientRect();
    var pos = {
      left: rect.left,
      top: rect.top
    };
    var doc = el.ownerDocument;
    var w = doc.defaultView || doc.parentWindow;
    pos.left += getScroll(w);
    pos.top += getScroll(w, 1);
    return pos;
  }

  var Dialog = React.createClass({
    displayName: 'Dialog',

    propTypes: {
      onAfterClose: PropTypes.func,
      onClose: PropTypes.func,
      closable: PropTypes.bool,
      visible: PropTypes.bool,
      mousePosition: PropTypes.object
    },

    getDefaultProps: function getDefaultProps() {
      return {
        onAfterClose: noop,
        onClose: noop
      };
    },
    componentDidMount: function componentDidMount() {
      this.componentDidUpdate({});
    },
    componentDidUpdate: function componentDidUpdate(prevProps) {
      var props = this.props;
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
    onAnimateLeave: function onAnimateLeave() {
      this.props.onAfterClose();
    },
    onMaskClick: function onMaskClick(e) {
      if (this.props.closable) {
        this.close(e);
      }
      ReactDOM.findDOMNode(this.refs.dialog).focus();
    },
    onKeyDown: function onKeyDown(e) {
      var props = this.props;
      if (props.closable) {
        if (e.keyCode === KeyCode.ESC) {
          this.close(e);
        }
      }
      // keep focus inside dialog
      if (props.visible) {
        if (e.keyCode === KeyCode.TAB) {
          var activeElement = document.activeElement;
          var dialogRoot = ReactDOM.findDOMNode(this.refs.dialog);
          var sentinel = this.refs.sentinel;
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
    onAlign: function onAlign(dialogNode) {
      var mousePosition = this.props.mousePosition;
      if (this.props.visible) {
        if (mousePosition) {
          var elOffset = offset(dialogNode);
          setTransformOrigin(dialogNode, mousePosition.x - elOffset.left + 'px ' + (mousePosition.y - elOffset.top) + 'px');
        } else {
          setTransformOrigin(dialogNode, '');
        }
      }
    },
    getDialogElement: function getDialogElement() {
      var props = this.props;
      var closable = props.closable;
      var prefixCls = props.prefixCls;
      var dest = {};
      if (props.width !== undefined) {
        dest.width = props.width;
      }
      if (props.height !== undefined) {
        dest.height = props.height;
      }
      if (props.zIndex !== undefined) {
        dest.zIndex = props.zIndex;
      }

      var footer = undefined;
      if (props.footer) {
        footer = React.createElement(
          'div',
          { className: prefixCls + '-footer' },
          props.footer
        );
      }

      var header = undefined;
      if (props.title) {
        header = React.createElement(
          'div',
          { className: prefixCls + '-header' },
          React.createElement(
            'div',
            { className: prefixCls + '-title' },
            props.title
          )
        );
      }

      var closer = undefined;
      if (closable) {
        closer = React.createElement(
          'a',
          { tabIndex: '0', onClick: this.close, className: prefixCls + '-close' },
          React.createElement('span', { className: prefixCls + '-close-x' })
        );
      }

      var style = _extends({}, props.style, dest);
      var dialogProps = {
        className: [props.prefixCls, props.className].join(' '),
        tabIndex: '0',
        role: 'dialog',
        ref: 'dialog',
        style: style,
        onKeyDown: this.onKeyDown
      };
      var transitionName = this.getTransitionName();
      var dialogElement = React.createElement(
        DOMWrap,
        _extends({}, dialogProps, {
          hiddenClassName: prefixCls + '-hidden' }),
        React.createElement(
          'div',
          { className: prefixCls + '-content' },
          closer,
          header,
          React.createElement(
            'div',
            { className: prefixCls + '-body' },
            props.children
          ),
          footer
        ),
        React.createElement(
          'div',
          { tabIndex: '0', ref: 'sentinel', style: { width: 0, height: 0, overflow: 'hidden' } },
          'sentinel'
        )
      );
      // add key for align to keep animate children stable
      return React.createElement(
        Animate,
        { key: 'dialog',
          showProp: 'dialogVisible',
          onLeave: this.onAnimateLeave,
          transitionName: transitionName,
          component: '',
          transitionAppear: true },
        React.createElement(
          Align,
          { align: props.align,
            key: 'dialog',
            onAlign: this.onAlign,
            dialogVisible: props.visible,
            childrenProps: {
              visible: 'dialogVisible'
            },
            monitorBufferTime: 80,
            monitorWindowResize: true,
            disabled: !props.visible },
          dialogElement
        )
      );
    },
    getMaskElement: function getMaskElement() {
      var props = this.props;
      var maskProps = {
        onClick: this.onMaskClick
      };

      if (props.zIndex) {
        maskProps.style = { zIndex: props.zIndex };
      }
      var maskElement = undefined;
      if (props.mask) {
        var maskTransition = this.getMaskTransitionName();
        maskElement = React.createElement(DOMWrap, _extends({}, maskProps, { key: 'mask',
          className: props.prefixCls + '-mask',
          visible: props.visible,
          hiddenClassName: props.prefixCls + '-mask-hidden' }));
        if (maskTransition) {
          maskElement = React.createElement(
            Animate,
            { key: 'mask', showProp: 'visible',
              transitionAppear: true, component: '',
              transitionName: maskTransition },
            maskElement
          );
        }
      }
      return maskElement;
    },
    getMaskTransitionName: function getMaskTransitionName() {
      var props = this.props;
      var transitionName = props.maskTransitionName;
      var animation = props.maskAnimation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    getTransitionName: function getTransitionName() {
      var props = this.props;
      var transitionName = props.transitionName;
      var animation = props.animation;
      if (!transitionName && animation) {
        transitionName = props.prefixCls + '-' + animation;
      }
      return transitionName;
    },
    close: function close(e) {
      this.props.onClose(e);
    },
    render: function render() {
      var props = this.props;
      var prefixCls = props.prefixCls;
      var className = _defineProperty({}, prefixCls + '-wrap', 1);

      return React.createElement(
        'div',
        { className: classNames(className) },
        [this.getMaskElement(), this.getDialogElement()]
      );
    }
  });

  function copy(obj, fields) {
    var ret = {};
    fields.forEach(function (f) {
      if (obj[f] !== undefined) {
        ret[f] = obj[f];
      }
    });
    return ret;
  }

  var DialogWrap = (function (_React$Component) {
    _inherits(DialogWrap, _React$Component);

    function DialogWrap(props) {
      _classCallCheck(this, DialogWrap);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DialogWrap).call(this, props));

      _this.state = {
        visible: props.visible
      };
      ['onClose', 'cleanDialogContainer'].forEach(function (m) {
        _this[m] = _this[m].bind(_this);
      });
      return _this;
    }

    _createClass(DialogWrap, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.componentDidUpdate();
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(props) {
        if ('visible' in props) {
          this.setState({
            visible: props.visible
          });
        }
      }
    }, {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !!(this.state.visible || nextState.visible);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        if (this.dialogRendered) {
          ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement(), this.getDialogContainer());
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.dialogContainer) {
          if (this.state.visible) {
            ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDialogElement({
              onAfterClose: this.cleanDialogContainer,
              onClose: noop,
              visible: false
            }), this.dialogContainer);
          } else {
            this.cleanDialogContainer();
          }
        }
      }
    }, {
      key: 'onClose',
      value: function onClose(e) {
        this.props.onClose(e);
      }
    }, {
      key: 'getDialogContainer',
      value: function getDialogContainer() {
        if (!this.dialogContainer) {
          this.dialogContainer = document.createElement('div');
          this.dialogContainer.className = this.props.prefixCls + '-container';
          document.body.appendChild(this.dialogContainer);
        }
        return this.dialogContainer;
      }
    }, {
      key: 'getDialogElement',
      value: function getDialogElement(extra) {
        var props = this.props;
        var dialogProps = copy(props, ['className', 'closable', 'align', 'title', 'footer', 'mask', 'animation', 'transitionName', 'maskAnimation', 'maskTransitionName', 'mousePosition', 'prefixCls', 'style', 'width', 'height', 'zIndex']);
        dialogProps = _extends({}, dialogProps, {
          onClose: this.onClose,
          visible: this.state.visible
        }, extra);
        return React.createElement(
          Dialog,
          _extends({}, dialogProps, { key: 'dialog' }),
          props.children
        );
      }
    }, {
      key: 'cleanDialogContainer',
      value: function cleanDialogContainer() {
        ReactDOM.unmountComponentAtNode(this.getDialogContainer());
        document.body.removeChild(this.dialogContainer);
        this.dialogContainer = null;
      }
    }, {
      key: 'render',
      value: function render() {
        this.dialogRendered = this.dialogRendered || this.state.visible;
        return null;
      }
    }]);

    return DialogWrap;
  })(React.Component);

  DialogWrap.defaultProps = {
    className: '',
    align: {
      points: ['tc', 'tc'],
      offset: [0, 100]
    },
    mask: true,
    closable: true,
    prefixCls: 'rc-dialog',
    onClose: noop
  };

  DialogWrap.propTypes = {
    className: React.PropTypes.string,
    align: React.PropTypes.shape({
      align: React.PropTypes.array,
      offset: React.PropTypes.arrayOf(React.PropTypes.number)
    }),
    mask: React.PropTypes.bool,
    closable: React.PropTypes.bool,
    prefixCls: React.PropTypes.string,
    visible: React.PropTypes.bool,
    onClose: React.PropTypes.func
  };
  RC.Dialog = DialogWrap;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;var Animate = RC.Animate;
	var Util = RC.Util;var KeyCode = Util.KeyCode;
	var offset = Util.offset;var _React = React;
	var PropTypes = _React.PropTypes;

	var tabBarExtraContentStyle = {
		float: 'right'
	};

	function _componentDidUpdate(component) {
		var refs = component.refs;
		var containerNode = refs.nav;
		var containerOffset = offset(containerNode);
		var inkBarNode = refs.inkBar;
		var activeTab = refs.activeTab;
		var tabPosition = component.props.tabPosition;
		if (activeTab) {
			var tabNode = activeTab;
			var tabOffset = offset(tabNode);
			if (tabPosition === 'top' || tabPosition === 'bottom') {
				var left = tabOffset.left - containerOffset.left;
				inkBarNode.style.left = left + 'px';
				inkBarNode.style.top = '';
				inkBarNode.style.bottom = '';
				inkBarNode.style.right = containerNode.offsetWidth - left - tabNode.offsetWidth + 'px';
			} else {
				var top = tabOffset.top - containerOffset.top;
				inkBarNode.style.left = '';
				inkBarNode.style.right = '';
				inkBarNode.style.top = top + 'px';
				inkBarNode.style.bottom = containerNode.offsetHeight - top - tabNode.offsetHeight + 'px';
			}
		}
		inkBarNode.style.display = activeTab ? 'block' : 'none';
	}

	var InkBarMixin = {
		componentDidUpdate: function componentDidUpdate() {
			_componentDidUpdate(this);
		},
		componentDidMount: function componentDidMount() {
			_componentDidUpdate(this);
		}
	};

	var TabPane = React.createClass({
		displayName: 'TabPane',

		propTypes: {
			onDestroy: React.PropTypes.func
		},

		componentWillUnmount: function componentWillUnmount() {
			if (this.props.onDestroy) {
				this.props.onDestroy();
			}
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.rootPrefixCls + '-tabpane';
			var cls = props.active ? '' : prefixCls + '-hidden';
			cls += ' ' + prefixCls;
			return React.createElement(
				'div',
				{ className: cls },
				props.children
			);
		}
	});

	var Nav = React.createClass({
		displayName: 'Nav',

		propTypes: {
			tabPosition: PropTypes.string,
			tabBarExtraContent: PropTypes.any,
			onTabClick: PropTypes.func
		},

		mixins: [InkBarMixin],

		getInitialState: function getInitialState() {
			return {
				next: false,
				offset: 0,
				prev: false
			};
		},
		componentDidMount: function componentDidMount() {
			this.componentDidUpdate();
		},
		componentDidUpdate: function componentDidUpdate(prevProps) {
			var props = this.props;
			if (prevProps && prevProps.tabPosition !== props.tabPosition) {
				this.setOffset(0);
				return;
			}
			var navNode = this.refs.nav;
			var navNodeWH = this.getOffsetWH(navNode);
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			var minOffset = navWrapNodeWH - navNodeWH;
			var _state = this.state;
			var next = _state.next;
			var prev = _state.prev;

			if (minOffset >= 0) {
				next = false;
				this.setOffset(0);
				offset = 0;
			} else if (minOffset < offset) {
				next = true;
			} else {
				next = false;
				this.setOffset(minOffset);
				offset = minOffset;
			}

			if (offset < 0) {
				prev = true;
			} else {
				prev = false;
			}

			this.setNext(next);
			this.setPrev(prev);

			var nextPrev = { next: next, prev: prev };
			// wait next,prev show hide
			if (this.isNextPrevShown(state) !== this.isNextPrevShown(nextPrev)) {
				this.setNextPrev({}, this.scrollToActiveTab);
			} else {
				// can not use props.activeKey
				if (!prevProps || props.activeKey !== prevProps.activeKey) {
					this.scrollToActiveTab();
				}
			}
		},
		onTabClick: function onTabClick(key) {
			this.props.onTabClick(key);
		},

		// work around eslint warning
		setNextPrev: function setNextPrev(nextPrev, callback) {
			this.setState(nextPrev, callback);
		},
		getTabs: function getTabs() {
			var _this = this;

			var props = this.props;
			var children = props.panels;
			var activeKey = props.activeKey;
			var rst = [];
			var prefixCls = props.prefixCls;

			React.Children.forEach(children, function (child) {
				var key = child.key;
				var cls = activeKey === key ? prefixCls + '-tab-active' : '';
				cls += ' ' + prefixCls + '-tab';
				var events = {};
				if (child.props.disabled) {
					cls += ' ' + prefixCls + '-tab-disabled';
				} else {
					events = {
						onClick: _this.onTabClick.bind(_this, key)
					};
				}
				var ref = {};
				if (activeKey === key) {
					ref.ref = 'activeTab';
				}
				rst.push(React.createElement(
					'div',
					_extends({}, events, {
						className: cls,
						key: key
					}, ref),
					React.createElement(
						'div',
						{ className: prefixCls + '-tab-inner' },
						child.props.tab
					)
				));
			});

			return rst;
		},
		getOffsetWH: function getOffsetWH(node) {
			var tabPosition = this.props.tabPosition;
			var prop = 'offsetWidth';
			if (tabPosition === 'left' || tabPosition === 'right') {
				prop = 'offsetHeight';
			}
			return node[prop];
		},
		getOffsetLT: function getOffsetLT(node) {
			var tabPosition = this.props.tabPosition;
			var prop = 'left';
			if (tabPosition === 'left' || tabPosition === 'right') {
				prop = 'top';
			}
			return node.getBoundingClientRect()[prop];
		},
		setOffset: function setOffset(offset) {
			var target = Math.min(0, offset);
			if (this.state.offset !== target) {
				this.setState({
					offset: target
				});
			}
		},
		setPrev: function setPrev(v) {
			if (this.state.prev !== v) {
				this.setState({
					prev: v
				});
			}
		},
		setNext: function setNext(v) {
			if (this.state.next !== v) {
				this.setState({
					next: v
				});
			}
		},
		isNextPrevShown: function isNextPrevShown(state) {
			return state.next || state.prev;
		},
		scrollToActiveTab: function scrollToActiveTab() {
			var _refs = this.refs;
			var activeTab = _refs.activeTab;
			var navWrap = _refs.navWrap;

			if (activeTab) {
				var activeTabWH = this.getOffsetWH(activeTab);
				var navWrapNodeWH = this.getOffsetWH(navWrap);
				var _offset = this.state.offset;

				var wrapOffset = this.getOffsetLT(navWrap);
				var activeTabOffset = this.getOffsetLT(activeTab);
				if (wrapOffset > activeTabOffset) {
					_offset += wrapOffset - activeTabOffset;
					this.setState({ offset: _offset });
				} else if (wrapOffset + navWrapNodeWH < activeTabOffset + activeTabWH) {
					_offset -= activeTabOffset + activeTabWH - (wrapOffset + navWrapNodeWH);
					this.setState({ offset: _offset });
				}
			}
		},
		prev: function prev() {
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			this.setOffset(offset + navWrapNodeWH);
		},
		next: function next() {
			var navWrapNode = this.refs.navWrap;
			var navWrapNodeWH = this.getOffsetWH(navWrapNode);
			var state = this.state;
			var offset = state.offset;
			this.setOffset(offset - navWrapNodeWH);
		},
		render: function render() {
			var props = this.props;
			var state = this.state;
			var prefixCls = props.prefixCls;
			var tabs = this.getTabs();
			var tabMovingDirection = props.tabMovingDirection;
			var tabPosition = props.tabPosition;
			var inkBarClass = prefixCls + '-ink-bar';
			if (tabMovingDirection) {
				inkBarClass += ' ' + prefixCls + '-ink-bar-transition-' + tabMovingDirection;
			}
			var nextButton = undefined;
			var prevButton = undefined;

			var showNextPrev = state.prev || state.next;

			if (showNextPrev) {
				var _cx, _cx2;

				prevButton = React.createElement(
					'span',
					{
						onClick: state.prev ? this.prev : noop,
						unselectable: 'unselectable',
						className: cx((_cx = {}, _defineProperty(_cx, prefixCls + '-tab-prev', 1), _defineProperty(_cx, prefixCls + '-tab-btn-disabled', !state.prev), _cx)) },
					React.createElement('span', { className: prefixCls + '-tab-prev-icon' })
				);

				nextButton = React.createElement(
					'span',
					{
						onClick: state.next ? this.next : noop,
						unselectable: 'unselectable',
						className: cx((_cx2 = {}, _defineProperty(_cx2, prefixCls + '-tab-next', 1), _defineProperty(_cx2, prefixCls + '-tab-btn-disabled', !state.next), _cx2)) },
					React.createElement('span', { className: prefixCls + '-tab-next-icon' })
				);
			}

			var navOffset = {};
			if (tabPosition === 'left' || tabPosition === 'right') {
				navOffset = {
					top: state.offset
				};
			} else {
				navOffset = {
					left: state.offset
				};
			}

			var tabBarExtraContent = this.props.tabBarExtraContent;

			return React.createElement(
				'div',
				{ className: prefixCls + '-tabs-bar' },
				tabBarExtraContent ? React.createElement(
					'div',
					{ style: tabBarExtraContentStyle },
					tabBarExtraContent
				) : null,
				React.createElement(
					'div',
					{ className: prefixCls + '-nav-container ' + (showNextPrev ? prefixCls + '-nav-container-scrolling' : ''),
						style: props.style,
						ref: 'container' },
					prevButton,
					nextButton,
					React.createElement(
						'div',
						{ className: prefixCls + '-nav-wrap', ref: 'navWrap' },
						React.createElement(
							'div',
							{ className: prefixCls + '-nav-scroll' },
							React.createElement(
								'div',
								{ className: prefixCls + '-nav', ref: 'nav', style: navOffset },
								React.createElement('div', { className: inkBarClass, ref: 'inkBar' }),
								tabs
							)
						)
					)
				)
			);
		}
	});
	function getDefaultActiveKey(props) {
		var activeKey = undefined;
		React.Children.forEach(props.children, function (child) {
			if (!activeKey && !child.props.disabled) {
				activeKey = child.key;
			}
		});
		return activeKey;
	}

	var Tabs = React.createClass({
		displayName: 'Tabs',

		propTypes: {
			destroyInactiveTabPane: PropTypes.bool,
			onTabClick: PropTypes.func,
			onChange: PropTypes.func,
			children: PropTypes.any,
			tabBarExtraContent: PropTypes.any,
			animation: PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-tabs',
				destroyInactiveTabPane: false,
				tabBarExtraContent: null,
				onChange: noop,
				tabPosition: 'top',
				style: {},
				contentStyle: {},
				navStyle: {},
				onTabClick: noop
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			var activeKey = undefined;
			if ('activeKey' in props) {
				activeKey = props.activeKey;
			} else if ('defaultActiveKey' in props) {
				activeKey = props.defaultActiveKey;
			} else {
				activeKey = getDefaultActiveKey(props);
			}
			// cache panels
			this.renderPanels = {};
			return { activeKey: activeKey };
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			var newActiveKey = this.state.activeKey;
			if ('activeKey' in nextProps) {
				newActiveKey = nextProps.activeKey;
				if (!newActiveKey) {
					this.setState({
						activeKey: newActiveKey
					});
					return;
				}
			}
			var found = undefined;
			React.Children.forEach(nextProps.children, function (child) {
				if (child.key === newActiveKey) {
					found = true;
				}
			});
			if (found) {
				this.setActiveKey(newActiveKey, nextProps);
			} else {
				this.setActiveKey(getDefaultActiveKey(nextProps), nextProps);
			}
		},
		onTabDestroy: function onTabDestroy(key) {
			delete this.renderPanels[key];
		},
		onTabClick: function onTabClick(key) {
			this.setActiveKey(key);
			this.props.onTabClick(key);
			if (this.state.activeKey !== key) {
				this.props.onChange(key);
			}
		},
		onKeyDown: function onKeyDown(e) {
			if (e.target !== ReactDOM.findDOMNode(this)) {
				return;
			}
			var eventKeyCode = e.keyCode;
			switch (eventKeyCode) {
				case KeyCode.RIGHT:
				case KeyCode.DOWN:
					e.preventDefault();
					var nextKey = this.getNextActiveKey(true);
					this.onTabClick(nextKey);
					break;
				case KeyCode.LEFT:
				case KeyCode.UP:
					e.preventDefault();
					var previousKey = this.getNextActiveKey(false);
					this.onTabClick(previousKey);
					break;
				default:
			}
		},
		getNextActiveKey: function getNextActiveKey(next) {
			var activeKey = this.state.activeKey;
			var children = [];
			React.Children.forEach(this.props.children, function (c) {
				if (!c.props.disabled) {
					if (next) {
						children.push(c);
					} else {
						children.unshift(c);
					}
				}
			});
			var length = children.length;
			var ret = length && children[0].key;
			children.forEach(function (child, i) {
				if (child.key === activeKey) {
					if (i === length - 1) {
						ret = children[0].key;
					} else {
						ret = children[i + 1].key;
					}
				}
			});
			return ret;
		},
		getTabPanes: function getTabPanes() {
			var _this2 = this;

			var state = this.state;
			var props = this.props;
			var activeKey = state.activeKey;
			var children = props.children;
			var newChildren = [];
			var renderPanels = this.renderPanels;

			React.Children.forEach(children, function (c) {
				var child = c;
				var key = child.key;
				var active = activeKey === key;
				if (active || renderPanels[key]) {
					child = active ? child : renderPanels[key];
					renderPanels[key] = React.cloneElement(child, {
						active: active,
						onDestroy: _this2.onTabDestroy.bind(_this2, key),
						// eventKey: key,
						rootPrefixCls: props.prefixCls
					});
					newChildren.push(renderPanels[key]);
				} else {
					// do not change owner ...
					// or else will destroy and reinit
					// newChildren.push(<TabPane active={false}
					//  key={key}
					//  eventKey={key}
					//  rootPrefixCls={this.props.prefixCls}></TabPane>);
					// return
					// lazy load
					newChildren.push(React.cloneElement(child, {
						active: false,
						// eventKey: key,
						rootPrefixCls: props.prefixCls
					}, []));
				}
			});

			return newChildren;
		},
		getIndexPair: function getIndexPair(props, currentActiveKey, activeKey) {
			var keys = [];
			React.Children.forEach(props.children, function (c) {
				keys.push(c.key);
			});
			var currentIndex = keys.indexOf(currentActiveKey);
			var nextIndex = keys.indexOf(activeKey);
			return { currentIndex: currentIndex, nextIndex: nextIndex };
		},
		setActiveKey: function setActiveKey(activeKey, ps) {
			var props = ps || this.props;
			var currentActiveKey = this.state.activeKey;
			if (currentActiveKey === activeKey || 'activeKey' in props && props === this.props) {
				return;
			}
			if (!currentActiveKey) {
				this.setState({
					activeKey: activeKey
				});
			} else {
				var _getIndexPair = this.getIndexPair(props, currentActiveKey, activeKey);

				var currentIndex = _getIndexPair.currentIndex;
				var nextIndex = _getIndexPair.nextIndex;
				// removed

				if (currentIndex === -1) {
					var newPair = this.getIndexPair(this.props, currentActiveKey, activeKey);
					currentIndex = newPair.currentIndex;
					nextIndex = newPair.nextIndex;
				}
				var tabMovingDirection = currentIndex > nextIndex ? 'backward' : 'forward';
				this.setState({
					activeKey: activeKey,
					tabMovingDirection: tabMovingDirection
				});
			}
		},
		render: function render() {
			var props = this.props;
			var destroyInactiveTabPane = props.destroyInactiveTabPane;
			var prefixCls = props.prefixCls;
			var tabPosition = props.tabPosition;

			var cls = prefixCls + ' ' + prefixCls + '-' + tabPosition;
			var tabMovingDirection = this.state.tabMovingDirection;
			if (props.className) {
				cls += ' ' + props.className;
			}
			var animation = this.props.animation;
			var tabPanes = this.getTabPanes();
			var transitionName = undefined;
			transitionName = props.transitionName && props.transitionName[tabMovingDirection || 'backward'];
			if (!transitionName && animation) {
				transitionName = prefixCls + '-' + animation + '-' + (tabMovingDirection || 'backward');
			}
			if (destroyInactiveTabPane) {
				tabPanes = tabPanes.filter(function (panel) {
					return panel.props.active;
				});
			}
			if (transitionName) {
				if (destroyInactiveTabPane) {
					tabPanes = React.createElement(
						Animate,
						{ exclusive: true,
							transitionName: transitionName },
						tabPanes
					);
				} else {
					tabPanes = React.createElement(
						Animate,
						{ showProp: 'active',
							exclusive: true,
							transitionName: transitionName },
						tabPanes
					);
				}
			}
			var contents = [React.createElement(Nav, { prefixCls: prefixCls,
				key: 'nav',
				tabBarExtraContent: this.props.tabBarExtraContent,
				tabPosition: tabPosition,
				style: props.navStyle,
				onTabClick: this.onTabClick,
				tabMovingDirection: tabMovingDirection,
				panels: this.props.children,
				activeKey: this.state.activeKey }), React.createElement(
				'div',
				{ className: prefixCls + '-content',
					style: props.contentStyle,
					key: 'content' },
				tabPanes
			)];
			if (tabPosition === 'bottom') {
				contents.reverse();
			}
			return React.createElement(
				'div',
				{ className: cls,
					tabIndex: '0',
					style: props.style,
					onKeyDown: this.onKeyDown },
				contents
			);
		}
	});

	Tabs.TabPane = TabPane;
	RC.Tabs = Tabs;
})(Smart.RC);
'use strict';

+(function (RC) {
	var Util = RC.Util;
	var warning = Util.warning;
	var uid = Util.uid;
	var _React = React;
	var PropTypes = _React.PropTypes;

	var empty = _.noop;

	function getError(option, xhr) {
		var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
		var err = new Error(msg);
		err.status = xhr.status;
		err.method = 'post';
		err.url = option.action;
		return err;
	}

	function getBody(xhr) {
		var text = xhr.responseText || xhr.response;
		if (!text) {
			return text;
		}

		try {
			return JSON.parse(text);
		} catch (e) {
			return text;
		}
	}

	function request(option) {
		if (typeof XMLHttpRequest === 'undefined') {
			return;
		}

		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			xhr.upload.onprogress = function progress(e) {
				if (e.total > 0) {
					e.percent = e.loaded / e.total * 100;
				}
				option.onProgress(e);
			};
		}

		var formData = new FormData();
		formData.append(option.filename, option.file);
		if (option.data) {
			Object.keys(option.data).map(function (key) {
				formData.append(key, option.data[key]);
			});
		}

		xhr.onerror = function error(e) {
			option.onError(e);
		};

		xhr.onload = function onload() {
			if (xhr.status !== 200) {
				return option.onError(getError(option, xhr), getBody(xhr));
			}

			option.onSuccess(getBody(xhr));
		};

		if (option.withCredentials && 'withCredentials' in xhr) {
			xhr.withCredentials = true;
		}

		xhr.open('post', option.action, true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		var headers = option.headers || {};
		for (var h in headers) {
			if (headers.hasOwnProperty(h)) {
				xhr.setRequestHeader(h, headers[h]);
			}
		}
		xhr.send(formData);
	}

	var iframeStyle = {
		position: 'absolute',
		top: 0,
		opacity: 0,
		filter: 'alpha(opacity=0)',
		left: 0,
		zIndex: 9999
	};
	var IframeUploader = React.createClass({
		displayName: 'IframeUploader',

		propTypes: {
			onStart: PropTypes.func,
			multiple: PropTypes.bool,
			children: PropTypes.any,
			data: PropTypes.object,
			action: PropTypes.string,
			name: PropTypes.string
		},

		componentDidMount: function componentDidMount() {
			this.updateIframeWH();
			this.initIframe();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateIframeWH();
		},
		onLoad: function onLoad() {
			if (!this.loading) {
				return;
			}
			var props = this.props;
			var response = undefined;
			var eventFile = this.file;
			try {
				var doc = this.getIframeDocument();
				var script = doc.getElementsByTagName('script')[0];
				if (script && script.parentNode === doc.body) {
					doc.body.removeChild(script);
				}
				response = doc.body.innerHTML;
				props.onSuccess(response, eventFile);
			} catch (err) {
				warning(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
				response = 'cross-domain';
				props.onError(err, null, eventFile);
			}
			this.enableIframe();
			this.initIframe();
		},
		onChange: function onChange() {
			var target = this.getFormInputNode();
			// ie8/9 don't support FileList Object
			// http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
			var file = this.file = {
				uid: uid(),
				name: target.value
			};
			this.props.onStart(this.getFileForMultiple(file));
			var formNode = this.getFormNode();
			var dataSpan = this.getFormDataNode();
			var data = this.props.data;
			if (typeof data === 'function') {
				data = data();
			}
			var inputs = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
				}
			}
			dataSpan.innerHTML = inputs.join('');
			formNode.submit();
			dataSpan.innerHTML = '';
			this.disabledIframe();
		},
		getIframeNode: function getIframeNode() {
			return this.refs.iframe;
		},
		getIframeDocument: function getIframeDocument() {
			return this.getIframeNode().contentDocument;
		},
		getFormNode: function getFormNode() {
			return this.getIframeDocument().getElementById('form');
		},
		getFormInputNode: function getFormInputNode() {
			return this.getIframeDocument().getElementById('input');
		},
		getFormDataNode: function getFormDataNode() {
			return this.getIframeDocument().getElementById('data');
		},
		getFileForMultiple: function getFileForMultiple(file) {
			return this.props.multiple ? [file] : file;
		},
		getIframeHTML: function getIframeHTML(domain) {
			var domainScript = '';
			var domainInput = '';
			if (domain) {
				domainScript = '<script>document.domain="' + domain + '";</script>';
				domainInput = '<input name="_documentDomain" value="' + domain + '" />';
			}
			return '\n\t    <!DOCTYPE html>\n\t    <html>\n\t    <head>\n\t    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t    <style>\n\t    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n\t    </style>\n\t    ' + domainScript + '\n\t    </head>\n\t    <body>\n\t    <form method="post"\n\t    encType="multipart/form-data"\n\t    action="' + this.props.action + '" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">\n\t    <input id="input" type="file"\n\t     name="' + this.props.name + '"\n\t     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>\n\t    ' + domainInput + '\n\t    <span id="data"></span>\n\t    </form>\n\t    </body>\n\t    </html>\n\t    ';
		},
		initIframeSrc: function initIframeSrc() {
			if (this.domain) {
				this.getIframeNode().src = 'javascript:void((function(){\n\t        var d = document;\n\t        d.open();\n\t        d.domain=\'' + this.domain + '\';\n\t        d.write(\'\');\n\t        d.close();\n\t      })())';
			}
		},
		initIframe: function initIframe() {
			var iframeNode = this.getIframeNode();
			var win = iframeNode.contentWindow;
			var doc = undefined;
			this.domain = this.domain || '';
			this.initIframeSrc();
			try {
				doc = win.document;
			} catch (e) {
				this.domain = document.domain;
				this.initIframeSrc();
				win = iframeNode.contentWindow;
				doc = win.document;
			}
			doc.open('text/html', 'replace');
			doc.write(this.getIframeHTML(this.domain));
			doc.close();
			this.getFormInputNode().onchange = this.onChange;
		},
		enableIframe: function enableIframe() {
			this.loading = false;
			this.getIframeNode().style.display = '';
		},
		disabledIframe: function disabledIframe() {
			this.loading = true;
			this.getIframeNode().style.display = 'none';
		},
		updateIframeWH: function updateIframeWH() {
			var rootNode = ReactDOM.findDOMNode(this);
			var iframeNode = this.getIframeNode();
			iframeNode.style.height = rootNode.offsetHeight + 'px';
			iframeNode.style.width = rootNode.offsetWidth + 'px';
		},
		render: function render() {
			return React.createElement(
				'span',
				{ style: { position: 'relative', zIndex: 0 } },
				React.createElement('iframe', { ref: 'iframe',
					onLoad: this.onLoad,
					style: iframeStyle }),
				this.props.children
			);
		}
	});

	var AjaxUpload = React.createClass({
		displayName: 'AjaxUpload',

		propTypes: {
			multiple: PropTypes.bool,
			onStart: PropTypes.func,
			data: PropTypes.object,
			headers: PropTypes.object,
			beforeUpload: PropTypes.func,
			withCredentials: PropTypes.bool
		},

		onChange: function onChange(e) {
			var files = e.target.files;
			this.uploadFiles(files);
		},
		onClick: function onClick() {
			var el = this.refs.file;
			if (!el) {
				return;
			}
			el.click();
			el.value = '';
		},
		onKeyDown: function onKeyDown(e) {
			if (e.key === 'Enter') {
				this.onClick();
			}
		},
		onFileDrop: function onFileDrop(e) {
			if (e.type === 'dragover') {
				return e.preventDefault();
			}

			var files = e.dataTransfer.files;
			this.uploadFiles(files);

			e.preventDefault();
		},
		uploadFiles: function uploadFiles(files) {
			var len = files.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var file = files.item(i);
					file.uid = uid();
					this.upload(file);
				}
				if (this.props.multiple) {
					this.props.onStart(Array.prototype.slice.call(files));
				} else {
					this.props.onStart(Array.prototype.slice.call(files)[0]);
				}
			}
		},
		upload: function upload(file) {
			var _this = this;

			var props = this.props;
			if (!props.beforeUpload) {
				return this.post(file);
			}

			var before = props.beforeUpload(file);
			if (before && before.then) {
				before.then(function () {
					_this.post(file);
				});
			} else if (before !== false) {
				this.post(file);
			}
		},
		post: function post(file) {
			var props = this.props;
			var data = props.data;
			if (typeof data === 'function') {
				data = data();
			}

			request({
				action: props.action,
				filename: props.name,
				file: file,
				data: data,
				headers: props.headers,
				withCredentials: props.withCredentials,
				onProgress: function onProgress(e) {
					props.onProgress(e, file);
				},
				onSuccess: function onSuccess(ret) {
					props.onSuccess(ret, file);
				},
				onError: function onError(err, ret) {
					props.onError(err, ret, file);
				}
			});
		},
		render: function render() {
			var hidden = { display: 'none' };
			var props = this.props;
			return React.createElement(
				'span',
				{
					onClick: this.onClick,
					onKeyDown: this.onKeyDown,
					onDrop: this.onFileDrop,
					onDragOver: this.onFileDrop,
					role: 'button',
					tabIndex: '0'
				},
				React.createElement('input', { type: 'file',
					ref: 'file',
					style: hidden,
					accept: props.accept,
					multiple: this.props.multiple,
					onChange: this.onChange }),
				props.children
			);
		}
	});

	var Upload = React.createClass({
		displayName: 'Upload',

		propTypes: {
			forceAjax: PropTypes.bool,
			action: PropTypes.string,
			name: PropTypes.string,
			multipart: PropTypes.bool,
			onError: PropTypes.func,
			onSuccess: PropTypes.func,
			onProgress: PropTypes.func,
			onStart: PropTypes.func,
			data: PropTypes.object,
			headers: PropTypes.object,
			accept: PropTypes.string,
			multiple: PropTypes.bool,
			beforeUpload: PropTypes.func,
			withCredentials: PropTypes.bool
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: {},
				headers: {},
				name: 'file',
				forceAjax: false,
				multipart: false,
				onProgress: empty,
				onStart: empty,
				onError: empty,
				onSuccess: empty,
				multiple: false,
				beforeUpload: null,
				withCredentials: false
			};
		},
		render: function render() {
			var props = this.props;
			// node 渲染根据 ua 强制设置 forceAjax 或者支持FormData的情况使用AjaxUpload
			if (props.forceAjax || typeof FormData !== 'undefined') {
				return React.createElement(AjaxUpload, props);
			}

			return React.createElement(IframeUpload, props);
		}
	});

	RC.Upload = Upload;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var AsyncValidate = RC.AsyncValidate;
	var Util = RC.Util;
	var hoistStatics = Util.hoistStatics;
	var _React = React;
	var Component = _React.Component;

	function getDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
	}

	function argumentContainer(Container, WrappedComponent) {
		Container.displayName = 'Form(' + getDisplayName(WrappedComponent) + ')';
		Container.WrappedComponent = WrappedComponent;
		return hoistStatics(Container, WrappedComponent);
	}

	function getValueFromEvent(e) {
		// support custom element
		if (!e || !e.target) {
			return e;
		}
		var target = e.target;

		return target.type === 'checkbox' ? target.checked : target.value;
	}

	function getErrorStrs(errors) {
		if (errors) {
			return errors.map(function (e) {
				if (e.message) {
					return e.message;
				}
				return e;
			});
		}
		return errors;
	}

	function isEmptyObject(obj) {
		return Object.keys(obj).length === 0;
	}

	function flattenArray(arr) {
		return Array.prototype.concat.apply([], arr);
	}

	var defaultValidateTrigger = 'onChange';
	var defaultTrigger = defaultValidateTrigger;

	function createForm() {
		var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapPropsToFields = option.mapPropsToFields;
		var onFieldsChange = option.onFieldsChange;
		var fieldNameProp = option.fieldNameProp;
		var fieldMetaProp = option.fieldMetaProp;
		var _option$formPropName = option.formPropName;
		var formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName;
		var withRef = option.withRef;

		function decorate(WrappedComponent) {
			var Form = (function (_Component) {
				_inherits(Form, _Component);

				function Form() {
					var _Object$getPrototypeO;

					_classCallCheck(this, Form);

					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Form)).call.apply(_Object$getPrototypeO, [this].concat(args)));

					var fields = undefined;
					if (mapPropsToFields) {
						fields = mapPropsToFields(_this.props);
					}
					_this.state = {
						submitting: false
					};
					_this.fields = fields || {};
					_this.fieldsMeta = {};
					_this.cachedBind = {};
					var bindMethods = ['getFieldProps', 'isFieldValidating', 'submit', 'isSubmitting', 'getFieldError', 'setFields', 'resetFields', 'validateFieldsByName', 'getFieldsValue', 'setFieldsInitialValue', 'isFieldsValidating', 'setFieldsValue', 'getFieldValue'];
					bindMethods.forEach(function (m) {
						_this[m] = _this[m].bind(_this);
					});
					return _this;
				}

				_createClass(Form, [{
					key: 'componentDidMount',
					value: function componentDidMount() {
						this.componentDidUpdate();
					}
				}, {
					key: 'componentWillReceiveProps',
					value: function componentWillReceiveProps(nextProps) {
						if (mapPropsToFields) {
							var fields = mapPropsToFields(nextProps);
							if (fields) {
								this.fields = _extends({}, this.fields, fields);
							}
						}
					}
				}, {
					key: 'componentDidUpdate',
					value: function componentDidUpdate() {
						var fields = this.fields;
						var fieldsMeta = this.fieldsMeta;

						var fieldsMetaKeys = Object.keys(fieldsMeta);
						fieldsMetaKeys.forEach(function (s) {
							if (fieldsMeta[s].stale) {
								delete fieldsMeta[s];
							}
						});
						var fieldsKeys = Object.keys(fields);
						fieldsKeys.forEach(function (s) {
							if (!fieldsMeta[s]) {
								delete fields[s];
							}
						});
						// do not notify store
					}
				}, {
					key: 'onChange',
					value: function onChange(name, action, event) {
						var fieldMeta = this.getFieldMeta(name);
						var validate = fieldMeta.validate;

						if (fieldMeta[action]) {
							fieldMeta[action](event);
						}
						var value = getValueFromEvent(event);
						var field = this.getField(name, true);
						this.setFields(_defineProperty({}, name, _extends({}, field, {
							value: value,
							dirty: this.hasRules(validate)
						})));
					}
				}, {
					key: 'onChangeValidate',
					value: function onChangeValidate(name, action, event) {
						var fieldMeta = this.getFieldMeta(name);
						if (fieldMeta[action]) {
							fieldMeta[action](event);
						}
						var value = getValueFromEvent(event);
						var field = this.getField(name, true);
						field.value = value;
						field.dirty = true;
						this.validateFields([field], {
							action: action,
							options: {
								firstFields: !!fieldMeta.validateFirst
							}
						});
					}
				}, {
					key: 'getCacheBind',
					value: function getCacheBind(name, action, fn) {
						var cache = this.cachedBind[name] = this.cachedBind[name] || {};
						if (!cache[action]) {
							cache[action] = fn.bind(this, name, action);
						}
						return cache[action];
					}
				}, {
					key: 'getFieldMeta',
					value: function getFieldMeta(name) {
						return this.fieldsMeta[name];
					}
				}, {
					key: 'getField',
					value: function getField(name, copy) {
						var ret = this.fields[name];
						if (ret) {
							ret.name = name;
						}
						if (copy) {
							if (ret) {
								return _extends({}, ret);
							}
							return { name: name };
						}
						return ret;
					}
				}, {
					key: 'getFieldProps',
					value: function getFieldProps(name) {
						var _this2 = this;

						var fieldOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
						var rules = fieldOption.rules;
						var _fieldOption$trigger = fieldOption.trigger;
						var trigger = _fieldOption$trigger === undefined ? defaultTrigger : _fieldOption$trigger;
						var _fieldOption$valuePro = fieldOption.valuePropName;
						var valuePropName = _fieldOption$valuePro === undefined ? 'value' : _fieldOption$valuePro;
						var _fieldOption$validate = fieldOption.validateTrigger;
						var validateTrigger = _fieldOption$validate === undefined ? defaultValidateTrigger : _fieldOption$validate;
						var _fieldOption$validate2 = fieldOption.validate;
						var validate = _fieldOption$validate2 === undefined ? [] : _fieldOption$validate2;

						var fieldMeta = this.fieldsMeta[name] || {};

						if ('initialValue' in fieldOption) {
							fieldMeta.initialValue = fieldOption.initialValue;
						}

						var inputProps = _defineProperty({}, valuePropName, fieldMeta.initialValue);

						if (fieldNameProp) {
							inputProps[fieldNameProp] = name;
						}

						var validateRules = validate.map(function (item) {
							item.trigger = item.trigger || [];
							if (typeof item.trigger === 'string') {
								item.trigger = [item.trigger];
							}
							return item;
						});

						if (rules) {
							validateRules.push({
								trigger: validateTrigger ? [].concat(validateTrigger) : [],
								rules: rules
							});
						}

						validateRules.map(function (item) {
							return item.trigger;
						}).reduce(function (pre, curr) {
							return pre.concat(curr);
						}, []).forEach(function (action) {
							inputProps[action] = _this2.getCacheBind(name, action, _this2.onChangeValidate);
						});

						if (trigger && validateRules.every(function (item) {
							return item.trigger.indexOf(trigger) === -1 || !item.rules;
						})) {
							inputProps[trigger] = this.getCacheBind(name, trigger, this.onChange);
						}
						var field = this.getField(name);
						if (field && 'value' in field) {
							inputProps[valuePropName] = field.value;
						}

						var meta = _extends({}, fieldMeta, fieldOption, {
							validate: validateRules,
							stale: 0
						});

						this.fieldsMeta[name] = meta;

						if (fieldMetaProp) {
							inputProps[fieldMetaProp] = meta;
						}

						return inputProps;
					}
				}, {
					key: 'getFieldMember',
					value: function getFieldMember(name, member) {
						var field = this.getField(name);
						return field && field[member];
					}
				}, {
					key: 'getFieldError',
					value: function getFieldError(name) {
						return getErrorStrs(this.getFieldMember(name, 'errors'));
					}
				}, {
					key: 'getValidFieldsName',
					value: function getValidFieldsName() {
						var fieldsMeta = this.fieldsMeta;
						return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
							return !fieldsMeta[name].hidden;
						}) : [];
					}
				}, {
					key: 'getFieldsValue',
					value: function getFieldsValue(names) {
						var _this3 = this;

						var fields = names || this.getValidFieldsName();
						var allValues = {};
						fields.forEach(function (f) {
							allValues[f] = _this3.getFieldValue(f);
						});
						return allValues;
					}
				}, {
					key: 'getFieldValue',
					value: function getFieldValue(name) {
						var fields = this.fields;

						return this.getValueFromFields(name, fields);
					}
				}, {
					key: 'getValueFromFields',
					value: function getValueFromFields(name, fields) {
						var fieldsMeta = this.fieldsMeta;

						var field = fields[name];
						if (field && 'value' in field) {
							return field.value;
						}
						var fieldMeta = fieldsMeta[name];
						return fieldMeta && fieldMeta.initialValue;
					}
				}, {
					key: 'getRules',
					value: function getRules(fieldMeta, action) {
						var actionRules = fieldMeta.validate.filter(function (item) {
							return !action || item.trigger.indexOf(action) >= 0;
						}).map(function (item) {
							return item.rules;
						});
						return flattenArray(actionRules);
					}
				}, {
					key: 'getForm',
					value: function getForm() {
						return {
							getFieldsValue: this.getFieldsValue,
							getFieldValue: this.getFieldValue,
							setFieldsValue: this.setFieldsValue,
							setFields: this.setFields,
							setFieldsInitialValue: this.setFieldsInitialValue,
							getFieldProps: this.getFieldProps,
							getFieldError: this.getFieldError,
							isFieldValidating: this.isFieldValidating,
							isFieldsValidating: this.isFieldsValidating,
							isSubmitting: this.isSubmitting,
							submit: this.submit,
							validateFields: this.validateFieldsByName,
							resetFields: this.resetFields
						};
					}
				}, {
					key: 'setFields',
					value: function setFields(fields) {
						var _this4 = this;

						var originalFields = this.fields;
						var nowFields = _extends({}, originalFields, fields);
						var fieldsMeta = this.fieldsMeta;
						var nowValues = {};
						Object.keys(fieldsMeta).forEach(function (f) {
							nowValues[f] = _this4.getValueFromFields(f, nowFields);
						});
						var changedFieldsName = Object.keys(fields);
						Object.keys(nowValues).forEach(function (f) {
							var value = nowValues[f];
							var fieldMeta = fieldsMeta[f];
							if (fieldMeta && fieldMeta.normalize) {
								var nowValue = fieldMeta.normalize(value, _this4.getValueFromFields(f, originalFields), nowValues);
								if (nowValue !== value) {
									nowFields[f] = _extends({}, nowFields[f], { value: nowValue });
									if (changedFieldsName.indexOf(f) === -1) {
										changedFieldsName.push(f);
									}
								}
							}
						});
						this.fields = nowFields;
						if (onFieldsChange) {
							(function () {
								var changedFields = {};
								changedFieldsName.forEach(function (f) {
									changedFields[f] = nowFields[f];
								});
								onFieldsChange(_this4.props, changedFields);
							})();
						}
						this.forceUpdate();
					}
				}, {
					key: 'setFieldsValue',
					value: function setFieldsValue(fieldsValue) {
						var fields = {};
						for (var name in fieldsValue) {
							if (fieldsValue.hasOwnProperty(name)) {
								fields[name] = {
									name: name,
									value: fieldsValue[name]
								};
							}
						}
						this.setFields(fields);
					}
				}, {
					key: 'setFieldsInitialValue',
					value: function setFieldsInitialValue(initialValues) {
						var fieldsMeta = this.fieldsMeta;
						for (var name in initialValues) {
							if (initialValues.hasOwnProperty(name)) {
								var fieldMeta = fieldsMeta[name];
								fieldsMeta[name] = _extends({}, fieldMeta, {
									initialValue: initialValues[name]
								});
							}
						}
					}
				}, {
					key: 'hasRules',
					value: function hasRules(validate) {
						if (validate) {
							return validate.some(function (item) {
								return !!item.rules;
							});
						}
						return false;
					}
				}, {
					key: 'validateFields',
					value: function validateFields(fields, _ref, callback) {
						var _this5 = this;

						var fieldNames = _ref.fieldNames;
						var action = _ref.action;
						var _ref$options = _ref.options;
						var options = _ref$options === undefined ? {} : _ref$options;

						var allRules = {};
						var allValues = {};
						var allFields = {};
						var alreadyErrors = {};
						fields.forEach(function (field) {
							var name = field.name;
							if (options.force !== true && field.dirty === false) {
								if (field.errors) {
									alreadyErrors[name] = field.errors;
								}
								return;
							}
							var fieldMeta = _this5.getFieldMeta(name);
							field.errors = undefined;
							field.validating = true;
							field.dirty = true;
							allRules[name] = _this5.getRules(fieldMeta, action);
							allValues[name] = field.value;
							allFields[name] = field;
						});
						this.setFields(allFields);
						var nowFields = this.fields;
						// in case normalize
						Object.keys(allValues).forEach(function (f) {
							allValues[f] = nowFields[f].value;
						});
						if (callback && isEmptyObject(allFields)) {
							callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.getFieldsValue(fieldNames));
							return;
						}
						new AsyncValidate(allRules).validate(allValues, options, function (errors) {
							var errorsGroup = _extends({}, alreadyErrors);
							if (errors && errors.length) {
								errors.forEach(function (e) {
									var fieldName = e.field;
									var fieldErrors = errorsGroup[fieldName] || [];
									fieldErrors.push(e);
									errorsGroup[fieldName] = fieldErrors;
								});
							}
							var expired = [];
							var nowAllFields = {};
							Object.keys(allRules).forEach(function (name) {
								var fieldErrors = errorsGroup[name];
								var nowField = _this5.getField(name, true);
								// avoid concurrency problems
								if (nowField.value !== allValues[name]) {
									expired.push(name);
								} else {
									nowField.errors = fieldErrors;
									nowField.value = allValues[name];
									nowField.validating = false;
									nowField.dirty = false;
									nowAllFields[name] = nowField;
								}
							});
							_this5.setFields(nowAllFields);
							if (callback) {
								if (expired.length) {
									expired.forEach(function (name) {
										errorsGroup[name] = [new Error(name + ' need to revalidate')];
										errorsGroup[name].expired = true;
									});
								}
								callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this5.getFieldsValue(fieldNames));
							}
						});
					}
				}, {
					key: 'validateFieldsByName',
					value: function validateFieldsByName(ns, opt, cb) {
						var _this6 = this;

						var names = ns;
						var callback = cb;
						var options = opt;
						if (typeof names === 'function') {
							callback = names;
							options = {};
							names = undefined;
						} else if (Array.isArray(ns)) {
							if (typeof options === 'function') {
								callback = options;
								options = {};
							} else {
								options = options || {};
							}
						} else {
							callback = options;
							options = names || {};
							names = undefined;
						}
						var fieldNames = names || this.getValidFieldsName();
						var fields = fieldNames.map(function (name) {
							var fieldMeta = _this6.getFieldMeta(name);
							if (!_this6.hasRules(fieldMeta.validate)) {
								return null;
							}
							var field = _this6.getField(name, true);
							field.value = _this6.getFieldValue(name);
							return field;
						}).filter(function (f) {
							return !!f;
						});
						if (!fields.length) {
							if (callback) {
								callback(null, this.getFieldsValue(fieldNames));
							}
							return;
						}
						if (!('firstFields' in options)) {
							options.firstFields = fieldNames.filter(function (name) {
								var fieldMeta = _this6.getFieldMeta(name);
								return !!fieldMeta.validateFirst;
							});
						}
						this.validateFields(fields, { fieldNames: fieldNames, options: options }, callback);
					}
				}, {
					key: 'isFieldValidating',
					value: function isFieldValidating(name) {
						return this.getFieldMember(name, 'validating');
					}
				}, {
					key: 'isFieldsValidating',
					value: function isFieldsValidating(ns) {
						var names = ns || this.getValidFieldsName();
						return names.some(this.isFieldValidating);
					}
				}, {
					key: 'isSubmitting',
					value: function isSubmitting() {
						return this.state.submitting;
					}
				}, {
					key: 'submit',
					value: function submit(callback) {
						var _this7 = this;

						var fn = function fn() {
							_this7.setState({
								submitting: false
							});
						};
						this.setState({
							submitting: true
						});
						callback(fn);
					}
				}, {
					key: 'resetFields',
					value: function resetFields(ns) {
						var newFields = {};
						var fields = this.fields;

						var changed = false;
						var names = ns || Object.keys(fields);
						names.forEach(function (name) {
							var field = fields[name];
							if (field && 'value' in field) {
								changed = true;
								newFields[name] = {};
							}
						});
						if (changed) {
							this.setFields(newFields);
						}
					}
				}, {
					key: 'render',
					value: function render() {
						var formProps = _defineProperty({}, formPropName, this.getForm());
						var fieldsMeta = this.fieldsMeta;
						for (var name in fieldsMeta) {
							if (fieldsMeta.hasOwnProperty(name)) {
								fieldsMeta[name].stale = 1;
							}
						}
						if (withRef) {
							formProps.ref = 'wrappedComponent';
						}
						return React.createElement(WrappedComponent, _extends({}, formProps, this.props));
					}
				}]);

				return Form;
			})(Component);

			return argumentContainer(Form, WrappedComponent);
		}

		return decorate;
	}
	RC.createForm = createForm;
})(Smart.RC);