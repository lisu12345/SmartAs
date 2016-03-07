package org.smartas.security.service.impl;

import java.io.Serializable;
import java.util.List;

import org.smartas.core.BusinessAccessException;
import org.smartas.core.service.BaseServiceImpl;
import org.smartas.security.Role;
import org.smartas.security.dao.RoleDao;
import org.smartas.security.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
