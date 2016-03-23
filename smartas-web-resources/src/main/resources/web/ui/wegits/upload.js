'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+function (UI, RC) {
  var Upload = RC.Upload;
  var Animate = RC.Animate;
  var _ref = _;
  var assign = _ref.assign;
  var noop = _ref.noop;
  var Icon = UI.Icon;
  var Progress = UI.Progress;
  var Line = Progress.Line;


  var prefixCls = 'ant-upload';

  function getFileItem(file, fileList) {
    var matchWay = !file.uid ? 'byName' : 'byUid';
    var target = fileList.filter(function (item) {
      if (matchWay === 'byName') {
        return item.name === file.name;
      }
      return item.uid === file.uid;
    })[0];
    return target;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  var previewFile = function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  var UploadList = React.createClass({
    displayName: 'UploadList',
    getDefaultProps: function getDefaultProps() {
      return {
        listType: 'text', // or picture
        items: [],
        progressAttr: {
          strokeWidth: 3,
          showInfo: false
        }
      };
    },
    handleClose: function handleClose(file) {
      this.props.onRemove(file);
    },
    componentDidUpdate: function componentDidUpdate() {
      var _this = this;

      if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
        return;
      }
      this.props.items.forEach(function (file) {
        if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
          return;
        }
        /*eslint-disable */
        file.thumbUrl = '';
        /*eslint-enable */
        previewFile(file.originFileObj, function (previewDataUrl) {
          /*eslint-disable */
          file.thumbUrl = previewDataUrl;
          /*eslint-enable */
          _this.forceUpdate();
        });
      });
    },
    render: function render() {
      var _this2 = this,
          _classNames2;

      var list = this.props.items.map(function (file) {
        var _classNames;

        var progress = void 0;
        var icon = React.createElement(Icon, { type: 'paper-clip' });

        if (_this2.props.listType === 'picture' || _this2.props.listType === 'picture-card') {
          if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
            if (_this2.props.listType === 'picture-card') {
              icon = React.createElement(
                'div',
                { className: prefixCls + '-list-item-uploading-text' },
                '文件上传中'
              );
            } else {
              icon = React.createElement(Icon, { className: prefixCls + '-list-item-thumbnail', type: 'picture' });
            }
          } else {
            icon = React.createElement(
              'a',
              { className: prefixCls + '-list-item-thumbnail',
                href: file.url,
                target: '_blank' },
              React.createElement('img', { src: file.thumbUrl || file.url, alt: file.name })
            );
          }
        }

        if (file.status === 'uploading') {
          progress = React.createElement(
            'div',
            { className: prefixCls + '-list-item-progress' },
            React.createElement(Line, _extends({}, _this2.props.progressAttr, { percent: file.percent }))
          );
        }
        var infoUploadingClass = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-list-item', true), _defineProperty(_classNames, prefixCls + '-list-item-' + file.status, true), _classNames));
        return React.createElement(
          'div',
          { className: infoUploadingClass, key: file.uid },
          React.createElement(
            'div',
            { className: prefixCls + '-list-item-info' },
            icon,
            React.createElement(
              'span',
              { className: prefixCls + '-list-item-name' },
              file.name
            ),
            _this2.props.listType === 'picture-card' && file.status !== 'uploading' ? React.createElement(
              'span',
              null,
              React.createElement(
                'a',
                { href: file.url, target: '_blank', style: { pointerEvents: file.url ? '' : 'none' } },
                React.createElement(Icon, { type: 'eye-o' })
              ),
              React.createElement(Icon, { type: 'delete', onClick: _this2.handleClose.bind(_this2, file) })
            ) : React.createElement(Icon, { type: 'cross', onClick: _this2.handleClose.bind(_this2, file) })
          ),
          progress
        );
      });
      var listClassNames = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-list', true), _defineProperty(_classNames2, prefixCls + '-list-' + this.props.listType, true), _classNames2));
      return React.createElement(
        'div',
        { className: listClassNames },
        React.createElement(
          Animate,
          { transitionName: prefixCls + '-margin-top' },
          list
        )
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
      originFileObj: file
    };
  }

  /**
   * 生成Progress percent: 0.1 -> 0.98
   *   - for ie
   */
  function genPercentAdd() {
    var k = 0.1;
    var i = 0.01;
    var end = 0.98;
    return function (s) {
      var start = s;
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

  var AntUpload = React.createClass({
    displayName: 'AntUpload',
    getInitialState: function getInitialState() {
      return {
        fileList: this.props.fileList || this.props.defaultFileList || [],
        dragState: 'drop'
      };
    },
    onStart: function onStart(file) {
      if (this.recentUploadStatus === false) return;

      var targetItem = void 0;
      var nextFileList = this.state.fileList.concat();
      if (file.length > 0) {
        targetItem = file.map(function (f) {
          var fileObject = fileToObject(f);
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
    autoUpdateProgress: function autoUpdateProgress(percent, file) {
      var _this3 = this;

      var getPercent = genPercentAdd();
      var curPercent = 0;
      this.progressTimer = setInterval(function () {
        curPercent = getPercent(curPercent);
        _this3.onProgress({
          percent: curPercent
        }, file);
      }, 200);
    },
    removeFile: function removeFile(file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      var index = fileList.indexOf(targetItem);
      if (index !== -1) {
        fileList.splice(index, 1);
        return fileList;
      }
      return null;
    },
    onSuccess: function onSuccess(response, file) {
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
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      // 之前已经删除
      if (targetItem) {
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
          file: targetItem,
          fileList: fileList
        });
      }
    },
    onProgress: function onProgress(e, file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      if (!targetItem) return;
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: targetItem,
        fileList: this.state.fileList
      });
    },
    onError: function onError(error, response, file) {
      this.clearProgressTimer();
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.handleRemove(targetItem);
    },
    beforeUpload: function beforeUpload(file) {
      this.recentUploadStatus = this.props.beforeUpload(file);
      return this.recentUploadStatus;
    },
    handleRemove: function handleRemove(file) {
      var fileList = this.removeFile(file);
      if (fileList) {
        this.onChange({
          file: file,
          fileList: fileList
        });
      }
    },
    handleManualRemove: function handleManualRemove(file) {
      /*eslint-disable */
      file.status = 'removed';
      /*eslint-enable */
      this.handleRemove(file);
    },
    onChange: function onChange(info) {
      this.setState({
        fileList: info.fileList
      });
      this.props.onChange(info);
    },
    getDefaultProps: function getDefaultProps() {
      return {
        type: 'select',
        // do not set
        // name: '',
        multiple: false,
        action: '',
        data: {},
        accept: '',
        onChange: noop,
        beforeUpload: T,
        showUploadList: true,
        listType: 'text', // or pictrue
        className: ''
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('fileList' in nextProps) {
        this.setState({
          fileList: nextProps.fileList || []
        });
      }
    },
    onFileDrop: function onFileDrop(e) {
      this.setState({
        dragState: e.type
      });
    },
    clearProgressTimer: function clearProgressTimer() {
      clearInterval(this.progressTimer);
    },
    render: function render() {
      var type = this.props.type || 'select';
      var props = assign({}, this.props, {
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        beforeUpload: this.beforeUpload
      });
      var uploadList = void 0;
      if (this.props.showUploadList) {
        uploadList = React.createElement(UploadList, { listType: this.props.listType,
          items: this.state.fileList,
          onRemove: this.handleManualRemove });
      }
      if (type === 'drag') {
        var dragUploadingClass = this.state.fileList.some(function (file) {
          return file.status === 'uploading';
        }) ? prefixCls + '-drag-uploading' : '';
        var draggingClass = this.state.dragState === 'dragover' ? prefixCls + '-drag-hover' : '';
        return React.createElement(
          'span',
          { className: this.props.className },
          React.createElement(
            'div',
            { className: prefixCls + ' ' + prefixCls + '-drag ' + dragUploadingClass + ' ' + draggingClass,
              onDrop: this.onFileDrop,
              onDragOver: this.onFileDrop,
              onDragLeave: this.onFileDrop },
            React.createElement(
              Upload,
              props,
              React.createElement(
                'div',
                { className: prefixCls + '-drag-container' },
                this.props.children
              )
            )
          ),
          uploadList
        );
      } else if (type === 'select') {
        var _classNames3;

        var uploadButtonCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls, true), _defineProperty(_classNames3, prefixCls + '-select', true), _defineProperty(_classNames3, prefixCls + '-select-' + this.props.listType, true), _classNames3));
        if (this.props.listType === 'picture-card') {
          return React.createElement(
            'span',
            { className: this.props.className },
            uploadList,
            React.createElement(
              'div',
              { className: uploadButtonCls },
              React.createElement(
                Upload,
                props,
                this.props.children
              )
            )
          );
        }
        return React.createElement(
          'span',
          { className: this.props.className },
          React.createElement(
            'div',
            { className: uploadButtonCls },
            React.createElement(
              Upload,
              props,
              this.props.children
            )
          ),
          uploadList
        );
      }
    }
  });

  AntUpload.Dragger = React.createClass({
    displayName: 'Dragger',
    render: function render() {
      return React.createElement(AntUpload, _extends({}, this.props, { type: 'drag', style: { height: this.props.height } }));
    }
  });
  UI.Upload = AntUpload;
}(Smart.UI, Smart.RC);