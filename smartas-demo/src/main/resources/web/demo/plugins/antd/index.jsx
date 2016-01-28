/*[[
 
]]*/
install("web.demo.plugins.antd",function($S){
	var logger = Log.getLogger('web.demo.plugins.antd'),pkg = this,U = Smart.UI;
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
						<U.Badge count={5}>
				  			<a href="#" className="head-example"></a>
					  	</U.Badge>
					  	<br/><br/>
					  	<U.Breadcrumb>
						    <U.Breadcrumb.Item>首页</U.Breadcrumb.Item>
						    <U.Breadcrumb.Item href="">应用中心</U.Breadcrumb.Item>
						    <U.Breadcrumb.Item href="">应用列表</U.Breadcrumb.Item>
						    <U.Breadcrumb.Item>某应用</U.Breadcrumb.Item>
					    </U.Breadcrumb>
						<div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px'}}>
							<U.Affix offset={75}>
						    	<U.Button type="primary">固定在距离顶部 75px 的位置</U.Button>
						    </U.Affix>
	  						<U.Alert message="成功提示的文案" type="success" showIcon={true} closable={true}></U.Alert>
	  						<U.Alert message="成功提示的文案" type="info" closeText="OK"></U.Alert>
	  						<U.Alert message="成功提示的文案" type="warn"></U.Alert>
	  						<U.Alert message="成功提示的文案" type="error"></U.Alert>
	  						<br/>
	  						<U.Radio>Radio</U.Radio>
	  						
	  						<div>
		  				        <U.Radio defaultChecked={false} disabled={this.state.disabled}>不可用</U.Radio>
		  				        <br />
		  				        <U.Radio defaultChecked disabled={this.state.disabled}>不可用</U.Radio>
		  				        <div style={{ marginTop: 20 }}>
		  				          <U.Button type="primary" onClick={this.toggleDisabled}>
		  				            Toggle disabled
		  				          </U.Button>
		  				        </div>
	  				        </div>
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
