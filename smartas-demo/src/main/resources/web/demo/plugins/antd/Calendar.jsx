/*[[
 
]]*/
install("web.demo.plugins.antd.Model",function($S){
	var pkg = this,U = Smart.UI;
	const {Cascader,Button,DatePicker} = U;
	
	const options = [{
		  value: 'zhejiang',
		  label: '浙江',
		  children: [{
		    value: 'hangzhou',
		    label: '杭州',
		    children: [{
		      value: 'xihu',
		      label: '西湖',
		    }],
		  }],
		}, {
		  value: 'jiangsu',
		  label: '江苏',
		  children: [{
		    value: 'nanjing',
		    label: '南京',
		    children: [{
		      value: 'zhonghuamen',
		      label: '中华门',
		    }],
		  }],
		}];

		function onChange(value) {
		  console.log(value);
		}
		
		
		const CitySwitcher = React.createClass({
			  getInitialState() {
			    return {
			      text: '未选择',
			    };
			  },
			  onChange(value, selectedOptions) {
			    this.setState({
			      text: selectedOptions.map(o => o.label).join(', '),
			    });
			  },
			  render() {
			    return (
			      <span>
			        {this.state.text}
			        &nbsp;
			        <Cascader options={options} onChange={this.onChange}>
			          <a href="#">切换城市</a>
			        </Cascader>
			      </span>
			    );
			  },
			});
	
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
				return <div>
						<div className="code-box-meta markdown">
						<p>省市区级联。</p>
					    </div>
					    <Cascader options={options} onChange={onChange} />
					    <br/><br/>
					    
					    <div className="code-box-meta markdown">
					    <p>默认值通过数组的方式指定。</p>
				    	</div>
				    	<Cascader defaultValue={['zhejiang', 'hangzhou', 'xihu']} options={options} onChange={onChange} />
				    	
				    	<div className="code-box-meta markdown">
						<p>切换按钮和结果分开。</p>
					    </div>
					    <Cascader options={options} onChange={onChange} />
					    <br/><br/>
				    	<CitySwitcher />
				    	
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
