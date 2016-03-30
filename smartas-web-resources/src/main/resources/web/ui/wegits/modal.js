'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+function (UI, RC) {
  var noop = _.noop,
      PropTypes = React.PropTypes,
      rcUtil = RC.Util,
      Dom = rcUtil.Dom,
      Dialog = RC.Dialog,
      Icon = UI.Icon,
      Button = UI.Button;

  var mousePosition = void 0;
  var mousePositionEventBinded = void 0;

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


    propTypes: {
      prefixCls: PropTypes.string,
      onOk: PropTypes.func,
      onCancel: PropTypes.func,
      okText: PropTypes.node,
      cancelText: PropTypes.node,
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      confirmLoading: PropTypes.bool,
      visible: PropTypes.bool,
      align: PropTypes.object,
      footer: PropTypes.node,
      title: PropTypes.node,
      closable: PropTypes.bool
    },

    handleCancel: function handleCancel(e) {
      this.props.onCancel(e);
    },
    handleOk: function handleOk() {
      this.props.onOk();
    },
    componentDidMount: function componentDidMount() {
      if (mousePositionEventBinded) {
        return;
      }
      // 只有点击事件支持从鼠标位置动画展开
      Dom.addEventListener(document.documentElement, 'click', function (e) {
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
      return React.createElement(Dialog, _extends({ onClose: this.handleCancel, footer: footer }, props, {
        visible: props.visible, mousePosition: mousePosition }));
    }
  });
  function confirm(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var d = void 0;
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
        var ret = void 0;
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
        var ret = void 0;
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

  function dialog(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var d = void 0;
    props = props || {};
    props.iconClassName = props.iconClassName || 'question-circle';

    var iconClassType = props.iconClassName;

    var width = props.width || 600;

    props.okText = props.okText || (props.okCancel ? '确定' : '知道了');
    props.cancelText = props.cancelText || '取消';

    function close() {
      d.setState({
        visible: false
      });
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    }

    ReactDOM.render(React.createElement(
      AntModal,
      {
        prefixCls: 'ant-modal',
        className: 'ant-dialog',
        visible: true,
        maskClosable: false,
        onClose: close,
        title: props.title,
        transitionName: 'zoom',
        footer: '',
        maskTransitionName: 'fade', width: width },
      React.createElement(
        'div',
        { style: { zoom: 1, overflow: 'hidden' } },
        React.cloneElement(props.content, { close: close })
      )
    ), div, function () {
      d = this;
    });
  }

  AntModal.dialog = function (props) {
    props.okCancel = true;
    return dialog(props);
  };

  UI.Modal = AntModal;
}(Smart.UI, Smart.RC);