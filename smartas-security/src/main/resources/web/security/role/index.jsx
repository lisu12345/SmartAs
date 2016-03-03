/*[[
 <script src="web/security/role/role.js"></script>
]]*/

install("web.security.role",function($S){
	var pkg = this,dataSource = pkg.dataSource,eventBus = this.eventBus;
	var logger = Log.getLogger('web.security.role');
	const {UI,Service} = Smart,
		{Grid, Icon,Popconfirm} = UI;
		
	const columns = [{
		title: '操作',
		dataIndex: 'operation',
		width: 80,
		render(text,row,index) {
			return <span>
				<span title="权限设置" onClick={_.bind(pkg.roleSetting,pkg,row.id,row.name)}><Icon type="setting" /></span>
				<span className="ant-divider"></span>
				<span title="用户管理" onClick={_.bind(pkg.roleUserList,this,row.id,row.name)}><Icon type="team" /></span>
				<span className="ant-divider"></span>
				{row.defaultIn == false?<Popconfirm title="确定要删除角色吗？" onConfirm={_.bind(pkg.del,pkg,row.id)}><span title="删除"><Icon type="delete" /></span></Popconfirm> : null}
			</span>
		}
	}, {
		title: '名称',
		dataIndex: 'name'
	}, {
		title: '描述',
		dataIndex: 'desc'
	},{
		title: '状态',
		dataIndex: 'state',
		render(value) {
			return value == 1 ? '有效':'锁定';
		}
	}];
		
	var Edit = React.createClass({
			getInitialState: function() {
				return {
				};
			},
			componentWillReceiveProps : function(nextProps){
				// dataSource.get(nextProps.id)();
			},
			componentWillUnmount : function(){
				 logger.debug('Destroy Permission Tree');
				 $.fn.zTree.destroy("PermissionTree");
			},
			componentDidMount: function() {
				var context = this;
				pkg.buildTree();
				// dataSource.onGet(function(data) {
				// context.setState(data);
				// });
			},

			render: function() {
				return <div className="panel panel-default" style={{marginTop : '5px'}}>
  						<div className="panel-heading">{this.props.name}</div>
  						<div className="panel-body" style={{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px',width:'50%'}}>
							<div className="btn-group" role="group" aria-label="..." style={{float : 'right'}}>
 	 							<button type="button" className="btn btn-default" onClick={_.bind(pkg.savePermissions,pkg,this.props.id)}>保存</button>
 	 							<button type="button" className="btn btn-default" onClick={_.bind(pkg.returnRoleList,pkg,this.props.id)}>返回</button>
							</div>
							<ul className="ztree" id="PermissionTree"></ul>
  						</div>
					</div>
			}
		}
	);
	
   	// API
   	this.reducers = function(){
		return {
			securityRole : function(role,action){
				if(action.type === 'securityRole'){
					window.console.info(action);
					return role || {securityRole : {}};
				}
				return {securityRole : {}};
			}
		}
   	};
	// API
	// 根组件
 	this.ready = function(connect){

		var UI = Smart.UI,
			Grid = UI.Grid,
			Dialog = UI.Dialog;
		var Node = React.createClass({
			getInitialState: function() {
				return {
				};
			},
			componentDidMount: function() {
				var context = this;
				eventBus.on('role.settings',function(data) {
			 		context.setState(data);
				});
			},
			del:function(id){
				this.refs.storage.getDao().remove(id)
			},
			render: function() {
				var context = this;
				
				return (<div>
  						<ul id="myTabs" className="nav nav-tabs" role="tablist">
    						<li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">列表</a></li>
    						<li role="presentation" style={{display:'none'}}><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">权限设置</a></li>
  						</ul>

  						<div className="tab-content">
    						<div role="tabpanel" className="tab-pane fade in active" id="home">
								<Grid rowKey='id' columns={columns} service={pkg.service} title='权限列表' />
							</div>
   							<div role="tabpanel" className="tab-pane fade full-height" id="settings">
							  <Edit id={this.state.id} name={this.state.name}/>
							</div>
  						</div>
					</div>
					);
			}
		});
		return Node;
		//return connect(this.actions())(Node);
	};
	
	this.actions = function(){
		return {
		   	add : function(name){
				return {type:'add',name:name}
			},
			asyn : function(url){
				return function(dispatch){ };
			},
		}
	};
});
