"use strict";

+(function (Namespace) {
	var UI = Namespace.register("Smart.UI");
})(Smart.Namespace);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI) {

  var Col = React.createClass({
    displayName: 'Col',

    propTypes: {
      span: React.PropTypes.string,
      order: React.PropTypes.string,
      offset: React.PropTypes.string,
      push: React.PropTypes.string,
      pull: React.PropTypes.string,
      className: React.PropTypes.string,
      children: React.PropTypes.node
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var span = _props.span;
      var order = _props.order;
      var offset = _props.offset;
      var push = _props.push;
      var pull = _props.pull;
      var className = _props.className;

      var others = _objectWithoutProperties(_props, ['span', 'order', 'offset', 'push', 'pull', 'className']);

      var classes = classNames((_classNames = {}, _defineProperty(_classNames, 'col-' + span, span), _defineProperty(_classNames, 'col-order-' + order, order), _defineProperty(_classNames, 'col-offset-' + offset, offset), _defineProperty(_classNames, 'col-push-' + push, push), _defineProperty(_classNames, 'col-pull-' + pull, pull), _defineProperty(_classNames, className, className), _classNames));
      return React.createElement(
        'div',
        _extends({}, others, { className: classes }),
        this.props.children
      );
    }
  });

  var Row = React.createClass({
    displayName: 'Row',

    propTypes: {
      type: React.PropTypes.string,
      align: React.PropTypes.string,
      justify: React.PropTypes.string,
      className: React.PropTypes.string,
      children: React.PropTypes.node
    },
    render: function render() {
      var _classNames2;

      var _props2 = this.props;
      var type = _props2.type;
      var justify = _props2.justify;
      var align = _props2.align;
      var className = _props2.className;

      var others = _objectWithoutProperties(_props2, ['type', 'justify', 'align', 'className']);

      var classes = classNames((_classNames2 = {
        row: true
      }, _defineProperty(_classNames2, 'row-' + type, type), _defineProperty(_classNames2, 'row-' + type + '-' + justify, justify), _defineProperty(_classNames2, 'row-' + type + '-' + align, align), _defineProperty(_classNames2, className, className), _classNames2));
      return React.createElement(
        'div',
        _extends({}, others, { className: classes }),
        this.props.children
      );
    }
  });

  UI.Row = Row;
  UI.Col = Col;
})(Smart.UI);
"use strict";

+(function (UI) {

	UI.Icon = function (props) {
		var className = classNames(props.className, " anticon anticon-" + props.type);
		return React.createElement("i", _.assign({}, props, { className: className }));
	};
})(Smart.UI);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI) {
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
      paths: React.PropTypes.array,
      params: React.PropTypes.object
    },
    render: function render() {
      var crumbs = undefined;
      var _props2 = this.props;
      var separator = _props2.separator;
      var prefixCls = _props2.prefixCls;
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
      } else {
        crumbs = React.Children.map(children, function (element, index) {
          return React.cloneElement(element, {
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
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (UI) {
  var assign = _.assign;

  function prefixClsFn(prefixCls) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.map(function (s) {
      return prefixCls + '-' + s;
    }).join(' ');
  }

  function ieGT9() {
    if ((typeof document === 'undefined' ? 'undefined' : _typeof(document)) === undefined) {
      return false;
    }
    var documentMode = document.documentMode || 0;
    return documentMode > 9;
  }

  function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  }

  var Group = (function (_React$Component) {
    _inherits(Group, _React$Component);

    function Group() {
      _classCallCheck(this, Group);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Group).apply(this, arguments));
    }

    _createClass(Group, [{
      key: 'render',
      value: function render() {
        var className = 'ant-input-group ' + (this.props.className || '');
        return React.createElement(
          'span',
          { className: className,
            style: this.props.style },
          this.props.children
        );
      }
    }]);

    return Group;
  })(React.Component);

  Group.propTypes = {
    children: React.PropTypes.any
  };

  var Input = (function (_React$Component2) {
    _inherits(Input, _React$Component2);

    function Input() {
      _classCallCheck(this, Input);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(Input).apply(this, arguments));
    }

    _createClass(Input, [{
      key: 'renderLabledInput',
      value: function renderLabledInput(children) {
        var props = this.props;
        var wrapperClassName = prefixClsFn(props.prefixCls, 'input-group');
        var addonClassName = prefixClsFn(wrapperClassName, 'addon');
        var addonBefore = props.addonBefore ? React.createElement(
          'span',
          { className: addonClassName },
          props.addonBefore
        ) : null;

        var addonAfter = props.addonAfter ? React.createElement(
          'span',
          { className: addonClassName },
          props.addonAfter
        ) : null;

        return React.createElement(
          'span',
          { className: addonBefore || addonAfter ? wrapperClassName : '' },
          addonBefore,
          children,
          addonAfter
        );
      }
    }, {
      key: 'renderInput',
      value: function renderInput() {
        var props = assign({}, this.props);
        var prefixCls = props.prefixCls;
        var inputClassName = prefixClsFn(prefixCls, 'input');
        if (!props.type) {
          return props.children;
        }

        switch (props.size) {
          case 'small':
            inputClassName = prefixClsFn(prefixCls, 'input', 'input-sm');
            break;
          case 'large':
            inputClassName = prefixClsFn(prefixCls, 'input', 'input-lg');
            break;
          default:
        }
        var placeholder = props.placeholder;
        if (placeholder && ieGT9()) {
          placeholder = null;
        }
        if ('value' in props) {
          props.value = fixControlledValue(props.value);
        }
        switch (props.type) {
          case 'textarea':
            return React.createElement('textarea', _extends({}, props, {
              placeholder: placeholder,
              className: inputClassName,
              ref: 'input' }));
          default:
            inputClassName = props.className ? props.className : inputClassName;
            return React.createElement('input', _extends({}, props, {
              placeholder: placeholder,
              className: inputClassName,
              ref: 'input' }));
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return this.renderLabledInput(this.renderInput());
      }
    }]);

    return Input;
  })(React.Component);

  Input.propTypes = {
    type: React.PropTypes.string,
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
    size: React.PropTypes.oneOf(['small', 'default', 'large']),
    disabled: React.PropTypes.bool,
    value: React.PropTypes.any,
    defaultValue: React.PropTypes.any,
    className: React.PropTypes.string,
    addonBefore: React.PropTypes.node,
    addonAfter: React.PropTypes.node,
    prefixCls: React.PropTypes.string
  };

  Input.defaultProps = {
    defaultValue: '',
    disabled: false,
    prefixCls: 'ant',
    type: 'text'
  };

  UI.Input = Input;
  UI.Input.Group = Group;
})(Smart.UI);
'use strict';

