+ function(UI, RC) {
  const {isCssAnimationSupported} = RC.cssAnimation;

  const AntSpin = React.createClass({
    getDefaultProps() {
      return {
        prefixCls: 'ant-spin',
        spining: true
      };
    },

    propTypes: {
      className: React.PropTypes.string,
      size: React.PropTypes.oneOf(['small', 'default', 'large'])
    },

    isNestedPattern() {
      return !!(this.props && this.props.children);
    },

    render() {
      const { className, size, prefixCls } = this.props;

      let spinClassName = classNames({
        [prefixCls]: true,
        [`${prefixCls}-sm`]: size === 'small',
        [`${prefixCls}-lg`]: size === 'large',
        [className]: !!className,
        [`${prefixCls}-spining`]: this.props.spining,
      });

      let spinElement;
      if (!isCssAnimationSupported) {
        // not support for animation, just use text instead
        spinElement = <div className={spinClassName}>加载中...</div>;
      } else {
        spinElement = (
          <div className={spinClassName}>
            <span className={`${prefixCls}-dot ${prefixCls}-dot-first`} />
            <span className={`${prefixCls}-dot ${prefixCls}-dot-second`} />
            <span className={`${prefixCls}-dot ${prefixCls}-dot-third`} />
          </div>
        );
      }

      if (this.isNestedPattern()) {
        return (
          <div className={this.props.spining ? (`${prefixCls}-nested-loading`) : ''}>
            {spinElement}
            <div className={`${prefixCls}-container`}>
              {this.props.children}
            </div>
          </div>
        );
      } 
      return spinElement;
    }
  });
  UI.Spin = AntSpin;
}(Smart.UI,Smart.RC)

