'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//v0.14.1-2016.3.9
+(function (RC) {
	var AsyncValidate = RC.AsyncValidate;
	var Util = RC.Util;
	var AsyncValidator = RC.AsyncValidator;
	var GregorianCalendar = RC.GregorianCalendar;
	var hoistStatics = Util.hoistStatics;
	var scrollIntoView = Util.scrollIntoView;
	var _React = React;
	var Component = _React.Component;

	function getDisplayName(WrappedComponent) {
		return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
	}

	function argumentContainer(Container, WrappedComponent) {
		/* eslint no-param-reassign:0 */
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
				if ('message' in e) {
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

	function mirror(obj) {
		return obj;
	}

	function hasRules(validate) {
		if (validate) {
			return validate.some(function (item) {
				return !!item.rules && item.rules.length;
			});
		}
		return false;
	}

	function getParams(ns, opt, cb) {
		var names = ns;
		var callback = cb;
		var options = opt;
		if (cb === undefined) {
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
		}
		return {
			names: names,
			callback: callback,
			options: options
		};
	}

	///createBaseForm

	var defaultValidateTrigger = 'onChange';
	var defaultTrigger = defaultValidateTrigger;

	function createBaseForm() {
		var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
		var mixins = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
		var mapPropsToFields = option.mapPropsToFields;
		var onFieldsChange = option.onFieldsChange;
		var fieldNameProp = option.fieldNameProp;
		var fieldMetaProp = option.fieldMetaProp;
		var validateMessages = option.validateMessages;
		var _option$mapProps = option.mapProps;
		var mapProps = _option$mapProps === undefined ? mirror : _option$mapProps;
		var _option$formPropName = option.formPropName;
		var formPropName = _option$formPropName === undefined ? 'form' : _option$formPropName;
		var withRef = option.withRef;

		function decorate(WrappedComponent) {
			var Form = React.createClass({
				displayName: 'Form',

				mixins: mixins,

				getInitialState: function getInitialState() {
					var fields = undefined;
					if (mapPropsToFields) {
						fields = mapPropsToFields(this.props);
					}
					this.fields = fields || {};
					this.fieldsMeta = {};
					this.cachedBind = {};
					return {
						submitting: false
					};
				},
				componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
					if (mapPropsToFields) {
						var fields = mapPropsToFields(nextProps);
						if (fields) {
							var instanceFields = this.fields = _extends({}, this.fields);
							for (var fieldName in fields) {
								if (fields.hasOwnProperty(fieldName)) {
									instanceFields[fieldName] = _extends({}, fields[fieldName], {
										// keep instance
										instance: instanceFields[fieldName] && instanceFields[fieldName].instance
									});
								}
							}
						}
					}
				},
				onChange: function onChange(name, action, event) {
					var fieldMeta = this.getFieldMeta(name);
					var validate = fieldMeta.validate;

					if (fieldMeta[action]) {
						fieldMeta[action](event);
					}
					var value = getValueFromEvent(event);
					var field = this.getField(name, true);
					this.setFields(_defineProperty({}, name, _extends({}, field, {
						value: value,
						dirty: hasRules(validate)
					})));
				},
				onChangeValidate: function onChangeValidate(name, action, event) {
					var fieldMeta = this.getFieldMeta(name);
					if (fieldMeta[action]) {
						fieldMeta[action](event);
					}
					var value = getValueFromEvent(event);
					var field = this.getField(name, true);
					field.value = value;
					field.dirty = true;
					this.validateFieldsInternal([field], {
						action: action,
						options: {
							firstFields: !!fieldMeta.validateFirst
						}
					});
				},
				getCacheBind: function getCacheBind(name, action, fn) {
					var cache = this.cachedBind[name] = this.cachedBind[name] || {};
					if (!cache[action]) {
						cache[action] = fn.bind(this, name, action);
					}
					return cache[action];
				},
				getFieldMeta: function getFieldMeta(name) {
					return this.fieldsMeta[name];
				},
				getField: function getField(name, copy) {
					var ret = this.fields[name];
					if (ret) {
						ret.name = name;
					}
					if (copy) {
						if (ret) {
							return _extends({}, ret);
						}
						return {
							name: name
						};
					}
					return ret;
				},
				getFieldProps: function getFieldProps(name) {
					var _this = this;

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
						var newItem = _extends({}, item, {
							trigger: item.trigger || []
						});
						if (typeof newItem.trigger === 'string') {
							newItem.trigger = [newItem.trigger];
						}
						return newItem;
					});

					if (rules) {
						validateRules.push({
							trigger: validateTrigger ? [].concat(validateTrigger) : [],
							rules: rules
						});
					}

					validateRules.filter(function (item) {
						return !!item.rules && item.rules.length;
					}).map(function (item) {
						return item.trigger;
					}).reduce(function (pre, curr) {
						return pre.concat(curr);
					}, []).forEach(function (action) {
						inputProps[action] = _this.getCacheBind(name, action, _this.onChangeValidate);
					});

					function checkRule(item) {
						return item.trigger.indexOf(trigger) === -1 || !item.rules || !item.rules.length;
					}

					if (trigger && validateRules.every(checkRule)) {
						inputProps[trigger] = this.getCacheBind(name, trigger, this.onChange);
					}
					var field = this.getField(name);
					if (field && 'value' in field) {
						inputProps[valuePropName] = field.value;
					}

					inputProps.ref = this.getCacheBind(name, name + '__ref', this.saveRef);

					var meta = _extends({}, fieldMeta, fieldOption, {
						validate: validateRules
					});

					this.fieldsMeta[name] = meta;

					if (fieldMetaProp) {
						inputProps[fieldMetaProp] = meta;
					}

					return inputProps;
				},
				getFieldMember: function getFieldMember(name, member) {
					var field = this.getField(name);
					return field && field[member];
				},
				getFieldError: function getFieldError(name) {
					return getErrorStrs(this.getFieldMember(name, 'errors'));
				},
				getValidFieldsName: function getValidFieldsName() {
					var fieldsMeta = this.fieldsMeta;
					return fieldsMeta ? Object.keys(fieldsMeta).filter(function (name) {
						return !fieldsMeta[name].hidden;
					}) : [];
				},
				getFieldsValue: function getFieldsValue(names) {
					var _this2 = this;

					var fields = names || this.getValidFieldsName();
					var allValues = {};
					fields.forEach(function (f) {
						allValues[f] = _this2.getFieldValue(f);
					});
					return allValues;
				},
				getFormatFieldsValue: function getFormatFieldsValue(names) {
					var _this3 = this;

					var fields = names || this.getValidFieldsName();
					var allValues = {};
					fields.forEach(function (f) {
						allValues[f] = _this3.getFormatValue(f);
					});
					return allValues;
				},
				getFieldValue: function getFieldValue(name) {
					var fields = this.fields;

					return this.getValueFromFields(name, fields);
				},
				getFieldInstance: function getFieldInstance(name) {
					var fields = this.fields;

					return fields[name] && fields[name].instance;
				},
				getFormatValue: function getFormatValue(name) {
					var fieldsMeta = this.fieldsMeta;
					var fields = this.fields;

					var field = fields[name];
					var fieldMeta = fieldsMeta[name];
					if (field && 'value' in field) {
						if (field.instance.getFormatter) {
							var calendar = new GregorianCalendar();
							calendar.setTime(field.value);
							return field.instance.getFormatter().format(calendar);
						}
						return field.value;
					}
					return fieldMeta && fieldMeta.initialValue;
				},
				getValueFromFields: function getValueFromFields(name, fields) {
					var fieldsMeta = this.fieldsMeta;

					var field = fields[name];
					var fieldMeta = fieldsMeta[name];
					if (field && 'value' in field) {
						return field.value;
					}
					return fieldMeta && fieldMeta.initialValue;
				},
				getRules: function getRules(fieldMeta, action) {
					var actionRules = fieldMeta.validate.filter(function (item) {
						return !action || item.trigger.indexOf(action) >= 0;
					}).map(function (item) {
						return item.rules;
					});
					return flattenArray(actionRules);
				},
				setFields: function setFields(fields) {
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
								nowFields[f] = _extends({}, nowFields[f], {
									value: nowValue
								});
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
				},
				setFieldsValue: function setFieldsValue(fieldsValue) {
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
				},
				setFieldsInitialValue: function setFieldsInitialValue(initialValues) {
					var fieldsMeta = this.fieldsMeta;
					for (var name in initialValues) {
						if (initialValues.hasOwnProperty(name)) {
							var fieldMeta = fieldsMeta[name];
							fieldsMeta[name] = _extends({}, fieldMeta, {
								initialValue: initialValues[name]
							});
						}
					}
				},
				saveRef: function saveRef(name, _, component) {
					if (!component) {
						// after destroy, delete data
						delete this.fieldsMeta[name];
						delete this.fields[name];
						return;
					}
					var fieldMeta = this.getFieldMeta(name);
					if (fieldMeta && fieldMeta.ref) {
						if (typeof fieldMeta.ref === 'string') {
							throw new Error('can not set ref string for ' + name);
						}
						fieldMeta.ref(component);
					}
					this.fields[name] = this.fields[name] || {};
					this.fields[name].instance = component;
				},
				validateFieldsInternal: function validateFieldsInternal(fields, _ref, callback) {
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
								alreadyErrors[name] = {
									errors: field.errors,
									instance: field.instance
								};
							}
							return;
						}
						var fieldMeta = _this5.getFieldMeta(name);
						var newField = _extends({}, field);
						newField.errors = undefined;
						newField.validating = true;
						newField.dirty = true;
						allRules[name] = _this5.getRules(fieldMeta, action);
						allValues[name] = newField.value;
						allFields[name] = newField;
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
					var validator = new AsyncValidator(allRules);
					if (validateMessages) {
						validator.messages(validateMessages);
					}
					validator.validate(allValues, options, function (errors) {
						var errorsGroup = _extends({}, alreadyErrors);
						if (errors && errors.length) {
							errors.forEach(function (e) {
								var fieldName = e.field;
								if (!errorsGroup[fieldName]) {
									errorsGroup[fieldName] = {
										errors: []
									};
								}
								var fieldErrors = errorsGroup[fieldName].errors;
								fieldErrors.push(e);
							});
						}
						var expired = [];
						var nowAllFields = {};
						Object.keys(allRules).forEach(function (name) {
							var fieldErrors = errorsGroup[name];
							var nowField = _this5.getField(name, true);
							// avoid concurrency problems
							if (nowField.value !== allValues[name]) {
								expired.push({
									name: name,
									instance: nowField.instance
								});
							} else {
								nowField.errors = fieldErrors && fieldErrors.errors;
								nowField.value = allValues[name];
								nowField.validating = false;
								nowField.dirty = false;
								nowAllFields[name] = nowField;
							}
							if (fieldErrors) {
								fieldErrors.instance = nowField.instance;
							}
						});
						_this5.setFields(nowAllFields);
						if (callback) {
							if (expired.length) {
								expired.forEach(function (_ref2) {
									var name = _ref2.name;
									var instance = _ref2.instance;

									var fieldErrors = [{
										message: name + ' need to revalidate',
										field: name
									}];
									errorsGroup[name] = {
										expired: true,
										instance: instance,
										errors: fieldErrors
									};
								});
							}
							callback(isEmptyObject(errorsGroup) ? null : errorsGroup, _this5.getFieldsValue(fieldNames));
						}
					});
				},
				validateFields: function validateFields(ns, opt, cb) {
					var _this6 = this;

					var _getParams = getParams(ns, opt, cb);

					var names = _getParams.names;
					var callback = _getParams.callback;
					var options = _getParams.options;

					var fieldNames = names || this.getValidFieldsName();
					var fields = fieldNames.map(function (name) {
						var fieldMeta = _this6.getFieldMeta(name);
						if (!hasRules(fieldMeta.validate)) {
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
					this.validateFieldsInternal(fields, {
						fieldNames: fieldNames,
						options: options
					}, callback);
				},
				isFieldValidating: function isFieldValidating(name) {
					return this.getFieldMember(name, 'validating');
				},
				isFieldsValidating: function isFieldsValidating(ns) {
					var names = ns || this.getValidFieldsName();
					return names.some(this.isFieldValidating);
				},
				isSubmitting: function isSubmitting() {
					return this.state.submitting;
				},
				submit: function submit(callback) {
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
				},
				resetFields: function resetFields(ns) {
					var newFields = {};
					var fields = this.fields;

					var changed = false;
					var names = ns || Object.keys(fields);
					names.forEach(function (name) {
						var field = fields[name];
						if (field && 'value' in field) {
							changed = true;
							newFields[name] = {
								instance: field.instance
							};
						}
					});
					if (changed) {
						this.setFields(newFields);
					}
				},
				render: function render() {
					var formProps = _defineProperty({}, formPropName, this.getForm());
					if (withRef) {
						formProps.ref = 'wrappedComponent';
					}
					var props = mapProps.call(this, _extends({}, formProps, this.props));
					return React.createElement(WrappedComponent, props);
				}
			});

			return argumentContainer(Form, WrappedComponent);
		}

		return decorate;
	}

	///

	var formMixin = {
		getForm: function getForm() {
			return {
				getFieldsValue: this.getFieldsValue,
				getFieldValue: this.getFieldValue,
				getFieldInstance: this.getFieldInstance,
				setFieldsValue: this.setFieldsValue,
				setFields: this.setFields,
				setFieldsInitialValue: this.setFieldsInitialValue,
				getFieldProps: this.getFieldProps,
				getFieldError: this.getFieldError,
				isFieldValidating: this.isFieldValidating,
				isFieldsValidating: this.isFieldsValidating,
				isSubmitting: this.isSubmitting,
				submit: this.submit,
				validateFields: this.validateFields,
				resetFields: this.resetFields
			};
		}
	};

	function createForm(options) {
		return createBaseForm(options, [formMixin]);
	}

	////

	function computedStyle(el, prop) {
		var getComputedStyle = window.getComputedStyle;
		var style =
		// If we have getComputedStyle
		getComputedStyle ?
		// Query it
		// TODO: From CSS-Query notes, we might need (node, null) for FF
		getComputedStyle(el) :

		// Otherwise, we are in IE and use currentStyle
		el.currentStyle;
		if (style) {
			return style[
			// Switch to camelCase for CSSOM
			// DEV: Grabbed from jQuery
			// https://github.com/jquery/jquery/blob/1.9-stable/src/css.js#L191-L194
			// https://github.com/jquery/jquery/blob/1.9-stable/src/core.js#L593-L597
			prop.replace(/-(\w)/gi, function (word, letter) {
				return letter.toUpperCase();
			})];
		}
		return undefined;
	}

	function getScrollableContainer(n) {
		var node = n;
		var nodeName = undefined;
		/* eslint no-cond-assign:0 */
		while ((nodeName = node.nodeName.toLowerCase()) !== 'body') {
			var overflowY = computedStyle(node, 'overflowY');
			if (overflowY === 'auto' || overflowY === 'scroll') {
				return node;
			}
			node = node.parentNode;
		}
		return nodeName === 'body' ? node.ownerDocument : node;
	}

	var mixin = {
		getForm: function getForm() {
			return _extends({}, formMixin.getForm.call(this), {
				validateFieldsAndScroll: this.validateFieldsAndScroll
			});
		},
		validateFieldsAndScroll: function validateFieldsAndScroll(ns, opt, cb) {
			var _getParams2 = getParams(ns, opt, cb);

			var names = _getParams2.names;
			var callback = _getParams2.callback;
			var options = _getParams2.options;

			function newCb(error, values) {
				if (error) {
					var firstNode = undefined;
					var firstTop = undefined;
					for (var name in error) {
						if (error.hasOwnProperty(name) && error[name].instance) {
							var node = ReactDOM.findDOMNode(error[name].instance);
							var top = node.getBoundingClientRect().top;
							if (firstTop === undefined || firstTop > top) {
								firstTop = top;
								firstNode = node;
							}
						}
					}
					if (firstNode) {
						var c = options.container || getScrollableContainer(firstNode);
						scrollIntoView(firstNode, c, {
							onlyScrollIfNeeded: true
						});
					}
				}

				if (typeof callback === 'function') {
					callback(error, values);
				}
			}

			return this.validateFields(names, options, newCb);
		}
	};

	function createDOMForm(option) {
		return createBaseForm(_extends({}, option), [mixin]);
	}

	RC.createForm = createForm;
	RC.createDOMForm = createDOMForm;
})(Smart.RC);