+(function(UI,RC) {
  
  const {noop} = _,
    {GregorianCalendar,FullCalendar} = RC,
    {Select,Radio,Locale} = UI,
    {Group, Button} = Radio,
    {PropTypes, Component} = React;

  const PREFIX_CLS = 'ant-fullcalendar';


  class Header extends Component {
    getYearSelectElement(year) {
      const {yearSelectOffset, yearSelectTotal, locale, prefixCls, fullscreen} = this.props;
      const start = year - yearSelectOffset;
      const end = start + yearSelectTotal;
      const suffix = locale.year === '年' ? '年' : '';

      const options = [];
      for (let index = start; index < end; index++) {
        options.push(<Option key={`${index}`}>{index + suffix}</Option> );
      }
      return (
        <Select
          style={{ width: 75 }}
          size={ fullscreen ? null : 'small' }
          dropdownMatchSelectWidth={false}
          dropdownMenuStyle={{ minWidth: 103 }}
          className={`${prefixCls}-year-select`}
          onChange={this.onYearChange.bind(this)}
          value={String(year)}>
          { options }
        </Select>
      );
    }
    getMonthSelectElement(month) {
      const props = this.props;
      const months = props.locale.format.months;
      const {prefixCls, fullscreen} = props;
      const options = [];

      for (let index = 0; index < 12; index++) {
        options.push(<Option key={`${index}`}>{months[index]}</Option>);
      }

      return (
        <Select
          style={{ minWidth: 70 }}
          dropdownMenuStyle={{ minWidth: 125 }}
          size={ fullscreen ? null : 'small' }
          dropdownMatchSelectWidth={false}
          className={`${prefixCls}-month-select`}
          value={String(month)}
          onChange={this.onMonthChange.bind(this)}>
          { options }
        </Select>
      );
    }
    onYearChange(year) {
      const newValue = this.props.value.clone();
      newValue.setYear(parseInt(year, 10));
      this.props.onValueChange(newValue);
    }

    onMonthChange(month) {
      const newValue = this.props.value.clone();
      newValue.setMonth(parseInt(month, 10));
      this.props.onValueChange(newValue);
    }
    onTypeChange(e) {
      this.props.onTypeChange(e.target.value);
    }
    render() {
      const {type, value, prefixCls, locale} = this.props;

      const yearSelect = this.getYearSelectElement(value.getYear());

      const monthSelect = type === 'date' ? this.getMonthSelectElement(value.getMonth()) : null;

      const typeSwitch = (
        <Group onChange={this.onTypeChange.bind(this)} value={type}>
          <Button value="date">{locale.month}</Button>
          <Button value="month">{locale.year}</Button>
        </Group>
      );

      return (
        <div className={`${prefixCls}-header`}>
          { yearSelect }
          { monthSelect }
          { typeSwitch }
        </div>
      );
    }
  }

  Header.propTypes = {
    value: PropTypes.object,
    locale: PropTypes.object,
    yearSelectOffset: PropTypes.number,
    yearSelectTotal: PropTypes.number,
    onValueChange: PropTypes.func,
    onTypeChange: PropTypes.func,
    prefixCls: PropTypes.string,
    selectPrefixCls: PropTypes.string,
    type: PropTypes.string,
  };

  Header.defaultProps = {
    prefixCls: `${PREFIX_CLS}-header`,
    yearSelectOffset: 10,
    yearSelectTotal: 20,
    onValueChange: noop,
    onTypeChange: noop,
  };

  function zerofixed(v) {
	  if (v < 10) return `0${v}`;
	  return `${v}`;
  }

  class Calendar extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: this.parseDateFromValue(props.value || new Date()),
        mode: props.mode,
      };
    }
    parseDateFromValue(value) {
      const date = new GregorianCalendar(this.props.locale);
      date.setTime(+value);
      return date;
    }
    componentWillReceiveProps(nextProps) {
      if ('value' in nextProps) {
        this.setState({
          value: this.parseDateFromValue(nextProps.value)
        });
      }
    }
    monthCellRender(value, locale) {
      const prefixCls = this.props.prefixCls;
      const month = value.getMonth();
      return <div className={`${prefixCls}-month`}>
        <div className={`${prefixCls}-value`}>
          {locale.format.shortMonths[month]}
        </div>
        <div className={`${prefixCls}-content`}>
          {this.props.monthCellRender(value)}
        </div>
      </div>;
    }
    dateCellRender(value) {
      const prefixCls = this.props.prefixCls;
      return <div className={`${prefixCls}-date`}>
        <div className={`${prefixCls}-value`}>
          {zerofixed(value.getDayOfMonth())}
        </div>
        <div className={`${prefixCls}-content`}>
          {this.props.dateCellRender(value)}
        </div>
      </div>;
    }
    setValue(value) {
      if (!('value' in this.props) && this.state.value !== value) {
        this.setState({ value });
      }
      this.props.onPanelChange(value, this.state.mode);
    }
    setType(type) {
      const mode = (type === 'date') ? 'month' : 'year';
      if (this.state.mode !== mode) {
        this.setState({ mode });
        this.props.onPanelChange(this.state.value, mode);
      }
    }
    render() {
      const props = this.props;
      const {value, mode} = this.state;
      const {locale, prefixCls, style, className, fullscreen} = props;
      const type = (mode === 'year') ? 'month' : 'date';

      let cls = className || '';
      if (fullscreen) {
    	  cls += (` ${prefixCls}-fullscreen`);
      }

      return (
        <div className={cls} style={style}>
          <Header
            fullscreen={fullscreen}
            type={type}
            value={value}
            locale={locale.lang}
            prefixCls={prefixCls}
            onTypeChange={this.setType.bind(this)}
            onValueChange={this.setValue.bind(this)}/>
          <FullCalendar
            {...props}
            Select={noop}
            locale={locale.lang}
            type={type}
            prefixCls={prefixCls}
            showHeader={false}
            value={value}
            monthCellRender={this.monthCellRender.bind(this)}
            dateCellRender={this.dateCellRender.bind(this)} />
        </div>
      );
    }
  }

  Calendar.propTypes = {
    monthCellRender: PropTypes.func,
    dateCellRender: PropTypes.func,
    fullscreen: PropTypes.bool,
    locale: PropTypes.object,
    prefixCls: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onPanelChange: PropTypes.func,
    value: PropTypes.instanceOf(Date),
  };

  Calendar.defaultProps = {
    monthCellRender: noop,
    dateCellRender: noop,
    locale: Locale.Calendar,
    fullscreen: true,
    prefixCls: PREFIX_CLS,
    onPanelChange: noop,
    mode: 'month',
  };


  UI.Calendar = Calendar;
})(Smart.UI,Smart.RC);

