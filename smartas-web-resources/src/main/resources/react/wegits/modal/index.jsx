+ function(UI, RC) {
  const noop = _.noop,
    PropTypes = React.PropTypes,
    rcUtil = RC.Util,
    Dom = rcUtil.Dom,
    Dialog = RC.Dialog,
    Icon = UI.Icon,
    Button = UI.Button;

  let mousePosition;
  let mousePositionEventBinded;


  let AntModal = React.createClass({
    getDefaultProps() {
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

    handleCancel() {
      this.props.onCancel();
    },

    handleOk() {
      this.props.onOk();
    },

    componentDidMount() {
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
        setTimeout(() => mousePosition = null, 20);
      });
      mousePositionEventBinded = true;
    },

    render() {
      let props = this.props;
      let defaultFooter = [
        <Button key="cancel"
          type="ghost"
          size="large"
          onClick={this.handleCancel}>
          {props.cancelText}
        </Button>,
        <Button key="confirm"
          type="primary"
          size="large"
          loading={props.confirmLoading}
          onClick={this.handleOk}>
          {props.okText}
        </Button>
      ];
      let footer = props.footer || defaultFooter;
      return <Dialog onClose={this.handleCancel} footer={footer} {...props}
        visible={props.visible} mousePosition={mousePosition} />;
    }
  });
  function confirm(props) {
    let div = document.createElement('div');
    document.body.appendChild(div);

    let d;
    props = props || {};
    props.iconClassName = props.iconClassName || 'question-circle';

    let iconClassType = props.iconClassName;

    let width = props.width || 416;

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
      let cancelFn = props.onCancel;
      if (cancelFn) {
        let ret;
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
      let okFn = props.onOk;
      if (okFn) {
        let ret;
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

    let body = <div className="ant-confirm-body">
      <Icon type={iconClassType} />
      <span className="ant-confirm-title">{props.title}</span>
      <div className="ant-confirm-content">{props.content}</div>
    </div>;

    let footer = null;
    if (props.okCancel) {
      footer = <div className="ant-confirm-btns">
        <Button type="ghost" size="large" onClick={onCancel}>
          {props.cancelText}
        </Button>
        <Button type="primary" size="large" onClick={onOk}>
          {props.okText}
        </Button>
      </div>;
    } else {
      footer = <div className="ant-confirm-btns">
        <Button type="primary" size="large" onClick={onOk}>
          {props.okText}
        </Button>
      </div>;
    }

    ReactDOM.render(<AntModal
      prefixCls="ant-modal"
      className="ant-confirm"
      visible
      closable={false}
      title=""
      transitionName="zoom"
      footer=""
      maskTransitionName="fade" width={width}>
      <div style={{zoom: 1, overflow: 'hidden'}}>{body} {footer}</div>
    </AntModal>, div, function () {
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

  UI.Modal = AntModal;

}(Smart.UI, Smart.RC);