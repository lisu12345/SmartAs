/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Pagination,Table, Icon,Button} = U;
	
	
	const columns = [{
	  title: '姓名',
	  dataIndex: 'name',
	  key: 'name',
	  render: function (text) {
	    return <a href="#">{text}</a>;
	  }
	}, {
	  title: '年龄',
	  dataIndex: 'age',
	  key: 'age',
	}, {
	  title: '住址',
	  dataIndex: 'address',
	  key: 'address',
	}, {
	  title: '操作',
	  key: 'operation',
	  render: function (text, record) {
	    return (
	      <span>
	        <a href="#">操作一{record.name}</a>
	        <span className="ant-divider"></span>
	        <a href="#">操作二</a>
	        <span className="ant-divider"></span>
	        <a href="#" className="ant-dropdown-link">
	          更多 <Icon type="down" />
	        </a>
	      </span>
	    );
	  }
	}];
	const data = [{
	  key: 'a1',
	  name: '胡彦斌',
	  age: 32,
	  address: '西湖区湖底公园1号'
	}, {
	  key: 'a2',
	  name: '胡彦祖',
	  age: 42,
	  address: '西湖区湖底公园1号'
	}, {
	  key: 'a3',
	  name: '李大嘴',
	  age: 32,
	  address: '西湖区湖底公园1号'
	}];
	
	
	// 通过 rowSelection 对象表明需要行选择
	const rowSelection = {
	  onChange(selectedRowKeys) {
	    console.log('selectedRowKeys changed: ' + selectedRowKeys);
	  },
	  onSelect: function (record, selected, selectedRows) {
	    console.log(record, selected, selectedRows);
	  },
	  onSelectAll: function (selected, selectedRows) {
	    console.log(selected, selectedRows);
	  }
	};
	
	
	
	
	const columnsApp = [{
		  title: '姓名',
		  dataIndex: 'name',
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		}, {
		  title: '住址',
		  dataIndex: 'address',
		}];

		const dataApp = [];
		for (let i = 0; i < 46; i++) {
		  data.push({
		    key: i,
		    name: '李大嘴' + i,
		    age: 32,
		    address: '西湖区湖底公园' + i + '号'
		  });
		}

		const App = React.createClass({
		  getInitialState() {
		    return {
		      selectedRowKeys: [],
		      loading: false,
		    };
		  },
		  start() {
		    this.setState({ loading: true });
		    // 模拟 ajax 请求，完成后清空
		    setTimeout(() => {
		      this.setState({
		        selectedRowKeys: [],
		        loading: false,
		      });
		    }, 1000);
		  },
		  onSelectChange(selectedRowKeys) {
		    console.log('selectedRowKeys changed: ', selectedRowKeys);
		    this.setState({ selectedRowKeys });
		  },
		  render() {
		    const { loading, selectedRowKeys } = this.state;
		    const rowSelection = {
		      selectedRowKeys,
		      onChange: this.onSelectChange,
		    };
		    const hasSelected = selectedRowKeys.length > 0;
		    return (
		      <div>
		        <div style={{ marginBottom: 16 }}>
		           <Button type="primary" onClick={this.start}
		             disabled={!hasSelected} loading={loading}>操作</Button>
		           <span style={{ marginLeft: 8 }}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
		        </div>
		        <Table rowSelection={rowSelection} columns={columns} dataSource={dataApp} />
		      </div>
		    );
		  }
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
					    	<p>基本分页使用。</p>
					    </div>
					    <Pagination defaultCurrent={1} total={50} />
					    <br/><br/>
					    
					    <div className="code-box-meta markdown">
				    		<p>更多分页。</p>
					    </div>
					    <Pagination defaultCurrent={1} total={500} />
					    <br/><br/>
					    
					    <div className="code-box-meta markdown">
				    		<p>简单的表格，最后一列是各种操作。</p>
					    </div>
					    <Table columns={columns} dataSource={data} />
					    <br/><br/>
					    
					    <div className="code-box-meta markdown">
				    		<p>第一列是联动的选择框。</p>
					    </div>
					    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
					    <br/><br/>
					    <div className="code-box-meta markdown">
					    <p>第一列是联动的选择框。</p>
					    </div>
					    <App />
					    <br/><br/>
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
