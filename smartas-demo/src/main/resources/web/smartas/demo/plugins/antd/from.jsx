
/*[[

]]*/
install("web.demo.plugins.antd",function($S){
	var logger = Log.getLogger('web.demo.plugins.antd'),pkg = this,UI = Smart.UI;
	const {Select, Radio,Checkbox,Input, Button, DatePicker, InputNumber, Form,FormItem, Cascader} = UI
	let message;
	//const FormItem  = Form.Item;
	const createForm = Form.create;
	const Option = Select.Option;
	const RadioGroup = Radio.Group;

	function noop() {
	  return false;
	}
	
	
	let Demo = React.createClass({
	  handleSubmit(e) {
	    e.preventDefault();
	    console.log('收到表单值：', this.props.form.getFieldsValue());
	  },

	  render() {
	    const { getFieldProps } = this.props.form;
	    return (
	      <Form inline onSubmit={this.handleSubmit}>
	        <FormItem
	          label="账户：">
	          <Input placeholder="请输入账户名"
	            {...getFieldProps('userName')} />
	        </FormItem>
	        <FormItem
	          label="密码：">
	          <Input type="password" placeholder="请输入密码"
	            {...getFieldProps('password')} />
	        </FormItem>
	        <FormItem>
	          <label className="ant-checkbox-inline">
	            <Checkbox
	              {...getFieldProps('agreement')} />记住我
	          </label>
	        </FormItem>
	        <Button type="primary" htmlType="submit">登录</Button>
	      </Form>
	    );
	  }
	});

	Demo = Form.create()(Demo);
	
	class BasicDemo extends React.Component {
	  getValidateStatus(field) {
	    const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;

	    if (isFieldValidating(field)) {
	      return 'validating';
	    } else if (!!getFieldError(field)) {
	      return 'error';
	    } else if (getFieldValue(field)) {
	      return 'success';
	    }
	  }

	  handleReset(e) {
	    e.preventDefault();
	    this.props.form.resetFields();
	  }

	  handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((errors, values) => {
	      if (!!errors) {
	        console.log('Errors in form!!!');
	        return;
	      }
	      console.log('Submit!!!');
	      console.log(values);
	    });
	  }

	  userExists(rule, value, callback) {
	    if (!value) {
	      callback();
	    } else {
	      setTimeout(() => {
	        if (value === 'JasonWood') {
	          callback([new Error('抱歉，该用户名已被占用。')]);
	        } else {
	          callback();
	        }
	      }, 800);
	    }
	  }

	  checkPass(rule, value, callback) {
	    const { validateFields } = this.props.form;
	    if (value) {
	      validateFields(['rePasswd']);
	    }
	    callback();
	  }

	  checkPass2(rule, value, callback) {
	    const { getFieldValue } = this.props.form;
	    if (value && value !== getFieldValue('passwd')) {
	      callback('两次输入密码不一致！');
	    } else {
	      callback();
	    }
	  }

	  render() {
	    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;

	    return (
	      <Form horizontal form={this.props.form}>
	        <FormItem
	          label="用户名："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          hasFeedback
	          help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
	          <Input placeholder="实时校验，输入 JasonWood 看看"
	            {...getFieldProps('name', {
	              rules: [
	                { required: true, min: 5, message: '用户名至少为 5 个字符' },
	                { validator: this.userExists },
	              ],
	            })} />
	        </FormItem>

	        <FormItem
	          label="邮箱："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          hasFeedback>
	          <Input type="email" placeholder="onBlur 与 onChange 相结合"
	            {...getFieldProps('email', {
	              validate: [{
	                rules: [
	                  { required: true },
	                ],
	                trigger: 'onBlur',
	              }, {
	                rules: [
	                  { type: 'email', message: '请输入正确的邮箱地址' },
	                ],
	                trigger: ['onBlur', 'onChange'],
	              }]
	            })}/>
	        </FormItem>

	        <FormItem
	          label="密码："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          hasFeedback>
	          <Input type="password" autoComplete="off"
	            {...getFieldProps('passwd', {
	              rules: [
	                { required: true, whitespace: true, message: '请填写密码' },
	                { validator: this.checkPass.bind(this) },
	              ],
	            })}
	            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}/>
	        </FormItem>

	        <FormItem
	          label="确认密码："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}
	          hasFeedback>
	          <Input type="password" autoComplete="off" placeholder="两次输入密码保持一致"
	            onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
	            {...getFieldProps('rePasswd', {
	              rules: [{
	                required: true,
	                whitespace: true,
	                message: '请再次输入密码',
	              }, {
	                validator: this.checkPass2.bind(this),
	              }],
	            })}/>
	        </FormItem>

	        <FormItem
	          label="备注："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <Input type="textarea" placeholder="随便写" id="textarea" name="textarea"
	            {...getFieldProps('textarea', {
	              rules: [
	                { required: true, message: '真的不打算写点什么吗？' },
	              ],
	            })}/>
	        </FormItem>

	        <FormItem wrapperCol={{ span: 12, offset: 7 }} >
	        <Button type="primary" onClick={this.handleSubmit.bind(this)}>确定</Button>
	          &nbsp;&nbsp;&nbsp;
	        <Button type="ghost" onClick={this.handleReset.bind(this)}>重置</Button>
	        </FormItem>
	      </Form>
	    );
	  }
	}
	BasicDemo = createForm()(BasicDemo);
	
	
	let Demo2 = React.createClass({
	  handleReset(e) {
	    e.preventDefault();
	    this.props.form.resetFields();
	  },

	  handleSubmit(e) {
	    e.preventDefault();
	    this.props.form.validateFields((errors, values) => {
	      if (!!errors) {
	        console.log('Errors in form!!!');
	        return;
	      }
	      console.log('Submit!!!');
	      console.log(values);
	    });
	  },

	  checkBirthday(rule, value, callback) {
	    if (value && value.getTime() >= Date.now()) {
	      callback(new Error('你不可能在未来出生吧!'));
	    } else {
	      callback();
	    }
	  },

	  checkPrime(rule, value, callback) {
	    if (value !== 11) {
	      callback(new Error('8~12之间的质数明明是11啊!'));
	    } else {
	      callback();
	    }
	  },

	  render() {
	    const address = [{
	      value: 'zhejiang',
	      label: '浙江',
	      children: [{
	        value: 'hangzhou',
	        label: '杭州',
	      }],
	    }];
	    const { getFieldProps } = this.props.form;
	    return (
	      <Form horizontal form={this.props.form}>
	        <FormItem
	          label="国籍："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <Select placeholder="请选择国家" style={{ width: '100%' }}
	            {...getFieldProps('select', {
	              rules: [
	                { required: true, message: '请选择您的国籍' }
	              ],
	            })}
	          >
	            <Option value="china">中国</Option>
	            <Option value="use">美国</Option>
	            <Option value="japan">日本</Option>
	            <Option value="korean">韩国</Option>
	            <Option value="Thailand">泰国</Option>
	          </Select>
	        </FormItem>

	        <FormItem
	          label="喜欢的颜色："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <Select multiple placeholder="请选择颜色" style={{ width: '100%' }}
	            {...getFieldProps('multiSelect', {
	              rules: [
	                { required: true, message: '请选择您喜欢的颜色', type: 'array' },
	              ]
	            })}
	          >
	            <Option value="red">红色</Option>
	            <Option value="orange">橙色</Option>
	            <Option value="yellow">黄色</Option>
	            <Option value="green">绿色</Option>
	            <Option value="blue">蓝色</Option>
	          </Select>
	        </FormItem>

	        <FormItem
	          label="性别："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <RadioGroup
	            {...getFieldProps('radio', {
	              rules: [
	                { required: true, message: '请选择您的性别' }
	              ]
	            })}
	          >
	            <Radio value="male">男</Radio>
	            <Radio value="female">女</Radio>
	          </RadioGroup>
	        </FormItem>

	        <FormItem
	          label="生日："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <DatePicker
	            {...getFieldProps('birthday', {
	              rules: [
	                {
	                  required: true,
	                  type: 'date',
	                  message: '你的生日是什么呢?',
	                }, {
	                  validator: this.checkBirthday,
	                }
	              ]
	            })}
	          />
	        </FormItem>

	        <FormItem
	          label="8~12间的质数："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <InputNumber min={8} max={12}
	            {...getFieldProps('primeNumber', {
	              rules: [{ validator: this.checkPrime }],
	            })}
	          />
	        </FormItem>

	        <FormItem
	          label="选择地址："
	          labelCol={{ span: 7 }}
	          wrapperCol={{ span: 12 }}>
	          <Cascader options={address}
	            {...getFieldProps('address', {
	              rules: [{ required: true, type: 'array' }],
	            })}
	          />
	        </FormItem>

	        <FormItem
	          wrapperCol={{ span: 12, offset: 7 }} >
	          <Button type="primary" onClick={this.handleSubmit}>确定</Button>
	          &nbsp;&nbsp;&nbsp;
	          <Button type="ghost" onClick={this.handleReset}>重置</Button>
	        </FormItem>
	      </Form>
	    );
	  },
	});

	Demo2 = createForm()(Demo2);
	
	var Node = React.createClass({
		mixins: [Form.ValueMixin],

		  getInitialState() {
		    return {
		      formData: {
		        userName: undefined,
		        password: undefined,
		        agreement: undefined,
		      }
		    };
		  },

		  handleSubmit(e) {
		    e.preventDefault();
		    message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
		      if (typeof v === 'undefined') {
		        return '';
		      }
		      return v;
		    }));
		  },

		  render() {
		    const formData = this.state.formData;
		    return (
		    		<div className="code-boxs">
						<div className="code-boxes-col-2-1">
							<div className="code-box">
								<div className="code-box-meta markdown">
									<p>1.行内排列，常用于登录界面。</p>
							    </div>
							    <div  className="code-box-body">
							    	<Demo />
							    </div>
						    </div>
						</div>
						<div className="code-boxes-col-2-1">
							<div className="code-box">
								<div className="code-box-meta markdown">
									<p>2.基本的表单校验例子。</p>
							    </div>
							    <div  className="code-box-body">
							    	<BasicDemo  />
							    </div>
						    </div>
						</div>
						
						<div className="code-boxes-col-2-1">
							<div className="code-box">
								<div className="code-box-meta markdown">
									<p>3.提供以下组件表单域的校验。</p>
									<p><code>Select</code> <code>Radio</code> <code>DatePicker</code> <code>InputNumber</code> <code>Cascader</code>。</p>
							    </div>
							    <div  className="code-box-body">
							    	<Demo2  />
							    </div>
						    </div>
						</div>
					</div>
		    );
		  }
		}
	);
	
	// 组件内部状态改变触发器
	//API
	this.actions = {
	   	add : function(name){
			return {type:'DATE_CLICK',name:name}
		},
		asyn : function(url){
			return function(dispatch){ };
		}
	};
	// API
	this.ready = function(connect){
		//return connect(this.actions)(Node);
		return Node;
	};
   	// API
   	this.reducers = function(){
   		return {
   			DATE_CLICK : function(data,action){
   				return data.set('test',Date.now());
   			}
   		}
   	};
});
