/*[[
 
]]*/
install("web.security.menu2",function($S){
	var logger = Log.getLogger('web.security.menu2');
	const {UI,Service} = Smart,
		{Tree,TreeNode,Form,Input, Button,ButtonGroup, Checkbox, Row, Col,FormItem,InputNumber} = UI;
	var p_id = 200;
	const service = Service.New("security/menu");
	
	const DeNode = React.createClass({
		render:function() {
			const {item} = this.props
			if(item.children){
				return childNodes.map(function(item){
					return <DeNode key={'key-' + item.id} item={item}></DeNode>
				});
			}
			return <TreeNode title={item.name} key={'key-' + item.id}/>; 
		}
	})
	
	const Nav = React.createClass({
		getInitialState() {
			return {
			  treeData: [{id:0,name:'Root',sn:0},{id:1,name:'0-0',sn:1,parentId:0}],
			};
		},
		onSelect(selectedKeys,e) {
			var key = selectedKeys[0] && selectedKeys[0].substr(4);
			if(key && key > 0){
				const data  = this.state.treeData;
				let index = _.findIndex(data,{'id':+key});
				this.props.onSelect(data[index]);
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
			      		treeData: _.orderBy(treeData,['id', 'sn'], ['asc', 'asc'])
			    	});
				}else if(type === 'update'){
					treeData = this.state.treeData
					let index = _.findIndex(treeData,{'id':data.id});
					treeData[index] = data;
				}else if(type === 'remove'){
					let aa = this.state.treeData
					_.remove(aa,function(o){
						return data == o.id
					});
					//let index = _.findIndex(treeData,{'id':data});
					//aa[1] = {id:1,name:'0-0',sn:1,parentId:0};
					this.setState({
				      	treeData: _.orderBy(aa,['id', 'sn'], ['asc', 'asc'])
				    });
					
					debugger;
				}
				treeData!=null && this.setState({
			      	treeData: _.orderBy(treeData,['id', 'sn'], ['asc', 'asc'])
			    });
			}.bind(this));
		},
		render : function(){
		    const loop = data => data.map((item) => {
			    if(item){
			    	if(item.children && item.children.length) {
			        return <TreeNode title={item.name} key={'key-' + item.id}>
			         {loop(item.children)}
			        </TreeNode>;
			      }
			      return <TreeNode  style={{display:'none'}}  title={item.name} key={'key-' + item.id} isLeaf={true} />; 
			    }
		    });
		    
		    const loop1 = function(data,level){
		    	return data.map((item) => {
				      if (item.children) {
				        return <ul style={{'paddingLeft':level*2}} title={item.name} key={'key-' + item.id}>{item.name}{loop1(item.children,level+1)}</ul>;
				      }
				      return <li style={{'paddingLeft':level*2,display:'none'}} key={'key-' + item.id}>{item.name}</li>;
		    	})
		    };
		    const data = l2t(this.state.treeData);
		    const treeNodes = loop(data);
		    
		    return (<div>
		      <Tree onSelect={this.onSelect} defaultExpandedKeys={['key-0','key-1','key-2']}>
		      	{treeNodes}
		      </Tree>{loop1(data,1)}
		      </div>
		    );
		},
	});

	const MenuForm  = Form.create({mapPropsToFields:function(props){
		return _.mapValues(props.data,function(value){
			return {value:value}
		});
	}})(React.createClass({
		handleSubmit(e) {
		    e.preventDefault();
		    var data = this.props.form.getFieldsValue(),isCreate = !data.id;
		    var method = isCreate?'create':'update';
		    if(isCreate){
		    	data.id = p_id++
		    }
		    service.dispatch(method,data);
		},
		render() {
			const {linkState,form,data} = this.props,
				{getFieldProps} = form;
			return (
	      <Form horizontal onSubmit={this.handleSubmit}>
	        <FormItem label="名称：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <Input type="input" placeholder="名称" {...getFieldProps('name')} />
	        </FormItem>
	        <FormItem label="排序号：" labelCol={{ span: 3 }} wrapperCol={{ span: 14 }}>
	          <InputNumber min={0} defaultValue={0} {...getFieldProps('sn')}/>
	        </FormItem> 
	        <Row>
	          <Col span="16" offset="3">
	          	<Input type="hidden" {...getFieldProps('id')} />
	          	<Input type="hidden" {...getFieldProps('parentId')} />
	            <Button type="primary" htmlType="submit">确定</Button>
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
				parentId : this.state.id
			});
		},
		onDelete:function(){
			const id = this.state.id
			service.dispatch('remove',id);
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
							{(data.id !='0')?<MenuForm data={this.state}/>:''}								
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
