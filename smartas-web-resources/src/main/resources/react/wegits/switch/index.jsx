+ function(UI,RC) {
  const {Switch} = RC;

  
  const AntSwitch = React.createClass({
    getDefaultProps() {
      return {
        prefixCls: 'ant-switch',
        size: 'default',
      };
    },
    render() {
      const { prefixCls, size, className } = this.props;
      const cls = classNames({
        [className]: !!className,
        [prefixCls + '-' + size]: true,
      });
      return <Switch className={cls} {...this.props} />;
    }
  });

  UI.Switch = AntSwitch;
}(Smart.UI,Smart.RC)