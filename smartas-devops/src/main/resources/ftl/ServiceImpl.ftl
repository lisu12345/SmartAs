package ${entity.packageName}.service.impl;

import org.smartas.core.service.BaseServiceImpl;
import ${entity.packageName}.${entity.name};
import ${entity.packageName}.dao.${entity.name}Dao;
import ${entity.packageName}.service.${entity.name}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ftl
 *
 */
@Service
public class ${entity.name}ServiceImpl extends BaseServiceImpl<${entity.name}> implements ${entity.name}Service {

	@Autowired
	private ${entity.name}Dao dao;

	protected ${entity.name}Dao getDao() {
		return dao;
	}
	
	////

}
