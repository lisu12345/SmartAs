/**
 * 
 */
package com.fiberhome.smartas.devops.service;

import java.util.List;

import org.springframework.jdbc.support.MetaDataAccessException;
import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.smartas.core.Pageable;
import com.fiberhome.smartas.devops.Table;
import com.fiberhome.smartas.devops.generator.config.TableConfig;
import com.fiberhome.smartas.devops.generator.meta.IntrospectedTable;

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
