/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,UI = Smart.UI;
	const { Popover, Button } = UI;

	const content = (
	  <div>
	    <p>内容</p>
	    <p>内容</p>
	  </div>
	);
	
	
	const App = React.createClass({
		  getInitialState() {
		    return {
		      visible: false
		    };
		  },
		  hide() {
		    this.setState({
		      visible: false
		    });
		  },
		  handleVisibleChange(visible) {
		    this.setState({ visible });
		  },
		  render() {
		    const content = (
		      <div>
		        <a onClick={this.hide}>关闭卡片</a>
		      </div>
		    );
		    return (
		      <Popover overlay={content} title="标题" trigger="click"
		        visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
		        <Button type="primary">点击弹出卡片</Button>
		      </Popover>
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
					    	<p>鼠标移入、聚集、点击。</p>
					    </div>
					    <Popover overlay={content} title="标题" trigger="hover">
					      <Button>移入</Button>
					    </Popover>
					    <Popover overlay={content} title="标题" trigger="focus">
					      <Button>聚焦</Button>
					    </Popover>
					    <Popover overlay={content} title="标题" trigger="click">
					      <Button>点击</Button>
					    </Popover>
					    <br/><br/>
					    <div className="code-box-meta markdown">
				    		<p>使用 visible 属性控制浮层显示</p>
				    	</div>
					    <App/>
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
