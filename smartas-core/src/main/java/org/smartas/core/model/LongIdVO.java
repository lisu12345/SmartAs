package org.smartas.core.model;

public abstract class LongIdVO extends BaseVO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 4948363701048760213L;
	protected Long id;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

}
