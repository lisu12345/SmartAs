+function() {
	var ns = {},env={
		profile:"${profile}",
		mergeRole:true
	};
	env.user = {
		id:"${user.id}",
		acount:"${user.acount}",
		email:"${user.email!''}",
		firstname:"${user.firstname!''}",
		lastname:"${user.lastname!''}",
		currentRole:['a','b'],
		permissions:[],
	};
	ns.getInfo=function(){
		return env;
	};
	ns.getUser=function(){
		return env.user;
	};
	ns.setUser=function(user){
		_.extend(env.user,user);
	};
	window.Env = ns;
}()