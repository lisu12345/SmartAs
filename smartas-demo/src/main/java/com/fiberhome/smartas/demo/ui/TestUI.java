/**
 * 
 */
package com.fiberhome.smartas.demo.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseResource;
import com.fiberhome.smartas.demo.Test;
import com.fiberhome.smartas.demo.service.TestService;

/**
 * @author ftl
 *
 */
@Path("/demo/test")
@Resource(code = 9000, model = "Smart", desc = "Test Resource")
public class TestUI extends BaseResource<Test> {
  @Autowired
  private TestService service;

  protected TestService getService() {
    return service;
  }

  ////
  @GET
  @Path(value = "/index")
  @Operation(code = Operation.READ, desc = Operation.READ_DESC)
  public String index(Model model) {
    return null;
  }
}
