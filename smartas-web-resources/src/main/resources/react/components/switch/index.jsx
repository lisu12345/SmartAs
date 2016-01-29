+ function(UI) {
  const noop = _.noop;

  const Switch = React.createClass({
    propTypes: {
      className: React.PropTypes.string,
      prefixCls: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      style: React.PropTypes.object,
      checkedChildren: React.PropTypes.any,
      unCheckedChildren: React.PropTypes.any,
      onChange: React.PropTypes.func,
    },
    getDefaultProps() {
      return {
        prefixCls: 'rc-switch',
        style: {},
        checkedChildren: null,
        unCheckedChildren: null,
        className: '',
        defaultChecked: false,
        onChange: noop,
      };
    },
    getInitialState() {
      const props = this.props;
      let checked = false;
      if ('checked' in props) {
        checked = !!props.checked;
      } else {
        checked = !!props.defaultChecked;
      }
      return {
        checked: checked,
      };
    },
    componentWillReceiveProps(nextProps) {
      if ('checked' in nextProps) {
        this.setState({
          checked: !!nextProps.checked,
        });
      }
    },
    toggle() {
      const checked = !this.state.checked;
      this.setState({
        checked: checked,
      });
      this.props.onChange(checked);
    },
    render() {
      const {
        className, prefixCls, disabled, style,
        checkedChildren, unCheckedChildren
      } = this.props;
      const checked = this.state.checked;
      const switchClassName = classNames({
        [className]: !!className, [prefixCls]: true, [`${prefixCls}-checked`]: checked, [`${prefixCls}-disabled`]: disabled,
      });
      return (<span className={switchClassName}
                  onClick={disabled ? noop : this.toggle}
                  style={style}>
              <span className={`${prefixCls}-inner`}>
                {checked ? checkedChildren : unCheckedChildren}
              </span>
            </span>);
    },
  });

  const AntSwitch = React.createClass({
    getDefaultProps() {
        return {
          prefixCls: 'ant-switch',
          size: 'default',
        };
      },
      render() {
        const {
          prefixCls, size, className
        } = this.props;
        const cls = classNames({
          [className]: !!className, [prefixCls + '-' + size]: true,
        });
        return <Switch className={cls} {...this.props} />;
      }
  });


  UI.Switch = AntSwitch;
}(Smart.UI)