'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//export default Form;
+(function (UI) {

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
			key: 'renderHelp',
			value: function renderHelp() {
				var prefixCls = this.props.prefixCls;
				return React.createElement(
					'div',
					{ className: this.props.help ? prefixClsFn(prefixCls, 'explain') : '', key: 'help' },
					this.props.help
				);
			}
		}, {
			key: 'renderValidateWrapper',
			value: function renderValidateWrapper(c1, c2) {
				var classes = '';
				if (this.props.validateStatus) {
					classes = classNames({
						'has-feedback': this.props.hasFeedback,
						'has-success': this.props.validateStatus === 'success',
						'has-warning': this.props.validateStatus === 'warning',
						'has-error': this.props.validateStatus === 'error',
						'is-validating': this.props.validateStatus === 'validating'
					});
				}
				return React.createElement(
					'div',
					{ className: classes },
					c1,
					' ',
					c2
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
			key: 'renderLabel',
			value: function renderLabel() {
				var labelCol = this.props.labelCol;
				var required = this.props.required ? 'required' : '';

				return this.props.label ? React.createElement(
					'label',
					{ htmlFor: this.props.id, className: this._getLayoutClass(labelCol), required: required, key: 'label' },
					this.props.label
				) : null;
			}
		}, {
			key: 'renderChildren',
			value: function renderChildren() {
				return [this.renderLabel(), this.renderWrapper(this.renderValidateWrapper(this.props.children, this.renderHelp()))];
			}

			// 判断是否要 `.ant-form-item-compact` 样式类

		}, {
			key: '_isCompact',
			value: function _isCompact(children) {
				var _this2 = this;

				var compactControls = ['checkbox', 'radio', 'radio-group', 'static', 'file'];
				var isCompact = false;

				if (!Array.isArray(children)) {
					children = [children];
				}
				children.map(function (child) {
					var type = child.props && child.props.type;
					var prefixCls = child.props && child.props.prefixCls;
					prefixCls = prefixCls ? prefixCls.substring(prefixCls.indexOf('-') + 1) : '';

					if (type && compactControls.indexOf(type) > -1 || prefixCls && compactControls.indexOf(prefixCls) > -1) {
						isCompact = true;
					} else if (child.props && _typeof(child.props.children) === 'object') {
						isCompact = _this2._isCompact(child.props.children);
					}
				});

				return isCompact;
			}
		}, {
			key: 'renderFormItem',
			value: function renderFormItem(children) {
				var _itemClassName;

				var props = this.props;
				var prefixCls = props.prefixCls;
				var itemClassName = (_itemClassName = {}, _defineProperty(_itemClassName, prefixCls + '-item', true), _defineProperty(_itemClassName, prefixCls + '-item-compact', this._isCompact(props.children)), _defineProperty(_itemClassName, prefixCls + '-item-with-help', !!props.help), _itemClassName);

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
		help: React.PropTypes.node,
		validateStatus: React.PropTypes.oneOf(['', 'success', 'warning', 'error', 'validating']),
		hasFeedback: React.PropTypes.bool,
		wrapperCol: React.PropTypes.object,
		className: React.PropTypes.string,
		children: React.PropTypes.node
	};

	FormItem.defaultProps = {
		hasFeedback: false,
		required: false,
		prefixCls: 'ant-form'
	};

	var Form = (function (_React$Component2) {
		_inherits(Form, _React$Component2);

		function Form() {
			_classCallCheck(this, Form);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Form).apply(this, arguments));
		}

		_createClass(Form, [{
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
					' ',
					this.props.children,
					' '
				);
			}
		}]);

		return Form;
	})(React.Component);

	Form.propTypes = {
		prefixCls: React.PropTypes.string,
		horizontal: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		children: React.PropTypes.any,
		onSubmit: React.PropTypes.func
	};

	Form.defaultProps = {
		prefixCls: 'ant-form'
	};

	Form.Item = FormItem;
	Form.ValueMixin = ValueMixin;

	// 对于 import { Form, Input } from 'antd/lib/form/';
	// 的方式做向下兼容
	// https://github.com/ant-design/ant-design/pull/566
	Form.Form = Form;
	Form.Input = UI.Input;
	UI.Form = Form;
})(Smart.UI);