(function($, Namespace, Resource, AT) {

	var NS = Namespace.register("Smart.Service");

	function compose(type) {
		var fns = _.slice(arguments, 1);
		return function(arg1, arg2, arg3) {
			_.each(fns, function(fn) {
				if (fn) {
					return fn(arg1, arg2, arg3)
				}
			});
		}
	}

	NS.New = function(model,notify) {
		if(model.charAt(0) == '/'){
			model = model.substring(1);
		}
		
		var listeners = [], services = {
			create : 'services/' + model + '/single',
			update : 'services/' + model + '/single',
			get : 'services/' + model + '/{0}/{1}',
			find : 'services/' + model + '/single/{0}',
			remove : 'services/' + model + '/{0}/{1}',
			list : 'services/' + model + '/list',
			listPage : 'services/' + model + '/list/{0}/{1}',
		};

		function subscribe(listener) {
			listeners.push(listener);
			var isSubscribed = true;

			return function unsubscribe() {
				if (!isSubscribed) {
					return;
				}
				isSubscribed = false
				var index = listeners.indexOf(listener);
				listeners.splice(index, 1);
			}
		}

		function _dispatch(action) {
			_.each(listeners, function(listener) {
				listener(action);
			});
		}

		var method = function(method, type, notify, url, data, success, error) {
			if (_.isFunction(data)) {
				error = success;
				success = data;
				data = undefined;
			}
			return Resource.method(type, url, data, compose(type, function(data) {
				_dispatch({
					type : AT.SERVICE.SUCCESS,
					method : method,
					notify : notify,
					model : model,
					data : data
				});
			}, success), error);
		}

		function create(data, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			return method('create', 'post',true, url || services.create, data, success, error);
		}
		function update(data, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			return method('update', 'put', true, url || services.update, data, success, error);
		}
		function get(id, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			if(_.isArray(id)){
				return method('get', 'get',false, url || services.get.format('batach',_.join(id)) , success, error);
			}
			return method('get', 'get', false,url || services.get.format('single',id), success, error);
		}
		function find(id, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			return method('find', 'get',false, url || services.find.format(id), success, error);
		}
		function remove(id, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			if(_.isArray(id)){
				return method('remove', 'delete',true, url || services.remove.format('batach',_.join(id)), success, error);
			}
			return method('remove', 'delete',true, url || services.get.format('single',id), success, error);
		}
		function list(q, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			return method('list', 'get', false,url || services.list, q, success, error);
		}
		function listPage(page, pageSize, q, url ,success, error) {
			if (_.isFunction(url)) {
				error = success;
				success = url;
				url = undefined;
			}
			return method('listPage', 'get',false, url || services.listPage.format(page, pageSize), q, success, error);
		}
		function ready() {
			dispatch(AT.SERVICE.READY,undefined,'ready');
		}
		function init() {
			dispatch(AT.SERVICE.INIT,undefined,'init');
		}
		function refresh(/*page, pageSize, q*/) {
			if(arguments.length){
				dispatch(AT.SERVICE.REFRESH, {
					page : arguments[0],
					pageSize : arguments[1],
					q : arguments[2]
				},'refresh');
			}else {
				dispatch(AT.SERVICE.REFRESH,undefined,'refresh');
			}
		}
		function dispatch(type, data, method) {
			_dispatch({
				type : type,
				method : method,
				data : data
			});
		}
		
		if(notify || notify === undefined){
			listeners.push(function(action){
				action.notify && refresh();
			});
		}
		
		return {
			create : create,
			update : update,
			get : get,
			find : find,
			remove : remove,
			list : list,
			listPage : listPage,
			dispatch : dispatch,
			ready : ready,
			init : init,
			refresh : refresh,
			subscribe : subscribe
		};
	}
})($, Smart.Namespace, Smart.Resource, Smart.ActionTypes);