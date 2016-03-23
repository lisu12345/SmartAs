/**
 * 
 */
package com.fiberhome.smartas.security.dao;

import org.springframework.stereotype.Repository;

import com.fiberhome.smartas.core.BaseDao;
import com.fiberhome.smartas.security.User;

/**
 * @author chenb
 *
 */
@Repository
public interface UserDao extends BaseDao<User> {

	User findByUserAcount(String username);
}
