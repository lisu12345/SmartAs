/**
 * 
 */
package com.fiberhome.smartas.core.model;

import com.fiberhome.smartas.core.Flow;
import com.fiberhome.smartas.core.FlowAware;

/**
 * @author chenb
 *
 */
public class FlowAwareVO extends LongIdVO implements FlowAware {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3022428893263444366L;
	private Flow flow;

	public Flow getFlow() {
		return flow;
	}

	/**
	 * @param flow
	 *            the flow to set
	 */
	public void setFlow(Flow flow) {
		this.flow = flow;
	}

}
