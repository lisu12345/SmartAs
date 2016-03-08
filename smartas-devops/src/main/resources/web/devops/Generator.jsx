/*[[
 
]]*/
install("web.devops.generator",function($S){
	var logger = Log.getLogger('web.devops.generator');
	const {UI,Service,Resource} = Smart,
		{Grid, Icon,Modal,Form,Input, Button, Checkbox, Row, Col,FormItem,Select,Option} = UI;

	const service = Service.New("devops/generator/table");
	
	const NewModule  = Form.create({mapPropsToFields:function(props){
		//const {data,parent} = props;
		//return _.mapValues(_.extend({},data,{parentId:parent.id}),function(value){
		//	return {value:value}
		//});
	}})(React.createClass({
		handleSubmit(e) {
		    e.preventDefault();
		    const {close,form} = this.props;
		    form.validateFields((errors, values) => {
		        if (!!errors) {
		          return;
		        }
		        var data = form.getFieldsValue();
			    service.create(data,function(id){
			    	close();
			    });
		    });
		},
		getInitialState:function(){
			return {
				projectList:[]
			}
		},
		componentDidMount:function(){
			Resource.get("services/devops/generator/project/list",function(data){
				this.setState({
					projectList : data
				})
			}.bind(this));
		},
		render() {
			const {linkState,form} = this.props,
				{getFieldProps} = form;
				
			const project = getFieldProps('project', {
				rules: [
				        { required: true, message: '请选择项目' }
				        ],
			});
			
		    const packageName = getFieldProps('packageName', {
		      rules: [
		        { required: true, message: '请输入package名称' }
		      ],
		    });
		    
		    const url = getFieldProps('url', {
		      rules: [
		        { required: true, message: '请输入Rest URL地址' }
		      ],
		    });
		    const code = getFieldProps('code', {
		    	rules: [
	    	        { required: true, message: '请输入模块资源编码' }
	    	        ],
		    });
		    const name = getFieldProps('name', {
		    	rules: [
		    	        { required: true, message: '请输入实体对象名称' }
		    	        ],
		    });
		    const options = this.state.projectList.map(d => <Option key={d.name}>{d.name}</Option>);	
			return (
	      <Form horizontal  form={this.props.form}>
	        <FormItem label="Project：" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
	          <Select style={{ width: 200 }} {...project}>
	            {options}
	          </Select>
	        </FormItem>
	        <FormItem label="Package：" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="Package" {...packageName} />
	        </FormItem>
	        <FormItem label="URL：" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="Path Mapping" {...url} />
	        </FormItem>
	        <FormItem label="Code：" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="Resource Code" {...code} />
	        </FormItem>
	        <FormItem label="Name：" labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="Class Name" {...name} />
	        </FormItem>
	        <FormItem wrapperCol={{ span: 14, offset: 4 }}>
	          <label>
	            <Checkbox {...getFieldProps('indexPage',{valuePropName:'checked'})} />生成首页地址
	          </label>
	        </FormItem>
	        <Row type="flex" justify="end">
	          <Col span="3">
	            <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>确定</Button>
	          </Col>
	        </Row>
	      </Form>
	    );
	  }
	}));

	function showDialog() {
		Modal.dialog({
	    title: 'New',
	    iconClassName:'aa',
	    width: 600,
	    align: {
	    	points: ['tc', 'tc'],
	    	offset: [0, 100],
	    },
	    content: <NewModule />,
	  });
	}

	
	const columns = [{
		title: '操作',
		dataIndex: 'operation',
		width: 80,
		render(text, record, index) {
			return (
				      <span>
				        <a onClick={showDialog}>创建</a>
				        <span className="ant-divider"></span>
				        <a href="#" className="ant-dropdown-link">
				          更多 <Icon type="down" />
				        </a>
				      </span>
				    );
		}
	},{
		title: 'schema',
		dataIndex: 'schema',
	}, {
		title: 'name',
		dataIndex: 'name'
	}, {
		title: 'comment',
		dataIndex: 'comment'
	}];
	
	const App = React.createClass({
 		render: function() {
			return <Grid rowKey='name' columns={columns} service={service} />
		}
	});

 	this.ready = function(){
 		return App;
	};
});
