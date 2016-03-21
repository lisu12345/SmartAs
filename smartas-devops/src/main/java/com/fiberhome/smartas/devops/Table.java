/**
 * 
 */
package com.fiberhome.smartas.devops;

import com.fiberhome.smartas.core.POJO;

/**
 * @author chenb
 *
 */
public class Table implements POJO {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8325821505951946303L;

	private String schema;
	private String name;
	private String comment;

	/**
	 * @return the schema
	 */
	public String getSchema() {
		return schema;
	}

	/**
	 * @param schema
	 *            the schema to set
	 */
	public void setSchema(String schema) {
		this.schema = schema;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the comment
	 */
	public String getComment() {
		return comment;
	}

	/**
	 * @param comment
	 *            the comment to set
	 */
	public void setComment(String comment) {
		this.comment = comment;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return name;
	}
}
