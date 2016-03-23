/*[[
 
]]*/
//# sourceURL=web/security/menu2/index.jsx
install("web.security.menu2",function($S){
	var logger = Log.getLogger('web.security.menu2');
	const {UI,Service} = Smart,
		{TreeForm,Form,Input, Button, Checkbox, Row, Col,FormItem,InputNumber} = UI;

	const service = Service.New("security/menu");

	const MenuForm  = Form.create({mapPropsToFields:function(props){
		const {data,parent} = props;
		return _.mapValues(_.extend({},data,{parentId:parent.id}),function(value){
			return {value:value}
		});
	}})(React.createClass({
		
		render() {
			const {linkState,form} = this.props,
				{getFieldProps} = form;
			return (
<<<<<<< HEAD
	      <Form horizontal  form={this.props.form}>
=======
	      <Form horizontal >
>>>>>>> refs/remotes/upstream/develop
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
