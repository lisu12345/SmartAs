
+function(UI){

const Col = React.createClass({
  propTypes: {
    span: React.PropTypes.string,
    order: React.PropTypes.string,
    offset: React.PropTypes.string,
    push: React.PropTypes.string,
    pull: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  },
  render() {
    const {span, order, offset, push, pull, className, ...others} = this.props;
    const classes = classNames({
    	[`col-${span}`]: span,
        [`col-order-${order}`]: order,
        [`col-offset-${offset}`]: offset,
        [`col-push-${push}`]: push,
        [`col-pull-${pull}`]: pull,
        [className]: className,
    });
    return <div {...others} className={classes}>{this.props.children}</div>;
  },
});


const Row = React.createClass({
  propTypes: {
    type: React.PropTypes.string,
    align: React.PropTypes.string,
    justify: React.PropTypes.string,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
  },
  render() {
    const { type, justify, align, className, ...others } = this.props;
    const classes = classNames({
      row: true,
      [`row-${type}`]: type,
      [`row-${type}-${justify}`]: justify,
      [`row-${type}-${align}`]: align,
      [className]: className,
    });
    return <div {...others} className={classes}>{this.props.children}</div>;
  },
});

UI.Row = Row;
UI.Col = Col;
}(Smart.UI);