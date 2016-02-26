//export default Form;
+ function(UI,RC) {

	const {createDOMForm} = RC;

	const ValueMixin = {
		setValue(field, e) {
			let v = e;
			const target = e && e.target;
			if (target) {
				if ((`${target.nodeName}`).toLowerCase() === 'input' &&
					target.type === 'checkbox') {
					v = target.checked;
				} else {
					v = e.target.value;
				}
			}
			const newFormData = {};
			newFormData[field] = v;
			this.setState({
				formData: {
		        ...this.state.formData,
		        ...newFormData,
		      },
			});
		},
	};


	function prefixClsFn(prefixCls, ...args) {
		return args.map((s) => {
			return `${prefixCls}-${s}`;
		}).join(' ');
	}

	class FormItem extends React.Component {
		_getLayoutClass(colDef) {
			if (!colDef) {
				return '';
			}
			const {
				span, offset
			} = colDef;
			const col = span ? `col-${span}` : '';
		    const offsetCol = offset ? ` col-offset-${offset}` : '';
			return col + offsetCol;
		}
		
		  getHelpMsg() {
		    const context = this.context;
		    const props = this.props;
		    if (props.help === undefined && context.form) {
		      return (context.form.getFieldError(this.getId()) || []).join(', ');
		    }

		    return props.help;
		  }

		  getId() {
		    return this.props.children.props && this.props.children.props.id;
		  }

		  getMeta() {
		    return this.props.children.props && this.props.children.props.__meta;
		  }

		renderHelp() {
			const props = this.props;
		    const prefixCls = props.prefixCls;
		    const help = this.getHelpMsg();
		    return (
		      <div className={!!help ? prefixClsFn(prefixCls, 'explain') : ''} key="help">
		        { help }
		      </div>
		    );
		}
		
		getValidateStatus() {
		    const { isFieldValidating, getFieldError, getFieldValue } = this.context.form;
		    const field = this.getId();

		    if (isFieldValidating(field)) {
		      return 'validating';
		    } else if (!!getFieldError(field)) {
		      return 'error';
		    } else if (getFieldValue(field) !== undefined) {
		      return 'success';
		    }

		    return '';
		}

		renderValidateWrapper(c1, c2, c3) {
		    let classes = '';
		    const form = this.context.form;
		    const props = this.props;
		    const validateStatus = (props.validateStatus === undefined && form) ?
		      this.getValidateStatus() :
		      props.validateStatus;

		    if (validateStatus) {
		      classes = classNames(
		        {
		          'has-feedback': props.hasFeedback,
		          'has-success': validateStatus === 'success',
		          'has-warning': validateStatus === 'warning',
		          'has-error': validateStatus === 'error',
		          'is-validating': validateStatus === 'validating',
		        }
		      );
		    }
		    return (
		      <div className={`${this.props.prefixCls}-item-control ${classes}`}>
		        {c1}{c2}{c3}
		      </div>
		    );
		}

		renderWrapper(children) {
		    const wrapperCol = this.props.wrapperCol;
		    return (
		      <div className={this._getLayoutClass(wrapperCol)} key="wrapper">
		        {children}
		      </div>
		    );
		}

		isRequired() {
		    if (this.context.form) {
		      const meta = this.getMeta() || {};
		      const validate = (meta.validate || []);

		      return validate.filter((item) => !!item.rules).some((item) => {
		        return item.rules.some((rule) => rule.required);
		      });
		    }
		    return false;
		  }

		  renderLabel() {
		    const props = this.props;
		    const labelCol = props.labelCol;
		    const required = props.required === undefined ? this.isRequired() : props.required;

		      const className = classNames({
			      [this._getLayoutClass(labelCol)]: true,
			      [`${props.prefixCls}-item-required`]: required,
			    });

		    return props.label ? (
		      <label htmlFor={props.id || this.getId()} className={className} required={required} key="label">
		        {props.label}
		      </label>
		    ) : null;
		 }

		  renderChildren() {
			    const props = this.props;
			    const children = React.Children.map(props.children, (child) => {
			      if (typeof child.type === 'function' && !child.props.size) {
			        return React.cloneElement(child, { size: 'large' });
			      }

			      return child;
			    });
			    return [
			      this.renderLabel(),
			      this.renderWrapper(
			        this.renderValidateWrapper(
			          children,
			          this.renderHelp(),
			          props.extra
			        )
			      ),
			    ];
		 }
 

		  renderFormItem(children) {
			    const props = this.props;
			    const prefixCls = props.prefixCls;
			    const itemClassName = {
			      [`${prefixCls}-item`]: true,
			      [`${prefixCls}-item-with-help`]: !!this.getHelpMsg(),
			      [`${props.className}`]: !!props.className,
			    };

			    return (
			      <div className={classNames(itemClassName)}>
			        {children}
			      </div>
			    );
			  }

		render() {
			const children = this.renderChildren();
			return this.renderFormItem(children);
		}
	}

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
		  children: React.PropTypes.node,
	};

	FormItem.defaultProps = {
	  hasFeedback: false,
	  prefixCls: 'ant-form',
	};

	FormItem.contextTypes = {
	  form: React.PropTypes.object,
	};

	class Form extends React.Component {
		getChildContext() {
			    return {
			      form: this.props.form,
			    };
		}
		
		render() {
			const {
				prefixCls, className
			} = this.props;
			const formClassName = classNames({
				[className]: !!className, [`${prefixCls}-horizontal`]: this.props.horizontal, [`${prefixCls}-inline`]: this.props.inline,
			});

			return (<form {...this.props
				}
				className = {
					formClassName
				}>{
					this.props.children
				}</form>
			);
		}
	}

	Form.propTypes = {
		prefixCls: React.PropTypes.string,
		horizontal: React.PropTypes.bool,
		inline: React.PropTypes.bool,
		form: React.PropTypes.object,
		children: React.PropTypes.any,
		onSubmit: React.PropTypes.func,
	};

	Form.defaultProps = {
		prefixCls: 'ant-form',
	};
	
	Form.childContextTypes = {
	  form: React.PropTypes.object,
	};

	Form.create = (o = {}) => {
	  const options = {
	    ...o,
	    fieldNameProp: 'id',
	    fieldMetaProp: '__meta',
	  };

	  return createDOMForm(options);
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
}(Smart.UI,Smart.RC)