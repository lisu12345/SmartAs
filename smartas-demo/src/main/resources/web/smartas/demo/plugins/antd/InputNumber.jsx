/*[[
  <style>
  .component-demos {
    margin: 2em 0 1em;
    color: #404040;
    font-weight: 500;
    font-size: 24px;
  }
  </style>
]]*/
install("web.demo.plugins.antd.InputNumber",function($S){
	var pkg = this,U = Smart.UI;
	
	const {InputNumber, Button} = U; 
	
	const Test = React.createClass({
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
		  render() {
		    return (
		      <div>
		        <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3} />
		        <div style={{ marginTop: 20 }}>
		          <Button onClick={this.toggle} type="primary">Toggle disabled</Button>
		        </div>
		      </div>
		    );
		  }
		});
	
	function onChange(checkedValues) {
		  console.log('checked = ', checkedValues);
		}
	
	var Node = React.createClass({
		  getInitialState() {
		    return {
		      disabled: true
		    };
		  },
		  toggleDisabled() {
		    this.setState({
		      disabled: !this.state.disabled
		    });
		  },
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				return <div>
						<h4 className="component-demos">
						  代码演示
						</h4>
	  					 <Test/>
	  					 <br/>
	  					<div className="code-box-meta markdown">
	  					<p>三种大小的数字输入框，当 size 分别为 <code>large</code> 和 <code>small</code> 时，输入框高度为 <code>32px</code> 和 <code>22px</code> ，默认高度为 <code>28px</code></p>
	  					</div>
	  					<InputNumber size="large" min={1} max={100000} defaultValue={3} onChange={onChange} />
	  					<InputNumber min={1} max={100000} defaultValue={3} onChange={onChange} />
	  					<InputNumber size="small" min={1} max={100000} defaultValue={3} onChange={onChange} />
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
