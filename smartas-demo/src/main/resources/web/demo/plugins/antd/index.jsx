/*[[
 
]]*/
install("web.demo.plugins.antd",function($S){
	var logger = Log.getLogger('web.demo.plugins.antd'),pkg = this,U = Smart.UI;
	const {Badge, Breadcrumb,Affix,Row,Col,Radio,Button,Alert} = U; 
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
						<Badge count={5}>
				  			<a href="#" className="head-example"></a>
					  	</Badge>
					  	<br/><br/>
					  	<Breadcrumb>
						    <Breadcrumb.Item>首页</Breadcrumb.Item>
						    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
						    <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
						    <Breadcrumb.Item>某应用</Breadcrumb.Item>
					    </Breadcrumb>
						<div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px'}}>
							<Affix offset={75}>
						    	<Button type="primary">固定在距离顶部 75px 的位置</Button>
						    </Affix>
	  						<Alert message="成功提示的文案" type="success" showIcon={true} closable={true}></Alert>
	  						<Alert message="成功提示的文案" type="info" closeText="OK"></Alert>
	  						<Alert message="成功提示的文案" type="warn"></Alert>
	  						<Alert message="成功提示的文案" type="error"></Alert>
	  						<br/>
	  						<Radio>Radio</Radio>
	  						
	  						<div>
		  				        <Radio defaultChecked={false} disabled={this.state.disabled}>不可用</Radio>
		  				        <br />
		  				        <Radio defaultChecked disabled={this.state.disabled}>不可用</Radio>
		  				        <div style={{ marginTop: 20 }}>
		  				          <Button type="primary" onClick={this.toggleDisabled}>
		  				            Toggle disabled
		  				          </Button>
		  				        </div>
	  				        </div>
	  				        
	  				      <Row type="flex">
		  				      <Col span="6" order="4">1 col-order-4</Col>
		  				      <Col span="6" order="3">2 col-order-3</Col>
		  				      <Col span="6" order="2">3 col-order-2</Col>
		  				      <Col span="6" order="1">4 col-order-1</Col>
		  				    </Row>
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
