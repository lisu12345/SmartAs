+(function(UI) {
	const Radio = React.createClass({
		getDefaultProps() {
				return {
					prefixCls: 'ant-radio',
					type: 'radio'
				};
			},
			render() {
				let classString = this.props.className;
				if (classString) {
					classString += this.props.checked ? (' ' + classString + '-checked') : '';
				}
				if (this.props.disabled) {
					classString += ' ' + this.props.className + '-disabled';
				}
				return (
					<label className={classString}>
        				<UI.Checkbox {...this.props} children={null} ></UI.Checkbox>
        				{this.props.children}
      				</label>
				);
			}
	});

	const RadioButton = React.createClass({
		getDefaultProps() {
				return {
					className: 'ant-radio-button'
				};
			},
			render() {
				return <Radio {...this.props}/>;
			}
	});


	function getCheckedValue(children) {
		let checkedValue = null;
		React.Children.forEach(children, function(radio) {
			if (radio.props && radio.props.checked) {
				checkedValue = radio.props.value;
			}
		});
		return checkedValue;
	}

	const Group = React.createClass({
		getDefaultProps: function() {
			return {
				prefixCls: 'ant-radio-group',
				disabled: false,
				size: 'default',
				onChange: function() {}
			};
		},
		getInitialState: function() {
			let props = this.props;
			return {
				value: props.value || props.defaultValue || getCheckedValue(props.children)
			};
		},
		componentWillReceiveProps(nextProps) {
			if ('value' in nextProps || getCheckedValue(nextProps.children)) {
				this.setState({
					value: nextProps.value || getCheckedValue(nextProps.children)
				});
			}
		},
		render: function() {
			let props = this.props;
			let children = React.Children.map(props.children, (radio) => {
				if (radio.props) {
					return <Radio
					key = {radio.props.value} {...radio.props}
					onChange = {
						this.onRadioChange
					}
					checked = {
						this.state.value === radio.props.value
					}
					disabled = {
						radio.props.disabled || this.props.disabled
					}
					/>;
				}
				return radio;
			});
			let className = classNames(props.prefixCls,props.prefixCls + '-' + props.size)
			return (
				<div className={className}>
        			{children}
      			</div>
			);
		},
		onRadioChange: function(ev) {
			this.setState({
				value: ev.target.value
			});
			this.props.onChange(ev);
		}
	});

	Radio.Button = RadioButton;
	Radio.Group = Group;
	UI.Radio = Radio;
})(Smart.UI);