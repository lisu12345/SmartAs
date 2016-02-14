/*[[
 
]]*/
install("web.demo.plugins.antd.Message",function($S){
	var pkg = this,U = Smart.UI;
	const {Menu , Icon ,Button,message} = U;
	function onChange(checkedValues) {
		  console.log('checked = ', checkedValues);
	}

	const info = function () {
		  message.info('这是一条普通的提醒');
	};
	const success = function () {
	  message.success('这是一条成功提示');
	};

	const error = function () {
	  message.error('这是一条报错提示');
	};

	const warn = function () {
	  message.warn('这是一条警告提示');
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
					    	<p>信息提醒反馈。</p>
					    </div>
					    <Button type="primary" onClick={info}>显示普通提醒</Button>
					    
					    <br/><br/>
					    <div className="code-box-meta markdown">
					    	<p>包括成功、失败、警告。</p>
					    </div>
					    <Button onClick={success}>显示成功提示</Button>
					    <Button onClick={error}>显示报错提示</Button>
					    <Button onClick={warn}>显示警告提示</Button>
					    
					    <br/><br/>
					    <div className="code-box-meta markdown">
					    	<p>进行全局 loading，异步自行移除。</p>
					    </div>
					    <Button onClick={function () {
					    	  let hide = message.loading('正在执行中...', 0);
					    	  // 异步手动移除
					    	  setTimeout(hide, 2500);
					    	}}>显示加载中...</Button>
				    	<br/><br/>
					    <div className="code-box-meta markdown">
					    	<p>自定义时长 <code>10s</code>，默认时长为 <code>1.5s</code>。</p>
					    </div>
					    <Button onClick={function () {
					    	  message.success('这是一条成功的提示,并将于10秒后消失', 10);
					    }}>自定义时长提示</Button>	
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
