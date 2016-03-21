$(function() {
	var context = "";
	$("#login_bnt").click(
		function() {
			var $btn = $(this).button('loading');
			var form = $("#login_form"), data = form.form2json();
			$.ajax({
				beforeSend: function(xhr) {
					var hash = location.hash;
					if(hash){
						xhr.setRequestHeader("X-Requested-URL", hash.substr(2));
					}
				},
				type : 'post',
				url : "services/security/login",
				contentType : "application/json",
				data : JSON.stringify(data),
				success : function(data) {
					if (data.status == 200) {// 登录成功
						context = data.context;
						window.location = data.context + "/#!" + data.home;
						return;
					}
					$btn.button('reset')
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