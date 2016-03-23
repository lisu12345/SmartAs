/*[[
 
]]*/
install("web.demo.plugins.antd.Calendar",function($S){
	var pkg = this,U = Smart.UI;
	const {Calendar,Button,DatePicker} = U;
	
	function onPanelChange(value, mode) {
	  console.log(value, mode);
	}
	
	function dateCellRender(value) {
	  return <div>自定义日数据 {value.getDayOfMonth()}</div>;
	}

	function monthCellRender(value) {
	  return <div>自定义月数据 {value.getMonth()}</div>;
	}
	
	
	function getListData(value) {
		  let listData;
		  switch (value.getDayOfMonth()) {
		    case 8:
		      listData = [
		        { type: 'warn', content: '这里是警告事项.' },
		        { type: 'normal', content: '这里是普通事项.' }
		      ]; break;
		    case 10:
		      listData = [
		        { type: 'warn', content: '这里是警告事项.' },
		        { type: 'normal', content: '这里是普通事项.' },
		        { type: 'error', content: '这里是错误事项.' }
		      ]; break;
		    case 15:
		      listData = [
		        { type: 'warn', content: '这里是警告事项.' },
		        { type: 'normal', content: '这里是普通事项好长啊。。....' },
		        { type: 'error', content: '这里是错误事项.' },
		        { type: 'error', content: '这里是错误事项.' },
		        { type: 'error', content: '这里是错误事项.' },
		        { type: 'error', content: '这里是错误事项.' }
		      ]; break;
		    default:
		  }
		  return listData || [];
		}

		function dateCellRender1(value) {
		  let listData = getListData(value);
		  return (
		    <ul className="events">
		      {
		        listData.map((item, index) =>
		          <li key={index}>
		            <span className={`event-${item.type}`}>●</span>
		            {item.content}
		          </li>
		        )
		      }
		    </ul>
		  );
		}


		function getMonthData(value) {
		  if (value.getMonth() === 8) {
		    return 1394;
		  }
		}

		function monthCellRender1(value) {
		  let num = getMonthData(value);
		  return num ? <div className="notes-month">
		    <section>{num}</section>
		    <span>待办事项数</span>
		  </div> : null;
		}

	var Node = React.createClass({
		render: function() {
			return <div className="code-boxs">
					<div className="code-boxes-col-1-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>1.一个通用的日历面板，支持年/月切换。</p>
						    </div>
						    <div  className="code-box-body">
						    	<Calendar onPanelChange={onPanelChange} />
						    </div>
					    </div>
					</div>
					
					<div className="code-boxes-col-1-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>2.用 dateCellRender 和 monthCellRender 函数来自定义需要渲染的数据。</p>
						    </div>
						    <div  className="code-box-body">
						    	<Calendar defaultValue={new Date('2010-10-10')}
						    		dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
						    </div>
					    </div>
					</div>
					
					<div className="code-boxes-col-1-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>3.一个复杂的应用实例。</p>
						    </div>
						    <div  className="code-box-body">
						    <Calendar dateCellRender={dateCellRender1} monthCellRender={monthCellRender1} />
						    </div>
					    </div>
				    </div>
				    <div className="code-boxes-col-1-1">
						<div className="code-box">
							<div className="code-box-meta markdown">
								<p>4.用于嵌套在空间有限的容器中</p>
						    </div>
						    <div  className="code-box-body">
							  <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
							    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
							  </div>
						    </div>
					    </div>
				    </div>
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
