package com.fiberhome.smartas.security.service.impl;

import java.io.Serializable;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.security.Role;
import com.fiberhome.smartas.security.dao.RoleDao;
import com.fiberhome.smartas.security.service.RoleService;

/**
 * @author chenb
 *
 */
@Service
public class RoleServiceImpl extends BaseServiceImpl<Role> implements RoleService {

	@Autowired
	private RoleDao dao;

	protected RoleDao getDao() {
		return dao;
	}

  @Override
  public List<Serializable> findRoleByUserId(Serializable userId) throws BusinessAccessException {
    return dao.findRoleByUserId(userId);
  }
}
