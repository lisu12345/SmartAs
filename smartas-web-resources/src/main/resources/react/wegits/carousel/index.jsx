+(function(UI,RC) {
  const Carousel = Slider,
    {assign} = _;

  const AntCarousel = React.createClass({
    getDefaultProps() {
      return {
        dots: true,
        arrows: false
      };
    },
    render() {
      let props = assign({}, this.props);

      if (props.effect === 'fade') {
        props.fade = true;
        props.draggable = false;
      }

      let className = 'ant-carousel';
      if (props.vertical) {
        className = className + ' ant-carousel-vertical';
      }

      return (
        <div className={className}>
          <Carousel {...props} />
        </div>
      );
    }
  });

  UI.Carousel = AntCarousel;

})(Smart.UI,Smart.RC);


