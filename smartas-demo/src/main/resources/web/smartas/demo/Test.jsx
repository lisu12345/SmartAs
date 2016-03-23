/*[[
   
]]*/
install("web.demo.Test",function($S){
  	var logger = Log.getLogger("web.demo.Test");
  	const {UI,Service,Resource} = Smart,
  		{Grid,Form,Icon,FormItem, Input,DatePicker,DateFormat} = UI;
  
  	const service = Service.New("/demo/test");
  	
  	
  	const columns = [{
  		title: '操作',
  		dataIndex: 'operation',
  		width: 80,
  		render(text, record, index) {
  			return (
  				      <span>
  				        <a href="#">创建</a>
  				        <span className="ant-divider"></span>
  				        <a href="#" className="ant-dropdown-link">
  				          	更多 <Icon type="down" />
  				        </a>
  				      </span>
  				    );
  		}
  	},
  	  {
  	  	title: '用户名',
  		dataIndex: 'name',
  	  },
  	  {
  	  	title: '当前时间',
  		dataIndex: 'test',
  		render(text, record, index){
  			return DateFormat.format(text,'yyyy-MM-dd')
  		}
  	  },
  	];
  	
  	
  	let QForm = React.createClass({
	  render() {
	    const { getFieldProps} = this.props.form;
	    
	   
      	const name = getFieldProps('Q_name_S_LK');
      	const test = getFieldProps('Q_test_D_GE');
	    
	    return (
	      <Form inline onSubmit={this.props.querySubmit}>
		      <FormItem label="用户名：">
		         <Input placeholder="请输入用户名" {...name} />
		      </FormItem>
	      	  <FormItem label="当前时间：">
		         <DatePicker placeholder="请输入当前时间" {...test} formatter='yyyy-MM-dd' />
		      </FormItem>
	        {this.props.children}
	      </Form>
	    );
	  }
	});

	QForm = Form.create()(QForm);
  	
  	const App = React.createClass({
   		render: function() {
  			return <Grid rowKey='id' 
  				QForm={QForm} 
  				columns={columns} 
  				service={service} />
  		}
  	});
  
   	this.ready = function(){
   		return App;
  	};
  });