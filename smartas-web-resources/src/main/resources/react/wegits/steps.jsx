+ function(UI,RC) {
  const {Steps} = RC;

  const AntSteps = React.createClass({
    getDefaultProps() {
      return {
        prefixCls: 'ant-steps',
        iconPrefix: 'ant',
        size: 'default',
        maxDescriptionWidth: 100,
        current: 0
      };
    },
    render() {
      let maxDescriptionWidth = this.props.maxDescriptionWidth;
      if (this.props.direction === 'vertical') {
        maxDescriptionWidth = 'auto';
      }
      return (
        <Steps size={this.props.size}
               current={this.props.current}
               direction={this.props.direction}
               iconPrefix={this.props.iconPrefix}
               maxDescriptionWidth={maxDescriptionWidth}
               prefixCls={this.props.prefixCls}>
          {this.props.children}
        </Steps>
      );
    }
  });

  AntSteps.Step = Steps.Step;

  UI.Steps = AntSteps;
}(Smart.UI,Smart.RC)
