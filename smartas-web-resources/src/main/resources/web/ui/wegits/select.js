'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
  var Select = RC.Select;
  var Option = Select.Option;
  var OptGroup = Select.OptGroup;


  var AntSelect = React.createClass({
    displayName: 'AntSelect',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-select',
        transitionName: 'slide-up',
        optionLabelProp: 'children',
        choiceTransitionName: 'zoom',
        showSearch: false
      };
    },
    render: function render() {
      var _props = this.props;
      var size = _props.size;
      var className = _props.className;
      var combobox = _props.combobox;
      var notFoundContent = _props.notFoundContent;


      var cls = classNames(_defineProperty({
        'ant-select-lg': size === 'large',
        'ant-select-sm': size === 'small'
      }, className, !!className));

      if (combobox) {
        notFoundContent = null;
      }

      return React.createElement(Select, _extends({}, this.props, {
        className: cls,
        notFoundContent: notFoundContent }));
    }
  });

  AntSelect.Option = Option;
  AntSelect.OptGroup = OptGroup;

  UI.Select = AntSelect;
  UI.Option = Option;
  UI.OptGroup = OptGroup;
}(Smart.UI, Smart.RC);