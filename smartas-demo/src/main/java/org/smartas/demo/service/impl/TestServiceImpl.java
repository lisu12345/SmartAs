package org.smartas.demo.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.demo.Test;
import org.smartas.demo.dao.TestDao;
import org.smartas.demo.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
