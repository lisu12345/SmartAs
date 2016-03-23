/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Tabs} = U,{TabPane} = Tabs;
	function callback(key) {
		 console.log(key);
	}
	
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
					    	<p>基本使用。</p>
					    </div>
					    <Tabs defaultActiveKey="1" onChange={callback}>
						    <TabPane tab="选项卡一" key="1">选项卡一内容</TabPane>
						    <TabPane tab="选项卡二" key="2">选项卡二内容</TabPane>
						    <TabPane tab="选项卡三" key="3">选项卡三内容</TabPane>
						</Tabs>
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
