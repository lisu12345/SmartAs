+ function(UI, RC) {
	const {TreeSelect,classNames} = RC,
		{TreeNode,SHOW_ALL, SHOW_PARENT, SHOW_CHILD} = TreeSelect;
		
	const AntTreeSelect = React.createClass({
	  getDefaultProps() {
	    return {
	      prefixCls: 'ant-select',
	      transitionName: 'slide-up',
	      choiceTransitionName: 'zoom',
	      showSearch: false,
	      // openAnimation: animation,
	    };
	  },
	  render() {
	    const props = this.props;
	    let {
	      size, className, combobox, notFoundContent, prefixCls
	    } = this.props;

	    const cls = classNames({
	      [`${prefixCls}-lg`]: size === 'large',
	      [`${prefixCls}-sm`]: size === 'small',
	      [className]: !!className,
	    });

	    if (combobox) {
	      notFoundContent = null;
	    }

	    let checkable = props.treeCheckable;
	    if (checkable) {
	      checkable = <span className={`${prefixCls}-tree-checkbox-inner`}></span>;
	    }

	    return (
	      <TreeSelect {...this.props}
	        treeCheckable={checkable}
	        className={cls}
	        notFoundContent={notFoundContent} />
	    );
	  }
	});

	AntTreeSelect.TreeNode = TreeNode;
	AntTreeSelect.SHOW_ALL = SHOW_ALL;
	AntTreeSelect.SHOW_PARENT = SHOW_PARENT;
	AntTreeSelect.SHOW_CHILD = SHOW_CHILD;
	UI.TreeSelect = AntTreeSelect;
}(Smart.UI, Smart.RC);
