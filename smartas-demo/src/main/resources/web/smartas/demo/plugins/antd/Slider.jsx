/*[[
 
]]*/
install("web.demo.plugins.antd.slider",function($S){
	var pkg = this,UI = Smart.UI;
	const { Slider ,InputNumber, Button } = UI;

	const IntegerStep = React.createClass({
	  getInitialState() {
	    return {
	      inputValue: 1
	    };
	  },
	  onChange(value) {
	    this.setState({
	      inputValue: value
	    });
	  },
	  render() {
	    return (
	      <div className="row">
	        <div className="col-12">
	          <Slider min={1} max={20} onChange={this.onChange} value={this.state.inputValue} />
	        </div>
	        <div className="col-4">
	          <InputNumber min={1} max={20} style={{ marginLeft: '16px' }}
	            value={this.state.inputValue} onChange={this.onChange} />
	        </div>
	      </div>
	    );
	  }
	});

	const DecimalStep = React.createClass({
	  getInitialState() {
	    return {
	      inputValue: 0
	    };
	  },
	  onChange(value) {
	    this.setState({
	      inputValue: value
	    });
	  },
	  render() {
	    return (
	      <div className="row">
	        <div className="col-12">
	          <Slider min={0} max={1} onChange={this.onChange} value={this.state.inputValue} step={0.01} />
	        </div>
	        <div className="col-4">
	          <InputNumber min={0} max={1} style={{ marginLeft: '16px' }} step={0.01}
	            value={this.state.inputValue} onChange={this.onChange} />
	        </div>
	      </div>
	    );
	  }
	});

	const marks = {
	  0: '0°C',
	  26: '26°C',
	  37: '37°C',
	  100: '100°C'
	};
	
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
					    	<p>1.基本滑动条。当 range 为 true 时，渲染为双滑块。当 disabled 为 true 时，滑块处于不可用状态。</p>
					    </div>
					    
					    <div>
					    	<Slider defaultValue={30} />
					    	<Slider range defaultValue={[20, 50]} />
					    	<Slider range defaultValue={[20, 50]} disabled />
					    </div>
					    
					    <div className="code-box-meta markdown">
				    	<p>2.和 <a href="#!web/demo/plugins/antd/InputNumber.jsx">数字输入框</a> 组件保持同步。</p>
					    </div>
					    
					    <div>
					    	<IntegerStep />
					    	<DecimalStep />
					    </div>
					    
					    
					    <div className="code-box-meta markdown">
					    	<p>3.使用 marks 属性标注分段式滑块，使用 value / defaultValue 指定滑块位置。当 included=false 时，
					    	表明不同标记间为并列关系。当 step=null 时，Slider 的可选值仅有 marks 标出来的部分。</p>
					    </div>
					    <div>
						    <p>包含关系</p>
						    <Slider marks={marks} defaultValue={37} /><br/>
						    <Slider range marks={marks} defaultValue={[26, 37]} /><br/><br/>
						    <p>并列关系</p>
						    <Slider marks={marks} included={false} defaultValue={37} /><br/><br/>
						    <p>结合 step</p>
						    <Slider marks={marks} step={10} defaultValue={37} /><br/>
						    <p>`step=null`</p>
						    <Slider marks={marks} step={null} defaultValue={37} /><br/>
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
