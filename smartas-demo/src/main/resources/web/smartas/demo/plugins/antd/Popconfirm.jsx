/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,UI = Smart.UI;
	const {Popconfirm,message} = UI;
	function confirm() {
	  message.success('点击了确定');
	}

	function cancel() {
	  message.error('点击了取消');
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
					    <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
					    <a href="#">删除</a>
					  </Popconfirm>
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
