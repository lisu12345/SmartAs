/*[[
 
]]*/
install("web.demo.plugins.antd.tree",function($S){
	var pkg = this,UI = Smart.UI;
	const { TreeSelect , Button } = UI,
		{TreeNode} = TreeSelect;

		const Demo1 = React.createClass({
		  getInitialState() {
		    return {
		      value: '',
		    };
		  },
		  onChange(value) {
		    console.log(arguments);
		    this.setState({ value });
		  },
		  render() {
		    return (
		      <TreeSelect style={{ width: 360 }}
		        value={this.state.value}
		        dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
		        placeholder="请选择"
		        treeDefaultExpandAll
		        onChange={this.onChange}>
		        <TreeNode value="parent 1" title="parent 1" key="0-1">
		          <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
		            <TreeNode value="leaf1" title="my leaf" key="random" />
		            <TreeNode value="leaf2" title="your leaf" key="random1" />
		          </TreeNode>
		          <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
		            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
		          </TreeNode>
		        </TreeNode>
		      </TreeSelect>
		    );
		  },
		});

		const treeData = [{
		  'label': '节点一',
		  'value': '0-0',
		  'key': '0-0',
		  'children': [{
		    'label': '子节点一',
		    'value': '0-0-1',
		    'key': '0-0-1',
		  }, {
		    'label': '子节点二',
		    'value': '0-0-2',
		    'key': '0-0-2',
		  }],
		}, {
		  'label': '节点二',
		  'value': '0-1',
		  'key': '0-1',
		}];

		const Demo2 = React.createClass({
		  getInitialState() {
		    return {
		      value: '',
		    };
		  },
		  onChange(value) {
		    console.log(arguments);
		    this.setState({ value });
		  },
		  render() {
		    return (
		      <TreeSelect style={{ width: 360 }}
		        value={this.state.value}
		        dropdownMenuStyle={{ maxHeight: 400, overflow: 'auto' }}
		        treeData={treeData}
		        placeholder="请选择"
		        treeDefaultExpandAll
		        onChange={this.onChange} />
		    );
		  },
		});
			
		const Demo3 = React.createClass({
		  getInitialState() {
		    return {
		      value: ['0-0-1'],
		    };
		  },
		  onChange(value) {
		    console.log('onChange ', value, arguments);
		    this.setState({ value });
		  },
		  render() {
		    const tProps = {
		      treeData,
		      value: this.state.value,
		      onChange: this.onChange,
		      multiple: true,
		      treeCheckable: true,
		      treeDefaultExpandAll: true,
		      style: {
		        width: 360,
		      },
		    };
		    return <TreeSelect {...tProps} />;
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
					    	<p>1.最简单的用法。</p>
					    </div>
					    <Demo1 />
					    
					    <br/> <br/>
					    <div className="code-box-meta markdown">
				    	<p>2.使用 treeData 把 JSON 数据直接生成树结构。</p>
					    </div>
					    <Demo2 />
					    
					    <br/> <br/>
					    <div className="code-box-meta markdown">
					    <p>3.多选和勾选框功能。</p>
					    </div>
					    <Demo3 />
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
