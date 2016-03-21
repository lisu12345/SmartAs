package com.fiberhome.smartas.security.service;

import java.io.Serializable;
import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.security.Role;

/**
 * @author chenb
 *
 */
@Transactional()
public interface RoleService extends BaseService<Role> {

  List<Serializable> findRoleByUserId(Serializable userId) throws BusinessAccessException;
}