+(function (UI, RC) {
  var _ref = _;
  var assign = _ref.assign;
  var Icon = UI.Icon;
  var Progress = RC.Progress;
  var Progresscircle = Progress.Circle;

  var prefixCls = 'ant-progress';

  var statusColorMap = {
    normal: '#2db7f5',
    exception: '#ff6600',
    success: '#87d068'
  };

  var Line = React.createClass({
    displayName: 'Line',

    propTypes: {
      status: React.PropTypes.oneOf(['normal', 'exception', 'active', 'success']),
      showInfo: React.PropTypes.bool,
      percent: React.PropTypes.number,
      strokeWidth: React.PropTypes.number,
      trailColor: React.PropTypes.string,
      format: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string, React.PropTypes.func])
    },
    getDefaultProps: function getDefaultProps() {
      return {
        percent: 0,
        strokeWidth: 10,
        status: 'normal', // exception active
        showInfo: true,
        trailColor: '#e9e9e9'
      };
    },
    render: function render() {
      var props = assign({}, this.props);

      if (parseInt(props.percent, 10) === 100) {
        props.status = 'success';
      }

      var progressInfo = undefined;
      var fullCls = '';

      if (props.format) {
        warning(typeof props.format === 'function', 'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
      }

      var text = props.format || props.percent + '%';
      if (typeof props.format === 'string') {
        // 向下兼容原来的字符串替换方式
        text = props.format.replace('${percent}', props.percent);
      } else if (typeof props.format === 'function') {
        text = props.format(props.percent);
      }

      if (props.showInfo === true) {
        if (props.status === 'exception') {
          progressInfo = React.createElement(
            'span',
            { className: prefixCls + '-line-text' },
            props.format ? text : React.createElement(Icon, { type: 'exclamation' })
          );
        } else if (props.status === 'success') {
          progressInfo = React.createElement(
            'span',
            { className: prefixCls + '-line-text' },
            props.format ? text : React.createElement(Icon, { type: 'check' })
          );
        } else {
          progressInfo = React.createElement(
            'span',
            { className: prefixCls + '-line-text' },
            text
          );
        }
      } else {
        fullCls = ' ' + prefixCls + '-line-wrap-full';
      }
      var percentStyle = {
        width: props.percent + '%',
        height: props.strokeWidth
      };

      return React.createElement(
        'div',
        { className: prefixCls + '-line-wrap clearfix status-' + props.status + fullCls, style: props.style },
        progressInfo,
        React.createElement(
          'div',
          { className: prefixCls + '-line-outer' },
          React.createElement(
            'div',
            { className: prefixCls + '-line-inner' },
            React.createElement('div', { className: prefixCls + '-line-bg', style: percentStyle })
          )
        )
      );
    }
  });

  var Circle = React.createClass({
    displayName: 'Circle',

    propTypes: {
      status: React.PropTypes.oneOf(['normal', 'exception', 'success']),
      percent: React.PropTypes.number,
      strokeWidth: React.PropTypes.number,
      width: React.PropTypes.number,
      trailColor: React.PropTypes.string,
      format: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string, React.PropTypes.func])
    },
    getDefaultProps: function getDefaultProps() {
      return {
        width: 132,
        percent: 0,
        strokeWidth: 6,
        status: 'normal', // exception
        trailColor: '#f9f9f9'
      };
    },
    render: function render() {
      var props = assign({}, this.props);

      if (parseInt(props.percent, 10) === 100) {
        props.status = 'success';
      }

      var style = {
        width: props.width,
        height: props.width,
        fontSize: props.width * 0.16 + 6
      };
      var progressInfo = undefined;
      var text = props.format || props.percent + '%';

      if (props.format) {
        warning(typeof props.format === 'function', 'antd.Progress props.format type is function, change format={xxx} to format={() => xxx}');
      }

      if (typeof props.format === 'string') {
        // 向下兼容原来的字符串替换方式
        text = props.format.replace('${percent}', props.percent);
      } else if (typeof props.format === 'function') {
        text = props.format(props.percent);
      }

      if (props.status === 'exception') {
        progressInfo = React.createElement(
          'span',
          { className: prefixCls + '-circle-text' },
          props.format ? text : React.createElement(Icon, { type: 'exclamation' })
        );
      } else if (props.status === 'success') {
        progressInfo = React.createElement(
          'span',
          { className: prefixCls + '-circle-text' },
          props.format ? text : React.createElement(Icon, { type: 'check' })
        );
      } else {
        progressInfo = React.createElement(
          'span',
          { className: prefixCls + '-circle-text' },
          text
        );
      }

      return React.createElement(
        'div',
        { className: prefixCls + '-circle-wrap status-' + props.status, style: props.style },
        React.createElement(
          'div',
          { className: prefixCls + '-circle-inner', style: style },
          React.createElement(Progresscircle, { percent: props.percent, strokeWidth: props.strokeWidth,
            strokeColor: statusColorMap[props.status], trailColor: props.trailColor }),
          progressInfo
        )
      );
    }
  });

  UI.Progress = {
    Line: Line,
    Circle: Circle
  };
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {

	var RcCheckbox = RC.Checkbox;

	var Checkbox = React.createClass({
		displayName: 'Checkbox',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-checkbox'
			};
		},
		render: function render() {
			return React.createElement(RcCheckbox, this.props);
		}
	});

	var Group = React.createClass({
		displayName: 'Group',
		getDefaultProps: function getDefaultProps() {
			return {
				options: [],
				defaultValue: [],
				onChange: function onChange() {}
			};
		},

		propTypes: {
			defaultValue: React.PropTypes.array,
			value: React.PropTypes.array,
			options: React.PropTypes.array.isRequired,
			onChange: React.PropTypes.func
		},
		getInitialState: function getInitialState() {
			var _props = this.props;
			var value = _props.value;
			var defaultValue = _props.defaultValue;

			return {
				value: value || defaultValue
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps) {
				this.setState({
					value: nextProps.value || []
				});
			}
		},
		toggleOption: function toggleOption(option) {
			var optionIndex = this.state.value.indexOf(option);
			var value = this.state.value;
			if (optionIndex === -1) {
				value.push(option);
			} else {
				value.splice(optionIndex, 1);
			}
			if (!('value' in this.props)) {
				this.setState({ value: value });
			}
			this.props.onChange(value);
		},
		render: function render() {
			var _this = this;

			var options = this.props.options;
			return React.createElement(
				'div',
				{ className: 'ant-checkbox-group' },
				options.map(function (option) {
					return React.createElement(
						'label',
						{ className: 'ant-checkbox-group-item', key: option },
						React.createElement(Checkbox, { disabled: _this.props.disabled,
							checked: _this.state.value.indexOf(option) !== -1,
							onChange: _this.toggleOption.bind(_this, option) }),
						option
					);
				})
			);
		}
	});

	Checkbox.Group = Group;
	UI.Checkbox = Checkbox;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var Switch = RC.Switch;

  var AntSwitch = React.createClass({
    displayName: 'AntSwitch',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-switch',
        size: 'default'
      };
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var size = _props.size;
      var className = _props.className;

      var cls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-' + size, true), _classNames));
      return React.createElement(Switch, _extends({ className: cls }, this.props));
    }
  });

  UI.Switch = AntSwitch;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var Radio = RC.Radio;

	var AntRadio = React.createClass({
		displayName: 'AntRadio',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio'
			};
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var prefixCls = _props.prefixCls;
			var children = _props.children;
			var checked = _props.checked;
			var disabled = _props.disabled;
			var className = _props.className;

			var classString = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-checked', checked), _defineProperty(_classNames, prefixCls + '-disabled', disabled), _defineProperty(_classNames, className, !!className), _classNames));
			return React.createElement(
				'label',
				{ className: classString },
				React.createElement(Radio, _extends({}, this.props, { children: null })),
				children
			);
		}
	});

	function getCheckedValue(children) {
		var checkedValue = null;
		React.Children.forEach(children, function (radio) {
			if (radio.props && radio.props.checked) {
				checkedValue = radio.props.value;
			}
		});
		return checkedValue;
	}

	var RadioGroup = React.createClass({
		displayName: 'RadioGroup',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-group',
				disabled: false,
				onChange: function onChange() {}
			};
		},
		getInitialState: function getInitialState() {
			var props = this.props;
			return {
				value: props.value || props.defaultValue || getCheckedValue(props.children)
			};
		},
		componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
			if ('value' in nextProps || getCheckedValue(nextProps.children)) {
				this.setState({
					value: nextProps.value || getCheckedValue(nextProps.children)
				});
			}
		},
		onRadioChange: function onRadioChange(ev) {
			this.setState({
				value: ev.target.value
			});
			this.props.onChange(ev);
		},
		render: function render() {
			var _this = this;

			var props = this.props;
			var children = React.Children.map(props.children, function (radio) {
				if (radio.props) {
					return React.cloneElement(radio, _extends({
						key: radio.props.value
					}, radio.props, {
						onChange: _this.onRadioChange,
						checked: _this.state.value === radio.props.value,
						disabled: radio.props.disabled || _this.props.disabled
					}));
				}
				return radio;
			});
			return React.createElement(
				'div',
				{ className: props.prefixCls + ' ' + props.prefixCls + '-' + props.size },
				children
			);
		}
	});

	var RadioButton = React.createClass({
		displayName: 'RadioButton',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-radio-button'
			};
		},
		render: function render() {
			return React.createElement(AntRadio, this.props);
		}
	});

	AntRadio.Button = RadioButton;
	AntRadio.Group = RadioGroup;
	UI.Radio = AntRadio;
})(Smart.UI, Smart.RC);
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
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
  var InputNumber = RC.InputNumber;
  var classNames = RC.classNames;
  var _ref = _;
  var noop = _ref.noop;

  var AntInputNumber = React.createClass({
    displayName: 'AntInputNumber',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-input-number',
        step: 1
      };
    },
    render: function render() {
      var _props = this.props;
      var className = _props.className;
      var size = _props.size;

      var other = _objectWithoutProperties(_props, ['className', 'size']);

      var inputNumberClass = classNames(_defineProperty({
        'ant-input-number-lg': size === 'large',
        'ant-input-number-sm': size === 'small'
      }, className, !!className));

      return React.createElement(InputNumber, _extends({ className: inputNumberClass }, other));
    }
  });

  UI.InputNumber = AntInputNumber;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Icon = UI.Icon;
  var Notification = RC.Notification;

  var defaultDuration = 1.5;
  var top = undefined;
  var messageInstance = undefined;
  var key = 1;

  function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
      prefixCls: 'ant-message',
      transitionName: 'move-up',
      style: {
        top: top
      } // 覆盖原来的样式
    });
    return messageInstance;
  }

  function notice(content) {
    var duration = arguments.length <= 1 || arguments[1] === undefined ? defaultDuration : arguments[1];
    var type = arguments[2];
    var onClose = arguments[3];

    var iconClass = ({
      info: 'ant-message-info',
      success: 'ant-message-success',
      error: 'ant-message-error',
      warn: 'ant-message-warn',
      loading: 'ant-message-loading'
    })[type];

    var iconType = ({
      info: 'info-circle',
      success: 'check-circle',
      error: 'exclamation-circle',
      warn: 'exclamation-circle',
      loading: 'loading'
    })[type];

    var instance = getMessageInstance();
    instance.notice({
      key: key,
      duration: duration,
      style: {},
      content: React.createElement(
        'div',
        { className: 'ant-message-custom-content ' + iconClass },
        React.createElement(Icon, { className: iconClass, type: iconType }),
        React.createElement(
          'span',
          null,
          content
        )
      ),
      onClose: onClose
    });
    return (function () {
      var target = key++;
      return function () {
        instance.removeNotice(target);
      };
    })();
  }

  var message = {
    info: function info(content, duration, onClose) {
      return notice(content, duration, 'info', onClose);
    },
    success: function success(content, duration, onClose) {
      return notice(content, duration, 'success', onClose);
    },
    error: function error(content, duration, onClose) {
      return notice(content, duration, 'error', onClose);
    },
    warn: function warn(content, duration, onClose) {
      return notice(content, duration, 'warn', onClose);
    },
    loading: function loading(content, duration, onClose) {
      return notice(content, duration, 'loading', onClose);
    },
    config: function config(options) {
      if (options.top) {
        top = options.top;
      }
    },
    destroy: function destroy() {
      if (messageInstance) {
        messageInstance.destroy();
        messageInstance = null;
      }
    }
  };

  UI.message = message;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Notification = RC.Notification;
  var Icon = UI.Icon;
  var _ref = _;
  var assign = _ref.assign;

  var top = 24;
  var notificationInstance = undefined;

  function getNotificationInstance() {
    if (notificationInstance) {
      return notificationInstance;
    }
    notificationInstance = Notification.newInstance({
      prefixCls: 'ant-notification',
      style: {
        top: top,
        right: 0
      }
    });
    return notificationInstance;
  }

  function notice(args) {
    var duration = undefined;
    if (args.duration === undefined) {
      duration = 4.5;
    } else {
      duration = args.duration;
    }

    if (args.icon) {
      var prefixCls = ' ant-notification-notice-content-icon-';
      var iconType = '';
      switch (args.icon) {
        case 'success':
          iconType = 'check-circle-o';
          break;
        case 'info':
          iconType = 'info-circle-o';
          break;
        case 'error':
          iconType = 'exclamation-circle-o';
          break;
        case 'warn':
          iconType = 'question-circle-o';
          break;
        default:
          iconType = 'info-circle';
      }

      getNotificationInstance().notice({
        content: React.createElement(
          'div',
          null,
          React.createElement(Icon, { className: prefixCls + 'icon-' + args.icon + prefixCls + 'icon', type: iconType }),
          React.createElement(
            'div',
            { className: prefixCls + 'message' },
            args.message
          ),
          React.createElement(
            'div',
            { className: prefixCls + 'description' },
            args.description
          )
        ),
        duration: duration,
        closable: true,
        onClose: args.onClose,
        key: args.key,
        style: {}
      });
    } else {
      var prefixCls = 'ant-notification-notice-content-';
      if (!args.btn) {
        getNotificationInstance().notice({
          content: React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: prefixCls + 'message' },
              args.message
            ),
            React.createElement(
              'div',
              { className: prefixCls + 'description' },
              args.description
            )
          ),
          duration: duration,
          closable: true,
          onClose: args.onClose,
          key: args.key,
          style: {}
        });
      } else {
        getNotificationInstance().notice({
          content: React.createElement(
            'div',
            null,
            React.createElement(
              'div',
              { className: prefixCls + 'message' },
              args.message
            ),
            React.createElement(
              'div',
              { className: prefixCls + 'description' },
              args.description
            ),
            React.createElement(
              'span',
              { className: prefixCls + 'btn' },
              args.btn
            )
          ),
          duration: duration,
          closable: true,
          onClose: args.onClose,
          key: args.key,
          style: {}
        });
      }
    }
  }

  var api = {
    open: function open(args) {
      notice(args);
    },
    close: function close(key) {
      if (notificationInstance) {
        notificationInstance.removeNotice(key);
      }
    },
    config: function config(options) {
      top = isNaN(options.top) ? 24 : options.top;
    },
    destroy: function destroy() {
      if (notificationInstance) {
        notificationInstance.destroy();
        notificationInstance = null;
      }
    }
  };

  ['success', 'info', 'warn', 'error'].forEach(function (type) {
    api[type] = function (args) {
      var newArgs = assign({}, args, {
        icon: type
      });
      return api.open(newArgs);
    };
  });

  UI.notification = api;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI) {
	function getScroll(w, top) {
		var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
		var method = 'scroll' + (top ? 'Top' : 'Left');
		if (typeof ret !== 'number') {
			var d = w.document;
			//ie6,7,8 standard mode
			ret = d.documentElement[method];
			if (typeof ret !== 'number') {
				//quirks mode
				ret = d.body[method];
			}
		}
		return ret;
	}
	function getOffset(element) {
		var rect = element.getBoundingClientRect();
		var body = document.body;
		var clientTop = element.clientTop || body.clientTop || 0;
		var clientLeft = element.clientLeft || body.clientLeft || 0;
		var scrollTop = getScroll(window, true);
		var scrollLeft = getScroll(window);

		return {
			top: rect.top + scrollTop - clientTop,
			left: rect.left + scrollLeft - clientLeft
		};
	}
	UI.Affix = React.createClass({
		displayName: 'Affix',
		getDefaultProps: function getDefaultProps() {
			return {
				offset: 0
			};
		},

		propTypes: {
			offset: React.PropTypes.number
		},

		getInitialState: function getInitialState() {
			return {
				affix: false,
				affixStyle: null
			};
		},
		handleScroll: function handleScroll() {
			var affix = this.state.affix;
			var scrollTop = getScroll(window, true);
			var elemOffset = getOffset(ReactDOM.findDOMNode(this));

			if (!affix && elemOffset.top - this.props.offset < scrollTop) {
				this.setState({
					affix: true,
					affixStyle: {
						top: this.props.offset,
						left: elemOffset.left,
						width: ReactDOM.findDOMNode(this).offsetWidth
					}
				});
			}

			if (affix && elemOffset.top - this.props.offset > scrollTop) {
				this.setState({
					affix: false,
					affixStyle: null
				});
			}
		},
		componentDidMount: function componentDidMount() {
			var win = $(window);
			this.scrollEvent = win.on('scroll', this.handleScroll);
			this.resizeEvent = win.on('resize', this.handleScroll);
		},
		componentWillUnmount: function componentWillUnmount() {
			var win = $(window);
			if (this.scrollEvent) {
				win.off('scroll', this.scrollEvent);
				this.scrollEvent = null;
			}
			if (this.resizeEvent) {
				win.off('resize', this.resizeEvent);
				this.resizeEvent = null;
			}
		},
		render: function render() {
			var className = classNames(this.props.className, {
				'ant-affix': this.state.affix
			});

			return React.createElement(
				'div',
				this.props,
				React.createElement(
					'div',
					{ className: className, style: this.state.affixStyle },
					this.props.children
				)
			);
		}
	});
})(Smart.UI);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
	var Animate = RC.Animate;
	var Icon = UI.Icon;
	UI.Alert = React.createClass({
		displayName: 'Alert',
		getDefaultProps: function getDefaultProps() {
			return {
				prefixCls: 'ant-alert',
				showIcon: false,
				onClose: function onClose() {}
			};
		},
		getInitialState: function getInitialState() {
			return {
				closing: true,
				closed: false
			};
		},
		handleClose: function handleClose(e) {
			e.preventDefault();
			var dom = ReactDOM.findDOMNode(this);
			dom.style.height = dom.offsetHeight + 'px';
			// Magic code
			// 重复一次后才能正确设置 height
			dom.style.height = dom.offsetHeight + 'px';

			this.setState({
				closing: false
			});
			this.props.onClose.call(this, e);
		},
		animationEnd: function animationEnd() {
			this.setState({
				closed: true,
				closing: true
			});
		},
		render: function render() {
			var _classNames;

			var _props = this.props;
			var closable = _props.closable;
			var description = _props.description;
			var type = _props.type;
			var prefixCls = _props.prefixCls;
			var message = _props.message;
			var closeText = _props.closeText;
			var showIcon = _props.showIcon;

			var iconType = '';
			switch (type) {
				case 'success':
					iconType = 'check-circle';
					break;
				case 'info':
					iconType = 'info-circle';
					break;
				case 'error':
					iconType = 'exclamation-circle';
					break;
				case 'warn':
					iconType = 'exclamation-circle';
					break;
				default:
					iconType = 'default';
			}

			// use outline icon in alert with description
			if (!!description) {
				iconType += '-o';
			}

			var alertCls = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + type, true), _defineProperty(_classNames, prefixCls + '-close', !this.state.closing), _defineProperty(_classNames, prefixCls + '-with-description', !!description), _defineProperty(_classNames, prefixCls + '-no-icon', !showIcon), _classNames));

			// closeable when closeText is assigned
			if (closeText) {
				closable = true;
			}

			return this.state.closed ? null : React.createElement(
				Animate,
				{ component: '',
					showProp: 'data-show',
					transitionName: 'slide-up',
					onEnd: this.animationEnd },
				React.createElement(
					'div',
					{ 'data-show': this.state.closing, className: alertCls },
					showIcon ? React.createElement(Icon, { className: 'ant-alert-icon', type: iconType }) : null,
					React.createElement(
						'span',
						{ className: prefixCls + '-message' },
						message
					),
					React.createElement(
						'span',
						{ className: prefixCls + '-description' },
						description
					),
					closable ? React.createElement(
						'a',
						{ onClick: this.handleClose, className: prefixCls + '-close-icon' },
						closeText || React.createElement(Icon, { type: 'cross' })
					) : null
				)
			);
		}
	});
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
	var Animate = RC.Animate;
	var assign = _.assign;
	var isCssAnimationSupported = Animate.isCssAnimationSupported;

	function getNumberArray(num) {
		return num ? num.toString().split('').reverse().map(function (i) {
			return Number(i);
		}) : [];
	}

	var ScrollNumber = (function (_React$Component) {
		_inherits(ScrollNumber, _React$Component);

		function ScrollNumber(props) {
			_classCallCheck(this, ScrollNumber);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScrollNumber).call(this, props));

			_this.state = {
				animateStarted: true,
				count: props.count
			};
			return _this;
		}

		_createClass(ScrollNumber, [{
			key: 'getPositionByNum',
			value: function getPositionByNum(num, i) {
				if (this.state.animateStarted) {
					return 10 + num;
				}
				var currentDigit = getNumberArray(this.state.count)[i];
				var lastDigit = getNumberArray(this.lastCount)[i];
				// 同方向则在同一侧切换数字
				if (this.state.count > this.lastCount) {
					if (currentDigit >= lastDigit) {
						return 10 + num;
					}
					return 20 + num;
				}
				if (currentDigit <= lastDigit) {
					return 10 + num;
				}
				return num;
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				var _this2 = this;

				if ('count' in nextProps && nextProps.count) {
					if (this.lastCount === this.state.count) {
						return;
					}
					this.lastCount = this.state.count;
					// 复原数字初始位置
					this.setState({
						animateStarted: true
					}, function () {
						// 等待数字位置复原完毕
						// 开始设置完整的数字
						setTimeout(function () {
							_this2.setState({
								animateStarted: false,
								count: nextProps.count
							}, function () {
								_this2.props.onAnimated();
							});
						}, 5);
					});
				}
			}
		}, {
			key: 'renderNumberList',
			value: function renderNumberList() {
				var childrenToReturn = [];
				for (var i = 0; i < 30; i++) {
					childrenToReturn.push(React.createElement(
						'p',
						{ key: i },
						i % 10
					));
				}
				return childrenToReturn;
			}
		}, {
			key: 'renderCurrentNumber',
			value: function renderCurrentNumber(num, i) {
				var position = this.getPositionByNum(num, i);
				var height = this.props.height;
				var removeTransition = this.state.animateStarted || getNumberArray(this.lastCount)[i] === undefined;
				return React.createElement('span', {
					className: this.props.prefixCls + '-only',
					style: {
						transition: removeTransition && 'none',
						transform: 'translate3d(0, ' + -position * height + 'px, 0)',
						height: height
					},
					key: i
				}, this.renderNumberList());
			}
		}, {
			key: 'renderNumberElement',
			value: function renderNumberElement() {
				var _this3 = this;

				var state = this.state;
				if (!state.count || isNaN(state.count)) {
					return state.count;
				}
				return getNumberArray(state.count).map(function (num, i) {
					return _this3.renderCurrentNumber(num, i);
				}).reverse();
			}
		}, {
			key: 'render',
			value: function render() {
				var props = assign({}, this.props, {
					className: this.props.prefixCls + ' ' + this.props.className
				});
				var isBrowser = typeof document !== 'undefined' && typeof window !== 'undefined';
				if (isBrowser && isCssAnimationSupported) {
					return React.createElement(this.props.component, props, this.renderNumberElement());
				}
				return React.createElement(this.props.component, props, props.count);
			}
		}]);

		return ScrollNumber;
	})(React.Component);

	ScrollNumber.defaultProps = {
		prefixCls: 'ant-scroll-number',
		count: null,
		component: 'sup',
		onAnimated: function onAnimated() {},
		height: 18
	};

	ScrollNumber.propTypes = {
		count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		component: React.PropTypes.string,
		onAnimated: React.PropTypes.func,
		height: React.PropTypes.number
	};

	var AntBadge = (function (_React$Component2) {
		_inherits(AntBadge, _React$Component2);

		function AntBadge(props) {
			_classCallCheck(this, AntBadge);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(AntBadge).call(this, props));
		}

		_createClass(AntBadge, [{
			key: 'render',
			value: function render() {
				var _classNames;

				var _props = this.props;
				var count = _props.count;
				var prefixCls = _props.prefixCls;
				var overflowCount = _props.overflowCount;
				var className = _props.className;
				var style = _props.style;
				var children = _props.children;

				var dot = this.props.dot;

				count = count > overflowCount ? overflowCount + '+' : count;

				// dot mode don't need count
				if (dot) {
					count = '';
				}

				// null undefined "" "0" 0
				var hidden = (!count || count === '0') && !dot;
				var scrollNumberCls = prefixCls + (dot ? '-dot' : '-count');
				var badgeCls = classNames((_classNames = {}, _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-not-a-wrapper', !children), _classNames));

				return React.createElement(
					'span',
					_extends({ className: badgeCls, title: count }, this.props, { style: null }),
					children,
					React.createElement(
						Animate,
						{ component: '',
							showProp: 'data-show',
							transitionName: prefixCls + '-zoom',
							transitionAppear: true },
						hidden ? null : React.createElement(ScrollNumber, { 'data-show': !hidden, className: scrollNumberCls,
							count: count, style: style })
					)
				);
			}
		}]);

		return AntBadge;
	})(React.Component);

	AntBadge.defaultProps = {
		prefixCls: 'ant-badge',
		count: null,
		dot: false,
		overflowCount: 99
	};

	AntBadge.propTypes = {
		count: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		dot: React.PropTypes.bool,
		overflowCount: React.PropTypes.number
	};
	UI.Badge = AntBadge;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI) {
	var findDOMNode = ReactDOM.findDOMNode;
	var rxTwoCNChar = /^[\u4e00-\u9fa5]{2,2}$/;
	var isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
	function isString(str) {
		return typeof str === 'string';
	}

	var prefix = 'ant-btn-';

	// Insert one space between two chinese characters automatically.
	function insertSpace(child) {
		if (isString(child) && isTwoCNChar(child)) {
			return child.split('').join(' ');
		}

		if (isString(child.type) && isTwoCNChar(child.props.children)) {
			return React.cloneElement(child, {}, child.props.children.split('').join(' '));
		}

		return child;
	}

	var Button = (function (_React$Component) {
		_inherits(Button, _React$Component);

		function Button() {
			_classCallCheck(this, Button);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
		}

		_createClass(Button, [{
			key: 'componentDidMount',
			value: function componentDidMount() {
				if (window && window.PIE) {
					window.PIE.attach(findDOMNode(this));
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _classNames;

				var props = this.props;
				var type = props.type;
				var shape = props.shape;
				var size = props.size;
				var onClick = props.onClick;
				var className = props.className;
				var htmlType = props.htmlType;
				var children = props.children;

				var others = _objectWithoutProperties(props, ['type', 'shape', 'size', 'onClick', 'className', 'htmlType', 'children']);

				// large => lg
				// small => sm

				var sizeCls = ({
					'large': 'lg',
					'small': 'sm'
				})[size] || '';

				var classes = classNames((_classNames = {
					'ant-btn': true
				}, _defineProperty(_classNames, prefix + type, type), _defineProperty(_classNames, prefix + shape, shape), _defineProperty(_classNames, prefix + sizeCls, sizeCls), _defineProperty(_classNames, prefix + 'loading', 'loading' in props && props.loading !== false), _defineProperty(_classNames, className, className), _classNames));

				var kids = React.Children.map(children, insertSpace);

				return React.createElement(
					'button',
					_extends({}, others, { type: htmlType || 'button', className: classes, onClick: onClick }),
					kids
				);
			}
		}]);

		return Button;
	})(React.Component);

	Button.propTypes = {
		type: React.PropTypes.string,
		shape: React.PropTypes.string,
		size: React.PropTypes.string,
		htmlType: React.PropTypes.string,
		onClick: React.PropTypes.func,
		loading: React.PropTypes.bool,
		className: React.PropTypes.string
	};

	Button.defaultProps = {
		onClick: function onClick() {}
	};

	var prefixGroup = 'ant-btn-group-';

	var ButtonGroup = (function (_React$Component2) {
		_inherits(ButtonGroup, _React$Component2);

		function ButtonGroup() {
			_classCallCheck(this, ButtonGroup);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(ButtonGroup).apply(this, arguments));
		}

		_createClass(ButtonGroup, [{
			key: 'render',
			value: function render() {
				var _classNames2;

				var _props = this.props;
				var size = _props.size;
				var className = _props.className;

				var others = _objectWithoutProperties(_props, ['size', 'className']);

				// large => lg
				// small => sm

				var sizeCls = ({
					'large': 'lg',
					'small': 'sm'
				})[size] || '';

				var classes = classNames((_classNames2 = {
					'ant-btn-group': true
				}, _defineProperty(_classNames2, prefixGroup + sizeCls, sizeCls), _defineProperty(_classNames2, className, className), _classNames2));

				return React.createElement('div', _extends({}, others, { className: classes }));
			}
		}]);

		return ButtonGroup;
	})(React.Component);

	ButtonGroup.propTypes = {
		size: React.PropTypes.string
	};
	Button.Group = ButtonGroup;
	UI.Button = Button;
	UI.ButtonGroup = ButtonGroup;
})(Smart.UI);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var animation = RC.animation;
  var Menu = RC.Menu;
  var MenuItemGroup = RC.MenuItemGroup;
  var MenuItem = RC.MenuItem;
  var Item = Menu.Item;
  var Divider = Menu.Divider;
  var SubMenu = Menu.SubMenu;
  var ItemGroup = Menu.ItemGroup;

  var AntMenu = React.createClass({
    displayName: 'AntMenu',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-menu',
        onClick: noop,
        onOpen: noop,
        onClose: noop,
        className: '',
        theme: 'light' };
    },
    // or dark
    getInitialState: function getInitialState() {
      return {
        openKeys: []
      };
    },
    handleClick: function handleClick(e) {
      this.setState({
        openKeys: []
      });
      this.props.onClick(e);
    },
    handleOpenKeys: function handleOpenKeys(e) {
      this.setState({
        openKeys: e.openKeys
      });
      this.props.onOpen(e);
    },
    handleCloseKeys: function handleCloseKeys(e) {
      this.setState({
        openKeys: e.openKeys
      });
      this.props.onClose(e);
    },
    render: function render() {
      var openAnimation = this.props.openAnimation || this.props.openTransitionName;
      if (!openAnimation) {
        switch (this.props.mode) {
          case 'horizontal':
            openAnimation = 'slide-up';
            break;
          case 'vertical':
            openAnimation = 'zoom-big';
            break;
          case 'inline':
            openAnimation = animation;
            break;
          default:
        }
      }

      var props = {};
      var className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
      if (this.props.mode !== 'inline') {
        // 这组属性的目的是
        // 弹出型的菜单需要点击后立即关闭
        // 另外，弹出型的菜单的受控模式没有使用场景
        props = {
          openKeys: this.state.openKeys,
          onClick: this.handleClick,
          onOpen: this.handleOpenKeys,
          onClose: this.handleCloseKeys,
          openTransitionName: openAnimation,
          className: className
        };
      } else {
        props = {
          openAnimation: openAnimation,
          className: className
        };
      }
      return React.createElement(Menu, _extends({}, this.props, props));
    }
  });

  AntMenu.Divider = Divider;
  AntMenu.Item = Item;
  AntMenu.SubMenu = SubMenu;
  AntMenu.ItemGroup = ItemGroup;

  UI.Menu = AntMenu;
  UI.MenuItem = Item;
  UI.SubMenu = SubMenu;
  UI.MenuItemGroup = ItemGroup;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var Select = RC.Select;
  var Option = Select.Option;
  var OptGroup = Select.OptGroup;

  var AntSelect = React.createClass({
    displayName: 'AntSelect',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-select',
        transitionName: 'slide-up',
        optionLabelProp: 'children',
        choiceTransitionName: 'zoom',
        showSearch: false
      };
    },
    render: function render() {
      var _props = this.props;
      var size = _props.size;
      var className = _props.className;
      var combobox = _props.combobox;
      var notFoundContent = _props.notFoundContent;

      var cls = classNames(_defineProperty({
        'ant-select-lg': size === 'large',
        'ant-select-sm': size === 'small'
      }, className, !!className));

      if (combobox) {
        notFoundContent = null;
      }

      return React.createElement(Select, _extends({}, this.props, {
        className: cls,
        notFoundContent: notFoundContent }));
    }
  });

  AntSelect.Option = Option;
  AntSelect.OptGroup = OptGroup;

  UI.Select = AntSelect;
  UI.Option = Option;
  UI.OptGroup = OptGroup;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

