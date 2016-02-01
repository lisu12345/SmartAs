+ function(UI,RC) {
  const noop = _.noop,
    rcUtil = RC.Util,
    isWindow = rcUtil.isWindow,
    PropTypes = React.PropTypes,
    cloneElement = React.cloneElement,
    findDOMNode = ReactDOM.findDOMNode,
    Menu = UI.Menu,
    MenuItemGroup = Menu.ItemGroup,
    MenuItem = Menu.Item,
    assign = _.assign,
    Trigger = UI.Trigger,
    Animate = UI.Animate,
    scrollIntoView = rcUtil.scrollIntoView;

  function getValuePropValue(child) {
    const props = child.props;
    if ('value' in props) {
      return props.value;
    }
    if (child.key) {
      return child.key;
    }
    throw new Error('no key or value for ' + child);
  }

  function getPropValue(child, prop) {
    if (prop === 'value') {
      return getValuePropValue(child);
    }
    return child.props[prop];
  }

  function isCombobox(props) {
    return props.combobox;
  }

  function isMultipleOrTags(props) {
    return props.multiple || props.tags;
  }

  function isMultipleOrTagsOrCombobox(props) {
    return isMultipleOrTags(props) || isCombobox(props);
  }

  function isSingleMode(props) {
    return !isMultipleOrTagsOrCombobox(props);
  }

  function toArray(value) {
    let ret = value;
    if (value === undefined) {
      ret = [];
    } else if (!Array.isArray(value)) {
      ret = [value];
    }
    return ret;
  }

  function getSelectKeys(menuItems, value) {
    if (value === null || value === undefined) {
      return [];
    }
    let selectedKeys = [];
    React.Children.forEach(menuItems, (item) => {
      if (item.type === MenuItemGroup) {
        selectedKeys = selectedKeys.concat(getSelectKeys(item.props.children, value));
      } else {
        const itemValue = getValuePropValue(item);
        const itemKey = item.key;
        if (value.indexOf(itemValue) !== -1 && itemKey) {
          selectedKeys.push(itemKey);
        }
      }
    });
    return selectedKeys;
  }

  class OptGroup extends React.Component {

  }


  class Option extends React.Component {

  }

  const DropdownMenu = React.createClass({
      propTypes: {
        prefixCls: React.PropTypes.string,
        menuItems: React.PropTypes.any,
        search: React.PropTypes.any,
      },

      componentDidMount() {
        this.scrollActiveItemToView();
      },

      shouldComponentUpdate(nextProps) {
        // freeze when hide
        return nextProps.visible;
      },

      componentDidUpdate(prevProps) {
        const props = this.props;
        if (!prevProps.visible && props.visible) {
          this.scrollActiveItemToView();
        }
      },

      scrollActiveItemToView() {
        // scroll into view
        const itemComponent = findDOMNode(this.firstActiveItem);
        if (itemComponent) {
          scrollIntoView(itemComponent, findDOMNode(this.refs.menu), {
            onlyScrollIfNeeded: true,
          });
        }
      },

      renderMenu() {
        const props = this.props;
        const {
          menuItems,
          defaultActiveFirstOption, value,
          dropdownMenuStyle, prefixCls,
          multiple, onMenuDeselect,
          onMenuSelect
        } = props;
        if (menuItems && menuItems.length) {
          const menuProps = {};
          if (multiple) {
            menuProps.onDeselect = onMenuDeselect;
            menuProps.onSelect = onMenuSelect;
          } else {
            menuProps.onClick = onMenuSelect;
          }
          const selectedKeys = getSelectKeys(menuItems, value);
          const activeKeyProps = {};

          let clonedMenuItems = menuItems;
          if (selectedKeys.length) {
            activeKeyProps.activeKey = selectedKeys[0];
            let foundFirst = false;
            // set firstActiveItem via cloning menus
            // for scroll into view
            const clone = (item) => {
              if (!foundFirst && selectedKeys.indexOf(item.key) !== -1) {
                foundFirst = true;
                return cloneElement(item, {
                  ref: (ref) => {
                    this.firstActiveItem = ref;
                  },
                });
              }
              return item;
            };

            clonedMenuItems = menuItems.map(item => {
              if (item.type === MenuItemGroup) {
                const children = item.props.children.map(clone);
                return cloneElement(item, {}, children);
              }
              return clone(item);
            });
          }

          return <Menu ref = "menu"
          defaultActiveFirst = {
            defaultActiveFirstOption
          }
          style = {
            dropdownMenuStyle
          } {...activeKeyProps
          }
          multiple = {
            multiple
          }
          focusable = {
            false
          } {...menuProps
          }
          selectedKeys = {
            selectedKeys
          }
          prefixCls = {
            `${prefixCls}-menu`
          }>{clonedMenuItems}</Menu>;
        }
        return null;
      },

      render() {
        return <div>{this.props.search}{this.renderMenu()}</div>;
    },
  });



const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

const SelectTrigger = React.createClass({
  propTypes: {
    dropdownMatchSelectWidth: PropTypes.bool,
    visible: PropTypes.bool,
    filterOption: PropTypes.any,
    options: PropTypes.any,
    prefixCls: PropTypes.string,
    popupClassName: PropTypes.string,
    children: PropTypes.any,
  },

  componentDidUpdate() {
    if (this.props.dropdownMatchSelectWidth && this.props.visible) {
      const dropdownDOMNode = this.getPopupDOMNode();
      if (dropdownDOMNode) {
        dropdownDOMNode.style.width = ReactDOM.findDOMNode(this).offsetWidth + 'px';
      }
    }
  },

  getInnerMenu() {
    return this.popupMenu && this.popupMenu.refs.menu;
  },

  getPopupDOMNode() {
    return this.refs.trigger.getPopupDomNode();
  },

  getDropdownElement(newProps) {
    const props = this.props;
    return (<DropdownMenu
      ref={this.saveMenu}
      {...newProps}
      prefixCls={this.getDropdownPrefixCls()}
      onMenuSelect={props.onMenuSelect}
      onMenuDeselect={props.onMenuDeselect}
      value={props.value}
      defaultActiveFirstOption={props.defaultActiveFirstOption}
      dropdownMenuStyle={props.dropdownMenuStyle}
    />);
  },

  getDropdownTransitionName() {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${this.getDropdownPrefixCls()}-${props.animation}`;
    }
    return transitionName;
  },

  getDropdownPrefixCls() {
    return `${this.props.prefixCls}-dropdown`;
  },

  filterOption(input, child) {
    if (!input) {
      return true;
    }
    const filterOption = this.props.filterOption;
    if (!filterOption) {
      return true;
    }
    if (child.props.disabled) {
      return false;
    }
    return filterOption.call(this, input, child);
  },

  saveMenu(menu) {
    this.popupMenu = menu;
  },

  renderFilterOptions() {
    return this.renderFilterOptionsFromChildren(this.props.options, true);
  },

  renderFilterOptionsFromChildren(children, showNotFound) {
    let sel = [];
    const props = this.props;
    const inputValue = props.inputValue;
    const childrenKeys = [];
    const tags = props.tags;
    React.Children.forEach(children, (child)=> {
      if (child.type === OptGroup) {
        const innerItems = this.renderFilterOptionsFromChildren(child.props.children, false);
        if (innerItems.length) {
          let label = child.props.label;
          let key = child.key;
          if (!key && typeof label === 'string') {
            key = label;
          } else if (!label && key) {
            label = key;
          }
          sel.push(<MenuItemGroup key={key} title={label}>{innerItems}</MenuItemGroup>);
        }
        return;
      }
      const childValue = getValuePropValue(child);
      if (this.filterOption(inputValue, child)) {
        sel.push(<MenuItem
          value={childValue}
          key={childValue}
          {...child.props}
        />);
      }
      if (tags && !child.props.disabled) {
        childrenKeys.push(childValue);
      }
    });
    if (tags) {
      // tags value must be string
      let value = props.value;
      value = value.filter((singleValue) => {
        return childrenKeys.indexOf(singleValue) === -1 && (!inputValue || String(singleValue).indexOf(String(inputValue)) > -1);
      });
      sel = sel.concat(value.map((singleValue)=> {
        return <MenuItem value={singleValue} key={singleValue}>{singleValue}</MenuItem>;
      }));
      if (inputValue) {
        const notFindInputItem = sel.every((option)=> {
          return getValuePropValue(option) !== inputValue;
        });
        if (notFindInputItem) {
          sel.unshift(<MenuItem value={inputValue} key={inputValue}>{inputValue}</MenuItem>);
        }
      }
    }
    if (!sel.length && showNotFound && props.notFoundContent) {
      sel = [<MenuItem disabled value="NOT_FOUND" key="NOT_FOUND">{props.notFoundContent}</MenuItem>];
    }
    return sel;
  },

  render() {
    const props = this.props;
    const multiple = props.multiple;
    const dropdownPrefixCls = this.getDropdownPrefixCls();
    const popupClassName = {
      [props.dropdownClassName]: !!props.dropdownClassName,
      [`${dropdownPrefixCls}--${multiple ? 'multiple' : 'single'}`]: 1,
    };
    let visible = props.visible;
    let menuItems;
    let search;
    menuItems = this.renderFilterOptions();
    search = multiple || props.combobox || !props.showSearch ? null : (
      <span className={`${dropdownPrefixCls}-search`}>{props.inputElement}</span>
    );
    if (!search && !menuItems.length) {
      visible = false;
    }
    const popupElement = this.getDropdownElement({
      menuItems,
      search,
      multiple,
      visible,
    });
    return (<Trigger {...props}
      action={props.disabled ? [] : ['click']}
      ref="trigger"
      popupPlacement="bottomLeft"
      builtinPlacements={BUILT_IN_PLACEMENTS}
      prefixCls={dropdownPrefixCls}
      popupTransitionName={this.getDropdownTransitionName()}
      onPopupVisibleChange={props.onDropdownVisibleChange}
      popup={popupElement}
      popupVisible={visible}
      popupClassName={classNames(popupClassName)}
      popupStyle={props.dropdownStyle}
    >{props.children}</Trigger>);
  },
});



function filterFn(input, child) {
  return String(getPropValue(child, this.props.optionFilterProp)).indexOf(input) > -1;
}

function saveRef(name, component) {
  this[name] = component;
}

const Select = React.createClass({
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
    maxTagTextLength: PropTypes.number,
  },

  getDefaultProps() {
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
      notFoundContent: 'Not Found',
    };
  },

  getInitialState() {
    const props = this.props;
    let value = [];
    if ('value' in props) {
      value = toArray(props.value);
    } else {
      value = toArray(props.defaultValue);
    }
    const label = this.getLabelFromProps(props, value, 1);
    let inputValue = '';
    if (props.combobox) {
      inputValue = value.length ? String(value[0]) : '';
    }
    this.saveInputRef = saveRef.bind(this, 'inputInstance');
    return {value, inputValue, label};
  },

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = toArray(nextProps.value);
      const label = this.getLabelFromProps(nextProps, value);
      this.setState({
        value,
        label,
      });
      if (nextProps.combobox) {
        this.setState({
          inputValue: value.length ? String(value[0]) : '',
        });
      }
    }
  },

  componentDidUpdate() {
    const state = this.state;
    const props = this.props;
    if (state.open && isMultipleOrTags(props)) {
      const inputNode = this.getInputDOMNode();
      if (inputNode.value) {
        inputNode.style.width = '';
        inputNode.style.width = inputNode.scrollWidth + 'px';
      } else {
        inputNode.style.width = '';
      }
    }
  },

  componentWillUnmount() {
    if (this.dropdownContainer) {
      ReactDOM.unmountComponentAtNode(this.dropdownContainer);
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }
  },

  onInputChange(event) {
    const val = event.target.value;
    const props = this.props;
    this.setState({
      inputValue: val,
      open: true,
    });
    if (isCombobox(props)) {
      this.fireChange([val], [val]);
    }
    props.onSearch(val);
  },

  onDropdownVisibleChange(open) {
    this.setOpenState(open);
  },

  // combobox ignore
  onKeyDown(event) {
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const keyCode = event.keyCode;
    if (this.state.open && !this.getInputDOMNode()) {
      this.onInputKeyDown(event);
    } else if (keyCode === KeyCode.ENTER || keyCode === KeyCode.DOWN) {
      this.setOpenState(true);
      event.preventDefault();
    }
  },

  onInputKeyDown(event) {
    const props = this.props;
    const state = this.state;
    const keyCode = event.keyCode;
    if (isMultipleOrTags(props) && !event.target.value && keyCode === KeyCode.BACKSPACE) {
      const value = state.value.concat();
      if (value.length) {
        const label = state.label.concat();
        const popValue = value.pop();
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
      const menu = this.refs.trigger.getInnerMenu();
      if (menu && menu.onKeyDown(event)) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  },

  onMenuSelect({item}) {
    let value = this.state.value;
    let label = this.state.label;
    const props = this.props;
    const selectedValue = getValuePropValue(item);
    const selectedLabel = this.getLabelFromOption(item);
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
      inputValue: '',
    });
    if (isCombobox(props)) {
      this.setState({
        inputValue: getPropValue(item, props.optionLabelProp),
      });
    }
  },

  onMenuDeselect({item, domEvent}) {
    if (domEvent.type === 'click') {
      this.removeSelected(getValuePropValue(item));
    }
    if (!isMultipleOrTags(this.props)) {
      this.setOpenState(false);
    }
    this.setState({
      inputValue: '',
    });
  },

  onPlaceholderClick() {
    this.getInputDOMNode().focus();
  },

  onClearSelection(event) {
    const props = this.props;
    const state = this.state;
    if (props.disabled) {
      return;
    }
    event.stopPropagation();
    if (state.inputValue || state.value.length) {
      this.fireChange([], []);
      this.setOpenState(false);
      this.setState({
        inputValue: '',
      });
    }
  },

  getLabelBySingleValue(children, value) {
    if (value === undefined) {
      return null;
    }
    let label = null;
    React.Children.forEach(children, (child) => {
      if (child.type === OptGroup) {
        const maybe = this.getLabelBySingleValue(child.props.children, value);
        if (maybe !== null) {
          label = maybe;
        }
      } else if (getValuePropValue(child) === value) {
        label = this.getLabelFromOption(child);
      }
    });
    return label;
  },

  getLabelFromOption(child) {
    return getPropValue(child, this.props.optionLabelProp);
  },

  getLabelFromProps(props, value, init) {
    let label = [];
    if ('label' in props) {
      label = toArray(props.label);
    } else if (init && 'defaultLabel' in props) {
      label = toArray(props.defaultLabel);
    } else {
      label = this.getLabelByValue(props.children, value);
    }
    return label;
  },

  getVLForOnChange(vls) {
    if (vls !== undefined) {
      return isMultipleOrTags(this.props) ? vls : vls[0];
    }
    return vls;
  },

  getLabelByValue(children, values) {
    return values.map((value)=> {
      const label = this.getLabelBySingleValue(children, value);
      if (label === null) {
        return value;
      }
      return label;
    });
  },

  getDropdownContainer() {
    if (!this.dropdownContainer) {
      this.dropdownContainer = document.createElement('div');
      document.body.appendChild(this.dropdownContainer);
    }
    return this.dropdownContainer;
  },

  getSearchPlaceholderElement(hidden) {
    const props = this.props;
    if (props.searchPlaceholder) {
      return (<span
        style={{display: hidden ? 'none' : 'block'}}
        onClick={this.onPlaceholderClick}
        className={props.prefixCls + '-search__field__placeholder'}>{props.searchPlaceholder}</span>);
    }
    return null;
  },

  getInputElement() {
    const props = this.props;
    return (<span className={props.prefixCls + '-search__field__wrap'}>
      <input ref={this.saveInputRef}
             onChange={this.onInputChange}
             onKeyDown={this.onInputKeyDown}
             value={this.state.inputValue}
             disabled={props.disabled}
             className={props.prefixCls + '-search__field'}
             role="textbox"/>
      {isMultipleOrTags(props) ? null : this.getSearchPlaceholderElement(!!this.state.inputValue)}
    </span>);
  },

  getInputDOMNode() {
    return this.inputInstance;
  },

  getPopupDOMNode() {
    return this.refs.trigger.getPopupDOMNode();
  },

  getPopupMenuComponent() {
    return this.refs.trigger.getInnerMenu();
  },

  setOpenState(open) {
    const refs = this.refs;
    this.setState({
      open,
    }, ()=> {
      if (open || isMultipleOrTagsOrCombobox(this.props)) {
        if (this.getInputDOMNode()) {
          this.getInputDOMNode().focus();
        }
      } else if (refs.selection) {
        refs.selection.focus();
      }
    });
  },

  removeSelected(selectedValue) {
    const props = this.props;
    if (props.disabled) {
      return;
    }
    const label = this.state.label.concat();
    const index = this.state.value.indexOf(selectedValue);
    const value = this.state.value.filter((singleValue) => {
      return (singleValue !== selectedValue);
    });
    if (index !== -1) {
      label.splice(index, 1);
    }
    const canMultiple = isMultipleOrTags(props);
    if (canMultiple) {
      props.onDeselect(selectedValue);
    }
    this.fireChange(value, label);
  },

  openIfHasChildren() {
    const props = this.props;
    if (React.Children.count(props.children) || isSingleMode(props)) {
      this.setOpenState(true);
    }
  },

  fireChange(value, label) {
    const props = this.props;
    if (!('value' in props)) {
      this.setState({
        value, label,
      });
    }
    props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label));
  },
  renderTopControlNode() {
    const {value, label} = this.state;
    const props = this.props;
    const { choiceTransitionName, prefixCls, maxTagTextLength } = props;
    // single and not combobox, input is inside dropdown
    if (isSingleMode(props)) {
      const placeholder = (<span key="placeholder"
                                 className={prefixCls + '-selection__placeholder'}>
                           {props.placeholder}
      </span>);
      let innerNode = placeholder;
      if (label.length) {
        innerNode = <span key="value">{label[0]}</span>;
      }
      return (<span className={prefixCls + '-selection__rendered'}>
        {innerNode}
      </span>);
    }

    let selectedValueNodes = [];
    if (isMultipleOrTags(props)) {
      selectedValueNodes = value.map((singleValue, index) => {
        let content = label[index];
        const title = content;
        if (maxTagTextLength && typeof content === 'string' && content.length > maxTagTextLength) {
          content = content.slice(0, maxTagTextLength) + '...';
        }
        return (
          <li className={`${prefixCls}-selection__choice`}
              key={singleValue}
              title={title}>
            <span className={prefixCls + '-selection__choice__content'}>{content}</span>
            <span className={prefixCls + '-selection__choice__remove'}
                  onClick={this.removeSelected.bind(this, singleValue)}/>
          </li>
        );
      });
    }
    selectedValueNodes.push(<li className={`${prefixCls}-search ${prefixCls}-search--inline`} key="__input">
      {this.getInputElement()}
    </li>);
    const className = prefixCls + '-selection__rendered';
    if (isMultipleOrTags(props) && choiceTransitionName) {
      return (<Animate className={className}
                       component="ul"
                       transitionName={choiceTransitionName}>
        {selectedValueNodes}
      </Animate>);
    }
    return (<ul className={className}>{selectedValueNodes}</ul>);
  },

  render() {
    const props = this.props;
    const multiple = isMultipleOrTags(props);
    const state = this.state;
    const {className, disabled, allowClear, prefixCls} = props;
    const ctrlNode = this.renderTopControlNode();
    let extraSelectionProps = {};
    if (!isCombobox(props)) {
      extraSelectionProps = {
        onKeyDown: this.onKeyDown,
        tabIndex: 0,
      };
    }
    const rootCls = {
      [className]: !!className,
      [prefixCls]: 1,
      [prefixCls + '-open']: state.open,
      [prefixCls + '-combobox']: isCombobox(props),
      [prefixCls + '-disabled']: disabled,
      [prefixCls + '-enabled']: !disabled,
    };

    const clear = (<span key="clear"
                         className={prefixCls + '-selection__clear'}
                         onClick={this.onClearSelection}/>);
    return (
      <SelectTrigger {...props}
        options={props.children}
        multiple={multiple}
        disabled={disabled}
        visible={state.open}
        inputValue={state.inputValue}
        inputElement={this.getInputElement()}
        value={state.value}
        onDropdownVisibleChange={this.onDropdownVisibleChange}
        onMenuSelect={this.onMenuSelect}
        onMenuDeselect={this.onMenuDeselect}
        ref="trigger">
        <span
          style={props.style}
          className={classNames(rootCls)}>
          <span ref="selection"
                key="selection"
                className={`${prefixCls}-selection ${prefixCls}-selection--${multiple ? 'multiple' : 'single'}`}
                role="combobox"
                aria-autocomplete="list"
                aria-haspopup="true"
                aria-expanded={state.open}
            {...extraSelectionProps}
          >
        {ctrlNode}
            {allowClear && !isMultipleOrTags(props) ? clear : null}
            {multiple || !props.showArrow ? null :
              (<span key="arrow" className={prefixCls + '-arrow'} tabIndex="-1" style={{outline: 'none'}}>
              <b/>
            </span>)}
            {multiple ? this.getSearchPlaceholderElement(!!this.state.inputValue || this.state.value.length) : null}
          </span>
        </span>
      </SelectTrigger>
    );
  },
});


const AntSelect = React.createClass({
  getDefaultProps() {
      return {
        prefixCls: 'ant-select',
        transitionName: 'slide-up',
        optionLabelProp: 'children',
        choiceTransitionName: 'zoom',
        showSearch: false,
        size: 'default'
      };
    },
    render() {
      let {
        size, className, combobox, notFoundContent
      } = this.props;

      const cls = classNames({
        'ant-select-lg': size === 'large',
        'ant-select-sm': size === 'small',
        [className]: !!className,
      });

      if (combobox) {
        notFoundContent = null;
      }

      return <Select {...this.props} className = {cls}
      notFoundContent = {
        notFoundContent
      }></Select>;
    }
});

AntSelect.Option = Option;
AntSelect.OptGroup = OptGroup;

UI.Select = AntSelect;
UI.Option = Option;
UI.OptGroup = OptGroup;
}(Smart.UI,Smart.RC)