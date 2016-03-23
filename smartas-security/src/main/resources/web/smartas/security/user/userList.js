//# sourceURL=web/security/role/index.js
+function(Resource, DataSource) {
	install('web.security.user', function($S) {
		var logger = Log.getLogger('web.security.user');
		var eventBus = this.eventBus, request = Smart.Resource.ajax,pkg = this,treeObj = null;
		
		this.del = function(id) {
			this.service.remove(id);
		};
		this.userSetting = function(data,App) {
			location.href = "#!web/security/user/userSetting.jsx?"+JSON.stringify(data);
//			location.href = "#!web/security/user/userSetting.jsx";
			console.log('收到表单值：', data);
		};
	});
}(Smart.Resource, Smart.DataSource)
