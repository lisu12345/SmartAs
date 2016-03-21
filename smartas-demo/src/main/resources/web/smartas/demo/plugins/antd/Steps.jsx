/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Steps,Button,notification} = U;
	const Step = Steps.Step;
	
	
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

	const steps1 = [{
	  title: '已完成',
	  description: '这里是多信息的描述啊'
	}, {
	  title: '进行中',
	  description: '这里是多信息的耶哦耶哦哦耶哦耶'
	}, {
	  title: '又一个待运行',
	  description: '描述啊描述啊'
	}, {
	  title: '待运行',
	  description: '这里是多信息的描述啊'
	}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);

	const steps2 = [{
		  status: 'finish',
		  title: '已完成'
		}, {
		  status: 'process',
		  title: '进行中'
		}, {
		  status: 'wait',
		  title: '待运行'
		}, {
		  status: 'wait',
		  title: '待运行'
		}].map((s, i) => <Step key={i} title={s.title} description={s.description} />);
	
		const array = Array.apply(null, Array(Math.floor(Math.random() * 3) + 3));
		const steps = array.map((item, i) => {
		  return {
		    title: '步骤' + (i + 1)
		  };
		});

		const App = React.createClass({
		  getInitialState() {
		    return {
		      currentStep: Math.floor(Math.random() * steps.length)
		    };
		  },
		  next() {
		    let s = this.state.currentStep + 1;
		    if (s === steps.length) {
		      s = 0;
		    }
		    this.setState({
		      currentStep: s
		    });
		  },
		  render() {
		    const cs = this.state.currentStep;
		    return (
		      <div>
		        <div>当前正在执行第 {cs + 1} 步</div>
		        <Steps current={cs}>
		          {steps.map((s, i) => <Step key={i} title={s.title} description={s.description} />)}
		        </Steps>
		        <div>
		          <Button onClick={this.next}>下一步</Button>
		        </div>
		      </div>
		    );
		  }
		});
		
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
					    <Steps current={1}>{steps1}</Steps>
					    <br/><br/>
					    <div className="code-box-meta markdown">
					    <p>迷你版的步骤条，通过设置 <code>&lt;Steps size="small"&gt;</code> 启用.</p>
				    	</div>
				    	<Steps size="small" current={1}>{steps2}</Steps>
				    	 
				    	 <br/><br/>
				    	 <div className="code-box-meta markdown">
				    		<p>随机生成 3~6 个步骤，初始随机进行到其中一个步骤。</p>
				    	</div>
				    	 <App/>
				    	 <br/><br/>
				    	 <div className="code-box-meta markdown">
				    	 <p>简单的竖直方向的步骤条。</p>
				    	 </div>
				    	 <Steps direction="vertical" current={1}>{steps1}</Steps>
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
