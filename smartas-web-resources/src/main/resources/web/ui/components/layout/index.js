'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI) {

  var Col = React.createClass({
    displayName: 'Col',

    propTypes: {
      span: React.PropTypes.string,
      order: React.PropTypes.string,
      offset: React.PropTypes.string,
      push: React.PropTypes.string,
      pull: React.PropTypes.string,
      className: React.PropTypes.string,
      children: React.PropTypes.node
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var span = _props.span;
      var order = _props.order;
      var offset = _props.offset;
      var push = _props.push;
      var pull = _props.pull;
      var className = _props.className;

      var others = _objectWithoutProperties(_props, ['span', 'order', 'offset', 'push', 'pull', 'className']);

      var classes = classNames((_classNames = {}, _defineProperty(_classNames, 'col-' + span, span), _defineProperty(_classNames, 'col-order-' + order, order), _defineProperty(_classNames, 'col-offset-' + offset, offset), _defineProperty(_classNames, 'col-push-' + push, push), _defineProperty(_classNames, 'col-pull-' + pull, pull), _defineProperty(_classNames, className, className), _classNames));
      return React.createElement(
        'div',
        _extends({}, others, { className: classes }),
        this.props.children
      );
    }
  });

  var Row = React.createClass({
    displayName: 'Row',

    propTypes: {
      type: React.PropTypes.string,
      align: React.PropTypes.string,
      justify: React.PropTypes.string,
      className: React.PropTypes.string,
      children: React.PropTypes.node
    },
    render: function render() {
      var _classNames2;

      var _props2 = this.props;
      var type = _props2.type;
      var justify = _props2.justify;
      var align = _props2.align;
      var className = _props2.className;

      var others = _objectWithoutProperties(_props2, ['type', 'justify', 'align', 'className']);

      var classes = classNames((_classNames2 = {
        'row': true
      }, _defineProperty(_classNames2, 'row-' + type, type), _defineProperty(_classNames2, 'row-' + type + '-' + justify, justify), _defineProperty(_classNames2, 'row-' + type + '-' + align, align), _defineProperty(_classNames2, className, className), _classNames2));
      return React.createElement(
        'div',
        _extends({}, others, { className: classes }),
        this.props.children
      );
    }
  });

  UI.Row = Row;
  UI.Col = Col;
})(Smart.UI);