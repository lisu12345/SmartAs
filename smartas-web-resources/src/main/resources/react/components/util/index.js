+ function(RC) {
  const util = {};
  RC.Util = RC.util = util;
  /**
   * @ignore
   * some key-codes definition and utils from closure-library
   * @author yiminghe@gmail.com
   */

  const KeyCode = {
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
    WIN_IME: 229,
  };

  /*
   whether text and modified key is entered at the same time.
   */
  KeyCode.isTextModifyingKeyEvent = function isTextModifyingKeyEvent(e) {
    const keyCode = e.keyCode;
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
    if (keyCode >= KeyCode.ZERO &&
      keyCode <= KeyCode.NINE) {
      return true;
    }

    if (keyCode >= KeyCode.NUM_ZERO &&
      keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }

    if (keyCode >= KeyCode.A &&
      keyCode <= KeyCode.Z) {
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
    const args = arguments;
    return function chainedFunction() {
      for (let i = 0; i < args.length; i++) {
        if (args[i] && args[i].apply) {
          args[i].apply(this, arguments);
        }
      }
    };
  }
  util.createChainedFunction = createChainedFunction;


  function shallowEqual(objA, objB, compare, compareContext) {

    const ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
      return !!ret;
    }

    if (objA === objB) {
      return true;
    }

    if (typeof objA !== 'object' || objA === null ||
      typeof objB !== 'object' || objB === null) {
      return false;
    }

    const keysA = fetchKeys(objA);
    const keysB = fetchKeys(objB);

    const len = keysA.length;
    if (len !== keysB.length) {
      return false;
    }

    compareContext = compareContext || null;

    // Test for A's keys different from B.
    const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
    for (let i = 0; i < len; i++) {
      const key = keysA[i];
      if (!bHasOwnProperty(key)) {
        return false;
      }
      const valueA = objA[key];
      const valueB = objB[key];

      const ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
      if (ret === false || ret === void 0 && valueA !== valueB) {
        return false;
      }
    }

    return true;
  };
  util.shallowEqual = shallowEqual;

  const PureRenderMixin = {
    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    },
  };

  util.PureRenderMixin = PureRenderMixin;

  let seed = 0;

  function guid() {
    return Date.now() + '_' + (seed++);
  };

  util.guid = guid;
  util.uid = guid;
  util.getUuid = guid;
  
  util.warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
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
  }

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
    if ((computedStyle = (computedStyle || d.defaultView.getComputedStyle(elem, null)))) {
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
      style[LEFT] = name === 'fontSize' ? '1em' : (ret || 0);
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
      current, key;

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
      prop, j, i;
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

  each(['Width', 'Height'], function(name) {
    domUtils['doc' + name] = function(refWin) {
      var d = refWin.document;
      return Math.max(
        //firefox chrome documentElement.scrollHeight< body.scrollHeight
        //ie standard mode : documentElement.scrollHeight> body.scrollHeight
        d.documentElement['scroll' + name],
        //quirks : documentElement.scrollHeight 最大等于可视窗口多一点？
        d.body['scroll' + name],
        domUtils['viewport' + name](d));
    };

    domUtils['viewport' + name] = function(win) {
      // pc browser includes scrollbar in window.innerWidth
      var prop = 'client' + name,
        doc = win.document,
        body = doc.body,
        documentElement = doc.documentElement,
        documentElementProp = documentElement[prop];
      // 标准模式取 documentElement
      // backcompat 取 body
      return doc.compatMode === 'CSS1Compat' && documentElementProp ||
        body && body[prop] || documentElementProp;
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
      if (cssBoxValue == null || (Number(cssBoxValue)) < 0) {
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
        return val - getPBMWidth(elem, ['border', 'padding'],
          which, computedStyle);
      } else {
        return cssBoxValue;
      }
    } else if (borderBoxValueOrIsBorderBox) {
      return val + (extra === BORDER_INDEX ? 0 :
        (extra === PADDING_INDEX ?
          -getPBMWidth(elem, ['border'], which, computedStyle) :
          getPBMWidth(elem, ['margin'], which, computedStyle)));
    } else {
      return cssBoxValue + getPBMWidth(elem, BOX_MODELS.slice(extra),
        which, computedStyle);
    }
  }

  var cssShow = {
    position: 'absolute',
    visibility: 'hidden',
    display: 'block'
  };

  // fix #119 : https://github.com/kissyteam/kissy/issues/119
  function getWHIgnoreDisplay(elem) {
    var val, args = arguments;
    // in case elem is window
    // elem.offsetWidth === undefined
    if (elem.offsetWidth !== 0) {
      val = getWH.apply(undefined, args);
    } else {
      swap(elem, cssShow, function() {
        val = getWH.apply(undefined, args);
      });
    }
    return val;
  }

  each(['width', 'height'], function(name) {
    var first = name.charAt(0).toUpperCase() + name.slice(1);
    domUtils['outer' + first] = function(el, includeMargin) {
      return el && getWHIgnoreDisplay(el, name, includeMargin ? MARGIN_INDEX : BORDER_INDEX);
    };
    var which = name === 'width' ? ['Left', 'Right'] : ['Top', 'Bottom'];

    domUtils[name] = function(elem, val) {
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
    if (typeof name === 'object') {
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
    getWindow: function(node) {
      var doc = node.ownerDocument || node;
      return doc.defaultView || doc.parentWindow || node;
    },
    offset: function(el, value) {
      if (typeof value !== 'undefined') {
        setOffset(el, value);
      } else {
        return getOffset(el);
      }
    },
    isWindow: isWindow,
    each: each,
    css: css,
    clone: function(obj) {
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
    getWindowScrollLeft(w) {
      return getScrollLeft(w);
    },
    getWindowScrollTop(w) {
      return getScrollTop(w);
    },
    scrollLeft: function(w, v) {
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
    scrollTop: function(w, v) {
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
    merge: function() {
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



  util.scrollIntoView = function(elem, container, config) {
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
    var containerOffset, ch, cw, containerScroll,
      diffTop, diffBottom, win,
      winScroll, ww, wh;

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
        left: elemOffset.left - (containerOffset.left +
          (parseFloat(util.css(container, 'borderLeftWidth')) || 0)),
        top: elemOffset.top - (containerOffset.top +
          (parseFloat(util.css(container, 'borderTopWidth')) || 0))
      };
      diffBottom = {
        left: elemOffset.left + ew -
          (containerOffset.left + cw +
            (parseFloat(util.css(container, 'borderRightWidth')) || 0)),
        top: elemOffset.top + eh -
          (containerOffset.top + ch +
            (parseFloat(util.css(container, 'borderBottomWidth')) || 0))
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
  }



  util.Dom = {
    addEventListener: function(target, eventType, cb) {
      /* eslint camelcase: 2 */
      const callback = ReactDOM.unstable_batchedUpdates ? function run(e) {
        ReactDOM.unstable_batchedUpdates(cb, e);
      } : cb;
      return $(target).on(eventType, callback);
    },
    contains: function(root, n) {
      let node = n;
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
    toArray: function(children) {
      const ret = [];
      React.Children.forEach(children, function each(c) {
        ret.push(c);
      });
      return ret;
    },
    mapSelf: function(children) {
      // return ReactFragment
      return React.Children.map(children, mirror);
    }
  };

  const REACT_STATICS = {
	    childContextTypes: true,
	    contextTypes: true,
	    defaultProps: true,
	    displayName: true,
	    getDefaultProps: true,
	    mixins: true,
	    propTypes: true,
	    type: true
	};

  const KNOWN_STATICS = {
	    name: true,
	    length: true,
	    prototype: true,
	    caller: true,
	    arguments: true,
	    arity: true
	};

	function hoistNonReactStatics(targetComponent, sourceComponent) {
	    var keys = Object.getOwnPropertyNames(sourceComponent);
	    for (var i=0; i<keys.length; ++i) {
	        if (!REACT_STATICS[keys[i]] && !KNOWN_STATICS[keys[i]]) {
	            targetComponent[keys[i]] = sourceComponent[keys[i]];
	        }
	    }

	    return targetComponent;
	};
	
	util.hoistStatics = hoistNonReactStatics;
	
	
	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];
		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg)
				continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for ( var key in arg) {
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
}(Smart.RC)