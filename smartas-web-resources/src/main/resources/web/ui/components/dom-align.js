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