'use strict';

//2016.2.1
+function (Namespace) {
	var RC = Namespace.register("Smart.RC");
	var assign = _.assign;

	var velocity = $.Velocity;

	function animate(node, show, transitionName, done) {
		var ok = void 0;

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
			stop: function stop() {
				velocity(node, 'finish');
				complete();
			}
		};
	}

	var animation = {
		enter: function enter(node, done) {
			return animate(node, false, 'slideDown', done);
		},
		leave: function leave(node, done) {
			return animate(node, true, 'slideUp', done);
		},
		appear: function appear(node, done) {
			return animate(node, false, 'slideDown', done);
		}
	};

	RC.Animation = animation;
	RC.animation = animation;

	var DOMWrap = React.createClass({
		displayName: 'DOMWrap',

		propTypes: {
			tag: React.PropTypes.string
		},

		getDefaultProps: function getDefaultProps() {
			return {
				tag: 'div'
			};
		},
		render: function render() {
			var props = assign({}, this.props);
			if (!props.visible) {
				props.className = props.className || '';
				props.className += ' ' + props.hiddenClassName;
			}
			var Tag = props.tag;
			return React.createElement(Tag, props);
		}
	});
	RC.DOMWrap = DOMWrap;
}(Smart.Namespace);