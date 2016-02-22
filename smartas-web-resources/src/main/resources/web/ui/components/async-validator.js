'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

//V1.5.0 - 2016.2.15
+(function (RC) {
  //message

  function newMessages() {
    return {
      'default': 'Validation error on field %s',
      required: '%s is required',
      'enum': '%s must be one of %s',
      whitespace: '%s cannot be empty',
      date: {
        format: '%s date %s is invalid for format %s',
        parse: '%s date could not be parsed, %s is invalid ',
        invalid: '%s date %s is invalid'
      },
      types: {
        string: '%s is not a %s',
        method: '%s is not a %s (function)',
        array: '%s is not an %s',
        object: '%s is not an %s',
        number: '%s is not a %s',
        date: '%s is not a %s',
        boolean: '%s is not a %s',
        integer: '%s is not an %s',
        float: '%s is not a %s',
        regexp: '%s is not a valid %s',
        email: '%s is not a valid %s',
        url: '%s is not a valid %s',
        hex: '%s is not a valid %s'
      },
      string: {
        len: '%s must be exactly %s characters',
        min: '%s must be at least %s characters',
        max: '%s cannot be longer than %s characters',
        range: '%s must be between %s and %s characters'
      },
      number: {
        len: '%s must equal %s',
        min: '%s cannot be less than %s',
        max: '%s cannot be greater than %s',
        range: '%s must be between %s and %s'
      },
      array: {
        len: '%s must be exactly %s in length',
        min: '%s cannot be less than %s in length',
        max: '%s cannot be greater than %s in length',
        range: '%s must be between %s and %s in length'
      },
      pattern: {
        mismatch: '%s value %s does not match pattern %s'
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }

  var defaultMessages = newMessages();

  ////util
  var formatRegExp = /%[sdj%]/g;

  var util = (function () {

    function format() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var i = 1;
      var f = args[0];
      var len = args.length;
      if (typeof f === 'function') {
        return f.apply(null, args.slice(1));
      }
      if (typeof f === 'string') {
        var str = String(f).replace(formatRegExp, function (x) {
          if (x === '%%') {
            return '%';
          }
          if (i >= len) {
            return x;
          }
          switch (x) {
            case '%s':
              return String(args[i++]);
            case '%d':
              return Number(args[i++]);
            case '%j':
              try {
                return JSON.stringify(args[i++]);
              } catch (_) {
                return '[Circular]';
              }
              break;
            default:
              return x;
          }
        });
        for (var arg = args[i]; i < len; arg = args[++i]) {
          str += ' ' + arg;
        }
        return str;
      }
      return f;
    }

    function isNativeStringType(type) {
      return type === 'string' || type === 'url' || type === 'hex' || type === 'email';
    }

    function isEmptyValue(value, type) {
      if (value === undefined || value === null) {
        return true;
      }
      if (type === 'array' && Array.isArray(value) && !value.length) {
        return true;
      }
      if (isNativeStringType(type) && typeof value === 'string' && !value) {
        return true;
      }
      return false;
    }

    function isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    }

    function asyncParallelArray(arr, func, callback) {
      var results = [];
      var total = 0;
      var arrLength = arr.length;

      function count(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === arrLength) {
          callback(results);
        }
      }

      arr.forEach(function (a) {
        func(a, count);
      });
    }

    function asyncSerialArray(arr, func, callback) {
      var index = 0;
      var arrLength = arr.length;

      function next(errors) {
        if (errors.length) {
          callback(errors);
          return;
        }
        var original = index;
        index = index + 1;
        if (original < arrLength) {
          func(arr[original], next);
        } else {
          callback([]);
        }
      }

      next([]);
    }

    function flattenObjArr(objArr) {
      var ret = [];
      Object.keys(objArr).forEach(function (k) {
        ret.push.apply(ret, objArr[k]);
      });
      return ret;
    }

    function asyncMap(objArr, option, func, callback) {
      if (option.first) {
        var flattenArr = flattenObjArr(objArr);
        return asyncSerialArray(flattenArr, func, callback);
      }
      var firstFields = option.firstFields || [];
      if (firstFields === true) {
        firstFields = Object.keys(objArr);
      }
      var objArrKeys = Object.keys(objArr);
      var objArrLength = objArrKeys.length;
      var total = 0;
      var results = [];
      var next = function next(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
        }
      };
      objArrKeys.forEach(function (key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func, next);
        } else {
          asyncParallelArray(arr, func, next);
        }
      });
    }

    function complementError(rule) {
      return function (oe) {
        if (oe && oe.message) {
          oe.field = oe.field || rule.fullField;
          return oe;
        }
        return {
          message: oe,
          field: oe.field || rule.fullField
        };
      };
    }

    return {
      format: format,
      isEmptyValue: isEmptyValue,
      isEmptyObject: isEmptyObject,
      asyncMap: asyncMap,
      complementError: complementError
    };
  })();

  var format = util.format;
  var isEmptyValue = util.isEmptyValue;
  var isEmptyObject = util.isEmptyObject;
  var complementError = util.complementError;
  var asyncMap = util.asyncMap;

  //rule

  var rules = (function () {
    var ENUM = 'enum';

    /**
     *  Rule for validating a value exists in an enumerable list.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function enumerable(rule, value, source, errors, options) {
      rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
      if (rule[ENUM].indexOf(value) === -1) {
        errors.push(util.format(options.messages[ENUM], rule.fullField, rule[ENUM].join(', ')));
      }
    }

    /**
     *  Rule for validating a regular expression pattern.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function pattern_r(rule, value, source, errors, options) {
      if (rule.pattern instanceof RegExp) {
        if (!rule.pattern.test(value)) {
          errors.push(util.format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }

    /**
     *  Rule for validating minimum and maximum allowed values.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function range(rule, value, source, errors, options) {
      var len = typeof rule.len === 'number';
      var min = typeof rule.min === 'number';
      var max = typeof rule.max === 'number';
      var val = value;
      var key = null;
      var num = typeof value === 'number';
      var str = typeof value === 'string';
      var arr = Array.isArray(value);
      if (num) {
        key = 'number';
      } else if (str) {
        key = 'string';
      } else if (arr) {
        key = 'array';
      }
      // if the value is not of a supported type for range validation
      // the validation rule rule should use the
      // type property to also test for a particular type
      if (!key) {
        return false;
      }
      if (str || arr) {
        val = value.length;
      }
      if (len) {
        if (val !== rule.len) {
          errors.push(util.format(options.messages[key].len, rule.fullField, rule.len));
        }
      } else if (min && !max && val < rule.min) {
        errors.push(util.format(options.messages[key].min, rule.fullField, rule.min));
      } else if (max && !min && val > rule.max) {
        errors.push(util.format(options.messages[key].max, rule.fullField, rule.max));
      } else if (min && max && (val < rule.min || val > rule.max)) {
        errors.push(util.format(options.messages[key].range, rule.fullField, rule.min, rule.max));
      }
    }

    /**
     *  Rule for validating required fields.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function required(rule, value, source, errors, options, type) {
      if (rule.required && (!source.hasOwnProperty(rule.field) || util.isEmptyValue(value, type))) {
        errors.push(util.format(options.messages.required, rule.fullField));
      }
    }

    var pattern = {
      email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(([\/\w\.-]*)?)(\?[-_+=~\.;&%\w]*)?(\#[-_\/\!\w]*)?( *)?$/i,
      hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
    };

    var types = {
      integer: function integer(value) {
        return types.number(value) && parseInt(value, 10) === value;
      },
      float: function float(value) {
        return types.number(value) && !types.integer(value);
      },
      array: function array(value) {
        return Array.isArray(value);
      },
      regexp: function regexp(value) {
        if (value instanceof RegExp) {
          return true;
        }
        try {
          return !!new RegExp(value);
        } catch (e) {
          return false;
        }
      },
      date: function date(value) {
        return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function';
      },
      number: function number(value) {
        if (isNaN(value)) {
          return false;
        }
        return typeof value === 'number';
      },
      object: function object(value) {
        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !types.array(value);
      },
      method: function method(value) {
        return typeof value === 'function';
      },
      email: function email(value) {
        return typeof value === 'string' && !!value.match(pattern.email);
      },
      url: function url(value) {
        return typeof value === 'string' && !!value.match(pattern.url);
      },
      hex: function hex(value) {
        return typeof value === 'string' && !!value.match(pattern.hex);
      }
    };

    /**
     *  Rule for validating the type of a value.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function type(rule, value, source, errors, options) {
      if (rule.required && value === undefined) {
        required(rule, value, source, errors, options);
        return;
      }
      var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
      var ruleType = rule.type;
      if (custom.indexOf(ruleType) > -1) {
        if (!types[ruleType](value)) {
          errors.push(util.format(options.messages.types[ruleType], rule.fullField, rule.type));
        }
        // straight typeof check
      } else if (ruleType && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== rule.type) {
          errors.push(util.format(options.messages.types[ruleType], rule.fullField, rule.type));
        }
    }

    /**
     *  Rule for validating whitespace.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param source The source object being validated.
     *  @param errors An array of errors that this rule may add
     *  validation errors to.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function whitespace(rule, value, source, errors, options) {
      if (/^\s+$/.test(value) || value === '') {
        errors.push(util.format(options.messages.whitespace, rule.fullField));
      }
    }

    return {
      required: required,
      whitespace: whitespace,
      type: type,
      range: range,
      'enum': enumerable,
      pattern: pattern_r
    };
  })();

  /////////////////////////

  var validators = (function () {
    /**
     *  Validates an array.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function array(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, 'array') && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options, 'array');
        if (!isEmptyValue(value, 'array')) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a boolean.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function boolean(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    function date(rule, value, callback, source, options) {
      // console.log('integer rule called %j', rule);
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      // console.log('validate on %s value', value);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (!isEmptyValue(value)) {
          rules.type(rule, value, source, errors, options);
          if (value) {
            rules.range(rule, value.getTime(), source, errors, options);
          }
        }
      }
      callback(errors);
    }

    /**
     *  Validates an enumerable list.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function enumerable(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value) {
          rules[ENUM](rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a number is a floating point number.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function floatFn(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a number is an integer.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function integer(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a function.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function method(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a number.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function number(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates an object.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function object(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (value === undefined && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (value !== undefined) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates a regular expression pattern.
     *
     *  Performs validation when a rule only contains
     *  a pattern property but is not declared as a string type.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function pattern(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, 'string') && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (!isEmptyValue(value, 'string')) {
          rules.pattern(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Validates the regular expression type.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function regexp(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options);
        if (!isEmptyValue(value)) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    /**
     *  Performs validation for string types.
     *
     *  @param rule The validation rule.
     *  @param value The value of the field on the source object.
     *  @param callback The callback function.
     *  @param source The source object being validated.
     *  @param options The validation options.
     *  @param options.messages The validation messages.
     */
    function string(rule, value, callback, source, options) {
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, 'string') && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options, 'string');
        if (!isEmptyValue(value, 'string')) {
          rules.type(rule, value, source, errors, options);
          rules.range(rule, value, source, errors, options);
          rules.pattern(rule, value, source, errors, options);
          if (rule.whitespace === true) {
            rules.whitespace(rule, value, source, errors, options);
          }
        }
      }
      callback(errors);
    }

    function type(rule, value, callback, source, options) {
      var ruleType = rule.type;
      var errors = [];
      var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
      if (validate) {
        if (isEmptyValue(value, ruleType) && !rule.required) {
          return callback();
        }
        rules.required(rule, value, source, errors, options, ruleType);
        if (!isEmptyValue(value, ruleType)) {
          rules.type(rule, value, source, errors, options);
        }
      }
      callback(errors);
    }

    return {
      string: string,
      method: method,
      number: number,
      boolean: boolean,
      regexp: regexp,
      integer: integer,
      'float': floatFn,
      array: array,
      object: object,
      'enum': enumerable,
      pattern: pattern,
      email: type,
      url: type,
      date: date,
      hex: type
    };
  })();

  //////////////////

  var error = rules;
  var _ref = _;
  var mergeWith = _ref.mergeWith;

  function mergeCustomizer(objValue, srcValue) {
    if ((typeof objValue === 'undefined' ? 'undefined' : _typeof(objValue)) !== 'object') {
      return srcValue;
    }
  }

  /**
   *  Encapsulates a validation schema.
   *
   *  @param descriptor An object declaring validation rules
   *  for this schema.
   */
  function Schema(descriptor) {
    this.rules = null;
    this._messages = defaultMessages;
    this.define(descriptor);
  }

  Schema.prototype = {
    messages: function messages(_messages) {
      if (_messages) {
        this._messages = mergeWith(newMessages(), _messages, mergeCustomizer);
      }
      return this._messages;
    },
    define: function define(rules) {
      if (!rules) {
        throw new Error('Cannot configure a schema with no rules');
      }
      if ((typeof rules === 'undefined' ? 'undefined' : _typeof(rules)) !== 'object' || Array.isArray(rules)) {
        throw new Error('Rules must be an object');
      }
      this.rules = {};
      var z = undefined;
      var item = undefined;
      for (z in rules) {
        if (rules.hasOwnProperty(z)) {
          item = rules[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_) {
      var _this = this;

      var o = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var oc = arguments[2];

      var source = source_;
      var options = o;
      if (!this.rules) {
        throw new Error('Cannot validate with no rules.');
      }
      var callback = oc;
      if (typeof options === 'function') {
        callback = options;
        options = {};
      }
      function complete(results) {
        var i = undefined;
        var field = undefined;
        var errors = [];
        var fields = {};

        function add(e) {
          if (Array.isArray(e)) {
            errors = errors.concat.apply(errors, e);
          } else {
            errors.push(e);
          }
        }

        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          for (i = 0; i < errors.length; i++) {
            field = errors[i].field;
            fields[field] = fields[field] || [];
            fields[field].push(errors[i]);
          }
        }
        callback(errors, fields);
      }

      if (options.messages) {
        var messages = this.messages();
        if (messages === defaultMessages) {
          messages = newMessages();
        }
        mergeWith(messages, options.messages, mergeCustomizer);
        options.messages = messages;
      } else {
        options.messages = this.messages();
      }

      options.error = error;
      var arr = undefined;
      var value = undefined;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function (z) {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach(function (r) {
          var rule = r;
          if (typeof rule.transform === 'function') {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === 'function') {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          rule.validator = _this.getValidationMethod(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule: rule,
            value: value,
            source: source,
            field: z
          });
        });
      });
      var errorFields = {};
      asyncMap(series, options, function (data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === 'object' || rule.type === 'array') && _typeof(rule.fields) === 'object';
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function cb() {
          var e = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }

          errors = errors.map(complementError(rule));

          if ((options.first || options.fieldFirst) && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            // if rule is required but the target object
            // does not exist fail at the rule level and don't
            // go deeper
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              }
              return doIt(errors);
            }
            var fieldsSchema = data.rule.fields;
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = fieldsSchema[f];
                fieldSchema.fullField = rule.fullField + '.' + f;
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function (errs) {
              doIt(errs && errs.length ? errors.concat(errs) : errs);
            });
          }
        }

        rule.validator(rule, data.value, cb, data.source, options);
      }, function (results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === undefined && rule.pattern instanceof RegExp) {
        rule.type = 'pattern';
      }
      if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format('Unknown rule type %s', rule.type));
      }
      return rule.type || 'string';
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === 'function') {
        return rule.validator;
      }
      return validators[rule.type] || false;
    }
  };

  Schema.register = function register(type, validator) {
    if (typeof validator !== 'function') {
      throw new Error('Cannot register a validator by type, validator is not a function');
    }
    validators[type] = validator;
  };

  Schema.messages = defaultMessages;
  RC.Schema = Schema;
  RC.AsyncValidator = Schema;
})(Smart.RC);