/**
 * 
 */
package com.fiberhome.smartas.security.dao;

import java.io.Serializable;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.fiberhome.smartas.core.BaseDao;
import com.fiberhome.smartas.security.Role;

/**
 * @author chenb
 *
 */
@Repository
public interface RoleDao extends BaseDao<Role> {

  List<Serializable> findRoleByUserId(Serializable userId);
}
