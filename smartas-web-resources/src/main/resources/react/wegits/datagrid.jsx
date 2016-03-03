+ function(UI,RC) {
	const {Table,Button,Icon} = UI;
	
	const ROWNUMBERS = {
		title: '',
		dataIndex: 'id',
		className : 'cell-rownumber',
		render(id,row,index) {
			return <span>{index + 1}</span>;
		}	
	};

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
			if(toolbar){
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

	
	const Grid = React.createClass({
		propTypes: {
			service: React.PropTypes.object.isRequired,
			rownumbers : React.PropTypes.bool,
			pageSize : React.PropTypes.number,
			toolbar : React.PropTypes.array,
		},
		getDefaultProps: function() {
			return {
				rownumbers : true,
				pageSize : 10,
				current: 1,
				toolbar:[],
			}
		},
		getInitialState: function() {
			const {service,current,pageSize} = this.props;
			const pagination = {
				  total: 0,
				  current: current,
				  showSizeChanger: true,
				  showTotal:function showTotal(total) {
					  return `共 ${total} 条`;
				  },
				  onShowSizeChange(current, pageSize) {
					  service.listPage(current,pageSize);
				  },
				  onChange(current,pageSize) {
					  service.listPage(current,pageSize);
				  }
			 };
   			 return {pagination : pagination,data : [],current,pageSize};
  		},
		componentDidMount: function() {
			const {service} = this.props;
			service.subscribe(function(action){
				let {type,data,method} = action;
				if(method === 'refresh'){
					if(data){
						service.listPage(data.qs,data.page,data.pageSize);
						return;
					}
					service.listPage(/*this.state.qs,*/this.state.current,this.state.pageSize);
					return;
				}
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
			}.bind(this));
			service.listPage(1,10);
		},
 		render: function() {
			const {data,pagination} = this.state,{service,rowKey,rownumbers,columns,title,toolbar,...props} = this.props;
			
			return (
				<div className="ant-grid">
					<Header title={title} />
					<Toolbar toolbar={toolbar} service={service} />
					<Table size='grid' {...props} rowSelection={rowSelection}
					rowKey={function(record){return record[rowKey]}}
					columns={rownumbers ? _.concat(ROWNUMBERS,columns):columns}
					dataSource={data} 
					pagination={pagination} />
				</div>
			);
		}
	});
	
	UI.Grid = Grid;
}(Smart.UI,Smart.RC)