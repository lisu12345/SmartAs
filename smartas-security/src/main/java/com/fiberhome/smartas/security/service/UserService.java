package com.fiberhome.smartas.security.service;

import org.springframework.transaction.annotation.Transactional;

import com.fiberhome.smartas.core.BaseService;
import com.fiberhome.smartas.security.User;

/**
 * @author chenb
 *
 */
public interface UserService extends BaseService<User> {

	@Transactional()
	User findByUserAcount(String username);
}
