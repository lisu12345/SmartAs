'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SelectTrigger = require('./SelectTrigger');

var _SelectTrigger2 = _interopRequireDefault(_SelectTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function filterFn(input, child) {
  return String(getPropValue(child, this.props.optionFilterProp)).indexOf(input) > -1;
}

function saveRef(name, component) {
  this[name] = component;
}

var Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    defaultActiveFirstOption: PropTypes.bool,
    multiple: PropTypes.bool,
    filterOption: PropTypes.any,
    showSearch: PropTypes.bool,
    disabled: PropTypes.bool,
    showArrow: PropTypes.bool,
    tags: PropTypes.bool,
    transitionName: PropTypes.string,
    optionLabelProp: PropTypes.string,
    optionFilterProp: PropTypes.string,
    animation: PropTypes.string,
    choiceTransitionName: PropTypes.string,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    onSearch: PropTypes.func,
    searchPlaceholder: PropTypes.string,
    placeholder: PropTypes.any,
    onDeselect: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
    defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
    label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
    defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
    dropdownStyle: PropTypes.object,
    maxTagTextLength: PropTypes.number
  },

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'rc-select',
      filterOption: filterFn,
      defaultActiveFirstOption: true,
      showSearch: true,
      allowClear: false,
      placeholder: '',
      searchPlaceholder: '',
      defaultValue: [],
      onChange: noop,
      onSelect: noop,
      onSearch: noop,
      onDeselect: noop,
      showArrow: true,
      dropdownMatchSelectWidth: true,
      dropdownStyle: {},
      dropdownMenuStyle: {},
      optionFilterProp: 'value',
      optionLabelProp: 'value',
      notFoundContent: 'Not Found'
    };
  },
  getInitialState: function getInitialState() {
    var props = this.props;
    var value = [];
    if ('value' in props) {
      value = toArray(props.value);
    } else {
      value = toArray(props.defaultValue);
    }
    var label = this.getLabelFromProps(props, value, 1);
    var inputValue = '';
    if (props.combobox) {
      inputValue = value.length ? String(value[0]) : '';
    }
    this.saveInputRef = saveRef.bind(this, 'inputInstance');
    return { value: value, inputValue: inputValue, label: label };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      var value = toArray(nextProps.value);
      var label = this.getLabelFromProps(nextProps, value);
      this.setState({
        value: value,
        label: label
      });
      if (nextProps.combobox) {
        this.setState({
          inputValue: value.length ? String(value[0]) : ''
        });
      }
    }
  },
  componentDidUpdate: function componentDidUpdate() {
    var state = this.state;
    var props = this.props;
    if (state.open && isMultipleOrTags(props)) {
      var inputNode = this.getInputDOMNode();
      if (inputNode.value) {
        inputNode.style.width = '';
        inputNode.style.width = inputNode.scrollWidth + 'px';
      } else {
        inputNode.style.width = '';
      }
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.dropdownContainer) {
      ReactDOM.unmountComponentAtNode(this.dropdownContainer);
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }
  },
  onInputChange: function onInputChange(event) {
    var val = event.target.value;
    var props = this.props;
    this.setState({
      inputValue: val,
      open: true
    });
    if (isCombobox(props)) {
      this.fireChange([val], [val]);
    }
    props.onSearch(val);
  },
  onDropdownVisibleChange: function onDropdownVisibleChange(open) {
    this.setOpenState(open);
  },

  // combobox ignore
  onKeyDown: function onKeyDown(event) {
    var props = this.props;
    if (props.disabled) {
      return;
    }
    var keyCode = event.keyCode;
    if (this.state.open && !this.getInputDOMNode()) {
      this.onInputKeyDown(event);
    } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
      this.setOpenState(true);
      event.preventDefault();
    }
  },
  onInputKeyDown: function onInputKeyDown(event) {
    var props = this.props;
    var state = this.state;
    var keyCode = event.keyCode;
    if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
      var value = state.value.concat();
      if (value.length) {
        var label = state.label.concat();
        var popValue = value.pop();
        label.pop();
        props.onDeselect(popValue);
        this.fireChange(value, label);
      }
      return;
    }
    if (keyCode === KeyCode.DOWN) {
      if (!state.open) {
        this.openIfHasChildren();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } else if (keyCode === KeyCode.ESC) {
      if (state.open) {
        this.setOpenState(false);
        event.preventDefault();
        event.stopPropagation();
      }
      return;
    }

    if (state.open) {
      var menu = this.refs.trigger.getInnerMenu();
      if (menu && menu.onKeyDown(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },
  onMenuSelect: function onMenuSelect(_ref) {
    var item = _ref.item;

    var value = this.state.value;
    var label = this.state.label;
    var props = this.props;
    var selectedValue = getValuePropValue(item);
    var selectedLabel = this.getLabelFromOption(item);
    props.onSelect(selectedValue, item);
    if (isMultipleOrTags(props)) {
      if (value.indexOf(selectedValue) !== -1) {
        return;
      }
      value = value.concat([selectedValue]);
      label = label.concat([selectedLabel]);
    } else {
      if (value[0] === selectedValue) {
        this.setOpenState(false);
        return;
      }
      value = [selectedValue];
      label = [selectedLabel];
      this.setOpenState(false);
    }
    this.fireChange(value, label);
    this.setState({
      inputValue: ''
    });
    if (isCombobox(props)) {
      this.setState({
        inputValue: getPropValue(item, props.optionLabelProp)
      });
    }
  },
  onMenuDeselect: function onMenuDeselect(_ref2) {
    var item = _ref2.item;
    var domEvent = _ref2.domEvent;

    if (domEvent.type === 'click') {
      this.removeSelected(getValuePropValue(item));
    }
    if (!isMultipleOrTags(this.props)) {
      this.setOpenState(false);
    }
    this.setState({
      inputValue: ''
    });
  },
  onPlaceholderClick: function onPlaceholderClick() {
    this.getInputDOMNode().focus();
  },
  onClearSelection: function onClearSelection(event) {
    var props = this.props;
    var state = this.state;
    if (props.disabled) {
      return;
    }
    event.stopPropagation();
    if (state.inputValue || state.value.length) {
      this.fireChange([], []);
      this.setOpenState(false);
      this.setState({
        inputValue: ''
      });
    }
  },
  getLabelBySingleValue: function getLabelBySingleValue(children, value) {
    var _this = this;

    if (value === undefined) {
      return null;
    }
    var label = null;
    React.Children.forEach(children, function (child) {
      if (child.type === OptGroup) {
        var maybe = _this.getLabelBySingleValue(child.props.children, value);
        if (maybe !== null) {
          label = maybe;
        }
      } else if (getValuePropValue(child) === value) {
        label = _this.getLabelFromOption(child);
      }
    });
    return label;
  },
  getLabelFromOption: function getLabelFromOption(child) {
    return getPropValue(child, this.props.optionLabelProp);
  },
  getLabelFromProps: function getLabelFromProps(props, value, init) {
    var label = [];
    if ('label' in props) {
      label = toArray(props.label);
    } else if (init && 'defaultLabel' in props) {
      label = toArray(props.defaultLabel);
    } else {
      label = this.getLabelByValue(props.children, value);
    }
    return label;
  },
  getVLForOnChange: function getVLForOnChange(vls) {
    if (vls !== undefined) {
      return isMultipleOrTags(this.props) ? vls : vls[0];
    }
    return vls;
  },
  getLabelByValue: function getLabelByValue(children, values) {
    var _this2 = this;

    return values.map(function (value) {
      var label = _this2.getLabelBySingleValue(children, value);
      if (label === null) {
        return value;
      }
      return label;
    });
  },
  getDropdownContainer: function getDropdownContainer() {
    if (!this.dropdownContainer) {
      this.dropdownContainer = document.createElement('div');
      document.body.appendChild(this.dropdownContainer);
    }
    return this.dropdownContainer;
  },
  getSearchPlaceholderElement: function getSearchPlaceholderElement(hidden) {
    var props = this.props;
    if (props.searchPlaceholder) {
      return React.createElement(
        'span',
        {
          style: { display: hidden ? 'none' : 'block' },
          onClick: this.onPlaceholderClick,
          className: props.prefixCls + '-search__field__placeholder' },
        props.searchPlaceholder
      );
    }
    return null;
  },
  getInputElement: function getInputElement() {
    var props = this.props;
    return React.createElement(
      'span',
      { className: props.prefixCls + '-search__field__wrap' },
      React.createElement('input', { ref: this.saveInputRef,
        onChange: this.onInputChange,
        onKeyDown: this.onInputKeyDown,
        value: this.state.inputValue,
        disabled: props.disabled,
        className: props.prefixCls + '-search__field',
        role: 'textbox' }),
      isMultipleOrTags(props) ? null : this.getSearchPlaceholderElement(!!this.state.inputValue)
    );
  },
  getInputDOMNode: function getInputDOMNode() {
    return this.inputInstance;
  },
  getPopupDOMNode: function getPopupDOMNode() {
    return this.refs.trigger.getPopupDOMNode();
  },
  getPopupMenuComponent: function getPopupMenuComponent() {
    return this.refs.trigger.getInnerMenu();
  },
  setOpenState: function setOpenState(open) {
    var _this3 = this;

    var refs = this.refs;
    this.setState({
      open: open
    }, function () {
      if (open || isMultipleOrTagsOrCombobox(_this3.props)) {
        if (_this3.getInputDOMNode()) {
          _this3.getInputDOMNode().focus();
        }
      } else if (refs.selection) {
        refs.selection.focus();
      }
    });
  },
  removeSelected: function removeSelected(selectedValue) {
    var props = this.props;
    if (props.disabled) {
      return;
    }
    var label = this.state.label.concat();
    var index = this.state.value.indexOf(selectedValue);
    var value = this.state.value.filter(function (singleValue) {
      return singleValue !== selectedValue;
    });
    if (index !== -1) {
      label.splice(index, 1);
    }
    var canMultiple = isMultipleOrTags(props);
    if (canMultiple) {
      props.onDeselect(selectedValue);
    }
    this.fireChange(value, label);
  },
  openIfHasChildren: function openIfHasChildren() {
    var props = this.props;
    if (React.Children.count(props.children) || isSingleMode(props)) {
      this.setOpenState(true);
    }
  },
  fireChange: function fireChange(value, label) {
    var props = this.props;
    if (!('value' in props)) {
      this.setState({
        value: value, label: label
      });
    }
    props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label));
  },
  renderTopControlNode: function renderTopControlNode() {
    var _this4 = this;

    var _state = this.state;
    var value = _state.value;
    var label = _state.label;

    var props = this.props;
    var choiceTransitionName = props.choiceTransitionName;
    var prefixCls = props.prefixCls;
    var maxTagTextLength = props.maxTagTextLength;
    // single and not combobox, input is inside dropdown

    if (isSingleMode(props)) {
      var placeholder = React.createElement(
        'span',
        { key: 'placeholder',
          className: prefixCls + '-selection__placeholder' },
        props.placeholder
      );
      var innerNode = placeholder;
      if (label.length) {
        innerNode = React.createElement(
          'span',
          { key: 'value' },
          label[0]
        );
      }
      return React.createElement(
        'span',
        { className: prefixCls + '-selection__rendered' },
        innerNode
      );
    }

    var selectedValueNodes = [];
    if (isMultipleOrTags(props)) {
      selectedValueNodes = value.map(function (singleValue, index) {
        var content = label[index];
        var title = content;
        if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
          content = content.slice(0, maxTagTextLength) + '...';
        }
        return React.createElement(
          'li',
          { className: prefixCls + '-selection__choice',
            key: singleValue,
            title: title },
          React.createElement(
            'span',
            { className: prefixCls + '-selection__choice__content' },
            content
          ),
          React.createElement('span', { className: prefixCls + '-selection__choice__remove',
            onClick: _this4.removeSelected.bind(_this4, singleValue) })
        );
      });
    }
    selectedValueNodes.push(React.createElement(
      'li',
      { className: prefixCls + '-search ' + prefixCls + '-search--inline', key: '__input' },
      this.getInputElement()
    ));
    var className = prefixCls + '-selection__rendered';
    if (isMultipleOrTags(props) && choiceTransitionName) {
      return React.createElement(
        Animate,
        { className: className,
          component: 'ul',
          transitionName: choiceTransitionName },
        selectedValueNodes
      );
    }
    return React.createElement(
      'ul',
      { className: className },
      selectedValueNodes
    );
  },
  render: function render() {
    var _rootCls;

    var props = this.props;
    var multiple = isMultipleOrTags(props);
    var state = this.state;
    var className = props.className;
    var disabled = props.disabled;
    var allowClear = props.allowClear;
    var prefixCls = props.prefixCls;

    var ctrlNode = this.renderTopControlNode();
    var extraSelectionProps = {};
    if (!isCombobox(props)) {
      extraSelectionProps = {
        onKeyDown: this.onKeyDown,
        tabIndex: 0
      };
    }
    var rootCls = (_rootCls = {}, _defineProperty(_rootCls, className, !!className), _defineProperty(_rootCls, prefixCls, 1), _defineProperty(_rootCls, prefixCls + '-open', state.open), _defineProperty(_rootCls, prefixCls + '-combobox', isCombobox(props)), _defineProperty(_rootCls, prefixCls + '-disabled', disabled), _defineProperty(_rootCls, prefixCls + '-enabled', !disabled), _rootCls);

    var clear = React.createElement('span', { key: 'clear',
      className: prefixCls + '-selection__clear',
      onClick: this.onClearSelection });
    return React.createElement(
      _SelectTrigger2.default,
      _extends({}, props, {
        options: props.children,
        multiple: multiple,
        disabled: disabled,
        visible: state.open,
        inputValue: state.inputValue,
        inputElement: this.getInputElement(),
        value: state.value,
        onDropdownVisibleChange: this.onDropdownVisibleChange,
        onMenuSelect: this.onMenuSelect,
        onMenuDeselect: this.onMenuDeselect,
        ref: 'trigger' }),
      React.createElement(
        'span',
        {
          style: props.style,
          className: classNames(rootCls) },
        React.createElement(
          'span',
          _extends({ ref: 'selection',
            key: 'selection',
            className: prefixCls + '-selection ' + prefixCls + '-selection--' + (multiple ? 'multiple' : 'single'),
            role: 'combobox',
            'aria-autocomplete': 'list',
            'aria-haspopup': 'true',
            'aria-expanded': state.open
          }, extraSelectionProps),
          ctrlNode,
          allowClear && !isMultipleOrTags(props) ? clear : null,
          multiple || !props.showArrow ? null : React.createElement(
            'span',
            { key: 'arrow', className: prefixCls + '-arrow', tabIndex: '-1', style: { outline: 'none' } },
            React.createElement('b', null)
          ),
          multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null
        )
      )
    );
  }
});

exports.default = Select;