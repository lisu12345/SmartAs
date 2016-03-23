+ function(UI,RC) {
  const {Upload,Animate} = RC,
    {assign,noop} = _,
    {Icon,Progress} = UI,
    {Line} = Progress;


  const prefixCls = 'ant-upload';

  function getFileItem(file, fileList) {
    let matchWay = (!file.uid) ? 'byName' : 'byUid';
    let target = fileList.filter((item) => {
      if (matchWay === 'byName') {
        return item.name === file.name;
      }
      return item.uid === file.uid;
    })[0];
    return target;
  }


  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  const previewFile = function(file, callback) {
    const reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const UploadList = React.createClass({
    getDefaultProps() {
      return {
        listType: 'text',  // or picture
        items: [],
        progressAttr: {
          strokeWidth: 3,
          showInfo: false
        }
      };
    },
    handleClose(file) {
      this.props.onRemove(file);
    },
    componentDidUpdate() {
      if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
        return;
      }
      this.props.items.forEach(file => {
        if (typeof document === 'undefined' ||
            typeof window === 'undefined' ||
            !window.FileReader || !window.File ||
            !(file.originFileObj instanceof File) ||
            file.thumbUrl !== undefined) {
          return;
        }
        /*eslint-disable */
        file.thumbUrl = '';
        /*eslint-enable */
        previewFile(file.originFileObj, (previewDataUrl) => {
          /*eslint-disable */
          file.thumbUrl = previewDataUrl;
          /*eslint-enable */
          this.forceUpdate();
        });
      });
    },
    render() {
      let list = this.props.items.map(file => {
        let progress;
        let icon = <Icon type="paper-clip" />;

        if (this.props.listType === 'picture' || this.props.listType === 'picture-card') {
          if (file.status === 'uploading' || (!file.thumbUrl && !file.url)) {
            if (this.props.listType === 'picture-card') {
              icon = <div className={`${prefixCls}-list-item-uploading-text`}>文件上传中</div>;
            } else {
              icon = <Icon className={`${prefixCls}-list-item-thumbnail`} type="picture" />;
            }
          } else {
            icon = (<a className={`${prefixCls}-list-item-thumbnail`}
              href={file.url}
              target="_blank"><img src={file.thumbUrl || file.url} alt={file.name} /></a>
            );
          }
        }

        if (file.status === 'uploading') {
          progress = (
            <div className={`${prefixCls}-list-item-progress`}>
              <Line {...this.props.progressAttr} percent={file.percent} />
            </div>
          );
        }
        const infoUploadingClass = classNames({
          [`${prefixCls}-list-item`]: true,
          [`${prefixCls}-list-item-${file.status}`]: true,
        });
        return (
          <div className={infoUploadingClass} key={file.uid}>
            <div className={`${prefixCls}-list-item-info`}>
              {icon}
              <span className={`${prefixCls}-list-item-name`}>{file.name}</span>
              {
                this.props.listType === 'picture-card' && file.status !== 'uploading'
                ? (
                  <span>
                    <a href={file.url} target="_blank" style={{ pointerEvents: file.url ? '' : 'none' }}><Icon type="eye-o" /></a>
                    <Icon type="delete" onClick={this.handleClose.bind(this, file)} />
                  </span>
                ) : <Icon type="cross" onClick={this.handleClose.bind(this, file)} />
              }
            </div>
            { progress }
          </div>
        );
      });
      const listClassNames = classNames({
        [`${prefixCls}-list`]: true,
        [`${prefixCls}-list-${this.props.listType}`]: true,
      });
      return (
        <div className={listClassNames}>
          <Animate transitionName={`${prefixCls}-margin-top`}>
            {list}
          </Animate>
        </div>
      );
    }
  });


  function T() {
    return true;
  }

  // Fix IE file.status problem
  // via coping a new Object
  function fileToObject(file) {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.filename || file.name,
      size: file.size,
      type: file.type,
      uid: file.uid,
      response: file.response,
      error: file.error,
      percent: 0,
      originFileObj: file,
    };
  }

  /**
   * 生成Progress percent: 0.1 -> 0.98
   *   - for ie
   */
  function genPercentAdd() {
    let k = 0.1;
    const i = 0.01;
    const end = 0.98;
    return function (s) {
      let start = s;
      if (start >= end) {
        return start;
      }

      start += k;
      k = k - i;
      if (k < 0.001) {
        k = 0.001;
      }
      return start * 100;
    };
  }

  const AntUpload = React.createClass({
	  propTypes: {
		  handleType : React.PropTypes.string.isRequired,
	  },
	  
    getInitialState() {
      return {
        fileList: this.props.fileList || this.props.defaultFileList || [],
        dragState: 'drop',
      };
    },

    onStart(file) {
      if (this.recentUploadStatus === false) return;

      let targetItem;
      let nextFileList = this.state.fileList.concat();
      if (file.length > 0) {
        targetItem = file.map(f => {
          const fileObject = fileToObject(f);
          fileObject.status = 'uploading';
          return fileObject;
        });
        nextFileList = nextFileList.concat(targetItem);
      } else {
        targetItem = fileToObject(file);
        targetItem.status = 'uploading';
        nextFileList.push(targetItem);
      }
      this.onChange({
        file: targetItem,
        fileList: nextFileList
      });
      // fix ie progress
      if (!window.FormData) {
        this.autoUpdateProgress(0, targetItem);
      }
    },

    autoUpdateProgress(percent, file) {
      const getPercent = genPercentAdd();
      let curPercent = 0;
      this.progressTimer = setInterval(() => {
        curPercent = getPercent(curPercent);
        this.onProgress({
          percent: curPercent
        }, file);
      }, 200);
    },

    removeFile(file) {
      let fileList = this.state.fileList;
      let targetItem = getFileItem(file, fileList);
      let index = fileList.indexOf(targetItem);
      if (index !== -1) {
        fileList.splice(index, 1);
        return fileList;
      }
      return null;
    },

    onSuccess(response, file) {
      this.clearProgressTimer();
      // 服务器端需要返回标准 json 字符串
      // 否则视为失败
      try {
        if (typeof response === 'string') {
        	JSON.parse(response);
        }
      } catch (e) {
        this.onError(new Error('No response'), response, file);
        return;
      }
      let fileList = this.state.fileList;
      let targetItem = getFileItem(file, fileList);
      // 之前已经删除
      if (targetItem) {
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
          file: targetItem,
          fileList
        });
      }
    },

    onProgress(e, file) {
      let fileList = this.state.fileList;
      let targetItem = getFileItem(file, fileList);
      if (!targetItem) return;
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file,
        fileList: this.state.fileList
      });
    },

    onError(error, response, file) {
      this.clearProgressTimer();
      let fileList = this.state.fileList;
      let targetItem = getFileItem(file, fileList);
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.handleRemove(targetItem);
    },

    beforeUpload(file) {
      this.recentUploadStatus = this.props.beforeUpload(file);
      return this.recentUploadStatus;
    },

    handleRemove(file) {
      let fileList = this.removeFile(file);
      if (fileList) {
        this.onChange({
          file,
          fileList,
        });
      }
    },

    handleManualRemove(file) {
      /*eslint-disable */
      file.status = 'removed';
      /*eslint-enable */
      this.handleRemove(file);
    },

    onChange(info) {
      this.setState({
        fileList: info.fileList
      });
      this.props.onChange(info);
    },

    getDefaultProps() {
      return {
        type: 'select',
        // do not set
        // name: '',
        multiple: false,
        action: '',
        data: {},
        handleType : 'attachment',
        accept: '',
        onChange: noop,
        beforeUpload: T,
        showUploadList: true,
        listType: 'text', // or pictrue
        className: '',
      };
    },

    componentWillReceiveProps(nextProps) {
      if ('fileList' in nextProps) {
        this.setState({
          fileList: nextProps.fileList || [],
        });
      }
    },

    onFileDrop(e) {
      this.setState({
        dragState: e.type
      });
    },

    clearProgressTimer() {
      clearInterval(this.progressTimer);
    },

    render() {
      let type = this.props.type || 'select';
      let props = assign({}, this.props, {
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        beforeUpload: this.beforeUpload,
      });
      let uploadList;
      if (this.props.showUploadList) {
        uploadList = (
          <UploadList listType={this.props.listType}
            items={this.state.fileList}
            onRemove={this.handleManualRemove} />
        );
      }
      if (type === 'drag') {
        let dragUploadingClass = this.state.fileList.some(file => file.status === 'uploading')
          ? `${prefixCls}-drag-uploading` : '';
        let draggingClass = this.state.dragState === 'dragover'
          ? `${prefixCls}-drag-hover` : '';
        return (
          <span className={this.props.className}>
          <div className={`${prefixCls} ${prefixCls}-drag ${dragUploadingClass} ${draggingClass}`}
              onDrop={this.onFileDrop}
              onDragOver={this.onFileDrop}
              onDragLeave={this.onFileDrop}>
              <Upload {...props}>
                <div className={`${prefixCls}-drag-container`}>
                  {this.props.children}
                </div>
              </Upload>
            </div>
            {uploadList}
          </span>
        );
      } else if (type === 'select') {
        const uploadButtonCls = classNames({
          [prefixCls]: true,
          [`${prefixCls}-select`]: true,
          [`${prefixCls}-select-${this.props.listType}`]: true,
        });
        if (this.props.listType === 'picture-card') {
          return (
            <span className={this.props.className}>
              {uploadList}
              <div className={uploadButtonCls}>
                <Upload {...props}>
                  {this.props.children}
                </Upload>
              </div>
            </span>
          );
        }
        return (
          <span className={this.props.className}>
            <div className={uploadButtonCls}>
              <Upload {...props}>
                {this.props.children}
              </Upload>
            </div>
            {uploadList}
          </span>
        );
      }
    }
  });

  AntUpload.Dragger = React.createClass({
    render() {
      return <AntUpload {...this.props} type="drag" style={{height: this.props.height}} />;
    }
  });
  UI.Upload = AntUpload;
}(Smart.UI,Smart.RC)
