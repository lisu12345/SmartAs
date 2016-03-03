/**
 * 
 */
package org.smartas.devops.service;

import org.smartas.core.Pageable;
import org.smartas.devops.Table;

/**
 * @author ftl
 *
 */
public interface DatabaseService {

	Pageable<Table> getAll(int page, int pageSize);
}
