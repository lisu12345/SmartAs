package com.fiberhome.smartas.security.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.security.Menu;
import com.fiberhome.smartas.security.dao.MenuDao;
import com.fiberhome.smartas.security.service.MenuService;

/**
 * @author chenb
 *
 */
@Service
public class MenuServiceImpl extends BaseServiceImpl<Menu> implements MenuService {

	@Autowired
	private MenuDao dao;

	protected MenuDao getDao() {
		return dao;
	}

	public List<Menu> findNavbarMenus() {
		// TODO Auto-generated method stub
		return dao.findNavbarMenus();
	}

}
