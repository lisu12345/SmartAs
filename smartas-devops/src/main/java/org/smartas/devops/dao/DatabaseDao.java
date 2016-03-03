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

	int getTableCountAll();

	List<Table> selectTable(@Param("page") Page page);
}
