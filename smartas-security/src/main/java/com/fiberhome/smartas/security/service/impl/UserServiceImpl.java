package com.fiberhome.smartas.security.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.security.User;
import com.fiberhome.smartas.security.dao.UserDao;
import com.fiberhome.smartas.security.service.UserService;

/**
 * @author chenb
 *
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User> implements UserService {

	@Autowired
	private UserDao dao;

	protected UserDao getDao() {
		return dao;
	}

	public User findByUserAcount(String username) {
		return dao.findByUserAcount(username);
	}
}