+(function (UI, RC) {
	var Dropdown = RC.Dropdown;
	var Button = UI.Button;
	var ButtonGroup = UI.ButtonGroup;
	var Icon = UI.Icon;

	var AntDropdown = React.createClass({
		displayName: 'AntDropdown',
		getDefaultProps: function getDefaultProps() {
			return {
				transitionName: 'slide-up',
				prefixCls: 'ant-dropdown'
			};
		},
		render: function render() {
			var _props = this.props;
			var overlay = _props.overlay;

			var otherProps = _objectWithoutProperties(_props, ['overlay']);

			var menu = React.cloneElement(overlay, {
				openTransitionName: 'zoom-big'
			});
			return React.createElement(Dropdown, _extends({}, otherProps, { overlay: menu }));
		}
	});

	var align = {
		points: ['tr', 'br'],
		overlay: {
			adjustX: 1,
			adjustY: 1
		},
		offset: [0, 3],
		targetOffset: [0, 0]
	};

	var DropdownButton = React.createClass({
		displayName: 'DropdownButton',
		getDefaultProps: function getDefaultProps() {
			return {
				align: align,
				type: 'default'
			};
		},
		render: function render() {
			return React.createElement(
				ButtonGroup,
				{ className: 'ant-dropdown-button' },
				React.createElement(
					Button,
					{ type: this.props.type },
					this.props.children
				),
				React.createElement(
					AntDropdown,
					this.props,
					React.createElement(
						Button,
						{ type: this.props.type },
						React.createElement(Icon, { type: 'down' })
					)
				)
			);
		}
	});

	AntDropdown.Button = DropdownButton;

	UI.Dropdown = AntDropdown;
	UI.DropdownButton = DropdownButton;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var noop = _.noop,
      PropTypes = React.PropTypes,
      rcUtil = RC.Util,
      Dom = rcUtil.Dom,
      Dialog = RC.Dialog,
      Icon = UI.Icon,
      Button = UI.Button;

  var mousePosition = undefined;
  var mousePositionEventBinded = undefined;

  var AntModal = React.createClass({
    displayName: 'AntModal',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-modal',
        onOk: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        width: 520,
        transitionName: 'zoom',
        maskAnimation: 'fade',
        confirmLoading: false,
        visible: false
      };
    },
    handleCancel: function handleCancel() {
      this.props.onCancel();
    },
    handleOk: function handleOk() {
      this.props.onOk();
    },
    componentDidMount: function componentDidMount() {
      if (mousePositionEventBinded) {
        return;
      }
      // 只有点击事件支持从鼠标位置动画展开
      Dom.addEventListener(document.documentElement, 'click', function (e) {
        mousePosition = {
          x: e.pageX,
          y: e.pageY
        };
        // 20ms 内发生过点击事件，则从点击位置动画展示
        // 否则直接 zoom 展示
        // 这样可以兼容非点击方式展开
        setTimeout(function () {
          return mousePosition = null;
        }, 20);
      });
      mousePositionEventBinded = true;
    },
    render: function render() {
      var props = this.props;
      var defaultFooter = [React.createElement(
        Button,
        { key: 'cancel',
          type: 'ghost',
          size: 'large',
          onClick: this.handleCancel },
        props.cancelText
      ), React.createElement(
        Button,
        { key: 'confirm',
          type: 'primary',
          size: 'large',
          loading: props.confirmLoading,
          onClick: this.handleOk },
        props.okText
      )];
      var footer = props.footer || defaultFooter;
      return React.createElement(Dialog, _extends({ onClose: this.handleCancel, footer: footer }, props, {
        visible: props.visible, mousePosition: mousePosition }));
    }
  });
  function confirm(props) {
    var div = document.createElement('div');
    document.body.appendChild(div);

    var d = undefined;
    props = props || {};
    props.iconClassName = props.iconClassName || 'question-circle';

    var iconClassType = props.iconClassName;

    var width = props.width || 416;

    // 默认为 true，保持向下兼容
    if (!('okCancel' in props)) {
      props.okCancel = true;
    }

    props.okText = props.okText || (props.okCancel ? '确定' : '知道了');
    props.cancelText = props.cancelText || '取消';

    function close() {
      d.setState({
        visible: false
      });
      ReactDOM.unmountComponentAtNode(div);
      div.parentNode.removeChild(div);
    }

    function onCancel() {
      var cancelFn = props.onCancel;
      if (cancelFn) {
        var ret = undefined;
        if (cancelFn.length) {
          ret = cancelFn(close);
        } else {
          ret = cancelFn();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }

    function onOk() {
      var okFn = props.onOk;
      if (okFn) {
        var ret = undefined;
        if (okFn.length) {
          ret = okFn(close);
        } else {
          ret = okFn();
          if (!ret) {
            close();
          }
        }
        if (ret && ret.then) {
          ret.then(close);
        }
      } else {
        close();
      }
    }

    var body = React.createElement(
      'div',
      { className: 'ant-confirm-body' },
      React.createElement(Icon, { type: iconClassType }),
      React.createElement(
        'span',
        { className: 'ant-confirm-title' },
        props.title
      ),
      React.createElement(
        'div',
        { className: 'ant-confirm-content' },
        props.content
      )
    );

    var footer = null;
    if (props.okCancel) {
      footer = React.createElement(
        'div',
        { className: 'ant-confirm-btns' },
        React.createElement(
          Button,
          { type: 'ghost', size: 'large', onClick: onCancel },
          props.cancelText
        ),
        React.createElement(
          Button,
          { type: 'primary', size: 'large', onClick: onOk },
          props.okText
        )
      );
    } else {
      footer = React.createElement(
        'div',
        { className: 'ant-confirm-btns' },
        React.createElement(
          Button,
          { type: 'primary', size: 'large', onClick: onOk },
          props.okText
        )
      );
    }

    ReactDOM.render(React.createElement(
      AntModal,
      {
        prefixCls: 'ant-modal',
        className: 'ant-confirm',
        visible: true,
        closable: false,
        title: '',
        transitionName: 'zoom',
        footer: '',
        maskTransitionName: 'fade', width: width },
      React.createElement(
        'div',
        { style: { zoom: 1, overflow: 'hidden' } },
        body,
        ' ',
        footer
      )
    ), div, function () {
      d = this;
    });
  }

  AntModal.info = function (props) {
    props.iconClassName = 'info-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.success = function (props) {
    props.iconClassName = 'check-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.error = function (props) {
    props.iconClassName = 'exclamation-circle';
    props.okCancel = false;
    return confirm(props);
  };

  AntModal.confirm = function (props) {
    props.okCancel = true;
    return confirm(props);
  };

  UI.Modal = AntModal;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var Tooltip = RC.Tooltip;

  UI.Tooltip = React.createClass({
    displayName: 'Tooltip',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-tooltip',
        placement: 'top',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1
      };
    },
    getInitialState: function getInitialState() {
      return {
        visible: false
      };
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setState({ visible: visible });
    },
    render: function render() {
      var transitionName = ({
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      })[this.props.placement];

      // Hide tooltip when there is no title
      var visible = this.state.visible;
      if (!this.props.title) {
        visible = false;
      }

      return React.createElement(
        Tooltip,
        _extends({ transitionName: transitionName,
          overlay: this.props.title,
          visible: visible,
          onVisibleChange: this.onVisibleChange
        }, this.props),
        this.props.children
      );
    }
  });
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var Tabs = RC.Tabs;
  var _React = React;
  var cloneElement = _React.cloneElement;
  var Icon = UI.Icon;

  var AntTabs = (function (_React$Component) {
    _inherits(AntTabs, _React$Component);

    function AntTabs(props) {
      _classCallCheck(this, AntTabs);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntTabs).call(this, props));

      ['createNewTab', 'removeTab', 'handleChange'].forEach(function (method) {
        return _this[method] = _this[method].bind(_this);
      });
      return _this;
    }

    _createClass(AntTabs, [{
      key: 'createNewTab',
      value: function createNewTab(targetKey) {
        this.props.onEdit(targetKey, 'add');
      }
    }, {
      key: 'removeTab',
      value: function removeTab(targetKey, e) {
        e.stopPropagation();
        if (!targetKey) {
          return;
        }
        this.props.onEdit(targetKey, 'remove');
      }
    }, {
      key: 'handleChange',
      value: function handleChange(activeKey) {
        this.props.onChange(activeKey);
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames,
            _this2 = this;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var size = _props.size;
        var tabPosition = _props.tabPosition;
        var animation = _props.animation;
        var type = _props.type;
        var children = _props.children;
        var tabBarExtraContent = _props.tabBarExtraContent;

        var className = classNames((_classNames = {}, _defineProperty(_classNames, this.props.className, !!this.props.className), _defineProperty(_classNames, prefixCls + '-mini', size === 'small' || size === 'mini'), _defineProperty(_classNames, prefixCls + '-vertical', tabPosition === 'left' || tabPosition === 'right'), _defineProperty(_classNames, prefixCls + '-card', type.indexOf('card') >= 0), _classNames));
        if (tabPosition === 'left' || tabPosition === 'right' || type.indexOf('card') >= 0) {
          animation = null;
        }
        // only card type tabs can be added and closed
        if (type === 'editable-card') {
          if (children.length > 1) {
            children = children.map(function (child, index) {
              return cloneElement(child, {
                tab: React.createElement(
                  'div',
                  null,
                  child.props.tab,
                  React.createElement(Icon, { type: 'cross', onClick: _this2.removeTab.bind(_this2, child.key) })
                ),
                key: child.key || index
              });
            });
          }
          // Add new tab handler
          tabBarExtraContent = React.createElement(
            'span',
            null,
            React.createElement(Icon, { type: 'plus', className: prefixCls + '-new-tab', onClick: this.createNewTab }),
            tabBarExtraContent
          );
        }
        // Wrap the extra content
        tabBarExtraContent = React.createElement(
          'div',
          { className: prefixCls + '-extra-content' },
          tabBarExtraContent
        );
        return React.createElement(
          Tabs,
          _extends({}, this.props, {
            className: className,
            tabBarExtraContent: tabBarExtraContent,
            onChange: this.handleChange,
            animation: animation }),
          children
        );
      }
    }]);

    return AntTabs;
  })(React.Component);

  AntTabs.defaultProps = {
    prefixCls: 'ant-tabs',
    animation: 'slide-horizontal',
    type: 'line', // or 'card' 'editable-card'
    onChange: function onChange() {},
    onEdit: function onEdit() {}
  };

  AntTabs.TabPane = Tabs.TabPane;
  UI.Tabs = AntTabs;
})(Smart.UI, Smart.RC);
'use strict';

