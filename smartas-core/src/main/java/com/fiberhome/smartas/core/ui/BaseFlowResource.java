package com.fiberhome.smartas.core.ui;

import java.io.Serializable;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import com.fiberhome.smartas.core.BaseFlowService;
import com.fiberhome.smartas.core.BusinessAccessException;
import com.fiberhome.smartas.core.FlowAware;
import com.fiberhome.smartas.core.annotation.Operation;

/**
 * @author chenb
 *
 * @param <T>
 */
@Produces("application/json")
@Consumes("application/json")
public abstract class BaseFlowResource<T extends FlowAware> extends BaseResource<T> {

  protected abstract BaseFlowService<T> getService();

  @POST
  @Path(value = "/process")
  @Operation(code = Operation.CREATE_PROCESS, desc = Operation.CREATE_PROCESS_DESC)
  public Serializable start(T o) {
    return getService().start(o);
  }

  @PUT
  @Path(value = "/process")
  @Operation(code = Operation.APPROVE_PROCESS, desc = Operation.APPROVE_PROCESS_DESC)
  public void approve(T o) throws BusinessAccessException {
    getService().approve(o);
  }

}
