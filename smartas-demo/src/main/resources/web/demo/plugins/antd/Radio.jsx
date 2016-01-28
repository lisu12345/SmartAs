/*[[
 
]]*/
install("web.demo.plugins.antd.radio",function($S){
	var logger = Log.getLogger('web.demo.plugins.antd.radio'),pkg = this,U = Smart.UI;
	
	const Radio = U.Radio;
	const Button = U.Button;
	const RadioButton = Radio.Button;
	const RadioGroup = Radio.Group;
	
	
	function onChange(e) {
		console.log('radio checked:' + e.target.value);
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
	  						<Radio>Radio</Radio>
	  						<div>
		  				        <Radio defaultChecked={false} disabled={this.state.disabled}>不可用</Radio>
		  				        <br />
		  				        <Radio defaultChecked disabled={this.state.disabled}>不可用</Radio>
		  				        <div style={{ marginTop: 10 }}>
		  				          <Button type="primary" onClick={this.toggleDisabled}>
		  				            Toggle disabled
		  				          </Button>
		  				        </div>
	  				        </div>
	  				      <br />
	  				      <div>
		  				    <RadioGroup onChange={onChange} defaultValue="a">
		  				      <RadioButton value="a">杭州</RadioButton>
		  				      <RadioButton value="b">上海</RadioButton>
		  				      <RadioButton value="c">北京</RadioButton>
		  				      <RadioButton value="d">成都</RadioButton>
		  				    </RadioGroup>
		  				  </div>
		  				  <div style={{ marginTop: 16 }}>
		  				    <RadioGroup onChange={onChange} defaultValue="a">
		  				      <RadioButton value="a">杭州</RadioButton>
		  				      <RadioButton value="b" disabled>上海</RadioButton>
		  				      <RadioButton value="c">北京</RadioButton>
		  				      <RadioButton value="d">成都</RadioButton>
		  				    </RadioGroup>
		  				  </div>
		  				  <div style={{ marginTop: 16 }}>
		  				    <RadioGroup disabled onChange={onChange} defaultValue="a">
		  				      <RadioButton value="a">杭州</RadioButton>
		  				      <RadioButton value="b">上海</RadioButton>
		  				      <RadioButton value="c">北京</RadioButton>
		  				      <RadioButton value="d">成都</RadioButton>
		  				    </RadioGroup>
		  				  </div>
		  				<br />
		  				大中小三种组合，可以和表单输入框进行对应配合。
		  				<div>
		  			    <RadioGroup defaultValue="a" size="large">
		  			      <RadioButton value="a">杭州</RadioButton>
		  			      <RadioButton value="b">上海</RadioButton>
		  			      <RadioButton value="c">北京</RadioButton>
		  			      <RadioButton value="d">成都</RadioButton>
		  			    </RadioGroup>
		  			  </div>
		  			  <div style={{ marginTop: 16 }}>
		  			    <RadioGroup defaultValue="a">
		  			      <RadioButton value="a">杭州</RadioButton>
		  			      <RadioButton value="b">上海</RadioButton>
		  			      <RadioButton value="c">北京</RadioButton>
		  			      <RadioButton value="d">成都</RadioButton>
		  			    </RadioGroup>
		  			  </div>
		  			  <div style={{ marginTop: 16 }}>
		  			    <RadioGroup defaultValue="a" size="small">
		  			      <RadioButton value="a">杭州</RadioButton>
		  			      <RadioButton value="b">上海</RadioButton>
		  			      <RadioButton value="c">北京</RadioButton>
		  			      <RadioButton value="d">成都</RadioButton>
		  			    </RadioGroup>
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
