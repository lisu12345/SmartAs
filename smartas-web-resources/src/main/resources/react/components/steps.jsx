+ function(RC) {
	const {classNames} = RC;

	const Step = React.createClass({
	  propTypes: {
	    className: React.PropTypes.string,
	    prefixCls: React.PropTypes.string,
	    style: React.PropTypes.object,
	    tailWidth: React.PropTypes.oneOfType([
	      React.PropTypes.number,
	      React.PropTypes.string,
	    ]),
	    status: React.PropTypes.string,
	    iconPrefix: React.PropTypes.string,
	    icon: React.PropTypes.string,
	    //maxDescriptionWidth: React.PropTypes.number,
	    maxDescriptionWidth: React.PropTypes.oneOfType([
	      React.PropTypes.number,
	      React.PropTypes.string,
	    ]),
	    stepLast: React.PropTypes.bool,
	    stepNumber: React.PropTypes.string,
	    description: React.PropTypes.any,
	    title: React.PropTypes.any,
	  },
	  render() {
	    const {
	      className, prefixCls, style, tailWidth,
	      status = 'wait', iconPrefix, icon,
	      maxDescriptionWidth, stepLast, stepNumber,
	      description, title, ...restProps } = this.props;
	    const iconClassName = classNames({
	      [prefixCls + '-icon']: true,
	      [iconPrefix + 'icon']: true,
	      [iconPrefix + 'icon-' + (icon || 'check')]: true,
	    });
	    const iconNode = (icon || status === 'finish')
	      ? <span className={iconClassName} />
	      : <span className={prefixCls + '-icon'}>{stepNumber}</span>;
	    const classString = classNames({
	      [className]: !!className,
	      [prefixCls + '-item']: true,
	      [prefixCls + '-item-last']: stepLast,
	      [prefixCls + '-status-' + status]: true,
	      [prefixCls + '-custom']: icon,
	    });
	    return (
	      <div {...restProps} className={classString} style={{width: tailWidth}}>
	        {stepLast ? '' : <div className={prefixCls + '-tail'}><i /></div>}
	        <div className={prefixCls + '-head'}>
	          <div className={prefixCls + '-head-inner'}>{iconNode}</div>
	        </div>
	        <div className={prefixCls + '-main'} style={{maxWidth: maxDescriptionWidth}}>
	          <div className={prefixCls + '-title'}>{title}</div>
	          {description ? <div className={prefixCls + '-description'}>{description}</div> : ''}
	        </div>
	      </div>
	    );
	  },
	});

	const Steps = React.createClass({
	  propTypes: {
	    direction: React.PropTypes.string,
	    children: React.PropTypes.any,
	  },
	  getDefaultProps() {
	    return {
	      prefixCls: 'rc-steps',
	      iconPrefix: 'rc',
	      maxDescriptionWidth: 120,
	      direction: '',
	      current: 0,
	    };
	  },
	  getInitialState() {
	    return {
	      init: false,
	      tailWidth: 0,
	    };
	  },
	  componentDidMount() {
	    if (this.props.direction === 'vertical') {
	      return;
	    }
	    const $dom = ReactDOM.findDOMNode(this);
	    const len = $dom.children.length - 1;
	    this._itemsWidth = new Array(len + 1);

	    let i;
	    for (i = 0; i <= len - 1; i++) {
	      const $item = $dom.children[i].children;
	      this._itemsWidth[i] = Math.ceil($item[0].offsetWidth + $item[1].children[0].offsetWidth);
	    }
	    this._itemsWidth[i] = Math.ceil($dom.children[len].offsetWidth);
	    this._previousStepsWidth = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
	    this._update();

	    /*
	     * 把最后一个元素设置为absolute，是为了防止动态添加元素后滚动条出现导致的布局问题。
	     * 未来不考虑ie8一类的浏览器后，会采用纯css来避免各种问题。
	     */
	    $dom.children[len].style.position = 'absolute';

	    /*
	     * 下面的代码是为了兼容window系统下滚动条出现后会占用宽度的问题。
	     * componentDidMount时滚动条还不一定出现了，这时候获取的宽度可能不是最终宽度。
	     * 对于滚动条不占用宽度的浏览器，下面的代码也不二次render，_resize里面会判断要不要更新。
	     */
	    setTimeout(() => {
	      this._resize();
	    });

	    if (window.attachEvent) {
	      window.attachEvent('onresize', this._resize);
	    } else {
	      window.addEventListener('resize', this._resize);
	    }
	  },
	  componentDidUpdate() {
	    this._resize();
	  },
	  componentWillUnmount() {
	    if (this.props.direction === 'vertical') {
	      return;
	    }
	    if (window.attachEvent) {
	      window.detachEvent('onresize', this._resize);
	    } else {
	      window.removeEventListener('resize', this._resize);
	    }
	  },
	  _previousStepsWidth: 0,
	  _itemsWidth: [],
	  _resize() {
	    const w = Math.floor(ReactDOM.findDOMNode(this).offsetWidth);
	    if (this._previousStepsWidth === w) {
	      return;
	    }
	    this._previousStepsWidth = w;
	    this._update();
	  },
	  _update() {
	    const len = this.props.children.length - 1;
	    let tw = 0;
	    this._itemsWidth.forEach((w) => {
	      tw += w;
	    });
	    const dw = Math.floor((this._previousStepsWidth - tw) / len) - 1;
	    if (dw <= 0) {
	      return;
	    }
	    this.setState({
	      init: true,
	      tailWidth: dw,
	    });
	  },
	  render() {
	    const props = this.props;
	    const prefixCls = props.prefixCls;
	    const children = props.children;
	    const maxDescriptionWidth = props.maxDescriptionWidth;
	    const iconPrefix = props.iconPrefix;
	    const len = children.length - 1;
	    const iws = this._itemsWidth;
	    let clsName = prefixCls;
	    clsName += props.size === 'small' ? ' ' + prefixCls + '-small' : '';
	    clsName += props.direction === 'vertical' ? ' ' + prefixCls + '-vertical' : '';

	    return (
	      <div className={clsName}>
	        {React.Children.map(children, (ele, idx) => {
	          const np = {
	            stepNumber: (idx + 1).toString(),
	            stepLast: idx === len,
	            tailWidth: iws.length === 0 || idx === len ? 'auto' : iws[idx] + this.state.tailWidth,
	            prefixCls: prefixCls,
	            iconPrefix: iconPrefix,
	            maxDescriptionWidth: maxDescriptionWidth,
	          };
	          if (!ele.props.status) {
	            if (idx === props.current) {
	              np.status = 'process';
	            } else if (idx < props.current) {
	              np.status = 'finish';
	            } else {
	              np.status = 'wait';
	            }
	          }
	          return React.cloneElement(ele, np);
	        }, this)}
	      </div>
	    );
	  },
	});
	 
	Steps.Step = Step
	RC.Steps = Steps;
}(Smart.RC)
