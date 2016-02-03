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
  RC.KeyCode = KeyCode;

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
  RC.classnames = RC.classNames = classNames;
  window.classnames = window.classNames = classNames;

  function arrayTreeFilter(data, filterFn, options) {
    options = options || {};
    options.childrenKeyName = options.childrenKeyName || 'children';
    var children = data || [];
    var result = [];
    var level = 0;
    var foundItem;
    do {
      var foundItem = children.filter(function (item) {
        return filterFn(item, level);
      })[0];
      if (!foundItem) {
        break;
      }
      result.push(foundItem);
      children = foundItem[options.childrenKeyName] || [];
      level += 1;
    } while (children.length > 0);
    return result;
  }
  RC.arrayTreeFilter = util.arrayTreeFilter = arrayTreeFilter;
})(Smart.RC);
'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

/**
 * align dom node flexibly
 * @author yiminghe@gmail.com
 */

+(function (RC) {

  var RE_NUM = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;

  var getComputedStyleX = undefined;

  function css(el, name, v) {
    var value = v;
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      for (var i in name) {
        if (name.hasOwnProperty(i)) {
          css(el, i, name[i]);
        }
      }
      return undefined;
    }
    if (typeof value !== 'undefined') {
      if (typeof value === 'number') {
        value = value + 'px';
      }
      el.style[name] = value;
      return undefined;
    }
    return getComputedStyleX(el, name);
  }

  function getClientPosition(elem) {
    var box = undefined;
    var x = undefined;
    var y = undefined;
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

    return { left: x, top: y };
  }

  function getScroll(w, top) {
    var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
    var method = 'scroll' + (top ? 'Top' : 'Left');
    if (typeof ret !== 'number') {
      var d = w.document;
      // ie6,7,8 standard mode
      ret = d.documentElement[method];
      if (typeof ret !== 'number') {
        // quirks mode
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
  function _getComputedStyle(elem, name, cs) {
    var computedStyle = cs;
    var val = '';
    var d = elem.ownerDocument;
    computedStyle = computedStyle || d.defaultView.getComputedStyle(elem, null);

    // https://github.com/kissyteam/kissy/issues/61
    if (computedStyle) {
      val = computedStyle.getPropertyValue(name) || computedStyle[name];
    }

    return val;
  }

  var _RE_NUM_NO_PX = new RegExp('^(' + RE_NUM + ')(?!px)[a-z%]+$', 'i');
  var RE_POS = /^(top|right|bottom|left)$/;
  var CURRENT_STYLE = 'currentStyle';
  var RUNTIME_STYLE = 'runtimeStyle';
  var LEFT = 'left';
  var PX = 'px';

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
      var style = elem.style;
      var left = style[LEFT];
      var rsLeft = elem[RUNTIME_STYLE][LEFT];

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

  if (typeof window !== 'undefined') {
    getComputedStyleX = window.getComputedStyle ? _getComputedStyle : _getComputedStyleIE;
  }

  function getOffsetDirection(dir, option) {
    if (dir === 'left') {
      return option.useCssRight ? 'right' : dir;
    }
    return option.useCssBottom ? 'bottom' : dir;
  }

  function oppositeOffsetDirection(dir) {
    if (dir === 'left') {
      return 'right';
    } else if (dir === 'right') {
      return 'left';
    } else if (dir === 'top') {
      return 'bottom';
    } else if (dir === 'bottom') {
      return 'top';
    }
  }

  // 设置 elem 相对 elem.ownerDocument 的坐标
  function setOffset(elem, offset, option) {
    // set position first, in-case top/left are set even on static elem
    if (css(elem, 'position') === 'static') {
      elem.style.position = 'relative';
    }
    var presetH = -999;
    var presetV = -999;
    var horizontalProperty = getOffsetDirection('left', option);
    var verticalProperty = getOffsetDirection('top', option);
    var oppositeHorizontalProperty = oppositeOffsetDirection(horizontalProperty);
    var oppositeVerticalProperty = oppositeOffsetDirection(verticalProperty);

    if (horizontalProperty !== 'left') {
      presetH = 999;
    }

    if (verticalProperty !== 'top') {
      presetV = 999;
    }

    if ('left' in offset) {
      elem.style[oppositeHorizontalProperty] = '';
      elem.style[horizontalProperty] = presetH + 'px';
    }
    if ('top' in offset) {
      elem.style[oppositeVerticalProperty] = '';
      elem.style[verticalProperty] = presetV + 'px';
    }
    var old = getOffset(elem);
    var ret = {};
    var key = undefined;
    for (key in offset) {
      if (offset.hasOwnProperty(key)) {
        var dir = getOffsetDirection(key, option);
        var preset = key === 'left' ? presetH : presetV;
        if (dir === key) {
          ret[dir] = preset + offset[key] - old[key];
        } else {
          ret[dir] = preset + old[key] - offset[key];
        }
      }
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

  var BOX_MODELS = ['margin', 'border', 'padding'];
  var CONTENT_INDEX = -1;
  var PADDING_INDEX = 2;
  var BORDER_INDEX = 1;
  var MARGIN_INDEX = 0;

  function swap(elem, options, callback) {
    var old = {};
    var style = elem.style;
    var name = undefined;

    // Remember the old values, and insert the new ones
    for (name in options) {
      if (options.hasOwnProperty(name)) {
        old[name] = style[name];
        style[name] = options[name];
      }
    }

    callback.call(elem);

    // Revert the old values
    for (name in options) {
      if (options.hasOwnProperty(name)) {
        style[name] = old[name];
      }
    }
  }

  function getPBMWidth(elem, props, which) {
    var value = 0;
    var prop = undefined;
    var j = undefined;
    var i = undefined;
    for (j = 0; j < props.length; j++) {
      prop = props[j];
      if (prop) {
        for (i = 0; i < which.length; i++) {
          var cssProp = undefined;
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
    /* eslint eqeqeq:0 */
    return obj !== null && obj !== undefined && obj == obj.window;
  }

  var domUtils = {};

  each(['Width', 'Height'], function (name) {
    domUtils['doc' + name] = function (refWin) {
      var d = refWin.document;
      return Math.max(
      // firefox chrome documentElement.scrollHeight< body.scrollHeight
      // ie standard mode : documentElement.scrollHeight> body.scrollHeight
      d.documentElement['scroll' + name],
      // quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
      d.body['scroll' + name], domUtils['viewport' + name](d));
    };

    domUtils['viewport' + name] = function (win) {
      // pc browser includes scrollbar in window.innerWidth
      var prop = 'client' + name;
      var doc = win.document;
      var body = doc.body;
      var documentElement = doc.documentElement;
      var documentElementProp = documentElement[prop];
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
  function getWH(elem, name, ex) {
    var extra = ex;
    if (isWindow(elem)) {
      return name === 'width' ? domUtils.viewportWidth(elem) : domUtils.viewportHeight(elem);
    } else if (elem.nodeType === 9) {
      return name === 'width' ? domUtils.docWidth(elem) : domUtils.docHeight(elem);
    }
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];
    var borderBoxValue = name === 'width' ? elem.offsetWidth : elem.offsetHeight;
    var computedStyle = getComputedStyleX(elem);
    var isBorderBox = isBorderBoxFn(elem, computedStyle);
    var cssBoxValue = 0;
    if (borderBoxValue === null || borderBoxValue === undefined || borderBoxValue <= 0) {
      borderBoxValue = undefined;
      // Fall back to computed then un computed css if necessary
      cssBoxValue = getComputedStyleX(elem, name);
      if (cssBoxValue === null || cssBoxValue === undefined || Number(cssBoxValue) < 0) {
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
      }
      return cssBoxValue;
    } else if (borderBoxValueOrIsBorderBox) {
      if (extra === BORDER_INDEX) {
        return val;
      }
      return val + (extra === PADDING_INDEX ? -getPBMWidth(elem, ['border'], which, computedStyle) : getPBMWidth(elem, ['margin'], which, computedStyle));
    }
    return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra), which, computedStyle);
  }

  var cssShow = { position: 'absolute', visibility: 'hidden', display: 'block' };

  // fix #119 : https://github.com/kissyteam/kissy/issues/119
  function getWHIgnoreDisplay() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var val = undefined;
    var elem = args[0];
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

    domUtils[name] = function (elem, v) {
      var val = v;
      if (val !== undefined) {
        if (elem) {
          var computedStyle = getComputedStyleX(elem);
          var isBorderBox = isBorderBoxFn(elem);
          if (isBorderBox) {
            val += getPBMWidth(elem, ['padding', 'border'], which, computedStyle);
          }
          return css(elem, name, val);
        }
        return undefined;
      }
      return elem && getWHIgnoreDisplay(elem, name, CONTENT_INDEX);
    };
  });

  function mix(to, from) {
    for (var i in from) {
      if (from.hasOwnProperty(i)) {
        to[i] = from[i];
      }
    }
    return to;
  }

  var utils = {
    getWindow: function getWindow(node) {
      if (node && node.document && node.setTimeout) {
        return node;
      }
      var doc = node.ownerDocument || node;
      return doc.defaultView || doc.parentWindow;
    },
    offset: function offset(el, value, option) {
      if (typeof value !== 'undefined') {
        setOffset(el, value, option || {});
      } else {
        return getOffset(el);
      }
    },

    isWindow: isWindow,
    each: each,
    css: css,
    clone: function clone(obj) {
      var i = undefined;
      var ret = {};
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          ret[i] = obj[i];
        }
      }
      var overflow = obj.overflow;
      if (overflow) {
        for (i in obj) {
          if (obj.hasOwnProperty(i)) {
            ret.overflow[i] = obj.overflow[i];
          }
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
    merge: function merge() {
      var ret = {};

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var i = 0; i < args.length; i++) {
        utils.mix(ret, args[i]);
      }
      return ret;
    },

    viewportWidth: 0,
    viewportHeight: 0
  };

  mix(utils, domUtils);

  /**
   * 得到会导致元素显示不全的祖先元素
   */

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

  RC.domAlign = domAlign;

  /**
   *  2012-04-26 yiminghe@gmail.com
   *   - 优化智能对齐算法
   *   - 慎用 resizeXX
   *
   *  2011-07-13 yiminghe@gmail.com note:
   *   - 增加智能对齐，以及大小调整选项
   **/
})(Smart.RC);
'use strict';

+(function (RC) {
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

  var Event = {
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

  var SPACE = ' ';
  var RE_CLASS = /[\n\t\r]/g;

  function norm(elemClass) {
    return (SPACE + elemClass + SPACE).replace(RE_CLASS, SPACE);
  }

  var Css = {
    addClass: function addClass(elem, className) {
      elem.className += ' ' + className;
    },
    removeClass: function removeClass(elem, n) {
      var elemClass = elem.className.trim();
      var className = norm(elemClass);
      var needle = n.trim();
      needle = SPACE + needle + SPACE;
      // 一个 cls 有可能多次出现：'link link2 link link3 link'
      while (className.indexOf(needle) >= 0) {
        className = className.replace(needle, SPACE);
      }
      elem.className = className.trim();
    }
  };

  var isCssAnimationSupported = Event.endEvents.length !== 0;

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
  RC.cssAnimate = cssAnimation;
})(Smart.RC);
'use strict';

// export this package's api
+(function (RC) {
	var _ref = _;
	var noop = _ref.noop;
	var Util = RC.Util;
	var Dom = Util.Dom;
	var isWindow = Util.isWindow;
	var align = RC.domAlign;
	var _React = React;
	var PropTypes = _React.PropTypes;

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
	var cssAnimate = RC.cssAnimate;
	var isCssAnimationSupported = cssAnimate.isCssAnimationSupported;

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
				this.stopper = cssAnimate(node, transitionName + '-' + animationType, end);
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
					children
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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (RC) {
	var classNames = RC.classNames;
	var _ref = _;
	var noop = _ref.noop;

	function preventDefault(e) {
		e.preventDefault();
	}

	var InputNumber = React.createClass({
		displayName: 'InputNumber',

		propTypes: {
			onChange: React.PropTypes.func,
			step: React.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-input-number',
				max: Infinity,
				min: -Infinity,
				step: 1,
				style: {},
				defaultValue: '',
				onChange: noop
			};
		},
		getInitialState: function getInitialState() {
			var value = undefined;
			var props = this.props;
			if ('value' in props) {
				value = props.value;
			} else {
				value = props.defaultValue;
			}
			value = this.toPrecisionAsStep(value);
			return {
				inputValue: value,
				value: value,
				focused: props.autoFocus
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				var value = this.toPrecisionAsStep(nextProps.value);
				this.setState({
					inputValue: value,
					value: value
				});
			}
		},
		onChange: function onChange(event) {
			this.setInputValue(event.target.value.trim());
		},
		onKeyDown: function onKeyDown(e) {
			if (e.keyCode === 38) {
				this.up(e);
			} else if (e.keyCode === 40) {
				this.down(e);
			}
		},
		onFocus: function onFocus() {
			this.setState({
				focused: true
			});
		},
		onBlur: function onBlur(event) {
			var props = this.props;
			var val = event.target.value.trim();
			this.setState({
				focused: false
			});
			if (val === '') {
				val = '';
			} else if (!isNaN(val)) {
				val = Number(val);
				if (val < props.min) {
					val = props.min;
				}
				if (val > props.max) {
					val = props.max;
				}
			} else {
				val = this.state.value;
			}
			this.setValue(val);
		},
		setValue: function setValue(v) {
			if (!('value' in this.props)) {
				this.setState({
					value: v,
					inputValue: v
				});
			}
			this.props.onChange(v);
		},
		setInputValue: function setInputValue(v) {
			this.setState({
				inputValue: v
			});
		},
		getPrecision: function getPrecision() {
			var props = this.props;
			var stepString = props.step.toString();
			if (stepString.indexOf('e-') >= 0) {
				return parseInt(stepString.slice(stepString.indexOf('-e')), 10);
			}
			var precision = 0;
			if (stepString.indexOf('.') >= 0) {
				precision = stepString.length - stepString.indexOf('.') - 1;
			}
			return precision;
		},
		getPrecisionFactor: function getPrecisionFactor() {
			var precision = this.getPrecision();
			return Math.pow(10, precision);
		},
		toPrecisionAsStep: function toPrecisionAsStep(num) {
			if (isNaN(num) || num === '') {
				return num;
			}
			var precision = this.getPrecision();
			return Number(Number(num).toFixed(precision));
		},
		upStep: function upStep(val) {
			var stepNum = this.props.step;
			var precisionFactor = this.getPrecisionFactor();
			return (precisionFactor * val + precisionFactor * stepNum) / precisionFactor;
		},
		downStep: function downStep(val) {
			var stepNum = this.props.step;
			var precisionFactor = this.getPrecisionFactor();
			return (precisionFactor * val - precisionFactor * stepNum) / precisionFactor;
		},
		step: function step(type, e) {
			if (e) {
				e.preventDefault();
			}
			var props = this.props;
			if (props.disabled) {
				return;
			}
			var value = this.state.value;
			if (isNaN(value)) {
				return;
			}
			var val = this[type + 'Step'](value);
			if (val > props.max || val < props.min) {
				return;
			}
			this.setValue(val);
			this.refs.input.focus();
		},
		down: function down(e) {
			this.step('down', e);
		},
		up: function up(e) {
			this.step('up', e);
		},
		render: function render() {
			var _classNames;

			var props = this.props;
			var prefixCls = props.prefixCls;
			var classes = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, props.className, !!props.className), _defineProperty(_classNames, prefixCls + '-disabled', props.disabled), _defineProperty(_classNames, prefixCls + '-focused', this.state.focused), _classNames));
			var upDisabledClass = '';
			var downDisabledClass = '';
			var value = this.state.value;
			if (!isNaN(value)) {
				var val = Number(value);
				if (val >= props.max) {
					upDisabledClass = prefixCls + '-handler-up-disabled';
				}
				if (val <= props.min) {
					downDisabledClass = prefixCls + '-handler-up-disabled';
				}
			} else {
				upDisabledClass = prefixCls + '-handler-up-disabled';
				downDisabledClass = prefixCls + '-handler-up-disabled';
			}

			// focus state, show input value
			// unfocus state, show valid value
			var inputDisplayValue = undefined;
			if (this.state.focused) {
				inputDisplayValue = this.state.inputValue;
			} else {
				inputDisplayValue = this.state.value;
			}

			// ref for test
			return React.createElement(
				'div',
				{ className: classes, style: props.style },
				React.createElement(
					'div',
					{ className: prefixCls + '-handler-wrap' },
					React.createElement(
						'a',
						{ unselectable: 'unselectable',
							ref: 'up',
							onClick: upDisabledClass ? noop : this.up,
							onMouseDown: preventDefault,
							className: prefixCls + '-handler ' + prefixCls + '-handler-up ' + upDisabledClass },
						React.createElement('span', { unselectable: 'unselectable', className: prefixCls + '-handler-up-inner',
							onClick: preventDefault })
					),
					React.createElement(
						'a',
						{ unselectable: 'unselectable',
							ref: 'down',
							onMouseDown: preventDefault,
							onClick: downDisabledClass ? noop : this.down,
							className: prefixCls + '-handler ' + prefixCls + '-handler-down ' + downDisabledClass },
						React.createElement('span', { unselectable: 'unselectable', className: prefixCls + '-handler-down-inner',
							onClick: preventDefault })
					)
				),
				React.createElement(
					'div',
					{ className: prefixCls + '-input-wrap' },
					React.createElement('input', { className: prefixCls + '-input',
						autoComplete: 'off',
						onFocus: this.onFocus,
						onBlur: this.onBlur,
						onKeyDown: this.onKeyDown,
						autoFocus: props.autoFocus,
						readOnly: props.readOnly,
						disabled: props.disabled,
						max: props.max,
						min: props.min,
						name: props.name,
						onChange: this.onChange,
						ref: 'input',
						value: inputDisplayValue })
				)
			);
		}
	});

	RC.InputNumber = InputNumber;
})(Smart.RC);
'use strict';

+(function (RC) {
	var Trigger = RC.Trigger;
	var _React = React;
	var PropTypes = _React.PropTypes;

	var autoAdjustOverflow = {
		adjustX: 1,
		adjustY: 1
	};

	var targetOffset = [0, 0];

	var placements = {
		topLeft: {
			points: ['bl', 'tl'],
			overflow: autoAdjustOverflow,
			offset: [0, -3],
			targetOffset: targetOffset
		},
		bottomLeft: {
			points: ['tl', 'bl'],
			overflow: autoAdjustOverflow,
			offset: [0, 3],
			targetOffset: targetOffset
		}
	};

	/*
 
  var MenuItem = Menu.Item;
 
  var menu = <Menu><MenuItem>1</MenuItem></Menu>;
 
  <DropDown trigger="click" animationName="" overlay={<>} onSelect={}>
  <button>open</button>
  </DropDown>
  */

	var Dropdown = React.createClass({
		displayName: 'Dropdown',

		propTypes: {
			minOverlayWidthMatchTrigger: PropTypes.bool,
			onVisibleChange: PropTypes.func,
			prefixCls: PropTypes.string,
			children: PropTypes.any,
			transitionName: PropTypes.string,
			overlayClassName: PropTypes.string,
			animation: PropTypes.any,
			align: PropTypes.object,
			overlayStyle: PropTypes.object,
			placement: PropTypes.string,
			trigger: PropTypes.array
		},

		getDefaultProps: function getDefaultProps() {
			return {
				minOverlayWidthMatchTrigger: true,
				prefixCls: 'rc-dropdown',
				trigger: ['hover'],
				overlayClassName: '',
				overlayStyle: {},
				defaultVisible: false,
				onVisibleChange: function onVisibleChange() {},

				placement: 'bottomLeft'
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			if ('visible' in props) {
				return {
					visible: props.visible
				};
			}
			return {
				visible: props.defaultVisible
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(props) {
			if ('visible' in props) {
				this.setState({
					visible: props.visible
				});
			}
		},
		onClick: function onClick(e) {
			var props = this.props;
			var overlayProps = props.overlay.props;
			if (!('visible' in props)) {
				this.setState({
					visible: false
				});
			}
			if (overlayProps.onClick) {
				overlayProps.onClick(e);
			}
		},
		onVisibleChange: function onVisibleChange(v) {
			var props = this.props;
			if (!('visible' in props)) {
				this.setState({
					visible: v
				});
			}
			props.onVisibleChange(v);
		},
		getMenuElement: function getMenuElement() {
			var props = this.props;
			return React.cloneElement(props.overlay, {
				prefixCls: props.prefixCls + '-menu',
				onClick: this.onClick
			});
		},
		getPopupDomNode: function getPopupDomNode() {
			return this.refs.trigger.getPopupDomNode();
		},
		afterVisibleChange: function afterVisibleChange(visible) {
			if (visible && this.props.minOverlayWidthMatchTrigger) {
				var overlayNode = this.getPopupDomNode();
				var rootNode = ReactDOM.findDOMNode(this);
				if (rootNode.offsetWidth > overlayNode.offsetWidth) {
					overlayNode.style.width = rootNode.offsetWidth + 'px';
				}
			}
		},
		render: function render() {
			var _props = this.props;
			var prefixCls = _props.prefixCls;
			var children = _props.children;
			var transitionName = _props.transitionName;
			var animation = _props.animation;
			var align = _props.align;
			var placement = _props.placement;
			var overlayClassName = _props.overlayClassName;
			var overlayStyle = _props.overlayStyle;
			var trigger = _props.trigger;

			return React.createElement(
				Trigger,
				{ prefixCls: prefixCls,
					ref: 'trigger',
					popupClassName: overlayClassName,
					popupStyle: overlayStyle,
					builtinPlacements: placements,
					action: trigger,
					popupPlacement: placement,
					popupAlign: align,
					popupTransitionName: transitionName,
					popupAnimation: animation,
					popupVisible: this.state.visible,
					afterPopupVisibleChange: this.afterVisibleChange,
					popup: this.getMenuElement(),
					onPopupVisibleChange: this.onVisibleChange
				},
				children
			);
		}
	});

	RC.Dropdown = Dropdown;
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
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var KEYCODE = RC.KeyCode;
	var LOCALE = RC.locale.pagination;
	var _ref = _;
	var noop = _ref.noop;

	var Pager = (function (_React$Component) {
		_inherits(Pager, _React$Component);

		function Pager() {
			_classCallCheck(this, Pager);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Pager).apply(this, arguments));
		}

		_createClass(Pager, [{
			key: 'render',
			value: function render() {
				var props = this.props;
				var locale = props.locale;
				var prefixCls = props.rootPrefixCls + '-item';
				var cls = prefixCls + ' ' + prefixCls + '-' + props.page;

				if (props.active) {
					cls = cls + ' ' + prefixCls + '-active';
				}

				var title = undefined;
				if (props.page === 1) {
					title = locale.first_page;
				} else if (props.last) {
					title = locale.last_page + ': ' + props.page;
				} else {
					title = props.page;
				}
				return React.createElement(
					'li',
					{ title: title, className: cls, onClick: props.onClick },
					React.createElement(
						'a',
						null,
						props.page
					)
				);
			}
		}]);

		return Pager;
	})(React.Component);

	Pager.propTypes = {
		page: React.PropTypes.number,
		active: React.PropTypes.bool,
		last: React.PropTypes.bool,
		locale: React.PropTypes.object
	};

	var Options = (function (_React$Component2) {
		_inherits(Options, _React$Component2);

		function Options(props) {
			_classCallCheck(this, Options);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Options).call(this, props));

			_this2.state = {
				current: props.current,
				_current: props.current
			};

			['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach(function (method) {
				return _this2[method] = _this2[method].bind(_this2);
			});
			return _this2;
		}

		_createClass(Options, [{
			key: '_buildOptionText',
			value: function _buildOptionText(value) {
				return value + ' ' + this.props.locale.items_per_page;
			}
		}, {
			key: '_changeSize',
			value: function _changeSize(value) {
				this.props.changeSize(Number(value));
			}
		}, {
			key: '_handleChange',
			value: function _handleChange(evt) {
				var _val = evt.target.value;

				this.setState({
					_current: _val
				});
			}
		}, {
			key: '_go',
			value: function _go(e) {
				var _val = e.target.value;
				if (_val === '') {
					return;
				}
				var val = Number(this.state._current);
				if (isNaN(val)) {
					val = this.state.current;
				}
				if (e.keyCode === KEYCODE.ENTER) {
					var c = this.props.quickGo(val);
					this.setState({
						_current: c,
						current: c
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var props = this.props;
				var state = this.state;
				var locale = props.locale;
				var prefixCls = props.rootPrefixCls + '-options';
				var changeSize = props.changeSize;
				var quickGo = props.quickGo;
				var buildOptionText = props.buildOptionText || this._buildOptionText;
				var Select = props.selectComponentClass;
				var changeSelect = null;
				var goInput = null;

				if (!(changeSize || quickGo)) {
					return null;
				}

				if (changeSize && Select) {
					(function () {
						var Option = Select.Option;
						var defaultOption = props.pageSize || props.pageSizeOptions[0];
						var options = props.pageSizeOptions.map(function (opt, i) {
							return React.createElement(
								Option,
								{ key: i, value: opt },
								buildOptionText(opt)
							);
						});

						changeSelect = React.createElement(
							Select,
							{
								prefixCls: props.selectPrefixCls, showSearch: false,
								className: prefixCls + '-size-changer',
								optionLabelProp: 'children',
								defaultValue: '' + defaultOption, onChange: _this3._changeSize },
							options
						);
					})();
				}

				if (quickGo) {
					goInput = React.createElement(
						'div',
						{ title: 'Quick jump to page', className: prefixCls + '-quick-jumper' },
						locale.jump_to,
						React.createElement('input', { type: 'text', value: state._current, onChange: this._handleChange.bind(this), onKeyUp: this._go.bind(this) }),
						locale.page
					);
				}

				return React.createElement(
					'div',
					{ className: '' + prefixCls },
					changeSelect,
					goInput
				);
			}
		}]);

		return Options;
	})(React.Component);

	Options.propTypes = {
		changeSize: React.PropTypes.func,
		quickGo: React.PropTypes.func,
		selectComponentClass: React.PropTypes.func,
		current: React.PropTypes.number,
		pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
		pageSize: React.PropTypes.number,
		buildOptionText: React.PropTypes.func,
		locale: React.PropTypes.object
	};

	Options.defaultProps = {
		pageSizeOptions: ['10', '20', '30', '40']
	};

	var Pagination = (function (_React$Component3) {
		_inherits(Pagination, _React$Component3);

		function Pagination(props) {
			_classCallCheck(this, Pagination);

			var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

			var hasOnChange = props.onChange !== noop;
			var hasCurrent = 'current' in props;
			if (hasCurrent && !hasOnChange) {
				console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
			}

			var current = props.defaultCurrent;
			if ('current' in props) {
				current = props.current;
			}

			_this4.state = {
				current: current,
				_current: current,
				pageSize: props.pageSize
			};

			['render', '_handleChange', '_handleKeyUp', '_handleKeyDown', '_changePageSize', '_isValid', '_prev', '_next', '_hasPrev', '_hasNext', '_jumpPrev', '_jumpNext'].forEach(function (method) {
				return _this4[method] = _this4[method].bind(_this4);
			});
			return _this4;
		}

		_createClass(Pagination, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('current' in nextProps) {
					this.setState({
						current: nextProps.current
					});
				}

				if ('pageSize' in nextProps) {
					this.setState({
						pageSize: nextProps.pageSize
					});
				}
			}

			// private methods

		}, {
			key: '_calcPage',
			value: function _calcPage(p) {
				var pageSize = p;
				if (typeof pageSize === 'undefined') {
					pageSize = this.state.pageSize;
				}
				return Math.floor((this.props.total - 1) / pageSize) + 1;
			}
		}, {
			key: '_isValid',
			value: function _isValid(page) {
				return typeof page === 'number' && page >= 1 && page !== this.state.current;
			}
		}, {
			key: '_handleKeyDown',
			value: function _handleKeyDown(evt) {
				if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
					evt.preventDefault();
				}
			}
		}, {
			key: '_handleKeyUp',
			value: function _handleKeyUp(evt) {
				var _val = evt.target.value;
				var val = undefined;

				if (_val === '') {
					val = _val;
				} else if (isNaN(Number(_val))) {
					val = this.state._current;
				} else {
					val = Number(_val);
				}

				this.setState({
					_current: val
				});

				if (evt.keyCode === KEYCODE.ENTER) {
					this._handleChange(val);
				} else if (evt.keyCode === KEYCODE.ARROW_UP) {
					this._handleChange(val - 1);
				} else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
					this._handleChange(val + 1);
				}
			}
		}, {
			key: '_changePageSize',
			value: function _changePageSize(size) {
				if (typeof size === 'number') {
					var current = this.state.current;

					this.setState({
						pageSize: size
					});

					if (this.state.current > this._calcPage(size)) {
						current = this._calcPage(size);
						this.setState({
							current: current,
							_current: current
						});
					}

					this.props.onShowSizeChange(current, size);
				}
			}
		}, {
			key: '_handleChange',
			value: function _handleChange(p) {
				var page = p;
				if (this._isValid(page)) {
					if (page > this._calcPage()) {
						page = this._calcPage();
					}

					if (!('current' in this.props)) {
						this.setState({
							current: page,
							_current: page
						});
					}

					this.props.onChange(page);

					return page;
				}

				return this.state.current;
			}
		}, {
			key: '_prev',
			value: function _prev() {
				if (this._hasPrev()) {
					this._handleChange(this.state.current - 1);
				}
			}
		}, {
			key: '_next',
			value: function _next() {
				if (this._hasNext()) {
					this._handleChange(this.state.current + 1);
				}
			}
		}, {
			key: '_jumpPrev',
			value: function _jumpPrev() {
				this._handleChange(Math.max(1, this.state.current - 5));
			}
		}, {
			key: '_jumpNext',
			value: function _jumpNext() {
				this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
			}
		}, {
			key: '_hasPrev',
			value: function _hasPrev() {
				return this.state.current > 1;
			}
		}, {
			key: '_hasNext',
			value: function _hasNext() {
				return this.state.current < this._calcPage();
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var locale = props.locale;

				var prefixCls = props.prefixCls;
				var allPages = this._calcPage();
				var pagerList = [];
				var jumpPrev = null;
				var jumpNext = null;
				var firstPager = null;
				var lastPager = null;

				if (props.simple) {
					return React.createElement(
						'ul',
						{ className: prefixCls + ' ' + prefixCls + '-simple ' + props.className },
						React.createElement(
							'li',
							{ title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
							React.createElement('a', null)
						),
						React.createElement(
							'div',
							{ title: this.state.current + '/' + allPages, className: prefixCls + '-simple-pager' },
							React.createElement('input', { type: 'text', value: this.state._current, onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp, onChange: this._handleKeyUp }),
							React.createElement(
								'span',
								{ className: prefixCls + '-slash' },
								'／'
							),
							allPages
						),
						React.createElement(
							'li',
							{ title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
							React.createElement('a', null)
						)
					);
				}

				if (allPages <= 9) {
					for (var i = 1; i <= allPages; i++) {
						var active = this.state.current === i;
						pagerList.push(React.createElement(Pager, { locale: locale, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
					}
				} else {
					jumpPrev = React.createElement(
						'li',
						{ title: locale.prev_5, key: 'prev', onClick: this._jumpPrev, className: prefixCls + '-jump-prev' },
						React.createElement('a', null)
					);
					jumpNext = React.createElement(
						'li',
						{ title: locale.next_5, key: 'next', onClick: this._jumpNext, className: prefixCls + '-jump-next' },
						React.createElement('a', null)
					);
					lastPager = React.createElement(Pager, {
						locale: props.locale,
						last: true, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, allPages), key: allPages, page: allPages, active: false });
					firstPager = React.createElement(Pager, {
						locale: props.locale,
						rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, 1), key: 1, page: 1, active: false });

					var current = this.state.current;

					var left = Math.max(1, current - 2);
					var right = Math.min(current + 2, allPages);

					if (current - 1 <= 2) {
						right = 1 + 4;
					}

					if (allPages - current <= 2) {
						left = allPages - 4;
					}

					for (var i = left; i <= right; i++) {
						var active = current === i;
						pagerList.push(React.createElement(Pager, {
							locale: props.locale,
							rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
					}

					if (current - 1 >= 4) {
						pagerList.unshift(jumpPrev);
					}
					if (allPages - current >= 4) {
						pagerList.push(jumpNext);
					}

					if (left !== 1) {
						pagerList.unshift(firstPager);
					}
					if (right !== allPages) {
						pagerList.push(lastPager);
					}
				}

				var totalText = null;

				if (props.showTotal) {
					totalText = React.createElement(
						'span',
						{ className: prefixCls + '-total-text' },
						props.showTotal(props.total)
					);
				}

				return React.createElement(
					'ul',
					{ className: prefixCls + ' ' + props.className,
						unselectable: 'unselectable' },
					totalText,
					React.createElement(
						'li',
						{ title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
						React.createElement('a', null)
					),
					pagerList,
					React.createElement(
						'li',
						{ title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
						React.createElement('a', null)
					),
					React.createElement(Options, {
						locale: props.locale,
						rootPrefixCls: prefixCls,
						selectComponentClass: props.selectComponentClass,
						selectPrefixCls: props.selectPrefixCls,
						changeSize: this.props.showSizeChanger ? this._changePageSize.bind(this) : null,
						current: this.state.current,
						pageSize: this.props.pageSize,
						pageSizeOptions: this.props.pageSizeOptions,
						quickGo: this.props.showQuickJumper ? this._handleChange.bind(this) : null })
				);
			}
		}]);

		return Pagination;
	})(React.Component);

	Pagination.propTypes = {
		current: React.PropTypes.number,
		defaultCurrent: React.PropTypes.number,
		total: React.PropTypes.number,
		pageSize: React.PropTypes.number,
		onChange: React.PropTypes.func,
		showSizeChanger: React.PropTypes.bool,
		onShowSizeChange: React.PropTypes.func,
		selectComponentClass: React.PropTypes.func,
		showQuickJumper: React.PropTypes.bool,
		pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
		showTotal: React.PropTypes.func,
		locale: React.PropTypes.object
	};

	Pagination.defaultProps = {
		defaultCurrent: 1,
		total: 0,
		pageSize: 10,
		onChange: noop,
		className: '',
		selectPrefixCls: 'rc-select',
		prefixCls: 'rc-pagination',
		selectComponentClass: null,
		showQuickJumper: false,
		showSizeChanger: false,
		onShowSizeChange: noop,
		locale: LOCALE
	};

	RC.Pagination = Pagination;
})(Smart.RC);
'use strict';

+(function (RC) {
	var objectAssign = _.assign;

	var TableRow = React.createClass({
		displayName: 'TableRow',

		propTypes: {
			onDestroy: React.PropTypes.func,
			record: React.PropTypes.object,
			prefixCls: React.PropTypes.string
		},

		componentWillUnmount: function componentWillUnmount() {
			this.props.onDestroy(this.props.record);
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.prefixCls;
			var columns = props.columns;
			var record = props.record;
			var index = props.index;
			var cells = [];
			var expanded = props.expanded;
			var expandable = props.expandable;
			var expandIconAsCell = props.expandIconAsCell;
			var indent = props.indent;
			var indentSize = props.indentSize;
			var needIndentSpaced = props.needIndentSpaced;
			var onRowClick = props.onRowClick;

			for (var i = 0; i < columns.length; i++) {
				var col = columns[i];
				var colClassName = col.className || '';
				var render = col.render;
				var text = record[col.dataIndex];

				var expandIcon = null;
				var tdProps = undefined;
				var colSpan = undefined;
				var rowSpan = undefined;
				var notRender = false;
				var indentText = undefined;

				if (i === 0 && expandable) {
					expandIcon = React.createElement('span', {
						className: prefixCls + '-expand-icon ' + prefixCls + '-' + (expanded ? 'expanded' : 'collapsed'),
						onClick: props.onExpand.bind(null, !expanded, record) });
				} else if (i === 0 && needIndentSpaced) {
					expandIcon = React.createElement('span', {
						className: prefixCls + '-expand-icon ' + prefixCls + '-spaced' });
				}

				if (expandIconAsCell && i === 0) {
					cells.push(React.createElement(
						'td',
						{ className: prefixCls + '-expand-icon-cell',
							key: 'rc-table-expand-icon-cell' },
						expandIcon
					));
					expandIcon = null;
				}

				if (render) {
					text = render(text, record, index) || {};
					tdProps = text.props || {};

					if (typeof text !== 'string' && !React.isValidElement(text) && 'children' in text) {
						text = text.children;
					}
					rowSpan = tdProps.rowSpan;
					colSpan = tdProps.colSpan;
				}

				if (rowSpan === 0 || colSpan === 0) {
					notRender = true;
				}

				indentText = i === 0 ? React.createElement('span', { style: { paddingLeft: indentSize * indent + 'px' }, className: prefixCls + '-indent indent-level-' + indent }) : null;

				if (!notRender) {
					cells.push(React.createElement(
						'td',
						{ key: col.key, colSpan: colSpan, rowSpan: rowSpan, className: '' + colClassName },
						indentText,
						expandIcon,
						text
					));
				}
			}
			return React.createElement(
				'tr',
				{ onClick: onRowClick ? onRowClick.bind(null, record, index) : null, className: prefixCls + ' ' + props.className, style: { display: props.visible ? '' : 'none' } },
				cells
			);
		}
	});

	var Table = React.createClass({
		displayName: 'Table',

		propTypes: {
			data: React.PropTypes.array,
			expandIconAsCell: React.PropTypes.bool,
			expandedRowKeys: React.PropTypes.array,
			defaultExpandedRowKeys: React.PropTypes.array,
			useFixedHeader: React.PropTypes.bool,
			columns: React.PropTypes.array,
			prefixCls: React.PropTypes.string,
			bodyStyle: React.PropTypes.object,
			style: React.PropTypes.object,
			rowKey: React.PropTypes.func,
			rowClassName: React.PropTypes.func,
			expandedRowClassName: React.PropTypes.func,
			childrenColumnName: React.PropTypes.string,
			onExpandedRowsChange: React.PropTypes.func,
			indentSize: React.PropTypes.number,
			onRowClick: React.PropTypes.func,
			columnsPageRange: React.PropTypes.array,
			columnsPageSize: React.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: [],
				useFixedHeader: false,
				expandIconAsCell: false,
				columns: [],
				defaultExpandedRowKeys: [],
				rowKey: function rowKey(o) {
					return o.key;
				},
				rowClassName: function rowClassName() {
					return '';
				},
				expandedRowClassName: function expandedRowClassName() {
					return '';
				},
				onExpandedRowsChange: function onExpandedRowsChange() {},

				prefixCls: 'rc-table',
				bodyStyle: {},
				style: {},
				childrenColumnName: 'children',
				indentSize: 15,
				columnsPageSize: 5
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			return {
				expandedRowKeys: props.expandedRowKeys || props.defaultExpandedRowKeys,
				data: this.props.data,
				currentColumnsPage: 0
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('data' in nextProps) {
				this.setState({
					data: nextProps.data
				});
			}
			if ('expandedRowKeys' in nextProps) {
				this.setState({
					expandedRowKeys: nextProps.expandedRowKeys
				});
			}
		},
		onExpandedRowsChange: function onExpandedRowsChange(expandedRowKeys) {
			if (!this.props.expandedRowKeys) {
				this.setState({
					expandedRowKeys: expandedRowKeys
				});
			}
			this.props.onExpandedRowsChange(expandedRowKeys);
		},
		onExpanded: function onExpanded(expanded, record) {
			var info = this.findExpandedRow(record);
			if (info && !expanded) {
				this.onRowDestroy(record);
			} else if (!info && expanded) {
				var expandedRows = this.getExpandedRows().concat();
				expandedRows.push(this.props.rowKey(record));
				this.onExpandedRowsChange(expandedRows);
			}
		},
		onRowDestroy: function onRowDestroy(record) {
			var expandedRows = this.getExpandedRows().concat();
			var rowKey = this.props.rowKey(record);
			var index = -1;
			expandedRows.forEach(function (r, i) {
				if (r === rowKey) {
					index = i;
				}
			});
			if (index !== -1) {
				expandedRows.splice(index, 1);
			}
			this.onExpandedRowsChange(expandedRows);
		},
		getExpandedRows: function getExpandedRows() {
			return this.props.expandedRowKeys || this.state.expandedRowKeys;
		},
		getThs: function getThs() {
			var ths = [];
			if (this.props.expandIconAsCell) {
				ths.push({
					key: 'rc-table-expandIconAsCell',
					className: this.props.prefixCls + '-expand-icon-th',
					title: ''
				});
			}
			ths = ths.concat(this.getCurrentColumns());
			return ths.map(function (c) {
				if (c.colSpan !== 0) {
					return React.createElement(
						'th',
						{ key: c.key, colSpan: c.colSpan, className: c.className || '' },
						c.title
					);
				}
			});
		},
		getExpandedRow: function getExpandedRow(key, content, visible, className) {
			var prefixCls = this.props.prefixCls;
			return React.createElement(
				'tr',
				{ key: key + '-extra-row', style: { display: visible ? '' : 'none' }, className: prefixCls + '-expanded-row ' + className },
				this.props.expandIconAsCell ? React.createElement('td', { key: 'rc-table-expand-icon-placeholder' }) : '',
				React.createElement(
					'td',
					{ colSpan: this.props.columns.length },
					content
				)
			);
		},
		getRowsByData: function getRowsByData(data, visible, indent) {
			var props = this.props;
			var columns = this.getCurrentColumns();
			var childrenColumnName = props.childrenColumnName;
			var expandedRowRender = props.expandedRowRender;
			var expandIconAsCell = props.expandIconAsCell;
			var rst = [];
			var keyFn = props.rowKey;
			var rowClassName = props.rowClassName;
			var expandedRowClassName = props.expandedRowClassName;
			var needIndentSpaced = props.data.some(function (record) {
				return record[childrenColumnName] && record[childrenColumnName].length > 0;
			});
			var onRowClick = props.onRowClick;
			for (var i = 0; i < data.length; i++) {
				var record = data[i];
				var key = keyFn ? keyFn(record, i) : undefined;
				var childrenColumn = record[childrenColumnName];
				var isRowExpanded = this.isRowExpanded(record);
				var expandedRowContent = undefined;
				if (expandedRowRender && isRowExpanded) {
					expandedRowContent = expandedRowRender(record, i);
				}
				var className = rowClassName(record, i);
				rst.push(React.createElement(TableRow, {
					indent: indent,
					indentSize: props.indentSize,
					needIndentSpaced: needIndentSpaced,
					className: className,
					record: record,
					expandIconAsCell: expandIconAsCell,
					onDestroy: this.onRowDestroy,
					index: i,
					visible: visible,
					onExpand: this.onExpanded,
					expandable: childrenColumn || expandedRowRender,
					expanded: isRowExpanded,
					prefixCls: props.prefixCls + '-row',
					childrenColumnName: childrenColumnName,
					columns: columns,
					onRowClick: onRowClick,
					key: key }));

				var subVisible = visible && isRowExpanded;

				if (expandedRowContent && isRowExpanded) {
					rst.push(this.getExpandedRow(key, expandedRowContent, subVisible, expandedRowClassName(record, i)));
				}
				if (childrenColumn) {
					rst = rst.concat(this.getRowsByData(childrenColumn, subVisible, indent + 1));
				}
			}
			return rst;
		},
		getRows: function getRows() {
			return this.getRowsByData(this.state.data, true, 0);
		},
		getColGroup: function getColGroup() {
			var cols = [];
			if (this.props.expandIconAsCell) {
				cols.push(React.createElement('col', { className: this.props.prefixCls + '-expand-icon-col', key: 'rc-table-expand-icon-col' }));
			}
			cols = cols.concat(this.props.columns.map(function (c) {
				return React.createElement('col', { key: c.key, style: { width: c.width } });
			}));
			return React.createElement(
				'colgroup',
				null,
				cols
			);
		},
		getCurrentColumns: function getCurrentColumns() {
			var _this = this;

			var _props = this.props;
			var columns = _props.columns;
			var columnsPageRange = _props.columnsPageRange;
			var columnsPageSize = _props.columnsPageSize;
			var prefixCls = _props.prefixCls;
			var currentColumnsPage = this.state.currentColumnsPage;

			if (!columnsPageRange || columnsPageRange[0] > columnsPageRange[1]) {
				return columns;
			}
			return columns.map(function (column, i) {
				var newColumn = objectAssign({}, column);
				if (i >= columnsPageRange[0] && i <= columnsPageRange[1]) {
					var pageIndexStart = columnsPageRange[0] + currentColumnsPage * columnsPageSize;
					var pageIndexEnd = columnsPageRange[0] + (currentColumnsPage + 1) * columnsPageSize - 1;
					if (pageIndexEnd > columnsPageRange[1]) {
						pageIndexEnd = columnsPageRange[1];
					}
					if (i < pageIndexStart || i > pageIndexEnd) {
						newColumn.className = newColumn.className || '';
						newColumn.className += ' ' + prefixCls + '-column-hidden';
					}
					newColumn = _this.wrapPageColumn(newColumn, i === pageIndexStart, i === pageIndexEnd);
				}
				return newColumn;
			});
		},
		getMaxColumnsPage: function getMaxColumnsPage() {
			var _props2 = this.props;
			var columnsPageRange = _props2.columnsPageRange;
			var columnsPageSize = _props2.columnsPageSize;

			return Math.floor((columnsPageRange[1] - columnsPageRange[0] - 1) / columnsPageSize);
		},
		goToColumnsPage: function goToColumnsPage(currentColumnsPage) {
			var maxColumnsPage = this.getMaxColumnsPage();
			var page = currentColumnsPage;
			if (page < 0) {
				page = 0;
			}
			if (page > maxColumnsPage) {
				page = maxColumnsPage;
			}
			this.setState({
				currentColumnsPage: page
			});
		},
		prevColumnsPage: function prevColumnsPage() {
			this.goToColumnsPage(this.state.currentColumnsPage - 1);
		},
		nextColumnsPage: function nextColumnsPage() {
			this.goToColumnsPage(this.state.currentColumnsPage + 1);
		},
		wrapPageColumn: function wrapPageColumn(column, hasPrev, hasNext) {
			var prefixCls = this.props.prefixCls;
			var currentColumnsPage = this.state.currentColumnsPage;

			var maxColumnsPage = this.getMaxColumnsPage();
			var prevHandlerCls = prefixCls + '-prev-columns-page';
			if (currentColumnsPage === 0) {
				prevHandlerCls += ' ' + prefixCls + '-prev-columns-page-disabled';
			}
			var prevHandler = React.createElement('span', { className: prevHandlerCls, onClick: this.prevColumnsPage });
			var nextHandlerCls = prefixCls + '-next-columns-page';
			if (currentColumnsPage === maxColumnsPage) {
				nextHandlerCls += ' ' + prefixCls + '-next-columns-page-disabled';
			}
			var nextHandler = React.createElement('span', { className: nextHandlerCls, onClick: this.nextColumnsPage });
			if (hasPrev) {
				column.title = React.createElement(
					'span',
					null,
					prevHandler,
					column.title
				);
				column.className = (column.className || '') + (' ' + prefixCls + '-column-has-prev');
			}
			if (hasNext) {
				column.title = React.createElement(
					'span',
					null,
					column.title,
					nextHandler
				);
				column.className = (column.className || '') + (' ' + prefixCls + '-column-has-next');
			}
			return column;
		},
		findExpandedRow: function findExpandedRow(record) {
			var keyFn = this.props.rowKey;
			var currentRowKey = keyFn(record);
			var rows = this.getExpandedRows().filter(function (i) {
				return i === currentRowKey;
			});
			return rows[0] || null;
		},
		isRowExpanded: function isRowExpanded(record) {
			return !!this.findExpandedRow(record);
		},
		render: function render() {
			var props = this.props;
			var prefixCls = props.prefixCls;
			var columns = this.getThs();
			var rows = this.getRows();
			var className = props.prefixCls;
			if (props.className) {
				className += ' ' + props.className;
			}
			if (props.columnsPageRange) {
				className += ' ' + prefixCls + '-columns-paging';
			}
			var headerTable = undefined;
			var thead = React.createElement(
				'thead',
				{ className: prefixCls + '-thead' },
				React.createElement(
					'tr',
					null,
					columns
				)
			);
			if (props.useFixedHeader) {
				headerTable = React.createElement(
					'div',
					{ className: prefixCls + '-header' },
					React.createElement(
						'table',
						null,
						this.getColGroup(),
						thead
					)
				);
				thead = null;
			}
			return React.createElement(
				'div',
				{ className: className, style: props.style },
				headerTable,
				React.createElement(
					'div',
					{ className: prefixCls + '-body', style: props.bodyStyle },
					React.createElement(
						'table',
						null,
						this.getColGroup(),
						thead,
						React.createElement(
							'tbody',
							{ className: prefixCls + '-tbody' },
							rows
						)
					)
				)
			);
		}
	});

	RC.Table = Table;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (RC) {
	var classNames = RC.classNames;

	var Step = React.createClass({
		displayName: 'Step',

		propTypes: {
			className: React.PropTypes.string,
			prefixCls: React.PropTypes.string,
			style: React.PropTypes.object,
			tailWidth: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
			status: React.PropTypes.string,
			iconPrefix: React.PropTypes.string,
			icon: React.PropTypes.string,
			maxDescriptionWidth: React.PropTypes.number,
			stepLast: React.PropTypes.bool,
			stepNumber: React.PropTypes.string,
			description: React.PropTypes.any,
			title: React.PropTypes.any
		},
		render: function render() {
			var _classNames, _classNames2;

			var _props = this.props;
			var className = _props.className;
			var prefixCls = _props.prefixCls;
			var style = _props.style;
			var tailWidth = _props.tailWidth;
			var _props$status = _props.status;
			var status = _props$status === undefined ? 'wait' : _props$status;
			var iconPrefix = _props.iconPrefix;
			var icon = _props.icon;
			var maxDescriptionWidth = _props.maxDescriptionWidth;
			var stepLast = _props.stepLast;
			var stepNumber = _props.stepNumber;
			var description = _props.description;
			var title = _props.title;

			var restProps = _objectWithoutProperties(_props, ['className', 'prefixCls', 'style', 'tailWidth', 'status', 'iconPrefix', 'icon', 'maxDescriptionWidth', 'stepLast', 'stepNumber', 'description', 'title']);

			var iconClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-icon', true), _defineProperty(_classNames, iconPrefix + 'icon', true), _defineProperty(_classNames, iconPrefix + 'icon-' + (icon || 'check'), true), _classNames));
			var iconNode = icon || status === 'finish' ? React.createElement('span', { className: iconClassName }) : React.createElement(
				'span',
				{ className: prefixCls + '-icon' },
				stepNumber
			);
			var classString = classNames((_classNames2 = {}, _defineProperty(_classNames2, className, !!className), _defineProperty(_classNames2, prefixCls + '-item', true), _defineProperty(_classNames2, prefixCls + '-item-last', stepLast), _defineProperty(_classNames2, prefixCls + '-status-' + status, true), _defineProperty(_classNames2, prefixCls + '-custom', icon), _classNames2));
			return React.createElement(
				'div',
				_extends({}, restProps, { className: classString, style: { width: tailWidth } }),
				stepLast ? '' : React.createElement(
					'div',
					{ className: prefixCls + '-tail' },
					React.createElement('i', null)
				),
				React.createElement(
					'div',
					{ className: prefixCls + '-head' },
					React.createElement(
						'div',
						{ className: prefixCls + '-head-inner' },
						iconNode
					)
				),
				React.createElement(
					'div',
					{ className: prefixCls + '-main', style: { maxWidth: maxDescriptionWidth } },
					React.createElement(
						'div',
						{ className: prefixCls + '-title' },
						title
					),
					description ? React.createElement(
						'div',
						{ className: prefixCls + '-description' },
						description
					) : ''
				)
			);
		}
	});

	var Steps = React.createClass({
		displayName: 'Steps',

		propTypes: {
			direction: React.PropTypes.string,
			children: React.PropTypes.any
		},
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'rc-steps',
				iconPrefix: 'rc',
				maxDescriptionWidth: 120,
				direction: '',
				current: 0
			};
		},
		getInitialState: function getInitialState() {
			return {
				init: false,
				tailWidth: 0
			};
		},
		componentDidMount: function componentDidMount() {
			var _this = this;

			if (this.props.direction === 'vertical') {
				return;
			}
			var $dom = ReactDOM.findDOMNode(this);
			var len = $dom.children.length - 1;
			this._itemsWidth = new Array(len + 1);

			var i = undefined;
			for (i = 0; i <= len - 1; i++) {
				var $item = $dom.children[i].children;
				this._itemsWidth[i] = Math.ceil($item[0].offsetWidth + $item[1].children[0].offsetWidth);
			}
			this._itemsWidth[i] = Math.ceil($dom.children[len].offsetWidth);
			this._previousStepsWidth = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
			this._update();

			/*
    * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
    * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
    */
			$dom.children[len].style.position = 'absolute';

			/*
    * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
    * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
    * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，_resize里面会判断要不要更新。
    */
			setTimeout(function () {
				_this._resize();
			});

			if (window.attachEvent) {
				window.attachEvent('onresize', this._resize);
			} else {
				window.addEventListener('resize', this._resize);
			}
		},
		componentDidUpdate: function componentDidUpdate() {
			this._resize();
		},
		componentWillUnmount: function componentWillUnmount() {
			if (this.props.direction === 'vertical') {
				return;
			}
			if (window.attachEvent) {
				window.detachEvent('onresize', this._resize);
			} else {
				window.removeEventListener('resize', this._resize);
			}
		},

		_previousStepsWidth: 0,
		_itemsWidth: [],
		_resize: function _resize() {
			var w = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
			if (this._previousStepsWidth === w) {
				return;
			}
			this._previousStepsWidth = w;
			this._update();
		},
		_update: function _update() {
			var len = this.props.children.length - 1;
			var tw = 0;
			this._itemsWidth.forEach(function (w) {
				tw += w;
			});
			var dw = Math.floor((this._previousStepsWidth - tw) / len) - 1;
			if (dw <= 0) {
				return;
			}
			this.setState({
				init: true,
				tailWidth: dw
			});
		},
		render: function render() {
			var _this2 = this;

			var props = this.props;
			var prefixCls = props.prefixCls;
			var children = props.children;
			var maxDescriptionWidth = props.maxDescriptionWidth;
			var iconPrefix = props.iconPrefix;
			var len = children.length - 1;
			var iws = this._itemsWidth;
			var clsName = prefixCls;
			clsName += props.size === 'small' ? ' ' + prefixCls + '-small' : '';
			clsName += props.direction === 'vertical' ? ' ' + prefixCls + '-vertical' : '';

			return React.createElement(
				'div',
				{ className: clsName },
				React.Children.map(children, function (ele, idx) {
					var np = {
						stepNumber: (idx + 1).toString(),
						stepLast: idx === len,
						tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + _this2.state.tailWidth,
						prefixCls: prefixCls,
						iconPrefix: iconPrefix,
						maxDescriptionWidth: maxDescriptionWidth
					};
					if (!ele.props.status) {
						if (idx === props.current) {
							np.status = 'process';
						} else if (idx < props.current) {
							np.status = 'finish';
						} else {
							np.status = 'wait';
						}
					}
					return React.cloneElement(ele, np);
				}, this)
			);
		}
	});

	Steps.Step = Step;
	RC.Steps = Steps;
})(Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export this package's api
+(function (RC) {
	var Trigger = RC.Trigger;
	var arrayTreeFilter = RC.arrayTreeFilter;
	var _ReactDOM = ReactDOM;
	var findDOMNode = _ReactDOM.findDOMNode;

	var Menus = (function (_React$Component) {
		_inherits(Menus, _React$Component);

		function Menus(props) {
			_classCallCheck(this, Menus);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Menus).call(this));

			var value = props.value;
			var defaultValue = props.defaultValue;

			var initialValue = value || defaultValue || [];
			_this.state = {
				activeValue: initialValue,
				value: initialValue
			};
			return _this;
		}

		_createClass(Menus, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.scrollActiveItemToView();
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('value' in nextProps) {
					this.setState({
						value: nextProps.value || []
					});
				}
				// sync activeValue with value when panel open
				if (nextProps.visible && !this.props.visible) {
					this.setState({
						activeValue: this.state.value
					});
				}
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps) {
				if (!prevProps.visible && this.props.visible) {
					this.scrollActiveItemToView();
				}
			}
		}, {
			key: 'onSelect',
			value: function onSelect(targetOption, menuIndex) {
				if (!targetOption || targetOption.disabled) {
					return;
				}
				var activeValue = this.state.activeValue;
				activeValue = activeValue.slice(0, menuIndex + 1);
				activeValue[menuIndex] = targetOption.value;
				var activeOptions = this.getActiveOptions(activeValue);
				if (targetOption.isLeaf === false && !targetOption.children && this.props.loadData) {
					this.setState({ activeValue: activeValue });
					this.props.loadData(activeOptions);
					return;
				}
				if (!targetOption.children || !targetOption.children.length) {
					this.props.onChange(activeOptions, { visible: false });
					// set value to activeValue when select leaf option
					this.setState({ value: activeValue });
				} else if (this.props.changeOnSelect) {
					this.props.onChange(activeOptions, { visible: true });
					// set value to activeValue on every select
					this.setState({ value: activeValue });
				}
				this.setState({ activeValue: activeValue });
			}
		}, {
			key: 'getOption',
			value: function getOption(option, menuIndex) {
				var _props = this.props;
				var prefixCls = _props.prefixCls;
				var expandTrigger = _props.expandTrigger;

				var onSelect = this.onSelect.bind(this, option, menuIndex);
				var expandProps = {
					onClick: onSelect
				};
				var menuItemCls = prefixCls + '-menu-item';
				if (expandTrigger === 'hover' && option.children && option.children.length > 0) {
					expandProps = {
						onMouseEnter: onSelect
					};
					menuItemCls += ' ' + prefixCls + '-menu-item-expand';
				}
				if (this.isActiveOption(option)) {
					menuItemCls += ' ' + prefixCls + '-menu-item-active';
					expandProps.ref = 'activeItem' + menuIndex;
				}
				if (option.disabled) {
					menuItemCls += ' ' + prefixCls + '-menu-item-disabled';
				}
				return React.createElement(
					'li',
					_extends({ key: option.value,
						className: menuItemCls,
						title: option.label
					}, expandProps),
					option.label
				);
			}
		}, {
			key: 'getActiveOptions',
			value: function getActiveOptions(values) {
				var activeValue = values || this.state.activeValue;
				var options = this.props.options;
				return arrayTreeFilter(options, function (o, level) {
					return o.value === activeValue[level];
				});
			}
		}, {
			key: 'getShowOptions',
			value: function getShowOptions() {
				var options = this.props.options;

				var result = this.getActiveOptions().map(function (activeOption) {
					return activeOption.children;
				}).filter(function (activeOption) {
					return !!activeOption;
				});
				result.unshift(options);
				return result;
			}
		}, {
			key: 'scrollActiveItemToView',
			value: function scrollActiveItemToView() {
				// scroll into view
				var optionsLength = this.getShowOptions().length;
				for (var i = 0; i < optionsLength; i++) {
					var itemComponent = this.refs['activeItem' + i];
					if (itemComponent) {
						var target = findDOMNode(itemComponent);
						target.parentNode.scrollTop = target.offsetTop;
					}
				}
			}
		}, {
			key: 'isActiveOption',
			value: function isActiveOption(option) {
				return this.state.activeValue.some(function (value) {
					return value === option.value;
				});
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var prefixCls = this.props.prefixCls;

				return React.createElement(
					'div',
					null,
					this.getShowOptions().map(function (options, menuIndex) {
						return React.createElement(
							'ul',
							{ className: prefixCls + '-menu', key: menuIndex },
							options.map(function (option) {
								return _this2.getOption(option, menuIndex);
							})
						);
					})
				);
			}
		}]);

		return Menus;
	})(React.Component);

	Menus.defaultProps = {
		options: [],
		onChange: function onChange() {},
		onSelect: function onSelect() {},

		prefixCls: 'rc-cascader-menus',
		visible: false,
		expandTrigger: 'click',
		changeOnSelect: false
	};

	Menus.propTypes = {
		options: React.PropTypes.array.isRequired,
		prefixCls: React.PropTypes.string,
		expandTrigger: React.PropTypes.string,
		onChange: React.PropTypes.func,
		loadData: React.PropTypes.func,
		visible: React.PropTypes.bool,
		changeOnSelect: React.PropTypes.bool
	};

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

	var Cascader = (function (_React$Component2) {
		_inherits(Cascader, _React$Component2);

		function Cascader(props) {
			_classCallCheck(this, Cascader);

			var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Cascader).call(this));

			_this3.state = {
				popupVisible: props.popupVisible
			};
			['handleChange', 'handlePopupVisibleChange', 'setPopupVisible', 'getPopupDOMNode'].forEach(function (method) {
				return _this3[method] = _this3[method].bind(_this3);
			});
			return _this3;
		}

		_createClass(Cascader, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('popupVisible' in nextProps) {
					this.setState({
						popupVisible: nextProps.popupVisible
					});
				}
			}
		}, {
			key: 'getPopupDOMNode',
			value: function getPopupDOMNode() {
				return this.refs.trigger.getPopupDomNode();
			}
		}, {
			key: 'setPopupVisible',
			value: function setPopupVisible(popupVisible) {
				if (!('popupVisible' in this.props)) {
					this.setState({ popupVisible: popupVisible });
				}
				this.props.onPopupVisibleChange(popupVisible);
			}
		}, {
			key: 'handleChange',
			value: function handleChange(options, setProps) {
				this.props.onChange(options.map(function (o) {
					return o.value;
				}), options);
				this.setPopupVisible(setProps.visible);
			}
		}, {
			key: 'handlePopupVisibleChange',
			value: function handlePopupVisibleChange(popupVisible) {
				this.setPopupVisible(popupVisible);
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var prefixCls = props.prefixCls;
				var transitionName = props.transitionName;
				var popupClassName = props.popupClassName;
				// Did not show popup when there is no options

				var menus = React.createElement('div', null);
				var emptyMenuClassName = '';
				if (props.options && props.options.length > 0) {
					menus = React.createElement(Menus, _extends({}, props, {
						onChange: this.handleChange,
						onSelect: this.props.onSelect,
						visible: this.state.popupVisible }));
				} else {
					emptyMenuClassName = ' ' + prefixCls + '-menus-empty';
				}
				return React.createElement(
					Trigger,
					{ ref: 'trigger',
						popupPlacement: 'bottomLeft',
						builtinPlacements: BUILT_IN_PLACEMENTS,
						popupTransitionName: transitionName,
						action: props.disabled ? [] : ['click'],
						popupVisible: props.disabled ? false : this.state.popupVisible,
						onPopupVisibleChange: this.handlePopupVisibleChange,
						prefixCls: prefixCls + '-menus',
						popupClassName: popupClassName + emptyMenuClassName,
						popup: menus },
					props.children
				);
			}
		}]);

		return Cascader;
	})(React.Component);

	Cascader.defaultProps = {
		options: [],
		onChange: function onChange() {},
		onSelect: function onSelect() {},
		onPopupVisibleChange: function onPopupVisibleChange() {},

		disabled: false,
		transitionName: '',
		prefixCls: 'rc-cascader',
		popupClassName: ''
	};

	Cascader.propTypes = {
		options: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		onPopupVisibleChange: React.PropTypes.func,
		popupVisible: React.PropTypes.bool,
		disabled: React.PropTypes.bool,
		transitionName: React.PropTypes.string,
		popupClassName: React.PropTypes.string,
		prefixCls: React.PropTypes.string
	};

	RC.Cascader = Cascader;
})(Smart.RC);