/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,UI = Smart.UI;
	const { Spin, Switch, Alert } = UI;
	
	
	const Card = React.createClass({
		  getInitialState() {
		    return {
		      loading: false
		    };
		  },
		  toggle(value) {
		    this.setState({
		      loading: value
		    });
		  },
		  render() {
		    const container = (
		      <Alert message="消息提示的文案"
		        description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
		        type="info" />
		    );
		    return (
		      <div>
		        <Spin spining={this.state.loading}>{container}</Spin>
		        切换加载状态：<Switch checked={this.state.loading} onChange={this.toggle} />
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
					    	<p>基本使用。</p>
					    </div>
					    <Card />
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
