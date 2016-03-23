'use strict';

+function (UI, RC) {
  var Carousel = Slider;
  var _ref = _;
  var assign = _ref.assign;


  var AntCarousel = React.createClass({
    displayName: 'AntCarousel',
    getDefaultProps: function getDefaultProps() {
      return {
        dots: true,
        arrows: false
      };
    },
    render: function render() {
      var props = assign({}, this.props);

      if (props.effect === 'fade') {
        props.fade = true;
        props.draggable = false;
      }

      var className = 'ant-carousel';
      if (props.vertical) {
        className = className + ' ant-carousel-vertical';
      }

      return React.createElement(
        'div',
        { className: className },
        React.createElement(Carousel, props)
      );
    }
  });

  UI.Carousel = AntCarousel;
}(Smart.UI, Smart.RC);