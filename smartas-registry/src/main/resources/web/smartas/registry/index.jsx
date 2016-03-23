/*[[

]]*/
install("web.registry.index",function($S){
	var logger = Log.getLogger('web.registry.index');
	const {UI,Service} = Smart,
		{TreeForm,Form,Input, Button, Checkbox, Row, Col,FormItem,InputNumber} = UI;

	const service = Service.New("registry");
	
	const getPcode = function(parent){
		const {id,pcode,code} = parent
		if(id == null){
			return ''
		}
		if(pcode){
			return pcode + '.' + code;
		}
		return code
		
	}

	const MenuForm  = Form.create({mapPropsToFields:function(props){
		const {data,parent} = props,pcode = getPcode(parent);
		
		return _.mapValues(_.extend({},data,{parentId:parent.id,pcode}),function(value){
			return {value:value}
		});
	}})(React.createClass({
		
		render() {
			const {form,parent} = this.props,
				{getFieldProps} = form;
			return (
	      <Form horizontal  form={this.props.form}>
	        <FormItem label="名称：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" addonBefore={getPcode(parent)} placeholder="名称" {...getFieldProps('code',{
	              validate: [{
		                rules: [
		                  { required: true,message: '请输入名称'},
		                ],
		                trigger: 'onBlur',
		              }]
		            })}/>
	        </FormItem>
	        <FormItem label="值：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="值" {...getFieldProps('value')} />
	        </FormItem>
	        <FormItem wrapperCol={{ span: 14, offset: 3 }}>
	          <label>
	            <Checkbox {...getFieldProps('enabled',{valuePropName:'checked'})} />是否生效
	          </label>
	        </FormItem>
	        <FormItem label="描述：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="textarea" placeholder="样式" {...getFieldProps('descr')} />
	        </FormItem>
	        <Row>
	          <Col span="16" offset="3">
	          	<Input type="hidden" {...getFieldProps('id')} />
	          	<Input type="hidden" {...getFieldProps('pcode')} />
	          	<Input type="hidden" {...getFieldProps('parentId')} />
	            <Button type="primary" htmlType="submit" onClick={this.props.handleSubmit}>确定</Button>
	          </Col>
	        </Row>
	      </Form>
	    );
	  }

	}));


	const App = React.createClass({
		onCreate:function(parentId){
			return {
				id : '',
				code : '',
				value : '',
				descr : '',
				enabled:true,
				parentId : parentId
			};
		},
 		render: function() {
			return <TreeForm 
				Form={MenuForm} 
				root={{id: null,code:'Root'}}
				expandedKeys={['null']} 
				nameKey='code'
				service={service} 
				onCreate={this.onCreate} />
		}
	});

 	this.ready = function(){
 		return App;
	};
});

