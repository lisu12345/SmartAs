/*[[
 <script src="web/smartas/security/user/userList.js"></script>
]]*/

install("web.security.user",function($S){
 	
	var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
	
	const {UI,Service} = Smart,
		{Grid, Icon } = UI;
		
	const {Select, Radio,Checkbox,Input, Button, DatePicker, InputNumber,Row,Col, Form,FormItem, Cascader} = UI
	let message;
	//const FormItem  = Form.Item;
	const Option = Select.Option;
	const RadioGroup = Radio.Group;

	const service = this.service || Smart.Service.New("security/user");
	
	var QueryForm= Form.create()(React.createClass({
 		render: function() {
 		 const {linkState,form} = this.props,
				{getFieldProps} = form;
	     const acount = getFieldProps('Q_acount_S_LK');
		 return(
			<Form inline onSubmit={this.props.querySubmit}>
				<br/>
		        <FormItem label = "账户：" labelCol={{ span: 8 }} wrapperCol={{ span: 1 }}>
		            <Input type="text" placeholder="名称" {...getFieldProps('acount')}/>
		        </FormItem>
		        <FormItem label="邮箱：" labelCol={{ span: 8 }} wrapperCol={{ span: 1 }}>
		            <Input type="text" placeholder="邮箱" {...getFieldProps('email')}/>
		        </FormItem>
		         <FormItem label="姓：" labelCol={{ span: 8 }} wrapperCol={{ span: 1 }}>
		            <Input type="text" placeholder="姓" {...getFieldProps('firstName')} />
		        </FormItem>
		         <FormItem label="名：" labelCol={{ span: 8 }} wrapperCol={{ span: 1 }}>
		            <Input type="text" placeholder="名" {...getFieldProps('name')} />
		        </FormItem>
		        <FormItem label="状态：" labelCol={{ span: 8 }} wrapperCol={{ span: 1 }}>
		            <Input type="text" placeholder="状态" {...getFieldProps('status')} />
		        </FormItem>
		        {this.props.children}
	      </Form>);
		}
	}));

	
	const ListApp = React.createClass({
		getInitialState:function(){
			return {
				data:{id:-9999}
			}
		},
		render: function() {
		
		const app = this;
		
		var toolbar = [{
	        text:'Add',
	        icon:'add',
	        handler:function(){
	        
	        	location.href = "#!web/security/user/userSetting.jsx";
	        	
	        }
	    },{
	        text:'Cut',
	        icon:'cut',
	        handler:function(){alert('cut')}
	    },'-',{
	        text:'Save',
	        icon:'save',
	        handler:function(){alert('save')}
	    },{
		    text:'删除',
		    icon:'delete',
		    handler:function(){alert('删除')}
		}];
			
		const columns = [{
			title: '账户',
			dataIndex: 'acount',
			render(text,row,index) {
				return  <span onClick={_.bind(pkg.userSetting,pkg,row,app)}> {text} </span>; 
			}
		}, {
			title: 'Emai',
			dataIndex: 'email'
		}, {
			title: 'First name',
			dataIndex: 'firstname'
		},{
			title: 'Last name',
			dataIndex: 'lastname'
		},{
			title: 'state',
			dataIndex: '状态',
			render(value) {
				return value == 1 ? '有效':'锁定';
			}
		}];
		
		
			var {data} = this.state;
			return (
			<div>
				<Grid QForm = {QueryForm} rowKey='id' columns={columns} toolbar={toolbar} service={service} title='用户列表' />
			</div>
		    
		);
		}
	});
	
 	this.ready = function(c){
		return (ListApp);
	};
});