+ function(Namespace) {
	var NS = Namespace.register("Smart.UI"),
		request = Smart.Resource.ajax;

	NS.Hello = React.createClass({
		render: function() {
			return <div>Hello {this.props.name}</div>;
		}
	});

	var PanelTools = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//collapsible:true,minimizable:true,maximizable:true,closable:true
		//},var
		render: function() {
			var tools = [],
				props = this.props;
			props.collapsible && tools.push('collapse');
			props.minimizable && tools.push('min');
			props.maximizable && tools.push('max');
			props.closable && tools.push('close');
			return (<div className="panel-tool">
						{
							_.map(tools,function(value){
								return (<a href="javascript:void(0)" className={'panel-tool-' + value}/>);
							})
						}
			  		</div>);
		}
	});


	var Panel = NS.Panel = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function() {
			return (<div className="smart panel">
				 {this.props.children} 
			  </div>);
		}
	});


	Panel.Header = React.createClass({
		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function() {
			return (<div className="panel-header">
					<div className="panel-title">{this.props.title}</div>
					<PanelTools {...this.props}/>
				</div>)
		}
	});


	var View1 = React.createClass({

		render: function() {
			var props = this.props;
			if (!props.rownumbers) {
				return null;
			}
			return (
				<div className="datagrid-view1" style={{width: '31px'}}>
					<div className="datagrid-header" style={{width: '31px',height: '25px'}}>
						<div className="datagrid-header-inner">
						<table className="datagrid-htable" border="0" cellSpacing="0" cellPadding="0" style={{height: '25px'}}>
							<tbody>
								<tr className="datagrid-header-row">
									<td rowSpan="0"><div className="datagrid-header-rownumber"></div></td>
								</tr>
							</tbody>
						</table>
						</div>
					</div>
					<View1Body rows={this.props.rows} height={this.props.height}/>
					<div className="datagrid-footer" style={{width: '31px'}}>
						<div className="datagrid-footer-inner" style={{display: 'none'}}></div>
			  		</div>
				</div>
			);
		}
	});

	var View1Row = React.createClass({

		render: function() {
			return (
				<tr className="datagrid-row" style={{height: '25px'}}>
					<td className="datagrid-td-rownumber">
						<div className="datagrid-cell-rownumber">{this.props.rownumber + 1}</div>
					</td>
				</tr>
			);
		}
	});

	var View1Body = React.createClass({

		render: function() {
			var rows = this.props.rows;
			if (rows == 0) {
				return null;
			}
			return (
				<div className="datagrid-body" style={{width: '31px', marginTop: '0px' ,height: this.props.height-26}} >						
					<div className="datagrid-body-inner">
					<table className="datagrid-btable" cellSpacing="0" cellPadding="0" border="0">
						<tbody>
							{_.times(rows,function(i){return <View1Row key={'view1-row-' + i} rownumber={i}/>})}
						</tbody>
					</table>
					</div>
				</div>
			);
		}
	});

	var ViewCell = React.createClass({

		render: function() {
			var props = this.props,
				column = props.column;
			return (<td field={column.field}>
						<div style={{width : column.width}} className="datagrid-cell">{props.value}</div>
					</td>);
		}
	});

	var row = function(datas, columns) {
		return _.map(datas, function(data, i) {
			return (
				<tr key={'view-row-' + i} className="datagrid-row" style={{height: '25px'}}>
				{_.map(columns,function(c,j){
						var value = c.render.call(data,data[c.field]);
						return <ViewCell key={'view-cell-' + i + '-' + j} column={c} value={value}/>
					})
				}
				</tr>);
		});
	};

	var ViewBody = React.createClass({
		render: function() {
			return (
				<div className="datagrid-body" onScroll={this.props.bodyScroll} style={{marginTop: '0px', overflowX: 'auto',height: this.props.height-26}}>
				<table className="datagrid-btable table-hover" cellSpacing="0" cellPadding="0" border="0">
					<tbody>
						{row(this.props.datas,this.props.columns)}	
					</tbody>
				</table>
			</div>
			);
		}
	});



	var View = React.createClass({

		getColumnsInfo: function(list) {
			var cl = IGrid.Column;
			return React.Children.map(list, function(node) {
				return _.chain(node.props).pick(cl.props).defaults(cl.defaults).value();
			});
		},

		getInitialState: function() {
			return {
				columns: this.getColumnsInfo(this.props.children)
			}
		},



		render: function() {
			var columns = [];
			return (
				<div className="datagrid-view2" style={{left: '32px',right: 0}}>
					<div className="datagrid-header" style={{ height: '25px'}}>	
						<div className="datagrid-header-inner">							 
						<table className="datagrid-htable" border="0" cellSpacing="0" cellPadding="0" style={{height: '25px'}}>
							<tbody>
								<tr className="datagrid-header-row">
									{this.props.children}
								</tr>
							</tbody>
						</table>
						</div>
					</div>
					<ViewBody bodyScroll={this.props.bodyScroll} columns={this.state.columns} datas={this.props.datas} height={this.props.height} />
					<div className="datagrid-footer" style={{/*width: '860px'*/}}>
						<div className="datagrid-footer-inner" style={{display: 'none'}}></div>
					</div>
				</div>
			);
		}
	});

	var Pagination = React.createClass({
		render: function() {
			return (<div className="datagrid-pager pagination">
					<table cellSpacing="0" cellPadding="0" border="0">
						<tbody>
							<tr>
								<td><select className="pagination-page-list"><option>10</option>
										<option>20</option>
										<option>30</option>
										<option>40</option>
										<option>50</option></select></td>
								<td><div className="pagination-btn-separator"></div></td>
							</tr>
						</tbody>
					</table>
					<div className="pagination-info">显示1到10,共53记录</div>
				</div>);
		}
	});


	var IGrid = NS.IGrid = React.createClass({

		getDefaultProps: function() {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true,
				method: 'get',
				height: 298
			};
		},
		getInitialState: function() {
			return {
				datas: this.props.datas || [],
			};
		},
		componentDidMount: function() {
			var props = this.props,
				context = this;
			if (props.url) {
				request({
					type: props.method,
					url: props.url,
					success: function(data) {
						context.setState({
							datas: data
						});
					},
					error: function() {

					}
				});
			}



			/*body2.bind("scroll_", function() {
				//var b1 = view1.children("div.datagrid-body");
				body1.scrollTop($(this).scrollTop());
				var c1 = body1.children(":first");
				var c2 = body2.children(":first");
				if (c1.length && c2.length) {
					var _85 = c1.offset().top;
					var _86 = c2.offset().top;
					if (_85 != _86) {
						body1.scrollTop(body1.scrollTop() + _85 - _86);
					}
				}
				view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
				body2.children("table.datagrid-btable-frozen").css("left", -$(this)._scrollLeft());
			});*/
			//.datagrid(_.extend({
			//	columns: [this.columns]
			//}, _.omit(this.props, 'children')));
		},
		bodyScroll: function() {

			var iGrid = $(ReactDOM.findDOMNode(this)),
				view1 = iGrid.find("div.datagrid-view1"),
				view2 = iGrid.find("div.datagrid-view2"),
				body1 = view1.find("div.datagrid-body"),
				body2 = view2.find("div.datagrid-body");

			body1.scrollTop(body2.scrollTop());
			var c1 = body1.children(":first");
			var c2 = body2.children(":first");
			if (c1.length && c2.length) {
				var _85 = c1.offset().top;
				var _86 = c2.offset().top;
				if (_85 != _86) {
					body1.scrollTop(body1.scrollTop() + _85 - _86);
				}
			}
			view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft(body2._scrollLeft());
			body2.children("table.datagrid-btable-frozen").css("left", -body2._scrollLeft());
		},
		render: function() {
			var datas = this.state.datas,
				height = this.props.height,
				viewHeight = height - (this.props.pagination ? 31 : 0);
			return (
				<div className="datagrid-wrap panel-body" style={{height: height}}>
					<div className="datagrid-view" style={{height: viewHeight}}>
						<View1 rownumbers={this.props.rownumbers} rows={datas.length} height={viewHeight}/>
						<View datas={datas} height={viewHeight} bodyScroll={this.bodyScroll}>
							{this.props.children}
						</View>
					</div>
					<Pagination/>
				</div>
			);
		}
	});

	IGrid.Column = React.createClass({
		statics: {
			props: ['field', 'title', 'render', 'width'],
			defaults: {
				render: _.identity
			}
		},
		//shouldComponentUpdate: function() {
		//	return false;
		//},
		render: function() {
			return (<td field={this.props.field}>
					<div className="datagrid-cell" style={{width : this.props.width}}>
						<span>{this.props.title}</span><span className="datagrid-sort-icon">&nbsp;</span>
					</div></td>);
		}
	});


	//带查询功能列表
	var QGrid = NS.QGrid = React.createClass({
		render: function() {

		}
	});



	NS.Grid = React.createClass({

		getDefaultProps: function() {
			return {
				rownumbers: true,
				singleSelect: true,
				pagination: true
			};
		},
		componentDidMount: function() {
			$(ReactDOM.findDOMNode(this)).datagrid(_.extend({
				columns: [this.columns]
			}, _.omit(this.props, 'children')));
		},
		render: function() {

			this.columns = React.Children.map(this.props.children, function(node) {
				return _.omit(node.props, 'children');
			});
			return <table className="smart easyui-datagrid"></table>;
		}
	});

	NS.Column = React.createClass({
		shouldComponentUpdate: function() {
			return false;
		},
		render: function() {
			return null;
		}
	});
}(Smart.Namespace)