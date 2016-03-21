/*[[
  <style>
  .component-demos {
    margin: 2em 0 1em;
    color: #404040;
    font-weight: 500;
    font-size: 24px;
  }
  </style>
]]*/
install("web.demo.plugins.antd.Button",function($S){
	var pkg = this,U = Smart.UI;
	const Button = U.Button,Icon = U.Icon,ButtonGroup = Button.Group;
	function onChange(checkedValues) {
		  console.log('checked = ', checkedValues);
		}
	
	var Node = React.createClass({
		  getInitialState() {
		    return {
		      disabled: true,
		      loading: false,
		      iconLoading: false,
		    };
		  },
		  toggleDisabled() {
		    this.setState({
		      disabled: !this.state.disabled
		    });
		  },
			  enterLoading() {
			    this.setState({ loading: true });
			  },
			  enterIconLoading() {
			    this.setState({ iconLoading: true });
			  },
			render: function() {
				var linkState = _.bind(Smart.Store.linkState,this);
				const styles =  {'margin': '16px 0',
								'fontSize': 14,
								'lineHeight': 1,
			    				'fontWeight': 'normal'};
				return <div>
						  <div className="code-box-meta markdown">
						    <p>按钮有三种类型：主按钮、次按钮、幽灵按钮。</p>
						    <p>通过设置 <code>type</code> 为 <code>primary</code> <code>ghost</code> 可分别创建主按钮、幽灵按钮，若不设置 <code>type</code> 值则为次按钮。不同的样式可以用来区别其重要程度。</p>
						    <p>主按钮和次按钮可独立使用，需要强引导用主按钮。幽灵按钮用于和主按钮组合。</p>
						  </div>
						  <Button type="primary">主按钮</Button>
						  <Button>次按钮</Button>
						  <Button type="ghost">幽灵按钮</Button>
						  <Button type="dashed">虚线按钮</Button>
						  
						  <br/><br/>
						  
						  <div className="code-box-meta markdown">
						    <p>按钮有大、中、小三种尺寸。</p>
						    <p>通过设置 <code>size</code> 为 <code>large</code> <code>small</code> 分别把按钮设为大、小尺寸。若不设置 <code>size</code>，则尺寸为中。</p>
						  </div>
						  <Button type="primary" size="large">大号按钮</Button>
						  <Button type="primary">中号按钮(默认)</Button>
						  <Button type="primary" size="small">小号按钮</Button>
						  
						  <br/><br/>
						  
						  <div className="code-box-meta markdown">
						    <p>通过设置 <code>shape</code> 为 <code>circle</code> <code>circle-outline</code>，可以把按钮形状设为圆形，并且 <code>circle-outline</code> 在 hover 时会有动画效果。</p>
						  </div>
						  
						  <Button type="primary" shape="circle" size="large">
						    <Icon type="search" />
						  </Button>
						  <Button type="primary" shape="circle">
						    <Icon type="search" />
						  </Button>
						  <Button type="primary" shape="circle" size="small">
						    <Icon type="search" />
						  </Button>
						  <br />
						  <Button type="ghost" shape="circle-outline" size="large">
						    <Icon type="search" />
						  </Button>
						  <Button type="ghost" shape="circle-outline">
						    <Icon type="search" />
						  </Button>
						  <Button type="ghost" shape="circle-outline" size="small">
						    <Icon type="search" />
						  </Button>
						    
						    <br/><br/>
						    
						    <div className="code-box-meta markdown">
						    <p>添加 <code>loading</code> 属性即可让按钮处于加载状态，最后两个按钮演示点击后进入加载状态。</p>
						  </div>
						    <Button type="primary" size="large" loading>
					          加载中
					        </Button>
					        <Button type="primary" loading>
					          加载中
					        </Button>
					        <Button type="primary" size="small" loading>
					          加载中
					        </Button>
					        <br />
					        <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
					          点击变加载
					        </Button>
					        <Button type="primary" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
					          <Icon type="poweroff" />点击变加载
					        </Button>
					          
					          <br/><br/>
					          
					          <div className="code-box-meta markdown">
					          <p>可以将多个 <code>Button</code> 放入 <code>Button.Group</code> 的容器中。</p>
					      <p>通过设置 <code>size</code> 为 <code>large</code> <code>small</code> 分别把按钮组合设为大、小尺寸。若不设置 <code>size</code>，则尺寸为中。</p>
					        </div>
					          
					          <h4 style={styles}>基本组合</h4>
					          <ButtonGroup>
					            <Button type="primary">确定</Button>
					            <Button type="primary">取消</Button>
					          </ButtonGroup>
					          <ButtonGroup>
					            <Button disabled>左</Button>
					            <Button disabled>中</Button>
					            <Button disabled>右</Button>
					          </ButtonGroup>
					          <ButtonGroup>
					            <Button type="primary">左</Button>
					            <Button type="ghost">中</Button>
					            <Button type="ghost">中</Button>
					            <Button>右</Button>
					          </ButtonGroup>

					          <h4 style={styles}>带图标按钮组合</h4>
					          <ButtonGroup>
					            <Button type="primary">
					              <Icon type="left" />
					              <span>后退</span>
					            </Button>
					            <Button type="primary">
					              前进
					              <Icon type="right" />
					            </Button>
					          </ButtonGroup>
					          <ButtonGroup>
					            <Button type="primary">
					              <Icon type="cloud" />
					            </Button>
					            <Button type="primary">
					              <Icon type="cloud-download" />
					            </Button>
					          </ButtonGroup>

					          <h4 style={styles}>多个组合</h4>
					          <ButtonGroup>
					            <Button type="ghost">1</Button>
					            <Button type="ghost">2</Button>
					            <Button type="ghost">3</Button>
					            <Button type="ghost">4</Button>
					            <Button type="ghost">
					              <span>前进</span>
					              <Icon type="right" />
					            </Button>
					          </ButtonGroup>

					          <h4 style={styles}>尺寸</h4>
					          <ButtonGroup size="large">
					            <Button type="ghost">大</Button>
					            <Button type="ghost">大</Button>
					            <Button type="ghost">大</Button>
					          </ButtonGroup>
					          <ButtonGroup>
					            <Button type="ghost">默认</Button>
					            <Button type="ghost">默认</Button>
					            <Button type="ghost">默认</Button>
					          </ButtonGroup>
					          <ButtonGroup size="small">
					            <Button type="ghost">小</Button>
					            <Button type="ghost">小</Button>
					            <Button type="ghost">小</Button>
					          </ButtonGroup>
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
