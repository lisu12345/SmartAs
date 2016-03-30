+function() {
	var SN = 1;
	// 1、命名空间注册工具类
	var Namespace = {
		register : function(path) {
			if (!path) {
				return window;
			}
			var packages = path.split(".");
			var root = window;
			for (var i = 0, length = packages.length; i < length; i++) {
				root = root[packages[i]] || (root[packages[i]] = {
					__sn__ : 'pkg-sn-' + SN++
				});
			}
			return root;
		},

		pkg : function(path) {
			if (!path) {
				return null;
			}
			var packages = path.split(".");
			var root = window, parent = null;
			for (var i = 0, length = packages.length; i < length; i++) {
				parent = root;
				root = root[packages[i]];
				if (!root) {
					return null;
				}
			}
			return {
				pkg : root,
				parent : parent,
				name : packages[packages.length - 1]
			};
		}
	}

	$.extend(Namespace.register("Smart.Namespace"), Namespace);

}();

+function(Namespace, _) {
	var _prefix = 'ID_';

	function EventBus(name, ready) {
		this.name = name;
		this.ready = ready || false;
		this.watchers = {};
	}

	EventBus.prototype.on = function(name, fn) {
		if (fn === undefined) {
			fn = name;
			name = 'defualt';
		}

		var list = this.watchers[name] || (this.watchers[name] = []);
		list.push(fn);
		if (this.ready) {
			fn();
		}
	};

	EventBus.prototype.fire = function(name, payload) {
		name = name || 'defualt';
		_.each(this.watchers[name], function(fn) {
			fn(payload);
		});
	};

	var NS = Namespace.register("Smart.EventBus");
	NS.New = function(name, ready) {
		return new EventBus(name, ready);
	};
}(Smart.Namespace, _);
+function(Namespace) {
	var AT = Namespace.register("Smart.ActionTypes");
	AT.LINK = {
		INPUT_CHANGE : '$$LINK_INPUT_CHANGE'
	}
	AT.SERVICE = {
		SUCCESS : '$$SERVICE_SUCCESS',
		ERROR : '$$SERVICE_ERROR',
		READY : '$$SERVICE_READY',
		REFRESH : '$$SERVICE_REFRESH',
		INIT : '$$SERVICE_INIT',
	}
}(Smart.Namespace);
(function($, Namespace, AT) {
	var logger = Log.getLogger("core.store");
	function thunkMiddleware(_ref) {
		var dispatch = _ref.dispatch;
		var getState = _ref.getState;

		return function(next) {
			return function(action) {
				return typeof action === 'function' ? action(dispatch, getState) : next(action);
			};
		};
	}
	// ReactRedux
	var finalCreateStore = Redux.applyMiddleware(thunkMiddleware)(Redux.createStore);
	var store = finalCreateStore(_.identity, Immutable.fromJS({
		global : {
				user : {
					userName : 'chenjpu'
				}
			}
		})
	);

	/*var compose = function() {
		var fns = arguments;
		return function(state, action) {
			_.each(fns, function(fn) {
				state = fn(state, action)
			});
			return state;
		}
	};*/

	var defaultReducers = {
		$$LINK_INPUT_CHANGE : function(data, action) {
			//Immutable.Iterable.isIterable(result)
            return data.updateIn(action.key.split('.'),function(object){
            	if (action.input === 'radio' || action.input === 'checkbox') {
    				return action.checked ? action.value : ''
    			} else {
    				return action.value
    			};
            });
		}
	};

	function defaultGlobal(global, action) {
		return global;
	}
	
	function isDomainMap(map) {
	    return _.every(map, _.isPlainObject);
	}
	function isActionMap(map) {
		return _.every(map, _.isFunction);
	}

	function getStore() {
		return store;
	}
	function getState() {
		return store.getState();
	}
	
	/**
	 * @param {Object}
	 *            domain
	 * @param {Object}
	 *            action
	 * @param {string}
	 *            action.name
	 * @param {Object}
	 *            collection
	 * @param {Object}
	 *            tapper
	 * @return {Object}
	 */
	var iterator = function(domain, action, collection, tapper){
	    var newDomain;

	    /*if (!Immutable.Iterable.isIterable(domain)) {
	        throw new Error('Domain must be an instance of Immutable.Iterable.');
	    }*/
	    newDomain = domain;
	    _.forEach(collection, function(value, domainName) {
	        if (isActionMap(value)) {
	            if (value[action.type]) {
	            	tapper.isActionHandled = true;
	            	
	                /*var result = value[action.type](newDomain[domainName] || {}, action);
	                if(result !== newDomain[domainName]){
	                	newDomain = _.extend({},newDomain);
		                newDomain[domainName] = result;
	                }
	                return newDomain;*/
	                
	            	var result = value[action.type](newDomain.get(domainName) || Immutable.Map({}), action);
	                if (!Immutable.Iterable.isIterable(result)) {
	                    throw new Error('Reducer must return an instance of Immutable.Iterable. "' + domainName + '" domain "' + action.name + '" action handler result is "' + typeof result + '".');
	                }
	                newDomain = newDomain.set(domainName, result);
	            }
	        } else if (isDomainMap(value)) {
	            newDomain = newDomain.set(domainName, iterator(newDomain.get(domainName) || Immutable.Map({}), action, value, tapper));
	        	/*var result = iterator(newDomain[domainName] || {}, action, value, tapper);
	        	if(result !== newDomain[domainName]){
                	newDomain = _.extend({},newDomain);
	                newDomain[domainName] = result;
                }
	        	return newDomain;*/
	        }
	    });

	    return newDomain;
	};
	
	function combineReducers(reducer,namespace){
	    // validateReducer(reducer);
		var collection = {},defaultCollection = {};
		collection['global'] = defaultGlobal;
		collection[namespace] = reducer;
		defaultCollection[namespace] = defaultReducers;
		
	    /**
		 * @param {Immutable.Iterable}
		 *            state
		 * @param {Object}
		 *            action
		 * @return {Immutable.Iterable}
		 */
	    function reducers(state, action) {
	        var newState,
	            tapper;

	        if (!action) {
	            throw new Error('Action parameter value must be an object.');
	        }
	        if (action.type && action.type.indexOf('@@') === 0) {
	            return state;
	        }

	        // validateAction(action);

	        // Tapper is an object that tracks execution of the action.
	        // @todo Make this an opt-in.
	        tapper = {
	            isActionHandled: false
	        };
	        newState = iterator(state, action, collection, tapper);
	        //如果自定义reducers没有处理
	        if(!tapper.isActionHandled && action.type && action.type.indexOf('$$') === 0){
	        	newState = iterator(newState, action, defaultCollection, tapper);
	        }
	        if (!tapper.isActionHandled && action.type !== 'CONSTRUCT') {
	        	logger.warn("Unhandled action '{0}'.",action.type);
	        }
	        return newState;
	    };
		return function(state, action) {
			
			return reducers(state,action);
			
			/*var localState = Immutable.Map({global:state.global,namespace : state[namespace] || Immutable.Map({})});
			var localState = reducers({global:state.global,namespace : state[namespace] || {}}, action);
			if(localState.global !== state['global'] || localState.namespace !== state[namespace]){
				var result =  _.extend({}, state);
				//_local['global'] = _localState.get('global');
				//_local[namespace] = _localState.get('namespace');
				
				result['global'] = localState.global;
				result[namespace] = localState.namespace;
				return result;
			}
			return state; */
		}
	};

	 

	function replaceReducer(reducers, ns) {
		store.replaceReducer(combineReducers(reducers, ns));
		return store;
	}
	
	function link(key,local){
		return {
			value: local.getIn(key),
			requestChange: function(value, checked, input) {
				store.dispatch({
					type: AT.LINK.INPUT_CHANGE,
					key: key,
					value: value,
					input: input || 'input',
					checked : checked
				});
			}
		};
	}
	
	function linkState(key) {
		 return link(key,this.props.local)
	}
	
	var ImmutableMethod = {
		get:function(key){
			return this.get(key)
		},
		getIn:function(key){
			return this.getIn(key.split('.'));
		}
	};
	
	function connect(namespace) {
		return function(actions) {
			return ReactRedux.connect(function(state) {
				var ns = state.get(namespace) || Immutable.Map({}), global = state.get('global');
				//return _.extend({},ns?ns.toJS():{},{global:global.toJS()});
				var getIn = _.bind(ImmutableMethod.getIn,ns);
				var get = _.bind(ImmutableMethod.get,ns);
				var local = {
						get : get,
						getIn : getIn
				};
				return {
					get : get,
					getIn : getIn,
					linkState : function(key){return link(key,local)},
					local : local,
					global : {
						get : _.bind(ImmutableMethod.get,global),
						getIn : _.bind(ImmutableMethod.getIn,global)
					}
				}
			}, actions, null, {
				withRef : true
			});
		}
	}

	_.extend(Namespace.register("Smart.Store"), {
		getStore : getStore,
		getState : getState,
		replaceReducer : replaceReducer,
		linkState : linkState,
		connect : connect
	});

})($, Smart.Namespace, Smart.ActionTypes);
(function($, Namespace, EventBus, Store) {
	// Bind an event handler.
	var logger = Log.getLogger("core.resource.control");
	var context = $("#content"), lifecycle = EventBus.New(true), qs = {}, info = Env.getInfo();
	var script = info.profile == 'dev' ? 'babel' : 'javascript'
	function $S(selector) {
		return $(selector, context);
	}
	
	
	$.ajaxSetup({
		cache : false,
	});
	
	//context.ajaxError(function(event,request, settings){
	     //$(this).append("<li>出错页面:" + settings.url + "</li>");
		 //alert("出错页面:" + settings.url);
	//});
	$.fn.include = function(url, params, callback) {
		// .处理url中?参数
		var index = url.indexOf('?'), self = this;
		if (index >= 0) {
			url = url.substr(0, index);
		}
		if ($.isFunction(params)) {
			callback = params;
			params = undefined;
		}

		if (!url) {
			logger.warn("request url is emtpy");
			callback && callback();
			return;
		}

		logger.debug("request url '{0}'", url);
		return Resource.ajax({
			beforeSend: function(xhr) {
			    xhr.setRequestHeader("X-Requested-URL", url);
			},
			//cache : false,
			type : 'get',
			url : url,
			dataType : 'html',
			data : params,
			success : function(data) {
				// 1.回调
				callback && callback();
				var start = data.indexOf('/*[['), end = data.indexOf(']]*/');
				// 处理资源
				if (start >= 0 && end > 0) {
					var imports = _.split(data.substring(start + 4, end),'\n');
					var html = [];
					for(var i = 0,length = imports.length; i <= length; i++){
						var src = _.trim(imports[i]);
						if(_.startsWith(src,'import ')){
							src = _.trim(src.substr(7),' "');
							html.push('<script type="text/{0}" src="{1}" />'.format(script,src))
						}
					}
					html.push('<script type="text/{0}">'.format(script))
					html.push(data.substr(end + 4));
					html.push('</script>');
					data = html.join("");
				}
				try{
					// 2.加载资源
					var page = $(data);
					logger.info("apply html segment to dom ");
					self.html(page);
					// .3初始化
					self.trigger('changed.dom');
				}catch(e){
					logger.error("apply html {0}",e);
					throw e;
				}
				
			},
		});
	};

	var Resource = (function() {
		var resources = {};
		// 加载资源
		var install = function(namespace, define) {
			var pkg = Namespace.register(namespace);
			logger.info("install package '{0}({1})'", namespace, pkg.__sn__);
			var eventBus = pkg.eventBus || (pkg.eventBus = EventBus.New(namespace));
			define.call(pkg, $S, context[0]);

			var node = pkg.ready && pkg.ready(Store.connect(namespace));
			if (node) {
				if (!node.WrappedComponent) {
					node = Store.connect(namespace)(pkg.actions)(node);
				}
				var reducers = pkg.reducers && pkg.reducers();
				var store = Store.replaceReducer(reducers, namespace);
				ReactDOM.render(React.createElement(ReactRedux.Provider, {
					store : store
				}, React.createElement(node, {
					qs : Resource.getQs(),
					link : function(){
						
					}
				})), context[0]);
			}
			resources[namespace] = pkg;
		};
		// 卸载资源
		var uninstall = function(namespace) {
			var pkgs = namespace ? {
				namespace : null
			} : resources;
			$.each(pkgs, function(ns) {
				var pkgInfo = Namespace.pkg(ns);
				// 命名空间
				if (pkgInfo && pkgInfo.parent) {
					logger.info("uninstall package '{0}({1})'", ns, pkgInfo.pkg.__sn__);
					delete pkgInfo.parent[pkgInfo.name];
				}
				delete pkgs[ns];
			});

		};
		// 对外暴露的接口

		var request = function(options) {
			lifecycle.fire('before');
			var data = options.data,type = options.type
			if ((type == 'put' || type == 'post') && data && !_.isString(data)) {
				options.data = JSON.stringify(data)
			}
			options.contentType || (options.contentType = "application/json");
			var complete = options.complete;
			options.statusCode = {
				403:function(){
					 Smart.UI.message.error('无权操作');
				},
				400:function(request){
					
				}
			}
			options.complete = function(request, code) {
				try {
					var status = request.getResponseHeader("X-Session-Status");
			        if(status == "timeout"){ 
			        	options.complete = complete;
			        	lifecycle.fire('timeout',options);
			        }else if(code === 'error'){
			        	 var vo = request.responseJSON;
			        	 if(vo){
			        		 if(vo.stackTrace){
								logger.error(vo.stackTrace);
							 }
			        		 Smart.UI.message.error(vo.message);
			        	 }else{
			        		 //Smart.UI.message.error(request.statusText);
			        	 }
			        } 
					complete && complete(request, code);
				} finally {
					lifecycle.fire('after');
				}
			}
			return $.ajax(options);
		}

		var method = function(type, url, data, success, error) {
			if (_.isFunction(data)) {
				error = success;
				success = data;
				data = undefined;
			}
			var options = {
				type : type,
				url : url,
				data : data,
				success : success,
				error : error
			};
			return request(options);
		}

		return {
			before : function(fn) {
				lifecycle.on('before', fn);
			},
			after : function(fn) {
				lifecycle.on('after', fn);
			},
			on : function(event,fn){
				lifecycle.on(event, fn);
			},
			fire : function(event,payload){
				lifecycle.fire(event,payload);
			},
			getQs : function(reqs) {
				if (reqs) {
					var hash = location.hash;
					return Qs.parse(hash.substr(hash.indexOf('?') + 1))
				}
				return qs;
			},
			install : install,
			uninstall : uninstall,
			getCurrentUrl : function() {
				return Resource.hash;
			},
			ajax : request,
			method : method,
			get : function(url, data, success, error) {
				return method('get', url, data, success, error);
			},
			post : function(url, data, success, error) {
				return method('post', url, data, success, error);
			},
			put : function(url, data, success, error) {
				return method('put', url, data, success, error);
			},
			del : function(url, data, success, error) {
				return method('delete', url, data, success, error);
			}
		};
	})();

	$.extend(Namespace.register("Smart.Resource"), Resource);

	window.install = Resource.install;

	Resource.before(function() {
		ZENG.msgbox.show('正在加载中，请稍后...', 6);
	});
	Resource.after(function() {
		ZENG.msgbox.hide();
	});

	$(window).hashchange(function(e) {
		var hash = location.hash,xhr;
		Resource.hash = hash;
		qs = Qs.parse(hash.substr(hash.indexOf('?') + 1));
		// TODO：处理请求参数
		xhr = context.include(hash.substr(2), function() {
			// 卸载已经加载的资源
			ReactDOM.unmountComponentAtNode(context[0]);
			Resource.uninstall();
		});
	});
})($, Smart.Namespace, Smart.EventBus, Smart.Store);

