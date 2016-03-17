/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,UI = Smart.UI;
	const { Upload, message, Button, Icon }  = UI;
	const props = {
	  name: 'file',
	  //type : 'drag',
	  handleType:'attachment',
	  multiple: true,
	  action: 'services/file/upLoad',
	  forceAjax : false,
	  onChange(info) {
	    if (info.file.status !== 'uploading') {
	      console.log(info.file, info.fileList);
	    }
	    if (info.file.status === 'done') {
	      message.success(info.file.name + ' 上传成功。');
	    } else if (info.file.status === 'error') {
	      message.error(info.file.name + ' 上传失败。');
	    }
	  }
	};
	
	var Node = React.createClass({
		  getInitialState() {
		    return {
		      disabled: true
		    };
		  },
		  toggle() {
			    this.setState({
			      disabled: !this.state.disabled
			    });
			  },
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				return <div>
						<div className="code-box-meta markdown">
					    	<p>基本使用。</p>
					    </div>
					    <Upload {...props}>
					    <Button type="ghost">
					      <Icon type="upload" /> 点击上传
					    </Button>
					  </Upload>
  					</div>
			}
		}
	);
	
	// 组件内部状态改变触发器
	//API
	/*this.actions = {
	   	add : function(name){
			return {type:'DATE_CLICK',name:name}
		},
		asyn : function(url){
			return function(dispatch){ };
		}
	};*/
	// API
	this.ready = function(connect){
		//return connect(this.actions)(Node);
		return Node;
	};
   	// API
   	/*this.reducers = function(){
   		return {
   			DATE_CLICK : function(data,action){
   				return data.set('test',Date.now());
   			}
   		}
   	};*/
});
