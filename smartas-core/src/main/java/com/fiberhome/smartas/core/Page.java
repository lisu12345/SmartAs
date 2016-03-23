/**
 * 
 */
package com.fiberhome.smartas.core;

import java.io.Serializable;

/**
 * @author chenb
 *
 */
public class Page implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1903323558085179869L;
	protected final int maxResult;
	protected final int firstResult;

	public Page(int firstResult, int maxResult) {
		this.maxResult = maxResult;
		this.firstResult = firstResult;
	}

	/**
	 * @return the maxResult
	 */
	public int getMaxResult() {
		return maxResult;
	}

	/**
	 * @return the firstResult
	 */
	public int getFirstResult() {
		return firstResult;
	}

	public int getFirstRow() {
		return firstResult + 1;
	}

	public int getLastRow() {
		if (maxResult == Integer.MAX_VALUE) {
			return maxResult;
		}
		return firstResult + maxResult + 1;
	}

}
