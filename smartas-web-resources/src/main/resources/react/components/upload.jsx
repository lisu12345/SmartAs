+ function(RC) {
	const {Util} = RC, 
		{warning,uid} = Util, 
		{PropTypes} = React;
	const empty = _.noop;

	function getError(option, xhr) {
	  const msg = `cannot post ${option.action} ${xhr.status}'`;
	  const err = new Error(msg);
	  err.status = xhr.status;
	  err.method = 'post';
	  err.url = option.action;
	  return err;
	}

	function getBody(xhr) {
	  const text = xhr.responseText || xhr.response;
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

	  const xhr = new XMLHttpRequest();
	  if (xhr.upload) {
	    xhr.upload.onprogress = function progress(e) {
	      if (e.total > 0) {
	        e.percent = e.loaded / e.total * 100;
	      }
	      option.onProgress(e);
	    };
	  }

	  const formData = new FormData();
	  formData.append(option.filename, option.file);
	  if (option.data) {
	    Object.keys(option.data).map(key => {
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
	  const headers = option.headers || {};
	  for (const h in headers) {
	    if (headers.hasOwnProperty(h)) {
	      xhr.setRequestHeader(h, headers[h]);
	    }
	  }
	  xhr.send(formData);
	}

	const iframeStyle = {
	  position: 'absolute',
	  top: 0,
	  opacity: 0,
	  filter: 'alpha(opacity=0)',
	  left: 0,
	  zIndex: 9999,
	};
	const IframeUploader = React.createClass({
	  propTypes: {
	    onStart: PropTypes.func,
	    multiple: PropTypes.bool,
	    children: PropTypes.any,
	    data: PropTypes.object,
	    action: PropTypes.string,
	    name: PropTypes.string,
	  },

	  componentDidMount() {
	    this.updateIframeWH();
	    this.initIframe();
	  },

	  componentDidUpdate() {
	    this.updateIframeWH();
	  },

	  onLoad() {
	    if (!this.loading) {
	      return;
	    }
	    const props = this.props;
	    let response;
	    const eventFile = this.file;
	    try {
	      const doc = this.getIframeDocument();
	      const script = doc.getElementsByTagName('script')[0];
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

	  onChange() {
	    const target = this.getFormInputNode();
	    // ie8/9 don't support FileList Object
	    // http://stackoverflow.com/questions/12830058/ie8-input-type-file-get-files
	    const file = this.file = {
	      uid: uid(),
	      name: target.value,
	    };
	    this.props.onStart(this.getFileForMultiple(file));
	    const formNode = this.getFormNode();
	    const dataSpan = this.getFormDataNode();
	    let data = this.props.data;
	    if (typeof data === 'function') {
	      data = data();
	    }
	    const inputs = [];
	    for (const key in data) {
	      if (data.hasOwnProperty(key)) {
	        inputs.push(`<input name="${key}" value="${data[key]}"/>`);
	      }
	    }
	    dataSpan.innerHTML = inputs.join('');
	    formNode.submit();
	    dataSpan.innerHTML = '';
	    this.disabledIframe();
	  },

	  getIframeNode() {
	    return this.refs.iframe;
	  },

	  getIframeDocument() {
	    return this.getIframeNode().contentDocument;
	  },

	  getFormNode() {
	    return this.getIframeDocument().getElementById('form');
	  },

	  getFormInputNode() {
	    return this.getIframeDocument().getElementById('input');
	  },

	  getFormDataNode() {
	    return this.getIframeDocument().getElementById('data');
	  },

	  getFileForMultiple(file) {
	    return this.props.multiple ? [file] : file;
	  },

	  getIframeHTML(domain) {
	    let domainScript = '';
	    let domainInput = '';
	    if (domain) {
	      domainScript = `<script>document.domain="${domain}";</script>`;
	      domainInput = `<input name="_documentDomain" value="${domain}" />`;
	    }
	    return `
	    <!DOCTYPE html>
	    <html>
	    <head>
	    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
	    <style>
	    body,html {padding:0;margin:0;border:0;overflow:hidden;}
	    </style>
	    ${domainScript}
	    </head>
	    <body>
	    <form method="post"
	    encType="multipart/form-data"
	    action="${this.props.action}" id="form" style="display:block;height:9999px;position:relative;overflow:hidden;">
	    <input id="input" type="file"
	     name="${this.props.name}"
	     style="position:absolute;top:0;right:0;height:9999px;font-size:9999px;cursor:pointer;"/>
	    ${domainInput}
	    <span id="data"></span>
	    </form>
	    </body>
	    </html>
	    `;
	  },

	  initIframeSrc() {
	    if (this.domain) {
	      this.getIframeNode().src = `javascript:void((function(){
	        var d = document;
	        d.open();
	        d.domain='${this.domain}';
	        d.write('');
	        d.close();
	      })())`;
	    }
	  },

	  initIframe() {
	    const iframeNode = this.getIframeNode();
	    let win = iframeNode.contentWindow;
	    let doc;
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

	  enableIframe() {
	    this.loading = false;
	    this.getIframeNode().style.display = '';
	  },

	  disabledIframe() {
	    this.loading = true;
	    this.getIframeNode().style.display = 'none';
	  },

	  updateIframeWH() {
	    const rootNode = ReactDOM.findDOMNode(this);
	    const iframeNode = this.getIframeNode();
	    iframeNode.style.height = rootNode.offsetHeight + 'px';
	    iframeNode.style.width = rootNode.offsetWidth + 'px';
	  },

	  render() {
	    return (
	      <span style={{position: 'relative', zIndex: 0}}>
	        <iframe ref="iframe"
	                onLoad={this.onLoad}
	                style={iframeStyle}/>
	        {this.props.children}
	      </span>
	    );
	  },
	});


	const AjaxUpload = React.createClass({
	  propTypes: {
	    multiple: PropTypes.bool,
	    onStart: PropTypes.func,
	    data: PropTypes.object,
	    headers: PropTypes.object,
	    beforeUpload: PropTypes.func,
	    withCredentials: PropTypes.bool,
	  },

	  onChange(e) {
	    const files = e.target.files;
	    this.uploadFiles(files);
	  },

	  onClick() {
	    const el = this.refs.file;
	    if (!el) {
	      return;
	    }
	    el.click();
	    el.value = '';
	  },

	  onKeyDown(e) {
	    if (e.key === 'Enter') {
	      this.onClick();
	    }
	  },

	  onFileDrop(e) {
	    if (e.type === 'dragover') {
	      return e.preventDefault();
	    }

	    const files = e.dataTransfer.files;
	    this.uploadFiles(files);

	    e.preventDefault();
	  },

	  uploadFiles(files) {
	    const len = files.length;
	    if (len > 0) {
	      for (let i = 0; i < len; i++) {
	        const file = files.item(i);
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

	  upload(file) {
	    const props = this.props;
	    if (!props.beforeUpload) {
	      return this.post(file);
	    }

	    const before = props.beforeUpload(file);
	    if (before && before.then) {
	      before.then(() => {
	        this.post(file);
	      });
	    } else if (before !== false) {
	      this.post(file);
	    }
	  },

	  post(file) {
	    const props = this.props;
	    let data = props.data;
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
	      onProgress: e => {
	        props.onProgress(e, file);
	      },
	      onSuccess: ret => {
	        props.onSuccess(ret, file);
	      },
	      onError: (err, ret) => {
	        props.onError(err, ret, file);
	      },
	    });
	  },

	  render() {
	    const hidden = {display: 'none'};
	    const props = this.props;
	    return (
	      <span
	        onClick={this.onClick}
	        onKeyDown={this.onKeyDown}
	        onDrop={this.onFileDrop}
	        onDragOver={this.onFileDrop}
	        role="button"
	        tabIndex="0"
	        >
	        <input type="file"
	               ref="file"
	               style={hidden}
	               accept={props.accept}
	               multiple={this.props.multiple}
	               onChange={this.onChange}/>
	        {props.children}
	      </span>
	    );
	  },
	});



	const Upload = React.createClass({
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
	    withCredentials: PropTypes.bool,
	  },

	  getDefaultProps() {
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
	      withCredentials: false,
	    };
	  },

	  render() {
	    const props = this.props;
	    // node 渲染根据 ua 强制设置 forceAjax 或者支持FormData的情况使用AjaxUpload
	    if (props.forceAjax || typeof FormData !== 'undefined') {
	      return <AjaxUpload {...props} />;
	    }

	    return <IframeUpload {...props} />;
	  },
	});

	RC.Upload = Upload;
}(Smart.RC)