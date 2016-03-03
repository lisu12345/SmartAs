/*[[
 
]]*/
install("web.devops.generator",function($S){
	var logger = Log.getLogger('web.devops.generator');
	const {UI,Service} = Smart,
		{Grid, Icon } = UI;

	const service = Service.New("devops/generator/table");
	
	const columns = [{
		title: '操作',
		dataIndex: 'operation',
		width: 80,
		render(text,row) {
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
