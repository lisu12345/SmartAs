/**
 * 
 */
package com.fiberhome.smartas.security.service;

import java.io.Serializable;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.security.Permission;

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
