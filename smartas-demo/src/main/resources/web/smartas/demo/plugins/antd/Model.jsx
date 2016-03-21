/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const Switch = U.Switch;
	const Select = U.Select;
	const Icon = U.Icon;
	const Button=U.Button;
	const Modal=U.Modal;
	const Option = Select.Option;
	
	
	const confirm = Modal.confirm;

	function showConfirm() {
	  confirm({
	    title: '您是否确认要删除这项内容',
	    content: '点确认 1 秒后关闭',
	    onOk() {
	      return new Promise((resolve) => {
	        setTimeout(resolve, 1000);
	      });
	    },
	    onCancel() {}
	  });
	}
	
	function onChange(checkedValues) {
		  console.log('checked = ', checkedValues);
		}
	function handleChange(value) {
		  console.log('selected ' + value);
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
					    <Button onClick={showConfirm}>
					    	确认对话框
					    </Button>
					    
					    <br/>
					    <div className="code-box-meta markdown">
					    <p>三种大小的选择框，当 size 分别为 <code>large</code> 和 <code>small</code> 时，输入框高度为 <code>32px</code> 和 <code>22px</code> ，默认高度为 <code>28px</code></p>
					    </div>
					    
					    
					    <Select size="large" defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
					      <Option value="jack">Jack</Option>
					      <Option value="lucy">Lucy</Option>
					      <Option value="disabled" disabled>Disabled</Option>
					      <Option value="yiminghe">yiminghe</Option>
					    </Select>
					    <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
					      <Option value="jack">Jack</Option>
					      <Option value="lucy">Lucy</Option>
					      <Option value="disabled" disabled>Disabled</Option>
					      <Option value="yiminghe">yiminghe</Option>
					    </Select>
					    <Select size="small" defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
					      <Option value="jack">Jack</Option>
					      <Option value="lucy">Lucy</Option>
					      <Option value="disabled" disabled>Disabled</Option>
					      <Option value="yiminghe">yiminghe</Option>
					    </Select>
					    
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
