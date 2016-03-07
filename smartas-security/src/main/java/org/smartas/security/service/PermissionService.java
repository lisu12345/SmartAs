/**
 * 
 */
package org.smartas.security.service;

import java.io.Serializable;
import java.util.Set;

import org.smartas.core.BaseService;
import org.smartas.security.Permission;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author chenb
 *
 */
@Transactional()
public interface PermissionService extends BaseService<Permission> {

	void updatePermissions(long roleId, String[] perms);

	String[] getPermissionsByRoleId(long roleId);
	
	Set<Serializable> findPermissionsByUserId(Serializable userId);
}
