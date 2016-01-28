+ function(UI) {
	let Animate = UI.Animate;
	let assign = _.assign;
	let isCssAnimationSupported = Animate.isCssAnimationSupported;

	function getNumberArray(num) {
		return num ?
			num.toString().split('').reverse().map(i => Number(i)) : [];
	}

	class ScrollNumber extends React.Component {
		constructor(props) {
			super(props);
			this.state = {
				animateStarted: true,
				count: props.count
			};
		}

		getPositionByNum(num, i) {
			if (this.state.animateStarted) {
				return 10 + num;
			}
			const currentDigit = getNumberArray(this.state.count)[i];
			const lastDigit = getNumberArray(this.lastCount)[i];
			// 同方向则在同一侧切换数字
			if (this.state.count > this.lastCount) {
				if (currentDigit >= lastDigit) {
					return 10 + num;
				} else {
					return 20 + num;
				}
			} else {
				if (currentDigit <= lastDigit) {
					return 10 + num;
				} else {
					return num;
				}
			}
		}

		componentWillReceiveProps(nextProps) {
			if ('count' in nextProps && nextProps.count) {
				if (this.lastCount === this.state.count) {
					return;
				}
				this.lastCount = this.state.count;
				// 复原数字初始位置
				this.setState({
					animateStarted: true,
				}, () => {
					// 等待数字位置复原完毕
					// 开始设置完整的数字
					setTimeout(() => {
						this.setState({
							animateStarted: false,
							count: nextProps.count,
						}, () => {
							this.props.onAnimated();
						});
					}, 5);
				});
			}
		}

		renderNumberList() {
			const childrenToReturn = [];
			for (let i = 0; i < 30; i++) {
				childrenToReturn.push(<p key={i}>{i % 10}</p>);
			}
			return childrenToReturn;
		}

		renderCurrentNumber(num, i) {
			const position = this.getPositionByNum(num, i);
			const height = this.props.height;
			const removeTransition = this.state.animateStarted ||
				(getNumberArray(this.lastCount)[i] === undefined);
			return React.createElement('span', {
				className: `${this.props.prefixCls}-only`,
				style: {
					transition: removeTransition && 'none',
					transform: 'translate3d(0, ' + (-position * height) + 'px, 0)',
					height: height,
				},
				key: i,
			}, this.renderNumberList());
		}

		renderNumberElement() {
			const state = this.state;
			if (!state.count || isNaN(state.count)) {
				return state.count;
			}
			return getNumberArray(state.count)
				.map((num, i) => this.renderCurrentNumber(num, i)).reverse();
		}

		render() {
			const props = assign({}, this.props, {
				className: `${this.props.prefixCls} ${this.props.className}`
			});
			const isBrowser = (typeof document !== 'undefined' && typeof window !== 'undefined');
			if (isBrowser && isCssAnimationSupported) {
				return React.createElement(
					this.props.component,
					props,
					this.renderNumberElement()
				);
			} else {
				return React.createElement(
					this.props.component,
					props,
					props.count
				);
			}
		}
	}

	ScrollNumber.defaultProps = {
		prefixCls: 'ant-scroll-number',
		count: null,
		component: 'sup',
		onAnimated: function() {},
		height: 18,
	};

	ScrollNumber.propTypes = {
		count: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		component: React.PropTypes.string,
		onAnimated: React.PropTypes.func,
		height: React.PropTypes.number,
	};


	class AntBadge extends React.Component {
		constructor(props) {
			super(props);
		}

		render() {
			let {
				count, prefixCls, overflowCount, className, style, children
			} = this.props;
			const dot = this.props.dot;

			count = count > overflowCount ? `${overflowCount}+` : count;

			// dot mode don't need count
			if (dot) {
				count = '';
			}

			// null undefined "" "0" 0
			const hidden = (!count || count === '0') && !dot;
			const scrollNumberCls = prefixCls + (dot ? '-dot' : '-count');
			const badgeCls = classNames({
				[className]: !!className, [prefixCls]: true, [`${prefixCls}-not-a-wrapper`]: !children,
			});

			return (
				<span className={badgeCls} title={count} {...this.props} style={null}>
		        {children}
		        <Animate component=""
		          showProp="data-show"
		          transitionName={prefixCls + '-zoom'}
		          transitionAppear>
		          {
		            hidden ? null :
		              <ScrollNumber data-show={!hidden} className={scrollNumberCls}
		                count={count} style={style} />
		          }
		        </Animate>
		      </span>
			);
		}
	}

	AntBadge.defaultProps = {
		prefixCls: 'ant-badge',
		count: null,
		dot: false,
		overflowCount: 99,
	};

	AntBadge.propTypes = {
		count: React.PropTypes.oneOfType([
			React.PropTypes.string,
			React.PropTypes.number
		]),
		dot: React.PropTypes.bool,
		overflowCount: React.PropTypes.number,
	};
	UI.Badge = AntBadge;
}(Smart.UI);