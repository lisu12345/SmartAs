/*[[
 
]]*/
install("web.demo.plugins.antd.tree",function($S){
	var pkg = this,UI = Smart.UI;
	const { TimePicker  , Button } = UI;

	function onChange(time) {
	  console.log(time);
	}
	
	
	function newArray(start, end) {
	  let result = [];
	  for (let i = start; i < end; i++) {
	    result.push(i);
	  }
	  return result;
	}

	function disabledMinutes() {
	  return newArray(0, 60).filter(value => value % 10 !== 0);
	}

	function disabledSeconds() {
	  return newArray(0, 60).filter(value => value % 30 !== 0);
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
					    	<p>1.最简单的用法。</p>
					    </div>
					    
					    <TimePicker onChange={onChange} />
					    
					    <div className="code-box-meta markdown">
				    	<p>2.不展示秒，也不允许选择。</p>
					    </div>
					    <TimePicker defaultValue="12:08:23" format="HH:mm" />
					    
					    <div className="code-box-meta markdown">
					    	<p>3.通过 hideDisabledOptions 将不可选的选项隐藏。</p>
					    </div>
					    <TimePicker disabledMinutes={disabledMinutes} disabledSeconds={disabledSeconds} hideDisabledOptions />
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
