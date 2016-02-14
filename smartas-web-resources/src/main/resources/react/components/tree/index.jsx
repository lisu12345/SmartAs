//v1.1.0 - 2016.2.14
+ function(RC) {
	const {noop,assign} = _,
		{classNames,Animate} = RC,
		{PropTypes} = React;


	function browser(ua) {
	  let tem;
	  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	  if (/trident/i.test(M[1])) {
	    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
	    return 'IE ' + (tem[1] || '');
	  }
	  if (M[1] === 'Chrome') {
	    tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
	    if (tem) return tem.slice(1).join(' ').replace('OPR', 'Opera');
	  }
	  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
	  tem = ua.match(/version\/(\d+)/i);
	  if (tem) {
	    M.splice(1, 1, tem[1]);
	  }
	  return M.join(' ');
	}

	// export function getOffset(el) {
	//   const obj = el.getBoundingClientRect();
	//   return {
	//     left: obj.left + document.body.scrollLeft,
	//     top: obj.top + document.body.scrollTop,
	//     width: obj.width,
	//     height: obj.height
	//   };
	// }

	// // iscroll offset
	// offset = function (el) {
	//   var left = -el.offsetLeft,
	//     top = -el.offsetTop;

	//   // jshint -W084
	//   while (el = el.offsetParent) {
	//     left -= el.offsetLeft;
	//     top -= el.offsetTop;
	//   }
	//   // jshint +W084

	//   return {
	//     left: left,
	//     top: top
	//   };
	// }

	function getOffset(ele) {
	  let el = ele;
	  let _x = 0;
	  let _y = 0;
	  while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
	    _x += el.offsetLeft - el.scrollLeft;
	    _y += el.offsetTop - el.scrollTop;
	    el = el.offsetParent;
	  }
	  return { top: _y, left: _x };
	}

	function getChildrenlength(children) {
	  let len = 1;
	  if (Array.isArray(children)) {
	    len = children.length;
	  }
	  return len;
	}

	function getSiblingPosition(index, len, siblingPosition) {
	  if (len === 1) {
	    siblingPosition.first = true;
	    siblingPosition.last = true;
	  } else {
	    siblingPosition.first = index === 0;
	    siblingPosition.last = index === len - 1;
	  }
	  return siblingPosition;
	}

	function loopAllChildren(childs, callback) {
	  const loop = (children, level) => {
	    const len = getChildrenlength(children);
	    React.Children.forEach(children, (item, index) => {
	      const pos = `${level}-${index}`;
	      if (item.props.children && item.type && item.type.isTreeNode) {
	        loop(item.props.children, pos);
	      }
	      callback(item, index, pos, item.key || pos, getSiblingPosition(index, len, {}));
	    });
	  };
	  loop(childs, 0);
	}

	function filterMinPosition(arr) {
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
	// console.log(filterMinPosition(['0-0','0-1', '0-10', '0-0-1', '0-1-1', '0-10-0']));

	function isInclude(smallArray, bigArray) {
	  return smallArray.every((ii, i) => {
	    return ii === bigArray[i];
	  });
	}
	// console.log(isInclude(['0', '1'], ['0', '10', '1']));

	// TODO 效率差, 需要缓存优化
	function handleCheckState(obj, checkedPositionArr, checkIt) {
	  const stripTail = (str) => {
	    const arr = str.match(/(.+)(-[^-]+)$/);
	    let st = '';
	    if (arr && arr.length === 3) {
	      st = arr[1];
	    }
	    return st;
	  };
	  // console.log(stripTail('0-101-000'));
	  const splitPosition = (pos) => {
	    return pos.split('-');
	  };
	  checkedPositionArr.forEach((_pos) => {
	    // 设置子节点，全选或全不选
	    const _posArr = splitPosition(_pos);
	    Object.keys(obj).forEach((i) => {
	      const iArr = splitPosition(i);
	      if (iArr.length > _posArr.length && isInclude(_posArr, iArr)) {
	        obj[i].checkPart = false;
	        obj[i].checked = checkIt;
	      }
	    });
	    // 循环设置父节点的 选中 或 半选状态
	    const loop = (__pos) => {
	      const _posLen = splitPosition(__pos).length;
	      if (_posLen <= 2) { // e.g. '0-0', '0-1'
	        return;
	      }
	      let sibling = 0;
	      let siblingChecked = 0;
	      const parentPosition = stripTail(__pos);
	      Object.keys(obj).forEach((i) => {
	        const iArr = splitPosition(i);
	        if (iArr.length === _posLen && isInclude(splitPosition(parentPosition), iArr)) {
	          sibling++;
	          if (obj[i].checked) {
	            siblingChecked++;
	          } else if (obj[i].checkPart) {
	            siblingChecked += 0.5;
	          }
	        }
	      });
	      const parent = obj[parentPosition];
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
	      loop(parentPosition);
	    };
	    loop(_pos);
	  });
	}

	function getCheckKeys(treeNodesStates) {
	  const checkPartKeys = [];
	  const checkedKeys = [];
	  const checkedNodes = [];
	  const checkedNodesKeys = [];
	  Object.keys(treeNodesStates).forEach((item) => {
	    const itemObj = treeNodesStates[item];
	    if (itemObj.checked) {
	      checkedKeys.push(itemObj.key);
	      checkedNodes.push(itemObj.node);
	      checkedNodesKeys.push({key: itemObj.key, node: itemObj.node, pos: item});
	    } else if (itemObj.checkPart) {
	      checkPartKeys.push(itemObj.key);
	    }
	  });
	  return {
	    checkPartKeys, checkedKeys, checkedNodes, checkedNodesKeys, treeNodesStates,
	  };
	}

	function getTreeNodesStates(children, checkedKeys, checkIt, unCheckKey) {
	  const checkedPosition = [];
	  const treeNodesStates = {};
	  loopAllChildren(children, (item, index, pos, newKey, siblingPosition) => {
	    let checked = false;
	    if (checkedKeys.indexOf(newKey) !== -1) {
	      checked = true;
	      checkedPosition.push(pos);
	    }
	    treeNodesStates[pos] = {
	      node: item,
	      key: newKey,
	      checked: checked,
	      checkPart: false,
	      siblingPosition,
	    };
	  });

	  // debugger
	  handleCheckState(treeNodesStates, filterMinPosition(checkedPosition.sort()), true);

	  if (!checkIt && unCheckKey) {
	    let pos;
	    Object.keys(treeNodesStates).forEach((item) => {
	      const itemObj = treeNodesStates[item];
	      if (itemObj.key === unCheckKey) {
	        pos = item;
	        itemObj.checked = checkIt;
	        itemObj.checkPart = false;
	      }
	    });
	    handleCheckState(treeNodesStates, [pos], checkIt);
	  }

	  return getCheckKeys(treeNodesStates);
	}


	class Tree extends React.Component {
	  constructor(props) {
	    super(props);
	    ['onKeyDown', 'onCheck'].forEach((m)=> {
	      this[m] = this[m].bind(this);
	    });
	    this.contextmenuKeys = [];

	    this.state = {
	      expandedKeys: this.getDefaultExpandedKeys(props),
	      checkedKeys: this.getDefaultCheckedKeys(props),
	      selectedKeys: this.getDefaultSelectedKeys(props),
	      dragNodesKeys: '',
	      dragOverNodeKey: '',
	      dropNodeKey: '',
	    };
	  }

	  componentWillReceiveProps(nextProps) {
	    const expandedKeys = this.getDefaultExpandedKeys(nextProps, true);
	    const checkedKeys = this.getDefaultCheckedKeys(nextProps, true);
	    const selectedKeys = this.getDefaultSelectedKeys(nextProps, true);
	    const st = {};
	    if (expandedKeys) {
	      st.expandedKeys = expandedKeys;
	    }
	    if (checkedKeys) {
	      st.checkedKeys = checkedKeys;
	    }
	    if (selectedKeys) {
	      st.selectedKeys = selectedKeys;
	    }
	    this.setState(st);
	  }

	  onDragStart(e, treeNode) {
	    this.dragNode = treeNode;
	    this.dragNodesKeys = this.getDragNodes(treeNode);
	    const st = {
	      dragNodesKeys: this.dragNodesKeys,
	    };
	    const expandedKeys = this.getExpandedKeys(treeNode, false);
	    if (expandedKeys) {
	      // Controlled expand, save and then reset
	      this.getRawExpandedKeys();
	      st.expandedKeys = expandedKeys;
	    }
	    this.setState(st);
	    this.props.onDragStart({
	      event: e,
	      node: treeNode,
	    });
	  }

	  onDragEnterGap(e, treeNode) {
	    // console.log(e.pageY, getOffset(treeNode.refs.selectHandle), treeNode.props.eventKey);
	    const offsetTop = getOffset(treeNode.refs.selectHandle).top;
	    const offsetHeight = treeNode.refs.selectHandle.offsetHeight;
	    const pageY = e.pageY;
	    const gapHeight = 2;
	    if (pageY > offsetTop + offsetHeight - gapHeight) {
	      this.dropPosition = 1;
	      return 1;
	    }
	    if (pageY < offsetTop + gapHeight) {
	      this.dropPosition = -1;
	      return -1;
	    }
	    this.dropPosition = 0;
	    return 0;
	  }

	  onDragEnter(e, treeNode) {
	    const enterGap = this.onDragEnterGap(e, treeNode);
	    if (this.dragNode.props.eventKey === treeNode.props.eventKey && enterGap === 0) {
	      this.setState({
	        dragOverNodeKey: '',
	      });
	      return;
	    }
	    const st = {
	      dragOverNodeKey: treeNode.props.eventKey,
	    };
	    const expandedKeys = this.getExpandedKeys(treeNode, true);
	    if (expandedKeys) {
	      this.getRawExpandedKeys();
	      st.expandedKeys = expandedKeys;
	    }
	    this.setState(st);
	    this.props.onDragEnter({
	      event: e,
	      node: treeNode,
	      expandedKeys: expandedKeys && [...expandedKeys] || [...this.state.expandedKeys],
	    });
	  }

	  onDragOver(e, treeNode) {
	    this.props.onDragOver({event: e, node: treeNode});
	  }

	  onDragLeave(e, treeNode) {
	    this.props.onDragLeave({event: e, node: treeNode});
	  }

	  onDrop(e, treeNode) {
	    const key = treeNode.props.eventKey;
	    this.setState({
	      dragOverNodeKey: '',
	      dropNodeKey: key,
	    });
	    if (this.dragNodesKeys.indexOf(key) > -1) {
	      if (console.warn) {
	        console.warn('can not drop to dragNode(include it\'s children node)');
	      }
	      return false;
	    }

	    const posArr = treeNode.props.pos.split('-');
	    const res = {
	      event: e,
	      node: treeNode,
	      dragNode: this.dragNode,
	      dragNodesKeys: [...this.dragNodesKeys],
	      dropPosition: this.dropPosition + Number(posArr[posArr.length - 1]),
	    };
	    if (this.dropPosition !== 0) {
	      res.dropToGap = true;
	    }
	    if ('expandedKeys' in this.props) {
	      res.rawExpandedKeys = [...this._rawExpandedKeys] || [...this.state.expandedKeys];
	    }
	    this.props.onDrop(res);
	  }

	  onExpand(treeNode) {
	    const expand = !treeNode.props.expanded;
	    const controlled = 'expandedKeys' in this.props;
	    const expandedKeys = [...this.state.expandedKeys];
	    const index = expandedKeys.indexOf(treeNode.props.eventKey);
	    if (!controlled) {
	      if (expand) {
	        if (index === -1) {
	          expandedKeys.push(treeNode.props.eventKey);
	        }
	      } else {
	        expandedKeys.splice(index, 1);
	      }
	      this.setState({expandedKeys});
	      // remember the return object, such as expandedKeys, must clone!!
	      // so you can avoid outer code change it.
	      this.props.onExpand(treeNode, expand, [...expandedKeys]);
	    } else {
	      this.props.onExpand(treeNode, !expand, [...expandedKeys]);
	    }

	    // after data loaded, need set new expandedKeys
	    if (expand && this.props.loadData) {
	      return this.props.loadData(treeNode).then(() => {
	        if (!controlled) {
	          this.setState({expandedKeys});
	        }
	      });
	    }
	  }

	  onCheck(treeNode) {
	    let checked = !treeNode.props.checked;
	    if (treeNode.props.checkPart) {
	      checked = true;
	    }
	    const key = treeNode.key || treeNode.props.eventKey;
	    let checkedKeys = [...this.state.checkedKeys];
	    if (checked && checkedKeys.indexOf(key) === -1) {
	      checkedKeys.push(key);
	    }
	    const checkKeys = getTreeNodesStates(this.props.children, checkedKeys, checked, key);
	    const newSt = {
	      event: 'check',
	      node: treeNode,
	      checked,
	      checkedNodes: checkKeys.checkedNodes,
	    };
	    checkedKeys = checkKeys.checkedKeys;
	    if (!('checkedKeys' in this.props)) {
	      this.setState({
	        checkedKeys,
	      });
	    }
	    this.props.onCheck(checkedKeys, newSt);
	  }

	  onSelect(treeNode) {
	    const props = this.props;
	    const selectedKeys = [...this.state.selectedKeys];
	    const eventKey = treeNode.props.eventKey;
	    const index = selectedKeys.indexOf(eventKey);
	    let selected;
	    if (index !== -1) {
	      selected = false;
	      selectedKeys.splice(index, 1);
	    } else {
	      selected = true;
	      if (!props.multiple) {
	        selectedKeys.length = 0;
	      }
	      selectedKeys.push(eventKey);
	    }
	    const selectedNodes = [];
	    if (selectedKeys.length) {
	      loopAllChildren(this.props.children, (item)=> {
	        if (selectedKeys.indexOf(item.key) !== -1) {
	          selectedNodes.push(item);
	        }
	      });
	    }
	    const newSt = {
	      event: 'select',
	      node: treeNode,
	      selected,
	      selectedNodes,
	    };
	    if (!('selectedKeys' in this.props)) {
	      this.setState({
	        selectedKeys,
	      });
	    }
	    props.onSelect(selectedKeys, newSt);
	  }

	  onMouseEnter(e, treeNode) {
	    this.props.onMouseEnter({event: e, node: treeNode});
	  }

	  onMouseLeave(e, treeNode) {
	    this.props.onMouseLeave({event: e, node: treeNode});
	  }

	  onContextMenu(e, treeNode) {
	    const selectedKeys = [...this.state.selectedKeys];
	    const eventKey = treeNode.props.eventKey;
	    if (this.contextmenuKeys.indexOf(eventKey) === -1) {
	      this.contextmenuKeys.push(eventKey);
	    }
	    this.contextmenuKeys.forEach((key) => {
	      const index = selectedKeys.indexOf(key);
	      if (index !== -1) {
	        selectedKeys.splice(index, 1);
	      }
	    });
	    if (selectedKeys.indexOf(eventKey) === -1) {
	      selectedKeys.push(eventKey);
	    }
	    this.setState({
	      selectedKeys,
	    });
	    this.props.onRightClick({event: e, node: treeNode});
	  }

	  // all keyboard events callbacks run from here at first
	  onKeyDown(e) {
	    e.preventDefault();
	  }

	  getFilterExpandedKeys(props) {
	    const defaultExpandedKeys = props.defaultExpandedKeys;
	    const expandedPositionArr = [];
	    if (props.autoExpandParent) {
	      loopAllChildren(props.children, (item, index, pos, newKey) => {
	        if (defaultExpandedKeys.indexOf(newKey) > -1) {
	          expandedPositionArr.push(pos);
	        }
	      });
	    }
	    const filterExpandedKeys = [];
	    loopAllChildren(props.children, (item, index, pos, newKey) => {
	      if (props.defaultExpandAll) {
	        filterExpandedKeys.push(newKey);
	      } else if (props.autoExpandParent) {
	        expandedPositionArr.forEach(p => {
	          if ((p.split('-').length > pos.split('-').length
	            && isInclude(pos.split('-'), p.split('-')) || pos === p)
	            && filterExpandedKeys.indexOf(newKey) === -1) {
	            filterExpandedKeys.push(newKey);
	          }
	        });
	      }
	    });
	    return filterExpandedKeys.length ? filterExpandedKeys : defaultExpandedKeys;
	  }

	  getDefaultExpandedKeys(props, willReceiveProps) {
	    let expandedKeys = willReceiveProps ? undefined : this.getFilterExpandedKeys(props);
	    if ('expandedKeys' in props) {
	      expandedKeys = props.expandedKeys || [];
	    }
	    return expandedKeys;
	  }

	  getDefaultCheckedKeys(props, willReceiveProps) {
	    let checkedKeys = willReceiveProps ? undefined : props.defaultCheckedKeys;
	    if ('checkedKeys' in props) {
	      checkedKeys = props.checkedKeys || [];
	    }
	    return checkedKeys;
	  }

	  getDefaultSelectedKeys(props, willReceiveProps) {
	    const getKeys = (keys) => {
	      if (props.multiple) {
	        return [...keys];
	      }
	      if (keys.length) {
	        return [keys[0]];
	      }
	      return keys;
	    };
	    let selectedKeys = willReceiveProps ? undefined : getKeys(props.defaultSelectedKeys);
	    if ('selectedKeys' in props) {
	      selectedKeys = getKeys(props.selectedKeys);
	    }
	    return selectedKeys;
	  }

	  getRawExpandedKeys() {
	    if (!this._rawExpandedKeys && ('expandedKeys' in this.props)) {
	      this._rawExpandedKeys = [...this.state.expandedKeys];
	    }
	  }

	  getOpenTransitionName() {
	    const props = this.props;
	    let transitionName = props.openTransitionName;
	    const animationName = props.openAnimation;
	    if (!transitionName && typeof animationName === 'string') {
	      transitionName = `${props.prefixCls}-open-${animationName}`;
	    }
	    return transitionName;
	  }

	  getDragNodes(treeNode) {
	    const dragNodesKeys = [];
	    const tPArr = treeNode.props.pos.split('-');
	    loopAllChildren(this.props.children, (item, index, pos, newKey) => {
	      const pArr = pos.split('-');
	      if (treeNode.props.pos === pos || tPArr.length < pArr.length && isInclude(tPArr, pArr)) {
	        dragNodesKeys.push(newKey);
	      }
	    });
	    return dragNodesKeys;
	  }

	  getExpandedKeys(treeNode, expand) {
	    const key = treeNode.props.eventKey;
	    const expandedKeys = this.state.expandedKeys;
	    const expandedIndex = expandedKeys.indexOf(key);
	    let exKeys;
	    if (expandedIndex > -1 && !expand) {
	      exKeys = [...expandedKeys];
	      exKeys.splice(expandedIndex, 1);
	      return exKeys;
	    }
	    if (expand && expandedKeys.indexOf(key) === -1) {
	      return expandedKeys.concat([key]);
	    }
	  }

	  filterTreeNode(treeNode) {
	    const ftn = this.props.filterTreeNode;
	    if (typeof ftn !== 'function' || treeNode.props.disabled) {
	      return false;
	    }
	    return ftn.call(this, treeNode);
	  }

	  renderTreeNode(child, index, level = 0) {
	    const pos = `${level}-${index}`;
	    const key = child.key || pos;
	    const state = this.state;
	    const props = this.props;
	    const cloneProps = {
	      ref: 'treeNode-' + key,
	      root: this,
	      eventKey: key,
	      pos,
	      selectable: props.selectable,
	      loadData: props.loadData,
	      onMouseEnter: props.onMouseEnter,
	      onMouseLeave: props.onMouseLeave,
	      onRightClick: props.onRightClick,
	      prefixCls: props.prefixCls,
	      showLine: props.showLine,
	      showIcon: props.showIcon,
	      checkable: props.checkable,
	      draggable: props.draggable,
	      dragOver: state.dragOverNodeKey === key && this.dropPosition === 0,
	      dragOverGapTop: state.dragOverNodeKey === key && this.dropPosition === -1,
	      dragOverGapBottom: state.dragOverNodeKey === key && this.dropPosition === 1,
	      expanded: state.expandedKeys.indexOf(key) !== -1,
	      selected: state.selectedKeys.indexOf(key) !== -1,
	      checked: this.checkedKeys.indexOf(key) !== -1,
	      checkPart: this.checkPartKeys.indexOf(key) !== -1,
	      openTransitionName: this.getOpenTransitionName(),
	      openAnimation: props.openAnimation,
	      filterTreeNode: this.filterTreeNode.bind(this),
	    };
	    if (this.treeNodesStates[pos]) {
	      assign(cloneProps, this.treeNodesStates[pos].siblingPosition);
	    }
	    return React.cloneElement(child, cloneProps);
	  }

	  render() {
	    const props = this.props;
	    const domProps = {
	      className: classNames(props.className, props.prefixCls),
	      role: 'tree-node',
	    };
	    if (props.focusable) {
	      domProps.tabIndex = '0';
	      domProps.onKeyDown = this.onKeyDown;
	    }
	    // console.log(this.state.expandedKeys, this._rawExpandedKeys, props.children);
	    const checkKeys = getTreeNodesStates(props.children, this.state.checkedKeys, true);
	    this.checkPartKeys = checkKeys.checkPartKeys;
	    this.checkedKeys = checkKeys.checkedKeys;
	    this.treeNodesStates = checkKeys.treeNodesStates;

	    return (
	      <ul {...domProps} unselectable ref="tree">
	        {React.Children.map(props.children, this.renderTreeNode, this)}
	      </ul>
	    );
	  }
	}

	Tree.propTypes = {
	  prefixCls: PropTypes.string,
	  children: PropTypes.any,
	  showLine: PropTypes.bool,
	  showIcon: PropTypes.bool,
	  selectable: PropTypes.bool,
	  multiple: PropTypes.bool,
	  checkable: PropTypes.oneOfType([
	    PropTypes.bool,
	    PropTypes.node,
	  ]),
	  draggable: PropTypes.bool,
	  autoExpandParent: PropTypes.bool,
	  defaultExpandAll: PropTypes.bool,
	  expandedKeys: PropTypes.arrayOf(PropTypes.string),
	  defaultExpandedKeys: PropTypes.arrayOf(PropTypes.string),
	  checkedKeys: PropTypes.arrayOf(PropTypes.string),
	  defaultCheckedKeys: PropTypes.arrayOf(PropTypes.string),
	  selectedKeys: PropTypes.arrayOf(PropTypes.string),
	  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
	  onExpand: PropTypes.func,
	  onCheck: PropTypes.func,
	  onSelect: PropTypes.func,
	  loadData: PropTypes.func,
	  onMouseEnter: PropTypes.func,
	  onMouseLeave: PropTypes.func,
	  onRightClick: PropTypes.func,
	  onDragStart: PropTypes.func,
	  onDragEnter: PropTypes.func,
	  onDragOver: PropTypes.func,
	  onDragLeave: PropTypes.func,
	  onDrop: PropTypes.func,
	  filterTreeNode: PropTypes.func,
	  openTransitionName: PropTypes.string,
	  openAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	};

	Tree.defaultProps = {
	  prefixCls: 'rc-tree',
	  showLine: false,
	  showIcon: true,
	  selectable: true,
	  multiple: false,
	  checkable: false,
	  draggable: false,
	  autoExpandParent: true,
	  defaultExpandAll: false,
	  defaultExpandedKeys: [],
	  defaultCheckedKeys: [],
	  defaultSelectedKeys: [],
	  onExpand: noop,
	  onCheck: noop,
	  onSelect: noop,
	  onDragStart: noop,
	  onDragEnter: noop,
	  onDragOver: noop,
	  onDragLeave: noop,
	  onDrop: noop,
	};


	const browserUa = browser(window.navigator.userAgent || '');
	const ieOrEdge = /.*(IE|Edge).+/.test(browserUa);
	// const uaArray = browserUa.split(' ');
	// const gtIE8 = uaArray.length !== 2 || uaArray[0].indexOf('IE') === -1 || Number(uaArray[1]) > 8;

	const defaultTitle = '---';

	class TreeNode extends React.Component {
	  constructor(props) {
	    super(props);
	    [
	      'onExpand',
	      'onCheck',
	      'onContextMenu',
	      'onMouseEnter',
	      'onMouseLeave',
	      'onDragStart',
	      'onDragEnter',
	      'onDragOver',
	      'onDragLeave',
	      'onDrop',
	    ].forEach((m)=> {
	      this[m] = this[m].bind(this);
	    });
	    this.state = {
	      dataLoading: false,
	      dragNodeHighlight: false,
	    };
	  }

	  onCheck() {
	    this.props.root.onCheck(this);
	  }

	  onSelect() {
	    this.props.root.onSelect(this);
	  }

	  onMouseEnter(e) {
	    e.preventDefault();
	    this.props.root.onMouseEnter(e, this);
	  }

	  onMouseLeave(e) {
	    e.preventDefault();
	    this.props.root.onMouseLeave(e, this);
	  }

	  onContextMenu(e) {
	    e.preventDefault();
	    this.props.root.onContextMenu(e, this);
	  }

	  onDragStart(e) {
	    // console.log('dragstart', this.props.eventKey, e);
	    // e.preventDefault();
	    e.stopPropagation();
	    this.setState({
	      dragNodeHighlight: true,
	    });
	    this.props.root.onDragStart(e, this);
	    try {
	      // ie throw error
	      e.dataTransfer.setData('text/plain', 'firefox-need-it');
	    } finally {
	      // empty
	    }
	  }

	  onDragEnter(e) {
	    // console.log('dragenter', this.props.eventKey, e);
	    e.preventDefault();
	    e.stopPropagation();
	    this.props.root.onDragEnter(e, this);
	  }

	  onDragOver(e) {
	    // console.log(this.props.eventKey, e);
	    // todo disabled
	    e.preventDefault();
	    e.stopPropagation();
	    this.props.root.onDragOver(e, this);
	    return false;
	  }

	  onDragLeave(e) {
	    // console.log(this.props.eventKey, e);
	    e.stopPropagation();
	    this.props.root.onDragLeave(e, this);
	  }

	  onDrop(e) {
	    e.preventDefault();
	    e.stopPropagation();
	    this.setState({
	      dragNodeHighlight: false,
	    });
	    this.props.root.onDrop(e, this);
	  }

	  onExpand() {
	    const callbackPromise = this.props.root.onExpand(this);
	    if (callbackPromise && typeof callbackPromise === 'object') {
	      const setLoading = (dataLoading) => {
	        this.setState({dataLoading});
	      };
	      setLoading(true);
	      callbackPromise.then(() => {
	        setLoading(false);
	      }, () => {
	        setLoading(false);
	      });
	    }
	  }

	  // keyboard event support
	  onKeyDown(e) {
	    e.preventDefault();
	  }

	  renderSwitcher(props, expandedState) {
	    const prefixCls = props.prefixCls;
	    const switcherCls = {
	      [`${prefixCls}-switcher`]: true,
	    };
	    if (!props.showLine) {
	      switcherCls[prefixCls + '-noline_' + expandedState] = true;
	    } else if (props.pos === '0-0') {
	      switcherCls[`${prefixCls}-roots_${expandedState}`] = true;
	    } else {
	      switcherCls[`${prefixCls}-center_${expandedState}`] = !props.last;
	      switcherCls[`${prefixCls}-bottom_${expandedState}`] = props.last;
	    }
	    if (props.disabled) {
	      switcherCls[`${prefixCls}-switcher-disabled`] = true;
	      return <span className={classNames(switcherCls)}></span>;
	    }
	    return <span className={classNames(switcherCls)} onClick={this.onExpand}></span>;
	  }

	  renderCheckbox(props) {
	    const prefixCls = props.prefixCls;
	    const checkboxCls = {
	      [`${prefixCls}-checkbox`]: true,
	    };
	    if (props.checkPart) {
	      checkboxCls[`${prefixCls}-checkbox-indeterminate`] = true;
	    } else if (props.checked) {
	      checkboxCls[`${prefixCls}-checkbox-checked`] = true;
	    }
	    let customEle = null;
	    if (typeof props.checkable !== 'boolean') {
	      customEle = props.checkable;
	    }
	    if (props.disabled || props.disableCheckbox) {
	      checkboxCls[`${prefixCls}-checkbox-disabled`] = true;
	      return <span ref="checkbox" className={classNames(checkboxCls)}>{customEle}</span>;
	    }
	    return (<span ref="checkbox" className={classNames(checkboxCls)} onClick={this.onCheck}>{customEle}</span>);
	  }

	  renderChildren(props) {
	    const renderFirst = this.renderFirst;
	    this.renderFirst = 1;
	    let transitionAppear = true;
	    if (!renderFirst && props.expanded) {
	      transitionAppear = false;
	    }
	    const children = props.children;
	    let newChildren = children;
	    let allTreeNode;
	    if (Array.isArray(children)) {
	      allTreeNode = children.every((item) => {
	        return item.type === TreeNode;
	      });
	    }
	    if (children && (children.type === TreeNode || allTreeNode)) {
	      const cls = {
	        [`${props.prefixCls}-child-tree`]: true,
	        [`${props.prefixCls}-child-tree-open`]: props.expanded,
	      };
	      if (props.showLine) {
	        cls[`${props.prefixCls}-line`] = !props.last;
	      }
	      const animProps = {};
	      if (props.openTransitionName) {
	        animProps.transitionName = props.openTransitionName;
	      } else if (typeof props.openAnimation === 'object') {
	        animProps.animation = assign({}, props.openAnimation);
	        if (!transitionAppear) {
	          delete animProps.animation.appear;
	        }
	      }
	      newChildren = (
	        <Animate {...animProps}
	          showProp="expanded"
	          transitionAppear={transitionAppear}
	          component="">
	          <ul className={classNames(cls)} expanded={props.expanded}>
	            {React.Children.map(children, (item, index) => {
	              return props.root.renderTreeNode(item, index, props.pos);
	            }, props.root)}
	          </ul>
	        </Animate>
	      );
	    }
	    return newChildren;
	  }

	  render() {
	    const props = this.props;
	    const prefixCls = props.prefixCls;
	    const expandedState = props.expanded ? 'open' : 'close';

	    const iconEleCls = {
	      [`${prefixCls}-iconEle`]: true,
	      [`${prefixCls}-icon_loading`]: this.state.dataLoading,
	      [`${prefixCls}-icon__${expandedState}`]: true,
	    };

	    let canRenderSwitcher = true;
	    const content = props.title;
	    let newChildren = this.renderChildren(props);
	    if (!newChildren || newChildren === props.children) {
	      // content = newChildren;
	      newChildren = null;
	      if (!props.loadData || props.isLeaf) {
	        canRenderSwitcher = false;
	      }
	    }

	    const selectHandle = () => {
	      const icon = (props.showIcon || props.loadData && this.state.dataLoading) ?
	        <span className={classNames(iconEleCls)}></span> : null;
	      const title = <span className={`${prefixCls}-title`}>{content}</span>;
	      const domProps = {};
	      if (!props.disabled) {
	        if (props.selected || this.state.dragNodeHighlight) {
	          domProps.className = `${prefixCls}-node-selected`;
	        }
	        domProps.onClick = (e) => {
	          e.preventDefault();
	          if (props.selectable) {
	            this.onSelect();
	          }
	          // not fire check event
	          // if (props.checkable) {
	          //   this.onCheck();
	          // }
	        };
	        if (props.onRightClick) {
	          domProps.onContextMenu = this.onContextMenu;
	        }
	        if (props.onMouseEnter) {
	          domProps.onMouseEnter = this.onMouseEnter;
	        }
	        if (props.onMouseLeave) {
	          domProps.onMouseLeave = this.onMouseLeave;
	        }
	        if (props.draggable) {
	          if (ieOrEdge) {
	            // ie bug!
	            domProps.href = '#';
	          }
	          domProps.draggable = true;
	          domProps['aria-grabbed'] = true;
	          domProps.onDragStart = this.onDragStart;
	        }
	      }
	      return (
	        <a ref="selectHandle" title={typeof content === 'string' ? content : ''} {...domProps}>
	          {icon}{title}
	        </a>
	      );
	    };

	    const liProps = {};
	    if (props.draggable) {
	      liProps.onDragEnter = this.onDragEnter;
	      liProps.onDragOver = this.onDragOver;
	      liProps.onDragLeave = this.onDragLeave;
	      liProps.onDrop = this.onDrop;
	    }

	    let disabledCls = '';
	    let dragOverCls = '';
	    if (props.disabled) {
	      disabledCls = `${prefixCls}-treenode-disabled`;
	    } else if (props.dragOver) {
	      dragOverCls = 'drag-over';
	    } else if (props.dragOverGapTop) {
	      dragOverCls = 'drag-over-gap-top';
	    } else if (props.dragOverGapBottom) {
	      dragOverCls = 'drag-over-gap-bottom';
	    }

	    const filterCls = props.filterTreeNode(this) ? 'filter-node' : '';

	    const noopSwitcher = () => {
	      const cls = {
	        [`${prefixCls}-switcher`]: true,
	        [`${prefixCls}-switcher-noop`]: true,
	      };
	      if (props.showLine) {
	        cls[`${prefixCls}-center_docu`] = !props.last;
	        cls[`${prefixCls}-bottom_docu`] = props.last;
	      } else {
	        cls[`${prefixCls}-noline_docu`] = true;
	      }
	      return <span className={classNames(cls)}></span>;
	    };

	    return (
	      <li {...liProps} ref="li" className={classNames(props.className, disabledCls, dragOverCls, filterCls)}>
	        {canRenderSwitcher ? this.renderSwitcher(props, expandedState) : noopSwitcher()}
	        {props.checkable ? this.renderCheckbox(props) : null}
	        {selectHandle()}
	        {newChildren}
	      </li>
	    );
	  }
	}

	TreeNode.isTreeNode = 1;

	TreeNode.propTypes = {
	  prefixCls: PropTypes.string,
	  disabled: PropTypes.bool,
	  disableCheckbox: PropTypes.bool,
	  expanded: PropTypes.bool,
	  isLeaf: PropTypes.bool,
	  root: PropTypes.object,
	  onSelect: PropTypes.func,
	};

	TreeNode.defaultProps = {
	  title: defaultTitle,
	};
	
	 
	Tree.TreeNode = TreeNode;
	RC.TreeNode = TreeNode;
	RC.Tree = Tree;

}(Smart.RC)
