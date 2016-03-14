/**
 * 
 */
package org.smartas.devops.service;

import java.util.List;

import org.smartas.core.Pageable;
import org.smartas.devops.Table;
import org.smartas.devops.generator.config.TableConfig;
import org.smartas.devops.generator.meta.IntrospectedTable;
import org.springframework.jdbc.support.MetaDataAccessException;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author ftl
 *
 */
@Transactional(readOnly = true)
public interface DatabaseService {

  @Transactional
  Pageable<Table> getTable(String db, String tablePrefix, int page, int pageSize);


  List<IntrospectedTable> introspectTables(TableConfig tc) throws MetaDataAccessException;

}
