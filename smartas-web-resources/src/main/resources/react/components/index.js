+ function(Namespace) {
	var RC = Namespace.register("Smart.RC");
	const assign = _.assign;

	let velocity = $.Velocity;

	function animate(node, show, transitionName, done) {
		let ok;

		function complete() {
			if (!ok) {
				ok = true;
				done();
			}
		}

		// Fix safari flash bug
		node.style.display = show ? 'block' : 'none';
		velocity(node, transitionName, {
			duration: 240,
			complete: complete,
			easing: 'easeInOutQuad'
		});
		return {
			stop() {
				velocity(node, 'finish');
				complete();
			}
		};
	}

	const animation = {
		enter(node, done) {
			return animate(node, false, 'slideDown', done);
		},
		leave(node, done) {
			return animate(node, true, 'slideUp', done);
		},
		appear(node, done) {
			return animate(node, false, 'slideDown', done);
		},
	};

	RC.Animation = animation;
	RC.animation = animation;

	const DOMWrap = React.createClass({
		propTypes: {
			tag: React.PropTypes.string,
		},

		getDefaultProps() {
			return {
				tag: 'div',
			};
		},

		render() {
			const props = assign({}, this.props);
			if (!props.visible) {
				props.className = props.className || '';
				props.className += ' ' + props.hiddenClassName;
			}
			const Tag = props.tag;
			return <Tag {...props}></Tag>;
		},
	});
	RC.DOMWrap = DOMWrap;

}(Smart.Namespace)