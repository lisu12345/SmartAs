/**
 * 
 */
package com.fiberhome.smartas.security.service;

import java.util.List;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.security.Menu;

/**
 * @author chenb
 *
 */
public interface MenuService extends BaseService<Menu> {

	List<Menu> findNavbarMenus();
}
