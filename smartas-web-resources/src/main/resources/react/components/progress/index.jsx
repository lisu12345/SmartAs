+ function(RC) {
	const {assign} = _;

	const defaultProps = {
		strokeWidth: 1,
		strokeColor: '#3FC7FA',
		trailWidth: 1,
		trailColor: '#D9D9D9',
	};
	
	const Line = React.createClass({
	  render() {
	    const props = assign({}, this.props);
	    const pathStyle = {
	      'strokeDasharray': '100px, 100px',
	      'strokeDashoffset': `${(100 - props.percent)}px`,
	      'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s linear',
	    };

	    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach((item)=> {
	      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
	        props.trailWidth = props.strokeWidth;
	        return;
	      }
	      if (item === 'strokeWidth' && props.strokeWidth && (!parseFloat(props.strokeWidth) ||
	        parseFloat(props.strokeWidth) > 100 || parseFloat(props.strokeWidth) < 0)) {
	        props[item] = defaultProps[item];
	        return;
	      }
	      if (!props[item]) {
	        props[item] = defaultProps[item];
	      }
	    });

	    const strokeWidth = props.strokeWidth;
	    const center = strokeWidth / 2;
	    const right = (100 - strokeWidth / 2);
	    const pathString = `M ${center},${center} L ${right},${center}`;
	    const viewBoxString = `0 0 100 ${strokeWidth}`;

	    return (
	      <svg className="rc-progress-line" viewBox={viewBoxString} preserveAspectRatio="none">
	        <path className="rc-progress-line-trail" d={pathString} strokeLinecap="round"
	              stroke={props.trailColor} strokeWidth={props.trailWidth} fillOpacity="0"/>

	        <path className="rc-progress-line-path" d={pathString} strokeLinecap="round"
	              stroke={props.strokeColor} strokeWidth={props.strokeWidth} fillOpacity="0" style={pathStyle}/>
	      </svg>
	    );
	  },
	});

	const Circle = React.createClass({
	  render() {
	    const props = assign({}, this.props);
	    const strokeWidth = props.strokeWidth;
	    const radius = (50 - strokeWidth / 2);
	    const pathString = `M 50,50 m 0,-${radius}
	     a ${radius},${radius} 0 1 1 0,${2 * radius}
	     a ${radius},${radius} 0 1 1 0,-${2 * radius}`;
	    const len = Math.PI * 2 * radius;
	    const pathStyle = {
	      'strokeDasharray': `${len}px ${len}px`,
	      'strokeDashoffset': `${((100 - props.percent) / 100 * len)}px`,
	      'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease',
	    };
	    ['strokeWidth', 'strokeColor', 'trailWidth', 'trailColor'].forEach((item) => {
	      if (item === 'trailWidth' && !props.trailWidth && props.strokeWidth) {
	        props.trailWidth = props.strokeWidth;
	        return;
	      }
	      if (!props[item]) {
	        props[item] = defaultProps[item];
	      }
	    });

	    return (
	      <svg className="rc-progress-circle" viewBox="0 0 100 100">
	        <path className="rc-progress-circle-trail" d={pathString} stroke={props.trailColor}
	              strokeWidth={props.trailWidth} fillOpacity="0"/>

	        <path className="rc-progress-circle-path" d={pathString} strokeLinecap="round"
	              stroke={props.strokeColor} strokeWidth={props.strokeWidth} fillOpacity="0" style={pathStyle}/>
	      </svg>
	    );
	  },
	});

	RC.Progress = {
		Line: Line,
		Circle: Circle
	};
}(Smart.RC)