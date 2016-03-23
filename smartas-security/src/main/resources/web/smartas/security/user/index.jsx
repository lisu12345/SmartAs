/*[[
  
]]*/
//# sourceURL=web/security/user/index.js
install("web.security.user",function($S){
	var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
	
	const {UI,Service} = Smart,
		{Grid,Form,FormItem, Input, Button, Checkbox,url} = UI;

	const service = Service.New("security/user");
	
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
	
	
	const App = React.createClass({
 		render: function() {
			return <Grid rowKey='id' 
				columns={columns} 
				QForm={UserQForm} 
				rowSelection={rowSelection} 
				toolbar={toolbar} 
				service={service} 
				title='用户列表' />
		}
	});
	
	
 	this.ready = function(c){
		return (App);
	};
});
