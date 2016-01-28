+ function(UI) {
	class Checkbox extends React.Component {
		constructor(props) {
			super(props);
			this.handleChange = this.handleChange.bind(this);
			let checked = false;
			if ('checked' in props) {
				checked = props.checked;
			} else {
				checked = props.defaultChecked;
			}
			this.state = {
				checked
			};
		}

		componentWillReceiveProps(nextProps) {
			if ('checked' in nextProps) {
				this.setState({
					checked: nextProps.checked,
				});
			}
		}

		handleChange(e) {
			const checked = e.target.checked;
			if (!('checked' in this.props)) {
				this.setState({
					checked: checked ? 1 : 0,
				});
			}
			this.props.onChange(e, this.state.checked);
		}

		render() {
			const props = this.props;
			const prefixCls = props.prefixCls;
			let checked = this.state.checked;
			if (typeof checked === 'boolean') {
				checked = checked ? 1 : 0;
			}
			const className = classNames({
				[props.className]: !!props.className, [prefixCls]: 1, [`${prefixCls}-checked`]: checked, [`${prefixCls}-checked-${checked}`]: !!checked, [`${prefixCls}-disabled`]: props.disabled,
			});
			return (
				<span className={className}
            style={props.style}>
          <span className={`${prefixCls}-inner`}></span>
          <input {...props}
            defaultChecked={!!props.defaultChecked}
            className={`${prefixCls}-input`}
            checked={!!checked}
            onChange={this.handleChange}
          />
        </span>
			);
		}
	}

	Checkbox.propTypes = {
		prefixCls: React.PropTypes.string,
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		className: React.PropTypes.string,
		defaultChecked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		checked: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.bool]),
		onChange: React.PropTypes.func,
	};

	Checkbox.defaultProps = {
		prefixCls: 'ant-checkbox',
		style: {},
		type: 'checkbox',
		className: '',
		defaultChecked: 0,
		onChange: () => {},
	};



	let Group = React.createClass({
		getDefaultProps() {
				return {
					options: [],
					onChange() {},
				};
			},
			propTypes: {
				defaultValue: React.PropTypes.array,
				value: React.PropTypes.array,
				options: React.PropTypes.array.isRequired,
				onChange: React.PropTypes.func,
			},
			getInitialState() {
				const {
					value, defaultValue
				} = this.props;
				return {
					value: value || defaultValue || [],
				};
			},
			componentWillReceiveProps(nextProps) {
				if ('value' in nextProps) {
					this.setState({
						value: nextProps.value,
					});
				}
			},
			toggleOption(option) {
				const optionIndex = this.state.value.indexOf(option);
				const value = this.state.value;
				if (optionIndex === -1) {
					value.push(option);
				} else {
					value.splice(optionIndex, 1);
				}
				if (!('value' in this.props)) {
					this.setState({
						value
					});
				}
				this.props.onChange(value);
			},
			render() {
				const options = this.props.options;
				return <div className="ant-checkbox-group">
			      {
			        options.map(option =>
			          <label className="ant-checkbox-group-item" key={option}>
			            <Checkbox disabled={this.props.disabled}
			            checked={this.state.value.indexOf(option) !== -1}
			            onChange={this.toggleOption.bind(this, option)} />
			            {option}
			          </label>
			        )
			      }
			    </div>;
			},
	});
	
	Checkbox.Group = Group
	UI.Checkbox = Checkbox;
}(Smart.UI);