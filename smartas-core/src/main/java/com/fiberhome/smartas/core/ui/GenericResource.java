package com.fiberhome.smartas.core.ui;

import java.io.Serializable;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;

import com.fiberhome.smartas.core.AppEnv;
import com.fiberhome.smartas.core.BaseExceptionAwareResource;
import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.POJO;
import com.fiberhome.smartas.core.Pageable;
import com.fiberhome.smartas.core.Service;
import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.sql.QueryFilter;
import com.fiberhome.smartas.core.util.BeanContext;
import com.fiberhome.smartas.core.util.QueryUtils;

/**
 * @author chenb
 *
 * @param <T>
 * @param <PK>
 */
@Produces("application/json")
@Consumes("application/json")
public abstract class GenericResource<T extends POJO, PK extends Serializable>
    extends BaseExceptionAwareResource {

  protected abstract Service<T, PK> getService();

  protected AppEnv getEvn() {
    return BeanContext.getAppEnv();
  }

  @GET
  @Path(value = "/single/{id}")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public T get(@PathParam("id") PK id) {
    return getService().get(id);
  }

  @GET
  @Path(value = "/batch/{ids}")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public T[] get(@PathParam("id") PK[] ids) {
    return getService().get(ids);
  }

  @GET
  @Path(value = "/list/{page}/{pageSize}")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public Pageable<T> getAll(@PathParam("page") int page, @PathParam("pageSize") int pageSize,
      @Context UriInfo uriInfo) {
    QueryFilter query = QueryUtils.parseMultiQuery(uriInfo.getQueryParameters());
    return getService().getAll(query, page, pageSize);
  }

  @GET
  @Path(value = "/list")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public List<T> getAll(@Context UriInfo uriInfo) {
    QueryFilter query = QueryUtils.parseMultiQuery(uriInfo.getQueryParameters());
    return getService().getAll(query);
  }

  @POST
  @Path(value = "/single")
  @Operation(code = Operation.CREATE, desc = Operation.CREATE_DESC)
  public Serializable save(T entity) {
    return getService().save(entity);
  }

  @PUT
  @Path(value = "/single")
  @Operation(code = Operation.UPDATE, desc = Operation.UPDATE_DESC)
  public Serializable update(T o) throws BusinessAccessException {
    getService().update(o);
    return o.getId();
  }

  @DELETE
  @Path(value = "/single/{id}")
  @Operation(code = Operation.DELETE, desc = Operation.DELETE_DESC)
  public void remove(@PathParam("id") PK id) throws BusinessAccessException {
    getService().remove(id);
  }

  @DELETE
  @Path(value = "/batch/{ids}")
  @Operation(code = Operation.DELETE, desc = Operation.DELETE_DESC)
  public void remove(@PathParam("ids") PK[] ids) throws BusinessAccessException {
    getService().remove(ids);
  }

}
