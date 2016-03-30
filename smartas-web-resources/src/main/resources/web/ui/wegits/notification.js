'use strict';

+function (UI, RC) {
  var Notification = RC.Notification;
  var Icon = UI.Icon;
  var _ref = _;
  var assign = _ref.assign;


  var top = 24;
  var notificationInstance = void 0;

  function getNotificationInstance() {
    if (notificationInstance) {
      return notificationInstance;
    }
    notificationInstance = Notification.newInstance({
      prefixCls: 'ant-notification',
      style: {
        top: top,
        right: 0
      }
    });
    return notificationInstance;
  }

  function notice(args) {
    var duration = void 0;
    if (args.duration === undefined) {
      duration = 4.5;
    } else {
      duration = args.duration;
    }

    if (args.icon) {
      var prefixCls = ' ant-notification-notice-content-icon-';
      var iconType = '';
      switch (args.icon) {
        case 'success':
          iconType = 'check-circle-o';
          break;
        case 'info':
          iconType = 'info-circle-o';
          break;
        case 'error':
          iconType = 'exclamation-circle-o';
          break;
        case 'warn':
          iconType = 'question-circle-o';
          break;
        default:
          iconType = 'info-circle';
      }

      getNotificationInstance().notice({
        content: React.createElement(
          'div',
          null,
          React.createElement(Icon, { className: prefixCls + 'icon-' + args.icon + prefixCls + 'icon', type: iconType }),
          React.createElement(
            'div',
            { className: prefixCls + 'message' },
            args.message
          ),
          React.createElement(
            'div',
            { className: prefixCls + 'description' },
            args.description
          )
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      });
    } else {
      var _prefixCls = 'ant-notification-notice-content-';
      if (!args.btn) {
        getNotificationInstance().notice({
          content: React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: _prefixCls + 'message' },
              args.message
            ),
            React.createElement(
              'div',
              { className: _prefixCls + 'description' },
              args.description
            )
          ),
          duration: duration,
          closable: true,
          onClose: args.onClose,
          key: args.key,
          style: {}
        });
      } else {
        getNotificationInstance().notice({
          content: React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: _prefixCls + 'message' },
              args.message
            ),
            React.createElement(
              'div',
              { className: _prefixCls + 'description' },
              args.description
            ),
            React.createElement(
              'span',
              { className: _prefixCls + 'btn' },
              args.btn
            )
          ),
          duration: duration,
          closable: true,
          onClose: args.onClose,
          key: args.key,
          style: {}
        });
      }
    }
  }

  var api = {
    open: function open(args) {
      notice(args);
    },
    close: function close(key) {
      if (notificationInstance) {
        notificationInstance.removeNotice(key);
      }
    },
    config: function config(options) {
      top = isNaN(options.top) ? 24 : options.top;
    },
    destroy: function destroy() {
      if (notificationInstance) {
        notificationInstance.destroy();
        notificationInstance = null;
      }
    }
  };

  ['success', 'info', 'warn', 'error'].forEach(function (type) {
    api[type] = function (args) {
      var newArgs = assign({}, args, {
        icon: type
      });
      return api.open(newArgs);
    };
  });

  UI.notification = api;
}(Smart.UI, Smart.RC);