/*[[
 <script src="web/security/user/userList.js"></script>
]]*/

install("web.security.user",function($S){
 	
var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
	
	const {UI,Service} = Smart,
		{Grid, Icon } = UI;
		
	const {Select, Radio,Checkbox,Input, Button, DatePicker, InputNumber,Row,Col, Form,FormItem, Cascader} = UI;
	
	var SettingForm= Form.create({mapPropsToFields:function(props){
		const {data} = props;
		return _.mapValues(_.extend({},data),function(value){
			return {value:value}
		});
	}})(React.createClass({
		handleSubmit(e) {
		    e.preventDefault();
		    const {close,form} = this.props;
		    form.validateFields((errors, values) => {
		        if (!!errors) {
		          return;
		        }
		        var data = this.props.form.getFieldsValue(),isCreate = !data.id;
		           console.log(data);
		           debugger;
			    var method = isCreate?'create':'update';
			    console.log(data);
			    service[method](data,function(id){
			     	data.id = id;
			    	service.dispatch(method,data);
			    });
		    });
		},
	
 		render: function() {
 		 const {linkState,form} = this.props,
				{getFieldProps} = form;
				
			const acount = getFieldProps('acount', {
				rules: [
				        { required: true, message: '请选择项目' }
				        ],
			});
			
		    const email = getFieldProps('email', {
		      rules: [
		        { required: true, message: '请输入package名称' }
		      ],
		    });
		    
		    const password = getFieldProps('password', {
		      rules: [
		        { required: true, message: '请输入Rest URL地址' }
		      ],
		    });
		     const firstname = getFieldProps('firstname', {
		      rules: [
		        { required: true, message: '请输入firstname地址' }
		      ],
		    });
		     const lastname = getFieldProps('lastname', {
		      rules: [
		        { required: true, message: '请输入Rest URL地址' }
		      ],
		    });
		     const status = getFieldProps('status', {
		      rules: [
		        { required: true, message: '请输入Rest URL地址' }
		      ],
		    });
	return 	(	
			<Form horizontal form={this.props.form}>
				<br/>
		        <FormItem labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
		            <Input addonBefore = "账户：" type="text" placeholder="账户" {...getFieldProps('acount')}/>
		        </FormItem>
		            <br/>
		        <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
		            <Input addonBefore="邮箱：" type="input" placeholder="邮箱" {...getFieldProps('email')}/>
		        </FormItem>
		            <br/>
		        <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
		            <Input addonBefore="密码：" type="password" placeholder="密码" {...getFieldProps('password')} />
		        </FormItem>
		            <br/>
		         <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
		            <Input addonBefore="姓：" type="input" placeholder="姓" {...firstname} />
		        </FormItem>
		            <br/>
		         <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
		            <Input addonBefore="名：" type="input" placeholder="名" {...lastname} />
		        </FormItem>
		            <br/>
		         <FormItem labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
		            <Input addonBefore="状态：" type="input" placeholder="状态" {...status} />
		        </FormItem>
		        <Input type="hidden" {...getFieldProps('id')} />
		        <br/>
		        <Row type="flex" justify="center">
		          <Col >
		           	
		            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>保存</Button>
		          </Col>
		        </Row>
	      </Form>);
		}
	}));
	
	const SettingApp = React.createClass({
		getInitialState:function(){
			return {
				data:{id:-9999}
			}
		},
		render: function() {
			const app = this;
			var {data} = this.state;
			return (
				<div>
					<SettingForm ref='Form'  data={data}  handleSubmit={this.handleSubmit} />
				</div>
		    
		);
		}
	});
	
 	this.ready = function(){
 		console.log(location.hash);
 		var hashStr = location.hash;
 		if(hashStr.indexOf("?")>1){
 			let data = hashStr.substring(hashStr.indexOf("?")+1);
 			this.setState({data});
 		}
		return (SettingApp);
	};
});