'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+function (UI, RC) {
  var _ref = _;
  var assign = _ref.assign;


  var Card = function Card(props) {
    var _classNames;

    var _props$prefixCls = props.prefixCls;
    var prefixCls = _props$prefixCls === undefined ? 'ant-card' : _props$prefixCls;
    var className = props.className;
    var children = props.children;
    var extra = props.extra;
    var bodyStyle = props.bodyStyle;
    var title = props.title;
    var loading = props.loading;

    var other = _objectWithoutProperties(props, ['prefixCls', 'className', 'children', 'extra', 'bodyStyle', 'title', 'loading']);

    var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-loading', loading), _classNames));

    if (loading) {
      children = React.createElement(
        'div',
        null,
        React.createElement(
          'p',
          null,
          '███████████████████████'
        ),
        React.createElement(
          'p',
          null,
          '██████　███████████████████'
        ),
        React.createElement(
          'p',
          null,
          '██████████　███████████'
        ),
        React.createElement(
          'p',
          null,
          '█████　██████　█████████████'
        )
      );
    }

    var head = title ? React.createElement(
      'div',
      { className: prefixCls + '-head' },
      React.createElement(
        'h3',
        { className: prefixCls + '-head-title' },
        title
      )
    ) : null;

    return React.createElement(
      'div',
      _extends({}, other, { className: classString }),
      head,
      extra ? React.createElement(
        'div',
        { className: prefixCls + '-extra' },
        extra
      ) : null,
      React.createElement(
        'div',
        { className: prefixCls + '-body', style: bodyStyle },
        children
      )
    );
  };

  UI.Card = Card;
}(Smart.UI, Smart.RC);