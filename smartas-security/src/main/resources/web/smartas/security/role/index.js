/**[[
 
 <script src="web/security/role/role.js"></script>
 
]]**/install('web.security.role',function($S){var pkg=this,dataSource=pkg.dataSource,eventBus=this.eventBus;var logger=Log.getLogger('web.security.role');var Edit=React.createClass({displayName:'Edit',getInitialState:function(){return {}},componentWillReceiveProps:function(nextProps){ //dataSource.get(nextProps.id)();
},componentWillUnmount:function(){logger.debug('Destroy Permission Tree');$.fn.zTree.destroy('PermissionTree')},componentDidMount:function(){var context=this;pkg.buildTree(); //dataSource.onGet(function(data) {
//	context.setState(data);
//});
},render:function(){return React.createElement('div',{className:'panel panel-default',style:{marginTop:'5px'}},React.createElement('div',{className:'panel-heading'},this.props.name),React.createElement('div',{className:'panel-body',style:{padding:0,borderWidth:0,borderRightWidth:'1px',overflow:'auto',height:'380px',width:'50%'}},React.createElement('div',{className:'btn-group',role:'group','aria-label':'...',style:{float:'right'}},React.createElement('button',{type:'button',className:'btn btn-default',onClick:_.bind(pkg.savePermissions,pkg,this.props.id)},'保存'),React.createElement('button',{type:'button',className:'btn btn-default',onClick:_.bind(pkg.returnRoleList,pkg,this.props.id)},'返回')),React.createElement('ul',{className:'ztree',id:'PermissionTree'})))}}); //API
this.reducers=function(){return {securityRole:function(role,action){if(action.type==='securityRole'){window.console.info(action);return role||{securityRole:{}}}return {securityRole:{}}}}};this.connect=function(createSelector){return {selector:this.selector(createSelector),action:this.action()}}; //API
//根组件
this.root=function(){var UI=Smart.UI,Panel=UI.Panel,IGrid=UI.IGrid,Grid=UI.Grid,Dialog=UI.Dialog,Column=UI.Column;var Node=React.createClass({displayName:'Node',getInitialState:function(){return {}},componentDidMount:function(){var context=this;eventBus.on('role.settings',function(data){context.setState(data)})},render:function(){var context=this;return React.createElement('div',null,React.createElement('ul',{id:'myTabs',className:'nav nav-tabs',role:'tablist'},React.createElement('li',{role:'presentation',className:'active'},React.createElement('a',{href:'#home','aria-controls':'home',role:'tab','data-toggle':'tab'},'列表')),React.createElement('li',{role:'presentation',style:{display:'none'}},React.createElement('a',{href:'#settings','aria-controls':'settings',role:'tab','data-toggle':'tab'},'权限设置'))),React.createElement('div',{className:'tab-content'},React.createElement('div',{role:'tabpanel',className:'tab-pane fade in  active',id:'home'},React.createElement(Panel,null,React.createElement(Panel.Header,{title:'角色列表'}),React.createElement(IGrid,{dataSource:dataSource,height:'256'},React.createElement(IGrid.Column,{width:'20',render:function(value){return React.createElement('input',{type:'checkbox'})}},React.createElement('input',{type:'checkbox'})),React.createElement(IGrid.Column,{width:'80',render:function(value){return React.createElement('div',{className:'smart-btn'},React.createElement('span',{title:'权限设置',onClick:_.bind(pkg.roleSetting,pkg,this.id,this.name)},' ',React.createElement('i',{className:'fa fa-cog'}),' '),React.createElement('span',{title:'用户管理'},' ',React.createElement('i',{className:'fa fa-users',onClick:_.bind(pkg.roleUserList,context,this.id,this.name)}),' '),this.defaultIn==false?React.createElement('span',{onClick:_.bind(pkg.del,pkg,this.id),title:'删除'},' ',React.createElement('i',{className:'fa fa-trash-o'}),' '):null)}},'操作'),React.createElement(IGrid.Column,{field:'name',width:'150'},'名称'),React.createElement(IGrid.Column,{field:'desc',width:'250'},'描述'),React.createElement(IGrid.Column,{field:'status',width:'50',render:function(value){return value==1?React.createElement('div',null,'有效'):'锁定'}},'状态')))),React.createElement('div',{role:'tabpanel',className:'tab-pane fade full-height',id:'settings'},React.createElement(Edit,{id:this.state.id,name:this.state.name}))),React.createElement(Dialog,{ref:'roleUserList'}))}});return Node}; //组件内部状态改变触发器
this.action=function(){return {add:function(name){return {type:'add',name:name}},asyn:function(url){return function(dispatch){}}}}; //组件关注的状态数据
this.selector=function(createSelector){function select(state){return state.securityRole} //return createSelector(function(state){},function(state){},function(arg1,arg2){});
}});