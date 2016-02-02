'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (RC) {
	var AsyncValidate = RC.AsyncValidate;
	var Util = RC.Util;
	var hoistStatics = Util.hoistStatics;
	var _React = React;
	var Component = _React.Component;

	function getDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
	}

	function argumentContainer(Container, WrappedComponent) {
		Container.displayName = 'Form(' + getDisplayName(WrappedComponent) + ')';
		Container.WrappedComponent = WrappedComponent;
		return hoistStatics(Container, WrappedComponent);
	}

	function getValueFromEvent(e) {
		// support custom element
		if (!e || !e.target) {
			return e;
		}
		var target = e.target;

		return target.type === 'checkbox' ? target.checked : target.value;
	}

	function getErrorStrs(errors) {
		if (errors) {
			return errors.map(function (e) {
				if (e.message) {
					return e.message;
				}
				return e;
			});
		}
		return errors;
	}

	function isEmptyObject(obj) {
		return Object.keys(obj).length === 0;
	}

	function flattenArray(arr) {
		return Array.prototype.concat.apply([], arr);
	}

	var defaultValidateTrigger = 'onChange';
	var defaultTrigger = defaultValidateTrigger;

	function createForm() {
		var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mapPropsToFields = option.mapPropsToFields;
		var onFieldsChange = option.onFieldsChange;
		var fieldNameProp = option.fieldNameProp;
		var fieldMetaProp = option.fieldMetaProp;
		var _option$formPropName = option.formPropName;
		var formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName;
		var withRef = option.withRef;

		function decorate(WrappedComponent) {
			var Form = (function (_Component) {
				_inherits(Form, _Component);

				function Form() {
					var _Object$getPrototypeO;

					_classCallCheck(this, Form);

					for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
						args[_key] = arguments[_key];
					}

					var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Form)).call.apply(_Object$getPrototypeO, [this].concat(args)));

					var fields = undefined;
					if (mapPropsToFields) {
						fields = mapPropsToFields(_this.props);
					}
					_this.state = {
						submitting: false
					};
					_this.fields = fields || {};
					_this.fieldsMeta = {};
					_this.cachedBind = {};
					var bindMethods = ['getFieldProps', 'isFieldValidating', 'submit', 'isSubmitting', 'getFieldError', 'setFields', 'resetFields', 'validateFieldsByName', 'getFieldsValue', 'setFieldsInitialValue', 'isFieldsValidating', 'setFieldsValue', 'getFieldValue'];
					bindMethods.forEach(function (m) {
						_this[m] = _this[m].bind(_this);
					});
					return _this;
				}

				_createClass(Form, [{
					key: 'componentDidMount',
					value: function componentDidMount() {
						this.componentDidUpdate();
					}
				}, {
					key: 'componentWillReceiveProps',
					value: function componentWillReceiveProps(nextProps) {
						if (mapPropsToFields) {
							var fields = mapPropsToFields(nextProps);
							if (fields) {
								this.fields = _extends({}, this.fields, fields);
							}
						}
					}
				}, {
					key: 'componentDidUpdate',
					value: function componentDidUpdate() {
						var fields = this.fields;
						var fieldsMeta = this.fieldsMeta;

						var fieldsMetaKeys = Object.keys(fieldsMeta);
						fieldsMetaKeys.forEach(function (s) {
							if (fieldsMeta[s].stale) {
								delete fieldsMeta[s];
							}
						});
						var fieldsKeys = Object.keys(fields);
						fieldsKeys.forEach(function (s) {
							if (!fieldsMeta[s]) {
								delete fields[s];
							}
						});
						// do not notify store
					}
				}, {
					key: 'onChange',
					value: function onChange(name, action, event) {
						var fieldMeta = this.getFieldMeta(name);
						var validate = fieldMeta.validate;

						if (fieldMeta[action]) {
							fieldMeta[action](event);
						}
						var value = getValueFromEvent(event);
						var field = this.getField(name, true);
						this.setFields(_defineProperty({}, name, _extends({}, field, {
							value: value,
							dirty: this.hasRules(validate)
						})));
					}
				}, {
					key: 'onChangeValidate',
					value: function onChangeValidate(name, action, event) {
						var fieldMeta = this.getFieldMeta(name);
						if (fieldMeta[action]) {
							fieldMeta[action](event);
						}
						var value = getValueFromEvent(event);
						var field = this.getField(name, true);
						field.value = value;
						field.dirty = true;
						this.validateFields([field], {
							action: action,
							options: {
								firstFields: !!fieldMeta.validateFirst
							}
						});
					}
				}, {
					key: 'getCacheBind',
					value: function getCacheBind(name, action, fn) {
						var cache = this.cachedBind[name] = this.cachedBind[name] || {};
						if (!cache[action]) {
							cache[action] = fn.bind(this, name, action);
						}
						return cache[action];
					}
				}, {
					key: 'getFieldMeta',
					value: function getFieldMeta(name) {
						return this.fieldsMeta[name];
					}
				}, {
					key: 'getField',
					value: function getField(name, copy) {
						var ret = this.fields[name];
						if (ret) {
							ret.name = name;
						}
						if (copy) {
							if (ret) {
								return _extends({}, ret);
							}
							return { name: name };
						}
						return ret;
					}
				}, {
					key: 'getFieldProps',
					value: function getFieldProps(name) {
						var _this2 = this;

						var fieldOption = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
						var rules = fieldOption.rules;
						var _fieldOption$trigger = fieldOption.trigger;
						var trigger = _fieldOption$trigger === undefined ? defaultTrigger : _fieldOption$trigger;
						var _fieldOption$valuePro = fieldOption.valuePropName;
						var valuePropName = _fieldOption$valuePro === undefined ? 'value' : _fieldOption$valuePro;
						var _fieldOption$validate = fieldOption.validateTrigger;
						var validateTrigger = _fieldOption$validate === undefined ? defaultValidateTrigger : _fieldOption$validate;
						var _fieldOption$validate2 = fieldOption.validate;
						var validate = _fieldOption$validate2 === undefined ? [] : _fieldOption$validate2;

						var fieldMeta = this.fieldsMeta[name] || {};

						if ('initialValue' in fieldOption) {
							fieldMeta.initialValue = fieldOption.initialValue;
						}

						var inputProps = _defineProperty({}, valuePropName, fieldMeta.initialValue);

						if (fieldNameProp) {
							inputProps[fieldNameProp] = name;
						}

						var validateRules = validate.map(function (item) {
							item.trigger = item.trigger || [];
							if (typeof item.trigger === 'string') {
								item.trigger = [item.trigger];
							}
							return item;
						});

						if (rules) {
							validateRules.push({
								trigger: validateTrigger ? [].concat(validateTrigger) : [],
								rules: rules
							});
						}

						validateRules.map(function (item) {
							return item.trigger;
						}).reduce(function (pre, curr) {
							return pre.concat(curr);
						}, []).forEach(function (action) {
							inputProps[action] = _this2.getCacheBind(name, action, _this2.onChangeValidate);
						});

						if (trigger && validateRules.every(function (item) {
							return item.trigger.indexOf(trigger) === -1 || !item.rules;
						})) {
							inputProps[trigger] = this.getCacheBind(name, trigger, this.onChange);
						}
						var field = this.getField(name);
						if (field && 'value' in field) {
							inputProps[valuePropName] = field.value;
						}

						var meta = _extends({}, fieldMeta, fieldOption, {
							validate: validateRules,
							stale: 0
						});

						this.fieldsMeta[name] = meta;

						if (fieldMetaProp) {
							inputProps[fieldMetaProp] = meta;
						}

						return inputProps;
					}
				}, {
					key: 'getFieldMember',
					value: function getFieldMember(name, member) {
						var field = this.getField(name);
						return field && field[member];
					}
				}, {
					key: 'getFieldError',
					value: function getFieldError(name) {
						return getErrorStrs(this.getFieldMember(name, 'errors'));
					}
				}, {
					key: 'getValidFieldsName',
					value: function getValidFieldsName() {
						var fieldsMeta = this.fieldsMeta;
						return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
							return !fieldsMeta[name].hidden;
						}) : [];
					}
				}, {
					key: 'getFieldsValue',
					value: function getFieldsValue(names) {
						var _this3 = this;

						var fields = names || this.getValidFieldsName();
						var allValues = {};
						fields.forEach(function (f) {
							allValues[f] = _this3.getFieldValue(f);
						});
						return allValues;
					}
				}, {
					key: 'getFieldValue',
					value: function getFieldValue(name) {
						var fields = this.fields;

						return this.getValueFromFields(name, fields);
					}
				}, {
					key: 'getValueFromFields',
					value: function getValueFromFields(name, fields) {
						var fieldsMeta = this.fieldsMeta;

						var field = fields[name];
						if (field && 'value' in field) {
							return field.value;
						}
						var fieldMeta = fieldsMeta[name];
						return fieldMeta && fieldMeta.initialValue;
					}
				}, {
					key: 'getRules',
					value: function getRules(fieldMeta, action) {
						var actionRules = fieldMeta.validate.filter(function (item) {
							return !action || item.trigger.indexOf(action) >= 0;
						}).map(function (item) {
							return item.rules;
						});
						return flattenArray(actionRules);
					}
				}, {
					key: 'getForm',
					value: function getForm() {
						return {
							getFieldsValue: this.getFieldsValue,
							getFieldValue: this.getFieldValue,
							setFieldsValue: this.setFieldsValue,
							setFields: this.setFields,
							setFieldsInitialValue: this.setFieldsInitialValue,
							getFieldProps: this.getFieldProps,
							getFieldError: this.getFieldError,
							isFieldValidating: this.isFieldValidating,
							isFieldsValidating: this.isFieldsValidating,
							isSubmitting: this.isSubmitting,
							submit: this.submit,
							validateFields: this.validateFieldsByName,
							resetFields: this.resetFields
						};
					}
				}, {
					key: 'setFields',
					value: function setFields(fields) {
						var _this4 = this;

						var originalFields = this.fields;
						var nowFields = _extends({}, originalFields, fields);
						var fieldsMeta = this.fieldsMeta;
						var nowValues = {};
						Object.keys(fieldsMeta).forEach(function (f) {
							nowValues[f] = _this4.getValueFromFields(f, nowFields);
						});
						var changedFieldsName = Object.keys(fields);
						Object.keys(nowValues).forEach(function (f) {
							var value = nowValues[f];
							var fieldMeta = fieldsMeta[f];
							if (fieldMeta && fieldMeta.normalize) {
								var nowValue = fieldMeta.normalize(value, _this4.getValueFromFields(f, originalFields), nowValues);
								if (nowValue !== value) {
									nowFields[f] = _extends({}, nowFields[f], { value: nowValue });
									if (changedFieldsName.indexOf(f) === -1) {
										changedFieldsName.push(f);
									}
								}
							}
						});
						this.fields = nowFields;
						if (onFieldsChange) {
							(function () {
								var changedFields = {};
								changedFieldsName.forEach(function (f) {
									changedFields[f] = nowFields[f];
								});
								onFieldsChange(_this4.props, changedFields);
							})();
						}
						this.forceUpdate();
					}
				}, {
					key: 'setFieldsValue',
					value: function setFieldsValue(fieldsValue) {
						var fields = {};
						for (var name in fieldsValue) {
							if (fieldsValue.hasOwnProperty(name)) {
								fields[name] = {
									name: name,
									value: fieldsValue[name]
								};
							}
						}
						this.setFields(fields);
					}
				}, {
					key: 'setFieldsInitialValue',
					value: function setFieldsInitialValue(initialValues) {
						var fieldsMeta = this.fieldsMeta;
						for (var name in initialValues) {
							if (initialValues.hasOwnProperty(name)) {
								var fieldMeta = fieldsMeta[name];
								fieldsMeta[name] = _extends({}, fieldMeta, {
									initialValue: initialValues[name]
								});
							}
						}
					}
				}, {
					key: 'hasRules',
					value: function hasRules(validate) {
						if (validate) {
							return validate.some(function (item) {
								return !!item.rules;
							});
						}
						return false;
					}
				}, {
					key: 'validateFields',
					value: function validateFields(fields, _ref, callback) {
						var _this5 = this;

						var fieldNames = _ref.fieldNames;
						var action = _ref.action;
						var _ref$options = _ref.options;
						var options = _ref$options === undefined ? {} : _ref$options;

						var allRules = {};
						var allValues = {};
						var allFields = {};
						var alreadyErrors = {};
						fields.forEach(function (field) {
							var name = field.name;
							if (options.force !== true && field.dirty === false) {
								if (field.errors) {
									alreadyErrors[name] = field.errors;
								}
								return;
							}
							var fieldMeta = _this5.getFieldMeta(name);
							field.errors = undefined;
							field.validating = true;
							field.dirty = true;
							allRules[name] = _this5.getRules(fieldMeta, action);
							allValues[name] = field.value;
							allFields[name] = field;
						});
						this.setFields(allFields);
						var nowFields = this.fields;
						// in case normalize
						Object.keys(allValues).forEach(function (f) {
							allValues[f] = nowFields[f].value;
						});
						if (callback && isEmptyObject(allFields)) {
							callback(isEmptyObject(alreadyErrors) ? null : alreadyErrors, this.getFieldsValue(fieldNames));
							return;
						}
						new AsyncValidate(allRules).validate(allValues, options, function (errors) {
							var errorsGroup = _extends({}, alreadyErrors);
							if (errors && errors.length) {
								errors.forEach(function (e) {
									var fieldName = e.field;
									var fieldErrors = errorsGroup[fieldName] || [];
									fieldErrors.push(e);
									errorsGroup[fieldName] = fieldErrors;
								});
							}
							var expired = [];
							var nowAllFields = {};
							Object.keys(allRules).forEach(function (name) {
								var fieldErrors = errorsGroup[name];
								var nowField = _this5.getField(name, true);
								// avoid concurrency problems
								if (nowField.value !== allValues[name]) {
									expired.push(name);
								} else {
									nowField.errors = fieldErrors;
									nowField.value = allValues[name];
									nowField.validating = false;
									nowField.dirty = false;
									nowAllFields[name] = nowField;
								}
							});
							_this5.setFields(nowAllFields);
							if (callback) {
								if (expired.length) {
									expired.forEach(function (name) {
										errorsGroup[name] = [new Error(name + ' need to revalidate')];
										errorsGroup[name].expired = true;
									});
								}
								callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this5.getFieldsValue(fieldNames));
							}
						});
					}
				}, {
					key: 'validateFieldsByName',
					value: function validateFieldsByName(ns, opt, cb) {
						var _this6 = this;

						var names = ns;
						var callback = cb;
						var options = opt;
						if (typeof names === 'function') {
							callback = names;
							options = {};
							names = undefined;
						} else if (Array.isArray(ns)) {
							if (typeof options === 'function') {
								callback = options;
								options = {};
							} else {
								options = options || {};
							}
						} else {
							callback = options;
							options = names || {};
							names = undefined;
						}
						var fieldNames = names || this.getValidFieldsName();
						var fields = fieldNames.map(function (name) {
							var fieldMeta = _this6.getFieldMeta(name);
							if (!_this6.hasRules(fieldMeta.validate)) {
								return null;
							}
							var field = _this6.getField(name, true);
							field.value = _this6.getFieldValue(name);
							return field;
						}).filter(function (f) {
							return !!f;
						});
						if (!fields.length) {
							if (callback) {
								callback(null, this.getFieldsValue(fieldNames));
							}
							return;
						}
						if (!('firstFields' in options)) {
							options.firstFields = fieldNames.filter(function (name) {
								var fieldMeta = _this6.getFieldMeta(name);
								return !!fieldMeta.validateFirst;
							});
						}
						this.validateFields(fields, { fieldNames: fieldNames, options: options }, callback);
					}
				}, {
					key: 'isFieldValidating',
					value: function isFieldValidating(name) {
						return this.getFieldMember(name, 'validating');
					}
				}, {
					key: 'isFieldsValidating',
					value: function isFieldsValidating(ns) {
						var names = ns || this.getValidFieldsName();
						return names.some(this.isFieldValidating);
					}
				}, {
					key: 'isSubmitting',
					value: function isSubmitting() {
						return this.state.submitting;
					}
				}, {
					key: 'submit',
					value: function submit(callback) {
						var _this7 = this;

						var fn = function fn() {
							_this7.setState({
								submitting: false
							});
						};
						this.setState({
							submitting: true
						});
						callback(fn);
					}
				}, {
					key: 'resetFields',
					value: function resetFields(ns) {
						var newFields = {};
						var fields = this.fields;

						var changed = false;
						var names = ns || Object.keys(fields);
						names.forEach(function (name) {
							var field = fields[name];
							if (field && 'value' in field) {
								changed = true;
								newFields[name] = {};
							}
						});
						if (changed) {
							this.setFields(newFields);
						}
					}
				}, {
					key: 'render',
					value: function render() {
						var formProps = _defineProperty({}, formPropName, this.getForm());
						var fieldsMeta = this.fieldsMeta;
						for (var name in fieldsMeta) {
							if (fieldsMeta.hasOwnProperty(name)) {
								fieldsMeta[name].stale = 1;
							}
						}
						if (withRef) {
							formProps.ref = 'wrappedComponent';
						}
						return React.createElement(WrappedComponent, _extends({}, formProps, this.props));
					}
				}]);

				return Form;
			})(Component);

			return argumentContainer(Form, WrappedComponent);
		}

		return decorate;
	}
	RC.createForm = createForm;
})(Smart.RC);