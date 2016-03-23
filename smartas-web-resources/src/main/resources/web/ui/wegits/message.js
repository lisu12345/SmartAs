'use strict';

+function (UI, RC) {
  var Icon = UI.Icon;
  var Notification = RC.Notification;


  var defaultDuration = 1.5;
  var top = void 0;
  var messageInstance = void 0;
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

    var iconClass = {
      info: 'ant-message-info',
      success: 'ant-message-success',
      error: 'ant-message-error',
      warn: 'ant-message-warn',
      loading: 'ant-message-loading'
    }[type];

    var iconType = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'exclamation-circle',
      warn: 'exclamation-circle',
      loading: 'loading'
    }[type];

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
    return function () {
      var target = key++;
      return function () {
        instance.removeNotice(target);
      };
    }();
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
    },
    destroy: function destroy() {
      if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
      }
    }
  };

  UI.message = message;
}(Smart.UI, Smart.RC);