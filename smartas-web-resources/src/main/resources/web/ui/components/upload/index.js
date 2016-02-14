'use strict';

+(function (RC) {
	var Util = RC.Util;
	var warning = Util.warning;
	var uid = Util.uid;
	var _React = React;
	var PropTypes = _React.PropTypes;

	var empty = _.noop;

	function getError(option, xhr) {
		var msg = 'cannot post ' + option.action + ' ' + xhr.status + '\'';
		var err = new Error(msg);
		err.status = xhr.status;
		err.method = 'post';
		err.url = option.action;
		return err;
	}

	function getBody(xhr) {
		var text = xhr.responseText || xhr.response;
		if (!text) {
			return text;
		}

		try {
			return JSON.parse(text);
		} catch (e) {
			return text;
		}
	}

	function request(option) {
		if (typeof XMLHttpRequest === 'undefined') {
			return;
		}

		var xhr = new XMLHttpRequest();
		if (xhr.upload) {
			xhr.upload.onprogress = function progress(e) {
				if (e.total > 0) {
					e.percent = e.loaded / e.total * 100;
				}
				option.onProgress(e);
			};
		}

		var formData = new FormData();
		formData.append(option.filename, option.file);
		if (option.data) {
			Object.keys(option.data).map(function (key) {
				formData.append(key, option.data[key]);
			});
		}

		xhr.onerror = function error(e) {
			option.onError(e);
		};

		xhr.onload = function onload() {
			if (xhr.status !== 200) {
				return option.onError(getError(option, xhr), getBody(xhr));
			}

			option.onSuccess(getBody(xhr));
		};

		if (option.withCredentials && 'withCredentials' in xhr) {
			xhr.withCredentials = true;
		}

		xhr.open('post', option.action, true);
		xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		var headers = option.headers || {};
		for (var h in headers) {
			if (headers.hasOwnProperty(h)) {
				xhr.setRequestHeader(h, headers[h]);
			}
		}
		xhr.send(formData);
	}

	var iframeStyle = {
		position: 'absolute',
		top: 0,
		opacity: 0,
		filter: 'alpha(opacity=0)',
		left: 0,
		zIndex: 9999
	};
	var IframeUploader = React.createClass({
		displayName: 'IframeUploader',

		propTypes: {
			onStart: PropTypes.func,
			multiple: PropTypes.bool,
			children: PropTypes.any,
			data: PropTypes.object,
			action: PropTypes.string,
			name: PropTypes.string
		},

		componentDidMount: function componentDidMount() {
			this.updateIframeWH();
			this.initIframe();
		},
		componentDidUpdate: function componentDidUpdate() {
			this.updateIframeWH();
		},
		onLoad: function onLoad() {
			if (!this.loading) {
				return;
			}
			var props = this.props;
			var response = undefined;
			var eventFile = this.file;
			try {
				var doc = this.getIframeDocument();
				var script = doc.getElementsByTagName('script')[0];
				if (script && script.parentNode === doc.body) {
					doc.body.removeChild(script);
				}
				response = doc.body.innerHTML;
				props.onSuccess(response, eventFile);
			} catch (err) {
				warning(false, 'cross domain error for Upload. Maybe server should return document.domain script. see Note from https://github.com/react-component/upload');
				response = 'cross-domain';
				props.onError(err, null, eventFile);
			}
			this.enableIframe();
			this.initIframe();
		},
		onChange: function onChange() {
			var target = this.getFormInputNode();
			// ie8/9 don't support FileList Object
			// http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
			var file = this.file = {
				uid: uid(),
				name: target.value
			};
			this.props.onStart(this.getFileForMultiple(file));
			var formNode = this.getFormNode();
			var dataSpan = this.getFormDataNode();
			var data = this.props.data;
			if (typeof data === 'function') {
				data = data();
			}
			var inputs = [];
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					inputs.push('<input name="' + key + '" value="' + data[key] + '"/>');
				}
			}
			dataSpan.innerHTML = inputs.join('');
			formNode.submit();
			dataSpan.innerHTML = '';
			this.disabledIframe();
		},
		getIframeNode: function getIframeNode() {
			return this.refs.iframe;
		},
		getIframeDocument: function getIframeDocument() {
			return this.getIframeNode().contentDocument;
		},
		getFormNode: function getFormNode() {
			return this.getIframeDocument().getElementById('form');
		},
		getFormInputNode: function getFormInputNode() {
			return this.getIframeDocument().getElementById('input');
		},
		getFormDataNode: function getFormDataNode() {
			return this.getIframeDocument().getElementById('data');
		},
		getFileForMultiple: function getFileForMultiple(file) {
			return this.props.multiple ? [file] : file;
		},
		getIframeHTML: function getIframeHTML(domain) {
			var domainScript = '';
			var domainInput = '';
			if (domain) {
				domainScript = '<script>document.domain="' + domain + '";</script>';
				domainInput = '<input name="_documentDomain" value="' + domain + '" />';
			}
			return '\n\t    <!DOCTYPE html>\n\t    <html>\n\t    <head>\n\t    <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n\t    <style>\n\t    body,html {padding:0;margin:0;border:0;overflow:hidden;}\n\t    </style>\n\t    ' + domainScript + '\n\t    </head>\n\t    <body>\n\t    <form method="post"\n\t    encType="multipart/form-data"\n\t    action="' + this.props.action + '" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">\n\t    <input id="input" type="file"\n\t     name="' + this.props.name + '"\n\t     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>\n\t    ' + domainInput + '\n\t    <span id="data"></span>\n\t    </form>\n\t    </body>\n\t    </html>\n\t    ';
		},
		initIframeSrc: function initIframeSrc() {
			if (this.domain) {
				this.getIframeNode().src = 'javascript:void((function(){\n\t        var d = document;\n\t        d.open();\n\t        d.domain=\'' + this.domain + '\';\n\t        d.write(\'\');\n\t        d.close();\n\t      })())';
			}
		},
		initIframe: function initIframe() {
			var iframeNode = this.getIframeNode();
			var win = iframeNode.contentWindow;
			var doc = undefined;
			this.domain = this.domain || '';
			this.initIframeSrc();
			try {
				doc = win.document;
			} catch (e) {
				this.domain = document.domain;
				this.initIframeSrc();
				win = iframeNode.contentWindow;
				doc = win.document;
			}
			doc.open('text/html', 'replace');
			doc.write(this.getIframeHTML(this.domain));
			doc.close();
			this.getFormInputNode().onchange = this.onChange;
		},
		enableIframe: function enableIframe() {
			this.loading = false;
			this.getIframeNode().style.display = '';
		},
		disabledIframe: function disabledIframe() {
			this.loading = true;
			this.getIframeNode().style.display = 'none';
		},
		updateIframeWH: function updateIframeWH() {
			var rootNode = ReactDOM.findDOMNode(this);
			var iframeNode = this.getIframeNode();
			iframeNode.style.height = rootNode.offsetHeight + 'px';
			iframeNode.style.width = rootNode.offsetWidth + 'px';
		},
		render: function render() {
			return React.createElement(
				'span',
				{ style: { position: 'relative', zIndex: 0 } },
				React.createElement('iframe', { ref: 'iframe',
					onLoad: this.onLoad,
					style: iframeStyle }),
				this.props.children
			);
		}
	});

	var AjaxUpload = React.createClass({
		displayName: 'AjaxUpload',

		propTypes: {
			multiple: PropTypes.bool,
			onStart: PropTypes.func,
			data: PropTypes.object,
			headers: PropTypes.object,
			beforeUpload: PropTypes.func,
			withCredentials: PropTypes.bool
		},

		onChange: function onChange(e) {
			var files = e.target.files;
			this.uploadFiles(files);
		},
		onClick: function onClick() {
			var el = this.refs.file;
			if (!el) {
				return;
			}
			el.click();
			el.value = '';
		},
		onKeyDown: function onKeyDown(e) {
			if (e.key === 'Enter') {
				this.onClick();
			}
		},
		onFileDrop: function onFileDrop(e) {
			if (e.type === 'dragover') {
				return e.preventDefault();
			}

			var files = e.dataTransfer.files;
			this.uploadFiles(files);

			e.preventDefault();
		},
		uploadFiles: function uploadFiles(files) {
			var len = files.length;
			if (len > 0) {
				for (var i = 0; i < len; i++) {
					var file = files.item(i);
					file.uid = uid();
					this.upload(file);
				}
				if (this.props.multiple) {
					this.props.onStart(Array.prototype.slice.call(files));
				} else {
					this.props.onStart(Array.prototype.slice.call(files)[0]);
				}
			}
		},
		upload: function upload(file) {
			var _this = this;

			var props = this.props;
			if (!props.beforeUpload) {
				return this.post(file);
			}

			var before = props.beforeUpload(file);
			if (before && before.then) {
				before.then(function () {
					_this.post(file);
				});
			} else if (before !== false) {
				this.post(file);
			}
		},
		post: function post(file) {
			var props = this.props;
			var data = props.data;
			if (typeof data === 'function') {
				data = data();
			}

			request({
				action: props.action,
				filename: props.name,
				file: file,
				data: data,
				headers: props.headers,
				withCredentials: props.withCredentials,
				onProgress: function onProgress(e) {
					props.onProgress(e, file);
				},
				onSuccess: function onSuccess(ret) {
					props.onSuccess(ret, file);
				},
				onError: function onError(err, ret) {
					props.onError(err, ret, file);
				}
			});
		},
		render: function render() {
			var hidden = { display: 'none' };
			var props = this.props;
			return React.createElement(
				'span',
				{
					onClick: this.onClick,
					onKeyDown: this.onKeyDown,
					onDrop: this.onFileDrop,
					onDragOver: this.onFileDrop,
					role: 'button',
					tabIndex: '0'
				},
				React.createElement('input', { type: 'file',
					ref: 'file',
					style: hidden,
					accept: props.accept,
					multiple: this.props.multiple,
					onChange: this.onChange }),
				props.children
			);
		}
	});

	var Upload = React.createClass({
		displayName: 'Upload',

		propTypes: {
			forceAjax: PropTypes.bool,
			action: PropTypes.string,
			name: PropTypes.string,
			multipart: PropTypes.bool,
			onError: PropTypes.func,
			onSuccess: PropTypes.func,
			onProgress: PropTypes.func,
			onStart: PropTypes.func,
			data: PropTypes.object,
			headers: PropTypes.object,
			accept: PropTypes.string,
			multiple: PropTypes.bool,
			beforeUpload: PropTypes.func,
			withCredentials: PropTypes.bool
		},

		getDefaultProps: function getDefaultProps() {
			return {
				data: {},
				headers: {},
				name: 'file',
				forceAjax: false,
				multipart: false,
				onProgress: empty,
				onStart: empty,
				onError: empty,
				onSuccess: empty,
				multiple: false,
				beforeUpload: null,
				withCredentials: false
			};
		},
		render: function render() {
			var props = this.props;
			// node 渲染根据 ua 强制设置 forceAjax 或者支持FormData的情况使用AjaxUpload
			if (props.forceAjax || typeof FormData !== 'undefined') {
				return React.createElement(AjaxUpload, props);
			}

			return React.createElement(IframeUpload, props);
		}
	});

	RC.Upload = Upload;
})(Smart.RC);