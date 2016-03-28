/**
 * 
 */
package com.fiberhome.smartas.core.ui;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.core.POJO;

/**
 * @author chenb
 * {@link BaseResource}
 * @param <T>
 */
@Deprecated
public abstract class BaseUI<T extends POJO> extends GenericUI<T, Long> {

	protected abstract BaseService<T> getService();
}
