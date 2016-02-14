// export this package's api
+ function(RC) {
	const {Trigger,arrayTreeFilter} = RC,
		{findDOMNode} = ReactDOM;
	
	class Menus extends React.Component {
	  constructor(props) {
	    super();
	    const { value, defaultValue } = props;
	    const initialValue = value || defaultValue || [];
	    this.state = {
	      activeValue: initialValue,
	      value: initialValue,
	    };
	  }

	  componentDidMount() {
	    this.scrollActiveItemToView();
	  }

	  componentWillReceiveProps(nextProps) {
	    if ('value' in nextProps) {
	      this.setState({
	        value: nextProps.value || [],
	      });
	    }
	    // sync activeValue with value when panel open
	    if (nextProps.visible && !this.props.visible) {
	      this.setState({
	        activeValue: this.state.value,
	      });
	    }
	  }

	  componentDidUpdate(prevProps) {
	    if (!prevProps.visible && this.props.visible) {
	      this.scrollActiveItemToView();
	    }
	  }

	  onSelect(targetOption, menuIndex) {
	    if (!targetOption || targetOption.disabled) {
	      return;
	    }
	    let activeValue = this.state.activeValue;
	    activeValue = activeValue.slice(0, menuIndex + 1);
	    activeValue[menuIndex] = targetOption.value;
	    const activeOptions = this.getActiveOptions(activeValue);
	    if (targetOption.isLeaf === false && !targetOption.children && this.props.loadData) {
	      this.setState({ activeValue });
	      this.props.loadData(activeOptions);
	      return;
	    }
	    if (!targetOption.children || !targetOption.children.length) {
	      this.props.onChange(activeOptions, { visible: false });
	      // set value to activeValue when select leaf option
	      this.setState({ value: activeValue });
	    } else if (this.props.changeOnSelect) {
	      this.props.onChange(activeOptions, { visible: true });
	      // set value to activeValue on every select
	      this.setState({ value: activeValue });
	    }
	    this.setState({ activeValue });
	  }

	  getOption(option, menuIndex) {
	    const { prefixCls, expandTrigger } = this.props;
	    const onSelect = this.onSelect.bind(this, option, menuIndex);
	    let expandProps = {
	      onClick: onSelect,
	    };
	    let menuItemCls = `${prefixCls}-menu-item`;
	    if (expandTrigger === 'hover' &&
	      option.children &&
	      option.children.length > 0) {
	      expandProps = {
	        onMouseEnter: onSelect,
	      };
	      menuItemCls += ` ${prefixCls}-menu-item-expand`;
	    }
	    if (this.isActiveOption(option)) {
	      menuItemCls += ` ${prefixCls}-menu-item-active`;
	      expandProps.ref = 'activeItem' + menuIndex;
	    }
	    if (option.disabled) {
	      menuItemCls += ` ${prefixCls}-menu-item-disabled`;
	    }
	    return (
	      <li key={option.value}
	          className={menuItemCls}
	          title={option.label}
	        {...expandProps}>
	        {option.label}
	      </li>
	    );
	  }

	  getActiveOptions(values) {
	    const activeValue = values || this.state.activeValue;
	    const options = this.props.options;
	    return arrayTreeFilter(options, (o, level) => o.value === activeValue[level]);
	  }

	  getShowOptions() {
	    const { options } = this.props;
	    const result = this.getActiveOptions()
	      .map(activeOption => activeOption.children)
	      .filter(activeOption => !!activeOption);
	    result.unshift(options);
	    return result;
	  }

	  scrollActiveItemToView() {
	    // scroll into view
	    const optionsLength = this.getShowOptions().length;
	    for (let i = 0; i < optionsLength; i++) {
	      const itemComponent = this.refs['activeItem' + i];
	      if (itemComponent) {
	        const target = findDOMNode(itemComponent);
	        target.parentNode.scrollTop = target.offsetTop;
	      }
	    }
	  }

	  isActiveOption(option) {
	    return this.state.activeValue.some(value => value === option.value);
	  }

	  render() {
	    const { prefixCls } = this.props;
	    return (
	      <div>
	        {this.getShowOptions().map((options, menuIndex) =>
	          <ul className={`${prefixCls}-menu`} key={menuIndex}>
	            {options.map(option => this.getOption(option, menuIndex))}
	          </ul>
	        )}
	      </div>
	    );
	  }
	}

	Menus.defaultProps = {
	  options: [],
	  onChange() {
	  },
	  onSelect() {
	  },
	  prefixCls: 'rc-cascader-menus',
	  visible: false,
	  expandTrigger: 'click',
	  changeOnSelect: false,
	};

	Menus.propTypes = {
	  options: React.PropTypes.array.isRequired,
	  prefixCls: React.PropTypes.string,
	  expandTrigger: React.PropTypes.string,
	  onChange: React.PropTypes.func,
	  loadData: React.PropTypes.func,
	  visible: React.PropTypes.bool,
	  changeOnSelect: React.PropTypes.bool,
	};



	const BUILT_IN_PLACEMENTS = {
	  bottomLeft: {
	    points: ['tl', 'bl'],
	    offset: [0, 4],
	    overflow: {
	      adjustX: 0,
	      adjustY: 1,
	    },
	  },
	  topLeft: {
	    points: ['bl', 'tl'],
	    offset: [0, -4],
	    overflow: {
	      adjustX: 0,
	      adjustY: 1,
	    },
	  },
	};

	class Cascader extends React.Component {
	  constructor(props) {
	    super();
	    this.state = {
	      popupVisible: props.popupVisible,
	    };
	    [
	      'handleChange',
	      'handlePopupVisibleChange',
	      'setPopupVisible',
	      'getPopupDOMNode',
	    ].forEach(method => this[method] = this[method].bind(this));
	  }
	  componentWillReceiveProps(nextProps) {
	    if ('popupVisible' in nextProps) {
	      this.setState({
	        popupVisible: nextProps.popupVisible,
	      });
	    }
	  }
	  getPopupDOMNode() {
	    return this.refs.trigger.getPopupDomNode();
	  }
	  setPopupVisible(popupVisible) {
	    if (!('popupVisible' in this.props)) {
	      this.setState({ popupVisible });
	    }
	    this.props.onPopupVisibleChange(popupVisible);
	  }
	  handleChange(options, setProps) {
	    this.props.onChange(
	      options.map(o => o.value),
	      options
	    );
	    this.setPopupVisible(setProps.visible);
	  }
	  handlePopupVisibleChange(popupVisible) {
	    this.setPopupVisible(popupVisible);
	  }
	  render() {
	    const props = this.props;
	    const { prefixCls, transitionName, popupClassName } = props;
	    // Did not show popup when there is no options
	    let menus = <div />;
	    let emptyMenuClassName = '';
	    if (props.options && props.options.length > 0) {
	      menus = (
	        <Menus
	          {...props}
	          onChange={this.handleChange}
	          onSelect={this.props.onSelect}
	          visible={this.state.popupVisible} />
	      );
	    } else {
	      emptyMenuClassName = ` ${prefixCls}-menus-empty`;
	    }
	    return (
	      <Trigger ref="trigger"
	        popupPlacement="bottomLeft"
	        builtinPlacements={BUILT_IN_PLACEMENTS}
	        popupTransitionName={transitionName}
	        action={props.disabled ? [] : ['click']}
	        popupVisible={props.disabled ? false : this.state.popupVisible}
	        onPopupVisibleChange={this.handlePopupVisibleChange}
	        prefixCls={`${prefixCls}-menus`}
	        popupClassName={popupClassName + emptyMenuClassName}
	        popup={menus}>
	        {props.children}
	      </Trigger>
	    );
	  }
	}

	Cascader.defaultProps = {
	  options: [],
	  onChange() {},
	  onSelect() {},
	  onPopupVisibleChange() {},
	  disabled: false,
	  transitionName: '',
	  prefixCls: 'rc-cascader',
	  popupClassName: '',
	};

	Cascader.propTypes = {
	  options: React.PropTypes.array.isRequired,
	  onChange: React.PropTypes.func,
	  onSelect: React.PropTypes.func,
	  onPopupVisibleChange: React.PropTypes.func,
	  popupVisible: React.PropTypes.bool,
	  disabled: React.PropTypes.bool,
	  transitionName: React.PropTypes.string,
	  popupClassName: React.PropTypes.string,
	  prefixCls: React.PropTypes.string,
	};
	
	RC.Cascader = Cascader;
}(Smart.RC)
