/**
 * 
 */
package com.fiberhome.smartas.registry.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.registry.Registry;
import com.fiberhome.smartas.registry.service.RegistryService;

/**
 * @author ftl
 *
 */
@Path("/registry")
@Resource(code = 1201, model = "Smart", desc = "Registry Resource")
public class RegistryUI extends BaseResource<Registry> {
  @Autowired
  private RegistryService service;

  protected RegistryService getService() {
    return service;
  }

  ////
  @GET
  @Path(value = "/index")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public String index() {
    return null;
  }
}
