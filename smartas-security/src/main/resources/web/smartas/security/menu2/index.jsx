/*[[
 
]]*/
//# sourceURL=web/security/menu2/index.jsx
install("web.security.menu2",function($S){
	var logger = Log.getLogger('web.security.menu2');
	const {UI,Service} = Smart,
		{TreeForm,Form,Input, Button, Checkbox, Row, Col,FormItem,InputNumber} = UI,
		{Grid,url} = UI
	const service = Service.New("security/menu");
	
	const userService = Service.New("security/user");
	
	const columns = [{
		title: '账户',
		dataIndex: 'acount',
		render(text,record) {
			return <a href={url('user.jsx',{id:record.id})}>{text}</a>;
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
	
	
	var toolbar = [{
        text:'Add',
        icon:'add',
        handler:function(){alert('add')}
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
	
	let UserQForm = React.createClass({
	  render() {
	    const { getFieldProps} = this.props.form;
	    
	    const acount = getFieldProps('Q_acount_S_LK');
	    return (
	      <Form inline onSubmit={this.props.querySubmit}>
	        <FormItem label="账户：">
	          <Input placeholder="请输入账户名" {...acount} />
	        </FormItem>
	        {this.props.children}
	      </Form>
	    );
	  }
	});

	UserQForm = Form.create()(UserQForm);
	
	const rowSelection = {
	  onChange(selectedRowKeys) {
	    console.log(`selectedRowKeys changed: ${selectedRowKeys}`);
	  },
	  onSelect(record, selected, selectedRows) {
	    console.log(record, selected, selectedRows);
	  },
	  onSelectAll(selected, selectedRows) {
	    console.log(selected, selectedRows);
	  }
	};
	
	
	var p_id = 1
	

	const MenuForm  = Form.create({mapPropsToFields:function(props){
		const {data,parent} = props;
		return _.mapValues(_.extend({},data,{parentId:parent.id}),function(value){
			return {value:value}
		});
	}})(React.createClass({
		
		render() {
			const {linkState,form} = this.props,
				{getFieldProps} = form;
				
			const qs = {id:p_id}
			p_id++;
			return (
	      <Form horizontal >
	        <FormItem label="名称：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="名称" {...getFieldProps('name',{
	              validate: [{
		                rules: [
		                  { required: true,message: '请输入栏目名称'},
		                ],
		                trigger: 'onBlur',
		              }]
		            })}/>
	        </FormItem>
	        <FormItem label="URL：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="URL" {...getFieldProps('url')} />
	        </FormItem>
	        <FormItem label="模块编码：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="模块编码" {...getFieldProps('moduleCode')} />
	        </FormItem>
	        <FormItem label="Class：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="样式" {...getFieldProps('className')} />
	        </FormItem>
	        <FormItem label="Icon：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="图标" {...getFieldProps('iconName')} />
	        </FormItem>
	        <FormItem label="排序号：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <InputNumber min={0} defaultValue={0} {...getFieldProps('sn')}/>
	        </FormItem> 
	        <FormItem wrapperCol={{ span: 14, offset: 3 }}>
	          <label>
	            <Checkbox {...getFieldProps('publish',{valuePropName:'checked'})} />是否发布
	          </label>
	        </FormItem>
	        <Row>
	          <Col span="16" offset="3">
	          	<Input type="hidden" {...getFieldProps('id')} />
	          	<Input type="hidden" {...getFieldProps('parentId')} />
	            <Button type="primary" htmlType="submit" onClick={this.props.handleSubmit}>确定</Button>
	          </Col>
	        </Row>
	        
	        <Row>
	          <Col span="16" offset="3">
	          <Grid rowKey='id' 
					columns={columns} 
					rowSelection={rowSelection} 
					toolbar={toolbar} 
	          		qs={qs}
					service={userService} 
					title='用户列表' />
	          </Col>
	        </Row>
	      </Form>
	    );
	  }

	}));


	const App = React.createClass({
		onCreate:function(){
			return {
				name : '',
				id : '',
				sn : '1',
				publish:false,
				iconName:'',
				className:'',
				url:'',
			};
		},
 		render: function() {
			return <TreeForm 
				Form={MenuForm} 
				type='z-tree'
				showIcon={false}
				expandedKeys={['0','1']} 
				service={service} 
				onCreate={this.onCreate} />
		}
	});

 	this.ready = function(){
 		return App;
	};
});
