
/*[[

]]*/
install("web.demo.plugins.antd",function($S){
	var logger = Log.getLogger('web.demo.plugins.antd'),pkg = this,U = Smart.UI;
	let Form = U.Form, Input = U.Input, Button = U.Button, Checkbox = U.Checkbox, message;
	const FormItem = Form.Item;
	var Node = React.createClass({
		mixins: [Form.ValueMixin],

		  getInitialState() {
		    return {
		      formData: {
		        userName: undefined,
		        password: undefined,
		        agreement: undefined,
		      }
		    };
		  },

		  handleSubmit(e) {
		    e.preventDefault();
		    message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
		      if (typeof v === 'undefined') {
		        return '';
		      }
		      return v;
		    }));
		  },

		  render() {
		    const formData = this.state.formData;
		    return (
		      <Form inline onSubmit={this.handleSubmit}>
		        <FormItem
		          id="userName"
		          label="账户：">
		          <Input placeholder="请输入账户名" id="userName" name="userName" onChange={this.setValue.bind(this, 'userName')} value={formData.userName} />
		        </FormItem>
		        <FormItem
		          id="password"
		          label="密码：">
		          <Input type="password" placeholder="请输入密码" id="password" name="password" onChange={this.setValue.bind(this, 'password')} value={formData.password} />
		        </FormItem>
		        <FormItem>
		          <label className="ant-checkbox-inline">
		            <Checkbox name="agreement" value={formData.agreement} onChange={this.setValue.bind(this, 'agreement')} /> 记住我
		          </label>
		        </FormItem>
		        <Button type="primary" htmlType="submit">登录</Button>
		      </Form>
		    );
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
