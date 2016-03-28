/**
 * 
 */
package com.fiberhome.smartas.core.ui;

import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.core.POJO;

/**
 * @author chenb
 *
 * @param <T>
 */
@Produces("application/json")
@Consumes("application/json")
public abstract class BaseResource<T extends POJO> extends GenericResource<T, Long> {

	protected abstract BaseService<T> getService();
}
