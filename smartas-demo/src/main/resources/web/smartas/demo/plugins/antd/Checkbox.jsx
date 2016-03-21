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
install("web.demo.plugins.antd.Checkbox",function($S){
	var pkg = this,U = Smart.UI;
	
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
						<h2 className="component-demos">
						  代码演示
						</h2>
	  						<U.Checkbox>Checkbox</U.Checkbox>
	  						<U.Checkbox.Group options={['Apple', 'Pear', 'Orange']} defaultValue={['Apple']} onChange={onChange}></U.Checkbox.Group>
	  						<div>
		  				        <U.Checkbox defaultChecked={false} disabled={this.state.disabled}>不可用</U.Checkbox>
		  				        <br />
		  				        <U.Checkbox defaultChecked disabled={this.state.disabled}>不可用</U.Checkbox>
		  				        <div style={{ marginTop: 20 }}>
		  				          <U.Button type="primary" onClick={this.toggleDisabled}>
		  				            Toggle disabled
		  				          </U.Button>
		  				        </div>
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
