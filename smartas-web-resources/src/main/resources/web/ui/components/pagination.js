'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

+function (RC) {
	var KEYCODE = RC.KeyCode;
	var LOCALE = RC.Locale.Pagination;
	var _ref = _;
	var noop = _ref.noop;

	var Pager = function (_React$Component) {
		_inherits(Pager, _React$Component);

		function Pager() {
			_classCallCheck(this, Pager);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(Pager).apply(this, arguments));
		}

		_createClass(Pager, [{
			key: 'render',
			value: function render() {
				var props = this.props;
				var locale = props.locale;
				var prefixCls = props.rootPrefixCls + '-item';
				var cls = prefixCls + ' ' + prefixCls + '-' + props.page;

				if (props.active) {
					cls = cls + ' ' + prefixCls + '-active';
				}

				var title = void 0;
				if (props.page === 1) {
					title = locale.first_page;
				} else if (props.last) {
					title = locale.last_page + ': ' + props.page;
				} else {
					title = props.page;
				}
				return React.createElement(
					'li',
					{ title: title, className: cls, onClick: props.onClick },
					React.createElement(
						'a',
						null,
						props.page
					)
				);
			}
		}]);

		return Pager;
	}(React.Component);

	Pager.propTypes = {
		page: React.PropTypes.number,
		active: React.PropTypes.bool,
		last: React.PropTypes.bool,
		locale: React.PropTypes.object
	};

	var Options = function (_React$Component2) {
		_inherits(Options, _React$Component2);

		function Options(props) {
			_classCallCheck(this, Options);

			var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Options).call(this, props));

			_this2.state = {
				current: props.current,
				_current: props.current
			};

			['_handleChange', '_changeSize', '_go', '_buildOptionText'].forEach(function (method) {
				return _this2[method] = _this2[method].bind(_this2);
			});
			return _this2;
		}

		_createClass(Options, [{
			key: '_buildOptionText',
			value: function _buildOptionText(value) {
				return value + ' ' + this.props.locale.items_per_page;
			}
		}, {
			key: '_changeSize',
			value: function _changeSize(value) {
				this.props.changeSize(Number(value));
			}
		}, {
			key: '_handleChange',
			value: function _handleChange(evt) {
				var _val = evt.target.value;

				this.setState({
					_current: _val
				});
			}
		}, {
			key: '_go',
			value: function _go(e) {
				var _val = e.target.value;
				if (_val === '') {
					return;
				}
				var val = Number(this.state._current);
				if (isNaN(val)) {
					val = this.state.current;
				}
				if (e.keyCode === KEYCODE.ENTER) {
					var c = this.props.quickGo(val);
					this.setState({
						_current: c,
						current: c
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this3 = this;

				var props = this.props;
				var state = this.state;
				var locale = props.locale;
				var prefixCls = props.rootPrefixCls + '-options';
				var changeSize = props.changeSize;
				var quickGo = props.quickGo;
				var buildOptionText = props.buildOptionText || this._buildOptionText;
				var Select = props.selectComponentClass;
				var changeSelect = null;
				var goInput = null;

				if (!(changeSize || quickGo)) {
					return null;
				}

				if (changeSize && Select) {
					(function () {
						var Option = Select.Option;
						var defaultOption = props.pageSize || props.pageSizeOptions[0];
						var options = props.pageSizeOptions.map(function (opt, i) {
							return React.createElement(
								Option,
								{ key: i, value: opt },
								buildOptionText(opt)
							);
						});

						changeSelect = React.createElement(
							Select,
							{
								prefixCls: props.selectPrefixCls, showSearch: false,
								className: prefixCls + '-size-changer',
								optionLabelProp: 'children',
								defaultValue: '' + defaultOption, onChange: _this3._changeSize },
							options
						);
					})();
				}

				if (quickGo) {
					goInput = React.createElement(
						'div',
						{ title: 'Quick jump to page', className: prefixCls + '-quick-jumper' },
						locale.jump_to,
						React.createElement('input', { type: 'text', value: state._current, onChange: this._handleChange.bind(this), onKeyUp: this._go.bind(this) }),
						locale.page
					);
				}

				return React.createElement(
					'div',
					{ className: '' + prefixCls },
					changeSelect,
					goInput
				);
			}
		}]);

		return Options;
	}(React.Component);

	Options.propTypes = {
		changeSize: React.PropTypes.func,
		quickGo: React.PropTypes.func,
		selectComponentClass: React.PropTypes.func,
		current: React.PropTypes.number,
		pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
		pageSize: React.PropTypes.number,
		buildOptionText: React.PropTypes.func,
		locale: React.PropTypes.object
	};

	Options.defaultProps = {
		pageSizeOptions: ['10', '20', '30', '40']
	};

	var Pagination = function (_React$Component3) {
		_inherits(Pagination, _React$Component3);

		function Pagination(props) {
			_classCallCheck(this, Pagination);

			var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Pagination).call(this, props));

			var hasOnChange = props.onChange !== noop;
			var hasCurrent = 'current' in props;
			if (hasCurrent && !hasOnChange) {
				console.warn('Warning: You provided a `current` prop to a Pagination component without an `onChange` handler. This will render a read-only component.');
			}

			var current = props.defaultCurrent;
			if ('current' in props) {
				current = props.current;
			}

			_this4.state = {
				current: current,
				_current: current,
				pageSize: props.pageSize
			};

			['render', '_handleChange', '_handleKeyUp', '_handleKeyDown', '_changePageSize', '_isValid', '_prev', '_next', '_hasPrev', '_hasNext', '_jumpPrev', '_jumpNext'].forEach(function (method) {
				return _this4[method] = _this4[method].bind(_this4);
			});
			return _this4;
		}

		_createClass(Pagination, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if ('current' in nextProps) {
					this.setState({
						current: nextProps.current
					});
				}

				if ('pageSize' in nextProps) {
					this.setState({
						pageSize: nextProps.pageSize
					});
				}
			}

			// private methods

		}, {
			key: '_calcPage',
			value: function _calcPage(p) {
				var pageSize = p;
				if (typeof pageSize === 'undefined') {
					pageSize = this.state.pageSize;
				}
				return Math.floor((this.props.total - 1) / pageSize) + 1;
			}
		}, {
			key: '_isValid',
			value: function _isValid(page) {
				return typeof page === 'number' && page >= 1 && page !== this.state.current;
			}
		}, {
			key: '_handleKeyDown',
			value: function _handleKeyDown(evt) {
				if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
					evt.preventDefault();
				}
			}
		}, {
			key: '_handleKeyUp',
			value: function _handleKeyUp(evt) {
				var _val = evt.target.value;
				var val = void 0;

				if (_val === '') {
					val = _val;
				} else if (isNaN(Number(_val))) {
					val = this.state._current;
				} else {
					val = Number(_val);
				}

				this.setState({
					_current: val
				});

				if (evt.keyCode === KEYCODE.ENTER) {
					this._handleChange(val);
				} else if (evt.keyCode === KEYCODE.ARROW_UP) {
					this._handleChange(val - 1);
				} else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
					this._handleChange(val + 1);
				}
			}
		}, {
			key: '_changePageSize',
			value: function _changePageSize(size) {
				if (typeof size === 'number') {
					var current = this.state.current;

					this.setState({
						pageSize: size
					});

					if (this.state.current > this._calcPage(size)) {
						current = this._calcPage(size);
						this.setState({
							current: current,
							_current: current
						});
					}

					this.props.onShowSizeChange(current, size);
				}
			}
		}, {
			key: '_handleChange',
			value: function _handleChange(p) {
				var page = p;
				if (this._isValid(page)) {
					if (page > this._calcPage()) {
						page = this._calcPage();
					}

					if (!('current' in this.props)) {
						this.setState({
							current: page,
							_current: page
						});
					}

					this.props.onChange(page);

					return page;
				}

				return this.state.current;
			}
		}, {
			key: '_prev',
			value: function _prev() {
				if (this._hasPrev()) {
					this._handleChange(this.state.current - 1);
				}
			}
		}, {
			key: '_next',
			value: function _next() {
				if (this._hasNext()) {
					this._handleChange(this.state.current + 1);
				}
			}
		}, {
			key: '_jumpPrev',
			value: function _jumpPrev() {
				this._handleChange(Math.max(1, this.state.current - 5));
			}
		}, {
			key: '_jumpNext',
			value: function _jumpNext() {
				this._handleChange(Math.min(this._calcPage(), this.state.current + 5));
			}
		}, {
			key: '_hasPrev',
			value: function _hasPrev() {
				return this.state.current > 1;
			}
		}, {
			key: '_hasNext',
			value: function _hasNext() {
				return this.state.current < this._calcPage();
			}
		}, {
			key: 'render',
			value: function render() {
				var props = this.props;
				var locale = props.locale;

				var prefixCls = props.prefixCls;
				var allPages = this._calcPage();
				var pagerList = [];
				var jumpPrev = null;
				var jumpNext = null;
				var firstPager = null;
				var lastPager = null;

				if (props.simple) {
					return React.createElement(
						'ul',
						{ className: prefixCls + ' ' + prefixCls + '-simple ' + props.className },
						React.createElement(
							'li',
							{ title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
							React.createElement('a', null)
						),
						React.createElement(
							'div',
							{ title: this.state.current + '/' + allPages, className: prefixCls + '-simple-pager' },
							React.createElement('input', { type: 'text', value: this.state._current, onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp, onChange: this._handleKeyUp }),
							React.createElement(
								'span',
								{ className: prefixCls + '-slash' },
								'／'
							),
							allPages
						),
						React.createElement(
							'li',
							{ title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
							React.createElement('a', null)
						)
					);
				}

				if (allPages <= 9) {
					for (var i = 1; i <= allPages; i++) {
						var active = this.state.current === i;
						pagerList.push(React.createElement(Pager, { locale: locale, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
					}
				} else {
					jumpPrev = React.createElement(
						'li',
						{ title: locale.prev_5, key: 'prev', onClick: this._jumpPrev, className: prefixCls + '-jump-prev' },
						React.createElement('a', null)
					);
					jumpNext = React.createElement(
						'li',
						{ title: locale.next_5, key: 'next', onClick: this._jumpNext, className: prefixCls + '-jump-next' },
						React.createElement('a', null)
					);
					lastPager = React.createElement(Pager, {
						locale: props.locale,
						last: true, rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, allPages), key: allPages, page: allPages, active: false });
					firstPager = React.createElement(Pager, {
						locale: props.locale,
						rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, 1), key: 1, page: 1, active: false });

					var current = this.state.current;

					var left = Math.max(1, current - 2);
					var right = Math.min(current + 2, allPages);

					if (current - 1 <= 2) {
						right = 1 + 4;
					}

					if (allPages - current <= 2) {
						left = allPages - 4;
					}

					for (var _i = left; _i <= right; _i++) {
						var _active = current === _i;
						pagerList.push(React.createElement(Pager, {
							locale: props.locale,
							rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, _i), key: _i, page: _i, active: _active }));
					}

					if (current - 1 >= 4) {
						pagerList.unshift(jumpPrev);
					}
					if (allPages - current >= 4) {
						pagerList.push(jumpNext);
					}

					if (left !== 1) {
						pagerList.unshift(firstPager);
					}
					if (right !== allPages) {
						pagerList.push(lastPager);
					}
				}

				var totalText = null;

				if (props.showTotal) {
					totalText = React.createElement(
						'span',
						{ className: prefixCls + '-total-text' },
						props.showTotal(props.total)
					);
				}

				return React.createElement(
					'ul',
					{ className: prefixCls + ' ' + props.className,
						unselectable: 'unselectable' },
					totalText,
					React.createElement(
						'li',
						{ title: locale.prev_page, onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
						React.createElement('a', null)
					),
					pagerList,
					React.createElement(
						'li',
						{ title: locale.next_page, onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
						React.createElement('a', null)
					),
					React.createElement(Options, {
						locale: props.locale,
						rootPrefixCls: prefixCls,
						selectComponentClass: props.selectComponentClass,
						selectPrefixCls: props.selectPrefixCls,
						changeSize: this.props.showSizeChanger ? this._changePageSize.bind(this) : null,
						current: this.state.current,
						pageSize: this.props.pageSize,
						pageSizeOptions: this.props.pageSizeOptions,
						quickGo: this.props.showQuickJumper ? this._handleChange.bind(this) : null })
				);
			}
		}]);

		return Pagination;
	}(React.Component);

	Pagination.propTypes = {
		current: React.PropTypes.number,
		defaultCurrent: React.PropTypes.number,
		total: React.PropTypes.number,
		pageSize: React.PropTypes.number,
		onChange: React.PropTypes.func,
		showSizeChanger: React.PropTypes.bool,
		onShowSizeChange: React.PropTypes.func,
		selectComponentClass: React.PropTypes.func,
		showQuickJumper: React.PropTypes.bool,
		pageSizeOptions: React.PropTypes.arrayOf(React.PropTypes.string),
		showTotal: React.PropTypes.func,
		locale: React.PropTypes.object
	};

	Pagination.defaultProps = {
		defaultCurrent: 1,
		total: 0,
		pageSize: 10,
		onChange: noop,
		className: '',
		selectPrefixCls: 'rc-select',
		prefixCls: 'rc-pagination',
		selectComponentClass: null,
		showQuickJumper: false,
		showSizeChanger: false,
		onShowSizeChange: noop,
		locale: LOCALE
	};

	RC.Pagination = Pagination;
}(Smart.RC);