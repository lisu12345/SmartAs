'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//扩展了paths属性,提供数组结构的面包屑控件
+(function (UI) {
		var _React = React;
		var cloneElement = _React.cloneElement;

		var BreadcrumbItem = React.createClass({
				displayName: 'BreadcrumbItem',
				getDefaultProps: function getDefaultProps() {
						return {
								prefixCls: 'ant-breadcrumb',
								separator: '/'
						};
				},

				propTypes: {
						prefixCls: React.PropTypes.string,
						separator: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
						href: React.PropTypes.string
				},
				render: function render() {
						var _props = this.props;
						var prefixCls = _props.prefixCls;
						var separator = _props.separator;
						var children = _props.children;

						var link = React.createElement(
								'a',
								_extends({ className: prefixCls + '-link' }, this.props),
								children
						);
						if (typeof this.props.href === 'undefined') {
								link = React.createElement(
										'span',
										_extends({ className: prefixCls + '-link' }, this.props),
										children
								);
						}
						return React.createElement(
								'span',
								null,
								link,
								React.createElement(
										'span',
										{ className: prefixCls + '-separator' },
										separator
								)
						);
				}
		});

		var Breadcrumb = React.createClass({
				displayName: 'Breadcrumb',
				getDefaultProps: function getDefaultProps() {
						return {
								prefixCls: 'ant-breadcrumb',
								separator: '/'
						};
				},

				propTypes: {
						prefixCls: React.PropTypes.string,
						separator: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
						routes: React.PropTypes.array,
						paths: React.PropTypes.array,
						params: React.PropTypes.object
				},
				render: function render() {
						var crumbs = undefined;
						var _props2 = this.props;
						var separator = _props2.separator;
						var prefixCls = _props2.prefixCls;
						var routes = _props2.routes;
						var paths = _props2.paths;
						var params = _props2.params;
						var children = _props2.children;

						if (paths && paths.length > 0) {
								crumbs = paths.map(function (name, i) {
										return React.createElement(
												BreadcrumbItem,
												{ separator: separator, key: name },
												name
										);
								});
						} else if (routes && routes.length > 0) {
								(function () {
										var paths = [];
										crumbs = routes.map(function (route, i) {
												if (!route.breadcrumbName) {
														return null;
												}
												var name = route.breadcrumbName.replace(/\:(.*)/g, function (replacement, key) {
														return params[key] || replacement;
												});

												var link = undefined;
												var path = route.path.replace(/^\//, '');
												Object.keys(params).forEach(function (key) {
														path = path.replace(':' + key, params[key]);
												});
												if (path) {
														paths.push(path);
												}

												if (i === routes.length - 1) {
														link = React.createElement(
																'span',
																null,
																name
														);
												} else {
														link = React.createElement(
																'a',
																{ href: '#/' + paths.join('/') },
																name
														);
												}
												return React.createElement(
														BreadcrumbItem,
														{ separator: separator, key: name },
														link
												);
										});
								})();
						} else {
								crumbs = React.Children.map(children, function (element, index) {
										return cloneElement(element, {
												separator: separator,
												key: index
										});
								});
						}
						return React.createElement(
								'div',
								{ className: prefixCls },
								crumbs
						);
				}
		});

		Breadcrumb.Item = BreadcrumbItem;
		UI.Breadcrumb = Breadcrumb;
})(Smart.UI);