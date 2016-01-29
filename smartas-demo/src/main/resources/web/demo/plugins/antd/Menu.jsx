/*[[
 
]]*/
install("web.demo.plugins.antd.Switch",function($S){
	var pkg = this,U = Smart.UI;
	const Menu = U.Menu,Icon = U.Icon,Button=U.Button;
	const SubMenu = Menu.SubMenu;
	const MenuItemGroup = Menu.ItemGroup;
	function onChange(checkedValues) {
		  console.log('checked = ', checkedValues);
	}

	const Sider = React.createClass({
	  getInitialState() {
	    return {
	      current: '1',
	      openKeys: []
	    };
	  },
	  handleClick(e) {
	    console.log('click ', e);
	    this.setState({
	      current: e.key,
	      openKeys: e.keyPath.slice(1)
	    });
	  },
	  onToggle(info) {
	    this.setState({
	      openKeys: info.open ? info.keyPath : info.keyPath.slice(1)
	    });
	  },
	  render() {
	    return (
	      <Menu theme="dark" onClick={this.handleClick} style={{ width: 240 }} openKeys={this.state.openKeys} onOpen={this.onToggle} onClose={this.onToggle} selectedKeys={[this.state.current]} mode="inline">
	        <SubMenu key="sub1" title={<span><Icon type="mail"></Icon><span>导航一</span></span>}>
	          <Menu.Item key="1">选项1</Menu.Item>
	          <Menu.Item key="2">选项2</Menu.Item>
	          <Menu.Item key="3">选项3</Menu.Item>
	          <Menu.Item key="4">选项4</Menu.Item>
	        </SubMenu>
	        <SubMenu key="sub2" title={<span><Icon type="appstore"></Icon><span>导航二</span></span>}>
	          <Menu.Item key="5">选项5</Menu.Item>
	          <Menu.Item key="6">选项6</Menu.Item>
	          <SubMenu key="sub3" title="三级导航">
	            <Menu.Item key="7">选项7</Menu.Item>
	            <Menu.Item key="8">选项8</Menu.Item>
	          </SubMenu>
	        </SubMenu>
	        <SubMenu key="sub4" title={<span><Icon type="setting"></Icon><span>导航三</span></span>}>
	          <Menu.Item key="9">选项9</Menu.Item>
	          <Menu.Item key="10">选项10</Menu.Item>
	          <Menu.Item key="11">选项11</Menu.Item>
	          <Menu.Item key="12">选项12</Menu.Item>
	          <Menu.Item key="90">选项9</Menu.Item>
	          <Menu.Item key="100">选项10</Menu.Item>
	          <Menu.Item key="110">选项11</Menu.Item>
	          <Menu.Item key="120">选项12</Menu.Item>
	          <Menu.Item key="190">选项9</Menu.Item>
	          <Menu.Item key="1100">选项10</Menu.Item>
	          <Menu.Item key="1110">选项11</Menu.Item>
	          <Menu.Item key="1120">选项12</Menu.Item>
	          <Menu.Item key="1120">选项12</Menu.Item>
	          <Menu.Item key="1190">选项9</Menu.Item>
	          <Menu.Item key="11100">选项10</Menu.Item>
	          <Menu.Item key="11110">选项11</Menu.Item>
	          <Menu.Item key="11120">选项12</Menu.Item>
	        </SubMenu>
	      </Menu>
	    );
	  }
	});
	function handleClick(e) {
		  console.log('click', e);
		}
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
					    	<p>带有文字和图标。内建了两套主题 light|dark，默认 light。</p>
					    </div><br/><br/>
						<Sider/>
						
						<div className="code-box-meta markdown">
				    	<p>子菜单是弹出的形式。</p>
				    	</div><br/><br/>
						<Menu onClick={handleClick} style={{ width: 240 }} mode="vertical">
					    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
					      <MenuItemGroup title="分组1">
					        <Menu.Item key="1">选项1</Menu.Item>
					        <Menu.Item key="2">选项2</Menu.Item>
					      </MenuItemGroup>
					      <MenuItemGroup title="分组2">
					        <Menu.Item key="3">选项3</Menu.Item>
					        <Menu.Item key="4">选项4</Menu.Item>
					      </MenuItemGroup>
					    </SubMenu>
					    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
					      <Menu.Item key="5">选项5</Menu.Item>
					      <Menu.Item key="6">选项6</Menu.Item>
					      <SubMenu key="sub3" title="三级导航">
					        <Menu.Item key="7">选项7</Menu.Item>
					        <Menu.Item key="8">选项8</Menu.Item>
					      </SubMenu>
					    </SubMenu>
					    <SubMenu key="sub4" title={<span><icon type="setting" /><span>导航三</span></span>}>
					      <Menu.Item key="9">选项9</Menu.Item>
					      <Menu.Item key="10">选项10</Menu.Item>
					      <Menu.Item key="11">选项11</Menu.Item>
					      <Menu.Item key="12">选项12</Menu.Item>
					    </SubMenu>
					  </Menu>
  						</div>
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
