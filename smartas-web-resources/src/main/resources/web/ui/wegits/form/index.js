'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//export default Form;
+(function (UI, RC) {
	var createForm = RC.createForm;

	function merge() {
		var ret = {};
		var args = [].slice.call(arguments, 0);
		args.forEach(function (a) {
			Object.keys(a).forEach(function (k) {
				ret[k] = a[k];
			});
		});
		return ret;
	}

	var ValueMixin = {
		setValue: function setValue(field, e) {
			var v = e;
			var target = e && e.target;
			if (target) {
				if ((target.nodeName + '').toLowerCase() === 'input' && target.type === 'checkbox') {
					v = target.checked;
				} else {
					v = e.target.value;
				}
			}
			var newFormData = {};
			newFormData[field] = v;
			this.setState({
				formData: merge(this.state.formData, newFormData)
			});
		}
	};

	function prefixClsFn(prefixCls) {
		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		return args.map(function (s) {
			return prefixCls + '-' + s;
		}).join(' ');
	}

	var FormItem = (function (_React$Component) {
		_inherits(FormItem, _React$Component);

		function FormItem() {
			_classCallCheck(this, FormItem);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(FormItem).apply(this, arguments));
		}

		_createClass(FormItem, [{
			key: '_getLayoutClass',
			value: function _getLayoutClass(colDef) {
				if (!colDef) {
					return '';
				}
				var span = colDef.span;
				var offset = colDef.offset;

				var col = span ? 'col-' + span : '';
				var offsetCol = offset ? ' col-offset-' + offset : '';
				return col + offsetCol;
			}
		}, {
			key: 'getHelpMsg',
			value: function getHelpMsg() {
				var context = this.context;
				var props = this.props;
				if (props.help === undefined && context.form) {
					return (context.form.getFieldError(this.getId()) || []).join(', ');
				}

				return props.help;
			}
		}, {
			key: 'getId',
			value: function getId() {
				return this.props.children.props && this.props.children.props.id;
			}
		}, {
			key: 'getMeta',
			value: function getMeta() {
				return this.props.children.props && this.props.children.props.__meta;
			}
		}, {
			key: 'renderHelp',
			value: function renderHelp() {
				var props = this.props;
				var prefixCls = props.prefixCls;
				var help = this.getHelpMsg();
				return React.createElement(
					'div',
					{ className: !!help ? prefixClsFn(prefixCls, 'explain') : '', key: 'help' },
					help
				);
			}
		}, {
			key: 'getValidateStatus',
			value: function getValidateStatus() {
				var _context$form = this.context.form;
				var isFieldValidating = _context$form.isFieldValidating;
				var getFieldError = _context$form.getFieldError;
				var getFieldValue = _context$form.getFieldValue;

				var field = this.getId();

				if (isFieldValidating(field)) {
					return 'validating';
				} else if (!!getFieldError(field)) {
					return 'error';
				} else if (getFieldValue(field) !== undefined) {
					return 'success';
				}
			}
		}, {
			key: 'renderValidateWrapper',
			value: function renderValidateWrapper(c1, c2, c3) {
				var classes = '';
				var form = this.context.form;
				var props = this.props;
				var validateStatus = props.validateStatus === undefined && form ? this.getValidateStatus() : props.validateStatus;

				if (validateStatus) {
					classes = classNames({
						'has-feedback': props.hasFeedback,
						'has-success': validateStatus === 'success',
						'has-warning': validateStatus === 'warning',
						'has-error': validateStatus === 'error',
						'is-validating': validateStatus === 'validating'
					});
				}
				return React.createElement(
					'div',
					{ className: this.props.prefixCls + '-item-control ' + classes },
					c1,
					c2,
					c3
				);
			}
		}, {
			key: 'renderWrapper',
			value: function renderWrapper(children) {
				var wrapperCol = this.props.wrapperCol;
				return React.createElement(
					'div',
					{ className: this._getLayoutClass(wrapperCol), key: 'wrapper' },
					children
				);
			}
		}, {
			key: 'isRequired',
			value: function isRequired() {
				if (this.context.form) {
					var meta = this.getMeta() || {};
					var validate = meta.validate || [];

					return validate.filter(function (item) {
						return !!item.rules;
					}).some(function (item) {
						return item.rules.some(function (rule) {
							return rule.required;
						});
					});
				}
				return false;
			}
		}, {
			key: 'renderLabel',
			value: function renderLabel() {
				var props = this.props;
				var labelCol = props.labelCol;
				var required = props.required === undefined ? this.isRequired() : props.required;

				return props.label ? React.createElement(
					'label',
					{ htmlFor: props.id || this.getId(), className: this._getLayoutClass(labelCol), required: required, key: 'label' },
					props.label
				) : null;
			}
		}, {
			key: 'renderChildren',
			value: function renderChildren() {
				var props = this.props;
				var children = React.Children.map(props.children, function (child) {
					if (typeof child.type === 'function' && !child.props.size) {
						return React.cloneElement(child, { size: 'large' });
					}

					return child;
				});
				return [this.renderLabel(), this.renderWrapper(this.renderValidateWrapper(children, this.renderHelp(), props.extra))];
			}
		}, {
			key: 'renderFormItem',
			value: function renderFormItem(children) {
				var _itemClassName;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, prefixCls + '-item', true), _defineProperty(_itemClassName, prefixCls + '-item-with-help', !!this.getHelpMsg()), _defineProperty(_itemClassName, '' + props.className, !!props.className), _itemClassName);

				return React.createElement(
					'div',
					{ className: classNames(itemClassName) },
					children
				);
			}
		}, {
			key: 'render',
			value: function render() {
				var children = this.renderChildren();
				return this.renderFormItem(children);
			}
		}]);

		return FormItem;
	})(React.Component);

	FormItem.propTypes = {
		prefixCls: React.PropTypes.string,
		label: React.PropTypes.node,
		labelCol: React.PropTypes.object,
		help: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.bool]),
		validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
		hasFeedback: React.PropTypes.bool,
		wrapperCol: React.PropTypes.object,
		className: React.PropTypes.string,
		id: React.PropTypes.string,
		children: React.PropTypes.node
	};

	FormItem.defaultProps = {
		hasFeedback: false,
		prefixCls: 'ant-form'
	};

	FormItem.contextTypes = {
		form: React.PropTypes.object
	};

	var Form = (function (_React$Component2) {
		_inherits(Form, _React$Component2);

		function Form() {
			_classCallCheck(this, Form);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
		}

		_createClass(Form, [{
			key: 'getChildContext',
			value: function getChildContext() {
				return {
					form: this.props.form
				};
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames;

				var _props = this.props;
				var prefixCls = _props.prefixCls;
				var className = _props.className;

				var formClassName = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-horizontal', this.props.horizontal), _defineProperty(_classNames, prefixCls + '-inline', this.props.inline), _classNames));

				return React.createElement(
					'form',
					_extends({}, this.props, {
						className: formClassName }),
					this.props.children
				);
			}
		}]);

		return Form;
	})(React.Component);

	Form.propTypes = {
		prefixCls: React.PropTypes.string,
		horizontal: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		form: React.PropTypes.object,
		children: React.PropTypes.any,
		onSubmit: React.PropTypes.func
	};

	Form.defaultProps = {
		prefixCls: 'ant-form'
	};

	Form.childContextTypes = {
		form: React.PropTypes.object
	};

	Form.create = function () {
		var o = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		var options = _extends({}, o, {
			fieldNameProp: 'id',
			fieldMetaProp: '__meta'
		});

		return createForm(options);
	};
	Form.Item = FormItem;

	// @Deprecated
	Form.ValueMixin = ValueMixin;

	// 对于 import { Form, Input } from 'antd/lib/form/';
	// 的方式做向下兼容
	// https://github.com/ant-design/ant-design/pull/566
	Form.Form = Form;
	Form.Input = UI.Input;
	UI.Form = Form;
	UI.FormItem = FormItem;
})(Smart.UI, Smart.RC);