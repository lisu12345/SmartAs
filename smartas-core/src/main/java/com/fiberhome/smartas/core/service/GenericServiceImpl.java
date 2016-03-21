package com.fiberhome.smartas.core.service;

import java.io.Serializable;
import java.util.List;

import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.GenericDao;
import com.fiberhome.smartas.core.POJO;
import com.fiberhome.smartas.core.Page;
import com.fiberhome.smartas.core.Pageable;
import com.fiberhome.smartas.core.Service;
import com.fiberhome.smartas.core.sql.QueryFilter;
import com.fiberhome.smartas.core.util.DaoUtils;

public abstract class GenericServiceImpl<T extends POJO, PK extends Serializable>
    implements
      Service<T, PK> {

  protected abstract GenericDao<T, PK> getDao();


  public GenericServiceImpl() {}

  public T get(PK id) throws BusinessAccessException{
    return getDao().getById(id);
  }

  public T[] get(PK[] ids) throws BusinessAccessException{
    return getDao().getByIds(ids);
  }

  public Serializable save(T entity) throws BusinessAccessException{
    getDao().insert(entity);
    return entity.getId();
  }

  /*
   * public T merge(T entity) { getDao().merge(entity); return entity; }
   * 
   * public void evict(T entity) { getDao().evict(entity); }
   */

  public List<T> getAll() throws BusinessAccessException{
    return getDao().selectAll();
  }
  
  public List<T> getAll(QueryFilter filter) throws BusinessAccessException{
    return getDao().selectAll(filter);
  }


  public void remove(PK id) throws BusinessAccessException{
    getDao().deleteById(id);
  }

  public void remove(PK[] ids) throws BusinessAccessException{
    getDao().deleteByIds(ids);
  }

  public T find(PK id) throws BusinessAccessException {
    return getDao().getById(id);
  }

  public Pageable<T> getAll(int page, int pageSize) throws BusinessAccessException {
    int length = getDao().getCount();
    page = DaoUtils.realPage(page, pageSize, length);
    return new Pageable<T>(page, pageSize, length,
        getDao().select(new Page((page - 1) * pageSize, pageSize)));
  }

  public Pageable<T> getAll(QueryFilter filter,int page, int pageSize) throws BusinessAccessException {
    int length = getDao().getCount(filter);
    page = DaoUtils.realPage(page, pageSize, length);
    return new Pageable<T>(page, pageSize, length,
        getDao().select(filter,new Page((page - 1) * pageSize, pageSize)));
  }

  //public int getAllSize() throws BusinessAccessException {
  //  return getDao().getCountAll();
  //}

  public void remove(T o) throws BusinessAccessException {
    getDao().deleteById(o.getId());
  }

  public void update(T o) throws BusinessAccessException {
    getDao().update(o);
  }

}
