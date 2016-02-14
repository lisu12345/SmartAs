/*[[
 
]]*/
install("web.demo.plugins.antd.Switch",function($S){
	var pkg = this,U = Smart.UI;
	const Switch = U.Switch,Icon = U.Icon,Button=U.Button;
	function onChange(checkedValues) {
		  console.log('checked = ', checkedValues);
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
					    	<p>带有文字和图标。</p>
					    </div>
						<Switch checkedChildren="开" unCheckedChildren="关" />
							<span> </span>
						<Switch checkedChildren={<Icon type="check"></Icon>} unCheckedChildren={<Icon type="cross"></Icon>}></Switch>
						
						<br /><br />
						<div className="code-box-meta markdown">
				    		<p>Switch 失效状态。</p>
				    	</div>
						<Switch disabled={this.state.disabled} />
				        <br /><br />
				        <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
				        
				        <br /><br />
				        <div className="code-box-meta markdown">
				        	<p><code>size="small"</code> 表示小号开关。</p>
				    	</div>
				        <Switch />
				        &nbsp;
				        <Switch size="small" />
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
