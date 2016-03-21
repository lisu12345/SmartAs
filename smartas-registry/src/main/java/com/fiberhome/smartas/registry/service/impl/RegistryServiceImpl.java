package com.fiberhome.smartas.registry.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fiberhome.smartas.core.service.BaseServiceImpl;
import com.fiberhome.smartas.registry.Registry;
import com.fiberhome.smartas.registry.dao.RegistryDao;
import com.fiberhome.smartas.registry.service.RegistryService;

/**
 * @author ftl
 *
 */
@Service
public class RegistryServiceImpl extends BaseServiceImpl<Registry> implements RegistryService {

	@Autowired
	private RegistryDao dao;

	protected RegistryDao getDao() {
		return dao;
	}
	
	////

}
