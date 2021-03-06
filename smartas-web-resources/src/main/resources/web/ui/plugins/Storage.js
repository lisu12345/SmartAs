"use strict";

+(function (Namespace, Service) {
	var UI = Namespace.register("Smart.UI"),
	    AT = Smart.UI.ActionTypes;
	UI.Storage = React.createClass({
		displayName: "Storage",

		propTypes: {
			model: React.PropTypes.string.isRequired
		},
		shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
			var should = nextProps.model !== this.props.model;
			if (should) {
				this.tryUnsubscribe();
			}
			return should;
		},
		getService: function getService() {
			return this.service;
		},
		handleChange: function handleChange(action) {
			//提交数据到中央存储？？
		},
		trySubscribe: function trySubscribe() {
			if (!this.unsubscribe) {
				this.unsubscribe = this.service.subscribe(this.handleChange);
			}
		},

		tryUnsubscribe: function tryUnsubscribe() {
			if (this.unsubscribe) {
				this.unsubscribe();
				this.unsubscribe = null;
			}
		},
		componentDidMount: function componentDidMount() {
			this.trySubscribe();
		},
		componentWillUnmount: function componentWillUnmount() {
			this.tryUnsubscribe();
			this.service = null;
		},
		render: function render() {
			this.service = Service.New(this.props.model);
			return React.cloneElement(React.Children.only(this.props.children), {
				service: this.service
			});
		}
	});
})(Smart.Namespace, Smart.Service);