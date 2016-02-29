+ function(UI,RC) {
	const {Table} = UI;
	
	const ROWNUMBERS = {
		title: '',
		dataIndex: 'id',
		className : 'cell-rownumber',
		render(id,row,index) {
			return <span>{index + 1}</span>;
		}	
	};
	
	const Grid = React.createClass({
		propTypes: {
			service: React.PropTypes.object.isRequired,
			rownumbers : React.PropTypes.bool,
		},
		getDefaultProps: function() {
			return {
				rownumbers : true
			}
		},
		getInitialState: function() {
			const {service} = this.props;
			const pagination = {
				  total: 0,
				  current: 1,
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
   			 return {pagination : pagination,data : []};
  		},
		componentDidMount: function() {
			const {service} = this.props;
			service.subscribe(function(action){
				let {type,data,method} = action;
				if(method === 'listPage'){
					let {pageSize,page,length} = data
					this.setState({
						data:data.data,
						pagination : {
							total : length
						}
					});
					return;
				}
			}.bind(this));
			service.listPage(1,10);
		},
 		render: function() {
			const {data,pagination} = this.state,{service,rowKey,rownumbers,columns,...props} = this.props;
			
			
			return (<Table size='grid' {...props} 
				rowKey={function(record){return record[rowKey]}}
				columns={rownumbers ? _.concat(ROWNUMBERS,columns):columns}
				dataSource={data} 
				pagination={pagination} />);
		}
	});
	
	UI.Grid = Grid;
}(Smart.UI,Smart.RC)