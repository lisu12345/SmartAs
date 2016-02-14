+function() {
	var ns = {},env={
		profile:"${profile}"
	};
	env.user = {
		//你大号
	}
	ns.getInfo=function(){
		return env;
	}
	window.Env = ns;
}()