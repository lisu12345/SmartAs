+function() {
	// 格式化字符串
	String.prototype.format = function() {
		var args = arguments, length = args.length;
		return this.replace(new RegExp("{([0-9]+)}", "g"),
				function(str, index) {
					var value = args[index];
					return value !== undefined ? value : "";
				});
	}
	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
	// 例子： 
	// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
	// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
	Date.prototype.format = function (fmt) {
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}

	this.Smart || +function() {
		function isType(type) {
			return function(obj) {
				return {}.toString.call(obj) == "[object " + type + "]"
			}
		}
		
		function setValue(object, path, value) {
            var paths = path.split('.');
            //Immutable.Iterable.isIterable(result)
            /*return object.updateIn(paths,function(object){
            	return value;
            });*/
            var o = object;
            for (var i = 0; i < paths.length - 1; i++) {
                var n = paths[i];
                if (n in o) {
                    o = o[n];
                } else {
                    o[n] = {};
                    o = o[n];
                }
            }
            o[paths[paths.length - 1]] = value;
        }

        function getValue(object, path,def) {
        	/*var paths = path.split('.');
        	return object.getIn(paths);*/
        	
            var o = object;
            var paths = path.split('.');
            while (paths.length) {
                var n = paths.shift();
                o = o[n];
                if(o === undefined){
                   return def;
                }
            }
            return o;
        }
        this.Smart = {
    			isObject : isType("Object"),
    			isString : isType("String"),
    			isArray : Array.isArray || isType("Array"),
    			isFunction : isType("Function"),
    			isUndefined : isType("Undefined"),
    			setValue : setValue,
    			getValue : getValue
    		}
		
	}();
	
	
	var LTT = this.LTT = (function() {
	    LTT.prototype.groupParent = [];

	    LTT.prototype.key_id = 'id';

	    LTT.prototype.key_parent = 'parentId';

	    LTT.prototype.key_child = 'children';

	    LTT.prototype.options = {};

	    function LTT(list, options) {
	        this.list = list;
	        this.options = options != null ? options : {};
	        this.ParseOptions();
	        var key_child = this.options.key_child;
	        this.list = _.map(this.list,function(item){
	        	return _.omit(item,[key_child]);
	        });
	        this.groupParent = _.uniq(_.map(this.list, this.key_parent));
	        return this;
	    }

	    LTT.prototype.ParseOptions = function() {
	        if (this.options.key_id != null) {
	            this.key_id = this.options.key_id;
	        }
	        if (this.options.key_parent != null) {
	            this.key_parent = this.options.key_parent;
	        }
	        if (this.options.key_child != null) {
	            this.key_child = this.options.key_child;
	        }
	    };

	    LTT.prototype.GetParentItems = function(parent) {
	        var item, result, _i, _len, _ref;
	        result = [];
	        _ref = this.list;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            item = _ref[_i];
	            if (item[this.key_parent] === parent) {
	                result.push(item);
	            }
	        }
	        return result;
	    };

	    LTT.prototype.GetItemById = function(id) {
	        var item, _i, _len, _ref;
	        _ref = this.list;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            item = _ref[_i];
	            if (item[this.key_id] === id) {
	                return item;
	            }
	        }
	        return false;
	    };

	    LTT.prototype.GetTree = function() {
	        var child, i, obj, parentId, result, _i, _j, _len, _len1, _ref;
	        result = [];
	        _ref = this.groupParent;
	        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	            parentId = _ref[_i];
	            obj = this.GetItemById(parentId);
	            child = this.GetParentItems(parentId);
	            if (obj === false) {
	                for (_j = 0, _len1 = child.length; _j < _len1; _j++) {
	                    i = child[_j];
	                    result.push(i);
	                }
	            } else {
	                obj[this.key_child] = child;
	            }
	        }
	        return result;
	    };
	    return LTT;
	})();
	
	this.l2t = function(list, options){
    	return new LTT(list, options).GetTree();
    };
}.call(window);