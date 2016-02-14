+function(UI,RC) {
  const {Pagination,Locale} = RC,
    {Select} = UI;


  class MiniSelect extends React.Component {
    render() {
      return <Select size="small" {...this.props} />;
    }
  }

  MiniSelect.Option = Select.Option;

  class AntPagination extends React.Component {
    render() {
      let className = this.props.className;
      let selectComponentClass = Select;

      if (this.props.size === 'small') {
        className += ' mini';
        selectComponentClass = MiniSelect;
      }

      return (
        <Pagination selectComponentClass={selectComponentClass}
          selectPrefixCls="ant-select"
          {...this.props}
          className={className} />
      );
    }
  }

  AntPagination.defaultProps = {
    locale: Locale.Pagination,
    className: '',
    prefixCls: 'ant-pagination',
  };  

  UI.Pagination = AntPagination;
}(Smart.UI,Smart.RC);