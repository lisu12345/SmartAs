package com.fiberhome.smartas.security.service.impl;

import java.io.Serializable;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.security.Permission;
import com.fiberhome.smartas.security.dao.PermissionDao;
import com.fiberhome.smartas.security.service.PermissionService;

/**
 * @author chenb
 *
 */
@Service
public class PermissionServiceImpl extends BaseServiceImpl<Permission>
    implements
      PermissionService {

  @Autowired
  private PermissionDao dao;

  protected PermissionDao getDao() {
    return dao;
  }

  public void updatePermissions(long roleId, String[] perms) {
    dao.delPermsByRoleId(roleId);
    if (perms.length > 0) {
      dao.insertPerms(roleId, perms);
    }
  }

  public String[] getPermissionsByRoleId(long roleId) {
    return dao.getPermissionsByRoleId(roleId);
  }

  @Override
  public Set<Serializable> findPermissionsByUserId(Serializable userId) {
    return dao.findPermissionsByUserId(userId);
  }
}
