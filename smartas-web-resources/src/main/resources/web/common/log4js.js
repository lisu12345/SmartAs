+function() {
	var slice = Array.prototype.slice;
	
	Log.DEBUG = 1;
	Log.INFO = 2;
	Log.WARN = 3;
	Log.ERROR = 4;
	Log.FATAL = 5;
	Log.NONE = 6;

	var levels = {
		'debug' : Log.DEBUG,
		'info' : Log.INFO,
		'warn' : Log.WARN,
		'error' : Log.ERROR,
		'fatal' : Log.FATAL,
		'none' : Log.NONE
	}
	
	var method = ['','debug','info','warn','error','debug','']

	function format() {
		var args = arguments, length = args.length;
		return this.replace(new RegExp("{([0-9]+)}", "g"),
			function(str, index) {
				var value = args[index];
				return value !== undefined ? value : "";
			});
	}
	
	var consoleLogger = function(msg, level, levelStr, obj) {
		var console = window.console;
		var fn = method[level];
		if(fn) {
			console[fn](levelStr + ": " + msg);
		}
	}

	function Log(level, prefix) {
		var _currentLevel = Log.WARN;
		var _prefix = false;
		var _logger = consoleLogger;

		this.setPrefix = function(pre) {
			_prefix = pre || false;
		}

		this.setLevel = function(level) {
			_currentLevel = typeof level == 'number' ? level
					: (levels[level] !== undefined ? levels[level] : Log.NONE);
		}

		this.getPrefix = function() {
			return _prefix;
		}

		this.getLogger = function() {
			return _logger;
		}

		this.getLevel = function() {
			return _currentLevel;
		}

		level && this.setLevel(level);
		prefix && this.setPrefix(prefix);
	}
	
	var toString = function(obj){
		if(typeof obj !== 'string'){
			if(typeof obj === 'object'){
				return JSON.stringify(obj);
			}
			return obj.toString();
		}
		return obj;
	}

	Log.prototype.debug = function(s) {
		if (this.getLevel() <= Log.DEBUG) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(toString(s), args), Log.DEBUG, "DEBUG", this);
		}
	}
	Log.prototype.info = function(s) {
		if (this.getLevel() <= Log.INFO) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(toString(s), args), Log.INFO, "INFO ", this);
		}
	}
	Log.prototype.warn = function(s) {
		if (this.getLevel() <= Log.WARN) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(toString(s), args), Log.WARN,"WARN ", this);
		}
	}
	Log.prototype.error = function(s) {
		if (this.getLevel() <= Log.ERROR) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(toString(s), args), Log.ERROR,"ERROR", this);
		}
	}
	Log.prototype.fatal = function(s) {
		if (this.getLevel() <= Log.FATAL) {
			var args = slice.call(arguments, 1);
			this._log(format.apply(toString(s), args), Log.FATAL,"FATAL", this);
		}
	}

	Log.prototype._log = function(msg, level, levelStr,obj,e) {
		var log = this.getLogger()
		if (this.getPrefix()) {
			log(this.getPrefix() + " - " + msg, level, levelStr,obj,e);
		} else {
			log(msg, level,levelStr, obj,e);
		}
	}

	var config = {
		root : Log.WARN
	};

	Log.logger = function(pkg, level) {
		config[pkg] = level;
	}
	Log.root = function(level) {
		config.root = level;
	}

	// ///
	var getLevel = function(pkg) {
		do {
			var level = config[pkg];
			if (level) {
				return level;
			}
			pkg = pkg.substr(0, pkg.lastIndexOf("."));
		} while (pkg);
		return config.root;
	};

	Log.getLogger = function(pkg, logger) {
		return new Log(getLevel(pkg), pkg, logger);
	}
	window.Log = Log;
}();
