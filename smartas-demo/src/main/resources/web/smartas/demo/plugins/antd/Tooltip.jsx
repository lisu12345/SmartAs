/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const Tooltip = U.Tooltip;
	const text = <span>提示文字</span>;
	
	const sytles = {
		display: 'inline-block',
	    height: 32,
	    width: 60,
	    fontSize: 14,
	    textAlign: 'center',
	    background: '#f5f5f5',
	    marginRight: '1em',
	    marginBottom: '1em',
	    borderRadius: 6
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
					    	<p>基本使用。</p>
					    </div>
					    <Tooltip title="提示文字">
					    	<span>鼠标移上来就会出现提示</span>
					    </Tooltip>
					    <br/><br/>
					    <div style={{height:30}}>
					      <Tooltip placement="topLeft" title={text}>
					        <a href="#" style={sytles}>上左</a>
					      </Tooltip>
					      <Tooltip placement="top" title={text}>
					        <a href="#" style={sytles}>上边</a>
					      </Tooltip>
					      <Tooltip placement="topRight" title={text}>
					        <a href="#" style={sytles}>上右</a>
					      </Tooltip>
					      <Tooltip placement="leftTop" title={text}>
					        <a href="#" style={sytles}>左上</a>
					      </Tooltip>
					      <Tooltip placement="left" title={text}>
					        <a href="#" style={sytles}>左边</a>
					      </Tooltip>
					      <Tooltip placement="leftBottom" title={text}>
					        <a href="#" style={sytles}>左下</a>
					      </Tooltip>
					      <Tooltip placement="rightTop" title={text}>
					        <a href="#" style={sytles}>右上</a>
					      </Tooltip>
					      <Tooltip placement="right" title={text}>
					        <a href="#" style={sytles}>右边</a>
					      </Tooltip>
					      <Tooltip placement="rightBottom" title={text}>
					        <a href="#" style={sytles}>右下</a>
					      </Tooltip>
					      <Tooltip placement="bottomLeft" title={text}>
					        <a href="#" style={sytles}>上右</a>
					      </Tooltip>
					      <Tooltip placement="bottom" title={text}>
					        <a href="#" style={sytles}>下边</a>
					      </Tooltip>
					      <Tooltip placement="bottomRight" title={text}>
					        <a href="#" style={sytles}>下右</a>
					      </Tooltip>
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