(function($, Namespace, Resource) {

	var NS = Namespace.register("Smart.DataSource");

	NS.New = function(model, eventBus, options) {
		return new DataSource(model, eventBus, options);
	}

	var DataSource = function(model, eventBus, options) {
		this.model = model;
		this.eventBus = eventBus;
		this.options = options || {
			services : {
				create : 'services/' + model + '/single',
				update : 'services/' + model + '/single',
				get : 'services/' + model + '/single/{0}',
				del : 'services/' + model + '/single/{0}',
				listAll : 'services/' + model + '/list',
				listPage : 'services/' + model + '/list/{0}/{1}',
			}
		};

		if (this.options.services) {

		}
	}

	DataSource.prototype.get = function(id) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.get(services.get.format(id));

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('get', data);
		});
		return qwest
	};

	DataSource.prototype.del = function(id) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.del(services.del.format(id));

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});

		qwest.then(function(data) {
			eventBus.fire('refresh', data);
		});
		return qwest
	};

	DataSource.prototype.create = function(data) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.post(services.create, data);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('refresh', data);
		});
		return qwest
	};

	DataSource.prototype.update = function(data) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.put(services.update, data);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('refresh', data);
		});
		return qwest
	};

	DataSource.prototype.listPage = function(page, pageSize, params) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.get(services.listPage.format(page, pageSize), params);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('list', data);
		});
		return qwest
	}

	DataSource.prototype.listAll = function(params) {
		var services = this.options.services, eventBus = this.eventBus, stacks = {
			'then' : [],
			'fail' : [],
			'done' : []
		}, promises = [ 'then', 'fail', 'done' ], req = null,

		qwest = function() {
			req = Resource.get(services.listAll, params);

			_.each(promises, function(p) {
				req[p](function(res) {
					_.each(stacks[p], function(func) {
						func(res)
					});
				})
			});
			return qwest
		}
		_.each(promises, function(p) {
			qwest[p] = function(func) {
				stacks[p].push(func)
				return qwest
			}
		});
		qwest.then(function(data) {
			eventBus.fire('list', data);
		});
		return qwest
	};

	DataSource.prototype.refresh = function(func) {
		this.eventBus.fire('refresh');
		return this;
	};

	DataSource.prototype.onRefresh = function(func) {
		this.eventBus.on('refresh', func);
		return this;
	};

	DataSource.prototype.onList = function(func) {
		this.eventBus.on('list', func);
		return this;
	};

	DataSource.prototype.onGet = function(func) {
		this.eventBus.on('get', func);
		return this;
	};

})($, Smart.Namespace, Smart.Resource);
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