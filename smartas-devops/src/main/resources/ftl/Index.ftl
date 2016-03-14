/*[[
   
]]*/
install("web.${moduleName}.${entity.name}",function($S){
  	var logger = Log.getLogger("web.${moduleName}.${entity.name}");
  	const {UI,Service,Resource} = Smart,
  		{Grid,Form,Icon,FormItem, Input,} = UI;
  
  	const service = Service.New("${entity.url}");
  	
  	
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
  	<#list introspectTable.nonPrimaryKeyColumns as column><#lt />
  	  {
  	  	title: '${column.title}',
  		dataIndex: '${column.javaProperty}',
  	  },
	</#list><#lt />
  	];
  	
  	
  	let QForm = React.createClass({
	  render() {
	    const { getFieldProps} = this.props.form;
	    
	   
	    <#list introspectTable.nonPrimaryKeyColumns as column><#lt />
      	const ${column.javaProperty} = getFieldProps('Q_${column.javaProperty}_S_LK');
		</#list><#lt />
	    
	    return (
	      <Form inline onSubmit={this.props.querySubmit}>
	      	<#list introspectTable.nonPrimaryKeyColumns as column><#lt />
	      	  <FormItem label="${column.title}：">
		         <Input placeholder="请输入${column.title}" {...${column.javaProperty}} />
		      </FormItem>
			</#list><#lt />
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