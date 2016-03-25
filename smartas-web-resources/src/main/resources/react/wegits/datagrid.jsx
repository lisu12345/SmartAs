+ function(UI,RC) {
	const {Table,Button,Icon} = UI,
	 AT = Smart.ActionTypes;
	

	const Header = React.createClass({
		propTypes: {
			title : React.PropTypes.string,
		},
		render: function() {
			const {title} = this.props;
			if(title){
				return (<div className="grid-head">
					<div className="grid-title">
						{title}
					</div>
				</div>);
			}
			return null
		}
	});
	
	
	const Toolbar = React.createClass({
		propTypes: {
			toolbar : React.PropTypes.array,
			service: React.PropTypes.object.isRequired,
		},
		render: function() {
			const {toolbar} = this.props;
			if(_.size(toolbar)){
				return (<div className="grid-toolbar">
					 	<table style={{cellspacing:0,cellpadding:0}}><tbody><tr>
					 		{
					 			_.map(toolbar,function(value,key){
					 				let bar;
					 				if(value === '-'){
					 					bar = <span className='btn-separator' /> ;
					 				}else{
					 				    bar = (<Button type='grid' onClick={value.handler.bind(this)}>
					 				    		{value.icon ? <Icon type={value.icon} /> : ''}
						 				    	<span>{value.text}</span>
						 				      </Button>)
					 				}
					 				return <td key={key}>{bar}</td>;
					 			})
					 		}
					 		</tr></tbody></table>
				</div>);
			}
			return null
		}
	});
	
	
	const Grid = React.createClass({
		propTypes: {
			service: React.PropTypes.object.isRequired,
			rownumbers : React.PropTypes.bool,
			pageSize : React.PropTypes.number,
			toolbar : React.PropTypes.array,
			rowSelection:React.PropTypes.object,
			qs:React.PropTypes.object,
			QForm:React.PropTypes.func,
		},
		getDefaultProps: function() {
			return {
				rownumbers : true,
				pageSize : 10,
				current: 1,
				qs : null,
				toolbar:[],
			}
		},
		getInitialState: function() {
			const {service,current,pageSize} = this.props,
				_self = this;
			const pagination = {
				  total: 0,
				  current: current,
				  showSizeChanger: true,
				  showTotal:function showTotal(total) {
					  return `共 ${total} 条`;
				  },
				  onShowSizeChange(current, pageSize) {
					  service.listPage(current,pageSize,_self.state.qs);
				  },
				  onChange(current,pageSize) {
					  service.listPage(current,pageSize,_self.state.qs);
				  }
			 };
   			 return {pagination : pagination,data : [],current,pageSize};
  		},
  		componentWillReceiveProps:function(nextProps){
  			const {service,qs} = nextProps;
  			service.listPage(1,10,qs);
  		},
  		componentWillMount: function() {
			const {service,qs} = this.props;
			this.unsubscribe = service.subscribe(function(action){
				let {type,data,method} = action;
				if(method === 'listPage'){
					this.setState({
						data:data.data,
						current:data.page,
						pageSize:data.pageSize,
						pagination : {
							total : data.length
						}
					});
					return;
				}
				if (method === 'refresh') {
					if (data) {
						service.listPage(data.page, data.pageSize, _.assign(data.qs, qs));
						return;
					}
					service.listPage(this.state.current, this.state.pageSize, _.assign(this.state.qs, qs));
					return;
				}
				//if(type === AT.SERVICE.SUCCESS){
				//	service.listPage(this.state.current,this.state.pageSize,_.assign(this.state.qs,qs));
				//	return;
				//}
			}.bind(this));
			service.listPage(1,10,qs);
		},
		componentWillUnmount:function(){
			if(this.unsubscribe){
				this.unsubscribe();
				this.unsubscribe = null;
			}
		},
		queryReset:function(e){
			this.refs.qform.resetFields();
		},
		querySubmit(e) {
		    e.preventDefault();

		    const {service} = this.props;
		    const qs = this.refs.qform.getFormatFieldsValue();
			this.state.qs = qs
		    service.refresh();

		},
 		render: function() {
			const {data,pagination} = this.state,
				{service,rowKey,rownumbers,
					columns,title,toolbar,rowSelection,
					QForm,...props} = this.props;
			let Form = null;
			if(QForm){
				Form = (<div>
					<QForm ref="qform" querySubmit={this.querySubmit}>
						<Button type="primary" htmlType="submit">查询</Button>&nbsp;
						<Button onClick={this.queryReset}>重置</Button>
					</QForm>
				</div>);
			}
			return (
				<div className="ant-grid">
					{QForm && Form}
					<Header title={title} />
					<Toolbar toolbar={toolbar} service={service} />
					<Table size='grid' {...props} rowSelection={rowSelection}
					rowKey={function(record){return record[rowKey]}}
					columns={columns}
					rownumbers={rownumbers}
					dataSource={data} 
					pagination={pagination} />
				</div>
			);
		}
	});
	
	UI.Grid = Grid;
}(Smart.UI,Smart.RC)