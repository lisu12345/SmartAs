+ function(UI, RC) {
	const {Tree,TreeNode,ButtonGroup,Button,Popconfirm} = UI,
		{PropTypes} = React;
		
	const Nav = React.createClass({
		propTypes: {
			service: PropTypes.object.isRequired,
			onSelect: PropTypes.func.isRequired,
			root: PropTypes.object,
			orderBy: PropTypes.func,
			idKey: PropTypes.string,
			parentKey: PropTypes.string,
			nameKey: PropTypes.string,
			snKey: PropTypes.string,
			expandedKeys: PropTypes.array,
		},
		getInitialState() {
			return {
			  treeData: [],
			};
		},
		onSelect(selectedKeys,e) {
			var key = selectedKeys[0];
			const {service,idKey,parentKey} = this.props,
				{treeData} = this.state;
			if(key && key > 0){
				service.get(key,function(data) {
					//如果查询不到结果，需要同步树结构？？
					if(data){
						let index = _.findIndex(treeData,{id : data[parentKey]});
						this.props.onSelect(data,treeData[index]);
						return
					}
					this.props.onSelect({id:-9999});
				}.bind(this));
				return;
			}
			this.props.onSelect({id:-9999});
		},
		componentDidMount: function() {
			//信息修改以后，需要同步菜单名称
			const {service,root,orderBy,idKey,parentKey,nameKey,snKey} = this.props;
			service.subscribe(function(action){
				var type = action.type, data = action.data;
				let treeData = null;
				if(type === 'create'){
					treeData = _.concat(this.state.treeData,[data]);		
				}else if(type === 'update'){
					treeData = this.state.treeData
					let index = _.findIndex(treeData,{id : data.id});
					treeData[index] = data;
				}else if(type === 'remove'){
					treeData = this.state.treeData
					_.remove(treeData,function(o){
						return (data == o[idKey])
					});
				}
				treeData != null && this.setState({
			      	treeData: orderBy(treeData),
			    });
			}.bind(this));

			//获取导航树
			service.list(function(data){
				//提取需要的属性
				//data = _.map(data,function(a){
				//	return _.pick(a,[idKey,parentKey,nameKey,snKey]);
				//})
				//添加虚拟根节点
				data = _.concat(data,[root]);
				this.setState({
			      treeData: orderBy(data),
			    });
			}.bind(this));
		},
		render() {
			const {service,idKey,parentKey,nameKey,expandedKeys} = this.props;
		    const loop = data => data.map((item) => {
			      if (item.children) {
			        return <TreeNode title={item[nameKey]} key={item[idKey]}>{loop(item.children)}</TreeNode>;
			      }
			      return <TreeNode title={item[nameKey]} key={item[idKey]} isLeaf={true} />;
		    });
		    const treeNodes = loop(l2t(this.state.treeData,{key_id:idKey,key_parent:parentKey}));
		    return (
		      <Tree onSelect={this.onSelect} defaultExpandedKeys={expandedKeys} showLine={true}>
		        {treeNodes}
		      </Tree>
		    );
		},
	});
		
	const TreeForm = React.createClass({
		propTypes: {
			service: PropTypes.object.isRequired,
			Form: PropTypes.func.isRequired,
			onCreate: PropTypes.func.isRequired,
			root : PropTypes.object,
			orderBy :  PropTypes.func,
			idKey :  PropTypes.string,
			parentKey :  PropTypes.string,
			nameKey :  PropTypes.string,
			snKey :  PropTypes.string,
			expandedKeys:PropTypes.array,
			
		},
		getDefaultProps: function() {
			return {
				root: {
					id: 0,
					name: 'Root',
					sn: 0
				},
				idKey: 'id',
				parentKey: 'parentId',
				nameKey: 'name',
				snKey: 'sn',
				expandedKeys: ['0'],
				orderBy: function(treeData) {
					return _.orderBy(treeData, ['sn'], ['asc']);
				},
			}
		},
		getInitialState: function() {
   			 return {data:{id : -9999}};
  		},
		onSelect:function(data,parent){
			this.setState({data,parent});
		},
		onCreate:function(){
			const {data} = this.state;
			this.setState({data:this.props.onCreate(),parent:data});
		},
		onDelete:function(){
			const {id} = this.state.data,
				{service} = this.props;
			service.remove(id,function(data){
				service.dispatch('remove',id);
				this.setState({data:{id : -9999}})
			}.bind(this));
		},
		handleSubmit(e) {
		    e.preventDefault();
		    const {Form} = this.refs,
		    	{service} = this.props;
		    Form.validateFields((errors, values) => {
		        if (!!errors) {
		          return;
		        }
		        var data = Form.getFieldsValue(),isCreate = !data.id;
			    var method = isCreate?'create':'update';
			    service[method](data,function(id){
			    	data.id = id;
			    	service.dispatch(method,data);
			    });
		    });
		},
 		render: function() {
			const {Form,service,idKey,parentKey,nameKey,snKey,root,orderBy,expandedKeys} = this.props;
 			var {data,parent} = this.state;
			return(
			<div className="full-height">
				<div className="row full-height">
					<div className="col-md-4 full-height">
						<div className="panel panel-default full-height" style={{overflow:'auto'}}>
							<ButtonGroup size='small' style={{padding:5}} >
							  <Button onClick={this.onCreate} disabled={data[idKey] < 0}>新增</Button>
							  <Popconfirm title="确定要删除这个任务吗？" onConfirm={this.onDelete}>
							  	<Button disabled={data[idKey] < 0}>删除</Button>
							  </Popconfirm>
							</ButtonGroup>
							<Nav idKey={idKey} 
								root={root} 
								orderBy={orderBy} 
								parentKey={parentKey} 
								nameKey={nameKey} 
								snKey={snKey} 
								expandedKeys={expandedKeys} 
								service={service} 
								onSelect={this.onSelect} />
						</div>
					</div>
					<div className="col-md-8 full-height">
						<div className="panel panel-default full-height">
							<div className="panel-body full-height">
							{(data.id >= 0)?<Form ref='Form' data={data} parent={parent} handleSubmit={this.handleSubmit} />:''}								
							</div>
						</div>
					</div>
				</div>
			</div>)
		}
	});

	UI.TreeForm = TreeForm;
}(Smart.UI, Smart.RC);
