/**
 * 
 */
package com.fiberhome.smartas.security.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.fiberhome.smartas.core.BaseDao;
import com.fiberhome.smartas.security.Menu;

/**
 * @author chenb
 *
 */
@Repository
public interface MenuDao extends BaseDao<Menu> {

	/**
	 * 查询发布的有效菜单
	 * 
	 * @return
	 */
	List<Menu> findNavbarMenus();

}
