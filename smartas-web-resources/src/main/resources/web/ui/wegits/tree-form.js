'use strict';

+(function (UI, RC) {
	var Tree = UI.Tree;
	var TreeNode = UI.TreeNode;
	var ButtonGroup = UI.ButtonGroup;
	var Button = UI.Button;
	var Popconfirm = UI.Popconfirm;
	var _React = React;
	var PropTypes = _React.PropTypes;

	var Nav = React.createClass({
		displayName: 'Nav',

		propTypes: {
			service: PropTypes.object.isRequired,
			onSelect: PropTypes.func.isRequired,
			root: PropTypes.object,
			orderBy: PropTypes.func,
			idKey: PropTypes.string,
			parentKey: PropTypes.string,
			nameKey: PropTypes.string,
			snKey: PropTypes.string,
			type: PropTypes.string,
			showIcon: PropTypes.bool,
			showLine: PropTypes.bool,
			expandedKeys: PropTypes.array
		},
		getInitialState: function getInitialState() {
			return {
				treeData: []
			};
		},
		onSelect: function onSelect(selectedKeys, e) {
			var key = selectedKeys[0];
			var _props = this.props;
			var service = _props.service;
			var idKey = _props.idKey;
			var parentKey = _props.parentKey;
			var treeData = this.state.treeData;

			if (key && key > 0) {
				service.get(key, (function (data) {
					//如果查询不到结果，需要同步树结构？？
					if (data) {
						var index = _.findIndex(treeData, { id: data[parentKey] });
						this.props.onSelect(data, treeData[index]);
						return;
					}
					this.props.onSelect({ id: -9999 });
				}).bind(this));
				return;
			}
			this.props.onSelect({ id: -9999 });
		},

		componentDidMount: function componentDidMount() {
			//信息修改以后，需要同步菜单名称
			var _props2 = this.props;
			var service = _props2.service;
			var root = _props2.root;
			var orderBy = _props2.orderBy;
			var idKey = _props2.idKey;
			var parentKey = _props2.parentKey;
			var nameKey = _props2.nameKey;
			var snKey = _props2.snKey;

			service.subscribe((function (action) {
				var type = action.type,
				    data = action.data;
				var treeData = null;
				if (type === 'create') {
					treeData = _.concat(this.state.treeData, [data]);
				} else if (type === 'update') {
					treeData = this.state.treeData;
					var index = _.findIndex(treeData, { id: data.id });
					treeData[index] = data;
				} else if (type === 'remove') {
					treeData = this.state.treeData;
					_.remove(treeData, function (o) {
						return data == o[idKey];
					});
				}
				treeData != null && this.setState({
					treeData: orderBy(treeData)
				});
			}).bind(this));

			//获取导航树
			service.list((function (data) {
				//提取需要的属性
				//data = _.map(data,function(a){
				//	return _.pick(a,[idKey,parentKey,nameKey,snKey]);
				//})
				//添加虚拟根节点
				data = _.concat(data, [root]);
				this.setState({
					treeData: orderBy(data)
				});
			}).bind(this));
		},
		render: function render() {
			var _props3 = this.props;
			var service = _props3.service;
			var idKey = _props3.idKey;
			var parentKey = _props3.parentKey;
			var nameKey = _props3.nameKey;
			var expandedKeys = _props3.expandedKeys;
			var type = _props3.type;
			var showIcon = _props3.showIcon;
			var showLine = _props3.showLine;

			var loop = function loop(data) {
				return data.map(function (item) {
					if (item.children) {
						return React.createElement(
							TreeNode,
							{ title: item[nameKey], key: item[idKey] },
							loop(item.children)
						);
					}
					return React.createElement(TreeNode, { title: item[nameKey], key: item[idKey], isLeaf: true });
				});
			};
			var treeNodes = loop(l2t(this.state.treeData, { key_id: idKey, key_parent: parentKey }));
			return React.createElement(
				Tree,
				{ prefixCls: type, showIcon: showIcon, onSelect: this.onSelect, defaultExpandedKeys: expandedKeys, showLine: showLine },
				treeNodes
			);
		}
	});

	var TreeForm = React.createClass({
		displayName: 'TreeForm',

		propTypes: {
			service: PropTypes.object.isRequired,
			Form: PropTypes.func.isRequired,
			onCreate: PropTypes.func.isRequired,
			root: PropTypes.object,
			orderBy: PropTypes.func,
			idKey: PropTypes.string,
			parentKey: PropTypes.string,
			nameKey: PropTypes.string,
			snKey: PropTypes.string,
			type: PropTypes.string,
			showIcon: PropTypes.bool,
			showLine: PropTypes.bool,
			expandedKeys: PropTypes.array

		},
		getDefaultProps: function getDefaultProps() {
			return {
				type: 'z-tree',
				showIcon: false,
				showLine: true,
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
				orderBy: function orderBy(treeData) {
					return _.orderBy(treeData, ['sn'], ['asc']);
				}
			};
		},
		getInitialState: function getInitialState() {
			return { data: { id: -9999 } };
		},
		onSelect: function onSelect(data, parent) {
			this.setState({ data: data, parent: parent });
		},
		onCreate: function onCreate() {
			var data = this.state.data;

			this.setState({ data: this.props.onCreate(), parent: data });
		},
		onDelete: function onDelete() {
			var id = this.state.data.id;
			var service = this.props.service;

			service.remove(id, (function (data) {
				service.dispatch('remove', id);
				this.setState({ data: { id: -9999 } });
			}).bind(this));
		},
		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			var Form = this.refs.Form;
			var service = this.props.service;

			Form.validateFields(function (errors, values) {
				if (!!errors) {
					return;
				}
				var data = Form.getFieldsValue(),
				    isCreate = !data.id;
				var method = isCreate ? 'create' : 'update';
				service[method](data, function (id) {
					data.id = id;
					service.dispatch(method, data);
				});
			});
		},

		render: function render() {
			var _props4 = this.props;
			var Form = _props4.Form;
			var service = _props4.service;
			var idKey = _props4.idKey;
			var parentKey = _props4.parentKey;
			var nameKey = _props4.nameKey;
			var snKey = _props4.snKey;
			var root = _props4.root;
			var orderBy = _props4.orderBy;
			var expandedKeys = _props4.expandedKeys;
			var type = _props4.type;
			var showIcon = _props4.showIcon;
			var showLine = _props4.showLine;
			var _state = this.state;
			var data = _state.data;
			var parent = _state.parent;

			return React.createElement(
				'div',
				{ className: 'full-height' },
				React.createElement(
					'div',
					{ className: 'row full-height' },
					React.createElement(
						'div',
						{ className: 'col-md-4 full-height' },
						React.createElement(
							'div',
							{ className: 'panel panel-default full-height', style: { overflow: 'auto' } },
							React.createElement(
								ButtonGroup,
								{ size: 'small', style: { padding: 5 } },
								React.createElement(
									Button,
									{ onClick: this.onCreate, disabled: data[idKey] < 0 },
									'新增'
								),
								React.createElement(
									Popconfirm,
									{ title: '确定要删除当前节点吗？', onConfirm: this.onDelete },
									React.createElement(
										Button,
										{ disabled: data[idKey] < 0 },
										'删除'
									)
								)
							),
							React.createElement(Nav, { idKey: idKey,
								root: root,
								orderBy: orderBy,
								parentKey: parentKey,
								nameKey: nameKey,
								snKey: snKey,
								type: type,
								showIcon: showIcon,
								showLine: showLine,
								expandedKeys: expandedKeys,
								service: service,
								onSelect: this.onSelect })
						)
					),
					React.createElement(
						'div',
						{ className: 'col-md-8 full-height' },
						React.createElement(
							'div',
							{ className: 'panel panel-default full-height' },
							React.createElement(
								'div',
								{ className: 'panel-body full-height' },
								data.id >= 0 ? React.createElement(Form, { ref: 'Form', data: data, parent: parent, handleSubmit: this.handleSubmit }) : ''
							)
						)
					)
				)
			);
		}
	});

	UI.TreeForm = TreeForm;
})(Smart.UI, Smart.RC);