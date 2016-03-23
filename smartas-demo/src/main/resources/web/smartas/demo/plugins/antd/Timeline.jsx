/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Timeline,Button,notification} = U;
	
	
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
				return <div>
						<div className="code-box-meta markdown">
						<p>在最后位置添加一个幽灵节点，表示时间轴未完成，还在记录过程中。可以指定 <code>pending={'{true}'}</code> 或者 <code>pending={'{一个 React 元素}'}</code>。</p>
					    </div>
					    <Timeline pending={<a href="#">查看更多</a>}>
						  <Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
						  <Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
						  <Timeline.Item>技术测试异常 2015-09-01</Timeline.Item>
						</Timeline>
					    <br/><br/>
					    
					    <div className="code-box-meta markdown">
					    <p>圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态。</p>
				    	</div>
				    	
				    	<Timeline>
				    	  <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
				    	  <Timeline.Item color="green">创建服务现场 2015-09-01</Timeline.Item>
				    	  <Timeline.Item color="red">
				    	    <p>初步排除网络异常1</p>
				    	    <p>初步排除网络异常2</p>
				    	    <p>初步排除网络异常3 2015-09-01</p>
				    	  </Timeline.Item>
				    	  <Timeline.Item>
				    	    <p>技术测试异常1</p>
				    	    <p>技术测试异常2</p>
				    	    <p>技术测试异常3 2015-09-01</p>
				    	  </Timeline.Item>
				    	</Timeline>
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
