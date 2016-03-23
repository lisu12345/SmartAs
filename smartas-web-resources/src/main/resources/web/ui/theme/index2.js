$(function() {
	var curMenu = null, zTree_Menu = null,loginModal = $('#loginModal');
	var UI = Smart.UI,
		Breadcrumb = UI.Breadcrumb,
		Menu = UI.Menu,
		Nav = UI.Nav,
		SubMenu = UI.SubMenu,
		Item = Breadcrumb.Item,
		Resource = Smart.Resource;
	Resource.get('services/security/menu/navbar',function(data){
		var url = Resource.getCurrentUrl(), currentNode = null,list = [];
		var buildTree = function(data, parent) {
			var result = [], id = (parent ? parent.id : 0);
			$.each(data, function(i, menu) {
				if (menu.parentId == id) {
					menu.id > 2 && list.push(menu);
					var node = {
						id : menu.id,
						name : menu.name,
						//node : menu,
						parentId : menu.parentId
					}
					if (menu.url && menu.url == url) {
						currentNode = node;
					}
					menu.url || (menu.url = '#!');
					menu.target = '_self';
					result.push(node);
				}
			});
			$.each(result, function(i, node) {
				node.children = buildTree(data, node)
			});
			return result;
		};
		buildTree(data);
		var el = React.createElement(Nav, {data:list});
		ReactDOM.render(el,document.getElementById("main_menu"));
	});
	
	function loadBreadcrumb(currentNode){
		var lis = [];
		lis.push(currentNode.node.name);
		currentNode.node.open = true;
		currentNode = currentNode.parent;
		while (currentNode && currentNode.node.id > 2) {
			lis.push(currentNode.node.name);  
			currentNode.node.open = true;
			currentNode = currentNode.parent;
		}
		var el = React.createElement(Breadcrumb, {paths:_.reverse(lis)});
		
		ReactDOM.render(el,document.getElementById("breadcrumb"));
	}
	
	function loadBreadcrumb2(currentNode){
		var lis = [];
		lis.push(currentNode.name);
		currentNode = currentNode.getParentNode();
		while (currentNode && currentNode.id > 2) {
			lis.push(currentNode.name);  
			currentNode = currentNode.getParentNode();
		}
		var el = React.createElement(Breadcrumb, {paths:_.reverse(lis)});
		
		ReactDOM.render(el,document.getElementById("breadcrumb"));
	}
	
	 

	function beforeClick(treeId, treeNode) {
		loadBreadcrumb2(treeNode);
		//二次点击
		if(Resource.getCurrentUrl() === treeNode.url){
			$(window).hashchange();
		}
		return true;
	}
	 
	 

	$("#navbar-fullscreen").click(function() {
		var full = false;
		$("[fullscreen]").each(function() {
			var self = $(this);
			if (self.hasClass("container")) {
				self.removeClass("container");
			} else {
				self.addClass("container");
				full = true;
			}
		});
		//$("#main").css({'padding-left' : full ? '40px' : '5px'});
	});
	
	$("#reloadSql").click(function(){
		var get = Resource.get;
		get('services/env/dev/mybatis',function(data){
			//alert(data);
		});
	});
	$("#userInfo").html(Env.getUser().acount +'</span><span class="caret">');
	$("#username").val(Env.getUser().acount);
	// 第一次手动触发
	$(window).hashchange();
	
	loginModal.on('hidden.bs.modal', function (e) {
		Resource.fire('login',loginModal.__);
	})
	Resource.on('timeout',function(options){
		loginModal.__ = options;
		loginModal.modal('show');
	});
	
	Resource.on('login',function(options){
		//if(options.type === 'GET'){
		//	$(window).hashchange();
		//}
		//$("#userInfo").html(Env.getUser().acount +'</span><span class="caret">');
		//zTree_Menu.reAsyncChildNodes(null, "refresh");
		//$(window).hashchange();
	});
	
	$("#logout").click(function() {
		$.ajax({
			type : 'post',
			url : "services/security/logout",
			contentType : "application/json",
			success : function(data) {
				location.reload();
			},
			error : function() {
				location.reload();
			}
		});
	});
	
	$("#login_bnt").click(
	  function() {
		var $btn = $(this).button('loading');
		var form = $("#login_form"), data = form.form2json();
		$.ajax({
			type : 'post',
			url : "services/security/ajaxLogin",
			contentType : "application/json",
			data : JSON.stringify(data),
			success : function(data) {
				$btn.button('reset')
				if (data.status == 200) {// 登录成功
					Env.setUser(data.user)
					form.removeClass("has-error");
					$("#info").hide();
					loginModal.modal('hide');
					return;
				}
				if (data.status == 400) {// 账号密码错误
					form.addClass("has-error");
					$("#info").show().find("[role='alert']").text("账号不存在或密码错误");
					return;
				}
				// 其他情况
				$("#info").show().find("[role='alert']").text("服务器忙,稍后再试");
			},
			error : function() {
				$("#info").show().find("[role='alert']").text("服务器忙,稍后再试");
				$btn.button('reset')
			}
		});
	});
});
