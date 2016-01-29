'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI) {
  var Icon = UI.Icon;
  var Animate = UI.Animate;
  var util = UI.util;

  var createChainedFunction = util.createChainedFunction,
      guid = util.guid;

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
      var key = notice.key = notice.key || guid();
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
        { className: classNames(className), style: props.style },
        React.createElement(
          Animate,
          { transitionName: this.getTransitionName() },
          noticeNodes
        )
      );
    }
  });

  Notification.newInstance = function (props) {
    var notificationProps = props || {};
    var div = document.createElement('div');
    document.body.appendChild(div);
    var notification = ReactDOM.render(React.createElement(Notification, notificationProps), div);
    return {
      notice: function notice(noticeProps) {
        notification.add(noticeProps);
      },
      removeNotice: function removeNotice(key) {
        notification.remove(key);
      },

      component: notification,
      destroy: function destroy() {
        React.unmountComponentAtNode(div);
        document.body.removeChild(div);
      }
    };
  };

  var defaultDuration = 1.5;
  var top = undefined;
  var messageInstance = undefined;
  var key = 1;

  function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
      prefixCls: 'ant-message',
      transitionName: 'move-up',
      style: {
        top: top
      } // 覆盖原来的样式
    });
    return messageInstance;
  }

  function notice(content) {
    var duration = arguments.length <= 1 || arguments[1] === undefined ? defaultDuration : arguments[1];
    var type = arguments[2];
    var onClose = arguments[3];

    var iconClass = ({
      'info': 'ant-message-info',
      'success': 'ant-message-success',
      'error': 'ant-message-error',
      'warn': 'ant-message-warn',
      'loading': 'ant-message-loading'
    })[type];

    var iconType = ({
      'info': 'info-circle',
      'success': 'check-circle',
      'error': 'exclamation-circle',
      'warn': 'exclamation-circle',
      'loading': 'loading'
    })[type];

    var instance = getMessageInstance();
    instance.notice({
      key: key,
      duration: duration,
      style: {},
      content: React.createElement(
        'div',
        { className: 'ant-message-custom-content ' + iconClass },
        React.createElement(Icon, { className: iconClass, type: iconType }),
        React.createElement(
          'span',
          null,
          content
        )
      ),
      onClose: onClose
    });
    return (function () {
      var target = key++;
      return function () {
        instance.removeNotice(target);
      };
    })();
  }

  var message = {
    info: function info(content, duration, onClose) {
      return notice(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
      return notice(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
      return notice(content, duration, 'error', onClose);
    },
    warn: function warn(content, duration, onClose) {
      return notice(content, duration, 'warn', onClose);
    },
    loading: function loading(content, duration, onClose) {
      return notice(content, duration, 'loading', onClose);
    },
    config: function config(options) {
      if (options.top) {
        top = options.top;
      }
    }
  };
  UI.message = message;
})(Smart.UI);