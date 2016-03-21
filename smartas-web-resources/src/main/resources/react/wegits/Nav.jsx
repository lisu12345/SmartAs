+ function(UI,RC) {
	const {Menu ,Icon ,Button,Dropdown,SubMenu} = UI;

	const Nav = React.createClass({
	  getDefaultProps() {
		return {
			current: '1',
			data:[],
			width: 224,
			openKeys: []
		};
	  },
	  getInitialState() {
			return {
				openKeys: this.props.openKeys,
			};
		},
	  handleClick(e) {
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
	  render: function() {
		  const {handleClick,width,data,...other} = this.props;
		  const loop = data => data.map((item) => {
		      if (item.children) {
		        return <SubMenu title={item.name} key={item.id}>{loop(item.children)}</SubMenu>;
		      }
		      return <Menu.Item key={item.id}>{item.name}</Menu.Item>;
		  });
		  const nodes = loop(l2t(data,{key_id:'id',key_parent:'parentId'}));
		  debugger;
		  return <Menu onClick={this.handleClick} style={{ width}} openKeys={this.state.openKeys} onOpen={this.onToggle} onClose={this.onToggle} selectedKeys={[this.props.current]} mode="inline">
	         {nodes}
	      </Menu>
		}
	});
	UI.Nav = Nav;
}(Smart.UI,Smart.RC)