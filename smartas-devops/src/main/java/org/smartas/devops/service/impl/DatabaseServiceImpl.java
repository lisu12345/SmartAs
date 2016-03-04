package org.smartas.devops.service.impl;

import org.smartas.core.Page;
import org.smartas.core.Pageable;
import org.smartas.core.util.DaoUtils;
import org.smartas.devops.Table;
import org.smartas.devops.dao.DatabaseDao;
import org.smartas.devops.service.DatabaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author ftl
 *
 */
@Service
public class DatabaseServiceImpl implements DatabaseService {

	@Autowired
	private DatabaseDao dao;

	@Override
	public Pageable<Table> getTable(String db,String prefix,int page, int pageSize) {
		int length = dao.getTableCountAll(db,prefix);
		page = DaoUtils.realPage(page, pageSize, length);
		return new Pageable<Table>(page, pageSize, length, dao.selectTable(db,prefix,new Page((page - 1) * pageSize, pageSize)));
	}
}
