//v1.1.5 - 2016.2.14
+ function(RC) {
	const {noop,assign} = _,
		{classnames,Animate,KeyCode,Tree,TreeNode,Trigger} = RC,
		{PropTypes} = React;

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
	  return props.multiple || props.tags || props.treeCheckable;
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


	function isInclude(smallArray, bigArray) {
	  // attention: [0,0,1] [0,0,10]
	  return smallArray.every((ii, i) => {
	    return ii === bigArray[i];
	  });
	}
	function getCheckedKeys(node, checkedKeys, allCheckedNodesKeys) {
	  const nodeKey = node.props.eventKey;
	  let newCks = [...checkedKeys];
	  let nodePos;
	  const unCheck = allCheckedNodesKeys.some(item => {
	    if (item.key === nodeKey) {
	      nodePos = item.pos;
	      return true;
	    }
	  });
	  if (unCheck) {
	    const nArr = nodePos.split('-');
	    newCks = [];
	    allCheckedNodesKeys.forEach(item => {
	      const iArr = item.pos.split('-');
	      if (item.pos === nodePos ||
	        nArr.length > iArr.length && isInclude(iArr, nArr) ||
	        nArr.length < iArr.length && isInclude(nArr, iArr)) {
	        // 过滤掉 父级节点 和 所有子节点。
	        // 因为 node节点 不选时，其 父级节点 和 所有子节点 都不选。
	        return;
	      }
	      newCks.push(item.key);
	    });
	  } else {
	    newCks.push(nodeKey);
	  }
	  return newCks;
	}

	function loopAllChildren(childs, callback) {
	  const loop = (children, level) => {
	    React.Children.forEach(children, (item, index) => {
	      const pos = `${level}-${index}`;
	      if (item.props.children) {
	        loop(item.props.children, pos);
	      }
	      callback(item, index, pos, getValuePropValue(item));
	    });
	  };
	  loop(childs, 0);
	}

	function filterMinPos(arr) {
	  const a = [];
	  arr.forEach((item) => {
	    const b = a.filter((i) => {
	      return item.indexOf(i) === 0 && (item[i.length] === '-' || !item[i.length]);
	    });
	    if (!b.length) {
	      a.push(item);
	    }
	  });
	  return a;
	}
	// console.log(filterMinPos(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

	function handleCheckState(obj, checkedPosArr, checkIt) {
	  const stripTail = (str) => {
	    const arr = str.match(/(.+)(-[^-]+)$/);
	    let st = '';
	    if (arr && arr.length === 3) {
	      st = arr[1];
	    }
	    return st;
	  };
	  // stripTail('x-xx-sss-xx')
	  const splitPos = (pos) => {
	    return pos.split('-');
	  };
	  checkedPosArr.forEach((_pos) => {
	    // 设置子节点，全选或全不选
	    Object.keys(obj).forEach((i) => {
	      if (splitPos(i).length > splitPos(_pos).length && i.indexOf(_pos) === 0) {
	        obj[i].checkPart = false;
	        obj[i].checked = checkIt;
	      }
	    });
	    // 循环设置父节点的 选中 或 半选状态
	    const loop = (__pos) => {
	      const _posLen = splitPos(__pos).length;
	      if (_posLen <= 2) { // e.g. '0-0', '0-1'
	        return;
	      }
	      let sibling = 0;
	      let siblingChecked = 0;
	      const parentPos = stripTail(__pos);
	      Object.keys(obj).forEach((i) => {
	        if (splitPos(i).length === _posLen && i.indexOf(parentPos) === 0) {
	          sibling++;
	          if (obj[i].checked) {
	            siblingChecked++;
	          } else if (obj[i].checkPart) {
	            siblingChecked += 0.5;
	          }
	        }
	      });
	      const parent = obj[parentPos];
	      // sibling 不会等于0
	      // 全不选 - 全选 - 半选
	      if (siblingChecked === 0) {
	        parent.checked = false;
	        parent.checkPart = false;
	      } else if (siblingChecked === sibling) {
	        parent.checked = true;
	        parent.checkPart = false;
	      } else {
	        parent.checkPart = true;
	        parent.checked = false;
	      }
	      loop(parentPos);
	    };
	    loop(_pos);
	  });
	}

	function getCheckValues(treeNodesStates) {
	  const checkedValues = [];
	  Object.keys(treeNodesStates).forEach((item) => {
	    const itemObj = treeNodesStates[item];
	    if (itemObj.checked && !itemObj.node.props.children) {
	      checkedValues.push(getValuePropValue(itemObj.node));
	    }
	  });
	  return {
	    checkedValues,
	  };
	}

	function getTreeNodesStates(children, values) {
	  const checkedPos = [];
	  const treeNodesStates = {};
	  loopAllChildren(children, (item, index, pos, value) => {
	    let checked = false;
	    if (values.indexOf(value) !== -1) {
	      checked = true;
	      checkedPos.push(pos);
	    }
	    treeNodesStates[pos] = {
	      node: item,
	      checked: checked,
	      checkPart: false,
	    };
	  });

	  handleCheckState(treeNodesStates, filterMinPos(checkedPos.sort()), true);

	  return getCheckValues(treeNodesStates);
	}

	class _TreeNode extends React.Component {

	}
	_TreeNode.propTypes = {
	  value: React.PropTypes.string,
	};


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
	    filterTreeNode: PropTypes.any,
	    treeNodes: PropTypes.any,
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

	  getPopupEleRefs() {
	    return this.popupEle && this.popupEle.refs;
	  },

	  getPopupDOMNode() {
	    return this.refs.trigger.getPopupDomNode();
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

	  filterTree(treeNode) {
	    const props = this.props;
	    return props.inputValue && treeNode.props[props.treeNodeFilterProp].indexOf(props.inputValue) > -1;
	  },

	  filterTreeNode(input, child) {
	    if (!input) {
	      return true;
	    }
	    const filterTreeNode = this.props.filterTreeNode;
	    if (!filterTreeNode) {
	      return true;
	    }
	    if (child.props.disabled) {
	      return false;
	    }
	    return filterTreeNode.call(this, input, child);
	  },

	  savePopupElement(ele) {
	    this.popupEle = ele;
	  },

	  renderFilterOptionsFromChildren(children) {
	    let posArr = [];
	    const filterPos = [];
	    const props = this.props;
	    const inputValue = props.inputValue;

	    loopAllChildren(children, (child, index, pos) => {
	      if (this.filterTreeNode(inputValue, child)) {
	        posArr.push(pos);
	      }
	    });
	    posArr = filterMinPos(posArr);

	    const filterChildren = {};
	    loopAllChildren(children, (child, index, pos) => {
	      posArr.forEach(item => {
	        if (item.indexOf(pos) === 0 && filterPos.indexOf(pos) === -1) {
	          filterPos.push(pos);
	          filterChildren[pos] = child;
	        }
	      });
	    });

	    const level = {};
	    filterPos.forEach(pos => {
	      const arr = pos.split('-');
	      const key = String(arr.length - 1);
	      level[key] = level[key] || [];
	      level[key].push(pos);
	    });

	    const childrenArr = [];

	    function loop(arr, cur, callback) {
	      arr.forEach((c, index) => {
	        if (cur.indexOf(c.pos) === 0) {
	          if (c.children) {
	            if (cur.split('-').length === c.pos.split('-').length + 1) {
	              callback(arr, index);
	            } else {
	              loop(c.children, cur, callback);
	            }
	          } else {
	            callback(arr, index);
	          }
	        }
	      });
	    }
	    const levelArr = Object.keys(level).sort((a, b) => a - b);
	    if (levelArr.length > 0) {
	      level[levelArr[0]].forEach((pos, index) => {
	        childrenArr[index] = {
	          pos: pos,
	          node: filterChildren[pos],
	        };
	      });
	      const loopFn = cur => {
	        loop(childrenArr, cur, (arr, index) => {
	          arr[index].children = arr[index].children || [];
	          arr[index].children.push({
	            pos: cur,
	            node: filterChildren[cur],
	          });
	        });
	      };
	      for (let i = 1; i < levelArr.length; i++) {
	        level[levelArr[i]].forEach(loopFn);
	      }
	    }
	    return childrenArr;
	  },

	  renderTree(treeNodes, newTreeNodes, multiple) {
	    const props = this.props;

	    const loop = data => {
	      return data.map((item) => {
	        const tProps = {key: item.node.key};
	        assign(tProps, item.node.props);
	        if (tProps.children) {
	          delete tProps.children;
	        }
	        if (item.children) {
	          return <TreeNode {...tProps}>{loop(item.children)}</TreeNode>;
	        }
	        return <TreeNode {...tProps} />;
	      });
	    };

	    const trProps = {
	      multiple,
	      prefixCls: props.prefixCls + '-tree',
	      showIcon: props.treeIcon,
	      showLine: props.treeLine,
	      defaultExpandAll: props.treeDefaultExpandAll,
	      checkable: props.treeCheckable,
	      filterTreeNode: this.filterTree,
	    };
	    const vals = props.value || props.defaultValue;
	    const keys = [];
	    loopAllChildren(treeNodes, (child) => {
	      if (vals.indexOf(getValuePropValue(child)) > -1) {
	        keys.push(child.key);
	      }
	    });
	    // 为避免混乱，checkable 模式下，select 失效
	    if (trProps.checkable) {
	      trProps.selectable = false;
	      trProps.checkedKeys = keys;
	      trProps.onCheck = props.onSelect;
	    } else {
	      trProps.selectedKeys = keys;
	      trProps.onSelect = props.onSelect;
	    }

	    // async loadData
	    if (props.loadData) {
	      trProps.loadData = props.loadData;
	    }

	    return (<Tree ref={this.savePopupElement} {...trProps}>
	        {loop(newTreeNodes)}
	    </Tree>);
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
	    const search = multiple || props.combobox || !props.showSearch ? null : (
	      <span className={`${dropdownPrefixCls}-search`}>{props.inputElement}</span>
	    );
	    const treeNodes = this.renderFilterOptionsFromChildren(props.treeData || props.treeNodes);
	    let notFoundContent;
	    if (!treeNodes.length) {
	      if (props.notFoundContent) {
	        notFoundContent = <span>{props.notFoundContent}</span>;
	      }
	      if (!search) {
	        visible = false;
	      }
	    }
	    const popupElement = (<div>
	      {search}
	      {notFoundContent ? notFoundContent : this.renderTree(props.treeData || props.treeNodes, treeNodes, multiple)}
	    </div>);

	    return (<Trigger action={props.disabled ? [] : ['click']}
	                     ref="trigger"
	                     popupPlacement="bottomLeft"
	                     builtinPlacements={BUILT_IN_PLACEMENTS}
	                     prefixCls={dropdownPrefixCls}
	                     popupTransitionName={this.getDropdownTransitionName()}
	                     onPopupVisibleChange={props.onDropdownVisibleChange}
	                     popup={popupElement}
	                     popupVisible={visible}
	                     popupClassName={classnames(popupClassName)}
	                     popupStyle={props.dropdownStyle}
	    >{this.props.children}</Trigger>);
	  },
	});


	function filterFn(input, child) {
	  return String(getPropValue(child, this.props.treeNodeFilterProp)).indexOf(input) > -1;
	}

	function saveRef(name, component) {
	  this[name] = component;
	}

	function loopTreeData(data, level = 0) {
	  return data.map((item, index) => {
	    const pos = `${level}-${index}`;
	    const props = {
	      title: item.label,
	      value: item.value,
	      key: item.key || item.value || pos,
	    };
	    let ret;
	    if (item.children && item.children.length) {
	      ret = (<_TreeNode {...props}>{loopTreeData(item.children, pos)}</_TreeNode>);
	    } else {
	      ret = (<_TreeNode {...props} isLeaf={item.isLeaf}/>);
	    }
	    return ret;
	  });
	}

	const Select = React.createClass({
	  propTypes: {
	    children: PropTypes.any,
	    multiple: PropTypes.bool,
	    filterTreeNode: PropTypes.any,
	    showSearch: PropTypes.bool,
	    disabled: PropTypes.bool,
	    showArrow: PropTypes.bool,
	    tags: PropTypes.bool,
	    transitionName: PropTypes.string,
	    animation: PropTypes.string,
	    choiceTransitionName: PropTypes.string,
	    onClick: PropTypes.func,
	    onChange: PropTypes.func,
	    onSelect: PropTypes.func,
	    onSearch: PropTypes.func,
	    searchPlaceholder: PropTypes.string,
	    placeholder: PropTypes.any,
	    value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
	    defaultValue: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
	    label: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
	    defaultLabel: PropTypes.oneOfType([PropTypes.array, PropTypes.any]),
	    dropdownStyle: PropTypes.object,
	    maxTagTextLength: PropTypes.number,
	    treeIcon: PropTypes.bool,
	    treeLine: PropTypes.bool,
	    treeDefaultExpandAll: PropTypes.bool,
	    treeCheckable: PropTypes.oneOfType([
	      PropTypes.bool,
	      PropTypes.node,
	    ]),
	    treeNodeLabelProp: PropTypes.string,
	    treeNodeFilterProp: PropTypes.string,
	    treeData: PropTypes.array,
	    loadData: PropTypes.func,
	  },

	  getDefaultProps() {
	    return {
	      prefixCls: 'rc-tree-select',
	      filterTreeNode: filterFn,
	      showSearch: true,
	      allowClear: false,
	      placeholder: '',
	      searchPlaceholder: '',
	      defaultValue: [],
	      onClick: noop,
	      onChange: noop,
	      onSelect: noop,
	      onSearch: noop,
	      showArrow: true,
	      dropdownMatchSelectWidth: true,
	      dropdownStyle: {},
	      notFoundContent: 'Not Found',
	      treeIcon: false,
	      treeLine: false,
	      treeDefaultExpandAll: false,
	      treeCheckable: false,
	      treeNodeFilterProp: 'value',
	      treeNodeLabelProp: 'title',
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
	    if (this.props.treeCheckable) {
	      value = getTreeNodesStates(this.renderTreeData() || this.props.children, value).checkedValues;
	    }
	    const label = this.getLabelFromProps(props, value, 1);
	    let inputValue = '';
	    if (props.combobox) {
	      inputValue = value[0] || '';
	    }
	    this.saveInputRef = saveRef.bind(this, 'inputInstance');
	    return {value, inputValue, label};
	  },

	  componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
	      let value = toArray(nextProps.value);
	      if (nextProps.treeCheckable) {
	        value = getTreeNodesStates(this.renderTreeData(nextProps) || nextProps.children, value).checkedValues;
	      }
	      const label = this.getLabelFromProps(nextProps, value);
	      this.setState({
	        value,
	        label,
	      });
	      if (nextProps.combobox) {
	        this.setState({
	          inputValue: value[0] || '',
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
	        value.pop();
	        label.pop();
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
	      // const menu = this.refs.trigger.getPopupEleRefs();
	      // if (menu && menu.onKeyDown(event)) {
	      //   event.preventDefault();
	      //   event.stopPropagation();
	      // }
	    }
	  },

	  onSelect(selectedKeys, info) {
	    const check = info.event === 'check';
	    if (info.selected === false) {
	      this.onDeselect(info);
	      return;
	    }
	    const item = info.node;
	    let value = this.state.value;
	    let label = this.state.label;
	    const props = this.props;
	    const selectedValue = getValuePropValue(item);
	    const selectedLabel = this.getLabelFromNode(item);
	    props.onSelect(selectedValue, item);
	    if (isMultipleOrTags(props)) {
	      if (check) {
	        // TODO treeCheckable does not support tags/dynamic
	        let {checkedNodes} = info;
	        checkedNodes = checkedNodes.filter(n => !n.props.children);
	        value = checkedNodes.map(n => getValuePropValue(n));
	        label = checkedNodes.map(n => this.getLabelFromNode(n));
	      } else {
	        if (value.indexOf(selectedValue) !== -1) {
	          return;
	        }
	        value = value.concat([selectedValue]);
	        label = label.concat([selectedLabel]);
	      }
	      if (!check && value.indexOf(selectedValue) !== -1) {
	        // 设置 multiple 时会有bug。（isValueChange 已有检查，此处注释掉）
	        // return;
	      }
	    } else {
	      if (value[0] === selectedValue) {
	        this.setOpenState(false);
	        return;
	      }
	      value = [selectedValue];
	      label = [selectedLabel];
	      this.setOpenState(false);
	    }

	    this.fireChange(value, label, {triggerValue: selectedValue, triggerNode: item, checked: info.checked});
	    this.setState({
	      inputValue: '',
	    });
	    if (isCombobox(props)) {
	      this.setState({
	        inputValue: getPropValue(item, props.treeNodeLabelProp),
	      });
	    }
	  },

	  onDeselect(info) {
	    this.removeSelected(getValuePropValue(info.node));
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
	    const loop = (childs) => {
	      React.Children.forEach(childs, (item) => {
	        if (item.props.children) {
	          loop(item.props.children);
	        }
	        if (getValuePropValue(item) === value) {
	          label = this.getLabelFromNode(item);
	        }
	      });
	    };
	    loop(children, 0);
	    return label;
	  },

	  getLabelFromNode(child) {
	    return getPropValue(child, this.props.treeNodeLabelProp);
	  },

	  getLabelFromProps(props, value, init) {
	    let label = [];
	    if ('label' in props) {
	      label = toArray(props.label);
	    } else if (init && 'defaultLabel' in props) {
	      label = toArray(props.defaultLabel);
	    } else {
	      label = this.getLabelByValue(this.renderTreeData(props) || props.children, value);
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

	  getPopupComponentRefs() {
	    return this.refs.trigger.getPopupEleRefs();
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

	  removeSelected(selectedValue, e) {
	    const props = this.props;
	    if (props.disabled) {
	      return;
	    }
	    if (e) {
	      e.stopPropagation();
	    }
	    const label = this.state.label.concat();
	    const index = this.state.value.indexOf(selectedValue);
	    const value = this.state.value.filter((singleValue) => {
	      return (singleValue !== selectedValue);
	    });
	    if (index !== -1) {
	      label.splice(index, 1);
	    }
	    this.fireChange(value, label, {triggerValue: selectedValue, clear: true});
	  },

	  openIfHasChildren() {
	    const props = this.props;
	    if (React.Children.count(props.children) || isSingleMode(props)) {
	      this.setOpenState(true);
	    }
	  },

	  isValueChange(value) {
	    let sv = this.state.value;
	    if (typeof sv === 'string') {
	      sv = [sv];
	    }
	    if (value.length !== sv.length || !value.every((val, index) => sv[index] === val)) {
	      return true;
	    }
	  },

	  fireChange(value, label, extraInfo) {
	    const props = this.props;
	    if (!('value' in props)) {
	      this.setState({
	        value, label,
	      });
	    }
	    if (this.isValueChange(value)) {
	      const ex = {preValue: [...this.state.value]};
	      if (extraInfo) {
	        assign(ex, extraInfo);
	      }
	      props.onChange(this.getVLForOnChange(value), this.getVLForOnChange(label), ex);
	    }
	  },
	  renderTopControlNode() {
	    const value = this.state.value;
	    const label = this.state.label;
	    const props = this.props;
	    const { choiceTransitionName, prefixCls, maxTagTextLength } = props;
	    // single and not combobox, input is inside dropdown
	    if (isSingleMode(props)) {
	      const placeholder = (<span key="placeholder"
	                                 className={prefixCls + '-selection__placeholder'}>
	                           {props.placeholder}
	      </span>);
	      let innerNode = placeholder;
	      if (this.state.label[0]) {
	        innerNode = <span key="value">{this.state.label[0]}</span>;
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
	  renderTreeData(props) {
	    const validProps = props || this.props;
	    if (validProps.treeData) {
	      return loopTreeData(validProps.treeData);
	    }
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
	        treeNodes={props.children}
	        treeData={this.renderTreeData()}
	        multiple={multiple}
	        disabled={disabled}
	        visible={state.open}
	        inputValue={state.inputValue}
	        inputElement={this.getInputElement()}
	        value={state.value}
	        onDropdownVisibleChange={this.onDropdownVisibleChange}
	        onSelect={this.onSelect}
	        ref="trigger">
	        <span
	          style={props.style}
	          onClick={props.onClick}
	          className={classnames(rootCls)}>
	          <span ref="selection"
	                key="selection"
	                className={`${prefixCls}-selection ${prefixCls}-selection--${multiple ? 'multiple' : 'single'}`}
	                role="combobox"
	                aria-autocomplete="list"
	                aria-haspopup="true"
	                aria-expanded={state.open}
	            {...extraSelectionProps}>
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

	Select.TreeNode = _TreeNode;
	RC.TreeSelect = Select;

}(Smart.RC)