+(function (UI, RC) {
  var Tooltip = RC.Tooltip;
  var _ref = _;
  var noop = _ref.noop;
  var Icon = UI.Icon;
  var Button = UI.Button;

  var prefixCls = 'ant-popover';
  var transitionNames = {
    top: 'zoom-down',
    bottom: 'zoom-up',
    left: 'zoom-right',
    right: 'zoom-left',
    topLeft: 'zoom-down',
    bottomLeft: 'zoom-up',
    leftTop: 'zoom-right',
    rightTop: 'zoom-left',
    topRight: 'zoom-down',
    bottomRight: 'zoom-up',
    leftBottom: 'zoom-right',
    rightBottom: 'zoom-left'
  };

  UI.Popconfirm = React.createClass({
    displayName: 'Popconfirm',
    getInitialState: function getInitialState() {
      return {
        visible: false
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        transitionName: '',
        placement: 'top',
        trigger: 'click',
        overlayStyle: {},
        onConfirm: noop,
        onCancel: noop,
        okText: '确定',
        cancelText: '取消',
        onVisibleChange: function onVisibleChange() {}
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('visible' in nextProps) {
        this.setState({ visible: nextProps.visible });
      }
    },
    confirm: function confirm() {
      this.setVisible(false);
      this.props.onConfirm.call(this);
    },
    cancel: function cancel() {
      this.setVisible(false);
      this.props.onCancel.call(this);
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setVisible(visible);
      this.props.onVisibleChange(visible);
    },
    setVisible: function setVisible(visible) {
      if (!('visible' in this.props)) {
        this.setState({ visible: visible });
      }
    },
    render: function render() {
      var _props = this.props;
      var title = _props.title;
      var okText = _props.okText;
      var cancelText = _props.cancelText;
      var placement = _props.placement;
      var overlayStyle = _props.overlayStyle;
      var trigger = _props.trigger;

      var overlay = React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: prefixCls + '-content' },
          React.createElement(
            'p',
            { className: prefixCls + '-message' },
            React.createElement(Icon, { type: 'exclamation-circle' }),
            title
          ),
          React.createElement(
            'div',
            { className: prefixCls + '-buttons' },
            React.createElement(
              Button,
              { onClick: this.cancel, type: 'ghost', size: 'small' },
              cancelText
            ),
            React.createElement(
              Button,
              { onClick: this.confirm, type: 'primary', size: 'small' },
              okText
            )
          )
        )
      );

      var transitionName = transitionNames[placement];

      return React.createElement(
        Tooltip,
        { placement: placement,
          overlayStyle: overlayStyle,
          prefixCls: prefixCls,
          onVisibleChange: this.onVisibleChange,
          transitionName: transitionName,
          visible: this.state.visible,
          trigger: trigger,
          overlay: overlay },
        this.props.children
      );
    }
  });
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var Upload = RC.Upload;
  var Animate = RC.Animate;
  var _ref = _;
  var assign = _ref.assign;
  var noop = _ref.noop;
  var Icon = UI.Icon;
  var Progress = UI.Progress;
  var Line = Progress.Line;

  var prefixCls = 'ant-upload';

  function getFileItem(file, fileList) {
    var matchWay = !file.uid ? 'byName' : 'byUid';
    var target = fileList.filter(function (item) {
      if (matchWay === 'byName') {
        return item.name === file.name;
      }
      return item.uid === file.uid;
    })[0];
    return target;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  var previewFile = function previewFile(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(file);
  };

  var UploadList = React.createClass({
    displayName: 'UploadList',
    getDefaultProps: function getDefaultProps() {
      return {
        listType: 'text', // or picture
        items: [],
        progressAttr: {
          strokeWidth: 3,
          showInfo: false
        }
      };
    },
    handleClose: function handleClose(file) {
      this.props.onRemove(file);
    },
    componentDidUpdate: function componentDidUpdate() {
      var _this = this;

      if (this.props.listType !== 'picture' && this.props.listType !== 'picture-card') {
        return;
      }
      this.props.items.forEach(function (file) {
        if (typeof document === 'undefined' || typeof window === 'undefined' || !window.FileReader || !window.File || !(file.originFileObj instanceof File) || file.thumbUrl !== undefined) {
          return;
        }
        /*eslint-disable */
        file.thumbUrl = '';
        /*eslint-enable */
        previewFile(file.originFileObj, function (previewDataUrl) {
          /*eslint-disable */
          file.thumbUrl = previewDataUrl;
          /*eslint-enable */
          _this.forceUpdate();
        });
      });
    },
    render: function render() {
      var _this2 = this,
          _classNames2;

      var list = this.props.items.map(function (file) {
        var _classNames;

        var progress = undefined;
        var icon = React.createElement(Icon, { type: 'paper-clip' });

        if (_this2.props.listType === 'picture' || _this2.props.listType === 'picture-card') {
          if (file.status === 'uploading' || !file.thumbUrl && !file.url) {
            if (_this2.props.listType === 'picture-card') {
              icon = React.createElement(
                'div',
                { className: prefixCls + '-list-item-uploading-text' },
                '文件上传中'
              );
            } else {
              icon = React.createElement(Icon, { className: prefixCls + '-list-item-thumbnail', type: 'picture' });
            }
          } else {
            icon = React.createElement(
              'a',
              { className: prefixCls + '-list-item-thumbnail',
                href: file.url,
                target: '_blank' },
              React.createElement('img', { src: file.thumbUrl || file.url, alt: file.name })
            );
          }
        }

        if (file.status === 'uploading') {
          progress = React.createElement(
            'div',
            { className: prefixCls + '-list-item-progress' },
            React.createElement(Line, _extends({}, _this2.props.progressAttr, { percent: file.percent }))
          );
        }
        var infoUploadingClass = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls + '-list-item', true), _defineProperty(_classNames, prefixCls + '-list-item-' + file.status, true), _classNames));
        return React.createElement(
          'div',
          { className: infoUploadingClass, key: file.uid },
          React.createElement(
            'div',
            { className: prefixCls + '-list-item-info' },
            icon,
            React.createElement(
              'span',
              { className: prefixCls + '-list-item-name' },
              file.name
            ),
            _this2.props.listType === 'picture-card' && file.status !== 'uploading' ? React.createElement(
              'span',
              null,
              React.createElement(
                'a',
                { href: file.url, target: '_blank', style: { pointerEvents: file.url ? '' : 'none' } },
                React.createElement(Icon, { type: 'eye-o' })
              ),
              React.createElement(Icon, { type: 'delete', onClick: _this2.handleClose.bind(_this2, file) })
            ) : React.createElement(Icon, { type: 'cross', onClick: _this2.handleClose.bind(_this2, file) })
          ),
          progress
        );
      });
      var listClassNames = classNames((_classNames2 = {}, _defineProperty(_classNames2, prefixCls + '-list', true), _defineProperty(_classNames2, prefixCls + '-list-' + this.props.listType, true), _classNames2));
      return React.createElement(
        'div',
        { className: listClassNames },
        React.createElement(
          Animate,
          { transitionName: prefixCls + '-margin-top' },
          list
        )
      );
    }
  });

  function T() {
    return true;
  }

  // Fix IE file.status problem
  // via coping a new Object
  function fileToObject(file) {
    return {
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.filename || file.name,
      size: file.size,
      type: file.type,
      uid: file.uid,
      response: file.response,
      error: file.error,
      percent: 0,
      originFileObj: file
    };
  }

  /**
   * 生成Progress percent: 0.1 -> 0.98
   *   - for ie
   */
  function genPercentAdd() {
    var k = 0.1;
    var i = 0.01;
    var end = 0.98;
    return function (s) {
      var start = s;
      if (start >= end) {
        return start;
      }

      start += k;
      k = k - i;
      if (k < 0.001) {
        k = 0.001;
      }
      return start * 100;
    };
  }

  var AntUpload = React.createClass({
    displayName: 'AntUpload',
    getInitialState: function getInitialState() {
      return {
        fileList: this.props.fileList || this.props.defaultFileList || [],
        dragState: 'drop'
      };
    },
    onStart: function onStart(file) {
      if (this.recentUploadStatus === false) return;

      var targetItem = undefined;
      var nextFileList = this.state.fileList.concat();
      if (file.length > 0) {
        targetItem = file.map(function (f) {
          var fileObject = fileToObject(f);
          fileObject.status = 'uploading';
          return fileObject;
        });
        nextFileList = nextFileList.concat(targetItem);
      } else {
        targetItem = fileToObject(file);
        targetItem.status = 'uploading';
        nextFileList.push(targetItem);
      }
      this.onChange({
        file: targetItem,
        fileList: nextFileList
      });
      // fix ie progress
      if (!window.FormData) {
        this.autoUpdateProgress(0, targetItem);
      }
    },
    autoUpdateProgress: function autoUpdateProgress(percent, file) {
      var _this3 = this;

      var getPercent = genPercentAdd();
      var curPercent = 0;
      this.progressTimer = setInterval(function () {
        curPercent = getPercent(curPercent);
        _this3.onProgress({
          percent: curPercent
        }, file);
      }, 200);
    },
    removeFile: function removeFile(file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      var index = fileList.indexOf(targetItem);
      if (index !== -1) {
        fileList.splice(index, 1);
        return fileList;
      }
      return null;
    },
    onSuccess: function onSuccess(response, file) {
      this.clearProgressTimer();
      // 服务器端需要返回标准 json 字符串
      // 否则视为失败
      try {
        if (typeof response === 'string') {
          JSON.parse(response);
        }
      } catch (e) {
        this.onError(new Error('No response'), response, file);
        return;
      }
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      // 之前已经删除
      if (targetItem) {
        targetItem.status = 'done';
        targetItem.response = response;
        this.onChange({
          file: targetItem,
          fileList: fileList
        });
      }
    },
    onProgress: function onProgress(e, file) {
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      if (!targetItem) return;
      targetItem.percent = e.percent;
      this.onChange({
        event: e,
        file: file,
        fileList: this.state.fileList
      });
    },
    onError: function onError(error, response, file) {
      this.clearProgressTimer();
      var fileList = this.state.fileList;
      var targetItem = getFileItem(file, fileList);
      targetItem.error = error;
      targetItem.response = response;
      targetItem.status = 'error';
      this.handleRemove(targetItem);
    },
    beforeUpload: function beforeUpload(file) {
      this.recentUploadStatus = this.props.beforeUpload(file);
      return this.recentUploadStatus;
    },
    handleRemove: function handleRemove(file) {
      var fileList = this.removeFile(file);
      if (fileList) {
        this.onChange({
          file: file,
          fileList: fileList
        });
      }
    },
    handleManualRemove: function handleManualRemove(file) {
      /*eslint-disable */
      file.status = 'removed';
      /*eslint-enable */
      this.handleRemove(file);
    },
    onChange: function onChange(info) {
      this.setState({
        fileList: info.fileList
      });
      this.props.onChange(info);
    },
    getDefaultProps: function getDefaultProps() {
      return {
        type: 'select',
        // do not set
        // name: '',
        multiple: false,
        action: '',
        data: {},
        accept: '',
        onChange: noop,
        beforeUpload: T,
        showUploadList: true,
        listType: 'text', // or pictrue
        className: ''
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('fileList' in nextProps) {
        this.setState({
          fileList: nextProps.fileList || []
        });
      }
    },
    onFileDrop: function onFileDrop(e) {
      this.setState({
        dragState: e.type
      });
    },
    clearProgressTimer: function clearProgressTimer() {
      clearInterval(this.progressTimer);
    },
    render: function render() {
      var type = this.props.type || 'select';
      var props = assign({}, this.props, {
        onStart: this.onStart,
        onError: this.onError,
        onProgress: this.onProgress,
        onSuccess: this.onSuccess,
        beforeUpload: this.beforeUpload
      });
      var uploadList = undefined;
      if (this.props.showUploadList) {
        uploadList = React.createElement(UploadList, { listType: this.props.listType,
          items: this.state.fileList,
          onRemove: this.handleManualRemove });
      }
      if (type === 'drag') {
        var dragUploadingClass = this.state.fileList.some(function (file) {
          return file.status === 'uploading';
        }) ? prefixCls + '-drag-uploading' : '';
        var draggingClass = this.state.dragState === 'dragover' ? prefixCls + '-drag-hover' : '';
        return React.createElement(
          'span',
          { className: this.props.className },
          React.createElement(
            'div',
            { className: prefixCls + ' ' + prefixCls + '-drag ' + dragUploadingClass + ' ' + draggingClass,
              onDrop: this.onFileDrop,
              onDragOver: this.onFileDrop,
              onDragLeave: this.onFileDrop },
            React.createElement(
              Upload,
              props,
              React.createElement(
                'div',
                { className: prefixCls + '-drag-container' },
                this.props.children
              )
            )
          ),
          uploadList
        );
      } else if (type === 'select') {
        var _classNames3;

        var uploadButtonCls = classNames((_classNames3 = {}, _defineProperty(_classNames3, prefixCls, true), _defineProperty(_classNames3, prefixCls + '-select', true), _defineProperty(_classNames3, prefixCls + '-select-' + this.props.listType, true), _classNames3));
        if (this.props.listType === 'picture-card') {
          return React.createElement(
            'span',
            { className: this.props.className },
            uploadList,
            React.createElement(
              'div',
              { className: uploadButtonCls },
              React.createElement(
                Upload,
                props,
                this.props.children
              )
            )
          );
        }
        return React.createElement(
          'span',
          { className: this.props.className },
          React.createElement(
            'div',
            { className: uploadButtonCls },
            React.createElement(
              Upload,
              props,
              this.props.children
            )
          ),
          uploadList
        );
      }
    }
  });

  AntUpload.Dragger = React.createClass({
    displayName: 'Dragger',
    render: function render() {
      return React.createElement(AntUpload, _extends({}, this.props, { type: 'drag', style: { height: this.props.height } }));
    }
  });
  UI.Upload = AntUpload;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var Animate = RC.Animate;
  var Icon = UI.Icon;

  var AntTag = (function (_React$Component) {
    _inherits(AntTag, _React$Component);

    function AntTag(props) {
      _classCallCheck(this, AntTag);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AntTag).call(this, props));

      _this.state = {
        closing: false,
        closed: false
      };
      return _this;
    }

    _createClass(AntTag, [{
      key: 'close',
      value: function close(e) {
        var dom = ReactDOM.findDOMNode(this);
        dom.style.width = dom.offsetWidth + 'px';
        // It's Magic Code, don't know why
        dom.style.width = dom.offsetWidth + 'px';
        this.setState({
          closing: true
        });
        this.props.onClose(e);
      }
    }, {
      key: 'animationEnd',
      value: function animationEnd(key, existed) {
        if (!existed) {
          this.setState({
            closed: true,
            closing: false
          });
          this.props.afterClose();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _classNames;

        var _props = this.props;
        var prefixCls = _props.prefixCls;
        var closable = _props.closable;
        var color = _props.color;

        var restProps = _objectWithoutProperties(_props, ['prefixCls', 'closable', 'color']);

        var close = closable ? React.createElement(Icon, { type: 'cross', onClick: this.close.bind(this) }) : '';
        var className = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-' + color, !!color), _defineProperty(_classNames, prefixCls + '-close', this.state.closing), _classNames));
        return React.createElement(
          Animate,
          { component: '',
            showProp: 'data-show',
            transitionName: prefixCls + '-zoom',
            transitionAppear: true,
            onEnd: this.animationEnd.bind(this) },
          this.state.closed ? null : React.createElement(
            'div',
            { 'data-show': !this.state.closing, className: className },
            React.createElement('span', _extends({ className: prefixCls + '-text' }, restProps)),
            close
          )
        );
      }
    }]);

    return AntTag;
  })(React.Component);

  AntTag.defaultProps = {
    prefixCls: 'ant-tag',
    closable: false,
    onClose: function onClose() {},
    afterClose: function afterClose() {}
  };

  UI.Tag = AntTag;
})(Smart.UI, Smart.RC);
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

