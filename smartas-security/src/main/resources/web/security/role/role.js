//# sourceURL=web/security/role/index.js
+function(Resource, DataSource) {
	install('web.security.role', function($S) {
		var logger = Log.getLogger('web.security.role');
		var eventBus = this.eventBus, request = Smart.Resource.ajax,pkg = this,treeObj = null;
		
		const service = this.service = Smart.Service.New("security/role");
		
		this.del = function(id) {
			service.remove(id);
		};
		this.roleSetting = function(id,name) {
			$S("#myTabs li:last").show().children('a:last').tab('show');
			eventBus.fire('role.settings', {id:id,name:name});
			request({
				type : 'get',
				url : "services/security/permission/role/{0}".format(id),
				success : function(result) {
					treeObj.checkAllNodes(false);
					var checked = {};
					_.each(result,function(id){
						checked[id] = true;
					});
					var nodes = treeObj.getNodesByFilter(function(node){
						 return !!checked[node.id];
					});
					_.each(nodes,function(node){
						treeObj.checkNode(node, true, true);
					})
				},
				error : function() {

				}
			});
		};
		this.roleUserList = function(id){
			$S(ReactDOM.findDOMNode(this.refs.roleUserList)).modal('show');
		};
		this.returnRoleList = function(){
			$S("#myTabs li:last").hide();
			$S("#myTabs li:first").children('a:first').tab('show');
		};
		this.savePermissions = function(id){
			var ids = [];
			_.each(treeObj.getCheckedNodes(true),function(node){
				node.id.indexOf('.')>0 && ids.push(node.id);
			});
			request({
				type : 'post',
				url : "services/security/permission/role/{0}".format(id),
				data : ids,
				success : function(data) {
					//$S("#myTabs li:last").hide();
					//$S("#myTabs li:first").children('a:first').tab('show');
				},
				error : function() {
					alert(111)
				}
			});
		}
		this.buildTree = function() {
			var setting = {
				async : {
					enable : true,
					type : 'get',
					url : "services/security/permission/scan",
				},
				check: {
					enable: true
				},
				view : {
					dblClickExpand : false,
					showLine : false
				},
				data : {
					key : {
						url : '',
						name : 'desc'
					},
					simpleData : {
						enable : true,
						idKey : "id",
						pIdKey : "parentId",
						rootPId : ''
					}
				},
				callback : {}
			};
			treeObj = $.fn.zTree.init($S("#PermissionTree"), setting);
		}
	});
}(Smart.Resource, Smart.DataSource)
