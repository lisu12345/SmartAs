+ function(UI,RC) {
  const {Icon} = UI,
    {Notification} = RC;

  let defaultDuration = 1.5;
  let top;
  let messageInstance;
  let key = 1;

  function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
      prefixCls: 'ant-message',
      transitionName: 'move-up',
      style: {
        top,
      }  // 覆盖原来的样式
    });
    return messageInstance;
  }

  function notice(content, duration = defaultDuration, type, onClose) {
    let iconClass = ({
      info: 'ant-message-info',
      success: 'ant-message-success',
      error: 'ant-message-error',
      warn: 'ant-message-warn',
      loading: 'ant-message-loading'
    })[type];

    let iconType = ({
      info: 'info-circle',
      success: 'check-circle',
      error: 'exclamation-circle',
      warn: 'exclamation-circle',
      loading: 'loading'
    })[type];

    let instance = getMessageInstance();
    instance.notice({
      key,
      duration,
      style: {},
      content: <div className={`ant-message-custom-content ${iconClass}`}>
        <Icon className={iconClass} type={iconType} />
        <span>{content}</span>
      </div>,
      onClose
    });
    return (function () {
      let target = key++;
      return function () {
        instance.removeNotice(target);
      };
    }());
  }

  const message = {
    info(content, duration, onClose) {
      return notice(content, duration, 'info', onClose);
    },
    success(content, duration, onClose) {
      return notice(content, duration, 'success', onClose);
    },
    error(content, duration, onClose) {
      return notice(content, duration, 'error', onClose);
    },
    warn(content, duration, onClose) {
      return notice(content, duration, 'warn', onClose);
    },
    loading(content, duration, onClose) {
      return notice(content, duration, 'loading', onClose);
    },
    config(options) {
      if (options.top) {
        top = options.top;
      }
    },
    destroy() {
      if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
      }
    },
  };

  UI.message = message;
}(Smart.UI,Smart.RC);