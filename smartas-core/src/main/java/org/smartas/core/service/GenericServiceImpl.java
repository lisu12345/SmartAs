package org.smartas.core.service;

import java.io.Serializable;
import java.util.List;

import org.smartas.core.BusinessAccessException;
import org.smartas.core.POJO;
import org.smartas.core.GenericDao;
import org.smartas.core.Page;
import org.smartas.core.Pageable;
import org.smartas.core.Service;
import org.smartas.core.util.DaoUtils;

public abstract class GenericServiceImpl<T extends POJO, PK extends Serializable> implements Service<T, PK> {

	protected abstract GenericDao<T, PK> getDao();
	

	public GenericServiceImpl() {
	}

	public T get(PK id) {
		return getDao().getById(id);
	}
	public T[] get(PK[] ids) {
		return getDao().getByIds(ids);
	}

	public Serializable save(T entity) {
		getDao().insert(entity);
		return entity.getId();
	}

	/*public T merge(T entity) {
		getDao().merge(entity);
		return entity;
	}

	public void evict(T entity) {
		getDao().evict(entity);
	}*/

	public List<T> getAll() {
		return getDao().selectAll();
	}


	public void remove(PK id) {
		getDao().deleteById(id);
	}
	
	public void remove(PK[] ids) {
		getDao().deleteByIds(ids);
	}

	public T find(PK id) throws BusinessAccessException {
		return getDao().getById(id);
	}

	public Pageable<T> getAll(int page, int pageSize) throws BusinessAccessException {
		int length =getDao().getCountAll();
		page = DaoUtils.realPage(page, pageSize, length);
		return new Pageable<T>(page, pageSize, length, getDao().select(new Page((page - 1) * pageSize, pageSize)));
	}

	public int getAllSize() throws BusinessAccessException {
		return getDao().getCountAll();
	}

	public void remove(T o) throws BusinessAccessException {
		getDao().deleteById(o.getId());
	}

	public void update(T o) throws BusinessAccessException {
		getDao().update(o);
	}
	
}
