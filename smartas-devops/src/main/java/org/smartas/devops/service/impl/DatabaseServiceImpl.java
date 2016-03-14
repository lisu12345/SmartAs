package org.smartas.devops.service.impl;

import java.sql.DatabaseMetaData;
import java.sql.SQLException;
import java.util.LinkedList;
import java.util.List;

import javax.sql.DataSource;

import org.smartas.core.Page;
import org.smartas.core.Pageable;
import org.smartas.core.util.DaoUtils;
import org.smartas.devops.Table;
import org.smartas.devops.dao.DatabaseDao;
import org.smartas.devops.generator.api.JavaTypeResolver;
import org.smartas.devops.generator.config.TableConfig;
import org.smartas.devops.generator.db.DatabaseIntrospector;
import org.smartas.devops.generator.meta.IntrospectedTable;
import org.smartas.devops.generator.types.JavaTypeResolverDefaultImpl;
import org.smartas.devops.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.DatabaseMetaDataCallback;
import org.springframework.jdbc.support.JdbcUtils;
import org.springframework.jdbc.support.MetaDataAccessException;
import org.springframework.stereotype.Service;

/**
 * @author ftl
 *
 */
@Service
public class DatabaseServiceImpl implements DatabaseService {

  @Autowired
  private DatabaseDao dao;

  @Autowired
  private DataSource dataSource;

  @Override
  public Pageable<Table> getTable(String db, String prefix, int page, int pageSize) {
    int length = dao.getTableCountAll(db, prefix);
    page = DaoUtils.realPage(page, pageSize, length);
    return new Pageable<Table>(page, pageSize, length,
        dao.selectTable(db, prefix, new Page((page - 1) * pageSize, pageSize)));
  }

  @Override
  @SuppressWarnings("unchecked")
  public List<IntrospectedTable> introspectTables(TableConfig tc) throws MetaDataAccessException {
    return (List<IntrospectedTable>) JdbcUtils.extractDatabaseMetaData(dataSource,
        new DatabaseMetaDataCallback() {
          public Object processMetaData(DatabaseMetaData dbmd)
              throws SQLException, MetaDataAccessException {
            List<String> warnings = new LinkedList<>();
            JavaTypeResolver javaTypeResolver = new JavaTypeResolverDefaultImpl();
            javaTypeResolver.setWarnings(warnings);
            return new DatabaseIntrospector(dbmd, javaTypeResolver, warnings).introspectTables(tc);
          }
        });
  }
}
