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

	Pageable<Table> getTable(String db,String tablePrefix,int page, int pageSize);
}
