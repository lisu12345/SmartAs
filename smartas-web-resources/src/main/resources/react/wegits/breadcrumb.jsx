+ function(UI) {
  const BreadcrumbItem = React.createClass({
    getDefaultProps() {
        return {
          prefixCls: 'ant-breadcrumb',
          separator: '/',
        };
      },
      propTypes: {
        prefixCls: React.PropTypes.string,
        separator: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.element,
        ]),
        href: React.PropTypes.string,
      },
      render() {
        const {
          prefixCls, separator, children
        } = this.props;
        let link = <a className={prefixCls + '-link'} {...this.props}>{children}</a>;
        if (typeof this.props.href === 'undefined') {
          link = <span className={prefixCls + '-link'} {...this.props}>{children}</span>;
        }
        return <span>
          {link}
          <span className={prefixCls + '-separator'}>{separator}</span>
         </span>;
      }
  });

  const Breadcrumb = React.createClass({
    getDefaultProps() {
        return {
          prefixCls: 'ant-breadcrumb',
          separator: '/',
        };
      },
      propTypes: {
        prefixCls: React.PropTypes.string,
        separator: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.element,
        ]),
        paths: React.PropTypes.array,
        params: React.PropTypes.object
      },
      render() {
        let crumbs;
        const {
          separator, prefixCls, paths, params, children
        } = this.props;
        if (paths && paths.length > 0) {
          crumbs = paths.map(function(name, i) {
            return <BreadcrumbItem separator={separator} key={name}>{name}</BreadcrumbItem>;
          });
        } else {
          crumbs = React.Children.map(children, (element, index) => {
            return React.cloneElement(element, {
              separator,
              key: index,
            });
          });
        }
        return (
          <div className={prefixCls}>
            {crumbs}
          </div>
        );
      }
  });

  Breadcrumb.Item = BreadcrumbItem;
  UI.Breadcrumb = Breadcrumb;
}(Smart.UI)