'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
  var classNames = RC.classNames;


  var TimelineItem = React.createClass({
    displayName: 'TimelineItem',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-timeline',
        color: 'blue',
        last: false,
        pending: false
      };
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var color = _props.color;
      var last = _props.last;
      var children = _props.children;
      var pending = _props.pending;

      var itemClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-item', true), _defineProperty(_classNames, prefixCls + '-item-last', last), _defineProperty(_classNames, prefixCls + '-item-pending', pending), _classNames));
      return React.createElement(
        'li',
        { className: itemClassName },
        React.createElement('div', { className: prefixCls + '-item-tail' }),
        React.createElement('div', { className: prefixCls + '-item-head ' + prefixCls + '-item-head-' + color }),
        React.createElement(
          'div',
          { className: prefixCls + '-item-content' },
          children
        )
      );
    }
  });

  var Timeline = React.createClass({
    displayName: 'Timeline',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-timeline'
      };
    },
    render: function render() {
      var _classNames2;

      var _props2 = this.props;
      var prefixCls = _props2.prefixCls;
      var children = _props2.children;
      var pending = _props2.pending;

      var pendingNode = typeof pending === 'boolean' ? null : pending;
      var className = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls, true), _defineProperty(_classNames2, prefixCls + '-pending', !!pending), _classNames2));
      return React.createElement(
        'ul',
        { className: className },
        React.Children.map(children, function (ele, idx) {
          return React.cloneElement(ele, {
            last: idx === children.length - 1
          });
        }),
        !!pending ? React.createElement(
          TimelineItem,
          { pending: !!pending },
          pendingNode
        ) : null
      );
    }
  });

  Timeline.Item = TimelineItem;
  UI.Timeline = Timeline;
}(Smart.UI, Smart.RC);