+(function (UI, RC) {
  var isCssAnimationSupported = RC.cssAnimation.isCssAnimationSupported;

  var AntSpin = React.createClass({
    displayName: 'AntSpin',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-spin',
        spining: true
      };
    },

    propTypes: {
      className: React.PropTypes.string,
      size: React.PropTypes.oneOf(['small', 'default', 'large'])
    },

    isNestedPattern: function isNestedPattern() {
      return !!(this.props && this.props.children);
    },
    render: function render() {
      var _classNames;

      var _props = this.props;
      var className = _props.className;
      var size = _props.size;
      var prefixCls = _props.prefixCls;

      var spinClassName = classNames((_classNames = {}, _defineProperty(_classNames, prefixCls, true), _defineProperty(_classNames, prefixCls + '-sm', size === 'small'), _defineProperty(_classNames, prefixCls + '-lg', size === 'large'), _defineProperty(_classNames, className, !!className), _defineProperty(_classNames, prefixCls + '-spining', this.props.spining), _classNames));

      var spinElement = undefined;
      if (!isCssAnimationSupported) {
        // not support for animation, just use text instead
        spinElement = React.createElement(
          'div',
          { className: spinClassName },
          '加载中...'
        );
      } else {
        spinElement = React.createElement(
          'div',
          { className: spinClassName },
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-first' }),
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-second' }),
          React.createElement('span', { className: prefixCls + '-dot ' + prefixCls + '-dot-third' })
        );
      }

      if (this.isNestedPattern()) {
        return React.createElement(
          'div',
          { className: this.props.spining ? prefixCls + '-nested-loading' : '' },
          spinElement,
          React.createElement(
            'div',
            { className: prefixCls + '-container' },
            this.props.children
          )
        );
      }
      return spinElement;
    }
  });
  UI.Spin = AntSpin;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI, RC) {
  var Tooltip = RC.Tooltip;

  var prefixCls = 'ant-popover';

  var Popover = React.createClass({
    displayName: 'Popover',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: prefixCls,
        placement: 'top',
        trigger: 'hover',
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        overlayStyle: {}
      };
    },
    render: function render() {
      var transitionName = ({
        top: 'zoom-down',
        bottom: 'zoom-up',
        left: 'zoom-right',
        right: 'zoom-left',
        topLeft: 'zoom-down',
        bottomLeft: 'zoom-up',
        leftTop: 'zoom-right',
        rightTop: 'zoom-left',
        topRight: 'zoom-down',
        bottomRight: 'zoom-up',
        leftBottom: 'zoom-right',
        rightBottom: 'zoom-left'
      })[this.props.placement];

      return React.createElement(
        Tooltip,
        _extends({ transitionName: transitionName,
          ref: 'tooltip'
        }, this.props, {
          overlay: this.getOverlay() }),
        this.props.children
      );
    },
    getPopupDomNode: function getPopupDomNode() {
      return this.refs.tooltip.getPopupDomNode();
    },
    getOverlay: function getOverlay() {
      return React.createElement(
        'div',
        null,
        this.props.title && React.createElement(
          'div',
          { className: prefixCls + '-title' },
          this.props.title
        ),
        React.createElement(
          'div',
          { className: prefixCls + '-content' },
          this.props.overlay
        )
      );
    }
  });

  UI.Popover = Popover;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+(function (UI, RC) {
  var Pagination = RC.Pagination;
  var locale = RC.locale;
  var Select = UI.Select;

  var MiniSelect = (function (_React$Component) {
    _inherits(MiniSelect, _React$Component);

    function MiniSelect() {
      _classCallCheck(this, MiniSelect);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(MiniSelect).apply(this, arguments));
    }

    _createClass(MiniSelect, [{
      key: 'render',
      value: function render() {
        return React.createElement(Select, _extends({ size: 'small' }, this.props));
      }
    }]);

    return MiniSelect;
  })(React.Component);

  MiniSelect.Option = Select.Option;

  var AntPagination = (function (_React$Component2) {
    _inherits(AntPagination, _React$Component2);

    function AntPagination() {
      _classCallCheck(this, AntPagination);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(AntPagination).apply(this, arguments));
    }

    _createClass(AntPagination, [{
      key: 'render',
      value: function render() {
        var className = this.props.className;
        var selectComponentClass = Select;

        if (this.props.size === 'small') {
          className += ' mini';
          selectComponentClass = MiniSelect;
        }

        return React.createElement(Pagination, _extends({ selectComponentClass: selectComponentClass,
          selectPrefixCls: 'ant-select'
        }, this.props, {
          className: className }));
      }
    }]);

    return AntPagination;
  })(React.Component);

  AntPagination.defaultProps = {
    locale: locale.pagination,
    className: '',
    prefixCls: 'ant-pagination'
  };

  UI.Pagination = AntPagination;
})(Smart.UI, Smart.RC);
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

