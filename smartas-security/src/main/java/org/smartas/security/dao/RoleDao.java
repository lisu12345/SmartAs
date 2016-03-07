/**
 * 
 */
package org.smartas.security.dao;

import java.io.Serializable;
import java.util.List;

import org.smartas.core.BaseDao;
import org.smartas.security.Role;
import org.springframework.stereotype.Repository;

/**
 * @author chenb
 *
 */
@Repository
public interface RoleDao extends BaseDao<Role> {

  List<Serializable> findRoleByUserId(Serializable userId);
}
