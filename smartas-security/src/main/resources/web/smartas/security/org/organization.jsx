/*[[
 
]]*/
install("web.security.org",function($S){
	var logger = Log.getLogger('web.security.org');
	const {UI,Service,Resource} = Smart,
		{TreeForm,Form,Input, Button, Checkbox, Row, Col,FormItem,InputNumber} = UI;

	const service = Service.New("security/org");

	const OrgForm = Form.create({mapPropsToFields:function(props){
		const {data,parent} = props;
		const mapValuesJson =  _.mapValues(_.extend({},data,{pId:parent && parent.id , porgName: parent && parent.orgName}),function(value){
			return {value:value}
		});
		return mapValuesJson;
	}})(React.createClass({
			
			getValidateStatus(field) {
			    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

			    if (isFieldValidating(field)) {
			      return 'validating';
			    } else if (!!getFieldError(field)) {
			      return 'error';
			    } else if (getFieldValue(field)) {
			      return 'success';
			    }
			  },
				
			  nameValidate(rule, value, callback) {
			      setTimeout(() => {
			          callback();
			      }, 800);
			  },
			  
			  orgCodePattern(rule, value, callback) {
				    if (!value) {
				      callback();
				    } else {
				      setTimeout(() => {
				    	var reg = /^[A-Za-z0-9-]+$/;
				    	if(!reg.test(value) && value.length ==10){
						    callback([new Error('抱歉，机构编号只能由英文字母和数字组成。')]);
				    	}else{
				    		callback();
				    	}
				      }, 800);
				    }
				  },
				  
			 nameExists(e){
					  const value = e.target.value,props = this.props;
					  if(value){
						  const type = 'get';
					      const url = 'services/security/org/getByName';
					      const data = {
					    	orgName :value
					      };
					      const success = function(data){
					    	  if(data == "1"){
					    		  alert(props.form.callback);
					    	  }
					      };
					      const error = function(data){
					    	  
					      };
					      //在这里失去焦点后台发送数据以校验名称是否占用
					      var count = Resource.get(url, data, success, error);
					  }
				  },
		render() {
			const {linkState,form} = this.props;
			const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
			return (
	      <Form horizontal form={this.props.form}>
	        <FormItem
	          label="机构名称："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          hasFeedback
	          help={isFieldValidating('orgName') ? '校验中...' : (getFieldError('orgName') || []).join(', ')}>
	          <Input placeholder="请输入机构名称（必填）"
	            {...getFieldProps('orgName', {
	              rules: [
	                { required: true, min: 5, message: '机构名称至少为 5 个字符'},
	                { validator: this.nameValidate },
	              ],
	            })} onBlur= {this.nameExists} />
	        </FormItem>

	        <FormItem
	          label="机构编号："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          hasFeedback
	          help={isFieldValidating('orgCode') ? '校验中...' : (getFieldError('orgCode') || []).join(', ')}>
	          <Input placeholder="请输入机构编号（必填）"
	            {...getFieldProps('orgCode', {
	                rules: [
	                  { required: true ,max: 10 , min:10 , message:'请输入10位机构编号'},
	                  { validator: this.orgCodePattern},
	                ],
	            })}/>
	        </FormItem>

	        <FormItem
	          label="上级机构："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          required
	          hasFeedback>
	          <Input disabled
	            {...getFieldProps('porgName', {
	              rules: [
	                { required: true, whitespace: true },
	              ],
	            })} />
	        </FormItem>

	        <FormItem
	          label="备注："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <Input type="textarea" placeholder="备注信息" id="orgNote" name="orgNote" 
	            {...getFieldProps('orgNote', {
	              rules: [
	                { required: true, message: '真的不打算写点什么吗？' },
	              ],
	            })}/>
	        </FormItem>

	        <FormItem wrapperCol={{ span: 12, offset: 7 }} >
//	        <Input type="hidden" {...getFieldProps('id')} />
	        <Input type="hidden" {...getFieldProps('pId')} />
	        <Button type="primary" onClick={this.props.handleSubmit}>确定</Button>
	          &nbsp;&nbsp;&nbsp;
	        <Button type="ghost"  onClick={this.props.handleReset}>重置</Button>
	        </FormItem>
	      </Form>
	    );
	  }

	}));


	const App = React.createClass({
		onCreate:function(){
			return {
				orgName : '',
				id : '',
				orgCode : '',
				porgName:'',
				porgCode:'',
				orgNote:'',
			};
		},
		
 		render: function() {
			return <TreeForm 
				Form={OrgForm}
//				root={{id:0, orgName:'光谷有轨OA系统组织机构顶级目录'}}
			    root={null}
			   	nameKey='orgName'
			   	parentKey='pId'
			   	snKey='id'
				expandedKeys={['0','1']} 
				service={service} 
				onCreate={this.onCreate}
				/>
		}
	});

 	this.ready = function(){
 		return App;
	};
});
