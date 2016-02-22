/*[[
 
]]*/
install("web.security.menu2",function($S){
	var logger = Log.getLogger('web.security.menu2');
	const {UI,Service} = Smart,
		{Tree,TreeNode,Form,Input, Button,ButtonGroup, Checkbox, Row, Col,FormItem,InputNumber} = UI;

	const service = Service.New("security/menu");
	
	const Nav = React.createClass({
		getInitialState() {
			return {
			  treeData: [],
			};
		},
		onSelect(selectedKeys,e) {
			var key = selectedKeys[0];
			if(key && key > 0){
				service.get(key,function(data) {
					//如果查询不到结果，需要同步树结构？？
					this.props.onSelect(data || {id:0});
				}.bind(this));
			}else{
				this.props.onSelect({id:0});
			}
		},
		componentDidMount: function() {
			//信息修改以后，需要同步菜单名称
			service.subscribe(function(action){
				var type = action.type, data = action.data;
				let treeData = null;
				if(type === 'create'){
					treeData = _.concat(this.state.treeData,[data]);		
					this.setState({
			      		treeData: _.orderBy(treeData,['sn'], ['asc'])
			    	});
				}else if(type === 'update'){
					treeData = this.state.treeData
					let index = _.findIndex(treeData,{'id':data.id});
					treeData[index] = data;
				}else if(type === 'remove'){
					treeData = this.state.treeData
					_.remove(treeData,function(o){
						return (data == o.id)
					});
				}
				treeData!=null && this.setState({
			      	treeData: _.orderBy(treeData,['sn'], ['asc'])
			    });
			}.bind(this));

			//list(q, sucess, error)
			//获取导航树
			service.list(function(data){
				//提取需要的属性
				data = _.map(data,function(a){
					return _.pick(a,['id','parentId','name','sn']);
				})
				//添加虚拟根节点
				data = _.concat(data,[{id:0,name:'Root',sn:0}]);

				this.setState({
			      treeData: _.orderBy(data,['sn'], ['asc'])
			    });
			}.bind(this));
		},
		render() {
		    const loop = data => data.map((item) => {
			      if (item.children) {
			        return <TreeNode title={item.name} key={item.id}>{loop(item.children)}</TreeNode>;
			      }
			      return <TreeNode title={item.name} key={item.id} isLeaf={true} />;
		    });
		    const treeNodes = loop(l2t(this.state.treeData));
		    return (
		      <Tree onSelect={this.onSelect} defaultExpandedKeys={['0','1','2']}>
		        {treeNodes}
		      </Tree>
		    );
		},
	});

	const MenuForm  = Form.create({mapPropsToFields:function(props){
		return _.mapValues(props.data,function(value){
			return {value:value}
		});
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

		handleSubmit(e) {
		    e.preventDefault();
		    this.props.form.validateFields((errors, values) => {
		        if (!!errors) {
		          console.log('Errors in form!!!');
		          return;
		        }
		        var data = this.props.form.getFieldsValue(),isCreate = !data.id;
			    var method = isCreate?'create':'update';
			    service[method](data,function(id){
			    	data.id = id;
			    	service.dispatch(method,data);
			    });
		    });
		},
		render() {
			const {linkState,form,data} = this.props,
				{getFieldProps} = form;
			return (
	      <Form horizontal  form={this.props.form}>
	        <FormItem label="名称：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="名称" {...getFieldProps('name',{
	              validate: [{
		                rules: [
		                  { required: true,message: '请输入栏目名称'},
		                ],
		                trigger: 'onBlur',
		              }]
		            })}/>
	        </FormItem>
	        <FormItem label="URL：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="URL" {...getFieldProps('url')} />
	        </FormItem>
	        <FormItem label="Class：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="样式" {...getFieldProps('className')} />
	        </FormItem>
	        <FormItem label="Icon：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="图标" {...getFieldProps('iconName')} />
	        </FormItem>
	        <FormItem label="排序号：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <InputNumber min={0} defaultValue={0} {...getFieldProps('sn')}/>
	        </FormItem> 
	        <FormItem wrapperCol={{ span: 14, offset: 3 }}>
	          <label>
	            <Checkbox {...getFieldProps('publish',{valuePropName:'checked'})} />是否发布
	          </label>
	        </FormItem>
	        <Row>
	          <Col span="16" offset="3">
	          	<Input type="hidden" {...getFieldProps('id')} />
	          	<Input type="hidden" {...getFieldProps('parentId')} />
	            <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)}>确定</Button>
	          </Col>
	        </Row>
	      </Form>
	    );
	  }

	}));


	const App = React.createClass({
		getInitialState: function() {
   			 return {id : 0};
  		},
		onSelect:function(data){
			this.setState(data);
		},
		onCreate:function(){
			this.setState({
				name : '',
				id : '',
				sn : '1',
				publish:false,
				iconName:'',
				className:'',
				url:'',
				parentId : this.state.id
			});
		},
		onDelete:function(){
			const id = this.state.id
			service.remove(id,function(data){
				service.dispatch('remove',id);
				this.setState({
					id:0
				})
			}.bind(this));
		},
 		render: function() {
			var data = this.state;
			return(
			<div className="full-height">
				<div className="row full-height">
					<div className="col-md-4 full-height">
						<div className="panel panel-default full-height" style={{overflow:'auto'}}>
							<ButtonGroup size='small' style={{padding:5}} >
							  <Button onClick={this.onCreate} disabled={!data.id}>新增</Button>
							  <Button onClick={this.onDelete} disabled={!data.id}>删除</Button>
							</ButtonGroup>
							<Nav onSelect ={this.onSelect}/>
						</div>
					</div>
					<div className="col-md-8 full-height">
						<div className="panel panel-default full-height">
							<div className="panel-body full-height">
							{(data.id !='0')?<MenuForm linkState={this.props.linkState} data={this.state}/>:''}								
							</div>
						</div>
					</div>
				</div>
			</div>)
		}
	});

 	this.ready = function(){
 		return App;
	};
});
