/*[[
  
]]*/
install("web.security.user",function($S){
	var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
	
	const {UI,Service} = Smart,
		{Grid, Icon } = UI;

	const service = Service.New("security/user");
	
	const columns = [{
		title: '账户',
		dataIndex: 'acount',
		render(text) {
			return <a href="#">{text}</a>;
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
	
	const App = React.createClass({
 		render: function() {
			return <Grid rowKey='id' columns={columns} service={service} />
		}
	});
	
	
 	this.ready = function(c){
		return (App);
	};
});
