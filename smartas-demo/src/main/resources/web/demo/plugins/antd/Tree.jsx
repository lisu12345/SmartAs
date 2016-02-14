/*[[
 
]]*/
install("web.demo.plugins.antd.tree",function($S){
	var pkg = this,UI = Smart.UI;
	const { Tree ,TreeNode, Button } = UI;

	const Demo1 = React.createClass({
		  getDefaultProps() {
		    return {
		      keys: ['0-0-0', '0-0-1'],
		    };
		  },
		  getInitialState() {
		    const keys = this.props.keys;
		    return {
		      defaultExpandedKeys: keys,
		      defaultSelectedKeys: keys,
		      defaultCheckedKeys: keys,
		    };
		  },
		  onExpand(treeNode, expand, expandedKeys) {
		    console.log('onExpand', expand, expandedKeys);
		  },
		  onSelect(info) {
		    console.log('selected', info);
		  },
		  onCheck(info) {
		    console.log('onCheck', info);
		  },
		  render() {
		    return (
		      <Tree className="myCls" showLine multiple checkable
		        defaultExpandedKeys={this.state.defaultExpandedKeys}
		        onExpand={this.onExpand}
		        defaultSelectedKeys={this.state.defaultSelectedKeys}
		        defaultCheckedKeys={this.state.defaultCheckedKeys}
		        onSelect={this.onSelect} onCheck={this.onCheck}>
		        <TreeNode title="parent 1" key="0-0">
		          <TreeNode title="parent 1-0" key="0-0-0" disabled>
		            <TreeNode title="leaf" key="0-0-0-0" disableCheckbox />
		            <TreeNode title="leaf" key="0-0-0-1" />
		          </TreeNode>
		          <TreeNode title="parent 1-1" key="0-0-1">
		            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
		          </TreeNode>
		        </TreeNode>
		      </Tree>
		    );
		  },
		});
	
	
	
	
	const x = 3;
	const y = 2;
	const z = 1;
	const gData = [];

	const generateData = (_level, _preKey, _tns) => {
	  const preKey = _preKey || '0';
	  const tns = _tns || gData;

	  const children = [];
	  for (let i = 0; i < x; i++) {
	    const key = `${preKey}-${i}`;
	    tns.push({ title: key, key: key });
	    if (i < y) {
	      children.push(key);
	    }
	  }
	  if (_level < 0) {
	    return tns;
	  }
	  const __level = _level - 1;
	  children.forEach((key, index) => {
	    tns[index].children = [];
	    return generateData(__level, key, tns[index].children);
	  });
	};
	generateData(z);

	function loopData(data, callback) {
	  const loop = (d, level = 0) => {
	    d.forEach((item, index) => {
	      const pos = `${level}-${index}`;
	      if (item.children) {
	        loop(item.children, pos);
	      }
	      callback(item, index, pos);
	    });
	  };
	  loop(data);
	}

	function getFilterExpandedKeys(data, expandedKeys) {
	  const expandedPosArr = [];
	  loopData(data, (item, index, pos) => {
	    if (expandedKeys.indexOf(item.key) > -1) {
	      expandedPosArr.push(pos);
	    }
	  });
	  const filterExpandedKeys = [];
	  loopData(data, (item, index, pos) => {
	    expandedPosArr.forEach(p => {
	      if ((pos.split('-').length < p.split('-').length
	        && p.indexOf(pos) === 0 || pos === p)
	        && filterExpandedKeys.indexOf(item.key) === -1) {
	        filterExpandedKeys.push(item.key);
	      }
	    });
	  });
	  return filterExpandedKeys;
	}

	const Demo2 = React.createClass({
	  getDefaultProps() {
	    return {
	      multiple: true,
	    };
	  },
	  getInitialState() {
	    return {
	      expandedKeys: getFilterExpandedKeys(gData, ['0-0-0', '0-0-1']),
	      checkedKeys: ['0-0-0'],
	      selectedKeys: [],
	    };
	  },
	  onExpand(treeNode, expand, expandedKeys) {
	    console.log('onExpand', expand, expandedKeys);
	    const index = expandedKeys.indexOf(treeNode.props.eventKey);
	    if (expand) {
	      if (index > -1) {
	        expandedKeys.splice(index, 1);
	      }
	    } else {
	      if (index === -1) {
	        expandedKeys.push(treeNode.props.eventKey);
	      }
	    }
	    this.setState({ expandedKeys });
	  },
	  onCheck(checkedKeys) {
	    this.setState({
	      checkedKeys,
	      selectedKeys: ['0-3', '0-4'],
	    });
	  },
	  onSelect(selectedKeys, info) {
	    console.log('onSelect', info);
	    this.setState({ selectedKeys });
	  },
	  render() {
	    const loop = data => data.map((item) => {
	      if (item.children) {
	        return (
	          <TreeNode key={item.key} title={item.key} disableCheckbox={item.key === '0-0-0'}>
	            {loop(item.children)}
	          </TreeNode>
	        );
	      }
	      return <TreeNode key={item.key} title={item.key}/>;
	    });
	    return (
	      <Tree checkable multiple={this.props.multiple} defaultExpandAll
	        onExpand={this.onExpand} expandedKeys={this.state.expandedKeys}
	        onCheck={this.onCheck} checkedKeys={this.state.checkedKeys}
	        onSelect={this.onSelect} selectedKeys={this.state.selectedKeys}>
	        {loop(gData)}
	      </Tree>
	    );
	  },
	});
	
	var Node = React.createClass({
		  getInitialState() {
		    return {
		      disabled: true
		    };
		  },
		  toggle() {
			    this.setState({
			      disabled: !this.state.disabled
			    });
			  },
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				return <div>
						<div className="code-box-meta markdown">
					    	<p>1.最简单的用法，展示可勾选，可选中，禁用，默认展开等功能。</p>
					    </div>
					    
					    <Demo1 />
					    
					    <div className="code-box-meta markdown">
				    	<p>2.受控操作示例。</p>
					    </div>
					    <Demo2 />
					    
  					</div>
			}
		}
	);
	
	// 组件内部状态改变触发器
	//API
	this.actions = {
	   	add : function(name){
			return {type:'DATE_CLICK',name:name}
		},
		asyn : function(url){
			return function(dispatch){ };
		}
	};
	// API
	this.ready = function(connect){
		//return connect(this.actions)(Node);
		return Node;
	};
   	// API
   	this.reducers = function(){
   		return {
   			DATE_CLICK : function(data,action){
   				return data.set('test',Date.now());
   			}
   		}
   	};
});
