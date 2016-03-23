'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (UI, RC) {
  var Tooltip = RC.Tooltip;
  var _ref = _;
  var noop = _ref.noop;
  var Icon = UI.Icon;
  var Button = UI.Button;
  var getPlacements = UI.getPlacements;


  var placements = getPlacements();
  var prefixCls = 'ant-popover';
  var transitionNames = {
    top: 'zoom-down',
    bottom: 'zoom-up',
    left: 'zoom-right',
    right: 'zoom-left',
    topLeft: 'zoom-down',
    bottomLeft: 'zoom-up',
    leftTop: 'zoom-right',
    rightTop: 'zoom-left',
    topRight: 'zoom-down',
    bottomRight: 'zoom-up',
    leftBottom: 'zoom-right',
    rightBottom: 'zoom-left'
  };

  UI.Popconfirm = React.createClass({
    displayName: 'Popconfirm',
    getInitialState: function getInitialState() {
      return {
        visible: false
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        transitionName: '',
        placement: 'top',
        trigger: 'click',
        overlayStyle: {},
        onConfirm: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        onVisibleChange: function onVisibleChange() {}
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        this.setState({ visible: nextProps.visible });
      }
    },
    confirm: function confirm() {
      this.setVisible(false);
      this.props.onConfirm.call(this);
    },
    cancel: function cancel() {
      this.setVisible(false);
      this.props.onCancel.call(this);
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setVisible(visible);
    },
    setVisible: function setVisible(visible) {
      if (!('visible' in this.props)) {
        this.setState({ visible: visible });
      }
      this.props.onVisibleChange(visible);
    },
    render: function render() {
      var _props = this.props;
      var title = _props.title;
      var okText = _props.okText;
      var cancelText = _props.cancelText;
      var placement = _props.placement;
      var overlayStyle = _props.overlayStyle;
      var trigger = _props.trigger;

      var restProps = _objectWithoutProperties(_props, ['title', 'okText', 'cancelText', 'placement', 'overlayStyle', 'trigger']);

      var overlay = React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: prefixCls + '-inner-content' },
          React.createElement(
            'div',
            { className: prefixCls + '-message' },
            React.createElement(Icon, { type: 'exclamation-circle' }),
            React.createElement(
              'div',
              { className: prefixCls + '-message-title' },
              title
            )
          ),
          React.createElement(
            'div',
            { className: prefixCls + '-buttons' },
            React.createElement(
              Button,
              { onClick: this.cancel, type: 'ghost', size: 'small' },
              cancelText
            ),
            React.createElement(
              Button,
              { onClick: this.confirm, type: 'primary', size: 'small' },
              okText
            )
          )
        )
      );

      var transitionName = transitionNames[placement];

      return React.createElement(
        Tooltip,
        _extends({}, restProps, {
          placement: placement,
          builtinPlacements: placements,
          overlayStyle: overlayStyle,
          prefixCls: prefixCls,
          onVisibleChange: this.onVisibleChange,
          transitionName: transitionName,
          visible: this.state.visible,
          trigger: trigger,
          overlay: overlay }),
        this.props.children
      );
    }
  });
}(Smart.UI, Smart.RC);