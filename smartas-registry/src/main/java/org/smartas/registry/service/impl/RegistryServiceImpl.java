package org.smartas.registry.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import org.smartas.registry.Registry;
import org.smartas.registry.dao.RegistryDao;
import org.smartas.registry.service.RegistryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
