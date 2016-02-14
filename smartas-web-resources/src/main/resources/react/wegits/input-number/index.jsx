+ function(UI,RC) {
  const {InputNumber,classNames} = RC,
    {noop} = _;

  const AntInputNumber = React.createClass({
    getDefaultProps() {
      return {
        prefixCls: 'ant-input-number',
        step: 1,
      };
    },
    render() {
      const { className, size, ...other } = this.props;
      const inputNumberClass = classNames({
        'ant-input-number-lg': size === 'large',
        'ant-input-number-sm': size === 'small',
        [className]: !!className,
      });

      return <InputNumber className={inputNumberClass} {...other} />;
    }
  });

  UI.InputNumber = AntInputNumber;
}(Smart.UI,Smart.RC)