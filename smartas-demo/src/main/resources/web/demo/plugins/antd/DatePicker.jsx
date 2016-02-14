/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Cascader,Button,DatePicker} = U;

		function onChange(value) {
		  console.log(value);
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
				return <div>
						<div className="code-box-meta markdown">
						<p>最简单的用法。</p>
					    </div>
					    <DatePicker onChange={onChange} />
					    <br/><br/>
					    
					    <div className="code-box-meta markdown">
						<p>使用 format 属性，可以自定义你需要的日期显示格式，如 yyyy/MM/dd。</p>
					    </div>
					    <DatePicker defaultValue="2015/01/01" format="yyyy/MM/dd" />
					    <br/><br/>
					   
					    <div className="code-box-meta markdown">
						<p>增加选择时间功能。</p>
					    </div>
					    <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" onChange={onChange} style={{ width: 160 }} />
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
