'use strict';

+function (UI, RC) {
  var Steps = RC.Steps;


  var AntSteps = React.createClass({
    displayName: 'AntSteps',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-steps',
        iconPrefix: 'ant',
        size: 'default',
        maxDescriptionWidth: 100,
        current: 0
      };
    },
    render: function render() {
      var maxDescriptionWidth = this.props.maxDescriptionWidth;
      if (this.props.direction === 'vertical') {
        maxDescriptionWidth = 'auto';
      }
      return React.createElement(
        Steps,
        { size: this.props.size,
          current: this.props.current,
          direction: this.props.direction,
          iconPrefix: this.props.iconPrefix,
          maxDescriptionWidth: maxDescriptionWidth,
          prefixCls: this.props.prefixCls },
        this.props.children
      );
    }
  });

  AntSteps.Step = Steps.Step;

  UI.Steps = AntSteps;
}(Smart.UI, Smart.RC);