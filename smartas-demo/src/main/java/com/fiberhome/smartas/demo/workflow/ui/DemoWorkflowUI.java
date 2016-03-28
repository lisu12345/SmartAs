/**
 * 
 */
package com.fiberhome.smartas.demo.workflow.ui;

import javax.ws.rs.GET;
import javax.ws.rs.Path;

import org.springframework.beans.factory.annotation.Autowired;

import com.fiberhome.smartas.core.annotation.Operation;
import com.fiberhome.smartas.core.annotation.Resource;
import com.fiberhome.smartas.core.ui.BaseFlowResource;
import com.fiberhome.smartas.demo.workflow.DemoWorkflow;
import com.fiberhome.smartas.demo.workflow.service.DemoWorkflowService;

/**
 * @author ftl
 *
 */
@Path("/demo/workflow")
@Resource(code = 4001, model = "Smart", desc = "DemoWorkflow Resource")
public class DemoWorkflowUI extends BaseFlowResource<DemoWorkflow> {
  @Autowired
  private DemoWorkflowService service;

  protected DemoWorkflowService getService() {
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
