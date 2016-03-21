/*[[
 <script src="web/demo/plugins/Form/form.js"></script>
]]*/
install("web.demo.plugins.form",function($S){
	var logger = Log.getLogger('web.demo.plugins.form'),pkg = this,U = Smart.UI,L=Smart.LigerUI;
	var Node = React.createClass({
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				return <div>
						<U.Badge count={5}>
					  		<a href="#" className="head-example"></a>
					  	</U.Badge>
						<U.Affix offset={75}>
					    	<U.Button type="primary">固定在距离顶部 75px 的位置</U.Button>
					    </U.Affix>
						<L.Form name="test"><div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-heading" onClick={this.props.add}>Form表单元素{this.props.get('test')}</div>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px'}}>
  						<L.Radio checkedLink={linkState('test2')} readOnly={false} value='1'></L.Radio>是否发布30 <L.Radio checkedLink={linkState('test2')} readOnly={false} value='2'></L.Radio>是否发布31
  						<L.Radio checkedLink={linkState('model.test3')} uncheckable={true} readOnly={false} value='1'></L.Radio>支持取消选中
  						
  						
  						<L.Checkbox checkedLink={linkState('model.test4')} uncheckable={true} readOnly={false} value='1'></L.Checkbox>支持取消选中4
  						<L.Button onClick={function(){alert(this.value)}} disabled={false} value='支持取消选中'></L.Button>
  						</div>
  						<U.Alert message="成功提示的文案" type="success"></U.Alert>
  						<U.Alert message="成功提示的文案" type="info"></U.Alert>
  						<U.Alert message="成功提示的文案" type="warn"></U.Alert>
  						<U.Alert message="成功提示的文案" type="error"></U.Alert>
					</div></L.Form></div>
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