+(function (UI, RC) {
  var _ref = _;
  var noop = _ref.noop;
  var objectAssign = _.assign;
  var Table = RC.Table;
  var classNames = RC.classNames;
  var Menu = RC.Menu;
  var SubMenu = RC.SubMenu;
  var locale = RC.locale;
  var Radio = UI.Radio;
  var Pagination = UI.Pagination;
  var Icon = UI.Icon;
  var Spin = UI.Spin;
  var Dropdown = UI.Dropdown;
  var Checkbox = UI.Checkbox;

  var defaultLocale = locale.table;

  var FilterMenu = React.createClass({
    displayName: 'FilterMenu',
    getInitialState: function getInitialState() {
      return {
        selectedKeys: this.props.selectedKeys,
        keyPathOfSelectedItem: {}, // 记录所有有选中子菜单的祖先菜单
        visible: false
      };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      this.setState({
        selectedKeys: nextProps.selectedKeys
      });
    },
    getDefaultProps: function getDefaultProps() {
      return {
        handleFilter: function handleFilter() {},

        column: null
      };
    },
    setSelectedKeys: function setSelectedKeys(_ref2) {
      var selectedKeys = _ref2.selectedKeys;

      this.setState({ selectedKeys: selectedKeys });
    },
    handleClearFilters: function handleClearFilters() {
      this.setState({
        selectedKeys: []
      }, this.handleConfirm);
    },
    handleConfirm: function handleConfirm() {
      this.setState({
        visible: false
      });
      this.props.confirmFilter(this.props.column, this.state.selectedKeys);
    },
    onVisibleChange: function onVisibleChange(visible) {
      this.setState({
        visible: visible
      });
      if (!visible) {
        this.props.confirmFilter(this.props.column, this.state.selectedKeys);
      }
    },
    renderMenuItem: function renderMenuItem(item) {
      return React.createElement(
        Menu.Item,
        { key: item.value },
        React.createElement(Checkbox, { checked: this.state.selectedKeys.indexOf(item.value) >= 0 }),
        item.text
      );
    },
    renderMenus: function renderMenus(items) {
      var _this = this;

      var menuItems = items.map(function (item) {
        if (item.children && item.children.length > 0) {
          var _ret = (function () {
            var keyPathOfSelectedItem = _this.state.keyPathOfSelectedItem;
            var containSelected = Object.keys(keyPathOfSelectedItem).some(function (key) {
              var keyPath = keyPathOfSelectedItem[key];
              if (keyPath.indexOf(item.value) >= 0) {
                return true;
              }
            });
            var subMenuCls = containSelected ? 'ant-dropdown-submenu-contain-selected' : '';
            return {
              v: React.createElement(
                SubMenu,
                { title: item.text, className: subMenuCls, key: item.value },
                item.children.map(function (child) {
                  return _this.renderMenuItem(child);
                })
              )
            };
          })();

          if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
        }
        return _this.renderMenuItem(item);
      });
      return menuItems;
    },
    handleMenuItemClick: function handleMenuItemClick(info) {
      if (info.keyPath.length <= 1) {
        return;
      }
      var keyPathOfSelectedItem = this.state.keyPathOfSelectedItem;
      if (this.state.selectedKeys.indexOf(info.key) >= 0) {
        // deselect SubMenu child
        delete keyPathOfSelectedItem[info.key];
      } else {
        // select SubMenu child
        keyPathOfSelectedItem[info.key] = info.keyPath;
      }
      this.setState({ keyPathOfSelectedItem: keyPathOfSelectedItem });
    },
    render: function render() {
      var _props = this.props;
      var column = _props.column;
      var locale = _props.locale;
      // default multiple selection in filter dropdown

      var multiple = true;
      if ('filterMultiple' in column) {
        multiple = column.filterMultiple;
      }
      var menus = React.createElement(
        'div',
        { className: 'ant-table-filter-dropdown' },
        React.createElement(
          Menu,
          { multiple: multiple,
            prefixCls: 'ant-dropdown-menu',
            onSelect: this.setSelectedKeys,
            onDeselect: this.setSelectedKeys,
            selectedKeys: this.state.selectedKeys },
          this.renderMenus(column.filters)
        ),
        React.createElement(
          'div',
          { className: 'ant-table-filter-dropdown-btns' },
          React.createElement(
            'a',
            { className: 'ant-table-filter-dropdown-link confirm',
              onClick: this.handleConfirm },
            locale.filterConfirm
          ),
          React.createElement(
            'a',
            { className: 'ant-table-filter-dropdown-link clear',
              onClick: this.handleClearFilters },
            locale.filterReset
          )
        )
      );

      var dropdownSelectedClass = '';
      if (this.props.selectedKeys.length > 0) {
        dropdownSelectedClass = 'ant-table-filter-selected';
      }

      return React.createElement(
        Dropdown,
        { trigger: ['click'],
          overlay: menus,
          visible: this.state.visible,
          onVisibleChange: this.onVisibleChange,
          closeOnSelect: false },
        React.createElement(Icon, { title: locale.filterTitle, type: 'filter', className: dropdownSelectedClass })
      );
    }
  });

  var defaultPagination = {
    pageSize: 10,
    current: 1,
    onChange: noop,
    onShowSizeChange: noop
  };

  var AntTable = React.createClass({
    displayName: 'AntTable',
    getInitialState: function getInitialState() {
      return {
        // 减少状态
        selectedRowKeys: this.props.selectedRowKeys || [],
        filters: {},
        selectionDirty: false,
        sortColumn: '',
        sortOrder: '',
        sorter: null,
        radioIndex: null,
        pagination: this.hasPagination() ? objectAssign({}, defaultPagination, this.props.pagination) : {}
      };
    },
    getDefaultProps: function getDefaultProps() {
      return {
        dataSource: [],
        prefixCls: 'ant-table',
        useFixedHeader: false,
        rowSelection: null,
        className: '',
        size: 'large',
        loading: false,
        bordered: false,
        indentSize: 20,
        onChange: noop,
        locale: {}
      };
    },

    propTypes: {
      dataSource: React.PropTypes.array,
      prefixCls: React.PropTypes.string,
      useFixedHeader: React.PropTypes.bool,
      rowSelection: React.PropTypes.object,
      className: React.PropTypes.string,
      size: React.PropTypes.string,
      loading: React.PropTypes.bool,
      bordered: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      locale: React.PropTypes.object
    },

    getDefaultSelection: function getDefaultSelection() {
      var _this2 = this;

      if (!this.props.rowSelection || !this.props.rowSelection.getCheckboxProps) {
        return [];
      }
      return this.getCurrentPageData().filter(function (item) {
        return _this2.props.rowSelection.getCheckboxProps(item).defaultChecked;
      }).map(function (record, rowIndex) {
        return _this2.getRecordKey(record, rowIndex);
      });
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
      if ('pagination' in nextProps && nextProps.pagination !== false) {
        this.setState({
          pagination: objectAssign({}, this.state.pagination, nextProps.pagination)
        });
      }
      // dataSource 的变化会清空选中项
      if ('dataSource' in nextProps && nextProps.dataSource !== this.props.dataSource) {
        this.setState({
          selectionDirty: false
        });
      }
      if (nextProps.rowSelection && 'selectedRowKeys' in nextProps.rowSelection) {
        this.setState({
          selectedRowKeys: nextProps.rowSelection.selectedRowKeys || []
        });
      }
    },
    setSelectedRowKeys: function setSelectedRowKeys(selectedRowKeys) {
      if (this.props.rowSelection && !('selectedRowKeys' in this.props.rowSelection)) {
        this.setState({ selectedRowKeys: selectedRowKeys });
      }
      if (this.props.rowSelection && this.props.rowSelection.onChange) {
        this.props.rowSelection.onChange(selectedRowKeys);
      }
    },
    hasPagination: function hasPagination() {
      return this.props.pagination !== false;
    },
    toggleSortOrder: function toggleSortOrder(order, column) {
      var sortColumn = this.state.sortColumn;
      var sortOrder = this.state.sortOrder;
      var sorter = undefined;
      // 只同时允许一列进行排序，否则会导致排序顺序的逻辑问题
      var isSortColumn = this.isSortColumn(column);
      if (!isSortColumn) {
        // 当前列未排序
        sortOrder = order;
        sortColumn = column;
      } else {
        // 当前列已排序
        if (sortOrder === order) {
          // 切换为未排序状态
          sortOrder = '';
          sortColumn = null;
        } else {
          // 切换为排序状态
          sortOrder = order;
        }
      }
      if (typeof column.sorter === 'function') {
        sorter = function sorter() {
          var result = column.sorter.apply(this, arguments);
          if (sortOrder === 'ascend') {
            return result;
          } else if (sortOrder === 'descend') {
            return -result;
          }
        };
      }
      var newState = {
        sortOrder: sortOrder,
        sortColumn: sortColumn,
        sorter: sorter
      };
      this.setState(newState);
      this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
    },
    handleFilter: function handleFilter(column, nextFilters) {
      var _this3 = this;

      var filters = objectAssign({}, this.state.filters, _defineProperty({}, this.getColumnKey(column), nextFilters));
      // Remove filters not in current columns
      var currentColumnKeys = this.props.columns.map(function (c) {
        return _this3.getColumnKey(c);
      });
      Object.keys(filters).forEach(function (columnKey) {
        if (currentColumnKeys.indexOf(columnKey) < 0) {
          delete filters[columnKey];
        }
      });
      var newState = {
        selectionDirty: false,
        filters: filters
      };
      this.setState(newState);
      this.setSelectedRowKeys([]);
      this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
    },
    handleSelect: function handleSelect(record, rowIndex, e) {
      var _this4 = this;

      var checked = e.target.checked;
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var key = this.getRecordKey(record, rowIndex);
      if (checked) {
        selectedRowKeys.push(this.getRecordKey(record, rowIndex));
      } else {
        selectedRowKeys = selectedRowKeys.filter(function (i) {
          return key !== i;
        });
      }
      this.setState({
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelect) {
        var data = this.getCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this4.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelect(record, checked, selectedRows);
      }
    },
    handleRadioSelect: function handleRadioSelect(record, rowIndex, e) {
      var _this5 = this;

      var checked = e.target.checked;
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var key = this.getRecordKey(record, rowIndex);
      selectedRowKeys = [key];
      this.setState({
        radioIndex: key,
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelect) {
        var data = this.getCurrentPageData();
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this5.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelect(record, checked, selectedRows);
      }
    },
    handleSelectAllRow: function handleSelectAllRow(e) {
      var _this6 = this;

      var checked = e.target.checked;
      var data = this.getCurrentPageData();
      var defaultSelection = this.state.selectionDirty ? [] : this.getDefaultSelection();
      var selectedRowKeys = this.state.selectedRowKeys.concat(defaultSelection);
      var changableRowKeys = data.filter(function (item) {
        return !_this6.props.rowSelection.getCheckboxProps || !_this6.props.rowSelection.getCheckboxProps(item).disabled;
      }).map(function (item, i) {
        return _this6.getRecordKey(item, i);
      });
      if (checked) {
        changableRowKeys.forEach(function (key) {
          if (selectedRowKeys.indexOf(key) < 0) {
            selectedRowKeys.push(key);
          }
        });
      } else {
        changableRowKeys.forEach(function (key) {
          if (selectedRowKeys.indexOf(key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(key), 1);
          }
        });
      }
      this.setState({
        selectionDirty: true
      });
      this.setSelectedRowKeys(selectedRowKeys);
      if (this.props.rowSelection.onSelectAll) {
        var selectedRows = data.filter(function (row, i) {
          return selectedRowKeys.indexOf(_this6.getRecordKey(row, i)) >= 0;
        });
        this.props.rowSelection.onSelectAll(checked, selectedRows);
      }
    },
    handlePageChange: function handlePageChange(current) {
      var pagination = objectAssign({}, this.state.pagination);
      if (current) {
        pagination.current = current;
      } else {
        pagination.current = pagination.current || 1;
      }
      pagination.onChange(pagination.current);

      var newState = {
        selectionDirty: false,
        pagination: pagination
      };
      this.setState(newState);
      this.props.onChange.apply(this, this.prepareParamsArguments(objectAssign({}, this.state, newState)));
    },
    onRadioChange: function onRadioChange(ev) {
      this.setState({
        radioIndex: ev.target.value
      });
    },
    renderSelectionRadio: function renderSelectionRadio(value, record, index) {
      var rowIndex = this.getRecordKey(record, index); // 从 1 开始
      var props = {};
      if (this.props.rowSelection.getCheckboxProps) {
        props = this.props.rowSelection.getCheckboxProps.call(this, record);
      }
      var checked = undefined;
      if (this.state.selectionDirty) {
        checked = this.state.radioIndex === rowIndex;
      } else {
        checked = this.state.radioIndex === rowIndex || this.getDefaultSelection().indexOf(rowIndex) >= 0;
      }
      return React.createElement(Radio, { disabled: props.disabled,
        onChange: this.handleRadioSelect.bind(this, record, rowIndex),
        value: rowIndex, checked: checked });
    },
    renderSelectionCheckBox: function renderSelectionCheckBox(value, record, index) {
      var rowIndex = this.getRecordKey(record, index); // 从 1 开始
      var checked = undefined;
      if (this.state.selectionDirty) {
        checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0;
      } else {
        checked = this.state.selectedRowKeys.indexOf(rowIndex) >= 0 || this.getDefaultSelection().indexOf(rowIndex) >= 0;
      }
      var props = {};
      if (this.props.rowSelection.getCheckboxProps) {
        props = this.props.rowSelection.getCheckboxProps.call(this, record);
      }
      return React.createElement(Checkbox, { checked: checked, disabled: props.disabled,
        onChange: this.handleSelect.bind(this, record, rowIndex) });
    },
    getRecordKey: function getRecordKey(record, index) {
      if (this.props.rowKey) {
        return this.props.rowKey(record, index);
      }
      return record.key || index;
    },
    renderRowSelection: function renderRowSelection() {
      var _this7 = this;

      var columns = this.props.columns.concat();
      if (this.props.rowSelection) {
        var data = this.getCurrentPageData().filter(function (item) {
          if (_this7.props.rowSelection.getCheckboxProps) {
            return !_this7.props.rowSelection.getCheckboxProps(item).disabled;
          }
          return true;
        });
        var checked = undefined;
        if (!data.length) {
          checked = false;
        } else {
          checked = this.state.selectionDirty ? data.every(function (item, i) {
            return _this7.state.selectedRowKeys.indexOf(_this7.getRecordKey(item, i)) >= 0;
          }) : data.every(function (item, i) {
            return _this7.state.selectedRowKeys.indexOf(_this7.getRecordKey(item, i)) >= 0;
          }) || data.every(function (item) {
            return _this7.props.rowSelection.getCheckboxProps && _this7.props.rowSelection.getCheckboxProps(item).defaultChecked;
          });
        }
        var selectionColumn = undefined;
        if (this.props.rowSelection.type === 'radio') {
          selectionColumn = {
            key: 'selection-column',
            render: this.renderSelectionRadio,
            className: 'ant-table-selection-column'
          };
        } else {
          var checkboxAllDisabled = data.every(function (item) {
            return _this7.props.rowSelection.getCheckboxProps && _this7.props.rowSelection.getCheckboxProps(item).disabled;
          });
          var checkboxAll = React.createElement(Checkbox, { checked: checked,
            disabled: checkboxAllDisabled,
            onChange: this.handleSelectAllRow });
          selectionColumn = {
            key: 'selection-column',
            title: checkboxAll,
            render: this.renderSelectionCheckBox,
            className: 'ant-table-selection-column'
          };
        }
        if (columns[0] && columns[0].key === 'selection-column') {
          columns[0] = selectionColumn;
        } else {
          columns.unshift(selectionColumn);
        }
      }
      return columns;
    },
    getColumnKey: function getColumnKey(column, index) {
      return column.key || column.dataIndex || index;
    },
    isSortColumn: function isSortColumn(column) {
      if (!column || !this.state.sortColumn) {
        return false;
      }
      var colKey = this.getColumnKey(column);
      var isSortColumn = this.getColumnKey(this.state.sortColumn) === colKey;
      return isSortColumn;
    },
    renderColumnsDropdown: function renderColumnsDropdown(columns) {
      var _this8 = this;

      var locale = objectAssign({}, defaultLocale, this.props.locale);
      return columns.map(function (originColumn, i) {
        var column = objectAssign({}, originColumn);
        var key = _this8.getColumnKey(column, i);
        var filterDropdown = undefined;
        var sortButton = undefined;
        if (column.filters && column.filters.length > 0) {
          var colFilters = _this8.state.filters[key] || [];
          filterDropdown = React.createElement(FilterDropdown, { locale: locale, column: column,
            selectedKeys: colFilters,
            confirmFilter: _this8.handleFilter });
        }
        if (column.sorter) {
          var isSortColumn = _this8.isSortColumn(column);
          if (isSortColumn) {
            column.className = column.className || '';
            if (_this8.state.sortOrder) {
              column.className += ' ant-table-column-sort';
            }
          }

          sortButton = React.createElement(
            'div',
            { className: 'ant-table-column-sorter' },
            React.createElement(
              'span',
              { className: 'ant-table-column-sorter-up ' + (isSortColumn && _this8.state.sortOrder === 'ascend' ? 'on' : 'off'),
                title: '↑',
                onClick: _this8.toggleSortOrder.bind(_this8, 'ascend', column) },
              React.createElement(Icon, { type: 'caret-up' })
            ),
            React.createElement(
              'span',
              { className: 'ant-table-column-sorter-down ' + (isSortColumn && _this8.state.sortOrder === 'descend' ? 'on' : 'off'),
                title: '↓',
                onClick: _this8.toggleSortOrder.bind(_this8, 'descend', column) },
              React.createElement(Icon, { type: 'caret-down' })
            )
          );
        }
        column.title = React.createElement(
          'span',
          null,
          column.title,
          sortButton,
          filterDropdown
        );
        return column;
      });
    },
    handleShowSizeChange: function handleShowSizeChange(current, pageSize) {
      var pagination = this.state.pagination;
      pagination.onShowSizeChange(current, pageSize);

      var nextPagination = objectAssign(pagination, {
        pageSize: pageSize
      });
      this.setState({ pagination: nextPagination });
    },
    renderPagination: function renderPagination() {
      // 强制不需要分页
      if (!this.hasPagination()) {
        return null;
      }
      var classString = classNames({
        'ant-table-pagination': true,
        mini: this.props.size === 'middle' || this.props.size === 'small'
      });
      var total = this.state.pagination.total || this.getLocalData().length;
      var pageSize = this.state.pagination.pageSize;
      return total > 0 ? React.createElement(Pagination, _extends({}, this.state.pagination, {
        className: classString,
        onChange: this.handlePageChange,
        total: total,
        pageSize: pageSize,
        onShowSizeChange: this.handleShowSizeChange })) : null;
    },
    prepareParamsArguments: function prepareParamsArguments(state) {
      // 准备筛选、排序、分页的参数
      var pagination = state.pagination;
      var filters = state.filters;
      var sorter = {};
      if (state.sortColumn && state.sortOrder && state.sortColumn.dataIndex) {
        sorter.field = state.sortColumn.dataIndex;
        sorter.order = state.sortOrder;
      }
      return [pagination, filters, sorter];
    },
    findColumn: function findColumn(myKey) {
      var _this9 = this;

      return this.props.columns.filter(function (c) {
        return _this9.getColumnKey(c) === myKey;
      })[0];
    },
    getCurrentPageData: function getCurrentPageData(dataSource) {
      var data = this.getLocalData(dataSource);
      var current = undefined;
      var pageSize = undefined;
      var state = this.state;
      // 如果没有分页的话，默认全部展示
      if (!this.hasPagination()) {
        pageSize = Number.MAX_VALUE;
        current = 1;
      } else {
        pageSize = state.pagination.pageSize;
        current = state.pagination.current;
      }
      // 分页
      // ---
      // 当数据量少于每页数量时，直接设置数据
      // 否则进行读取分页数据
      if (data.length > pageSize || pageSize === Number.MAX_VALUE) {
        data = data.filter(function (item, i) {
          if (i >= (current - 1) * pageSize && i < current * pageSize) {
            return item;
          }
        });
      }
      return data;
    },
    getLocalData: function getLocalData(dataSource) {
      var _this10 = this;

      var state = this.state;
      var data = dataSource || this.props.dataSource;
      // 排序
      if (state.sortOrder && state.sorter) {
        data = data.sort(state.sorter);
      }
      // 筛选
      if (state.filters) {
        Object.keys(state.filters).forEach(function (columnKey) {
          var col = _this10.findColumn(columnKey);
          if (!col) {
            return;
          }
          var values = state.filters[columnKey] || [];
          if (values.length === 0) {
            return;
          }
          data = col.onFilter ? data.filter(function (record) {
            return values.some(function (v) {
              return col.onFilter(v, record);
            });
          }) : data;
        });
      }
      return data;
    },
    render: function render() {
      var _classNames;

      var data = this.getCurrentPageData();
      var columns = this.renderRowSelection();
      var expandIconAsCell = this.props.expandedRowRender && this.props.expandIconAsCell !== false;
      var locale = objectAssign({}, defaultLocale, this.props.locale);

      var classString = classNames((_classNames = {}, _defineProperty(_classNames, 'ant-table-' + this.props.size, true), _defineProperty(_classNames, 'ant-table-bordered', this.props.bordered), _defineProperty(_classNames, this.props.className, !!this.props.className), _classNames));

      columns = this.renderColumnsDropdown(columns);
      columns = columns.map(function (column, i) {
        var newColumn = objectAssign({}, column);
        newColumn.key = newColumn.key || newColumn.dataIndex || i;
        return newColumn;
      });
      var emptyText = undefined;
      var emptyClass = '';
      if (!data || data.length === 0) {
        emptyText = React.createElement(
          'div',
          { className: 'ant-table-placeholder' },
          React.createElement(Icon, { type: 'frown' }),
          locale.emptyText
        );
        emptyClass = ' ant-table-empty';
      }

      var table = React.createElement(
        'div',
        null,
        React.createElement(Table, _extends({}, this.props, {
          data: data,
          columns: columns,
          className: classString,
          expandIconAsCell: expandIconAsCell })),
        emptyText
      );
      if (this.props.loading) {
        // if there is no pagination or no data,
        // the height of spin should decrease by half of pagination
        var paginationPatchClass = this.hasPagination() && data && data.length !== 0 ? 'ant-table-with-pagination' : 'ant-table-without-pagination';
        var spinClassName = paginationPatchClass + ' ant-table-spin-holder';
        table = React.createElement(
          Spin,
          { className: spinClassName },
          table
        );
      }
      return React.createElement(
        'div',
        { className: 'clearfix' + emptyClass },
        table,
        this.renderPagination()
      );
    }
  });

  UI.Table = AntTable;
})(Smart.UI, Smart.RC);