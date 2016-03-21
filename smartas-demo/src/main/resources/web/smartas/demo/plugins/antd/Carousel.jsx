/*[[
 
]]*/
install("web.demo.plugins.antd.tree",function($S){
	var pkg = this,UI = Smart.UI;
	const { Carousel  , Button } = UI;

	function onChange(a, b, c) {
	  console.log(a, b, c);
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
				const style = {
					    background: '#71B5DE',
					    lineHeight: '100px',
					    textAlign: 'center',
			    		height: '100px',
						color: '#fff',
			    		overflow: 'hidden',
				}
				return <div>
						<div className="code-box-meta markdown">
					    	<p>1.最简单的用法。</p>
					    </div>
					    
					    <Carousel afterChange={onChange}>
						    <div><h3 style={style}>1</h3></div>
						    <div><h3 style={style}>2</h3></div>
						    <div><h3 style={style}>3</h3></div>
						    <div><h3 style={style}>4</h3></div>
					    </Carousel>
					    
					    <div className="code-box-meta markdown">
				    	<p>2.垂直显示。</p>
					    </div>
					    <Carousel afterChange={onChange} vertical="true">
						    <div><h3 style={style}>1</h3></div>
						    <div><h3 style={style}>2</h3></div>
						    <div><h3 style={style}>3</h3></div>
						    <div><h3 style={style}>4</h3></div>
					    </Carousel>
					    
					    <br/> <br/>
					    <div className="code-box-meta markdown">
					    	<p>3.定时切换下一张。</p>
					    </div>
					    <Carousel autoplay="true">
						    <div><h3 style={style}>1</h3></div>
						    <div><h3 style={style}>2</h3></div>
						    <div><h3 style={style}>3</h3></div>
						    <div><h3 style={style}>4</h3></div>
					    </Carousel>
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
