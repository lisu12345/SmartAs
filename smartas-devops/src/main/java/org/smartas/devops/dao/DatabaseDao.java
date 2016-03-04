/**
 * 
 */
package org.smartas.devops.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.smartas.core.Page;
import org.smartas.devops.Table;
import org.springframework.stereotype.Repository;

/**
 * @author xxxx
 *
 */
@Repository
public interface DatabaseDao {

	int getTableCountAll(@Param("db") String db,@Param("prefix") String prefix);

	List<Table> selectTable(@Param("db") String db,@Param("prefix") String prefix,@Param("page") Page page);
}
