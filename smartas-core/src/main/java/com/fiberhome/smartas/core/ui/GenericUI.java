package com.fiberhome.smartas.core.ui;

import java.io.Serializable;
import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.fiberhome.smartas.core.AppEnv;
import com.fiberhome.smartas.core.BaseExceptionAwareResource;
import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.POJO;
import com.fiberhome.smartas.core.Pageable;
import com.fiberhome.smartas.core.Service;
import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.RequestQuery;
import com.fiberhome.smartas.core.sql.QueryFilter;
import com.fiberhome.smartas.core.util.BeanContext;

/**
 * @author chenb
 * {@link GenericResource}
 * @param <T>
 * @param <PK>
 */
@Deprecated
public abstract class GenericUI<T extends POJO, PK extends Serializable>
    extends BaseExceptionAwareResource {

  protected abstract Service<T, PK> getService();

  protected AppEnv getEvn() {
    return BeanContext.getAppEnv();
  }

  @RequestMapping(value = "/single/{id}", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public T get(@PathVariable("id") PK id) {
    return getService().get(id);
  }

  @RequestMapping(value = "/batch/{ids}", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public T[] get(@PathVariable("id") PK[] ids) {
    return getService().get(ids);
  }

  @RequestMapping(value = "/list/{page}/{pageSize}", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public Pageable<T> getAll(@PathVariable("page") int page,
      @PathVariable("pageSize") int pageSize) {
    return getService().getAll(page, pageSize);
  }

  @RequestMapping(value = "/list", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public List<T> getAll() {
    return getService().getAll();
  }


  @RequestMapping(value = "/query/{page}/{pageSize}", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public Pageable<T> getAll(@PathVariable("page") int page, @PathVariable("pageSize") int pageSize,
      @RequestQuery QueryFilter query) {
    return getService().getAll(query, page, pageSize);
  }

  @RequestMapping(value = "/query", method = RequestMethod.GET)
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public List<T> getAll(@RequestQuery QueryFilter query) {
    return getService().getAll(query);
  }

  @RequestMapping(value = "/single", method = RequestMethod.POST)
  @Operation(code = Operation.CREATE, desc = Operation.CREATE_DESC)
  public Serializable save(@RequestBody T entity) {
    return getService().save(entity);
  }

  @RequestMapping(value = "/single", method = RequestMethod.PUT)
  @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
  public Serializable update(@RequestBody T o) throws BusinessAccessException {
    getService().update(o);
    return o.getId();
  }

  @RequestMapping(value = "/single/{id}", method = RequestMethod.DELETE)
  @Operation(code = Operation.DELETE, desc = Operation.DELETE_DESC)
  public void remove(@PathVariable("id") PK id) throws BusinessAccessException {
    getService().remove(id);
  }


  @RequestMapping(value = "/batch/{ids}", method = RequestMethod.DELETE)
  @Operation(code = Operation.DELETE, desc = Operation.DELETE_DESC)
  public void remove(@PathVariable("ids") PK[] ids) throws BusinessAccessException {
    getService().remove(ids);
  }

}
