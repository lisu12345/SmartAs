/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const Progress = U.Progress;
	const ProgressLine = Progress.Line;
	const ProgressCircle = Progress.Circle;
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
					    
					    <ProgressLine percent={30} />
					    <ProgressLine percent={50} status="active" />
					    <ProgressLine percent={70} status="exception" />
					    <ProgressLine percent={100} />
					    <ProgressLine percent={50} showInfo={false} />
					    
					    <ProgressCircle percent={75} />
					    <ProgressCircle percent={70} status="exception" />
					    <ProgressCircle percent={100} />
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
