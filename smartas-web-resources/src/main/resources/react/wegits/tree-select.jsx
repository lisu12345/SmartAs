+ function(UI, RC) {
	const {TreeSelect,classNames} = RC,
		{TreeNode} = TreeSelect;
		
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
	UI.TreeSelect = AntTreeSelect;
}(Smart.UI, Smart.RC);
