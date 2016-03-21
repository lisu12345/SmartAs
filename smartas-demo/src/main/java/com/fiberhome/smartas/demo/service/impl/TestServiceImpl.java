package com.fiberhome.smartas.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.demo.Test;
import com.fiberhome.smartas.demo.dao.TestDao;
import com.fiberhome.smartas.demo.service.TestService;

/**
 * @author ftl
 *
 */
@Service
public class TestServiceImpl extends BaseServiceImpl<Test> implements TestService {

	@Autowired
	private TestDao dao;

	protected TestDao getDao() {
		return dao;
	}
	
	////

}
