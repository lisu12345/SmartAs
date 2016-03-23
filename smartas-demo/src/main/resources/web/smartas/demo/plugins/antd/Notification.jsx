/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Button,notification} = U;

	const openNotification = function () {
	  notification.open({
	    message: '这是标题',
	    description: '这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案'
	  });
	};
	
	
	const close = function () {
	  console.log('我被默认的关闭按钮关闭了！');
	};

	const openNotification1 = function () {
	  const key = 'open' + Date.now();
	  const btnClick = function () {
	    // 隐藏提醒框
	    notification.close(key);
	  };
	  const btn = (
	    <Button type="primary" size="small" onClick={btnClick}>
	      自定义关闭按钮并触发回调函数
	    </Button>
	  );
	  notification.open({
	    message: '这是标题',
	    description: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案',
	    btn: btn,
	    key: key,
	    onClose: close
	  });
	};
	
	const openNotificationWithIcon = function (type) {
	  return function () {
	    notification[type]({
	      message: '这是标题',
	      description: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案'
	    });
	  };
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
				return <div>
						<div className="code-box-meta markdown">
					    	<p>基本使用。</p>
					    </div>
					    <Button type="primary" onClick={openNotification}>打开通知提醒框</Button>
					    <br/><br/>
					    <div className="code-box-meta markdown">
				    		<p>自定义关闭按钮的样式和文字。</p>
				    	</div>
				    	 <Button type="primary" onClick={openNotification1}>打开通知提醒框</Button>
				    	 
				    	 <br/><br/>
				    	 <div className="code-box-meta markdown">
				    		<p>通知提醒框左侧有图标。</p>
				    	</div>
				    	 <div>
				    	    <Button onClick={openNotificationWithIcon('success')}>成功</Button>
				    	    <Button onClick={openNotificationWithIcon('info')}>消息</Button>
				    	    <Button onClick={openNotificationWithIcon('warn')}>警告</Button>
				    	    <Button onClick={openNotificationWithIcon('error')}>错误</Button>
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
