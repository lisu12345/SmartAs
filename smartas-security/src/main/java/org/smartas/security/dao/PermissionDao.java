/**
 * 
 */
package org.smartas.security.dao;

import java.io.Serializable;
import java.util.Set;

import org.apache.ibatis.annotations.Param;
import org.smartas.core.BaseDao;
import org.smartas.security.Permission;
import org.springframework.stereotype.Repository;

/**
 * @author chenb
 *
 */
@Repository
public interface PermissionDao extends BaseDao<Permission> {

  void delPermsByRoleId(long roleId);

  void insertPerms(@Param("roleId") long roleId, @Param("perms") String[] perms);

  String[] getPermissionsByRoleId(long roleId);

  Set<Serializable> findPermissionsByUserId(Serializable userId);
}
