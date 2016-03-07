package org.smartas.security.service;

import java.io.Serializable;
import java.util.List;

import org.smartas.core.BaseService;
import org.smartas.core.BusinessAccessException;
import org.smartas.security.Role;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author chenb
 *
 */
@Transactional()
public interface RoleService extends BaseService<Role> {

  List<Serializable> findRoleByUserId(Serializable userId) throws BusinessAccessException;
}
