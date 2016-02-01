'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var noop = _.noop,
      PropTypes = React.PropTypes,
      rcUtil = RC.util,
      Dom = rcUtil.Dom,
      DOMWrap = RC.DOMWrap,
      KeyCode = rcUtil.KeyCode,
      Align = RC.Align,
      Animate = UI.Animate,
      Icon = UI.Icon,
      Button = UI.Button;

  var mousePosition = undefined;
  var mousePositionEventBinded = undefined;

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

  function confirm(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var d = undefined;
    props = props || {};
    props.iconClassName = props.iconClassName || 'question-circle';

    var iconClassType = props.iconClassName;

    var width = props.width || 416;

    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
      props.okCancel = true;
    }

    props.okText = props.okText || (props.okCancel ? '确定' : '知道了');
    props.cancelText = props.cancelText || '取消';

    function close() {
      d.setState({
        visible: false
      });
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    }

    function onCancel() {
      var cancelFn = props.onCancel;
      if (cancelFn) {
        var ret = undefined;
        if (cancelFn.length) {
          ret = cancelFn(close);
        } else {
          ret = cancelFn();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }

    function onOk() {
      var okFn = props.onOk;
      if (okFn) {
        var ret = undefined;
        if (okFn.length) {
          ret = okFn(close);
        } else {
          ret = okFn();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }

    var body = React.createElement(
      'div',
      { className: 'ant-confirm-body' },
      React.createElement(Icon, { type: iconClassType }),
      React.createElement(
        'span',
        { className: 'ant-confirm-title' },
        props.title
      ),
      React.createElement(
        'div',
        { className: 'ant-confirm-content' },
        props.content
      )
    );

    var footer = null;
    if (props.okCancel) {
      footer = React.createElement(
        'div',
        { className: 'ant-confirm-btns' },
        React.createElement(
          Button,
          { type: 'ghost', size: 'large', onClick: onCancel },
          props.cancelText
        ),
        React.createElement(
          Button,
          { type: 'primary', size: 'large', onClick: onOk },
          props.okText
        )
      );
    } else {
      footer = React.createElement(
        'div',
        { className: 'ant-confirm-btns' },
        React.createElement(
          Button,
          { type: 'primary', size: 'large', onClick: onOk },
          props.okText
        )
      );
    }

    ReactDOM.render(React.createElement(
      AntModal,
      {
        prefixCls: 'ant-modal',
        className: 'ant-confirm',
        visible: true,
        closable: false,
        title: '',
        transitionName: 'zoom',
        footer: '',
        maskTransitionName: 'fade', width: width },
      React.createElement(
        'div',
        { style: { zoom: 1, overflow: 'hidden' } },
        body,
        ' ',
        footer
      )
    ), div, function () {
      d = this;
    });
  }

  var AntModal = React.createClass({
    displayName: 'AntModal',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-modal',
        onOk: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        width: 520,
        transitionName: 'zoom',
        maskAnimation: 'fade',
        confirmLoading: false,
        visible: false
      };
    },
    handleCancel: function handleCancel() {
      this.props.onCancel();
    },
    handleOk: function handleOk() {
      this.props.onOk();
    },
    componentDidMount: function componentDidMount() {
      if (mousePositionEventBinded) {
        return;
      }
      // 只有点击事件支持从鼠标位置动画展开
      Dom.addEventListener(document.body, 'click', function onDocumentMousemove(e) {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        };
        // 20ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开
        setTimeout(function () {
          return mousePosition = null;
        }, 20);
      });
      mousePositionEventBinded = true;
    },
    render: function render() {
      var props = this.props;
      var defaultFooter = [React.createElement(
        Button,
        { key: 'cancel',
          type: 'ghost',
          size: 'large',
          onClick: this.handleCancel },
        props.cancelText
      ), React.createElement(
        Button,
        { key: 'confirm',
          type: 'primary',
          size: 'large',
          loading: props.confirmLoading,
          onClick: this.handleOk },
        props.okText
      )];
      var footer = props.footer || defaultFooter;
      return React.createElement(DialogWrap, _extends({ onClose: this.handleCancel, footer: footer }, props, {
        visible: props.visible, mousePosition: mousePosition }));
    }
  });

  AntModal.info = function (props) {
    props.iconClassName = 'info-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.success = function (props) {
    props.iconClassName = 'check-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.error = function (props) {
    props.iconClassName = 'exclamation-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.confirm = function (props) {
    props.okCancel = true;
    return confirm(props);
  };

  UI.Modal = AntModal;
})(Smart.UI, Smart.RC);