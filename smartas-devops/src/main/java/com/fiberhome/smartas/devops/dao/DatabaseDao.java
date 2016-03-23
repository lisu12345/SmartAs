/**
 * 
 */
package com.fiberhome.smartas.devops.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.fiberhome.smartas.core.Page;
import com.fiberhome.smartas.devops.Table;

/**
 * @author xxxx
 *
 */
@Repository
public interface DatabaseDao {

	int getTableCountAll(@Param("db") String db,@Param("prefix") String prefix);

	List<Table> selectTable(@Param("db") String db,@Param("prefix") String prefix,@Param("page") Page page);
}
