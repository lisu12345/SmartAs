/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this, {UI , Service , Resource}  = Smart;
	const {Select, Radio,Checkbox,Input, Button, DatePicker, InputNumber,Row,Col, Form,FormItem , Grid }  = UI;
	
	const service = Service.New("attachment")
	const props = {
		selectedRows : "",
	};
	
	var toolbar = [{
        text:'Download',
        icon:'download',
        handler:function(){
	          let selectedRows = props.selectedRows;
	          const type = 'post';
		      const url = 'services/file/downLoad';
		      const data = selectedRows;
		      const success = function(data){
		    	  alert(data);
		    	  if(data == "1"){
		    		  alert(props.form.callback);
		    	  }
		      };
		      const error = function(data){
		    	  alert("error"+data);
		      };
		      //在这里失去焦点后台发送数据以校验名称是否占用
		      var count = Resource.post(url, data, success, error);
		      
        }
    },{
	    text:'删除',
	    icon:'delete',
	    handler:function(){alert('删除')}
	}];
		
	const columns = [
	{
		title: '上传批次号',
		dataIndex: 'batchNo'
		
	},{
		title: '文件名',
		dataIndex: 'fileName'
	}, {
		title: '存储位置',
		dataIndex: 'filePath',
		type : 'hidden'
	},{
		title: '上传日期',
		dataIndex: 'createDate',
		render(value){
			return new Date(value).Format("yyyy-MM-dd");
		}
	}, {
		title: '文件下载状态',
		dataIndex: 'fileDownStatus',
		render(text , record) {
			return text == 0 ? <a href={'services/file/downLoad/' + record.id}>下载</a> : '无效(服务器物理文件被删除)';
		}
	}];
	
	const rowSelection = {
	  onChange(selectedRowKeys) {
	    console.log('selectedRowKeys changed: ' + selectedRowKeys);
	  },
	  onSelect: function (record, selected, selectedRows) {
	    console.log(record, selected, selectedRows);
	    props.selectedRows = selectedRows;
	  },
	  onSelectAll: function (selected, selectedRows) {
		props.selectedRows = selectedRows;
	  }
	};
	
	var QueryForm = Form.create()(React.createClass({
 		render: function() {
 		 const {linkState,form} = this.props,
				{getFieldProps} = form;
		 return(
			<Form inline onSubmit={this.props.querySubmit}>
				<br/>
				<Row type="flex" justify="before">
			        <FormItem label = "文件名：" labelCol={{ span: 7 }} wrapperCol={{ span: 3 }}>
			            <Input type="text" placeholder="文件名" {...getFieldProps('Q_fileName_S_LK')} />
			        </FormItem>
			        <FormItem labelCol={{ span: 7 }}>
			        	{this.props.children}
			        </FormItem>
	           </Row>
	      </Form>);
		}
	}));
	
	var Node = React.createClass({
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				return <div>
						<div className="row ">
							<Grid QForm = {QueryForm}
								rowKey='id'
								columns={columns}
								service={service}
							title='文件列表' />
						</div>
  					</div>
			}
		}
	);
	
	// API
	this.ready = function(connect){
		return Node;
	};
});
