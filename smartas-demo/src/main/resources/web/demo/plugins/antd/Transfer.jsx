/*[[
 
]]*/
install("web.demo.plugins.antd.Transfer",function($S){
	var pkg = this,U = Smart.UI;
	const {Transfer,Button} = U;

	const App1 = React.createClass({
	  getInitialState() {
	    return {
	      mockData: [],
	      targetKeys: [],
	    };
	  },
	  componentDidMount() {
	    this.getMock();
	  },
	  getMock() {
	    let targetKeys = [];
	    let mockData = [];
	    for (let i = 0; i < 20; i++) {
	      const data = {
	        key: i,
	        title: '内容' + (i + 1),
	        description: '内容' + (i + 1) + '的描述',
	        chosen: Math.random() * 2 > 1
	      };
	      if (data.chosen) {
	        targetKeys.push(data.key);
	      }
	      mockData.push(data);
	    }
	    this.setState({ mockData, targetKeys });
	  },
	  handleChange(targetKeys, direction, moveKeys) {
	    console.log(targetKeys, direction, moveKeys);
	    this.setState({ targetKeys });
	  },
	  renderFooter() {
	    return (
	      <Button type="primary" size="small" style={{ float: 'right', margin: '5' }}
	        onClick={this.getMock}>
	        刷新
	      </Button>
	    );
	  },
	  render() {
	    return (
	      <Transfer
	        dataSource={this.state.mockData}
	        targetKeys={this.state.targetKeys}
	        onChange={this.handleChange}
	        render={item => item.title} />
	    );
	  }
	});
	
	
	const App2 = React.createClass({
	  getInitialState() {
	    return {
	      mockData: [],
	      targetKeys: [],
	    };
	  },
	  componentDidMount() {
	    this.getMock();
	  },
	  getMock() {
	    let targetKeys = [];
	    let mockData = [];
	    for (let i = 0; i < 20; i++) {
	      const data = {
	        key: i,
	        title: '内容' + (i + 1),
	        description: '内容' + (i + 1) + '的描述',
	        chosen: Math.random() * 2 > 1
	      };
	      if (data.chosen) {
	        targetKeys.push(data.key);
	      }
	      mockData.push(data);
	    }
	    this.setState({ mockData, targetKeys });
	  },
	  handleChange(targetKeys) {
	    this.setState({ targetKeys });
	  },
	  render() {
	    return (
	      <Transfer
	        dataSource={this.state.mockData}
	        showSearch
	        targetKeys={this.state.targetKeys}
	        onChange={this.handleChange}
	        render={item => item.title} />
	    );
	  }
	});
	
	const App3 = React.createClass({
	  getInitialState() {
	    return {
	      mockData: [],
	      targetKeys: [],
	    };
	  },
	  componentDidMount() {
	    this.getMock();
	  },
	  getMock() {
	    let targetKeys = [];
	    let mockData = [];
	    for (let i = 0; i < 20; i++) {
	      const data = {
	        key: i,
	        title: '内容' + (i + 1),
	        description: '内容' + (i + 1) + '的描述',
	        chosen: Math.random() * 2 > 1
	      };
	      if (data.chosen) {
	        targetKeys.push(data.key);
	      }
	      mockData.push(data);
	    }
	    this.setState({ mockData, targetKeys });
	  },
	  handleChange(targetKeys) {
	    this.setState({ targetKeys });
	  },
	  renderFooter() {
	    return (
	      <Button type="ghost" size="small" style={{ float: 'right', margin: '5' }}
	        onClick={this.getMock}>
	        刷新
	      </Button>
	    );
	  },
	  render() {
	    return (
	      <Transfer
	        dataSource={this.state.mockData}
	        showSearch
	        listStyle={{
	          width: 250,
	          height: 300,
	        }}
	        operations={['向右操作文案', '向左操作文案']}
	        targetKeys={this.state.targetKeys}
	        onChange={this.handleChange}
	        render={item => item.title + '-' + item.description}
	        footer={this.renderFooter} />
	    );
	  }
	});

	var Node = React.createClass({
		render: function() {
			return <div className="code-boxs">
					<div className="code-boxes-col-2-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>1.最基本的用法。</p>
						    </div>
						    <div  className="code-box-body">
						    	<App1 />
						    </div>
					    </div>
					</div>
					
					<div className="code-boxes-col-2-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>2.带搜索框的穿梭框。</p>
						    </div>
						    <div  className="code-box-body">
						    	<App2 />
						    </div>
					    </div>
					</div>
					
					<div className="code-boxes-col-1-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>3.穿梭框高级用法，可配置操作文案，可定制宽高，可对底部进行自定义渲染。</p>
						    </div>
						    <div  className="code-box-body">
						    	<App3 />
						    </div>
					    </div>
				    </div>
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
