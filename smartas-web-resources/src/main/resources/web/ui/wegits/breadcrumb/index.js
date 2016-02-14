'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

+(function (UI) {
  var BreadcrumbItem = React.createClass({
    displayName: 'BreadcrumbItem',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-breadcrumb',
        separator: '/'
      };
    },

    propTypes: {
      prefixCls: React.PropTypes.string,
      separator: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
      href: React.PropTypes.string
    },
    render: function render() {
      var _props = this.props;
      var prefixCls = _props.prefixCls;
      var separator = _props.separator;
      var children = _props.children;

      var link = React.createElement(
        'a',
        _extends({ className: prefixCls + '-link' }, this.props),
        children
      );
      if (typeof this.props.href === 'undefined') {
        link = React.createElement(
          'span',
          _extends({ className: prefixCls + '-link' }, this.props),
          children
        );
      }
      return React.createElement(
        'span',
        null,
        link,
        React.createElement(
          'span',
          { className: prefixCls + '-separator' },
          separator
        )
      );
    }
  });

  var Breadcrumb = React.createClass({
    displayName: 'Breadcrumb',
    getDefaultProps: function getDefaultProps() {
      return {
        prefixCls: 'ant-breadcrumb',
        separator: '/'
      };
    },

    propTypes: {
      prefixCls: React.PropTypes.string,
      separator: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.element]),
      paths: React.PropTypes.array,
      params: React.PropTypes.object
    },
    render: function render() {
      var crumbs = undefined;
      var _props2 = this.props;
      var separator = _props2.separator;
      var prefixCls = _props2.prefixCls;
      var paths = _props2.paths;
      var params = _props2.params;
      var children = _props2.children;

      if (paths && paths.length > 0) {
        crumbs = paths.map(function (name, i) {
          return React.createElement(
            BreadcrumbItem,
            { separator: separator, key: name },
            name
          );
        });
      } else {
        crumbs = React.Children.map(children, function (element, index) {
          return React.cloneElement(element, {
            separator: separator,
            key: index
          });
        });
      }
      return React.createElement(
        'div',
        { className: prefixCls },
        crumbs
      );
    }
  });

  Breadcrumb.Item = BreadcrumbItem;
  UI.Breadcrumb = Breadcrumb;
})(Smart.UI);